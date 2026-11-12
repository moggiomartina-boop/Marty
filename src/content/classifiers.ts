/**
 * Esercizi di classificazione. Per ogni elemento la spiegazione del ragionamento
 * viene mostrata sempre, anche quando la scelta coincide: lo scopo non è il punteggio
 * ma capire perché un'affermazione appartiene a una categoria.
 */
export interface ClassCategory {
  id: string;
  label: string;
  hint: string;
}

export interface ClassItem {
  id: string;
  group?: string;
  text: string;
  answer: string;
  explanation: string;
}

export interface ClassifierSet {
  id: string;
  title: string;
  intro: string;
  categories: ClassCategory[];
  items: ClassItem[];
  closing: string;
}

/* ---------------- Laboratorio 2: fatti, interpretazioni, paure, conclusioni, impulsi ---------------- */

const storieCats: ClassCategory[] = [
  { id: 'fatto', label: 'Fatto osservabile', hint: 'Ciò che una videocamera potrebbe registrare.' },
  { id: 'interpretazione', label: 'Interpretazione', hint: 'Il significato che attribuisci al fatto.' },
  { id: 'paura', label: 'Paura', hint: 'Ciò che temi possa essere vero.' },
  { id: 'conclusione', label: 'Conclusione non verificata', hint: 'La storia completa, data per certa.' },
  { id: 'impulso', label: 'Impulso', hint: 'Ciò che senti di dover fare subito.' },
];

