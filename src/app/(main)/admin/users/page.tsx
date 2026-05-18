import prisma from "@/db/client"
import { UserManagementTable } from "@/components/features/UserManagementTable"
import Link from "next/link"

export default async function AdminUsersPage() {
  // Fetch all users from database ordered by creation date
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isBanned: true
    }
  })

  // Calculate statistics
  const totalUsers = users.length
  const adminCount = users.filter(u => u.role === "admin").length
  const bannedCount = users.filter(u => u.isBanned).length
  const activeStudentsCount = totalUsers - adminCount - bannedCount

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <i className="ph ph-squares-four"></i> Dashboard
        </Link>
        <i className="ph ph-caret-right text-xs"></i>
        <Link href="/admin" className="hover:text-primary transition-colors">
          Admin-Bereich
        </Link>
        <i className="ph ph-caret-right text-xs"></i>
        <span className="text-foreground font-medium">Benutzerverwaltung</span>
      </nav>

      {/* Header */}
      <div className="pb-4 border-b border-border/80 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Benutzer verwalten</h1>
          <p className="text-sm text-muted mt-1">Sperre störende Profile, setze Passwörter zurück oder moderiere die Berechtigungen der Benutzer.</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="bg-surface border border-border p-5 rounded-3xl flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl shrink-0">
            <i className="ph-bold ph-users"></i>
          </div>
          <div>
            <div className="text-[10px] font-bold text-muted uppercase tracking-wider">Registrierte Nutzer</div>
            <div className="text-2xl font-black tracking-tight mt-0.5">{totalUsers}</div>
          </div>
        </div>

        {/* Admins */}
        <div className="bg-surface border border-border p-5 rounded-3xl flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center text-xl shrink-0">
            <i className="ph-bold ph-shield-star"></i>
          </div>
          <div>
            <div className="text-[10px] font-bold text-muted uppercase tracking-wider">Administratoren</div>
            <div className="text-2xl font-black tracking-tight mt-0.5">{adminCount}</div>
          </div>
        </div>

        {/* Active Students */}
        <div className="bg-surface border border-border p-5 rounded-3xl flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-success/10 text-success flex items-center justify-center text-xl shrink-0">
            <i className="ph-bold ph-student"></i>
          </div>
          <div>
            <div className="text-[10px] font-bold text-muted uppercase tracking-wider">Aktive Studenten</div>
            <div className="text-2xl font-black tracking-tight mt-0.5">{activeStudentsCount}</div>
          </div>
        </div>

        {/* Banned Users */}
        <div className="bg-surface border border-border p-5 rounded-3xl flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-danger/10 text-danger flex items-center justify-center text-xl shrink-0">
            <i className="ph-bold ph-user-minus"></i>
          </div>
          <div>
            <div className="text-[10px] font-bold text-muted uppercase tracking-wider">Sperrkonten</div>
            <div className="text-2xl font-black tracking-tight mt-0.5">{bannedCount}</div>
          </div>
        </div>
      </div>

      <UserManagementTable initialUsers={users} />
    </div>
  )
}
