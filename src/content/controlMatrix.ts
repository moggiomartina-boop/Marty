/**
 * Laboratorio 4: dieci situazioni, ciascuna in tre modalità.
 * A = comunicazione sana del bisogno, B = richiesta pressante o accusatoria,
 * C = comportamento controllante o coercitivo.
 */
export interface Mode {
  phrase: string;
  communicates: string;
  effect: string;
}

export interface ControlCase {
  id: string;
  situation: string;
  need: string;
  a: Mode;
  b: Mode;
  c: Mode;
}

export const controlCases: ControlCase[] = [
  {
    id: 'pausa-lavoro',
    situation: 'È in pausa al lavoro',
    need: 'Sentirti presente nella sua giornata.',
    a: { phrase: '«Buona pausa! Ti penso.» E non aspetti una risposta.', communicates: 'Affetto, senza richieste.', effect: 'Riceve un pensiero, non un compito. Se ha tempo, risponde volentieri.' },
    b: { phrase: '«Sei in pausa? Allora puoi rispondermi, no?»', communicates: 'Che la sua pausa ti è dovuta.', effect: 'La pausa diventa un momento in cui rendere conto. Si sente obbligata.' },
    c: { phrase: 'Pretendi una videochiamata in ogni pausa “per vedere dove sei”.', communicates: 'Che deve dimostrarti dove e con chi è.', effect: 'Perde il controllo del proprio tempo. Si sente sorvegliata anche al lavoro.' },
  },
  {
    id: 'pranzo-collega',
    situation: 'Pranza con un collega',
    need: 'Sentirti sicuro di essere importante per lei.',
    a: { phrase: '«Com’è andato il pranzo?» E ascolti la risposta.', communicates: 'Interesse per la sua vita.', effect: 'Racconta liberamente, colleghi compresi.' },
    b: { phrase: '«Ancora con lui? Ma non avete altro da fare?»', communicates: 'Sospetto e disapprovazione.', effect: 'Inizia a sentirsi in colpa per una normale relazione di lavoro.' },
    c: { phrase: '«Non voglio che pranzi da sola con lui.»', communicates: 'Che decidi tu con chi può mangiare.', effect: 'La sua vita lavorativa viene limitata dalla tua paura. Isolamento graduale.' },
  },
  {
    id: 'non-scrive',
    situation: 'Non scrive durante la giornata',
    need: 'Sentire il legame anche a distanza.',
    a: { phrase: '«Mi piace quando mi scrivi durante il giorno. Quando puoi, mi fa piacere.»', communicates: 'Un bisogno detto con flessibilità.', effect: 'Sa che cosa ti fa piacere e può darlo liberamente.' },
    b: { phrase: '«Tutto il giorno senza un messaggio. Bello sapere quanto conto.»', communicates: 'Rimprovero e colpa.', effect: 'Il prossimo messaggio sarà un dovere, non un pensiero.' },
    c: { phrase: 'Stabilisci orari in cui deve scriverti, e ti arrabbi se salta.', communicates: 'Una regola con una punizione.', effect: 'Organizza la sua giornata attorno ai tuoi orari. Vive l’ansia di “sgarrare”.' },
  },
  {
    id: 'spostamento',
    situation: 'Non comunica subito uno spostamento',
    need: 'Sapere come organizzarti, sentirti incluso.',
    a: { phrase: '«Se cambi programma e riguarda anche me, mi aiuta saperlo.»', communicates: 'Un accordo su ciò che vi riguarda entrambi.', effect: 'Distingue tra ciò che ti riguarda e ciò che è suo.' },
    b: { phrase: '«Perché non mi hai detto che eri lì?»', communicates: 'Che ogni suo spostamento va spiegato.', effect: 'Inizia a giustificare ogni cambio di programma.' },
    c: { phrase: 'Le chiedi di condividere la posizione in tempo reale.', communicates: 'Che vuoi sapere sempre dove si trova.', effect: 'È monitorata in modo continuo. La sua libertà di movimento ha un osservatore.' },
  },
  {
    id: 'esce-amici',
    situation: 'Esce con gli amici',
    need: 'Non sentirti escluso, sentirti importante.',
    a: { phrase: '«Divertiti! Mi mancherai un po’.»', communicates: 'Affetto e fiducia.', effect: 'Esce serena e torna con voglia di raccontare.' },
    b: { phrase: '«Di nuovo? E io cosa faccio, sto qui da solo?»', communicates: 'Che la sua uscita ti sta facendo un torto.', effect: 'Esce con un senso di colpa, o rinuncia.' },
    c: { phrase: 'Le chiedi foto durante la serata e di rientrare entro un orario che decidi tu.', communicates: 'Che la sua serata è sotto il tuo controllo.', effect: 'Passa la serata a gestire te. Con il tempo, esce sempre meno.' },
  },
  {
    id: 'altro-sesso',
    situation: 'Ha rapporti sociali con persone dell’altro sesso',
    need: 'Sentirti al sicuro nel legame.',
    a: { phrase: 'Riconosci la gelosia come tua: «A volte mi sento geloso, ma so che è una cosa mia».', communicates: 'Onestà emotiva senza richieste.', effect: 'Può accogliere la tua emozione senza sentirsi accusata.' },
    b: { phrase: '«Chissà che cosa vuole da te quello.»', communicates: 'Sospetto verso le sue amicizie.', effect: 'Inizia a nominarle meno, o a frequentarle di nascosto.' },
    c: { phrase: 'Le chiedi di smettere di vedere i suoi amici uomini.', communicates: 'Che decidi tu le sue relazioni.', effect: 'Perde amicizie. Isolamento: uno dei tratti centrali del controllo coercitivo.' },
  },
  {
    id: 'risposta',
    situation: 'Non risponde subito',
    need: 'Ridurre l’ansia, sentirla raggiungibile.',
    a: { phrase: 'Aspetti. Se è importante, glielo dici: «Quando puoi chiamami, è per una cosa di casa».', communicates: 'Che rispetti i suoi tempi.', effect: 'Risponde quando può, senza ansia.' },
    b: { phrase: '«??» dopo dieci minuti, poi «Mi rispondi?»', communicates: 'Urgenza e irritazione.', effect: 'Si sente obbligata a interrompere ciò che sta facendo.' },
    c: { phrase: 'Chiami ripetutamente finché non risponde.', communicates: 'Che la sua disponibilità deve essere immediata.', effect: 'Vive ogni momento senza telefono come un rischio.' },
  },
  {
    id: 'dettagli',
    situation: 'Non racconta spontaneamente ogni dettaglio',
    need: 'Sentirti partecipe della sua vita.',
    a: { phrase: 'Ascolti ciò che sceglie di raccontare e ti mostri interessato.', communicates: 'Che raccontare a te è piacevole.', effect: 'Racconta di più, nel tempo.' },
    b: { phrase: '«E poi? E con chi? E perché non me l’hai detto prima?»', communicates: 'Che ogni racconto apre un’indagine.', effect: 'Racconta sempre meno.' },
    c: { phrase: 'Pretendi un resoconto completo della giornata ogni sera.', communicates: 'Che deve rendere conto della sua vita.', effect: 'Si sente in libertà vigilata.' },
  },
  {
    id: 'tempo-sola',
    situation: 'Vuole trascorrere del tempo da sola',
    need: 'Non sentirti respinto.',
    a: { phrase: '«Certo. Prenditi il tuo tempo.»', communicates: 'Rispetto per il suo spazio.', effect: 'Si ricarica e torna più disponibile.' },
    b: { phrase: '«Da sola? Ti ho fatto qualcosa?»', communicates: 'Che il suo bisogno è un problema.', effect: 'Si sente in colpa per avere un bisogno.' },
    c: { phrase: 'Ti presenti comunque, “solo per farle compagnia”.', communicates: 'Che il suo limite non conta.', effect: 'Impara che i suoi limiti non vengono rispettati.' },
  },
  {
    id: 'telefono',
    situation: 'Non vuole mostrare il telefono',
    need: 'Eliminare il dubbio.',
    a: { phrase: 'Non glielo chiedi. Riconosci il dubbio come tuo e te ne occupi tu.', communicates: 'Rispetto per la sua privacy.', effect: 'Si sente rispettata come persona adulta.' },
    b: { phrase: '«Se non hai niente da nascondere, perché non me lo fai vedere?»', communicates: 'Che la privacy è una prova di colpa.', effect: 'Si trova in trappola: rifiutare la fa sembrare colpevole.' },
    c: { phrase: 'Lo prendi mentre dorme o è sotto la doccia.', communicates: 'Che i suoi confini non esistono.', effect: 'Una violazione profonda della fiducia, anche se non lo scopre.' },
  },
];