export const storieSet: ClassifierSet = {
  id: 'storie',
  title: 'Fatti, interpretazioni, paure, conclusioni e impulsi',
  intro: 'Sei situazioni quotidiane, ciascuna scomposta in cinque frasi. Per ogni frase scegli a quale livello appartiene. Dopo ogni scelta leggerai il ragionamento.',
  categories: storieCats,
  items: [
    // Non risponde per due ore
    { id: 's1a', group: 'Non risponde per due ore', text: 'Le ho scritto alle 11 e alle 13 non ha ancora risposto.', answer: 'fatto', explanation: 'È verificabile: orario del messaggio, assenza di risposta. Non contiene giudizi né ipotesi.' },
    { id: 's1b', group: 'Non risponde per due ore', text: 'Mi sta ignorando.', answer: 'interpretazione', explanation: 'Attribuisce un’intenzione al silenzio. Potrebbe essere occupata, senza batteria, in riunione: “ignorare” è una lettura, non un dato.' },
    { id: 's1c', group: 'Non risponde per due ore', text: 'Ho paura di non essere importante per lei.', answer: 'paura', explanation: 'Esprime un timore personale. È legittimo sentirlo, ma riguarda te, non ciò che lei sta facendo.' },
    { id: 's1d', group: 'Non risponde per due ore', text: 'È con qualcun altro e non vuole che io lo sappia.', answer: 'conclusione', explanation: 'È una storia completa — chi, cosa, perché — costruita senza alcuna informazione che la sostenga. Sembra un ragionamento, ma è la paura che ha riempito il vuoto.' },
    { id: 's1e', group: 'Non risponde per due ore', text: 'Devo chiamarla adesso, finché non risponde.', answer: 'impulso', explanation: 'È una spinta ad agire subito. Riconoscerla come impulso — e non come necessità — ti dà la possibilità di non eseguirla.' },
    // Pranzo non raccontato
    { id: 's2a', group: 'Non racconta subito con chi ha pranzato', text: 'A cena non mi ha detto con chi ha pranzato.', answer: 'fatto', explanation: 'Descrive ciò che è successo (o non è successo) nella conversazione. Nessun significato aggiunto.' },
    { id: 's2b', group: 'Non racconta subito con chi ha pranzato', text: 'Se non me lo dice, è perché c’è qualcosa da nascondere.', answer: 'interpretazione', explanation: 'Collega l’omissione a un’intenzione. Spesso le persone non raccontano dettagli semplicemente perché non li ritengono importanti.' },
    { id: 's2c', group: 'Non racconta subito con chi ha pranzato', text: 'Temo che ci sia qualcuno che le interessa più di me.', answer: 'paura', explanation: 'È il timore che si muove sotto l’interpretazione. Nominarlo come paura ti aiuta a non trattarlo come un’informazione su di lei.' },
    { id: 's2d', group: 'Non racconta subito con chi ha pranzato', text: 'Ha pranzato con un uomo e me lo tiene nascosto.', answer: 'conclusione', explanation: 'Specifica il “chi” e il “perché” senza alcuna prova. È la versione più completa — e più temuta — della storia.' },
    { id: 's2e', group: 'Non racconta subito con chi ha pranzato', text: 'Voglio chiederle tutti i dettagli del pranzo.', answer: 'impulso', explanation: 'È il desiderio di verificare. Puoi sentirlo, e puoi scegliere di non trasformarlo in un interrogatorio.' },
    // Più silenziosa
    { id: 's3a', group: 'È più silenziosa del solito', text: 'Stasera ha parlato poco e ha risposto a monosillabi.', answer: 'fatto', explanation: 'È osservabile: quanto parla, come risponde. Il motivo, invece, non è osservabile.' },
    { id: 's3b', group: 'È più silenziosa del solito', text: 'È arrabbiata con me.', answer: 'interpretazione', explanation: 'Anche se sembra evidente, lo stato emotivo di un’altra persona è sempre un’inferenza. Potrebbe essere stanca, preoccupata, assorta.' },
    { id: 's3c', group: 'È più silenziosa del solito', text: 'Ho paura che si stia stancando di me.', answer: 'paura', explanation: 'È il timore che dà intensità all’interpretazione. Riguarda il tuo senso di sicurezza nel legame.' },
    { id: 's3d', group: 'È più silenziosa del solito', text: 'Sta pensando di lasciarmi.', answer: 'conclusione', explanation: 'È una previsione sul futuro della relazione, costruita su una sera di silenzio. Il salto è enorme, ma l’ansia lo fa sembrare breve.' },
    { id: 's3e', group: 'È più silenziosa del solito', text: 'Devo farle dire che cos’ha, anche se insisto.', answer: 'impulso', explanation: 'La spinta a ottenere subito una spiegazione. Una domanda aperta, una volta, è diversa dall’insistere finché non parla.' },
    // Collega uomo
    { id: 's4a', group: 'Ha un collega uomo', text: 'Lavora nello stesso ufficio di un collega che si chiama Marco.', answer: 'fatto', explanation: 'Un dato neutro della sua vita lavorativa.' },
    { id: 's4b', group: 'Ha un collega uomo', text: 'Marco è interessato a lei.', answer: 'interpretazione', explanation: 'Attribuisce a lui un’intenzione che non conosci. Anche se fosse vero, non direbbe nulla di ciò che vuole lei.' },
    { id: 's4c', group: 'Ha un collega uomo', text: 'Ho paura di non reggere il confronto con lui.', answer: 'paura', explanation: 'Il confronto con un altro uomo spesso tocca l’insicurezza personale. È una paura che riguarda te.' },
    { id: 's4d', group: 'Ha un collega uomo', text: 'Prima o poi tra loro succederà qualcosa.', answer: 'conclusione', explanation: 'È una profezia, non un’informazione. Avere colleghi dell’altro sesso è la normalità della vita lavorativa.' },
    { id: 's4e', group: 'Ha un collega uomo', text: 'Voglio guardare il suo profilo e capire chi è.', answer: 'impulso', explanation: 'È un impulso di verifica. Eseguirlo può darti sollievo per poco, ma alimenta l’ipervigilanza.' },
    // Esce con le amiche
    { id: 's5a', group: 'Esce con le amiche', text: 'Sabato esce a cena con tre amiche.', answer: 'fatto', explanation: 'Un programma, descritto senza giudizi.' },
    { id: 's5b', group: 'Esce con le amiche', text: 'Preferisce stare con loro che con me.', answer: 'interpretazione', explanation: 'Legge una scelta legittima come un confronto con te. Una persona può amare il partner e voler vedere le amiche.' },
    { id: 's5c', group: 'Esce con le amiche', text: 'Temo che conosca qualcuno durante la serata.', answer: 'paura', explanation: 'È il timore che si attiva quando lei è in un contesto che non controlli. Puoi sentirlo senza chiederle di rinunciare alla serata.' },
    { id: 's5d', group: 'Esce con le amiche', text: 'Le sue amiche la spingono a lasciarmi.', answer: 'conclusione', explanation: 'Attribuisce intenzioni a più persone e prevede un esito. Nessuna di queste informazioni è disponibile.' },
    { id: 's5e', group: 'Esce con le amiche', text: 'Le chiederò di mandarmi foto durante la serata.', answer: 'impulso', explanation: 'È la spinta a sapere dove è e con chi. Trasformata in richiesta, diventa una forma di monitoraggio.' },
    // Nessun aggiornamento in pausa
    { id: 's6a', group: 'Non manda un aggiornamento in pausa', text: 'Oggi durante la pausa pranzo non mi ha scritto.', answer: 'fatto', explanation: 'Descrive un comportamento in un momento preciso. È un fatto anche se diverso dal solito.' },
    { id: 's6b', group: 'Non manda un aggiornamento in pausa', text: 'Oggi non mi ha pensato.', answer: 'interpretazione', explanation: 'Un messaggio mancato non misura il pensiero. Si può pensare a qualcuno e non avere tempo di scrivergli.' },
    { id: 's6c', group: 'Non manda un aggiornamento in pausa', text: 'Ho paura che le stia passando l’interesse per me.', answer: 'paura', explanation: 'Un timore legato alla sicurezza del legame. Merita attenzione, ma non come prova.' },
    { id: 's6d', group: 'Non manda un aggiornamento in pausa', text: 'Era in pausa con qualcuno con cui preferisce stare.', answer: 'conclusione', explanation: 'Una storia completa con un personaggio inventato. È il modo in cui la mente spaventata riempie i vuoti.' },
    { id: 's6e', group: 'Non manda un aggiornamento in pausa', text: 'Le scrivo per chiederle con chi è.', answer: 'impulso', explanation: 'Trasformare l’ansia in una domanda di controllo. Puoi aspettare: probabilmente ti scriverà quando potrà.' },
  ],
  closing: 'I confini tra i livelli non sono sempre netti: anche “è arrabbiata” sembra un fatto, ma è un’inferenza. Lo scopo non è un punteggio, ma accorgerti di quanto spesso la mente aggiunge significato a ciò che osservi.',
};

