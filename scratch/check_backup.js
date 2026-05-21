const fs = require('fs');

function main() {
  const filePath = 'c:\\xampp\\htdocs\\files\\lernplattform_v2\\backup_2026-05-18_11-02-30.sql';
  let content = '';

  try {
    // Versuche UTF-8
    const rawBuffer = fs.readFileSync(filePath);
    // Auto-detect UTF-16LE (BOM: FF FE)
    if (rawBuffer[0] === 0xFF && rawBuffer[1] === 0xFE) {
      content = rawBuffer.toString('utf16le');
      console.log("Erkanntes Dateiformat: UTF-16LE");
    } else {
      content = rawBuffer.toString('utf8');
      console.log("Erkanntes Dateiformat: UTF-8");
    }

    console.log(`Länge des Inhalts: ${content.length} Zeichen`);

    // Suche nach Fächern
    const subjectMatches = content.match(/subj_db_01/g) || [];
    console.log(`\nAnzahl der Fundstellen für das Fach 'subj_db_01' (Datenbanken): ${subjectMatches.length}`);

    // Suche nach Lektionen, die zu subj_db_01 gehören
    const lines = content.split('\n');
    let lessonCount = 0;
    const foundLessons = [];

    lines.forEach(line => {
      if (line.includes('INSERT INTO lessons') && line.includes('subj_db_01')) {
        lessonCount++;
        // Extrahiere Lektionstitel für Vorschau
        const titleMatch = line.match(/'lesson_db_\d+',\s*'subj_db_01',\s*'[^']+',\s*'([^']+)'/);
        if (titleMatch) {
          foundLessons.push(titleMatch[1]);
        } else {
          // Fallback: Einfach die Zeile kurz anreißen
          foundLessons.push(line.substring(0, 100));
        }
      }
    });

    console.log(`Anzahl der Lektionen für das Fach 'subj_db_01' im Backup: ${lessonCount}`);
    if (foundLessons.length > 0) {
      console.log("\nGefundene Lektionen (Auszug):");
      foundLessons.slice(0, 10).forEach((title, i) => {
        console.log(` ${i + 1}. ${title}`);
      });
    }

  } catch (err) {
    console.error("Fehler beim Lesen des Backups:", err.message);
  }
}

main();
