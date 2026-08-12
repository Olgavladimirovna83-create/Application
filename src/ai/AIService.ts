import type { AIGenerateRequest, AIGenerateResult, AIProvider } from './AIProvider';
import { createAnthropicProvider } from './providers/anthropic';

let provider: AIProvider | null = null;

function getProvider(): AIProvider {
  if (!provider) {
    // Единственный текущий provider — Anthropic (D-0001). Замена провайдера
    // ограничивается этим файлом + providers/*, не требует изменений в
    // Recommendation Engine / Analysis Engine (29_AI_LAYER.md §7).
    provider = createAnthropicProvider();
  }
  return provider;
}

export const AIService = {
  generate(request: AIGenerateRequest): Promise<AIGenerateResult> {
    return getProvider().generate(request);
  },
};
