# CLAUDE.md — операционные правила разработки

Этот файл — обязательное чтение перед любой значимой работой в репозитории. Он не заменяет архитектурную документацию в `/docs`, а фиксирует, *как* эта архитектура реализуется день за днём.

---

## 1. Назначение проекта

Персональное AI-приложение для создателя контента (Instagram-first), которое соединяет статистику аккаунта, характеристики публикаций, цели пользователя и историю решений в единую обучающуюся систему рекомендаций.

Главная стратегическая цель продукта: **рост подписчиков и охватов**, через понятные, объяснимые, основанные на данных рекомендации — не механический AI-чат, а система, которая наблюдает → анализирует → запоминает → рекомендует → объясняет → учится на результате.

Полная логика — в `/docs` (45+ спецификаций). Это авторитетный источник по продукту и архитектуре.

---

## 2. Источник истины (приоритет при конфликте)

1. Явно принятые продуктовые решения Olga
2. Текущие документы `/docs`
3. `DECISIONS.md`
4. `CLAUDE.md` (этот файл)
5. Текущая реализация в коде
6. Task reports
7. История переписки — наименее авторитетна, никогда не единственный источник

**Внутри `/docs` есть две волны документации:** ранняя (`04`–`16`, отчасти на английском, более концептуальная) и поздняя (`17`–`46`, на русском, архитектурно строже и детальнее). Там, где они пересекаются по теме, поздняя волна авторитетна (см. `DECISIONS.md`, D-0002). Явный известный случай: `13_RECOMMENDATION_ENGINE.md` авторитетен над `06_RECOMMENDATION_ENGINE.md`. При обнаружении новых пар с похожим содержанием — та же логика: не гадать, зафиксировать в DECISIONS.md.

---

## 3. Архитектурные принципы (обязательны, не обсуждаются на лету)

- Слои системы: **DATA → ANALYSIS → KNOWLEDGE → DECISION → AI → UI → LEARNING**. Ни один слой не берёт на себя ответственность другого (UI не считает бизнес-логику, AI не подменяет Analysis/Decision).
- Заменяемость: data connectors, analysis modules, pattern detectors, scoring strategies, AI provider — все должны быть модулями за интерфейсом, а не вшиты намертво.
- Версионирование: любой значимый расчёт несёт `analysis_version` / `decision_version` / `prompt_version`.
- Объяснимость: каждая рекомендация должна быть восстановима по цепочке `Recommendation → Reason → Pattern → Evidence → Content → Performance`.
- Запрещённые антипаттерны: monolithic intelligence (один AI решает всё вместо структурированного пайплайна), UI-logic (бизнес-логика во фронтенде), data-as-truth (сырая цифра выдаётся за вывод без confidence), static recommendations, permanent patterns (закономерность считается вечной).

### 3.1 Дисциплина слоёв в монорепо (обязательно, проверено независимым review)

Next.js-монорепо — допустимый MVP-компромисс, но граница слоёв держится **только** структурой папок и code review, не процессом. Это осознанный риск, а не бесплатный выбор.

- Каждый слой (Data/Analysis/Knowledge/Decision/AI/UI) — отдельная папка с чёткой границей импортов. UI не импортирует напрямую из Analysis/Decision, только через API/service layer.
- Если реализация вынуждает нарушить границу слоя — это фиксируется явно (комментарий в коде + запись в `DECISIONS.md`, если решение значимое), а не происходит незаметно. Тихое смешение слоёв — это architectural drift (см. §13 ниже), и это главная опасность именно потому, что она накапливается маленькими "удобными" шагами.

### 3.2 Границы интеграций (обязательно)

**App Authentication ≠ Instagram Integration.** Это две разные вещи, не одна:
- **App Authentication** — идентификация пользователя в нашем приложении. Отвечает Auth.js.
- **Instagram Integration** — OAuth authorization, Meta/Instagram permissions, access tokens, token lifecycle, API requests, синхронизация, rate limits, incremental sync. Отвечает отдельный `Integration Service` / adapter layer, не Auth.js provider.

Перед реализацией Instagram OAuth (Phase 3) — отдельная задача: проверить актуальные требования Meta/Instagram Graph API, нужные permissions, token lifecycle и доступность нужных данных. Это не делается "по памяти" на момент архитектурного проектирования — Meta API меняется.

**AI provider boundary.** Anthropic Claude API — текущий выбранный provider, но не фундамент бизнес-логики. Обязательная граница: `AI_SERVICE → AI_PROVIDER_ADAPTER → Anthropic implementation`. Recommendation Engine, Analysis Engine и другие domain components не должны напрямую зависеть от Anthropic SDK — только от `AI_SERVICE`.

