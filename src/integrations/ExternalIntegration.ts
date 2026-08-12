/**
 * Общий контракт для интеграций с внешними платформами (Instagram и будущие).
 * Instagram Integration ≠ App Authentication — это отдельный слой:
 * OAuth authorization, permissions, access tokens, token lifecycle,
 * API requests, синхронизация, rate limits, incremental sync
 * (CLAUDE.md §3.2/§4.1).
 *
 * Реализация конкретных методов (connect/sync/...) начинается только после
 * Task 3.0 — технической проверки Meta/Instagram Graph API. До этого момента
 * интерфейс намеренно минимален, чтобы не фиксировать предположения о API,
 * которые ещё не проверены.
 */
export interface ExternalIntegration {
  readonly platform: string;
  isConnected(userId: string): Promise<boolean>;
}
