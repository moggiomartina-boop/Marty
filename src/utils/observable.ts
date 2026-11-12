/**
 * Euristica testuale per distinguere promesse generiche da comportamenti osservabili.
 * Non è un giudizio: segnala elementi che rendono una frase difficile da verificare
 * e riconosce quelli che la rendono concreta.
 */
export interface ObservableCheck {
  level: 'vuoto' | 'generico' | 'parziale' | 'osservabile';
  hints: string[];
}

const vague = [
  { re: /\bcercher[òo]\b|\bprover[òo] a\b|\bmi impegner[òo]\b/, hint: '“Cercherò”, “proverò”, “mi impegnerò” esprimono un’intenzione, non un comportamento.' },
  { re: /\bmeno\b|\bdi più\b|\bpiù (calmo|tranquillo|paziente|presente|fiducioso|sereno)\b/, hint: '“Meno” e “di più” non si possono osservare: indica che cosa farai esattamente.' },
  { re: /\bmigliorare\b|\bmigliorer[òo]\b|\bcambier[òo]\b|\bessere (una persona )?migliore\b/, hint: '“Migliorare” o “cambiare” sono obiettivi, non azioni.' },
  { re: /\bnon succeder[àa] più\b|\bmai più\b/, hint: '“Mai più” è una promessa: che cosa farai al posto di ciò che è successo?' },
  { re: /\bfidarmi\b|\bmi fider[òo]\b/, hint: 'La fiducia non si decide: quali comportamenti la renderanno visibile?' },
];

const concrete = [
  { re: /\bquando\b|\bse\b[^.]*\ballora\b|\bogni volta che\b/, label: 'situazione precisa' },
  { re: /\d+|\bun(a|o)? (messaggio|volta|ora)\b|\bminuti\b|\bore\b|\bgiorni\b|\bsettimana\b|\bdomenica\b/, label: 'misura o tempo' },
  { re: /\bnon (le )?(chieder[òo]|controller[òo]|scriver[òo]|chiamer[òo]|guarder[òo]|seguir[òo])\b|\b(dir[òo]|uscir[òo]|aspetter[òo]|annoter[òo]|scriver[òo]|andr[òo]|chieder[òo])\b/, label: 'azione concreta' },
  { re: /\bdiario\b|\bannot|\bconter[òo]\b|\bsegner[òo]\b/, label: 'modo di verificarlo' },
];

export function checkObservable(text: string): ObservableCheck {
  const t = text.toLowerCase().trim();
  if (!t) return { level: 'vuoto', hints: [] };
  const vagueHits = vague.filter((v) => v.re.test(t)).map((v) => v.hint);
  const found = concrete.filter((c) => c.re.test(t)).map((c) => c.label);
  const hints = [...vagueHits];
  if (found.length) hints.push(`Contiene: ${found.join(', ')}.`);
  const missing = ['situazione precisa', 'azione concreta', 'modo di verificarlo'].filter((x) => !found.includes(x));
  if (missing.length && found.length) hints.push(`Potresti aggiungere: ${missing.join(', ')}.`);
  if (!found.length && !vagueHits.length) hints.push('Prova a indicare in quale situazione, che cosa farai esattamente e come te ne accorgerai.');
  const level = found.length >= 3 && !vagueHits.length ? 'osservabile' : found.length >= 1 ? 'parziale' : 'generico';
  return { level, hints };
}
