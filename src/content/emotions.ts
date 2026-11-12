/**
 * Vocabolario emotivo per lo strumento "Che cosa stai provando davvero?".
 * Le famiglie sono una classificazione pratica, non una tassonomia scientifica definitiva.
 */
export interface EmotionFamily {
  id: string;
  name: string;
  surface: boolean; // emozione che tende a "mostrarsi" in superficie
  signal: string;
  urge: string;
  words: string[];
}

export const emotionFamilies: EmotionFamily[] = [
  { id: 'gelosia', name: 'Gelosia', surface: true, signal: 'Il timore che una terza persona possa prendere il tuo posto o ricevere ciò che desideri.', urge: 'Indagare, verificare, impedire, chiedere conferme.', words: ['gelosia', 'sospetto', 'possessività', 'invidia', 'senso di minaccia'] },
  { id: 'rabbia', name: 'Rabbia', surface: true, signal: 'Un confine percepito come superato, un’ingiustizia, un bisogno ignorato.', urge: 'Attaccare, alzare la voce, imporre, punire.', words: ['irritazione', 'frustrazione', 'indignazione', 'risentimento', 'esasperazione', 'collera'] },
  { id: 'paura', name: 'Paura', surface: false, signal: 'La possibilità di perdere qualcosa di importante: lei, il legame, il tuo posto nella sua vita.', urge: 'Controllare, trattenere, cercare rassicurazione, fuggire.', words: ['paura di perderla', 'paura di essere lasciato', 'paura del tradimento', 'ansia', 'allarme', 'panico'] },
  { id: 'insicurezza', name: 'Insicurezza', surface: false, signal: 'Il dubbio di non essere abbastanza: interessante, desiderabile, importante.', urge: 'Confrontarsi, cercare conferme, chiudersi.', words: ['insicurezza', 'inadeguatezza', 'sentirmi meno', 'sentirmi sostituibile', 'dubbio su di me'] },
  { id: 'vergogna', name: 'Vergogna e umiliazione', surface: false, signal: 'Il timore di essere visti come inadeguati, ridicoli, inferiori.', urge: 'Nascondersi, attaccare per non esporsi, minimizzare.', words: ['vergogna', 'umiliazione', 'imbarazzo', 'senso di colpa', 'esposizione'] },
  { id: 'tristezza', name: 'Tristezza e solitudine', surface: false, signal: 'Una distanza, una perdita, qualcosa che desideri e non c’è.', urge: 'Ritirarsi, cercare vicinanza, chiedere conforto.', words: ['tristezza', 'solitudine', 'esclusione', 'nostalgia', 'delusione', 'sentirmi messo da parte'] },
  { id: 'impotenza', name: 'Impotenza', surface: false, signal: 'La sensazione di non poter controllare ciò che succede.', urge: 'Riprendere il controllo con la forza, oppure arrendersi.', words: ['impotenza', 'sopraffazione', 'confusione', 'stanchezza', 'vuoto'] },
];

export const allEmotionWords = emotionFamilies.flatMap((f) => f.words);
export const familyOfWord = (w: string) => emotionFamilies.find((f) => f.words.includes(w));
