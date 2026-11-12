/**
 * Modulo speciale: 15 motivi per iniziare un percorso psicologico.
 * Ogni punto: perché è importante, come si manifesta, conseguenze,
 * che cosa si può imparare, come può aiutare uno psicologo.
 */
export interface HelpReason {
  id: string;
  title: string;
  why: string;
  daily: string;
  consequences: string;
  learn: string;
  psychologist: string;
}

export const helpReasons: HelpReason[] = [
  {
    id: 'gelosia',
    title: 'Comprendere la propria gelosia',
    why: 'La gelosia intensa e frequente è un’esperienza dolorosa per chi la prova, non solo per chi la riceve. Capirne l’origine permette di soffrirne meno.',
    daily: 'Pensieri ricorrenti su chi frequenta lei, difficoltà a rilassarti quando è fuori, confronti continui con altri uomini.',
    consequences: 'Ansia costante, conflitti, comportamenti di verifica che logorano la fiducia e la relazione.',
    learn: 'A riconoscere la gelosia come emozione tua, a separarla dai pensieri e dagli impulsi, a non tradurla in controllo.',
    psychologist: 'Può aiutarti a esplorare da dove nasce, quali esperienze l’hanno resa così intensa e quali strategie concrete funzionano per te.',
  },
  {
    id: 'abbandono',
    title: 'Affrontare la paura di essere traditi o abbandonati',
    why: 'Questa paura può avere radici profonde. Finché resta inesplorata, tende a guidare il comportamento in modo automatico.',
    daily: 'Panico quando lei si allontana, bisogno di sapere sempre dov’è, difficoltà a dormire dopo una discussione.',
    consequences: 'Rischi di trattenere, controllare o mettere alla prova l’altra persona, rendendo la relazione più fragile.',
    learn: 'A distinguere la paura del passato dalla realtà del presente, a rassicurarti senza dipendere dalle verifiche.',
    psychologist: 'Può accompagnarti a rileggere esperienze passate di perdita o tradimento e a costruire una sicurezza più stabile.',
  },
  {
    id: 'controllo',
    title: 'Comprendere il bisogno di controllo',
    why: 'Il controllo nasce spesso dalla paura e viene vissuto come necessità. Capirne la funzione è il primo passo per farne a meno.',
    daily: 'Controllare telefono, posizione, accessi; stabilire regole sulla vita di lei; sentirsi tranquilli solo sapendo tutto.',
    consequences: 'Il controllo riduce la libertà dell’altra persona ed è riconosciuto come forma di abuso quando diventa sistematico.',
    learn: 'A riconoscere i comportamenti di controllo, a interromperli, a trovare altri modi di gestire l’ansia.',
    psychologist: 'Può aiutarti a capire che cosa il controllo sta proteggendo in te e a sostituirlo con strategie che non feriscono.',
  },
  {
    id: 'rassicurazioni',
    title: 'Gestire il bisogno costante di rassicurazioni',
    why: 'Le rassicurazioni portano un sollievo breve, poi il dubbio ritorna. È un circolo che le risposte esterne non riescono a interrompere.',
    daily: 'Chiedere più volte al giorno se lei ti ama, se va tutto bene, se è sicura.',
    consequences: 'Stanchezza in chi deve rassicurare, frustrazione in te perché nessuna risposta basta.',
    learn: 'A riconoscere l’impulso a chiedere, a tollerare il dubbio, a trovare una sicurezza che venga anche da dentro.',
    psychologist: 'Con tecniche cognitivo-comportamentali o altri approcci, può aiutarti a ridurre gradualmente la ricerca di rassicurazione.',
  },
  {
    id: 'incertezza',
    title: 'Imparare a tollerare l’incertezza',
    why: 'In ogni relazione tra persone libere c’è incertezza. Non sopportarla rende ogni silenzio un pericolo.',
    daily: 'Non riuscire a concentrarti finché non sai dov’è, sentire il bisogno urgente di verificare.',
    consequences: 'Le verifiche diventano abituali e la relazione si riempie di richieste di rendiconto.',
    learn: 'A lasciar salire e scendere l’ansia senza agire, a vivere con un margine di non sapere.',
    psychologist: 'Esistono protocolli specifici sull’intolleranza dell’incertezza: un professionista può guidarti in un lavoro graduale e sicuro.',
  },
  {
    id: 'fatti',
    title: 'Distinguere fatti e interpretazioni',
    why: 'Quando la paura scrive la storia, i fatti diventano prove di ciò che temi. Imparare a separarli cambia le reazioni.',
    daily: 'Trarre conclusioni rapide da un messaggio mancato, un tono, un nome.',
    consequences: 'Accuse ingiuste, conflitti basati su ipotesi, perdita di fiducia reciproca.',
    learn: 'A riconoscere i tuoi schemi di pensiero ricorrenti e a verificarli prima di agire.',
    psychologist: 'Può aiutarti a individuare i tuoi pensieri automatici più frequenti e a lavorarci in modo strutturato.',
  },
  {
    id: 'rabbia',
    title: 'Imparare a gestire la rabbia',
    why: 'La rabbia non gestita può trasformarsi in comportamenti che feriscono e spaventano, anche contro le tue intenzioni.',
    daily: 'Alzare la voce spesso, sentirsi provocati facilmente, pentirsi dopo i litigi.',
    consequences: 'Escalation, paura in chi ti sta vicino, relazioni segnate dalla tensione.',
    learn: 'A riconoscere i segnali precoci, interrompere l’escalation, esprimere ciò che c’è sotto la rabbia.',
    psychologist: 'Può proporti percorsi specifici di gestione della rabbia e aiutarti a capire che cosa la alimenta.',
  },
  {
    id: 'intimidazione',
    title: 'Comprendere e interrompere i comportamenti intimidatori',
    why: 'Afferrare, bloccare, seguire, minacciare, colpire oggetti: questi comportamenti producono paura e richiedono un intervento specifico.',
    daily: 'Gesti fisici durante le liti, impedire all’altra persona di andarsene, messaggi minacciosi.',
    consequences: 'Danni profondi alla sicurezza e alla fiducia; rischio di escalation verso forme di violenza più gravi.',
    learn: 'Un protocollo di sicurezza, il riconoscimento pieno della responsabilità, alternative concrete.',
    psychologist: 'Esistono professionisti e servizi dedicati a chi vuole interrompere comportamenti violenti o intimidatori. Cercarli è un atto di responsabilità, non di debolezza.',
  },
  {
    id: 'autonomia',
    title: 'Rispettare l’autonomia della persona amata',
    why: 'Amare qualcuno significa anche accettare che sia libero: di avere amici, tempo, spazi, decisioni.',
    daily: 'Fatica ad accettare che lei esca, abbia amicizie, voglia stare da sola.',
    consequences: 'Limitare l’autonomia porta a risentimento, isolamento, perdita di affetto spontaneo.',
    learn: 'A vivere la libertà dell’altra persona non come minaccia ma come parte di chi è.',
    psychologist: 'Può aiutarti a capire perché la sua autonomia ti spaventa e a costruire una relazione tra due persone intere.',
  },
  {
    id: 'sicurezza',
    title: 'Costruire sicurezza interiore',
    why: 'Quando il tuo senso di valore dipende dall’altra persona, ogni sua distanza diventa una minaccia.',
    daily: 'Umore che dipende dai suoi segnali, bisogno di conferme, poche fonti di valore personale fuori dalla relazione.',
    consequences: 'La relazione diventa il termometro della tua autostima, e l’altra persona porta un peso che non può reggere.',
    learn: 'A costruire un senso di valore più stabile e fonti di benessere che non dipendano solo da lei.',
    psychologist: 'Può accompagnarti in un lavoro sull’autostima e sulla sicurezza personale.',
  },
  {
    id: 'ascolto',
    title: 'Imparare ad ascoltare senza mettersi sempre sulla difensiva',
    why: 'Se ogni critica viene vissuta come un attacco, diventa impossibile ascoltare ciò che l’altra persona prova.',
    daily: 'Rispondere alle lamentele con giustificazioni o controaccuse.',
    consequences: 'L’altra persona smette di dire ciò che sente, e i problemi restano sotto la superficie.',
    learn: 'A tollerare la vergogna abbastanza da ascoltare davvero, e a rispondere dopo aver capito.',
    psychologist: 'Può aiutarti a riconoscere le difese automatiche e a sviluppare un ascolto più aperto.',
  },
  {
    id: 'responsabilita',
    title: 'Assumersi la responsabilità delle proprie reazioni',
    why: 'Finché la responsabilità delle tue reazioni è dell’altra persona (“mi provoca”), non hai il potere di cambiarle.',
    daily: 'Spiegare le proprie reazioni con ciò che ha fatto lei, minimizzare, giustificare.',
    consequences: 'Lei si sente responsabile della tua rabbia; tu resti bloccato negli stessi schemi.',
    learn: 'A riconoscere che le emozioni possono essere provocate, ma il comportamento è una tua scelta.',
    psychologist: 'Può offrirti uno spazio in cui guardare la tua parte senza essere giudicato, e quindi senza bisogno di difenderti.',
  },
  {
    id: 'riparare',
    title: 'Imparare a riparare realmente dopo un conflitto',
    why: 'Chiedere scusa non equivale a cambiare. Una riparazione autentica richiede riconoscimento, responsabilità e comportamenti nuovi.',
    daily: 'Scuse ripetute, promesse che non reggono, ricadute negli stessi comportamenti.',
    consequences: 'Le scuse perdono valore e la fiducia si consuma.',
    learn: 'A riparare in modo completo e a trasformare le promesse in cambiamenti osservabili.',
    psychologist: 'Può aiutarti a costruire un piano di cambiamento realistico e a verificarne i progressi nel tempo.',
  },
  {
    id: 'amore-possesso',
    title: 'Distinguere amore, bisogno e possesso',
    why: 'Alcuni modelli culturali e familiari confondono l’amore con il possesso. Distinguerli cambia il modo di stare in una relazione.',
    daily: 'Sentire che “lei è tua”, che il suo tempo ti spetta, che la gelosia è una prova d’amore.',
    consequences: 'Comportamenti di controllo vissuti come normali, che limitano la libertà dell’altra persona.',
    learn: 'A riconoscere il bisogno come tuo, l’amore come scelta reciproca, il possesso come qualcosa che non appartiene all’amore.',
    psychologist: 'Può aiutarti a rileggere convinzioni apprese e a costruire un’idea di relazione più libera.',
  },
  {
    id: 'schemi',
    title: 'Interrompere schemi relazionali ripetitivi e dolorosi',
    why: 'Se le stesse dinamiche si ripetono in relazioni diverse, è probabile che ci sia qualcosa di tuo da comprendere.',
    daily: 'Litigi simili con partner diversi, stesse paure, stessi comportamenti, stessi finali.',
    consequences: 'Relazioni che si concludono in modo doloroso, senso di impotenza, sfiducia in te stesso.',
    learn: 'A riconoscere gli schemi, la loro origine e i punti in cui puoi interromperli.',
    psychologist: 'La psicoterapia è lo spazio adatto per esplorare schemi profondi e ricorrenti, con tempo e metodo.',
  },
];

