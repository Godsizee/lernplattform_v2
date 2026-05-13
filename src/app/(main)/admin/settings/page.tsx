import prisma from "@/db/client"
import { SystemSettingsForm } from "@/components/features/SystemSettingsForm"
import Link from "next/link"

export default async function AdminSettingsPage() {
  // Fetch settings from database
  const [announcementSetting, securitySetting, aiSetting, sidebarSetting] = await Promise.all([
    prisma.systemSetting.findUnique({
      where: { settingKey: "global_announcement" }
    }),
    prisma.systemSetting.findUnique({
      where: { settingKey: "security_settings" }
    }),
    prisma.systemSetting.findUnique({
      where: { settingKey: "ai_settings" }
    }),
    prisma.systemSetting.findUnique({
      where: { settingKey: "sidebar_order" }
    })
  ])

  let initialAnnouncement = {
    message: "",
    type: "info" as "info" | "warning" | "success",
    isActive: false
  }

  if (announcementSetting) {
    try {
      initialAnnouncement = JSON.parse(announcementSetting.settingValue)
    } catch (e) {
      console.error("Fehler beim Parsen der Ankündigungs-Einstellung:", e)
    }
  }

  let initialSecurity = {
    maxLoginAttempts: 5,
    sessionDurationDays: 30
  }

  if (securitySetting) {
    try {
      initialSecurity = JSON.parse(securitySetting.settingValue)
    } catch (e) {
      console.error("Fehler beim Parsen der Sicherheits-Einstellung:", e)
    }
  }

  let initialAI = {
    anthropicApiKey: "",
    geminiApiKey: ""
  }

  if (aiSetting) {
    try {
      initialAI = JSON.parse(aiSetting.settingValue)
    } catch (e) {
      console.error("Fehler beim Parsen der KI-Einstellung:", e)
    }
  }

  let initialSidebarOrder = {
    main: ["dashboard", "learning", "admin"],
    lumadiq: ["intro", "docs", "learn", "graph", "exams"]
  }

  if (sidebarSetting) {
    try {
      initialSidebarOrder = JSON.parse(sidebarSetting.settingValue)
    } catch (e) {
      console.error("Fehler beim Parsen der Sidebar-Einstellung:", e)
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted">
         <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <i className="ph ph-squares-four"></i> Dashboard
        </Link>
        <i className="ph ph-caret-right text-xs"></i>
        <Link href="/admin" className="hover:text-primary transition-colors">
          Admin-Bereich
        </Link>
        <i className="ph ph-caret-right text-xs"></i>
        <span className="text-foreground font-medium">Systemeinstellungen</span>
      </nav>

      {/* Header */}
      <div className="pb-4 border-b border-border/80">
        <h1 className="text-3xl font-black tracking-tight">Systemeinstellungen</h1>
        <p className="text-sm text-muted mt-1">Konfiguriere plattformweite Variablen, Ankündigungen und globale System-Parameter.</p>
      </div>

      <SystemSettingsForm 
        initialAnnouncement={initialAnnouncement} 
        initialSecurity={initialSecurity} 
        initialAI={initialAI} 
        initialSidebarOrder={initialSidebarOrder}
      />
    </div>
  )
}
