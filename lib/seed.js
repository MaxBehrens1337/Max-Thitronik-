// ============================================
// THITRONIK Seed Data (Content Migration V16)
// Alle Pilot-Module inkl. "Allgemeine Fragen" (Modul 1)
// + Mercedes Sprinter VS30 (Modul 10)
// + Kursbilder aus /Bilder/
// ============================================

export const seedUsers = [
  { id: 'u1', email: 'admin@thitronik.de', password: 'admin123', firstName: 'Admin', lastName: 'Thitronik', role: 'admin', active: true },
  { id: 'u2', email: 'trainer@thitronik.de', password: 'trainer123', firstName: 'Thomas', lastName: 'Schulz', role: 'trainer', active: true },
  { id: 'u3', email: 'monteur@thitronik.de', password: 'monteur123', firstName: 'Max', lastName: 'Weber', role: 'learner', active: true },
  { id: 'u4', email: 'partner@thitronik.de', password: 'partner123', firstName: 'Anna', lastName: 'Fischer', role: 'learner', active: true },
];

export const seedCourses = [
  { 
    id: 'c1', title: 'Allgemeine Fragen', slug: 'allgemeinefragen', status: 'published', sortOrder: 1, icon: null, questionCount: 4, hasVideo: false, hasImages: true,
    image: '/Bilder/Allgemeine Fragen.jpg',
    intro: 'Wichtige allgemeine Fakten rund um THITRONIK Produkte und Installationen.',
    learningGoals: [
      'Zeitmanagement beim Einbau sicherstellen',
      'Kundenübergabe professionell gestalten',
      'Generelle Einbauorte (LED, Zusatzhupe) kennen'
    ]
  },
  
  // Pilot 4: CAN-Bus
  { 
    id: 'c2', title: 'CAN-Bus', slug: 'canbus', status: 'published', sortOrder: 2, icon: null, questionCount: 5, hasVideo: true, hasImages: true,
    image: '/Bilder/Canbus.jpg',
    intro: 'Alles rund um das Thema CAN-Bus und wie THITRONIK Alarmsysteme damit interagieren. Inklusive Erklärvideo!',
    learningGoals: [
      'Verstehen, was der CAN-Bus im Wohnmobil macht',
      'Erkennen, welche Fahrzeugtüren überwacht werden',
      'Wissen, wie nicht-CAN-Bus-überwachte Bauteile abzusichern sind'
    ]
  },
  
  // Pilot 1: Fahrzeugübergabe
  { 
    id: 'c3', title: 'Fahrzeugübergabe', slug: 'fahrzeuguebergabe', status: 'published', sortOrder: 3, icon: null, questionCount: 5, hasVideo: true, hasImages: true,
    image: '/Bilder/fahrzeugübergabe.jpg',
    intro: 'Lerne, wie du das ausgerüstete Fahrzeug korrekt und sicher an den Endkunden übergibst. Inklusive Video-Schulung!',
    learningGoals: [
      'Einweisung des Kunden in die Grundfunktionen',
      'Verwendung von Hilfsmitteln bei der Übergabe',
      'Dokumentation und Absicherung des Übergabeprozesses'
    ]
  },

  // Pilot 5: Fehlersuche
  { 
    id: 'c4', title: 'Fehlersuche', slug: 'fehlersuche', status: 'published', sortOrder: 5, icon: null, questionCount: 6, hasVideo: false, hasImages: true,
    image: '/Bilder/fehlersuche.jpg',
    intro: 'Der Blick für Details! Erkennst du Einbaufehler auf den ersten Blick?',
    learningGoals: [
      'Gefahren fehlerhafter Verkabelung verstehen',
      'Magnetkontakte korrekt ausrichten und verkleben',
      'Optische Mängel auf Fotos sofort erkennen (Multiple Choice Praxis)'
    ]
  },

  // Pilot 9: Funkzubehör Anlernen
  { 
    id: 'c5', title: 'Funkzubehör Anlernen', slug: 'funkzubehoer', status: 'published', sortOrder: 6, icon: null, questionCount: 5, hasVideo: true, hasImages: true,
    image: '/Bilder/Anlernen.jpg',
    intro: 'Lerne den korrekten Prozess, wie man THITRONIK Zubehör sicher an die Zentrale anlernt.',
    learningGoals: [
      'Den Anlernmodus korrekt starten und beenden',
      'Mehrere Sensoren strukturiert verknüpfen',
      'Wissen woran man einen erfolgreichen Vorgang erkennt'
    ]
  },
  
  // Pilot 2: Gelverbinder
  { 
    id: 'c6', title: 'Gelverbinder', slug: 'gelverbinder', status: 'published', sortOrder: 4, icon: null, questionCount: 4, hasVideo: true, hasImages: true,
    image: '/Bilder/Gelverbinder.jpg',
    intro: 'Wichtige Regeln zur fachgerechten Verwendung von Gelverbindern im KFZ-Bereich. Vor der Prüfung bitte das Schulungsvideo ansehen.',
    learningGoals: [
      'Erkennen, wann und wo Gelverbinder eingesetzt werden dürfen',
      'Die Verarbeitung fachgerecht und sauber umsetzen',
      'Spezifische Fehlerbilder anhand von Fotos zuordnen können'
    ]
  },

  // Pilot 10: Grundlagen (NEU)
  { 
    id: 'c7', title: 'Grundlagen', slug: 'grundlagen', status: 'published', sortOrder: 7, icon: null, questionCount: 5, hasVideo: true, hasImages: true,
    image: '/Bilder/Grundlagen.jpg',
    intro: 'Die essenziellen Grundlagen für die Arbeit mit THITRONIK Systemen am Kundenfahrzeug.',
    learningGoals: [
      'Das korrekte Baujahr von Basisfahrzeugen sicher ermitteln',
      'Den richtigen Umgang mit den Einbauanleitungen meistern',
      'Wichtige Vorprüfungen am Kundenfahrzeug routiniert durchführen'
    ]
  },
  
  // Pilot 3: Konfigurator
  { 
    id: 'c8', title: 'Konfigurator', slug: 'konfigurator', status: 'published', sortOrder: 8, icon: null, questionCount: 5, hasVideo: true, hasImages: true,
    image: null,
    intro: 'Bedienung und Nutzung des THITRONIK Konfigurators. Lerne wie du Angebote sicher kalkulierst.',
    learningGoals: [
      'Lerne, was der Konfigurator ist und wo du ihn findest',
      'Verstehe, wie Zubehörteile eingerechnet werden',
      'Optimiere den Verkaufs-Prozess durch direkte Angebots-Versendung'
    ]
  },

  // Pilot 8: Magnet & Montageadapter
  { 
    id: 'c9', title: 'Magnet & Montageadapter', slug: 'magnet-montageadapter', status: 'published', sortOrder: 9, icon: null, questionCount: 5, hasVideo: true, hasImages: true,
    image: '/Bilder/Magnet & Montageadapter.webp',
    intro: 'Lerne, wie Du Montageadapter optimal einsetzt und Abstände fachgerecht überbrückst.',
    learningGoals: [
      'Einsatzmöglichkeiten für Montageadapter verstehen',
      'Richtige Befestigungstechniken erlernen',
      'Einschränkungen bei Außenbereichen bzw. Dichtungen kennen'
    ]
  },

  // Pilot 6: Pro-finder
  { 
    id: 'c11', title: 'Pro-finder', slug: 'pro-finder', status: 'published', sortOrder: 11, icon: null, questionCount: 5, hasVideo: true, hasImages: true,
    image: '/Bilder/profinder.jpg',
    intro: 'Alles über den Montageort und die Spannungsversorgung des Pro-finders.',
    learningGoals: [
      'Die Hauptfunktionen des Pro-finders verstehen',
      'Richtige Ausrichtung und versteckte Montageorte kennen',
      'Wissen, welche Materialien das GPS-Signal stören'
    ]
  },

  // Pilot 7: WiPro
  { 
    id: 'c13', title: 'WiPro', slug: 'wipro', status: 'published', sortOrder: 13, icon: null, questionCount: 5, hasVideo: true, hasImages: true,
    image: '/Bilder/Wipro.jpg',
    intro: 'Alles über die Installation und korrekte Anbringung der WiPro Zentrale.',
    learningGoals: [
      'Den perfekten Befestigungsort für die WiPro Zentrale wählen',
      'Verkabelung sauber und unfallsicher verlegen',
      'Spezifische Checkliste bei Montageabschluss durchführen'
    ]
  },

  // Modul 10: Mercedes Sprinter VS30
  { 
    id: 'c10', title: 'Mercedes Sprinter VS30', slug: 'mb-sprinter-vs30', status: 'published', sortOrder: 10, icon: null, questionCount: 12, hasVideo: false, hasImages: true,
    image: '/Bilder/Mercedes Benz.avif',
    intro: 'Spezialwissen für den Einbau von THITRONIK Alarmsystemen im Mercedes Sprinter VS30 (2018+). Inklusive fahrzeugspezifischer Besonderheiten, CAN-Bus-Konfiguration und Praxiswissen.',
    learningGoals: [
      'Fahrzeugspezifische Besonderheiten des MB Sprinter VS30 kennen',
      'CAN-Bus-Schnittstelle und DIP-Schalterstellung korrekt konfigurieren',
      'Warnblinker-, Zündungs- und Hupen-Anschlüsse sicher identifizieren',
      'Den THITRONIK Campingmodus verstehen und erklären können'
    ]
  },

  // Platzhalter
  { id: 'c12', title: 'THITRONIK Testfragen', slug: 'thitronik-test1', status: 'placeholder', sortOrder: 12, icon: null, image: '/Bilder/Testfragen.jpg' },
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
    id: 'l5', courseId: 'c5', title: 'Funkzubehör Anlernen Inhalte', status: 'published', sortOrder: 1,
    videoUrl: '/Funkzubehör Anlernen/funkzubehör_richtig_anlernen_v1 (1080p).mp4'
  },
  { 
    id: 'l6', courseId: 'c6', title: 'Gelverbinder Inhalte', status: 'published', sortOrder: 1,
    videoUrl: '/Gelverbinder/2.4 Gelverbinder.m4v'
  },
  { 
    id: 'l7', courseId: 'c7', title: 'Grundlagen Inhalte', status: 'published', sortOrder: 1,
    videoUrl: '/Grundlagen/intro_schulungsvideos_de_v1 (2160p).mp4'
  },
  { 
    id: 'l8', courseId: 'c8', title: 'Konfigurator Inhalte', status: 'published', sortOrder: 1,
    videoUrl: '/Konfigurator/wie_benutze_ich_den_thitronik®__konfigurator_richtig_v1 (1080p).mp4'
  },
  { 
    id: 'l9', courseId: 'c9', title: 'Magnet & Montageadapter Inhalte', status: 'published', sortOrder: 1,
    videoUrl: '/Magnet Montageadapter/montageadapter_richtig_anbringen_v1 (1080p).mp4'
  },
  { 
    id: 'l11', courseId: 'c11', title: 'Pro-finder Inhalte', status: 'published', sortOrder: 1,
    videoUrl: '/pro-finder/pro-finder_montageort_und_spannungsversorgung_am_beispiel_eines_fiat_ducato_v1 (1080p).mp4'
  },
  { 
    id: 'l13', courseId: 'c13', title: 'WiPro Inhalte', status: 'published', sortOrder: 1,
    videoUrl: '/Wipro/wipro_iii_richtig_montieren_v1 (1080p).mp4'
  },
  {
    id: 'l10', courseId: 'c10', title: 'Mercedes Sprinter VS30 Inhalte', status: 'published', sortOrder: 1,
    videoUrl: null
  },
];

