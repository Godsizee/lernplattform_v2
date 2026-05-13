'use client'

import { useEffect, useState } from 'react'

interface Props {
  nodeTitle: string
  onContinue: () => void
}

export default function BeherrschtMoment({ nodeTitle, onContinue }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Kurze Verzögerung damit die Animation sichtbar ist
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex flex-col items-center py-12 text-center" role="status" aria-live="polite">
      <div
        className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 transition-opacity ${
          visible ? 'animate-pop-in opacity-100' : 'opacity-0'
        }`}
      >
        <svg
          className="h-10 w-10 text-green-600"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <p className="mb-1 text-lg font-semibold text-gray-900 dark:text-slate-100">Beherrscht!</p>
      <p className="mb-8 text-sm text-gray-500 dark:text-slate-500">
        <strong className="text-gray-700 dark:text-slate-300">{nodeTitle}</strong> ist jetzt in deinem Kompetenzgraph markiert.
      </p>

      <button
        onClick={onContinue}
        className="rounded-xl bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        Nächstes Konzept →
      </button>
    </div>
  )
}
