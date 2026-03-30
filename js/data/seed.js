// ============================================
// THITRONIK Seed Data
// Initiale Demo-Daten
// ============================================

export const seedUsers = [
  { id: 'u1', email: 'admin@thitronik.de', password: 'admin123', firstName: 'Admin', lastName: 'Thitronik', role: 'admin', active: true },
  { id: 'u2', email: 'trainer@thitronik.de', password: 'trainer123', firstName: 'Thomas', lastName: 'Schulz', role: 'trainer', active: true },
  { id: 'u3', email: 'monteur@thitronik.de', password: 'monteur123', firstName: 'Max', lastName: 'Weber', role: 'learner', active: true },
  { id: 'u4', email: 'partner@thitronik.de', password: 'partner123', firstName: 'Anna', lastName: 'Fischer', role: 'learner', active: true },
];

export const seedCourses = [
  { id: 'c1', title: 'Allgemeine Fragen', slug: 'allgemeinefragen', description: 'Grundlegendes Wissen rund um THITRONIK Produkte und deren Einsatzgebiete.', status: 'published', sortOrder: 1, estimatedDuration: '30 min', icon: '📋' },
  { id: 'c2', title: 'CAN-Bus', slug: 'canbus', description: 'CAN-Bus-Grundlagen, Diagnose und Anbindung von THITRONIK Systemen.', status: 'published', sortOrder: 2, estimatedDuration: '45 min', icon: '🔌' },
  { id: 'c3', title: 'doinstruct Manager', slug: 'doinstruct-manager', description: 'Schulungsinhalte zum doinstruct Manager und Fahrzeugübergabe.', status: 'published', sortOrder: 3, estimatedDuration: '40 min', icon: '📱' },
  { id: 'c4', title: 'Fehlersuche', slug: 'fehlersuche', description: 'Systematische Fehlersuche und Diagnose bei THITRONIK Alarmanlagen.', status: 'published', sortOrder: 4, estimatedDuration: '50 min', icon: '🔍' },
  { id: 'c5', title: 'Funkzubehör', slug: 'funkzubehoer', description: 'Alles über Funkfernbedienungen, Sender und Empfänger.', status: 'published', sortOrder: 5, estimatedDuration: '25 min', icon: '📡' },
  { id: 'c6', title: 'Gelverbinder', slug: 'gelverbinder', description: 'Richtige Anwendung und Einsatz von Gelverbindern in der Fahrzeugtechnik.', status: 'published', sortOrder: 6, estimatedDuration: '20 min', icon: '🔧' },
  { id: 'c7', title: 'Grundlagen', slug: 'grundlagen', description: 'Grundlagenwissen zu Alarmsystemen, Sensorik und Montage.', status: 'incomplete', sortOrder: 7, estimatedDuration: '60 min', icon: '📚' },
  { id: 'c8', title: 'Konfigurator', slug: 'konfigurator', description: 'Bedienung und Nutzung des THITRONIK Konfigurators.', status: 'published', sortOrder: 8, estimatedDuration: '35 min', icon: '⚙️' },
  { id: 'c9', title: 'Magnet & Montageadapter', slug: 'magnet-montageadapter', description: 'Montageadapter und Magnetsensoren korrekt einsetzen.', status: 'published', sortOrder: 9, estimatedDuration: '30 min', icon: '🧲' },
  { id: 'c10', title: 'Mercedes Sprinter VS30', slug: 'mb-sprinter-vs30', description: 'Spezifische Einbauanleitungen für den Mercedes Sprinter VS30.', status: 'incomplete', sortOrder: 10, estimatedDuration: '55 min', icon: '🚐' },
  { id: 'c11', title: 'Pro-finder', slug: 'pro-finder', description: 'GPS-Ortungssystem Pro-finder: Installation und Konfiguration.', status: 'published', sortOrder: 11, estimatedDuration: '35 min', icon: '📍' },
  { id: 'c12', title: 'THITRONIK Testfragen', slug: 'thitronik-test1', description: 'Übergreifende Testfragen zu allen THITRONIK Produkten.', status: 'published', sortOrder: 12, estimatedDuration: '40 min', icon: '✅' },
  { id: 'c13', title: 'WiPro', slug: 'wipro', description: 'WiPro Alarmsystem: Funktionen, Einbau und Konfiguration.', status: 'published', sortOrder: 13, estimatedDuration: '50 min', icon: '🛡️' },
];