export const seedQuestions = [
  // --- Modul 1 (Allgemeine Fragen) ---
  {
    id: 'q_m1_1', lessonId: 'l1', courseId: 'c1', type: 'single', 
    question: 'Woher weiß Ich, wie lange ich für den Einbau von thitronik Produkten benötige?',
    answers: ['/Allgemeinfragen/Frage 1 Woher weiß Ich, wie lange ich für den Einbau von thitronik Produkten benötige richtige Antwort.jpg', '/Allgemeinfragen/Frage 1 Woher weiß Ich, wie lange ich für den Einbau von thitronik Produkten benötige Falsche Antwort.jpg', '/Allgemeinfragen/Frage 1 Woher weiß Ich, wie lange ich für den Einbau von thitronik Produkten benötige Falsche Antwort 2.jpg'],
    correctAnswers: ['/Allgemeinfragen/Frage 1 Woher weiß Ich, wie lange ich für den Einbau von thitronik Produkten benötige richtige Antwort.jpg'],
    explanation: 'Einbauzeiten und Richtwerte finden sich zentral in den offiziellen Thitronik Händler-Unterlagen.'
  },
  {
    id: 'q_m1_2', lessonId: 'l1', courseId: 'c1', type: 'single', 
    question: 'Wie lässt sich die Fahrzeugannahme und Fahrzeugabnahme zu einem angenehmen Ergebniss für alle Beiteilligten machen?',
    answers: ['/Allgemeinfragen/Frage 2 Wie lässt sich die Fahrzeugannahme und Fahrzeugabnahme zu einem angenehmen Ergebniss für alle Beiteilligten machen Richtige Antwort.jpg', '/Allgemeinfragen/Frage 2 Wie lässt sich die Fahrzeugannahme und Fahrzeugabnahme zu einem angenehmen Ergebniss für alle Beiteilligten machen falsche Antwort.jpg', '/Allgemeinfragen/Frage 2 Falsche Antwort.jpg', '/Allgemeinfragen/Frage 2 Falsche Antwort .jpg'],
    correctAnswers: ['/Allgemeinfragen/Frage 2 Wie lässt sich die Fahrzeugannahme und Fahrzeugabnahme zu einem angenehmen Ergebniss für alle Beiteilligten machen Richtige Antwort.jpg'],
    explanation: 'Transparenz und dokumentierte Checks (Checklisten) sorgen für Sicherheit bei Kunde und Werkstatt.'
  },
  {
    id: 'q_m1_3', lessonId: 'l1', courseId: 'c1', type: 'single', 
    question: 'Woher weiß ich, ob ich beim vorliegenden Fahrzeug eine Zusatzhupe verbauen muss?',
    answers: ['/Allgemeinfragen/Frage 3 Woher weiß ich, ob ich beim vorliegenden Fahrzeug eine Zusatzhupe verbauen muss Richtige Antwort.jpg', '/Allgemeinfragen/Frage 3 Falsche Antwort.jpg', '/Allgemeinfragen/Frage 3 Falsche Antwort 2.jpg', '/Allgemeinfragen/Frage 3 Falsche Antwort 3.jpg'],
    correctAnswers: ['/Allgemeinfragen/Frage 3 Woher weiß ich, ob ich beim vorliegenden Fahrzeug eine Zusatzhupe verbauen muss Richtige Antwort.jpg'],
    explanation: 'Im Zweifel gibt die Fahrgestellnummer (FIN) oder die Liste der fahrzeugspezifischen Besonderheiten Aufschluss.'
  },
  {
    id: 'q_m1_4', lessonId: 'l1', courseId: 'c1', type: 'single', 
    question: 'Wo wird die Status-LED angebracht?',
    answers: ['/Allgemeinfragen/Frage 4 Wo wird die Satus-LED angebracht Richtige Antwort.jpg', '/Allgemeinfragen/Frage 4 Wo wird die Satus-LED angebracht  Falsche antwort 1.jpg', '/Allgemeinfragen/Frage 4 Wo wird die Satus-LED angebracht Falsche Antwort 2.jpg', '/Allgemeinfragen/Frage 4 Wo wird die Satus-LED angebracht  Falsche Antwort 3.jpg'],
    correctAnswers: ['/Allgemeinfragen/Frage 4 Wo wird die Satus-LED angebracht Richtige Antwort.jpg'],
    explanation: 'Die Status-LED sollte gut sichtbar im Sichtbereich des Fahrers platziert sein, ohne zu blenden.'
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
    id: 'q_m4_1', lessonId: 'l4', courseId: 'c4', type: 'multiple', question: 'Bei welchen UB2A-Gelverbindern liegt keine einwandfreie Installation vor?',
    answers: ['/Fehlersuche/Frage 1 Bei welchem UB2A-Gelverbindern liegt keine einwandfrei Installation vor Richtige Antwort 1.webp','/Fehlersuche/Frage 1 Bei welchem UB2A-Gelverbindern liegt keine einwandfrei Installation vor Richtige Antwort 2.webp','/Fehlersuche/Frage 1 Bei welchem UB2A-Gelverbindern liegt keine einwandfrei Installation vor Richtige Antwort 3.webp','/Fehlersuche/Frage 1 Bei welchem UB2A-Gelverbindern liegt keine einwandfrei Installation vor Richtige Antwort 4.webp','/Fehlersuche/Frage 1 Bei welchem UB2A-Gelverbindern liegt keine einwandfrei Installation vor falsche Antwort.webp'],
    correctAnswers: ['/Fehlersuche/Frage 1 Bei welchem UB2A-Gelverbindern liegt keine einwandfrei Installation vor Richtige Antwort 1.webp','/Fehlersuche/Frage 1 Bei welchem UB2A-Gelverbindern liegt keine einwandfrei Installation vor Richtige Antwort 2.webp','/Fehlersuche/Frage 1 Bei welchem UB2A-Gelverbindern liegt keine einwandfrei Installation vor Richtige Antwort 3.webp','/Fehlersuche/Frage 1 Bei welchem UB2A-Gelverbindern liegt keine einwandfrei Installation vor Richtige Antwort 4.webp'],
    explanation: 'Hier sind vier fehlerhafte (schlecht gecrimpte / abgeknickte) Bilder die "richtigen" Antworten auf die Fragestellung!'
  },
  {
    id: 'q_m4_2', lessonId: 'l4', courseId: 'c4', type: 'multiple', question: 'Welche Funk-Magnetkontakte wurden korrekt installiert?',
    answers: ['/Fehlersuche/Frage 2 Welche Funk-Magnetkontakte wurden korrekt installiert Richtige Antwort.webp','/Fehlersuche/Frage 2 Welche Funk-Magnetkontakte wurden korrekt installiert Richtige Antwort 2.webp','/Fehlersuche/Frage 2 Welche Funk-Magnetkontakte wurden korrekt installiert falsche Antwort 1.webp','/Fehlersuche/Frage 2 Welche Funk-Magnetkontakte wurden korrekt installiert falsche Antwort 2.webp','/Fehlersuche/Frage 2 Welche Funk-Magnetkontakte wurden korrekt installiert falsche Antwort 3.webp','/Fehlersuche/Frage 2 Welche Funk-Magnetkontakte wurden korrekt installiert falsche Antwort 4.webp','/Fehlersuche/Frage 2 Welche Funk-Magnetkontakte wurden korrekt installiert falsche Antwort 5.webp'],
    correctAnswers: ['/Fehlersuche/Frage 2 Welche Funk-Magnetkontakte wurden korrekt installiert Richtige Antwort.webp','/Fehlersuche/Frage 2 Welche Funk-Magnetkontakte wurden korrekt installiert Richtige Antwort 2.webp'],
    explanation: 'Achte auf den korrekten Montageabstand (Spaltmaü) zur Gegenkante und Positionierung an den Kanten.'
  },
  {
    id: 'q_m4_3', lessonId: 'l4', courseId: 'c4', type: 'multiple', question: 'Wie sollte die Verkabelung nach dem Einbau der Thitronik Komponenten idealerweise nicht aussehen?',
    answers: ['/Fehlersuche/Frage 3 Wie sollte die Verkabelung nach dem Einbau der Thitronik Komponenten idealerweise nicht aussehen  Richtige Antwort 1.webp','/Fehlersuche/Frage 3 Wie sollte die Verkabelung nach dem Einbau der Thitronik Komponenten idealerweise nicht aussehen  Richtige Antwort 2.webp','/Fehlersuche/Frage 3 Wie sollte die Verkabelung nach dem Einbau der Thitronik Komponenten idealerweise nicht aussehen  Richtige Antwort 3.webp','/Fehlersuche/Frage 3 Wie sollte die Verkabelung nach dem Einbau der Thitronik Komponenten idealerweise nicht aussehen  Richtige Antwort 4.webp','/Fehlersuche/Frage 3 Wie sollte die Verkabelung nach dem Einbau der Thitronik Komponenten idealerweise nicht aussehen  Richtige Antwort 5.webp','/Fehlersuche/Frage 3 Wie sollte die Verkabelung nach dem Einbau der Thitronik Komponenten idealerweise nicht aussehen  falsche Antwort 1.webp'],
    correctAnswers: ['/Fehlersuche/Frage 3 Wie sollte die Verkabelung nach dem Einbau der Thitronik Komponenten idealerweise nicht aussehen  Richtige Antwort 1.webp','/Fehlersuche/Frage 3 Wie sollte die Verkabelung nach dem Einbau der Thitronik Komponenten idealerweise nicht aussehen  Richtige Antwort 2.webp','/Fehlersuche/Frage 3 Wie sollte die Verkabelung nach dem Einbau der Thitronik Komponenten idealerweise nicht aussehen  Richtige Antwort 3.webp','/Fehlersuche/Frage 3 Wie sollte die Verkabelung nach dem Einbau der Thitronik Komponenten idealerweise nicht aussehen  Richtige Antwort 4.webp','/Fehlersuche/Frage 3 Wie sollte die Verkabelung nach dem Einbau der Thitronik Komponenten idealerweise nicht aussehen  Richtige Antwort 5.webp'],
    explanation: 'Lose hängende Kabelstränge und Kabelsalat (Spider-Web) sind potenzielle Fehlerquellen und ein Tabu beim Einbau!'
  },
  {
    id: 'q_m4_4', lessonId: 'l4', courseId: 'c4', type: 'multiple', question: 'Wie darf die Verklebung der Funk Magnetkontakte nicht erfolgen, damit Halt und Funktion dauerhaft sichergestellt sind?',
    answers: ['/Fehlersuche/Frage 4 Wie darf die Verklebung der Funk Magnetkontakte nicht erfolgen, damit Halt und Funktion dauerhaft sichergestellt sind Richtige Antwort 1.webp','/Fehlersuche/Frage 4 Wie darf die Verklebung der Funk Magnetkontakte nicht erfolgen, damit Halt und Funktion dauerhaft sichergestellt sind Richtige Antwort 2.webp','/Fehlersuche/Frage 4 Wie darf die Verklebung der Funk Magnetkontakte nicht erfolgen, damit Halt und Funktion dauerhaft sichergestellt sind Richtige Antwort 3.webp','/Fehlersuche/Frage 4 Wie darf die Verklebung der Funk Magnetkontakte nicht erfolgen, damit Halt und Funktion dauerhaft sichergestellt sind Falsche Antwort.webp'],
    correctAnswers: ['/Fehlersuche/Frage 4 Wie darf die Verklebung der Funk Magnetkontakte nicht erfolgen, damit Halt und Funktion dauerhaft sichergestellt sind Richtige Antwort 1.webp','/Fehlersuche/Frage 4 Wie darf die Verklebung der Funk Magnetkontakte nicht erfolgen, damit Halt und Funktion dauerhaft sichergestellt sind Richtige Antwort 2.webp','/Fehlersuche/Frage 4 Wie darf die Verklebung der Funk Magnetkontakte nicht erfolgen, damit Halt und Funktion dauerhaft sichergestellt sind Richtige Antwort 3.webp'],
    explanation: 'Das Klebepad muss stets vollflächig und nicht partiell aufliegen.'
  },
  {
    id: 'q_m4_5', lessonId: 'l4', courseId: 'c4', type: 'single', question: 'Was gibt es bei der Funktion der beiden Tasten auf dem Funk-Handsender zu beachten?',
    answers: ['/Fehlersuche/Frarge 5 Was gibt es bei der Funktion der beiden Tasten auf dem Funk-Handsender zu beachten Richtige Antwort 1.webp','/Fehlersuche/Frarge 5 Was gibt es bei der Funktion der beiden Tasten auf dem Funk-Handsender zu beachten Falsche Antwort 1.webp','/Fehlersuche/Frarge 5 Was gibt es bei der Funktion der beiden Tasten auf dem Funk-Handsender zu beachten Falsche Antwort 2.webp','/Fehlersuche/Frarge 5 Was gibt es bei der Funktion der beiden Tasten auf dem Funk-Handsender zu beachten Falsche Antwort 3.webp'],
    correctAnswers: ['/Fehlersuche/Frarge 5 Was gibt es bei der Funktion der beiden Tasten auf dem Funk-Handsender zu beachten Richtige Antwort 1.webp'],
    explanation: 'Auf die genaue Belegung der Kanäle achten!'
  },
  {
    id: 'q_m4_6', lessonId: 'l4', courseId: 'c4', type: 'single', question: 'Wo sollte das G.A.S verbaut sein, damit es optimal funktioniert?',
    answers: ['/Fehlersuche/Frage 6 Wo sollte das G.A.S verbaut sein, damit es optimal funktioniert richtige antwort 1.jpg','/Fehlersuche/Frage 6 Wo sollte das G.A.S verbaut sein, damit es optimal funktioniert Falsche antwort 1.jpg','/Fehlersuche/Frage 6 Wo sollte das G.A.S verbaut sein, damit es optimal funktioniert Falsche antwort 2.jpg','/Fehlersuche/Frage 6 Wo sollte das G.A.S verbaut sein, damit es optimal funktioniert Falsche antwort 3.jpg'],
    correctAnswers: ['/Fehlersuche/Frage 6 Wo sollte das G.A.S verbaut sein, damit es optimal funktioniert richtige antwort 1.jpg'],
    explanation: 'Das G.A.S muss stets im Boden- bzw. Schwellerbereich installiert sein, da die spezifischen Gase schwerer als Luft sind und sich unten sammeln.'
  },

  // --- Modul 5 (Funkzubehör Anlernen) ---
  {
    id: 'q_m5_1', lessonId: 'l5', courseId: 'c5', type: 'single', question: 'Was musst Du machen, nachdem Du alle Komponenten montiert hast?',
    answers: ['/Funkzubehör Anlernen/Frage 1 Was musst Du machen, nachdem Du alle Komponenten montiert hast  Richtige Antwort.webp','/Funkzubehör Anlernen/Frage 1 Was musst Du machen, nachdem Du alle Komponenten montiert hast  falsche Antwort.webp','/Funkzubehör Anlernen/Frage 1 Was musst Du machen, nachdem Du alle Komponenten montiert hast  falsche Antwort 2.webp'],
    correctAnswers: ['/Funkzubehör Anlernen/Frage 1 Was musst Du machen, nachdem Du alle Komponenten montiert hast  Richtige Antwort.webp'],
    explanation: 'Nach der physischen Montage ist es zwingend erforderlich, sämtliches Funkzubehör in der Zentrale anzulernen.'
  },
  {
    id: 'q_m5_2', lessonId: 'l5', courseId: 'c5', type: 'single', question: 'Wie lernst Du das Funkzubehör idealerweise an?',
    answers: ['/Funkzubehör Anlernen/Frage 2 Wie lernst Du das Funkzubehör idealerweise an Richtige Antwort.webp','/Funkzubehör Anlernen/Frage 2 Wie lernst Du das Funkzubehör idealerweise an falsche Antwort.webp','/Funkzubehör Anlernen/Frage 2 Wie lernst Du das Funkzubehör idealerweise an falsche Antwort 2.webp'],
    correctAnswers: ['/Funkzubehör Anlernen/Frage 2 Wie lernst Du das Funkzubehör idealerweise an Richtige Antwort.webp'],
    explanation: 'Der sicherste und effizienteste Weg ist das Anlernen vor Ort, Schritt für Schritt, oft direkt über die Funk-Tasten, Tür für Tür.'
  },
  {
    id: 'q_m5_3', lessonId: 'l5', courseId: 'c5', type: 'single', question: 'Was ist der erste Schritt zum Anlernen des Funkzubehörs?',
    answers: ['/Funkzubehör Anlernen/Frage 3 Was ist der erste Schritt zum Anlernen des Funkzubehörs Richtige Antwort.webp','/Funkzubehör Anlernen/Frage 3 Was ist der erste Schritt zum Anlernen des Funkzubehörs falsche Antwort.webp','/Funkzubehör Anlernen/Frage 3 Was ist der erste Schritt zum Anlernen des Funkzubehörs falsche Antwort 2.webp'],
    correctAnswers: ['/Funkzubehör Anlernen/Frage 3 Was ist der erste Schritt zum Anlernen des Funkzubehörs Richtige Antwort.webp'],
    explanation: 'Die Versorgungsspannung der Zentrale muss eingeschaltet und das System in den Anlernmodus (Programming Mode) versetzt werden.'
  },
  {
    id: 'q_m5_4', lessonId: 'l5', courseId: 'c5', type: 'single', question: 'Woran erkennst Du, dass der Anlernvorgang erfolgreich war?',
    answers: ['/Funkzubehör Anlernen/Frage 4 Woran erkennst Du, dass der Anlernvorgang erfolgreich war Richtige Antwort.webp','/Funkzubehör Anlernen/Frage 4 Woran erkennst Du, dass der Anlernvorgang erfolgreich war falsche Antwort.webp','/Funkzubehör Anlernen/Frage 4 Woran erkennst Du, dass der Anlernvorgang erfolgreich war falsche Antwort 2.webp'],
    correctAnswers: ['/Funkzubehör Anlernen/Frage 4 Woran erkennst Du, dass der Anlernvorgang erfolgreich war Richtige Antwort.webp'],
    explanation: 'Die Rückmeldung der Zentrale erfolgt je nach Modell meist optisch oder akustisch zur Bestätigung des empfangenen Funk-Pakets.'
  },
  {
    id: 'q_m5_5', lessonId: 'l5', courseId: 'c5', type: 'single', question: 'Woran musst Du nach dem Anlernen des Funk-Zubehörs unbedingt denken?',
    answers: ['/Funkzubehör Anlernen/Frage 5 Woran musst Du nach dem Anlernen des Funk-Zubehörs unbedingt denken  Richtige Antwort.webp','/Funkzubehör Anlernen/Frage 5 Woran musst Du nach dem Anlernen des Funk-Zubehörs unbedingt denken  falsche Antwort.webp','/Funkzubehör Anlernen/Frage 5 Woran musst Du nach dem Anlernen des Funk-Zubehörs unbedingt denken  falsche Antwort 2.webp'],
    correctAnswers: ['/Funkzubehör Anlernen/Frage 5 Woran musst Du nach dem Anlernen des Funk-Zubehörs unbedingt denken  Richtige Antwort.webp'],
    explanation: 'Du musst den Anlernmodus der Zentrale wieder verlassen / speichern, damit sie ab sofort scharf geschaltet werden kann.'
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
    explanation: 'Beim Crimpen immer darauf achten, dass die Adern tief genug eingeführt sind und das Gel sie korrekt umschlieüt.'
  },
  {
    id: 'q_m6_4', lessonId: 'l6', courseId: 'c6', type: 'single', question: 'Welches Werkzeug empfehlen wir für eine präzise und einfache Verarbeitung von Gelverbindern?',
    answers: ['/Gelverbinder/Frage 4 Welches Werkzeug empehlen wir für eine präzise und einfache Verarbeitung von Gelverbindern Richtige Antwort.webp', '/Gelverbinder/Frage 4 Welches Werkzeug empehlen wir für eine präzise und einfache Verarbeitung von Gelverbindern falsche Antwort.webp', '/Gelverbinder/Frage 4 Welches Werkzeug empehlen wir für eine präzise und einfache Verarbeitung von Gelverbindern falsche Antwort 2.webp'],
    correctAnswers: ['/Gelverbinder/Frage 4 Welches Werkzeug empehlen wir für eine präzise und einfache Verarbeitung von Gelverbindern Richtige Antwort.webp'],
    explanation: 'für den optimalen Anpressdruck empfehlen wir immer das genormte Crimpwerkzeug, keine herkömmliche Kombizange.'
  },

  // --- Modul 7 (Grundlagen) ---
  {
    id: 'q_m7_1', lessonId: 'l7', courseId: 'c7', type: 'single', question: 'Welche Informationen brauchst Du, um die richtige Einbauanleitung auszuwählen?',
    answers: [
      '/Grundlagen/Frage 1 Welche Informationen brauchst Du, um die richtige Einbauanleitung auszuwählen  Richtige Antwort.webp',
      '/Grundlagen/Frage 1 Welche Informationen brauchst Du, um die richtige Einbauanleitung auszuwählen  falsche Antwort.webp',
      '/Grundlagen/Frage 1 Welche Informationen brauchst Du, um die richtige Einbauanleitung auszuwählen  falsche Antwort 2.webp'
    ],
    correctAnswers: ['/Grundlagen/Frage 1 Welche Informationen brauchst Du, um die richtige Einbauanleitung auszuwählen  Richtige Antwort.webp'],
    explanation: 'Fahrzeughersteller, Modellbezeichnung und das korrekte Baujahr sind zwingend erforderlich.'
  },
  {
    id: 'q_m7_2', lessonId: 'l7', courseId: 'c7', type: 'single', question: 'Wo findest Du die richtige Einbauanleitung?',
    answers: [
      '/Grundlagen/Frage 2 Wo findest Du die richtige Einbauanleitung Richtige Antwort.webp',
      '/Grundlagen/Frage 2 Wo findest Du die richtige Einbauanleitung falsche Antwort.webp',
      '/Grundlagen/Frage 2 Wo findest Du die richtige Einbauanleitung falsche Antwort 2.webp'
    ],
    correctAnswers: ['/Grundlagen/Frage 2 Wo findest Du die richtige Einbauanleitung Richtige Antwort.webp'],
    explanation: 'Im passenden, gesicherten THITRONIK Händlerportal.'
  },
  {
    id: 'q_m7_3', lessonId: 'l7', courseId: 'c7', type: 'single', question: 'Welchen Abschnitt der Einbauanleitung solltest Du Dir vor jeder Installation einer WiPro III aufmerksam durchlesen?',
    answers: [
      '/Grundlagen/Frage 3 Welchen Abschnitt der Einbauanleitung solltest Du Dir vor jeder Installation einer WiPro III  aufmerksam durchlesen  Richtige Antwort.webp',
      '/Grundlagen/Frage 3 Welchen Abschnitt der Einbauanleitung solltest Du Dir vor jeder Installation einer WiPro III  aufmerksam durchlesen  falsche Antwort.webp',
      '/Grundlagen/Frage 3 Welchen Abschnitt der Einbauanleitung solltest Du Dir vor jeder Installation einer WiPro III  aufmerksam durchlesen  falsche Antwort 2.webp'
    ],
    correctAnswers: ['/Grundlagen/Frage 3 Welchen Abschnitt der Einbauanleitung solltest Du Dir vor jeder Installation einer WiPro III  aufmerksam durchlesen  Richtige Antwort.webp'],
    explanation: 'Den generellen und wichtigen Hinweis-Bereich bzw. die Sicherheitshinweise am Anfang der Dokumentation.'
  },
  {
    id: 'q_m7_4', lessonId: 'l7', courseId: 'c7', type: 'single', question: 'Wie ermittelst Du das Baujahr des Basisfahrzeugs (in Bezug auf die Einbauunterlagen), wenn Du Dir nicht sicher bist?',
    answers: [
      '/Grundlagen/Frage 4 Wie ermittelst Du das Baujahr des Basisfahrzeugs (in Bezug auf die Einbauunterlagen), wenn Du Dir nicht sicher bist Richtige Antwort.webp',
      '/Grundlagen/Frage 4 Wie ermittelst Du das Baujahr des Basisfahrzeugs (in Bezug auf die Einbauunterlagen), wenn Du Dir nicht sicher bist falsche Antwort.webp',
      '/Grundlagen/Frage 4 Wie ermittelst Du das Baujahr des Basisfahrzeugs (in Bezug auf die Einbauunterlagen), wenn Du Dir nicht sicher bist falsche Antwort 2.webp'
    ],
    correctAnswers: ['/Grundlagen/Frage 4 Wie ermittelst Du das Baujahr des Basisfahrzeugs (in Bezug auf die Einbauunterlagen), wenn Du Dir nicht sicher bist Richtige Antwort.webp'],
    explanation: 'Im Zweifel immer über die Fahrgestellnummer (FIN) z.B. bei der 10. Stelle auf den genauen Produktionszeitraum prüfen.'
  },
  {
    id: 'q_m7_5', lessonId: 'l7', courseId: 'c7', type: 'single', question: 'Was solltest Du immer vor Arbeiten an einem Kundenfahrzeug durchführen?',
    answers: [
      '/Grundlagen/Frage 5 Was solltest Du immer vor Arbeiten an einem Kundenfahrzeug durchführen Richtige Antwort.webp',
      '/Grundlagen/Frage 5 Was solltest Du immer vor Arbeiten an einem Kundenfahrzeug durchführen falsche Antwort.webp',
      '/Grundlagen/Frage 5 Was solltest Du immer vor Arbeiten an einem Kundenfahrzeug durchführen falsche Antwort 2.webp'
    ],
    correctAnswers: ['/Grundlagen/Frage 5 Was solltest Du immer vor Arbeiten an einem Kundenfahrzeug durchführen Richtige Antwort.webp'],
    explanation: 'Einen ordentlichen Übergabe- bzw. Eingangscheck, um Vorschäden zu dokumentieren, bevor du mit der Arbeit beginnst.'
  },

  // --- Modul 8 (Konfigurator) ---
  {
    id: 'q_m8_1', lessonId: 'l8', courseId: 'c8', type: 'single', question: 'Was ist der Thitronik Konfigurator?',
    answers: ['/Konfigurator/Frage 1 Was ist der Thitronik Konfigurator Richtige Antwort.webp', '/Konfigurator/Frage 1 Was ist der Konfigurator Falsche Antwort.webp', '/Konfigurator/Frage 1 Was ist der Thitronik Konfigurator Falsche Antwort 2.webp'],
    correctAnswers: ['/Konfigurator/Frage 1 Was ist der Thitronik Konfigurator Richtige Antwort.webp'],
    explanation: 'Der Konfigurator hilft dir bei der Fahrzeugspezifischen Zusammenstellung passender Alarmsysteme.'
  },
  // (weitere Modul 8 Fragen unverändert) ...
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
  },

  // --- Modul 9 (Magnet & Montageadapter) ---
  {
    id: 'q_m9_1', lessonId: 'l9', courseId: 'c9', type: 'single', question: 'Wozu benötigt man Montageadapter?',
    answers: ['/Magnet Montageadapter/Frage 1 Wozu benötigt man Montageadapter Richtige Antwort.webp','/Magnet Montageadapter/Frage 1 Wozu benötigt man Montageadapter falsche Antwort.webp','/Magnet Montageadapter/Frage 1 Wozu benötigt man Montageadapter falsche Antwort 2.webp'],
    correctAnswers: ['/Magnet Montageadapter/Frage 1 Wozu benötigt man Montageadapter Richtige Antwort.webp'],
    explanation: 'Montageadapter dienen dazu, Unebenheiten auszugleichen oder magnetische Störfelder bei metallischen Untergründen (wie Blechtüren) abzuschirmen.'
  },
  {
    id: 'q_m9_2', lessonId: 'l9', courseId: 'c9', type: 'single', question: 'Wie befestigt man einen Montageadapter?',
    answers: ['/Magnet Montageadapter/Frage 2 Wie befestigt man einen Montageadapter Richtige Antwort.webp','/Magnet Montageadapter/Frage 2 Wie befestigt man einen Montageadapter falsche Antwort.webp','/Magnet Montageadapter/Frage 2 Wie befestigt man einen Montageadapter falsche Antwort 2.webp'],
    correctAnswers: ['/Magnet Montageadapter/Frage 2 Wie befestigt man einen Montageadapter Richtige Antwort.webp'],
    explanation: 'Der Adapter wird mit dem mitgelieferten Spezial-Klebepad sicher an der gewünschten Stelle verklebt oder bei Bedarf verschraubt.'
  },
  {
    id: 'q_m9_3', lessonId: 'l9', courseId: 'c9', type: 'single', question: 'Kannst du den Montageadapter auch nutzen um Abstände zu überbrücken?',
    answers: ['/Magnet Montageadapter/Frage 3 Kannst du den Montageadapter auch nutzen um Abstände zu überbrücken Richtige Antwort.webp','/Magnet Montageadapter/Frage 3 Kannst du den Montageadapter auch nutzen um Abstände zu überbrücken falsche Antwort.webp','/Magnet Montageadapter/Frage 3 Kannst du den Montageadapter auch nutzen um Abstände zu überbrücken falsche Antwort 2.webp'],
    correctAnswers: ['/Magnet Montageadapter/Frage 3 Kannst du den Montageadapter auch nutzen um Abstände zu überbrücken Richtige Antwort.webp'],
    explanation: 'Ja, man kann sogar mehrere Montageadapter stapeln, um zu größe Abstände zwischen Sender und Magnet fachgerecht zu überbrücken.'
  },
  {
    id: 'q_m9_4', lessonId: 'l9', courseId: 'c9', type: 'single', question: 'Kann der Montageadapter zur Montage auf Dichtungen verwendet werden?',
    answers: ['/Magnet Montageadapter/Frage 4 Kann der Montageadapter zur Montage auf Dichtungen verwendet werden Richtige Antwort.webp','/Magnet Montageadapter/Frage 4 Kann der Montageadapter zur Montage auf Dichtungen verwendet werden falsche Antwort.webp','/Magnet Montageadapter/Frage 4 Kann der Montageadapter zur Montage auf Dichtungen verwendet werden falsche Antwort 2.webp'],
    correctAnswers: ['/Magnet Montageadapter/Frage 4 Kann der Montageadapter zur Montage auf Dichtungen verwendet werden Richtige Antwort.webp'],
    explanation: 'Nein, eine Montage direkt auf flexiblen Dichtungen führt zwangsläufig zu fehlerhaften Auslösungen, da das Spaltmaü nicht stabil bleibt.'
  },
  {
    id: 'q_m9_5', lessonId: 'l9', courseId: 'c9', type: 'single', question: 'Sind die Montageadapter für die Montage der Funk-Magnetkontakte im Außenbereich geeignet?',
    answers: ['/Magnet Montageadapter/Frage 5 Sind die Montageadapter für die Montage der Funk-Magnetkontakte im Außenbereich geeignet  Richtige Antwort.webp','/Magnet Montageadapter/Frage 5 Sind die Montageadapter für die Montage der Funk-Magnetkontakte im Außenbereich geeignet  falsche Antwort.webp','/Magnet Montageadapter/Frage 5 Sind die Montageadapter für die Montage der Funk-Magnetkontakte im Außenbereich geeignet  falsche Antwort 2.webp'],
    correctAnswers: ['/Magnet Montageadapter/Frage 5 Sind die Montageadapter für die Montage der Funk-Magnetkontakte im Außenbereich geeignet  Richtige Antwort.webp'],
    explanation: 'Nein, sie sind nur für den witterungsgeschützten Einbau (z.B. in der Tür- oder Fensterlaibung) vorgesehen, da sie sonst frühzeitig korrodieren oder sich lösen.'
  },

  // --- Modul 11 (Pro-finder) ---
  {
    id: 'q_m11_1', lessonId: 'l11', courseId: 'c11', type: 'single', question: 'Welche Hauptfunktionen hat der Pro-Finder?',
    answers: ['/pro-finder/Frage 1 Welche Hauptfunktionen hat der Pro-Finder Richtige Antwort.webp', '/pro-finder/Frage 1 Welche Hauptfunktionen hat der Pro-Finder falsche Antwort.webp', '/pro-finder/Frage 1 Welche Hauptfunktionen hat der Pro-Finder falsche 2 Antwort.webp'],
    correctAnswers: ['/pro-finder/Frage 1 Welche Hauptfunktionen hat der Pro-Finder Richtige Antwort.webp'],
    explanation: 'Der Pro-finder ist ein professionelles Ortungssystem und erlaubt die präzise Nachverfolgung deines Fahrzeugs im Ernstfall.'
  },
  {
    id: 'q_m11_2', lessonId: 'l11', courseId: 'c11', type: 'single', question: 'Welche Materialien dürfen den Pro-finder nicht abdecken, sofern keine externe GPS-Antenne angeschlossen ist?',
    answers: ['/pro-finder/Frage 2 Welche Materialien dürfen den Pro-finder nicht abdecken, sofern keine externe GPS-Antenne angeschlossen ist Richtige Antwort.webp', '/pro-finder/Frage 2 Welche Materialien dürfen den Pro-finder nicht abdecken, sofern keine externe GPS-Antenne angeschlossen ist falsche Antwort.webp', '/pro-finder/Frage 2 Welche Materialien dürfen den Pro-finder nicht abdecken, sofern keine externe GPS-Antenne angeschlossen ist falsche Antwort 2.webp'],
    correctAnswers: ['/pro-finder/Frage 2 Welche Materialien dürfen den Pro-finder nicht abdecken, sofern keine externe GPS-Antenne angeschlossen ist Richtige Antwort.webp'],
    explanation: 'Metallische Gehäuse oder schwere Blechabdeckungen blockieren das GPS-Signal. Ohne externe Antenne braucht der Finder "Sichtkontakt" zum Satelliten (z.B. hinter Kunststoff).'
  },
  {
    id: 'q_m11_3', lessonId: 'l11', courseId: 'c11', type: 'single', question: 'Wie muss der Pro-finder ausgerichtet werden, wenn keine externe GPS-Antenne angeschlossen ist?',
    answers: ['/pro-finder/Frage 3 Wie muss der Pro-finder ausgerichtet werden, wenn keine externe GPS-Antenne angeschlossen ist Richtige Antwort.webp', '/pro-finder/Frage 3 Wie muss der Pro-finder ausgerichtet werden, wenn keine externe GPS-Antenne angeschlossen ist falsche Antwort.webp', '/pro-finder/Frage 3 Wie muss der Pro-finder ausgerichtet werden, wenn keine externe GPS-Antenne angeschlossen ist falsche Antwort 2.webp'],
    correctAnswers: ['/pro-finder/Frage 3 Wie muss der Pro-finder ausgerichtet werden, wenn keine externe GPS-Antenne angeschlossen ist Richtige Antwort.webp'],
    explanation: 'Das Modul sollte möglichst flach verbaut werden, mit der eingebauten GPS-Antenne Richtung Himmel zeigend, unbedeckt durch metallische Paneele.'
  },
  {
    id: 'q_m11_4', lessonId: 'l11', courseId: 'c11', type: 'single', question: 'Welches Zubehör zum Pro-finder ist für viele Fahrzeuge verfügbar?',
    answers: ['/pro-finder/Frage 4 Welches Zubehör zum Pro-finder ist für viele Fahrzeuge verfügbar Richtige Antwort.webp', '/pro-finder/Frage 4 Welches Zubehör zum Pro-finder ist für viele Fahrzeuge verfügbar falsche Antwort.webp', '/pro-finder/Frage 4 Welches Zubehör zum Pro-finder ist für viele Fahrzeuge verfügbar falsche Antwort 2.webp'],
    correctAnswers: ['/pro-finder/Frage 4 Welches Zubehör zum Pro-finder ist für viele Fahrzeuge verfügbar Richtige Antwort.webp'],
    explanation: 'Das fahrzeugspezifische Kabelsatz-Adapter-Set, was den Einbau durch Plug & Play extrem erleichtert.'
  },
  {
    id: 'q_m11_5', lessonId: 'l11', courseId: 'c11', type: 'single', question: 'Was musst Du bedenken, um den besten Einbauort für den Pro-finder zu finden?',
    answers: ['/pro-finder/Frage 5 Was musst Du bedenken, um den besten Einbauort für den Pro-finder zu finden Richtige Antwort.webp', '/pro-finder/Frage 5 Was musst Du bedenken, um den besten Einbauort für den Pro-finder zu finden falsche Antwort.webp', '/pro-finder/Frage 5 Was musst Du bedenken, um den besten Einbauort für den Pro-finder zu finden falsche Antwort 2.webp'],
    correctAnswers: ['/pro-finder/Frage 5 Was musst Du bedenken, um den besten Einbauort für den Pro-finder zu finden Richtige Antwort.webp'],
    explanation: 'Der Montageort muss Sabotage-sicher sein (versteckt), eine dauerhafte Stromversorgung (Kl30) haben, und ein ordentliches GPS+GSM-Signal ermöglichen.'
  },

  // --- Modul 13 (WiPro) ---
  {
    id: 'q_m13_1', lessonId: 'l13', courseId: 'c13', type: 'single', question: 'Womit sollte die Wipro III befestigt werden?',
    answers: ['/Wipro/Frage 1 Womit sollte die Wipro III befestigt werden Richtige Antwort.webp','/Wipro/Frage 1 Womit sollte die Wipro III befestigt werden falsche Antwort.webp','/Wipro/Frage 1 Womit sollte die Wipro III befestigt werden falsche Antwort 2.webp'],
    correctAnswers: ['/Wipro/Frage 1 Womit sollte die Wipro III befestigt werden Richtige Antwort.webp'],
    explanation: 'Die Zentrale sollte mit zwei passenden Schrauben über die dafür vorgesehenen Laschen fest mit dem Trägermaterial verschraubt werden.'
  },
  {
    id: 'q_m13_2', lessonId: 'l13', courseId: 'c13', type: 'single', question: 'Wie sollte der Kabelbaum verlegt werden?',
    answers: ['/Wipro/Frage 2 Wie sollte der Kabelbaum verlegt werden Richtige Antwort.webp','/Wipro/Frage 2 Wie sollte der Kabelbaum verlegt werden falsche Antwort.webp','/Wipro/Frage 2 Wie sollte der Kabelbaum verlegt werden falsche Antwort 2.webp'],
    correctAnswers: ['/Wipro/Frage 2 Wie sollte der Kabelbaum verlegt werden Richtige Antwort.webp'],
    explanation: 'Kabelbäume müssen professionell zusammengeführt und vor scharfen Kanten geschützt sowie ordentlich mit Kabelbindern fixiert werden.'
  },
  {
    id: 'q_m13_3', lessonId: 'l13', courseId: 'c13', type: 'single', question: 'Worauf solltest Du vor dem Aufkleben der Wipro III achten?',
    answers: ['/Wipro/Frage 3 Worauf solltest Du vor dem Aufkleben der Wipro III achten Richtige Antwort.webp','/Wipro/Frage 3 Worauf solltest Du vor dem Aufkleben der Wipro III achten falsche Antwort.webp','/Wipro/Frage 3 Worauf solltest Du vor dem Aufkleben der Wipro III achten falsche Antwort 2.webp'],
    correctAnswers: ['/Wipro/Frage 3 Worauf solltest Du vor dem Aufkleben der Wipro III achten Richtige Antwort.webp'],
    explanation: 'Der Untergrund muss vollkommen staub- und fettfrei sein, damit das Klebepad optimalen Halt hat.'
  },
  {
    id: 'q_m13_4', lessonId: 'l13', courseId: 'c13', type: 'single', question: 'Worauf musst Du beim Ausrichten der Wipro achten?',
    answers: ['/Wipro/Frage 4 Worauf musst Du beim Ausrichten der Wipro achten Richtige Antwort.webp','/Wipro/Frage 4 Worauf musst Du beim Ausrichten der Wipro achten falsche Antwort.webp','/Wipro/Frage 4 Worauf musst Du beim Ausrichten der Wipro achten falsche Antwort 2.webp'],
    correctAnswers: ['/Wipro/Frage 4 Worauf musst Du beim Ausrichten der Wipro achten Richtige Antwort.webp'],
    explanation: 'Es muss genügend Raum für die Antenne bleiben; Ausrichtung und Kabelführung müssen spannungsfrei verlaufen.'
  },
  {
    id: 'q_m13_5', lessonId: 'l13', courseId: 'c13', type: 'single', question: 'Was ist generell beim Abschluss der Montage der Wipro III zu beachten?',
    answers: ['/Wipro/Frage 5 Was ist generell beim Abschluss der Montage der Wipro III zu beachten  Richtige Antwort.webp','/Wipro/Frage 5 Was ist generell beim Abschluss der Montage der Wipro III zu beachten  falsche Antwort.webp','/Wipro/Frage 5 Was ist generell beim Abschluss der Montage der Wipro III zu beachten  falsche Antwort 2.webp'],
    correctAnswers: ['/Wipro/Frage 5 Was ist generell beim Abschluss der Montage der Wipro III zu beachten  Richtige Antwort.webp'],
    explanation: 'Keine lose herumhängenden Kabel oder Bauteile hinterlassen, alles muss sauber gebündelt und befestigt sein!'
  },

  // --- Modul 10 (Mercedes Sprinter VS30) ---
  // Textbasierte Fragen (Frage 1-7)
  {
    id: 'q_m10_1', lessonId: 'l10', courseId: 'c10', type: 'text-single',
    question: 'Woran erkenne ich, dass ein Fahrzeug Originaltüren hat und wo kann ich das nachlesen? (Du findest die Antwort in der Einbauanleitung des jeweiligen Fahrzeugs im Abschnitt "Kontrolle der Fahrzeuggegebenheiten".)',
    answers: [
      'Wenn ein Fahrzeug Originaltüren hat, wird im Tacho angezeigt, wenn diese geöffnet sind.',
      'Ich kann mit dem Originalschlüssel ver- und entriegeln und die Alarmanlage scharf-/unscharfschalten.',
      'Ich kann mit dem Fahrzeugschlüssel abschließen und mit THITRONIK® Zubehör aufschließen.'
    ],
    correctAnswers: ['Wenn ein Fahrzeug Originaltüren hat, wird im Tacho angezeigt, wenn diese geöffnet sind.'],
    explanation: 'Originaltüren werden im Tacho/Multifunktionsdisplay erkannt. Details dazu stehen in der Einbauanleitung unter "Kontrolle der Fahrzeuggegebenheiten".'
  },
  {
    id: 'q_m10_2', lessonId: 'l10', courseId: 'c10', type: 'text-single',
    question: 'Warum sollten Sie zusätzlich zum WiPro III safe.lock Alarmsystem eine Zusatzhupe einbauen (die Antwort finden Sie u. a. in den fahrzeugspezifischen Besonderheiten)?',
    answers: [
      'Bei diesem Fahrzeugtyp funktioniert die Original-Fahrzeughupe nur mit aktivierter Zündung, kann also im Alarmfall ggf. nicht angesteuert werden.',
      'Mercedes-Fahrer haben meist einen tiefen Schlaf und sollten daher im Alarmfall besonders laut geweckt werden.',
      'Der Mercedes Sprinter VS30 ist sehr stark gedämmt, sodass die Original-Fahrzeughupe ggf. nicht gut zu hören ist.'
    ],
    correctAnswers: ['Bei diesem Fahrzeugtyp funktioniert die Original-Fahrzeughupe nur mit aktivierter Zündung, kann also im Alarmfall ggf. nicht angesteuert werden.'],
    explanation: 'Beim Mercedes Sprinter VS30 ist die Originalhupe zündungsabhängig. Ohne eingeschaltete Zündung kann sie im Alarmfall nicht angesteuert werden –  daher ist eine Zusatzhupe notwendig.'
  },
  {
    id: 'q_m10_3', lessonId: 'l10', courseId: 'c10', type: 'text-single',
    question: 'An welchen Pin musst du das rot-rosafarbene Kabel der WiPro III safe.lock für den Warnblinkeranschluss anschließen? (Du findest die Antwort in der Einbauanleitung WiPro III safe.lock für den Mercedes Sprinter VS30 im Kapitel "Schritt 5: Blinker und CAN-Bus anschließen".)',
    answers: [
      'An Pin 14',
      'An Pin 5',
      'An Pin 7',
      'An Pin 15'
    ],
    correctAnswers: ['An Pin 14'],
    explanation: 'Das rot-rosafarbene Kabel wird an Pin 14 angeschlossen. Dies ist in Schritt 5 der Einbauanleitung für den Mercedes Sprinter VS30 dokumentiert.'
  },
  {
    id: 'q_m10_4', lessonId: 'l10', courseId: 'c10', type: 'text-multiple',
    question: 'Wir empfehlen in unseren Einbauanleitungen immer, vorab die Fahrzeuggegebenheiten zu kontrollieren. Warum ist das wichtig? (Zwei Antworten sind richtig.)',
    answers: [
      'Bei bestimmten Fahrzeugen/Fahrzeugmodellen muss vorab geklärt werden, ob eine WiPro III safe.lock oder eine WiPro III eingebaut werden kann.',
      'Wird der Fehlerspeicher vor dem Einbau nicht ausgelesen und dokumentiert, kann es schwierig sein, im Nachhinein die Ursache für eventuell auftretende Probleme zu ermitteln.',
      'Die WiPro III safe.lock funktioniert eventuell nicht, wenn der Fehlerspeicher vor dem Einbau nicht zurückgesetzt wurde.',
      'Weil es die Kollegen ärgert, wenn man ihnen während des Einbaus zu viele Fragen stellt.'
    ],
    correctAnswers: [
      'Bei bestimmten Fahrzeugen/Fahrzeugmodellen muss vorab geklärt werden, ob eine WiPro III safe.lock oder eine WiPro III eingebaut werden kann.',
      'Wird der Fehlerspeicher vor dem Einbau nicht ausgelesen und dokumentiert, kann es schwierig sein, im Nachhinein die Ursache für eventuell auftretende Probleme zu ermitteln.'
    ],
    explanation: 'Vor dem Einbau muss geprüft werden, welches System zum Fahrzeug passt. Außerdem ist die Fehlerspeicher-Dokumentation wichtig, um spätere Probleme nachvollziehen zu können.'
  },
  {
    id: 'q_m10_5', lessonId: 'l10', courseId: 'c10', type: 'text-single',
    question: 'Welche Farbe hat das Warnblinker-Kabel des Mercedes Sprinter VS30? (Du findest die Antwort in der Einbauanleitung unter Schritt 5.)',
    answers: [
      'gelb-rot',
      'rot-rosa',
      'braun',
      'braun-rot'
    ],
    correctAnswers: ['gelb-rot'],
    explanation: 'Das Warnblinker-Kabel des Mercedes Sprinter VS30 ist gelb-rot. Diese Information findest du in Schritt 5 der Einbauanleitung.'
  },
  {
    id: 'q_m10_6', lessonId: 'l10', courseId: 'c10', type: 'text-single',
    question: 'Mein Kunde möchte eine Alarmanlage für seinen teilintegrierten Mercedes VS30 mit Eura-Mobil-Aufbau. Was muss ich als Monteur beachten? (Du findest die Antwort im Händler-Bereich in der Übersicht der fahrzeugspezifischen Besonderheiten.)',
    answers: [
      'Bei diesen Fahrzeugen kann man mit THITRONIK® Zubehör nur Fahrer- und Beifahrertür verriegeln.',
      'Nichts. Ich kann eine WiPro III safe.lock einbauen, ohne auf etwas achten zu müssen.',
      'Bei diesen Fahrzeugen kann man keine WiPro III safe.lock einbauen.',
      'Diese Fahrzeuge benötigen eine Umrüstplatine.'
    ],
    correctAnswers: ['Bei diesen Fahrzeugen kann man mit THITRONIK® Zubehör nur Fahrer- und Beifahrertür verriegeln.'],
    explanation: 'Bei teilintegrierten Mercedes VS30 mit Eura-Mobil-Aufbau können nur Fahrer- und Beifahrertür über THITRONIK® Zubehör verriegelt werden. Dies ist eine fahrzeugspezifische Besonderheit.'
  },
  {
    id: 'q_m10_7', lessonId: 'l10', courseId: 'c10', type: 'text-single',
    question: 'Was ist der THITRONIK® Campingmodus? (Wenn Du Dir nicht sicher bist, findest Du Informationen dazu in unseren FAQ auf www.thitronik.de/support/faq)',
    answers: [
      'Wird der Original-Fahrzeugschlüssel zum Abschließen des Fahrzeugs und Scharfschalten der Alarmanlage verwendet, lässt sich das Fahrzeug nicht mehr mit THITRONIK® Zubehör entriegeln.',
      'Wird THITRONIK® Zubehör zum Abschließen des Fahrzeugs und Scharfschalten der Alarmanlage verwendet, lässt sich das Fahrzeug nicht mehr mit dem Original-Fahrzeugschlüssel entriegeln.',
      'Wird der Original-Fahrzeugschlüssel zum Abschließen des Fahrzeugs verwendet, lässt sich die Alarmanlage nicht mehr scharfschalten.',
      'Wird THITRONIK® Zubehör zum Abschließen des Fahrzeugs und Scharfschalten der Alarmanlage verwendet, lässt sich die Alarmanlage nicht mehr unscharfschalten.'
    ],
    correctAnswers: ['Wird der Original-Fahrzeugschlüssel zum Abschließen des Fahrzeugs und Scharfschalten der Alarmanlage verwendet, lässt sich das Fahrzeug nicht mehr mit THITRONIK® Zubehör entriegeln.'],
    explanation: 'Im Campingmodus wird mit dem Originalschlüssel abgeschlossen und scharfgeschaltet. Das Fahrzeug lässt sich dann nicht mehr mit THITRONIK® Zubehör entriegeln –  ideal für sicheres Übernachten im Fahrzeug.'
  },

  // Bildbasierte Fragen (Frage 8-12)
  {
    id: 'q_m10_8', lessonId: 'l10', courseId: 'c10', type: 'single',
    question: 'Welche Zahlen auf der Übersichtsseite Werkstattunterlagen geben an, wann eine Anleitung zuletzt geändert wurde?',
    answers: [
      '/Vs 30/Frage 1 Welche Zahlen auf der Übersichtsseite Werkstattunterlagen geben an, wann eine Anleitung zuletzt geändert wurde  Richtige Antwort.webp',
      '/Vs 30/Frage 1 Welche Zahlen auf der Übersichtsseite Werkstattunterlagen geben an, wann eine Anleitung zuletzt geändert wurde  Falsche Antwort.webp'
    ],
    correctAnswers: ['/Vs 30/Frage 1 Welche Zahlen auf der Übersichtsseite Werkstattunterlagen geben an, wann eine Anleitung zuletzt geändert wurde  Richtige Antwort.webp'],
    explanation: 'Die Versionsnummern bzw. das Datum auf der Übersichtsseite zeigen an, wann eine Anleitung zuletzt aktualisiert wurde.'
  },
  {
    id: 'q_m10_9', lessonId: 'l10', courseId: 'c10', type: 'single',
    question: 'Welche DIP-Schalterstellung muss ich wählen, wenn ich eine WiPro III safe.lock in einen MB Sprinter VS30 einbaue?',
    answers: [
      '/Vs 30/Frage 2 Welche DIP-Schalterstellung muss ich wählen, wenn ich eine WiPro III safe.lock in einen MB Sprinter VS30 eibaue  Richtige Antwort. webp.webp',
      '/Vs 30/Frage 2 Welche DIP-Schalterstellung muss ich wählen, wenn ich eine WiPro III safe.lock in einen MB Sprinter VS30 eibaue  falsche Antwort. webp.webp',
      '/Vs 30/Frage 2 Welche DIP-Schalterstellung muss ich wählen, wenn ich eine WiPro III safe.lock in einen MB Sprinter VS30 eibaue  falsche Antwort 2.webp',
      '/Vs 30/Frage 2 Welche DIP-Schalterstellung muss ich wählen, wenn ich eine WiPro III safe.lock in einen MB Sprinter VS30 eibaue  falsche Antwort 3.webp'
    ],
    correctAnswers: ['/Vs 30/Frage 2 Welche DIP-Schalterstellung muss ich wählen, wenn ich eine WiPro III safe.lock in einen MB Sprinter VS30 eibaue  Richtige Antwort. webp.webp'],
    explanation: 'Die korrekte DIP-Schalterstellung für den MB Sprinter VS30 ist in der Einbauanleitung im Abschnitt CAN-Bus-Konfiguration dokumentiert.'
  },
  {
    id: 'q_m10_10', lessonId: 'l10', courseId: 'c10', type: 'single',
    question: 'Welche Seriennummer muss die Zentrale haben, damit sie verwendet werden kann?',
    answers: [
      '/Vs 30/Frage 3 Welche Seriennummer muss die Zentrale haben, damit sie verwendet werden kann Richtige Antwort .webp',
      '/Vs 30/Frage 3 Welche Seriennummer muss die Zentrale haben, damit sie verwendet werden kann Falsche Antwort. webp.webp',
      '/Vs 30/Frage 3 Welche Seriennummer muss die Zentrale haben, damit sie verwendet werden kann Falsche Antwort2 .webp',
      '/Vs 30/Frage 3 Welche Seriennummer muss die Zentrale haben, damit sie verwendet werden kann Falsche Antwort3 .webp'
    ],
    correctAnswers: ['/Vs 30/Frage 3 Welche Seriennummer muss die Zentrale haben, damit sie verwendet werden kann Richtige Antwort .webp'],
    explanation: 'Nur Zentralen mit einer bestimmten Seriennummer sind für den MB Sprinter VS30 kompatibel. Prüfe dies immer vor dem Einbau.'
  },
  {
    id: 'q_m10_11', lessonId: 'l10', courseId: 'c10', type: 'single',
    question: 'An welcher Sicherung kann die Zündung für den Anschluss der WiPro III safe.lock abgegriffen werden?',
    answers: [
      '/Vs 30/Frage 4 An welcher Sicherung kann die Zündung für den Anschluss der Wipro III safe.lock abgegriffen werden  Richtige Antwort.jpg',
      '/Vs 30/Frage 4 An welcher Sicherung kann die Zündung für den Anschluss der Wipro III safe.lock abgegriffen werden  Falsche Antwort 1.jpg',
      '/Vs 30/Frage 4 An welcher Sicherung kann die Zündung für den Anschluss der Wipro III safe.lock abgegriffen werden  Falsche Antwort 2.jpg',
      '/Vs 30/Frage 4 An welcher Sicherung kann die Zündung für den Anschluss der Wipro III safe.lock abgegriffen werden  Falsche Antwort 3.jpg'
    ],
    correctAnswers: ['/Vs 30/Frage 4 An welcher Sicherung kann die Zündung für den Anschluss der Wipro III safe.lock abgegriffen werden  Richtige Antwort.jpg'],
    explanation: 'Die korrekte Sicherung für den Zündungsanschluss ist in der Einbauanleitung unter dem Kapitel "Spannungsversorgung" dokumentiert.'
  },
  {
    id: 'q_m10_12', lessonId: 'l10', courseId: 'c10', type: 'single',
    question: 'Was zeigt dieses Bild?',
    answers: [
      '/Vs 30/Frage 5 Was zeigt dieses Bild Richtige Antwort.jpg',
      '/Vs 30/Frage 5 Was zeigt dieses Bild falsche Antwort.jpg',
      '/Vs 30/Frage 5 Was zeigt dieses Bild falsche Antwort 2.jpg'
    ],
    correctAnswers: ['/Vs 30/Frage 5 Was zeigt dieses Bild Richtige Antwort.jpg'],
    explanation: 'Achte genau auf die Details im Bild und gleiche sie mit deinem Wissen aus der Einbauanleitung ab.'
  }
];

