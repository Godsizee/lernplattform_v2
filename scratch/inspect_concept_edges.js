const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const res = await prisma.$queryRawUnsafe('SHOW CREATE TABLE concept_edges');
    console.log("CREATE TABLE:", JSON.stringify(res, null, 2));
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
