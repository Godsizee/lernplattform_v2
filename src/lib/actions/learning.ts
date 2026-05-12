"use server"

import { auth } from "@/lib/auth"
import prisma from "@/db/client"
import { revalidatePath } from "next/cache"

export async function toggleBookmark(lessonId: string) {
  const session = await auth()
  if (!session?.user) {
    throw new Error("Nicht autorisiert")
  }

  const userId = session.user.id

  const existing = await prisma.bookmark.findUnique({
    where: {
      userId_lessonId: { userId, lessonId }
    }
  })

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: { title: true }
  })

  if (existing) {
    await prisma.bookmark.delete({
      where: {
        userId_lessonId: { userId, lessonId }
      }
    })
    
    // Log action in AuditLog
    await prisma.auditLog.create({
      data: {
        userId,
        action: "TOGGLE_BOOKMARK",
        details: `Lesezeichen entfernt für Lektion: "${lesson?.title || lessonId}"`
      }
    }).catch(console.error)

    revalidatePath(`/lessons/${lessonId}`)
    return { bookmarked: false }
  } else {
    await prisma.bookmark.create({
      data: {
        userId,
        lessonId
      }
    })

    // Log action in AuditLog
    await prisma.auditLog.create({
      data: {
        userId,
        action: "TOGGLE_BOOKMARK",
        details: `Lesezeichen hinzugefügt für Lektion: "${lesson?.title || lessonId}"`
      }
    }).catch(console.error)

    revalidatePath(`/lessons/${lessonId}`)
    return { bookmarked: true }
  }
}

export async function saveLessonNote(lessonId: string, content: string) {
  const session = await auth()
  if (!session?.user) {
    throw new Error("Nicht autorisiert")
  }

  const userId = session.user.id

  await prisma.lessonNote.upsert({
    where: {
      userId_lessonId: { userId, lessonId }
    },
    update: {
      content
    },
    create: {
      userId,
      lessonId,
      content
    }
  })

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: { title: true }
  })

  // Log action in AuditLog
  await prisma.auditLog.create({
    data: {
      userId,
      action: "SAVE_NOTE",
      details: `Notiz gespeichert für Lektion: "${lesson?.title || lessonId}"`
    }
  }).catch(console.error)

  revalidatePath(`/lessons/${lessonId}`)
  return { success: true }
}
