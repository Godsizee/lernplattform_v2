"use server"

import { auth } from "@/lib/auth"
import prisma from "@/db/client"
import { lessonSchema } from "@/lib/validations"
import { revalidatePath } from "next/cache"

export async function upsertLesson(rawData: any) {
  const session = await auth()
  if (session?.user?.role !== "admin") {
    throw new Error("Zugriff verweigert: Nur Administratoren können Lektionen bearbeiten")
  }

  const userId = session.user.id

  const validation = lessonSchema.safeParse(rawData)
  if (!validation.success) {
    throw new Error(validation.error.issues[0]?.message || "Validierungsfehler")
  }

  const { id, subjectId, title, type, status, sortOrder, contentRaw, content } = validation.data

  let resultLesson

  if (id) {
    // Update existing lesson
    resultLesson = await prisma.lesson.update({
      where: { id },
      data: {
        subjectId,
        title,
        type,
        status,
        sortOrder,
        contentRaw,
        content, // HTML/Preview cache or rendered markup
      }
    })

    // Log action in AuditLog
    await prisma.auditLog.create({
      data: {
        userId,
        action: `Lektion aktualisiert: "${title}" (Typ: ${type})`,
        details: `ID: ${id}, Status: ${status}, SortOrder: ${sortOrder}`
      }
    }).catch(console.error)

  } else {
    // Create new lesson
    resultLesson = await prisma.lesson.create({
      data: {
        subjectId,
        authorId: userId,
        title,
        type,
        status,
        sortOrder,
        contentRaw,
        content,
      }
    })

    // Log action in AuditLog
    await prisma.auditLog.create({
      data: {
        userId,
        action: `Lektion erstellt: "${title}" (Typ: ${type})`,
        details: `ID: ${resultLesson.id}, Status: ${status}, SortOrder: ${sortOrder}`
      }
    }).catch(console.error)
  }

  // Revalidate caches
  revalidatePath("/")
  revalidatePath(`/subjects/${subjectId}`)
  if (id) {
    revalidatePath(`/lessons/${id}`)
  }

  return { success: true, lessonId: resultLesson.id }
}
