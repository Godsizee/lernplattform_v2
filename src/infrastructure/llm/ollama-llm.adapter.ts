import type { LlmProvider, GenerateTextInput, GenerateTextResult } from '@/shared/ports/llm-provider.port'
import { chat } from '@/lib/adaptive/llm-adapter'

export class OllamaLlmAdapter implements LlmProvider {
  async generate(input: GenerateTextInput): Promise<GenerateTextResult> {
    const text = await chat(input.messages, {
      jsonMode: input.jsonMode,
      maxTokens: input.maxTokens,
      temperature: input.temperature,
      operation: input.operation,
    })
    return { text }
  }
}

export const llmProvider: LlmProvider = new OllamaLlmAdapter()
