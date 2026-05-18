export type NodeColor = 'mastered' | 'not-started' | 'critical' | 'warning'

/**
 * Berechnet den Weakness Score (0–100) aus Attempt-Daten.
 * Gibt null zurück wenn totalAttempts = 0.
 */
export function computeWeaknessScore(
  totalAttempts: number,
  wrongAnswers: number
): number | null {
  if (totalAttempts === 0) return null
  return Math.round((wrongAnswers / totalAttempts) * 100)
}

/**
 * Bestimmt die Farb-Kategorie eines Knotens.
 * Priorität: mastered > not-started > critical > warning > mastered(score=0)
 */
export function getNodeColor(node: {
  mastered: boolean
  weaknessScore: number | null
}): NodeColor {
  if (node.mastered) return 'mastered'
  if (node.weaknessScore === null) return 'not-started'
  if (node.weaknessScore >= 60) return 'critical'
  if (node.weaknessScore >= 1) return 'warning'
  return 'mastered' // score = 0, Versuche vorhanden, alle richtig
}
