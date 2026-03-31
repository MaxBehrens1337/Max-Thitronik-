// ============================================
// THITRONIK Seed Data (Content Migration V8)
// Alle Pilot-Module inkl. "Fehlersuche" (Modul 4)
// ============================================

export const seedUsers = [
  { id: 'u1', email: 'admin@thitronik.de', password: 'admin123', firstName: 'Admin', lastName: 'Thitronik', role: 'admin', active: true },
  { id: 'u2', email: 'trainer@thitronik.de', password: 'trainer123', firstName: 'Thomas', lastName: 'Schulz', role: 'trainer', active: true },
  { id: 'u3', email: 'monteur@thitronik.de', password: 'monteur123', firstName: 'Max', lastName: 'Weber', role: 'learner', active: true },
  { id: 'u4', email: 'partner@thitronik.de', password: 'partner123', firstName: 'Anna', lastName: 'Fischer', role: 'learner', active: true },
];

export const seedCourses = [
  { id: 'c1', title: 'Allgemeine Fragen', slug: 'allgemeinefragen', status: 'published', sortOrder: 1, icon: '📋', questionCount: 5, hasVideo: false, hasImages: false },
  
  // Pilot 4: CAN-Bus
  { 
    id: 'c2', title: 'CAN-Bus', slug: 'canbus', status: 'published', sortOrder: 2, icon: '🔌', questionCount: 5, hasVideo: true, hasImages: true,
    intro: 'Alles rund um das Thema CAN-Bus und wie THITRONIK Alarmsysteme damit interagieren. Inklusive Erklärvideo!',
    learningGoals: [
      'Verstehen, was der CAN-Bus im Wohnmobil macht',
      'Erkennen, welche Fahrzeugtüren überwacht werden',
      'Wissen, wie nicht-CAN-Bus-überwachte Bauteile abzusichern sind'
    ]
  },
  
  // Pilot 1: Fahrzeugübergabe
  { 
    id: 'c3', title: 'Fahrzeugübergabe', slug: 'fahrzeuguebergabe', status: 'published', sortOrder: 3, icon: '📱', questionCount: 5, hasVideo: true, hasImages: true,
    intro: 'Lerne, wie du das ausgerüstete Fahrzeug korrekt und sicher an den Endkunden übergibst. Inklusive Video-Schulung!',
    learningGoals: [
      'Einweisung des Kunden in die Grundfunktionen',
      'Verwendung von Hilfsmitteln bei der Übergabe',
      'Dokumentation und Absicherung des Übergabeprozesses'
    ]
  },

  // Pilot 5: Fehlersuche
  { 
    id: 'c4', title: 'Fehlersuche', slug: 'fehlersuche', status: 'published', sortOrder: 5, icon: '🔍', questionCount: 6, hasVideo: false, hasImages: true,
    intro: 'Der Blick für Details! Erkennst du Einbaufehler auf den ersten Blick?',
    learningGoals: [
      'Gefahren fehlerhafter Verkabelung verstehen',
      'Magnetkontakte korrekt ausrichten und verkleben',
      'Optische Mängel auf Fotos sofort erkennen (Multiple Choice Praxis)'
    ]
  },
  
  // Pilot 2: Gelverbinder
  { 
    id: 'c6', title: 'Gelverbinder', slug: 'gelverbinder', status: 'published', sortOrder: 4, icon: '🔧', questionCount: 4, hasVideo: true, hasImages: true,
    intro: 'Wichtige Regeln zur fachgerechten Verwendung von Gelverbindern im KFZ-Bereich. Vor der Prüfung bitte das Schulungsvideo ansehen.',
    learningGoals: [
      'Erkennen, wann und wo Gelverbinder eingesetzt werden dürfen',
      'Die Verarbeitung fachgerecht und sauber umsetzen',
      'Spezifische Fehlerbilder anhand von Fotos zuordnen können'
    ]
  },
  
  // Pilot 3: Konfigurator
  { 
    id: 'c8', title: 'Konfigurator', slug: 'konfigurator', status: 'published', sortOrder: 8, icon: '⚙️', questionCount: 5, hasVideo: true, hasImages: true,
    intro: 'Bedienung und Nutzung des THITRONIK Konfigurators. Lerne wie du Angebote sicher kalkulierst.',
    learningGoals: [
      'Lerne, was der Konfigurator ist und wo du ihn findest',
      'Verstehe, wie Zubehörteile eingerechnet werden',
      'Optimiere den Verkaufs-Prozess durch direkte Angebots-Versendung'
    ]
  },

  // Platzhalter
  { id: 'c5', title: 'Funkzubehör', slug: 'funkzubehoer', status: 'placeholder', sortOrder: 6, icon: '📡' },
  { id: 'c7', title: 'Grundlagen', slug: 'grundlagen', status: 'incomplete', sortOrder: 7, icon: '📚' },
  { id: 'c9', title: 'Magnet & Montageadapter', slug: 'magnet-montageadapter', status: 'placeholder', sortOrder: 9, icon: '🧲' },
  { id: 'c10', title: 'Mercedes Sprinter VS30', slug: 'mb-sprinter-vs30', status: 'incomplete', sortOrder: 10, icon: '🚐' },
  { id: 'c11', title: 'Pro-finder', slug: 'pro-finder', status: 'placeholder', sortOrder: 11, icon: '📍' },
  { id: 'c12', title: 'THITRONIK Testfragen', slug: 'thitronik-test1', status: 'placeholder', sortOrder: 12, icon: '✅' },
  { id: 'c13', title: 'WiPro', slug: 'wipro', status: 'placeholder', sortOrder: 13, icon: '🛡️' },
];

