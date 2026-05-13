'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Exam {
  id: string
  title: string
  examDate: string
  documents: { id: string; filename: string }[]
  nodeIds: string[]
  openNodes: number | null
  totalNodes: number | null
}

interface Document {
  id: string
  filename: string
  subjectId: string | null
}

interface Node {
  id: string
  title: string
  documentId: string
}

interface Subject {
  id: string
  title: string
  color: string
}

function daysUntil(isoDate: string): number {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const examDate = new Date(isoDate)
  examDate.setHours(0, 0, 0, 0)
  return Math.round((examDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

// ---------------------------------------------------------------------------
// DocNodePicker — wählt Dokumente (ganzes Skript) oder einzelne Knoten
// ---------------------------------------------------------------------------

function DocNodePicker({
  documents,
  allNodes,
  documentIds,
  nodeIds,
  onDocumentIdsChange,
  onNodeIdsChange,
}: {
  documents: Document[]
  allNodes: Node[]
  documentIds: string[]
  nodeIds: string[]
  onDocumentIdsChange: (ids: string[]) => void
  onNodeIdsChange: (ids: string[]) => void
}) {
  const [expandedDocs, setExpandedDocs] = useState<Set<string>>(new Set())

  function toggleExpand(docId: string) {
    setExpandedDocs((prev) => {
      const next = new Set(prev)
      if (next.has(docId)) next.delete(docId)
      else next.add(docId)
      return next
    })
  }

  function toggleDoc(docId: string) {
    const docNodes = allNodes.filter((n) => n.documentId === docId).map((n) => n.id)
    if (documentIds.includes(docId)) {
      // Ganzes Skript abwählen → alle seine Knoten einzeln vorauswählen
      onDocumentIdsChange(documentIds.filter((d) => d !== docId))
      onNodeIdsChange([...new Set([...nodeIds, ...docNodes])])
      setExpandedDocs((prev) => { const next = new Set(prev); next.add(docId); return next })
    } else {
      // Ganzes Skript wählen → individuelle Knoten dieses Docs entfernen
      onDocumentIdsChange([...documentIds, docId])
      onNodeIdsChange(nodeIds.filter((id) => !docNodes.includes(id)))
    }
  }

  function toggleNode(nodeId: string, docId: string) {
    if (documentIds.includes(docId)) {
      // Doc war als Ganzes gewählt → auf Einzelauswahl umsteigen
      const docNodes = allNodes.filter((n) => n.documentId === docId).map((n) => n.id)
      onDocumentIdsChange(documentIds.filter((d) => d !== docId))
      onNodeIdsChange([...new Set([...nodeIds, ...docNodes.filter((id) => id !== nodeId)])])
      setExpandedDocs((prev) => { const next = new Set(prev); next.add(docId); return next })
    } else {
      onNodeIdsChange(
        nodeIds.includes(nodeId)
          ? nodeIds.filter((id) => id !== nodeId)
          : [...nodeIds, nodeId]
      )
    }
  }

  if (documents.length === 0) return null

  return (
    <div className="space-y-2 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3">
      {documents.map((doc) => {
        const docNodes = allNodes.filter((n) => n.documentId === doc.id)
        const isDocChecked = documentIds.includes(doc.id)
        const expanded = expandedDocs.has(doc.id)
        const selectedNodeCount = isDocChecked
          ? docNodes.length
          : docNodes.filter((n) => nodeIds.includes(n.id)).length

        return (
          <div key={doc.id}>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isDocChecked || selectedNodeCount > 0}
                ref={(el) => {
                  if (el) el.indeterminate = !isDocChecked && selectedNodeCount > 0
                }}
                onChange={() => toggleDoc(doc.id)}
                className="h-4 w-4 rounded border-gray-300 dark:border-slate-600 text-blue-600 focus-visible:ring-blue-500"
              />
              <span className="flex-1 text-sm text-gray-700 dark:text-slate-300">{doc.filename}</span>
              {selectedNodeCount > 0 && (
                <span className="text-xs text-gray-400 dark:text-slate-500">
                  {isDocChecked ? 'Alle' : selectedNodeCount}/{docNodes.length}
                </span>
              )}
              {docNodes.length > 0 && (
                <button
                  type="button"
                  onClick={() => toggleExpand(doc.id)}
                  className="text-xs text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {expanded ? '▲ Knoten' : '▼ Knoten'}
                </button>
              )}
            </div>

            {expanded && docNodes.length > 0 && (
              <div className="ml-6 mt-1.5 space-y-1 border-l border-gray-100 dark:border-slate-700 pl-3">
                {docNodes.map((node) => {
                  const checked = isDocChecked || nodeIds.includes(node.id)
                  return (
                    <label
                      key={node.id}
                      className="flex cursor-pointer items-center gap-2 text-xs text-gray-600 dark:text-slate-400"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleNode(node.id, doc.id)}
                        className="h-3.5 w-3.5 rounded border-gray-300 dark:border-slate-600 text-blue-600 focus-visible:ring-blue-500"
                      />
                      {node.title}
                    </label>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ---------------------------------------------------------------------------
// KlausurCard
// ---------------------------------------------------------------------------

function KlausurCard({
  exam,
  documents,
  allNodes,
  onDelete,
  onSaved,
}: {
  exam: Exam
  documents: Document[]
  allNodes: Node[]
  onDelete: (id: string) => void
  onSaved: () => void
}) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(exam.title)
  const [examDate, setExamDate] = useState(() => {
    const d = new Date(exam.examDate)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  })
  const [documentIds, setDocumentIds] = useState(exam.documents.map((d) => d.id))
  const [nodeIds, setNodeIds] = useState(exam.nodeIds)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSave() {
    if (title.trim().length < 3) { setError('Thema muss mindestens 3 Zeichen haben.'); return }
    if (!examDate) { setError('Bitte ein Datum angeben.'); return }
    setSaving(true)
    setError('')
    const res = await fetch(`/api/adaptive/exams/${exam.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title.trim(), examDate, documentIds, nodeIds }),
    })
    if (res.ok) {
      setEditing(false)
      onSaved()
    } else {
      const data = await res.json()
      setError(data.error ?? 'Fehler beim Speichern.')
    }
    setSaving(false)
  }

  const days = daysUntil(exam.examDate)
  const isPast = days < 0
  const isUrgent = !isPast && days <= 3
  const dailyRate =
    !isPast && days > 0 && exam.openNodes !== null
      ? (exam.openNodes / days).toFixed(1)
      : null

  if (editing) {
    return (
      <div className="rounded-2xl border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 p-5 shadow-sm">
        <h3 className="mb-4 font-semibold text-gray-900 dark:text-slate-100">Klausur bearbeiten</h3>
        {error && <div className="mb-3 rounded-lg bg-red-50 dark:bg-red-950 px-3 py-2 text-sm text-red-600 dark:text-red-400">{error}</div>}
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-slate-300">Thema / Fach</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 px-4 py-2.5 text-sm focus:border-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-100"
              minLength={3}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-slate-300">Klausurdatum</label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 px-4 py-2.5 text-sm focus:border-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-100"
            />
          </div>
          {documents.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-medium text-gray-700 dark:text-slate-300">
                Lernmaterial <span className="font-normal text-gray-400 dark:text-slate-500">(Ganzes Skript oder einzelne Knoten)</span>
              </p>
              <DocNodePicker
                documents={documents}
                allNodes={allNodes}
                documentIds={documentIds}
                nodeIds={nodeIds}
                onDocumentIdsChange={setDocumentIds}
                onNodeIdsChange={setNodeIds}
              />
            </div>
          )}
        </div>
        <div className="mt-5 flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Speichern…' : 'Speichern'}
          </button>
          <button
            onClick={() => { setEditing(false); setError('') }}
            className="rounded-xl border border-gray-200 dark:border-slate-600 px-5 py-2.5 text-sm text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700"
          >
            Abbrechen
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`rounded-2xl border bg-white dark:bg-slate-800 p-5 shadow-sm ${
        isUrgent ? 'border-red-200 dark:border-red-800' : isPast ? 'border-gray-100 dark:border-slate-700 opacity-60' : 'border-gray-100 dark:border-slate-700'
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-slate-100">{exam.title}</h3>
          {exam.documents.length > 0 && (
            <p className="mt-0.5 text-xs text-gray-400 dark:text-slate-500">
              {exam.documents.map((d) => d.filename).join(', ')}
            </p>
          )}
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
            isPast
              ? 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-400'
              : isUrgent
              ? 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400'
              : days <= 7
              ? 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
              : 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
          }`}
        >
          {isPast ? 'Vorbei' : days === 0 ? 'Heute!' : `In ${days} Tag${days === 1 ? '' : 'en'}`}
        </span>
      </div>

      <p className="mb-4 text-sm text-gray-500 dark:text-slate-400">
        {new Date(exam.examDate).toLocaleDateString('de-DE', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
        {exam.openNodes !== null && exam.totalNodes !== null && !isPast && (
          <>
            {' · '}
            <span className="font-medium text-green-600 dark:text-green-400">{exam.totalNodes - exam.openNodes}</span>
            {' / '}
            <span className="font-medium text-gray-700 dark:text-slate-300">{exam.totalNodes}</span>
            {' Knoten'}
            {dailyRate && (
              <>
                {' · '}
                <span className={isUrgent ? 'font-semibold text-red-600 dark:text-red-400' : ''}>
                  ~{dailyRate}/Tag
                </span>
              </>
            )}
          </>
        )}
      </p>

      <div className="flex flex-wrap gap-2">
        <a
          href="/adaptive/learn"
          className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
        >
          Lernen starten
        </a>
        <button
          onClick={() => setEditing(true)}
          className="rounded-lg border border-gray-200 dark:border-slate-600 px-3 py-1.5 text-xs text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-slate-100"
        >
          Bearbeiten
        </button>
        <button
          onClick={() => onDelete(exam.id)}
          className="rounded-lg border border-gray-200 dark:border-slate-600 px-3 py-1.5 text-xs text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-red-600"
        >
          Löschen
        </button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Neues Klausur-Formular
// ---------------------------------------------------------------------------

function NewExamForm({
  documents,
  subjects,
  allNodes,
  onCreated,
  onCancel,
}: {
  documents: Document[]
  subjects: Subject[]
  allNodes: Node[]
  onCreated: () => void
  onCancel: () => void
}) {
  const [subjectId, setSubjectId] = useState<string>('')
  const [examDate, setExamDate] = useState('')
  const [documentIds, setDocumentIds] = useState<string[]>([])
  const [nodeIds, setNodeIds] = useState<string[]>([])
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const visibleDocuments = subjectId
    ? documents.filter((d) => d.subjectId === subjectId)
    : documents

  function handleSubjectChange(id: string) {
    setSubjectId(id)
    const docIds = documents.filter((d) => d.subjectId === id).map((d) => d.id)
    setDocumentIds(docIds)
    setNodeIds([])
  }

  // Mindestdatum = morgen
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!subjectId) {
      setError('Bitte ein Fach auswählen.')
      return
    }
    if (!examDate) {
      setError('Bitte ein Datum angeben.')
      return
    }

    const subjectName = subjects.find((s) => s.id === subjectId)?.title ?? 'Klausur'

    setSaving(true)
    const res = await fetch('/api/adaptive/exams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: subjectName,
        examDate,
        documentIds,
        nodeIds,
      }),
    })

    if (res.ok) {
      onCreated()
    } else {
      const data = await res.json()
      setError(data.error ?? 'Fehler beim Speichern.')
    }
    setSaving(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 p-6 shadow-sm"
    >
      <h2 className="mb-4 font-semibold text-gray-900 dark:text-slate-100">Neue Klausur einrichten</h2>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-950 px-3 py-2 text-sm text-red-600 dark:text-red-400">{error}</div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="exam-subject" className="mb-1 block text-xs font-medium text-gray-700 dark:text-slate-300">
            Fach
          </label>
          <select
            id="exam-subject"
            value={subjectId}
            onChange={(e) => handleSubjectChange(e.target.value)}
            className="w-full rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 px-4 py-2.5 text-sm focus:border-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-100"
            required
          >
            <option value="">— Fach wählen —</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="exam-date" className="mb-1 block text-xs font-medium text-gray-700 dark:text-slate-300">
            Klausurdatum
          </label>
          <input
            id="exam-date"
            type="date"
            value={examDate}
            min={minDate}
            onChange={(e) => setExamDate(e.target.value)}
            className="w-full rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 px-4 py-2.5 text-sm focus:border-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-100"
            required
          />
        </div>

        {subjectId && visibleDocuments.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-medium text-gray-700 dark:text-slate-300">
              Lernmaterial{' '}
              <span className="font-normal text-gray-400 dark:text-slate-500">(Ganzes Skript oder einzelne Knoten)</span>
            </p>
            <DocNodePicker
              documents={visibleDocuments}
              allNodes={allNodes.filter((n) => visibleDocuments.some((d) => d.id === n.documentId))}
              documentIds={documentIds}
              nodeIds={nodeIds}
              onDocumentIdsChange={setDocumentIds}
              onNodeIdsChange={setNodeIds}
            />
          </div>
        )}

        {subjectId && visibleDocuments.length === 0 && (
          <p className="text-xs text-gray-400 dark:text-slate-500">Keine Dokumente in diesem Fach.</p>
        )}
      </div>

      <div className="mt-5 flex flex-col sm:flex-row gap-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          {saving ? 'Speichern…' : 'Klausur anlegen'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-gray-200 dark:border-slate-600 px-5 py-2.5 text-sm text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700"
        >
          Abbrechen
        </button>
      </div>
    </form>
  )
}

// ---------------------------------------------------------------------------
// Hauptkomponente
// ---------------------------------------------------------------------------

export default function ExamsClient({
  exams: initialExams,
  documents,
  subjects,
  allNodes,
}: {
  exams: Exam[]
  documents: Document[]
  subjects: Subject[]
  allNodes: Node[]
}) {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)

  async function handleDelete(id: string) {
    if (!confirm('Klausurtermin wirklich löschen?')) return
    setDeleting(id)
    await fetch(`/api/adaptive/exams/${id}`, { method: 'DELETE' })
    router.refresh()
    setDeleting(null)
  }

  function handleCreated() {
    setShowForm(false)
    router.refresh()
  }

  const upcoming = initialExams.filter((e) => daysUntil(e.examDate) >= 0)
  const past = initialExams.filter((e) => daysUntil(e.examDate) < 0)

  return (
    <div className="space-y-6">
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full rounded-2xl border-2 border-dashed border-blue-200 dark:border-blue-800 py-4 text-sm font-medium text-blue-600 dark:text-blue-400 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
        >
          + Neue Klausur einrichten
        </button>
      )}

      {showForm && (
        <NewExamForm
          documents={documents}
          subjects={subjects}
          allNodes={allNodes}
          onCreated={handleCreated}
          onCancel={() => setShowForm(false)}
        />
      )}

      {upcoming.length === 0 && !showForm && (
        <div className="rounded-2xl bg-white dark:bg-slate-800 p-10 text-center shadow-sm">
          <p className="text-gray-500 dark:text-slate-500 text-sm">
            Noch keine Klausurtermine eingetragen.
          </p>
          <p className="mt-1 text-xs text-gray-400 dark:text-slate-500">
            Richte einen Termin ein, damit das Tool dein Lernen auf die Deadline ausrichtet.
          </p>
        </div>
      )}

      {upcoming.map((exam) => (
        <KlausurCard
          key={exam.id}
          exam={exam}
          documents={documents}
          allNodes={allNodes}
          onDelete={(id) => { if (deleting !== id) handleDelete(id) }}
          onSaved={() => router.refresh()}
        />
      ))}

      {past.length > 0 && (
        <details className="text-sm text-gray-400 dark:text-slate-500">
          <summary className="cursor-pointer select-none hover:text-gray-600 dark:hover:text-slate-300">
            {past.length} vergangene Klausur{past.length > 1 ? 'n' : ''}
          </summary>
          <div className="mt-3 space-y-3">
            {past.map((exam) => (
              <KlausurCard
                key={exam.id}
                exam={exam}
                documents={documents}
                allNodes={allNodes}
                onDelete={(id) => { if (deleting !== id) handleDelete(id) }}
                onSaved={() => router.refresh()}
              />
            ))}
          </div>
        </details>
      )}
    </div>
  )
}
