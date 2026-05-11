import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@test.local' },
    update: {},
    create: {
      email: 'admin@test.local',
      name: 'Admin',
      password: hashedPassword,
      role: 'admin',
    },
  })

  console.log('Seed abgeschlossen. Admin User:', admin.email)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