export const seedLessons = [
  { id: 'l1', courseId: 'c1', title: 'Allgemeine Fragen Inhalte', status: 'published', sortOrder: 1 },
  { 
    id: 'l2', courseId: 'c2', title: 'Canbus Inhalte', status: 'published', sortOrder: 1,
    videoUrl: '/Can-Bus/welche_fahrzeugtüren_werden_vom_can-bus_überwacht_v1 (1080p).mp4'
  },
  { 
    id: 'l3', courseId: 'c3', title: 'Fahrzeugübergabe Inhalte', status: 'published', sortOrder: 1,
    videoUrl: '/Fahrzeugübergabe/wie_übergebe_ich_das_fahrzeug_an_den_kunden_v1 (1080p).mp4'
  },
  { 
    id: 'l4', courseId: 'c4', title: 'Fehlersuche Inhalte', status: 'published', sortOrder: 1,
    videoUrl: null
  },
  { 
    id: 'l6', courseId: 'c6', title: 'Gelverbinder Inhalte', status: 'published', sortOrder: 1,
    videoUrl: '/Gelverbinder/2.4 Gelverbinder.m4v'
  },
  { 
    id: 'l8', courseId: 'c8', title: 'Konfigurator Inhalte', status: 'published', sortOrder: 1,
    videoUrl: '/Konfigurator/wie_benutze_ich_den_thitronik®__konfigurator_richtig_v1 (1080p).mp4'
  },
];