export const seedLessons = [
  // Allgemeine Fragen
  { id: 'l1', courseId: 'c1', title: 'Einführung in THITRONIK', description: 'Überblick über das Unternehmen und die Produktpalette.', status: 'published', sortOrder: 1, estimatedDuration: '10 min', hasQuiz: true, contentBlocks: [
    { type: 'text', content: '<h2>Willkommen bei THITRONIK</h2><p>THITRONIK ist ein führender Hersteller von Sicherheitssystemen für Fahrzeuge. In dieser Lektion lernen Sie die wichtigsten Grundlagen kennen.</p>' },
    { type: 'callout', variant: 'info', title: 'Hinweis', content: 'Diese Lektion bildet das Fundament für alle weiteren Module. Nehmen Sie sich ausreichend Zeit.' },
    { type: 'text', content: '<h3>Unsere Produktbereiche</h3><ul><li>Alarmanlagen für Nutzfahrzeuge</li><li>GPS-Ortungssysteme</li><li>Funkfernsteuerungen</li><li>Einbruchmeldesysteme</li></ul>' },
  ]},
  { id: 'l2', courseId: 'c1', title: 'Produktübersicht', description: 'Alle aktuellen THITRONIK Produkte im Überblick.', status: 'published', sortOrder: 2, estimatedDuration: '15 min', hasQuiz: true, contentBlocks: [
    { type: 'text', content: '<h2>Produktübersicht</h2><p>THITRONIK bietet ein breites Sortiment an Sicherheitslösungen für verschiedene Fahrzeugtypen.</p>' },
  ]},
  { id: 'l3', courseId: 'c1', title: 'Zielgruppen und Einsatzbereiche', description: 'Für wen sind welche Produkte geeignet?', status: 'published', sortOrder: 3, estimatedDuration: '10 min', hasQuiz: false, contentBlocks: [] },

  // CAN-Bus
  { id: 'l4', courseId: 'c2', title: 'CAN-Bus Grundlagen', description: 'Was ist der CAN-Bus und wie funktioniert er?', status: 'published', sortOrder: 1, estimatedDuration: '15 min', hasQuiz: true, contentBlocks: [
    { type: 'text', content: '<h2>CAN-Bus Grundlagen</h2><p>Der CAN-Bus (Controller Area Network) ist ein serieller Bus, der in modernen Fahrzeugen zur Kommunikation zwischen Steuergeräten eingesetzt wird.</p>' },
    { type: 'steps', steps: [
      { title: 'Schritt 1: CAN-Bus identifizieren', description: 'Lokalisieren Sie die CAN-Bus-Leitungen im Fahrzeug.' },
      { title: 'Schritt 2: Signale messen', description: 'Verwenden Sie ein Oszilloskop, um die CAN-Signale zu überprüfen.' },
      { title: 'Schritt 3: Anschluss herstellen', description: 'Verbinden Sie das THITRONIK System mit dem CAN-Bus.' },
    ]},
  ]},
  { id: 'l5', courseId: 'c2', title: 'CAN-Bus Diagnose', description: 'Fehler am CAN-Bus erkennen und beheben.', status: 'published', sortOrder: 2, estimatedDuration: '20 min', hasQuiz: true, contentBlocks: [] },

  // Fehlersuche
  { id: 'l6', courseId: 'c4', title: 'Systematische Fehlersuche', description: 'Methodisches Vorgehen bei der Fehlerdiagnose.', status: 'published', sortOrder: 1, estimatedDuration: '20 min', hasQuiz: true, contentBlocks: [
    { type: 'text', content: '<h2>Systematische Fehlersuche</h2><p>Ein strukturiertes Vorgehen spart Zeit und vermeidet unnötige Bauteilwechsel.</p>' },
    { type: 'callout', variant: 'warning', title: 'Wichtig', content: 'Immer zuerst die Stromversorgung und Masseanbindung prüfen, bevor aufwändige Diagnosen begonnen werden.' },
  ]},
  { id: 'l7', courseId: 'c4', title: 'Häufige Fehlerbilder', description: 'Die häufigsten Probleme und deren Lösungen.', status: 'published', sortOrder: 2, estimatedDuration: '15 min', hasQuiz: true, contentBlocks: [] },

  // WiPro
  { id: 'l8', courseId: 'c13', title: 'WiPro Einführung', description: 'Überblick über das WiPro Alarmsystem.', status: 'published', sortOrder: 1, estimatedDuration: '10 min', hasQuiz: false, contentBlocks: [
    { type: 'text', content: '<h2>WiPro Alarmsystem</h2><p>Das WiPro ist eines der beliebtesten Alarmsysteme für Wohnmobile und Transporter. Es bietet umfassenden Schutz bei einfacher Montage.</p>' },
  ]},
  { id: 'l9', courseId: 'c13', title: 'WiPro Einbau', description: 'Schritt-für-Schritt-Einbauanleitung.', status: 'published', sortOrder: 2, estimatedDuration: '25 min', hasQuiz: true, contentBlocks: [] },
  { id: 'l10', courseId: 'c13', title: 'WiPro Konfiguration', description: 'Programmierung und Einstellungen.', status: 'published', sortOrder: 3, estimatedDuration: '15 min', hasQuiz: true, contentBlocks: [] },
];

