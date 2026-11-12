import type { Scenario } from '../../types';

/** Scenari dei laboratori 7–9: radici, parole che riparano, confini. */
export const scenariosPart3: Scenario[] = [
  {
    id: 'messaggio-sera',
    lab: 'radici',
    title: 'La sera senza notizie',
    relation: 'coppia',
    context:
      'Il tuo partner è a una cena di lavoro. Ha detto che ti avrebbe scritto. Sono le 23:30 e non hai notizie. Senti una stretta al petto che cresce: un’ansia che conosci, più grande della situazione.',
    start: 'start',
    nodes: [
      {
        id: 'start',
        text: 'L’ansia sale. Che cosa fai?',
        choices: [
          {
            id: 'a',
            label: 'Lo chiami cinque volte di fila e scrivi: «Perché non rispondi?? Dove sei??»',
            style: 'impulsiva',
            feedback:
              'Quando la sicurezza del legame sembra minacciata, cercare vicinanza con urgenza è una risposta molto umana. Ma la raffica di chiamate può arrivare come controllo, più che come paura.',
            otherSide: 'Vede le chiamate a fine cena e si sente sotto pressione: “Non posso nemmeno uscire.”',
            next: 'n-a',
          },
          {
            id: 'b',
            label: 'Spegni il telefono e vai a letto arrabbiata: “Se non gli importa, non importa nemmeno a me.”',
            style: 'evitante',
            feedback:
              'Ti proteggi prendendo le distanze. Ma l’ansia non si spegne con il telefono, e domani rischi di accoglierlo con una freddezza che lui non saprà decifrare.',
            otherSide: 'Ti scrive a mezzanotte e non riceve risposta.',
            next: 'n-b',
          },
          {
            id: 'c',
            label: 'Noti l’intensità e ti chiedi: “Questa paura appartiene solo a stasera?”',
            style: 'consapevole',
            feedback:
              'Riconoscere che una reazione è più grande della situazione è un indizio prezioso. Non serve trovare subito la risposta: basta tenere aperta la domanda.',
            otherSide: 'È ancora a cena, ignaro.',
            next: 'n-c',
          },
        ],
      },
      {
        id: 'n-a',
        text: 'Lui ti richiama, irritato: «Ero a cena con il capo! Che cosa ti prende?»',
        choices: [
          {
            id: 'a1',
            label: '«Mi prende che a te non importa niente di me!»',
            style: 'impulsiva',
            feedback:
              'La paura profonda (“non sono importante per te”) esce come accusa. Lui risponderà all’accusa, non alla paura.',
            otherSide: 'Si difende e la discussione si accende.',
            next: null,
          },
          {
            id: 'a2',
            label: '«Scusa, mi sono spaventata. Quando non ho notizie mi parte un’ansia che non controllo bene.»',
            style: 'consapevole',
            feedback:
              'Mostri la vulnerabilità invece dell’accusa e ti assumi la responsabilità della tua reazione. Così l’altro può rassicurarti invece di difendersi.',
            otherSide: '«Scusa, avrei dovuto scriverti. Sto tornando.»',
            next: null,
          },
        ],
      },
      {
        id: 'n-b',
        text: 'La mattina dopo lui ti saluta con un bacio: «Scusa, ieri la cena si è allungata.» Tu sei rigida.',
        choices: [
          {
            id: 'b1',
            label: '«Mh.» Esci senza aggiungere altro.',
            style: 'evitante',
            feedback:
              'La distanza protegge te ma lascia lui senza informazioni. Il tema, che riguarda il bisogno di sentirti al sicuro, resta inespresso.',
            otherSide: 'Pensa che tu sia di cattivo umore per altro.',
            next: null,
          },
          {
            id: 'b2',
            label: '«Ieri sera mi sono agitata parecchio. È una cosa mia, ma mi aiuterebbe un messaggio quando fai tardi.»',
            style: 'consapevole',
            feedback:
              'Distingui ciò che è tuo (l’intensità dell’ansia) da ciò che puoi chiedere (un messaggio). Una richiesta piccola e concreta è più facile da accogliere.',
            otherSide: '«Certo. Non sapevo che fosse così importante per te.»',
            next: null,
          },
        ],
      },
      {
        id: 'n-c',
        text: 'Ti viene in mente una sensazione familiare: aspettare qualcuno che non arriva, da piccola. L’ansia resta, ma la riconosci.',
        choices: [
          {
            id: 'c1',
            label: 'Scrivi un solo messaggio: «Tutto ok? Fammi sapere quando esci.» E ti dedichi a qualcosa che ti calma.',
            style: 'consapevole',
            feedback:
              'Esprimi il bisogno una volta, in modo chiaro, e poi ti prendi cura di te. È un equilibrio difficile tra cercare l’altro e rassicurarti da sola.',
            otherSide: 'Lo legge a fine cena e ti chiama subito.',
            next: null,
          },
          {
            id: 'c2',
            label: 'Ti dici con gentilezza: “È normale sentirsi così. Ora sei adulta e ci sono altre spiegazioni possibili.”',
            style: 'consapevole',
            feedback:
              'Rispondere a te stessa con la gentilezza che useresti con una persona cara è una forma di autocompassione: non nega l’ansia, la accompagna.',
            otherSide: 'Torna a casa e ti trova più serena.',
            next: null,
          },
        ],
      },
    ],
    insight:
      'Quando una reazione è molto più intensa della situazione, può darsi che stia toccando un tema più antico. Riconoscerlo permette di chiedere ciò che serve senza far pagare all’altro un conto che non è solo suo.',
    question: 'C’è una situazione che risveglia in te una paura “più vecchia” del presente?',
  },
  {
    id: 'correzione',
    lab: 'radici',
    title: 'La correzione davanti a tutti',
    relation: 'lavoro',
    context:
      'Durante una riunione il responsabile dice, con tono neutro: «Qui c’è un errore nel calcolo, Marco, ricontrolla.» È un errore piccolo. Ma tu senti il viso bruciare e la testa riempirsi di un pensiero: “Sono un incapace.”',
    start: 'start',
    nodes: [
      {
        id: 'start',
        text: 'Il pensiero è forte, la vergogna anche. Cosa succede?',
        choices: [
          {
            id: 'a',
            label: '«Veramente il calcolo me l’hanno passato già sbagliato.»',
            style: 'impulsiva',
            feedback:
              'Ti difendi dalla vergogna spostando la responsabilità. È una reazione comprensibile, ma per gli altri è sproporzionata rispetto a un commento neutro.',
            otherSide: 'Il responsabile pensa: “Ho solo segnalato un errore, perché si difende così?”',
            next: 'n-a',
          },
          {
            id: 'b',
            label: 'Non dici nulla e passi il resto della giornata a ripensarci, senza riuscire a lavorare.',
            style: 'evitante',
            feedback:
              'La ruminazione amplifica un singolo episodio e lo trasforma in una prova del tuo valore. Il corpo resta in allarme per ore.',
            otherSide: 'Il responsabile ha già dimenticato l’episodio.',
            next: 'n-b',
          },
          {
            id: 'c',
            label: '«Grazie, ricontrollo.» E noti dentro di te: “È un errore, non una sentenza su di me.”',
            style: 'consapevole',
            feedback:
              'Separi il fatto (un errore di calcolo) dall’interpretazione globale (“sono un incapace”). La vergogna c’è, ma non guida la tua risposta.',
            otherSide: 'Procede con la riunione: per lui la questione è chiusa.',
            next: 'n-c',
          },
        ],
      },
      {
        id: 'n-a',
        text: 'Il responsabile risponde: «Non ti stavo accusando. Ricontrolla e basta.» Ora ti senti ancora più esposto.',
        choices: [
          {
            id: 'a1',
            label: 'Ti chiudi per il resto della riunione e pensi che ce l’abbia con te.',
            style: 'evitante',
            feedback:
              'La vergogna cerca conferme: ora la sua frase diventa la prova. Ma il fatto è solo che ha precisato di non accusarti.',
            otherSide: 'Nota la tua chiusura e si chiede se ti abbia ferito.',
            next: null,
          },
          {
            id: 'a2',
            label: 'A fine riunione: «Scusa, prima ho reagito in modo esagerato. Le correzioni mi pesano più del dovuto.»',
            style: 'consapevole',
            feedback:
              'Riconosci l’intensità come tua senza autoflagellarti. Una frase così semplice spesso cambia la percezione che gli altri hanno di noi.',
            otherSide: '«Figurati, capita. Il tuo lavoro è buono.»',
            next: null,
          },
        ],
      },
      {
        id: 'n-b',
        text: 'La sera, a casa, il pensiero è ancora lì: “Sono un incapace. Se ne accorgeranno tutti.”',
        choices: [
          {
            id: 'b1',
            label: 'Lavori fino a mezzanotte per ricontrollare tutto il progetto.',
            style: 'impulsiva',
            feedback:
              'L’ipercontrollo calma l’ansia nel breve termine, ma conferma l’idea che il tuo valore dipenda dal non sbagliare mai. E ti priva di riposo.',
            otherSide: 'Nessuno sa quanto ti sta costando.',
            next: null,
          },
          {
            id: 'b2',
            label: 'Ti chiedi: “Che cosa direi a un collega che ha fatto lo stesso errore?”',
            style: 'consapevole',
            feedback:
              'Cambiare prospettiva su sé stessi è spesso più facile se si immagina un’altra persona. Probabilmente gli diresti che è normale sbagliare.',
            otherSide: 'La tua serata torna tua.',
            next: null,
          },
        ],
      },
      {
        id: 'n-c',
        text: 'La vergogna si attenua lentamente. Ti resta una domanda: perché un errore così piccolo pesa così tanto?',
        choices: [
          {
            id: 'c1',
            label: 'Annoti nel diario quando ti succede, per vedere se c’è un tema ricorrente.',
            style: 'consapevole',
            feedback:
              'Osservare nel tempo aiuta a distinguere un episodio da un tema ricorrente. È una forma di curiosità verso sé stessi, non di giudizio.',
            otherSide: 'Per gli altri non cambia nulla: è un lavoro tuo.',
            next: null,
          },
          {
            id: 'c2',
            label: 'Decidi di parlarne con una persona di fiducia o con un professionista.',
            style: 'consapevole',
            feedback:
              'Se un tema torna spesso e pesa molto, cercare un sostegno è un atto di cura, non di debolezza.',
            otherSide: 'Nessuno deve saperlo, se non vuoi.',
            next: null,
          },
        ],
      },
    ],
    insight:
      'Quando un piccolo errore diventa una sentenza sul proprio valore, la vergogna sta parlando con una voce antica. Distinguere tra “ho sbagliato” e “sono sbagliato” è un passaggio fondamentale.',
    question: 'Quali situazioni ti fanno passare da “ho sbagliato” a “sono sbagliato/a”?',
  },
  {
    id: 'coinquilino',
    lab: 'parole',
    title: 'Dirlo senza attaccare',
    relation: 'amicizia',
    context:
      'Vivi con un amico. Da settimane lascia in giro le sue cose e non porta mai fuori la spazzatura. Hai deciso: stasera ne parli. Ma non vuoi che finisca in una lite.',
    start: 'start',
    nodes: [
      {
        id: 'start',
        text: 'Come apri la conversazione?',
        choices: [
          {
            id: 'a',
            label: '«Dobbiamo parlare del tuo menefreghismo.»',
            style: 'impulsiva',
            feedback:
              'Un avvio brusco: un giudizio sul carattere al posto di un comportamento. L’altro entra subito in difesa, e la conversazione partirà in salita.',
            otherSide: 'Pensa: “Ecco il processo.”',
            next: 'n-a',
          },
          {
            id: 'b',
            label: 'Lasci un biglietto sul frigo: «La spazzatura non si porta fuori da sola!»',
            style: 'evitante',
            feedback:
              'Il messaggio arriva, ma in forma sarcastica e senza possibilità di dialogo. L’altro può sentirsi ripreso senza poter rispondere.',
            otherSide: 'Si sente trattato come un bambino.',
            next: 'n-b',
          },
          {
            id: 'c',
            label: '«Hai dieci minuti? Vorrei parlarti di una cosa della casa che mi pesa.»',
            style: 'consapevole',
            feedback:
              'Un avvio morbido: chiedi il momento, parli di te (“mi pesa”) e annunci un tema specifico. L’altro può ascoltare senza sentirsi sotto accusa.',
            otherSide: 'È un po’ in allerta ma disponibile.',
            next: 'n-c',
          },
        ],
      },
      {
        id: 'n-a',
        text: 'Lui risponde: «Menefreghismo? E tu che lasci i piatti nel lavello per due giorni?»',
        choices: [
          {
            id: 'a1',
            label: '«Non cambiare discorso! Stiamo parlando di te.»',
            style: 'impulsiva',
            feedback:
              'È una contesa a chi ha più torti. Nessuno dei due sta più parlando della convivenza, ma della propria difesa.',
            otherSide: 'Si alza e se ne va.',
            next: null,
          },
          {
            id: 'a2',
            label: '«Ok, ho iniziato male. Ricominciamo: a me pesa la spazzatura, a te i piatti. Facciamo un accordo?»',
            style: 'consapevole',
            feedback:
              'Riavvii la conversazione e accogli anche il suo punto. Trasformare due lamentele in un accordo è più utile che vincere il confronto.',
            otherSide: '«Ci sto.»',
            next: null,
          },
        ],
      },
      {
        id: 'n-b',
        text: 'Il giorno dopo trovi sotto il tuo biglietto: «Neanche i piatti si lavano da soli.»',
        choices: [
          {
            id: 'b1',
            label: 'Rispondi con un altro biglietto ancora più pungente.',
            style: 'impulsiva',
            feedback:
              'Ora il conflitto vive sul frigo, senza voci né volti. È più facile essere taglienti quando non si vede l’effetto sull’altro.',
            otherSide: 'Entrambi evitate di incrociarvi in casa.',
            next: null,
          },
          {
            id: 'b2',
            label: 'Lo cerchi: «Il biglietto è stato un modo infelice. Parliamone di persona?»',
            style: 'consapevole',
            feedback:
              'Riconosci il canale sbagliato e porti la conversazione dove può funzionare.',
            otherSide: 'Sorride: «Sì, anche il mio non era il massimo.»',
            next: null,
          },
        ],
      },
      {
        id: 'n-c',
        text: 'Vi sedete. Lui ti guarda in attesa.',
        choices: [
          {
            id: 'c1',
            label: '«Quando trovo la spazzatura piena per giorni mi sento frustrata, perché ho bisogno di sentire che la casa è di tutti e due. Possiamo fare dei turni?»',
            style: 'consapevole',
            feedback:
              'Osservazione, emozione, bisogno, richiesta: tutti e quattro i passaggi. Una richiesta concreta (turni) è più facile da accettare di un generico “impegnati di più”.',
            otherSide: '«Hai ragione. Facciamo lunedì e giovedì io.»',
            next: null,
          },
          {
            id: 'c2',
            label: '«È che tu non fai mai niente in casa.»',
            style: 'impulsiva',
            feedback:
              'Nonostante il buon avvio, “mai” e “niente” sono generalizzazioni che l’altro può facilmente contestare. Il dialogo si sposta sul fatto se sia vero o no.',
            otherSide: '«Mai? Ieri ho pulito il bagno!»',
            next: null,
          },
        ],
      },
    ],
    insight:
      'Il modo in cui si avvia una conversazione difficile ne orienta l’esito. Descrivere un comportamento, nominare un’emozione e fare una richiesta concreta è più efficace che giudicare il carattere.',
    question: 'Qual è una cosa che vorresti chiedere a qualcuno e che finora hai evitato o detto male?',
  },
  {
    id: 'dopo-esplosione',
    lab: 'parole',
    title: 'Dopo l’esplosione',
    relation: 'famiglia',
    context:
      'Ieri sera hai urlato contro tuo padre durante una discussione sulla sua salute: «Sei un egoista, fai sempre di testa tua!» Lui se n’è andato in camera. Stamattina c’è un silenzio pesante in casa.',
    start: 'start',
    nodes: [
      {
        id: 'start',
        text: 'Ti senti in colpa, ma anche ancora arrabbiato. Come ti muovi?',
        choices: [
          {
            id: 'a',
            label: '«Scusa per ieri, ma tu mi fai impazzire quando non ti curi.»',
            style: 'impulsiva',
            feedback:
              'Il “ma” annulla la scusa: l’altro sente solo la seconda parte, cioè una nuova accusa. È una delle forme più comuni di riparazione mancata.',
            otherSide: 'Pensa: “Si scusa per dirmi di nuovo che sbaglio.”',
            next: 'n-a',
          },
          {
            id: 'b',
            label: 'Fai finta di niente e gli prepari il caffè come al solito.',
            style: 'evitante',
            feedback:
              'Un gesto di cura può essere un tentativo di riparazione. Ma senza parole, rischia di lasciare la ferita senza nome: lui non sa se ti dispiace.',
            otherSide: 'Accetta il caffè, ma resta distante.',
            next: 'n-b',
          },
          {
            id: 'c',
            label: '«Papà, ieri ti ho dato dell’egoista urlando. Non è giusto e mi dispiace.»',
            style: 'consapevole',
            feedback:
              'Riconoscimento specifico, senza “ma”. Nomini esattamente ciò che hai fatto. È la base di ogni riparazione efficace.',
            otherSide: 'È sorpreso, e qualcosa si ammorbidisce.',
            next: 'n-c',
          },
        ],
      },
      {
        id: 'n-a',
        text: 'Lui risponde: «Allora non sei dispiaciuto. Lascia stare.»',
        choices: [
          {
            id: 'a1',
            label: '«Ecco, vedi? Non si può parlare con te.»',
            style: 'impulsiva',
            feedback:
              'Il tentativo di riparazione è diventato una nuova discussione. A volte conviene fermarsi e riprovare più tardi.',
            otherSide: 'Si chiude ancora di più.',
            next: null,
          },
          {
            id: 'a2',
            label: '«Hai ragione, ho messo un “ma”. Riprovo: mi dispiace di averti urlato contro. La mia preoccupazione non lo giustifica.»',
            style: 'consapevole',
            feedback:
              'Ti accorgi dell’errore e lo correggi subito. Puoi parlare della preoccupazione più tardi, in un altro momento.',
            otherSide: '«Va bene. Grazie.»',
            next: null,
          },
        ],
      },
      {
        id: 'n-b',
        text: 'La sera lui è ancora freddo. Ti chiedi se dire qualcosa.',
        choices: [
          {
            id: 'b1',
            label: 'Aspetti che gli passi: tanto è sempre andata così.',
            style: 'evitante',
            feedback:
              'Forse gli passerà, ma il messaggio implicito è che le ferite in famiglia si lasciano cicatrizzare da sole. A volte funziona; spesso lascia segni.',
            otherSide: 'Pensa che a te non importi di come si sente.',
            next: null,
          },
          {
            id: 'b2',
            label: '«Il caffè di stamattina era un modo per dirti che mi dispiace. Ma voglio dirtelo anche a parole.»',
            style: 'consapevole',
            feedback:
              'Dai un nome al gesto e completi la riparazione. Le parole rendono esplicito ciò che il gesto suggeriva.',
            otherSide: 'Sorride appena: «L’avevo capito. Ma fa piacere sentirlo.»',
            next: null,
          },
        ],
      },
      {
        id: 'n-c',
        text: 'Lui dice: «Mi ha fatto male. Ma so che ti preoccupi.»',
        choices: [
          {
            id: 'c1',
            label: '«Sì, sono preoccupato per la tua salute. La prossima volta proverò a dirtelo senza urlare. Ne parliamo con calma?»',
            style: 'consapevole',
            feedback:
              'Impegno per il futuro e ritorno al tema reale, ora in un clima diverso. La riparazione ha aperto la porta alla conversazione che conta.',
            otherSide: '«Va bene. Domani prendo appuntamento dal medico.»',
            next: null,
          },
          {
            id: 'c2',
            label: '«Allora però devi promettermi che andrai dal medico.»',
            style: 'impulsiva',
            feedback:
              'La riparazione è diventata subito una negoziazione. Lui potrebbe sentire che le scuse erano un mezzo per ottenere qualcosa.',
            otherSide: 'Si irrigidisce: «Ecco il prezzo.»',
            next: null,
          },
        ],
      },
    ],
    insight:
      'Una riparazione efficace nomina ciò che si è fatto, riconosce l’impatto, non contiene “ma” e guarda al futuro. Il contenuto del conflitto può essere ripreso dopo, in un clima più sicuro.',
    question: 'C’è una scusa che hai fatto “con il ma”? Come potresti riformularla?',
  },
  {
    id: 'favore-troppo',
    lab: 'confini',
    title: 'Il favore di troppo',
    relation: 'lavoro',
    context:
      'Una collega ti chiede, per la quarta volta in due mesi, di coprire il suo turno del sabato. Hai un impegno con la tua famiglia. Senti fastidio, ma anche paura di sembrare poco collaborativa.',
    start: 'start',
    nodes: [
      {
        id: 'start',
        text: 'Lei ti guarda in attesa. Che cosa rispondi?',
        choices: [
          {
            id: 'a',
            label: '«Ancora? Ma tu pensi che io non abbia una vita?»',
            style: 'impulsiva',
            feedback:
              'Il fastidio accumulato esce tutto insieme. Il tuo bisogno è legittimo, ma il tono rischia di trasformare un confine in un attacco.',
            otherSide: 'Si sente aggredita e imbarazzata.',
            next: 'n-a',
          },
          {
            id: 'b',
            label: '«Va bene, nessun problema.» E disdici il tuo impegno.',
            style: 'evitante',
            feedback:
              'Eviti il disagio del no, ma paghi un costo tu e lo fai pagare alla tua famiglia. Il risentimento, nel tempo, rischia di esplodere in modo meno controllato.',
            otherSide: 'Ti è grata e non immagina il tuo sforzo.',
            next: 'n-b',
          },
          {
            id: 'c',
            label: '«Questa volta non posso, ho un impegno con la mia famiglia.»',
            style: 'consapevole',
            feedback:
              'Un no chiaro, breve, senza giustificazioni eccessive e senza attacco. Un confine non ha bisogno di essere spiegato a lungo per essere legittimo.',
            otherSide: 'È un po’ delusa, ma capisce.',
            next: 'n-c',
          },
        ],
      },
      {
        id: 'n-a',
        text: 'Lei arrossisce: «Scusa, non pensavo di disturbarti così tanto.»',
        choices: [
          {
            id: 'a1',
            label: '«Eh, ormai è un’abitudine.»',
            style: 'impulsiva',
            feedback:
              'Rincarare la dose può dare sollievo nel momento, ma lascia una ferita in un rapporto di lavoro quotidiano.',
            otherSide: 'Ti eviterà nei prossimi giorni.',
            next: null,
          },
          {
            id: 'a2',
            label: '«Scusa il tono. Il punto è che per me è troppo spesso. Questa volta non posso.»',
            style: 'consapevole',
            feedback:
              'Ripari il tono senza rinunciare al contenuto. Il confine resta, la relazione è salva.',
            otherSide: '«Hai ragione. Chiederò ad altri.»',
            next: null,
          },
        ],
      },
      {
        id: 'n-b',
        text: 'Due settimane dopo, te lo chiede di nuovo.',
        choices: [
          {
            id: 'b1',
            label: 'Accetti di nuovo, ma intanto ne parli male con gli altri colleghi.',
            style: 'evitante',
            feedback:
              'Il risentimento non espresso trova altre strade. Lei non sa nulla del problema, e gli altri ne sanno più di lei.',
            otherSide: 'Lo verrà a sapere da qualcun altro.',
            next: null,
          },
          {
            id: 'b2',
            label: '«Ti ho detto di sì molte volte, e per me è diventato pesante. Da ora non posso più coprire i sabati.»',
            style: 'consapevole',
            feedback:
              'Riconosci la tua parte (hai sempre detto sì) e metti un confine chiaro per il futuro. Un confine tardivo è comunque un confine.',
            otherSide: 'È sorpresa: non si era resa conto.',
            next: null,
          },
        ],
      },
      {
        id: 'n-c',
        text: 'Lei insiste: «Dai, solo questa volta, poi non te lo chiedo più.»',
        choices: [
          {
            id: 'c1',
            label: '«Capisco che sei in difficoltà. Ma la risposta è no. Posso aiutarti a cercare qualcun altro.»',
            style: 'consapevole',
            feedback:
              'Riconosci la sua difficoltà, ripeti il confine senza alzare il tono e offri un aiuto alternativo che dipende da te.',
            otherSide: 'Accetta, anche se un po’ dispiaciuta.',
            next: null,
          },
          {
            id: 'c2',
            label: '«Va bene, ma è davvero l’ultima volta.»',
            style: 'evitante',
            feedback:
              'Il confine cede alla seconda richiesta. Questo insegna, a te e a lei, che insistere funziona. Non è un errore grave, ma vale la pena notarlo.',
            otherSide: 'Pensa che la prossima volta basterà insistere.',
            next: null,
          },
        ],
      },
    ],
    insight:
      'Un no chiaro e gentile protegge la relazione più di tanti sì risentiti. Un confine non richiede lunghe giustificazioni né aggressività: richiede chiarezza e coerenza.',
    question: 'A chi fai più fatica a dire di no? Che cosa temi che succeda?',
  },
  {
    id: 'tono-offesa',
    lab: 'confini',
    title: 'Quando il tono diventa offesa',
    relation: 'coppia',
    context:
      'Durante una discussione sui soldi, il tuo partner alza la voce e dice: «Sei una fallita, non sai gestire niente.» Non è la prima volta che usa parole simili.',
    start: 'start',
    nodes: [
      {
        id: 'start',
        text: 'Le parole ti colpiscono. Che cosa fai?',
        choices: [
          {
            id: 'a',
            label: '«Fallito sarai tu! Almeno io non…» E rispondi con la stessa moneta.',
            style: 'impulsiva',
            feedback:
              'La rabbia è una risposta comprensibile a un’offesa. Ma rispondere sullo stesso piano alimenta un’escalation in cui le offese diventano sempre più pesanti.',
            otherSide: 'Alza ulteriormente il tono.',
            next: 'n-a',
          },
          {
            id: 'b',
            label: 'Ti chiedi cosa hai sbagliato tu per meritarti queste parole.',
            style: 'evitante',
            feedback:
              'Riflettere su sé stessi è utile, ma qui c’è una trappola: un insulto non è una conseguenza che “ci si merita”. Riconoscere il tuo impatto non significa assumerti la responsabilità del suo comportamento.',
            otherSide: 'Non riceve alcun segnale che ha superato un limite.',
            next: 'n-b',
          },
          {
            id: 'c',
            label: '«Non accetto di essere chiamata così. Se continui, interrompo la conversazione.»',
            style: 'consapevole',
            feedback:
              'Un confine chiaro, che descrive ciò che farai tu. Non devi vincere la discussione sui soldi per proteggere la tua dignità.',
            otherSide: 'Si ferma per un attimo, sorpreso.',
            next: 'n-c',
          },
        ],
      },
      {
        id: 'n-a',
        text: 'La discussione degenera. Lui sbatte un pugno sul tavolo.',
        choices: [
          {
            id: 'a1',
            label: 'Continui a urlare per non dargliela vinta.',
            style: 'impulsiva',
            feedback:
              'Quando compaiono gesti fisici intimidatori la priorità non è più la discussione, ma la sicurezza. Restare nello scontro aumenta il rischio.',
            otherSide: 'L’escalation continua.',
            next: null,
          },
          {
            id: 'a2',
            label: 'Ti allontani: esci dalla stanza o di casa, in un luogo sicuro.',
            style: 'consapevole',
            feedback:
              'Allontanarsi davanti a un gesto intimidatorio non è una sconfitta, è protezione. Se questi episodi si ripetono, parlarne con qualcuno di fiducia o chiamare il 1522 può aiutarti a capire come muoverti.',
            otherSide: 'Resta solo con la sua rabbia.',
            next: null,
          },
        ],
      },
      {
        id: 'n-b',
        text: 'Lui continua: «Hai visto? Non sai nemmeno rispondere.»',
        choices: [
          {
            id: 'b1',
            label: 'Abbassi lo sguardo e aspetti che finisca.',
            style: 'evitante',
            feedback:
              'Può essere una strategia di sopravvivenza in un momento difficile, e non va giudicata. Ma se succede spesso, è un segnale importante da non ignorare.',
            otherSide: 'Interpreta il silenzio come conferma.',
            next: null,
          },
          {
            id: 'b2',
            label: 'Più tardi ne parli con un’amica: «Non è la prima volta. Mi sento sempre più piccola.»',
            style: 'consapevole',
            feedback:
              'Condividere con qualcuno di fiducia rompe l’isolamento, che è uno degli elementi che rendono più difficile riconoscere una dinamica dannosa.',
            otherSide: 'L’amica ti ascolta e ti suggerisce di non restare sola con questo.',
            next: null,
          },
        ],
      },
      {
        id: 'n-c',
        text: 'Lui sbuffa: «Ecco, la solita vittima.» E ricomincia ad alzare la voce.',
        choices: [
          {
            id: 'c1',
            label: '«Ti ho detto che la interrompo. Ne riparliamo quando potremo farlo senza offese.» Ed esci dalla stanza.',
            style: 'consapevole',
            feedback:
              'Mantieni il confine con coerenza. Un confine annunciato e non mantenuto perde forza; uno mantenuto con calma comunica rispetto per te stessa.',
            otherSide: 'Resta da solo e, forse, riflette.',
            next: null,
          },
          {
            id: 'c2',
            label: 'Resti e provi a spiegare di nuovo le tue ragioni sui soldi.',
            style: 'evitante',
            feedback:
              'Il desiderio di essere capita è forte. Ma in questo clima le tue ragioni difficilmente verranno ascoltate, e il confine appena posto si indebolisce.',
            otherSide: 'Continua a interrompere e a svalutare.',
            next: null,
          },
        ],
      },
    ],
    insight:
      'Lavorare sulle proprie reazioni non significa accettare offese o intimidazioni. Un confine descrive ciò che farai per proteggerti. Se le offese sono ripetute o compaiono gesti intimidatori, la priorità è la sicurezza: il 1522 è gratuito e attivo 24 ore su 24.',
    question: 'C’è una frase o un comportamento che per te rappresenta un limite non negoziabile?',
  },
];
