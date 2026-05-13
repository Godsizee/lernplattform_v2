import { auth } from '@/lib/auth'
import prisma from '@/db/client'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect('/login')

  const userId = session.user.id

  const [lastSession, masteredCount, totalCount, nextExam] = await Promise.all([
    prisma.learningSession.findUnique({
      where: { userId },
      include: { lastNode: { select: { title: true } } },
    }),
    prisma.nodeMastery.count({ where: { userId } }),
    prisma.conceptNode.count({ where: { userId } }),
    prisma.exam.findFirst({
      where: { userId, examDate: { gte: new Date() } },
      orderBy: { examDate: 'asc' },
      select: { title: true, examDate: true },
    }),
  ])

  const daysUntilExam = nextExam
    ? (() => {
        const now = new Date()
        now.setHours(0, 0, 0, 0)
        const exam = new Date(nextExam.examDate)
        exam.setHours(0, 0, 0, 0)
        return Math.round((exam.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      })()
    : null

  return (
    <main className="px-4 py-12">
      <div className="mx-auto max-w-sm text-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-slate-100">
          Hallo, {session.user?.name ?? session.user?.email?.split('@')[0] ?? 'Lernender'}!
        </h1>

        {lastSession?.lastNode ? (
          <p className="mt-2 text-sm text-gray-500 dark:text-slate-500">
            Zuletzt bei:{' '}
            <a href="/adaptive/learn" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
              {lastSession.lastNode.title}
            </a>
          </p>
        ) : totalCount === 0 ? (
          <p className="mt-2 text-sm text-gray-500 dark:text-slate-500">
            Lade dein erstes Lernmaterial hoch, um zu beginnen.
          </p>
        ) : null}

        {/* Fortschrittsbalken */}
        {totalCount > 0 && (
          <div className="mt-6 rounded-2xl bg-white dark:bg-slate-800 px-6 py-5 shadow-sm">
            <div className="mb-2 flex items-center justify-between text-xs text-gray-500 dark:text-slate-500">
              <span>Gesamtfortschritt</span>
              <span>
                <span className="font-semibold text-gray-900 dark:text-slate-100">{masteredCount}</span> / {totalCount} Konzepte
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-slate-700">
              <div
                className="h-2 rounded-full bg-green-500 transition-all"
                style={{ width: `${totalCount > 0 ? (masteredCount / totalCount) * 100 : 0}%` }}
                aria-valuenow={masteredCount}
                aria-valuemax={totalCount}
                role="progressbar"
              />
            </div>
          </div>
        )}

        {/* Klausur-Hinweis */}
        {nextExam && daysUntilExam !== null && (
          <div className="mt-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950 px-6 py-4 shadow-sm">
            <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">{nextExam.title}</p>
            <p className="mt-0.5 text-xs text-indigo-600 dark:text-indigo-400">
              {daysUntilExam <= 0
                ? 'Klausur ist heute!'
                : `In ${daysUntilExam} Tag${daysUntilExam === 1 ? '' : 'en'}`}
            </p>
          </div>
        )}

        {/* Primäre Aktion */}
        <div className="mt-6">
          {totalCount === 0 ? (
            <a
              href="/adaptive/upload"
              className="block w-full rounded-2xl bg-blue-600 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              Lernmaterial hochladen
            </a>
          ) : (
            <a
              href="/adaptive/learn"
              className="block w-full rounded-2xl bg-blue-600 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              {lastSession?.lastNode ? 'Weiterlernen' : 'Lernen starten'}
            </a>
          )}
        </div>
      </div>
    </main>
  )
}
