import { scenario } from './build';

/** Scenari dei laboratori 4–5. */
export const scenarios2 = [
  /* ---------------- Laboratorio 4 ---------------- */
  scenario({
    id: 'spostamento',
    lab: 'controllo',
    title: 'Lo spostamento non comunicato',
    context:
      'Lei ti aveva detto che dopo il lavoro sarebbe andata in palestra. Alle 19 scopri, da una sua storia, che invece è passata a prendere un aperitivo con una collega. Non te l’ha comunicato.',
    prompt: 'Che cosa fai?',
    start: [
      ['Le scrivi: «Ma non dovevi essere in palestra?»', 'pressante', 'La domanda segnala che stai verificando ciò che fa, confrontando i suoi programmi con le sue storie. Per lei, un cambio di programma diventa un’incoerenza da spiegare.', 'Si sente colta in fallo per un aperitivo.'],
      ['Ti accorgi che ti dà fastidio non saperlo. Ti chiedi: è un’informazione che mi riguarda davvero?', 'consapevole', 'Hai riconosciuto il fastidio senza trasformarlo in un’accusa. Un cambio di programma che non tocca accordi comuni rientra nella sua autonomia.', 'Si gode l’aperitivo. Te lo racconterà, probabilmente, rientrando.'],
      ['Le dici che d’ora in poi deve avvisarti di ogni cambio di programma.', 'controllante', 'Una regola che chiede di comunicare ogni spostamento è sorveglianza. Il bisogno di sentirti incluso è legittimo; la regola non lo è.', 'Inizia a vivere ogni decisione spontanea come qualcosa da comunicare a te.'],
      ['Quando rientra, la saluti appena e vai in un’altra stanza.', 'ritiro', 'Il silenzio punitivo le fa sapere che ha sbagliato qualcosa, senza dirle cosa. Lei imparerà che anche un aperitivo può costare caro.', 'Si sente punita senza sapere bene per cosa.'],
    ],
    apertura: {
      text: 'Lei rientra e ti racconta dell’aperitivo con la collega, che stava attraversando un periodo difficile.',
      choices: [
        ['«Hai fatto bene. Come sta la tua collega?»', 'consapevole', 'Hai accolto il racconto con interesse per la sua vita, non per i dettagli da verificare. È così che il racconto spontaneo resta piacevole.', 'Si sente libera e vicina a te.'],
        ['«Comunque potevi scrivermelo.»', 'pressante', 'Un piccolo rimprovero che trasforma la sua spontaneità in una mancanza. Il messaggio implicito è: le tue scelte devono passare da me.', 'La prossima volta ti avviserà, ma per dovere.'],
      ],
    },
    tensione: {
      text: 'Lei ti dice: «Ho cambiato programma, tutto qui. Non pensavo di doverti chiedere il permesso.»',
      choices: [
        ['«Hai ragione, non devi. Mi ha dato fastidio non saperlo, ma è una mia sensibilità.»', 'consapevole', 'Hai distinto il tuo fastidio dal suo dovere. È il confine tra bisogno e controllo.', 'Si rilassa.'],
        ['«Non è chiedere il permesso, è rispetto.»', 'pressante', 'Chiamare “rispetto” l’obbligo di avvisare è un modo per far sembrare legittima una forma di controllo. Lei sentirà che il suo spazio si riduce.', 'Si sente rimproverata per aver vissuto la sua serata.'],
      ],
    },
    insight:
      'Un cambio di programma che non tocca accordi comuni rientra nell’autonomia dell’altra persona. Il fastidio di non saperlo è tuo; trasformarlo in una regola è controllo.',
    question: 'Quali informazioni sulla sua giornata ti riguardano davvero, e quali vorresti sapere solo per sentirti tranquillo?',
  }),
  scenario({
    id: 'tempo-da-sola',
    lab: 'controllo',
    title: 'Un weekend da sola',
    context:
      'Lei ti dice che vorrebbe passare un weekend da sola, in una casa al mare di famiglia: leggere, camminare, staccare. Ti senti escluso e un po’ spaventato.',
    prompt: 'Come rispondi?',
    start: [
      ['«Da sola? Che cosa c’è che non va con me?»', 'pressante', 'Il suo bisogno di spazio viene letto come un rifiuto di te. È la sensibilità al rifiuto al lavoro: un bisogno personale diventa un giudizio sulla relazione.', 'Si sente in colpa per un bisogno legittimo.'],
      ['«Vengo anch’io, così non stai da sola.»', 'controllante', 'Presentato come premura, è un modo per impedirle di stare sola. Il suo bisogno viene annullato con una proposta che sembra gentile.', 'Si sente soffocata, ma rifiutare sembrerebbe cattivo.'],
      ['«Mi mancherai. Ma capisco: goditi il tuo weekend.»', 'consapevole', 'Hai riconosciuto la tua emozione e rispettato il suo bisogno. Due cose vere insieme: ti mancherà, e lei ha diritto al suo spazio.', 'Parte serena. Probabilmente tornerà con più energia per voi.'],
      ['«Fai come vuoi.»', 'ritiro', 'La frase suona come un permesso concesso a malincuore. È una forma di chiusura che le fa pesare la scelta.', 'Parte con un senso di colpa che le rovina il riposo.'],
    ],
    apertura: {
      text: 'Durante il weekend lei ti manda un messaggio la sera: «Qui è bellissimo. Ti racconto tutto domenica».',
      choices: [
        ['«Sono contento. Riposati.»', 'consapevole', 'Hai lasciato che il messaggio bastasse. Non chiedi di più, non verifichi, non trasformi il suo spazio in un tema.', 'Torna domenica felice di rivederti.'],
        ['«Mi chiami stasera? Voglio sentire la tua voce. E mandami qualche foto.»', 'pressante', 'Richieste comprensibili, ma il suo weekend da sola sta diventando un weekend in tua compagnia a distanza.', 'Si sente un po’ meno sola, ma non nel modo in cui voleva.'],
      ],
    },
    tensione: {
      text: 'Lei ti dice: «Non è contro di te. Ho solo bisogno di respirare un po’.»',
      choices: [
        ['«Hai ragione. Scusa: ho letto il tuo bisogno come un rifiuto. Vai.»', 'consapevole', 'Hai riconosciuto la tua lettura come tua e le hai restituito la libertà di scegliere.', 'Si sente capita.'],
        ['«Respirare da cosa? Da me?»', 'pressante', 'La domanda conferma proprio il timore che lei aveva: che il suo bisogno di spazio non possa essere accolto senza diventare un problema.', 'Forse rinuncerà al weekend. Ma il bisogno resterà.'],
      ],
    },
    insight:
      'Il bisogno di spazio dell’altra persona non è un rifiuto di te. Rispettarlo è un modo di amarla. Annullarlo con proposte che sembrano gentili è una forma di controllo.',
    question: 'Che cosa senti quando lei ha bisogno di stare senza di te?',
  }),
  scenario({
    id: 'amico-palestra',
    lab: 'controllo',
    title: 'L’amico della palestra',
    context:
      'Lei ha stretto amicizia con un ragazzo che frequenta la sua stessa palestra. Ogni tanto si fermano a prendere un caffè dopo l’allenamento. Ti senti a disagio da settimane.',
    prompt: 'Come affronti questo disagio?',
    start: [
      ['«Non mi piace che tu prenda il caffè con lui. Preferirei che smettessi.»', 'controllante', 'Chiedere di interrompere un’amicizia perché ti mette a disagio è limitare la sua vita sociale. È uno dei modi più comuni in cui il controllo isola gradualmente una persona.', 'Si trova a scegliere tra un’amicizia e la pace in casa.'],
      ['«Ti vedi spesso con lui, eh? Sarà proprio simpatico.»', 'pressante', 'Il sarcasmo comunica il sospetto senza dirlo apertamente. Lei sente il messaggio, ma non può rispondere perché nulla è stato detto davvero.', 'Si sente giudicata e inizia a parlarne di meno.'],
      ['Riconosci il disagio come gelosia. Le dici: «A volte mi sento un po’ geloso di questa amicizia. Lo so che è una cosa mia, volevo dirtelo.»', 'consapevole', 'Hai nominato l’emozione come tua, senza chiederle nulla. Condividerla in modo non accusatorio può avvicinarvi invece di dividervi.', 'Apprezza la sincerità. Forse ti propone di conoscerlo.'],
      ['Smetti di chiederle della palestra e ti mostri indifferente.', 'ritiro', 'L’indifferenza finta è un modo per proteggerti, ma lei percepisce la distanza. E il disagio cresce in silenzio.', 'Sente che qualcosa non va, ma non sa cosa.'],
    ],
    apertura: {
      text: 'Lei ti risponde: «Grazie per avermelo detto. È solo un amico. Se vuoi, una volta vieni anche tu.»',
      choices: [
        ['«Mi farebbe piacere. E grazie per averlo preso bene.»', 'consapevole', 'Hai accolto la sua apertura senza trasformarla in un’occasione per verificare. Conoscere le persone della sua vita può ridurre la paura dell’ignoto.', 'Si sente libera di avere amicizie e di condividerle con te.'],
        ['«Sì, così vedo che tipo è.»', 'pressante', 'L’invito è diventato un’ispezione. Lei capirà che non stai venendo per conoscere un amico, ma per valutare una minaccia.', 'Si pente di averlo proposto.'],
      ],
    },
    tensione: {
      text: 'Lei ti risponde: «Ho il diritto di avere amici, anche uomini. Non posso vivere in funzione della tua gelosia.»',
      choices: [
        ['«Hai ragione. La gelosia è mia e me ne occupo io. Non ti chiederò di rinunciare a lui.»', 'consapevole', 'Hai riconosciuto il suo diritto all’autonomia e preso in carico la tua emozione. È il passaggio dal controllo alla responsabilità.', 'Si sente rispettata.'],
        ['«Se ci tieni a me, rinunci a questo caffè.»', 'controllante', 'Mettere l’amore come condizione per rinunciare a un’amicizia è una forma di pressione che la mette davanti a un ricatto affettivo.', 'Forse rinuncerà. Ma il risentimento resterà.'],
      ],
    },
    insight:
      'Avere amici dell’altro sesso è parte dell’autonomia di una persona. La gelosia che senti è reale; chiederle di rinunciare a un’amicizia per placarla è controllo, anche quando viene chiesto con dolcezza.',
    question: 'Ci sono amicizie di lei a cui hai chiesto, direttamente o no, di rinunciare?',
  }),
  scenario({
    id: 'rispondi-subito',
    lab: 'controllo',
    title: 'Rispondi subito',
    context:
      'Lei è a cena con la sua famiglia. Le hai scritto un messaggio venti minuti fa: «Come va?». Nessuna risposta. Hai già chiamato una volta.',
    prompt: 'L’impulso è richiamarla. Che cosa fai?',
    start: [
      ['Chiami ancora, e poi ancora.', 'controllante', 'Le chiamate ripetute durante una cena di famiglia sono una richiesta di disponibilità immediata. Le impongono di scegliere tra la sua famiglia e la tua ansia.', 'Si allontana dalla tavola imbarazzata per rispondere.'],
      ['Ti dici: “È a cena con la famiglia. Il silenzio ha una spiegazione semplice.” Metti giù il telefono.', 'consapevole', 'Hai scelto l’interpretazione più probabile e hai rinunciato a verificare. L’ansia può restare un po’: non è un’emergenza.', 'Si gode la cena. Ti scrive più tardi.'],
      ['Le scrivi: «Ok, vedo che non hai tempo per me.»', 'pressante', 'Il messaggio trasforma la sua presenza a cena in una colpa nei tuoi confronti. È una forma di pressione emotiva.', 'Legge il messaggio a tavola e la serata le si rovina un po’.'],
      ['Spegni il telefono, così sarà lei a non trovarti.', 'ritiro', 'Rendersi irraggiungibili per restituire il “torto” è una piccola punizione. Lei non ha fatto nulla da punire.', 'Ti cerca più tardi e non ti trova. Si preoccupa.'],
    ],
    apertura: {
      text: 'Un’ora dopo lei ti scrive: «Scusa, eravamo a tavola. Tutto bene?»',
      choices: [
        ['«Tutto bene! Saluta tutti.»', 'consapevole', 'Il messaggio non porta traccia della tua ansia. È stata tua, e l’hai gestita tu.', 'Si sente libera e serena.'],
        ['«Finalmente.»', 'pressante', 'Una sola parola basta a farle sapere che il suo tempo con la famiglia ti è costato. La prossima volta si sentirà in dovere di rispondere subito.', 'Si sente in colpa per una cena.'],
      ],
    },
    tensione: {
      text: 'Lei ti scrive, irritata: «Sono a cena con i miei genitori. Non posso stare al telefono.»',
      choices: [
        ['«Hai ragione, scusa. Mi è partita l’ansia. Goditi la serata.»', 'consapevole', 'Riconosci l’ansia come tua e le restituisci la serata. Chiedere attenzione è legittimo; pretendere disponibilità continua no.', 'Si calma e torna a tavola.'],
        ['«Bastava un messaggio. Ma evidentemente non ci tieni.»', 'pressante', 'Trasformare un messaggio mancato in una prova di disinteresse è una forma di ricatto emotivo.', 'Si sente sotto accusa anche quando è con la sua famiglia.'],
      ],
    },
    insight:
      'Chiedere attenzione è legittimo; pretendere disponibilità continua non lo è. Le persone hanno vite, contesti, momenti in cui non possono rispondere. Il tuo bisogno di sentirle vicine non le obbliga a esserlo sempre.',
    question: 'Che cosa succede in te quando lei non è raggiungibile?',
  }),

  /* ---------------- Laboratorio 5 ---------------- */
  scenario({
    id: 'porta',
    lab: 'rabbia',
    title: 'La porta',
    context:
      'Una discussione sulla gelosia si è accesa. Siete in camera. Lei dice: «Basta, non ce la faccio più. Vado a dormire da mia sorella» e prende la borsa. Senti la rabbia esplodere: non vuoi che se ne vada così.',
    prompt: 'Lei va verso la porta. Che cosa fai?',
    start: [
      ['Ti metti davanti alla porta: «Non vai da nessuna parte finché non ne parliamo.»', 'controllante', 'Impedire a qualcuno di uscire è un comportamento intimidatorio, qualunque sia la tua intenzione. Lei, in questo momento, non è libera di andarsene. Questo è il punto in cui la rabbia è diventata pericolosa.', 'Ha paura. Non sa che cosa potresti fare se prova a passare.', true],
      ['Ti fermi. Dici: «Va bene. Mi dispiace che sia andata così.» E ti sposti per lasciarla passare.', 'consapevole', 'Lasciarla andare quando vuole interrompere il conflitto è la cosa più importante che puoi fare. Anche se ti fa male, rispetta la sua sicurezza e la sua libertà.', 'Esce. È scossa, ma sa che può andarsene senza ostacoli.'],
      ['La segui per le scale continuando a parlare: «Aspetta! Ascoltami!»', 'controllante', 'Seguire qualcuno che sta cercando di interrompere il conflitto è intimidatorio. Per te è disperazione; per lei è non poter sfuggire alla tua rabbia.', 'Accelera il passo. Ha paura di te.', true],
      ['«Vai, vai. Tanto lo fai sempre.» E sbatti la porta dopo di lei.', 'ritiro', 'Non l’hai trattenuta, ma il gesto di sbattere la porta e la frase sprezzante comunicano rabbia e disprezzo. Lei esce con quell’immagine.', 'Esce ferita, e un po’ spaventata dal rumore.'],
    ],
    apertura: {
      text: 'Lei è uscita. Sei solo in casa, la rabbia è ancora alta. Hai il telefono in mano.',
      choices: [
        ['Metti via il telefono. Esci a camminare. Domani le scriverai un solo messaggio, quando sarai calmo.', 'consapevole', 'Hai applicato il protocollo: niente messaggi durante l’attivazione, distanza, ripresa del contatto solo quando c’è calma. È la cosa più protettiva per entrambi.', 'Passa la notte da sua sorella, senza ricevere messaggi che la spaventino.'],
        ['Le mandi dieci messaggi in mezz’ora, uno dei quali dice: «Se non torni, vedrai.»', 'controllante', 'I messaggi a raffica e la frase minacciosa la seguono anche lontano. Una minaccia, anche vaga, produce paura, qualunque cosa tu intenda.', 'Ha paura di tornare a casa.', true],
      ],
    },
    tensione: {
      text: 'Lei si ferma, ti guarda con paura e dice: «Lasciami passare. Mi stai spaventando.»',
      choices: [
        ['Ti sposti subito. «Scusa. Hai ragione. Vai.» Poi ti allontani tu, in un’altra stanza.', 'consapevole', 'Hai ascoltato la parola “spaventando” e hai agito immediatamente. Spostarti e allontanarti è l’unica risposta giusta in questo momento. Domani questo episodio andrà riconosciuto pienamente, senza minimizzarlo.', 'Esce. Ricorderà la paura, ma anche che ti sei fermato.'],
        ['«Spaventando? Non ti ho nemmeno toccata. Esageri.»', 'controllante', 'Stai minimizzando la sua paura mentre continui a bloccarla. Non serve toccarla perché si senta in pericolo: la tua presenza fisica davanti alla porta basta.', 'La sua paura aumenta. Cerca un modo per uscire.', true],
      ],
    },
    insight:
      'Quando l’altra persona vuole interrompere il conflitto, lasciarla andare non è perdere: è proteggere. Bloccare una porta, seguirla, minacciarla per messaggio sono comportamenti intimidatori, e nessuna rabbia li giustifica.',
    question: 'Che cosa ti succede dentro quando lei vuole interrompere una discussione che per te non è finita?',
  }),
  scenario({
    id: 'pugno-tavolo',
    lab: 'rabbia',
    title: 'Il tavolo',
    context:
      'Lei ti dice che si sente controllata e che non sopporta più le tue domande sui suoi colleghi. Ti senti accusato ingiustamente. La rabbia sale veloce: le mani si stringono, il viso si scalda.',
    prompt: 'Senti i segnali del corpo. Che cosa fai?',
    start: [
      ['Colpisci il tavolo con il pugno: «Smettila di dire che ti controllo!»', 'controllante', 'Colpire un oggetto vicino a lei è intimidazione fisica, anche se non l’hai toccata. Il messaggio che arriva è: “la mia rabbia può diventare violenza”.', 'Sobbalza. Da quel momento misura ogni parola.', true],
      ['Riconosci i segnali. Dici: «Mi sto arrabbiando troppo. Ho bisogno di fermarmi venti minuti.» Ed esci dalla stanza.', 'consapevole', 'Hai riconosciuto l’attivazione e interrotto la discussione prima dell’escalation. Sei tu che ti allontani, con una pausa dichiarata e un ritorno.', 'È ancora tesa, ma si sente al sicuro.'],
      ['Alzi la voce: «Tu non capisci niente! Sei tu il problema!»', 'pressante', 'L’aggressività verbale sposta il problema su di lei e alza l’escalation. In questo stato, ogni frase rischia di ferire più di quanto vorresti.', 'Si sente aggredita e risponde a sua volta, oppure si chiude.'],
      ['Ti chiudi in un silenzio gelido e non le rivolgi la parola per due giorni.', 'ritiro', 'Il silenzio prolungato è una punizione: comunica che ha detto qualcosa che non doveva. Lei imparerà a non esprimere il suo disagio.', 'Si sente punita per aver detto come si sente.'],
    ],
    apertura: {
      text: 'Fuori, cammini. Il battito scende. Dopo venti minuti rientri.',
      choices: [
        ['«Sono più calmo. Se per te va bene, vorrei capire meglio quando ti senti controllata.»', 'consapevole', 'Hai ripreso il confronto solo quando le condizioni lo permettevano, e chiedendo il suo consenso. E hai scelto di ascoltare invece di difenderti.', 'Si sente ascoltata. Il confronto è difficile, ma possibile.'],
        ['«Allora, ricominciamo: io non ti controllo.»', 'pressante', 'Sei calmo nel corpo, ma riprendi esattamente dalla tua difesa. La pausa non è servita a cambiare prospettiva.', 'Si chiude: sa già come finirà.'],
      ],
    },
    tensione: {
      text: 'Lei è in silenzio, rigida. Ti accorgi che ha paura.',
      choices: [
        ['Ti fermi. «Ti ho spaventata. Non è accettabile. Esco adesso. Domani cercherò aiuto per questo.»', 'consapevole', 'Hai riconosciuto il fatto e l’impatto senza minimizzare, ti sei allontanato e hai indicato un passo concreto. Chiedere scusa non basta: serve un cambiamento, e spesso un aiuto professionale.', 'È ancora spaventata, ma sente che hai capito che cosa è successo.'],
        ['«Non fare così. Non ti farei mai del male, lo sai.»', 'pressante', 'Rassicurarla mentre ha paura sposta il focus sulle tue intenzioni. Ma lei sta vivendo l’effetto del tuo gesto, non le tue intenzioni.', 'Annuisce per chiudere la discussione. La paura resta.'],
      ],
    },
    insight:
      'Colpire oggetti, urlare, sovrastare: anche senza toccare l’altra persona, questi gesti trasmettono minaccia. La rabbia è un segnale per fermarti, non un permesso per agire.',
    question: 'Quali sono i tuoi segnali di rabbia, e in quale momento puoi ancora fermarti?',
  }),
  scenario({
    id: 'braccio',
    lab: 'rabbia',
    title: 'Il braccio',
    context:
      'Durante una lite, lei si gira per andare in cucina mentre stai ancora parlando. Ti senti ignorato, umiliato. D’istinto le afferri il braccio: «Guardami quando ti parlo!». Lei si divincola, ti guarda sconvolta.',
    prompt: 'È appena successo. Che cosa fai adesso?',
    start: [
      ['Lasci subito la presa, fai un passo indietro e dici: «Scusa. Non dovevo. Mi allontano.» Esci dalla stanza.', 'consapevole', 'Il gesto è stato grave e non si cancella. Ma fermarti subito, allontanarti tu e nominarlo per ciò che è sono le prime cose che puoi fare per non peggiorare la situazione.', 'È sconvolta. Ha bisogno di distanza e di sicurezza.'],
      ['«Non ti ho fatto niente. Ti ho solo preso il braccio.»', 'pressante', 'Minimizzare protegge te dalla vergogna, ma nega ciò che lei ha appena vissuto: essere afferrata da qualcuno più arrabbiato di lei. Questo è un comportamento intimidatorio.', 'Si sente non creduta, oltre che spaventata.', true],
      ['«Se tu non mi ignorassi, non arriverei a questo.»', 'controllante', 'Attribuire a lei la responsabilità del tuo gesto è uno dei meccanismi più dannosi: le insegna che è colpa sua se tu diventi aggressivo. La provocazione non giustifica mai un contatto fisico.', 'Inizia a chiedersi se sia davvero colpa sua. È così che la paura si radica.', true],
      ['Ti chiudi in camera e non ne parli più, come se non fosse successo.', 'ritiro', 'Evitare di parlarne non lo fa scomparire. Lei resterà con il ricordo e con la paura che possa ripetersi.', 'Non sa se succederà di nuovo.'],
    ],
    apertura: {
      text: 'Il giorno dopo. Lei è ancora scossa. Ti chiedi che cosa fare.',
      choices: [
        ['Le dici: «Ieri ti ho afferrato il braccio. Ti ho spaventata. Non ci sono giustificazioni. Ho preso un appuntamento con un professionista. Se hai bisogno di spazio, lo rispetto.»', 'consapevole', 'Riconoscimento pieno, nessun “ma”, un passo concreto, rispetto per il suo bisogno di distanza. È ciò che una riparazione autentica richiede. Non garantisce il perdono, e non deve.', 'Ascolta. Ha il diritto di prendersi tempo, o di decidere di non restare.'],
        ['Le porti dei fiori e fai finta che sia tutto a posto.', 'pressante', 'Un gesto affettuoso senza parole e senza cambiamento rischia di chiederle di dimenticare. Il messaggio implicito è: “passiamo oltre”.', 'Accetta i fiori, ma la paura non se ne va.'],
      ],
    },
    tensione: {
      text: 'Lei ti dice, con la voce che trema: «Non ti riconosco più. Mi hai fatto paura.»',
      choices: [
        ['«Hai ragione. Ti ho fatto paura e non è accettabile. Mi allontano adesso, e cercherò un aiuto vero per questo.»', 'consapevole', 'Hai accolto la sua paura senza difenderti e indicato un cambiamento concreto. Da qui, la priorità è la sua sicurezza e il tuo percorso con un professionista.', 'Ha bisogno di tempo. Ma sente che hai visto la gravità di ciò che è successo.'],
        ['«Paura? Sei tu che mi hai fatto arrivare a quel punto.»', 'controllante', 'Rovesciare la responsabilità su di lei nel momento in cui esprime paura è un segnale molto serio. Se ti riconosci in questa risposta, è importante cercare un aiuto specialistico.', 'Comincia a pensare a come proteggersi.', true],
      ],
    },
    insight:
      'Afferrare fisicamente la partner durante una discussione non è un gesto impulsivo qualsiasi: è un comportamento intimidatorio. Non viene giustificato dalla rabbia, dalla provocazione o dal dolore. La responsabilità comincia dal nominarlo, dall’allontanarsi e dal cercare aiuto.',
    question: 'Se ti è capitato qualcosa di simile, che cosa ti impedisce di chiedere aiuto?',
  }),
];
