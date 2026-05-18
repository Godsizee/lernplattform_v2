import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function run() {
  console.log("=== STARTING USER DELETION (FRESH START) ===")
  
  // Clean progress and audit logs first to avoid relation issues
  await prisma.userProgress.deleteMany()
  await prisma.auditLog.deleteMany()
  
  // Nullify lesson author links so we don't lose lessons
  await prisma.lesson.updateMany({
    data: { authorId: null }
  })

  // Delete all users
  const { count } = await prisma.user.deleteMany()
  console.log(`Erfolgreich ${count} Benutzer aus der Datenbank gelöscht.`)

  console.log("\n=== ALLE NUTZER ERFOLGREICH ENTFERNT. DU KANNST DICH NUN NEU REGISTRIEREN! ===")
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
