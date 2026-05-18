import prisma from "../db/client"

async function main() {
  const email = process.argv[2]
  if (!email) {
    console.log("\n❌ Bitte gib eine E-Mail-Adresse an:")
    console.log("   npx tsx src/scripts/promote-user.ts <email>\n")
    
    const all = await prisma.user.findMany()
    console.log("Registrierte Benutzer in der Datenbank:")
    all.forEach(u => console.log(`   - ${u.email} [Rolle: ${u.role}] (${u.name})`))
    console.log("")
    process.exit(1)
  }

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    console.log(`\n❌ Benutzer mit E-Mail "${email}" wurde nicht gefunden.`)
    const all = await prisma.user.findMany()
    console.log("Verfügbare Benutzer in der Datenbank:")
    all.forEach(u => console.log(`   - ${u.email} [Rolle: ${u.role}] (${u.name})`))
    console.log("")
    process.exit(1)
  }

  await prisma.user.update({
    where: { email },
    data: { role: "admin" }
  })

  console.log(`\n✅ Erfolg! Der Benutzer "${user.name}" (${email}) wurde erfolgreich zum ADMIN befördert!\n`)
}

main().catch(console.error)
