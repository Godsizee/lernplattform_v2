import prisma from "../db/client"

async function main() {
  const result = await prisma.user.updateMany({
    data: { role: "admin" }
  })
  console.log(`\n✅ Erfolg! Alle ${result.count} registrierten Benutzer in der lokalen Datenbank wurden zum ADMIN befördert!\n`)
}

main().catch(console.error)
