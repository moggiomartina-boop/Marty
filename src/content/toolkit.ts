/**
 * Laboratorio 8: nove strumenti pratici. Ogni strumento ha spiegazione,
 * quando usarlo, procedura guidata, esempio pratico ed esercizio interattivo
 * (un esercizio guidato salvabile, identificato da `exerciseId`).
 */
export interface Tool {
  id: string;
  name: string;
  explanation: string;
  when: string;
  procedure: string[];
  example: string;
  exerciseId: string;
  breathing?: boolean;
}

export const toolkit: Tool[] = [
  {
    id: 'pausa',
    name: 'Pausa emotiva',
    explanation: 'Una pausa dichiarata interrompe il conflitto prima che l’attivazione superi la soglia oltre la quale si dicono e si fanno cose di cui ci si pente. Si distingue dal ritiro perché ha una durata e un ritorno.',
    when: 'Appena noti i primi segnali di attivazione: voce che sale, mascella serrata, pensieri in bianco e nero.',
    procedure: [
      'Riconosci il segnale: “Mi sto agitando”.',
      'Dì la tua frase di pausa: «Mi sto arrabbiando troppo. Mi fermo venti minuti, poi ne riparliamo».',
      'Allontanati tu, in un’altra stanza o fuori.',
      'Nei venti minuti non ripassare la discussione: cammina, respira, fai un grounding.',
      'Torna e chiedi se per lei va bene riprendere. Se non va bene, proponi un altro momento.',
    ],
    example: 'Durante una discussione sul collega, senti il calore al viso. Dici la frase, esci a camminare. Dopo venti minuti torni e chiedi: «Ti va di riprendere adesso o preferisci domani?».',
    exerciseId: 'tk-pausa',
  },
  {
    id: 'respiro',
    name: 'Respirazione e grounding',
    explanation: 'Un’espirazione più lunga dell’inspirazione e l’attenzione ai sensi (grounding) aiutano a riportare il corpo e la mente nel presente, abbassando l’attivazione.',
    when: 'Quando l’ansia o la rabbia sono alte, o durante una pausa emotiva.',
    procedure: [
      'Inspira contando fino a 4, espira contando fino a 6, per un minuto.',
      'Guarda intorno e nomina 5 cose che vedi.',
      'Nota 4 cose che senti al tatto (i piedi sul pavimento, i vestiti).',
      'Ascolta 3 suoni, nota 2 odori, 1 sapore.',
      'Valuta di nuovo l’intensità dell’emozione.',
    ],
    example: 'Lei è fuori e non risponde. Ti siedi, fai un minuto di respiro lungo, poi il 5-4-3-2-1. L’ansia scende da 8 a 5: abbastanza per non scriverle.',
    exerciseId: 'tk-grounding',
    breathing: true,
  },
  {
    id: 'pensieri',
    name: 'Riconoscimento dei pensieri automatici',
    explanation: 'I pensieri automatici sono rapidi, plausibili e raramente verificati. Riconoscerli e dare loro un nome (lettura del pensiero, catastrofizzazione…) ne riduce il potere.',
    when: 'Quando senti un’emozione intensa e non sai bene da dove arrivi, o quando la mente “racconta una storia”.',
    procedure: [
      'Scrivi il pensiero esattamente come si presenta.',
      'Chiediti che tipo di pensiero è: lettura del pensiero, catastrofizzazione, ragionamento emotivo, generalizzazione?',
      'Valuta quanto ci credi da 0 a 100.',
      'Scrivi una versione più equilibrata.',
      'Valuta di nuovo quanto ci credi.',
    ],
    example: 'Pensiero: “Se non mi scrive vuol dire che non le importa”. Tipo: lettura del pensiero. Versione equilibrata: “Non so perché non ha scritto. Di solito, quando non scrive, è impegnata”.',
    exerciseId: 'tk-pensieri',
  },
  {
    id: 'fatti',
    name: 'Verifica dei fatti',
    explanation: 'Mettere a confronto le prove a favore e contro una conclusione permette di vedere quanto è sostenuta dai fatti, e quanto dalla paura.',
    when: 'Quando sei convinto di qualcosa che riguarda lei e senti il bisogno di agire su quella convinzione.',
    procedure: [
      'Scrivi la conclusione.',
      'Elenca i fatti osservabili a favore.',
      'Elenca i fatti osservabili contro.',
      'Scrivi almeno due spiegazioni alternative.',
      'Decidi che cosa fare in base ai fatti, non alla paura.',
    ],
    example: 'Conclusione: “Si sta allontanando”. A favore: è più silenziosa da due giorni. Contro: ieri mi ha abbracciato, sabato ha proposto una cena. Alternative: è preoccupata per il lavoro, è stanca.',
    exerciseId: 'tk-fatti',
  },
  {
    id: 'incertezza',
    name: 'Tolleranza dell’incertezza',
    explanation: 'Ogni verifica riuscita insegna alla mente che l’incertezza era un pericolo. Rimandare la verifica le insegna il contrario: l’ansia sale, raggiunge un picco e scende da sola.',
    when: 'Quando senti l’impulso di controllare, chiedere conferme o verificare dove si trova.',
    procedure: [
      'Riconosci l’impulso a verificare e dagli un voto da 0 a 10.',
      'Decidi un tempo di attesa: 20 minuti la prima volta, poi di più.',
      'Allontana il telefono e fai qualcosa che richieda attenzione.',
      'Alla fine del tempo rivaluta l’impulso.',
      'Se puoi, rinuncia del tutto alla verifica. Annota come è andata.',
    ],
    example: 'Impulso a controllare l’ultimo accesso: 8/10. Aspetti 20 minuti cucinando. Dopo: 5/10. Decidi di non controllare. La sera lei ti racconta della giornata.',
    exerciseId: 'tk-incertezza',
  },
  {
    id: 'senza-accuse',
    name: 'Comunicazione senza accuse',
    explanation: 'Descrivere un fatto, l’emozione e il bisogno, e fare una richiesta che lascia libero l’altro, aumenta la probabilità di essere ascoltati e riduce la difensività.',
    when: 'Quando vuoi dire qualcosa che ti ha ferito o preoccupato.',
    procedure: [
      'Osservazione: che cosa è successo, senza giudizi.',
      'Emozione: che cosa hai provato.',
      'Bisogno: che cosa è importante per te.',
      'Richiesta: che cosa chiedi, accettando che possa dire di no.',
      'Rileggi: ci sono “sempre”, “mai”, “tu sei”? Riformula.',
    ],
    example: 'Invece di «Non mi dici mai niente!»: «Quando ho saputo della cena da altri mi sono sentito escluso. Mi farebbe piacere che me ne parlassi tu, se ti va».',
    exerciseId: 'tk-senza-accuse',
  },
  {
    id: 'frustrazione',
    name: 'Gestione della frustrazione',
    explanation: 'La frustrazione nasce quando un’aspettativa non viene soddisfatta. Distinguere aspettativa, bisogno e diritto aiuta a non trasformarla in pressione.',
    when: 'Quando lei non fa ciò che speravi, o un tuo progetto salta.',
    procedure: [
      'Dai un nome e un’intensità alla frustrazione.',
      'Scrivi qual era l’aspettativa.',
      'Chiediti: era un accordo condiviso o una mia aspettativa?',
      'Trova il bisogno sotto l’aspettativa e un altro modo di prendertene cura.',
      'Scegli che cosa dire, se serve, senza colpevolizzare.',
    ],
    example: 'Aspettativa: che passasse la domenica con te. Accordo? No. Bisogno: vicinanza. Altro modo: proporre una cena martedì.',
    exerciseId: 'tk-frustrazione',
  },
  {
    id: 'rifiuto',
    name: 'Rispetto del rifiuto',
    explanation: 'Un “no” rispettato rende la relazione un luogo sicuro. Un “no” che ha un costo insegna all’altra persona a non dirlo più — e da quel momento i suoi “sì” non dicono più nulla.',
    when: 'Quando lei dice di no a una proposta, a un contatto, a una conversazione, a un piano.',
    procedure: [
      'Accogli il no senza rispondere subito.',
      'Nota che cosa senti: delusione, rifiuto, rabbia.',
      'Ricorda: un no a una proposta non è un no a te.',
      'Rispondi con rispetto: «Va bene».',
      'Non tornarci sopra per convincerla, né farlo pesare dopo.',
    ],
    example: 'Lei non vuole parlare della discussione stasera. Dici «Va bene, ne parliamo quando ti va». Non le chiedi “perché”, non insisti, non tieni il broncio.',
    exerciseId: 'tk-rifiuto',
  },
  {
    id: 'escalation',
    name: 'Interruzione dell’escalation',
    explanation: 'Il protocollo in sette passi per fermare un conflitto che sta salendo, con la priorità della sicurezza. È il più importante tra gli strumenti di questo laboratorio.',
    when: 'Quando la discussione sta salendo e senti di poter perdere il controllo, o quando lei vuole interrompere.',
    procedure: [
      'Interrompi la discussione con la tua frase di stop.',
      'Allontanati fisicamente tu.',
      'Non seguire né bloccare l’altra persona.',
      'Non impedirle mai di uscire.',
      'Non inviare messaggi minacciosi.',
      'Riprendi il confronto solo in condizioni di sicurezza e con il suo accordo.',
      'Cerca un supporto professionale adeguato.',
    ],
    example: 'Lei prende la borsa per andare da un’amica. Senti l’impulso di fermarla. Ti sposti dalla porta, dici «Va bene», vai sul balcone, non le scrivi fino a domani.',
    exerciseId: 'tk-escalation',
  },
];
