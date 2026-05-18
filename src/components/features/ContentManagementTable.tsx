"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { deleteLesson, createSubject, updateSubject, deleteSubject } from "@/lib/actions/admin"

interface Lesson {
  id: string
  title: string
  type: string
  status: string
  sortOrder: number
  subjectId: string
  subject: {
    title: string
    color: string
  }
}

interface Subject {
  id: string
  title: string
  color: string
  icon: string
  _count?: {
    lessons: number
  }
}

interface ContentManagementTableProps {
  initialLessons: Lesson[]
  initialSubjects: Subject[]
}

const COLOR_PRESETS = [
  { name: "Saphir-Blau", value: "#3b82f6" },
  { name: "Smaragd-Grün", value: "#10b981" },
  { name: "Amethyst-Violett", value: "#8b5cf6" },
  { name: "Warmes Bernstein", value: "#f59e0b" },
  { name: "Sonnenuntergang-Orange", value: "#f97316" },
  { name: "Rubin-Rot", value: "#ef4444" },
  { name: "Tiefes Teal", value: "#14b8a6" },
  { name: "Leuchtendes Indigo", value: "#4f46e5" }
]

const ICON_PRESETS = [
  { class: "ph-book", name: "Lesen/Theorie" },
  { class: "ph-code", name: "Programmierung" },
  { class: "ph-database", name: "Datenbanken" },
  { class: "ph-terminal-window", name: "Terminal/Editor" },
  { class: "ph-calculator", name: "Mathematik" },
  { class: "ph-cpu", name: "Hardware/IT" },
  { class: "ph-globe", name: "Webentwicklung" },
  { class: "ph-shield-check", name: "Netzwerksicherheit" },
  { class: "ph-atom", name: "Naturwissenschaften" },
  { class: "ph-chart-bar", name: "Analysen" },
  { class: "ph-lightbulb", name: "Konzepte" },
  { class: "ph-gear", name: "DevOps/Tools" }
]

