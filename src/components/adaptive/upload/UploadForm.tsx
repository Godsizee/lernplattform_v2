'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import SubjectManagerModal from '@/components/adaptive/SubjectManagerModal'

const MAX_SIZE_BYTES = 10 * 1024 * 1024
const ALLOWED_TYPES = ['application/pdf', 'text/plain', 'text/markdown']
const ALLOWED_EXTENSIONS = ['.pdf', '.txt', '.md']

type Subject = { id: string; title: string; color: string }

interface Props {
  subjects: Subject[]
}

export default function UploadForm({ subjects }: Props) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const [subjectId, setSubjectId] = useState<string>('')
  const [showNewSubject, setShowNewSubject] = useState(false)
  const [showManager, setShowManager] = useState(false)
  const [newSubjectName, setNewSubjectName] = useState('')
  const [newSubjectColor, setNewSubjectColor] = useState('#6366f1')
  const [localSubjects, setLocalSubjects] = useState<Subject[]>(subjects)
  const [subjectError, setSubjectError] = useState('')

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError('')
    setSuccess('')
    const selected = e.target.files?.[0] ?? null

    if (!selected) {
      setFile(null)
      return
    }

    if (selected.size > MAX_SIZE_BYTES) {
      setError('Datei zu groß (max. 10 MB)')
      setFile(null)
      return
    }

    const ext = '.' + selected.name.split('.').pop()?.toLowerCase()
    if (!ALLOWED_TYPES.includes(selected.type) && !ALLOWED_EXTENSIONS.includes(ext)) {
      setError('Format nicht unterstützt. Bitte PDF, .txt oder .md hochladen.')
      setFile(null)
      return
    }

    setFile(selected)
  }

  async function handleCreateSubject() {
    if (!newSubjectName.trim()) return
    setSubjectError('')
    const res = await fetch('/api/adaptive/subjects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newSubjectName.trim(), color: newSubjectColor }),
    })
    if (res.ok) {
      const created = await res.json() as { id: string; title: string; color: string }
      setLocalSubjects((prev) => [...prev, created])
      setSubjectId(created.id)
      setShowNewSubject(false)
      setNewSubjectName('')
    } else {
      const data = await res.json() as { error?: string }
      setSubjectError(data.error ?? 'Fehler beim Anlegen')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file || !subjectId) return

    setLoading(true)
    setError('')

    const formData = new FormData()
    formData.append('file', file)
    formData.append('subjectId', subjectId)

    const res = await fetch('/api/adaptive/documents', { method: 'POST', body: formData })
    const data = await res.json()

    if (!res.ok) {
      setError(data.error ?? 'Upload fehlgeschlagen')
      setLoading(false)
      return
    }

    setSuccess(`„${data.filename}" erfolgreich hochgeladen.`)
    setFile(null)
    if (inputRef.current) inputRef.current.value = ''
    setLoading(false)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div
        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 px-6 py-10 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
        onClick={() => inputRef.current?.click()}
      >
        <svg
          className="mb-3 h-10 w-10 text-gray-400 dark:text-slate-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>
        <p className="text-sm text-gray-600 dark:text-slate-400">
          {file ? (
            <span className="font-medium text-blue-600 dark:text-blue-400">{file.name}</span>
          ) : (
            <>
              <span className="font-medium text-blue-600 dark:text-blue-400">Datei auswählen</span> oder hierher ziehen
            </>
          )}
        </p>
        <p className="mt-1 text-xs text-gray-400 dark:text-slate-500">PDF, TXT, MD bis 10 MB</p>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.txt,.md,text/plain,text/markdown,application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Fach-Selector */}
      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="text-xs font-medium text-gray-700 dark:text-slate-300">
            Fach <span className="text-red-500">*</span>
          </label>
          {localSubjects.length > 0 && (
            <button
              type="button"
              onClick={() => setShowManager(true)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-300"
              aria-label="Fächer verwalten"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          )}
        </div>
        <select
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          className="w-full rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-gray-900 dark:text-slate-100 focus:border-blue-400 focus-visible:outline-none"
        >
          <option value="">Fach wählen…</option>
          {localSubjects.map((s) => (
            <option key={s.id} value={s.id}>{s.title}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setShowNewSubject((v) => !v)}
          className="mt-1 text-xs text-blue-600 hover:underline"
        >
          + Neues Fach anlegen
        </button>
      </div>

      {/* Inline "Neues Fach" Panel */}
      {showNewSubject && (
        <div className="rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 p-3 space-y-2">
          <p className="text-xs font-medium text-gray-700 dark:text-slate-300">Neues Fach</p>
          <input
            type="text"
            placeholder="Fachname (z.B. Java, BWL…)"
            value={newSubjectName}
            onChange={(e) => setNewSubjectName(e.target.value)}
            className="w-full rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 px-3 py-1.5 text-sm focus:border-blue-400 focus-visible:outline-none"
          />
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-600 dark:text-slate-400">Farbe:</label>
            <input
              type="color"
              value={newSubjectColor}
              onChange={(e) => setNewSubjectColor(e.target.value)}
              className="h-7 w-12 cursor-pointer rounded border border-gray-200 dark:border-slate-600"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCreateSubject}
              className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
            >
              Anlegen
            </button>
            <button
              type="button"
              onClick={() => setShowNewSubject(false)}
              className="rounded-lg border border-gray-200 dark:border-slate-600 px-3 py-1.5 text-xs text-gray-600 dark:text-slate-400"
            >
              Abbrechen
            </button>
          </div>
          {subjectError && (
            <p className="text-xs text-red-600">{subjectError}</p>
          )}
        </div>
      )}

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 dark:bg-red-950 px-3 py-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {success && (
        <p role="status" className="rounded-lg bg-green-50 dark:bg-green-950 px-3 py-2 text-sm text-green-700 dark:text-green-400">
          {success}
        </p>
      )}

      <button
        type="submit"
        disabled={!file || !subjectId || loading}
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Wird hochgeladen…' : 'Hochladen'}
      </button>

      {showManager && (
        <SubjectManagerModal
          subjects={localSubjects}
          onClose={() => { setShowManager(false); router.refresh() }}
          onChanged={(updated) => {
            setLocalSubjects(updated)
            if (!updated.find((s) => s.id === subjectId)) setSubjectId('')
          }}
        />
      )}
    </form>
  )
}
