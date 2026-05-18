interface Props {
  hints: string[]
  hintLevel: number
  loading: boolean
  onRequest: () => void
}

export default function HintPanel({ hints, hintLevel, loading, onRequest }: Props) {
  const canRequest = hintLevel < 3 && !loading

  return (
    <div className="space-y-3">
      {hints.map((hint, i) => (
        <div
          key={i}
          className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 dark:border-amber-800 dark:bg-amber-950"
          role="note"
          aria-label={`Hinweis ${i + 1}`}
        >
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-amber-500 dark:text-amber-400">
            Hinweis {i + 1}
          </p>
          <p className="text-sm leading-relaxed text-amber-900 dark:text-amber-300">{hint}</p>
        </div>
      ))}

      <button
        type="button"
        onClick={onRequest}
        disabled={!canRequest}
        className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 ${
          canRequest
            ? 'border-amber-200 bg-white text-amber-700 hover:bg-amber-50 dark:border-amber-800 dark:bg-slate-900 dark:text-amber-300 dark:hover:bg-amber-950'
            : 'cursor-not-allowed border-gray-100 bg-gray-50 text-gray-400 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-500'
        }`}
        aria-disabled={!canRequest}
      >
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
        {loading
          ? 'Hinweis lädt…'
          : hintLevel >= 3
          ? 'Kein weiterer Hinweis'
          : hintLevel === 0
          ? 'Hinweis anfordern'
          : `Hinweis ${hintLevel + 1} anfordern`}
      </button>
    </div>
  )
}
