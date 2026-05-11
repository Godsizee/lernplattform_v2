"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface TopbarProps {
  user: any
  onMenuClick: () => void
}

interface SubjectResult {
  id: string
  title: string
  color: string
  icon: string
}

interface LessonResult {
  id: string
  title: string
  type: string
  subject: {
    title: string
    color: string
  }
}

export function Topbar({ user, onMenuClick }: TopbarProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [subjects, setSubjects] = useState<SubjectResult[]>([])
  const [lessons, setLessons] = useState<LessonResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Handle outside click to close search dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle keyboard shortcut Esc to close
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  // Debounced search trigger
  useEffect(() => {
    if (query.trim().length < 2) {
      setSubjects([])
      setLessons([])
      setIsLoading(false)
      setIsOpen(false)
      return
    }

    const delayDebounce = setTimeout(async () => {
      setIsLoading(true)
      setIsOpen(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        if (res.ok) {
          const data = await res.json()
          setSubjects(data.subjects || [])
          setLessons(data.lessons || [])
        }
      } catch (err) {
        console.error("Fehler beim Suchen:", err)
      } finally {
        setIsLoading(false)
      }
    }, 300) // 300ms debounce delay

    return () => clearTimeout(delayDebounce)
  }, [query])

  const handleResultClick = (href: string) => {
    setIsOpen(false)
    setQuery("")
    router.push(href)
  }

  const hasResults = subjects.length > 0 || lessons.length > 0

  return (
    <header className="h-16 border-b border-border/80 bg-surface/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 md:px-8 shrink-0">
      <div className="flex items-center gap-3 w-full max-w-md" ref={dropdownRef}>
        {/* Mobile Sidebar Hamburger Toggle */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl border border-border bg-background text-foreground hover:bg-border/30 transition-all shrink-0"
          title="Menü öffnen"
        >
          <i className="ph ph-list text-xl"></i>
        </button>

        {/* Global Search Bar Wrapper */}
        <div className="flex items-center w-full relative">
          <i className="ph ph-magnifying-glass absolute left-3.5 text-muted text-lg"></i>
          <input 
            type="text" 
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => {
              if (query.trim().length >= 2) {
                setIsOpen(true)
              }
            }}
            placeholder="Fächer, Artikel oder Quizzes suchen..." 
            className="w-full bg-background/50 border border-border rounded-full py-2 pl-10 pr-10 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-foreground"
          />

          {/* Spinner / Close indicator */}
          {isLoading ? (
            <div className="absolute right-3.5 flex items-center justify-center">
              <div className="w-4.5 h-4.5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : query ? (
            <button 
              onClick={() => {
                setQuery("")
                setIsOpen(false)
              }}
              className="absolute right-3.5 text-muted hover:text-foreground transition-colors p-0.5"
              title="Suche zurücksetzen"
            >
              <i className="ph ph-x text-sm"></i>
            </button>
          ) : null}

          {/* Search Dropdown Panel */}
          {isOpen && query.trim().length >= 2 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-surface/95 border border-border rounded-2xl shadow-xl overflow-hidden backdrop-blur-lg z-50 flex flex-col max-h-[420px] animate-slide-up">
              
              {/* If search is loading and has no results yet */}
              {isLoading && !hasResults && (
                <div className="p-8 text-center text-sm text-muted">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  Suche läuft...
                </div>
              )}

              {/* Empty state */}
              {!isLoading && !hasResults && (
                <div className="p-8 text-center text-sm text-muted">
                  <i className="ph ph-smiley-sad text-3xl mb-2 text-muted block"></i>
                  Keine Treffer für &bdquo;<strong className="text-foreground">{query}</strong>&ldquo; gefunden.
                </div>
              )}

              {/* Categorized Results */}
              <div className="overflow-y-auto divide-y divide-border/40">
                {/* 1. Subjects Category */}
                {subjects.length > 0 && (
                  <div className="p-3 space-y-1">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider px-2 block mb-1">
                      Fächer ({subjects.length})
                    </span>
                    {subjects.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => handleResultClick(`/subjects/${sub.id}`)}
                        className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-background/80 transition group"
                      >
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${sub.color}15`, color: sub.color }}
                        >
                          <i className={`ph ${sub.icon} text-lg`}></i>
                        </div>
                        <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                          {sub.title}
                        </span>
                        <i className="ph ph-arrow-right text-xs text-muted ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"></i>
                      </button>
                    ))}
                  </div>
                )}

                {/* 2. Lessons & Quizzes Category */}
                {lessons.length > 0 && (
                  <div className="p-3 space-y-1">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider px-2 block mb-1">
                      Lektionen & Quizzes ({lessons.length})
                    </span>
                    {lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => handleResultClick(`/lessons/${lesson.id}`)}
                        className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-background/80 transition group"
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          lesson.type === "quiz" 
                            ? "bg-warning/10 text-warning" 
                            : "bg-primary/10 text-primary"
                        }`}>
                          <i className={`ph ${lesson.type === "quiz" ? "ph-brain" : "ph-book-open"} text-lg`}></i>
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                            {lesson.title}
                          </span>
                          <span className="text-[10px] font-semibold text-muted flex items-center gap-1.5 mt-0.5">
                            <span 
                              className="w-1.5 h-1.5 rounded-full" 
                              style={{ backgroundColor: lesson.subject.color }}
                            ></span>
                            {lesson.subject.title}
                          </span>
                        </div>
                        <span className="text-[9px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-md bg-background border border-border text-muted shrink-0 group-hover:border-primary/20 group-hover:text-primary transition-all">
                          {lesson.type === "quiz" ? "Quiz" : "Artikel"}
                        </span>
                        <i className="ph ph-arrow-right text-xs text-muted ml-1.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"></i>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer hint */}
              {hasResults && (
                <div className="p-2.5 bg-background/40 border-t border-border/40 text-center text-[10px] text-muted font-medium flex items-center justify-center gap-1">
                  <i className="ph ph-keyboard"></i> Drücke <kbd className="px-1 py-0.5 bg-surface border border-border rounded text-[9px] font-sans font-bold">Esc</kbd> zum Schließen.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <div className="text-sm text-muted hidden md:block">
          Schön dich hier zu haben, <strong className="text-foreground font-bold">{user?.name}</strong>!
        </div>
      </div>
    </header>
  )
}