// ============================================
// Forum Seed Data (V18)
// ============================================

export const seedForumCategories = [
  // Produkte & Technik
  { id: 'fc1', group: 'Produkte & Technik', title: 'Alarmanlagen (WiPro III)', description: 'Fragen zu WiPro III Einbau, Konfiguration und Problemlösung' },
  { id: 'fc2', group: 'Produkte & Technik', title: 'Gaswarner (G.A.S.-pro III)', description: 'Gaswarnanlage, modulare Sensoren, Narkosegas-Erkennung' },
  { id: 'fc3', group: 'Produkte & Technik', title: 'Ortung (Pro-finder)', description: 'GPS-Ortung, Geofencing, Netzwerk-Modul' },
  { id: 'fc4', group: 'Produkte & Technik', title: 'safe.lock & Replay-Schutz', description: 'Zentralverriegelung, NFC, CAN-Bus-Integration' },
  { id: 'fc5', group: 'Produkte & Technik', title: 'App & Software', description: 'Bluetooth/SMS-Steuerung, Wear OS, Firmware-Updates' },
  // Einbau & Schulung
  { id: 'fc6', group: 'Einbau & Schulung', title: 'Einbauanleitungen & Tipps', description: 'Praxistipps, Werkzeuge und Best Practices' },
  { id: 'fc7', group: 'Einbau & Schulung', title: 'Campus & Video-Schulungen', description: 'Lernplattform, Zertifikate und Schulungstermine' },
  { id: 'fc8', group: 'Einbau & Schulung', title: 'Fahrzeugspezifisches', description: 'Ducato, Sprinter, Crafter & Co. –  Besonderheiten je Modell' },
  // Händler & Vertrieb
  { id: 'fc9', group: 'Händler & Vertrieb', title: 'Vertrieb & Marketing', description: 'Verkaufsargumente, Werbematerial, Messen' },
  { id: 'fc10', group: 'Händler & Vertrieb', title: 'Händler-Austausch', description: 'Erfahrungen, Empfehlungen und Netzwerk' },
  { id: 'fc11', group: 'Händler & Vertrieb', title: 'Garantie & Reklamation', description: 'Garantiefälle, RMA-Prozesse, Kulanz' },
  // Feedback & Ideen
  { id: 'fc12', group: 'Feedback & Ideen', title: 'Feature-Wünsche & Ideen', description: 'Deine Vorschläge für Produkte und Plattform' },
];

