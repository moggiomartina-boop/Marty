/**
 * Bibliografia di riferimento.
 * Sono elencate solo opere note e verificabili. Non sono riportati DOI né numeri
 * non controllati: chi vuole approfondire può cercare titolo e autori nei cataloghi.
 * `kind` indica il tipo di contributo, per distinguere modelli teorici, ricerca
 * empirica e testi divulgativi/clinici.
 */
export type SourceKind = 'ricerca' | 'teoria' | 'clinica' | 'divulgazione';

export interface Source {
  id: string;
  authors: string;
  year: string;
  title: string;
  publication: string;
  kind: SourceKind;
  note: string;
}

export const sources: Source[] = [
  {
    id: 'gross1998',
    authors: 'Gross, J. J.',
    year: '1998',
    title: 'The emerging field of emotion regulation: An integrative review',
    publication: 'Review of General Psychology, 2(3)',
    kind: 'teoria',
    note: 'Propone il "modello processuale" della regolazione emotiva: si può intervenire sulla situazione, sull’attenzione, sull’interpretazione o sulla risposta.',
  },
  {
    id: 'grossjohn2003',
    authors: 'Gross, J. J., & John, O. P.',
    year: '2003',
    title: 'Individual differences in two emotion regulation processes: Implications for affect, relationships, and well-being',
    publication: 'Journal of Personality and Social Psychology, 85(2)',
    kind: 'ricerca',
    note: 'Confronta rivalutazione cognitiva e soppressione espressiva. La soppressione abituale risulta associata a esiti relazionali meno favorevoli.',
  },
  {
    id: 'webb2012',
    authors: 'Webb, T. L., Miles, E., & Sheeran, P.',
    year: '2012',
    title: 'Dealing with feeling: A meta-analysis of the effectiveness of strategies derived from the process model of emotion regulation',
    publication: 'Psychological Bulletin, 138(4)',
    kind: 'ricerca',
    note: 'Meta-analisi: l’efficacia varia molto in base alla strategia; la rivalutazione tende a funzionare meglio della semplice soppressione dell’espressione.',
  },
  {
    id: 'lieberman2007',
    authors: 'Lieberman, M. D., Eisenberger, N. I., Crockett, M. J., Tom, S. M., Pfeifer, J. H., & Way, B. M.',
    year: '2007',
    title: 'Putting feelings into words: Affect labeling disrupts amygdala activity in response to affective stimuli',
    publication: 'Psychological Science, 18(5)',
    kind: 'ricerca',
    note: 'Studio di neuroimmagine sull’"affect labeling": dare un nome all’emozione si associa a una minore attivazione dell’amigdala in laboratorio.',
  },
  {
    id: 'kashdan2015',
    authors: 'Kashdan, T. B., Barrett, L. F., & McKnight, P. E.',
    year: '2015',
    title: 'Unpacking emotion differentiation: Transforming unpleasant experience by perceiving distinctions in negativity',
    publication: 'Current Directions in Psychological Science, 24(1)',
    kind: 'ricerca',
    note: 'Rassegna sulla "granularità emotiva": distinguere con precisione le emozioni negative è associato a una regolazione più flessibile.',
  },
  {
    id: 'barrett2017',
    authors: 'Barrett, L. F.',
    year: '2017',
    title: 'How Emotions Are Made: The Secret Life of the Brain',
    publication: 'Houghton Mifflin Harcourt',
    kind: 'divulgazione',
    note: 'Presenta la teoria delle emozioni costruite: le emozioni non sono riflessi fissi ma costruzioni del cervello a partire da sensazioni corporee, contesto ed esperienza.',
  },
  {
    id: 'ekman1992',
    authors: 'Ekman, P.',
    year: '1992',
    title: 'An argument for basic emotions',
    publication: 'Cognition and Emotion, 6(3–4)',
    kind: 'teoria',
    note: 'Sostiene l’esistenza di emozioni di base con caratteristiche universali. Posizione oggi discussa e contrapposta, tra le altre, a quella di Barrett.',
  },
  {
    id: 'beck1976',
    authors: 'Beck, A. T.',
    year: '1976',
    title: 'Cognitive Therapy and the Emotional Disorders',
    publication: 'International Universities Press',
    kind: 'clinica',
    note: 'Testo fondativo della terapia cognitiva: pensieri automatici e distorsioni cognitive come mediatori tra eventi ed emozioni.',
  },
  {
    id: 'ellis1962',
    authors: 'Ellis, A.',
    year: '1962',
    title: 'Reason and Emotion in Psychotherapy',
    publication: 'Lyle Stuart',
    kind: 'clinica',
    note: 'Introduce il modello ABC: non è solo l’evento (A) a produrre la conseguenza emotiva (C), ma le convinzioni (B) con cui lo leggiamo.',
  },
  {
    id: 'ross1977',
    authors: 'Ross, L.',
    year: '1977',
    title: 'The intuitive psychologist and his shortcomings: Distortions in the attribution process',
    publication: 'Advances in Experimental Social Psychology, Vol. 10',
    kind: 'ricerca',
    note: 'Descrive l’"errore fondamentale di attribuzione": la tendenza a spiegare il comportamento altrui con il carattere più che con la situazione.',
  },
  {
    id: 'siegel1999',
    authors: 'Siegel, D. J.',
    year: '1999',
    title: 'The Developing Mind',
    publication: 'Guilford Press',
    kind: 'teoria',
    note: 'Introduce la metafora della "finestra di tolleranza": la fascia di attivazione entro cui riusciamo a pensare e sentire insieme.',
  },
  {
    id: 'linehan2014',
    authors: 'Linehan, M. M.',
    year: '2014',
    title: 'DBT Skills Training Manual (2nd ed.)',
    publication: 'Guilford Press',
    kind: 'clinica',
    note: 'Manuale delle abilità della Dialectical Behavior Therapy: tolleranza della sofferenza, regolazione emotiva, efficacia interpersonale.',
  },
  {
    id: 'fonagy2002',
    authors: 'Fonagy, P., Gergely, G., Jurist, E. L., & Target, M.',
    year: '2002',
    title: 'Affect Regulation, Mentalization, and the Development of the Self',
    publication: 'Other Press',
    kind: 'teoria',
    note: 'Definisce la mentalizzazione: la capacità di comprendere sé e gli altri in termini di stati mentali (intenzioni, emozioni, desideri).',
  },
  {
    id: 'davis1983',
    authors: 'Davis, M. H.',
    year: '1983',
    title: 'Measuring individual differences in empathy: Evidence for a multidimensional approach',
    publication: 'Journal of Personality and Social Psychology, 44(1)',
    kind: 'ricerca',
    note: 'Distingue componenti diverse dell’empatia, tra cui la presa di prospettiva (cognitiva) e la preoccupazione empatica (affettiva).',
  },
  {
    id: 'gottman1994',
    authors: 'Gottman, J. M.',
    year: '1994',
    title: 'What Predicts Divorce? The Relationship Between Marital Processes and Marital Outcomes',
    publication: 'Lawrence Erlbaum Associates',
    kind: 'ricerca',
    note: 'Ricerca osservativa sulle coppie: critica, disprezzo, difensività e chiusura (stonewalling) risultano associati a esiti relazionali negativi.',
  },
  {
    id: 'gottman1999',
    authors: 'Gottman, J. M., & Silver, N.',
    year: '1999',
    title: 'The Seven Principles for Making Marriage Work',
    publication: 'Crown Publishers',
    kind: 'divulgazione',
    note: 'Versione divulgativa del lavoro di Gottman, con l’idea dei "tentativi di riparazione" durante il conflitto.',
  },
  {
    id: 'bowlby1969',
    authors: 'Bowlby, J.',
    year: '1969',
    title: 'Attachment and Loss, Vol. 1: Attachment',
    publication: 'Basic Books',
    kind: 'teoria',
    note: 'Fonda la teoria dell’attaccamento: il bisogno di vicinanza e sicurezza con figure di riferimento organizza emozioni e comportamenti.',
  },
  {
    id: 'johnson2008',
    authors: 'Johnson, S. M.',
    year: '2008',
    title: 'Hold Me Tight: Seven Conversations for a Lifetime of Love',
    publication: 'Little, Brown',
    kind: 'divulgazione',
    note: 'Divulgazione della terapia focalizzata sulle emozioni (EFT) per le coppie: i conflitti come "danze" guidate da paura di distanza o rifiuto.',
  },
  {
    id: 'young2003',
    authors: 'Young, J. E., Klosko, J. S., & Weishaar, M. E.',
    year: '2003',
    title: 'Schema Therapy: A Practitioner’s Guide',
    publication: 'Guilford Press',
    kind: 'clinica',
    note: 'Modello degli schemi: temi emotivi appresi precocemente che possono attivarsi nel presente con intensità sproporzionata.',
  },
  {
    id: 'rosenberg2003',
    authors: 'Rosenberg, M. B.',
    year: '2003',
    title: 'Nonviolent Communication: A Language of Life (2nd ed.)',
    publication: 'PuddleDancer Press',
    kind: 'divulgazione',
    note: 'Propone una struttura comunicativa in quattro passi: osservazione, sentimento, bisogno, richiesta. Modello pratico, con evidenze empiriche ancora limitate.',
  },
  {
    id: 'gollwitzer1999',
    authors: 'Gollwitzer, P. M.',
    year: '1999',
    title: 'Implementation intentions: Strong effects of simple plans',
    publication: 'American Psychologist, 54(7)',
    kind: 'ricerca',
    note: 'Le intenzioni di implementazione ("se succede X, allora farò Y") aumentano la probabilità di tradurre un’intenzione in azione.',
  },
  {
    id: 'pennebaker1997',
    authors: 'Pennebaker, J. W.',
    year: '1997',
    title: 'Writing about emotional experiences as a therapeutic process',
    publication: 'Psychological Science, 8(3)',
    kind: 'ricerca',
    note: 'Sintesi degli studi sulla scrittura espressiva: scrivere di esperienze emotive può avere effetti positivi, di entità variabile.',
  },
  {
    id: 'neff2003',
    authors: 'Neff, K. D.',
    year: '2003',
    title: 'Self-compassion: An alternative conceptualization of a healthy attitude toward oneself',
    publication: 'Self and Identity, 2(2)',
    kind: 'teoria',
    note: 'Definisce l’autocompassione: gentilezza verso sé, senso di comune umanità, consapevolezza non giudicante.',
  },
];

export const sourceById = (id: string) => sources.find((s) => s.id === id);

export const sourceKindLabel: Record<SourceKind, string> = {
  ricerca: 'Ricerca empirica',
  teoria: 'Modello teorico',
  clinica: 'Testo clinico',
  divulgazione: 'Divulgazione',
};