export const seedQuestions = [
  // Allgemeine Fragen - Lektion 1
  { id: 'q1', lessonId: 'l1', type: 'single', questionText: 'Wofür steht THITRONIK primär als Hersteller?', explanation: 'THITRONIK ist spezialisiert auf Sicherheitssysteme für Fahrzeuge.', sortOrder: 1, multipleCorrect: false, options: [
    { id: 'a1', text: 'Fahrzeug-Navigationssysteme', isCorrect: false },
    { id: 'a2', text: 'Sicherheitssysteme für Fahrzeuge', isCorrect: true },
    { id: 'a3', text: 'Fahrzeug-Entertainmentsysteme', isCorrect: false },
    { id: 'a4', text: 'Fahrzeug-Klimatechnik', isCorrect: false },
  ]},
  { id: 'q2', lessonId: 'l1', type: 'multiple', questionText: 'Welche Produktbereiche gehören zum THITRONIK Portfolio?', explanation: 'THITRONIK bietet Alarmanlagen, GPS-Ortung, Funksteuerungen und Einbruchmeldesysteme.', sortOrder: 2, multipleCorrect: true, options: [
    { id: 'a5', text: 'Alarmanlagen für Nutzfahrzeuge', isCorrect: true },
    { id: 'a6', text: 'Autoradios', isCorrect: false },
    { id: 'a7', text: 'GPS-Ortungssysteme', isCorrect: true },
    { id: 'a8', text: 'Funkfernsteuerungen', isCorrect: true },
  ]},
  { id: 'q3', lessonId: 'l1', type: 'single', questionText: 'Für welche Fahrzeugtypen sind THITRONIK Produkte primär konzipiert?', explanation: 'THITRONIK fokussiert sich auf Nutzfahrzeuge, Transporter und Wohnmobile.', sortOrder: 3, multipleCorrect: false, options: [
    { id: 'a9', text: 'Sportwagen', isCorrect: false },
    { id: 'a10', text: 'Nutzfahrzeuge und Transporter', isCorrect: true },
    { id: 'a11', text: 'Motorräder', isCorrect: false },
    { id: 'a12', text: 'Fahrräder', isCorrect: false },
  ]},

  // Allgemeine Fragen - Lektion 2
  { id: 'q4', lessonId: 'l2', type: 'single', questionText: 'Welches System schützt primär vor Einbruch ins Fahrzeug?', sortOrder: 1, multipleCorrect: false, options: [
    { id: 'a13', text: 'Pro-finder', isCorrect: false },
    { id: 'a14', text: 'WiPro Alarm', isCorrect: true },
    { id: 'a15', text: 'CAN-Bus Modul', isCorrect: false },
  ]},

  // CAN-Bus
  { id: 'q5', lessonId: 'l4', type: 'single', questionText: 'Wofür steht die Abkürzung CAN?', explanation: 'CAN steht für Controller Area Network.', sortOrder: 1, multipleCorrect: false, options: [
    { id: 'a16', text: 'Computer Aided Network', isCorrect: false },
    { id: 'a17', text: 'Controller Area Network', isCorrect: true },
    { id: 'a18', text: 'Central Access Node', isCorrect: false },
    { id: 'a19', text: 'Connected Automotive Node', isCorrect: false },
  ]},
  { id: 'q6', lessonId: 'l4', type: 'multiple', questionText: 'Welche Aussagen zum CAN-Bus sind korrekt?', sortOrder: 2, multipleCorrect: true, options: [
    { id: 'a20', text: 'Der CAN-Bus verwendet zwei Datenleitungen (CAN-High, CAN-Low)', isCorrect: true },
    { id: 'a21', text: 'Der CAN-Bus arbeitet mit einer festen Baudrate von 500 kBit/s', isCorrect: false },
    { id: 'a22', text: 'An beiden Enden wird ein Abschlusswiderstand benötigt', isCorrect: true },
    { id: 'a23', text: 'Der Bus kann nur maximal 5 Steuergeräte verbinden', isCorrect: false },
  ]},
  { id: 'q7', lessonId: 'l5', type: 'single', questionText: 'Welchen Widerstandswert sollte der CAN-Bus-Abschlusswiderstand haben?', sortOrder: 1, multipleCorrect: false, options: [
    { id: 'a24', text: '60 Ohm', isCorrect: true },
    { id: 'a25', text: '120 Ohm', isCorrect: false },
    { id: 'a26', text: '100 Ohm', isCorrect: false },
  ]},

  // Fehlersuche
  { id: 'q8', lessonId: 'l6', type: 'single', questionText: 'Was sollte bei der Fehlersuche immer zuerst geprüft werden?', explanation: 'Stromversorgung und Masseanbindung sind die häufigsten Fehlerquellen.', sortOrder: 1, multipleCorrect: false, options: [
    { id: 'a27', text: 'Software-Updates', isCorrect: false },
    { id: 'a28', text: 'Stromversorgung und Masseanbindung', isCorrect: true },
    { id: 'a29', text: 'CAN-Bus Signale', isCorrect: false },
    { id: 'a30', text: 'Funkverbindung', isCorrect: false },
  ]},
  { id: 'q9', lessonId: 'l7', type: 'multiple', questionText: 'Welche sind häufige Fehlerursachen bei Alarmanlagen?', sortOrder: 1, multipleCorrect: true, options: [
    { id: 'a31', text: 'Lose Kabelverbindungen', isCorrect: true },
    { id: 'a32', text: 'Falsche Sicherungsabsicherung', isCorrect: true },
    { id: 'a33', text: 'Zu hohe Raumtemperatur', isCorrect: false },
    { id: 'a34', text: 'Korrodierte Kontakte', isCorrect: true },
  ]},

  // WiPro
  { id: 'q10', lessonId: 'l9', type: 'single', questionText: 'Wo wird die WiPro Zentrale idealerweise montiert?', sortOrder: 1, multipleCorrect: false, options: [
    { id: 'a35', text: 'Im Motorraum', isCorrect: false },
    { id: 'a36', text: 'Im geschützten Innenraum, gut zugänglich', isCorrect: true },
    { id: 'a37', text: 'Außen am Fahrzeug', isCorrect: false },
  ]},
  { id: 'q11', lessonId: 'l10', type: 'multiple', questionText: 'Welche Sensoren können an das WiPro System angeschlossen werden?', sortOrder: 1, multipleCorrect: true, options: [
    { id: 'a38', text: 'Türkontakte', isCorrect: true },
    { id: 'a39', text: 'Bewegungsmelder', isCorrect: true },
    { id: 'a40', text: 'Rauchmelder', isCorrect: false },
    { id: 'a41', text: 'Gaswarner', isCorrect: true },
  ]},
];

export function initializeSeedData(Store) {
  if (!Store.get('_initialized')) {
    Store.set('users', seedUsers);
    Store.set('courses', seedCourses);
    Store.set('lessons', seedLessons);
    Store.set('questions', seedQuestions);
    Store.set('progress', []);
    Store.set('quizAttempts', []);
    Store.set('enrollments', []);
    Store.set('media', []);
    Store.set('_initialized', true);
  }
}