export const seedQuestions = [
  {
    id: 'q_m1_1', lessonId: 'l1', courseId: 'c1', type: 'single', 
    question: 'Woher weiß ich, wie lange ich für den Einbau der THITRONIK® Produkte benötige?',
    answers: ['Website Info', 'Kollege fragen'],
    correctAnswers: ['Website Info'], explanation: ''
  },
  
  // --- Modul 2 (CAN-Bus) ---
  {
    id: 'q_m2_1', lessonId: 'l2', courseId: 'c2', type: 'single', question: 'Was ist der Can-Bus?',
    answers: ['/Can-Bus/Frage 1 Was ist der Can-Bus Richtige Antwort.webp', '/Can-Bus/Frage 1 Was ist der Can-Bus Falsche Antwort.webp', '/Can-Bus/Frage 1 Was ist der Can-Bus Falsche Antwort 2.webp'],
    correctAnswers: ['/Can-Bus/Frage 1 Was ist der Can-Bus Richtige Antwort.webp'],
    explanation: 'Der CAN-Bus ist das zentrale Kommunikationsnetzwerk im Fahrzeug, über das Steuergeräte und Sensoren (wie z.B. Türen) miteinander "sprechen".'
  },
  {
    id: 'q_m2_2', lessonId: 'l2', courseId: 'c2', type: 'single', question: 'Wozu benötigt die Wipro III den Can-Bus?',
    answers: ['/Can-Bus/Frage 2 Wozu benötigt die Wipro III den Can-Bus Richtige Antwort.webp', '/Can-Bus/Frage 2 Wozu benötigt die Wipro III den Can-Bus falsche Antwort.webp', '/Can-Bus/Frage 2 Wozu benötigt die Wipro III den Can-Bus falsche Antwort 2.webp'],
    correctAnswers: ['/Can-Bus/Frage 2 Wozu benötigt die Wipro III den Can-Bus Richtige Antwort.webp'],
    explanation: 'Die Wipro III wertet die CAN-Bus Daten aus, um Informationen wie Türzustände direkt und sicher auszulesen, ohne eigene Türkontakte verlegen zu müssen.'
  },
  {
    id: 'q_m2_3', lessonId: 'l2', courseId: 'c2', type: 'single', question: 'Wo werden Dir Can-Bus überwachte Türen angezeigt?',
    answers: ['/Can-Bus/Frage 3 Wo werden Dir Can-Bus überwachte Türen angezeigt Richtige Antwort.webp', '/Can-Bus/Frage 3 Wo werden Dir Can-Bus überwachte Türen angezeigt falsche Antwort.webp', '/Can-Bus/Frage 3 Wo werden Dir Can-Bus überwachte Türen angezeigt falsche Antwort 2.webp'],
    correctAnswers: ['/Can-Bus/Frage 3 Wo werden Dir Can-Bus überwachte Türen angezeigt Richtige Antwort.webp'],
    explanation: 'Die überwachten Türen werden in der Tachoeinheit (Multifunktionsdisplay) des Basisfahrzeugs visuell angezeigt, wenn sie geöffnet sind.'
  },
  {
    id: 'q_m2_4', lessonId: 'l2', courseId: 'c2', type: 'single', question: 'Wie kannst Du prüfen, welche Tür vom Can-Bus überwacht wird?',
    answers: ['/Can-Bus/Frage 4 Wie kannst Du prüfen, welche Tür vom Can-Bus überwacht wird Richtige Antwort.webp', '/Can-Bus/Frage 4 Wie kannst Du prüfen, welche Tür vom Can-Bus überwacht wird falsche Antwort.webp', '/Can-Bus/Frage 4 Wie kannst Du prüfen, welche Tür vom Can-Bus überwacht wird falsche Antwort 2.webp'],
    correctAnswers: ['/Can-Bus/Frage 4 Wie kannst Du prüfen, welche Tür vom Can-Bus überwacht wird Richtige Antwort.webp'],
    explanation: 'Bei Zündung AN werden CAN-Bus überwachte Türen als "geöffnet" im Fahrzeug-Display angezeigt, wenn man sie aufmacht.'
  },
  {
    id: 'q_m2_5', lessonId: 'l2', courseId: 'c2', type: 'single', question: 'Wie kann ich eine Tür absichern, die nicht vom Can-Bus überwacht wird?',
    answers: ['/Can-Bus/Frage 5 Wie kann ich eine Tür absichern, die nicht vom Can-Bus überwacht wird Richtige Antwort.webp', '/Can-Bus/Frage 5 Wie kann ich eine Tür absichern, die nicht vom Can-Bus überwacht wird falsche Antwort.webp', '/Can-Bus/Frage 5 Wie kann ich eine Tür absichern, die nicht vom Can-Bus überwacht wird falsche Antwort 2.webp'],
    correctAnswers: ['/Can-Bus/Frage 5 Wie kann ich eine Tür absichern, die nicht vom Can-Bus überwacht wird Richtige Antwort.webp'],
    explanation: 'Dafür nutzt du unsere Thitronik Funk-Magnetkontakte, die du völlig drahtlos z.B. an Aufbautüren anbringen kannst.'
  },

  // --- Modul 3 (Fahrzeugübergabe) ---
  {
    id: 'q_m3_1', lessonId: 'l3', courseId: 'c3', type: 'single', question: 'Was sollte nach jeder erfolgreichen Montage eines Thitronik Systems als erstes erfolgen?',
    answers: ['/Fahrzeugübergabe/Frage 1 Was sollte nach jeder erfolgreichen Montage eines Thitronik Systems als erstes erfolgen Richtige Antwort.webp', '/Fahrzeugübergabe/Frage 1 Was sollte nach jeder erfolgreichen Montage eines Thitronik Systems als erstes erfolgen falsche Antwort.webp', '/Fahrzeugübergabe/Frage 1 Was sollte nach jeder erfolgreichen Montage eines Thitronik Systems als erstes erfolgen falsche Antwort 2.webp'],
    correctAnswers: ['/Fahrzeugübergabe/Frage 1 Was sollte nach jeder erfolgreichen Montage eines Thitronik Systems als erstes erfolgen Richtige Antwort.webp'],
    explanation: 'Nach der Montage ist ein kompletter Funktionstest des Systems obligatorisch, bevor der Kunde eingewiesen wird.'
  },
  {
    id: 'q_m3_2', lessonId: 'l3', courseId: 'c3', type: 'single', question: 'Welche Hilfsmittel kann ich nutzen, beispielsweise um für eine möglichst präzise Übergabe zu sorgen?',
    answers: ['/Fahrzeugübergabe/Frage 2 Welche Hilfsmittel kann ich nutzen, beispielsweise um für eine möglichst präzise Übergabe zu sorgen Richtige Antwort.webp', '/Fahrzeugübergabe/Frage 2 Welche Hilfsmittel kann ich nutzen, beispielsweise um für eine möglichst präzise Übergabe zu sorgen falsche Antwort.webp', '/Fahrzeugübergabe/Frage 2 Welche Hilfsmittel kann ich nutzen, beispielsweise um für eine möglichst präzise Übergabe zu sorgen falsche Antwort 2.webp'],
    correctAnswers: ['/Fahrzeugübergabe/Frage 2 Welche Hilfsmittel kann ich nutzen, beispielsweise um für eine möglichst präzise Übergabe zu sorgen Richtige Antwort.webp'],
    explanation: 'Ein standardisiertes Übergabeprotokoll stellt sicher, dass kein wichtiger Punkt vergessen wurde.'
  },
  {
    id: 'q_m3_3', lessonId: 'l3', courseId: 'c3', type: 'single', question: 'Welche zusätzlichen Informationen solltest du immer auf den Thitronik Kurzanleitungen vermerken?',
    answers: ['/Fahrzeugübergabe/Frage 3 Welche zusätzlichen Informationen solltest du immer auf den Thitronik Kurzanleitungen vermerken Richtige Antwort.webp', '/Fahrzeugübergabe/Frage 3 Welche zusätzlichen Informationen solltest du immer auf den Thitronik Kurzanleitungen vermerken falsche Antwort.webp', '/Fahrzeugübergabe/Frage 3 Welche zusätzlichen Informationen solltest du immer auf den Thitronik Kurzanleitungen vermerken falsche Antwort 2.webp'],
    correctAnswers: ['/Fahrzeugübergabe/Frage 3 Welche zusätzlichen Informationen solltest du immer auf den Thitronik Kurzanleitungen vermerken Richtige Antwort.webp'],
    explanation: 'Zusätzliche Kontaktdaten oder Service-Nummern deines Betriebs schaffen Vertrauen und helfen dem Kunden.'
  },
  {
    id: 'q_m3_4', lessonId: 'l3', courseId: 'c3', type: 'single', question: 'Wie können sich Kunden über weitere Funktionen und Nutzungsmöglichkeiten von Thitronik Produkten informieren?',
    answers: ['/Fahrzeugübergabe/Frage 4 Wie können sich Kunden über weitere Funktionen und Nutzungsmöglichkeiten von Thitronik Produkten infomieren Richtige Antwort.webp', '/Fahrzeugübergabe/Frage 4 Wie können sich Kunden über weitere Funktionen und Nutzungsmöglichkeiten von Thitronik Produkten infomieren falsche Antwort.webp', '/Fahrzeugübergabe/Frage 4 Wie können sich Kunden über weitere Funktionen und Nutzungsmöglichkeiten von Thitronik Produkten infomieren falsche Antwort 2.webp'],
    correctAnswers: ['/Fahrzeugübergabe/Frage 4 Wie können sich Kunden über weitere Funktionen und Nutzungsmöglichkeiten von Thitronik Produkten infomieren Richtige Antwort.webp'],
    explanation: 'Über die offiziellen Thitronik Erklärvideos, die Thitronik App und das ausführliche Handbuch.'
  },
  {
    id: 'q_m3_5', lessonId: 'l3', courseId: 'c3', type: 'single', question: 'Welches Ziel musst du unbedingt erreicht haben, wenn du das Fahrzeug nach dem Einbau an Deinen Kunden übergeben hast?',
    answers: ['/Fahrzeugübergabe/Frage 5 Welches Ziel musst du unbedingt erreicht haben, wenn du das Fahrzeug nach dem Einbau an Deinen Kunden übergeben hast Richtige Antwort.webp', '/Fahrzeugübergabe/Frage 5 Welches Ziel musst du unbedingt erreicht haben, wenn du das Fahrzeug nach dem Einbau an Deinen Kunden übergeben hast falsche Antwort.webp', '/Fahrzeugübergabe/Frage 5 Welches Ziel musst du unbedingt erreicht haben, wenn du das Fahrzeug nach dem Einbau an Deinen Kunden übergeben hast falsche Antwort 2.webp'],
    correctAnswers: ['/Fahrzeugübergabe/Frage 5 Welches Ziel musst du unbedingt erreicht haben, wenn du das Fahrzeug nach dem Einbau an Deinen Kunden übergeben hast Richtige Antwort.webp'],
    explanation: 'Der Kunde muss sich im Umgang mit dem System vollkommen sicher fühlen und die Grundfunktionen verstanden haben.'
  },

  // --- Modul 4 (Fehlersuche) MULTIPLE CHOICE ---
  {
    id: 'q_m4_1', lessonId: 'l4', courseId: 'c4', type: 'multiple', 
    question: 'Bei welchen UB2A-Gelverbindern liegt keine einwandfreie Installation vor?',
    answers: [
      '/Fehlersuche/Frage 1 Bei welchem UB2A-Gelverbindern liegt keine einwandfrei Installation vor Richtige Antwort 1.webp',
      '/Fehlersuche/Frage 1 Bei welchem UB2A-Gelverbindern liegt keine einwandfrei Installation vor Richtige Antwort 2.webp',
      '/Fehlersuche/Frage 1 Bei welchem UB2A-Gelverbindern liegt keine einwandfrei Installation vor Richtige Antwort 3.webp',
      '/Fehlersuche/Frage 1 Bei welchem UB2A-Gelverbindern liegt keine einwandfrei Installation vor Richtige Antwort 4.webp',
      '/Fehlersuche/Frage 1 Bei welchem UB2A-Gelverbindern liegt keine einwandfrei Installation vor falsche Antwort.webp'
    ],
    correctAnswers: [
      '/Fehlersuche/Frage 1 Bei welchem UB2A-Gelverbindern liegt keine einwandfrei Installation vor Richtige Antwort 1.webp',
      '/Fehlersuche/Frage 1 Bei welchem UB2A-Gelverbindern liegt keine einwandfrei Installation vor Richtige Antwort 2.webp',
      '/Fehlersuche/Frage 1 Bei welchem UB2A-Gelverbindern liegt keine einwandfrei Installation vor Richtige Antwort 3.webp',
      '/Fehlersuche/Frage 1 Bei welchem UB2A-Gelverbindern liegt keine einwandfrei Installation vor Richtige Antwort 4.webp'
    ],
    explanation: 'Hier sind vier fehlerhafte (schlecht gecrimpte / abgeknickte) Bilder die "richtigen" Antworten auf die Fragestellung!'
  },
  {
    id: 'q_m4_2', lessonId: 'l4', courseId: 'c4', type: 'multiple', 
    question: 'Welche Funk-Magnetkontakte wurden korrekt installiert?',
    answers: [
      '/Fehlersuche/Frage 2 Welche Funk-Magnetkontakte wurden korrekt installiert Richtige Antwort.webp',
      '/Fehlersuche/Frage 2 Welche Funk-Magnetkontakte wurden korrekt installiert Richtige Antwort 2.webp',
      '/Fehlersuche/Frage 2 Welche Funk-Magnetkontakte wurden korrekt installiert falsche Antwort 1.webp',
      '/Fehlersuche/Frage 2 Welche Funk-Magnetkontakte wurden korrekt installiert falsche Antwort 2.webp',
      '/Fehlersuche/Frage 2 Welche Funk-Magnetkontakte wurden korrekt installiert falsche Antwort 3.webp',
      '/Fehlersuche/Frage 2 Welche Funk-Magnetkontakte wurden korrekt installiert falsche Antwort 4.webp',
      '/Fehlersuche/Frage 2 Welche Funk-Magnetkontakte wurden korrekt installiert falsche Antwort 5.webp'
    ],
    correctAnswers: [
      '/Fehlersuche/Frage 2 Welche Funk-Magnetkontakte wurden korrekt installiert Richtige Antwort.webp',
      '/Fehlersuche/Frage 2 Welche Funk-Magnetkontakte wurden korrekt installiert Richtige Antwort 2.webp'
    ],
    explanation: 'Achte auf den korrekten Montageabstand (Spaltmaß) zur Gegenkante und Positionierung an den Kanten.'
  },
  {
    id: 'q_m4_3', lessonId: 'l4', courseId: 'c4', type: 'multiple', 
    question: 'Wie sollte die Verkabelung nach dem Einbau der Thitronik Komponenten idealerweise nicht aussehen?',
    answers: [
      '/Fehlersuche/Frage 3 Wie sollte die Verkabelung nach dem Einbau der Thitronik Komponenten idealerweise nicht aussehen  Richtige Antwort 1.webp',
      '/Fehlersuche/Frage 3 Wie sollte die Verkabelung nach dem Einbau der Thitronik Komponenten idealerweise nicht aussehen  Richtige Antwort 2.webp',
      '/Fehlersuche/Frage 3 Wie sollte die Verkabelung nach dem Einbau der Thitronik Komponenten idealerweise nicht aussehen  Richtige Antwort 3.webp',
      '/Fehlersuche/Frage 3 Wie sollte die Verkabelung nach dem Einbau der Thitronik Komponenten idealerweise nicht aussehen  Richtige Antwort 4.webp',
      '/Fehlersuche/Frage 3 Wie sollte die Verkabelung nach dem Einbau der Thitronik Komponenten idealerweise nicht aussehen  Richtige Antwort 5.webp',
      '/Fehlersuche/Frage 3 Wie sollte die Verkabelung nach dem Einbau der Thitronik Komponenten idealerweise nicht aussehen  falsche Antwort 1.webp'
    ],
    correctAnswers: [
      '/Fehlersuche/Frage 3 Wie sollte die Verkabelung nach dem Einbau der Thitronik Komponenten idealerweise nicht aussehen  Richtige Antwort 1.webp',
      '/Fehlersuche/Frage 3 Wie sollte die Verkabelung nach dem Einbau der Thitronik Komponenten idealerweise nicht aussehen  Richtige Antwort 2.webp',
      '/Fehlersuche/Frage 3 Wie sollte die Verkabelung nach dem Einbau der Thitronik Komponenten idealerweise nicht aussehen  Richtige Antwort 3.webp',
      '/Fehlersuche/Frage 3 Wie sollte die Verkabelung nach dem Einbau der Thitronik Komponenten idealerweise nicht aussehen  Richtige Antwort 4.webp',
      '/Fehlersuche/Frage 3 Wie sollte die Verkabelung nach dem Einbau der Thitronik Komponenten idealerweise nicht aussehen  Richtige Antwort 5.webp'
    ],
    explanation: 'Lose hängende Kabelstränge und Kabelsalat (Spider-Web) sind potenzielle Fehlerquellen und ein Tabu beim Einbau!'
  },
  {
    id: 'q_m4_4', lessonId: 'l4', courseId: 'c4', type: 'multiple', 
    question: 'Wie darf die Verklebung der Funk Magnetkontakte nicht erfolgen, damit Halt und Funktion dauerhaft sichergestellt sind?',
    answers: [
      '/Fehlersuche/Frage 4 Wie darf die Verklebung der Funk Magnetkontakte nicht erfolgen, damit Halt und Funktion dauerhaft sichergestellt sind Richtige Antwort 1.webp',
      '/Fehlersuche/Frage 4 Wie darf die Verklebung der Funk Magnetkontakte nicht erfolgen, damit Halt und Funktion dauerhaft sichergestellt sind Richtige Antwort 2.webp',
      '/Fehlersuche/Frage 4 Wie darf die Verklebung der Funk Magnetkontakte nicht erfolgen, damit Halt und Funktion dauerhaft sichergestellt sind Richtige Antwort 3.webp',
      '/Fehlersuche/Frage 4 Wie darf die Verklebung der Funk Magnetkontakte nicht erfolgen, damit Halt und Funktion dauerhaft sichergestellt sind Falsche Antwort.webp'
    ],
    correctAnswers: [
      '/Fehlersuche/Frage 4 Wie darf die Verklebung der Funk Magnetkontakte nicht erfolgen, damit Halt und Funktion dauerhaft sichergestellt sind Richtige Antwort 1.webp',
      '/Fehlersuche/Frage 4 Wie darf die Verklebung der Funk Magnetkontakte nicht erfolgen, damit Halt und Funktion dauerhaft sichergestellt sind Richtige Antwort 2.webp',
      '/Fehlersuche/Frage 4 Wie darf die Verklebung der Funk Magnetkontakte nicht erfolgen, damit Halt und Funktion dauerhaft sichergestellt sind Richtige Antwort 3.webp'
    ],
    explanation: 'Das Klebepad muss stets vollflächig und nicht partiell aufliegen.'
  },
  {
    id: 'q_m4_5', lessonId: 'l4', courseId: 'c4', type: 'single', 
    question: 'Was gibt es bei der Funktion der beiden Tasten auf dem Funk-Handsender zu beachten?',
    answers: [
      '/Fehlersuche/Frarge 5 Was gibt es bei der Funktion der beiden Tasten auf dem Funk-Handsender zu beachten Richtige Antwort 1.webp',
      '/Fehlersuche/Frarge 5 Was gibt es bei der Funktion der beiden Tasten auf dem Funk-Handsender zu beachten Falsche Antwort 1.webp',
      '/Fehlersuche/Frarge 5 Was gibt es bei der Funktion der beiden Tasten auf dem Funk-Handsender zu beachten Falsche Antwort 2.webp',
      '/Fehlersuche/Frarge 5 Was gibt es bei der Funktion der beiden Tasten auf dem Funk-Handsender zu beachten Falsche Antwort 3.webp'
    ],
    correctAnswers: [
      '/Fehlersuche/Frarge 5 Was gibt es bei der Funktion der beiden Tasten auf dem Funk-Handsender zu beachten Richtige Antwort 1.webp'
    ],
    explanation: 'Auf die genaue Belegung der Kanäle achten!'
  },
  {
    id: 'q_m4_6', lessonId: 'l4', courseId: 'c4', type: 'single', 
    question: 'Wo sollte das G.A.S verbaut sein, damit es optimal funktioniert?',
    answers: [
      '/Fehlersuche/Frage 6 Wo sollte das G.A.S verbaut sein, damit es optimal funktioniert richtige antwort 1.jpg',
      '/Fehlersuche/Frage 6 Wo sollte das G.A.S verbaut sein, damit es optimal funktioniert Falsche antwort 1.jpg',
      '/Fehlersuche/Frage 6 Wo sollte das G.A.S verbaut sein, damit es optimal funktioniert Falsche antwort 2.jpg',
      '/Fehlersuche/Frage 6 Wo sollte das G.A.S verbaut sein, damit es optimal funktioniert Falsche antwort 3.jpg'
    ],
    correctAnswers: [
      '/Fehlersuche/Frage 6 Wo sollte das G.A.S verbaut sein, damit es optimal funktioniert richtige antwort 1.jpg'
    ],
    explanation: 'Das G.A.S muss stets im Boden- bzw. Schwellerbereich installiert sein, da die spezifischen Gase schwerer als Luft sind und sich unten sammeln.'
  },

  // --- Modul 6 (Gelverbinder) ---
  {
    id: 'q_m6_1', lessonId: 'l6', courseId: 'c6', type: 'single', question: 'Wozu dienen Gelverbinder?',
    answers: ['/Gelverbinder/wozu dienen Gelverbinder richtig.webp', '/Gelverbinder/Wozu dienen Gelverbinder falsch.webp', '/Gelverbinder/Wozu dienen Gelverbinder falsch 2.webp'],
    correctAnswers: ['/Gelverbinder/wozu dienen Gelverbinder richtig.webp'],
    explanation: 'Gelverbinder durchdringen die Isolierung von selbst und sind explizit für Kleinspannungs-Netze (12V) im Feuchtbereich konzipiert.'
  },
  {
    id: 'q_m6_2', lessonId: 'l6', courseId: 'c6', type: 'single', question: 'Worauf solltest du bei der Verarbeitung der Gelverbinder besonders achten?',
    answers: ['/Gelverbinder/Frage 2 Worauf solltest du bei der Verarbeitung der Gelverbinder besonders achten Richtige Antwort.webp', '/Gelverbinder/Frage 2 Worauf solltest du bei der Verarbeitung der Gelverbinder besonders achten falsche Antwort.webp', '/Gelverbinder/Frage 2 Worauf solltest du bei der Verarbeitung der Gelverbinder besonders achten falsche Antwort 2.webp'],
    correctAnswers: ['/Gelverbinder/Frage 2 Worauf solltest du bei der Verarbeitung der Gelverbinder besonders achten Richtige Antwort.webp'],
    explanation: 'Der Gelverbinder muss korrekt platziert und verquetscht werden, ohne das Kabel stark abzuknicken.'
  },
  {
    id: 'q_m6_3', lessonId: 'l6', courseId: 'c6', type: 'single', question: 'Worauf musst du beim Crimpen von Gelverbindern stets achten?',
    answers: ['/Gelverbinder/Frage 3 Worauf musst du beim Crimpen von Gelverbindern stets achten Richtige antwort.webp', '/Gelverbinder/Frage 3 Worauf musst du beim Crimpen von Gelverbindern stets achten falsche antwort.webp', '/Gelverbinder/Frage 3 Worauf musst du beim Crimpen von Gelverbindern stets achten falsche antwort 2.webp'],
    correctAnswers: ['/Gelverbinder/Frage 3 Worauf musst du beim Crimpen von Gelverbindern stets achten Richtige antwort.webp'],
    explanation: 'Beim Crimpen immer darauf achten, dass die Adern tief genug eingeführt sind und das Gel sie korrekt umschließt.'
  },
  {
    id: 'q_m6_4', lessonId: 'l6', courseId: 'c6', type: 'single', question: 'Welches Werkzeug empfehlen wir für eine präzise und einfache Verarbeitung von Gelverbindern?',
    answers: ['/Gelverbinder/Frage 4 Welches Werkzeug empehlen wir für eine präzise und einfache Verarbeitung von Gelverbindern Richtige Antwort.webp', '/Gelverbinder/Frage 4 Welches Werkzeug empehlen wir für eine präzise und einfache Verarbeitung von Gelverbindern falsche Antwort.webp', '/Gelverbinder/Frage 4 Welches Werkzeug empehlen wir für eine präzise und einfache Verarbeitung von Gelverbindern falsche Antwort 2.webp'],
    correctAnswers: ['/Gelverbinder/Frage 4 Welches Werkzeug empehlen wir für eine präzise und einfache Verarbeitung von Gelverbindern Richtige Antwort.webp'],
    explanation: 'Für den optimalen Anpressdruck empfehlen wir immer das genormte Crimpwerkzeug, keine herkömmliche Kombizange.'
  },

  // --- Modul 8 (Konfigurator) ---
  {
    id: 'q_m8_1', lessonId: 'l8', courseId: 'c8', type: 'single', question: 'Was ist der Thitronik Konfigurator?',
    answers: ['/Konfigurator/Frage 1 Was ist der Thitronik Konfigurator Richtige Antwort.webp', '/Konfigurator/Frage 1 Was ist der Konfigurator Falsche Antwort.webp', '/Konfigurator/Frage 1 Was ist der Thitronik Konfigurator Falsche Antwort 2.webp'],
    correctAnswers: ['/Konfigurator/Frage 1 Was ist der Thitronik Konfigurator Richtige Antwort.webp'],
    explanation: 'Der Konfigurator hilft dir bei der Fahrzeugspezifischen Zusammenstellung passender Alarmsysteme.'
  },
  {
    id: 'q_m8_2', lessonId: 'l8', courseId: 'c8', type: 'single', question: 'Wo findest du den Thitronik Konfigurator?',
    answers: ['/Konfigurator/Frage 2 Wo findest du den Thitronik Konfigurator richtige Antwort.webp', '/Konfigurator/Frage 2 Wo findest du den Thitronik Konfigurator falsche Antwort.webp', '/Konfigurator/Frage 2 Wo findest du den Thitronik Konfigurator falsche Antwort 2.webp'],
    correctAnswers: ['/Konfigurator/Frage 2 Wo findest du den Thitronik Konfigurator richtige Antwort.webp'],
    explanation: 'Er ist direkt auf der offiziellen Thitronik Website integriert.'
  },
  {
    id: 'q_m8_3', lessonId: 'l8', courseId: 'c8', type: 'single', question: 'Werden im Thitronik Konfigurator auch eventuell nötige Zubehörteile berücksichtigt?',
    answers: ['/Konfigurator/Frage 3 Werden im Thitronik Konfigurator auch eventuell nötige Zubehörteile berücksichtigt Richtige Antwort.webp', '/Konfigurator/Frage 3 Werden im Thitronik Konfigurator auch eventuell nötige Zubehörteile berücksichtigt falsche Antwort.webp', '/Konfigurator/Frage 3 Werden im Thitronik Konfigurator auch eventuell nötige Zubehörteile berücksichtigt falsche Antwort 2.webp'],
    correctAnswers: ['/Konfigurator/Frage 3 Werden im Thitronik Konfigurator auch eventuell nötige Zubehörteile berücksichtigt Richtige Antwort.webp'],
    explanation: 'Ja, das System warnt und empfiehlt automatisch notwendiges Montage-Zubehör.'
  },
  {
    id: 'q_m8_4', lessonId: 'l8', courseId: 'c8', type: 'single', question: 'Kann der Thitronik Konfigurator auch Preise für andere Länder z.B die Schweiz, anzeigen?',
    answers: ['/Konfigurator/Frage 4 Kann der Thitronik Konfigurator auch Preise für andere Länder z.B die Schweiz, anzeigen  Richtige Antwort.webp', '/Konfigurator/Frage 4 Kann der Thitronik Konfigurator auch Preise für andere Länder z.B die Schweiz, anzeigen  falsche Antwort.webp', '/Konfigurator/Frage 4 Kann der Thitronik Konfigurator auch Preise für andere Länder z.B die Schweiz, anzeigen  falsche Antwort 2.webp'],
    correctAnswers: ['/Konfigurator/Frage 4 Kann der Thitronik Konfigurator auch Preise für andere Länder z.B die Schweiz, anzeigen  Richtige Antwort.webp'],
    explanation: 'Dank länderspezifischer Einstellungen können auch Währungen wie CHF abgerufen werden.'
  },
  {
    id: 'q_m8_5', lessonId: 'l8', courseId: 'c8', type: 'single', question: 'Kann ich meinen Kunden die Konfiguration nach der Beratung zukommen lassen?',
    answers: ['/Konfigurator/Frage 5 Kann ich meinen Kunden die Konfiguration nach der Beratung zukommen lassen Richtige Antwort.webp', '/Konfigurator/Frage 5 Kann ich meinen Kunden die Konfiguration nach der Beratung zukommen lassen falsche Antwort.webp', '/Konfigurator/Frage 5 Kann ich meinen Kunden die Konfiguration nach der Beratung zukommen lassen falsche Antwort 2.webp'],
    correctAnswers: ['/Konfigurator/Frage 5 Kann ich meinen Kunden die Konfiguration nach der Beratung zukommen lassen Richtige Antwort.webp'],
    explanation: 'Du kannst das fertige Datenblatt ganz einfach via E-Mail versenden oder als PDF drucken.'
  }
];

export function initializeSeedData(API) {
  if (typeof window !== 'undefined') {
    // Versions-Key hochgesetzt (V8) für Fehlersuche
    const initialized = localStorage.getItem('th__initialized_v8');
    
    if (!initialized) {
      localStorage.clear(); 
      
      API.saveUsers(seedUsers);
      API.saveCourses(seedCourses);
      API.saveLessons(seedLessons);
      API.saveQuestions(seedQuestions);
      localStorage.setItem('th_progress', JSON.stringify([]));
      localStorage.setItem('th_quizAttempts', JSON.stringify([]));
      
      // Demo Enrollments
      localStorage.setItem('th_enrollments', JSON.stringify([
        { courseId: 'c2', userId: 'u1' },
        { courseId: 'c3', userId: 'u1' },
        { courseId: 'c4', userId: 'u1' },
        { courseId: 'c6', userId: 'u1' },
        { courseId: 'c8', userId: 'u1' }
      ]));
      localStorage.setItem('th_media', JSON.stringify([]));
      
      localStorage.setItem('th__initialized_v8', 'true');
    }
  }
}
