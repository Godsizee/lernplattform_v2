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

  // Fetch active global system announcements
  const setting = await prisma.systemSetting.findUnique({
    where: { settingKey: "global_announcement" }
  })

  let announcement = null

  if (setting) {
    try {
      const parsed = JSON.parse(setting.settingValue)
      if (parsed.isActive && parsed.message.trim() !== "") {
        announcement = parsed
      }
    } catch (e) {
      console.error("Fehler beim Parsen der Ankündigung im Layout:", e)
    }
  }

  return (
    <AppShell user={session.user} announcement={announcement}>
      {children}
    </AppShell>
  )
}
