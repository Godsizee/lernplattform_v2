/**
 * Adaptives Routing — berechnet den nächsten optimalen Konzeptknoten.
 * Pure functions, keine DB-Zugriffe — testbar ohne Server-Kontext.
 */

export interface RoutingNode {
  id: string
  title: string
  documentId?: string
}

export interface RoutingEdge {
  prerequisiteNodeId: string
  dependentNodeId: string
}

export type RoutingReason =
  | 'next-optimal'        // erreichbar, nicht blockiert
  | 'deprioritized'       // erreichbar, aber blockiert → trotzdem zurückgegeben
  | 'all-mastered'        // alle Knoten beherrscht
  | 'no-nodes'            // keine Knoten vorhanden

export interface RoutingResult {
  nodeId: string | null
  reason: RoutingReason
}

export type AssessmentLevel = 'EASY' | 'MEDIUM' | 'HARD'

/** Schwellenwert: ab so vielen konsekutiven Fehlern gilt ein Knoten als blockiert */
export const BLOCK_THRESHOLD = 3

/**
 * Berechnet konsekutive Fehlversuche pro Knoten.
 *
 * @param attempts — in DESC-Reihenfolge (neueste zuerst), mit nodeId + isCorrect
 */
export function computeConsecutiveFailures(
  attempts: { nodeId: string; isCorrect: boolean }[]
): Map<string, number> {
  // Versuche nach Knoten gruppieren (Reihenfolge: neueste zuerst)
  const byNode = new Map<string, boolean[]>()
  for (const { nodeId, isCorrect } of attempts) {
    if (!byNode.has(nodeId)) byNode.set(nodeId, [])
    byNode.get(nodeId)!.push(isCorrect)
  }

  const result = new Map<string, number>()
  for (const [nodeId, corrects] of byNode) {
    let count = 0
    for (const correct of corrects) {
      if (!correct) count++
      else break // Korrekte Antwort bricht die Fehlerserie
    }
    result.set(nodeId, count)
  }
  return result
}

/**
 * Gibt den nächsten empfohlenen Knoten zurück.
 *
 * Algorithmus:
 * 1. Alle nicht-beherrschten Knoten, deren Voraussetzungen alle beherrscht sind → "erreichbar"
 * 2. Davon nicht-blockierte Knoten bevorzugen (consecutiveFailures < BLOCK_THRESHOLD)
 * 3. Fallback auf ersten erreichbaren Knoten wenn alle blockiert
 * 4. Fallback auf ersten unbeherrschten wenn kein Knoten erreichbar (isolierter Graph)
 */
export function getNextNode(
  nodes: RoutingNode[],
  edges: RoutingEdge[],
  masteredIds: Set<string>,
  consecutiveFailures: Map<string, number> = new Map(),
  blockThreshold = BLOCK_THRESHOLD,
  examDocumentIds?: Set<string> | null,
  level: AssessmentLevel = 'MEDIUM'
): RoutingResult {
  if (nodes.length === 0) return { nodeId: null, reason: 'no-nodes' }

  const unmastered = nodes.filter((n) => !masteredIds.has(n.id))
  if (unmastered.length === 0) return { nodeId: null, reason: 'all-mastered' }

  // Voraussetzungs-Map aufbauen: nodeId → Set<prerequisiteNodeId>
  const prereqMap = new Map<string, Set<string>>()
  for (const node of nodes) prereqMap.set(node.id, new Set())
  for (const edge of edges) {
    prereqMap.get(edge.dependentNodeId)?.add(edge.prerequisiteNodeId)
  }

  // Erreichbare Knoten: alle Voraussetzungen beherrscht
  const reachable = unmastered.filter((node) => {
    const prereqs = prereqMap.get(node.id) ?? new Set()
    return [...prereqs].every((pid) => masteredIds.has(pid))
  })

  const candidates = reachable.length > 0 ? reachable : unmastered

  // Klausur-Boost: Knoten aus Klausur-Dokumenten zuerst
  function prioritize(list: RoutingNode[]): RoutingNode[] {
    if (!examDocumentIds?.size) return list
    return [
      ...list.filter((n) => n.documentId && examDocumentIds.has(n.documentId)),
      ...list.filter((n) => !n.documentId || !examDocumentIds.has(n.documentId)),
    ]
  }

  // Anzahl der direkten Voraussetzungen pro Knoten
  function prereqCount(nodeId: string): number {
    return (prereqMap.get(nodeId) ?? new Set()).size
  }

  // Anzahl der Knoten die dieser Knoten freischaltet
  function dependentCount(nodeId: string): number {
    return edges.filter((e) => e.prerequisiteNodeId === nodeId).length
  }

  function sortByLevel(list: RoutingNode[]): RoutingNode[] {
    if (level === 'EASY') {
      return [...list].sort((a, b) => prereqCount(a.id) - prereqCount(b.id))
    }
    if (level === 'HARD') {
      return [...list].sort((a, b) => dependentCount(b.id) - dependentCount(a.id))
    }
    return list // MEDIUM: bestehende Reihenfolge beibehalten
  }

  const nonBlocked = prioritize(
    sortByLevel(candidates.filter((n) => (consecutiveFailures.get(n.id) ?? 0) < blockThreshold))
  )

  if (nonBlocked.length > 0) {
    return { nodeId: nonBlocked[0].id, reason: 'next-optimal' }
  }

  const sorted = prioritize(
    sortByLevel(
      [...candidates].sort(
        (a, b) => (consecutiveFailures.get(a.id) ?? 0) - (consecutiveFailures.get(b.id) ?? 0)
      )
    )
  )
  return { nodeId: sorted[0].id, reason: 'deprioritized' }
}

/**
 * Gibt die direkten Voraussetzungsknoten für einen Knoten zurück.
 */
export function getPrerequisites(
  nodeId: string,
  edges: RoutingEdge[],
  nodes: RoutingNode[]
): RoutingNode[] {
  const prereqIds = new Set(
    edges.filter((e) => e.dependentNodeId === nodeId).map((e) => e.prerequisiteNodeId)
  )
  return nodes.filter((n) => prereqIds.has(n.id))
}
