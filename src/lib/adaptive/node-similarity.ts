/**
 * Einfache Jaccard-Ähnlichkeit auf Knotentiteln für Duplikat-Erkennung.
 * Nur server-side verwenden.
 */

const STOPWORDS = new Set([
  'der', 'die', 'das', 'und', 'oder', 'mit', 'von', 'zu', 'für', 'in',
  'an', 'auf', 'ist', 'sind', 'eine', 'ein', 'als', 'bei', 'durch',
  'the', 'and', 'or', 'with', 'of', 'to', 'for', 'in', 'a', 'an',
  'is', 'are', 'as', 'by', 'at', 'on', 'via', 'its',
])

function tokenize(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-zäöüß\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length >= 3 && !STOPWORDS.has(w))
  )
}

export function jaccardSimilarity(a: string, b: string): number {
  const setA = tokenize(a)
  const setB = tokenize(b)
  if (setA.size === 0 && setB.size === 0) return 1
  if (setA.size === 0 || setB.size === 0) return 0

  const intersection = [...setA].filter((w) => setB.has(w)).length
  const union = new Set([...setA, ...setB]).size
  return intersection / union
}

export interface DuplicateCandidate {
  newNodeId: string
  newTitle: string
  existingNodeId: string
  existingTitle: string
  /** Ähnlichkeitswert in Prozent (0–100) */
  score: number
}

/** Mindest-Jaccard-Score für Duplikat-Warnung */
const THRESHOLD = 0.4

export function findDuplicates(
  newNodes: { id: string; title: string }[],
  existingNodes: { id: string; title: string }[]
): DuplicateCandidate[] {
  const candidates: DuplicateCandidate[] = []

  for (const n of newNodes) {
    for (const e of existingNodes) {
      const score = jaccardSimilarity(n.title, e.title)
      if (score >= THRESHOLD) {
        candidates.push({
          newNodeId: n.id,
          newTitle: n.title,
          existingNodeId: e.id,
          existingTitle: e.title,
          score: Math.round(score * 100),
        })
      }
    }
  }

  // Pro new-Node nur den ähnlichsten Treffer zurückgeben
  const best = new Map<string, DuplicateCandidate>()
  for (const c of candidates) {
    const prev = best.get(c.newNodeId)
    if (!prev || c.score > prev.score) best.set(c.newNodeId, c)
  }

  return [...best.values()].sort((a, b) => b.score - a.score)
}
