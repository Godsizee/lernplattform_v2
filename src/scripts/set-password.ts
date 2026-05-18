import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const email = process.argv[2]
  const newPassword = process.argv[3]

  if (!email || !newPassword) {
    console.log("\n❌ Bitte gib eine E-Mail-Adresse und ein neues Passwort an:")
    console.log("   npx tsx src/scripts/set-password.ts <email> <neues_passwort>\n")
    process.exit(1)
  }

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    console.log(`\n❌ Benutzer mit E-Mail "${email}" wurde nicht gefunden.`)
    process.exit(1)
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10)

  await prisma.user.update({
    where: { email },
    data: { 
      password: hashedPassword,
      role: "admin" // Sicherstellen, dass der User Admin ist
    }
  })

  console.log(`\n✅ Erfolg! Das Passwort für "${user.name}" (${email}) wurde erfolgreich aktualisiert und die Rolle auf ADMIN gesetzt!\n`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
