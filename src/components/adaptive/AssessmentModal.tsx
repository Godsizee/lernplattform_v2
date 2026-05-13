'use client'

import { useState, useEffect } from 'react'

interface AssessmentQuestion {
  question: string
  options: string[]
  correctIndex: number
}

interface Props {
  subjectId: string
  subjectName: string
  onComplete: () => void
}

type ModalState = 'intro' | 'loading' | 'question' | 'submitting' | 'done' | 'error'

function levelFromCount(correct: number, total: number): { label: string; description: string } {
  const ratio = total > 0 ? correct / total : 0
  if (ratio <= 1 / 3) return { label: 'Einsteiger', description: 'Das System startet mit den Grundlagen und steigert sich schrittweise.' }
  if (ratio < 1)      return { label: 'Fortgeschritten', description: 'Du kennst bereits Teile des Stoffs — das System setzt auf einer soliden Basis auf.' }
  return               { label: 'Experte', description: 'Starke Vorkenntnisse! Das System startet mit anspruchsvolleren Konzepten.' }
}

export default function AssessmentModal({ subjectId, subjectName, onComplete }: Props) {
  const [state, setState] = useState<ModalState>('intro')
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [finalCorrectCount, setFinalCorrectCount] = useState(0)
  const [errorMsg, setErrorMsg] = useState('')

  function startAssessment() {
    setState('loading')
    fetch('/api/adaptive/assessment/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subjectId }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.questions?.length > 0) {
          setQuestions(data.questions)
          setState('question')
        } else {
          setErrorMsg('Fragen konnten nicht geladen werden.')
          setState('error')
        }
      })
      .catch(() => {
        setErrorMsg('Verbindungsfehler beim Laden der Fragen.')
        setState('error')
      })
  }

  function handleAnswer() {
    if (selectedOption === null) return
    const isCorrect = selectedOption === questions[currentIndex].correctIndex
    const newCorrectCount = correctCount + (isCorrect ? 1 : 0)

    if (currentIndex + 1 < questions.length) {
      setCorrectCount(newCorrectCount)
      setCurrentIndex((i) => i + 1)
      setSelectedOption(null)
    } else {
      setState('submitting')
      setFinalCorrectCount(newCorrectCount)
      fetch('/api/adaptive/assessment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subjectId, correctCount: newCorrectCount }),
      })
        .then(() => setState('done'))
        .catch(() => {
          setErrorMsg('Einschätzung konnte nicht gespeichert werden.')
          setState('error')
        })
    }
  }

  const current = questions[currentIndex]
  const result = state === 'done' ? levelFromCount(finalCorrectCount, questions.length) : null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 p-8 shadow-xl">

        {state === 'intro' && (
          <>
            <p className="text-xs font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-4">
              Selbsteinschätzung — {subjectName}
            </p>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-3">
              Wie gut kennst du dich bereits aus?
            </h2>
            <p className="text-sm text-gray-600 dark:text-slate-400 mb-2">
              Bevor du anfängst zu lernen, stellen wir dir {' '}
              <strong className="text-gray-800 dark:text-slate-200">3 kurze Fragen</strong> zu diesem Fach.
            </p>
            <p className="text-sm text-gray-600 dark:text-slate-400 mb-6">
              Anhand deiner Antworten passt das System das Schwierigkeitsniveau automatisch an — so fängst du genau dort an, wo es für dich sinnvoll ist.
            </p>
            <div className="flex gap-3">
              <button
                onClick={startAssessment}
                className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Einschätzung starten
              </button>
              <button
                onClick={onComplete}
                className="rounded-xl border border-gray-200 dark:border-slate-700 px-4 py-3 text-sm text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                Überspringen
              </button>
            </div>
          </>
        )}

        {state === 'loading' && (
          <div className="text-center">
            <p className="text-gray-500 dark:text-slate-400">Fragen werden geladen...</p>
          </div>
        )}

        {state === 'question' && current && (
          <>
            <div className="mb-6">
              <p className="text-xs font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">
                Selbsteinschätzung — {subjectName}
              </p>
              <p className="mt-1 text-xs text-gray-400 dark:text-slate-500">
                Frage {currentIndex + 1} von {questions.length}
              </p>
            </div>

            <p className="mb-5 text-base font-medium text-gray-900 dark:text-slate-100">
              {current.question}
            </p>

            <div className="space-y-2">
              {current.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedOption(i)}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                    selectedOption === i
                      ? 'border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-100'
                      : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  <span className="font-medium mr-2">{String.fromCharCode(65 + i)})</span>
                  {option}
                </button>
              ))}
            </div>

            <button
              onClick={handleAnswer}
              disabled={selectedOption === null}
              className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {currentIndex + 1 < questions.length ? 'Weiter' : 'Abschließen'}
            </button>
          </>
        )}

        {state === 'submitting' && (
          <div className="text-center">
            <p className="text-gray-500 dark:text-slate-400">Einschätzung wird gespeichert...</p>
          </div>
        )}

        {state === 'done' && result && (
          <>
            <p className="text-xs font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-4">
              Ergebnis — {subjectName}
            </p>
            <div className="mb-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900 dark:text-slate-100">
                {finalCorrectCount}/{questions.length}
              </span>
              <span className="text-sm text-gray-500 dark:text-slate-400">richtig</span>
            </div>
            <p className="mb-1 text-base font-semibold text-gray-900 dark:text-slate-100">
              Niveau: {result.label}
            </p>
            <p className="mb-6 text-sm text-gray-600 dark:text-slate-400">
              {result.description}
            </p>
            <button
              onClick={onComplete}
              className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Lernen starten
            </button>
          </>
        )}

        {state === 'error' && (
          <div className="text-center">
            <p className="mb-4 text-sm text-red-600 dark:text-red-400">{errorMsg}</p>
            <button
              onClick={onComplete}
              className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-slate-800 dark:text-slate-300"
            >
              Überspringen
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
