-- SQL INSERT-Befehle für BC400 Kapitel 5 und Kapitel 6
-- Fach: SAP ERP (subjectId: 'sxh3e5ewi0qahenr6jg')
-- Autor: u5ilhtdcn9ycti9tbmc

-- =========================================================================
-- KAPITEL 5: Komplexe Datenobjekte
-- =========================================================================

INSERT INTO lessons (id, subjectId, authorId, title, content, contentRaw, type, status, sortOrder, createdAt, updatedAt)
VALUES (
    'lesson_bc400_ch05',
    'sxh3e5ewi0qahenr6jg',
    'u5ilhtdcn9ycti9tbmc',
    'BC400 - Kapitel 5: Komplexe Datenobjekte',
    '<div style="margin-bottom: 3rem; font-family: system-ui, -apple-system, sans-serif; color: var(--foreground); line-height: 1.6;">
    <!-- Topic Badge -->
    <span style="display: inline-block; padding: 0.35rem 1rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1.5rem; background: rgba(139, 92, 246, 0.08); border: 1px solid var(--color-primary); color: var(--color-primary);">SAP - ABAP (BC400)</span>
    
    <h1 style="font-size: 2.5rem; font-weight: 800; color: var(--foreground); margin-bottom: 1rem; letter-spacing: -0.025em; line-height: 1.2;">Kapitel 5: Komplexe Datenobjekte</h1>
    <p style="font-size: 1.1rem; color: var(--foreground-muted); margin-bottom: 2rem;">Dieses Kapitel behandelt Datenstrukturen, die über einfache elementare Variablen wie Textfelder oder Zahlen hinausgehen. Komplexe Datenobjekte ermöglichen es, zusammenhängende Datensätze zeilenweise als Strukturen oder als ganze Tabellen im Hauptspeicher über interne Tabellen effizient zu verarbeiten.</p>

    <!-- 5.1 Section -->
    <div style="margin-top: 3rem; margin-bottom: 3rem;">
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--foreground); margin-bottom: 1.5rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; letter-spacing: -0.025em;">5.1 Verwenden von strukturierten Datenobjekten</h2>
        <p style="margin-bottom: 1.5rem;">Eine Struktur (auch <strong>Arbeitsbereich</strong> oder <strong>Work Area</strong> genannt) ist ein zusammengesetztes Datenobjekt. Sie besteht aus einzelnen Komponenten (Feldern), die logisch zusammengehören und unterschiedliche Datentypen besitzen können. Eine Struktur repräsentiert genau einen Datensatz beziehungsweise eine Zeile.</p>

        <!-- Definition paths grid -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1.25rem;">Zwei Wege zur Definition von Strukturen</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
            <!-- Globale Typen -->
            <div style="border-radius: 1.25rem; padding: 2rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span style="font-size: 0.75rem; background: rgba(139, 92, 246, 0.08); color: var(--color-primary); border: 1px solid var(--color-primary); padding: 0.25rem 0.75rem; border-radius: 9999px; font-weight: 700; text-transform: uppercase;">Globale Typen</span>
                    <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--foreground); margin-top: 1rem; margin-bottom: 0.75rem;">Globale Strukturen (SE11)</h3>
                    <p style="font-size: 0.9rem; color: var(--foreground-muted); line-height: 1.5; margin-bottom: 1rem;">Globale Strukturen werden zentral in der Transaktion <strong>SE11</strong> angelegt. Sie stehen systemweit in allen Programmen zur Verfügung.</p>
                </div>
                <div style="background: #0f172a; color: #e2e8f0; padding: 0.75rem; border-radius: 8px; font-family: monospace; font-size: 0.8rem; border-left: 3px solid var(--color-primary);">
                    <span style="color: var(--color-secondary);">DATA</span> gs_carrier <span style="color: var(--color-primary);">TYPE</span> scarr.
                </div>
            </div>

            <!-- Lokale Typen -->
            <div style="border-radius: 1.25rem; padding: 2rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span style="font-size: 0.75rem; background: rgba(236, 72, 153, 0.08); border: 1px solid var(--color-secondary); color: var(--color-secondary); padding: 0.25rem 0.75rem; border-radius: 9999px; font-weight: 700; text-transform: uppercase;">Lokale Typen</span>
                    <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--foreground); margin-top: 1rem; margin-bottom: 0.75rem;">Lokale Strukturen (Programm)</h3>
                    <p style="font-size: 0.9rem; color: var(--foreground-muted); line-height: 1.5; margin-bottom: 1rem;">Lokale Typen werden direkt im Quellcode definiert und gelten nur innerhalb dieses Programms.</p>
                </div>
                <div style="background: #0f172a; color: #e2e8f0; padding: 0.75rem; border-radius: 8px; font-family: monospace; font-size: 0.8rem; border-left: 3px solid var(--color-secondary); line-height: 1.4;">
                    <span style="color: var(--color-secondary);">TYPES: BEGIN OF</span> ts_flight,<br>
                    &nbsp;&nbsp;carrid <span style="color: var(--color-primary);">TYPE</span> scarr-carrid,<br>
                    &nbsp;&nbsp;connid <span style="color: var(--color-primary);">TYPE</span> sflight-connid,<br>
                    <span style="color: var(--color-secondary);">END OF</span> ts_flight.<br>
                    <span style="color: var(--color-secondary);">DATA</span> gs_flight <span style="color: var(--color-primary);">TYPE</span> ts_flight.
                </div>
            </div>
        </div>

        <!-- 2. Zugriff auf Strukturkomponenten -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1rem;">Zugriff auf Strukturkomponenten</h3>
        <p style="margin-bottom: 1rem;">Um auf ein einzelnes Feld innerhalb einer Struktur zuzugreifen, verwendet man den <strong>Strukturkomponenten-Selektor</strong> (der Bindestrich <code>-</code>):</p>
        <div style="background: #0f172a; color: #e2e8f0; padding: 1.25rem; border-radius: 0.75rem; font-family: monospace; font-size: 0.85rem; border-left: 4px solid var(--color-primary); line-height: 1.5; margin-bottom: 2rem;">
            gs_flight-carrid = ''LH''.<br>
            gs_flight-connid = ''0400''.
        </div>

        <!-- 3. Kopieren namensgleicher Strukturkomponenten -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1rem;">Kopieren namensgleicher Strukturkomponenten</h3>
        <p style="margin-bottom: 1rem;">Häufig müssen Daten zwischen zwei Strukturen kopiert werden, die teilweise identische Feldnamen besitzen. Anstatt jedes Feld einzeln zuzuweisen, nutzt man die ABAP-Anweisung <code>MOVE-CORRESPONDING</code>:</p>
        <div style="background: #0f172a; color: #e2e8f0; padding: 1.25rem; border-radius: 0.75rem; font-family: monospace; font-size: 0.85rem; border-left: 4px solid var(--color-secondary); line-height: 1.5; margin-bottom: 1.5rem;">
            <span style="color: var(--color-secondary); font-weight: bold;">MOVE-CORRESPONDING</span> gs_source <span style="color: var(--color-secondary); font-weight: bold;">TO</span> gs_target.
        </div>
        <!-- Info Card for Move-Corresponding -->
        <div style="background: rgba(16, 185, 129, 0.05); border-left: 4px solid var(--color-success); border-radius: 0 1rem 1rem 0; padding: 1.5rem; margin-bottom: 3rem;">
            <h4 style="color: var(--color-success); font-weight: 700; font-size: 1.05rem; margin-top: 0; margin-bottom: 0.5rem;">🔑 Funktionsweise von MOVE-CORRESPONDING</h4>
            <p style="margin: 0; font-size: 0.9rem; color: var(--foreground); line-height: 1.5;">
                Das System sucht zur Laufzeit nach Feldern mit identischen Namen in Quell- und Zielstruktur. Nur diese namensgleichen Felder werden kopiert. Andere Felder im Ziel bleiben unberührt.
            </p>
        </div>

        <!-- 4. Strukturen im Debugging-Modus -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1rem;">Strukturen im Debugging-Modus</h3>
        <p style="margin-bottom: 1.5rem;">Im ABAP Debugger können Strukturen im Reiter <strong>Variablen</strong> analysiert werden. Durch einen Doppelklick auf den Namen der Struktur öffnet sich die Detailansicht. In dieser Detailansicht werden alle Komponenten hierarchisch dargestellt:</p>
        
        <div style="border-radius: 1rem; padding: 1.5rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05); margin-bottom: 3rem;">
            <div style="font-size: 0.85rem; font-weight: 600; color: var(--foreground-muted); text-transform: uppercase; margin-bottom: 0.75rem;">Debugger-Detailansicht (Simulation)</div>
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.85rem;">
                <thead>
                    <tr style="border-bottom: 2px solid var(--border);">
                        <th style="padding: 0.5rem; color: var(--foreground); font-weight: 700;">Strukturkomponente</th>
                        <th style="padding: 0.5rem; color: var(--foreground); font-weight: 700;">Typ</th>
                        <th style="padding: 0.5rem; color: var(--foreground); font-weight: 700; text-align: center;">Länge</th>
                        <th style="padding: 0.5rem; color: var(--foreground); font-weight: 700;">Wert</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom: 1px solid var(--border);">
                        <td style="padding: 0.5rem; color: var(--color-primary); font-family: monospace; font-weight: 600;">GS_FLIGHT-CARRID</td>
                        <td style="padding: 0.5rem; color: var(--foreground-muted);">C</td>
                        <td style="padding: 0.5rem; color: var(--foreground-muted); text-align: center;">3</td>
                        <td style="padding: 0.5rem; color: var(--foreground); font-family: monospace;">''LH''</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border);">
                        <td style="padding: 0.5rem; color: var(--color-primary); font-family: monospace; font-weight: 600;">GS_FLIGHT-CONNID</td>
                        <td style="padding: 0.5rem; color: var(--foreground-muted);">N</td>
                        <td style="padding: 0.5rem; color: var(--foreground-muted); text-align: center;">4</td>
                        <td style="padding: 0.5rem; color: var(--foreground); font-family: monospace;">''0400''</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.5rem; color: var(--color-primary); font-family: monospace; font-weight: 600;">GS_FLIGHT-FLDATE</td>
                        <td style="padding: 0.5rem; color: var(--foreground-muted);">D</td>
                        <td style="padding: 0.5rem; color: var(--foreground-muted); text-align: center;">8</td>
                        <td style="padding: 0.5rem; color: var(--foreground); font-family: monospace;">''20260520''</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- 5.2 Section -->
    <div style="margin-top: 3rem; margin-bottom: 3rem;">
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--foreground); margin-bottom: 1.5rem; border-left: 4px solid var(--color-warning); padding-left: 1rem; letter-spacing: -0.025em;">5.2 Verwenden von internen Tabellen</h2>
        <p style="margin-bottom: 1.5rem;">Eine interne Tabelle ist ein dynamisches Datenobjekt. Sie hält eine variable Anzahl von Zeilen des gleichen Typs im Hauptspeicher des Applikationsservers. Während eine Struktur genau einen Datensatz repräsentiert, können interne Tabellen beliebig viele Datensätze temporär ablegen.</p>

        <!-- Table categories comparison -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1.25rem;">Tabellenkategorien in ABAP</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
            <!-- Standardtabelle -->
            <div style="border-radius: 1rem; padding: 1.5rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span style="font-size: 0.75rem; background: rgba(59, 130, 246, 0.08); color: var(--color-primary); border: 1px solid var(--color-primary); padding: 0.2rem 0.6rem; border-radius: 6px; font-weight: 700; text-transform: uppercase;">STANDARD TABLE</span>
                    <h4 style="font-size: 1.15rem; color: var(--foreground); font-weight: 700; margin-top: 0.75rem; margin-bottom: 0.5rem;">Standardtabelle</h4>
                    <p style="font-size: 0.85rem; color: var(--foreground-muted); line-height: 1.5; margin-bottom: 1rem;">Zugriff primär über Zeilenindex. Sehr schnelles Einfügen am Tabellenende mittels <code>APPEND</code>.</p>
                </div>
                <div style="background: #0f172a; padding: 0.5rem; border-radius: 6px; font-family: monospace; font-size: 0.8rem; color: #a78bfa; text-align: center;">
                    Schlüsselsuche: O(N) (Linear)
                </div>
            </div>

            <!-- Sortierte Tabelle -->
            <div style="border-radius: 1rem; padding: 1.5rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span style="font-size: 0.75rem; background: rgba(16, 185, 129, 0.08); color: var(--color-success); border: 1px solid var(--color-success); padding: 0.2rem 0.6rem; border-radius: 6px; font-weight: 700; text-transform: uppercase;">SORTED TABLE</span>
                    <h4 style="font-size: 1.15rem; color: var(--foreground); font-weight: 700; margin-top: 0.75rem; margin-bottom: 0.5rem;">Sortierte Tabelle</h4>
                    <p style="font-size: 0.85rem; color: var(--foreground-muted); line-height: 1.5; margin-bottom: 1rem;">Daten werden im Speicher automatisch nach Tabellenschlüssel sortiert gehalten. Sehr effiziente Binärsuche.</p>
                </div>
                <div style="background: #0f172a; padding: 0.5rem; border-radius: 6px; font-family: monospace; font-size: 0.8rem; color: #34d399; text-align: center;">
                    Schlüsselsuche: O(log N) (Binär)
                </div>
            </div>

            <!-- Hashed-Tabelle -->
            <div style="border-radius: 1rem; padding: 1.5rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span style="font-size: 0.75rem; background: rgba(236, 72, 153, 0.08); color: var(--color-secondary); border: 1px solid var(--color-secondary); padding: 0.2rem 0.6rem; border-radius: 6px; font-weight: 700; text-transform: uppercase;">HASHED TABLE</span>
                    <h4 style="font-size: 1.15rem; color: var(--foreground); font-weight: 700; margin-top: 0.75rem; margin-bottom: 0.5rem;">Hashed-Tabelle</h4>
                    <p style="font-size: 0.85rem; color: var(--foreground-muted); line-height: 1.5; margin-bottom: 1rem;">Zugriff über einen Hash-Algorithmus. Kein Indexzugriff erlaubt. Benötigt einen eindeutigen Schlüssel (UNIQUE).</p>
                </div>
                <div style="background: #0f172a; padding: 0.5rem; border-radius: 6px; font-family: monospace; font-size: 0.8rem; color: #f472b6; text-align: center;">
                    Schlüsselsuche: O(1) (Konstant)
                </div>
            </div>
        </div>

        <!-- Table Definitions and Header Line Alert -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1.25rem;">Definition lokaler Tabellentypen</h3>
        <div style="background: #0f172a; color: #e2e8f0; padding: 1.25rem; border-radius: 0.75rem; font-family: monospace; font-size: 0.85rem; border-left: 4px solid var(--color-warning); line-height: 1.5; margin-bottom: 2rem;">
            <span style="color: #64748b;">" Standardtabelle deklarieren:</span><br>
            <span style="color: var(--color-secondary);">DATA</span> gt_flights <span style="color: var(--color-primary);">TYPE STANDARD TABLE OF</span> ts_flight <span style="color: var(--color-primary);">WITH EMPTY KEY</span>.<br><br>
            <span style="color: #64748b;">" Sortierte Tabelle mit eindeutigem Schlüssel deklarieren:</span><br>
            <span style="color: var(--color-secondary);">DATA</span> gt_sorted <span style="color: var(--color-primary);">TYPE SORTED TABLE OF</span> ts_flight<br>
            &nbsp;&nbsp;<span style="color: var(--color-primary);">WITH UNIQUE KEY</span> carrid connid.
        </div>

        <div style="background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: 1rem; padding: 1.5rem; margin-bottom: 3rem;">
            <span style="color: var(--color-danger); font-weight: 800; font-size: 1.1rem; text-transform: uppercase;">⚠️ Wichtiger Hinweis: Kopfzeilen sind obsolet!</span>
            <p style="font-size: 0.9rem; color: var(--foreground); margin-top: 0.5rem; margin-bottom: 0; line-height: 1.6;">
                In älterem ABAP-Code besitzen interne Tabellen oft eine integrierte Kopfzeile (Header Line), bei der sich Tabelle und Arbeitsbereich denselben Namen teilen. Diese Schreibweise gilt heute als <strong>obsolet</strong> und ist im objektorientierten Kontext verboten. Interne Tabellen sollten immer <strong>ohne Kopfzeile</strong> definiert und mit einem separaten Arbeitsbereich (Structure / Work Area) verwendet werden.
            </p>
        </div>

        <!-- Tabellen-Anweisungen -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1.25rem;">Zentrale ABAP-Anweisungen für interne Tabellen</h3>
        
        <!-- Append -->
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                <h4 style="margin: 0; font-size: 1.1rem; color: var(--foreground); font-weight: 700;">APPEND (Zeile anhängen)</h4>
                <span style="font-size: 0.75rem; background: rgba(59, 130, 246, 0.08); color: var(--color-primary); border: 1px solid var(--color-primary); padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 700; font-family: monospace;">Nur Standardtabellen</span>
            </div>
            <p style="font-size: 0.9rem; color: var(--foreground-muted); margin-bottom: 0.75rem;">Hängt den Inhalt einer Struktur an das Ende einer Standardtabelle an.</p>
            <div style="background: #0f172a; color: #e2e8f0; padding: 0.75rem; border-radius: 6px; font-family: monospace; font-size: 0.8rem;">
                <span style="color: var(--color-secondary); font-weight: bold;">APPEND</span> gs_flight <span style="color: var(--color-secondary); font-weight: bold;">TO</span> gt_flights.
            </div>
        </div>

        <!-- Insert -->
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                <h4 style="margin: 0; font-size: 1.1rem; color: var(--foreground); font-weight: 700;">INSERT (Zeile schlüsselgerecht einfügen)</h4>
                <span style="font-size: 0.75rem; background: rgba(16, 185, 129, 0.08); color: var(--color-success); border: 1px solid var(--color-success); padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 700; font-family: monospace;">Sortierte / Hashed-Tabellen</span>
            </div>
            <p style="font-size: 0.9rem; color: var(--foreground-muted); margin-bottom: 0.75rem;">Fügt eine Zeile schlüsselgerecht in eine sortierte oder Hashed-Tabelle ein.</p>
            <div style="background: #0f172a; color: #e2e8f0; padding: 0.75rem; border-radius: 6px; font-family: monospace; font-size: 0.8rem;">
                <span style="color: var(--color-secondary); font-weight: bold;">INSERT</span> gs_flight <span style="color: var(--color-secondary); font-weight: bold;">INTO TABLE</span> gt_sorted.
            </div>
        </div>

        <!-- Loop -->
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.25rem;">
            <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--foreground); font-weight: 700;">LOOP AT (Zeilenweise Verarbeitung)</h4>
            <p style="font-size: 0.9rem; color: var(--foreground-muted); margin-bottom: 0.75rem;">Liest eine interne Tabelle Zeile für Zeile aus und kopiert diese nacheinander in einen Arbeitsbereich.</p>
            <div style="background: #0f172a; color: #e2e8f0; padding: 0.75rem; border-radius: 6px; font-family: monospace; font-size: 0.8rem; line-height: 1.4;">
                <span style="color: var(--color-secondary); font-weight: bold;">LOOP AT</span> gt_flights <span style="color: var(--color-secondary); font-weight: bold;">INTO</span> gs_flight.<br>
                &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">WRITE</span>: / gs_flight-carrid, gs_flight-connid.<br>
                <span style="color: var(--color-secondary); font-weight: bold;">ENDLOOP</span>.
            </div>
        </div>

        <!-- Read Table -->
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.25rem;">
            <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--foreground); font-weight: 700;">READ TABLE (Einzelsatzzugriff)</h4>
            <p style="font-size: 0.9rem; color: var(--foreground-muted); margin-bottom: 0.75rem;">Dient dem gezielten Lesen eines einzelnen Eintrags, entweder über den numerischen Zeilenindex oder einen konkreten Tabellenschlüssel.</p>
            <div style="background: #0f172a; color: #e2e8f0; padding: 0.75rem; border-radius: 6px; font-family: monospace; font-size: 0.8rem; line-height: 1.4;">
                <span style="color: #64748b;">" Lese erste Zeile per Index:</span><br>
                <span style="color: var(--color-secondary); font-weight: bold;">READ TABLE</span> gt_flights <span style="color: var(--color-secondary); font-weight: bold;">INTO</span> gs_flight <span style="color: var(--color-secondary); font-weight: bold;">INDEX</span> 1.<br><br>
                <span style="color: #64748b;">" Lese Zeile über Schlüsselwert:</span><br>
                <span style="color: var(--color-secondary); font-weight: bold;">READ TABLE</span> gt_flights <span style="color: var(--color-secondary); font-weight: bold;">INTO</span> gs_flight <span style="color: var(--color-secondary); font-weight: bold;">WITH KEY</span> carid = ''AA''.
            </div>
            
            <h4 style="font-size: 0.95rem; color: var(--foreground); font-weight: 700; margin-top: 1.25rem; margin-bottom: 0.5rem;">Ergebnisprüfung nach dem Leseversuch</h4>
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.85rem;">
                <thead>
                    <tr style="border-bottom: 2px solid var(--border);">
                        <th style="padding: 0.5rem; color: var(--foreground); font-weight: 700; width: 120px;">Systemfeld</th>
                        <th style="padding: 0.5rem; color: var(--foreground); font-weight: 700;">Bedeutung</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom: 1px solid var(--border);">
                        <td style="padding: 0.5rem; color: var(--color-success); font-family: monospace; font-weight: 600;">sy-subrc = 0</td>
                        <td style="padding: 0.5rem; color: var(--foreground);">Lesezugriff war erfolgreich. Zeile wurde gefunden und in gs_flight kopiert.</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.5rem; color: var(--color-danger); font-family: monospace; font-weight: 600;">sy-subrc &lt;&gt; 0</td>
                        <td style="padding: 0.5rem; color: var(--foreground);">Kein passender Eintrag in der internen Tabelle vorhanden.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Sort -->
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                <h4 style="margin: 0; font-size: 1.1rem; color: var(--foreground); font-weight: 700;">SORT (Sortieren)</h4>
                <span style="font-size: 0.75rem; background: rgba(59, 130, 246, 0.08); color: var(--color-primary); border: 1px solid var(--color-primary); padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 700; font-family: monospace;">Nur Standardtabellen</span>
            </div>
            <p style="font-size: 0.9rem; color: var(--foreground-muted); margin-bottom: 0.75rem;">Sortiert Standardtabellen nach frei wählbaren Feldkomponenten (auf- oder absteigend). Sortierte Tabellen behalten ihre Sortierung automatisch und dürfen <strong>nicht</strong> manuell sortiert werden.</p>
            <div style="background: #0f172a; color: #e2e8f0; padding: 0.75rem; border-radius: 6px; font-family: monospace; font-size: 0.8rem;">
                <span style="color: var(--color-secondary); font-weight: bold;">SORT</span> gt_flights <span style="color: var(--color-secondary); font-weight: bold;">BY</span> carrid <span style="color: var(--color-secondary); font-weight: bold;">ASCENDING</span> connid <span style="color: var(--color-secondary); font-weight: bold;">DESCENDING</span>.
            </div>
        </div>

        <!-- Clear vs Free -->
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.25rem;">
            <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--foreground); font-weight: 700;">CLEAR & FREE (Inhalte löschen & Speicher freigeben)</h4>
            <p style="font-size: 0.9rem; color: var(--foreground-muted); margin-bottom: 0.75rem;">Beide Anweisungen leeren den Inhalt der internen Tabelle vollständig, unterscheiden sich aber in der Speicherverwaltung:</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; margin-top: 1rem;">
                <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border); padding: 1rem; border-radius: 0.75rem;">
                    <span style="color: var(--color-secondary); font-weight: 700; font-family: monospace; font-size: 0.95rem;">CLEAR gt_flights.</span>
                    <p style="font-size: 0.85rem; color: var(--foreground-muted); margin: 0.5rem 0 0 0;">Löscht alle Tabellenzeilen. Der initial für die Tabelle reservierte Arbeitsspeicher auf dem Server bleibt jedoch reserviert.</p>
                </div>
                <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border); padding: 1rem; border-radius: 0.75rem;">
                    <span style="color: var(--color-secondary); font-weight: 700; font-family: monospace; font-size: 0.95rem;">FREE gt_flights.</span>
                    <p style="font-size: 0.85rem; color: var(--foreground-muted); margin: 0.5rem 0 0 0;">Löscht alle Tabellenzeilen und gibt den reservierten Speicherplatz sofort komplett an das Betriebssystem frei.</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Interactive Quiz Section -->
    <div style="margin-top: 4rem; margin-bottom: 4rem; background: rgba(30, 41, 59, 0.02); border: 1px solid var(--border); padding: 2.5rem; border-radius: 1.5rem;">
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--foreground); margin-bottom: 2rem; text-align: center;">💡 Übungsfragen und Kontrolle</h2>

        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <!-- Q1 -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem;">
                <div style="color: var(--color-secondary); font-weight: 700; font-size: 0.95rem; margin-bottom: 0.5rem;">Frage 1: Wie unterscheidet sich eine Struktur von einer internen Tabelle?</div>
                <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.75rem; font-size: 0.85rem; color: var(--foreground);">
                    <strong>Antwort:</strong> Eine Struktur (Work Area) stellt genau eine Zeile (einen einzelnen Datensatz) dar, während eine interne Tabelle eine dynamische Datenmenge mit beliebig vielen Zeilen im Hauptspeicher des Applikationsservers halten kann.
                </div>
            </div>

            <!-- Q2 -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem;">
                <div style="color: var(--color-secondary); font-weight: 700; font-size: 0.95rem; margin-bottom: 0.5rem;">Frage 2: Was ist der Sinn der Anweisung MOVE-CORRESPONDING?</div>
                <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.75rem; font-size: 0.85rem; color: var(--foreground); line-height: 1.5;">
                    <strong>Antwort:</strong> Sie kopiert Werte zwischen zwei Strukturen mit teilweise unterschiedlichen Strukturen. Dabei sucht das System zur Laufzeit nach namensgleichen Feldern in Quell- und Zielstruktur und kopiert nur diese.
                </div>
            </div>

            <!-- Q3 -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem;">
                <div style="color: var(--color-secondary); font-weight: 700; font-size: 0.95rem; margin-bottom: 0.5rem;">Frage 3: Welche Tabellenkategorie hat die schnellste Zugriffszeit bei großen Datenmengen über den Schlüssel?</div>
                <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.75rem; font-size: 0.85rem; color: var(--foreground);">
                    <strong>Antwort:</strong> Die Hashed-Tabelle (HASHED TABLE). Durch die Verwaltung über einen Hash-Algorithmus ist die Zugriffszeit O(1) konstant, also völlig unabhängig von der Gesamtanzahl der Zeilen in der Tabelle.
                </div>
            </div>
        </div>
    </div>

    <!-- Summary Card -->
    <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 10px 30px -15px rgba(0,0,0,0.15);">
        <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--foreground); margin-top: 0; margin-bottom: 1.25rem;">📝 Kurzzusammenfassung</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; font-size: 0.9rem; color: var(--foreground); line-height: 1.6;">
            <div>
                <h4 style="color: var(--color-primary); margin-top: 0; font-weight: 700; margin-bottom: 0.5rem;">Strukturen</h4>
                <ul style="padding-left: 1.1rem; margin: 0;">
                    <li>Arbeitsbereiche für genau ein Datenzeilenobjekt.</li>
                     <li>Komponentenzugriff über das Selektorsymbol Bindestrich (<code>-</code>).</li>
                     <li>Globale Definition per SE11, lokale Definition per <code>TYPES: BEGIN OF ...</code>.</li>
                </ul>
            </div>
            <div>
                <h4 style="color: var(--color-secondary); margin-top: 0; font-weight: 700; margin-bottom: 0.5rem;">Interne Tabellen</h4>
                <ul style="padding-left: 1.1rem; margin: 0;">
                    <li>Haben drei Kategorien: Standard, Sortiert und Hashed.</li>
                    <li>Sollten immer modern ohne Kopfzeile (Header Line) deklariert werden.</li>
                    <li>Zentrale Befehle: APPEND, INSERT, LOOP AT, READ TABLE, SORT, CLEAR und FREE.</li>
                </ul>
            </div>
        </div>
    </div>
