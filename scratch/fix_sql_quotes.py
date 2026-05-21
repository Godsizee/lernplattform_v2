#!/usr/bin/env python3
"""
Analysiert und korrigiert die SQL-Syntax in insert_abap_workbench_klausur.sql.
Das Ziel: Alle einfachen Anführungszeichen INNERHALB des HTML-String-Literals
müssen als '' (SQL-escaped) vorliegen.
"""

import re

INPUT  = r"c:\xampp\htdocs\files\lernplattform_v2\scratch\insert_abap_workbench_klausur.sql"
OUTPUT = r"c:\xampp\htdocs\files\lernplattform_v2\scratch\insert_abap_workbench_klausur_fixed.sql"

with open(INPUT, encoding="utf-8") as f:
    raw = f.read()

# ── Trenne den SQL-Rahmen vom HTML-Content ────────────────────────────────────
# Zeilen 1-12: Kommentar + INSERT-Kopf  → unberührt lassen
# content-Spalte: alles zwischen dem ersten öffnenden ' nach VALUES( ... und
# dem schließenden ' vor dem zweiten '' (contentRaw-Spalte)

# Wir splitten an den festen Trennmarken im SQL:
SPLIT_BEFORE = "'\n    '',\n    'article',"   # Ende der content-Spalte + contentRaw + type
SPLIT_BEFORE_ALT = "',\n    '',\n    'article',"

# Suche den Anfang des HTML-Blocks (nach dem 5. VALUES-Argument-Trenner)
# Die Struktur ist:
#   INSERT INTO lessons (...) VALUES (
#       'id',
#       'subjectId',
#       'authorId',
#       'title',
#       '<div ... HTML ... </div>',   ← DAS ist der Content
#       '',                            ← contentRaw
#       'article',
#       'published',
#       53,
#       '...',
#       '...'
#   );

# Finde den Beginn des HTML-Inhalts: nach 4 VALUES-Feldern
# Der 5. Wert beginnt nach 'ABAP-Workbench-Klausur – Vollständige Prüfungsvorbereitung',\n    '
TITLE_END_MARKER = "Vollst\\u00e4ndige Pr\\u00fcfungsvorbereitung',"

# Einfacher Ansatz: wir lesen Zeile für Zeile und prüfen wo der HTML-Block beginnt/endet
lines = raw.split("\n")

print(f"Total lines: {len(lines)}")

# Identifiziere die Zeilen mit problematischen einfachen Anführungszeichen
# innerhalb des HTML-Blocks (Zeilen 12 bis 892)
problems = []
for i, line in enumerate(lines):
    # Zeile 11 (0-indexed) = Zeile 12 (1-indexed): Beginn des HTML
    # Zeile 891 (0-indexed) = Zeile 892 (1-indexed): Ende HTML
    if 11 <= i <= 891:
        # Suche nach echten einfachen Anführungszeichen (die NICHT verdoppelt sind)
        # Das sind: ' die nicht escaped (\') oder verdoppelt ('') sind
        stripped = line
        # Zähle alle ' in dieser Zeile
        count = stripped.count("'")
        if count > 0:
            problems.append((i+1, count, stripped[:100]))

print(f"\nZeilen mit ' im HTML-Block: {len(problems)}")
for lineno, count, preview in problems[:20]:
    print(f"  Line {lineno:4d} ({count}x): {preview}")

if len(problems) > 20:
    print(f"  ... und {len(problems)-20} weitere")

# ── Fix: Ersetze alle unescapten ' im HTML-Block durch '' ────────────────────
# Strategie:
# 1. Finde den genauen Byte-Offset wo der HTML-String-Literal beginnt und endet
# 2. Ersetze im HTML-Bereich alle ' durch ''

# Der SQL-String beginnt nach `'title',\n    '` und endet vor `',\n    '',`
# Wir suchen den exakten Startpunkt anhand eines eindeutigen Markers

# Marker am Anfang des HTML (erste 40 Zeichen von Zeile 12):
# `<div style="margin-bottom: 3rem; font-f`
HTML_START_MARKER = "<div style=\"margin-bottom: 3rem; font-family: system-ui"
HTML_END_MARKER = "</div>'"  # Das letzte </div> gefolgt von dem schliessenden '

# Finde Position des HTML-Starts im Rohstring
html_start_pos = raw.find(HTML_START_MARKER)
if html_start_pos == -1:
    print("ERROR: HTML-Start-Marker nicht gefunden!")
    exit(1)

# Das öffnende ' ist 1 Zeichen vor dem HTML-Start
open_quote_pos = html_start_pos - 1
print(f"\nÖffnendes ' für HTML-Content bei Position: {open_quote_pos}")
print(f"Zeichen davor: {repr(raw[open_quote_pos-5:open_quote_pos+5])}")

# Finde das schließende '  – es ist direkt nach </div>
# Am Ende: `</div>\n', (contentRaw)
# Suche von hinten: das letzte '</div>' im HTML-Block
html_end_marker = "</div>\n'"  # Ende des letzten </div> + schließendes '
html_end_pos = raw.rfind("</div>\n'")
if html_end_pos == -1:
    # Versuche alternatives Ende
    html_end_pos = raw.rfind("</div>'")
    if html_end_pos == -1:
        print("ERROR: HTML-End-Marker nicht gefunden!")
        exit(1)
    close_quote_pos = html_end_pos + len("</div>'") - 1
else:
    close_quote_pos = html_end_pos + len("</div>\n'") - 1

print(f"Schließendes ' für HTML-Content bei Position: {close_quote_pos}")
print(f"Zeichen dort: {repr(raw[close_quote_pos-10:close_quote_pos+10])}")

# Extrahiere die drei Teile
before_html = raw[:open_quote_pos + 1]  # inkl. öffnendem '
html_content = raw[open_quote_pos + 1 : close_quote_pos]  # reiner HTML-Inhalt
after_html   = raw[close_quote_pos:]    # ab schließendem '

print(f"\nBefore HTML (letzte 50 Zeichen): {repr(before_html[-50:])}")
print(f"HTML Content (erste 80 Zeichen): {repr(html_content[:80])}")
print(f"After HTML (erste 50 Zeichen):   {repr(after_html[:50])}")

# Ersetze im HTML-Content alle ' durch ''
html_fixed = html_content.replace("'", "''")
changed = html_content.count("'")
print(f"\nErsetzt: {changed} Vorkommen von ' durch ''")

# Füge alles wieder zusammen
fixed_sql = before_html + html_fixed + after_html

# Schreibe die fixe Datei
with open(OUTPUT, "w", encoding="utf-8") as f:
    f.write(fixed_sql)

print(f"\nFertig! Gespeichert als: {OUTPUT}")
print(f"   Original-Groesse: {len(raw):,} Bytes")
print(f"   Neue Groesse:     {len(fixed_sql):,} Bytes")
print(f"   Differenz:      +{len(fixed_sql)-len(raw):,} Bytes (durch '' statt ')")
