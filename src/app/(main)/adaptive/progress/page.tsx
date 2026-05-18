import { auth } from '@/lib/auth'
import prisma from '@/db/client'
import { redirect } from 'next/navigation'
import { getActiveSubjectId, getSubjectDocumentIds } from '@/lib/adaptive/subject-cookie'
import AssessmentResetButton from '@/components/adaptive/AssessmentResetButton'

export default async function ProgressPage() {
  const session = await auth()
  if (!session) redirect('/login')

  const userId = session.user.id

  const activeSubjectId = await getActiveSubjectId()
  const subjectDocIds = await getSubjectDocumentIds(userId, activeSubjectId)

  const docFilter = subjectDocIds !== null ? { documentId: { in: subjectDocIds } } : {}

  const [masteredNodes, totalCount] = await Promise.all([
    prisma.nodeMastery.findMany({
      where: { userId, node: docFilter },
      include: {
        node: {
          select: { title: true, description: true, document: { select: { filename: true } } },
        },
      },
      orderBy: { masteredAt: 'desc' },
    }),
    prisma.conceptNode.count({ where: { userId, ...docFilter } }),
  ])

  const assessment = await prisma.subjectAssessment.findUnique({
    where: {
      userId_subjectId: {
        userId,
        subjectId: activeSubjectId ?? '',
      },
    },
    select: { level: true },
  })

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-900 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <a href="/dashboard" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
            ← Dashboard
          </a>
        </div>

        <h1 className="mb-1 text-2xl font-semibold text-gray-900 dark:text-slate-100">Lernfortschritt</h1>
        <p className="mb-6 text-sm text-gray-500 dark:text-slate-500">
          {masteredNodes.length} von {totalCount} Konzepten beherrscht
        </p>

        {/* Fortschrittsbalken */}
        <div className="mb-8 h-2.5 w-full rounded-full bg-gray-200 dark:bg-slate-700">
          <div
            className="h-2.5 rounded-full bg-green-500 transition-all"
            style={{
              width: totalCount > 0 ? `${(masteredNodes.length / totalCount) * 100}%` : '0%',
            }}
          />
        </div>

        {activeSubjectId && (
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs text-gray-400 dark:text-slate-500">
              Aktuelles Niveau:{' '}
              <span className="font-medium text-gray-600 dark:text-slate-400">
                {assessment?.level === 'EASY'
                  ? 'Einsteiger'
                  : assessment?.level === 'HARD'
                  ? 'Fortgeschritten'
                  : assessment
                  ? 'Mittelstufe'
                  : 'Noch nicht eingeschätzt'}
              </span>
            </p>
            <AssessmentResetButton subjectId={activeSubjectId} />
          </div>
        )}

        {masteredNodes.length === 0 ? (
          <div className="rounded-xl bg-white dark:bg-slate-800 p-10 shadow-sm text-center">
            <p className="text-gray-500 dark:text-slate-500">
              Noch keine beherrschten Knoten —{' '}
              <a href="/adaptive/learn" className="text-blue-600 hover:underline dark:text-blue-400">
                löse deine erste Aufgabe!
              </a>
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {masteredNodes.map(({ node, masteredAt, id }) => (
              <li key={id} className="rounded-xl bg-white dark:bg-slate-800 p-4 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 shrink-0 text-green-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="font-medium text-gray-900 dark:text-slate-100">{node.title}</p>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-slate-500 truncate">{node.description}</p>
                    <p className="mt-1 text-xs text-gray-400 dark:text-slate-500">
                      aus: {node.document.filename}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="rounded-full bg-green-50 dark:bg-green-950 px-2 py-0.5 text-xs font-medium text-green-700 dark:text-green-400">
                      Beherrscht
                    </span>
                    <p className="mt-1 text-xs text-gray-400 dark:text-slate-500">
                      {new Date(masteredAt).toLocaleDateString('de-DE')}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
