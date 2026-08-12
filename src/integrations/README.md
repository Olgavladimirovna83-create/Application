# /src/integrations — ExternalIntegration adapters

Заготовка под адаптеры внешних платформ (CLAUDE.md §3.2/§4.1). Пуста осознанно: реализация Instagram Integration Service начинается только после Task 3.0 (техническая проверка Meta/Instagram Graph API — permissions, token lifecycle, доступность данных). Цель этой папки на Task 0.2 — только физическая граница: domain-код с первого дня не может напрямую импортировать провайдерские SDK/HTTP-клиенты внешних платформ.

- `ExternalIntegration.ts` — минимальный общий интерфейс
- `instagram/` — placeholder, наполняется после Task 3.0
