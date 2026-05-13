'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import QueueStatus from '@/components/adaptive/QueueStatus'

interface ConceptNode {
  id: string
  title: string
  description: string
}

interface Document {
  id: string
  filename: string
  uploadedAt: Date
  status: string
  conceptNodes: ConceptNode[]
}

interface DuplicateCandidate {
  newNodeId: string
  newTitle: string
  existingNodeId: string
  existingTitle: string
  score: number
}

// ---------------------------------------------------------------------------
// Inline-Edit für einen einzelnen Knoten
// ---------------------------------------------------------------------------

function NodeItem({
  node,
  onSaved,
  onDeleted,
}: {
  node: ConceptNode
  onSaved: () => void
  onDeleted: () => void
}) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(node.title)
  const [description, setDescription] = useState(node.description)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  async function handleSave() {
    if (!title.trim()) return
    setSaving(true)
    setError('')

    const res = await fetch(`/api/adaptive/concept-nodes/${node.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    })

    if (res.ok) {
      setEditing(false)
      onSaved()
    } else {
      const data = await res.json()
      setError(data.error ?? 'Fehler beim Speichern')
    }
    setSaving(false)
  }

  async function handleDelete() {
    if (!confirm(`Knoten "${node.title}" wirklich löschen?`)) return
    setDeleting(true)

    const res = await fetch(`/api/adaptive/concept-nodes/${node.id}`, { method: 'DELETE' })
    if (res.ok) {
      onDeleted()
    } else {
      setError('Fehler beim Löschen')
      setDeleting(false)
    }
  }

  if (editing) {
    return (
      <li className="rounded-lg bg-blue-50 dark:bg-blue-950 px-3 py-3 space-y-2">
        <input
          className="w-full rounded border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-800 px-2 py-1 text-sm font-medium text-gray-900 dark:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={60}
          placeholder="Titel"
          autoFocus
        />
        <textarea
          className="w-full rounded border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-800 px-2 py-1 text-xs text-gray-600 dark:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          placeholder="Beschreibung"
        />
        {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={saving || !title.trim()}
            className="rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Speichern…' : 'Speichern'}
          </button>
          <button
            onClick={() => {
              setEditing(false)
              setTitle(node.title)
              setDescription(node.description)
              setError('')
            }}
            className="rounded bg-gray-200 dark:bg-slate-700 px-3 py-1 text-xs font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-300 dark:hover:bg-slate-600"
          >
            Abbrechen
          </button>
        </div>
      </li>
    )
  }

  return (
    <li className="group flex items-start justify-between gap-2 rounded-lg bg-gray-50 dark:bg-slate-800 px-3 py-2">
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-slate-100">{node.title}</p>
        <p className="text-xs text-gray-500 dark:text-slate-500">{node.description}</p>
      </div>
      <div className="flex shrink-0 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setEditing(true)}
          className="rounded p-1 text-gray-400 dark:text-slate-500 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600"
          title="Bearbeiten"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.94l-3.5 1 1-3.5a4 4 0 01.94-1.414z" />
          </svg>
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="rounded p-1 text-gray-400 dark:text-slate-500 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-600 disabled:opacity-50"
          title="Löschen"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </li>
  )
}

// ---------------------------------------------------------------------------
// Formular: Neuen Knoten hinzufügen
// ---------------------------------------------------------------------------

function AddNodeForm({
  documentId,
  onAdded,
  onCancel,
}: {
  documentId: string
  onAdded: () => void
  onCancel: () => void
}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    setSaving(true)
    setError('')

    const res = await fetch('/api/adaptive/concept-nodes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentId, title, description }),
    })

    if (res.ok) {
      onAdded()
    } else {
      const data = await res.json()
      setError(data.error ?? 'Fehler beim Anlegen')
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-dashed border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950 px-3 py-3 space-y-2">
      <p className="text-xs font-medium text-blue-700 dark:text-blue-300">Neuer Konzeptknoten</p>
      <input
        className="w-full rounded border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-800 px-2 py-1 text-sm text-gray-900 dark:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={60}
        placeholder="Titel (max. 60 Zeichen)"
        autoFocus
        required
      />
      <textarea
        className="w-full rounded border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-800 px-2 py-1 text-xs text-gray-600 dark:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 resize-none"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
        placeholder="Beschreibung (optional)"
      />
      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving || !title.trim()}
          className="rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Anlegen…' : 'Anlegen'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded bg-gray-200 dark:bg-slate-700 px-3 py-1 text-xs font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-300 dark:hover:bg-slate-600"
        >
          Abbrechen
        </button>
      </div>
    </form>
  )
}

// ---------------------------------------------------------------------------
// Duplikat-Warnung
// ---------------------------------------------------------------------------

function DuplicateAlert({
  duplicates,
  onDismiss,
  onMerged,
}: {
  duplicates: DuplicateCandidate[]
  onDismiss: () => void
  onMerged: () => void
}) {
  const [merging, setMerging] = useState<string | null>(null)
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())

  async function handleMerge(keepId: string, deleteId: string) {
    setMerging(deleteId)
    const res = await fetch('/api/adaptive/concept-nodes/merge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keepId, deleteId }),
    })
    if (res.ok) {
      onMerged()
    }
    setMerging(null)
  }

  const visible = duplicates.filter((d) => !dismissed.has(d.newNodeId))
  if (visible.length === 0) return null

  return (
    <div className="mt-4 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950 p-3">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-semibold text-amber-800 dark:text-amber-200">
          {visible.length} mögliche{visible.length === 1 ? 's Duplikat' : ' Duplikate'} gefunden
        </p>
        <button onClick={onDismiss} className="text-xs text-amber-600 dark:text-amber-400 hover:underline">
          Alle ignorieren
        </button>
      </div>
      <ul className="space-y-2">
        {visible.map((d) => (
          <li key={d.newNodeId} className="rounded bg-white dark:bg-slate-800 px-3 py-2 text-xs shadow-sm">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-2">
              <span className="font-medium text-gray-700 dark:text-slate-300 truncate max-w-[180px]" title={d.newTitle}>
                {d.newTitle}
              </span>
              <span className="text-amber-500 shrink-0">≈ {d.score}%</span>
              <span className="text-gray-400 dark:text-slate-500 shrink-0">ähnlich wie</span>
              <span className="font-medium text-gray-700 dark:text-slate-300 truncate max-w-[180px]" title={d.existingTitle}>
                {d.existingTitle}
              </span>
            </div>
            <div className="mt-1.5 flex gap-2">
              <button
                onClick={() => handleMerge(d.existingNodeId, d.newNodeId)}
                disabled={merging === d.newNodeId}
                className="rounded bg-amber-600 px-2 py-0.5 text-xs font-medium text-white hover:bg-amber-700 disabled:opacity-50"
              >
                {merging === d.newNodeId ? 'Führe zusammen…' : 'Zusammenführen'}
              </button>
              <button
                onClick={() => setDismissed((prev) => new Set([...prev, d.newNodeId]))}
                className="rounded bg-gray-100 dark:bg-slate-700 px-2 py-0.5 text-xs text-gray-600 dark:text-slate-400 hover:bg-gray-200"
              >
                Ignorieren
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Hauptkomponente
// ---------------------------------------------------------------------------

export default function DocumentList({ documents }: { documents: Document[] }) {
  const router = useRouter()
  const [extracting, setExtracting] = useState<{ id: string; mode: 'normal' | 'exam' } | null>(null)

  const hasPending = documents.some((d) => d.status !== 'processed')
  useEffect(() => {
    if (!hasPending) return
    const id = setInterval(() => router.refresh(), 5000)
    return () => clearInterval(id)
  }, [hasPending, router])
  const [deleting, setDeleting] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [addingTo, setAddingTo] = useState<string | null>(null)
  const [duplicates, setDuplicates] = useState<Record<string, DuplicateCandidate[]>>({})
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())

  async function handleExtract(documentId: string, mode?: 'exam') {
    setExtracting({ id: documentId, mode: mode ?? 'normal' })
    setErrors((prev) => ({ ...prev, [documentId]: '' }))

    const url = mode
      ? `/api/adaptive/documents/${documentId}/extract?mode=${mode}`
      : `/api/adaptive/documents/${documentId}/extract`
    const res = await fetch(url, { method: 'POST' })
    const data = await res.json()

    if (!res.ok) {
      setErrors((prev) => ({ ...prev, [documentId]: data.error ?? 'Fehler bei der Extraktion' }))
    } else {
      if (data.duplicates?.length > 0) {
        setDuplicates((prev) => ({ ...prev, [documentId]: data.duplicates }))
      }
      router.refresh()
    }

    setExtracting(null)
  }

  async function handleDelete(documentId: string, filename: string) {
    if (!confirm(`Dokument „${filename}" und alle zugehörigen Konzeptknoten wirklich löschen?`)) return
    setDeleting(documentId)

    const res = await fetch(`/api/adaptive/documents/${documentId}`, { method: 'DELETE' })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setErrors((prev) => ({ ...prev, [documentId]: data.error ?? 'Löschen fehlgeschlagen' }))
    } else {
      router.refresh()
    }
    setDeleting(null)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Hochgeladene Dokumente</h2>

      {documents.map((doc) => (
        <div key={doc.id} className="relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm">
          {extracting?.id === doc.id && doc.status !== 'processed' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-100 dark:bg-slate-700">
              <div className="h-full animate-[slide_1.4s_ease-in-out_infinite] bg-blue-500" />
            </div>
          )}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-medium text-gray-900 dark:text-slate-100">{doc.filename}</p>
              <p className="text-xs text-gray-500 dark:text-slate-500">
                {new Date(doc.uploadedAt).toLocaleDateString('de-DE')}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  doc.status === 'processed'
                    ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400'
                    : 'bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400'
                }`}
              >
                {doc.status === 'processed' ? 'verarbeitet' : 'hochgeladen'}
              </span>

              <button
                onClick={() => handleDelete(doc.id, doc.filename)}
                disabled={deleting === doc.id || extracting?.id === doc.id}
                className="rounded p-1.5 text-gray-400 dark:text-slate-500 hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-500 disabled:opacity-40"
                title="Dokument löschen"
              >
                {deleting === doc.id ? (
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                )}
              </button>

              {doc.status !== 'processed' && (
                <div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleExtract(doc.id)}
                      disabled={extracting !== null}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                      title="Lernmaterial: extrahiert Konzeptgraph, Aufgaben werden on-demand generiert"
                    >
                      {extracting?.id === doc.id && extracting.mode === 'normal' && (
                        <svg className="h-3 w-3 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                      )}
                      {extracting?.id === doc.id && extracting.mode === 'normal' ? 'Extrahiere…' : 'Lernmaterial'}
                    </button>
                    <button
                      onClick={() => handleExtract(doc.id, 'exam')}
                      disabled={extracting !== null}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-violet-700 disabled:opacity-50"
                      title="Übungsklausur: extrahiert Konzeptgraph und legt echte Klausurfragen als Aufgaben an"
                    >
                      {extracting?.id === doc.id && extracting.mode === 'exam' && (
                        <svg className="h-3 w-3 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                      )}
                      {extracting?.id === doc.id && extracting.mode === 'exam' ? 'Extrahiere…' : 'Übungsklausur'}
                    </button>
                  </div>
                  <p className="mt-1.5 text-xs text-gray-400 dark:text-slate-500">
                    {extracting?.id === doc.id
                      ? 'KI analysiert das Dokument – bitte warten…'
                      : 'Die KI-Analyse dauert je nach Dokumentgröße ca. 1–2 Minuten.'}
                  </p>
                  {extracting?.id === doc.id && (
                    <QueueStatus active={extracting !== null} />
                  )}
                </div>
              )}
            </div>
          </div>

          {errors[doc.id] && (
            <div className="mt-3 rounded-lg bg-red-50 dark:bg-red-950 px-3 py-2 text-sm text-red-600 dark:text-red-400">
              <p>{errors[doc.id]}</p>
              <p className="mt-1 text-xs text-red-500 dark:text-red-500">
                Du kannst Konzeptknoten auch manuell hinzufügen (siehe unten).
              </p>
            </div>
          )}

          {duplicates[doc.id]?.length > 0 && (
            <DuplicateAlert
              duplicates={duplicates[doc.id]}
              onDismiss={() =>
                setDuplicates((prev) => ({ ...prev, [doc.id]: [] }))
              }
              onMerged={() => {
                setDuplicates((prev) => ({ ...prev, [doc.id]: [] }))
                router.refresh()
              }}
            />
          )}

          {(doc.conceptNodes.length > 0 || doc.status === 'processed' || errors[doc.id]) && (
            <div className="mt-4 border-t border-gray-100 dark:border-slate-700 pt-4">
              <div className="mb-2 flex items-center justify-between">
                <button
                  onClick={() => setCollapsed((prev) => {
                    const next = new Set(prev)
                    next.has(doc.id) ? next.delete(doc.id) : next.add(doc.id)
                    return next
                  })}
                  className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300"
                >
                  <svg
                    className={`h-3 w-3 transition-transform ${collapsed.has(doc.id) ? '-rotate-90' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                  {doc.conceptNodes.length} Konzeptknoten
                </button>
                {!collapsed.has(doc.id) && (
                  <button
                    onClick={() => setAddingTo(addingTo === doc.id ? null : doc.id)}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    + Knoten hinzufügen
                  </button>
                )}
              </div>

              {!collapsed.has(doc.id) && (
                <>
                  <ul className="space-y-2">
                    {doc.conceptNodes.map((node) => (
                      <NodeItem
                        key={node.id}
                        node={node}
                        onSaved={() => router.refresh()}
                        onDeleted={() => router.refresh()}
                      />
                    ))}
                  </ul>

                  {addingTo === doc.id && (
                    <div className="mt-2">
                      <AddNodeForm
                        documentId={doc.id}
                        onAdded={() => {
                          setAddingTo(null)
                          router.refresh()
                        }}
                        onCancel={() => setAddingTo(null)}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
