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
      <li className="rounded-xl bg-primary/5 border border-primary/20 p-3.5 space-y-3.5 animate-fade-in">
        <input
          className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm font-semibold text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={60}
          placeholder="Titel"
          autoFocus
        />
        <textarea
          className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs font-medium text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          placeholder="Beschreibung"
        />
        {error && <p className="text-xs font-bold text-danger animate-fade-in">{error}</p>}
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={saving || !title.trim()}
            className="rounded-xl bg-primary hover:bg-primary/95 text-white px-3.5 py-2 text-xs font-bold transition-all shadow-md shadow-primary/10 cursor-pointer"
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
            className="rounded-xl border border-border px-3.5 py-2 text-xs font-bold text-foreground hover:bg-border/30 transition-all cursor-pointer"
          >
            Abbrechen
          </button>
        </div>
      </li>
    )
  }

  return (
    <li className="group flex items-start justify-between gap-3 rounded-xl bg-background border border-border/40 px-3.5 py-2.5 transition-all hover:border-border/80">
      <div className="min-w-0">
        <p className="text-sm font-bold text-foreground leading-snug">{node.title}</p>
        <p className="text-xs text-muted font-medium mt-0.5 leading-relaxed">{node.description}</p>
      </div>
      <div className="flex shrink-0 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setEditing(true)}
          className="rounded-lg p-1.5 text-muted hover:bg-primary/10 hover:text-primary transition-all border border-transparent hover:border-primary/20"
          title="Bearbeiten"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.94l-3.5 1 1-3.5a4 4 0 01.94-1.414z" />
          </svg>
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="rounded-lg p-1.5 text-muted hover:bg-danger/10 hover:text-danger transition-all border border-transparent hover:border-danger/20 disabled:opacity-50"
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
    <form onSubmit={handleSubmit} className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-4 space-y-3 animate-fade-in">
      <p className="text-xs font-extrabold text-primary uppercase tracking-wider mb-1">Neuer Konzeptknoten</p>
      <input
        className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm font-semibold text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={60}
        placeholder="Titel (max. 60 Zeichen)"
        autoFocus
        required
      />
      <textarea
        className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs font-medium text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
        placeholder="Beschreibung (optional)"
      />
      {error && <p className="text-xs font-bold text-danger animate-fade-in">{error}</p>}
      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          disabled={saving || !title.trim()}
          className="rounded-xl bg-primary hover:bg-primary/95 text-white px-4 py-2 text-xs font-bold transition-all shadow-md shadow-primary/10 cursor-pointer"
        >
          {saving ? 'Anlegen…' : 'Anlegen'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-border px-4 py-2 text-xs font-bold text-foreground hover:bg-border/30 transition-all cursor-pointer"
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
    <div className="mt-4 rounded-xl border border-warning/20 bg-warning/10 p-4 space-y-3 animate-fade-in">
      <div className="flex items-center justify-between">
        <p className="text-xs font-extrabold text-warning uppercase tracking-wider">
          {visible.length} mögliche{visible.length === 1 ? 's Duplikat' : ' Duplikate'} gefunden
        </p>
        <button onClick={onDismiss} className="text-xs font-bold text-warning hover:underline">
          Alle ignorieren
        </button>
      </div>
      <ul className="space-y-2">
        {visible.map((d) => (
          <li key={d.newNodeId} className="rounded-xl bg-surface border border-border p-3.5 shadow-sm space-y-2">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-2">
              <span className="font-bold text-foreground truncate max-w-[180px]" title={d.newTitle}>
                {d.newTitle}
              </span>
              <span className="text-warning font-black shrink-0">≈ {d.score}%</span>
              <span className="text-muted shrink-0">ähnlich wie</span>
              <span className="font-bold text-foreground truncate max-w-[180px]" title={d.existingTitle}>
                {d.existingTitle}
              </span>
            </div>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => handleMerge(d.existingNodeId, d.newNodeId)}
                disabled={merging === d.newNodeId}
                className="rounded-xl bg-warning hover:bg-warning/95 text-white px-3 py-1.5 text-xs font-bold transition-all shadow-md shadow-warning/10 cursor-pointer"
              >
                {merging === d.newNodeId ? 'Führe zusammen…' : 'Zusammenführen'}
              </button>
              <button
                onClick={() => setDismissed((prev) => new Set([...prev, d.newNodeId]))}
                className="rounded-xl border border-border px-3 py-1.5 text-xs font-bold text-foreground hover:bg-border/30 transition-all cursor-pointer"
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
      <h2 className="text-lg font-extrabold text-foreground tracking-tight">Hochgeladene Dokumente</h2>

      {documents.map((doc) => (
        <div key={doc.id} className="relative overflow-hidden rounded-2xl bg-surface border border-border/80 p-5 sm:p-6 shadow-sm">
          {extracting?.id === doc.id && doc.status !== 'processed' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-background border-t border-border">
              <div className="h-full animate-[slide_1.4s_ease-in-out_infinite] bg-primary" />
            </div>
          )}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-bold text-foreground text-sm sm:text-base leading-snug">{doc.filename}</p>
              <p className="text-xs text-muted font-medium mt-0.5">
                {new Date(doc.uploadedAt).toLocaleDateString('de-DE')}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide border ${
                  doc.status === 'processed'
                    ? 'bg-success/10 text-success border-success/20'
                    : 'bg-warning/10 text-warning border-warning/20'
                }`}
              >
                {doc.status === 'processed' ? 'verarbeitet' : 'hochgeladen'}
              </span>

              <button
                onClick={() => handleDelete(doc.id, doc.filename)}
                disabled={deleting === doc.id || extracting?.id === doc.id}
                className="rounded-xl p-2 text-muted hover:bg-danger/10 hover:text-danger border border-transparent hover:border-danger/20 transition-all shrink-0"
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
                <div className="flex flex-col items-end gap-1.5">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleExtract(doc.id)}
                      disabled={extracting !== null}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-primary hover:bg-primary/95 text-white px-3.5 py-2 text-xs font-bold transition-all shadow-md shadow-primary/10 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
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
                      className="inline-flex items-center gap-1.5 rounded-xl bg-secondary hover:bg-secondary/95 text-white px-3.5 py-2 text-xs font-bold transition-all shadow-md shadow-secondary/10 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
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
                  <p className="text-[10px] text-muted font-semibold text-right max-w-xs leading-normal">
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
            <div className="mt-4 rounded-xl bg-danger/10 border border-danger/20 px-3.5 py-2.5 text-xs font-bold text-danger animate-fade-in">
              <p>{errors[doc.id]}</p>
              <p className="mt-1 text-[10px] opacity-90">
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
            <div className="mt-5 border-t border-border/60 pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCollapsed((prev) => {
                    const next = new Set(prev)
                    next.has(doc.id) ? next.delete(doc.id) : next.add(doc.id)
                    return next
                  })}
                  className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-muted hover:text-foreground transition-colors"
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
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    + Knoten hinzufügen
                  </button>
                )}
              </div>

              {!collapsed.has(doc.id) && (
                <div className="space-y-3">
                  <ul className="space-y-2.5">
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
                    <div className="pt-1">
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
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
