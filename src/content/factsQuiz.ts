/** Affermazioni da classificare come fatto o interpretazione, con spiegazione. */
export interface FactItem {
  id: string;
  text: string;
  answer: 'fatto' | 'interpretazione';
  explanation: string;
  reformulation?: string; // versione "fatto" di un'interpretazione
}

export const factItems: FactItem[] = [
  {
    id: 'f1',
    text: 'Non mi ha risposto per tutto il pomeriggio.',
    answer: 'fatto',
    explanation: 'È osservabile: il messaggio è rimasto senza risposta per alcune ore.',
  },
  {
    id: 'f2',
    text: 'Non gli importa niente di me.',
    answer: 'interpretazione',
    explanation: 'Attribuisce un’intenzione e un sentimento che non si possono osservare direttamente.',
    reformulation: 'Ieri non ha chiamato come aveva detto.',
  },
  {
    id: 'f3',
    text: 'Mi ha interrotto tre volte durante la riunione.',
    answer: 'fatto',
    explanation: 'Descrive un comportamento preciso e contabile.',
  },
  {
    id: 'f4',
    text: 'Vuole sempre avere l’ultima parola.',
    answer: 'interpretazione',
    explanation: 'Generalizza (“sempre”) e attribuisce un desiderio.',
    reformulation: 'Nelle ultime due discussioni ha chiuso lui il discorso.',
  },
  {
    id: 'f5',
    text: 'Ha alzato gli occhi al cielo mentre parlavo.',
    answer: 'fatto',
    explanation: 'È un gesto visibile. Il suo significato (disprezzo? stanchezza?) sarebbe invece un’interpretazione.',
  },
  {
    id: 'f6',
    text: 'Mi stava prendendo in giro.',
    answer: 'interpretazione',
    explanation: 'Ipotizza l’intenzione dietro un comportamento.',
    reformulation: 'Ha riso mentre raccontavo del mio errore.',
  },
  {
    id: 'f7',
    text: 'È arrivato alle 20:40, avevamo detto alle 20.',
    answer: 'fatto',
    explanation: 'Orari verificabili.',
  },
  {
    id: 'f8',
    text: 'Non rispetta il mio tempo.',
    answer: 'interpretazione',
    explanation: 'Un giudizio generale ricavato da uno o più episodi.',
    reformulation: 'Questo mese è arrivato in ritardo tre volte su quattro.',
  },
  {
    id: 'f9',
    text: 'Mia madre mi ha chiesto del lavoro davanti ai parenti.',
    answer: 'fatto',
    explanation: 'Descrive cosa è stato detto e in quale contesto.',
  },
  {
    id: 'f10',
    text: 'Vuole farmi sentire un fallito.',
    answer: 'interpretazione',
    explanation: 'Attribuisce uno scopo all’altra persona. Potrebbe essere vero, ma andrebbe verificato.',
    reformulation: 'Mi ha paragonato a mio cugino davanti a tutti.',
  },
  {
    id: 'f11',
    text: 'È arrabbiato con me.',
    answer: 'interpretazione',
    explanation: 'Anche quando sembra evidente, lo stato emotivo altrui è un’inferenza. I fatti sarebbero il tono, le parole, il silenzio.',
    reformulation: 'Stamattina mi ha risposto a monosillabi.',
  },
  {
    id: 'f12',
    text: 'Ha presentato il progetto senza nominarmi.',
    answer: 'fatto',
    explanation: 'Descrive ciò che è stato detto (e non detto) in una situazione precisa.',
  },
];
