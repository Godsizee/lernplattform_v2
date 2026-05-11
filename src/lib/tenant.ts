import prisma from "@/db/client"

export async function initUserTenant(userId: string) {
  // Check if the user already has subjects
  const subjectCount = await prisma.subject.count({
    where: { userId }
  })

  if (subjectCount > 0) {
    return // Already initialized
  }

  console.log(`Initializing tenant curriculum for user: ${userId}`)

  // Create default subjects
  const dbSubject = await prisma.subject.create({
    data: {
      userId,
      title: "Datenbanken (SQL)",
      color: "#3b82f6",
      icon: "ph-database",
    }
  })

  const bwlSubject = await prisma.subject.create({
    data: {
      userId,
      title: "BWL",
      color: "#10b981",
      icon: "ph-chart-bar",
    }
  })

  const sapSubject = await prisma.subject.create({
    data: {
      userId,
      title: "SAP ERP",
      color: "#f59e0b",
      icon: "ph-buildings",
    }
  })

  const javaSubject = await prisma.subject.create({
    data: {
      userId,
      title: "Java",
      color: "#ef4444",
      icon: "ph-coffee",
    }
  })

  const quizSubject = await prisma.subject.create({
    data: {
      userId,
      title: "SAP Academy Quiz Center",
      color: "#a855f7",
      icon: "ph-exam",
    }
  })

  // Create default lessons for Datenbanken (SQL)
  await prisma.lesson.createMany({
    data: [
      {
        subjectId: dbSubject.id,
        authorId: userId,
        title: "Einführung in SQL",
        type: "article",
        status: "published",
        sortOrder: 1,
        content: `<p>SQL steht für Structured Query Language. Mit <code>SELECT</code>-Statements rufen wir Daten aus der Datenbank ab.</p><div class="code-block"><pre><code>SELECT * FROM users;</code></pre></div>`,
        contentRaw: `# Einführung in SQL\n\nSQL steht für Structured Query Language. Mit \`SELECT\`-Statements rufen wir Daten aus der Datenbank ab.\n\n\`\`\`sql\nSELECT * FROM users;\n\`\`\``
      },
      {
        subjectId: dbSubject.id,
        authorId: userId,
        title: "SQL Joins verstehen",
        type: "article",
        status: "published",
        sortOrder: 2,
        content: `<p>Ein <code>INNER JOIN</code> kombiniert Datensätze aus zwei Tabellen, wenn die Join-Bedingung in beiden Tabellen erfüllt ist.</p><div class="code-block"><pre><code>SELECT users.name, user_progress.status \nFROM users \nINNER JOIN user_progress ON users.id = user_progress.user_id;</code></pre></div>`,
        contentRaw: `# SQL Joins verstehen\n\nEin \`INNER JOIN\` kombiniert Datensätze aus zwei Tabellen, wenn die Join-Bedingung in beiden Tabellen erfüllt ist.\n\n\`\`\`sql\nSELECT users.name, user_progress.status \nFROM users \nINNER JOIN user_progress ON users.id = user_progress.user_id;\n\`\`\``
      }
    ]
  })

  // Create default lessons for BWL
  await prisma.lesson.create({
    data: {
      subjectId: bwlSubject.id,
      authorId: userId,
      title: "Was ist BWL?",
      type: "article",
      status: "published",
      sortOrder: 1,
      content: `<p>Die Betriebswirtschaftslehre befasst sich mit wirtschaftlichen Vorgängen im Unternehmen. Ziel ist es, Ressourcen effizient einzusetzen.</p>`,
      contentRaw: `# Was ist BWL?\n\nDie Betriebswirtschaftslehre befasst sich mit wirtschaftlichen Vorgängen im Unternehmen. Ziel ist es, Ressourcen effizient einzusetzen.`
    }
  })

  // Create default lessons for SAP ERP
  await prisma.lesson.create({
    data: {
      subjectId: sapSubject.id,
      authorId: userId,
      title: "SAP ERP Navigation",
      type: "article",
      status: "published",
      sortOrder: 1,
      content: `<p>Die SAP GUI ist die Standard-Oberfläche. Wichtige Transaktionen für Administratoren sind z.B. <code>SU01</code> (Benutzerpflege) und <code>SE16N</code> (Tabellenanzeige).</p>`,
      contentRaw: `# SAP ERP Navigation\n\nDie SAP GUI ist die Standard-Oberfläche. Wichtige Transaktionen für Administratoren sind z.B. \`SU01\` (Benutzerpflege) und \`SE16N\` (Tabellenanzeige).`
    }
  })

  // Create default lessons for Java
  await prisma.lesson.create({
    data: {
      subjectId: javaSubject.id,
      authorId: userId,
      title: "Java Hello World",
      type: "article",
      status: "published",
      sortOrder: 1,
      content: `<p>Der klassische Einstieg in die objektorientierte Programmierung mit Java.</p><div class="code-block"><pre><code>public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World!");\n  }\n}</code></pre></div>`,
      contentRaw: `# Java Hello World\n\nDer klassische Einstieg in die objektorientierte Programmierung mit Java.\n\n\`\`\`java\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World!");\n  }\n}\n\`\`\``
    }
  })

  // Create default quiz for SAP Academy Quiz Center
  const quizQuestions = [
    {
      question: "Was bedeutet ERP?",
      options: {
        "A": "Enterprise Resource Planning",
        "B": "Efficient Resource Process",
        "C": "Enterprise Relation Program",
        "D": "Executive Resource Planning"
      },
      correct: "A",
      type: "radio"
    },
    {
      question: "Welche Transaktion öffnet die Benutzerpflege (SU01) in SAP?",
      options: {
        "A": "SU01",
        "B": "SE16N",
        "C": "PFCG",
        "D": "SM30"
      },
      correct: "A",
      type: "radio"
    },
    {
      question: "Wofür steht die Transaktion SE16N?",
      options: {
        "A": "Allgemeine Tabellenanzeige",
        "B": "Rollenverwaltung",
        "C": "Job-Übersicht",
        "D": "System-Logbuch"
      },
      correct: "A",
      type: "radio"
    }
  ]

  await prisma.lesson.create({
    data: {
      subjectId: quizSubject.id,
      authorId: userId,
      title: "Quiz: SAP Grundlagen - Basics",
      type: "quiz",
      status: "published",
      sortOrder: 1,
      content: `<p>Testen Sie Ihr Wissen über die Grundlagen von SAP ERP und der Systemsteuerung.</p>`,
      contentRaw: JSON.stringify(quizQuestions)
    }
  })

  console.log(`Tenant curriculum initialized successfully for user: ${userId}`)
}
