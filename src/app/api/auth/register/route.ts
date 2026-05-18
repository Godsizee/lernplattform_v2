import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import prisma from "@/db/client"
import { registerSchema } from "@/lib/validations"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password } = registerSchema.parse(body)

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "E-Mail-Adresse wird bereits verwendet" },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "student" // Default Rolle
      }
    })

    return NextResponse.json(
      { message: "Registrierung erfolgreich", userId: user.id },
      { status: 201 }
    )
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.issues[0]?.message || "Validierungsfehler" }, { status: 400 })
    }
    return NextResponse.json(
      { error: "Ein unerwarteter Fehler ist aufgetreten" },
      { status: 500 }
    )
  }
}
