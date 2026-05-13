'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getPrerequisites, getNextNode, BLOCK_THRESHOLD } from '@/lib/adaptive/adaptive-routing'
import type { AssessmentLevel } from '@/lib/adaptive/adaptive-routing'
import AssessmentModal from '@/components/adaptive/AssessmentModal'
import WizardProgress from '@/components/adaptive/learn/WizardProgress'
import KnotenCard from '@/components/adaptive/learn/KnotenCard'
import HintPanel from '@/components/adaptive/learn/HintPanel'
import BeherrschtMoment from '@/components/adaptive/learn/BeherrschtMoment'
import QueueStatus from '@/components/adaptive/QueueStatus'

type WizardStep = 'concept' | 'task' | 'evaluation' | 'next'

interface Node {
  id: string
  title: string
  description: string
  documentId: string
  mastered: boolean
  document: { filename: string }
}

interface Edge {
  prerequisiteNodeId: string
  dependentNodeId: string
}

interface Task {
  id: string
  nodeId: string
  nodeTitle: string
  task: string
  meta: { cached: boolean; fallback: boolean }
}

interface EvalResult {
  correct: boolean
  errorType: string | null
  explanation: string
}

interface ActiveExam {
  title: string
  examDate: string
  documentIds: string[]
}

// ---------------------------------------------------------------------------
// Multiple-Choice-Erkennung
// ---------------------------------------------------------------------------

interface MCOption { label: string; text: string }

function parseMCOptions(text: string): MCOption[] | null {
  // Buchstaben-basiert: A) B) C) D) oder A. B. C. D.
  const letterMatches = [...text.matchAll(/^([A-Da-d])[).]\s*(.+)/gm)]
  if (letterMatches.length >= 2) {
    return letterMatches.map((m) => ({ label: m[1].toUpperCase(), text: m[2].trim() }))
  }
  // Symbol-basiert: ○ □ ● ■ ◯ ☐ — kein • (normales Aufzählungszeichen)
  const symbolMatches = [...text.matchAll(/^[○●◯◦□■▪▫☐]\s*(.+)/gm)]
  if (symbolMatches.length >= 2) {
    const labels = ['A', 'B', 'C', 'D', 'E']
    return symbolMatches
      .slice(0, 5)
      .map((m, i) => ({ label: labels[i], text: m[1].trim() }))
  }
  return null
}

// ---------------------------------------------------------------------------
// Blockaden-Prompt
// ---------------------------------------------------------------------------

