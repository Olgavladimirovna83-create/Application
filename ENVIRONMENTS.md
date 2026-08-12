# ENVIRONMENTS.md

Стратегия окружений и secrets management. Обязательна к прочтению перед любой работой с credentials, деплоем или CI. Источник требований: `30_SECURITY_PRIVACY.md` §20–21, §62–64; `46_PRODUCTION_OPERATIONS_AND_RELIABILITY.md` §3–5, §9–10 (Task 0.3, `TASKS.md`).

---

## 1. Окружения

Минимум три (`30_SECURITY_PRIVACY.md` §62; `46_..._RELIABILITY.md` §3):

| Окружение | Где живёт | БД (Neon) | Redis (Upstash) | Storage (R2) | Env vars |
|---|---|---|---|---|---|
| **development** | локальная машина разработчика | локальный Postgres или отдельная dev-ветка Neon | локальный Redis или dev-инстанс Upstash | dev-bucket | `.env.local` (не в git) |
| **staging** | Vercel Preview / выделенный staging-деплой | отдельная ветка/база Neon | отдельный инстанс Upstash | staging-bucket | Vercel Project Settings → Environment Variables (scope: Preview) |
| **production** | Vercel Production | отдельная база Neon | отдельный инстанс Upstash | production-bucket | Vercel Project Settings → Environment Variables (scope: Production) |

Next.js/Vercel не имеют отдельного понятия «test» из документа `46_..._RELIABILITY.md` §3 как деплой-окружения — тестовый прогон (Task 0.5, CI) работает на synthetic/anonymized данных внутри CI-джобы, не как отдельное постоянное окружение с собственной БД.

**Правило изоляции (обязательное, не обсуждается на лету):** ни одно окружение не переиспользует credentials, БД, Redis-инстанс, storage bucket или secrets другого окружения. Production data не копируется в development/staging без явных safeguards (`30_SECURITY_PRIVACY.md` §64) — в MVP-стадии staging/dev работают только на синтетических/тестовых данных, production data туда не попадает вообще.

---

## 2. Локальная разработка

```bash
cp .env.example .env.local
```

Заполнить `.env.local` реальными dev-значениями. Файл уже в `.gitignore` (`.env` и `.env*.local`) — если `git status` когда-либо покажет `.env.local` как новый файл для коммита, это красный флаг, остановиться и проверить `.gitignore`, а не коммитить.

`.env.example` коммитится в git и содержит только имена переменных с пустыми значениями — служит документацией по составу конфигурации (`46_..._RELIABILITY.md` §9: конфигурация отделена от кода).

---

## 3. Staging / production

Создание реальных ресурсов (проект Vercel, ветки/базы Neon, инстансы Upstash, buckets R2) требует доступа к внешним дашбордам — это делает Olga вручную, не Claude Code в этой сессии (нет аккаунтов/API-доступа к этим сервисам). После создания:

1. Каждому окружению — свой набор credentials (по одному на PostgreSQL/Redis/R2/Auth.js secret).
2. Secrets задаются в Vercel Project Settings → Environment Variables, со scope (Development/Preview/Production) — никогда как файлы в репозитории.
3. `AUTH_SECRET` генерируется отдельно на каждое окружение, не переиспользуется.
4. Production secrets никогда не попадают в development (`30_SECURITY_PRIVACY.md` §62).

Пока staging/production не созданы, `CURRENT_STATUS.md` отражает это явно — это не блокирует Phase 0/1, только реальный деплой.

---

## 4. Правила secrets (обязательные, `30_SECURITY_PRIVACY.md` §20–21, `46_..._RELIABILITY.md` §10)

Secrets не должны находиться:
- в source code;
- в git (включая историю коммитов — если секрет случайно закоммичен, его нужно считать скомпрометированным и ротировать, недостаточно удалить файл);
- в обычных логах;
- в publicly-доступной документации;
- во frontend bundle (secrets из `.env` без префикса `NEXT_PUBLIC_` не попадают в клиентский JS — это гарантия Next.js, но она работает только если сам код не передаёт secret в client-компонент явно).

---

## 5. Проверка при code review

Перед мержем PR, трогающего `.env.example`, конфигурацию или деплой: убедиться, что не добавлено реальных значений — только имена переменных.
