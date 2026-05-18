import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { auth } from '@/lib/auth'
import prisma from '@/db/client'
import { uploadFile } from '@/lib/adaptive/storage-adapter'

const MAX_SIZE_BYTES = 10 * 1024 * 1024 // 10 MB
const ALLOWED_TYPES: Record<string, string> = {
  'application/pdf': 'pdf',
  'text/plain': 'txt',
  'text/markdown': 'md',
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const subjectId = (formData.get('subjectId') as string | null) || null

  if (!file) {
    return NextResponse.json({ error: 'Keine Datei übermittelt' }, { status: 400 })
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: 'Datei zu groß (max. 10 MB)' }, { status: 400 })
  }

  const ext = ALLOWED_TYPES[file.type]
  if (!ext) {
    return NextResponse.json(
      { error: 'Format nicht unterstützt. Bitte PDF, .txt oder .md hochladen.' },
      { status: 400 }
    )
  }

  if (subjectId) {
    const subject = await prisma.subject.findFirst({
      where: { id: subjectId, userId: session.user.id },
    })
    if (!subject) {
      return NextResponse.json({ error: 'Ungültiges Fach' }, { status: 400 })
    }
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const storagePath = `${session.user.id}/${uuidv4()}.${ext}`

  await uploadFile(buffer, storagePath, file.type)

  const document = await prisma.document.create({
    data: {
      userId: session.user.id,
      filename: file.name,
      storagePath,
      status: 'uploaded',
      subjectId,
    },
  })

  return NextResponse.json({ id: document.id, filename: document.filename }, { status: 201 })
}

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  const documents = await prisma.document.findMany({
    where: { userId: session.user.id },
    select: { id: true, filename: true, uploadedAt: true, status: true },
    orderBy: { uploadedAt: 'desc' },
  })

  return NextResponse.json(documents)
}