/* ---------------- Laboratorio 3: tipi di mancata sincerità ---------------- */

export const omissioniSet: ClassifierSet = {
  id: 'omissioni',
  title: 'Bugia, omissione, dimenticanza?',
  intro: 'Non tutte le mancanze di sincerità sono uguali. Per ogni situazione, scegli la lettura più probabile in base alle informazioni date.',
  categories: [
    { id: 'bugia', label: 'Bugia intenzionale', hint: 'Dire il falso sapendolo, per ottenere un effetto.' },
    { id: 'omissione', label: 'Omissione consapevole', hint: 'Tacere qualcosa sapendo che è rilevante per l’altro.' },
    { id: 'dimenticanza', label: 'Dimenticanza', hint: 'Non dire qualcosa perché non è venuto in mente.' },
    { id: 'irrilevante', label: 'Non percepita come rilevante', hint: 'Non dirla perché, per sé, non aveva importanza.' },
    { id: 'errore', label: 'Errore riconosciuto', hint: 'Aver sbagliato e poi ammetterlo.' },
  ],
  items: [
    { id: 'o1', text: 'Ti dice di essere stata a casa tutta la sera, mentre era a una cena con un ex, e lo sapeva che per te era importante saperlo.', answer: 'bugia', explanation: 'Ha affermato qualcosa di falso, sapendo che era rilevante per te. È la forma più seria di mancata sincerità, e merita un confronto chiaro.' },
    { id: 'o2', text: 'Non ti ha detto che il suo ex le ha scritto per gli auguri. Sapeva che ne saresti stato turbato e ha preferito tacere.', answer: 'omissione', explanation: 'Non c’è una bugia esplicita, ma una scelta consapevole di non dire. Vale la pena chiederti anche perché abbia temuto la tua reazione.' },
    { id: 'o3', text: 'Ti aveva detto che avrebbe pranzato con una collega; in realtà erano in tre, con un altro collega aggiunto all’ultimo. Non le è venuto in mente di dirtelo.', answer: 'dimenticanza', explanation: 'Un dettaglio che cambia poco e che non le è sembrato degno di nota. Trattarlo come un inganno renderebbe ogni racconto rischioso.' },
    { id: 'o4', text: 'Non ti ha raccontato di aver preso un caffè con un compagno di corso. Per lei era una cosa normale, come tante.', answer: 'irrilevante', explanation: 'Per lei non era un’informazione importante. La tua sensibilità è legittima, ma non rende la sua omissione un segreto.' },
    { id: 'o5', text: 'Una settimana fa ti aveva detto una cosa non vera sul motivo di un ritardo. Oggi te ne parla lei: «Mi dispiace, non ti avevo detto la verità».', answer: 'errore', explanation: 'Ha sbagliato e lo ha riconosciuto spontaneamente. Accogliere questo gesto senza punirlo rende più probabile che succeda di nuovo, quando servirà.' },
    { id: 'o6', text: 'Ti aveva detto che usciva con le amiche; in realtà è andata da sola al cinema perché aveva bisogno di stare un po’ per conto suo e temeva che te la saresti presa.', answer: 'omissione', explanation: 'Ha nascosto qualcosa che per lei poteva essere rilevante per te. Ma il motivo — la paura della tua reazione — è un’informazione preziosa sulla relazione.' },
  ],
  closing: 'Distinguere non serve a giustificare ogni omissione, ma a rispondere in modo proporzionato. E a chiederti, ogni volta, se una parte del silenzio di lei nasca dalla paura della tua reazione.',
};

