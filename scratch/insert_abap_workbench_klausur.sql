-- SQL INSERT-Befehl für ABAP-Workbench-Klausur
-- Fach: SAP ERP (subjectId: 'sxh3e5ewi0qahenr6jg')
-- Autor: u5ilhtdcn9ycti9tbmc
-- Version: 2.0 – Vollständig überarbeitete Formatierung mit allen 16 Fragen

INSERT INTO lessons (id, subjectId, authorId, title, content, contentRaw, type, status, sortOrder, createdAt, updatedAt)
VALUES (
    'lesson_abap_workbench_klausur',
    'sxh3e5ewi0qahenr6jg',
    'u5ilhtdcn9ycti9tbmc',
    'ABAP-Workbench-Klausur – Vollständige Prüfungsvorbereitung',
    '<div style="margin-bottom: 3rem; font-family: system-ui, -apple-system, sans-serif; color: var(--foreground); line-height: 1.6;">
    <!-- Header Section -->
    <span style="display: inline-block; padding: 0.35rem 1rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1.5rem; background: linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%); border: 1px solid rgba(236, 72, 153, 0.4); color: #ec4899;">✨ ABAP Klausurvorbereitung</span>
    
    <h1 style="font-size: 2.75rem; font-weight: 900; background: linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #6366f1 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 1rem; letter-spacing: -0.025em; line-height: 1.1;">ABAP-Workbench-Klausur</h1>
    <p style="font-size: 1.15rem; color: var(--foreground-muted); margin-bottom: 3rem; font-weight: 500;">Kompakte Prüfungsvorbereitung mit 16 prüfungsrelevanten Fragen und ausführlichen Antworten zur ABAP-Workbench</p>

    <!-- ═════════════════════════════════════════════════════════════════ -->
    <!-- FRAGE 1: DREISTUFIGE SAP-MEHRSYSTEMLANDSCHAFT -->
    <!-- ═════════════════════════════════════════════════════════════════ -->
    <div style="margin-bottom: 3rem; background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 4px 20px -5px rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: linear-gradient(135deg, #ec4899, #a855f7); color: white; font-weight: 800; font-size: 1.1rem; flex-shrink: 0;">1</span>
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--foreground); margin: 0;">Dreistufige SAP-Mehrsystemlandschaft</h2>
        </div>
        
        <div style="background: rgba(236, 72, 153, 0.08); border-left: 4px solid #ec4899; padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0; margin-bottom: 1.5rem;">
            <p style="font-weight: 700; font-size: 1rem; color: #ec4899; margin: 0 0 0.5rem 0;">📋 Aufgabenstellung</p>
            <p style="margin: 0; font-size: 0.95rem;">Beschreiben Sie die typische dreistufige SAP-Mehrsystemlandschaft. Gehen Sie dabei auf die Rolle der einzelnen Systeme ein.</p>
        </div>
        
        <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--color-primary); margin-bottom: 1rem;">💡 Musterlösung</h3>
        <p style="margin-bottom: 1.5rem; font-size: 0.95rem;">Die Architektur besteht aus zwei eng verknüpften Konzepten: der technischen <strong>3-Tier-Architecture</strong> und der organisatorischen <strong>Systemlandschaft</strong>.</p>
        
        <div style="margin-bottom: 2rem;">
            <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--color-primary); margin-bottom: 1.25rem;">📌 Technische 3-Tier-Architecture</h4>
            <div style="display: grid; gap: 1.25rem;">
                <!-- Präsentationsschicht -->
                <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0.02) 100%); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 1rem; padding: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                        <span style="font-size: 1.75rem;">🖥️</span>
                        <h5 style="font-size: 1.15rem; font-weight: 800; color: var(--color-primary); margin: 0;">Präsentationsschicht</h5>
                    </div>
                    <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">Dies ist die <strong>Schnittstelle zum Benutzer</strong> (z. B. SAP GUI, SAP Fiori, Web-Browser). Sie nimmt Eingaben entgegen, bereitet Daten visuell auf, kommuniziert direkt mit der Applikationsschicht und hat <strong>keinen direkten Datenbankzugriff</strong>.</p>
                </div>
                
                <!-- Applikationsschicht -->
                <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0.02) 100%); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 1rem; padding: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                        <span style="font-size: 1.75rem;">⚙️</span>
                        <h5 style="font-size: 1.15rem; font-weight: 800; color: var(--color-success); margin: 0;">Applikationsschicht</h5>
                    </div>
                    <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">Hier läuft die <strong>eigentliche Anwendungslogik</strong> (die ABAP-Programme). Sie besteht aus ABAP-Applikationsservern und lässt sich durch Hinzufügen weiterer Server <strong>horizontal skalieren</strong>. Ein zentraler <strong>Dispatcher</strong> verteilt eingehende Anfragen an freie Workprozesse (Dialog-, Verbuchungsprozesse, etc.).</p>
                </div>
                
                <!-- Datenbankschicht -->
                <div style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(245, 158, 11, 0.02) 100%); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 1rem; padding: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                        <span style="font-size: 1.75rem;">💾</span>
                        <h5 style="font-size: 1.15rem; font-weight: 800; color: var(--color-warning); margin: 0;">Datenbankschicht</h5>
                    </div>
                    <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">Sie dient der <strong>zentralen Speicherung aller Daten</strong> (Anwendungsdaten, Customizing, Metadaten und ABAP-Quellcode). <strong>Nur die Applikationsschicht greift direkt darauf zu.</strong></p>
                </div>
            </div>
        </div>

        <div style="margin-bottom: 2rem;">
            <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--color-secondary); margin-bottom: 1.25rem;">📌 Organisatorische Systemlandschaft (Folgesysteme)</h4>
            <p style="font-size: 0.95rem; margin-bottom: 1.25rem;">Um den laufenden Betrieb nicht zu gefährden, wird neue oder geänderte Software über das <strong>SAP-Transportwesen (TMS)</strong> schrittweise durch drei separate Systeme geschleust:</p>
            <div style="display: grid; gap: 1.25rem;">
                <!-- DEV System -->
                <div style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(168, 85, 247, 0.02) 100%); border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 1rem; padding: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                        <span style="font-size: 1.75rem;">🔧</span>
                        <h5 style="font-size: 1.15rem; font-weight: 800; color: var(--color-secondary); margin: 0;">DEV (Entwicklungssystem)</h5>
                    </div>
                    <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">Hier entwickeln <strong>Programmierer</strong> neue Funktionen und nehmen <strong>Customizing-Einstellungen</strong> vor. Fehler in diesem System haben <strong>keine Auswirkungen auf das operative Geschäft</strong>.</p>
                </div>
                
                <!-- QAS System -->
                <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.02) 100%); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 1rem; padding: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                        <span style="font-size: 1.75rem;">✅</span>
                        <h5 style="font-size: 1.15rem; font-weight: 800; color: var(--color-primary); margin: 0;">QAS (Qualitätssicherungssystem)</h5>
                    </div>
                    <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">In dieses System werden die Entwicklungen aus dem DEV-System importiert. Mit <strong>realitätsnahen Datenkopien</strong> werden hier intensive <strong>Funktions-, Integrations- und Performancetests</strong> durchgeführt. <strong>Quellcode darf hier nicht direkt verändert werden.</strong></p>
                </div>
                
                <!-- PRD System -->
                <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.02) 100%); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 1rem; padding: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                        <span style="font-size: 1.75rem;">🚀</span>
                        <h5 style="font-size: 1.15rem; font-weight: 800; color: var(--color-success); margin: 0;">PRD (Produktivsystem)</h5>
                    </div>
                    <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">Das <strong>Live-System des Unternehmens</strong>. Hier arbeiten die Endanwender im täglichen Betrieb. <strong>Nur gründlich im QAS-System getestete und freigegebene Transporte</strong> werden hierher importiert.</p>
                </div>
            </div>
        </div>

        <div style="background: rgba(168, 85, 247, 0.08); border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 0.75rem; padding: 1.25rem;">
            <p style="margin: 0; font-size: 0.9rem; line-height: 1.6;"><strong style="color: var(--color-secondary);">💡 Merksatz:</strong> Entwickler arbeiten in DEV, Tester prüfen in QAS, Nutzer arbeiten in PRD.</p>
        </div>
    </div>

    <!-- ═════════════════════════════════════════════════════════════════ -->
    <!-- FRAGE 2: ABAP-REPOSITORY -->
    <!-- ═════════════════════════════════════════════════════════════════ -->
    <div style="margin-bottom: 3rem; background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 4px 20px -5px rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: linear-gradient(135deg, #ec4899, #a855f7); color: white; font-weight: 800; font-size: 1.1rem; flex-shrink: 0;">2</span>
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--foreground); margin: 0;">Das ABAP-Repository</h2>
        </div>
        
        <div style="background: rgba(236, 72, 153, 0.08); border-left: 4px solid #ec4899; padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0; margin-bottom: 1.5rem;">
            <p style="font-weight: 700; font-size: 1rem; color: #ec4899; margin: 0 0 0.5rem 0;">📋 Aufgabenstellung</p>
            <p style="margin: 0; font-size: 0.95rem;">Beschreiben Sie das ABAP-Repository.</p>
        </div>
        
        <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--color-primary); margin-bottom: 1.5rem;">💡 Musterlösung</h3>
        
        <div style="display: grid; gap: 1.25rem;">
            <div style="background: linear-gradient(to right, rgba(59, 130, 246, 0.08), rgba(59, 130, 246, 0.02)); border-left: 3px solid var(--color-primary); padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0;">
                <h4 style="font-weight: 800; color: var(--color-primary); margin: 0 0 0.75rem 0; font-size: 1.05rem;">📚 Überblick</h4>
                <p style="margin: 0; font-size: 0.95rem;">Das ABAP-Repository ist die <strong>zentrale, systemweite und mandantenunabhängige Sammlung aller Entwicklungsobjekte</strong> auf der Datenbankschicht.</p>
            </div>
            
            <div style="background: linear-gradient(to right, rgba(16, 185, 129, 0.08), rgba(16, 185, 129, 0.02)); border-left: 3px solid var(--color-success); padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0;">
                <h4 style="font-weight: 800; color: var(--color-success); margin: 0 0 0.75rem 0; font-size: 1.05rem;">📝 Inhalt</h4>
                <p style="margin: 0 0 0.75rem 0; font-size: 0.95rem;">Das Repository umfasst:</p>
                <ul style="margin: 0; padding-left: 1.5rem; font-size: 0.95rem;">
                    <li>Quellcodes (Reports, Klassen, Funktionsbausteine)</li>
                    <li>Oberflächenelemente (Dynpros, Menüs)</li>
                    <li>ABAP Dictionary-Definitionen (Tabellen, Strukturen, Datenelemente, Domänen)</li>
                </ul>
            </div>
            
            <div style="background: linear-gradient(to right, rgba(245, 158, 11, 0.08), rgba(245, 158, 11, 0.02)); border-left: 3px solid var(--color-warning); padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0;">
                <h4 style="font-weight: 800; color: var(--color-warning); margin: 0 0 0.75rem 0; font-size: 1.05rem;">🌍 Mandantenunabhängigkeit</h4>
                <p style="margin: 0; font-size: 0.95rem;">Ein im Repository angelegtes oder geändertes Objekt ist <strong>sofort in allen Mandanten des jeweiligen SAP-Systems identisch verfügbar</strong>.</p>
            </div>
            
            <div style="background: linear-gradient(to right, rgba(168, 85, 247, 0.08), rgba(168, 85, 247, 0.02)); border-left: 3px solid var(--color-secondary); padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0;">
                <h4 style="font-weight: 800; color: var(--color-secondary); margin: 0 0 0.75rem 0; font-size: 1.05rem;">🛠️ Werkzeuge & Zugriff</h4>
                <p style="margin: 0; font-size: 0.95rem;"><strong>Object Navigator (SE80)</strong> – Der Entwickler hat eine <strong>hierarchische Sicht auf alle Repository-Objekte</strong>, übersichtlich geordnet nach Paketen, Programmen, Klassen und Funktionsgruppen.</p>
            </div>
        </div>
    </div>

    <!-- ═════════════════════════════════════════════════════════════════ -->
    <!-- FRAGE 3: ABAP WORKBENCH TRANSAKTIONEN -->
    <!-- ═════════════════════════════════════════════════════════════════ -->
    <div style="margin-bottom: 3rem; background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 4px 20px -5px rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: linear-gradient(135deg, #ec4899, #a855f7); color: white; font-weight: 800; font-size: 1.1rem; flex-shrink: 0;">3</span>
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--foreground); margin: 0;">ABAP Workbench Transaktionen</h2>
        </div>
        
        <div style="background: rgba(236, 72, 153, 0.08); border-left: 4px solid #ec4899; padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0; margin-bottom: 1.5rem;">
            <p style="font-weight: 700; font-size: 1rem; color: #ec4899; margin: 0 0 0.5rem 0;">📋 Aufgabenstellung</p>
            <p style="margin: 0; font-size: 0.95rem;">Welche der folgenden Transaktionen gehören zur ABAP Workbench? (Mehrfachauswahl)</p>
        </div>
        
        <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--color-primary); margin-bottom: 1rem;">✓ Alle nachfolgenden Transaktionen sind korrekt:</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
            <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 0.75rem; padding: 1.25rem;">
                <span style="font-family: monospace; font-weight: 800; color: var(--color-success); font-size: 1.15rem;">SE80</span>
                <p style="margin: 0.75rem 0 0 0; font-size: 0.95rem; font-weight: 600;">Object Navigator</p>
                <p style="margin: 0.5rem 0 0 0; font-size: 0.85rem; color: var(--foreground-muted);">Zentrales Einstiegswerkzeug (integriert alle anderen Werkzeuge)</p>
            </div>
            <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 0.75rem; padding: 1.25rem;">
                <span style="font-family: monospace; font-weight: 800; color: var(--color-success); font-size: 1.15rem;">SE38</span>
                <p style="margin: 0.75rem 0 0 0; font-size: 0.95rem; font-weight: 600;">ABAP Editor</p>
                <p style="margin: 0.5rem 0 0 0; font-size: 0.85rem; color: var(--foreground-muted);">Schreiben und Ändern von Programmen</p>
            </div>
            <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 0.75rem; padding: 1.25rem;">
                <span style="font-family: monospace; font-weight: 800; color: var(--color-success); font-size: 1.15rem;">SE11</span>
                <p style="margin: 0.75rem 0 0 0; font-size: 0.95rem; font-weight: 600;">ABAP Dictionary</p>
                <p style="margin: 0.5rem 0 0 0; font-size: 0.85rem; color: var(--foreground-muted);">Definition von Tabellen und Datenelementen</p>
            </div>
            <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 0.75rem; padding: 1.25rem;">
                <span style="font-family: monospace; font-weight: 800; color: var(--color-success); font-size: 1.15rem;">SE24</span>
                <p style="margin: 0.75rem 0 0 0; font-size: 0.95rem; font-weight: 600;">Class Builder</p>
                <p style="margin: 0.5rem 0 0 0; font-size: 0.85rem; color: var(--foreground-muted);">Definition und Implementierung globaler Klassen</p>
            </div>
            <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 0.75rem; padding: 1.25rem;">
                <span style="font-family: monospace; font-weight: 800; color: var(--color-success); font-size: 1.15rem;">SE37</span>
                <p style="margin: 0.75rem 0 0 0; font-size: 0.95rem; font-weight: 600;">Function Builder</p>
                <p style="margin: 0.5rem 0 0 0; font-size: 0.85rem; color: var(--foreground-muted);">Erstellung und Verwaltung von Funktionsbausteinen</p>
            </div>
            <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 0.75rem; padding: 1.25rem;">
                <span style="font-family: monospace; font-weight: 800; color: var(--color-success); font-size: 1.15rem;">SE51</span>
                <p style="margin: 0.75rem 0 0 0; font-size: 0.95rem; font-weight: 600;">Screen Painter</p>
                <p style="margin: 0.5rem 0 0 0; font-size: 0.85rem; color: var(--foreground-muted);">Gestaltung von Benutzeroberflächen (Dynpros)</p>
            </div>
            <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 0.75rem; padding: 1.25rem;">
                <span style="font-family: monospace; font-weight: 800; color: var(--color-success); font-size: 1.15rem;">SE41</span>
                <p style="margin: 0.75rem 0 0 0; font-size: 0.95rem; font-weight: 600;">Menu Painter</p>
                <p style="margin: 0.5rem 0 0 0; font-size: 0.85rem; color: var(--foreground-muted);">Definition von Menü und Tastaturbelegung</p>
            </div>
        </div>
    </div>

    <!-- ═════════════════════════════════════════════════════════════════ -->
    <!-- FRAGE 4: DOMÄNE UND DATENELEMENT -->
    <!-- ═════════════════════════════════════════════════════════════════ -->
    <div style="margin-bottom: 3rem; background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 4px 20px -5px rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: linear-gradient(135deg, #ec4899, #a855f7); color: white; font-weight: 800; font-size: 1.1rem; flex-shrink: 0;">4</span>
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--foreground); margin: 0;">Domäne und Datenelement</h2>
        </div>
        
        <div style="background: rgba(236, 72, 153, 0.08); border-left: 4px solid #ec4899; padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0; margin-bottom: 1.5rem;">
            <p style="font-weight: 700; font-size: 1rem; color: #ec4899; margin: 0 0 0.5rem 0;">📋 Aufgabenstellung</p>
            <p style="margin: 0; font-size: 0.95rem;">Definieren Sie die Begriffe Domäne und Datenelement im Kontext des ABAP Data Dictionary.</p>
        </div>
        
        <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--color-primary); margin-bottom: 1.5rem;">💡 Musterlösung</h3>
        <p style="font-size: 0.95rem; margin-bottom: 1.5rem;">Das ABAP Dictionary trennt die <strong>technischen Eigenschaften eines Feldes strikt von seiner betriebswirtschaftlichen (semantischen) Bedeutung</strong>:</p>
        
        <div style="display: grid; gap: 1.5rem;">
            <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.02) 100%); border: 1px solid rgba(59, 130, 246, 0.25); border-radius: 1rem; padding: 1.75rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
                    <span style="font-size: 2rem;">🔧</span>
                    <h4 style="font-size: 1.25rem; font-weight: 800; color: var(--color-primary); margin: 0;">Domäne</h4>
                </div>
                <p style="margin: 0 0 1rem 0; font-size: 0.95rem; line-height: 1.7;"><strong>Technische Rahmenbedingungen</strong> – Beschreibt die rein <strong>technischen Eigenschaften</strong> eines Datenfeldes:</p>
                <ul style="margin: 0; padding-left: 1.5rem; font-size: 0.95rem; line-height: 1.6;">
                    <li>Grundlegender Datentyp (z. B. CHAR, NUMC, DEC)</li>
                    <li>Feldlänge</li>
                    <li>Dezimalstellen</li>
                    <li>Festwerte oder Prüftabellen</li>
                </ul>
                <p style="margin: 1rem 0 0 0; font-size: 0.85rem; color: var(--foreground-muted);">Beispiel: „10-stelliger numerischer Wert"</p>
            </div>
            
            <div style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(245, 158, 11, 0.02) 100%); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 1rem; padding: 1.75rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
                    <span style="font-size: 2rem;">📝</span>
                    <h4 style="font-size: 1.25rem; font-weight: 800; color: var(--color-warning); margin: 0;">Datenelement</h4>
                </div>
                <p style="margin: 0 0 1rem 0; font-size: 0.95rem; line-height: 1.7;"><strong>Semantische Bedeutung</strong> – Beschreibt die <strong>fachliche Rolle</strong> eines Feldes im Kontext:</p>
                <ul style="margin: 0; padding-left: 1.5rem; font-size: 0.95rem; line-height: 1.6;">
                    <li>Basiert auf einer Domäne</li>
                    <li>Sprachabhängige Feldbezeichner (Feldtext)</li>
                    <li>F1-Hilfe (Dokumentation)</li>
                    <li>Bedeutung im Geschäftskontext</li>
                </ul>
                <p style="margin: 1rem 0 0 0; font-size: 0.85rem; color: var(--foreground-muted);">Beispiel: „Diese 10-stellige Zahl ist eine Kundennummer"</p>
            </div>
        </div>
    </div>

    <!-- ═════════════════════════════════════════════════════════════════ -->
    <!-- FRAGE 5: ZUSAMMENHANG DOMÄNE-DATENELEMENT-TABELLENFELD -->
    <!-- ═════════════════════════════════════════════════════════════════ -->
    <div style="margin-bottom: 3rem; background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 4px 20px -5px rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: linear-gradient(135deg, #ec4899, #a855f7); color: white; font-weight: 800; font-size: 1.1rem; flex-shrink: 0;">5</span>
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--foreground); margin: 0;">Zusammenhang: Domäne, Datenelement, Tabellenfeld</h2>
        </div>
        
        <div style="background: rgba(236, 72, 153, 0.08); border-left: 4px solid #ec4899; padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0; margin-bottom: 1.5rem;">
            <p style="font-weight: 700; font-size: 1rem; color: #ec4899; margin: 0 0 0.5rem 0;">📋 Aufgabenstellung</p>
            <p style="margin: 0; font-size: 0.95rem;">Erklären Sie den Zusammenhang zwischen Domänen, Datenelementen und Tabellenfeldern.</p>
        </div>
        
        <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--color-primary); margin-bottom: 1.5rem;">💡 Musterlösung</h3>
        
        <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%); border: 1px solid rgba(139, 92, 246, 0.2); border-radius: 1rem; padding: 2rem;">
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                <div style="display: flex; align-items: center; gap: 1.25rem;">
                    <span style="display: inline-flex; align-items: center; justify-content: center; width: 2.25rem; height: 2.25rem; border-radius: 50%; background: linear-gradient(135deg, #ec4899, #a855f7); color: white; font-weight: 800; font-size: 1rem; flex-shrink: 0;">1</span>
                    <div style="flex: 1;">
                        <p style="margin: 0 0 0.5rem 0; font-size: 0.95rem; font-weight: 700;">🔧 Domäne</p>
                        <p style="margin: 0; font-size: 0.9rem; color: var(--foreground-muted);">Definiert die <strong>technischen Rahmenbedingungen</strong> (z. B. „10-stelliger numerischer Wert")</p>
                    </div>
                </div>
                
                <div style="text-align: center; color: var(--foreground-muted); font-size: 1.75rem; font-weight: 300; margin: 0;">↓</div>
                
                <div style="display: flex; align-items: center; gap: 1.25rem;">
                    <span style="display: inline-flex; align-items: center; justify-content: center; width: 2.25rem; height: 2.25rem; border-radius: 50%; background: linear-gradient(135deg, #f59e0b, #ec4899); color: white; font-weight: 800; font-size: 1rem; flex-shrink: 0;">2</span>
                    <div style="flex: 1;">
                        <p style="margin: 0 0 0.5rem 0; font-size: 0.95rem; font-weight: 700;">📝 Datenelement</p>
                        <p style="margin: 0; font-size: 0.9rem; color: var(--foreground-muted);">Referenziert Domäne und beschreibt <strong>semantische Bedeutung</strong> (z. B. „Kundennummer")</p>
                    </div>
                </div>
                
                <div style="text-align: center; color: var(--foreground-muted); font-size: 1.75rem; font-weight: 300; margin: 0;">↓</div>
                
                <div style="display: flex; align-items: center; gap: 1.25rem;">
                    <span style="display: inline-flex; align-items: center; justify-content: center; width: 2.25rem; height: 2.25rem; border-radius: 50%; background: linear-gradient(135deg, #10b981, #06b6d4); color: white; font-weight: 800; font-size: 1rem; flex-shrink: 0;">3</span>
                    <div style="flex: 1;">
                        <p style="margin: 0 0 0.5rem 0; font-size: 0.95rem; font-weight: 700;">📊 Tabellenfeld</p>
                        <p style="margin: 0; font-size: 0.9rem; color: var(--foreground-muted);">Das konkrete Feld in der Datenbanktabelle (z. B. KUNNR in KNA1) – erbt automatisch alle Eigenschaften</p>
                    </div>
                </div>
            </div>
        </div>

        <div style="background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 0.75rem; padding: 1.5rem; margin-top: 1.5rem;">
            <p style="margin: 0; font-size: 0.9rem; line-height: 1.7;"><strong>💡 Merksatz:</strong> Das Tabellenfeld <strong>erbt</strong> sowohl die <strong>technischen Eigenschaften</strong> der Domäne als auch die <strong>semantischen Bedeutung und F1/F4-Hilfe</strong> des Datenelements – eine hierarchische Vererbung!</p>
        </div>
    </div>

    <!-- ═════════════════════════════════════════════════════════════════ -->
    <!-- FRAGE 6: VORTEILE DOMÄNENKONZEPT -->
    <!-- ═════════════════════════════════════════════════════════════════ -->
    <div style="margin-bottom: 3rem; background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 4px 20px -5px rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: linear-gradient(135deg, #ec4899, #a855f7); color: white; font-weight: 800; font-size: 1.1rem; flex-shrink: 0;">6</span>
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--foreground); margin: 0;">Vorteile des Domänenkonzepts</h2>
        </div>
        
        <div style="background: rgba(236, 72, 153, 0.08); border-left: 4px solid #ec4899; padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0; margin-bottom: 1.5rem;">
            <p style="font-weight: 700; font-size: 1rem; color: #ec4899; margin: 0 0 0.5rem 0;">📋 Aufgabenstellung</p>
            <p style="margin: 0; font-size: 0.95rem;">Nennen Sie die Vorteile des Domänenkonzepts.</p>
        </div>
        
        <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--color-primary); margin-bottom: 1rem;">✓ Zentrale Wartbarkeit und Konsistenz</h3>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
            <div style="background: linear-gradient(to bottom right, rgba(59, 130, 246, 0.08), rgba(59, 130, 246, 0.02)); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 0.75rem; padding: 1.5rem;">
                <div style="font-size: 1.75rem; margin-bottom: 0.75rem;">🔧</div>
                <p style="margin: 0; font-size: 0.95rem; font-weight: 700; color: var(--color-primary); margin-bottom: 0.75rem;">Zentrale Wartbarkeit</p>
                <p style="margin: 0; font-size: 0.85rem; line-height: 1.5; color: var(--foreground-muted);">Wenn sich ein technisches Attribut ändert (z. B. Materialnummer von 10 auf 12 Stellen), muss nur die Domäne angepasst werden – alle abhängigen Datenelemente und Tabellenfelder passen sich automatisch an.</p>
            </div>
            
            <div style="background: linear-gradient(to bottom right, rgba(16, 185, 129, 0.08), rgba(16, 185, 129, 0.02)); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 0.75rem; padding: 1.5rem;">
                <div style="font-size: 1.75rem; margin-bottom: 0.75rem;">✅</div>
                <p style="margin: 0; font-size: 0.95rem; font-weight: 700; color: var(--color-success); margin-bottom: 0.75rem;">Konsistenz</p>
                <p style="margin: 0; font-size: 0.85rem; line-height: 1.5; color: var(--foreground-muted);">Felder mit gleichem logischem Inhalt weisen systemweit garantiert identische technische Eigenschaften auf.</p>
            </div>
            
            <div style="background: linear-gradient(to bottom right, rgba(245, 158, 11, 0.08), rgba(245, 158, 11, 0.02)); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 0.75rem; padding: 1.5rem;">
                <div style="font-size: 1.75rem; margin-bottom: 0.75rem;">🔍</div>
                <p style="margin: 0; font-size: 0.95rem; font-weight: 700; color: var(--color-warning); margin-bottom: 0.75rem;">Automatische Typprüfung</p>
                <p style="margin: 0; font-size: 0.85rem; line-height: 1.5; color: var(--foreground-muted);">Das System validiert Eingaben automatisch anhand der in der Domäne definierten Typen und Längen.</p>
            </div>
            
            <div style="background: linear-gradient(to bottom right, rgba(168, 85, 247, 0.08), rgba(168, 85, 247, 0.02)); border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 0.75rem; padding: 1.5rem;">
                <div style="font-size: 1.75rem; margin-bottom: 0.75rem;">🎯</div>
                <p style="margin: 0; font-size: 0.95rem; font-weight: 700; color: var(--color-secondary); margin-bottom: 0.75rem;">F4-Hilfe ohne Code</p>
                <p style="margin: 0; font-size: 0.85rem; line-height: 1.5; color: var(--foreground-muted);">Sind Festwerte in einer Domäne hinterlegt (z. B. Status A = Aktiv, I = Inaktiv), wird automatisch eine standardisierte Auswahlhilfe bereitgestellt.</p>
            </div>
        </div>
    </div>

    <!-- ═════════════════════════════════════════════════════════════════ -->
    <!-- FRAGE 7: MODULARISIERUNG IN ABAP -->
    <!-- ═════════════════════════════════════════════════════════════════ -->
    <div style="margin-bottom: 3rem; background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 4px 20px -5px rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: linear-gradient(135deg, #ec4899, #a855f7); color: white; font-weight: 800; font-size: 1.1rem; flex-shrink: 0;">7</span>
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--foreground); margin: 0;">Modularisierung in ABAP</h2>
        </div>
        
        <div style="background: rgba(236, 72, 153, 0.08); border-left: 4px solid #ec4899; padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0; margin-bottom: 1.5rem;">
            <p style="font-weight: 700; font-size: 1rem; color: #ec4899; margin: 0 0 0.5rem 0;">📋 Aufgabenstellung</p>
            <p style="margin: 0; font-size: 0.95rem;">Welche Aussagen zur Modularisierung in ABAP sind zutreffend? (Mehrfachauswahl)</p>
        </div>
        
        <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--color-primary); margin-bottom: 1rem;">✓ Zutreffende Aussagen</h3>
        
        <div style="display: grid; gap: 1rem;">
            <div style="background: rgba(16, 185, 129, 0.05); border-left: 3px solid var(--color-success); padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0;">
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">✓ <strong>Prozeduren</strong> unterstützen <strong>Kapselung</strong>, <strong>lokale Daten</strong> und definierte <strong>Schnittstellen</strong></p>
            </div>
            
            <div style="background: rgba(16, 185, 129, 0.05); border-left: 3px solid var(--color-success); padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0;">
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">✓ <strong>Methoden</strong> sind der <strong>moderne Standard</strong> und gehören zu Klassen (ABAP Objects)</p>
            </div>
            
            <div style="background: rgba(16, 185, 129, 0.05); border-left: 3px solid var(--color-success); padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0;">
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">✓ <strong>Funktionsbausteine</strong> sind <strong>global wiederverwendbare</strong> Prozeduren in Funktionsgruppen</p>
            </div>
            
            <div style="background: rgba(16, 185, 129, 0.05); border-left: 3px solid var(--color-success); padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0;">
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">✓ <strong>FORM-Routinen</strong> sind lokal, veraltet (obsolet) und sollten nicht mehr neu angelegt werden</p>
            </div>
        </div>
    </div>

    <!-- ═════════════════════════════════════════════════════════════════ -->
    <!-- FRAGE 8: FUNKTIONSBAUSTEINE VS. FORM-ROUTINEN -->
    <!-- ═════════════════════════════════════════════════════════════════ -->
    <div style="margin-bottom: 3rem; background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 4px 20px -5px rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: linear-gradient(135deg, #ec4899, #a855f7); color: white; font-weight: 800; font-size: 1.1rem; flex-shrink: 0;">8</span>
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--foreground); margin: 0;">Funktionsbausteine vs. FORM-Routinen</h2>
        </div>
        
        <div style="background: rgba(236, 72, 153, 0.08); border-left: 4px solid #ec4899; padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0; margin-bottom: 1.5rem;">
            <p style="font-weight: 700; font-size: 1rem; color: #ec4899; margin: 0 0 0.5rem 0;">📋 Aufgabenstellung</p>
            <p style="margin: 0; font-size: 0.95rem;">Nennen Sie die Vorteile von Funktionsbausteinen gegenüber FORM-Routinen.</p>
        </div>
        
        <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--color-primary); margin-bottom: 1rem;">✓ Vorteile von Funktionsbausteinen</h3>
        
        <div style="display: grid; gap: 1.25rem;">
            <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.02) 100%); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 1rem; padding: 1.5rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                    <span style="font-size: 1.5rem;">🌐</span>
                    <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--color-success); margin: 0;">Globale Wiederverwendbarkeit</h4>
                </div>
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">Funktionsbausteine sind <strong>systemweit aus jedem beliebigen Programm aufrufbar</strong>. FORM-Routinen hingegen sind lokal an ihr definierendes Programm gebunden.</p>
            </div>

            <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.02) 100%); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 1rem; padding: 1.5rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                    <span style="font-size: 1.5rem;">🔒</span>
                    <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--color-primary); margin: 0;">Strikte Schnittstellentypisierung</h4>
                </div>
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">Funktionsbausteine <strong>erzwingen exakte Typisierung der Übergabeparameter</strong>, was Fehler bereits zur Kompilierzeit aufdeckt.</p>
            </div>

            <div style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(245, 158, 11, 0.02) 100%); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 1rem; padding: 1.5rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                    <span style="font-size: 1.5rem;">📦</span>
                    <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--color-warning); margin: 0;">Kapselung & Speicherverwaltung</h4>
                </div>
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">Sie besitzen einen <strong>klar abgegrenzten Speicherbereich</strong> innerhalb ihrer Funktionsgruppe, wodurch <strong>ungewollte Seiteneffekte auf globale Programmdaten verhindert werden</strong>.</p>
            </div>

            <div style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(168, 85, 247, 0.02) 100%); border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 1rem; padding: 1.5rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                    <span style="font-size: 1.5rem;">🔗</span>
                    <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--color-secondary); margin: 0;">RFC-Fähigkeit</h4>
                </div>
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">Sie können für <strong>Remote-Aufruf (RFC) freigeschaltet werden</strong>, um mit externen oder anderen SAP-Systemen zu kommunizieren.</p>
            </div>
        </div>
    </div>

    <!-- ═════════════════════════════════════════════════════════════════ -->
    <!-- FRAGE 9: AUSSAGEN ZU PARAMETERS -->
    <!-- ═════════════════════════════════════════════════════════════════ -->
    <div style="margin-bottom: 3rem; background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 4px 20px -5px rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: linear-gradient(135deg, #ec4899, #a855f7); color: white; font-weight: 800; font-size: 1.1rem; flex-shrink: 0;">9</span>
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--foreground); margin: 0;">Aussagen zu PARAMETERS</h2>
        </div>
        
        <div style="background: rgba(236, 72, 153, 0.08); border-left: 4px solid #ec4899; padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0; margin-bottom: 1.5rem;">
            <p style="font-weight: 700; font-size: 1rem; color: #ec4899; margin: 0 0 0.5rem 0;">📋 Aufgabenstellung</p>
            <p style="margin: 0; font-size: 0.95rem;">Welche Aussagen zu PARAMETERS sind korrekt? (Mehrfachauswahl)</p>
        </div>
        
        <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--color-primary); margin-bottom: 1rem;">✓ Korrekte Aussagen</h3>
        
        <div style="display: grid; gap: 1rem;">
            <div style="background: rgba(16, 185, 129, 0.05); border-left: 3px solid var(--color-success); padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0;">
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">✓ PARAMETERS erzeugt ein <strong>einzelnes, einzeiliges Eingabefeld</strong> auf dem Selektionsbildschirm</p>
            </div>
            
            <div style="background: rgba(16, 185, 129, 0.05); border-left: 3px solid var(--color-success); padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0;">
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">✓ Der eingegebene <strong>Wert wird automatisch in die gleichnamige Variable übernommen</strong></p>
            </div>
            
            <div style="background: rgba(16, 185, 129, 0.05); border-left: 3px solid var(--color-success); padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0;">
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">✓ <strong>DEFAULT</strong>-Zusatz setzt einen vordefinierten Startwert</p>
            </div>
            
            <div style="background: rgba(16, 185, 129, 0.05); border-left: 3px solid var(--color-success); padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0;">
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">✓ <strong>OBLIGATORY</strong>-Zusatz deklariert das Feld als Pflichtfeld (rotes Häkchen)</p>
            </div>
            
            <div style="background: rgba(16, 185, 129, 0.05); border-left: 3px solid var(--color-success); padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0;">
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">✓ <strong>Dictionary-Typisierung</strong> vererbt automatisch Texte, F1-Dokumentation und F4-Eingabehilfe</p>
            </div>
        </div>
    </div>

    <!-- ═════════════════════════════════════════════════════════════════ -->
    <!-- FRAGE 10: EREIGNISBLÖCKE -->
    <!-- ═════════════════════════════════════════════════════════════════ -->
    <div style="margin-bottom: 3rem; background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 4px 20px -5px rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: linear-gradient(135deg, #ec4899, #a855f7); color: white; font-weight: 800; font-size: 1.1rem; flex-shrink: 0;">10</span>
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--foreground); margin: 0;">Ereignisblöcke in ABAP</h2>
        </div>
        
        <div style="background: rgba(236, 72, 153, 0.08); border-left: 4px solid #ec4899; padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0; margin-bottom: 1.5rem;">
            <p style="font-weight: 700; font-size: 1rem; color: #ec4899; margin: 0 0 0.5rem 0;">📋 Aufgabenstellung</p>
            <p style="margin: 0; font-size: 0.95rem;">Welche Aussagen zu Ereignisblöcken sind korrekt? (Mehrfachauswahl)</p>
        </div>
        
        <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--color-primary); margin-bottom: 1rem;">✓ Korrekte Aussagen</h3>
        
        <div style="display: grid; gap: 1rem;">
            <div style="background: rgba(16, 185, 129, 0.05); border-left: 3px solid var(--color-success); padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0;">
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">✓ Sie werden <strong>automatisch durch das ABAP-Laufzeit-Framework</strong> zu bestimmten Zeitpunkten ausgelöst</p>
            </div>
            
            <div style="background: rgba(16, 185, 129, 0.05); border-left: 3px solid var(--color-success); padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0;">
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">✓ Sie besitzen <strong>keine formale Schnittstelle</strong> (USING, CHANGING – nur globale Daten)</p>
            </div>
            
            <div style="background: rgba(16, 185, 129, 0.05); border-left: 3px solid var(--color-success); padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0;">
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">✓ Sie <strong>beginnen mit Ereignis-Schlüsselwort und enden implizit</strong> beim nächsten Block oder Programmende</p>
            </div>
            
            <div style="background: rgba(16, 185, 129, 0.05); border-left: 3px solid var(--color-success); padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0;">
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">✓ Sie sind <strong>nicht schachtelbar</strong> (kein Block darf innerhalb eines anderen definiert werden)</p>
            </div>
            
            <div style="background: rgba(16, 185, 129, 0.05); border-left: 3px solid var(--color-success); padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0;">
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">✓ Die <strong>physische Reihenfolge im Quelltext ist irrelevant</strong> – das Framework bestimmt die Ausführungsreihenfolge</p>
            </div>
        </div>

        <div style="background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 0.75rem; padding: 1.5rem; margin-top: 1.5rem;">
            <p style="margin: 0; font-size: 0.9rem; line-height: 1.7;"><strong>📝 Wichtige Ereignisblöcke:</strong> START-OF-SELECTION, INITIALIZATION, AT SELECTION-SCREEN, AT LINE-SELECTION, END-OF-SELECTION</p>
        </div>
    </div>

    <!-- ═════════════════════════════════════════════════════════════════ -->
    <!-- FRAGE 11: ABAP-PROGRAMM (ADDITION) -->
    <!-- ═════════════════════════════════════════════════════════════════ -->
    <div style="margin-bottom: 3rem; background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 4px 20px -5px rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: linear-gradient(135deg, #ec4899, #a855f7); color: white; font-weight: 800; font-size: 1.1rem; flex-shrink: 0;">11</span>
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--foreground); margin: 0;">Hinweise zum ABAP-Programm (Addition)</h2>
        </div>
        
        <div style="background: rgba(236, 72, 153, 0.08); border-left: 4px solid #ec4899; padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0; margin-bottom: 1.5rem;">
            <p style="font-weight: 700; font-size: 1rem; color: #ec4899; margin: 0 0 0.5rem 0;">📋 Aufgabenstellung</p>
            <p style="margin: 0; font-size: 0.95rem;">Beispielprogramm mit PARAMETERS, DATA und FORM-Routine.</p>
        </div>
        
        <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--color-primary); margin-bottom: 1rem;">💡 Code-Beispiel</h3>
        
        <div style="background: linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.6)); border-radius: 0.75rem; padding: 1.5rem; overflow-x: auto; font-family: monospace; font-size: 0.85rem; color: #00ff41; margin-bottom: 1.5rem; border: 1px solid rgba(0,200,83,0.3);">
            <pre style="margin: 0;">REPORT z_addition_demo.

