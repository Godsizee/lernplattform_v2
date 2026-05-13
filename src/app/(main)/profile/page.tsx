import { auth } from "@/lib/auth"
import prisma from "@/db/client"
import { notFound, redirect } from "next/navigation"
import { ProfileForm } from "@/components/features/ProfileForm"
import Link from "next/link"

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const userId = session.user.id

  // Fetch the latest user record from the database
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      email: true,
      bio: true,
      occupation: true,
      createdAt: true
    }
  })

  if (!user) {
    notFound()
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <i className="ph ph-squares-four"></i> Dashboard
        </Link>
        <i className="ph ph-caret-right text-xs"></i>
        <span className="text-foreground font-medium">Mein Profil</span>
      </nav>

      {/* Header Banner */}
      <div className="pb-4 border-b border-border/80">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">Profileinstellungen</h1>
        <p className="text-sm text-muted mt-1">Verwalte dein Konto, aktualisiere deine Bio und ändere deine Sicherheitseinstellungen.</p>
      </div>

      <ProfileForm user={user} />
    </div>
  )
}
