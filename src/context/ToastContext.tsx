"use client"

import React, { createContext, useContext, useState, useCallback } from "react"

export type ToastType = "success" | "error" | "info" | "warning"

interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, message, type }])
    
    // Automatically dismiss the toast after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Overlay Container */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3.5 p-4 rounded-2xl border shadow-lg backdrop-blur-md animate-slide-in-right transition-all duration-300 ${
              toast.type === "success"
                ? "bg-emerald-50/95 dark:bg-emerald-950/90 text-emerald-800 dark:text-emerald-300 border-emerald-100 dark:border-emerald-900/30"
                : toast.type === "error"
                ? "bg-red-50/95 dark:bg-red-950/90 text-red-800 dark:text-red-300 border-red-100 dark:border-red-900/30"
                : toast.type === "warning"
                ? "bg-amber-50/95 dark:bg-amber-950/90 text-amber-800 dark:text-amber-300 border-amber-100 dark:border-amber-900/30"
                : "bg-blue-50/95 dark:bg-blue-950/90 text-blue-800 dark:text-blue-300 border-blue-100 dark:border-blue-900/30"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl flex shrink-0">
                {toast.type === "success" && <i className="ph-fill ph-check-circle text-emerald-500"></i>}
                {toast.type === "error" && <i className="ph-fill ph-x-circle text-red-500"></i>}
                {toast.type === "warning" && <i className="ph-fill ph-warning-circle text-amber-500"></i>}
                {toast.type === "info" && <i className="ph-fill ph-info text-blue-500"></i>}
              </span>
              <p className="text-xs font-bold leading-normal">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-current opacity-60 hover:opacity-100 transition-opacity p-0.5 rounded cursor-pointer shrink-0"
            >
              <i className="ph ph-x text-sm"></i>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