* 1. Eingabe über PARAMETERS definieren
PARAMETERS: p_wert1 TYPE i DEFAULT 10 OBLIGATORY,
            p_wert2 TYPE i DEFAULT 20 OBLIGATORY.

* 2. Variable für das Ergebnis mit DATA deklarieren
DATA: gv_summe TYPE i.

* 3. Hauptprozess (Ereignisblock)
START-OF-SELECTION.
  " Aufruf des Unterprogramms
  PERFORM addiere_werte USING    p_wert1
                                 p_wert2
                        CHANGING gv_summe.

  " Ausgabe des Ergebnisses
  WRITE: / ''''Das Ergebnis der Addition ist:'''', gv_summe.

* 4. Unterprogramm mit FORM ... ENDFORM definieren
FORM addiere_werte USING    pv_w1 TYPE i
                            pv_w2 TYPE i
                   CHANGING cv_sum TYPE i.
  
  cv_sum = pv_w1 + pv_w2.

ENDFORM.</pre>
        </div>

        <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--color-primary); margin-bottom: 1rem;">📌 Wichtige Hinweise</h3>
        
        <div style="display: grid; gap: 1rem;">
            <div style="background: rgba(59, 130, 246, 0.05); border-left: 3px solid var(--color-primary); padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0;">
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">• Eingabe über <code style="background: rgba(0,0,0,0.3); padding: 0.2rem 0.4rem; border-radius: 3px;">PARAMETERS</code> – erzeugt Eingabefelder</p>
            </div>
            
            <div style="background: rgba(59, 130, 246, 0.05); border-left: 3px solid var(--color-primary); padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0;">
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">• Variablen mit <code style="background: rgba(0,0,0,0.3); padding: 0.2rem 0.4rem; border-radius: 3px;">DATA</code> – Deklaration lokaler Variablen</p>
            </div>
            
            <div style="background: rgba(59, 130, 246, 0.05); border-left: 3px solid var(--color-primary); padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0;">
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">• <code style="background: rgba(0,0,0,0.3); padding: 0.2rem 0.4rem; border-radius: 3px;">FORM</code> mit <code style="background: rgba(0,0,0,0.3); padding: 0.2rem 0.4rem; border-radius: 3px;">USING</code> und <code style="background: rgba(0,0,0,0.3); padding: 0.2rem 0.4rem; border-radius: 3px;">CHANGING</code> – Parameterübergabe</p>
            </div>
            
            <div style="background: rgba(59, 130, 246, 0.05); border-left: 3px solid var(--color-primary); padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0;">
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">• <strong>Jede Anweisung endet mit einem Punkt (.)</strong> – essentiell in ABAP!</p>
            </div>
        </div>
    </div>

    <!-- ═════════════════════════════════════════════════════════════════ -->
    <!-- FRAGE 12: KLASSE VS. OBJEKT -->
    <!-- ═════════════════════════════════════════════════════════════════ -->
    <div style="margin-bottom: 3rem; background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 4px 20px -5px rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: linear-gradient(135deg, #ec4899, #a855f7); color: white; font-weight: 800; font-size: 1.1rem; flex-shrink: 0;">12</span>
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--foreground); margin: 0;">Klasse vs. Objekt in ABAP-OO</h2>
        </div>
        
        <div style="background: rgba(236, 72, 153, 0.08); border-left: 4px solid #ec4899; padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0; margin-bottom: 1.5rem;">
            <p style="font-weight: 700; font-size: 1rem; color: #ec4899; margin: 0 0 0.5rem 0;">📋 Aufgabenstellung</p>
            <p style="margin: 0; font-size: 0.95rem;">Erklären Sie den Unterschied zwischen Klasse und Objekt in ABAP-OO.</p>
        </div>
        
        <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--color-primary); margin-bottom: 1.5rem;">💡 Musterlösung</h3>
        
        <div style="display: grid; gap: 1.5rem;">
            <div style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(168, 85, 247, 0.02) 100%); border: 1px solid rgba(168, 85, 247, 0.25); border-radius: 1rem; padding: 1.75rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
                    <span style="font-size: 2rem;">📐</span>
                    <h4 style="font-size: 1.25rem; font-weight: 800; color: var(--color-secondary); margin: 0;">Klasse</h4>
                </div>
                <p style="margin: 0 0 1rem 0; font-size: 0.95rem; line-height: 1.7;"><strong>Der abstrakte Bauplan oder die Vorlage</strong> (statisch). Sie definiert:</p>
                <ul style="margin: 0; padding-left: 1.5rem; font-size: 0.95rem; line-height: 1.6;">
                    <li>Welche Eigenschaften (Attribute) Instanzen besitzen werden</li>
                    <li>Welches Verhalten (Methoden) implementiert ist</li>
                </ul>
                <p style="margin: 1rem 0 0 0; font-size: 0.85rem; color: var(--foreground-muted);">Eine Klasse selbst belegt im Speicher <strong>keinen Platz für Anwendungsdaten</strong></p>
            </div>
            
            <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.02) 100%); border: 1px solid rgba(59, 130, 246, 0.25); border-radius: 1rem; padding: 1.75rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
                    <span style="font-size: 2rem;">⚡</span>
                    <h4 style="font-size: 1.25rem; font-weight: 800; color: var(--color-primary); margin: 0;">Objekt (Instanz)</h4>
                </div>
                <p style="margin: 0 0 1rem 0; font-size: 0.95rem; line-height: 1.7;"><strong>Das konkrete Abbild einer Klasse zur Laufzeit</strong> (dynamisch). Erzeugt mit <code style="background: rgba(0,0,0,0.2); padding: 0.2rem 0.4rem; border-radius: 3px;">CREATE OBJECT</code> oder <code style="background: rgba(0,0,0,0.2); padding: 0.2rem 0.4rem; border-radius: 3px;">NEW</code>. Es besitzt:</p>
                <ul style="margin: 0; padding-left: 1.5rem; font-size: 0.95rem; line-height: 1.6;">
                    <li>Eigene Identität und Speicheradresse</li>
                    <li>Individuelle Attributwerte (z. B. auto1 = Rot, auto2 = Blau)</li>
                </ul>
                <p style="margin: 1rem 0 0 0; font-size: 0.85rem; color: var(--foreground-muted);">Mehrere Objekte können auf der gleichen Klasse basieren, aber unterschiedliche Daten speichern</p>
            </div>
        </div>

        <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 0.75rem; padding: 1.5rem; margin-top: 1.5rem;">
            <p style="margin: 0; font-size: 0.9rem; line-height: 1.7;"><strong>🎯 Analogy:</strong> Klasse = Bauplan eines Autos | Objekt = konkretes Auto mit Tankfüllung und Kilometerstand</p>
        </div>
    </div>

    <!-- ═════════════════════════════════════════════════════════════════ -->
    <!-- FRAGE 13: LOKALE VS. GLOBALE KLASSEN -->
    <!-- ═════════════════════════════════════════════════════════════════ -->
    <div style="margin-bottom: 3rem; background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 4px 20px -5px rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: linear-gradient(135deg, #ec4899, #a855f7); color: white; font-weight: 800; font-size: 1.1rem; flex-shrink: 0;">13</span>
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--foreground); margin: 0;">Lokale vs. Globale Klassen</h2>
        </div>
        
        <div style="background: rgba(236, 72, 153, 0.08); border-left: 4px solid #ec4899; padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0; margin-bottom: 1.5rem;">
            <p style="font-weight: 700; font-size: 1rem; color: #ec4899; margin: 0 0 0.5rem 0;">📋 Aufgabenstellung</p>
            <p style="margin: 0; font-size: 0.95rem;">Unterscheiden Sie lokale und globale Klassen in ABAP. (Mehrfachauswahl)</p>
        </div>
        
        <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--color-primary); margin-bottom: 1.5rem;">💡 Musterlösung</h3>
        
        <div style="display: grid; gap: 2rem;">
            <!-- Globale Klassen -->
            <div style="border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 1rem; padding: 1.75rem; background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0.01) 100%);">
                <h4 style="font-size: 1.25rem; font-weight: 800; color: var(--color-success); margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.75rem;"><span style="font-size: 1.75rem;">🌐</span> Globale Klassen</h4>
                <div style="display: grid; gap: 0.75rem;">
                    <div style="background: rgba(16, 185, 129, 0.08); padding: 1rem; border-radius: 0.5rem;">
                        <p style="margin: 0; font-size: 0.95rem;">✓ Werden zentral über <strong>Class Builder (SE24)</strong> oder Eclipse ADT angelegt</p>
                    </div>
                    <div style="background: rgba(16, 185, 129, 0.08); padding: 1rem; border-radius: 0.5rem;">
                        <p style="margin: 0; font-size: 0.95rem;">✓ Im <strong>ABAP-Repository als eigenständige Klassenpools</strong> abgelegt</p>
                    </div>
                    <div style="background: rgba(16, 185, 129, 0.08); padding: 1rem; border-radius: 0.5rem;">
                        <p style="margin: 0; font-size: 0.95rem;">✓ <strong>Systemweit wiederverwendbar</strong> aus jedem beliebigen Programm</p>
                    </div>
                    <div style="background: rgba(16, 185, 129, 0.08); padding: 1rem; border-radius: 0.5rem;">
                        <p style="margin: 0; font-size: 0.95rem;">✓ <strong>Vollständig transportierbar</strong> zwischen SAP-Systemen</p>
                    </div>
                </div>
            </div>
            
            <!-- Lokale Klassen -->
            <div style="border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 1rem; padding: 1.75rem; background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0.01) 100%);">
                <h4 style="font-size: 1.25rem; font-weight: 800; color: var(--color-primary); margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.75rem;"><span style="font-size: 1.75rem;">📍</span> Lokale Klassen</h4>
                <div style="display: grid; gap: 0.75rem;">
                    <div style="background: rgba(59, 130, 246, 0.08); padding: 1rem; border-radius: 0.5rem;">
                        <p style="margin: 0; font-size: 0.95rem;">✓ Direkt im <strong>Quellcode eines bestimmten Programms</strong> definiert (z. B. Ende eines Reports)</p>
                    </div>
                    <div style="background: rgba(59, 130, 246, 0.08); padding: 1rem; border-radius: 0.5rem;">
                        <p style="margin: 0; font-size: 0.95rem;">✓ <strong>Ausschließlich innerhalb dieses einen Programms</strong> sichtbar und nutzbar</p>
                    </div>
                    <div style="background: rgba(59, 130, 246, 0.08); padding: 1rem; border-radius: 0.5rem;">
                        <p style="margin: 0; font-size: 0.95rem;">✓ Zusammen mit dem umschließenden Programm abgelegt (kein eigenständiges Repository-Objekt)</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- ═════════════════════════════════════════════════════════════════ -->
    <!-- FRAGE 14: AUSSAGEN ÜBER ABAP OBJECTS -->
    <!-- ═════════════════════════════════════════════════════════════════ -->
    <div style="margin-bottom: 3rem; background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 4px 20px -5px rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: linear-gradient(135deg, #ec4899, #a855f7); color: white; font-weight: 800; font-size: 1.1rem; flex-shrink: 0;">14</span>
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--foreground); margin: 0;">Aussagen über ABAP Objects</h2>
        </div>
        
        <div style="background: rgba(236, 72, 153, 0.08); border-left: 4px solid #ec4899; padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0; margin-bottom: 1.5rem;">
            <p style="font-weight: 700; font-size: 1rem; color: #ec4899; margin: 0 0 0.5rem 0;">📋 Aufgabenstellung</p>
            <p style="margin: 0; font-size: 0.95rem;">Welche Aussagen über ABAP Objects (ABAP-OO) sind korrekt?</p>
        </div>
        
        <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--color-primary); margin-bottom: 1rem;">✓ Korrekte Aussagen</h3>
        
        <div style="display: grid; gap: 1rem;">
            <div style="background: rgba(16, 185, 129, 0.05); border-left: 3px solid var(--color-success); padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0;">
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">✓ <strong>Methoden als Standard</strong> – Stellen das funktionale Verhalten von Klassen dar und sind der <strong>moderne Entwicklungsstandard</strong></p>
            </div>
            
            <div style="background: rgba(16, 185, 129, 0.05); border-left: 3px solid var(--color-success); padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0;">
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">✓ <strong>Sichtbarkeitsbereiche</strong> – PUBLIC (von außen), PROTECTED (Klasse + Unterklassen), PRIVATE (nur in der Klasse)</p>
            </div>
            
            <div style="background: rgba(16, 185, 129, 0.05); border-left: 3px solid var(--color-success); padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0;">
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">✓ <strong>Globale Verwaltung</strong> – Globale Klassen und Interfaces werden in <strong>Transaktion SE24</strong> gepflegt</p>
            </div>
            
            <div style="background: rgba(16, 185, 129, 0.05); border-left: 3px solid var(--color-success); padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0;">
                <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">✓ <strong>Klassenpools</strong> – Container auf der Datenbank für globale Klassen, sind reine Funktionsbibliotheken und <strong>nicht direkt ausführbar</strong></p>
            </div>
        </div>
    </div>

    <!-- ═════════════════════════════════════════════════════════════════ -->
    <!-- FRAGE 15: KLASSENBASIERTE EXCEPTIONS -->
    <!-- ═════════════════════════════════════════════════════════════════ -->
    <div style="margin-bottom: 3rem; background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 4px 20px -5px rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: linear-gradient(135deg, #ec4899, #a855f7); color: white; font-weight: 800; font-size: 1.1rem; flex-shrink: 0;">15</span>
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--foreground); margin: 0;">Klassenbasierte Exceptions</h2>
        </div>
        
        <div style="background: rgba(236, 72, 153, 0.08); border-left: 4px solid #ec4899; padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0; margin-bottom: 1.5rem;">
            <p style="font-weight: 700; font-size: 1rem; color: #ec4899; margin: 0 0 0.5rem 0;">📋 Aufgabenstellung</p>
            <p style="margin: 0; font-size: 0.95rem;">Beschreiben Sie das Konzept der klassenbasierten Exceptions.</p>
        </div>
        
        <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--color-primary); margin-bottom: 1rem;">💡 Musterlösung</h3>
        
        <div style="display: grid; gap: 1.5rem;">
            <div style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(168, 85, 247, 0.02) 100%); border: 1px solid rgba(168, 85, 247, 0.25); border-radius: 1rem; padding: 1.5rem;">
                <div style="display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1rem;">
                    <span style="font-size: 1.75rem;">⚠️</span>
                    <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--color-secondary); margin: 0;">Der moderne Fehlerbehandlungs-Standard</h4>
                </div>
                <p style="margin: 0; font-size: 0.95rem;">Klassenbasierte Exceptions sind der <strong>objektorientierte Standard</strong> und ersetzen die klassische, fehleranfällige <strong>SY-SUBRC-Abfrage</strong>.</p>
            </div>

            <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.02) 100%); border: 1px solid rgba(59, 130, 246, 0.25); border-radius: 1rem; padding: 1.5rem;">
                <div style="display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1rem;">
                    <span style="font-size: 1.75rem;">📦</span>
                    <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--color-primary); margin: 0;">Ausnahme als Objekt</h4>
                </div>
                <p style="margin: 0; font-size: 0.95rem;">Tritt ein Fehler auf, wird ein <strong>spezielles Ausnahmeobjekt instanziiert</strong> und mit <code style="background: rgba(0,0,0,0.2); padding: 0.2rem 0.4rem; border-radius: 3px;">RAISE EXCEPTION</code> „geworfen". Das Objekt enthält detaillierte Fehlerinformationen (Texte, Variablenwerte zum Fehlerzeitpunkt).</p>
            </div>

            <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.02) 100%); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 1rem; padding: 1.5rem;">
                <div style="display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1rem;">
                    <span style="font-size: 1.75rem;">🛡️</span>
                    <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--color-success); margin: 0;">Strukturierte Behandlung (TRY...CATCH)</h4>
                </div>
                <p style="margin: 0; font-size: 0.95rem;">Der fehlergefährdete Code wird in einen <code style="background: rgba(0,0,0,0.2); padding: 0.2rem 0.4rem; border-radius: 3px;">TRY-Block</code> eingeschlossen. Tritt ein Fehler auf, <strong>bricht die Verarbeitung sofort ab</strong> und das System springt in den zugehörigen <code style="background: rgba(0,0,0,0.2); padding: 0.2rem 0.4rem; border-radius: 3px;">CATCH-Block</code>, um den Fehler kontrolliert abzufangen.</p>
            </div>

            <div style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(245, 158, 11, 0.02) 100%); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 1rem; padding: 1.5rem;">
                <div style="display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1rem;">
                    <span style="font-size: 1.75rem;">⬆️</span>
                    <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--color-warning); margin: 0;">Propagierung</h4>
                </div>
                <p style="margin: 0; font-size: 0.95rem;">Wird eine Ausnahme in einer tieferen Ebene (z. B. in einer Methode) nicht abgefangen, wird sie <strong>automatisch entlang der Aufrufhierarchie nach oben weitergegeben</strong> an den Aufrufer.</p>
            </div>
        </div>
    </div>

    <!-- ═════════════════════════════════════════════════════════════════ -->
    <!-- FRAGE 16: EXCEPTION-KLASSEN -->
    <!-- ═════════════════════════════════════════════════════════════════ -->
    <div style="margin-bottom: 3rem; background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 4px 20px -5px rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: linear-gradient(135deg, #ec4899, #a855f7); color: white; font-weight: 800; font-size: 1.1rem; flex-shrink: 0;">16</span>
            <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--foreground); margin: 0;">Aussagen zu Exception-Klassen</h2>
        </div>
        
        <div style="background: rgba(236, 72, 153, 0.08); border-left: 4px solid #ec4899; padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0; margin-bottom: 1.5rem;">
            <p style="font-weight: 700; font-size: 1rem; color: #ec4899; margin: 0 0 0.5rem 0;">📋 Aufgabenstellung</p>
            <p style="margin: 0; font-size: 0.95rem;">Welche Aussagen zu Exception-Klassen sind korrekt?</p>
        </div>
        
        <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--color-primary); margin-bottom: 1.5rem;">💡 Musterlösung</h3>
        
        <div style="margin-bottom: 1.5rem;">
            <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.02) 100%); border: 1px solid rgba(59, 130, 246, 0.25); border-radius: 1rem; padding: 1.5rem; margin-bottom: 1.5rem;">
                <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--color-primary); margin-bottom: 1rem;">🏛️ Gemeinsame Basis</h4>
                <p style="margin: 0; font-size: 0.95rem;">Alle Exception-Klassen erben direkt oder indirekt von der <strong>globalen abstrakten Basisklasse CX_ROOT</strong>.</p>
            </div>

            <div style="background: linear-gradient(to bottom, rgba(100,100,100,0.03), rgba(100,100,100,0)); border-radius: 1rem; padding: 1.5rem;">
                <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--foreground); margin-bottom: 1.25rem;">📚 Die drei Hauptkategorien</h4>
                
                <div style="display: grid; gap: 1.25rem;">
                    <!-- CX_STATIC_CHECK -->
                    <div style="background: linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.02)); border-left: 4px solid var(--color-primary); border-radius: 0 0.75rem 0.75rem 0; padding: 1.25rem;">
                        <h5 style="font-size: 1.05rem; font-weight: 800; color: var(--color-primary); margin: 0 0 0.75rem 0;">CX_STATIC_CHECK</h5>
                        <p style="margin: 0 0 0.75rem 0; font-size: 0.95rem; line-height: 1.6;"><strong>Statische Prüfung – MUSS behandelt werden</strong></p>
                        <p style="margin: 0; font-size: 0.85rem; color: var(--foreground-muted); line-height: 1.6;">Der Compiler prüft <strong>streng</strong>, ob diese Ausnahmen im Code abgefangen (<code style="background: rgba(0,0,0,0.2); padding: 0.1rem 0.3rem; border-radius: 3px;">CATCH</code>) oder im Methodenkopf (<code style="background: rgba(0,0,0,0.2); padding: 0.1rem 0.3rem; border-radius: 3px;">RAISING</code>) deklariert werden. <strong>Fehlt dies, kommt es zu einem Syntaxfehler</strong>.</p>
                    </div>

                    <!-- CX_DYNAMIC_CHECK -->
                    <div style="background: linear-gradient(to right, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.02)); border-left: 4px solid var(--color-warning); border-radius: 0 0.75rem 0.75rem 0; padding: 1.25rem;">
                        <h5 style="font-size: 1.05rem; font-weight: 800; color: var(--color-warning); margin: 0 0 0.75rem 0;">CX_DYNAMIC_CHECK</h5>
                        <p style="margin: 0 0 0.75rem 0; font-size: 0.95rem; line-height: 1.6;"><strong>Dynamische Prüfung – KANN passieren, muss aber nicht zwingend behandelt werden</strong></p>
                        <p style="margin: 0; font-size: 0.85rem; color: var(--foreground-muted); line-height: 1.6;">Diese Ausnahmen müssen nicht zwingend deklariert oder abgefangen werden. Werden sie jedoch zur <strong>Laufzeit ausgelöst und nicht abgefangen, stürzt das Programm mit einem Laufzeitfehler (Kurzdump) ab</strong>. Beispiel: Division durch Null (<code style="background: rgba(0,0,0,0.2); padding: 0.1rem 0.3rem; border-radius: 3px;">CX_SY_ZERODIVIDE</code>).</p>
                    </div>

                    <!-- CX_NO_CHECK -->
                    <div style="background: linear-gradient(to right, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.02)); border-left: 4px solid var(--color-danger); border-radius: 0 0.75rem 0.75rem 0; padding: 1.25rem;">
                        <h5 style="font-size: 1.05rem; font-weight: 800; color: var(--color-danger); margin: 0 0 0.75rem 0;">CX_NO_CHECK</h5>
                        <p style="margin: 0 0 0.75rem 0; font-size: 0.95rem; line-height: 1.6;"><strong>Keine Prüfung – Für kritische Systemfehler</strong></p>
                        <p style="margin: 0; font-size: 0.85rem; color: var(--foreground-muted); line-height: 1.6;">Für <strong>unvorhersehbare Systemfehler</strong> (z. B. Ressourcenengpässe, kritische Fehler). Sie <strong>dürfen nicht im Methodenkopf deklariert werden</strong> und werden <strong>automatisch bis zur obersten Instanz weitergeleitet</strong>.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- ═════════════════════════════════════════════════════════════════ -->
    <!-- ZUSAMMENFASSUNG -->
    <!-- ═════════════════════════════════════════════════════════════════ -->
    <div style="margin-top: 4rem; background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%); border: 2px solid rgba(139, 92, 246, 0.3); border-radius: 1.5rem; padding: 2.5rem; box-shadow: 0 10px 30px -15px rgba(0,0,0,0.2);">
        <h2 style="font-size: 1.75rem; font-weight: 900; color: var(--foreground); margin: 0 0 1.5rem 0; text-align: center;">📚 Klausurzusammenfassung</h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
            <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 1rem; padding: 1.75rem;">
                <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--color-primary); margin: 0 0 1.25rem 0;">🏗️ Architektur & Infrastruktur</h3>
                <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.95rem; line-height: 1.8;">
                    <li>3-Tier-Architecture: Präsentation, Applikation, Datenbank</li>
                    <li>DEV → QAS → PRD (Systemlandschaft)</li>
                    <li>Repository als zentrale Objektsammlung</li>
                </ul>
            </div>
            
            <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 1rem; padding: 1.75rem;">
                <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--color-success); margin: 0 0 1.25rem 0;">📋 Dictionary-Konzepte</h3>
                <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.95rem; line-height: 1.8;">
                    <li>Domäne = technische Eigenschaften</li>
                    <li>Datenelement = semantische Bedeutung</li>
                    <li>Tabellenfeld = konkrete Instanz</li>
                </ul>
            </div>
            
            <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 1rem; padding: 1.75rem;">
                <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--color-warning); margin: 0 0 1.25rem 0;">🔧 Modularisierung</h3>
                <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.95rem; line-height: 1.8;">
                    <li>Methoden (modern, OO)</li>
                    <li>Funktionsbausteine (global)</li>
                    <li>FORM-Routinen (obsolet)</li>
                </ul>
            </div>
            
            <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 1rem; padding: 1.75rem;">
                <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--color-secondary); margin: 0 0 1.25rem 0;">⚙️ ABAP Objects</h3>
                <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.95rem; line-height: 1.8;">
                    <li>Klasse = Bauplan, Objekt = Instanz</li>
                    <li>SE24 für globale Klassen</li>
                    <li>Klassenpools (nicht ausführbar)</li>
                </ul>
            </div>

            <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 1rem; padding: 1.75rem;">
                <h3 style="font-size: 1.15rem; font-weight: 800; color: #06b6d4; margin: 0 0 1.25rem 0;">🛡️ Exception-Handling</h3>
                <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.95rem; line-height: 1.8;">
                    <li>TRY...CATCH (strukturiert)</li>
                    <li>CX_STATIC_CHECK (müssen behandelt)</li>
                    <li>CX_DYNAMIC_CHECK (können auftreten)</li>
                </ul>
            </div>

            <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 1rem; padding: 1.75rem;">
                <h3 style="font-size: 1.15rem; font-weight: 800; color: #f97316; margin: 0 0 1.25rem 0;">🛠️ Workbench-Transaktionen</h3>
                <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.95rem; line-height: 1.8;">
                    <li>SE80 (Navigator), SE38 (Editor)</li>
                    <li>SE11 (Dictionary), SE24 (Classes)</li>
                    <li>SE37 (Function), SE41/51 (UI)</li>
                </ul>
            </div>
        </div>
        
        <div style="background: rgba(255,255,255,0.08); border-radius: 1rem; padding: 2rem; text-align: center; border: 1px solid rgba(255,255,255,0.1);">
            <p style="margin: 0; font-size: 1.15rem; font-weight: 700; color: var(--foreground); margin-bottom: 0.75rem;">💪 Viel Erfolg bei der Klausur!</p>
            <p style="margin: 0; font-size: 0.9rem; color: var(--foreground-muted);">Wiederholen Sie regelmäßig die Transaktionscodes und praktizieren Sie kleine Programme mit PARAMETERS und Ereignisblöcken!</p>
        </div>
    </div>
</div>',
    '',
    'article',
    'published',
    53,
    '2026-05-20 13:37:00',
    '2026-05-21 09:00:00'
);