/* ---------------- Laboratorio 3: fiducia o sorveglianza ---------------- */

export const fiduciaSet: ClassifierSet = {
  id: 'sorveglianza',
  title: 'Costruisce fiducia o diventa sorveglianza?',
  intro: 'Alcuni comportamenti vengono presentati come “bisogno di sicurezza”. Per ognuno, chiediti che effetto ha sulla libertà di lei.',
  categories: [
    { id: 'fiducia', label: 'Contribuisce alla fiducia', hint: 'Rispetta la libertà di entrambi.' },
    { id: 'sorveglianza', label: 'Diventa sorveglianza', hint: 'Monitora o limita l’altra persona.' },
  ],
  items: [
    { id: 'f1', text: 'Chiedere di condividere la posizione in tempo reale “così siamo tutti più tranquilli”.', answer: 'sorveglianza', explanation: 'Anche se proposta come reciproca, è uno strumento di monitoraggio continuo. La tranquillità che offre dipende dal controllo, non dalla fiducia.' },
    { id: 'f2', text: 'Dire: «Quando fai tardi mi preoccupo. Se ti va, mandami un messaggio».', answer: 'fiducia', explanation: 'Esprime un bisogno e lascia a lei la scelta. È una richiesta, non una regola.' },
    { id: 'f3', text: 'Guardare l’ultimo accesso su WhatsApp per capire se è sveglia.', answer: 'sorveglianza', explanation: 'È un controllo silenzioso. Anche se lei non lo sa, cambia il tuo modo di stare nella relazione e alimenta l’ipervigilanza.' },
    { id: 'f4', text: 'Parlare, in un momento tranquillo, di una ferita del passato e di che cosa ti aiuterebbe a sentirti più sicuro.', answer: 'fiducia', explanation: 'Affronta la ferita in modo esplicito e circoscritto, invece di trasformarla in verifiche continue.' },
    { id: 'f5', text: 'Chiederle la password del telefono “perché tra noi non ci devono essere segreti”.', answer: 'sorveglianza', explanation: 'Confonde intimità e accesso totale. La privacy non è un segreto contro di te.' },
    { id: 'f6', text: 'Notare l’impulso di chiederle con chi era e scegliere di non farlo.', answer: 'fiducia', explanation: 'È esattamente lo spazio tra impulso e comportamento in cui la fiducia si costruisce.' },
    { id: 'f7', text: 'Fare domande “casuali” agli amici di lei per verificare ciò che ti ha raccontato.', answer: 'sorveglianza', explanation: 'È una verifica indiretta, che coinvolge altre persone. Se lei lo scoprisse, si sentirebbe tradita nella fiducia.' },
    { id: 'f8', text: 'Accogliere un suo racconto con interesse per la sua esperienza, senza fare domande su chi c’era.', answer: 'fiducia', explanation: 'Rende la condivisione piacevole e sicura. È così che i racconti spontanei aumentano.' },
  ],
  closing: 'La fiducia si costruisce lasciando l’altra persona libera e scoprendo che sceglie comunque di esserci. La sorveglianza toglie proprio questa possibilità.',
};

