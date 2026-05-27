const fs = require('fs');
const path = require('path');

const backupFilePath = path.join(__dirname, '../backup_2026-05-22_07-28-35.sql');
const outputFilePath = path.join(__dirname, '../backup_2026-05-22_07-28-35_bwl_lessons.sql');

console.log('Reading backup file...');
const content = fs.readFileSync(backupFilePath, 'utf-8');

console.log('Parsing statements...');
const statements = [];
let current = '';
let inString = false;
let i = 0;

while (i < content.length) {
    const char = content[i];
    current += char;
    
    if (inString) {
        if (char === '\\') {
            if (i + 1 < content.length) {
                current += content[i + 1];
                i += 2;
                continue;
            }
        } else if (char === "'") {
            if (i + 1 < content.length && content[i + 1] === "'") {
                current += "'";
                i += 2;
                continue;
            } else {
                inString = false;
            }
        }
    } else {
        if (char === "'") {
            inString = true;
        } else if (char === ';') {
            statements.push(current.trim());
            current = '';
        }
    }
    i++;
}
if (current.trim()) {
    statements.push(current.trim());
}

console.log(`Parsed ${statements.length} statements.`);

// Helper to parse values from INSERT statement
function getValuesFromInsert(stmt) {
    const valuesIndex = stmt.toUpperCase().indexOf('VALUES');
    if (valuesIndex === -1) return null;
    const openParenIndex = stmt.indexOf('(', valuesIndex);
    if (openParenIndex === -1) return null;
    
    const values = [];
    let currentVal = '';
    let inStr = false;
    let idx = openParenIndex + 1;
    while (idx < stmt.length) {
        const char = stmt[idx];
        if (inStr) {
            if (char === '\\') {
                if (idx + 1 < stmt.length) {
                    currentVal += stmt[idx + 1];
                    idx += 2;
                    continue;
                }
            } else if (char === "'") {
                if (idx + 1 < stmt.length && stmt[idx + 1] === "'") {
                    currentVal += "'";
                    idx += 2;
                    continue;
                } else {
                    inStr = false;
                }
            } else {
                currentVal += char;
            }
        } else {
            if (char === "'") {
                inStr = true;
            } else if (char === ',') {
                values.push(currentVal.trim());
                currentVal = '';
            } else if (char === ')') {
                values.push(currentVal.trim());
                break;
            } else {
                currentVal += char;
            }
        }
        idx++;
    }
    return values;
}

// Find the subject ID for "BWL"
console.log('Finding subject ID for "BWL"...');
let bwlSubjectId = null;
for (const stmt of statements) {
    if (/^insert\s+into\s+subjects/i.test(stmt)) {
        const values = getValuesFromInsert(stmt);
        if (values && values[2] && values[2].toLowerCase() === 'bwl') {
            bwlSubjectId = values[0];
            console.log(`Found BWL Subject ID: '${bwlSubjectId}'`);
            break;
        }
    }
}

if (!bwlSubjectId) {
    console.error('Could not find subject ID for "BWL" in subjects table. Falling back to hardcoded value "sc65ozlek3mbpfnrwg4".');
    bwlSubjectId = 'sc65ozlek3mbpfnrwg4';
}

// Extract matching lesson statements
console.log('Extracting BWL lessons...');
const bwlLessons = [];
for (const stmt of statements) {
    if (/^insert\s+into\s+lessons/i.test(stmt)) {
        const values = getValuesFromInsert(stmt);
        if (values && values[1] === bwlSubjectId) {
            bwlLessons.push(stmt);
        }
    }
}

console.log(`Found ${bwlLessons.length} lesson entries for subject BWL.`);

// Write the output file
const sqlHeader = `-- Code & Cash Lernplattform Next.js - BWL Lessons SQL Dump
-- Extracted from: backup_2026-05-22_07-28-35.sql
-- Subject: BWL (ID: ${bwlSubjectId})
-- Date: ${new Date().toISOString()}

SET FOREIGN_KEY_CHECKS=0;

-- Table: lessons (BWL Entries Only)
`;

const fileContent = sqlHeader + bwlLessons.join('\n\n') + '\n';
fs.writeFileSync(outputFilePath, fileContent, 'utf-8');
console.log(`Successfully wrote extracted lessons to ${outputFilePath}`);
