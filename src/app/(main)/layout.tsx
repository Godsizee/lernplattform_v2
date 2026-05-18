import { auth } from "@/lib/auth"
import prisma from "@/db/client"
import { AppShell } from "@/components/layout/AppShell"
import { redirect } from "next/navigation"

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  // Fetch settings in parallel for optimal loading
  const [announcementSetting, sidebarSetting] = await Promise.all([
    prisma.systemSetting.findUnique({
      where: { settingKey: "global_announcement" }
    }),
    prisma.systemSetting.findUnique({
      where: { settingKey: "sidebar_order" }
    })
  ])

  let announcement = null
  if (announcementSetting) {
    try {
      const parsed = JSON.parse(announcementSetting.settingValue)
      if (parsed.isActive && parsed.message.trim() !== "") {
        announcement = parsed
      }
    } catch (e) {
      console.error("Fehler beim Parsen der Ankündigung im Layout:", e)
    }
  }

  let sidebarOrder = null
  if (sidebarSetting) {
    try {
      sidebarOrder = JSON.parse(sidebarSetting.settingValue)
    } catch (e) {
      console.error("Fehler beim Parsen der Sidebar-Reihenfolge im Layout:", e)
    }
  }

  return (
    <AppShell user={session.user} announcement={announcement} sidebarOrder={sidebarOrder}>
      {children}
    </AppShell>
  )

}
