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

  if (existing) {
    await prisma.bookmark.delete({
      where: {
        userId_lessonId: { userId, lessonId }
      }
    })
    revalidatePath(`/lessons/${lessonId}`)
    return { bookmarked: false }
  } else {
    await prisma.bookmark.create({
      data: {
        userId,
        lessonId
      }
    })
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

  revalidatePath(`/lessons/${lessonId}`)
  return { success: true }
}
