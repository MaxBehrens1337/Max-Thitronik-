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

  // Modul 14: Renault Master
  {
    id: 'c14', title: 'Renault Master', slug: 'renault-master', status: 'published', sortOrder: 14, icon: null, questionCount: 20, hasVideo: false, hasImages: false,
    image: '/Renault Master/Renault Master.jpeg',
    intro: 'Alles Wichtige zum WiPro III safe.lock Einbau im Renault Master 2019-2024 sowie der Abschalteinrichtung.',
    learningGoals: [
      'CAN-Bus Logik und DIP-Schalter sicher einstellen',
      'Verdrahtungsunterschiede Master ab 2011 vs. 2019-2024 kennen',
      'Spezifische Abschalteinrichtung (Pro-finder) montieren und prüfen'
    ]
  },

  // Modul 15: VW Crafter / MAN TGE
  {
    id: 'c15', title: 'VW Crafter / MAN TGE', slug: 'vw-crafter-man-tge', status: 'published', sortOrder: 15, icon: null, questionCount: 45, hasVideo: false, hasImages: false,
    image: '/Vw Crafter/VWCrafter.webp',
    intro: 'Spezialwissen für den Einbau der WiPro III safe.lock im VW Crafter II / MAN TGE – für Modelljahre 2017–2024 (ohne Startknopf) und 2025+ (mit Startknopf).',
    learningGoals: [
      'Modelljahrunterschiede 2017–2024 vs. 2025+ sicher unterscheiden',
      'CAN-Bus-Pinbelegung am Bodycontrol-Modul korrekt zuordnen',
      'Elektrische Anschlüsse, Relais-Verdrahtung und Alarmfunktionen beherrschen',
      'Technische Daten der Zentrale und des Funk-Zubehörs kennen'
    ]
  }
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
  { id: 'l14', courseId: 'c14', title: 'Renault Master WiPro III safe.lock & Abschalteinrichtung', duration: '20 Min', videoUrl: null, thumbnailUrl: null },
  { id: 'l15', courseId: 'c15', title: 'VW Crafter / MAN TGE - WiPro III safe.lock Einbau', status: 'published', sortOrder: 1, videoUrl: null, thumbnailUrl: null }
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
    explanation: 'Achte auf den korrekten Montageabstand (Spaltmaß) zur Gegenkante und Positionierung an den Kanten.'
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
    explanation: 'Beim Crimpen immer darauf achten, dass die Adern tief genug eingeführt sind und das Gel sie korrekt umschließt.'
  },
  {
    id: 'q_m6_4', lessonId: 'l6', courseId: 'c6', type: 'single', question: 'Welches Werkzeug empfehlen wir für eine präzise und einfache Verarbeitung von Gelverbindern?',
    answers: ['/Gelverbinder/Frage 4 Welches Werkzeug empehlen wir für eine präzise und einfache Verarbeitung von Gelverbindern Richtige Antwort.webp', '/Gelverbinder/Frage 4 Welches Werkzeug empehlen wir für eine präzise und einfache Verarbeitung von Gelverbindern falsche Antwort.webp', '/Gelverbinder/Frage 4 Welches Werkzeug empehlen wir für eine präzise und einfache Verarbeitung von Gelverbindern falsche Antwort 2.webp'],
    correctAnswers: ['/Gelverbinder/Frage 4 Welches Werkzeug empehlen wir für eine präzise und einfache Verarbeitung von Gelverbindern Richtige Antwort.webp'],
    explanation: 'Für den optimalen Anpressdruck empfehlen wir immer das genormte Crimpwerkzeug, keine herkömmliche Kombizange.'
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
    explanation: 'Ja, man kann sogar mehrere Montageadapter stapeln, um zu große Abstände zwischen Sender und Magnet fachgerecht zu überbrücken.'
  },
  {
    id: 'q_m9_4', lessonId: 'l9', courseId: 'c9', type: 'single', question: 'Kann der Montageadapter zur Montage auf Dichtungen verwendet werden?',
    answers: ['/Magnet Montageadapter/Frage 4 Kann der Montageadapter zur Montage auf Dichtungen verwendet werden Richtige Antwort.webp','/Magnet Montageadapter/Frage 4 Kann der Montageadapter zur Montage auf Dichtungen verwendet werden falsche Antwort.webp','/Magnet Montageadapter/Frage 4 Kann der Montageadapter zur Montage auf Dichtungen verwendet werden falsche Antwort 2.webp'],
    correctAnswers: ['/Magnet Montageadapter/Frage 4 Kann der Montageadapter zur Montage auf Dichtungen verwendet werden Richtige Antwort.webp'],
    explanation: 'Nein, eine Montage direkt auf flexiblen Dichtungen führt zwangsläufig zu fehlerhaften Auslösungen, da das Spaltmaß nicht stabil bleibt.'
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
  },

  // --- Modul 15 (VW Crafter / MAN TGE) ---
  {
    id: 'VC-Q001', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Welche Systemwahl ist laut Einbauanleitung beim VW Crafter II/MAN TGE ab Modelljahr 2025 mit Startknopf korrekt?',
    answers: ['Es muss eine WiPro III verbaut werden, weil safe.lock die ZV derzeit nicht ansteuern kann.', 'Es muss eine WiPro III safe.lock verbaut werden, obwohl die ZV-Ansteuerung derzeit nicht möglich ist.', 'Es darf nur eine WiPro III ohne Funk-Zubehör verbaut werden.', 'Es muss auf eine CAN-Bus-Schnittstelle ohne Zentrale ausgewichen werden.'],
    correctAnswers: ['Es muss eine WiPro III safe.lock verbaut werden, obwohl die ZV-Ansteuerung derzeit nicht möglich ist.'],
    explanation: 'Die 2025+-Anleitung fordert ausdrücklich die WiPro III safe.lock, weist aber darauf hin, dass die ZV-Ansteuerung derzeit nicht möglich ist.'
  },
  {
    id: 'VC-Q002', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Welches Prüfergebnis zeigt, dass die WiPro III safe.lock die ZV NICHT ansteuern kann?',
    answers: ['Nach 8 Min. lässt sich das Fahrzeug gar nicht mehr entriegeln.', 'Nach 8 Min. entriegelt der Originalschlüssel alle Türen normal.', 'Nach 8 Min. lässt sich manuell nur die Fahrertür entriegeln, alle anderen bleiben zu.', 'Nach 8 Min. blinkt das Fahrzeug beim Entriegeln nicht mehr.'],
    correctAnswers: ['Nach 8 Min. lässt sich manuell nur die Fahrertür entriegeln, alle anderen bleiben zu.'],
    explanation: 'Die Anleitung beschreibt diesen 8-Minuten-Test genau. Wenn danach nur die Fahrertür entriegelt werden kann, ist die ZV-Ansteuerung nicht nutzbar.'
  },
  {
    id: 'VC-Q003', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Über welchen Pin am Türsteuergerät wird beim VW Crafter 2017–2024 die ZV angesteuert?',
    answers: ['Weißer Stecker, Pin 1, rot-grün Fahrzeug auf blau-schwarz WiPro.', 'Stecker C BCM, Pin 42, weiß-gelb auf rot-rosa WiPro.', 'Stecker A BCM, Pin 20, orange-braun auf violett-orange WiPro.', 'OBD-Stecker, schwarz-blau auf gelb WiPro.'],
    correctAnswers: ['Weißer Stecker, Pin 1, rot-grün Fahrzeug auf blau-schwarz WiPro.'],
    explanation: 'Die ZV-Ansteuerung erfolgt am weißen Stecker des Türsteuergeräts, Pin 1 rot-grün, mit der blau-schwarzen WiPro-Leitung.'
  },
  {
    id: 'VC-Q004', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Wo ist laut 12/25-Anleitung der bevorzugte Klebemontageort der WiPro III safe.lock Zentrale (2025+)?',
    answers: ['Unterseite des Armaturenbretts unter dem Lichtschalter.', 'Obere glatte Fläche neben dem Sicherungskasten.', 'Im Batteriekasten im Fahrerhaus.', 'Direkt am Bodycontrol-Modul Stecker A.'],
    correctAnswers: ['Obere glatte Fläche neben dem Sicherungskasten.'],
    explanation: 'Für 2025+ wird die obere glatte Fläche neben dem Sicherungskasten als Montageort genannt.'
  },
  {
    id: 'VC-Q005', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Welcher Montageort wird in der 07/25-Anleitung (2017–2024) für die WiPro III safe.lock Zentrale genannt?',
    answers: ['Links oberhalb des Sicherungskastens.', 'Im Dachhimmel über dem Fahrerplatz.', 'Im Batteriekasten unter dem Fußboden.', 'An der Verkleidung der Fahrertür.'],
    correctAnswers: ['Links oberhalb des Sicherungskastens.'],
    explanation: 'Für 2017–2024 wird links oberhalb des Sicherungskastens als geeignete Klebefläche genannt.'
  },
  {
    id: 'VC-Q006', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Was ist laut 12/25-Anleitung beim Verkleben der Zentrale zu beachten?',
    answers: ['Das vorhandene Klebepad bleibt und wird ergänzt.', 'Das vorhandene Klebepad wird entfernt, doppelseitiges Schaumklebeband auf das untere Drittel der Zentrale.', 'Die Zentrale wird mit Kabelbindern fixiert.', 'Ein Klettsystem aus dem Lieferumfang verwenden.'],
    correctAnswers: ['Das vorhandene Klebepad wird entfernt, doppelseitiges Schaumklebeband auf das untere Drittel der Zentrale.'],
    explanation: 'Die 2025+-Anleitung fordert, das vorhandene Klebepad zu entfernen und doppelseitiges Schaumklebeband auf dem unteren Drittel zu verwenden.'
  },
  {
    id: 'VC-Q007', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Welche Sicherung muss in die Plusleitung Klemme 30 der WiPro III safe.lock eingesetzt werden?',
    answers: ['5-A-Sicherung', '10-A-Sicherung', '15-A-Sicherung', '20-A-Sicherung'],
    correctAnswers: ['10-A-Sicherung'],
    explanation: 'Die rote Leitung der Polklemme wird mit einer 10-A-Sicherung auf den Pluspol der Starterbatterie gelegt.'
  },
  {
    id: 'VC-Q008', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Wo wird beim VW Crafter 2025+ der Masseanschluss Klemme 31 hergestellt?',
    answers: ['Am Minuspol der Starterbatterie.', 'An einem der Massepunkte an der A-Säule hinter der Verkleidung beim Motorhaubenhebel.', 'Am OBD-Stecker auf schwarz-blau.', 'Am BCM Stecker C, Pin 42.'],
    correctAnswers: ['An einem der Massepunkte an der A-Säule hinter der Verkleidung beim Motorhaubenhebel.'],
    explanation: 'Die 2025+-Anleitung nennt einen der Massepunkte hinter dem Motorhaubenhebel an der A-Säule.'
  },
  {
    id: 'VC-Q009', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Wo unterscheidet sich der Masseanschluss Klemme 31 zwischen 2017–2024 und 2025+?',
    answers: ['Kein Unterschied, beide am Minuspol der Batterie.', '2017–2024 am Minuspol der Batterie, 2025+ an einem Massepunkt der A-Säule.', '2017–2024 an der A-Säule, 2025+ am Minuspol.', '2017–2024 am Sicherungskasten, 2025+ am BCM.'],
    correctAnswers: ['2017–2024 am Minuspol der Batterie, 2025+ an einem Massepunkt der A-Säule.'],
    explanation: 'Beim 2017–2024er Modell geht die schwarze Leitung auf den Minuspol der Batterie. Beim 2025+ Modell wird ein Massepunkt an der A-Säule verwendet.'
  },
  {
    id: 'VC-Q010', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Welche Verbindung für Klemme 15 Zündung ist in beiden Anleitungen identisch?',
    answers: ['Gelbe WiPro-Leitung an schwarz-blaue OBD-Leitung.', 'Gelbe WiPro-Leitung an Pin 42 des BCM.', 'Rote WiPro-Leitung an schwarz-blaue OBD-Leitung.', 'Gelbe WiPro-Leitung an den Minuspol der Batterie.'],
    correctAnswers: ['Gelbe WiPro-Leitung an schwarz-blaue OBD-Leitung.'],
    explanation: 'Klemme 15 wird in beiden Anleitungen über die schwarz-blaue OBD-Leitung hergestellt; die WiPro-Leitung ist gelb.'
  },
  {
    id: 'VC-Q011', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Welche CAN-Pinbelegung am Bodycontrol-Modul ist für 2025+ korrekt?',
    answers: ['Stecker A, Pin 17 orange-braun und Pin 16 orange-grün.', 'Stecker C, Pin 42 weiß-gelb und Pin 43 weiß-grün.', 'Stecker A mit blauem Einsatz, Pin 20 orange-braun und Pin 21 orange-grün.', 'Türsteuergerät, weißer Stecker, Pin 1 rot-grün.'],
    correctAnswers: ['Stecker A mit blauem Einsatz, Pin 20 orange-braun und Pin 21 orange-grün.'],
    explanation: 'Für 2025+ werden am BCM Stecker A (blauer Einsatz) Pin 20 orange-braun und Pin 21 orange-grün verwendet.'
  },
  {
    id: 'VC-Q012', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Welche CAN-Pinbelegung am Bodycontrol-Modul ist für 2017–2024 korrekt?',
    answers: ['Stecker A, Pin 17 orange-braun und Pin 16 orange-grün.', 'Stecker A, Pin 20 orange-braun und Pin 21 orange-grün.', 'Stecker C, Pin 42 weiß-gelb und Pin 43 weiß-grün.', 'OBD-Stecker, schwarz-blau und rot-grün.'],
    correctAnswers: ['Stecker A, Pin 17 orange-braun und Pin 16 orange-grün.'],
    explanation: 'Für 2017–2024 nennt die Anleitung am BCM Stecker A Pin 17 orange-braun und Pin 16 orange-grün.'
  },
  {
    id: 'VC-Q013', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Welche WiPro-seitigen Kabelfarben gehören zum CAN-Anschluss?',
    answers: ['Rot-schwarz und blau-weiß', 'Violett-orange und weiß-orange', 'Gelb-grün und braun-rot', 'Orange-braun und orange-grün'],
    correctAnswers: ['Violett-orange und weiß-orange'],
    explanation: 'Die WiPro-seitigen CAN-Kabel sind violett-orange und weiß-orange. Orange-braun/-grün sind die fahrzeugseitigen Farben.'
  },
  {
    id: 'VC-Q014', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Wo befindet sich das Bodycontrol-Modul beim VW Crafter / MAN TGE?',
    answers: ['Hinter dem Handschuhfach.', 'Unter dem Armaturenbrett links neben der Lenksäule.', 'Im Motorraum neben der Batterie.', 'Unter dem Fahrersitz.'],
    correctAnswers: ['Unter dem Armaturenbrett links neben der Lenksäule.'],
    explanation: 'Das Bodycontrol-Modul befindet sich unter dem Armaturenbrett links neben der Lenksäule; die Stecker zeigen zur Lenksäule.'
  },
  {
    id: 'VC-Q015', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Was ist zu beachten, wenn die CAN-Kabel im Stecker A ausstattungsbedingt nicht vorhanden sind?',
    answers: ['Der Einbau ist nicht möglich.', 'Die Kabel befinden sich alternativ im Türkabelbaum.', 'Die Kabel müssen vom Kombiinstrument abgegriffen werden.', 'Es muss ein zusätzliches CAN-Interface bestellt werden.'],
    correctAnswers: ['Die Kabel befinden sich alternativ im Türkabelbaum.'],
    explanation: 'In einigen Fällen sind die CAN-Kabel nicht im Stecker A, sondern alternativ im Türkabelbaum zu finden.'
  },
  {
    id: 'VC-Q016', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'An welchem Stecker und Pin des BCM wird das Warnblinkersignal angeschlossen?',
    answers: ['Stecker A, Pin 20, orange-braun.', 'Stecker B, Pin 30, rot-schwarz.', 'Stecker C, Pin 42, weiß-gelb Fahrzeug auf rot-rosa WiPro.', 'Stecker A, Pin 16, orange-grün.'],
    correctAnswers: ['Stecker C, Pin 42, weiß-gelb Fahrzeug auf rot-rosa WiPro.'],
    explanation: 'Der Warnblinker wird am BCM Stecker C, Pin 42, mit Fahrzeugfarbe weiß-gelb und WiPro-Farbe rot-rosa angeschlossen.'
  },
  {
    id: 'VC-Q017', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Warum kann die Fahrzeughupe beim VW Crafter 2025+ nicht direkt als Alarmsirene angesteuert werden?',
    answers: ['Die Hupe hat eine zu geringe Lautstärke.', 'Die Fahrzeughupe hat kein Dauerplus.', 'Der Hupenrelais-Anschluss ist nicht zugänglich.', 'Die Hupe arbeitet mit einer anderen Frequenz.'],
    correctAnswers: ['Die Fahrzeughupe hat kein Dauerplus.'],
    explanation: 'Die 2025+-Anleitung sagt ausdrücklich, dass die Fahrzeughupe kein Dauerplus hat und daher bei ausgeschalteter Zündung nicht angesteuert werden kann.'
  },
  {
    id: 'VC-Q018', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'An welchem Pin des Relais wird die rosafarbene Steuerleitung von WiPro-Pin 9 angeschlossen?',
    answers: ['Pin 30', 'Pin 85', 'Pin 86', 'Pin 87'],
    correctAnswers: ['Pin 85'],
    explanation: 'Die rosafarbene Leitung von WiPro-Pin 9 wird an Relais-Pin 85 angeschlossen.'
  },
  {
    id: 'VC-Q019', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Wie ist die Relais-Verdrahtung der Zusatzhupe laut 2025+-Anleitung aufgebaut?',
    answers: ['Pin 30 und 86 Dauerplus, Pin 85 Steuerleitung WiPro-Pin 9, Pin 87 zur Hupe.', 'Pin 30 Dauerplus, Pin 85+86 durchverbunden, Pin 87 zur Hupe.', 'Pin 85 Dauerplus, Pin 86 Steuerleitung, Pin 87 Masse, Pin 30 zur Hupe.', 'Pin 87 Dauerplus, Pin 30 zur Hupe, Pin 85+86 auf Masse.'],
    correctAnswers: ['Pin 30 und 86 Dauerplus, Pin 85 Steuerleitung WiPro-Pin 9, Pin 87 zur Hupe.'],
    explanation: 'Pin 30 und 86 liegen auf Dauerplus, Pin 85 erhält die rosafarbene Steuerleitung von WiPro-Pin 9, Pin 87 führt als Schaltausgang zur Hupe.'
  },
  {
    id: 'VC-Q020', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Welche Lautstärke hat die Zusatzhupe und welche die Backup-Sirene laut 2025+-Anleitung?',
    answers: ['Zusatzhupe 105 dB, Backup-Sirene 115 dB', 'Zusatzhupe 115 dB, Backup-Sirene 105 dB', 'Beide 110 dB', 'Zusatzhupe 120 dB, Backup-Sirene 95 dB'],
    correctAnswers: ['Zusatzhupe 115 dB, Backup-Sirene 105 dB'],
    explanation: 'Die 2025+-Anleitung nennt 115 dB für die Zusatzhupe und 105 dB für die Backup-Sirene.'
  },
  {
    id: 'VC-Q021', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Was ist der entscheidende Vorteil der Backup-Sirene gegenüber der Zusatzhupe?',
    answers: ['Sie ist lauter.', 'Sie besitzt einen eingebauten Akku und alarmiert auch bei Sabotage der Spannungsversorgung.', 'Sie benötigt kein eigenes Montagematerial.', 'Sie ersetzt den Warnblinker-Anschluss.'],
    correctAnswers: ['Sie besitzt einen eingebauten Akku und alarmiert auch bei Sabotage der Spannungsversorgung.'],
    explanation: 'Die Backup-Sirene alarmiert dank eingebautem Akku auch bei Ausfall oder Sabotage der Spannungsversorgung.'
  },
  {
    id: 'VC-Q022', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Durch welche Durchführung wird die Sirenleitung vom Innenraum in den Motorraum geführt?',
    answers: ['Durch die große Gummidurchführung am Spritzblech.', 'Durch die kleinere Gummidurchführung hinter der Motorraumbatterie.', 'Durch den Faltenbalg der Fahrertür.', 'Durch eine neu zu bohrende Öffnung in der Stirnwand.'],
    correctAnswers: ['Durch die kleinere Gummidurchführung hinter der Motorraumbatterie.'],
    explanation: 'Ein Ziehdraht wird durch die kleinere Gummidurchführung hinter der Motorraumbatterie geführt.'
  },
  {
    id: 'VC-Q023', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Welchen Durchmesser muss die Bohrung für die Status-LED haben?',
    answers: ['5 mm', '6 mm', '8 mm', '10 mm'],
    correctAnswers: ['8 mm'],
    explanation: 'Für die Status-LED wird ein 8-mm-Loch gebohrt.'
  },
  {
    id: 'VC-Q024', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Welche Mindest-Softwareversion und Seriennummer benötigt der VW Crafter 2025+ mit Startknopf?',
    answers: ['SW 1.0.0.sx, ab Seriennummer 5458-001', 'SW 1.1.0.sx, ab Seriennummer 5458-005', 'SW 1.2.1sx, ab Seriennummer 5458-010', 'SW 2.0.0.sx, ab Seriennummer 5458-020'],
    correctAnswers: ['SW 1.2.1sx, ab Seriennummer 5458-010'],
    explanation: 'Für 2025+ mit Startknopf wird Softwareversion 1.2.1sx ab Seriennummer 5458-010 benötigt.'
  },
  {
    id: 'VC-Q025', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Welche Mindest-Softwareversion und Seriennummer benötigt der VW Crafter 2017–2024 ohne Startknopf?',
    answers: ['SW 1.0.0.sx, ab Seriennummer 5458-001', 'SW 1.2.1sx, ab Seriennummer 5458-010', 'SW 0.9.0.sx, ab Seriennummer 5458-000', 'SW 2.0.0.sx, ab Seriennummer 5458-020'],
    correctAnswers: ['SW 1.0.0.sx, ab Seriennummer 5458-001'],
    explanation: 'Für 2017–2024 ohne Startknopf wird SW 1.0.0.sx ab Seriennummer 5458-001 benötigt.'
  },
  {
    id: 'VC-Q026', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Wie lange ertönt die Hupe bei einem Einbruchalarm laut Kurzanleitung?',
    answers: ['Ca. 15 Sekunden', 'Ca. 30 Sekunden', 'Ca. 60 Sekunden', 'Ca. 180 Sekunden'],
    correctAnswers: ['Ca. 30 Sekunden'],
    explanation: 'Bei einem Einbruchalarm ertönt die Hupe ca. 30 Sekunden.'
  },
  {
    id: 'VC-Q027', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Wie lange blinken Fahrzeugblinker und Status-LED bei einem Einbruchalarm?',
    answers: ['30 Sekunden', '60 Sekunden', '120 Sekunden', '180 Sekunden'],
    correctAnswers: ['180 Sekunden'],
    explanation: 'Blinker und Status-LED blinken bei einem Einbruchalarm 180 Sekunden lang.'
  },
  {
    id: 'VC-Q028', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Was unterscheidet den akustischen Gasalarm vom Einbruchalarm am zuverlässigsten?',
    answers: ['Der Gasalarm ist grundsätzlich leiser.', 'Der Gasalarm erfolgt mit Unterbrechungen bzw. Pausen.', 'Der Gasalarm dauert 180 Sekunden statt 30 Sekunden.', 'Beim Gasalarm wird der Warnblinker nicht angesteuert.'],
    correctAnswers: ['Der Gasalarm erfolgt mit Unterbrechungen bzw. Pausen.'],
    explanation: 'Beim Gasalarm ertönen Sirene und ggf. Hupe mit Unterbrechungen, beim Einbruchalarm ist der akustische Ablauf anders.'
  },
  {
    id: 'VC-Q029', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Wie wird der Panikalarm über den Funk-Handsender 868 ausgelöst?',
    answers: ['Dreimal schnell die linke Taste drücken.', 'Beide Tasten gleichzeitig ca. 1 Sekunde gedrückt halten.', 'Die rechte Taste 5 Sekunden gedrückt halten.', 'Erst die linke, dann sofort die rechte Taste drücken.'],
    correctAnswers: ['Beide Tasten gleichzeitig ca. 1 Sekunde gedrückt halten.'],
    explanation: 'Beide Tasten gleichzeitig ca. eine Sekunde gedrückt halten aktiviert den Panikalarm.'
  },
  {
    id: 'VC-Q030', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Wie kann ein laufender Alarm beendet werden?',
    answers: ['Nur durch Trennen der Spannungsversorgung.', 'Nur durch Drehen der Zündung auf Klemme 15.', 'Durch eine beliebige Taste des Funk-Handsenders oder die Öffnen-Taste der Original-Fernbedienung.', 'Ausschließlich durch die THITRONIK App.'],
    correctAnswers: ['Durch eine beliebige Taste des Funk-Handsenders oder die Öffnen-Taste der Original-Fernbedienung.'],
    explanation: 'Zum Beenden eines Alarms kann eine beliebige Taste des Funk-Handsenders oder die Öffnen-Taste der Original-Fernbedienung genutzt werden.'
  },
  {
    id: 'VC-Q031', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Was passiert, wenn die WiPro III safe.lock scharfgeschaltet wird, während ein Funk-Magnetkontakt geöffnet ist?',
    answers: ['Das System lässt sich nicht scharfschalten.', 'Es wird sofort ein Einbruchalarm ausgelöst.', 'Die Lüftungsfunktion wird aktiv: der offene Kontakt ist zunächst ausgenommen und wird nach dem Schließen wieder integriert.', 'Der offene Kontakt bleibt dauerhaft ohne Funktion.'],
    correctAnswers: ['Die Lüftungsfunktion wird aktiv: der offene Kontakt ist zunächst ausgenommen und wird nach dem Schließen wieder integriert.'],
    explanation: 'Bei geöffnetem Kontakt wird die Lüftungsfunktion aktiv. Der offene Kontakt ist zunächst ausgenommen und wird nach dem Schließen wieder integriert.'
  },
  {
    id: 'VC-Q032', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Welche Aussage zur Bedienlogik des Funk-Handsenders 868 ist korrekt?',
    answers: ['Nur die Taste mit Lautsprechersymbol schärft die Anlage.', 'Beliebige Taste wechselt in den nächst logischen Zustand; beide Tasten zusammen aktivieren den Panikalarm.', 'Der Handsender kann nur entschärfen, nicht schärfen.', 'Der Handsender arbeitet auf 433,92 MHz.'],
    correctAnswers: ['Beliebige Taste wechselt in den nächst logischen Zustand; beide Tasten zusammen aktivieren den Panikalarm.'],
    explanation: 'Jede Taste wechselt in den nächst logischen Zustand. Beide Tasten zusammen lösen den Panikalarm aus.'
  },
  {
    id: 'VC-Q033', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Wie lange benötigt der G.A.S.-connect Funk-Gaswarner nach dem Einschalten, bis er einsatzbereit ist?',
    answers: ['Ca. 30 Sekunden', 'Ca. 1 Minute', 'Ca. 4 Minuten', 'Ca. 10 Minuten'],
    correctAnswers: ['Ca. 4 Minuten'],
    explanation: 'Der G.A.S.-connect benötigt ca. 4 Minuten Vorlauf. Sobald die LED grün blinkt, ist er einsatzbereit.'
  },
  {
    id: 'VC-Q034', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Kann der G.A.S.-connect auch bei unscharfer WiPro III safe.lock einen Alarm auslösen?',
    answers: ['Nein, nur bei scharfgeschalteter Anlage.', 'Ja, der Gasalarm kann bei scharfer und unscharfer Anlage ausgelöst werden.', 'Nur wenn die Zündung eingeschaltet ist.', 'Nur in Verbindung mit einem Pro-finder.'],
    correctAnswers: ['Ja, der Gasalarm kann bei scharfer und unscharfer Anlage ausgelöst werden.'],
    explanation: 'Der Gasalarm kann sowohl bei scharfer als auch bei unscharfer WiPro III safe.lock ausgelöst werden.'
  },
  {
    id: 'VC-Q035', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Welcher Batterietyp wird im Funk-Handsender 868 und im Funk-Magnetkontakt 868 verwendet?',
    answers: ['CR2025', 'CR2032', 'AAA', 'CR123A'],
    correctAnswers: ['CR2032'],
    explanation: 'Für Funk-Handsender 868 und Funk-Magnetkontakt 868 wird jeweils eine CR2032-Knopfzelle verwendet.'
  },
  {
    id: 'VC-Q036', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Was passiert beim Signal Senderbatterie schwach eines Funk-Zubehörs?',
    answers: ['Die WiPro piept dauerhaft bis zum Batterietausch.', 'Beim Betätigen des Zubehörs ertönt ein langer Ton aus dem internen Pieper; die rote Sende-LED erlischt erst nach 30 Sekunden.', 'Die Status-LED blinkt rot-grün abwechselnd.', 'Das Funk-Zubehör wird automatisch aus dem System gelöscht.'],
    correctAnswers: ['Beim Betätigen des Zubehörs ertönt ein langer Ton aus dem internen Pieper; die rote Sende-LED erlischt erst nach 30 Sekunden.'],
    explanation: 'Für schwache Senderbatterie: langer Ton aus dem Pieper und die Sende-LED erlischt erst nach 30 Sekunden.'
  },
  {
    id: 'VC-Q037', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Welche Vorgehensweise wird empfohlen, wenn zusätzlich ein Pro-finder eingebaut werden soll?',
    answers: ['Den Pro-finder erst nach dem Rückbau aller Verkleidungen anschließen.', 'Vorab einen geeigneten Einbauort festlegen und den elektrischen Anschluss parallel mit herstellen.', 'Den Pro-finder direkt an Pin 42 des BCM anschließen.', 'Den Pro-finder ausschließlich über die OBD-Schnittstelle versorgen.'],
    correctAnswers: ['Vorab einen geeigneten Einbauort festlegen und den elektrischen Anschluss parallel mit herstellen.'],
    explanation: 'Beide Anleitungen empfehlen, beim Pro-finder-Einbau vorab einen Einbauort festzulegen und den Anschluss parallel herzustellen.'
  },
  {
    id: 'VC-Q040', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Welche Funkfrequenz nutzen WiPro III safe.lock und zugehörige Sender?',
    answers: ['433,92 MHz', '868,35 MHz', '915,00 MHz', '2,4 GHz'],
    correctAnswers: ['868,35 MHz'],
    explanation: 'Die technischen Daten nennen 868,35 MHz als Sende- und Empfangsfrequenz.'
  },
  {
    id: 'VC-Q041', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Wie groß ist die maximale Freifeld-Reichweite des Funk-Handsenders 868?',
    answers: ['30 m', '50 m', '75 m', '100 m'],
    correctAnswers: ['75 m'],
    explanation: 'Die technischen Daten nennen 75 m Freifeld-Reichweite.'
  },
  {
    id: 'VC-Q042', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Wie hoch ist der maximale Strom am Sirenenausgang der WiPro III safe.lock?',
    answers: ['0,5 A', '1 A', '2 A', '3 A'],
    correctAnswers: ['1 A'],
    explanation: 'Der Sirenenausgang ist mit maximal 1 A spezifiziert.'
  },
  {
    id: 'VC-Q043', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Welche maximale Leistung kann der Blinkerausgang der WiPro III safe.lock schalten?',
    answers: ['30 W', '45 W', '60 W', '100 W'],
    correctAnswers: ['60 W'],
    explanation: 'Der Blinkerausgang ist mit 60 W spezifiziert.'
  },
  {
    id: 'VC-Q044', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Welche Schnittstelle hat die WiPro III safe.lock zur Alarmweiterleitung an einen Pro-finder?',
    answers: ['USB-C', 'RJ11', 'Bluetooth', 'RJ45'],
    correctAnswers: ['RJ11'],
    explanation: 'Die technischen Daten nennen einen RJ11-Ausgang für Pro-finder-Alarmauswertung.'
  },
  {
    id: 'VC-Q045', lessonId: 'l15', courseId: 'c15', type: 'single',
    question: 'Welche Blinkfolge der Status-LED steht für den Alarmgrund Eingang Innenbeleuchtung?',
    answers: ['5-mal Blinken', '8-mal Blinken', '10-mal Blinken', '11-mal Blinken'],
    correctAnswers: ['11-mal Blinken'],
    explanation: 'Der Alarmspeicher ordnet 11-mal Blinken dem Alarmgrund Eingang Innenbeleuchtung zu.'
  },

  // --- Modul 14 (Renault Master) ---
  {
    id: 'RM-Q001', lessonId: 'l14', courseId: 'c14', type: 'single',
    question: 'Welche Systemvariante wird beim Renault Master 2019–2024 eingebaut?',
    answers: ['WiPro III', 'WiPro III safe.lock', 'WiPro II', 'WiPro III CAN-only'],
    correctAnswers: ['WiPro III safe.lock'],
    explanation: 'Beim Renault Master 2019–2024 wird die WiPro III safe.lock verbaut, die eine CAN-Bus-Anbindung und Zentralverriegelungsansteuerung ermöglicht.'
  },
  {
    id: 'RM-Q002', lessonId: 'l14', courseId: 'c14', type: 'single',
    question: 'Wo befindet sich der empfohlene Einbauort für die WiPro III safe.lock Zentrale im Renault Master?',
    answers: ['Unter dem Fahrersitz', 'Hinter der A-Säulenverkleidung links', 'Im Handschuhfach', 'Unter der Motorhaube'],
    correctAnswers: ['Hinter der A-Säulenverkleidung links'],
    explanation: 'Die Zentrale wird hinter der A-Säulenverkleidung auf der Fahrerseite montiert, da dort ausreichend Platz und ein guter Zugang zu den CAN-Bus-Leitungen besteht.'
  },
  {
    id: 'RM-Q003', lessonId: 'l14', courseId: 'c14', type: 'single',
    question: 'Welche CAN-Bus-DIP-Schalter-Stellung ist beim Renault Master ab 2019 korrekt?',
    answers: ['Alle DIP-Schalter auf OFF', 'DIP 1 ON, DIP 2 OFF, DIP 3 ON', 'DIP 1 OFF, DIP 2 ON, DIP 3 OFF', 'Alle DIP-Schalter auf ON'],
    correctAnswers: ['DIP 1 ON, DIP 2 OFF, DIP 3 ON'],
    explanation: 'Die korrekte DIP-Schalter-Stellung für den Renault Master ab 2019 lautet: DIP 1 = ON, DIP 2 = OFF, DIP 3 = ON.'
  },
  {
    id: 'RM-Q004', lessonId: 'l14', courseId: 'c14', type: 'single',
    question: 'Wie viele Adern hat das CAN-Bus-Kabel, das an die WiPro III safe.lock angeschlossen wird?',
    answers: ['2 Adern (CAN-H und CAN-L)', '3 Adern (CAN-H, CAN-L, Masse)', '4 Adern (CAN-H, CAN-L, +12V, Masse)', '1 Ader (Datenleitung)'],
    correctAnswers: ['2 Adern (CAN-H und CAN-L)'],
    explanation: 'Der CAN-Bus verwendet zwei Adern: CAN-High und CAN-Low. Diese werden verdrillt geführt und ermöglichen die bidirektionale Kommunikation.'
  },
  {
    id: 'RM-Q005', lessonId: 'l14', courseId: 'c14', type: 'single',
    question: 'An welchem Steuergerät wird der CAN-Bus beim Renault Master abgegriffen?',
    answers: ['Am Motorsteuergerät', 'Am Body Control Module (BCM)', 'Am ABS-Steuergerät', 'Am Kombiinstrument'],
    correctAnswers: ['Am Body Control Module (BCM)'],
    explanation: 'Der CAN-Bus wird am Body Control Module abgegriffen, da hierüber die relevanten Fahrzeuginformationen wie Türstatus und ZV-Signale übertragen werden.'
  },
  {
    id: 'RM-Q006', lessonId: 'l14', courseId: 'c14', type: 'single',
    question: 'Welche Spannung muss an Klemme 30 der WiPro III safe.lock dauerhaft anliegen?',
    answers: ['5V', '12V Dauerplus', '24V', '12V nur bei Zündung'],
    correctAnswers: ['12V Dauerplus'],
    explanation: 'Klemme 30 ist der Dauerplus-Anschluss mit 12V. Dieser muss auch bei abgestelltem Fahrzeug permanent anliegen.'
  },
  {
    id: 'RM-Q007', lessonId: 'l14', courseId: 'c14', type: 'single',
    question: 'Wie wird die Zentralverriegelung beim Renault Master ab 2019 angesteuert?',
    answers: ['Über separate Relais an der ZV-Pumpe', 'Über den CAN-Bus', 'Über direkte Kabelverbindung zum Türschloss', 'Über den OBD-II-Anschluss'],
    correctAnswers: ['Über den CAN-Bus'],
    explanation: 'Beim Renault Master ab 2019 erfolgt die ZV-Ansteuerung über den CAN-Bus. Die WiPro III safe.lock sendet entsprechende CAN-Botschaften.'
  },
  {
    id: 'RM-Q008', lessonId: 'l14', courseId: 'c14', type: 'single',
    question: 'Welche Besonderheit hat der Renault Master gegenüber dem VW Crafter bei der Installation?',
    answers: ['Er benötigt keinen CAN-Bus-Anschluss', 'Die ZV wird über separate Relais angesteuert', 'Die Masseanbindung erfolgt am Motorblock', 'Die Abschalteinrichtung muss zwingend verbaut werden'],
    correctAnswers: ['Die Abschalteinrichtung muss zwingend verbaut werden'],
    explanation: 'Beim Renault Master ist die Abschalteinrichtung (Pro-finder) ein zwingender Bestandteil der Installation.'
  },
  {
    id: 'RM-Q009', lessonId: 'l14', courseId: 'c14', type: 'single',
    question: 'Wo wird die Abschalteinrichtung (Pro-finder) beim Renault Master montiert?',
    answers: ['Im Motorraum am Batteriekasten', 'Versteckt hinter der Armaturenbrettverkleidung', 'Direkt neben der Zentrale an der A-Säule', 'Unter dem Beifahrersitz'],
    correctAnswers: ['Versteckt hinter der Armaturenbrettverkleidung'],
    explanation: 'Der Pro-finder wird versteckt hinter der Armaturenbrettverkleidung montiert, um eine unauffällige und geschützte Platzierung zu gewährleisten.'
  },
  {
    id: 'RM-Q010', lessonId: 'l14', courseId: 'c14', type: 'single',
    question: 'Welche Sicherung muss für die Klemme 30 der WiPro III safe.lock mindestens verwendet werden?',
    answers: ['3A', '5A', '10A', '15A'],
    correctAnswers: ['5A'],
    explanation: 'Für den Dauerplus-Anschluss (Klemme 30) wird eine 5A-Sicherung verwendet.'
  },
  {
    id: 'RM-Q011', lessonId: 'l14', courseId: 'c14', type: 'single',
    question: 'Was passiert, wenn die CAN-Bus-Leitungen beim Renault Master vertauscht angeschlossen werden?',
    answers: ['Die Anlage funktioniert normal', 'Die Anlage erkennt keine Türöffnungen', 'Die ZV wird dauerhaft verriegelt', 'Das Fahrzeug startet nicht mehr'],
    correctAnswers: ['Die Anlage erkennt keine Türöffnungen'],
    explanation: 'Werden CAN-H und CAN-L vertauscht, kann das BCM die Signale nicht korrekt auswerten und Türöffnungen werden nicht erkannt.'
  },
  {
    id: 'RM-Q012', lessonId: 'l14', courseId: 'c14', type: 'single',
    question: 'Wie viele Handsender sind standardmäßig im Lieferumfang der WiPro III safe.lock enthalten?',
    answers: ['1 Handsender', '2 Handsender', '3 Handsender', 'Keine, müssen separat bestellt werden'],
    correctAnswers: ['2 Handsender'],
    explanation: 'Im Standard-Lieferumfang sind 2 Handsender enthalten, die bereits ab Werk auf die Zentrale angelernt sind.'
  },
  {
    id: 'RM-Q013', lessonId: 'l14', courseId: 'c14', type: 'single',
    question: 'Welche Funktion hat die Status-LED an der Zentrale der WiPro III safe.lock?',
    answers: ['Sie zeigt den Ladezustand der Batterie an', 'Sie zeigt den Scharfschaltungsstatus und Alarmgründe an', 'Sie blinkt nur bei Fehlfunktionen', 'Sie leuchtet dauerhaft bei aktivem Alarm'],
    correctAnswers: ['Sie zeigt den Scharfschaltungsstatus und Alarmgründe an'],
    explanation: 'Die Status-LED zeigt den Scharfschaltungszustand an und kann durch verschiedene Blinkfolgen den letzten Alarmgrund anzeigen.'
  },
  {
    id: 'RM-Q014', lessonId: 'l14', courseId: 'c14', type: 'single',
    question: 'Welche maximale Laufzeit hat die Alarmsirene der WiPro III safe.lock?',
    answers: ['15 Sekunden', '30 Sekunden', '60 Sekunden', '3 Minuten'],
    correctAnswers: ['30 Sekunden'],
    explanation: 'Die Alarmsirene ertönt maximal 30 Sekunden lang, um gesetzliche Vorschriften einzuhalten.'
  },
  {
    id: 'RM-Q015', lessonId: 'l14', courseId: 'c14', type: 'single',
    question: 'Was muss vor dem Anschluss der CAN-Bus-Leitungen beim Renault Master beachtet werden?',
    answers: ['Die Batterie muss abgeklemmt werden', 'Der Motor muss laufen', 'Die Zündung muss auf Stellung 2 stehen', 'Das BCM muss resettet werden'],
    correctAnswers: ['Die Batterie muss abgeklemmt werden'],
    explanation: 'Vor Arbeiten am CAN-Bus muss die Batterie abgeklemmt werden, um Kurzschlüsse und Beschädigungen an den Steuergeräten zu vermeiden.'
  },
  {
    id: 'RM-Q016', lessonId: 'l14', courseId: 'c14', type: 'single',
    question: 'Welche Alarmierungsart wird NICHT von der WiPro III safe.lock unterstützt?',
    answers: ['Optischer Alarm über Warnblinkanlage', 'Akustischer Alarm über Sirene', 'Alarm über Fahrzeughupe', 'Stiller Alarm nur über SMS-Benachrichtigung'],
    correctAnswers: ['Stiller Alarm nur über SMS-Benachrichtigung'],
    explanation: 'Die WiPro III safe.lock alarmiert optisch (Warnblinker), akustisch (Sirene) und kann die Fahrzeughupe ansteuern. Eine reine SMS-Benachrichtigung ist nicht Teil der Basisfunktion.'
  },
  {
    id: 'RM-Q017', lessonId: 'l14', courseId: 'c14', type: 'single',
    question: 'Welcher Kabelquerschnitt wird für die Masseleitung (Klemme 31) empfohlen?',
    answers: ['0,5 mm²', '1,0 mm²', '1,5 mm²', '2,5 mm²'],
    correctAnswers: ['1,5 mm²'],
    explanation: 'Für die Masseleitung wird mindestens 1,5 mm² empfohlen, um einen zuverlässigen Masseschluss zu gewährleisten.'
  },
  {
    id: 'RM-Q018', lessonId: 'l14', courseId: 'c14', type: 'single',
    question: 'Was ist beim Verkleben der Innenraumsensoren im Renault Master zu beachten?',
    answers: ['Die Sensoren werden mit Schrauben befestigt', 'Die Klebefläche muss fettfrei und bei Raumtemperatur angebracht werden', 'Die Sensoren dürfen nur an der Windschutzscheibe befestigt werden', 'Kleben ist nicht erlaubt, nur Kabelbinder'],
    correctAnswers: ['Die Klebefläche muss fettfrei und bei Raumtemperatur angebracht werden'],
    explanation: 'Die Klebepads der Sensoren haften nur sicher, wenn die Oberfläche sauber, fettfrei und bei Raumtemperatur (mind. 15°C) angebracht werden.'
  },
  {
    id: 'RM-Q019', lessonId: 'l14', courseId: 'c14', type: 'single',
    question: 'Welche Besonderheit gibt es beim Renault Master bezüglich der Türüberwachung?',
    answers: ['Ältere Modelle haben keine Türüberwachung', 'Ab 2019 werden alle Türen über den CAN-Bus überwacht, davor über Massekontakte', 'Die Schiebetür wird nie überwacht', 'Die Hecktüren benötigen separate Sensoren'],
    correctAnswers: ['Ab 2019 werden alle Türen über den CAN-Bus überwacht, davor über Massekontakte'],
    explanation: 'Ab Modelljahr 2019 werden Türen, Schiebetüren und Hecktüren über den CAN-Bus erkannt. Bei älteren Modellen erfolgt dies über Massekontakte.'
  },
  {
    id: 'RM-Q020', lessonId: 'l14', courseId: 'c14', type: 'single',
    question: 'Wie wird die ordnungsgemäße Funktion der WiPro III safe.lock nach dem Einbau geprüft?',
    answers: ['Nur durch Sichtprüfung der Verkabelung', 'Durch vollständigen Funktionstest: Scharfschaltung, Alarmauslösung, ZV-Ansteuerung und Entwarnung', 'Durch Auslesen des OBD-II-Fehlerspeichers', 'Durch einen externen Prüfadapter von THITRONIK'],
    correctAnswers: ['Durch vollständigen Funktionstest: Scharfschaltung, Alarmauslösung, ZV-Ansteuerung und Entwarnung'],
    explanation: 'Nach dem Einbau muss ein vollständiger Funktionstest durchgeführt werden, der alle Kernfunktionen prüft.'
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
  { id: 'ft9', categoryId: 'fc6', title: 'Gelverbinder vs. Lötverbindung – was ist besser?', authorId: 'u3', authorRole: 'user', pinned: false, locked: false, solved: true, solutionPostId: 'fp16', views: 98, likeCount: 4, createdAt: '2026-03-19T13:45:00Z', lastActivityAt: '2026-03-19T15:00:00Z', replyCount: 3 },
  { id: 'ft10', categoryId: 'fc8', title: 'Peugeot Boxer 2024: DIP-Schalterstellung für WiPro III?', authorId: 'u4', authorRole: 'user', pinned: false, locked: false, solved: true, solutionPostId: 'fp18', views: 73, likeCount: 2, createdAt: '2026-03-21T10:30:00Z', lastActivityAt: '2026-03-21T11:30:00Z', replyCount: 2 },
  { id: 'ft11', categoryId: 'fc8', title: 'Ford Transit Custom: Zusatzhupe nötig?', authorId: 'u3', authorRole: 'user', pinned: false, locked: false, solved: false, solutionPostId: null, views: 28, likeCount: 0, createdAt: '2026-04-01T11:00:00Z', lastActivityAt: '2026-04-01T14:00:00Z', replyCount: 1 },
  { id: 'ft12', categoryId: 'fc4', title: 'safe.lock NFC-Karte wird nicht erkannt', authorId: 'u4', authorRole: 'user', pinned: false, locked: false, solved: false, solutionPostId: null, views: 19, likeCount: 0, createdAt: '2026-04-02T08:30:00Z', lastActivityAt: '2026-04-02T10:00:00Z', replyCount: 1 },
  { id: 'ft13', categoryId: 'fc7', title: 'Wann kommen neue Schulungsvideos für G.A.S.-pro III?', authorId: 'u3', authorRole: 'user', pinned: false, locked: false, solved: false, solutionPostId: null, views: 33, likeCount: 1, createdAt: '2026-03-30T14:00:00Z', lastActivityAt: '2026-03-30T14:00:00Z', replyCount: 0 },
  { id: 'ft14', categoryId: 'fc9', title: 'Neues Werbematerial für Frühjahrssaison 2026?', authorId: 'u4', authorRole: 'user', pinned: false, locked: false, solved: false, solutionPostId: null, views: 22, likeCount: 0, createdAt: '2026-03-27T15:00:00Z', lastActivityAt: '2026-03-27T15:00:00Z', replyCount: 0 },
  { id: 'ft15', categoryId: 'fc10', title: 'Erfahrungen mit Wohnmobil-Messe Düsseldorf 2026', authorId: 'u3', authorRole: 'user', pinned: false, locked: false, solved: false, solutionPostId: null, views: 45, likeCount: 2, createdAt: '2026-03-26T12:00:00Z', lastActivityAt: '2026-03-26T14:30:00Z', replyCount: 1 },
  { id: 'ft16', categoryId: 'fc11', title: 'RMA-Prozess: Wie lange dauert der Austausch?', authorId: 'u4', authorRole: 'user', pinned: false, locked: false, solved: true, solutionPostId: 'fp26', views: 38, likeCount: 1, createdAt: '2026-03-23T09:00:00Z', lastActivityAt: '2026-03-23T10:30:00Z', replyCount: 1 },
  { id: 'ft17', categoryId: 'fc12', title: 'Vorschlag: Integration von Rückfahrkamera in die App', authorId: 'u3', authorRole: 'user', pinned: false, locked: false, solved: false, solutionPostId: null, views: 51, likeCount: 4, createdAt: '2026-03-24T10:00:00Z', lastActivityAt: '2026-03-24T14:00:00Z', replyCount: 2 },
];

