/**
 * I due circoli del laboratorio 6.
 * Il tuo: INSICUREZZA → RICHIESTA DI CONFERME → SOLLIEVO TEMPORANEO → NUOVO DUBBIO → NUOVA RICHIESTA.
 * Il suo: PRESSIONE → GIUSTIFICAZIONE → STANCHEZZA → DISTANZA EMOTIVA → CONFLITTO.
 * Ogni passo ha un'uscita possibile: che cosa potresti fare per interrompere il circolo.
 */
export interface LoopStep {
  me: { name: string; text: string };
  her: { name: string; text: string };
  exit: { label: string; text: string; herChange: string };
}

export const loopSteps: LoopStep[] = [
  {
    me: { name: 'Insicurezza', text: 'Lei è stata più silenziosa a cena. Dentro di te si accende il dubbio: “Mi ama ancora?”.' },
    her: { name: 'Pressione', text: 'Sente il tuo sguardo, la tensione nell’aria. Capisce che “qualcosa non va” e che dovrà gestirlo.' },
    exit: { label: 'Riconosci il dubbio come tuo', text: 'Ti dici: “Sento insicurezza. Non è una prova di nulla”. Non chiedi niente, per ora.', herChange: 'La serata resta leggera. Lei non deve gestire nulla.' },
  },
  {
    me: { name: 'Richiesta di conferme', text: '«Va tutto bene tra noi? Mi ami?» È la seconda volta oggi.' },
    her: { name: 'Giustificazione', text: '«Sì, certo. Sono solo stanca.» Si trova a spiegare il suo silenzio, a rassicurarti.' },
    exit: { label: 'Rimanda la richiesta', text: 'Senti l’impulso a chiedere e aspetti un’ora. Nel frattempo ricordi le conferme che hai già ricevuto.', herChange: 'Non deve giustificarsi. Il suo silenzio resta solo stanchezza.' },
  },
  {
    me: { name: 'Sollievo temporaneo', text: 'La sua risposta ti calma. Per un po’ stai meglio.' },
    her: { name: 'Stanchezza', text: 'Ha rassicurato ancora una volta. Le è costato poco, ma è la decima volta questa settimana.' },
    exit: { label: 'Nota quanto dura il sollievo', text: 'Ti accorgi che il sollievo è già un po’ calato. Lo annoti nel diario invece di cercare una nuova conferma.', herChange: 'Non riceve un’altra domanda. Ha spazio per riposare.' },
  },
  {
    me: { name: 'Nuovo dubbio', text: 'Il giorno dopo lei risponde a un messaggio dopo tre ore. Il dubbio ritorna, più forte.' },
    her: { name: 'Distanza emotiva', text: 'Si accorge di scriverti meno volentieri. Ogni messaggio sembra un esame.' },
    exit: { label: 'Tolleri l’incertezza', text: 'Non sai perché ha risposto tardi. Accetti di non saperlo. L’ansia sale e poi scende.', herChange: 'Scrive quando può, senza sentirsi osservata.' },
  },
  {
    me: { name: 'Nuova richiesta', text: '«Perché mi hai risposto così tardi? Sei strana in questi giorni.»' },
    her: { name: 'Conflitto', text: '«Non ce la faccio più a doverti sempre rassicurare!» La discussione esplode.' },
    exit: { label: 'Parla del bisogno, non del sospetto', text: '«Mi sono sentito un po’ lontano da te in questi giorni. Ti va se stasera passiamo un po’ di tempo insieme?»', herChange: 'Può rispondere a un invito, invece di difendersi da un’accusa.' },
  },
];
