/**
 * Bibliografia di riferimento.
 * Sono elencate solo opere note e verificabili; non sono riportati DOI né dati
 * numerici non controllati. `kind` distingue ricerca empirica, modelli teorici,
 * testi clinici e divulgazione, perché non hanno lo stesso peso.
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
  /* --- Attaccamento --- */
  {
    id: 'bowlby1969',
    authors: 'Bowlby, J.',
    year: '1969',
    title: 'Attachment and Loss, Vol. 1: Attachment',
    publication: 'Basic Books',
    kind: 'teoria',
    note: 'Fonda la teoria dell’attaccamento: il bisogno di vicinanza e sicurezza con figure di riferimento organizza emozioni e comportamenti, soprattutto quando il legame sembra minacciato.',
  },
  {
    id: 'ainsworth1978',
    authors: 'Ainsworth, M. D. S., Blehar, M. C., Waters, E., & Wall, S.',
    year: '1978',
    title: 'Patterns of Attachment: A Psychological Study of the Strange Situation',
    publication: 'Lawrence Erlbaum Associates',
    kind: 'ricerca',
    note: 'Osservazione sistematica dei legami madre-bambino con la procedura della "Strange Situation"; da qui nascono le classificazioni dei pattern di attaccamento infantile.',
  },
  {
    id: 'hazanshaver1987',
    authors: 'Hazan, C., & Shaver, P.',
    year: '1987',
    title: 'Romantic love conceptualized as an attachment process',
    publication: 'Journal of Personality and Social Psychology, 52(3)',
    kind: 'ricerca',
    note: 'Primo studio che applica la teoria dell’attaccamento alle relazioni sentimentali adulte.',
  },
  {
    id: 'mikulincer2007',
    authors: 'Mikulincer, M., & Shaver, P. R.',
    year: '2007',
    title: 'Attachment in Adulthood: Structure, Dynamics, and Change',
    publication: 'Guilford Press',
    kind: 'teoria',
    note: 'Sintesi della ricerca sull’attaccamento adulto. Descrive l’iperattivazione (ricerca intensa di vicinanza e rassicurazione) e la disattivazione (presa di distanza) come strategie di fronte alla minaccia relazionale. Sottolinea che l’attaccamento può cambiare.',
  },
  /* --- Cognizione e incertezza --- */
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
    id: 'beck1988',
    authors: 'Beck, A. T.',
    year: '1988',
    title: 'Love Is Never Enough',
    publication: 'Harper & Row',
    kind: 'divulgazione',
    note: 'Applicazione della terapia cognitiva alle coppie: letture del pensiero, aspettative implicite, interpretazioni negative del comportamento del partner.',
  },
  {
    id: 'nickerson1998',
    authors: 'Nickerson, R. S.',
    year: '1998',
    title: 'Confirmation bias: A ubiquitous phenomenon in many guises',
    publication: 'Review of General Psychology, 2(2)',
    kind: 'ricerca',
    note: 'Rassegna sul bias di conferma: la tendenza a cercare, notare e ricordare le informazioni che confermano un’ipotesi già formulata.',
  },
  {
    id: 'freeston1994',
    authors: 'Freeston, M. H., Rhéaume, J., Letarte, H., Dugas, M. J., & Ladouceur, R.',
    year: '1994',
    title: 'Why do people worry?',
    publication: 'Personality and Individual Differences, 17(6)',
    kind: 'ricerca',
    note: 'Introduce la misura dell’intolleranza dell’incertezza e la collega alla tendenza a preoccuparsi.',
  },
  {
    id: 'dugas2007',
    authors: 'Dugas, M. J., & Robichaud, M.',
    year: '2007',
    title: 'Cognitive-Behavioral Treatment for Generalized Anxiety Disorder: From Science to Practice',
    publication: 'Routledge',
    kind: 'clinica',
    note: 'Trattamento centrato sull’intolleranza dell’incertezza: riconoscere i comportamenti di "sicurezza" (verifiche, rassicurazioni) e sperimentare gradualmente l’incertezza.',
  },
  {
    id: 'downey1996',
    authors: 'Downey, G., & Feldman, S. I.',
    year: '1996',
    title: 'Implications of rejection sensitivity for intimate relationships',
    publication: 'Journal of Personality and Social Psychology, 70(6)',
    kind: 'ricerca',
    note: 'La sensibilità al rifiuto (aspettarsi ansiosamente il rifiuto, percepirlo prontamente, reagire con intensità) è associata a letture ostili di comportamenti ambigui del partner.',
  },
  {
    id: 'joiner1999',
    authors: 'Joiner, T. E., Metalsky, G. I., Katz, J., & Beach, S. R. H.',
    year: '1999',
    title: 'Depression and excessive reassurance-seeking',
    publication: 'Psychological Inquiry, 10(4)',
    kind: 'ricerca',
    note: 'Descrive la richiesta eccessiva di rassicurazione: il sollievo è breve, il dubbio ritorna, e la ripetizione può logorare chi deve rassicurare.',
  },
  /* --- Gelosia --- */
  {
    id: 'pfeiffer1989',
    authors: 'Pfeiffer, S. M., & Wong, P. T. P.',
    year: '1989',
    title: 'Multidimensional jealousy',
    publication: 'Journal of Social and Personal Relationships, 6(2)',
    kind: 'ricerca',
    note: 'Distingue tre componenti della gelosia: emotiva (ciò che si prova), cognitiva (sospetti e pensieri) e comportamentale (controlli, verifiche).',
  },
  {
    id: 'buss2000',
    authors: 'Buss, D. M.',
    year: '2000',
    title: 'The Dangerous Passion: Why Jealousy Is as Necessary as Love and Sex',
    publication: 'Free Press',
    kind: 'divulgazione',
    note: 'Lettura evoluzionistica della gelosia come emozione legata alla protezione del legame. È un’ipotesi teorica discussa; il libro distingue l’emozione dalle sue espressioni distruttive.',
  },
  {
    id: 'leahy2018',
    authors: 'Leahy, R. L.',
    year: '2018',
    title: 'The Jealousy Cure',
    publication: 'New Harbinger',
    kind: 'divulgazione',
    note: 'Approccio cognitivo-comportamentale alla gelosia: accettare l’emozione, riconoscere i pensieri e ridurre i comportamenti di controllo e verifica.',
  },
  /* --- Regolazione emotiva e rabbia --- */
  {
    id: 'gross1998',
    authors: 'Gross, J. J.',
    year: '1998',
    title: 'The emerging field of emotion regulation: An integrative review',
    publication: 'Review of General Psychology, 2(3)',
    kind: 'teoria',
    note: 'Modello processuale della regolazione emotiva: si può intervenire sulla situazione, sull’attenzione, sull’interpretazione o sulla risposta.',
  },
  {
    id: 'webb2012',
    authors: 'Webb, T. L., Miles, E., & Sheeran, P.',
    year: '2012',
    title: 'Dealing with feeling: A meta-analysis of the effectiveness of strategies derived from the process model of emotion regulation',
    publication: 'Psychological Bulletin, 138(4)',
    kind: 'ricerca',
    note: 'Meta-analisi: l’efficacia varia molto in base alla strategia; la rivalutazione cognitiva tende a funzionare meglio della semplice soppressione.',
  },
  {
    id: 'lieberman2007',
    authors: 'Lieberman, M. D., Eisenberger, N. I., Crockett, M. J., Tom, S. M., Pfeifer, J. H., & Way, B. M.',
    year: '2007',
    title: 'Putting feelings into words: Affect labeling disrupts amygdala activity in response to affective stimuli',
    publication: 'Psychological Science, 18(5)',
    kind: 'ricerca',
    note: 'Dare un nome all’emozione si associa, in laboratorio, a una minore attivazione dell’amigdala.',
  },
  {
    id: 'novaco1975',
    authors: 'Novaco, R. W.',
    year: '1975',
    title: 'Anger Control: The Development and Evaluation of an Experimental Treatment',
    publication: 'Lexington Books',
    kind: 'clinica',
    note: 'Uno dei primi programmi cognitivo-comportamentali per la gestione della rabbia: riconoscere i segnali, modificare le interpretazioni, preparare risposte alternative.',
  },
  {
    id: 'linehan2014',
    authors: 'Linehan, M. M.',
    year: '2014',
    title: 'DBT Skills Training Manual (2nd ed.)',
    publication: 'Guilford Press',
    kind: 'clinica',
    note: 'Abilità della Dialectical Behavior Therapy: tolleranza della sofferenza, regolazione emotiva, efficacia interpersonale.',
  },
  {
    id: 'siegel1999',
    authors: 'Siegel, D. J.',
    year: '1999',
    title: 'The Developing Mind',
    publication: 'Guilford Press',
    kind: 'teoria',
    note: 'Introduce la metafora della "finestra di tolleranza": la fascia di attivazione entro cui si riesce a sentire e pensare insieme.',
  },
  /* --- Controllo coercitivo e violenza --- */
  {
    id: 'stark2007',
    authors: 'Stark, E.',
    year: '2007',
    title: 'Coercive Control: How Men Entrap Women in Personal Life',
    publication: 'Oxford University Press',
    kind: 'teoria',
    note: 'Definisce il controllo coercitivo come un insieme di comportamenti (sorveglianza, isolamento, regole imposte, intimidazione) che limitano la libertà dell’altra persona, anche senza violenza fisica.',
  },
  {
    id: 'johnson2008mp',
    authors: 'Johnson, M. P.',
    year: '2008',
    title: 'A Typology of Domestic Violence: Intimate Terrorism, Violent Resistance, and Situational Couple Violence',
    publication: 'Northeastern University Press',
    kind: 'teoria',
    note: 'Distingue forme diverse di violenza nella coppia, sottolineando il ruolo centrale del controllo. Utile per capire che l’intimidazione non è "un litigio come gli altri".',
  },
  /* --- Comunicazione e riparazione --- */
  {
    id: 'rosenberg2003',
    authors: 'Rosenberg, M. B.',
    year: '2003',
    title: 'Nonviolent Communication: A Language of Life (2nd ed.)',
    publication: 'PuddleDancer Press',
    kind: 'divulgazione',
    note: 'Struttura comunicativa in quattro passi: osservazione, sentimento, bisogno, richiesta. Modello pratico molto diffuso, con evidenze empiriche controllate ancora limitate.',
  },
  {
    id: 'gottman1994',
    authors: 'Gottman, J. M.',
    year: '1994',
    title: 'What Predicts Divorce? The Relationship Between Marital Processes and Marital Outcomes',
    publication: 'Lawrence Erlbaum Associates',
    kind: 'ricerca',
    note: 'Ricerca osservativa sulle coppie: critica, disprezzo, difensività e chiusura risultano associati a esiti relazionali negativi.',
  },
  {
    id: 'gottman1999',
    authors: 'Gottman, J. M., & Silver, N.',
    year: '1999',
    title: 'The Seven Principles for Making Marriage Work',
    publication: 'Crown Publishers',
    kind: 'divulgazione',
    note: 'Versione divulgativa del lavoro di Gottman, con l’idea dei "tentativi di riparazione" e dell’accettare l’influenza del partner.',
  },
  {
    id: 'gollwitzer1999',
    authors: 'Gollwitzer, P. M.',
    year: '1999',
    title: 'Implementation intentions: Strong effects of simple plans',
    publication: 'American Psychologist, 54(7)',
    kind: 'ricerca',
    note: 'Le intenzioni "se succede X, allora farò Y" aumentano la probabilità di tradurre un proposito in azione.',
  },
  {
    id: 'neff2003',
    authors: 'Neff, K. D.',
    year: '2003',
    title: 'Self-compassion: An alternative conceptualization of a healthy attitude toward oneself',
    publication: 'Self and Identity, 2(2)',
    kind: 'teoria',
    note: 'Autocompassione: gentilezza verso sé, senso di comune umanità, consapevolezza. È diversa dall’autoindulgenza e compatibile con la responsabilità.',
  },
];

export const sourceById = (id: string) => sources.find((s) => s.id === id);

export const sourceKindLabel: Record<SourceKind, string> = {
  ricerca: 'Ricerca empirica',
  teoria: 'Modello teorico',
  clinica: 'Testo clinico',
  divulgazione: 'Divulgazione',
};
