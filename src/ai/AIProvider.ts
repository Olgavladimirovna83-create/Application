export type AITaskType =
  | 'classification'
  | 'extraction'
  | 'summarization'
  | 'content_analysis'
  | 'vision_analysis'
  | 'reasoning'
  | 'generation'
  | 'explanation';

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AIGenerateRequest {
  task: AITaskType;
  systemPrompt?: string;
  messages: AIMessage[];
  promptVersion: string;
  maxOutputTokens?: number;
}

export type AIRunStatus =
  | 'completed'
  | 'failed'
  | 'timeout'
  | 'provider_unavailable'
  | 'validation_failed';

export interface AIGenerateResult {
  text: string;
  provider: string;
  model: string;
  promptVersion: string;
  confidence?: number;
  usage: {
    inputTokens: number;
    outputTokens: number;
  };
  status: AIRunStatus;
}

export interface AIProviderCapabilities {
  text: boolean;
  vision: boolean;
  structuredOutput: boolean;
}

/**
 * AI_PROVIDER_ADAPTER contract (29_AI_LAYER.md §51). Domain code never
 * implements or imports this directly — only через AIService (AI_SERVICE).
 */
export interface AIProvider {
  readonly name: string;
  readonly capabilities: AIProviderCapabilities;
  generate(request: AIGenerateRequest): Promise<AIGenerateResult>;
}
