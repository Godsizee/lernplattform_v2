"use server"

import { auth } from "@/lib/auth"
import prisma from "@/db/client"
import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"

export async function toggleUserBan(targetUserId: string) {
  const session = await auth()
  if (session?.user?.role !== "admin") {
    throw new Error("Zugriff verweigert")
  }

  const userId = session.user.id

  const targetUser = await prisma.user.findUnique({
    where: { id: targetUserId }
  })

  if (!targetUser) {
    throw new Error("Benutzer nicht gefunden")
  }

  if (targetUser.id === userId) {
    throw new Error("Du kannst dich nicht selbst sperren!")
  }

  const updatedUser = await prisma.user.update({
    where: { id: targetUserId },
    data: { isBanned: !targetUser.isBanned }
  })

  // Log in AuditLog
  await prisma.auditLog.create({
    data: {
      userId,
      action: `${updatedUser.isBanned ? "Sperre verhängt" : "Sperre aufgehoben"} für Benutzer: "${targetUser.name}" (${targetUser.email})`,
      details: `Ziel-ID: ${targetUserId}`
    }
  }).catch(console.error)

  revalidatePath("/admin/users")
  return { success: true, isBanned: updatedUser.isBanned }
}

export async function resetUserPassword(targetUserId: string) {
  const session = await auth()
  if (session?.user?.role !== "admin") {
    throw new Error("Zugriff verweigert")
  }

  const userId = session.user.id

  const targetUser = await prisma.user.findUnique({
    where: { id: targetUserId }
  })

  if (!targetUser) {
    throw new Error("Benutzer nicht gefunden")
  }

  // Generate temporary password
  const tempPassword = "Temp" + Math.floor(100000 + Math.random() * 900000)
  const hashedTempPassword = await bcrypt.hash(tempPassword, 10)

  await prisma.user.update({
    where: { id: targetUserId },
    data: { password: hashedTempPassword }
  })

  // Log in AuditLog
  await prisma.auditLog.create({
    data: {
      userId,
      action: `Passwort erzwungen zurückgesetzt für Benutzer: "${targetUser.name}" (${targetUser.email})`,
      details: `Ziel-ID: ${targetUserId}`
    }
  }).catch(console.error)

  return { success: true, tempPassword }
}

export async function createSubject(rawData: { title: string; color: string; icon: string }) {
  const session = await auth()
  if (session?.user?.role !== "admin") {
    throw new Error("Zugriff verweigert")
  }

  const userId = session.user.id

  const newSubject = await prisma.subject.create({
    data: {
      userId, // Admin is the owner of their curriculum subjects
      title: rawData.title,
      color: rawData.color,
      icon: rawData.icon
    }
  })

  // Log in AuditLog
  await prisma.auditLog.create({
    data: {
      userId,
      action: `Fach erstellt: "${rawData.title}"`,
      details: `ID: ${newSubject.id}, Farbe: ${rawData.color}, Icon: ${rawData.icon}`
    }
  }).catch(console.error)

  revalidatePath("/admin")
  revalidatePath("/")

  return { success: true, subject: newSubject }
}

export async function deleteLesson(lessonId: string) {
  const session = await auth()
  if (session?.user?.role !== "admin") {
    throw new Error("Zugriff verweigert")
  }

  const userId = session.user.id

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: { subject: true }
  })

  if (!lesson) {
    throw new Error("Lektion nicht gefunden")
  }

  await prisma.lesson.delete({
    where: { id: lessonId }
  })

  // Log in AuditLog
  await prisma.auditLog.create({
    data: {
      userId,
      action: `Lektion gelöscht: "${lesson.title}"`,
      details: `ID: ${lessonId}, Fach: ${lesson.subject.title}`
    }
  }).catch(console.error)

  revalidatePath("/")
  revalidatePath(`/subjects/${lesson.subjectId}`)
  revalidatePath("/admin/content")

  return { success: true }
}

export async function updateGlobalAnnouncement(rawData: { message: string; type: "info" | "warning" | "success"; isActive: boolean }) {
  const session = await auth()
  if (session?.user?.role !== "admin") {
    throw new Error("Zugriff verweigert")
  }

  const userId = session.user.id

  await prisma.systemSetting.upsert({
    where: { settingKey: "global_announcement" },
    update: {
      settingValue: JSON.stringify(rawData),
    },
    create: {
      settingKey: "global_announcement",
      settingValue: JSON.stringify(rawData),
    }
  })

  // Log in AuditLog
  await prisma.auditLog.create({
    data: {
      userId,
      action: `Globale Ankündigung aktualisiert: "${rawData.message}" (Aktiv: ${rawData.isActive})`,
      details: `Typ: ${rawData.type}`
    }
  }).catch(console.error)

  revalidatePath("/")

  return { success: true }
}

