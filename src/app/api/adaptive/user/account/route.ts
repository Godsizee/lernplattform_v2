import { NextRequest, NextResponse } from 'next/server'
import { auth, signOut } from '@/lib/auth'
import prisma from '@/db/client'

export async function DELETE(req: NextRequest) {
  // CSRF-Schutz: Prüft, ob der Origin-Header mit dem Host-Header übereinstimmt.
  const origin = req.headers.get("origin")
  const host = req.headers.get("host")
  if (origin) {
    try {
      const originUrl = new URL(origin)
      if (originUrl.host !== host) {
        return NextResponse.json({ error: "CSRF-Verifizierungsfehler" }, { status: 403 })
      }
    } catch {
      return NextResponse.json({ error: "CSRF-Verifizierungsfehler" }, { status: 403 })
    }
  }

  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  await prisma.user.delete({ where: { id: session.user.id } })

  await signOut({ redirect: false })

  return NextResponse.json({ success: true })
}
