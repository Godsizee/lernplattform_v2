interface Exam {
  title: string
  examDate: string
}

interface Props {
  title: string
  description: string
  mastered: boolean
  recommended: boolean
  exam?: Exam | null
  onStart: () => void
}

export default function KnotenCard({ title, description, mastered, recommended, exam, onStart }: Props) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100">{title}</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-gray-500 dark:text-slate-500">{description}</p>
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
            mastered
              ? 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400'
              : recommended
              ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400'
              : 'bg-gray-100 text-gray-500 dark:bg-slate-700 dark:text-slate-400'
          }`}
        >
          {mastered ? 'Beherrscht' : recommended ? 'Empfohlen' : 'Offen'}
        </span>
      </div>

      {exam && (
        <div className="mb-6 flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-3 text-sm text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          <span>
            Empfohlen für <strong>{exam.title}</strong> am{' '}
            {new Date(exam.examDate).toLocaleDateString('de-DE', {
              day: 'numeric',
              month: 'long',
            })}
          </span>
        </div>
      )}

      <button
        onClick={onStart}
        className="w-full rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        Aufgabe starten →
      </button>
    </div>
  )
}
