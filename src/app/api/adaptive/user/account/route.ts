import { NextResponse } from 'next/server'
import { auth, signOut } from '@/lib/auth'
import prisma from '@/db/client'

export async function DELETE() {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  await prisma.user.delete({ where: { id: session.user.id } })

  await signOut({ redirect: false })

  return NextResponse.json({ success: true })
}
