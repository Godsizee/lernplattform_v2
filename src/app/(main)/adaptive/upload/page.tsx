import { auth } from '@/lib/auth'
import prisma from '@/db/client'
import { redirect } from 'next/navigation'
import UploadForm from '@/components/adaptive/upload/UploadForm'
import DocumentList from '@/components/adaptive/upload/DocumentList'

export default async function UploadPage() {
  const session = await auth()
  if (!session) redirect('/login')

  const subjects = await prisma.subject.findMany({
    where: { userId: session.user.id },
    select: { id: true, title: true, color: true },
    orderBy: { title: 'asc' },
  })

  const documents = await prisma.document.findMany({
    where: { userId: session.user.id },
    select: {
      id: true,
      filename: true,
      uploadedAt: true,
      status: true,
      conceptNodes: {
        select: { id: true, title: true, description: true },
        orderBy: { createdAt: 'asc' },
      },
    },
    orderBy: { uploadedAt: 'desc' },
  })

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-900 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <a href="/dashboard" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
            ← Dashboard
          </a>
        </div>

        <div className="rounded-xl bg-white dark:bg-slate-800 p-4 sm:p-8 shadow-sm">
          <h1 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-slate-100">Lernmaterial hochladen</h1>
          <p className="mb-6 text-sm text-gray-500 dark:text-slate-400">
            Unterstützte Formate: PDF, .txt, .md — max. 10 MB
          </p>
          <UploadForm subjects={subjects} />
        </div>

        {documents.length > 0 && (
          <div className="mt-6">
            <DocumentList documents={documents} />
          </div>
        )}
      </div>
    </main>
  )
}
