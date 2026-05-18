"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/ThemeToggle"
import { signOut } from "next-auth/react"

interface SidebarProps {
  user: any
  isOpen: boolean
  onClose: () => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
  sidebarOrder?: { main: string[]; lumadiq: string[] } | null
}

export function Sidebar({ 
  user, 
  isOpen, 
  onClose, 
  isCollapsed = false, 
  onToggleCollapse,
  sidebarOrder
}: SidebarProps) {
  const pathname = usePathname()
  const [isLumadiqExpanded, setIsLumadiqExpanded] = useState(pathname.startsWith("/adaptive"))

  // Auto-expand LumadIQ dropdown if user navigates to an adaptive sub-route
  useEffect(() => {
    if (pathname.startsWith("/adaptive")) {
      setIsLumadiqExpanded(true)
    }
  }, [pathname])
  
  // Standard default items
  const defaultMain = [
    { id: "dashboard", href: "/dashboard", icon: "ph-squares-four", label: "Dashboard" },
    { id: "learning", href: "/learning", icon: "ph-books", label: "Lern-Bereich" },
    { id: "admin", href: "/admin", icon: "ph-shield-star", label: "Admin-Bereich" },
  ]

  const defaultLumadiq = [
    { id: "intro", href: "/adaptive", icon: "ph-info", label: "Einführung" },
    { id: "docs", href: "/adaptive/upload", icon: "ph-upload-simple", label: "Dokumente" },
    { id: "learn", href: "/adaptive/learn", icon: "ph-lightning", label: "Adaptiv Lernen" },
    { id: "graph", href: "/adaptive/graph", icon: "ph-graph", label: "Wissensgraph" },
    { id: "exams", href: "/adaptive/exams", icon: "ph-calendar-check", label: "Klausuren" },
  ]

  // Construct mainNavItems based on custom order if present
  let mainNavItems: typeof defaultMain = []
  if (sidebarOrder?.main) {
    sidebarOrder.main.forEach((id) => {
      const item = defaultMain.find((i) => i.id === id)
      if (item) {
        if (item.id === "admin" && user?.role !== "admin") return
        mainNavItems.push(item)
      }
    })
    // Append any missing default items
    defaultMain.forEach((item) => {
      if (item.id === "admin" && user?.role !== "admin") return
      if (!mainNavItems.some((i) => i.id === item.id)) {
        mainNavItems.push(item)
      }
    })
  } else {
    // Fallback to default ordering
    mainNavItems = defaultMain.filter(item => {
      if (item.id === "admin" && user?.role !== "admin") return false
      return true
    })
  }

  // Construct lumadiqItems based on custom order if present
  let lumadiqItems: typeof defaultLumadiq = []
  if (sidebarOrder?.lumadiq) {
    sidebarOrder.lumadiq.forEach((id) => {
      const item = defaultLumadiq.find((i) => i.id === id)
      if (item) {
        lumadiqItems.push(item)
      }
    })
    // Append missing
    defaultLumadiq.forEach((item) => {
      if (!lumadiqItems.some((i) => i.id === item.id)) {
        lumadiqItems.push(item)
      }
    })
  } else {
    // Fallback to default
    lumadiqItems = [...defaultLumadiq]
  }

  const profileItem = { href: "/profile", icon: "ph-user-circle", label: "Mein Profil" }
  
  const isItemActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/" || pathname === "/dashboard"
    }
    if (href === "/adaptive") {
      return pathname === "/adaptive"
    }
    return pathname.startsWith(href)
  }

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-surface border-r border-border flex flex-col z-40 transition-all duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } ${
        isCollapsed ? "w-[280px] lg:w-[80px]" : "w-[280px]"
      }`}
    >
      {/* Brand Header */}
      <div className={`p-6 border-b border-border/40 flex ${
        isCollapsed 
          ? "flex-col items-center justify-center gap-4 px-2" 
          : "items-center justify-between"
      }`}>
        <Link href="/" onClick={onClose} className="flex items-center justify-center shrink-0">
          <img 
            src="/assets/img/logo.png" 
            alt="Code & Cash Logo" 
            className={`shrink-0 transition-all duration-300 ${
              isCollapsed 
                ? "h-8 w-8 object-cover object-top rounded-xl border border-border/40" 
                : "h-10 w-auto object-contain"
            }`}
          />
        </Link>

        {/* Collapse/Expand Buttons */}
        {onToggleCollapse && (
          <button 
            onClick={onToggleCollapse}
            className="hidden lg:flex w-9 h-9 items-center justify-center rounded-xl border border-border bg-background text-muted hover:text-primary hover:bg-primary/10 transition-all shrink-0 cursor-pointer"
            title={isCollapsed ? "Menü ausklappen" : "Menü einklappen"}
          >
            <i className={`ph-bold ${isCollapsed ? "ph-caret-double-right" : "ph-caret-double-left"} text-base`}></i>
          </button>
        )}

        {/* Close Button on Mobile Drawer */}
        <button 
          onClick={onClose}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-border bg-background text-muted hover:text-foreground hover:bg-border/30 transition-all shrink-0 cursor-pointer"
          title="Menü schließen"
        >
          <i className="ph-bold ph-x text-base"></i>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className={`flex-1 px-4 py-6 space-y-1.5 overflow-y-auto ${
        isCollapsed ? "lg:px-2" : ""
      }`}>
        {/* Highlighted Warning / Announcement Link to Exam Topics Manager */}
        <Link 
          href="https://muss.dasdann.jetzt"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className={`flex items-center transition-all duration-300 rounded-xl border ${
            isCollapsed 
              ? "w-12 h-12 justify-center mx-auto border-amber-500/30 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20" 
              : "w-full px-4 py-3 gap-3.5 border-amber-500/30 bg-amber-500/10 dark:bg-amber-500/5 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 dark:hover:bg-amber-500/10 hover:shadow-sm"
          }`}
          title={isCollapsed ? "Wichtig: Prüfungsthemen" : undefined}
        >
          <i className="ph-bold ph-warning-octagon text-xl shrink-0 animate-pulse text-amber-500"></i>
          {!isCollapsed && (
            <div className="flex flex-col items-start min-w-0">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-500">Wichtig</span>
              <span className="text-sm font-bold whitespace-nowrap animate-fade-in -mt-0.5">Prüfungsthemen</span>
            </div>
          )}
        </Link>
        {/* Render standard main items */}
        {mainNavItems.map((item) => {
          const isActive = isItemActive(item.href)
          return (
            <Link 
              key={item.href} 
              href={item.href === "/dashboard" ? "/" : item.href}
              onClick={onClose}
              className={`flex items-center transition-all duration-200 rounded-xl ${
                isCollapsed 
                  ? "w-12 h-12 justify-center mx-auto" 
                  : "w-full px-4 py-3 gap-3.5"
              } ${
                isActive 
                  ? "bg-primary/10 text-primary font-bold shadow-sm" 
                  : "text-muted hover:bg-border/30 hover:text-foreground"
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <i className={`${isActive ? "ph-bold" : "ph"} ${item.icon} text-xl shrink-0`}></i>
              {!isCollapsed && <span className="text-sm font-semibold whitespace-nowrap animate-fade-in">{item.label}</span>}
            </Link>
          )
        })}

        {/* Render LumadIQ Collapsible Dropdown */}
        <div className="space-y-1">
          <button
            onClick={() => setIsLumadiqExpanded(!isLumadiqExpanded)}
            className={`flex items-center transition-all duration-200 rounded-xl w-full ${
              isCollapsed 
                ? "w-12 h-12 justify-center mx-auto" 
                : "px-4 py-3 gap-3.5 justify-between"
            } ${
              pathname.startsWith("/adaptive")
                ? "bg-primary/5 text-primary font-bold border border-primary/10"
                : "text-muted hover:bg-border/30 hover:text-foreground"
            } cursor-pointer`}
            title={isCollapsed ? "LumadIQ" : undefined}
          >
            <div className="flex items-center gap-3.5">
              <i className={`ph-bold ph-brain text-xl shrink-0`}></i>
              {!isCollapsed && <span className="text-sm font-semibold">LumadIQ</span>}
            </div>
            {!isCollapsed && (
              <i className={`ph ph-caret-down text-xs transition-transform duration-300 ${isLumadiqExpanded ? "rotate-180" : ""}`}></i>
            )}
          </button>

          {/* Sub-items (expanded) */}
          <div className={`transition-all duration-300 ease-in-out ${
            isLumadiqExpanded 
              ? "max-h-[300px] opacity-100" 
              : "max-h-0 opacity-0 pointer-events-none overflow-hidden"
          } ${isCollapsed ? "flex flex-col items-center gap-1.5" : "pl-4 space-y-1"}`}>
            {lumadiqItems.map((subItem) => {
              const isActive = isItemActive(subItem.href)
              return (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  onClick={onClose}
                  className={`flex items-center transition-all duration-200 rounded-xl ${
                    isCollapsed 
                      ? "w-9 h-9 justify-center mx-auto" 
                      : "w-full px-4 py-2.5 gap-3"
                  } ${
                    isActive 
                      ? "bg-primary/10 text-primary font-bold shadow-sm" 
                      : "text-muted hover:bg-border/20 hover:text-foreground"
                  }`}
                  title={isCollapsed ? subItem.label : undefined}
                >
                  <i className={`${isActive ? "ph-bold" : "ph"} ${subItem.icon} ${isCollapsed ? "text-base" : "text-lg"} shrink-0`}></i>
                  {!isCollapsed && <span className="text-xs font-semibold whitespace-nowrap">{subItem.label}</span>}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Profile menu item */}
        {(() => {
          const isActive = isItemActive(profileItem.href)
          return (
            <Link 
              key={profileItem.href} 
              href={profileItem.href}
              onClick={onClose}
              className={`flex items-center transition-all duration-200 rounded-xl ${
                isCollapsed 
                  ? "w-12 h-12 justify-center mx-auto" 
                  : "w-full px-4 py-3 gap-3.5"
              } ${
                isActive 
                  ? "bg-primary/10 text-primary font-bold shadow-sm" 
                  : "text-muted hover:bg-border/30 hover:text-foreground"
              }`}
              title={isCollapsed ? profileItem.label : undefined}
            >
              <i className={`${isActive ? "ph-bold" : "ph"} ${profileItem.icon} text-xl shrink-0`}></i>
              {!isCollapsed && <span className="text-sm font-semibold whitespace-nowrap animate-fade-in">{profileItem.label}</span>}
            </Link>
          )
        })()}
      </nav>

      {/* Footer Section - Themes & Terms */}
      <div className={`p-4 border-t border-border/40 space-y-1.5 ${
        isCollapsed ? "lg:p-2" : ""
      }`}>
        <ThemeToggle className="hover:bg-border/30 rounded-xl" isCollapsed={isCollapsed} />
        
        <Link 
          href="/datenschutz" 
          onClick={onClose}
          className={`flex items-center text-muted hover:text-foreground hover:bg-border/30 transition-all rounded-xl ${
            isCollapsed 
              ? "w-12 h-12 justify-center mx-auto" 
              : "px-4 py-3 gap-3.5"
          }`}
          title={isCollapsed ? "Datenschutz" : undefined}
        >
          <i className="ph ph-shield-check text-xl shrink-0"></i>
          {!isCollapsed && <span className="text-sm font-semibold whitespace-nowrap animate-fade-in">Datenschutz</span>}
        </Link>
      </div>

      {/* Profile & Logout bar */}
      <div className={`p-4 border-t border-border flex items-center justify-between bg-background/30 ${
        isCollapsed ? "justify-center" : "gap-3"
      }`}>
        <div className="flex items-center gap-3 overflow-hidden shrink-0">
          <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0 border border-primary/10">
            <i className="ph-fill ph-user text-lg"></i>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0 truncate animate-fade-in">
              <span className="font-bold text-sm text-foreground truncate leading-snug">
                {user?.name || "Nutzer"}
              </span>
              <span className="text-xs text-muted font-medium truncate capitalize">
                {user?.role === "admin" ? "Administrator" : "Student"}
              </span>
            </div>
          )}
        </div>
        
        {!isCollapsed && (
          <button 
            onClick={() => signOut({ callbackUrl: "/login?success=logout" })}
            className="w-9 h-9 flex items-center justify-center text-muted hover:text-danger hover:bg-danger/10 rounded-xl transition-all shrink-0 border border-transparent hover:border-danger/10 cursor-pointer"
            title="Abmelden"
          >
            <i className="ph ph-sign-out text-lg"></i>
          </button>
        )}
      </div>
    </aside>
  )
}
