import { cookies } from 'next/headers'
import prisma from '@/db/client'

export const SUBJECT_COOKIE = 'activeSubjectId'

export async function getActiveSubjectId(): Promise<string | null> {
  const store = await cookies()
  return store.get(SUBJECT_COOKIE)?.value ?? null
}

/**
 * Gibt documentIds zurück die zum aktiven Fach gehören,
 * oder null wenn kein Fach aktiv (= alle anzeigen).
 */
export async function getSubjectDocumentIds(
  userId: string,
  activeSubjectId: string | null
): Promise<string[] | null> {
  if (!activeSubjectId) return null
  const docs = await prisma.document.findMany({
    where: { userId, subjectId: activeSubjectId },
    select: { id: true },
  })
  return docs.map((d: any) => d.id)
}
