import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/db/client'

/**
 * POST /api/concept-nodes/merge
 * Body: { keepId: string, deleteId: string }
 *
 * Behält keepId, migriert Kanten von deleteId → keepId, löscht deleteId.
 * Auth-Check: Nutzer muss Eigentümer beider Knoten sein.
 */
export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })

  const { keepId, deleteId } = await req.json()
  if (!keepId || !deleteId || keepId === deleteId) {
    return NextResponse.json({ error: 'Ungültige Knoten-IDs' }, { status: 400 })
  }

  const userId = session.user.id

  // Eigentümer-Check
  const [keep, del] = await Promise.all([
    prisma.conceptNode.findUnique({ where: { id: keepId } }),
    prisma.conceptNode.findUnique({ where: { id: deleteId } }),
  ])

  if (!keep || keep.userId !== userId) {
    return NextResponse.json({ error: 'Knoten nicht gefunden' }, { status: 404 })
  }
  if (!del || del.userId !== userId) {
    return NextResponse.json({ error: 'Knoten nicht gefunden' }, { status: 404 })
  }

  await prisma.$transaction(async (tx) => {
    // Alle Kanten des zu löschenden Knotens lesen
    const oldEdges = await tx.conceptEdge.findMany({
      where: {
        OR: [{ prerequisiteNodeId: deleteId }, { dependentNodeId: deleteId }],
      },
    })

    // Kanten auf keepId ummappen, Selbst-Schleifen herausfiltern
    const newEdges = oldEdges
      .map((edge) => ({
        prerequisiteNodeId:
          edge.prerequisiteNodeId === deleteId ? keepId : edge.prerequisiteNodeId,
        dependentNodeId:
          edge.dependentNodeId === deleteId ? keepId : edge.dependentNodeId,
      }))
      .filter((edge) => edge.prerequisiteNodeId !== edge.dependentNodeId)

    // Knoten löschen (Cascade löscht seine Kanten)
    await tx.conceptNode.delete({ where: { id: deleteId } })

    // Neue Kanten anlegen (skipDuplicates verhindert Konflikte mit keepId-Kanten)
    if (newEdges.length > 0) {
      await tx.conceptEdge.createMany({ data: newEdges, skipDuplicates: true })
    }
  })

  return NextResponse.json({ success: true })
}
