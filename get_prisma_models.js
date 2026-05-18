const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

console.log("Models in PrismaClient:");
const dmmf = prisma._dmmf || prisma._engine?._dmmf;
if (dmmf && dmmf.datamodel && dmmf.datamodel.models) {
  dmmf.datamodel.models.forEach(model => {
    console.log(`- ${model.name}`);
    console.log("  Fields:", model.fields.map(f => `${f.name} (${f.type}${f.isRequired ? '' : '?'})`).join(', '));
  });
} else {
  // Fallback: list properties on the prisma instance that look like models
  const keys = Object.keys(prisma).filter(key => !key.startsWith('_') && typeof prisma[key] === 'object');
  console.log("Fallback keys:", keys);
}
prisma.$disconnect();
