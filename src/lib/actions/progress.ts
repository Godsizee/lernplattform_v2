"use server"

import { auth } from "@/lib/auth"
import prisma from "@/db/client"
import { revalidatePath } from "next/cache"

export async function completeLesson(lessonId: string, score?: number) {
  const session = await auth()
  if (!session?.user) {
    throw new Error("Nicht authentifiziert")
  }

  const userId = session.user.id

  // Save lesson completion progress
  await prisma.userProgress.upsert({
    where: {
      userId_lessonId: { userId, lessonId }
    },
    update: {
      status: "completed",
      score: score ?? null,
    },
    create: {
      userId,
      lessonId,
      status: "completed",
      score: score ?? null,
    }
  })

  // Revalidate cache
  revalidatePath("/")
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: { subjectId: true }
  })
  if (lesson) {
    revalidatePath(`/subjects/${lesson.subjectId}`)
  }

  return { success: true }
}

export async function undoCompleteLesson(lessonId: string) {
  const session = await auth()
  if (!session?.user) {
    throw new Error("Nicht authentifiziert")
  }

  const userId = session.user.id

  try {
    await prisma.userProgress.delete({
      where: {
        userId_lessonId: { userId, lessonId }
      }
    })
  } catch (err) {
    console.error("UserProgress konnte nicht gelöscht werden:", err)
  }

  // Revalidate cache
  revalidatePath("/")
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: { subjectId: true }
  })
  if (lesson) {
    revalidatePath(`/subjects/${lesson.subjectId}`)
  }

  return { success: true }
}
