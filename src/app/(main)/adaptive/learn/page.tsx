import { auth } from '@/lib/auth'
import prisma from '@/db/client'
import { redirect } from 'next/navigation'
import LearnClient from '@/components/adaptive/learn/LearnClient'
import { computeConsecutiveFailures, getNextNode } from '@/lib/adaptive/adaptive-routing'
import type { AssessmentLevel } from '@/lib/adaptive/adaptive-routing'
import { getActiveSubjectId, getSubjectDocumentIds } from '@/lib/adaptive/subject-cookie'

export default async function LearnPage({
  searchParams,
}: {
  searchParams: Promise<{ nodeId?: string }>
}) {
  const session = await auth()
  if (!session) redirect('/login')
  const { nodeId: initialNodeId } = await searchParams

  const userId = session.user.id

  const activeSubjectId = await getActiveSubjectId()
  const subjectDocIds = await getSubjectDocumentIds(userId, activeSubjectId)
  const docFilter = subjectDocIds !== null ? { documentId: { in: subjectDocIds } } : {}

  const [nodes, edges, masteredRows, recentAttempts, nextExam, assessment] = await Promise.all([
    prisma.conceptNode.findMany({
      where: { userId, ...docFilter },
      select: { id: true, title: true, description: true, documentId: true, document: { select: { filename: true } } },
      orderBy: { createdAt: 'asc' },
    }),
    prisma.conceptEdge.findMany({
      where: { prerequisiteNode: { userId } },
      select: { prerequisiteNodeId: true, dependentNodeId: true },
    }),
    prisma.nodeMastery.findMany({
      where: { userId },
      select: { nodeId: true },
    }),
    prisma.taskAttempt.findMany({
      where: { userId },
      orderBy: { submittedAt: 'desc' },
      take: 100,
      select: { isCorrect: true, cachedTask: { select: { nodeId: true } } },
    }),
    prisma.exam.findFirst({
      where: { userId, examDate: { gte: new Date() } },
      orderBy: { examDate: 'asc' },
      select: { title: true, examDate: true, documents: { select: { id: true } } },
    }),
    prisma.subjectAssessment.findUnique({
      where: {
        userId_subjectId: {
          userId,
          subjectId: activeSubjectId ?? '',
        },
      },
      select: { level: true },
    }),
  ])

  if (nodes.length === 0) {
    return (
      <main className="px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl bg-white p-10 shadow-sm text-center dark:bg-slate-900">
            <p className="text-gray-500 dark:text-slate-400">
              Noch keine Konzeptknoten vorhanden.{' '}
              <a href="/adaptive/upload" className="text-blue-600 hover:underline dark:text-blue-400">
                Lade dein erstes Lernmaterial hoch.
              </a>
            </p>
          </div>
        </div>
      </main>
    )
  }

  const masteredIds = new Set(masteredRows.map((r) => r.nodeId))

  const assessmentLevel: AssessmentLevel = (assessment?.level as AssessmentLevel) ?? 'MEDIUM'
  const needsAssessment = !assessment && nodes.length > 0 && !!activeSubjectId

  const consecutiveFailures = computeConsecutiveFailures(
    recentAttempts.map((a) => ({ nodeId: a.cachedTask.nodeId, isCorrect: a.isCorrect }))
  )

  const examDocumentIds = nextExam?.documents.length
    ? new Set(nextExam.documents.map((d) => d.id))
    : null

  const { nodeId: recommendedNodeId, reason } = getNextNode(
    nodes,
    edges,
    masteredIds,
    consecutiveFailures,
    undefined,
    examDocumentIds,
    assessmentLevel
  )

  const nodesWithMastery = nodes.map((n) => ({
    ...n,
    mastered: masteredIds.has(n.id),
  }))

  const allMastered = reason === 'all-mastered'

  const activeExam = nextExam
    ? {
        title: nextExam.title,
        examDate: nextExam.examDate.toISOString(),
        documentIds: nextExam.documents.map((d) => d.id),
      }
    : null

  return (
    <main className="px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-slate-100">Lernen</h1>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-slate-400">
            {nodes.filter(n => masteredIds.has(n.id)).length} von {nodes.length} Konzepten beherrscht
          </p>
        </div>

        {allMastered ? (
          <div className="rounded-2xl bg-green-50 p-10 shadow-sm text-center dark:bg-green-950">
            <p className="text-lg font-semibold text-green-800 dark:text-green-400">Alle Konzepte beherrscht!</p>
            <p className="mt-2 text-sm text-green-700 dark:text-green-400">
              Lade neues Lernmaterial hoch, um weiterzumachen.
            </p>
            <a
              href="/adaptive/upload"
              className="mt-4 inline-block rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
            >
              Lernmaterial hochladen
            </a>
          </div>
        ) : (
          <LearnClient
            nodes={nodesWithMastery}
            edges={edges}
            recommendedNodeId={recommendedNodeId}
            initialNodeId={initialNodeId ?? null}
            activeExam={activeExam}
            needsAssessment={needsAssessment}
            activeSubjectId={activeSubjectId ?? null}
            assessmentLevel={assessmentLevel}
          />
        )}
      </div>
    </main>
  )
}
