export type LlmMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export type GenerateTextInput = {
  messages: LlmMessage[]
  jsonMode?: boolean
  maxTokens?: number
  temperature?: number
  operation?: string
}

export type GenerateTextResult = {
  text: string
  outputTokens?: number
  promptTokens?: number
}

export interface LlmProvider {
  generate(input: GenerateTextInput): Promise<GenerateTextResult>
}