export const helpClosing = [
  'Non devi andare dallo psicologo per smettere di provare gelosia, rabbia o paura. Puoi iniziare un percorso per imparare a provare queste emozioni senza trasformarle in comportamenti che limitano, feriscono o spaventano chi ami.',
  'Non è una questione di essere perfetto. È una questione di responsabilità, consapevolezza e cambiamento.',
  'E non devi farlo soltanto per salvare una relazione. Puoi farlo prima di tutto per te stesso e per il tipo di persona e di compagno che vuoi essere.',
];

export const therapyNote = [
  'La psicoterapia non è una punizione. Non è un’ammissione di essere una persona sbagliata. E non è una garanzia automatica di cambiamento.',
  'È uno spazio professionale, riservato, in cui comprendere e modificare schemi che provocano sofferenza — a te e alle persone che ami. Il cambiamento dipende anche dal tuo impegno, dal tempo e dalla relazione con il professionista che scegli.',
  'Per iniziare puoi rivolgerti al tuo medico di base, a un consultorio, ai servizi di salute mentale del territorio o a uno psicologo o psicoterapeuta iscritto all’albo. Se hai messo in atto comportamenti violenti o intimidatori, esistono anche servizi specifici per chi vuole interromperli: puoi chiedere informazioni agli stessi canali.',
];
