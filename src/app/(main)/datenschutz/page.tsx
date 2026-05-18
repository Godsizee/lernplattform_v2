import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Datenschutzerklärung - Lernplattform",
  description: "Informationen zum dsgvo-konformen Umgang mit deinen Daten auf unserer Lernplattform.",
}

export default function DatenschutzPage() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8 animate-fade-in">
      <header className="space-y-3.5 border-b border-border/60 pb-6">
        <div className="flex items-center gap-2.5 text-xs font-extrabold text-primary uppercase tracking-wider">
          <i className="ph-fill ph-shield-check text-base"></i> DSGVO & Datenschutz
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Datenschutzerklärung
        </h1>
        <p className="text-sm md:text-base text-muted font-medium">
          Sicherheit, Vertrauen und Transparenz im Umgang mit deinen persönlichen Lerndaten.
        </p>
      </header>

      <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 shadow-sm prose dark:prose-invert max-w-none space-y-8">
        <div>
          <h2 className="text-lg font-extrabold mb-3 flex items-center gap-2 text-foreground">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-primary/10 text-primary text-xs font-black">1</span>
            Verantwortlicher
          </h2>
          <div className="text-sm text-foreground/80 leading-relaxed bg-background/50 border border-border/50 rounded-xl p-4 space-y-1">
            <p className="font-bold text-foreground">Sebastian Bade</p>
            <p>Friedrich-Dürr-Str. 12, 68307 Mannheim</p>
            <p className="text-primary font-medium">eztokk@gmail.com</p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-extrabold mb-3 flex items-center gap-2 text-foreground">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-primary/10 text-primary text-xs font-black">2</span>
            Erhebung und Speicherung von Daten
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-foreground/90 mb-1">a) Server-Logfiles</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die dein Browser automatisch übermittelt. Dies sind: Browsertyp/-version, Betriebssystem, Referrer URL, Uhrzeit der Serveranfrage und IP-Adresse. Diese Daten sind technisch erforderlich und werden nicht mit anderen Datenquellen zusammengeführt.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground/90 mb-1">b) Benutzerkonten & Lernfortschritt</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Auf dieser Plattform legst du ein Nutzerkonto an, um deinen Lernfortschritt zu speichern. Dabei speichern wir deinen Namen, deine E-Mail-Adresse und ein verschlüsseltes Passwort. Wir verarbeiten diese Daten ausschließlich, um dir den Zugang zur Plattform zu ermöglichen und deinen individuellen Lern- und Quizfortschritt in unserer Datenbank zu sichern.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-extrabold mb-3 flex items-center gap-2 text-foreground">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-primary/10 text-primary text-xs font-black">3</span>
            Lokale Speicherung (LocalStorage) & Funktionale Cookies
          </h2>
          <p className="text-sm text-foreground/80 leading-relaxed mb-3">
            Diese Webseite verwendet <strong>keine Tracking-Cookies</strong> (wie z.B. Google Analytics). Für die Funktionalität nutzen wir den LocalStorage in deinem Browser. Dort speichern wir ausschließlich technisch notwendige Informationen:
          </p>
          <ul className="list-disc pl-5 text-sm text-foreground/80 space-y-1">
            <li>Deine visuellen Einstellungen (z.B. Dark Mode / Light Mode).</li>
          </ul>
          <p className="text-sm text-foreground/80 leading-relaxed mt-3 bg-primary/5 border border-primary/10 rounded-xl p-4">
            <strong>Hinweis zur Login-Funktion:</strong> Wenn du dich einloggst, verwendet Next-Auth einen sicheren, verschlüsselten Session-Cookie in deinem Browser. Dieser enthält deine Sitzungs-Token, um dich bei zukünftigen Besuchen automatisch eingeloggt zu halten. Dieser Cookie verfällt nach Ablauf der Sitzung oder wenn du dich ausloggst. Es findet kein websiteübergreifendes Tracking statt.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-extrabold mb-3 flex items-center gap-2 text-foreground">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-primary/10 text-primary text-xs font-black">4</span>
            Deine Rechte (DSGVO-Konformität)
          </h2>
          <p className="text-sm text-foreground/80 leading-relaxed">
            Du hast jederzeit das Recht auf unentgeltliche Auskunft über deine gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten. 
          </p>
          <p className="text-sm text-foreground/80 leading-relaxed mt-2.5">
            Um deinen Rechten nachzukommen, bieten wir dir in deinen <Link href="/profile" className="text-primary font-bold underline hover:text-primary/90">Profileinstellungen</Link> direkte, automatisierte Selbstbedienungs-Werkzeuge an:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="border border-border rounded-xl p-4 space-y-1.5 bg-background/30">
              <span className="font-bold text-xs text-primary uppercase tracking-wide flex items-center gap-1.5">
                <i className="ph-fill ph-download-simple"></i> Datenexport (Auskunft)
              </span>
              <p className="text-xs text-muted leading-relaxed">
                Lade all deine gespeicherten Profildaten, Lernfortschritte und Notizen mit einem Klick als strukturierte JSON-Datei herunter.
              </p>
            </div>
            <div className="border border-border rounded-xl p-4 space-y-1.5 bg-background/30">
              <span className="font-bold text-xs text-danger uppercase tracking-wide flex items-center gap-1.5">
                <i className="ph-fill ph-trash"></i> Konto löschen (Recht auf Vergessen)
              </span>
              <p className="text-xs text-muted leading-relaxed">
                Lösche dein Benutzerkonto und alle damit verbundenen Fortschrittsdaten unwiderruflich und rückstandslos aus unserer Datenbank.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex justify-end">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/95 text-white text-xs font-bold transition shadow-lg shadow-primary/10 flex items-center gap-1.5"
          >
            <i className="ph ph-house text-base"></i> Zurück zum Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
