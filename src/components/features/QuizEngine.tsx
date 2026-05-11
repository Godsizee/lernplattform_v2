"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { completeLesson } from "@/lib/actions/progress"
import confetti from "canvas-confetti"

interface Question {
  question: string
  options: Record<string, string>
  correct: string | string[]
  type: "radio" | "checkbox"
}

interface QuizEngineProps {
  questions: Question[]
  lessonId: string
  subjectId: string
}

export function QuizEngine({ questions, lessonId, subjectId }: QuizEngineProps) {
  const router = useRouter()
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [hasChecked, setHasChecked] = useState(false)
  const [score, setScore] = useState(0)
  const [incorrectQuestions, setIncorrectQuestions] = useState<Question[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  
  // Shuffled keys to avoid order bias
  const [shuffledKeys, setShuffledKeys] = useState<string[]>([])

  // Initialize and shuffle questions on mount
  useEffect(() => {
    if (questions && questions.length > 0) {
      const shuffled = [...questions].sort(() => Math.random() - 0.5)
      setActiveQuestions(shuffled)
      setCurrentIndex(0)
      setScore(0)
      setIncorrectQuestions([])
      setQuizCompleted(false)
      setHasChecked(false)
      setSelectedKeys([])
    }
  }, [questions])

  // Shuffle option keys when question changes
  useEffect(() => {
    if (activeQuestions.length > 0 && currentIndex < activeQuestions.length) {
      const q = activeQuestions[currentIndex]
      const keys = Object.keys(q.options).sort(() => Math.random() - 0.5)
      setShuffledKeys(keys)
      setSelectedKeys([])
      setHasChecked(false)
    }
  }, [activeQuestions, currentIndex])

  if (activeQuestions.length === 0) {
    return (
      <div className="text-center py-12 bg-surface border border-border rounded-2xl">
        <i className="ph ph-warning-circle text-4xl text-warning mb-2 block"></i>
        <p className="text-muted">Keine Fragen in diesem Quiz gefunden.</p>
      </div>
    )
  }

  const currentQuestion = activeQuestions[currentIndex]
  const progressPercent = Math.round((currentIndex / activeQuestions.length) * 100)

  // Handle option selection
  const handleSelect = (key: string) => {
    if (hasChecked) return // block changes after checking

    if (currentQuestion.type === "radio") {
      setSelectedKeys([key])
    } else {
      setSelectedKeys(prev => 
        prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
      )
    }
  }

  // Verify answer
  const handleCheck = () => {
    if (selectedKeys.length === 0 || hasChecked) return

    const correctAnswers = Array.isArray(currentQuestion.correct) 
      ? [...currentQuestion.correct].sort() 
      : [currentQuestion.correct]
    const userAnswers = [...selectedKeys].sort()

    const isCorrect = JSON.stringify(correctAnswers) === JSON.stringify(userAnswers)

    setHasChecked(true)

    if (isCorrect) {
      setScore(prev => prev + 1)
    } else {
      setIncorrectQuestions(prev => [...prev, currentQuestion])
    }
  }

  // Move to next question or show results
  const handleNext = async () => {
    const isLast = currentIndex === activeQuestions.length - 1
    if (!isLast) {
      setCurrentIndex(prev => prev + 1)
    } else {
      // Completed! Save progress and trigger confetti
      setQuizCompleted(true)
      const finalPercent = Math.round((score / activeQuestions.length) * 100)

      if (finalPercent >= 60) {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#a972ff", "#3fb950", "#ffbd00"]
        })
      }

      setIsSaving(true)
      try {
        await completeLesson(lessonId, finalPercent)
      } catch (err) {
        console.error("Fehler beim Speichern des Quiz-Fortschritts:", err)
      } finally {
        setIsSaving(false)
      }
    }
  }

  // Re-try incorrectly answered questions only
  const handleRetryIncorrect = () => {
    if (incorrectQuestions.length > 0) {
      const shuffled = [...incorrectQuestions].sort(() => Math.random() - 0.5)
      setActiveQuestions(shuffled)
      setCurrentIndex(0)
      setScore(0)
      setIncorrectQuestions([])
      setQuizCompleted(false)
      setHasChecked(false)
      setSelectedKeys([])
    }
  }

  // Restart entire quiz
  const handleRestart = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5)
    setActiveQuestions(shuffled)
    setCurrentIndex(0)
    setScore(0)
    setIncorrectQuestions([])
    setQuizCompleted(false)
    setHasChecked(false)
    setSelectedKeys([])
  }

  const correctAnswersList = currentQuestion 
    ? (Array.isArray(currentQuestion.correct) ? currentQuestion.correct : [currentQuestion.correct])
    : []

  return (
    <div className="max-w-2xl mx-auto bg-surface border border-border rounded-3xl p-6 md:p-8 shadow-md">
      {!quizCompleted ? (
        <div className="space-y-6">
          {/* Header Progress */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs text-muted font-bold">
              <span>FRAGE {currentIndex + 1} VON {activeQuestions.length}</span>
              <span>{progressPercent}% BEENDET</span>
            </div>
            <div className="h-2 w-full bg-background border border-border/40 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-primary uppercase tracking-wide">
              {currentQuestion.type === "checkbox" ? "Mehrfachauswahl (Checkbox)" : "Einfachauswahl (Radio)"}
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Grid of Option Cards */}
          <div className="grid grid-cols-1 gap-3">
            {shuffledKeys.map((key) => {
              const label = currentQuestion.options[key]
              const isSelected = selectedKeys.includes(key)
              const isCorrectAnswer = correctAnswersList.includes(key)
              
              let cardClass = "border-border hover:border-border/80 bg-background/50 hover:bg-background/80"
              
              if (isSelected && !hasChecked) {
                cardClass = "border-primary bg-primary/5 ring-1 ring-primary/20"
              } else if (hasChecked) {
                if (isCorrectAnswer) {
                  cardClass = "border-success bg-success/10 text-success ring-1 ring-success/20"
                } else if (isSelected) {
                  cardClass = "border-danger bg-danger/10 text-danger ring-1 ring-danger/20"
                } else {
                  cardClass = "border-border/40 opacity-60 bg-background/20"
                }
              }

              return (
                <button
                  key={key}
                  disabled={hasChecked}
                  onClick={() => handleSelect(key)}
                  className={`w-full text-left p-4 rounded-2xl border flex items-center justify-between gap-4 transition duration-200 cursor-pointer disabled:cursor-default ${cardClass}`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`w-8 h-8 rounded-lg font-bold text-sm flex items-center justify-center shrink-0 border ${
                      isSelected 
                        ? "bg-primary text-white border-primary" 
                        : "bg-surface text-muted border-border"
                    }`}>
                      {key}
                    </span>
                    <span className="font-semibold text-sm md:text-base leading-snug">{label}</span>
                  </div>
                  
                  {hasChecked && isCorrectAnswer && (
                    <i className="ph-fill ph-check-circle text-success text-xl shrink-0"></i>
                  )}
                  {hasChecked && isSelected && !isCorrectAnswer && (
                    <i className="ph-fill ph-x-circle text-danger text-xl shrink-0"></i>
                  )}
                </button>
              )
            })}
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-border/60 flex items-center justify-between gap-4">
            <button 
              onClick={() => router.push(`/subjects/${subjectId}`)}
              className="px-5 py-2.5 rounded-xl border border-border text-xs font-bold text-muted hover:text-foreground transition-all flex items-center gap-1.5"
            >
              <i className="ph ph-arrow-left"></i> Abbrechen
            </button>

            {!hasChecked ? (
              <button
                disabled={selectedKeys.length === 0}
                onClick={handleCheck}
                className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/95 text-white text-xs font-bold transition-all disabled:opacity-50 disabled:hover:bg-primary shrink-0 shadow-lg shadow-primary/10 flex items-center gap-1.5"
              >
                Antwort prüfen <i className="ph ph-check text-sm"></i>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-success hover:bg-success/95 text-white text-xs font-bold transition-all shrink-0 shadow-lg shadow-success/10 flex items-center gap-1.5"
              >
                {currentIndex === activeQuestions.length - 1 ? "Quiz beenden" : "Nächste Frage"} 
                <i className="ph ph-arrow-right text-sm"></i>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="text-center space-y-8 py-6 animate-fade-in flex flex-col items-center">
          {/* Circular Progress SVG */}
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* Background Circle */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="64"
                className="stroke-border/40 fill-none"
                strokeWidth="10"
              />
              {/* Progress Circle */}
              <circle
                cx="72"
                cy="72"
                r="64"
                className="stroke-primary fill-none transition-all duration-1000 ease-out"
                strokeWidth="10"
                strokeDasharray={2 * Math.PI * 64}
                strokeDashoffset={2 * Math.PI * 64 - (2 * Math.PI * 64 * (score / activeQuestions.length))}
                strokeLinecap="round"
              />
            </svg>
            <span className="text-3xl font-extrabold text-foreground">{Math.round((score / activeQuestions.length) * 100)}%</span>
          </div>

          <div className="space-y-2">
            <h2 className={`text-2xl md:text-3xl font-black ${
              score / activeQuestions.length >= 0.8 
                ? "text-success" 
                : score / activeQuestions.length >= 0.6 
                  ? "text-primary" 
                  : "text-warning"
            }`}>
              {score / activeQuestions.length >= 0.8 
                ? "Meisterhaft!" 
                : score / activeQuestions.length >= 0.6 
                  ? "Bestanden!" 
                  : "Versuch's nochmal!"}
            </h2>
            <p className="text-muted text-sm max-w-md mx-auto">
              Du hast <strong className="text-foreground">{score}</strong> von <strong className="text-foreground">{activeQuestions.length}</strong> Fragen richtig beantwortet.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center border-t border-border/60 pt-6">
            {incorrectQuestions.length > 0 && (
              <button
                onClick={handleRetryIncorrect}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-warning hover:bg-warning/5 text-warning text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <i className="ph ph-arrow-counter-clockwise"></i> Falsche wiederholen
              </button>
            )}
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-border hover:bg-border/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <i className="ph ph-arrows-clockwise"></i> Alles neu starten
            </button>
            <button
              disabled={isSaving}
              onClick={() => router.push(`/subjects/${subjectId}`)}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/95 text-white text-xs font-bold transition-all disabled:opacity-50 shrink-0 shadow-lg shadow-primary/10 flex items-center justify-center gap-1.5"
            >
              {isSaving ? "Speichert..." : "Zurück zum Lehrplan"} <i className="ph ph-arrow-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