export const seedForumTopics = [
  // Pinned
  { id: 'ft1', categoryId: 'fc1', title: 'Willkommen im Thitronik Händler-Forum', authorId: 'u1', authorRole: 'admin', pinned: true, locked: false, solved: false, solutionPostId: null, views: 245, likeCount: 3, createdAt: '2025-11-01T09:00:00Z', lastActivityAt: '2025-11-02T08:00:00Z', replyCount: 2 },
  { id: 'ft2', categoryId: 'fc1', title: 'Forenregeln - Bitte vor dem ersten Beitrag lesen', authorId: 'u1', authorRole: 'admin', pinned: true, locked: true, solved: false, solutionPostId: null, views: 189, likeCount: 0, createdAt: '2025-11-01T09:30:00Z', lastActivityAt: '2025-11-01T09:30:00Z', replyCount: 0 },
  { id: 'ft3', categoryId: 'fc5', title: 'Aktuelle Firmware-Versionen (Stand: März 2026)', authorId: 'u2', authorRole: 'manager', pinned: true, locked: false, solved: false, solutionPostId: null, views: 312, likeCount: 2, createdAt: '2026-03-15T10:00:00Z', lastActivityAt: '2026-03-15T10:00:00Z', replyCount: 1 },
  // Regular Topics
  { id: 'ft4', categoryId: 'fc1', title: 'WiPro III: CAN-Bus Fehler nach Firmware-Update bei Fiat Ducato 2023', authorId: 'u3', authorRole: 'user', pinned: false, locked: false, solved: true, solutionPostId: 'fp6', views: 87, likeCount: 5, createdAt: '2026-03-20T14:30:00Z', lastActivityAt: '2026-03-20T17:00:00Z', replyCount: 3 },
  { id: 'ft5', categoryId: 'fc2', title: 'G.A.S.-pro III: Fehlalarm bei niedrigen Temperaturen', authorId: 'u4', authorRole: 'user', pinned: false, locked: false, solved: true, solutionPostId: 'fp10', views: 64, likeCount: 3, createdAt: '2026-03-22T11:00:00Z', lastActivityAt: '2026-03-22T14:00:00Z', replyCount: 2 },
  { id: 'ft6', categoryId: 'fc3', title: 'Pro-finder GPS-Signal schwach im VW Crafter', authorId: 'u3', authorRole: 'user', pinned: false, locked: false, solved: false, solutionPostId: null, views: 42, likeCount: 1, createdAt: '2026-03-25T09:15:00Z', lastActivityAt: '2026-03-25T10:00:00Z', replyCount: 1 },
  { id: 'ft7', categoryId: 'fc3', title: 'Geofencing-Benachrichtigungen kommen verzögert', authorId: 'u4', authorRole: 'user', pinned: false, locked: false, solved: false, solutionPostId: null, views: 31, likeCount: 0, createdAt: '2026-03-28T16:00:00Z', lastActivityAt: '2026-03-28T16:00:00Z', replyCount: 0 },
  { id: 'ft8', categoryId: 'fc6', title: 'Tipp: Optimale Kabelführung im Mercedes Sprinter VS30', authorId: 'u2', authorRole: 'manager', pinned: false, locked: false, solved: false, solutionPostId: null, views: 156, likeCount: 8, createdAt: '2026-03-18T08:00:00Z', lastActivityAt: '2026-03-18T10:30:00Z', replyCount: 1 },
  { id: 'ft9', categoryId: 'fc6', title: 'Gelverbinder vs. Lötverbindung –  was ist besser?', authorId: 'u3', authorRole: 'user', pinned: false, locked: false, solved: true, solutionPostId: 'fp16', views: 98, likeCount: 4, createdAt: '2026-03-19T13:45:00Z', lastActivityAt: '2026-03-19T15:00:00Z', replyCount: 1 },
  { id: 'ft10', categoryId: 'fc8', title: 'Peugeot Boxer 2024: DIP-Schalterstellung für WiPro III?', authorId: 'u4', authorRole: 'user', pinned: false, locked: false, solved: true, solutionPostId: 'fp18', views: 73, likeCount: 2, createdAt: '2026-03-21T10:30:00Z', lastActivityAt: '2026-03-21T11:30:00Z', replyCount: 1 },
  { id: 'ft11', categoryId: 'fc8', title: 'Ford Transit Custom: Zusatzhupe nötig?', authorId: 'u3', authorRole: 'user', pinned: false, locked: false, solved: false, solutionPostId: null, views: 28, likeCount: 0, createdAt: '2026-04-01T11:00:00Z', lastActivityAt: '2026-04-01T14:00:00Z', replyCount: 1 },
  { id: 'ft12', categoryId: 'fc4', title: 'safe.lock NFC-Karte wird nicht erkannt', authorId: 'u4', authorRole: 'user', pinned: false, locked: false, solved: false, solutionPostId: null, views: 19, likeCount: 0, createdAt: '2026-04-02T08:30:00Z', lastActivityAt: '2026-04-02T10:00:00Z', replyCount: 1 },
  { id: 'ft13', categoryId: 'fc7', title: 'Wann kommen neue Schulungsvideos für G.A.S.-pro III?', authorId: 'u3', authorRole: 'user', pinned: false, locked: false, solved: false, solutionPostId: null, views: 33, likeCount: 1, createdAt: '2026-03-30T14:00:00Z', lastActivityAt: '2026-03-30T14:00:00Z', replyCount: 0 },
  { id: 'ft14', categoryId: 'fc9', title: 'Neues Werbematerial für Frühjahrssaison 2026?', authorId: 'u4', authorRole: 'user', pinned: false, locked: false, solved: false, solutionPostId: null, views: 22, likeCount: 0, createdAt: '2026-03-27T15:00:00Z', lastActivityAt: '2026-03-27T15:00:00Z', replyCount: 0 },
  { id: 'ft15', categoryId: 'fc10', title: 'Erfahrungen mit Wohnmobil-Messe Düsseldorf 2026', authorId: 'u3', authorRole: 'user', pinned: false, locked: false, solved: false, solutionPostId: null, views: 45, likeCount: 2, createdAt: '2026-03-26T12:00:00Z', lastActivityAt: '2026-03-26T14:30:00Z', replyCount: 1 },
  { id: 'ft16', categoryId: 'fc11', title: 'RMA-Prozess: Wie lange dauert der Austausch?', authorId: 'u4', authorRole: 'user', pinned: false, locked: false, solved: true, solutionPostId: 'fp26', views: 38, likeCount: 1, createdAt: '2026-03-23T09:00:00Z', lastActivityAt: '2026-03-23T10:30:00Z', replyCount: 1 },
  { id: 'ft17', categoryId: 'fc12', title: 'Vorschlag: Integration von Rückfahrkamera in die App', authorId: 'u3', authorRole: 'user', pinned: false, locked: false, solved: false, solutionPostId: null, views: 51, likeCount: 4, createdAt: '2026-03-24T10:00:00Z', lastActivityAt: '2026-03-24T14:00:00Z', replyCount: 1 },
];

