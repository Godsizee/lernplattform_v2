"use server"

import { auth } from "@/lib/auth"
import prisma from "@/db/client"
import bcrypt from "bcryptjs"
import { profileSchema, passwordUpdateSchema } from "@/lib/validations"
import { revalidatePath } from "next/cache"

export async function updateProfile(rawData: any) {
  const session = await auth()
  if (!session?.user) {
    throw new Error("Nicht authentifiziert")
  }

  const userId = session.user.id

  const validation = profileSchema.safeParse(rawData)
  if (!validation.success) {
    throw new Error(validation.error.issues[0]?.message || "Validierungsfehler")
  }

  const { name, bio, occupation } = validation.data

  const oldUser = await prisma.user.findUnique({
    where: { id: userId }
  })

  await prisma.user.update({
    where: { id: userId },
    data: { name, bio, occupation }
  })

  if (oldUser) {
    if (oldUser.name !== name) {
      await prisma.auditLog.create({
        data: {
          userId,
          action: "UPDATE_NAME",
          details: `Geändert von "${oldUser.name}" zu "${name}"`
        }
      }).catch(console.error)
    }
    if (oldUser.bio !== bio) {
      await prisma.auditLog.create({
        data: {
          userId,
          action: "UPDATE_BIO",
          details: "Biografie geändert"
        }
      }).catch(console.error)
    }
    if (oldUser.occupation !== occupation) {
      await prisma.auditLog.create({
        data: {
          userId,
          action: "UPDATE_OCCUPATION",
          details: `Beruf geändert zu "${occupation}"`
        }
      }).catch(console.error)
    }
  }

  revalidatePath("/")
  revalidatePath("/profile")

  return { success: true }
}

export async function updatePassword(rawData: any) {
  const session = await auth()
  if (!session?.user) {
    throw new Error("Nicht authentifiziert")
  }

  const userId = session.user.id

  const validation = passwordUpdateSchema.safeParse(rawData)
  if (!validation.success) {
    throw new Error(validation.error.issues[0]?.message || "Validierungsfehler")
  }

  const { currentPassword, newPassword } = validation.data

  // Fetch current user from database to check password
  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (!user) {
    throw new Error("Benutzer nicht gefunden")
  }

  const isPasswordValid = await bcrypt.compare(currentPassword, user.password)
  if (!isPasswordValid) {
    throw new Error("Das aktuelle Passwort ist nicht korrekt")
  }

  // Hash and save new password
  const hashedNewPassword = await bcrypt.hash(newPassword, 10)

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedNewPassword }
  })

  // Log in AuditLog
  await prisma.auditLog.create({
    data: {
      userId,
      action: "CHANGE_PASSWORD",
      details: "Kennwort geändert"
    }
  }).catch(console.error)

  return { success: true }
}

export async function exportUserData() {
  const session = await auth()
  if (!session?.user) {
    throw new Error("Nicht authentifiziert")
  }

  const userId = session.user.id

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      progress: {
        include: {
          lesson: {
            select: { title: true, type: true }
          }
        }
      },
      bookmarks: {
        include: {
          lesson: {
            select: { title: true }
          }
        }
      },
      notes: {
        include: {
          lesson: {
            select: { title: true }
          }
        }
      },
      auditLogs: true
    }
  })

  if (!user) {
    throw new Error("Benutzer nicht gefunden")
  }

  const exportData = {
    exportDate: new Date().toISOString(),
    regulation: "Art. 20 DSGVO (Recht auf Datenübertragbarkeit)",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      occupation: user.occupation,
      role: user.role,
      theme: user.theme,
      createdAt: user.createdAt,
    },
    learningProgress: user.progress.map(p => ({
      lessonId: p.lessonId,
      lessonTitle: p.lesson.title,
      type: p.lesson.type,
      status: p.status,
      score: p.score,
      updatedAt: p.updatedAt,
    })),
    bookmarks: user.bookmarks.map(b => ({
      lessonId: b.lessonId,
      lessonTitle: b.lesson.title,
      createdAt: b.createdAt,
    })),
    personalNotes: user.notes.map(n => ({
      lessonId: n.lessonId,
      lessonTitle: n.lesson.title,
      content: n.content,
      updatedAt: n.updatedAt,
    })),
    activityLogs: user.auditLogs.map(l => ({
      action: l.action,
      details: l.details,
      timestamp: l.createdAt,
    }))
  }

  return exportData
}

export async function deleteUserAccount() {
  const session = await auth()
  if (!session?.user) {
    throw new Error("Nicht authentifiziert")
  }

  const userId = session.user.id

  await prisma.user.delete({
    where: { id: userId }
  })

  return { success: true }
}
