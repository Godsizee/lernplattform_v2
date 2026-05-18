"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface ThemeToggleProps {
  className?: string
  isCollapsed?: boolean
}

export function ThemeToggle({ className = "", isCollapsed = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className={`w-full h-12 ${className}`}></div>

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`flex items-center text-muted hover:text-primary transition-all duration-200 ${
        isCollapsed 
          ? "w-12 h-12 justify-center mx-auto rounded-xl" 
          : "w-full px-4 py-3 gap-3.5"
      } ${className}`}
      title={isDark ? "Zum Light Mode wechseln" : "Zum Dark Mode wechseln"}
    >
      <i className={`ph ${isDark ? 'ph-sun' : 'ph-moon'} text-xl`}></i>
      {!isCollapsed && <span className="text-sm font-semibold">{isDark ? "Light Mode" : "Dark Mode"}</span>}
    </button>
  )
}
