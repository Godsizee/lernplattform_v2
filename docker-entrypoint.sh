#!/bin/sh

# Warte kurz, bis die MySQL-Datenbank vollständig hochgefahren ist
echo "Warte auf Datenbankbereitschaft..."
sleep 5

# Starte den Next.js Standalone Server
echo "Starte Next.js Standalone Server..."
exec node server.js
