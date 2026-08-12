# /src/ai — AI layer

`AI_SERVICE → AI_PROVIDER_ADAPTER → AI PROVIDER → MODEL` (`29_AI_LAYER.md` §2, CLAUDE.md §4.1).

- `AIProvider.ts` — интерфейс адаптера (контракт, не реализация)
- `AIService.ts` — `AI_SERVICE`, единственная точка входа для domain-кода
- `providers/anthropic.ts` — `AI_PROVIDER_ADAPTER` для Anthropic Claude API; единственный файл в проекте, которому разрешено импортировать `@anthropic-ai/sdk`
- `index.ts` — публичный экспорт: `AIService` + типы. Провайдерские адаптеры не реэкспортируются

Recommendation Engine, Analysis Engine и другие domain-компоненты импортируют только `src/ai` (или `@/ai` через путь), никогда `src/ai/providers/*` и никогда `@anthropic-ai/sdk` напрямую.

Замена провайдера (см. `29_AI_LAYER.md` §7) — новый файл в `providers/`, реализующий `AIProvider`, плюс переключение в `AIService.ts`. Остальной код не меняется.