function BlockadePrompt({
  currentNode,
  prerequisiteNodes,
  onGoBack,
  onContinue,
}: {
  currentNode: { title: string }
  prerequisiteNodes: { id: string; title: string }[]
  onGoBack: (nodeId: string) => void
  onContinue: () => void
}) {
  const prereq = prerequisiteNodes[0]

  return (
    <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-4 dark:border-orange-800 dark:bg-orange-950">
      <p className="mb-2 text-sm font-semibold text-orange-800 dark:text-orange-300">
        Du scheinst bei &bdquo;{currentNode.title}&ldquo; festzustecken.
      </p>
      {prereq ? (
        <>
          <p className="mb-3 text-sm text-orange-700 dark:text-orange-300">
            Möchtest du zunächst &bdquo;{prereq.title}&ldquo; wiederholen?
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => onGoBack(prereq.id)}
              className="rounded-lg bg-orange-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-orange-700"
            >
              Ja, zurückgehen
            </button>
            <button
              onClick={onContinue}
              className="rounded-lg border border-orange-200 bg-white px-3 py-1.5 text-xs font-medium text-orange-700 hover:bg-orange-50 dark:border-orange-800 dark:bg-slate-900 dark:text-orange-300 dark:hover:bg-orange-950"
            >
              Nein, weiterversuchen
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="mb-3 text-sm text-orange-700 dark:text-orange-300">
            Möchtest du eine andere Variante zu diesem Thema versuchen?
          </p>
          <button
            onClick={onContinue}
            className="rounded-lg bg-orange-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-orange-700"
          >
            Neue Variation versuchen
          </button>
        </>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Hauptkomponente
// ---------------------------------------------------------------------------

export default function LearnClient({
  nodes,
  edges,
  recommendedNodeId,
  initialNodeId,
  activeExam,
  needsAssessment,
  activeSubjectId,
  assessmentLevel,
}: {
  nodes: Node[]
  edges: Edge[]
  recommendedNodeId: string | null
  initialNodeId?: string | null
  activeExam?: ActiveExam | null
  needsAssessment: boolean
  activeSubjectId: string | null
  assessmentLevel: AssessmentLevel
}) {
  const router = useRouter()

  // Wizard-State
  const [step, setStep] = useState<WizardStep>('concept')
  const [selectedId, setSelectedId] = useState<string | null>(
    initialNodeId ?? recommendedNodeId ?? nodes[0]?.id ?? null
  )
  const [masteredLocally, setMasteredLocally] = useState<Set<string>>(
    new Set(nodes.filter((n) => n.mastered).map((n) => n.id))
  )

  // Knotenauswahl-Picker (aufklappbar in Schritt 1)
  const [showPicker, setShowPicker] = useState(false)

  // Aufgaben-State
  const [task, setTask] = useState<Task | null>(null)
  const [loadingTask, setLoadingTask] = useState(false)
  const [taskError, setTaskError] = useState('')

  // Antwort-State
  const [answer, setAnswer] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<EvalResult | null>(null)
  const answerRef = useRef<HTMLTextAreaElement>(null)

  function adjustTextareaHeight() {
    const el = answerRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }

  // Hinweis-State
  const [hints, setHints] = useState<string[]>([])
  const [hintLevel, setHintLevel] = useState(0)
  const [loadingHint, setLoadingHint] = useState(false)

  // Aufgabe melden
  const [reported, setReported] = useState(false)

  // Erklärung vertiefen
  const [deepExplanation, setDeepExplanation] = useState<string | null>(null)
  const [loadingDeepExplanation, setLoadingDeepExplanation] = useState(false)

  // Dokument-Gruppen im Picker
  const [expandedDocs, setExpandedDocs] = useState<Set<string>>(new Set())
  function toggleDoc(docId: string) {
    setExpandedDocs((prev) => {
      const next = new Set(prev)
      if (next.has(docId)) next.delete(docId)
      else next.add(docId)
      return next
    })
  }
  const nodesByDoc = nodes.reduce<Record<string, { filename: string; nodes: typeof nodes }>>((acc, n) => {
    if (!acc[n.documentId]) acc[n.documentId] = { filename: n.document.filename, nodes: [] }
    acc[n.documentId].nodes.push(n)
    return acc
  }, {})

  // Blockaden-Erkennung
  const [consecutiveFails, setConsecutiveFails] = useState(0)
  const [showBlockade, setShowBlockade] = useState(false)

  const [showAssessment, setShowAssessment] = useState(needsAssessment)

  // Wenn Fach-Filter wechselt, wird recommendedNodeId neu gesetzt. Falls selectedId
  // nicht mehr in nodes vorkommt (anderes Fach), auf den neuen Empfehlungsknoten zurückfallen.
  useEffect(() => {
    setSelectedId((cur) => {
      const stillValid = nodes.some((n) => n.id === cur)
      return stillValid ? cur : (recommendedNodeId ?? nodes[0]?.id ?? null)
    })
    setStep('concept')
  }, [recommendedNodeId]) // eslint-disable-line react-hooks/exhaustive-deps

  const selectedNode = nodes.find((n) => n.id === selectedId) ?? null

  // ---------------------------------------------------------------------------
  // Wizard-Navigation
  // ---------------------------------------------------------------------------

  function resetTaskState(loadNew = true) {
    setTask(null)
    setAnswer('')
    if (answerRef.current) answerRef.current.style.height = 'auto'
    setResult(null)
    setTaskError('')
    setHints([])
    setHintLevel(0)
    setReported(false)
    setDeepExplanation(null)
    setLoadingDeepExplanation(false)
    setShowBlockade(false)
    if (loadNew && selectedId) loadTask(selectedId, false)
  }

  function goToTask() {
    setStep('task')
    setShowPicker(false)
    resetTaskState(true)
  }

  function goToNextConcept() {
    const examDocumentIds = activeExam?.documentIds?.length
      ? new Set(activeExam.documentIds)
      : undefined

    // Sicherstellen dass selectedId als beherrscht gilt — auch wenn das State-Update
    // aus handleSubmit noch nicht committed ist (defensive Kopie).
    const effectiveMastered = selectedId
      ? new Set([...masteredLocally, selectedId])
      : masteredLocally

    // Erst: wurde durch das Beherrschen von selectedId ein neuer Knoten freigeschaltet?
    // → direkten Abhängigen vorschlagen, damit der Nutzer auf dem gewählten Pfad bleibt
    let nextNodeId: string | null = null
    if (selectedId) {
      const unlocked = edges
        .filter((e) => e.prerequisiteNodeId === selectedId)
        .map((e) => nodes.find((n) => n.id === e.dependentNodeId))
        .filter((n): n is Node => !!n && !effectiveMastered.has(n.id))
        .filter((n) => {
          const prereqs = edges
            .filter((e) => e.dependentNodeId === n.id)
            .map((e) => e.prerequisiteNodeId)
          return prereqs.every((pid) => effectiveMastered.has(pid))
        })
      if (unlocked.length > 0) nextNodeId = unlocked[0].id
    }

    // Fallback: globaler adaptiver Algorithmus
    if (!nextNodeId) {
      const result = getNextNode(nodes, edges, effectiveMastered, new Map(), undefined, examDocumentIds, assessmentLevel)
      nextNodeId = result.nodeId
    }

    setStep('concept')
    setSelectedId(nextNodeId)
    setConsecutiveFails(0)
    setShowBlockade(false)
    // Server-State im Hintergrund aktualisieren (Fortschritt-Seite etc.)
    router.refresh()
  }

  function selectNode(nodeId: string) {
    setSelectedId(nodeId)
    setShowPicker(false)
    setConsecutiveFails(0)
    setShowBlockade(false)
  }

  // ---------------------------------------------------------------------------
  // API-Aufrufe
  // ---------------------------------------------------------------------------

  async function loadTask(nodeId: string, variant: boolean) {
    setLoadingTask(true)
    setTaskError('')

    const url = `/api/adaptive/tasks?nodeId=${nodeId}${variant ? '&variant=true' : ''}`
    const res = await fetch(url)
    const data = await res.json()

    if (res.ok) {
      setTask(data as Task)
    } else {
      setTaskError(data.error ?? 'Aufgabe konnte nicht geladen werden.')
    }
    setLoadingTask(false)

    // Textarea fokussieren wenn Schritt 2 aktiv
    setTimeout(() => answerRef.current?.focus(), 100)
  }

  async function handleReport() {
    if (!task || reported) return
    await fetch(`/api/adaptive/tasks/${task.id}/report`, { method: 'POST' })
    setReported(true)
    if (selectedId) loadTask(selectedId, true)
  }

  async function handleHint() {
    if (!task || hintLevel >= 3 || loadingHint) return
    const nextLevel = (hintLevel + 1) as 1 | 2 | 3
    setLoadingHint(true)

    const res = await fetch('/api/adaptive/hints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId: task.id, hintLevel: nextLevel, userAnswer: answer.trim() || undefined }),
    })
    const data = await res.json()

    if (res.ok) {
      setHints((prev) => [...prev, data.hint])
      setHintLevel(nextLevel)
    }
    setLoadingHint(false)
  }

  async function handleDeepExplanation() {
    if (!task || !result || !answer || loadingDeepExplanation || deepExplanation) return
    setLoadingDeepExplanation(true)

    try {
      const res = await fetch(`/api/adaptive/tasks/${task.id}/explain`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userAnswer: answer,
          previousExplanation: result.explanation,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setDeepExplanation(data.explanation)
      }
    } catch {
      // Netzwerkfehler — kein Feedback nötig, Button wird wieder sichtbar
    } finally {
      setLoadingDeepExplanation(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!task || !answer.trim()) return
    setSubmitting(true)

    const res = await fetch(`/api/adaptive/tasks/${task.id}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer }),
    })
    let data: Record<string, unknown>
    try {
      data = await res.json()
    } catch {
      setTaskError('Bewertung fehlgeschlagen. Bitte erneut versuchen.')
      setSubmitting(false)
      return
    }

    if (res.ok) {
      const evalResult = data as unknown as EvalResult
      setResult(evalResult)
      setStep('evaluation')

      if (evalResult.correct) {
        setConsecutiveFails(0)
        if (selectedId) {
          setMasteredLocally((prev) => new Set([...prev, selectedId]))
        }
      } else {
        const newFails = consecutiveFails + 1
        setConsecutiveFails(newFails)
        if (newFails >= BLOCK_THRESHOLD && selectedNode) {
          const prereqs = getPrerequisites(selectedNode.id, edges, nodes)
          if (prereqs.length > 0) setShowBlockade(true)
        }
      }
    } else {
      setTaskError((data as { error?: string }).error ?? 'Fehler bei der Bewertung.')
    }
    setSubmitting(false)
  }

  function handleBlockadeGoBack(prereqId: string) {
    setShowBlockade(false)
    selectNode(prereqId)
    setStep('concept')
  }

  function handleBlockadeContinue() {
    setShowBlockade(false)
    if (selectedId) loadTask(selectedId, true)
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  const openNodes = nodes.filter((n) => !masteredLocally.has(n.id))
  const isRecommended = (id: string) => id === recommendedNodeId

  return (
    <div className="mx-auto max-w-2xl">
      {showAssessment && activeSubjectId && (
        <AssessmentModal
          subjectId={activeSubjectId}
          subjectName={nodes[0]?.document?.filename ?? 'dieses Fach'}
          onComplete={() => {
            setShowAssessment(false)
            router.refresh()
          }}
        />
      )}

      <WizardProgress currentStep={step} />

      {/* Schritt 1 — Konzept */}
      {step === 'concept' && selectedNode && (
        <div className="space-y-4">
          <KnotenCard
            title={selectedNode.title}
            description={selectedNode.description}
            mastered={masteredLocally.has(selectedNode.id)}
            recommended={isRecommended(selectedNode.id)}
            exam={activeExam}
            onStart={goToTask}
          />

          {/* Anderen Knoten wählen */}
          <div>
            <button
              onClick={() => setShowPicker((v) => !v)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
              aria-expanded={showPicker}
            >
              {showPicker ? '▴ Auswahl schließen' : '▾ Anderen Konzeptknoten wählen'}
            </button>

            {showPicker && (
              <div className="mt-2 rounded-xl border border-gray-100 bg-white shadow-sm max-h-72 overflow-y-auto dark:border-slate-800 dark:bg-slate-900">
                {openNodes.length === 0 ? (
                  <p className="px-4 py-3 text-xs text-gray-400 dark:text-slate-500">
                    Alle Knoten beherrscht! Lade neues Lernmaterial hoch.
                  </p>
                ) : (
                  <div className="p-2 space-y-1">
                    {Object.entries(nodesByDoc).map(([docId, { filename, nodes: docNodes }]) => {
                      const isOpen = expandedDocs.has(docId)
                      return (
                        <div key={docId}>
                          <button
                            onClick={() => toggleDoc(docId)}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hover:bg-gray-50 dark:text-slate-400 dark:hover:bg-slate-800"
                          >
                            <span className="truncate">{filename}</span>
                            <span className="ml-2 shrink-0">{isOpen ? '▴' : '▾'}</span>
                          </button>
                          {isOpen && (
                            <ul className="mt-0.5 space-y-0.5">
                              {docNodes.map((n) => {
                                const mastered = masteredLocally.has(n.id)
                                const selected = n.id === selectedId
                                const recommended = isRecommended(n.id)
                                return (
                                  <li key={n.id}>
                                    <button
                                      onClick={() => selectNode(n.id)}
                                      className={`w-full rounded-lg pl-6 pr-3 py-2 text-left text-sm transition-colors ${
                                        selected
                                          ? 'bg-blue-50 text-blue-800 font-medium dark:bg-blue-950 dark:text-blue-300'
                                          : 'text-gray-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800'
                                      }`}
                                    >
                                      <span className="flex items-center gap-2">
                                        {mastered ? (
                                          <svg className="h-3.5 w-3.5 shrink-0 text-green-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                          </svg>
                                        ) : recommended ? (
                                          <span className="h-2 w-2 shrink-0 rounded-full bg-blue-400" aria-hidden />
                                        ) : (
                                          <span className="h-2 w-2 shrink-0" aria-hidden />
                                        )}
                                        <span className="truncate">{n.title}</span>
                                        {recommended && !selected && (
                                          <span className="ml-auto shrink-0 text-xs text-blue-500 dark:text-blue-400">Empfohlen</span>
                                        )}
                                      </span>
                                    </button>
                                  </li>
                                )
                              })}
                            </ul>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Schritt 2 — Aufgabe */}
      {step === 'task' && (
        <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-slate-500">
            {selectedNode?.title}
          </div>

          {task?.meta.fallback && (
            <p className="mb-3 rounded-lg bg-amber-50 px-3 py-1.5 text-xs text-amber-700 dark:bg-amber-950 dark:text-amber-300">
              KI nicht verfügbar — gecachte Aufgabe wird verwendet.
            </p>
          )}

          {loadingTask && (
            <div className="py-12 text-center text-sm text-gray-400 dark:text-slate-500">
              <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" aria-hidden />
              Aufgabe wird generiert…
              <QueueStatus active={loadingTask} />
            </div>
          )}

          {taskError && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
              {taskError}
              <button
                onClick={() => selectedId && loadTask(selectedId, false)}
                className="ml-2 underline hover:no-underline"
              >
                Erneut versuchen
              </button>
            </div>
          )}

          {task && !loadingTask && (
            <>
              <div className="mb-6 rounded-xl bg-gray-50 px-5 py-4 dark:bg-slate-800">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-slate-500">Aufgabe</p>
                  {!reported ? (
                    <button
                      onClick={handleReport}
                      className="text-xs text-gray-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400"
                      title="Aufgabe als fehlerhaft melden"
                    >
                      Melden
                    </button>
                  ) : (
                    <span className="text-xs text-green-600 dark:text-green-400">Gemeldet — neue Aufgabe lädt…</span>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-gray-800 dark:text-slate-200">{task.task}</p>
              </div>

              {(() => {
                const mcOptions = parseMCOptions(task.task)

                if (mcOptions) {
                  return (
                    <div className="space-y-4">
                      <p className="text-xs font-medium text-gray-600 dark:text-slate-400">Antwort auswählen</p>
                      <div className="grid gap-2">
                        {mcOptions.map((opt) => (
                          <button
                            key={opt.label}
                            onClick={() => setAnswer(`${opt.label}) ${opt.text}`)}
                            disabled={submitting}
                            className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors disabled:opacity-50 ${
                              answer.startsWith(opt.label)
                                ? 'border-blue-400 bg-blue-50 font-medium text-blue-800 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-700'
                                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                            }`}
                          >
                            <span className="mr-2 font-semibold">{opt.label})</span>
                            {opt.text}
                          </button>
                        ))}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <button
                          onClick={(e) => { e.preventDefault(); if (answer.trim()) handleSubmit(e as unknown as React.FormEvent) }}
                          disabled={submitting || !answer.trim()}
                          className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50"
                        >
                          {submitting ? 'Wird bewertet…' : 'Antwort einreichen'}
                        </button>
                        <button
                          type="button"
                          onClick={() => { setStep('concept'); setShowPicker(false) }}
                          className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                        >
                          ← Konzept wechseln
                        </button>
                      </div>
                      {submitting && <QueueStatus active={submitting} />}
                    </div>
                  )
                }

                return (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="answer" className="mb-1.5 block text-xs font-medium text-gray-600 dark:text-slate-400">
                        Deine Antwort
                      </label>
                      <textarea
                        id="answer"
                        ref={answerRef}
                        className="w-full resize-none overflow-hidden rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-blue-500 dark:focus-visible:ring-blue-900"
                        rows={5}
                        placeholder="Schreibe deine Antwort hier…"
                        value={answer}
                        onChange={(e) => { setAnswer(e.target.value); adjustTextareaHeight() }}
                        spellCheck={false}
                        required
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <button
                        type="submit"
                        disabled={submitting || !answer.trim()}
                        className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        {submitting ? 'Wird bewertet…' : 'Antwort einreichen'}
                      </button>
                      <button
                        type="button"
                        onClick={() => { setStep('concept'); setShowPicker(false) }}
                        className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                      >
                        ← Konzept wechseln
                      </button>
                    </div>
                    {submitting && <QueueStatus active={submitting} />}
                  </form>
                )
              })()}

              <div className="mt-6 border-t border-gray-100 pt-4 dark:border-slate-800">
                <HintPanel
                  hints={hints}
                  hintLevel={hintLevel}
                  loading={loadingHint}
                  onRequest={handleHint}
                />
                {loadingHint && <QueueStatus active={loadingHint} />}
              </div>
            </>
          )}
        </div>
      )}

      {/* Schritt 3 — Bewertung */}
      {step === 'evaluation' && result && selectedNode && (
        <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-slate-500">
            {selectedNode.title}
          </div>

          {/* Blockaden-Prompt */}
          {showBlockade && (
            <div className="mb-6">
              <BlockadePrompt
                currentNode={selectedNode}
                prerequisiteNodes={getPrerequisites(selectedNode.id, edges, nodes)}
                onGoBack={handleBlockadeGoBack}
                onContinue={handleBlockadeContinue}
              />
            </div>
          )}

          {/* Ergebnis */}
          <div
            className={`mb-6 rounded-xl px-5 py-4 ${result.correct ? 'bg-green-50 dark:bg-green-950' : 'bg-gray-50 dark:bg-slate-800'}`}
          >
            <p
              className={`mb-1 text-sm font-semibold ${
                result.correct ? 'text-green-800 dark:text-green-400' : 'text-gray-800 dark:text-slate-200'
              }`}
            >
              {result.correct
                ? 'Richtig!'
                : `Noch nicht ganz — ${result.errorType ?? 'Überprüfe deine Antwort'}`}
            </p>
            <p className={`text-sm leading-relaxed ${result.correct ? 'text-green-700 dark:text-green-400' : 'text-gray-600 dark:text-slate-400'}`}>
              {result.explanation}
            </p>
          </div>

          {result.correct ? (
            /* BeherrschtMoment inline — wechselt gleich zu Schritt 4 */
            <BeherrschtMoment
              nodeTitle={selectedNode.title}
              onContinue={goToNextConcept}
            />
          ) : (
            <>
              {/* Erklärung vertiefen */}
              {!deepExplanation && (
                <button
                  onClick={handleDeepExplanation}
                  disabled={loadingDeepExplanation}
                  className="mt-3 text-sm text-blue-600 underline hover:no-underline disabled:opacity-50 dark:text-blue-400"
                >
                  {loadingDeepExplanation ? 'Wird geladen…' : 'Erklärung vertiefen'}
                </button>
              )}
              {deepExplanation && (
                <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100">
                  {deepExplanation}
                </div>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setResult(null)
                  setDeepExplanation(null)
                  setLoadingDeepExplanation(false)
                  setHints([])
                  setHintLevel(0)
                  setStep('task')
                }}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Erneut versuchen
              </button>
              <button
                onClick={() => {
                  if (selectedId) {
                    resetTaskState(false)
                    setStep('task')
                    loadTask(selectedId, true)
                  }
                }}
                className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                Neue Variation
              </button>
              <button
                onClick={goToNextConcept}
                className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                Überspringen →
              </button>
            </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