/* ---------------- Laboratorio 7: avere, comunicare, pretendere, rispettare ---------------- */

export const bisogniSet: ClassifierSet = {
  id: 'bisogni',
  title: 'Avere, comunicare, pretendere, rispettare',
  intro: 'Per ogni frase, scegli a quale passaggio appartiene. La differenza tra comunicare e pretendere è spesso sottile: guarda quanta libertà lascia all’altra persona.',
  categories: [
    { id: 'avere', label: 'Avere un bisogno', hint: 'Riconoscere dentro di te che cosa ti serve.' },
    { id: 'comunicare', label: 'Comunicarlo', hint: 'Dirlo, lasciando libera la risposta.' },
    { id: 'pretendere', label: 'Pretenderlo', hint: 'Renderlo un obbligo per l’altra persona.' },
    { id: 'rispettare', label: 'Rispettare il limite', hint: 'Accettare un no, anche se fa male.' },
  ],
  items: [
    { id: 'b1', text: '“Mi accorgo che ho bisogno di sentirmi più vicino a lei.”', answer: 'avere', explanation: 'È il riconoscimento interno del bisogno, prima di qualsiasi richiesta. È il punto di partenza.' },
    { id: 'b2', text: '«Mi piacerebbe passare più tempo insieme. Che ne dici di una serata solo per noi questa settimana?»', answer: 'comunicare', explanation: 'Esprime il bisogno e propone, lasciando spazio a un sì, a un no o a una controproposta.' },
    { id: 'b3', text: '«Questo weekend stai con me, le tue amiche le vedi un’altra volta.»', answer: 'pretendere', explanation: 'Decide al posto suo. Il bisogno di vicinanza è legittimo, ma qui diventa un obbligo.' },
    { id: 'b4', text: '«Ok, capisco che stasera vuoi riposare. Mi dispiace un po’, ma va bene.»', answer: 'rispettare', explanation: 'Riconosce il proprio dispiacere e accetta il limite di lei senza farlo pesare.' },
    { id: 'b5', text: '«Se ci tenessi a me, mi scriveresti più spesso.»', answer: 'pretendere', explanation: 'Lega l’amore a un comportamento e rende il “no” una prova di disinteresse. È una pretesa con la forma di un rimprovero.' },
    { id: 'b6', text: '«Quando non ti sento per tutto il giorno mi manchi. Mi farebbe piacere un messaggio, quando puoi.»', answer: 'comunicare', explanation: 'Descrive un’emozione e chiede in modo flessibile (“quando puoi”).' },
    { id: 'b7', text: 'Lei dice che non vuole parlare della discussione stasera. Le dici che va bene e proponi domani.', answer: 'rispettare', explanation: 'Accetti il suo tempo e proponi un’alternativa senza forzare.' },
    { id: 'b8', text: '«Non ti lascio andare a dormire finché non risolviamo.»', answer: 'pretendere', explanation: 'Qui la pretesa supera il confine e diventa coercizione: impedisce all’altra persona di sottrarsi. È un comportamento da interrompere.' },
  ],
  closing: 'Un bisogno detto è un invito. Un bisogno preteso è un obbligo. Rispettare il limite dell’altra persona non cancella il tuo bisogno: ti chiede di trovare altri modi di prendertene cura.',
};