export const seedForumPosts = [
  // ft1 - Willkommen
  { id: 'fp1', topicId: 'ft1', authorId: 'u1', authorRole: 'admin', content: 'Willkommen im neuen Thitronik Händler-Forum! Hier könnt ihr euch untereinander und mit unserem Support-Team austauschen. Nutzt die Kategorien, um eure Fragen und Erfahrungen zu teilen. Bei dringenden Problemen erreicht ihr uns wie gewohnt unter kontakt@thitronik.de.', createdAt: '2025-11-01T09:00:00Z', updatedAt: null, likes: [{ userId: 'u2', userName: 'Thomas Schulz', timestamp: '2025-11-01T10:05:00Z' }, { userId: 'u3', userName: 'Max Weber', timestamp: '2025-11-02T08:05:00Z' }], likeCount: 2, isSolution: false, reported: false },
  { id: 'fp2', topicId: 'ft1', authorId: 'u2', authorRole: 'manager', content: 'Schön, dass es dieses Forum jetzt gibt. Wir vom Support sind regelmäßig online und beantworten eure technischen Fragen. Scheut euch nicht zu fragen –  es gibt keine dummen Fragen!', createdAt: '2025-11-01T10:00:00Z', updatedAt: null, likes: [{ userId: 'u4', userName: 'Anna Fischer', timestamp: '2025-11-01T12:00:00Z' }], likeCount: 1, isSolution: false, reported: false },
  { id: 'fp3', topicId: 'ft1', authorId: 'u3', authorRole: 'user', content: 'Super Sache! Genau sowas hat gefehlt. Freue mich auf den Austausch.', createdAt: '2025-11-02T08:00:00Z', updatedAt: null, likes: [], likeCount: 0, isSolution: false, reported: false },
  // ft4 - CAN-Bus Fehler gelöst
  { id: 'fp4', topicId: 'ft4', authorId: 'u3', authorRole: 'user', content: 'Nach dem Firmware-Update auf v3.2.1 hat die WiPro III im Fiat Ducato Baujahr 2023 CAN-Bus-Fehler geworfen. Status-LED blinkt in unregelmäßigen Intervallen, Türüberwachung funktioniert nicht mehr zuverlässig. Hat jemand das gleiche Problem?', createdAt: '2026-03-20T14:30:00Z', updatedAt: null, likes: [], likeCount: 0, isSolution: false, reported: false },
  { id: 'fp5', topicId: 'ft4', authorId: 'u2', authorRole: 'manager', content: 'Danke für die Meldung. Das Problem ist uns bekannt. Bitte prüfe zuerst die DIP-Schalterstellung –  nach dem Update muss Schalter 3 auf ON stehen. Falls das nicht hilft, schick uns die Seriennummer per E-Mail.', createdAt: '2026-03-20T15:00:00Z', updatedAt: null, likes: [{ userId: 'u3', userName: 'Max Weber', timestamp: '2026-03-20T15:05:00Z' }, { userId: 'u4', userName: 'Anna Fischer', timestamp: '2026-03-20T16:00:00Z' }], likeCount: 2, isSolution: false, reported: false },
  { id: 'fp6', topicId: 'ft4', authorId: 'u3', authorRole: 'user', content: 'DIP-Schalter 3 war tatsächlich nicht korrekt. Nach dem Umstellen läuft alles wieder einwandfrei. Danke für die schnelle Hilfe!', createdAt: '2026-03-20T16:30:00Z', updatedAt: null, likes: [{ userId: 'u2', userName: 'Thomas Schulz', timestamp: '2026-03-20T16:35:00Z' }], likeCount: 1, isSolution: true, reported: false },
  { id: 'fp7', topicId: 'ft4', authorId: 'u2', authorRole: 'manager', content: 'Perfekt! Wir werden das in die Release-Notes aufnehmen, damit andere Händler das direkt beachten. Thema als gelöst markiert.', createdAt: '2026-03-20T17:00:00Z', updatedAt: null, likes: [{ userId: 'u3', userName: 'Max Weber', timestamp: '2026-03-20T17:05:00Z' }, { userId: 'u1', userName: 'Admin Thitronik', timestamp: '2026-03-20T18:00:00Z' }], likeCount: 2, isSolution: false, reported: false },
  // ft5 - G.A.S. Fehlalarm gelöst
  { id: 'fp8', topicId: 'ft5', authorId: 'u4', authorRole: 'user', content: 'Bei unserem Kunden gab es bei Außentemperaturen unter -5°C regelmäßig Fehlalarme des G.A.S.-pro III. CO-Sensor scheint temperaturempfindlich zu sein. Kennt jemand das Problem?', createdAt: '2026-03-22T11:00:00Z', updatedAt: null, likes: [], likeCount: 0, isSolution: false, reported: false },
  { id: 'fp9', topicId: 'ft5', authorId: 'u2', authorRole: 'manager', content: 'Die CO-Sensoren haben bei extremer Kälte eine etwas höhere Empfindlichkeit. Prüfe bitte, ob der Sensor nicht in der Nähe einer Heizung oder Luftaustrittsöffnung montiert ist. Die Firmware v2.1.4 enthält bereits eine verbesserte Temperaturdrift-Kompensation.', createdAt: '2026-03-22T12:30:00Z', updatedAt: null, likes: [{ userId: 'u4', userName: 'Anna Fischer', timestamp: '2026-03-22T12:35:00Z' }], likeCount: 1, isSolution: false, reported: false },
  { id: 'fp10', topicId: 'ft5', authorId: 'u4', authorRole: 'user', content: 'Firmware-Update war die lösung! Seitdem keine Fehlalarme mehr. Der Sensor war korrekt montiert, lag wirklich an der Drift-Kompensation.', createdAt: '2026-03-22T14:00:00Z', updatedAt: null, likes: [{ userId: 'u2', userName: 'Thomas Schulz', timestamp: '2026-03-22T14:05:00Z' }, { userId: 'u3', userName: 'Max Weber', timestamp: '2026-03-23T09:00:00Z' }], likeCount: 2, isSolution: true, reported: false },
  // ft6 - Pro-finder GPS schwach
  { id: 'fp11', topicId: 'ft6', authorId: 'u3', authorRole: 'user', content: 'Im VW Crafter 2024 ist das GPS-Signal des Pro-finders extrem schwach. Habe ihn hinter dem Handschuhfach montiert. Die Metallabdeckung scheint das Signal zu blockieren. Externe Antenne wäre eine lösung, aber der Kunde möchte keinen sichtbaren Einbau.', createdAt: '2026-03-25T09:15:00Z', updatedAt: null, likes: [], likeCount: 0, isSolution: false, reported: false },
  { id: 'fp12', topicId: 'ft6', authorId: 'u2', authorRole: 'manager', content: 'Beim VW Crafter empfehlen wir die Montage unter der Armaturenabdeckung nahe der Frontscheibe. Dort ist typischerweise eine Kunststoffabdeckung, die GPS-Signale gut durchlässt. Alternativ: Die externe GPS-Antenne kann unauffällig unter der Windschutzscheibe verklebt werden.', createdAt: '2026-03-25T10:00:00Z', updatedAt: null, likes: [{ userId: 'u3', userName: 'Max Weber', timestamp: '2026-03-25T10:10:00Z' }], likeCount: 1, isSolution: false, reported: false },
  // ft8 - Kabelführung Tipp
  { id: 'fp13', topicId: 'ft8', authorId: 'u2', authorRole: 'manager', content: 'Hier einige Tipps zur optimalen Kabelführung im Mercedes Sprinter VS30:\n\n1. Hauptkabelbaum immer entlang der Originalkanäle führen\n2. Kreuzungen mit vorhandenen Kabelbäumen vermeiden\n3. Kabelbinder alle 15-20 cm setzen\n4. Scharfe Kanten immer mit Schutzschlauch absichern\n5. Stecker immer gegen Vibration sichern\n\nBei Fragen gerne hier im Thread.', createdAt: '2026-03-18T08:00:00Z', updatedAt: null, likes: [{ userId: 'u3', userName: 'Max Weber', timestamp: '2026-03-18T08:15:00Z' }, { userId: 'u4', userName: 'Anna Fischer', timestamp: '2026-03-18T09:00:00Z' }, { userId: 'u1', userName: 'Admin Thitronik', timestamp: '2026-03-18T10:00:00Z' }], likeCount: 3, isSolution: false, reported: false },
  { id: 'fp14', topicId: 'ft8', authorId: 'u3', authorRole: 'user', content: 'Danke für die Zusammenfassung! Punkt 4 ist besonders wichtig –  hatte mal einen Scheuerschaden an der B-Säule, weil ich den Schutzschlauch vergessen hatte.', createdAt: '2026-03-18T10:30:00Z', updatedAt: null, likes: [{ userId: 'u2', userName: 'Thomas Schulz', timestamp: '2026-03-18T11:00:00Z' }], likeCount: 1, isSolution: false, reported: false },
  // ft9 - Gelverbinder vs Löten
  { id: 'fp15', topicId: 'ft9', authorId: 'u3', authorRole: 'user', content: 'Wir diskutieren intern, ob Gelverbinder oder Lötverbindungen besser für den KFZ-Bereich sind. Thitronik empfiehlt Gelverbinder, aber einige Kollegen schwören auf Löten. Was sagt ihr?', createdAt: '2026-03-19T13:45:00Z', updatedAt: null, likes: [], likeCount: 0, isSolution: false, reported: false },
  { id: 'fp16', topicId: 'ft9', authorId: 'u2', authorRole: 'manager', content: 'Wir empfehlen die UB2A-Gelverbinder aus mehreren Gründen:\n\n- Vibrationsfeste Verbindung dank Gel-Abdichtung\n- Schnellere Verarbeitung als Löten\n- Kein Werkstattrauch beim Löten in beengten Fahrzeuginnenräumen\n- Reproduzierbare Qualität auch bei weniger erfahrenen Monteuren\n\nBei korrekter Anwendung sind Gelverbinder mindestens gleichwertig zu Lötverbindungen im 12V-Kleinspannungsbereich.', createdAt: '2026-03-19T15:00:00Z', updatedAt: null, likes: [{ userId: 'u3', userName: 'Max Weber', timestamp: '2026-03-19T15:05:00Z' }, { userId: 'u4', userName: 'Anna Fischer', timestamp: '2026-03-20T08:00:00Z' }, { userId: 'u1', userName: 'Admin Thitronik', timestamp: '2026-03-20T09:00:00Z' }], likeCount: 3, isSolution: true, reported: false },
  // ft10 - Peugeot Boxer gelöst
  { id: 'fp17', topicId: 'ft10', authorId: 'u4', authorRole: 'user', content: 'Muss demnächst eine WiPro III in einen Peugeot Boxer Baujahr 2024 einbauen. Welche DIP-Schalterstellung ist korrekt? In den aktuellen Unterlagen finde ich nur bis Baujahr 2023.', createdAt: '2026-03-21T10:30:00Z', updatedAt: null, likes: [], likeCount: 0, isSolution: false, reported: false },
  { id: 'fp18', topicId: 'ft10', authorId: 'u2', authorRole: 'manager', content: 'für den Peugeot Boxer ab 2024 gelten die gleichen Einstellungen wie für den Fiat Ducato der gleichen Generation (PSA-Plattform). DIP-Schalter: 1=ON, 2=OFF, 3=ON, 4=OFF. Die aktualisierte Anleitung wird in KW 15 im Händlerportal veröffentlicht.', createdAt: '2026-03-21T11:30:00Z', updatedAt: null, likes: [{ userId: 'u4', userName: 'Anna Fischer', timestamp: '2026-03-21T11:35:00Z' }], likeCount: 1, isSolution: true, reported: false },
  // ft11 - Ford Transit
  { id: 'fp19', topicId: 'ft11', authorId: 'u3', authorRole: 'user', content: 'Beim Ford Transit Custom 2023 –  brauche ich eine Zusatzhupe oder reicht die originale? In den Besonderheiten steht nichts dazu.', createdAt: '2026-04-01T11:00:00Z', updatedAt: null, likes: [], likeCount: 0, isSolution: false, reported: false },
  { id: 'fp20', topicId: 'ft11', authorId: 'u2', authorRole: 'manager', content: 'Beim Ford Transit Custom reagiert die Original-Hupe auch bei ausgeschalteter Zündung. Eine Zusatzhupe ist daher nicht zwingend erforderlich. Wir empfehlen sie aber trotzdem als akustische Verstärkung, insbesondere bei Campingplatz-Nutzung.', createdAt: '2026-04-01T14:00:00Z', updatedAt: null, likes: [], likeCount: 0, isSolution: false, reported: false },
  // ft12 - safe.lock NFC
  { id: 'fp21', topicId: 'ft12', authorId: 'u4', authorRole: 'user', content: 'Ein Kunde meldet, dass seine NFC-Karte am safe.lock nicht erkannt wird. Batterie gewechselt, Karte erneut angelernt –  ohne Erfolg. Liegt eventuell ein Hardwaredefekt vor?', createdAt: '2026-04-02T08:30:00Z', updatedAt: null, likes: [], likeCount: 0, isSolution: false, reported: false },
  { id: 'fp22', topicId: 'ft12', authorId: 'u2', authorRole: 'manager', content: 'Bitte prüfe zunächst, ob die NFC-Karte noch angelernt ist (Anlernmodus starten und Karte vorhalten). Falls keinerlei Reaktion kommt, bitte die Seriennummer der Zentrale an uns senden –  wir prüfen ob ein Austausch nötig ist.', createdAt: '2026-04-02T10:00:00Z', updatedAt: null, likes: [], likeCount: 0, isSolution: false, reported: false },
  // ft15 - Messe Erfahrungen
  { id: 'fp23', topicId: 'ft15', authorId: 'u3', authorRole: 'user', content: 'War jemand auf der Wohnmobil-Messe in Düsseldorf? Wie war euer Eindruck? Wir überlegen nächstes Jahr einen Stand zu machen.', createdAt: '2026-03-26T12:00:00Z', updatedAt: null, likes: [], likeCount: 0, isSolution: false, reported: false },
  { id: 'fp24', topicId: 'ft15', authorId: 'u4', authorRole: 'user', content: 'Wir waren da. Sehr gut besucht, viele Endkunden die nach Alarmsystemen fragen. Thitronik hatte auch einen Stand –  gutes Werbematerial mitgenommen. Lohnt sich definitiv!', createdAt: '2026-03-26T14:30:00Z', updatedAt: null, likes: [{ userId: 'u3', userName: 'Max Weber', timestamp: '2026-03-26T15:00:00Z' }, { userId: 'u1', userName: 'Admin Thitronik', timestamp: '2026-03-27T08:00:00Z' }], likeCount: 2, isSolution: false, reported: false },
  // ft16 - RMA gelöst
  { id: 'fp25', topicId: 'ft16', authorId: 'u4', authorRole: 'user', content: 'Wie lange dauert aktuell der RMA-Prozess bei einer defekten WiPro III Zentrale? Unser Kunde wartet schon seit einer Woche.', createdAt: '2026-03-23T09:00:00Z', updatedAt: null, likes: [], likeCount: 0, isSolution: false, reported: false },
  { id: 'fp26', topicId: 'ft16', authorId: 'u2', authorRole: 'manager', content: 'Der Standard-RMA-Prozess dauert 5-7 Werktage ab Eingang bei uns. Bei Nachweis eines Garantiefalls senden wir vorab ein Austauschgerät. Bitte den RMA-Antrag im Händlerportal stellen, dann geht es am schnellsten.', createdAt: '2026-03-23T10:30:00Z', updatedAt: null, likes: [{ userId: 'u4', userName: 'Anna Fischer', timestamp: '2026-03-23T10:35:00Z' }], likeCount: 1, isSolution: true, reported: false },
  // ft17 - Feature-Wunsch
  { id: 'fp27', topicId: 'ft17', authorId: 'u3', authorRole: 'user', content: 'Viele Kunden fragen nach einer Integration der Rückfahrkamera in die Thitronik App. Wäre das technisch möglich? Wäre ein echtes Alleinstellungsmerkmal.', createdAt: '2026-03-24T10:00:00Z', updatedAt: null, likes: [{ userId: 'u4', userName: 'Anna Fischer', timestamp: '2026-03-24T11:00:00Z' }, { userId: 'u1', userName: 'Admin Thitronik', timestamp: '2026-03-24T14:05:00Z' }], likeCount: 2, isSolution: false, reported: false },
  { id: 'fp28', topicId: 'ft17', authorId: 'u1', authorRole: 'admin', content: 'Danke für den Input! Wir nehmen das in unsere Feature-Roadmap auf. Aktuell prüfen wir WiFi-basierte Kamera-Anbindungen. Sobald es Neuigkeiten gibt, teilen wir das hier.', createdAt: '2026-03-24T14:00:00Z', updatedAt: null, likes: [{ userId: 'u3', userName: 'Max Weber', timestamp: '2026-03-24T14:10:00Z' }, { userId: 'u4', userName: 'Anna Fischer', timestamp: '2026-03-25T09:00:00Z' }], likeCount: 2, isSolution: false, reported: false },
];

export function initializeSeedData(API) {
  if (typeof window !== 'undefined') {
    // V18 –  Forum: roles, likes, locked, solutionPostId
    const initialized = localStorage.getItem('th__initialized_v18');
    
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
        { courseId: 'c1', userId: 'u1' },
        { courseId: 'c2', userId: 'u1' },
        { courseId: 'c3', userId: 'u1' },
        { courseId: 'c4', userId: 'u1' },
        { courseId: 'c5', userId: 'u1' },
        { courseId: 'c6', userId: 'u1' },
        { courseId: 'c7', userId: 'u1' },
        { courseId: 'c8', userId: 'u1' },
        { courseId: 'c9', userId: 'u1' },
        { courseId: 'c10', userId: 'u1' },
        { courseId: 'c11', userId: 'u1' },
        { courseId: 'c13', userId: 'u1' }
      ]));
      localStorage.setItem('th_media', JSON.stringify([]));

      // Forum Data
      API.saveForumCategories(seedForumCategories);
      API.saveForumTopics(seedForumTopics);
      API.saveForumPosts(seedForumPosts);
      
      localStorage.setItem('th__initialized_v18', 'true');
    }
  }
}

