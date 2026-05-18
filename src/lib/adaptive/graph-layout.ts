export interface LayoutEdge {
  from: string // prerequisiteNodeId
  to: string   // dependentNodeId
}

export interface LayoutNode {
  id: string
  level: number
  x: number
  y: number
}

// Horizontales Layout: Ebenen wachsen nach rechts, Knoten einer Ebene vertikal gestapelt.
// Labels hängen unter dem Kreis → kein Überlappen mit der nächsten Spalte.
const LEVEL_WIDTH = 130   // horizontaler Abstand zwischen Spalten (nur Kreis, kein Label)
const NODE_SPACING = 84   // vertikaler Abstand zwischen Knoten (Kreis ⌀32 + Label 36 + Luft)
const PADDING_X = 60      // linker Rand
const PADDING_Y = 30      // oberer Rand
const LABEL_HEIGHT = 36   // Höhe des Labels unterhalb des Kreises (2 Zeilen à 14px + Gap)

export interface LayoutResult {
  nodes: LayoutNode[]
  canvasWidth: number
  canvasHeight: number
}

/**
 * Berechnet SVG-Positionen für einen gerichteten Graphen (links → rechts).
 * Labels hängen unter dem Kreis, deshalb wächst canvasHeight mit Knoten pro Ebene.
 */
export function computeLayout(nodeIds: string[], edges: LayoutEdge[]): LayoutResult {
  if (nodeIds.length === 0) return { nodes: [], canvasWidth: 400, canvasHeight: 200 }

  const children = new Map<string, string[]>()
  for (const id of nodeIds) children.set(id, [])

  const validEdges = edges.filter(
    (e) => children.has(e.from) && children.has(e.to)
  )
  for (const e of validEdges) {
    children.get(e.from)!.push(e.to)
  }

  const inDegree = new Map<string, number>()
  for (const id of nodeIds) inDegree.set(id, 0)
  for (const e of validEdges) {
    inDegree.set(e.to, (inDegree.get(e.to) ?? 0) + 1)
  }

  const level = new Map<string, number>()
  const queue: string[] = []

  for (const id of nodeIds) {
    if ((inDegree.get(id) ?? 0) === 0) {
      level.set(id, 0)
      queue.push(id)
    }
  }

  if (queue.length === 0) {
    for (const id of nodeIds) {
      level.set(id, 0)
      queue.push(id)
    }
  }

  const visited = new Set<string>()
  while (queue.length > 0) {
    const id = queue.shift()!
    if (visited.has(id)) continue
    visited.add(id)

    for (const child of children.get(id) ?? []) {
      const newLevel = (level.get(id) ?? 0) + 1
      if (!level.has(child) || level.get(child)! < newLevel) {
        level.set(child, newLevel)
      }
      if (!visited.has(child)) queue.push(child)
    }
  }

  for (const id of nodeIds) {
    if (!level.has(id)) level.set(id, 0)
  }

  const byLevel = new Map<number, string[]>()
  for (const id of nodeIds) {
    const l = level.get(id)!
    if (!byLevel.has(l)) byLevel.set(l, [])
    byLevel.get(l)!.push(id)
  }

  let maxNodesPerLevel = 0
  let maxLevel = 0
  for (const [l, ids] of byLevel) {
    maxNodesPerLevel = Math.max(maxNodesPerLevel, ids.length)
    maxLevel = Math.max(maxLevel, l)
  }

  const canvasWidth = PADDING_X * 2 + maxLevel * LEVEL_WIDTH
  const canvasHeight = PADDING_Y * 2 + (maxNodesPerLevel - 1) * NODE_SPACING + LABEL_HEIGHT + 32

  const result: LayoutNode[] = []
  for (const [l, ids] of byLevel) {
    const count = ids.length
    const totalHeight = (count - 1) * NODE_SPACING
    const startY = (canvasHeight - LABEL_HEIGHT - totalHeight) / 2

    ids.forEach((id, i) => {
      result.push({
        id,
        level: l,
        x: PADDING_X + l * LEVEL_WIDTH,
        y: startY + i * NODE_SPACING,
      })
    })
  }

  return { nodes: result, canvasWidth, canvasHeight }
}
