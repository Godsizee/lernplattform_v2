import { auth } from '@/lib/auth'
import prisma from '@/db/client'
import { redirect } from 'next/navigation'
import { getActiveSubjectId, getSubjectDocumentIds } from '@/lib/adaptive/subject-cookie'
import { computeWeaknessScore } from '@/lib/adaptive/weakness-score'
import GraphClient from '@/components/adaptive/graph/GraphClient'
import type { WeakNode, WeakEdge } from '@/app/api/adaptive/concept-nodes/weakness/route'

export default async function GraphPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const userId = session.user.id
  const activeSubjectId = await getActiveSubjectId()
  const docIds = await getSubjectDocumentIds(userId, activeSubjectId)

  const [nodes, edges] = await Promise.all([
    prisma.conceptNode.findMany({
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
    }),
    prisma.conceptEdge.findMany({
      where: { prerequisiteNode: { userId } },
      select: { prerequisiteNodeId: true, dependentNodeId: true },
    }),
  ])

  if (nodes.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-slate-800 px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6">
            <a href="/dashboard" className="text-sm text-blue-600 hover:underline dark:text-blue-400">← Dashboard</a>
          </div>
          <div className="rounded-xl bg-white dark:bg-slate-900 p-10 shadow-sm text-center">
            <p className="text-gray-500">
              Kein Kompetenzgraph vorhanden.{' '}
              <a href="/adaptive/upload" className="text-blue-600 hover:underline">
                Lade ein Lernmaterial hoch.
              </a>
            </p>
          </div>
        </div>
      </main>
    )
  }

  const nodeIds = nodes.map((n) => n.id)
  const filteredEdges = edges.filter(
    (e) => nodeIds.includes(e.prerequisiteNodeId) && nodeIds.includes(e.dependentNodeId)
  )

  const weakNodes: WeakNode[] = nodes.map((n) => {
    const allAttempts = n.cachedTasks.flatMap((t) => t.attempts)
    const totalAttempts = allAttempts.length
    const wrongAnswers = allAttempts.filter((a) => !a.isCorrect).length
    return {
      id: n.id,
      title: n.title,
      mastered: n.mastery.length > 0,
      weaknessScore: computeWeaknessScore(totalAttempts, wrongAnswers),
      stats: { totalAttempts, wrongAnswers },
    }
  })

  const weakEdges: WeakEdge[] = filteredEdges.map((e) => ({
    from: e.prerequisiteNodeId,
    to: e.dependentNodeId,
  }))

  const masteredCount = weakNodes.filter((n) => n.mastered).length
  const criticalCount = weakNodes.filter((n) => (n.weaknessScore ?? 0) >= 60).length

  const weakestNode = weakNodes
    .filter((n) => (n.weaknessScore ?? 0) > 0)
    .sort((a, b) => {
      const diff = (b.weaknessScore ?? 0) - (a.weaknessScore ?? 0)
      return diff !== 0 ? diff : a.title.localeCompare(b.title)
    })[0] ?? null

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-800 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4">
          <a href="/dashboard" className="text-sm text-blue-600 hover:underline dark:text-blue-400">← Dashboard</a>
        </div>

        <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-slate-100">Kompetenzgraph</h1>
            <p className="text-sm text-gray-500 dark:text-slate-500">
              {masteredCount} von {nodes.length} beherrscht
              {criticalCount > 0 && ` · ${criticalCount} kritisch`}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {weakestNode && (
              <a
                href={`/adaptive/learn?nodeId=${weakestNode.id}`}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Schwächsten üben →
              </a>
            )}
            <a
              href="/adaptive/learn"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Weiter lernen
            </a>
          </div>
        </div>

        <div className="rounded-xl bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
          <GraphClient nodes={weakNodes} edges={weakEdges} />
        </div>
      </div>
    </main>
  )
}
