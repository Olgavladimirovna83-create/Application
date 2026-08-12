# CHANGELOG.md

Формат: [Keep a Changelog](https://keepachangelog.com/). Каждая значимая задача добавляет запись сюда.

---

## [Unreleased]

### Added
- Репозиторий проекта с полной архитектурной документацией (`/docs`)
- Операционные файлы: `CLAUDE.md`, `CURRENT_STATUS.md`, `TASKS.md`, `DECISIONS.md`, `CHANGELOG.md`
- D-0001: выбор технологического стека MVP (Next.js + TypeScript, PostgreSQL, Prisma, BullMQ/Redis, Auth.js, Anthropic Claude API, R2, Sentry)
- Task 0.1: базовая структура репозитория — `/src` и `/tests` (с пояснительными README, заполняются в Task 0.2/0.5); подтверждена связь local ↔ GitHub remote (`origin/main`)
- Task 0.2: Next.js 15 (App Router) + TypeScript + Prisma scaffolding — `package.json`, `tsconfig.json`, `next.config.mjs`, `.eslintrc.json`, `prisma/schema.prisma` (datasource-only, сущности — Task 1.1)
- Task 0.2: структура `/src` по слоям — `data/`, `analysis/`, `knowledge/`, `decision/`, `ai/`, `storage/`, `integrations/`, `learning/`, `app/` (UI + API layer)
- Task 0.2: обязательные абстракции из CLAUDE.md §4.1 — `AIProvider`/`AIService` (`src/ai/`, единственный импорт `@anthropic-ai/sdk` изолирован в `providers/anthropic.ts`), `ObjectStorageService` (`src/storage/`, единственный импорт AWS S3 SDK изолирован в `providers/r2.ts`), Prisma Client singleton (`src/data/prismaClient.ts`), `ExternalIntegration` — пустой интерфейс до Task 3.0
- `.env.example` с плейсхолдерами (`DATABASE_URL`, `ANTHROPIC_API_KEY`, R2-переменные) — полная схема окружений в Task 0.3
- `package-lock.json` — зафиксирован после `npm install` (373 пакета)

### Changed
- D-0001 пересмотрено: исходное решение принято без систематической проверки, переделано по 10-пунктному чек-листу с построчным чтением всех 46 документов
- CLAUDE.md: добавлена иерархия документации (ранняя волна 04–16 vs поздняя 17–46), обновлён стек (object storage, observability)

### Findings (D-0002 — полный документальный аудит)
- `06_RECOMMENDATION_ENGINE.md` помечен как superseded от `13_RECOMMENDATION_ENGINE.md`
- Уточнена область применения комментариев/репостов: собираются как данные, не входят в 4 основные recommendation-категории
- Обнаружены 3 пары документов с существенным пересечением без противоречий — добавлены в backlog на консолидацию
- PDF-приложения идентифицированы как материалы бренд-войса, не архитектурная документация
- `First.md` — пустой файл, удалён по решению Olga

### Review (D-0003 — независимый архитектурный review от ChatGPT)
- Стек и документация подтверждены без пересмотра: architecture/stack/DB/async/deployment/AI abstraction/documentation — все GREEN
- Instagram/Auth boundary помечен YELLOW — добавлена обязательная задача технической проверки перед Phase 3 (Task 3.0)
- В CLAUDE.md добавлен §4.1: обязательные архитектурные границы (App Auth vs Instagram Integration, AI_SERVICE→AI_PROVIDER_ADAPTER, инфраструктурные абстракции, layer discipline, async processing требования, гранулярность DECISIONS.md)

### Verified (Task 0.2)
- Node.js v24.19.0 / npm 11.17.0 установлены Olga вручную (официальный установщик)
- `npm install` — 373 пакета без ошибок; `npx prisma generate` — клиент сгенерирован
- `npx tsc --noEmit` — без ошибок типов
- `npm run dev` — сервер поднялся (`Ready in 2.6s`), `GET /` вернул HTTP 200 с ожидаемым содержимым

### Known issues
- `npm audit`: 3 high severity — транзитивные `postcss`/`sharp` через Next.js 15; фикс требует мажорного апгрейда до Next.js 16, не выполнен автоматически (решение об апгрейде — отдельно, не блокирует Phase 0)
