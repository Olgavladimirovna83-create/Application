# CHANGELOG.md

Формат: [Keep a Changelog](https://keepachangelog.com/). Каждая значимая задача добавляет запись сюда.

---

## [Unreleased]

### Added
- Репозиторий проекта с полной архитектурной документацией (`/docs`)
- Операционные файлы: `CLAUDE.md`, `CURRENT_STATUS.md`, `TASKS.md`, `DECISIONS.md`, `CHANGELOG.md`
- D-0001: выбор технологического стека MVP (Next.js + TypeScript, PostgreSQL, Prisma, BullMQ/Redis, Auth.js, Anthropic Claude API, R2, Sentry)

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
