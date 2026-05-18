interface Step {
  id: string
  label: string
}

const STEPS: Step[] = [
  { id: 'concept', label: 'Konzept' },
  { id: 'task', label: 'Aufgabe' },
  { id: 'evaluation', label: 'Antwort' },
  { id: 'next', label: 'Weiter' },
]

type WizardStep = 'concept' | 'task' | 'evaluation' | 'next'

export default function WizardProgress({ currentStep }: { currentStep: WizardStep }) {
  const currentIndex = STEPS.findIndex((s) => s.id === currentStep)

  return (
    <nav aria-label="Lernfortschritt" className="mb-8">
      <ol className="flex items-center justify-center gap-0">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentIndex
          const isCurrent = index === currentIndex
          const isLast = index === STEPS.length - 1

          return (
            <li key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isCurrent
                      ? 'bg-blue-600 text-white shadow-sm ring-4 ring-blue-100 dark:ring-blue-900'
                      : 'bg-gray-100 text-gray-400 dark:bg-slate-700 dark:text-slate-500'
                  }`}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span
                  className={`mt-1.5 text-xs font-medium ${
                    isCurrent ? 'text-blue-600 dark:text-blue-400' : isCompleted ? 'text-green-600' : 'text-gray-400 dark:text-slate-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {!isLast && (
                <div
                  className={`mx-2 mb-5 h-0.5 w-12 transition-colors ${
                    isCompleted ? 'bg-green-400' : 'bg-gray-200 dark:bg-slate-700'
                  }`}
                  aria-hidden
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
