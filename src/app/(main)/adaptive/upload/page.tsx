import { auth } from '@/lib/auth'
import prisma from '@/db/client'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import UploadForm from '@/components/adaptive/upload/UploadForm'
import DocumentList from '@/components/adaptive/upload/DocumentList'

export default async function UploadPage() {
  const session = await auth()
  if (!session) redirect('/login')

  const subjects = await prisma.subject.findMany({

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
    <div className="mx-auto max-w-2xl space-y-6 py-4 sm:py-8 animate-fade-in">
      <div>
        <Link href="/adaptive" className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-foreground transition-colors">
          <i className="ph-bold ph-arrow-left text-[10px]"></i>
          <span>Zurück zum Dashboard</span>
        </Link>
      </div>

      <div className="rounded-2xl bg-surface border border-border/80 p-5 sm:p-8 shadow-sm">
        <h1 className="mb-2 text-xl sm:text-2xl font-black text-foreground tracking-tight">Lernmaterial hochladen</h1>
        <p className="mb-6 text-xs sm:text-sm font-medium text-muted">
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
  )
}
