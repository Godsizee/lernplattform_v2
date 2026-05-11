"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "./Sidebar"
import { Topbar } from "./Topbar"

interface Announcement {
  message: string
  type: "info" | "warning" | "success"
  isActive: boolean
}

interface AppShellProps {
  user: any
  announcement: Announcement | null
  children: React.ReactNode
}

export function AppShell({ user, announcement, children }: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  // Hydrate collapsed state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("sidebar_collapsed")
    if (saved === "true") {
      setIsSidebarCollapsed(true)
    }
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const toggleSidebarCollapse = () => {
    const nextState = !isSidebarCollapsed
    setIsSidebarCollapsed(nextState)
    localStorage.setItem("sidebar_collapsed", String(nextState))
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-x-hidden">
      {/* Sidebar - responsive sliding + collapsible */}
      <Sidebar 
        user={user} 
        isOpen={isSidebarOpen} 
        onClose={closeSidebar}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebarCollapse}
      />

      {/* Backdrop for mobile drawers */}
      {isSidebarOpen && (
        <div 
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden cursor-pointer"
        />
      )}

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
        isSidebarCollapsed ? "lg:pl-[80px]" : "lg:pl-[280px]"
      }`}>
        <Topbar 
          user={user} 
          onMenuClick={toggleSidebar} 
        />
        
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* Impersonation Warning Banner */}
          {user?.isImpersonating && (
            <div className="p-4 rounded-2xl border bg-amber-500/10 border-amber-500/20 text-amber-500 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-fade-in font-semibold">
              <div className="flex items-center gap-3">
                <div className="shrink-0 flex items-center justify-center">
                  <i className="ph-fill ph-mask-happy text-xl animate-pulse"></i>
                </div>
                <div className="text-xs md:text-sm font-bold leading-normal text-center sm:text-left">
                  Sitzungs-Übernahme aktiv: Du siehst die Lernplattform aktuell als Student{" "}
                  <strong className="text-foreground underline underline-offset-2">{user.name}</strong>.
                </div>
              </div>
              <button
                onClick={async () => {
                  const { stopImpersonation } = await import("@/lib/actions/admin")
                  await stopImpersonation()
                  window.location.reload()
                }}
                className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs rounded-xl transition shadow-sm flex items-center gap-1 cursor-pointer shrink-0"
              >
                Sitzung beenden <i className="ph ph-sign-out text-sm"></i>
              </button>
            </div>
          )}

          {/* Global Broadcast Announcement Banner */}
          {announcement && (
            <div className={`p-4 rounded-2xl border flex items-center gap-3 shadow-sm animate-fade-in ${
              announcement.type === "warning"
                ? "bg-warning/10 border-warning/20 text-warning"
                : announcement.type === "success"
                  ? "bg-success/10 border-success/20 text-success"
                  : "bg-blue-500/10 border-blue-500/20 text-blue-500"
            }`}>
              <div className="shrink-0 flex items-center justify-center">
                <i className={`ph-fill text-xl animate-pulse ${
                  announcement.type === "warning"
                    ? "ph-warning"
                    : announcement.type === "success"
                      ? "ph-check-circle"
                      : "ph-info"
                }`}></i>
              </div>
              <div className="text-xs md:text-sm font-bold leading-normal">
                {announcement.message}
              </div>
            </div>
          )}

          {children}
        </main>
      </div>
    </div>
  )
}