**Deployment provider boundary.** Vercel/Neon/Upstash/R2 — текущий MVP deployment stack, но домен-логика зависит только от абстракций: `PostgreSQL abstraction`, `Redis abstraction`, `ObjectStorageService`, `AIProvider`, `ExternalIntegration adapters`. Конкретный cloud provider не должен становиться частью domain logic — эти абстракции создаются в Task 0.2 сразу, не добавляются потом.

### 3.3 Async processing (обязательно для BullMQ/Redis-реализации)

Для каждой очереди, особенно Instagram sync и AI processing, должны быть реализованы:
- idempotency (повторная обработка job не создаёт дублей)
- retry policy с backoff
- job deduplication
- concurrency control
- rate limiting (особенно для внешних API)
- failure handling с понятным terminal state
- dead-letter strategy, если это применимо к конкретной очереди

Это не "можно добавить позже" — для sync и AI processing это часть Definition of Done с самого начала.

---

## 4. Технический стек — Decision D-0001 (полное обоснование в `DECISIONS.md`)

- Язык: **TypeScript** во всём стеке
- Frontend + Backend: **Next.js** (App Router), монорепо для MVP — логическое разделение слоёв внутри одного приложения (структура папок = граница слоёв, дисциплина обязательна, см. §13 ARCHITECTURAL DRIFT ниже)
- База данных: **PostgreSQL**
- ORM / миграции: **Prisma**
- Object storage: **S3-совместимое (Cloudflare R2)** через `ObjectStorageService`-абстракцию — никогда прямые вызовы SDK по всему коду
- Фоновые задачи / очередь: **BullMQ + Redis**
- Аутентификация: **Auth.js**, включая OAuth-поток для Instagram/Meta (Instagram Graph API: business/creator аккаунт, rate limits, incremental sync — см. `26_DATA_PIPELINE.md`)
- AI provider: **Anthropic Claude API** через интерфейс `AIProvider` (text + vision) — провайдера должно быть можно заменить, не трогая Recommendation Engine
- Observability: **Sentry** (errors), структурированные логи (pino), AI cost/latency tracking как отдельный слой поверх AI_SERVICE
- Хостинг MVP: **Vercel** (приложение) + managed Postgres (Neon) + managed Redis (Upstash) + R2
- CI: **GitHub Actions**
- Тесты: **Vitest** (unit/integration), **Playwright** (E2E), contract tests для критичных endpoints

Стек проверен по чек-листу (integrations, data model, auth, AI provider abstraction, deployment, testing — см. D-0001 в DECISIONS.md), не выбран по умолчанию. Пересматривается при появлении evidence против него, не по личному предпочтению.

---

## 4.1 Обязательные архитектурные границы (приняты по итогам независимого review, D-0003)

**App Authentication ≠ Instagram Integration.** Instagram — это не «ещё один Auth.js provider». Это два разных слоя:
- **App Authentication** — идентификация пользователя внутри приложения. Отвечает Auth.js.
- **Instagram Integration** — отдельный Integration Service/adapter: OAuth authorization, Meta/Instagram permissions, access tokens, token lifecycle, API requests, синхронизация, rate limits, incremental sync.

Перед реализацией Instagram OAuth обязательна отдельная техническая проверка актуальных требований Meta/Instagram API — permissions, token lifecycle, доступность нужных данных. Это RED/YELLOW-граница: не начинать реализацию Instagram-интеграции без этой проверки (см. `TASKS.md`, задача перед Phase 3).

**AI_SERVICE → AI_PROVIDER_ADAPTER — граница обязательна, не рекомендация.** Recommendation Engine, Analysis Engine и другие domain-компоненты **никогда** не импортируют Anthropic SDK напрямую. Anthropic — текущий implementation provider, не фундамент бизнес-логики.

**Инфраструктурные абстракции обязательны, не опциональны:**
- PostgreSQL — через собственный data-access слой, не голые вызовы клиента по всему коду
- Redis — через абстракцию очереди/кэша
- Object storage — через `ObjectStorageService`
- AI — через `AIProvider`
- Внешние платформы (Instagram и будущие) — через `ExternalIntegration`-адаптеры

Vercel/Neon/Upstash/R2 — текущий deployment stack, не часть domain logic. Смена любого из них не должна требовать переписывания бизнес-логики.

**Layer discipline — нарушения должны быть явными, не молчаливыми.** Next.js-монорепо — допустимый MVP-компромисс, но не даёт физической защиты слоёв (DATA/ANALYSIS/KNOWLEDGE/DECISION/AI/UI/LEARNING). Если реализация задачи требует нарушить границу слоя — это фиксируется явно в task report и, при значимости, в DECISIONS.md. Тихое смешивание слоёв «потому что так быстрее» — запрещено.

**Async processing — обязательный набор для каждого worker/job, отдельно критично для Instagram sync и AI processing:**
idempotency · retry policy · job deduplication · concurrency control · rate limiting · failure handling · dead-letter strategy, если применимо.