export async function updateUserRole(targetUserId: string, newRole: string) {
  const session = await auth()
  if (session?.user?.role !== "admin") {
    throw new Error("Zugriff verweigert")
  }

  const userId = session.user.id

  const targetUser = await prisma.user.findUnique({
    where: { id: targetUserId }
  })

  if (!targetUser) {
    throw new Error("Benutzer nicht gefunden")
  }

  if (targetUser.id === userId) {
    throw new Error("Du kannst deine eigene Rolle nicht ändern!")
  }

  if (newRole !== "student" && newRole !== "admin") {
    throw new Error("Ungültige Rolle")
  }

  const updatedUser = await prisma.user.update({
    where: { id: targetUserId },
    data: { role: newRole }
  })

  // Log in AuditLog
  await prisma.auditLog.create({
    data: {
      userId,
      action: `Rolle geändert für Benutzer: "${targetUser.name}" auf "${newRole}"`,
      details: `Ziel-ID: ${targetUserId}`
    }
  }).catch(console.error)

  revalidatePath("/admin/users")
  return { success: true, role: updatedUser.role }
}

export async function deleteUser(targetUserId: string) {
  const session = await auth()
  if (session?.user?.role !== "admin") {
    throw new Error("Zugriff verweigert")
  }

  const userId = session.user.id

  const targetUser = await prisma.user.findUnique({
    where: { id: targetUserId }
  })

  if (!targetUser) {
    throw new Error("Benutzer nicht gefunden")
  }

  if (targetUser.id === userId) {
    throw new Error("Du kannst dich nicht selbst löschen!")
  }

  await prisma.user.delete({
    where: { id: targetUserId }
  })

  // Log in AuditLog
  await prisma.auditLog.create({
    data: {
      userId,
      action: `Benutzer gelöscht: "${targetUser.name}" (${targetUser.email})`,
      details: `Ziel-ID: ${targetUserId}`
    }
  }).catch(console.error)

  revalidatePath("/admin/users")
  return { success: true }
}

export async function startImpersonation(targetUserId: string) {
  const session = await auth()
  if (session?.user?.role !== "admin") {
    throw new Error("Zugriff verweigert")
  }

  const adminUserId = session.user.id

  const targetUser = await prisma.user.findUnique({
    where: { id: targetUserId }
  })

  if (!targetUser) {
    throw new Error("Benutzer nicht gefunden")
  }

  if (targetUser.role === "admin") {
    throw new Error("Sicherheitsrichtlinie: Du kannst keine Sitzung von anderen Admins übernehmen.")
  }

  const { cookies } = require("next/headers")
  const cookieStore = await cookies()
  
  // Set impersonation cookies (lasting 2 hours)
  cookieStore.set("impersonated_user_id", targetUserId, { maxAge: 60 * 60 * 2 })
  cookieStore.set("original_admin_id", adminUserId, { maxAge: 60 * 60 * 2 })

  // Log in AuditLog
  await prisma.auditLog.create({
    data: {
      userId: adminUserId,
      action: `Hat die Sitzung von Benutzer ID ${targetUserId} (${targetUser.name}) übernommen.`,
      details: `Ziel-ID: ${targetUserId}`
    }
  }).catch(console.error)

  return { success: true }
}

export async function stopImpersonation() {
  const { cookies } = require("next/headers")
  const cookieStore = await cookies()
  
  cookieStore.delete("impersonated_user_id")
  cookieStore.delete("original_admin_id")
  
  return { success: true }
}

export async function updateSecuritySettings(rawData: { maxLoginAttempts: number; sessionDurationDays: number }) {
  const session = await auth()
  if (session?.user?.role !== "admin") {
    throw new Error("Zugriff verweigert")
  }

  const userId = session.user.id

  await prisma.systemSetting.upsert({
    where: { settingKey: "security_settings" },
    update: {
      settingValue: JSON.stringify(rawData),
    },
    create: {
      settingKey: "security_settings",
      settingValue: JSON.stringify(rawData),
    }
  })

  // Log in AuditLog
  await prisma.auditLog.create({
    data: {
      userId,
      action: `Sicherheitseinstellungen aktualisiert: Login-Versuche: ${rawData.maxLoginAttempts}, Session-Dauer: ${rawData.sessionDurationDays} Tage`,
      details: `Geändert durch Admin-ID: ${userId}`
    }
  }).catch(console.error)

  return { success: true }
}

