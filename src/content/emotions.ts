/**
 * Vocabolario emotivo per famiglie. Le famiglie seguono una classificazione
 * pratica e diffusa; non pretendono di essere una tassonomia scientifica definitiva.
 */
export interface EmotionFamily {
  id: string;
  name: string;
  signal: string; // che cosa tende a segnalare
  urge: string; // impulso tipico
  words: string[];
}

export const emotionFamilies: EmotionFamily[] = [
  {
    id: 'rabbia',
    name: 'Rabbia',
    signal: 'Un confine superato, un’ingiustizia percepita, un ostacolo a un obiettivo importante.',
    urge: 'Attaccare, difendersi, spingere via.',
    words: ['irritazione', 'fastidio', 'frustrazione', 'indignazione', 'risentimento', 'esasperazione', 'collera', 'rancore'],
  },
  {
    id: 'paura',
    name: 'Paura',
    signal: 'Una minaccia, anche solo possibile: di perdere, di essere rifiutati, di non farcela.',
    urge: 'Fuggire, controllare, cercare rassicurazione, bloccarsi.',
    words: ['ansia', 'preoccupazione', 'inquietudine', 'agitazione', 'timore', 'panico', 'insicurezza', 'allarme'],
  },
  {
    id: 'tristezza',
    name: 'Tristezza',
    signal: 'Una perdita, una distanza, qualcosa che si desiderava e non c’è.',
    urge: 'Ritirarsi, rallentare, cercare conforto.',
    words: ['delusione', 'malinconia', 'scoraggiamento', 'solitudine', 'nostalgia', 'sconforto', 'amarezza', 'abbattimento'],
  },
  {
    id: 'vergogna',
    name: 'Vergogna e colpa',
    signal: 'Il timore di essere visti come inadeguati (vergogna) o la percezione di aver fatto un torto (colpa).',
    urge: 'Nascondersi, giustificarsi, attaccare per non esporsi; oppure riparare.',
    words: ['imbarazzo', 'umiliazione', 'inadeguatezza', 'senso di colpa', 'rimorso', 'esposizione', 'disagio', 'mortificazione'],
  },
  {
    id: 'disgusto',
    name: 'Disgusto e disprezzo',
    signal: 'Qualcosa percepito come contaminante, inaccettabile o “inferiore”.',
    urge: 'Respingere, prendere le distanze, svalutare.',
    words: ['repulsione', 'avversione', 'fastidio morale', 'disprezzo', 'sdegno', 'nausea'],
  },
  {
    id: 'ferita',
    name: 'Ferita relazionale',
    signal: 'Il legame sembra meno sicuro: non essere visti, scelti, rispettati.',
    urge: 'Protestare, chiudersi, mettere alla prova l’altro.',
    words: ['esclusione', 'abbandono', 'tradimento', 'invisibilità', 'gelosia', 'rifiuto', 'svalutazione', 'incompreso/a'],
  },
  {
    id: 'sovraccarico',
    name: 'Sovraccarico',
    signal: 'Le risorse sembrano inferiori alle richieste.',
    urge: 'Scappare, spegnersi, esplodere per una goccia.',
    words: ['stanchezza', 'sopraffazione', 'confusione', 'tensione', 'stress', 'impotenza', 'vuoto', 'intorpidimento'],
  },
  {
    id: 'apertura',
    name: 'Apertura e benessere',
    signal: 'Sicurezza, connessione, qualcosa che conta va bene.',
    urge: 'Avvicinarsi, condividere, esplorare.',
    words: ['sollievo', 'gratitudine', 'tenerezza', 'fiducia', 'calma', 'gioia', 'orgoglio', 'speranza'],
  },
];

export const allEmotionWords = emotionFamilies.flatMap((f) => f.words);

export const familyOfWord = (w: string) => emotionFamilies.find((f) => f.words.includes(w));
