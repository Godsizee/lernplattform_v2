import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function run() {
  console.log("=== STARTING BCRYPT PREFIX CONVERSION ($2y$ -> $2a$) ===")
  
  const users = await prisma.user.findMany()
  console.log(`Gefundene Benutzer in der Datenbank: ${users.length}`)

  for (const user of users) {
    if (user.password && user.password.startsWith("$2y$")) {
      const fixedPassword = user.password.replace(/^\$2y\$/, "$2a$")
      
      await prisma.user.update({
        where: { id: user.id },
        data: { password: fixedPassword }
      })
      
      console.log(`  Mitarbeiter/Student "${user.name}" (${user.email}): Bcrypt-Prefix erfolgreich konvertiert.`)
    } else {
      console.log(`  Mitarbeiter/Student "${user.name}" (${user.email}): Keine Konvertierung notwendig (bereits $2a$ oder anderes Format).`)
    }
  }

  console.log("\n=== KONVERTIERUNG ERFOLGREICH BEENDET ===")
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