</div>',
    '',
    'article',
    'published',
    49,
    '2026-05-20 11:35:00',
    '2026-05-20 11:35:00'
);

-- =========================================================================
-- KAPITEL 6: Datenmodellierung und Datenbeschaffung
-- =========================================================================

INSERT INTO lessons (id, subjectId, authorId, title, content, contentRaw, type, status, sortOrder, createdAt, updatedAt)
VALUES (
    'lesson_bc400_ch06',
    'sxh3e5ewi0qahenr6jg',
    'u5ilhtdcn9ycti9tbmc',
    'BC400 - Kapitel 6: Datenmodellierung und Datenbeschaffung',
    '<div style="margin-bottom: 3rem; font-family: system-ui, -apple-system, sans-serif; color: var(--foreground); line-height: 1.6;">
    <!-- Topic Badge -->
    <span style="display: inline-block; padding: 0.35rem 1rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1.5rem; background: rgba(236, 72, 153, 0.08); border: 1px solid var(--color-secondary); color: var(--color-secondary);">SAP - ABAP (BC400)</span>
    
    <h1 style="font-size: 2.5rem; font-weight: 800; color: var(--foreground); margin-bottom: 1rem; letter-spacing: -0.025em; line-height: 1.2;">Kapitel 6: Datenmodellierung und Datenbeschaffung</h1>
    <p style="font-size: 1.1rem; color: var(--foreground-muted); margin-bottom: 2rem;">Dieses Kapitel widmet sich dem permanenten Datenbestand auf der relationalen Datenbank des SAP-Systems. Es behandelt den Aufbau relationaler Datenmodelle und transparenten Datenbanktabellen im ABAP Dictionary, plattformunabhängige Datenbankzugriffe mittels Open SQL sowie die Implementierung robuster, performanter und sicherer Berechtigungsprüfungen im Quellcode.</p>

    <!-- 6.1 Section -->
    <div style="margin-top: 3rem; margin-bottom: 3rem;">
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--foreground); margin-bottom: 1.5rem; border-left: 4px solid var(--color-secondary); padding-left: 1rem; letter-spacing: -0.025em;">6.1 Erläutern von Datenmodellen</h2>
        <p style="margin-bottom: 1.5rem;">In einem relationalen Datenbanksystem werden Daten dauerhaft in zweidimensionalen Tabellen (Zeilen und Spalten) gespeichert. Jede Zeile stellt einen Datensatz dar, jede Spalte ein Feld (Attribut). Beziehungen zwischen Tabellen werden über Schlüsselwerte definiert:</p>

        <!-- Keys Cards -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
            <div style="border-radius: 1rem; padding: 1.5rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05);">
                <h4 style="color: var(--color-secondary); font-weight: 700; font-size: 1.1rem; margin-top: 0; margin-bottom: 0.5rem;">🔑 Primärschlüssel (Primary Key)</h4>
                <p style="font-size: 0.9rem; color: var(--foreground); margin: 0; line-height: 1.5;">Ein Primärschlüssel besteht aus einem oder mehreren Tabellenfeldern, die jeden Datensatz innerhalb der Tabelle eindeutig identifizieren. Es kann keine zwei Zeilen mit exakt identischen Werten im Primärschlüssel geben.</p>
            </div>
            <div style="border-radius: 1rem; padding: 1.5rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05);">
                <h4 style="color: var(--color-secondary); font-weight: 700; font-size: 1.1rem; margin-top: 0; margin-bottom: 0.5rem;">🔗 Fremdschlüssel (Foreign Key)</h4>
                <p style="font-size: 0.9rem; color: var(--foreground); margin: 0; line-height: 1.5;">Ein Fremdschlüssel verweist auf den Primärschlüssel einer anderen Tabelle, um eine logische Verknüpfung (Beziehung, z. B. 1:N) abzubilden. Fremdschlüssel sichern die referenzielle Integrität des Systems.</p>
            </div>
        </div>

        <!-- Flight data model -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1.25rem;">Das SAP-Flugdatenmodell</h3>
        <p style="margin-bottom: 1.5rem;">Das Flugdatenmodell ist das klassische Schulungsdatenmodell in SAP ABAP. Es verdeutlicht relationale Beziehungen über mehrere Tabellenebenen:</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 3rem;">
            <!-- SCARR -->
            <div style="border-radius: 0.75rem; padding: 1.25rem; background: var(--surface); border: 1px solid var(--border); border-left: 4px solid var(--color-primary);">
                <span style="font-size: 0.75rem; font-family: monospace; font-weight: 700; color: var(--color-primary);">Tabelle SCARR</span>
                <h5 style="margin: 0.25rem 0 0.5rem 0; font-size: 1.05rem; color: var(--foreground); font-weight: 700;">Fluggesellschaften</h5>
                <p style="font-size: 0.8rem; color: var(--foreground-muted); margin: 0; line-height: 1.4;">Stammdaten zu Fluglinien (z.B. LH für Lufthansa). Hauptschlüsselfeld: <code>carrid</code>.</p>
            </div>
            <!-- SPFLI -->
            <div style="border-radius: 0.75rem; padding: 1.25rem; background: var(--surface); border: 1px solid var(--border); border-left: 4px solid var(--color-success);">
                <span style="font-size: 0.75rem; font-family: monospace; font-weight: 700; color: var(--color-success);">Tabelle SPFLI</span>
                <h5 style="margin: 0.25rem 0 0.5rem 0; font-size: 1.05rem; color: var(--foreground); font-weight: 700;">Flugverbindungen</h5>
                <p style="font-size: 0.8rem; color: var(--foreground-muted); margin: 0; line-height: 1.4;">Bildet konkrete Flugstrecken und Flugpläne ab (z.B. LH 400 von FRA nach JFK).</p>
            </div>
            <!-- SFLIGHT -->
            <div style="border-radius: 0.75rem; padding: 1.25rem; background: var(--surface); border: 1px solid var(--border); border-left: 4px solid var(--color-warning);">
                <span style="font-size: 0.75rem; font-family: monospace; font-weight: 700; color: var(--color-warning);">Tabelle SFLIGHT</span>
                <h5 style="margin: 0.25rem 0 0.5rem 0; font-size: 1.05rem; color: var(--foreground); font-weight: 700;">Flüge</h5>
                <p style="font-size: 0.8rem; color: var(--foreground-muted); margin: 0; line-height: 1.4;">Enthält die konkreten Flugtermine mit Preisen und Belegungsdaten (z.B. Flug am 20.05.2026).</p>
            </div>
            <!-- SBOOK -->
            <div style="border-radius: 0.75rem; padding: 1.25rem; background: var(--surface); border: 1px solid var(--border); border-left: 4px solid var(--color-secondary);">
                <span style="font-size: 0.75rem; font-family: monospace; font-weight: 700; color: var(--color-secondary);">Tabelle SBOOK</span>
                <h5 style="margin: 0.25rem 0 0.5rem 0; font-size: 1.05rem; color: var(--foreground); font-weight: 700;">Flugbuchungen</h5>
                <p style="font-size: 0.8rem; color: var(--foreground-muted); margin: 0; line-height: 1.4;">Speichert jede einzelne Kundenbuchung für einen konkreten Flugtermin ab.</p>
            </div>
        </div>

        <!-- Dictionary mapping -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1rem;">Die technische Hierarchie im Dictionary (SE11)</h3>
        <p style="margin-bottom: 1.5rem;">Das ABAP Dictionary ist das zentrale Metadaten-Repository. Definitionen transparenter Datenbanktabellen entsprechen exakt (1:1-Entsprechung) den echten Strukturen der physischen SQL-Datenbank. Jede Spalte wird in einer dreistufigen Hierarchie modelliert:</p>

        <!-- 3 Tier Hierarchy of Fields -->
        <div style="display: flex; flex-direction: column; gap: 0.75rem; margin: 1.5rem auto; max-width: 600px; background: rgba(30, 41, 59, 0.02); border: 1px solid var(--border); padding: 1.5rem; border-radius: 1rem;">
            <div style="background: var(--surface); border: 1px solid var(--border); padding: 0.75rem 1.25rem; border-radius: 0.75rem; display: flex; align-items: center; gap: 1rem;">
                <span style="font-weight: 800; font-size: 1rem; color: var(--color-secondary); background: rgba(236, 72, 153, 0.08); width: 2rem; height: 2rem; display: flex; align-items: center; justify-content: center; border-radius: 50%;">1</span>
                <div>
                    <strong style="color: var(--foreground);">Tabellenfeld:</strong>
                    <span style="font-size: 0.85rem; color: var(--foreground-muted);"> Definiert den technischen Spaltennamen innerhalb der transparenten Tabelle (z. B. CARRID).</span>
                </div>
            </div>
            <div style="background: var(--surface); border: 1px solid var(--border); padding: 0.75rem 1.25rem; border-radius: 0.75rem; display: flex; align-items: center; gap: 1rem;">
                <span style="font-weight: 800; font-size: 1rem; color: var(--color-secondary); background: rgba(236, 72, 153, 0.08); width: 2rem; height: 2rem; display: flex; align-items: center; justify-content: center; border-radius: 50%;">2</span>
                <div>
                    <strong style="color: var(--foreground);">Datenelement:</strong>
                    <span style="font-size: 0.85rem; color: var(--foreground-muted);"> Liefert die semantische Bedeutung eines Feldes (z. B. Bezeichner auf UIs, F1-Hilfetexte, Typisierung).</span>
                </div>
            </div>
            <div style="background: var(--surface); border: 1px solid var(--border); padding: 0.75rem 1.25rem; border-radius: 0.75rem; display: flex; align-items: center; gap: 1rem;">
                <span style="font-weight: 800; font-size: 1rem; color: var(--color-secondary); background: rgba(236, 72, 153, 0.08); width: 2rem; height: 2rem; display: flex; align-items: center; justify-content: center; border-radius: 50%;">3</span>
                <div>
                    <strong style="color: var(--foreground);">Domäne:</strong>
                    <span style="font-size: 0.85rem; color: var(--foreground-muted);"> Beschreibt die rein technischen Attribute (z. B. Datentyp CHAR, Länge 3, Festwerte oder Prüftabellen).</span>
                </div>
            </div>
        </div>
    </div>

    <!-- 6.2 Section -->
    <div style="margin-top: 3rem; margin-bottom: 3rem;">
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--foreground); margin-bottom: 1.5rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; letter-spacing: -0.025em;">6.2 Abrufen von einzelnen Datenbanksätzen</h2>
        <p style="margin-bottom: 1.5rem;">ABAP-Programme greifen niemals direkt auf die SQL-Datenbank zu. Zwischen Programm und Datenbank ist das <strong>Database Interface (DBI)</strong> geschaltet. Entwickler schreiben standardisierte, plattformunabhängige SQL-Befehle, das sogenannte <strong>Open SQL</strong> (auch ABAP SQL). Das DBI übersetzt dieses Open SQL zur Laufzeit in das native SQL der installierten Datenbank (z.B. SAP HANA, Oracle oder DB2).</p>

        <!-- Search strategies grid -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1.25rem;">Suchstrategien für Datenbanktabellen</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
            <!-- Anwendungsbezogen -->
            <div style="border-radius: 1rem; padding: 1.5rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05);">
                <h4 style="font-size: 1.1rem; color: var(--foreground); font-weight: 700; margin-top: 0; margin-bottom: 0.5rem;">Anwendungsbezogene Suche</h4>
                <p style="font-size: 0.85rem; color: var(--foreground-muted); line-height: 1.5; margin: 0;">Systematische Suche in der Anwendungshierarchie (SAP-Menü, Repository Browser der SE80 oder über die Anwendungskomponenten).</p>
            </div>
            <!-- Programmbezogen -->
            <div style="border-radius: 1rem; padding: 1.5rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05);">
                <h4 style="font-size: 1.1rem; color: var(--foreground); font-weight: 700; margin-top: 0; margin-bottom: 0.5rem;">Programmbezogene Suche</h4>
                <p style="font-size: 0.85rem; color: var(--foreground-muted); line-height: 1.5; margin: 0;">Analyse des Quellcodes ähnlicher Programme. Mithilfe des Debuggers (Eingabe von <code>/h</code> vor Aktionen) können ausgeführte SELECT-Statements direkt zurückverfolgt werden.</p>
            </div>
            <!-- Dynpro-Feldinfo -->
            <div style="border-radius: 1rem; padding: 1.5rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05);">
                <h4 style="font-size: 1.1rem; color: var(--foreground); font-weight: 700; margin-top: 0; margin-bottom: 0.5rem;">F1-Feldinformation</h4>
                <p style="font-size: 0.85rem; color: var(--foreground-muted); line-height: 1.5; margin: 0;">Auswahl des Oberflächenfeldes ➔ Drücken von <strong>F1</strong> ➔ Technische Informationen ➔ Doppelklick auf das Datenelement und Verwendungsnachweis in Tabellenfeldern starten.</p>
            </div>
        </div>

        <!-- SELECT SINGLE -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1rem;">Abrufen eines Einzelsatzes mit SELECT SINGLE</h3>
        <p style="margin-bottom: 1.5rem;">Wenn vorab bekannt ist, dass nur ein einziger Datensatz geladen werden soll (typischerweise beim Lesen über den vollständigen Primärschlüssel), verwendet man <code>SELECT SINGLE</code>. Bei der Zuweisung in Strukturen gibt es zwei Varianten:</p>

        <!-- Two Select Single Variants -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
            <!-- Variante 1 -->
            <div style="border-radius: 1rem; padding: 1.5rem; background: var(--surface); border: 1px solid var(--border); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <h4 style="font-size: 1.1rem; color: var(--foreground); font-weight: 700; margin-top: 0; margin-bottom: 0.5rem;">Gezielte Zuweisung</h4>
                    <p style="font-size: 0.85rem; color: var(--foreground-muted); line-height: 1.5; margin-bottom: 1rem;">Die selektierten Spaltenwerte müssen in ihrer Reihenfolge und ihrem Datentyp exakt mit der Strukturübergabe übereinstimmen.</p>
                </div>
                <div style="background: #0f172a; color: #e2e8f0; padding: 0.75rem; border-radius: 6px; font-family: monospace; font-size: 0.8rem; line-height: 1.4;">
                    <span style="color: var(--color-secondary);">SELECT SINGLE</span> carrid, carrname<br>
                    &nbsp;&nbsp;<span style="color: var(--color-secondary);">FROM</span> scarr<br>
                    &nbsp;&nbsp;<span style="color: var(--color-secondary);">INTO</span> @gs_carrier<br>
                    &nbsp;&nbsp;<span style="color: var(--color-secondary);">WHERE</span> carrid = ''LH''.
                </div>
            </div>

            <!-- Variante 2 -->
            <div style="border-radius: 1rem; padding: 1.5rem; background: var(--surface); border: 1px solid var(--border); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <h4 style="font-size: 1.1rem; color: var(--foreground); font-weight: 700; margin-top: 0; margin-bottom: 0.5rem;">Zuweisung nach Feldname</h4>
                    <p style="font-size: 0.85rem; color: var(--foreground-muted); line-height: 1.5; margin-bottom: 1rem;">Mit der Anweisung <code>INTO CORRESPONDING FIELDS OF</code> ordnet das System die Spaltenwerte unabhängig von ihrer Position rein über identische Feldnamen zu.</p>
                </div>
                <div style="background: #0f172a; color: #e2e8f0; padding: 0.75rem; border-radius: 6px; font-family: monospace; font-size: 0.8rem; line-height: 1.4;">
                    <span style="color: var(--color-secondary);">SELECT SINGLE</span> carrid, carrname<br>
                    &nbsp;&nbsp;<span style="color: var(--color-secondary);">FROM</span> scarr<br>
                    &nbsp;&nbsp;<span style="color: var(--color-secondary);">INTO CORRESPONDING FIELDS OF</span> @gs_carrier<br>
                    &nbsp;&nbsp;<span style="color: var(--color-secondary);">WHERE</span> carrid = ''LH''.
                </div>
            </div>
        </div>
    </div>

    <!-- 6.3 Section -->
    <div style="margin-top: 3rem; margin-bottom: 3rem;">
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--foreground); margin-bottom: 1.5rem; border-left: 4px solid var(--color-success); padding-left: 1rem; letter-spacing: -0.025em;">6.3 Abrufen mehrerer Datenbanksätze</h2>
        <p style="margin-bottom: 1.5rem;">Für das Auslesen größerer Datenmengen stellt Open SQL zwei grundlegend verschiedene Mechanismen bereit:</p>

        <!-- Two Mass Select Methods -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
            <!-- SELECT ... ENDSELECT -->
            <div style="border-radius: 1.25rem; padding: 2rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span style="font-size: 0.75rem; background: rgba(239, 68, 68, 0.08); color: var(--color-danger); border: 1px solid var(--color-danger); padding: 0.25rem 0.75rem; border-radius: 9999px; font-weight: 700; text-transform: uppercase;">Performance-Gefahr ⚠️</span>
                    <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--foreground); margin-top: 1rem; margin-bottom: 0.75rem;">SELECT ... ENDSELECT</h3>
                    <p style="font-size: 0.9rem; color: var(--foreground-muted); line-height: 1.5; margin-bottom: 1rem;">Die Datenbeschaffung erfolgt über eine Schleife. Das System öffnet einen Cursor und lädt die Sätze zeilenweise (oder in winzigen Datenpaketen) in den Applikationsserver.</p>
                    <p style="font-size: 0.85rem; color: var(--color-danger); font-weight: 600; margin-bottom: 1rem;">Nachteil: Hohe Netzwerklast durch unzählige Datenbank-Roundtrips bei großen Datenmengen!</p>
                </div>
                <div style="background: #0f172a; color: #e2e8f0; padding: 0.75rem; border-radius: 8px; font-family: monospace; font-size: 0.8rem; line-height: 1.4;">
                    <span style="color: var(--color-secondary);">SELECT</span> carrid, connid <span style="color: var(--color-secondary);">FROM</span> sflight<br>
                    &nbsp;&nbsp;<span style="color: var(--color-secondary);">INTO</span> @gs_flight <span style="color: var(--color-secondary);">WHERE</span> carrid = ''AA''.<br>
                    &nbsp;&nbsp;<span style="color: #64748b;">" Zeilenweise Verarbeitung</span><br>
                    <span style="color: var(--color-secondary);">ENDSELECT</span>.
                </div>
            </div>

            <!-- SELECT ... INTO TABLE -->
            <div style="border-radius: 1.25rem; padding: 2rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span style="font-size: 0.75rem; background: rgba(16, 185, 129, 0.08); color: var(--color-success); border: 1px solid var(--color-success); padding: 0.25rem 0.75rem; border-radius: 9999px; font-weight: 700; text-transform: uppercase;">Best Practice 💎</span>
                    <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--foreground); margin-top: 1rem; margin-bottom: 0.75rem;">SELECT ... INTO TABLE</h3>
                    <p style="font-size: 0.9rem; color: var(--foreground-muted); line-height: 1.5; margin-bottom: 1rem;">Die Datenbeschaffung erfolgt per <strong>Array Fetch</strong>. Alle qualifizierten Daten werden in einer einzigen Datenbankoperation en bloc direkt in eine interne Tabelle eingelesen.</p>
                    <p style="font-size: 0.85rem; color: var(--color-success); font-weight: 600; margin-bottom: 1rem;">Vorteil: Minimale Netzwerklast und sofortiges Schließen des DB-Cursors.</p>
                </div>
                <div style="background: #0f172a; color: #e2e8f0; padding: 0.75rem; border-radius: 8px; font-family: monospace; font-size: 0.8rem; line-height: 1.4;">
                    <span style="color: var(--color-secondary);">SELECT</span> carrid, connid <span style="color: var(--color-secondary);">FROM</span> sflight<br>
                    &nbsp;&nbsp;<span style="color: var(--color-secondary);">INTO TABLE</span> @gt_flights<br>
                    &nbsp;&nbsp;<span style="color: var(--color-secondary);">WHERE</span> carrid = ''AA''.
                </div>
            </div>
        </div>
    </div>

    <!-- 6.4 Section -->
    <div style="margin-top: 3rem; margin-bottom: 3rem;">
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--foreground); margin-bottom: 1.5rem; border-left: 4px solid var(--color-warning); padding-left: 1rem; letter-spacing: -0.025em;">6.4 Weitere Aspekte des Datenbankzugriffs</h2>
        
        <!-- Grid for additional aspects -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
            <!-- Mandantenabhängigkeit -->
            <div style="border-radius: 1rem; padding: 1.5rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05);">
                <h4 style="font-size: 1.1rem; color: var(--foreground); font-weight: 700; margin-top: 0; margin-bottom: 0.5rem;">🏢 Mandantenabhängigkeit</h4>
                <p style="font-size: 0.85rem; color: var(--foreground-muted); line-height: 1.5; margin-bottom: 0.75rem;">Mandantenabhängige Tabellen besitzen als erstes Primärschlüsselfeld das Feld <code>MANDT</code>. Die Datenbankschnittstelle filtert Open-SQL-Anfragen automatisch auf den aktuellen Anmeldemandanten:</p>
                <div style="background: #0f172a; padding: 0.5rem; border-radius: 6px; font-family: monospace; font-size: 0.75rem; color: #a78bfa; text-align: center;">
                    WHERE mandt = sy-mandt
                </div>
            </div>

            <!-- Datenbankindizes -->
            <div style="border-radius: 1rem; padding: 1.5rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05);">
                <h4 style="font-size: 1.1rem; color: var(--foreground); font-weight: 700; margin-top: 0; margin-bottom: 0.5rem;">⚡ Datenbankindizes</h4>
                <p style="font-size: 0.85rem; color: var(--foreground-muted); line-height: 1.5; margin: 0;">Ein Index beschleunigt Suchanfragen erheblich und vermeidet einen langsamen <strong>Full Table Scan</strong>. Neben dem automatischen <strong>Primärindex</strong> können in SE11 gezielt <strong>Sekundärindizes</strong> für häufig abgefragte Nicht-Schlüsselfelder angelegt werden.</p>
            </div>

            <!-- Joins -->
            <div style="border-radius: 1rem; padding: 1.5rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05);">
                <h4 style="font-size: 1.1rem; color: var(--foreground); font-weight: 700; margin-top: 0; margin-bottom: 0.5rem;">🧩 Tabellen-Joins</h4>
                <p style="font-size: 0.85rem; color: var(--foreground-muted); line-height: 1.5; margin: 0;">Zum gleichzeitigen Lesen verknüpfter Daten aus mehreren Tabellen nutzt man Joins (<strong>Inner Join</strong> oder <strong>Left Outer Join</strong>) anstelle von geschachtelten SELECT-Schleifen. Joins können ad hoc im ABAP-Code geschrieben oder als View im Dictionary angelegt werden.</p>
            </div>
        </div>

        <!-- Buffer Types Table -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1.25rem;">SAP-Tabellenpufferung (Table Buffering)</h3>
        <p style="margin-bottom: 1.5rem;">Um die Datenbankbelastung zu reduzieren, können Tabelleninhalte im Arbeitsspeicher (RAM) des Applikationsservers zwischengespeichert werden. Die Konfiguration erfolgt in der SE11 in den technischen Einstellungen:</p>
        
        <div style="overflow-x: auto; background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1rem; margin-bottom: 3rem;">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
                <thead>
                    <tr style="border-bottom: 2px solid var(--border);">
                        <th style="padding: 0.75rem; color: var(--foreground); font-weight: 700; width: 180px;">Pufferungsart</th>
                        <th style="padding: 0.75rem; color: var(--foreground); font-weight: 700;">Beschreibung & Funktionsweise</th>
                        <th style="padding: 0.75rem; color: var(--foreground); font-weight: 700; width: 200px;">Idealer Einsatzzweck</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom: 1px solid var(--border);">
                        <td style="padding: 0.75rem; color: var(--color-secondary); font-weight: 700;">Keine Pufferung</td>
                        <td style="padding: 0.75rem; color: var(--foreground-muted);">Jede Abfrage geht direkt an den Datenbankserver.</td>
                        <td style="padding: 0.75rem; color: var(--foreground);">Hochdynamische Bewegungsdaten (z.B. Buchungstabellen).</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border);">
                        <td style="padding: 0.75rem; color: var(--color-secondary); font-weight: 700;">Einzelsatzpufferung</td>
                        <td style="padding: 0.75rem; color: var(--foreground-muted);">Nur explizit abgerufene Datensätze werden in den Puffer geladen.</td>
                        <td style="padding: 0.75rem; color: var(--foreground);">Große Tabellen, aus denen meist nur vereinzelte Zeilen gelesen werden.</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.75rem; color: var(--color-secondary); font-weight: 700;">Vollständige Pufferung</td>
                        <td style="padding: 0.75rem; color: var(--foreground-muted);">Beim ersten Lesezugriff wird die gesamte Datenbanktabelle in das RAM geladen.</td>
                        <td style="padding: 0.75rem; color: var(--foreground);">Kleine Tabellen, die sich fast nie ändern (z. B. Ländertabellen, Customizing).</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Write accesses -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1.25rem;">Schreibzugriffe auf die Datenbank</h3>
        <p style="margin-bottom: 1.5rem;">Zur permanenten Datenmanipulation stellt Open SQL vier grundlegende Befehle bereit:</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; margin-bottom: 3rem;">
            <!-- INSERT -->
            <div style="border-radius: 12px; padding: 1.25rem; background: var(--surface); border: 1px solid var(--border);">
                <span style="font-size: 0.85rem; font-family: monospace; font-weight: 700; color: var(--color-success);">INSERT</span>
                <p style="font-size: 0.85rem; color: var(--foreground-muted); margin-top: 0.5rem; margin-bottom: 0;">Fügt neue Zeilen zur Datenbank hinzu. Schlägt mit <code>sy-subrc = 4</code> fehl, falls der Primärschlüssel bereits existiert.</p>
            </div>
            <!-- UPDATE -->
            <div style="border-radius: 12px; padding: 1.25rem; background: var(--surface); border: 1px solid var(--border);">
                <span style="font-size: 0.85rem; font-family: monospace; font-weight: 700; color: var(--color-primary);">UPDATE</span>
                <p style="font-size: 0.85rem; color: var(--foreground-muted); margin-top: 0.5rem; margin-bottom: 0;">Ändert Werte in bereits bestehenden Zeilen auf der Datenbank.</p>
            </div>
            <!-- MODIFY -->
            <div style="border-radius: 12px; padding: 1.25rem; background: var(--surface); border: 1px solid var(--border);">
                <span style="font-size: 0.85rem; font-family: monospace; font-weight: 700; color: var(--color-warning);">MODIFY</span>
                <p style="font-size: 0.85rem; color: var(--foreground-muted); margin-top: 0.5rem; margin-bottom: 0;">Funktioniert als <strong>Upsert</strong>: Existiert der Primärschlüssel noch nicht, wird ein INSERT ausgeführt, andernfalls ein UPDATE.</p>
            </div>
            <!-- DELETE -->
            <div style="border-radius: 12px; padding: 1.25rem; background: var(--surface); border: 1px solid var(--border);">
                <span style="font-size: 0.85rem; font-family: monospace; font-weight: 700; color: var(--color-danger);">DELETE</span>
                <p style="font-size: 0.85rem; color: var(--foreground-muted); margin-top: 0.5rem; margin-bottom: 0;">Löscht Zeilen permanent von der Datenbanktabelle.</p>
            </div>
        </div>
    </div>

    <!-- 6.5 Section -->
    <div style="margin-top: 3rem; margin-bottom: 3rem;">
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--foreground); margin-bottom: 1.5rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; letter-spacing: -0.025em;">6.5 Implementieren von Berechtigungsprüfungen</h2>
        <p style="margin-bottom: 1.5rem;">Das Berechtigungskonzept schützt sensible Geschäftsdaten. Da Datenzugriffe beim reinen SELECT-Befehl nicht automatisch eingeschränkt werden, liegt es in der <strong>Verantwortung des Entwicklers</strong>, explizite Prüfungen mittels <code>AUTHORITY-CHECK</code> in den Code einzubauen:</p>

        <!-- Concepts of Authority Concept -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1.25rem;">Kernbegriffe des Berechtigungskonzepts</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; margin-bottom: 3rem;">
            <!-- Feld -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 1.25rem;">
                <span style="color: var(--color-primary); font-weight: 700; font-size: 0.95rem;">Berechtigungsfeld</span>
                <p style="font-size: 0.85rem; color: var(--foreground-muted); margin-top: 0.5rem; margin-bottom: 0; line-height: 1.4;">Kleinste technische Einheit. Beispiel: <code>CARRID</code> (Fluggesellschaft) oder <code>ACTVT</code> (Aktivität, z.B. 03 = Anzeigen).</p>
            </div>
            <!-- Objekt -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 1.25rem;">
                <span style="color: var(--color-primary); font-weight: 700; font-size: 0.95rem;">Berechtigungsobjekt</span>
                <p style="font-size: 0.85rem; color: var(--foreground-muted); margin-top: 0.5rem; margin-bottom: 0; line-height: 1.4;">Logische Kombination von bis zu 10 Feldern, die fachlich zusammengehören (z. B. <code>S_CARRID</code>).</p>
            </div>
            <!-- Berechtigung -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 1.25rem;">
                <span style="color: var(--color-primary); font-weight: 700; font-size: 0.95rem;">Berechtigung</span>
                <p style="font-size: 0.85rem; color: var(--foreground-muted); margin-top: 0.5rem; margin-bottom: 0; line-height: 1.4;">Eine konkrete Ausprägung von Werten (z. B. <code>CARRID = ''LH''</code> und <code>ACTVT = ''03''</code>).</p>
            </div>
            <!-- Rolle / Profil -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 1.25rem;">
                <span style="color: var(--color-primary); font-weight: 700; font-size: 0.95rem;">Rolle / Profil (PFCG)</span>
                <p style="font-size: 0.85rem; color: var(--foreground-muted); margin-top: 0.5rem; margin-bottom: 0; line-height: 1.4;">Bündelt Berechtigungen und wird dem Benutzer im Stammsatz zugewiesen.</p>
            </div>
        </div>

        <!-- Syntax and subrc evaluation -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1.25rem;">Implementierung mit AUTHORITY-CHECK</h3>
        <div style="background: #0f172a; color: #e2e8f0; padding: 1.25rem; border-radius: 0.75rem; font-family: monospace; font-size: 0.85rem; border-left: 4px solid var(--color-primary); line-height: 1.5; margin-bottom: 1.5rem;">
            <span style="color: var(--color-secondary); font-weight: bold;">AUTHORITY-CHECK OBJECT</span> <span style="color: var(--color-primary);">''S_CARRID''</span><br>
            &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">ID</span> <span style="color: var(--color-primary);">''CARRID''</span> <span style="color: var(--color-secondary); font-weight: bold;">FIELD</span> gs_flight-carrid<br>
            &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">ID</span> <span style="color: var(--color-primary);">''ACTVT''</span>  <span style="color: var(--color-secondary); font-weight: bold;">FIELD</span> <span style="color: var(--color-primary);">''03''</span>. <span style="color: #64748b;">" 03 = Anzeigen</span><br><br>
            <span style="color: var(--color-secondary); font-weight: bold;">IF</span> sy-subrc &lt;&gt; 0.<br>
            &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">MESSAGE</span> <span style="color: var(--color-primary);">''Keine Berechtigung zum Anzeigen dieser Daten!''</span> <span style="color: var(--color-secondary); font-weight: bold;">TYPE</span> <span style="color: var(--color-primary);">''E''</span>.<br>
            &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">EXIT</span>.<br>
            <span style="color: var(--color-secondary); font-weight: bold;">ENDIF</span>.
        </div>

        <h4 style="font-size: 1.05rem; color: var(--foreground); font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.5rem;">Platzierung und Performance-Vorteil</h4>
        <p style="margin-bottom: 1.5rem;">Prüfungen sollten möglichst **früh im Programmablauf** verankert werden (z. B. direkt im Block <code>AT SELECTION-SCREEN</code> oder zu Beginn von <code>START-OF-SELECTION</code>). Dies spart wertvolle Systemressourcen, da unbefugte Programmdurchläufe und zeitintensive Datenbankabfragen sofort unterbunden werden.</p>
    </div>

    <!-- Interactive Quiz Section -->
    <div style="margin-top: 4rem; margin-bottom: 4rem; background: rgba(30, 41, 59, 0.02); border: 1px solid var(--border); padding: 2.5rem; border-radius: 1.5rem;">
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--foreground); margin-bottom: 2rem; text-align: center;">💡 Übungsfragen und Kontrolle</h2>

        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <!-- Q1 -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem;">
                <div style="color: var(--color-secondary); font-weight: 700; font-size: 0.95rem; margin-bottom: 0.5rem;">Frage 1: Was passiert, wenn man das Feld MANDT im SELECT-Statement nicht in der WHERE-Klausel angibt?</div>
                <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.75rem; font-size: 0.85rem; color: var(--foreground);">
                    <strong>Antwort:</strong> Nichts Negatives – im Gegenteil! Die Datenbankschnittstelle filtert Open-SQL-Anfragen standardmäßig und vollautomatisch auf den aktuellen Anmeldemandanten (<code>WHERE mandt = sy-mandt</code>). Das explizite Angeben im Quellcode ist redundant und sollte vermieden werden.
                </div>
            </div>

            <!-- Q2 -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem;">
                <div style="color: var(--color-secondary); font-weight: 700; font-size: 0.95rem; margin-bottom: 0.5rem;">Frage 2: Warum ist SELECT ... INTO TABLE performanter als SELECT ... ENDSELECT?</div>
                <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.75rem; font-size: 0.85rem; color: var(--foreground); line-height: 1.5;">
                    <strong>Antwort:</strong> <code>SELECT ... INTO TABLE</code> nutzt den performanten Array Fetch der Datenbankschnittstelle, um alle Datensätze gesammelt in einer einzigen Datenbankoperation zu laden. <code>SELECT ... ENDSELECT</code> hingegen liest die Datensätze zeilenweise und führt bei größeren Datenmengen zu extrem vielen, langsamen Netzwerk-Roundtrips zur Datenbank.
                </div>
            </div>

            <!-- Q3 -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem;">
                <div style="color: var(--color-secondary); font-weight: 700; font-size: 0.95rem; margin-bottom: 0.5rem;">Frage 3: Wer trägt in ABAP die Verantwortung für die Auswertung und Reaktion auf ein AUTHORITY-CHECK?</div>
                <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.75rem; font-size: 0.85rem; color: var(--foreground);">
                    <strong>Antwort:</strong> Der Entwickler! Das System prüft beim puren Datenbankzugriff keine inhaltlichen Benutzerberechtigungen. Das Programm läuft bei einem fehlgeschlagenen AUTHORITY-CHECK einfach weiter, sofern der Entwickler nicht unmittelbar danach <code>sy-subrc</code> auswertet und den Programmablauf aktiv stoppt oder die Daten filtert.
                </div>
            </div>
        </div>
    </div>

    <!-- Summary Card -->
    <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 10px 30px -15px rgba(0,0,0,0.15);">
        <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--foreground); margin-top: 0; margin-bottom: 1.25rem;">📝 Kurzzusammenfassung</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; font-size: 0.9rem; color: var(--foreground); line-height: 1.6;">
            <div>
                <h4 style="color: var(--color-primary); margin-top: 0; font-weight: 700; margin-bottom: 0.5rem;">Modellierung</h4>
                <ul style="padding-left: 1.1rem; margin: 0;">
                    <li>Relationale Modelle nutzen Primärschlüssel zur Identifikation und Fremdschlüssel für Beziehungen.</li>
                    <li>Das Metadaten-Repository im Dictionary (SE11) modelliert Spalten dreistufig: Tabellenfeld ➔ Datenelement ➔ Domäne.</li>
                </ul>
            </div>
            <div>
                <h4 style="color: var(--color-secondary); margin-top: 0; font-weight: 700; margin-bottom: 0.5rem;">Datenbeschaffung</h4>
                <ul style="padding-left: 1.1rem; margin: 0;">
                    <li>Open SQL wird vom Database Interface (DBI) in herstellerspezifisches Native SQL übersetzt.</li>
                    <li>Datenänderungen auf der DB erfolgen über INSERT, UPDATE, MODIFY (Upsert) und DELETE.</li>
                    <li>AUTHORITY-CHECK muss immer manuell im Quellcode verankert und über das Systemfeld `sy-subrc` ausgewertet werden.</li>
                </ul>
            </div>
        </div>
    </div>
</div>',
    '',
    'article',
    'published',
    50,
    '2026-05-20 11:35:00',
    '2026-05-20 11:35:00'
);