export function ContentManagementTable({ initialLessons, initialSubjects }: ContentManagementTableProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"lessons" | "subjects">("lessons")

  // State sync from props (official React key-adjustment rendering pattern)
  const [prevLessons, setPrevLessons] = useState<Lesson[]>(initialLessons)
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons)
  if (initialLessons !== prevLessons) {
    setPrevLessons(initialLessons)
    setLessons(initialLessons)
  }

  const [prevSubjects, setPrevSubjects] = useState<Subject[]>(initialSubjects)
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects)
  if (initialSubjects !== prevSubjects) {
    setPrevSubjects(initialSubjects)
    setSubjects(initialSubjects)
  }

  // Lesson actions & filters
  const [isDeletingLessonId, setIsDeletingLessonId] = useState<string | null>(null)
  const [lessonSearch, setLessonSearch] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Subject modals state
  const [subjectModalOpen, setSubjectModalOpen] = useState(false)
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null)
  const [isSavingSubject, setIsSavingSubject] = useState(false)

  // Subject Form State
  const [subjectTitle, setSubjectTitle] = useState("")
  const [subjectColor, setSubjectColor] = useState("#3b82f6")
  const [subjectIcon, setSubjectIcon] = useState("ph-book")

  // Subject Delete safety modal state
  const [deleteSubjectModalOpen, setDeleteSubjectModalOpen] = useState(false)
  const [deletingSubject, setDeletingSubject] = useState<Subject | null>(null)
  const [deleteConfirmText, setDeleteConfirmText] = useState("")
  const [isDeletingSubject, setIsDeletingSubject] = useState(false)

  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Reset messages after 5 seconds
  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null)
        setSuccessMessage(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errorMessage, successMessage])

  // Lesson Handlers
  const handleDeleteLesson = async (lessonId: string, title: string) => {
    if (!confirm(`Möchtest du die Lektion "${title}" wirklich unwiderruflich löschen?`)) return

    setIsDeletingLessonId(lessonId)
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      await deleteLesson(lessonId)
      setLessons(prev => prev.filter(l => l.id !== lessonId))
      setSuccessMessage(`Lektion "${title}" wurde erfolgreich gelöscht.`)
      router.refresh()
    } catch (err: unknown) {
      const error = err as Error
      setErrorMessage(error.message || "Fehler beim Löschen der Lektion.")
    } finally {
      setIsDeletingLessonId(null)
    }
  }

  // Open Subject Modal (Create Mode)
  const openCreateSubjectModal = () => {
    setEditingSubject(null)
    setSubjectTitle("")
    setSubjectColor("#3b82f6")
    setSubjectIcon("ph-book")
    setSubjectModalOpen(true)
  }

  // Open Subject Modal (Edit Mode)
  const openEditSubjectModal = (subject: Subject) => {
    setEditingSubject(subject)
    setSubjectTitle(subject.title)
    setSubjectColor(subject.color)
    setSubjectIcon(subject.icon)
    setSubjectModalOpen(true)
  }

  // Handle Subject Form Submit (Create or Update)
  const handleSubjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!subjectTitle.trim()) {
      setErrorMessage("Bitte gib einen Fächertitel ein.")
      return
    }

    setIsSavingSubject(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      if (editingSubject) {
        // Update subject
        await updateSubject(editingSubject.id, {
          title: subjectTitle.trim(),
          color: subjectColor,
          icon: subjectIcon
        })
        setSuccessMessage(`Das Fach "${subjectTitle}" wurde erfolgreich aktualisiert.`)
      } else {
        // Create subject
        await createSubject({
          title: subjectTitle.trim(),
          color: subjectColor,
          icon: subjectIcon
        })
        setSuccessMessage(`Das Fach "${subjectTitle}" wurde erfolgreich angelegt.`)
      }
      setSubjectModalOpen(false)
      router.refresh()
    } catch (err: unknown) {
      const error = err as Error
      setErrorMessage(error.message || "Fehler beim Speichern des Fachs.")
    } finally {
      setIsSavingSubject(false)
    }
  }

  // Open Cascading Subject Delete Modal
  const openDeleteSubjectModal = (subject: Subject) => {
    setDeletingSubject(subject)
    setDeleteConfirmText("")
    setDeleteSubjectModalOpen(true)
  }

  // Confirm Cascading Subject Delete
  const handleSubjectDeleteConfirm = async () => {
    if (!deletingSubject) return
    if (deleteConfirmText !== deletingSubject.title) {
      setErrorMessage("Der eingegebene Name stimmt nicht mit dem Fachnamen überein.")
      return
    }

    setIsDeletingSubject(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      await deleteSubject(deletingSubject.id)
      setSuccessMessage(`Das Fach "${deletingSubject.title}" und alle zugehörigen Lektionen wurden erfolgreich gelöscht.`)
      setDeleteSubjectModalOpen(false)
      setDeletingSubject(null)
      router.refresh()
    } catch (err: unknown) {
      const error = err as Error
      setErrorMessage(error.message || "Fehler beim Löschen des Fachs.")
    } finally {
      setIsDeletingSubject(false)
    }
  }

  // Filter lessons
  const filteredLessons = lessons.filter((l) => {
    const matchesSearch = l.title.toLowerCase().includes(lessonSearch.toLowerCase()) ||
                          l.subject.title.toLowerCase().includes(lessonSearch.toLowerCase())
    const matchesSubject = subjectFilter === "all" || l.subjectId === subjectFilter
    const matchesType = typeFilter === "all" || l.type === typeFilter
    const matchesStatus = statusFilter === "all" || l.status === statusFilter
    return matchesSearch && matchesSubject && matchesType && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Dynamic Alerts */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-danger/10 border border-danger/20 text-danger text-xs font-bold flex items-center gap-2.5 animate-slide-in">
          <i className="ph-fill ph-x-circle text-lg"></i>
          <span>{errorMessage}</span>
        </div>
      )}
      {successMessage && (
        <div className="p-4 rounded-xl bg-success/10 border border-success/20 text-success text-xs font-bold flex items-center gap-2.5 animate-slide-in">
          <i className="ph-fill ph-check-circle text-lg"></i>
          <span>{successMessage}</span>
        </div>
      )}

      {/* Tabs Layout */}
      <div className="flex border-b border-border/80 gap-6 shrink-0">
        <button
          onClick={() => setActiveTab("lessons")}
          className={`pb-4 text-sm font-extrabold transition-all relative flex items-center gap-2 cursor-pointer ${
            activeTab === "lessons" 
              ? "text-primary border-b-2 border-primary" 
              : "text-muted hover:text-foreground"
          }`}
        >
          <i className="ph ph-article text-lg"></i>
          Lektionen & Quizze
          <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
            {lessons.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("subjects")}
          className={`pb-4 text-sm font-extrabold transition-all relative flex items-center gap-2 cursor-pointer ${
            activeTab === "subjects" 
              ? "text-primary border-b-2 border-primary" 
              : "text-muted hover:text-foreground"
          }`}
        >
          <i className="ph ph-books text-lg"></i>
          Fächer-Verwaltung
          <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
            {subjects.length}
          </span>
        </button>
      </div>

      {/* --------------------- TAB 1: LESSONS & QUIZZES --------------------- */}
      {activeTab === "lessons" && (
        <div className="space-y-6 animate-fade-in">
          {/* Advanced Search & Filtering Dashboard */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-surface border border-border p-4 rounded-3xl shadow-sm">
            {/* Search Input */}
            <div className="relative w-full lg:max-w-md">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                <i className="ph ph-magnifying-glass text-lg"></i>
              </span>
              <input
                type="text"
                placeholder="Lektionen nach Titel oder Fach durchsuchen..."
                value={lessonSearch}
                onChange={(e) => setLessonSearch(e.target.value)}
                className="w-full bg-background border border-border rounded-2xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all font-semibold"
              />
            </div>

            {/* Filter Dropdowns Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto shrink-0">
              {/* Subject Filter */}
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="bg-background border border-border rounded-2xl px-4 py-2.5 text-xs font-bold text-muted focus:outline-none focus:border-primary transition-all cursor-pointer"
              >
                <option value="all">Alle Fächer</option>
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>

              {/* Type Filter */}
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-background border border-border rounded-2xl px-4 py-2.5 text-xs font-bold text-muted focus:outline-none focus:border-primary transition-all cursor-pointer"
              >
                <option value="all">Alle Typen</option>
                <option value="article">Artikel (MD)</option>
                <option value="quiz">Quizze (JSON)</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-background border border-border rounded-2xl px-4 py-2.5 text-xs font-bold text-muted focus:outline-none focus:border-primary transition-all cursor-pointer"
              >
                <option value="all">Alle Status</option>
                <option value="published">Veröffentlicht</option>
                <option value="draft">Entwurf</option>
              </select>
            </div>
          </div>

          {/* Lessons Table */}
          <div className="bg-surface border border-border rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-background/50 border-b border-border text-xs font-bold text-muted uppercase">
                    <th className="p-4 md:p-5">Lektionstitel</th>
                    <th className="p-4 md:p-5">Zugeordnetes Fach</th>
                    <th className="p-4 md:p-5">Typ</th>
                    <th className="p-4 md:p-5">Status</th>
                    <th className="p-4 md:p-5 text-center">Reihenfolge</th>
                    <th className="p-4 md:p-5 text-right">Aktionen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 text-sm">
                  {filteredLessons.map((l) => (
                    <tr key={l.id} className="hover:bg-background/20 transition duration-150">
                      <td className="p-4 md:p-5 font-bold text-foreground max-w-[200px] md:max-w-xs truncate">
                        {l.title}
                      </td>
                      <td className="p-4 md:p-5">
                        <span 
                          className="text-xs font-extrabold px-3 py-1 rounded-full border"
                          style={{ 
                            backgroundColor: `${l.subject.color}15`, 
                            color: l.subject.color,
                            borderColor: `${l.subject.color}25`
                          }}
                        >
                          {l.subject.title}
                        </span>
                      </td>
                      <td className="p-4 md:p-5 capitalize">
                        <span className={`text-xs font-extrabold flex items-center gap-1.5 ${
                          l.type === "quiz" ? "text-purple-500" : "text-blue-500"
                        }`}>
                          <i className={`ph ${l.type === "quiz" ? "ph-trophy" : "ph-book-open"}`}></i>
                          {l.type === "quiz" ? "Quiz" : "Artikel"}
                        </span>
                      </td>
                      <td className="p-4 md:p-5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          l.status === "published" 
                            ? "bg-success/10 text-success border border-success/15" 
                            : "bg-warning/10 text-warning border border-warning/15"
                        }`}>
                          {l.status === "published" ? "Veröffentlicht" : "Entwurf"}
                        </span>
                      </td>
                      <td className="p-4 md:p-5 font-bold text-muted text-center">
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
                            disabled={isDeletingLessonId === l.id}
                            onClick={() => handleDeleteLesson(l.id, l.title)}
                            className="p-2 rounded-lg border border-danger/20 bg-danger/5 text-danger hover:bg-danger/10 transition shrink-0 cursor-pointer"
                            title="Lektion löschen"
                          >
                            <i className={`ph ${isDeletingLessonId === l.id ? "ph-spinner ph-spin" : "ph-trash"} text-sm`}></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredLessons.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-muted font-bold text-xs">
                        Keine Lektionen gefunden, die den Suchkriterien entsprechen.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* --------------------- TAB 2: SUBJECTS MANAGEMENT (CRUD) --------------------- */}
      {activeTab === "subjects" && (
        <div className="space-y-6 animate-fade-in">
          {/* Header Actions */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold tracking-tight">Eingerichtete Fächer</h2>
              <p className="text-xs text-muted">Erstelle, aktualisiere oder lösche deine Lehrplan-Kategorien.</p>
            </div>
            <button
              onClick={openCreateSubjectModal}
              className="px-4 py-2 bg-primary hover:bg-primary/95 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-primary/10 flex items-center gap-1.5 cursor-pointer"
            >
              <i className="ph ph-plus-circle text-sm"></i> Neues Fach anlegen
            </button>
          </div>

          {/* Subjects Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <div 
                key={subject.id}
                className="bg-surface border border-border rounded-3xl p-6 shadow-sm flex flex-col justify-between h-[180px] group hover:border-primary/30 transition duration-300"
              >
                {/* Subject Details Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 border transition-all group-hover:scale-105"
                      style={{ 
                        backgroundColor: `${subject.color}15`, 
                        color: subject.color,
                        borderColor: `${subject.color}20`
                      }}
                    >
                      <i className={`ph ${subject.icon || "ph-book"}`}></i>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-extrabold text-base text-foreground truncate">{subject.title}</h3>
                      <p className="text-xs text-muted font-semibold mt-0.5">
                        {subject._count?.lessons || 0} {subject._count?.lessons === 1 ? "zugeordnete Lektion" : "zugeordnete Lektionen"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Operations Actions Footer */}
                <div className="flex justify-between items-center border-t border-border/40 pt-4 mt-auto">
                  {/* Visual Color Pill indicator */}
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-3.5 h-3.5 rounded-full border border-black/10 dark:border-white/10"
                      style={{ backgroundColor: subject.color }}
                    />
                    <span className="text-[10px] font-bold text-muted tracking-wider uppercase">
                      {subject.color}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditSubjectModal(subject)}
                      className="p-2 rounded-xl border border-border bg-background text-muted hover:text-foreground hover:bg-border/30 transition cursor-pointer"
                      title="Fach bearbeiten"
                    >
                      <i className="ph ph-note-pencil text-sm"></i>
                    </button>
                    <button
                      onClick={() => openDeleteSubjectModal(subject)}
                      className="p-2 rounded-xl border border-danger/10 bg-danger/5 text-danger hover:bg-danger/10 transition cursor-pointer"
                      title="Fach inklusive aller Lektionen löschen"
                    >
                      <i className="ph ph-trash text-sm"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {subjects.length === 0 && (
              <div className="col-span-full bg-surface border border-border rounded-3xl p-12 text-center text-muted font-bold text-xs space-y-2">
                <i className="ph ph-books text-4xl text-primary block mb-1"></i>
                Bisher wurden keine Fächer angelegt. Klicke auf &quot;Neues Fach anlegen&quot;, um zu starten.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================== SUBJECT FORM MODAL (CREATE / EDIT) ===================== */}
      {subjectModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form 
            onSubmit={handleSubjectSubmit}
            className="bg-surface border border-border rounded-3xl p-6 md:p-8 max-w-lg w-full space-y-6 shadow-2xl animate-scale-up"
          >
            <div className="border-b border-border/60 pb-3 flex items-center justify-between">
              <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
                <i className={`ph ${editingSubject ? "ph-note-pencil" : "ph-plus-circle"} text-primary`}></i>
                {editingSubject ? "Fach anpassen" : "Neues Fach anlegen"}
              </h3>
              <button 
                type="button"
                onClick={() => setSubjectModalOpen(false)}
                className="w-8 h-8 rounded-lg text-muted hover:text-foreground hover:bg-border/30 flex items-center justify-center transition cursor-pointer"
              >
                <i className="ph ph-x text-lg"></i>
              </button>
            </div>

            <div className="space-y-5">
              {/* Field 1: Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted uppercase">Titel des Fachs</label>
                <input
                  type="text"
                  required
                  placeholder="z.B. Relationale Datenbanken"
                  value={subjectTitle}
                  onChange={(e) => setSubjectTitle(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/25 transition-all font-semibold"
                />
              </div>

              {/* Field 2: Color Picker Presets Grid */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase block">Themenfarbe</label>
                <div className="grid grid-cols-8 gap-3">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setSubjectColor(preset.value)}
                      style={{ backgroundColor: preset.value }}
                      className={`h-8 rounded-full border transition cursor-pointer relative ${
                        subjectColor === preset.value 
                          ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-background scale-110" 
                          : "border-black/10 dark:border-white/10 hover:scale-105"
                      }`}
                      title={preset.name}
                    >
                      {subjectColor === preset.value && (
                        <i className="ph-bold ph-check text-white text-xs absolute inset-0 flex items-center justify-center"></i>
                      )}
                    </button>
                  ))}
                </div>
                {/* Custom Hex Color Picker */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden border border-border shrink-0">
                    <input
                      type="color"
                      value={subjectColor}
                      onChange={(e) => setSubjectColor(e.target.value)}
                      className="w-[150%] h-[150%] -ml-2 -mt-2 cursor-pointer border-none"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <label className="text-[10px] font-bold text-muted uppercase block">Eigener HEX-Wert</label>
                    <input
                      type="text"
                      pattern="^#([A-Fa-f0-9]{6})$"
                      placeholder="#3b82f6"
                      value={subjectColor}
                      onChange={(e) => setSubjectColor(e.target.value)}
                      className="bg-background border border-border rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 w-24 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Field 3: Icon Selector Preset Grid */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase block">Symbol / Icon</label>
                <div className="grid grid-cols-6 gap-2.5">
                  {ICON_PRESETS.map((preset) => (
                    <button
                      key={preset.class}
                      type="button"
                      onClick={() => setSubjectIcon(preset.class)}
                      className={`p-2 rounded-xl border flex items-center justify-center text-lg transition cursor-pointer ${
                        subjectIcon === preset.class
                          ? "bg-primary/10 text-primary border-primary font-bold scale-105"
                          : "border-border bg-background/50 hover:bg-border/30 text-muted"
                      }`}
                      title={preset.name}
                    >
                      <i className={`ph ${preset.class}`}></i>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions buttons */}
            <div className="pt-4 border-t border-border/60 flex justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setSubjectModalOpen(false)}
                className="px-4 py-2.5 bg-background border border-border text-foreground text-xs font-bold rounded-xl hover:bg-border/20 transition cursor-pointer"
              >
                Abbrechen
              </button>
              <button
                disabled={isSavingSubject}
                type="submit"
                className="px-5 py-2.5 bg-primary hover:bg-primary/95 text-white text-xs font-extrabold rounded-xl transition shadow-lg shadow-primary/10 disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
              >
                {isSavingSubject ? (
                  <>
                    <i className="ph ph-spinner ph-spin"></i> Speichert...
                  </>
                ) : (
                  <>
                    <i className="ph ph-floppy-disk"></i> Speichern
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ===================== CASCADING SUBJECT DELETE SAFETY MODAL ===================== */}
      {deleteSubjectModalOpen && deletingSubject && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-danger/30 rounded-3xl p-6 md:p-8 max-w-md w-full space-y-6 shadow-2xl animate-scale-up border-t-4 border-t-danger">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 bg-danger/10 text-danger rounded-full flex items-center justify-center mx-auto text-3xl">
                <i className="ph ph-warning-octagon"></i>
              </div>
              <h3 className="text-xl font-extrabold tracking-tight">Kritische Löschwarnung!</h3>
              <p className="text-xs text-muted leading-relaxed">
                Du bist im Begriff, das Fach <strong className="text-foreground">&quot;{deletingSubject.title}&quot;</strong> unwiderruflich zu löschen.
              </p>
            </div>

            {/* Alert Panel */}
            <div className="p-4 rounded-2xl bg-danger/5 border border-danger/20 text-danger text-[11px] font-medium leading-relaxed space-y-2">
              <div className="font-bold uppercase tracking-wider text-xs flex items-center gap-1.5 text-danger">
                <i className="ph-bold ph-trash"></i> Kaskadierender Datenverlust
              </div>
              <p>
                Durch dieses Löschen werden automatisch **{deletingSubject._count?.lessons || 0} zugehörige Lektionen, Quizzes sowie alle Bookmarks und Notizen der Studenten** komplett gelöscht!
              </p>
            </div>

            {/* Confirmation verification text */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-muted uppercase block leading-normal">
                Gib zur Bestätigung den genauen Namen des Fachs ein (<strong className="text-foreground font-mono">{deletingSubject.title}</strong>):
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="Name des Fachs hier eintippen..."
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-danger transition-all font-semibold"
              />
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setDeleteSubjectModalOpen(false)
                  setDeletingSubject(null)
                }}
                className="py-2.5 bg-background border border-border text-foreground text-xs font-bold rounded-xl hover:bg-border/20 transition cursor-pointer"
              >
                Abbrechen
              </button>
              <button
                disabled={isDeletingSubject || deleteConfirmText !== deletingSubject.title}
                onClick={handleSubjectDeleteConfirm}
                className="py-2.5 bg-danger text-white hover:bg-danger/95 disabled:bg-danger/40 disabled:cursor-not-allowed text-xs font-extrabold rounded-xl transition shadow-lg shadow-danger/10 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isDeletingSubject ? (
                  <>
                    <i className="ph ph-spinner ph-spin"></i> Löscht...
                  </>
                ) : (
                  <>
                    <i className="ph ph-trash"></i> Unwiderruflich löschen
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