export async function updateAISettings(rawData: { anthropicApiKey: string; geminiApiKey: string }) {
  const session = await auth()
  if (session?.user?.role !== "admin") {
    throw new Error("Zugriff verweigert")
  }

  const userId = session.user.id

  await prisma.systemSetting.upsert({
    where: { settingKey: "ai_settings" },
    update: {
      settingValue: JSON.stringify(rawData),
    },
    create: {
      settingKey: "ai_settings",
      settingValue: JSON.stringify(rawData),
    }
  })

  // Log in AuditLog
  await prisma.auditLog.create({
    data: {
      userId,
      action: "KI-Schnittstellen-Schlüssel (API Keys) aktualisiert",
      details: `Aktualisiert durch Admin-ID: ${userId}`
    }
  }).catch(console.error)

  return { success: true }
}

export async function updateSubject(subjectId: string, rawData: { title: string; color: string; icon: string }) {
  const session = await auth()
  if (session?.user?.role !== "admin") {
    throw new Error("Zugriff verweigert")
  }

  const userId = session.user.id

  const subject = await prisma.subject.findUnique({
    where: { id: subjectId }
  })

  if (!subject) {
    throw new Error("Fach nicht gefunden")
  }

  if (subject.userId && subject.userId !== userId) {
    throw new Error("Berechtigung verweigert: Dieses Fach gehört einem anderen Benutzer")
  }

  const updatedSubject = await prisma.subject.update({
    where: { id: subjectId },
    data: {
      title: rawData.title,
      color: rawData.color,
      icon: rawData.icon
    }
  })

  // Log in AuditLog
  await prisma.auditLog.create({
    data: {
      userId,
      action: `Fach aktualisiert: "${rawData.title}"`,
      details: `ID: ${subjectId}, Neue Farbe: ${rawData.color}, Neues Icon: ${rawData.icon}`
    }
  }).catch(console.error)

  revalidatePath("/admin")
  revalidatePath("/admin/content")
  revalidatePath("/")

  return { success: true }
}

export async function deleteSubject(subjectId: string) {
  const session = await auth()
  if (session?.user?.role !== "admin") {
    throw new Error("Zugriff verweigert")
  }

  const userId = session.user.id

  const subject = await prisma.subject.findUnique({
    where: { id: subjectId }
  })

  if (!subject) {
    throw new Error("Fach nicht gefunden")
  }

  if (subject.userId && subject.userId !== userId) {
    throw new Error("Berechtigung verweigert: Dieses Fach gehört einem anderen Benutzer")
  }

  await prisma.subject.delete({
    where: { id: subjectId }
  })

  // Log in AuditLog
  await prisma.auditLog.create({
    data: {
      userId,
      action: `Fach gelöscht: "${subject.title}"`,
      details: `ID: ${subjectId}`
    }
  }).catch(console.error)

  revalidatePath("/admin")
  revalidatePath("/admin/content")
  revalidatePath("/")

  return { success: true }
}

export async function updateSidebarOrder(rawData: { main: string[]; lumadiq: string[] }) {
  const session = await auth()
  if (session?.user?.role !== "admin") {
    throw new Error("Zugriff verweigert")
  }

  const userId = session.user.id

  await prisma.systemSetting.upsert({
    where: { settingKey: "sidebar_order" },
    update: {
      settingValue: JSON.stringify(rawData),
    },
    create: {
      settingKey: "sidebar_order",
      settingValue: JSON.stringify(rawData),
    }
  })

  // Log in AuditLog
  await prisma.auditLog.create({
    data: {
      userId,
      action: "Sidebar-Elemente Umsortierung durchgeführt",
      details: `Neue Reihenfolge der Sidebar-Elemente gespeichert. Hauptmenü: [${rawData.main.join(", ")}], LumadIQ: [${rawData.lumadiq.join(", ")}]`
    }
  }).catch(console.error)

  revalidatePath("/")

  return { success: true }
}


