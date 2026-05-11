"use client"

import { useState } from "react"
import Link from "next/link"
import { deleteLesson } from "@/lib/actions/admin"

interface Lesson {
  id: string
  title: string
  type: string
  status: string
  sortOrder: number
  subject: {
    title: string
    color: string
  }
}

interface ContentManagementTableProps {
  initialLessons: Lesson[]
}

export function ContentManagementTable({ initialLessons }: ContentManagementTableProps) {
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons)
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleDelete = async (lessonId: string, title: string) => {
    if (!confirm(`Möchtest du die Lektion "${title}" wirklich unwiderruflich löschen?`)) return

    setIsDeletingId(lessonId)
    setErrorMessage(null)

    try {
      await deleteLesson(lessonId)
      setLessons(prev => prev.filter(l => l.id !== lessonId))
    } catch (err: any) {
      setErrorMessage(err.message || "Fehler beim Löschen der Lektion.")
    } finally {
      setIsDeletingId(null)
    }
  }

  return (
    <div className="space-y-6">
      {errorMessage && (
        <div className="p-4 rounded-xl bg-danger/10 border border-danger/20 text-danger text-xs font-bold flex items-center gap-2.5">
          <i className="ph-fill ph-x-circle text-lg"></i>
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="bg-surface border border-border rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background/50 border-b border-border text-xs font-bold text-muted uppercase">
                <th className="p-4 md:p-5">Lektion</th>
                <th className="p-4 md:p-5">Fach</th>
                <th className="p-4 md:p-5">Typ</th>
                <th className="p-4 md:p-5">Status</th>
                <th className="p-4 md:p-5">Reihenfolge</th>
                <th className="p-4 md:p-5 text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-sm">
              {lessons.map((l) => (
                <tr key={l.id} className="hover:bg-background/20 transition duration-150">
                  <td className="p-4 md:p-5 font-bold text-foreground">
                    {l.title}
                  </td>
                  <td className="p-4 md:p-5">
                    <span 
                      className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                      style={{ backgroundColor: `${l.subject.color}15`, color: l.subject.color }}
                    >
                      {l.subject.title}
                    </span>
                  </td>
                  <td className="p-4 md:p-5 capitalize">
                    <span className={`text-xs font-bold ${
                      l.type === "quiz" ? "text-purple-500" : "text-blue-500"
                    }`}>
                      {l.type === "quiz" ? "Quiz" : "Lektion"}
                    </span>
                  </td>
                  <td className="p-4 md:p-5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      l.status === "published" 
                        ? "bg-success/10 text-success border border-success/10" 
                        : "bg-warning/10 text-warning border border-warning/10"
                    }`}>
                      {l.status === "published" ? "Veröffentlicht" : "Entwurf"}
                    </span>
                  </td>
                  <td className="p-4 md:p-5 font-semibold text-muted text-center max-w-[80px]">
                    #{l.sortOrder}
                  </td>
                  <td className="p-4 md:p-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/editor?lessonId=${l.id}`}
                        className="p-2 rounded-lg border border-border bg-background text-muted hover:text-foreground hover:bg-border/30 transition shrink-0"
                        title="Inhalt bearbeiten"
                      >
                        <i className="ph ph-note-pencil text-sm"></i>
                      </Link>
                      
                      <button
                        disabled={isDeletingId === l.id}
                        onClick={() => handleDelete(l.id, l.title)}
                        className="p-2 rounded-lg border border-danger/20 bg-danger/5 text-danger hover:bg-danger/10 transition shrink-0"
                        title="Lektion löschen"
                      >
                        <i className="ph ph-trash text-sm"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {lessons.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-muted">
                    Bisher wurden keine Lektionen erstellt.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
