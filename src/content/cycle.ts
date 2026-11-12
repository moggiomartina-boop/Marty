/** Ciclo emotivo e comportamentale (laboratorio 1): sette tappe con esempio e punto di intervento. */
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
  { id: 'situazione', name: 'Situazione', short: 'Ciò che accade', description: 'Un fatto esterno — una frase, un orario, un nome — oppure interno, come la stanchezza o un ricordo.', question: 'Che cosa è successo, descritto come lo vedrebbe una videocamera?', intervention: 'Ridurre la vulnerabilità (sonno, stress, alcol) e riconoscere le situazioni che ti attivano di più.', example: 'La tua partner ti dice che ha pranzato con un collega.' },
  { id: 'emozione', name: 'Emozione', short: 'Ciò che senti', description: 'La risposta emotiva e corporea, spesso più emozioni sovrapposte.', question: 'Che cosa provo, con quale intensità? C’è qualcosa sotto?', intervention: 'Nominare l’emozione con precisione. Accoglierla: non è una colpa.', example: 'Gelosia in superficie; sotto, paura di essere meno importante.' },
  { id: 'pensiero', name: 'Pensiero', short: 'Ciò che ti dici', description: 'La storia che la mente costruisce per spiegare l’emozione.', question: 'Che cosa mi sto dicendo? È un fatto o un’interpretazione?', intervention: 'Separare fatti e interpretazioni; cercare almeno due spiegazioni alternative.', example: '“Quel collega è una minaccia.”' },
  { id: 'impulso', name: 'Impulso', short: 'Ciò che vorresti fare', description: 'La spinta ad agire che accompagna emozione e pensiero. Non è ancora un’azione.', question: 'Che cosa ho voglia di fare adesso? Mi avvicina alla persona che voglio essere?', intervention: 'Notare l’impulso senza eseguirlo. Prendere tempo. Pausa emotiva.', example: 'Chiedere spiegazioni, subito e nel dettaglio.' },
  { id: 'comportamento', name: 'Comportamento', short: 'Ciò che fai', description: 'Il gesto visibile: parole, tono, domande, silenzi, azioni.', question: 'Che cosa ho detto o fatto, concretamente?', intervention: 'Scegliere una risposta coerente con i tuoi valori: esprimere il bisogno, rimandare, lasciare spazio.', example: '«Ah, e da quando pranzi con lui?»' },
  { id: 'effetto', name: 'Effetto su di lei', short: 'Ciò che provochi', description: 'L’impatto del comportamento sull’altra persona, al di là delle intenzioni.', question: 'Che cosa potrebbe aver sentito o pensato lei?', intervention: 'Osservare i suoi segnali; chiederle come si è sentita; riconoscere l’impatto.', example: 'Si sente accusata per un pranzo di lavoro.' },
  { id: 'conseguenza', name: 'Conseguenza', short: 'Che cosa cambia', description: 'Ciò che succede dopo, nella relazione e in te. Spesso diventa la situazione del ciclo successivo.', question: 'Che cosa è cambiato tra noi? Il ciclo sta ricominciando?', intervention: 'Riparare; aggiornare il piano; riconoscere la ripetizione.', example: 'La prossima volta non ti dirà del pranzo. Tu lo scoprirai e ti sentirai escluso.' },
];