/* ---------------- Laboratorio 9: promessa generica o cambiamento osservabile ---------------- */

export const promesseSet: ClassifierSet = {
  id: 'promesse',
  title: 'Promessa generica o cambiamento osservabile?',
  intro: 'Un cambiamento osservabile risponde a tre domande: che cosa farò, in quale situazione, come me ne accorgerò. Classifica ogni frase.',
  categories: [
    { id: 'generica', label: 'Promessa generica', hint: 'Sincera ma difficile da verificare.' },
    { id: 'osservabile', label: 'Cambiamento osservabile', hint: 'Comportamento, situazione, verifica.' },
  ],
  items: [
    { id: 'p1', text: '«Sarò meno geloso.»', answer: 'generica', explanation: 'Non dice che cosa farai di diverso, né quando. “Meno” non si può osservare.' },
    { id: 'p2', text: '«Quando esce con le amiche, non le chiederò foto né aggiornamenti durante la serata.»', answer: 'osservabile', explanation: 'Indica una situazione precisa e un comportamento verificabile.' },
    { id: 'p3', text: '«Non succederà più.»', answer: 'generica', explanation: 'È la promessa più comune dopo un conflitto. Senza indicare che cosa farai al posto di ciò che è successo, resta un desiderio.' },
    { id: 'p4', text: '«Se sento la mascella serrata durante una discussione, dico la frase di pausa ed esco dalla stanza per 20 minuti.»', answer: 'osservabile', explanation: 'Un segnale, un’azione, una durata: è un’intenzione di implementazione.' },
    { id: 'p5', text: '«Mi fiderò di più.»', answer: 'generica', explanation: 'La fiducia non si decide: si costruisce con comportamenti. Quali?' },
    { id: 'p6', text: '«Non controllerò il suo ultimo accesso. Ogni volta che lo faccio, lo annoto nel diario la sera stessa.»', answer: 'osservabile', explanation: 'Comportamento preciso e sistema di verifica onesto, anche per le ricadute.' },
    { id: 'p7', text: '«Cercherò di essere più calmo.»', answer: 'generica', explanation: '“Cercherò” e “più” rendono la promessa impossibile da verificare.' },
    { id: 'p8', text: '«Ogni domenica rileggo il piano e scrivo quante volte ho chiesto conferme durante la settimana.»', answer: 'osservabile', explanation: 'Introduce una misura concreta e un momento fisso di revisione.' },
  ],
  closing: 'Le promesse generiche non sono bugie: sono desideri. Diventano cambiamento quando le traduci in comportamenti precisi, in situazioni precise, con un modo per verificarli.',
};

export const classifierSets: Record<string, ClassifierSet> = {
  storie: storieSet,
  omissioni: omissioniSet,
  sorveglianza: fiduciaSet,
  bisogni: bisogniSet,
  promesse: promesseSet,
};
