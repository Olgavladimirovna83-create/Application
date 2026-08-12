# /src

Код приложения. Структура папок физически отражает границы слоёв из `CLAUDE.md` §3 (DATA → ANALYSIS → KNOWLEDGE → DECISION → AI → UI → LEARNING) и обязательные абстракции §4.1 (`AIProvider`, `ObjectStorageService`, data-access слой, `ExternalIntegration`-адаптеры).

Инициализация технического стека (Next.js + TypeScript, Prisma, слоевые подпапки) — Task 0.2 в `TASKS.md`. Эта папка создана в Task 0.1 как часть базовой структуры репозитория; наполняется кодом начиная с Task 0.2.
