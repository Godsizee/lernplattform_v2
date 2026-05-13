import prisma from "@/db/client"
import Link from "next/link"
import { AdminTabs } from "@/components/features/AdminTabs"

export default async function AdminCockpitPage() {
  // Fetch overview statistics & related log histories in parallel for speed
  const [userCount, subjectCount, lessonCount, logs, llmLogs, conceptNodes] = await Promise.all([
    prisma.user.count(),
    prisma.subject.count(),
    prisma.lesson.count(),
    prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    }).catch(() => []), // Fallback
    prisma.llmCallLog.findMany({
      orderBy: { createdAt: "desc" }
    }).catch(() => []),
    prisma.conceptNode.findMany({
      include: {
        document: {
          select: {
            filename: true,
            subject: {
              select: {
                id: true,
                title: true,
                color: true
              }
            }
          }
        },
        cachedTasks: {
          select: {
            id: true,
            attempts: {
              select: {
                id: true,
                userId: true,
                isCorrect: true,
                submittedAt: true,
                user: {
                  select: {
                    name: true,
                    email: true
                  }
                }
              }
            }
          }
        }
      }
    }).catch(() => [])
  ])

  // Fetch subject color and details for list rendering in Overview
  const subjects = await prisma.subject.findMany({
    include: {
      _count: {
        select: { lessons: true }
      }
    }
  })

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="pb-4 border-b border-border/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Admin-Cockpit</h1>
          <p className="text-sm text-muted mt-1">Verwalte die Lernplattform, bearbeite Inhalte und überprüfe die Systemaktivität.</p>
        </div>
        <div className="flex gap-2.5 shrink-0 w-full sm:w-auto">
          <Link 
            href="/admin/settings" 
            className="w-1/2 sm:w-auto justify-center px-4 py-2.5 bg-surface hover:bg-surface/80 border border-border text-foreground text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
          >
            <i className="ph ph-gear text-sm"></i> Systemeinstellungen
          </Link>
          <Link 
            href="/admin/editor" 
            className="w-1/2 sm:w-auto justify-center px-4 py-2.5 bg-primary hover:bg-primary/95 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-primary/10 flex items-center gap-1.5 cursor-pointer"
          >
            <i className="ph ph-plus-circle text-sm"></i> Neue Lektion
          </Link>
        </div>
      </div>

      {/* Unified Tabbed Administration Dashboard Panel */}
      <AdminTabs
        userCount={userCount}
        subjectCount={subjectCount}
        lessonCount={lessonCount}
        subjects={subjects}
        logs={logs}
        llmLogs={llmLogs}
        conceptNodes={conceptNodes}
      />
    </div>
  )
}
