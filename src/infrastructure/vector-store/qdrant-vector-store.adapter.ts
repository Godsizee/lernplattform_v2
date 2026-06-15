import type {
  VectorStore,
  IndexDocumentInput,
  SearchInput,
  SearchResult,
  DeleteDocumentInput,
} from '@/shared/ports/vector-store.port'
import { createHash } from 'crypto'

const COLLECTION = 'lumadiq_chunks_v1'
const EMBED_MODEL = 'nomic-embed-text'
const VECTOR_SIZE = 384
const RAG_CHUNK_SIZE = 800
const RAG_CHUNK_OVERLAP = 100

function qdrantUrl(p: string): string {
  return `${process.env.QDRANT_URL}${p}`
}

function chunkText(text: string): string[] {
  if (text.length <= RAG_CHUNK_SIZE) return [text]
  const chunks: string[] = []
  let pos = 0
  while (pos < text.length) {
    const end = Math.min(pos + RAG_CHUNK_SIZE, text.length)
    let splitAt = end
    if (end < text.length) {
      const searchFrom = Math.max(pos, end - 200)
      const lastBreak = text.lastIndexOf('\n\n', end)
      if (lastBreak > searchFrom) splitAt = lastBreak + 2
      else {
        const lastNewline = text.lastIndexOf('\n', end)
        if (lastNewline > searchFrom) splitAt = lastNewline + 1
      }
    }
    chunks.push(text.slice(pos, splitAt).trim())
    if (splitAt >= text.length) break
    pos = splitAt - RAG_CHUNK_OVERLAP
    if (pos <= 0) pos = splitAt
  }
  return chunks.filter((c) => c.length > 0)
}

async function embedText(text: string): Promise<number[]> {
  const baseUrl = process.env.OLLAMA_BASE_URL
  if (!baseUrl) return []
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
}

async function ensureCollection(): Promise<void> {
  if (!process.env.QDRANT_URL) return
  const check = await fetch(qdrantUrl(`/collections/${COLLECTION}`))
  if (check.ok) return
  await fetch(qdrantUrl(`/collections/${COLLECTION}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ vectors: { size: VECTOR_SIZE, distance: 'Cosine' } }),
  })
  // Payload-Indizes anlegen
  for (const field of ['tenantId', 'documentId', 'subjectId', 'sourceType', 'ownerUserId']) {
    await fetch(qdrantUrl(`/collections/${COLLECTION}/index`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ field_name: field, field_schema: 'keyword' }),
    }).catch(() => {})
  }
}

function deterministicChunkId(tenantId: string, documentId: string, chunkIndex: number, contentHash: string): string {
  return createHash('sha256')
    .update(`${tenantId}:${documentId}:${chunkIndex}:${contentHash}:${EMBED_MODEL}`)
    .digest('hex')
    // Qdrant erwartet UUID-Format für numerische IDs — wir verwenden den Hash als String-ID
    .slice(0, 32)
}

export class QdrantVectorStoreAdapter implements VectorStore {
  async indexDocument(input: IndexDocumentInput): Promise<void> {
    if (!process.env.QDRANT_URL || !process.env.OLLAMA_BASE_URL) return
    try {
      await ensureCollection()
      await this.deleteDocument({ documentId: input.documentId })

      const chunks = chunkText(input.text)
      const points = []

      for (let i = 0; i < chunks.length; i++) {
        const vec = await embedText(`search_document: ${chunks[i]}`)
        if (vec.length === 0) continue

        const contentHash = createHash('md5').update(chunks[i]).digest('hex')
        const id = deterministicChunkId(input.tenantId, input.documentId, i, contentHash)

        points.push({
          id,
          vector: vec,
          payload: {
            tenantId: input.tenantId,
            documentId: input.documentId,
            subjectId: input.subjectId ?? null,
            ownerUserId: input.ownerUserId ?? null,
            sourceType: input.sourceType,
            text: chunks[i],
            chunkIndex: i,
            contentHash,
            embeddingModel: EMBED_MODEL,
          },
        })
      }

      if (points.length === 0) return

      await fetch(qdrantUrl(`/collections/${COLLECTION}/points`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ points }),
      })
    } catch {
      // RAG-Fehler nicht kritisch
    }
  }

  async search(input: SearchInput): Promise<SearchResult[]> {
    if (!process.env.QDRANT_URL || !process.env.OLLAMA_BASE_URL) return []
    try {
      const vec = await embedText(`search_query: ${input.query}`)
      if (vec.length === 0) return []

      // tenantId ist immer im Filter — niemals optional
      const must: unknown[] = [{ key: 'tenantId', match: { value: input.tenantId } }]
      if (input.documentId) must.push({ key: 'documentId', match: { value: input.documentId } })
      if (input.subjectId) must.push({ key: 'subjectId', match: { value: input.subjectId } })

      const res = await fetch(qdrantUrl(`/collections/${COLLECTION}/points/search`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vector: vec,
          limit: input.topK ?? 3,
          filter: { must },
          with_payload: true,
          with_vector: false,
        }),
      })
      if (!res.ok) return []

      type QdrantHit = { score: number; payload?: { text?: string; documentId?: string; chunkIndex?: number } }
      const data = (await res.json()) as { result?: QdrantHit[] }
      return (data.result ?? [])
        .filter((r) => r.payload?.text)
        .map((r) => ({
          text: r.payload!.text!,
          documentId: r.payload!.documentId ?? '',
          chunkIndex: r.payload!.chunkIndex ?? 0,
          score: r.score,
        }))
    } catch {
      return []
    }
  }

  async deleteDocument(input: DeleteDocumentInput): Promise<void> {
    if (!process.env.QDRANT_URL) return
    try {
      await fetch(qdrantUrl(`/collections/${COLLECTION}/points/delete`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filter: { must: [{ key: 'documentId', match: { value: input.documentId } }] },
        }),
      })
    } catch {}
  }
}

export const vectorStore: VectorStore = new QdrantVectorStoreAdapter()
