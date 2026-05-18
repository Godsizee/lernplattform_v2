#!/bin/sh

# Warte kurz, bis die MySQL-Datenbank vollständig hochgefahren ist
echo "Warte auf Datenbankbereitschaft..."
sleep 5

# Führe Datenbank-Schema-Update aus
echo "Synchronisiere Prisma-Schema mit Live-Datenbank..."
npx prisma@5.22.0 db push --accept-data-loss

# Starte den Next.js Standalone Server
echo "Starte Next.js Standalone Server..."
exec node server.js
