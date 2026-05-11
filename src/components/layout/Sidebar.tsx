"use client"

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
}

export function Sidebar({ 
  user, 
  isOpen, 
  onClose, 
  isCollapsed = false, 
  onToggleCollapse 
}: SidebarProps) {
  const pathname = usePathname()
  
  const navItems = [
    { href: "/dashboard", icon: "ph-squares-four", label: "Dashboard" },
    { href: "/learning", icon: "ph-books", label: "Lern-Bereich" },
    { href: "/profile", icon: "ph-user-circle", label: "Mein Profil" },
  ]
  
  if (user?.role === "admin") {
    navItems.splice(2, 0, { href: "/admin", icon: "ph-shield-star", label: "Admin-Bereich" })
  }

  const isItemActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/" || pathname === "/dashboard"
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
        {navItems.map((item) => {
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
            onClick={() => signOut({ callbackUrl: "/login" })}
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
