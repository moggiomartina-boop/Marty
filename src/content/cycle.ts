/** Le sette tappe del ciclo della reazione, con domande e possibilità di intervento. */
export interface CycleStep {
  id: string;
  name: string;
  short: string;
  description: string;
  question: string;
  intervention: string;
  example: string;
}

export const cycleSteps: CycleStep[] = [
  {
    id: 'innesco',
    name: 'Innesco',
    short: 'Ciò che accade',
    description: 'Un evento esterno (una frase, un ritardo, un silenzio) o interno (un ricordo, la stanchezza).',
    question: 'Che cosa è successo, descritto come lo vedrebbe una videocamera?',
    intervention: 'Prevenire quando possibile: scegliere momenti e luoghi, ridurre la vulnerabilità (sonno, fame, stanchezza).',
    example: 'Il partner arriva 50 minuti in ritardo senza avvisare.',
  },
  {
    id: 'interpretazione',
    name: 'Interpretazione',
    short: 'Ciò che mi dico',
    description: 'Il significato che attribuiamo all’evento, spesso in modo rapido e automatico.',
    question: 'Che cosa mi sto dicendo? Quali altre spiegazioni sono possibili?',
    intervention: 'Separare fatti e interpretazioni; cercare almeno due ipotesi alternative.',
    example: '“Non sono una priorità per lui.”',
  },
  {
    id: 'emozione',
    name: 'Emozione',
    short: 'Ciò che sento',
    description: 'La risposta emotiva e corporea, a volte più emozioni sovrapposte.',
    question: 'Che emozione provo, con che intensità? C’è qualcosa sotto?',
    intervention: 'Nominare l’emozione con precisione; notare i segnali del corpo; regolare l’attivazione.',
    example: 'Rabbia in superficie, delusione e paura sotto. Calore al viso.',
  },
  {
    id: 'impulso',
    name: 'Impulso',
    short: 'Ciò che vorrei fare',
    description: 'La spinta all’azione che accompagna l’emozione. Non è ancora un’azione.',
    question: 'Che cosa ho voglia di fare adesso? Mi avvicina a ciò che voglio davvero?',
    intervention: 'Notare l’impulso senza eseguirlo subito; prendere tempo; fare una pausa dichiarata.',
    example: 'Fare un commento sarcastico.',
  },
  {
    id: 'azione',
    name: 'Azione',
    short: 'Ciò che faccio',
    description: 'Il comportamento visibile: parole, tono, gesti, silenzi.',
    question: 'Che cosa ho fatto o detto, concretamente?',
    intervention: 'Scegliere una risposta coerente con i propri valori: esprimere il bisogno, chiedere, rimandare.',
    example: '«Pensa la mia giornata, qui da sola come una cretina.»',
  },
  {
    id: 'effetto',
    name: 'Effetto sull’altro',
    short: 'Ciò che provoco',
    description: 'L’impatto del mio comportamento sull’altra persona, al di là delle mie intenzioni.',
    question: 'Che cosa potrebbe aver sentito o pensato l’altro?',
    intervention: 'Osservare i segnali dell’altro; chiedere; riconoscere l’impatto.',
    example: 'Si sente attaccato appena arrivato.',
  },
  {
    id: 'risposta',
    name: 'Risposta dell’altro',
    short: 'Ciò che torna indietro',
    description: 'La reazione dell’altro, che diventa a sua volta un nuovo innesco per me.',
    question: 'In che modo la sua risposta mi riattiva? Sta ricominciando il ciclo?',
    intervention: 'Riconoscere il ciclo come “nostro”; riparare; uscire dalla ripetizione.',
    example: '«Non posso nemmeno avere una giornata storta.» E il ciclo riparte.',
  },
];