export const seedForumPosts = [
  // ft1 - Willkommen
  { id: 'fp1', topicId: 'ft1', authorId: 'u1', authorRole: 'admin', content: 'Willkommen im neuen Thitronik Händler-Forum! Hier könnt ihr euch untereinander und mit unserem Support-Team austauschen. Nutzt die Kategorien, um eure Fragen und Erfahrungen zu teilen. Bei dringenden Problemen erreicht ihr uns wie gewohnt unter kontakt@thitronik.de.', createdAt: '2025-11-01T09:00:00Z', updatedAt: null, likes: [{ userId: 'u2', userName: 'Thomas Schulz', timestamp: '2025-11-01T10:05:00Z' }, { userId: 'u3', userName: 'Max Weber', timestamp: '2025-11-02T08:05:00Z' }], likeCount: 2, isSolution: false, reported: false },
  { id: 'fp2', topicId: 'ft1', authorId: 'u2', authorRole: 'manager', content: 'Schön, dass es dieses Forum jetzt gibt. Wir vom Support sind regelmäßig online und beantworten eure technischen Fragen. Scheut euch nicht zu fragen – es gibt keine dummen Fragen!', createdAt: '2025-11-01T10:00:00Z', updatedAt: null, likes: [{ userId: 'u4', userName: 'Anna Fischer', timestamp: '2025-11-01T12:00:00Z' }], likeCount: 1, isSolution: false, reported: false },
  { id: 'fp3', topicId: 'ft1', authorId: 'u3', authorRole: 'user', content: 'Super Sache! Genau sowas hat gefehlt. Freue mich auf den Austausch.', createdAt: '2025-11-02T08:00:00Z', updatedAt: null, likes: [], likeCount: 0, isSolution: false, reported: false },
  // ft4 - CAN-Bus Fehler gelöst
  { id: 'fp4', topicId: 'ft4', authorId: 'u3', authorRole: 'user', content: 'Nach dem Firmware-Update auf v3.2.1 hat die WiPro III im Fiat Ducato Baujahr 2023 CAN-Bus-Fehler geworfen. Status-LED blinkt in unregelmäßigen Intervallen, Türüberwachung funktioniert nicht mehr zuverlässig. Hat jemand das gleiche Problem?', createdAt: '2026-03-20T14:30:00Z', updatedAt: null, likes: [], likeCount: 0, isSolution: false, reported: false },
  { id: 'fp5', topicId: 'ft4', authorId: 'u2', authorRole: 'manager', content: 'Danke für die Meldung. Das Problem ist uns bekannt. Bitte prüfe zuerst die DIP-Schalterstellung – nach dem Update muss Schalter 3 auf ON stehen. Falls das nicht hilft, schick uns die Seriennummer per E-Mail.', createdAt: '2026-03-20T15:00:00Z', updatedAt: null, likes: [{ userId: 'u3', userName: 'Max Weber', timestamp: '2026-03-20T15:05:00Z' }, { userId: 'u4', userName: 'Anna Fischer', timestamp: '2026-03-20T16:00:00Z' }], likeCount: 2, isSolution: false, reported: false },
  { id: 'fp6', topicId: 'ft4', authorId: 'u3', authorRole: 'user', content: 'DIP-Schalter 3 war tatsächlich nicht korrekt. Nach dem Umstellen läuft alles wieder einwandfrei. Danke für die schnelle Hilfe!', createdAt: '2026-03-20T16:30:00Z', updatedAt: null, likes: [{ userId: 'u2', userName: 'Thomas Schulz', timestamp: '2026-03-20T16:35:00Z' }], likeCount: 1, isSolution: true, reported: false },
  { id: 'fp7', topicId: 'ft4', authorId: 'u2', authorRole: 'manager', content: 'Perfekt! Wir werden das in die Release-Notes aufnehmen, damit andere Händler das direkt beachten. Thema als gelöst markiert.', createdAt: '2026-03-20T17:00:00Z', updatedAt: null, likes: [{ userId: 'u3', userName: 'Max Weber', timestamp: '2026-03-20T17:05:00Z' }, { userId: 'u1', userName: 'Admin Thitronik', timestamp: '2026-03-20T18:00:00Z' }], likeCount: 2, isSolution: false, reported: false },
  // ft5 - G.A.S. Fehlalarm gelöst
  { id: 'fp8', topicId: 'ft5', authorId: 'u4', authorRole: 'user', content: 'Bei unserem Kunden gab es bei Außentemperaturen unter -5°C regelmäßig Fehlalarme des G.A.S.-pro III. CO-Sensor scheint temperaturempfindlich zu sein. Kennt jemand das Problem?', createdAt: '2026-03-22T11:00:00Z', updatedAt: null, likes: [], likeCount: 0, isSolution: false, reported: false },
  { id: 'fp9', topicId: 'ft5', authorId: 'u2', authorRole: 'manager', content: 'Die CO-Sensoren haben bei extremer Kälte eine etwas höhere Empfindlichkeit. Prüfe bitte, ob der Sensor nicht in der Nähe einer Heizung oder Luftaustrittsöffnung montiert ist. Die Firmware v2.1.4 enthält bereits eine verbesserte Temperaturdrift-Kompensation.', createdAt: '2026-03-22T12:30:00Z', updatedAt: null, likes: [{ userId: 'u4', userName: 'Anna Fischer', timestamp: '2026-03-22T12:35:00Z' }], likeCount: 1, isSolution: false, reported: false },
  { id: 'fp10', topicId: 'ft5', authorId: 'u4', authorRole: 'user', content: 'Firmware-Update war die Lösung! Seitdem keine Fehlalarme mehr. Der Sensor war korrekt montiert, lag wirklich an der Drift-Kompensation.', createdAt: '2026-03-22T14:00:00Z', updatedAt: null, likes: [{ userId: 'u2', userName: 'Thomas Schulz', timestamp: '2026-03-22T14:05:00Z' }, { userId: 'u3', userName: 'Max Weber', timestamp: '2026-03-23T09:00:00Z' }], likeCount: 2, isSolution: true, reported: false },
  // ft6 - Pro-finder GPS schwach
  { id: 'fp11', topicId: 'ft6', authorId: 'u3', authorRole: 'user', content: 'Im VW Crafter 2024 ist das GPS-Signal des Pro-finders extrem schwach. Habe ihn hinter dem Handschuhfach montiert. Die Metallabdeckung scheint das Signal zu blockieren. Externe Antenne wäre eine Lösung, aber der Kunde möchte keinen sichtbaren Einbau.', createdAt: '2026-03-25T09:15:00Z', updatedAt: null, likes: [], likeCount: 0, isSolution: false, reported: false },
  { id: 'fp12', topicId: 'ft6', authorId: 'u2', authorRole: 'manager', content: 'Beim VW Crafter empfehlen wir die Montage unter der Armaturenabdeckung nahe der Frontscheibe. Dort ist typischerweise eine Kunststoffabdeckung, die GPS-Signale gut durchlässt. Alternativ: Die externe GPS-Antenne kann unauffällig unter der Windschutzscheibe verklebt werden.', createdAt: '2026-03-25T10:00:00Z', updatedAt: null, likes: [{ userId: 'u3', userName: 'Max Weber', timestamp: '2026-03-25T10:10:00Z' }], likeCount: 1, isSolution: false, reported: false },
  // ft8 - Kabelführung Tipp
  { id: 'fp13', topicId: 'ft8', authorId: 'u2', authorRole: 'manager', content: 'Hier einige Tipps zur optimalen Kabelführung im Mercedes Sprinter VS30:\n\n1. Hauptkabelbaum immer entlang der Originalkanäle führen\n2. Kreuzungen mit vorhandenen Kabelbäumen vermeiden\n3. Kabelbinder alle 15-20 cm setzen\n4. Scharfe Kanten immer mit Schutzschlauch absichern\n5. Stecker immer gegen Vibration sichern\n\nBei Fragen gerne hier im Thread.', createdAt: '2026-03-18T08:00:00Z', updatedAt: null, likes: [{ userId: 'u3', userName: 'Max Weber', timestamp: '2026-03-18T08:15:00Z' }, { userId: 'u4', userName: 'Anna Fischer', timestamp: '2026-03-18T09:00:00Z' }, { userId: 'u1', userName: 'Admin Thitronik', timestamp: '2026-03-18T10:00:00Z' }], likeCount: 3, isSolution: false, reported: false },
  // ft9 - Gelverbinder vs. Lötverbindung
  { id: 'fp14', topicId: 'ft9', authorId: 'u3', authorRole: 'user', content: 'Ich nutze oft Lötverbinder mit Schrumpfschlauch. Sind Gelverbinder wirklich besser im KFZ-Bereich?', createdAt: '2026-03-19T13:45:00Z', updatedAt: null, likes: [], likeCount: 0, isSolution: false, reported: false },
  { id: 'fp15', topicId: 'ft9', authorId: 'u2', authorRole: 'manager', content: 'Löten im KFZ-Bereich ist problematisch wegen Vibrationen (Bruchgefahr am Übergang). Gelverbinder sind vibrationsfest und schützen durch das Gel vor Korrosion. Wir empfehlen sie ausdrücklich!', createdAt: '2026-03-19T14:30:00Z', updatedAt: null, likes: [{ userId: 'u4', userName: 'Anna Fischer', timestamp: '2026-03-19T14:35:00Z' }], likeCount: 1, isSolution: false, reported: false },
  { id: 'fp16', topicId: 'ft9', authorId: 'u3', authorRole: 'user', content: 'Überzeugt, danke für die technische Erklärung. Werde dann komplett auf Gelverbinder umstellen.', createdAt: '2026-03-19T15:00:00Z', updatedAt: null, likes: [], likeCount: 0, isSolution: true, reported: false },
  // ft10 - Peugeot Boxer DIP
  { id: 'fp17', topicId: 'ft10', authorId: 'u4', authorRole: 'user', content: 'Hat jemand die DIP-Einstellung für den neuen Peugeot Boxer 2024? Im Handbuch steht nur 2022.', createdAt: '2026-03-21T10:30:00Z', updatedAt: null, likes: [], likeCount: 0, isSolution: false, reported: false },
  { id: 'fp18', topicId: 'ft10', authorId: 'u2', authorRole: 'manager', content: 'Für den 2024er bleibt es bei: DIP 1 ON, DIP 2 OFF, DIP 3 ON. Das Protokoll hat sich nicht geändert.', createdAt: '2026-03-21T11:30:00Z', updatedAt: null, likes: [{ userId: 'u4', userName: 'Anna Fischer', timestamp: '2026-03-21T11:35:00Z' }], likeCount: 1, isSolution: true, reported: false },
  // ft11 - Ford Transit Zusatzhupe
  { id: 'fp19', topicId: 'ft11', authorId: 'u3', authorRole: 'user', content: 'Brauche ich beim aktuellen Ford Transit unbedingt die Zusatzhupe oder reicht das CAN-Bus-Signal?', createdAt: '2026-04-01T11:00:00Z', updatedAt: null, likes: [], likeCount: 0, isSolution: false, reported: false },
  { id: 'fp20', topicId: 'ft11', authorId: 'u2', authorRole: 'manager', content: 'Wir empfehlen sie dringend, da die Originalhupe nicht von allen Zentralen bei "Zündung aus" angesteuert werden kann.', createdAt: '2026-04-01T14:00:00Z', updatedAt: null, likes: [], likeCount: 0, isSolution: false, reported: false },
  // ft12 - safe.lock NFC
  { id: 'fp21', topicId: 'ft12', authorId: 'u4', authorRole: 'user', content: 'Kunde meldet, dass die NFC-Karte an der B-Säule nicht erkannt wird. Montage hinter Kunststoff.', createdAt: '2026-04-02T08:30:00Z', updatedAt: null, likes: [], likeCount: 0, isSolution: false, reported: false },
  { id: 'fp22', topicId: 'ft12', authorId: 'u2', authorRole: 'manager', content: 'Bitte prüfen, ob Metallpartikel im Lack des Kunststoffs sind (Metallic-Lackierung). Das dämpft NFC extrem.', createdAt: '2026-04-02T10:00:00Z', updatedAt: null, likes: [], likeCount: 0, isSolution: false, reported: false },
  // ft15 - Messe
  { id: 'fp23', topicId: 'ft15', authorId: 'u3', authorRole: 'user', content: 'Wer von euch ist dieses Jahr in Düsseldorf auf der Messe am Start?', createdAt: '2026-03-26T12:00:00Z', updatedAt: null, likes: [], likeCount: 0, isSolution: false, reported: false },
  { id: 'fp24', topicId: 'ft15', authorId: 'u4', authorRole: 'user', content: 'Wir sind mit einem Stand in Halle 13 dabei!', createdAt: '2026-03-26T14:30:00Z', updatedAt: null, likes: [{ userId: 'u3', userName: 'Max Weber', timestamp: '2026-03-26T14:35:00Z' }], likeCount: 1, isSolution: false, reported: false },
  // ft16 - RMA
  { id: 'fp25', topicId: 'ft16', authorId: 'u4', authorRole: 'user', content: 'Habe eine defekte WiPro Zentrale. Wie lange ist aktuell die Durchlaufzeit bei Thitronik?', createdAt: '2026-03-23T09:00:00Z', updatedAt: null, likes: [], likeCount: 0, isSolution: false, reported: false },
  { id: 'fp26', topicId: 'ft16', authorId: 'u1', authorRole: 'admin', content: 'In der Regel 3-5 Werktage nach Erhalt. Bitte leg das RMA-Formular aus dem Händlerportal bei.', createdAt: '2026-03-23T10:30:00Z', updatedAt: null, likes: [{ userId: 'u4', userName: 'Anna Fischer', timestamp: '2026-03-23T10:35:00Z' }], likeCount: 1, isSolution: true, reported: false },
  // ft17 - Rückfahrkamera
  { id: 'fp27', topicId: 'ft17', authorId: 'u3', authorRole: 'user', content: 'Wäre cool, wenn man die Rückfahrkamera direkt in der Thitronik App sehen könnte, wenn der Alarm losgeht.', createdAt: '2026-03-24T10:00:00Z', updatedAt: null, likes: [{ userId: 'u4', userName: 'Anna Fischer', timestamp: '2026-03-24T10:05:00Z' }], likeCount: 1, isSolution: false, reported: false },
  { id: 'fp28', topicId: 'ft17', authorId: 'u2', authorRole: 'manager', content: 'Spannende Idee! Das behalten wir für zukünftige Entwicklungen im Auge, erfordert aber ein Video-Interface.', createdAt: '2026-03-24T14:00:00Z', updatedAt: null, likes: [{ userId: 'u1', userName: 'Admin Thitronik', timestamp: '2026-03-24T14:05:00Z' }], likeCount: 1, isSolution: false, reported: false },
];

export function initializeSeedData(API) {
  if (typeof window !== 'undefined') {
    // Check initialized version - bump to v26 to ensure full recovery
    const isInitialized = localStorage.getItem('th__initialized_v26');
    if (!isInitialized) {
      console.log('Initializing Thitronik Seed Data V26...');
      
      // Clear all to ensure consistency
      localStorage.clear();

      // Core Data
      API.saveCourses(seedCourses);
      API.saveLessons(seedLessons);
      API.saveQuestions(seedQuestions);
      API.saveUsers(seedUsers);
      
      // Additional setup
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
        { courseId: 'c13', userId: 'u1' },
        { courseId: 'c14', userId: 'u1' },
        { courseId: 'c15', userId: 'u1' }
      ]));
      
      localStorage.setItem('th_media', JSON.stringify([]));

      // Forum Data
      API.saveForumCategories(seedForumCategories);
      API.saveForumTopics(seedForumTopics);
      API.saveForumPosts(seedForumPosts);
      
      localStorage.setItem('th__initialized_v26', 'true');
      console.log('Seed initialization complete.');
    }
  }
}
