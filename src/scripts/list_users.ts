import prisma from "../db/client"

async function main() {
  const users = await prisma.user.findMany()
  console.log("USERS:", users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role, isBanned: u.isBanned })))
}

main().catch(console.error)
