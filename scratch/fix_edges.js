const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Starte Datenbank-Fix...");
    
    // Fremdschlüssel-Prüfungen temporär ausschalten
    await prisma.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 0;');
    console.log("✔ Fremdschlüssel-Prüfungen deaktiviert.");
    
    // Die problematische Tabelle löschen
    await prisma.$executeRawUnsafe('DROP TABLE IF EXISTS concept_edges;');
    console.log("✔ Tabelle 'concept_edges' erfolgreich gelöscht.");
    
    // Fremdschlüssel-Prüfungen wieder aktivieren
    await prisma.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 1;');
    console.log("✔ Fremdschlüssel-Prüfungen wieder aktiviert.");
    
    console.log("Fix erfolgreich abgeschlossen! Du kannst jetzt 'npx prisma@5.22.0 db push' ausführen.");
  } catch (err) {
    console.error("Fehler beim Ausführen des Fixes:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
