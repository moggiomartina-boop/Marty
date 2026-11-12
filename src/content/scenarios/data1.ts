import { scenario } from './build';

/** Scenari dei laboratori 1–3. */
export const scenarios1 = [
  /* ---------------- Laboratorio 1 ---------------- */
  scenario({
    id: 'pranzo-collega',
    lab: 'mondo-interiore',
    title: 'Il pranzo con il collega',
    context:
      'Sera, a cena. La tua partner racconta, di passaggio, che oggi ha pranzato con Davide, un collega del suo ufficio. Senti una stretta allo stomaco. Non lo conosci, e non sapevi che pranzassero insieme.',
    prompt: 'Senti salire la gelosia. Che cosa fai?',
    start: [
      ['«Ah, e da quando pranzi con Davide?»', 'pressante', 'La domanda nasce dalla gelosia, ma il tono contiene già un’accusa: implica che ci sia qualcosa da spiegare. Lei sentirà il sospetto prima della curiosità.', 'Si irrigidisce: aveva raccontato una cosa normale e ora si sente sotto esame.'],
      ['Noti la stretta, la nomini dentro di te — “sono geloso” — e chiedi: «Com’è andato il pranzo?»', 'consapevole', 'Hai separato l’emozione (gelosia) dal comportamento (una domanda aperta). La gelosia c’è ancora, ma non sta guidando la conversazione.', 'Continua a raccontare con naturalezza. Non sa nulla della tua stretta, e va bene così.'],
      ['Più tardi, mentre lei dorme, cerchi Davide sui social e guardi le sue foto.', 'controllante', 'È un comportamento di verifica: cerca di placare l’ansia raccogliendo informazioni. Il sollievo, se arriva, dura poco, e la prossima volta servirà un’altra ricerca.', 'Non lo sa. Ma qualcosa nella relazione è cambiato: hai iniziato a indagare sulla sua vita.'],
      ['Non dici nulla e per il resto della serata rispondi a monosillabi.', 'ritiro', 'Il silenzio protegge te dal mostrare la gelosia, ma lei percepisce la freddezza senza capirne il motivo. È una forma di pressione indiretta.', 'Si chiede che cosa abbia sbagliato. Forse, la prossima volta, non ti racconterà del pranzo.'],
    ],
    apertura: {
      text: 'Lei racconta che hanno parlato di un progetto difficile e che Davide l’ha aiutata. La gelosia si riaccende per un attimo.',
      choices: [
        ['Ti accorgi del pensiero “lui la aiuta, io no” e lo lasci passare. «Mi fa piacere che tu abbia trovato una mano.»', 'consapevole', 'Hai riconosciuto il confronto che la mente stava facendo, senza trasformarlo in un’accusa. È esattamente lo spazio tra pensiero e comportamento.', 'Si sente libera di raccontarti la sua giornata, colleghi compresi.'],
        ['«Ah, quindi adesso è lui che ti aiuta.»', 'pressante', 'Il pensiero di confronto è diventato una frase pungente. L’apertura iniziale si chiude, e la conversazione prende la forma di una difesa.', 'Si pente di averti raccontato i dettagli.'],
      ],
    },
    tensione: {
      text: 'Lei ti guarda perplessa: «C’è qualche problema con il fatto che pranzo con un collega?»',
      choices: [
        ['«Hai ragione, scusa. Mi sono sentito geloso, ma è una cosa mia. Com’è andata?»', 'consapevole', 'Riconosci la tua emozione come tua, senza chiederle di gestirla. È una piccola riparazione che restituisce leggerezza alla serata.', 'Si rilassa. Apprezza che tu l’abbia detto senza accusarla.'],
        ['«Nessun problema. Però potevi dirmelo prima, no?»', 'pressante', 'Stai introducendo una regola implicita: deve avvisarti in anticipo dei suoi pranzi. È uno dei modi in cui un bisogno di sicurezza scivola verso il controllo.', 'Si sente come se dovesse chiedere il permesso per mangiare con un collega.'],
      ],
    },
    insight:
      'La gelosia può arrivare anche quando non c’è nulla da temere. Riconoscerla come tua — «sono geloso» — invece di trasformarla in sospetto verso di lei, ti permette di restare nella conversazione senza ferirla.',
    question: 'Quando provi gelosia, che cosa ti serve di più: sapere di più su di lei, o capire meglio che cosa succede in te?',
  }),
  scenario({
    id: 'conferma-serale',
    lab: 'mondo-interiore',
    title: '«Mi ami ancora?»',
    context:
      'Siete sul divano. Lei è stanca, guarda una serie. Ti senti lontano da lei, anche se è a mezzo metro. È la terza sera di fila che non avete parlato molto. Dentro di te cresce un dubbio familiare.',
    prompt: 'Il bisogno di una conferma è forte. Che cosa fai?',
    start: [
      ['«Mi ami ancora? Dimmelo.»', 'pressante', 'La richiesta è comprensibile, ma è la terza in pochi giorni. Il sollievo che porterà sarà breve: il dubbio non nasce dalla risposta di lei e non si spegnerà con essa.', 'Sospira: «Sì, ti amo. Perché me lo chiedi sempre?». Si sente stanca, non rassicurata.'],
      ['Ti siedi più vicino, le prendi la mano, e noti dentro di te: “mi sento lontano, è una sensazione, non una prova”.', 'consapevole', 'Hai cercato vicinanza in modo diretto e non verbale, senza chiedere una prova. E hai riconosciuto il dubbio come sensazione.', 'Ti stringe la mano. Per lei è un gesto affettuoso, non una domanda a cui rispondere.'],
      ['Prendi il suo telefono dal tavolino “per vedere l’ora” e guardi le notifiche.', 'controllante', 'Il dubbio sul legame si è trasformato in una verifica sulla sua vita privata. Non ti dirà se ti ama; ti dirà solo con chi ha parlato, alimentando altre domande.', 'Se se ne accorge, si sentirà violata. Se non se ne accorge, il dubbio resterà a te.'],
      ['Ti alzi e vai a letto senza dire nulla, sperando che lei venga a cercarti.', 'ritiro', 'Allontanarti per vedere se lei ti cerca è un modo indiretto di chiedere una prova. Se non viene, lo leggerai come una conferma della paura.', 'Pensa che tu sia stanco. Non sa che la stai mettendo alla prova.'],
    ],
    apertura: {
      text: 'Dopo un po’ lei appoggia la testa sulla tua spalla. Il dubbio si attenua, ma non sparisce del tutto.',
      choices: [
        ['Lasci che resti un po’ di dubbio, senza bisogno di eliminarlo.', 'consapevole', 'Tollerare un residuo di incertezza è una delle abilità più importanti. Non serve sentirsi sicuri al cento per cento per stare in una relazione.', 'La serata resta tranquilla e affettuosa.'],
        ['«Ma sei sicura che vada tutto bene tra noi?»', 'pressante', 'Il dubbio residuo ti ha spinto a cercare un’altra conferma. È il meccanismo tipico: sollievo, nuovo dubbio, nuova richiesta.', 'Si irrigidisce un po’: il momento di vicinanza è diventato un’altra verifica.'],
      ],
    },
    tensione: {
      text: 'Lei ti dice, con un tono stanco: «Non so più come dimostrartelo. Qualunque cosa faccia non basta.»',
      choices: [
        ['«Hai ragione. Non dipende da te: è un dubbio che devo imparare a gestire io.»', 'consapevole', 'Riconosci che il dubbio è tuo e che non può essere lei a spegnerlo. È un passaggio che libera entrambi.', 'Sente che il peso delle tue paure non è più tutto su di lei.'],
        ['«Allora forse è perché non mi ami come prima.»', 'pressante', 'Il suo sfogo diventa una prova del tuo timore. È il ragionamento emotivo al lavoro: la paura interpreta anche la stanchezza come mancanza d’amore.', 'Si sente intrappolata: qualsiasi risposta sarà letta come insufficiente.'],
      ],
    },
    insight:
      'Chiedere conferme è umano. Ma quando le conferme non bastano più, il problema non è ciò che lei dice: è un dubbio che nessuna risposta esterna riesce a spegnere, e su cui puoi lavorare tu.',
    question: 'Quanto dura, di solito, il sollievo dopo una sua rassicurazione?',
  }),
  scenario({
    id: 'serata-amiche-1',
    lab: 'mondo-interiore',
    title: 'Il sabato sera',
    context:
      'Lei ti dice che sabato uscirà con le amiche del liceo: cena e poi un locale. Tu resterai a casa. Senti qualcosa che assomiglia a rabbia, ma sotto c’è anche un senso di esclusione.',
    prompt: 'Che cosa le rispondi?',
    start: [
      ['«Ancora con loro? Ma quante volte uscite?»', 'pressante', 'La rabbia ha preso la forma di un rimprovero. Ma ciò che senti sotto è probabilmente esclusione o paura: emozioni che lei non vedrà, perché le stai mostrando solo l’irritazione.', 'Si sente giudicata per voler vedere le sue amiche.'],
      ['«Va bene. Ti chiedo solo di mandarmi una foto ogni tanto e di dirmi quando torni a casa.»', 'controllante', 'Sembra una richiesta piccola, ma chiede aggiornamenti continui durante una serata che è sua. È una forma di monitoraggio presentata come premura.', 'Passerà la serata con il pensiero di doverti aggiornare.'],
      ['«Divertiti.» E per il resto della settimana sei freddo.', 'ritiro', 'Hai detto la cosa giusta a parole, ma il comportamento dice il contrario. La freddezza diventa un costo che lei pagherà per la sua libertà.', 'Capisce che la serata ha avuto un prezzo, anche se nessuno l’ha detto.'],
      ['Ti fermi a sentire: «Mi sento un po’ escluso». E le dici: «Divertiti. Mi mancherai un po’, ma è giusto che tu stia con loro.»', 'consapevole', 'Hai riconosciuto l’emozione sotto la rabbia e l’hai espressa senza farne una richiesta. Lei è libera, e tu sei stato onesto.', 'Si sente libera e voluta bene.'],
    ],
    apertura: {
      text: 'Sabato sera. È mezzanotte, lei non ti ha scritto. L’agitazione sale.',
      choices: [
        ['Ti accorgi dell’impulso a scriverle. Aspetti, guardi un film, vai a dormire.', 'consapevole', 'Hai lasciato che l’impulso salisse senza eseguirlo. Ogni volta che lo fai, insegni alla tua mente che l’incertezza è sopportabile.', 'Torna a casa serena e ti trova addormentato.'],
        ['Le scrivi: «Tutto ok? Quando torni?» e poi, dopo dieci minuti senza risposta, «??».', 'pressante', 'Il primo messaggio poteva essere neutro; il secondo, con i punti interrogativi, porta urgenza e rimprovero. Lei lo leggerà nel mezzo della serata.', 'Il clima della serata cambia: ora deve rispondere a te.'],
      ],
    },
    tensione: {
      text: 'Lei ti risponde, un po’ irritata: «Perché devo sempre sentirmi in colpa quando esco?»',
      choices: [
        ['«Hai ragione. Mi sento escluso e l’ho fatto pesare a te. Non è giusto.»', 'consapevole', 'Hai riconosciuto il tuo sentimento e anche il modo in cui l’hai scaricato su di lei. È un passaggio fondamentale di responsabilità.', 'Si sente vista. Forse ti racconterà della serata con più voglia.'],
        ['«Non ti faccio sentire in colpa. Sei tu che te la prendi.»', 'pressante', 'Stai negando un effetto che lei descrive. La minimizzazione protegge te, ma le dice che la sua esperienza non conta.', 'Si sente non ascoltata e smette di parlarne.'],
      ],
    },
    insight:
      'La rabbia per la libertà dell’altra persona spesso nasconde un senso di esclusione o di paura. Dirlo come sentimento tuo, senza chiedere di cambiare i suoi piani, è onesto e rispettoso insieme.',
    question: 'Che cosa senti, sotto la superficie, quando lei fa qualcosa senza di te?',
  }),

  /* ---------------- Laboratorio 2 ---------------- */
  scenario({
    id: 'due-ore',
    lab: 'storie',
    title: 'Due ore senza risposta',
    context:
      'Le hai scritto alle 11 per sapere come stava andando la riunione. Sono le 13:10 e non ha risposto. Vedi che è stata online alle 12:30. La mente comincia a lavorare.',
    prompt: 'Quale storia scegli di seguire?',
    start: [
      ['“Era online e non mi ha risposto. Sta scrivendo a qualcun altro.”', 'pressante', 'Fatto: era online alle 12:30. Conclusione non verificata: sta scrivendo a qualcun altro. Il salto è enorme, ma l’ansia lo fa sembrare logico.', 'Era online per rispondere a un messaggio di lavoro. Non sa di essere sotto processo.'],
      ['Separi: fatto — non ha risposto, era online; interpretazione possibile — è presa; paura — non sono importante.', 'consapevole', 'Hai distinto i livelli. La paura è ancora lì, ma l’hai riconosciuta come paura e non come informazione su di lei.', 'Sta finendo una giornata impegnativa.'],
      ['Le scrivi altri tre messaggi e la chiami due volte.', 'controllante', 'La raffica di messaggi e chiamate è un modo per ridurre l’incertezza ottenendo una risposta a ogni costo. Ma la impone a lei, nel mezzo del suo lavoro.', 'Vede cinque notifiche durante una riunione. Si sente sotto pressione, forse imbarazzata davanti ai colleghi.'],
      ['Decidi di non scriverle più per tutto il giorno: “vediamo se si accorge”.', 'ritiro', 'Il silenzio come prova è un modo indiretto di chiederle di dimostrarti attenzione. Lei non conosce le regole del gioco.', 'Stasera ti troverà distante e non capirà perché.'],
    ],
    apertura: {
      text: 'Alle 14 lei ti scrive: «Scusa, giornata assurda. Tutto bene?» Ti accorgi che una parte di te vuole ancora sapere perché era online.',
      choices: [
        ['«Tutto bene! Com’è andata la riunione?»', 'consapevole', 'Hai lasciato andare il dettaglio dell’ultimo accesso. Il fatto nuovo (ti ha scritto, era impegnata) è stato accolto invece di essere messo in discussione.', 'Ti racconta volentieri.'],
        ['«Eri online alle 12:30 però.»', 'pressante', 'Il messaggio rivela che stai controllando i suoi accessi. Il fatto che lei ti abbia scritto non è bastato a placare il sospetto.', 'Si sente sorvegliata: ora sa che guardi quando è online.'],
      ],
    },
    tensione: {
      text: 'Lei ti richiama, seccata: «Ero in riunione. Che succede?»',
      choices: [
        ['«Scusa. Mi è partita l’ansia e ho riempito il silenzio con una storia. Non era giusto scaricarla su di te.»', 'consapevole', 'Hai riconosciuto il meccanismo — il vuoto riempito dalla paura — e ti sei assunto la responsabilità dei messaggi. È una riparazione onesta.', 'Si calma. Apprezza la sincerità, anche se resta un po’ provata.'],
        ['«Potevi rispondere con un messaggio. Ci vogliono due secondi.»', 'pressante', 'Stai trasformando la tua ansia in un dovere per lei. Il messaggio implicito è: la tua giornata deve fare spazio alle mie paure.', 'Si sente obbligata a rendere conto anche durante il lavoro.'],
      ],
    },
    insight:
      'Un ultimo accesso è un fatto; ciò che significa è un’interpretazione. Quando la paura riempie il vuoto, la storia sembra vera. Separare i livelli non elimina l’ansia, ma le impedisce di decidere al posto tuo.',
    question: 'Quale storia costruisce la tua mente più spesso quando lei non risponde?',
  }),
  scenario({
    id: 'piu-silenziosa',
    lab: 'storie',
    title: 'Più silenziosa del solito',
    context:
      'Da due giorni lei è più silenziosa. Risponde, è gentile, ma parla poco. Ti chiedi che cosa stia succedendo. La tua mente ha già pronte alcune ipotesi, tutte negative.',
    prompt: 'Che cosa fai con le tue ipotesi?',
    start: [
      ['«Che cos’hai? Sei strana da giorni. C’è qualcuno?»', 'pressante', 'La domanda salta direttamente alla conclusione più temuta. Lei, che forse ha solo un periodo pesante, si trova a dover smentire un tradimento.', 'Resta senza parole: era preoccupata per sua madre e ora deve difendersi.'],
      ['«Ti vedo un po’ pensierosa. Se ti va di parlarne, ci sono.»', 'consapevole', 'Hai descritto ciò che osservi (fatto) senza aggiungere interpretazioni, e hai lasciato a lei la scelta di condividere.', 'Si sente vista, non accusata. Magari non parla subito, ma sa che può farlo.'],
      ['Leggi le sue conversazioni mentre è sotto la doccia per capire che cosa ha.', 'controllante', 'Leggere le sue chat è una violazione della sua privacy, anche se nasce dalla preoccupazione. E non ti dirà come si sente: ti darà solo frammenti da interpretare.', 'Se lo scoprisse, si sentirebbe tradita nella fiducia più di base.'],
      ['Diventi silenzioso anche tu, per “non disturbarla”, ma in realtà stai aspettando che sia lei a spiegarsi.', 'ritiro', 'Il tuo silenzio non è uno spazio offerto: è un’attesa tesa. Due persone in silenzio, ognuna con la propria storia, si allontanano.', 'Percepisce la tua distanza e pensa che anche tu abbia qualcosa.'],
    ],
    apertura: {
      text: 'Lei ti dice che è preoccupata per la salute di sua madre. Non te l’aveva detto per non “appesantirti”.',
      choices: [
        ['«Mi dispiace. Grazie per avermelo detto. Come posso esserti utile?»', 'consapevole', 'La storia che la tua mente aveva costruito era molto lontana dalla realtà. Accoglierla senza commentare la tua paura è un gesto di vicinanza.', 'Si sente sostenuta.'],
        ['«Ah. Pensavo fosse per qualcun altro.»', 'pressante', 'Comunicarle il sospetto proprio ora sposta l’attenzione dal suo dolore alla tua paura. È un esempio di come la storia interna possa ferire anche quando viene smentita.', 'Si sente sola in un momento difficile.'],
      ],
    },
    tensione: {
      text: 'Lei, ferita: «Davvero pensi questo di me? Sto male per mia madre.»',
      choices: [
        ['«Mi dispiace. Ho riempito il tuo silenzio con la mia paura. Raccontami di tua madre, se vuoi.»', 'consapevole', 'Riconosci la storia che hai costruito come tua e riporti l’attenzione su di lei. È una riparazione che lascia spazio al suo dolore.', 'Lentamente si apre, anche se resta ferita.'],
        ['«Potevi dirmelo subito invece di fare la misteriosa.»', 'pressante', 'Le stai chiedendo di rendere conto del suo silenzio. Ma il suo silenzio non era un segreto: era un modo di gestire una preoccupazione.', 'Si chiude ancora di più.'],
      ],
    },
    insight:
      'Il silenzio dell’altra persona è un fatto; il suo significato è sconosciuto. La mente spaventata lo riempie con la paura più grande. Una domanda aperta, senza ipotesi già pronte, lascia spazio alla sua realtà.',
    question: 'Ricordi una volta in cui la storia che ti eri costruito era molto diversa da ciò che stava succedendo davvero?',
  }),
  scenario({
    id: 'nessun-aggiornamento',
    lab: 'storie',
    title: 'La pausa senza messaggio',
    context:
      'Di solito lei ti scrive durante la pausa pranzo. Oggi no. Il telefono resta muto. Senti un vuoto allo stomaco e la mente comincia a correre: “Con chi è in pausa?”.',
    prompt: 'Che cosa fai con quella domanda?',
    start: [
      ['Ti chiedi: che cosa so davvero? Solo che oggi non ha scritto. Il resto è paura.', 'consapevole', 'Hai separato il fatto (nessun messaggio) dalla conclusione non verificata (è con qualcuno). Non serve sapere: serve riconoscere che non sai.', 'Sta mangiando un panino al volo davanti al computer.'],
      ['Le scrivi: «Oggi niente messaggio? Con chi sei?»', 'pressante', 'La domanda presuppone che ci sia un “chi” da spiegare. Trasforma un’abitudine affettuosa in un obbligo di rendiconto.', 'Si sente controllata per una pausa pranzo.'],
      ['Le chiedi di condividere la posizione “così sei più tranquilla anche tu”.', 'controllante', 'La condivisione della posizione richiesta per gestire la tua ansia è sorveglianza, anche se presentata come reciprocità. Non ti darà pace: ti darà un nuovo posto da controllare.', 'Si sente a disagio ma teme che rifiutare sembri sospetto.'],
      ['Stasera non le chiedi nulla della giornata: “se non mi ha pensato lei, non la penso io”.', 'ritiro', 'Restituire la “mancanza” è una forma di punizione. Lei non saprà mai che cosa ha sbagliato, perché non ha sbagliato nulla.', 'Ti sente distante e non capisce perché.'],
    ],
    apertura: {
      text: 'Nel pomeriggio l’ansia torna a ondate. Hai il telefono in mano.',
      choices: [
        ['Metti il telefono in un’altra stanza e fai un grounding di due minuti.', 'consapevole', 'Hai creato distanza fisica dall’oggetto della verifica e ti sei riportato al presente. Sono piccoli gesti che, ripetuti, cambiano l’abitudine.', 'La sera ti racconta che ha passato una giornata infernale.'],
        ['Le scrivi «Mi pensi?»', 'pressante', 'È una richiesta di conferma nata dall’ansia. Comprensibile, ma alimenta il circolo: sollievo breve, nuovo dubbio, nuova richiesta.', 'Risponde «Certo!» di fretta, sentendosi un po’ in dovere.'],
      ],
    },
    tensione: {
      text: 'Lei ti scrive: «Non posso mandarti un messaggio ogni giorno alla stessa ora. A volte non ce la faccio.»',
      choices: [
        ['«Hai ragione. Mi piacciono i tuoi messaggi, ma non devono essere un obbligo.»', 'consapevole', 'Hai distinto il piacere di ricevere un messaggio dal dovere di mandarlo. È così che un’abitudine affettuosa resta tale.', 'Si sente sollevata e più libera di scriverti quando vuole.'],
        ['«Bastano due secondi. Se ci tenessi, lo faresti.»', 'pressante', 'Stai misurando il suo amore con un messaggio. È un’equazione che non regge e che trasforma ogni giornata impegnata in una colpa.', 'Inizierà a scriverti per dovere, e il messaggio perderà il suo senso.'],
      ],
    },
    insight:
      'Un’abitudine affettuosa che diventa obbligo smette di essere affetto. Quando un messaggio manca, l’unico fatto è che manca: tutto il resto lo stai aggiungendo tu.',
    question: 'Quali abitudini affettuose della tua relazione rischiano di essere diventate obblighi?',
  }),

  /* ---------------- Laboratorio 3 ---------------- */
  scenario({
    id: 'telefono-mostrare',
    lab: 'fiducia',
    title: 'Il telefono',
    context:
      'Lei sta scrivendo un messaggio e sorride. Quando ti avvicini, chiude la chat con naturalezza. Non sai con chi stesse parlando. Senti il bisogno urgente di sapere.',
    prompt: 'Che cosa fai?',
    start: [
      ['«Fammi vedere con chi stavi scrivendo.»', 'controllante', 'Chiedere di vedere il telefono è una forma di sorveglianza. Anche se lei accettasse, non ti darebbe fiducia: ti insegnerebbe che per stare tranquillo devi controllare.', 'Si sente trattata come una sospettata. Se rifiuta, sembra colpevole; se accetta, si sente umiliata.'],
      ['«Chi ti fa sorridere così?» con un tono che vorrebbe essere scherzoso ma non lo è.', 'pressante', 'Lo scherzo nasconde una domanda di controllo. Lei sentirà il sospetto sotto il sorriso.', 'Risponde «Mia sorella», ma si sente osservata.'],
      ['Noti il bisogno di sapere e ti ricordi: il suo telefono è suo. Le chiedi com’è andata la giornata.', 'consapevole', 'Hai riconosciuto l’impulso e hai scelto di rispettare la sua privacy. Il dubbio può restare; non sei obbligato a eliminarlo.', 'Si sente rispettata. Forse ti racconterà spontaneamente, forse no: è una sua scelta.'],
      ['Ti chiudi in silenzio e per tutta la sera la osservi, aspettando un passo falso.', 'ritiro', 'L’osservazione silenziosa è ipervigilanza: cerchi conferme a un sospetto. Il bias di conferma farà sì che tu le trovi.', 'Si sente osservata senza sapere perché.'],
    ],
    apertura: {
      text: 'Più tardi lei, ridendo, ti mostra di sua iniziativa un video che le ha mandato un’amica.',
      choices: [
        ['Ridi con lei, senza commentare il prima.', 'consapevole', 'Ciò che lei condivide spontaneamente vale molto più di ciò che otterresti chiedendo. Accoglierlo senza indagare rende la condivisione piacevole.', 'Si sente libera di condividere ancora.'],
        ['«Ah, quindi era quello. Potevi dirmelo subito.»', 'pressante', 'Rivelare che il dubbio c’era trasforma un gesto spontaneo in una giustificazione a posteriori.', 'La prossima volta ci penserà due volte prima di mostrarti qualcosa.'],
      ],
    },
    tensione: {
      text: 'Lei ti dice: «Non ti mostro il telefono perché è mio, non perché nascondo qualcosa. Mi fa male che tu me lo chieda.»',
      choices: [
        ['«Hai ragione. È la mia insicurezza, non un tuo problema. Non te lo chiederò più.»', 'consapevole', 'Riconosci che la sua privacy non è segretezza e prendi un impegno concreto. È un passo nella direzione della fiducia.', 'Si sente rispettata. L’impegno andrà mantenuto nel tempo.'],
        ['«Se non hai niente da nascondere, che ti costa?»', 'controllante', '“Se non hai niente da nascondere” è un argomento che giustifica qualsiasi sorveglianza. La privacy non serve a nascondere: serve a essere persone.', 'Si sente sotto pressione e capisce che il rifiuto avrà un costo.'],
      ],
    },
    insight:
      'La privacy non è segretezza. Chiedere di vedere il telefono non costruisce fiducia: la sostituisce con il controllo. Il bisogno di sapere è tuo, e puoi imparare a sopportarlo senza farlo pesare su di lei.',
    question: 'Che cosa ti darebbe, davvero, vedere il suo telefono? E quanto durerebbe?',
  }),
  scenario({
    id: 'cena-non-detta',
    lab: 'fiducia',
    title: 'La cena non raccontata',
    context:
      'Da un’amica comune scopri che due settimane fa la tua partner ha cenato con un ex compagno di università. Lei non te ne aveva parlato. Senti un misto di rabbia, umiliazione e paura.',
    prompt: 'Come affronti la situazione?',
    start: [
      ['Aspetti di essere calmo e le dici: «Ho saputo della cena con Luca. Mi ha fatto strano non saperlo. Come mai non me ne hai parlato?»', 'consapevole', 'Hai descritto il fatto, la tua emozione e hai fatto una domanda aperta. Non hai ancora deciso se si tratti di una bugia, una dimenticanza o un’informazione per lei irrilevante.', 'Può spiegare senza sentirsi già condannata.'],
      ['«Quindi mi nascondi le cose. Che altro non so?»', 'pressante', 'Hai già classificato l’omissione come bugia intenzionale e l’hai estesa a tutta la relazione. Lei si trova a difendersi da un’accusa generale.', 'Si sente sotto processo per tutto, non solo per la cena.'],
      ['Da oggi le chiedi di dirti ogni volta con chi esce, in anticipo.', 'controllante', 'Una regola nuova imposta dopo un episodio trasforma una possibile ferita in un sistema di sorveglianza permanente. Non ricostruisce la fiducia: la sostituisce.', 'Si sente in libertà vigilata per una cena.'],
      ['Non dici nulla, ma da quel giorno diventi freddo e sospettoso.', 'ritiro', 'Il silenzio impedisce a lei di spiegare e a te di sapere. Il sospetto cresce senza mai essere verificato.', 'Sente il cambiamento ma non ne conosce la causa.'],
    ],
    apertura: {
      text: 'Lei risponde: «Non ci ho pensato. È un vecchio amico, era di passaggio in città. Per me non era una cosa importante.»',
      choices: [
        ['«Capisco. Per me lo sarebbe stato. Mi farebbe piacere saperlo, la prossima volta.»', 'consapevole', 'Hai riconosciuto che per lei era un’informazione non rilevante e hai espresso un tuo bisogno, senza farne una regola. È un accordo, non un obbligo.', 'Si sente capita e accetta volentieri.'],
        ['«Non ci credo. Una cena con un ex non è “niente”.»', 'pressante', 'Lui era un ex compagno di università, non un ex partner: la paura ha già trasformato il dettaglio. E stai negando la sua spiegazione senza fatti nuovi.', 'Si sente chiamata bugiarda.'],
      ],
    },
    tensione: {
      text: 'Lei, a disagio: «Non te l’ho detto perché ogni volta che nomino un uomo diventa un problema.»',
      choices: [
        ['«Mi fa male sentirlo, ma capisco. Se ti sei sentita di dover tacere, una parte del problema è in come reagisco io.»', 'consapevole', 'Hai colto un punto difficile: a volte le omissioni nascono proprio dalla paura della reazione. Riconoscerlo cambia la dinamica.', 'Si sente ascoltata. Forse in futuro ti racconterà di più.'],
        ['«Quindi è colpa mia se tu mi nascondi le cose?»', 'pressante', 'La difensività trasforma la sua spiegazione in un’accusa contro di te. Il dialogo si chiude proprio quando stava diventando onesto.', 'Rinuncia a spiegare.'],
      ],
    },
    insight:
      'Non tutte le omissioni sono bugie. Distinguere tra bugia, omissione consapevole, dimenticanza e informazione non percepita come rilevante ti permette di rispondere in modo proporzionato. E a volte un’omissione nasce dalla paura della tua reazione.',
    question: 'Ci sono cose che lei potrebbe non raccontarti per evitare la tua reazione?',
  }),
  scenario({
    id: 'dopo-la-bugia',
    lab: 'fiducia',
    title: 'Un anno dopo la bugia',
    context:
      'Un anno fa lei ti ha mentito su una cosa importante: si vedeva con un ex di nascosto, anche se dice che non è successo nulla. Ne avete parlato, avete deciso di restare insieme. Da allora controlli spesso dove si trova. Stasera rientra mezz’ora più tardi del previsto.',
    prompt: 'La vecchia ferita si riapre. Che cosa fai?',
    start: [
      ['«Dov’eri? Fammi vedere il percorso sul telefono.»', 'controllante', 'La ferita è reale e merita rispetto. Ma un anno di verifiche non ti ha restituito la fiducia: ti ha solo dato un modo di gestire l’ansia che non finisce mai.', 'Si sente condannata a dimostrare la sua innocenza per sempre.'],
      ['Riconosci la paura: «Mi sta tornando tutto addosso». Le chiedi semplicemente: «Tutto bene?»', 'consapevole', 'Hai riconosciuto che il ritardo di oggi riattiva una ferita di ieri. Distinguere il presente dal passato è la base per ricostruire.', 'Ti racconta del traffico. Si accorge che hai fatto uno sforzo.'],
      ['«Lo sai che con te devo sempre stare attento.»', 'pressante', 'Riportare la bugia del passato in ogni occasione la tiene bloccata nel ruolo di colpevole. Lei non può più fare nulla per uscirne.', 'Sente che la relazione non andrà mai oltre quell’errore.'],
      ['Non le parli per tutta la sera.', 'ritiro', 'Il silenzio come punizione ripropone la ferita senza affrontarla. Lei non sa se il problema è il ritardo o tutto il resto.', 'Si chiede se valga ancora la pena provarci.'],
    ],
    apertura: {
      text: 'Lei ti racconta del ritardo. La paura scende, ma ti accorgi che è stata molto intensa per mezz’ora di ritardo.',
      choices: [
        ['Decidi di parlarne con un professionista: la ferita ha bisogno di uno spazio per essere elaborata.', 'consapevole', 'Riconoscere che una ferita non si sta rimarginando, e che il controllo non la sta curando, è un atto di responsabilità verso di te e verso la relazione.', 'Lei, se glielo dirai, potrebbe sentirsi sollevata.'],
        ['Ti dici che è normale e che lei deve capire: è colpa sua se sei così.', 'pressante', 'Lei è responsabile della bugia; non è responsabile per sempre di ogni tua reazione. Se la ricostruzione diventa un debito permanente, la relazione resta ferma al giorno della ferita.', 'Continua a vivere come in libertà vigilata.'],
      ],
    },
    tensione: {
      text: 'Lei ti dice, piano: «Ho sbagliato un anno fa. Ma non posso pagare per sempre. O ricominciamo davvero, o così non ce la faccio.»',
      choices: [
        ['«Hai ragione. Ho trasformato la ferita in sorveglianza. Ho bisogno di aiuto per uscirne, e lo cercherò.»', 'consapevole', 'Hai riconosciuto che la ricostruzione della fiducia non può essere un sistema permanente di verifiche, e hai scelto un’azione concreta.', 'Si sente sollevata, anche se cauta.'],
        ['«Te la sei cercata tu.»', 'pressante', 'La frase usa l’errore di lei per giustificare tutto ciò che è venuto dopo. È comprensibile come sfogo di dolore, ma chiude ogni possibilità di ricostruire.', 'Inizia a pensare di andarsene.'],
      ],
    },
    insight:
      'La fiducia ferita da un errore reale può richiedere tempo e comportamenti coerenti. Ma se dopo molto tempo il controllo è ancora l’unico modo per stare tranquillo, non sta ricostruendo nulla: ha preso il posto della fiducia.',
    question: 'Se nella tua relazione c’è una ferita reale, che cosa ti servirebbe per guarirla senza sorvegliare?',
  }),
];
