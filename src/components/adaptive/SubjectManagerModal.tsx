'use client'

import { useState } from 'react'

type Subject = { id: string; title: string; color: string }

interface Props {
  subjects: Subject[]
  onClose: () => void
  onChanged: (subjects: Subject[]) => void
}

export default function SubjectManagerModal({ subjects: initial, onClose, onChanged }: Props) {
  const [subjects, setSubjects] = useState<Subject[]>(initial)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editColor, setEditColor] = useState('')
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const [createName, setCreateName] = useState('')
  const [createColor, setCreateColor] = useState('#6366f1')
  const [createError, setCreateError] = useState('')
  const [createLoading, setCreateLoading] = useState(false)

  function startEdit(s: Subject) {
    setEditingId(s.id)
    setEditTitle(s.title)
    setEditColor(s.color)
    setError('')
  }

  async function saveEdit(id: string) {
    if (!editTitle.trim() || editTitle.trim().length < 2) {
      setError('Name muss mindestens 2 Zeichen haben')
      return
    }
    setLoading(id)
    setError('')
    const res = await fetch(`/api/adaptive/subjects/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTitle.trim(), color: editColor }),
    })
    const data = await res.json() as Subject & { error?: string }
    setLoading(null)
    if (!res.ok) {
      setError(data.error ?? 'Fehler beim Speichern')
      return
    }
    const updated = subjects.map((s) => s.id === id ? { ...s, title: data.title, color: data.color } : s)
    setSubjects(updated)
    onChanged(updated)
    setEditingId(null)
  }

  async function handleDelete(id: string) {
    setLoading(id)
    setError('')
    const res = await fetch(`/api/adaptive/subjects/${id}`, { method: 'DELETE' })
    const data = await res.json() as { error?: string }
    setLoading(null)
    if (!res.ok) {
      setError(data.error ?? 'Fehler beim Löschen')
      setConfirmDeleteId(null)
      return
    }
    const updated = subjects.filter((s) => s.id !== id)
    setSubjects(updated)
    onChanged(updated)
    setConfirmDeleteId(null)
  }

  async function handleCreate() {
    if (!createName.trim() || createName.trim().length < 2) {
      setCreateError('Name muss mindestens 2 Zeichen haben')
      return
    }
    setCreateLoading(true)
    setCreateError('')
    const res = await fetch('/api/adaptive/subjects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: createName.trim(), color: createColor }),
    })
    const data = await res.json() as Subject & { error?: string }
    setCreateLoading(false)
    if (!res.ok) {
      setCreateError(data.error ?? 'Fehler beim Anlegen')
      return
    }
    const updated = [...subjects, { id: data.id, title: data.title, color: data.color }]
    setSubjects(updated)
    onChanged(updated)
    setCreateName('')
    setCreateColor('#6366f1')
    setShowCreate(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-800 shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-700 px-5 py-4">
          <h2 className="font-semibold text-gray-900 dark:text-slate-100">Fächer verwalten</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-300"
            aria-label="Schließen"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-slate-700 max-h-96 overflow-y-auto px-2 py-2">
          {subjects.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-gray-400 dark:text-slate-500">Keine Fächer vorhanden</p>
          )}
          {subjects.map((s) => (
            <div key={s.id} className="px-3 py-3">
              {confirmDeleteId === s.id ? (
                <div className="space-y-2">
                  <p className="text-sm text-red-600 dark:text-red-400">
                    <strong>„{s.title}"</strong> und alle zugehörigen Dokumente, Konzepte und Aufgaben werden unwiderruflich gelöscht.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => void handleDelete(s.id)}
                      disabled={loading === s.id}
                      className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-50"
                    >
                      {loading === s.id ? 'Wird gelöscht…' : 'Ja, löschen'}
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(null)}
                      className="rounded-lg border border-gray-200 dark:border-slate-600 px-3 py-1.5 text-xs text-gray-600 dark:text-slate-400"
                    >
                      Abbrechen
                    </button>
                  </div>
                </div>
              ) : editingId === s.id ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') void saveEdit(s.id); if (e.key === 'Escape') setEditingId(null) }}
                      className="flex-1 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-2 py-1 text-sm text-gray-900 dark:text-slate-100 focus:border-blue-400 focus-visible:outline-none"
                      autoFocus
                    />
                    <input
                      type="color"
                      value={editColor}
                      onChange={(e) => setEditColor(e.target.value)}
                      className="h-8 w-10 cursor-pointer rounded border border-gray-200 dark:border-slate-600"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => void saveEdit(s.id)}
                      disabled={loading === s.id}
                      className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                      {loading === s.id ? 'Speichern…' : 'Speichern'}
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="rounded-lg border border-gray-200 dark:border-slate-600 px-3 py-1 text-xs text-gray-600 dark:text-slate-400"
                    >
                      Abbrechen
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="h-3 w-3 shrink-0 rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                    <span className="truncate text-sm text-gray-800 dark:text-slate-200">{s.title}</span>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button
                      onClick={() => startEdit(s)}
                      className="rounded p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      aria-label="Umbenennen"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H7v-3a2 2 0 01.586-1.414z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => { setConfirmDeleteId(s.id); setEditingId(null) }}
                      className="rounded p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                      aria-label="Löschen"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {error && (
          <p className="mx-5 mb-2 rounded-lg bg-red-50 dark:bg-red-950 px-3 py-2 text-xs text-red-600 dark:text-red-400">
            {error}
          </p>
        )}

        <div className="border-t border-gray-100 dark:border-slate-700 px-5 py-3 space-y-3">
          {showCreate ? (
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-700 dark:text-slate-300">Neues Fach</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Fachname (z.B. Mathe, BWL…)"
                  value={createName}
                  onChange={(e) => setCreateName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') void handleCreate(); if (e.key === 'Escape') setShowCreate(false) }}
                  className="flex-1 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-2 py-1 text-sm text-gray-900 dark:text-slate-100 focus:border-blue-400 focus-visible:outline-none"
                  autoFocus
                />
                <input
                  type="color"
                  value={createColor}
                  onChange={(e) => setCreateColor(e.target.value)}
                  className="h-8 w-10 cursor-pointer rounded border border-gray-200 dark:border-slate-600"
                />
              </div>
              {createError && (
                <p className="text-xs text-red-600 dark:text-red-400">{createError}</p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => void handleCreate()}
                  disabled={createLoading}
                  className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {createLoading ? 'Anlegen…' : 'Anlegen'}
                </button>
                <button
                  onClick={() => { setShowCreate(false); setCreateError(''); setCreateName(''); setCreateColor('#6366f1') }}
                  className="rounded-lg border border-gray-200 dark:border-slate-600 px-3 py-1.5 text-xs text-gray-600 dark:text-slate-400"
                >
                  Abbrechen
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowCreate(true)}
              className="w-full rounded-lg border border-dashed border-gray-300 dark:border-slate-600 py-2 text-xs text-gray-500 dark:text-slate-400 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              + Neues Fach anlegen
            </button>
          )}
          <button
            onClick={onClose}
            className="w-full rounded-lg border border-gray-200 dark:border-slate-600 py-2 text-sm text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  )
}
