import { auth } from '@/lib/auth'
import prisma from '@/db/client'
import { redirect } from 'next/navigation'
import ExamsClient from '@/components/adaptive/exams/ExamsClient'

export default async function ExamsPage() {
  const session = await auth()
  if (!session) redirect('/login')

  const userId = session.user.id

  const [exams, documents, subjects, allNodes] = await Promise.all([
    prisma.exam.findMany({
      where: { userId },
      orderBy: { examDate: 'asc' },
      select: {
        id: true,
        title: true,
        examDate: true,
        documents: { select: { id: true, filename: true } },
        nodes: { select: { id: true } },
      },
    }),
    prisma.document.findMany({
      where: { userId },
      select: { id: true, filename: true, subjectId: true },
      orderBy: { uploadedAt: 'desc' },
    }),
    prisma.subject.findMany({
      where: { userId },
      select: { id: true, title: true, color: true },
      orderBy: { title: 'asc' },
    }),
    prisma.conceptNode.findMany({
      where: { userId },
      select: { id: true, title: true, documentId: true },
      orderBy: { createdAt: 'asc' },
    }),
  ])

  const examsWithStats = await Promise.all(
    exams.map(async (exam) => {
      const docIds = exam.documents.map((d: { id: string }) => d.id)
      const directNodeIds = exam.nodes.map((n: { id: string }) => n.id)

      if (docIds.length === 0 && directNodeIds.length === 0) {
        return {
          ...exam,
          examDate: exam.examDate.toISOString(),
          nodeIds: directNodeIds,
          openNodes: null,
          totalNodes: null,
        }
      }

      const docNodeIds = docIds.length > 0
        ? (await prisma.conceptNode.findMany({
            where: { userId, documentId: { in: docIds } },
            select: { id: true },
          })).map((n) => n.id)
        : []
      const allNodeIds = [...new Set([...docNodeIds, ...directNodeIds])]

      const [totalNodes, masteredNodes] = await Promise.all([
        Promise.resolve(allNodeIds.length),
        prisma.nodeMastery.count({ where: { userId, nodeId: { in: allNodeIds } } }),
      ])

      return {
        ...exam,
        examDate: exam.examDate.toISOString(),
        nodeIds: directNodeIds,
        totalNodes,
        openNodes: totalNodes - masteredNodes,
      }
    })
  )

  return (
    <main className="px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-slate-100">Klausurtermine</h1>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-slate-500">
            Verwalte deine Klausurtermine für deadline-optimiertes Lernen.
          </p>
        </div>

        <ExamsClient
          exams={examsWithStats}
          documents={documents}
          subjects={subjects}
          allNodes={allNodes}
        />
      </div>
    </main>
  )
}
