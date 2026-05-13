'use server'

import { cookies } from 'next/headers'

const SUBJECT_COOKIE = 'activeSubjectId'

export async function setActiveSubjectId(subjectId: string | null): Promise<void> {
  const store = await cookies()
  if (subjectId) {
    store.set(SUBJECT_COOKIE, subjectId, { path: '/', maxAge: 60 * 60 * 24 * 365 })
  } else {
    store.delete(SUBJECT_COOKIE)
  }
}
