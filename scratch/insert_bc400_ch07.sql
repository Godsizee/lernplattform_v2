-- SQL INSERT-Befehle für BC400 Kapitel 7
-- Fach: SAP ERP (subjectId: 'sxh3e5ewi0qahenr6jg')
-- Autor: u5ilhtdcn9ycti9tbmc

-- =========================================================================
-- KAPITEL 7: Klassische ABAP-Reports
-- =========================================================================

INSERT INTO lessons (id, subjectId, authorId, title, content, contentRaw, type, status, sortOrder, createdAt, updatedAt)
VALUES (
    'lesson_bc400_ch07',
    'sxh3e5ewi0qahenr6jg',
    'u5ilhtdcn9ycti9tbmc',
    'BC400 - Kapitel 7: Klassische ABAP-Reports',
    '<div style="margin-bottom: 3rem; font-family: system-ui, -apple-system, sans-serif; color: var(--foreground); line-height: 1.6;">
    <!-- Topic Badge -->
    <span style="display: inline-block; padding: 0.35rem 1rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1.5rem; background: rgba(59, 130, 246, 0.08); border: 1px solid var(--color-primary); color: var(--color-primary);">SAP - ABAP (BC400)</span>
    
    <h1 style="font-size: 2.5rem; font-weight: 800; color: var(--foreground); margin-bottom: 1rem; letter-spacing: -0.025em; line-height: 1.2;">Kapitel 7: Klassische ABAP-Reports</h1>
    <p style="font-size: 1.1rem; color: var(--foreground-muted); margin-bottom: 2rem;">Dieses Kapitel behandelt den Aufbau und die Funktionsweise von ausführbaren ABAP-Programmen (klassischen Reports). Ein klassischer Report zeichnet sich aus durch ein automatisch bereitgestelltes Selektionsbild für Benutzereingaben, eine ereignisgesteuerte Ablauflogik und die Ausgabe der Daten in Form einer klassischen ABAP-Liste.</p>

    <!-- 7.1 Section -->
    <div style="margin-top: 3rem; margin-bottom: 3rem;">
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--foreground); margin-bottom: 1.5rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; letter-spacing: -0.025em;">7.1 Implementieren von ABAP-Listen</h2>
        <p style="margin-bottom: 1.5rem;">Klassische ABAP-Listen sind die einfachste Form der Datenausgabe in älteren ABAP-Anwendungen. Sie werden im Hauptspeicher des Applikationsservers aufgebaut und anschließend zeilenweise auf dem Bildschirm des Benutzers ausgegeben.</p>

        <!-- Erzeugung von Listen Grid -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1.25rem;">Erzeugung von Listen (Grundbefehle)</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
            <!-- WRITE -->
            <div style="border-radius: 1.25rem; padding: 1.75rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span style="font-size: 0.725rem; background: rgba(59, 130, 246, 0.08); color: var(--color-primary); border: 1px solid var(--color-primary); padding: 0.2rem 0.6rem; border-radius: 9999px; font-weight: 700; text-transform: uppercase;">WRITE</span>
                    <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--foreground); margin-top: 0.75rem; margin-bottom: 0.5rem;">Datenschreiben</h3>
                    <p style="font-size: 0.85rem; color: var(--foreground-muted); line-height: 1.5; margin-bottom: 1rem;">Gibt Inhalte in die Liste aus. Der Schrägstrich <code>/</code> erzwingt einen Zeilenumbruch vor der Ausgabe.</p>
                </div>
                <div style="background: #0f172a; color: #e2e8f0; padding: 0.75rem; border-radius: 8px; font-family: monospace; font-size: 0.8rem; border-left: 3px solid var(--color-primary);">
                    <span style="color: var(--color-secondary);">WRITE</span>: / ''Text'', gv_val.
                </div>
            </div>

            <!-- ULINE -->
            <div style="border-radius: 1.25rem; padding: 1.75rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span style="font-size: 0.725rem; background: rgba(16, 185, 129, 0.08); color: var(--color-success); border: 1px solid var(--color-success); padding: 0.2rem 0.6rem; border-radius: 9999px; font-weight: 700; text-transform: uppercase;">ULINE</span>
                    <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--foreground); margin-top: 0.75rem; margin-bottom: 0.5rem;">Trennlinien erzeugen</h3>
                    <p style="font-size: 0.85rem; color: var(--foreground-muted); line-height: 1.5; margin-bottom: 1rem;">Zieht eine horizontale Trennlinie (Unterstreichung) über die gesamte Breite der aktuellen Listenzeile.</p>
                </div>
                <div style="background: #0f172a; color: #e2e8f0; padding: 0.75rem; border-radius: 8px; font-family: monospace; font-size: 0.8rem; border-left: 3px solid var(--color-success);">
                    <span style="color: var(--color-secondary);">ULINE</span>.
                </div>
            </div>

            <!-- SKIP -->
            <div style="border-radius: 1.25rem; padding: 1.75rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span style="font-size: 0.725rem; background: rgba(236, 72, 153, 0.08); color: var(--color-secondary); border: 1px solid var(--color-secondary); padding: 0.2rem 0.6rem; border-radius: 9999px; font-weight: 700; text-transform: uppercase;">SKIP</span>
                    <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--foreground); margin-top: 0.75rem; margin-bottom: 0.5rem;">Leerzeilen einfügen</h3>
                    <p style="font-size: 0.85rem; color: var(--foreground-muted); line-height: 1.5; margin-bottom: 1rem;">Erzeugt eine oder mehrere Leerzeilen in der Ausgabe, um die Lesbarkeit des Reports zu erhöhen.</p>
                </div>
                <div style="background: #0f172a; color: #e2e8f0; padding: 0.75rem; border-radius: 8px; font-family: monospace; font-size: 0.8rem; border-left: 3px solid var(--color-secondary);">
                    <span style="color: var(--color-secondary);">SKIP</span>. <span style="color: #64748b;">" Überspringt 1 Zeile</span>
                </div>
            </div>
        </div>

        <!-- Standard-Listenfunktionen Info Box -->
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem; margin-bottom: 3rem;">
            <h4 style="margin-top: 0; font-size: 1.1rem; color: var(--foreground); font-weight: 700; margin-bottom: 0.75rem;">⚙️ Standard-Listenfunktionen (System-Status)</h4>
            <p style="font-size: 0.9rem; color: var(--foreground-muted); margin-bottom: 1rem; line-height: 1.5;">Jede klassische ABAP-Liste verfügt automatisch über ein vom SAP-System bereitgestelltes Standard-Menü (System-Status). Ohne zusätzlichen Programmieraufwand stehen dem Endbenutzer typische Listenfunktionen zur Verfügung:</p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; font-size: 0.85rem; color: var(--foreground); font-weight: 600;">
                <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border); padding: 0.75rem; border-radius: 8px; display: flex; align-items: center; gap: 0.5rem;">🔍 Suchen & Finden</div>
                <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border); padding: 0.75rem; border-radius: 8px; display: flex; align-items: center; gap: 0.5rem;">🖨️ Drucken der Liste</div>
                <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border); padding: 0.75rem; border-radius: 8px; display: flex; align-items: center; gap: 0.5rem;">💾 Lokales Speichern</div>
                <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border); padding: 0.75rem; border-radius: 8px; display: flex; align-items: center; gap: 0.5rem;">📊 Excel-Export</div>
            </div>
        </div>

        <!-- 2. Listen- und Spaltenüberschriften -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1rem;">Listen- und Spaltenüberschriften</h3>
        <p style="margin-bottom: 1rem;">Damit eine Liste professionell aussieht, benötigt sie aussagekräftige Überschriften. In ABAP gilt die Best Practice, **sprachabhängige Texte strikt vom Quellcode zu trennen** (nicht hartcodieren). Hierzu wird der sogenannte <strong>Text-Pool</strong> verwendet:</p>

        <!-- Text-Pool Card -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 3rem; min-width: 0;">
            <div style="border-radius: 1rem; padding: 1.5rem; background: var(--surface); border: 1px solid var(--border); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <h4 style="font-size: 1.1rem; color: var(--foreground); font-weight: 700; margin-top: 0; margin-bottom: 0.5rem;">Der Text-Pool (SE32)</h4>
                    <p style="font-size: 0.85rem; color: var(--foreground-muted); line-height: 1.5; margin-bottom: 1rem;">Alle Überschriften und Textelemente werden im Text-Pool des Programms gepflegt (Transaktion <strong>SE32</strong> oder im Menü über <em>Springen → Textelemente</em>). Dies ermöglicht die problemlose Übersetzung in andere Sprachen.</p>
                </div>
            </div>

            <div style="border-radius: 1rem; padding: 1.5rem; background: var(--surface); border: 1px solid var(--border); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <h4 style="font-size: 1.1rem; color: var(--foreground); font-weight: 700; margin-top: 0; margin-bottom: 0.5rem;">Zwei Typen von Überschriften</h4>
                    <ul style="font-size: 0.85rem; color: var(--foreground-muted); line-height: 1.5; padding-left: 1.1rem; margin: 0;">
                        <li><strong>Listenüberschrift:</strong> Der Titel des gesamten Reports, der als Kopfzeile angezeigt wird.</li>
                        <li><strong>Spaltenüberschriften:</strong> Beschriftungen für einzelne Tabellenspalten, die am Anfang jeder neuen Seite automatisch ausgegeben werden.</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- 7.2 Section -->
    <div style="margin-top: 3rem; margin-bottom: 3rem;">
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--foreground); margin-bottom: 1.5rem; border-left: 4px solid var(--color-success); padding-left: 1rem; letter-spacing: -0.025em;">7.2 Implementieren von Selektionsbildern</h2>
        <p style="margin-bottom: 1.5rem;">Ein Selektionsbild dient als Benutzerschnittstelle vor dem Start der eigentlichen Datenverarbeitung. Standardmäßig wird hierfür das System-Dynpro mit der Nummer <strong>1000</strong> verwendet.</p>

        <!-- Hauptaufgaben Grid -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1.25rem;">Hauptaufgaben von Selektionsbildern</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
            <!-- Datenfilterung -->
            <div style="border-radius: 1rem; padding: 1.5rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05);">
                <span style="font-size: 1.5rem; display: block; margin-bottom: 0.5rem;">🔍</span>
                <h4 style="color: var(--foreground); font-weight: 700; font-size: 1.1rem; margin-top: 0; margin-bottom: 0.5rem;">Datenfilterung (Eingrenzung)</h4>
                <p style="font-size: 0.85rem; color: var(--foreground-muted); margin: 0; line-height: 1.5;">Durch gezielte Benutzereingaben wird die von der Datenbank gelesene Datenmenge reduziert. Das senkt die Systemlast, verkürzt die Programmlaufzeit und schont Netzwerkressourcen.</p>
            </div>

            <!-- Steuerung -->
            <div style="border-radius: 1rem; padding: 1.5rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05);">
                <span style="font-size: 1.5rem; display: block; margin-bottom: 0.5rem;">⚙️</span>
                <h4 style="color: var(--foreground); font-weight: 700; font-size: 1.1rem; margin-top: 0; margin-bottom: 0.5rem;">Steuerung des Programmablaufs</h4>
                <p style="font-size: 0.85rem; color: var(--foreground-muted); margin: 0; line-height: 1.5;">Übergeben von Kontrollparametern, die steuern, in welcher Form die Ausgabe erfolgt, welche Subroutinen aufgerufen werden oder ob Testläufe stattfinden sollen.</p>
            </div>
        </div>

        <!-- Eigenschaften & Vererbung -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1rem;">Eigenschaften und Dictionary-Vererbung</h3>
        <p style="margin-bottom: 1.5rem;">Selektionsbilder werden **automatisch anhand der ABAP-Deklarationsbefehle generiert**. Ein grafischer UI-Designer ist nicht erforderlich. Verweisen die Felder auf globale Typen (z. B. Spalten transparenter Tabellen im Dictionary), so vererben sie automatisch wertvolle Metadaten:</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem; margin-bottom: 3rem;">
            <div style="background: var(--surface); border: 1px solid var(--border); padding: 1.25rem; border-radius: 0.75rem;">
                <strong style="color: var(--color-primary); display: block; margin-bottom: 0.25rem;">ℹ️ F1-Hilfe</strong>
                <span style="font-size: 0.85rem; color: var(--foreground-muted);">Der erklärende Hilfetext des zugrundeliegenden Datenelements wird dem Benutzer bei Tastendruck (F1) angezeigt.</span>
            </div>
            <div style="background: var(--surface); border: 1px solid var(--border); padding: 1.25rem; border-radius: 0.75rem;">
                <strong style="color: var(--color-success); display: block; margin-bottom: 0.25rem;">⚡ F4-Suchhilfe (Wertehilfe)</strong>
                <span style="font-size: 0.85rem; color: var(--foreground-muted);">Generiert automatisch Suchmasken, Kalendereingaben oder Drop-downs basierend auf den Dictionary-Definitionen.</span>
            </div>
            <div style="background: var(--surface); border: 1px solid var(--border); padding: 1.25rem; border-radius: 0.75rem;">
                <strong style="color: var(--color-warning); display: block; margin-bottom: 0.25rem;">🎯 Typprüfung</strong>
                <span style="font-size: 0.85rem; color: var(--foreground-muted);">Die Laufzeitumgebung validiert Eingaben automatisch (z. B. ob ein eingetragenes Datum ein physisch gültiges Kalenderdatum ist).</span>
            </div>
        </div>

        <!-- PARAMETERS Anweisung -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1rem;">Die PARAMETERS-Anweisung (Einzelwert)</h3>
        <p style="margin-bottom: 1rem;">Mit <code>PARAMETERS</code> wird ein einfaches Eingabefeld für genau eine Variable deklariert (Einzelwerteingabe):</p>
        <div style="background: #0f172a; color: #e2e8f0; padding: 1.25rem; border-radius: 0.75rem; font-family: monospace; font-size: 0.85rem; border-left: 4px solid var(--color-primary); line-height: 1.5; margin-bottom: 1.5rem;">
            <span style="color: var(--color-secondary); font-weight: bold;">PARAMETERS</span> pa_carr <span style="color: var(--color-secondary); font-weight: bold;">TYPE</span> scarr-carrid <span style="color: var(--color-secondary); font-weight: bold;">DEFAULT</span> ''LH'' <span style="color: var(--color-secondary); font-weight: bold;">OBLIGATORY</span>.
        </div>
        <!-- Zusätze detail -->
        <div style="display: flex; gap: 1.5rem; font-size: 0.9rem; margin-bottom: 3rem; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 250px; background: rgba(255,255,255,0.02); border: 1px solid var(--border); padding: 1rem; border-radius: 8px;">
                <strong><code>DEFAULT</code>-Zusatz:</strong> Belegt das Eingabefeld beim Start des Reports mit einem Standardwert vor.
            </div>
            <div style="flex: 1; min-width: 250px; background: rgba(255,255,255,0.02); border: 1px solid var(--border); padding: 1rem; border-radius: 8px;">
                <strong><code>OBLIGATORY</code>-Zusatz:</strong> Kennzeichnet das Feld als Pflichtfeld (roter Haken). Ein Starten des Reports ohne Angabe blockiert das System.
            </div>
        </div>

        <!-- SELECT-OPTIONS Anweisung -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1rem;">Die SELECT-OPTIONS-Anweisung (Abgrenzungstabelle)</h3>
        <p style="margin-bottom: 1rem;">Mit <code>SELECT-OPTIONS</code> wird eine komplexe Abgrenzungstabelle generiert. Sie stellt dem Benutzer zwei Eingabefelder ("Von" und "Bis") sowie eine Drucktaste für komplexe Mehrfachauswahlen zur Verfügung:</p>
        
        <div style="background: #0f172a; color: #e2e8f0; padding: 1.25rem; border-radius: 0.75rem; font-family: monospace; font-size: 0.85rem; border-left: 4px solid var(--color-warning); line-height: 1.5; margin-bottom: 1.5rem;">
            <span style="color: var(--color-secondary); font-weight: bold;">DATA</span> gv_connid <span style="color: var(--color-secondary); font-weight: bold;">TYPE</span> sflight-connid.<br>
            <span style="color: var(--color-secondary); font-weight: bold;">SELECT-OPTIONS</span> so_conn <span style="color: var(--color-secondary); font-weight: bold;">FOR</span> gv_connid.
        </div>
        
        <div style="background: rgba(245, 158, 11, 0.05); border-left: 4px solid var(--color-warning); border-radius: 0 1rem 1rem 0; padding: 1.25rem; margin-bottom: 2rem; font-size: 0.9rem;">
            <strong>💡 Wichtiger Hinweis:</strong> <code>SELECT-OPTIONS</code> benötigt immer eine zuvor mittels <code>DATA</code> deklarierte Hilfsvariable, auf die im Zusatz <code>FOR</code> verwiesen wird.
        </div>

        <!-- Selektionstabelle Struktur -->
        <h4 style="font-size: 1.1rem; color: var(--foreground); font-weight: 700; margin-bottom: 0.75rem;">Struktur der Selektionstabelle (Selektionstabelle im RAM)</h4>
        <p style="font-size: 0.9rem; color: var(--foreground-muted); margin-bottom: 1.5rem;">Im Hintergrund legt die ABAP-Laufzeitumgebung eine interne Tabelle mit Kopfzeile an. Diese besitzt exakt vier Komponenten, welche die Abfragekriterien definieren:</p>
        
        <div style="overflow-x: auto; background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1rem; margin-bottom: 2.5rem;">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.85rem;">
                <thead>
                    <tr style="border-bottom: 2px solid var(--border);">
                        <th style="padding: 0.75rem; color: var(--foreground); font-weight: 700; width: 100px;">Feld</th>
                        <th style="padding: 0.75rem; color: var(--foreground); font-weight: 700; width: 100px;">Datentyp</th>
                        <th style="padding: 0.75rem; color: var(--foreground); font-weight: 700;">Bedeutung und erlaubte Werte</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom: 1px solid var(--border);">
                        <td style="padding: 0.75rem; color: var(--color-primary); font-family: monospace; font-weight: 600;">SIGN</td>
                        <td style="padding: 0.75rem; font-family: monospace; color: var(--foreground-muted);">C (1)</td>
                        <td style="padding: 0.75rem; color: var(--foreground);">Bestimmt Einschluss/Ausschluss. <br><strong>I</strong> = Include (Einschließen), <strong>E</strong> = Exclude (Ausschließen).</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border);">
                        <td style="padding: 0.75rem; color: var(--color-primary); font-family: monospace; font-weight: 600;">OPTION</td>
                        <td style="padding: 0.75rem; font-family: monospace; color: var(--foreground-muted);">C (2)</td>
                        <td style="padding: 0.75rem; color: var(--foreground);">Logischer Vergleichsoperator. <br><strong>EQ</strong> (gleich), <strong>BT</strong> (Between/Dazwischen), <strong>GE</strong> (größer gleich), <strong>CP</strong> (Mustervergleich).</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border);">
                        <td style="padding: 0.75rem; color: var(--color-primary); font-family: monospace; font-weight: 600;">LOW</td>
                        <td style="padding: 0.75rem; font-family: monospace; color: var(--foreground-muted);">wie FOR-Feld</td>
                        <td style="padding: 0.75rem; color: var(--foreground);">Der untere Grenzwert der Abfrage (bzw. der exakte Einzelwert bei OPTION = EQ).</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.75rem; color: var(--color-primary); font-family: monospace; font-weight: 600;">HIGH</td>
                        <td style="padding: 0.75rem; font-family: monospace; color: var(--foreground-muted);">wie FOR-Feld</td>
                        <td style="padding: 0.75rem; color: var(--foreground);">Der obere Grenzwert (nur belegt bei Intervallsuche, z. B. OPTION = BT).</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h4 style="font-size: 1.1rem; color: var(--foreground); font-weight: 700; margin-bottom: 0.75rem;">Verwendung in der WHERE-Klausel</h4>
        <p style="margin-bottom: 1rem;">Die Selektionstabelle kann im Open-SQL SELECT direkt über den Operator <code>IN</code> abgefragt werden. Das DBI übersetzt dies zur Laufzeit automatisch in ein passendes SQL-Statement:</p>
        <div style="background: #0f172a; color: #e2e8f0; padding: 1.25rem; border-radius: 0.75rem; font-family: monospace; font-size: 0.85rem; border-left: 4px solid var(--color-success); line-height: 1.5; margin-bottom: 3rem;">
            <span style="color: var(--color-secondary); font-weight: bold;">SELECT</span> * <span style="color: var(--color-secondary); font-weight: bold;">FROM</span> sflight <span style="color: var(--color-secondary); font-weight: bold;">INTO TABLE</span> @gt_flights<br>
            &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">WHERE</span> connid <span style="color: var(--color-secondary); font-weight: bold;">IN</span> @so_conn.
        </div>
    </div>

    <!-- 7.3 Section -->
    <div style="margin-top: 3rem; margin-bottom: 3rem;">
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--foreground); margin-bottom: 1.5rem; border-left: 4px solid var(--color-warning); padding-left: 1rem; letter-spacing: -0.025em;">7.3 Ereignissteuerung in ABAP-Reports</h2>
        <p style="margin-bottom: 1.5rem;">Ein ausführbarer ABAP-Report läuft nicht linear von oben nach unten ab. Das Programm ist **ereignisgesteuert**. Die Ablaufkontrolle liegt bei der ABAP-Laufzeitumgebung, welche zu festgelegten Zeitpunkten (Triggern) vordefinierte Ereignisblöcke im Code ausführt.</p>

        <!-- Timeline / Chronologischer Ablauf -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 2rem; text-align: center;">Chronologischer Lebenszyklus eines Reports</h3>
        
        <div style="position: relative; max-width: 800px; margin: 0 auto 4rem auto; padding-left: 2rem; border-left: 3px dashed var(--border);">
            <!-- Event 1 -->
            <div style="position: relative; margin-bottom: 2rem;">
                <div style="position: absolute; left: -2.6rem; top: 0.15rem; width: 1.1rem; height: 1.1rem; border-radius: 50%; background: var(--color-primary); border: 3px solid var(--surface);"></div>
                <strong style="font-size: 1.1rem; color: var(--color-primary);">1. LOAD-OF-PROGRAM</strong>
                <p style="font-size: 0.85rem; color: var(--foreground-muted); margin: 0.25rem 0 0 0;">Wird exakt einmal aufgerufen, wenn das Programm in den internen Speicher geladen wird. Dient der Initialisierung des globalen Kontexts.</p>
            </div>
            
            <!-- Event 2 -->
            <div style="position: relative; margin-bottom: 2rem;">
                <div style="position: absolute; left: -2.6rem; top: 0.15rem; width: 1.1rem; height: 1.1rem; border-radius: 50%; background: var(--color-secondary); border: 3px solid var(--surface);"></div>
                <strong style="font-size: 1.1rem; color: var(--color-secondary);">2. INITIALIZATION</strong>
                <p style="font-size: 0.85rem; color: var(--foreground-muted); margin: 0.25rem 0 0 0;">Ausgeführt vor der ersten Anzeige des Selektionsbildes. Ideal, um Selektionsfelder mit dynamischen Standardwerten (z. B. dem heutigen Datum) zu belegen.</p>
            </div>
            
            <!-- Step 3 (Interaktiv) -->
            <div style="position: relative; margin-bottom: 2rem; opacity: 0.8;">
                <div style="position: absolute; left: -2.6rem; top: 0.15rem; width: 1.1rem; height: 1.1rem; border-radius: 50%; background: var(--foreground-muted); border: 3px solid var(--surface);"></div>
                <strong style="font-size: 1rem; color: var(--foreground);">[Selektionsbild anzeigen]</strong>
                <p style="font-size: 0.85rem; color: var(--foreground-muted); margin: 0.25rem 0 0 0;">Die Laufzeitumgebung rendert das Selektionsbild Dynpro 1000 und wartet auf Benutzereingaben.</p>
            </div>

            <!-- Event 4 -->
            <div style="position: relative; margin-bottom: 2rem;">
                <div style="position: absolute; left: -2.6rem; top: 0.15rem; width: 1.1rem; height: 1.1rem; border-radius: 50%; background: var(--color-success); border: 3px solid var(--surface);"></div>
                <strong style="font-size: 1.1rem; color: var(--color-success);">3. AT SELECTION-SCREEN</strong>
                <p style="font-size: 0.85rem; color: var(--foreground-muted); margin: 0.25rem 0 0 0;">Wird bei Benutzerinteraktionen auf dem Selektionsbild (z. B. Drücken von Enter oder Ausführen) getriggert. Dient der Eingabevalidierung, Existenzprüfung und Berechtigungsprüfung.</p>
            </div>

            <!-- Event 5 -->
            <div style="position: relative; margin-bottom: 2rem;">
                <div style="position: absolute; left: -2.6rem; top: 0.15rem; width: 1.1rem; height: 1.1rem; border-radius: 50%; background: var(--color-warning); border: 3px solid var(--surface);"></div>
                <strong style="font-size: 1.1rem; color: var(--color-warning);">4. START-OF-SELECTION</strong>
                <p style="font-size: 0.85rem; color: var(--foreground-muted); margin: 0.25rem 0 0 0;">Der Hauptverarbeitungsblock. Triggert nach Klick auf "Ausführen" (F8), sofern das Selektionsbild fehlerfrei war. Hier liegen Datenbank-Queries (SELECT) und Kern-Businesslogik.</p>
            </div>

            <!-- Event 6 -->
            <div style="position: relative; margin-bottom: 2rem;">
                <div style="position: absolute; left: -2.6rem; top: 0.15rem; width: 1.1rem; height: 1.1rem; border-radius: 50%; background: var(--color-danger); border: 3px solid var(--surface);"></div>
                <strong style="font-size: 1.1rem; color: var(--color-danger);">5. END-OF-SELECTION (Optional)</strong>
                <p style="font-size: 0.85rem; color: var(--foreground-muted); margin: 0.25rem 0 0 0;">Ausgeführt nach dem Hauptverarbeitungsblock, unmittelbar vor der physikalischen Ausgaben-Listengenerierung. Dient für abschließende Summierungen oder Aufbereitungen.</p>
            </div>

            <!-- Step 7 (Interaktiv) -->
            <div style="position: relative; opacity: 0.8;">
                <div style="position: absolute; left: -2.6rem; top: 0.15rem; width: 1.1rem; height: 1.1rem; border-radius: 50%; background: var(--foreground-muted); border: 3px solid var(--surface);"></div>
                <strong style="font-size: 1rem; color: var(--foreground);">[Klassische ABAP-Liste ausgeben]</strong>
                <p style="font-size: 0.85rem; color: var(--foreground-muted); margin: 0.25rem 0 0 0;">Das System stellt die gesammelten WRITE-Pufferinhalte als klassische Liste dar.</p>
            </div>
        </div>

        <!-- Eigenschaften von Ereignisblöcken Info Grid -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1.25rem;">Eigenschaften von Ereignisblöcken</h3>
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; margin-bottom: 3rem;">
            <ul style="padding-left: 1.25rem; margin: 0; font-size: 0.95rem; color: var(--foreground); line-height: 1.7;">
                <li><strong>Beginn und Ende:</strong> Ein Block startet mit dem Ereignisschlüsselwort (z. B. <code>INITIALIZATION.</code>) und endet implizit beim nächsten Schlüsselwort.</li>
                <li><strong>Verschachtelungsverbot:</strong> Ereignisblöcke können **nicht** ineinander verschachtelt werden.</li>
                <li><strong>Reihenfolge im Quellcode:</strong> Die Reihenfolge im ABAP-Editor ist vollkommen irrelevant. Die ABAP-Laufzeitumgebung ruft die Blöcke immer in der oben dargestellten chronologischen Reihenfolge auf!</li>
                <li><strong>Standard-Block:</strong> Deklariert man Code am Programmanfang ohne Ereignisschlüsselwort, wird dieser automatisch dem Standardblock <code>START-OF-SELECTION</code> zugeschrieben.</li>
            </ul>
        </div>

        <!-- Fehlerbehandlung im Selektionsbild -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1rem;">Fehlerbehandlung im Ereignis AT SELECTION-SCREEN</h3>
        <p style="margin-bottom: 1.5rem;">Tritt im Ereignis <code>AT SELECTION-SCREEN</code> ein Fehler auf (z. B. ungültige Eingabe oder fehlende Berechtigung), gibt man eine Meldung vom Typ <strong>E</strong> (Error) aus. Die ABAP-Laufzeitumgebung reagiert darauf mit einem exzellenten Sicherheitsmechanismus:</p>
        
        <!-- Error alert box -->
        <div style="background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: 1rem; padding: 1.5rem; margin-bottom: 3rem; display: flex; align-items: flex-start; gap: 1rem;">
            <span style="font-size: 1.5rem;">⚠️</span>
            <div>
                <strong style="color: var(--color-danger); font-size: 1.05rem;">Vorteil der Typ E Meldung bei AT SELECTION-SCREEN</strong>
                <p style="font-size: 0.9rem; color: var(--foreground); margin-top: 0.25rem; margin-bottom: 0; line-height: 1.6;">
                    Das System bricht die Ausführung ab und schickt den Benutzer zurück auf das Selektionsbild. Das Selektionsbild bleibt jedoch **vollständig eingabebereit** und wird nicht gesperrt. Der Benutzer kann seine fehlerhaften Parameter sofort korrigieren und den Report erneut starten.
                </p>
            </div>
        </div>

        <!-- Syntaxbeispiel: Berechtigungsprüfung mit Fehlerdialog -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1rem;">Komplettes Syntaxbeispiel: Report mit Berechtigungs- und Eingabeprüfung</h3>
        <p style="margin-bottom: 1.5rem;">Der folgende Code zeigt den typischen und prüfungsrelevanten Aufbau eines sicheren, ereignisgesteuerten ABAP-Reports:</p>

        <!-- Elegant code block container -->
        <div style="border-radius: 1rem; overflow: hidden; border: 1px solid var(--border); box-shadow: 0 10px 30px -15px rgba(0,0,0,0.3); margin-bottom: 3rem;">
            <div style="background: #1e293b; padding: 0.75rem 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: space-between;">
                <span style="font-family: monospace; font-size: 0.8rem; font-weight: 700; color: #94a3b8;">Z_FLUG_REPORT.ABAP</span>
                <span style="font-size: 0.75rem; background: rgba(59, 130, 246, 0.2); color: #60a5fa; padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 600;">ABAP Source</span>
            </div>
            <div style="background: #0f172a; padding: 1.5rem; font-family: monospace; font-size: 0.85rem; line-height: 1.6; overflow-x: auto; color: #e2e8f0;">
                <span style="color: var(--color-secondary); font-weight: bold;">REPORT</span> z_flug_report.<br><br>
                
                <span style="color: #64748b;">" =========================================================================</span><br>
                <span style="color: #64748b;">" 1. DEKLARATION DES SELEKTIONSBILDES</span><br>
                <span style="color: #64748b;">" =========================================================================</span><br>
                <span style="color: var(--color-secondary); font-weight: bold;">PARAMETERS</span> pa_carr <span style="color: var(--color-secondary); font-weight: bold;">TYPE</span> sflight-carrid <span style="color: var(--color-secondary); font-weight: bold;">OBLIGATORY</span>.<br><br>
                
                <span style="color: #64748b;">" =========================================================================</span><br>
                <span style="color: #64748b;">" 2. INITIALISIERUNG (VORBELEGUNG)</span><br>
                <span style="color: #64748b;">" =========================================================================</span><br>
                <span style="color: var(--color-secondary); font-weight: bold;">INITIALIZATION</span>.<br>
                &nbsp;&nbsp;pa_carr = ''LH''. <span style="color: #64748b;">" Standardwert setzen</span><br><br>
                
                <span style="color: #64748b;">" =========================================================================</span><br>
                <span style="color: #64748b;">" 3. EINGABEPRÜFUNG & BERECHTIGUNGSPRÜFUNG</span><br>
                <span style="color: #64748b;">" =========================================================================</span><br>
                <span style="color: var(--color-secondary); font-weight: bold;">AT SELECTION-SCREEN</span>.<br>
                &nbsp;&nbsp;<span style="color: #64748b;">" Existenzprüfung: Existiert die Fluggesellschaft in SCARR?</span><br>
                &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">SELECT SINGLE</span> carrid <span style="color: var(--color-secondary); font-weight: bold;">FROM</span> scarr<br>
                &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">INTO</span> @<span style="color: var(--color-secondary); font-weight: bold;">DATA</span>(lv_dummy)<br>
                &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">WHERE</span> carrid = @pa_carr.<br><br>
                
                &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">IF</span> sy-subrc &lt;&gt; 0.<br>
                &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">MESSAGE</span> ''Die eingegebene Fluggesellschaft existiert nicht!'' <span style="color: var(--color-secondary); font-weight: bold;">TYPE</span> ''E''.<br>
                &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">ENDIF</span>.<br><br>
                
                &nbsp;&nbsp;<span style="color: #64748b;">" Berechtigungsprüfung</span><br>
                &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">AUTHORITY-CHECK OBJECT</span> ''S_CARRID''<br>
                &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">ID</span> ''CARRID'' <span style="color: var(--color-secondary); font-weight: bold;">FIELD</span> pa_carr<br>
                &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">ID</span> ''ACTVT''  <span style="color: var(--color-secondary); font-weight: bold;">FIELD</span> ''03''. <span style="color: #64748b;">" 03 = Anzeigen</span><br><br>
                
                &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">IF</span> sy-subrc &lt;&gt; 0.<br>
                &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">MESSAGE</span> ''Keine Berechtigung für diese Fluggesellschaft!'' <span style="color: var(--color-secondary); font-weight: bold;">TYPE</span> ''E''.<br>
                &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">ENDIF</span>.<br><br>
                
                <span style="color: #64748b;">" =========================================================================</span><br>
                <span style="color: #64748b;">" 4. HAUPTVERARBEITUNG</span><br>
                <span style="color: #64748b;">" =========================================================================</span><br>
                <span style="color: var(--color-secondary); font-weight: bold;">START-OF-SELECTION</span>.<br>
                &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">DATA</span> gt_sflight <span style="color: var(--color-secondary); font-weight: bold;">TYPE STANDARD TABLE OF</span> sflight.<br><br>
                
                &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">SELECT</span> * <span style="color: var(--color-secondary); font-weight: bold;">FROM</span> sflight <span style="color: var(--color-secondary); font-weight: bold;">INTO TABLE</span> @gt_sflight<br>
                &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">WHERE</span> carrid = @pa_carr.<br><br>
                
                &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">LOOP AT</span> gt_sflight <span style="color: var(--color-secondary); font-weight: bold;">INTO DATA</span>(gs_flight).<br>
                &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">WRITE</span>: / gs_flight-carrid,<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;gs_flight-connid,<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;gs_flight-fldate,<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;gs_flight-price.<br>
                &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">ENDLOOP</span>.
            </div>
        </div>
    </div>

    <!-- Interactive Quiz Section -->
    <div style="margin-top: 4rem; margin-bottom: 4rem; background: rgba(30, 41, 59, 0.02); border: 1px solid var(--border); padding: 2.5rem; border-radius: 1.5rem;">
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--foreground); margin-bottom: 2rem; text-align: center;">💡 Übungsfragen und Kontrolle</h2>

        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <!-- Q1 -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem;">
                <div style="color: var(--color-secondary); font-weight: 700; font-size: 0.95rem; margin-bottom: 0.5rem;">Frage 1: Warum werden Listen- und Spaltenüberschriften im Text-Pool gepflegt statt hartcodiert im Quellcode?</div>
                <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.75rem; font-size: 0.85rem; color: var(--foreground); line-height: 1.5;">
                    <strong>Antwort:</strong> Durch die Pflege im Text-Pool (Transaktion <strong>SE32</strong>) werden Texte sprachabhängig verwaltet. Dies ermöglicht eine spätere unkomplizierte Übersetzung in andere Sprachen, was für multinationale SAP-Systeme zwingend notwendig ist. Hartcodierte Texte können nicht übersetzt werden.
                </div>
            </div>

            <!-- Q2 -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem;">
                <div style="color: var(--color-secondary); font-weight: 700; font-size: 0.95rem; margin-bottom: 0.5rem;">Frage 2: Welche Komponenten enthält eine Selektionstabelle (SELECT-OPTIONS) im Hintergrund?</div>
                <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.75rem; font-size: 0.85rem; color: var(--foreground); line-height: 1.5;">
                    <strong>Antwort:</strong> Im Hintergrund wird eine interne Tabelle mit exakt vier Spalten generiert:
                    <ul style="margin: 0.5rem 0 0 0; padding-left: 1.25rem;">
                        <li><code>SIGN</code> (Einschluss/Ausschluss: I oder E)</li>
                        <li><code>OPTION</code> (Vergleichsoperator: EQ, BT, GE, CP, etc.)</li>
                        <li><code>LOW</code> (Unterer Grenzwert oder Einzelwert)</li>
                        <li><code>HIGH</code> (Oberer Grenzwert für Intervallabfragen)</li>
                    </ul>
                </div>
            </div>

            <!-- Q3 -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem;">
                <div style="color: var(--color-secondary); font-weight: 700; font-size: 0.95rem; margin-bottom: 0.5rem;">Frage 3: Warum spielt die Reihenfolge der Ereignisblöcke im ABAP-Quellcode keine Rolle für die Ausführung?</div>
                <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.75rem; font-size: 0.85rem; color: var(--foreground); line-height: 1.5;">
                    <strong>Antwort:</strong> Die Ausführung eines ausführbaren Programms (Reports) ist ereignisgesteuert. Nicht der Quellcode-Ablauf, sondern das ABAP-Laufzeit-Framework steuert das Programm und ruft die Blöcke in einer fest vorgegebenen chronologischen Reihenfolge (LOAD-OF-PROGRAM ➔ INITIALIZATION ➔ AT SELECTION-SCREEN ➔ START-OF-SELECTION ➔ END-OF-SELECTION) auf.
                </div>
            </div>

            <!-- Q4 -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem;">
                <div style="color: var(--color-secondary); font-weight: 700; font-size: 0.95rem; margin-bottom: 0.5rem;">Frage 4: Welcher Vorteil ergibt sich bei einer Fehlermeldung vom Typ E im Ereignis AT SELECTION-SCREEN?</div>
                <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.75rem; font-size: 0.85rem; color: var(--foreground); line-height: 1.5;">
                    <strong>Antwort:</strong> Das System bricht den Ablauf ab und zeigt die Fehlermeldung in der Statuszeile an. Im Gegensatz zu Standard-Dynpros oder anderen Programmstellen wird das Selektionsbild jedoch **nicht gesperrt**, sondern alle Eingabefelder bleiben **bereit zur Korrektur** geschaltet, sodass der Benutzer seine Eingabe sofort anpassen kann.
                </div>
            </div>
        </div>
    </div>

    <!-- Summary Card -->
    <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 10px 30px -15px rgba(0,0,0,0.15);">
        <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--foreground); margin-top: 0; margin-bottom: 1.25rem;">📝 Kurzzusammenfassung</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; font-size: 0.9rem; color: var(--foreground); line-height: 1.6;">
            <div>
                <h4 style="color: var(--color-primary); margin-top: 0; font-weight: 700; margin-bottom: 0.5rem;">ABAP-Listen & Selektionsbilder</h4>
                <ul style="padding-left: 1.1rem; margin: 0;">
                    <li>Ausgabe auf Listen erfolgt mit `WRITE: /`, `ULINE` und `SKIP`.</li>
                    <li>Sprechende Überschriften werden übersetzungssicher im Text-Pool (SE32) gepflegt.</li>
                    <li>`PARAMETERS` erzeugt Einzelwertfelder, `SELECT-OPTIONS` generiert Abgrenzungstabellen (SIGN, OPTION, LOW, HIGH).</li>
                    <li>Dictionary-Bezug erbt Hilfetexte, Suchhilfen (F4) und automatische Typprüfungen.</li>
                </ul>
            </div>
            <div>
                <h4 style="color: var(--color-secondary); margin-top: 0; font-weight: 700; margin-bottom: 0.5rem;">Ereignissteuerung & Validierung</h4>
                <ul style="padding-left: 1.1rem; margin: 0;">
                    <li>Report-Ablauf ist ereignisgesteuert (Laufzeitumgebung steuert Chronologie).</li>
                    <li>Reihenfolge der Blöcke im Quellcode ist unerheblich für die Ausführungsreihenfolge.</li>
                    <li>`INITIALIZATION` belegt Felder vor; `AT SELECTION-SCREEN` prüft Eingaben und Berechtigungen.</li>
                    <li>Fehler per `MESSAGE ... TYPE ''E''` in AT SELECTION-SCREEN halten das Selektionsbild korrigierbar.</li>
                </ul>
            </div>
        </div>
    </div>
</div>',
    '',
    'article',
    'published',
    51,
    '2026-05-20 11:35:00',
    '2026-05-20 11:35:00'
);
