import prisma from "../db/client"

async function main() {
  // Reset all users to student first
  const resetResult = await prisma.user.updateMany({
    data: { role: "student" }
  })

  // Promote badesebastian@outlook.com to admin
  const promoteResult = await prisma.user.update({
    where: { email: "badesebastian@outlook.com" },
    data: { role: "admin" }
  })

  console.log(`\n✅ Rollen erfolgreich zurückgesetzt!`)
  console.log(`   - ${promoteResult.email} ist ADMIN (Name: ${promoteResult.name})`)
  
  const students = await prisma.user.findMany({
    where: { NOT: { email: "badesebastian@outlook.com" } }
  })
  
  console.log(`   - Alle anderen ${students.length} Benutzer sind STUDENTS:`)
  students.forEach(s => console.log(`     * ${s.email} (${s.name})`))
  console.log("")
}

main().catch(console.error)