**Гранулярность DECISIONS.md.** Не каждое техническое решение — architecture decision. «PostgreSQL вместо MongoDB» — да. Версия библиотеки или мелкая implementation-деталь — нет. В DECISIONS.md попадает то, что влияет на структуру, поведение или долгосрочное направление системы.

**Git push — GREEN по умолчанию (D-0004).** Обычный `git push` без `--force` в конце завершённой и закоммиченной задачи — GREEN: выполняется как часть Definition of Done, без подтверждения Olga. Подтверждение обязательно только для:
- force push (`--force`, `--force-with-lease`) или любого переписывания истории (`rebase`, `filter-branch` и т.п.) на опубликованных коммитах,
- push, затрагивающего что-либо за пределами кода коммита — релизы, теги, production-конфигурацию, деплой-триггеры.

---

## 5. Конвенции репозитория

- `/docs` — архитектурные спецификации, read-only источник истины по логике
- `/src` — код приложения, структура папок отражает слои из §3
- `CLAUDE.md`, `CURRENT_STATUS.md`, `TASKS.md`, `DECISIONS.md`, `CHANGELOG.md` — в корне, обновляются после каждой значимой задачи, это обязательная часть Definition of Done
- Коммиты атомарны, по одной задаче из `TASKS.md`
- Даже в соло-разработке — feature branches и PR, чтобы CI gate реально отрабатывал

---

## 6. Security — обязательно для MVP, не «потом»

- Authentication + authorization проверяются на backend на каждом endpoint (frontend не единственная защита)
- User isolation тестируется автоматически: пользователь А физически не может получить данные пользователя B
- Secrets — только через env/secrets manager; никогда в git, логах, frontend bundle
- HTTPS everywhere
- Input validation на каждом API endpoint
- Rate limiting на публичных endpoints
- AI context minimization — в промпт уходит минимально необходимое
- AI output не считается доверенным источником — проходит валидацию перед использованием

---

## 7. Testing — обязательные требования

- Каждая значимая задача завершается тестами (минимум unit + integration)
- Critical tests (auth, user isolation, миграции, ключевые API) блокируют merge/deploy
- Security и privacy тесты обязательны для MVP
- Test data — синтетика/анонимизация; production credentials никогда не используются в тестах

---

## 8. Запрещено без явного разрешения Olga

- Деструктивные операции (drop table, force push в main, удаление пользовательских данных)
- Прямое редактирование production БД в обход миграций
- Любая внешняя авторизация (настройка Meta/Instagram OAuth, платёжные интеграции) — это RED
- Хранение credentials где-либо в открытом виде
- Пропуск тестов «чтобы было быстрее»
- Архитектурные изменения ради технического удобства, если это не покрывается GREEN/YELLOW ниже
- Force push (`--force`, `--force-with-lease`), переписывание опубликованной истории (`rebase`, `filter-branch` и т.п.), а также push, затрагивающий что-либо за пределами кода коммита (релизы, теги, production-конфигурация, деплой-триггеры) — требуют явного словесного подтверждения Olga в чате **каждый раз**, даже если техническое разрешение на выполнение действия уже есть (например, через «Always Allow» в интерфейсе). Наличие технического разрешения не заменяет явное подтверждение. Обычный `git push` без force — GREEN, см. D-0004.

---

## 9. GREEN / YELLOW / RED — когда действовать самостоятельно

**GREEN** — обычная техническая работа: продолжать без вопросов. Пример: стандартный сервис, тесты, рефакторинг в рамках архитектуры, обычные баги, документация.

**YELLOW** — есть техническая неоднозначность, но безопасное решение можно выбрать самостоятельно: выбрать, зафиксировать в `DECISIONS.md`, продолжить работу.

**RED** — остановиться и дождаться Olga: продуктовое решение, нерешённый архитектурный конфликт, security-чувствительная неопределённость, ввод credentials, внешняя авторизация, необратимая production-операция.

---

## 10. Обязательный отчёт после каждой значимой задачи

`STATUS` (Completed / Partial / Blocked / Failed) · `SUMMARY` · `FILES CHANGED` · `TESTS` · `WARNINGS` · `ARCHITECTURE CHANGES` · `USER ACTION REQUIRED` (да/нет + что именно) · `NEXT TASK`

---

## 11. Definition of Done

Задача считается выполненной только если: реализация готова + тесты прошли + security учтён + observability добавлена + документация обновлена (`CURRENT_STATUS.md`, `TASKS.md`, `DECISIONS.md`, `CHANGELOG.md`) + staging validated, где применимо.

---

## 12. Self-fix limit

При падении теста или сборки — сначала самостоятельная диагностика и попытка исправить. После разумного числа неудачных попыток — остановиться и отчитаться: что сломалось, что было испробовано, что нужно от Olga.
