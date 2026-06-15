import type { EmbeddingProvider } from '@/shared/ports/embedding-provider.port'

const EMBED_MODEL = 'nomic-embed-text'

export class OllamaEmbeddingAdapter implements EmbeddingProvider {
  async embed(texts: string[]): Promise<number[][]> {
    const baseUrl = process.env.OLLAMA_BASE_URL
    if (!baseUrl) return texts.map(() => [])

    return Promise.all(
      texts.map(async (text) => {
        try {
          const res = await fetch(`${baseUrl}/api/embeddings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: EMBED_MODEL, prompt: text }),
          })
          if (!res.ok) return []
          const data = (await res.json()) as { embedding?: number[] }
          return data.embedding ?? []
        } catch {
          return []
        }
      })
    )
  }
}

export const embeddingProvider: EmbeddingProvider = new OllamaEmbeddingAdapter()
