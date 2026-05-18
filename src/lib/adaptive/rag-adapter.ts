/**
 * RAG Adapter — Embedding via Ollama + Qdrant-CRUD.
 *
 * Benötigt:
 *   OLLAMA_BASE_URL  — Ollama-Instanz (für nomic-embed-text)
 *   QDRANT_URL       — Qdrant REST API (z.B. http://192.168.178.197:6333)
 *
 * Fehlt eine der Variablen, werden alle Funktionen graceful no-op.
 * Nur server-side verwenden.
 */

const COLLECTION = 'lumadiq_chunks'
const EMBED_MODEL = 'nomic-embed-text'
const VECTOR_SIZE = 384
const RAG_CHUNK_SIZE = 800
const RAG_CHUNK_OVERLAP = 100
const TOP_K = 3

// ---------------------------------------------------------------------------
// Chunking
// ---------------------------------------------------------------------------

/** Teilt Text in RAG-optimierte Kleinchunks (~800 Zeichen, Schnitt an Absätzen). */
export function chunkTextForRag(text: string): string[] {
  if (text.length <= RAG_CHUNK_SIZE) return [text]

  const chunks: string[] = []
  let pos = 0

  while (pos < text.length) {
    const end = Math.min(pos + RAG_CHUNK_SIZE, text.length)
    let splitAt = end

    if (end < text.length) {
      const searchFrom = Math.max(pos, end - 200)
      const lastBreak = text.lastIndexOf('\n\n', end)
      if (lastBreak > searchFrom) {
        splitAt = lastBreak + 2
      } else {
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

// ---------------------------------------------------------------------------
// Embedding
// ---------------------------------------------------------------------------

/** Bettet Text via Ollama/nomic-embed-text ein. Gibt [] zurück wenn nicht konfiguriert. */
export async function embedText(text: string): Promise<number[]> {
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

// ---------------------------------------------------------------------------
// Qdrant-Hilfsfunktionen
// ---------------------------------------------------------------------------

function qdrantUrl(path: string): string {
  return `${process.env.QDRANT_URL}${path}`
}

/** Erstellt die Collection falls sie nicht existiert. */
async function ensureCollection(): Promise<void> {
  const qdrantBase = process.env.QDRANT_URL
  if (!qdrantBase) return

  const checkRes = await fetch(qdrantUrl(`/collections/${COLLECTION}`))
  if (checkRes.ok) return

  await fetch(qdrantUrl(`/collections/${COLLECTION}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      vectors: { size: VECTOR_SIZE, distance: 'Cosine' },
    }),
  })
}

// ---------------------------------------------------------------------------
// Öffentliche API
// ---------------------------------------------------------------------------

/**
 * Indexiert alle Chunks eines Dokuments in Qdrant.
 * Bestehende Chunks des Dokuments werden vorher gelöscht (Upsert-Semantik).
 */
export async function indexDocumentChunks(
  documentId: string,
  userId: string,
  text: string
): Promise<void> {
  if (!process.env.QDRANT_URL || !process.env.OLLAMA_BASE_URL) return

  try {
    await ensureCollection()
    await deleteDocumentChunks(documentId)

    const chunks = chunkTextForRag(text)
    const points = []

    for (let i = 0; i < chunks.length; i++) {
      const vec = await embedText(`search_document: ${chunks[i]}`)
      if (vec.length === 0) continue

      points.push({
        id: crypto.randomUUID(),
        vector: vec,
        payload: { documentId, userId, text: chunks[i], chunkIndex: i },
      })
    }

    if (points.length === 0) return

    await fetch(qdrantUrl(`/collections/${COLLECTION}/points`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ points }),
    })
  } catch {
    // RAG-Fehler sind nicht kritisch — Dokument-Verarbeitung läuft weiter
  }
}

/**
 * Sucht die TOP_K relevantesten Textpassagen für eine Query.
 * Filtert optional auf ein spezifisches Dokument.
 * Gibt [] zurück wenn Qdrant nicht konfiguriert oder Fehler auftritt.
 */
export async function searchChunks(
  query: string,
  userId: string,
  documentId?: string | null
): Promise<string[]> {
  if (!process.env.QDRANT_URL || !process.env.OLLAMA_BASE_URL) return []

  try {
    const vec = await embedText(`search_query: ${query}`)
    if (vec.length === 0) return []

    const filter = documentId
      ? {
          must: [
            { key: 'userId', match: { value: userId } },
            { key: 'documentId', match: { value: documentId } },
          ],
        }
      : { must: [{ key: 'userId', match: { value: userId } }] }

    const res = await fetch(qdrantUrl(`/collections/${COLLECTION}/points/search`), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vector: vec, limit: TOP_K, filter, with_payload: true }),
    })

    if (!res.ok) return []

    type QdrantResult = { payload?: { text?: string } }
    const data = (await res.json()) as { result?: QdrantResult[] }
    return (data.result ?? [])
      .map((r) => r.payload?.text ?? '')
      .filter((t) => t.length > 0)
  } catch {
    return []
  }
}

/**
 * Löscht alle Chunks eines Dokuments aus Qdrant.
 * Wird bei Dokument-Löschung aufgerufen.
 */
export async function deleteDocumentChunks(documentId: string): Promise<void> {
  if (!process.env.QDRANT_URL) return

  try {
    await fetch(qdrantUrl(`/collections/${COLLECTION}/points/delete`), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filter: { must: [{ key: 'documentId', match: { value: documentId } }] },
      }),
    })
  } catch {
    // Kein kritischer Fehler
  }
}
