'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  subjectId: string
}

export default function AssessmentResetButton({ subjectId }: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleReset() {
    setLoading(true)
    await fetch(`/api/adaptive/assessment/${subjectId}`, { method: 'DELETE' })
    setLoading(false)
    router.push('/adaptive/learn')
  }

  return (
    <button
      onClick={handleReset}
      disabled={loading}
      className="text-xs text-gray-400 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400 disabled:opacity-40 transition-colors"
    >
      {loading ? 'Wird zurückgesetzt...' : 'Einstufung erneuern'}
    </button>
  )
}
