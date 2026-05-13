import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/db/client'
import { getActiveSubjectId, getSubjectDocumentIds } from '@/lib/adaptive/subject-cookie'
import { computeWeaknessScore } from '@/lib/adaptive/weakness-score'

export interface WeakNode {
  id: string
  title: string
  mastered: boolean
  weaknessScore: number | null
  stats: {
    totalAttempts: number
    wrongAnswers: number
  }
}

export interface WeakEdge {
  from: string
  to: string
}

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }
  const userId = session.user.id

  const activeSubjectId = await getActiveSubjectId()
  const docIds = await getSubjectDocumentIds(userId, activeSubjectId)

  const nodes = await prisma.conceptNode.findMany({
    where: {
      userId,
      ...(docIds !== null ? { documentId: { in: docIds } } : {}),
    },
    select: {
      id: true,
      title: true,
      cachedTasks: {
        select: {
          attempts: {
            where: { userId },
            select: { isCorrect: true },
          },
        },
      },
      mastery: {
        where: { userId },
        select: { id: true },
        take: 1,
      },
    },
    orderBy: { createdAt: 'asc' },
  })

  const nodeIds = nodes.map((n) => n.id)

  const edges = await prisma.conceptEdge.findMany({
    where: {
      prerequisiteNodeId: { in: nodeIds },
      dependentNodeId: { in: nodeIds },
    },
    select: { prerequisiteNodeId: true, dependentNodeId: true },
  })

  const weakNodes: WeakNode[] = nodes.map((n) => {
    const allAttempts = n.cachedTasks.flatMap((t) => t.attempts)
    const totalAttempts = allAttempts.length
    const wrongAnswers = allAttempts.filter((a) => !a.isCorrect).length
    const weaknessScore = computeWeaknessScore(totalAttempts, wrongAnswers)
    const mastered = n.mastery.length > 0

    return {
      id: n.id,
      title: n.title,
      mastered,
      weaknessScore,
      stats: { totalAttempts, wrongAnswers },
    }
  })

  const weakEdges: WeakEdge[] = edges.map((e) => ({
    from: e.prerequisiteNodeId,
    to: e.dependentNodeId,
  }))

  return NextResponse.json({ nodes: weakNodes, edges: weakEdges })
}
