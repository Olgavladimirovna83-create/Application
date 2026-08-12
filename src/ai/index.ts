export { AIService } from './AIService';
export type {
  AIGenerateRequest,
  AIGenerateResult,
  AIMessage,
  AIProvider,
  AIProviderCapabilities,
  AIRunStatus,
  AITaskType,
} from './AIProvider';

// Провайдерские адаптеры (providers/*) намеренно не реэкспортируются здесь —
// domain-код обращается только к AIService, никогда к конкретному провайдеру
// или его SDK напрямую (CLAUDE.md §4.1).
