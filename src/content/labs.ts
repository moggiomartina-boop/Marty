import type { Lab } from '../types';

/**
 * I nove laboratori. Percorso in tre movimenti:
 *  I.  Capire ciò che provi      → 1 Emozioni, 2 Corpo, 3 Fatti e interpretazioni
 *  II. Vedere la dinamica        → 4 Ciclo, 5 Doppio punto di vista, 6 Impatto
 *  III. Scegliere una risposta   → 7 Radici, 8 Parole che riparano, 9 Confini
 */
export const labs: Lab[] = [
  {
    id: 'emozioni',
    number: 1,
    title: 'Dare un nome a ciò che provi',
    subtitle: 'Le emozioni sotto la superficie',
    question: 'Che cosa sto provando, esattamente?',
    summary:
      'Rabbia, fastidio, delusione, umiliazione: parole diverse per stati diversi. Imparare a distinguerli è il primo passo per non esserne travolti.',
    accent: 'petrol',
    tool: 'emozioni',
    sources: ['lieberman2007', 'kashdan2015', 'barrett2017', 'ekman1992', 'pennebaker1997'],
    sections: [
      {
        id: 'segnale',
        title: 'Un’emozione è un segnale, non un verdetto',
        blocks: [
          {
            kind: 'p',
            text: 'Un’emozione ci informa che qualcosa di importante per noi è in gioco: un bisogno, un valore, un legame. La rabbia spesso segnala un confine superato o un’ingiustizia percepita; la paura una minaccia; la tristezza una perdita; la vergogna il timore di essere visti come inadeguati.',
          },
          {
            kind: 'p',
            text: 'Il segnale, però, non dice ancora se la lettura è corretta né che cosa conviene fare. Sentire rabbia è legittimo; urlare è una scelta, anche quando sembra automatica. Tra le due cose c’è uno spazio, e questo percorso serve ad allargarlo.',
          },
          {
            kind: 'quote',
            text: 'Ogni emozione è legittima come esperienza. Non ogni reazione è utile come risposta.',
          },
        ],
      },
      {
        id: 'iceberg',
        title: 'Emozioni di superficie ed emozioni sottostanti',
        blocks: [
          {
            kind: 'p',
            text: 'Spesso l’emozione che mostriamo non è l’unica in gioco. La rabbia, in particolare, può essere la parte visibile di qualcosa di più vulnerabile: paura di non contare, senso di abbandono, umiliazione, stanchezza. Mostrare rabbia è a volte più tollerabile che mostrarsi feriti.',
          },
          {
            kind: 'p',
            text: 'Nella pratica clinica si parla spesso di emozioni “primarie” (la prima risposta a una situazione) e “secondarie” (la reazione all’emozione stessa, come la rabbia per essersi sentiti deboli). È una distinzione utile per l’osservazione di sé, più che una legge universale.',
          },
          {
            kind: 'evidence',
            evidence: 'ipotesi',
            text: 'Distinzione primaria/secondaria: strumento interpretativo usato in diversi approcci clinici (per esempio la terapia focalizzata sulle emozioni). Non va usata per “smascherare” l’altro, ma per interrogare sé stessi.',
          },
        ],
      },
      {
        id: 'nominare',
        title: 'Perché dare un nome aiuta',
        blocks: [
          {
            kind: 'p',
            text: 'Trasformare un’ondata indistinta in una parola precisa sembra un gesto piccolo. Eppure diverse ricerche suggeriscono che nominare l’emozione (“affect labeling”) possa ridurne l’intensità nel momento, e che le persone capaci di distinguere tra stati simili regolino le emozioni in modo più flessibile.',
          },
          {
            kind: 'evidence',
            evidence: 'evidenza',
            source: 'lieberman2007',
            text: 'In uno studio di laboratorio, etichettare verbalmente le emozioni di volti espressivi si associava a una minore attivazione dell’amigdala rispetto ad altre condizioni. Si tratta di un effetto osservato in un contesto sperimentale, non di una “cura”.',
          },
          {
            kind: 'evidence',
            evidence: 'evidenza',
            source: 'kashdan2015',
            text: 'La “granularità emotiva” — la capacità di differenziare con precisione — è risultata associata, in più studi correlazionali, a strategie di regolazione più adattive. Correlazione non significa causalità, ma la direzione è coerente con la pratica.',
          },
          {
            kind: 'list',
            items: [
              'Invece di “sto male”: deluso, escluso, imbarazzato, sopraffatto?',
              'Invece di “sono arrabbiato”: irritato, frustrato, offeso, indignato, umiliato?',
              'Più emozioni possono convivere: sollievo e tristezza, amore e rabbia.',
            ],
          },
        ],
      },
      {
        id: 'teorie',
        title: 'Due modi di pensare le emozioni',
        blocks: [
          {
            kind: 'p',
            text: 'Esistono visioni scientifiche diverse. Secondo la tradizione delle emozioni di base, alcune emozioni (come paura, rabbia, gioia, tristezza, disgusto, sorpresa) avrebbero espressioni e funzioni in larga parte universali. Secondo la teoria delle emozioni costruite, il cervello costruisce l’emozione a partire da sensazioni corporee, contesto e concetti appresi.',
          },
          {
            kind: 'evidence',
            evidence: 'modello',
            source: 'barrett2017',
            text: 'Il dibattito è aperto. Per questo percorso conta una conclusione pratica condivisa da entrambe le prospettive: il modo in cui interpretiamo e nominiamo ciò che sentiamo incide su come lo viviamo e su cosa facciamo dopo.',
          },
        ],
      },
    ],
    keyIdeas: [
      'L’emozione è un’informazione su ciò che conta per te.',
      'L’emozione visibile può coprirne una più vulnerabile.',
      'Un vocabolario emotivo più preciso aiuta a regolarsi.',
    ],
    reflection: [
      'Qual è l’emozione che ti capita più spesso di mostrare? Quale, invece, ti è più difficile mostrare?',
      'Pensa all’ultima volta che ti sei arrabbiato/a: c’era sotto anche paura, tristezza o vergogna?',
    ],
  },
  {
    id: 'corpo',
    number: 2,
    title: 'Il corpo arriva prima',
    subtitle: 'Attivazione, segnali precoci, pausa',
    question: 'Dove sento la reazione, prima ancora di pensarla?',
    summary:
      'Mascella serrata, calore al viso, respiro corto: il corpo spesso annuncia la reazione prima della mente. Riconoscere questi segnali offre un margine per scegliere.',
    accent: 'sage',
    tool: 'respiro',
    sources: ['siegel1999', 'linehan2014', 'gross1998'],
    sections: [
      {
        id: 'attivazione',
        title: 'Quando il corpo si prepara a difendersi',
        blocks: [
          {
            kind: 'p',
            text: 'Davanti a ciò che percepiamo come minaccia — anche solo sociale, come una critica o un tono sprezzante — l’organismo si attiva: il battito accelera, i muscoli si tendono, l’attenzione si restringe sul pericolo. È una risposta antica e utile in caso di pericolo fisico, meno adatta a una discussione su chi doveva comprare il latte.',
          },
          {
            kind: 'p',
            text: 'Ad alta attivazione il pensiero tende a farsi rigido: vediamo meno sfumature, ricordiamo selettivamente i torti, fatichiamo a immaginare il punto di vista dell’altro. Non è un difetto di carattere: è il modo in cui funziona un sistema in allarme.',
          },
        ],
      },
      {
        id: 'finestra',
        title: 'La finestra di tolleranza',
        blocks: [
          {
            kind: 'p',
            text: 'Una metafora molto usata descrive una “finestra” di attivazione entro cui riusciamo a sentire e a pensare insieme. Sopra la finestra (iperattivazione) ci sono agitazione, rabbia esplosiva, panico. Sotto (ipoattivazione) ci sono chiusura, vuoto, distacco, il “non sento più niente”.',
          },
          {
            kind: 'evidence',
            evidence: 'modello',
            source: 'siegel1999',
            text: 'La finestra di tolleranza è un modello clinico descrittivo, non una misura. È utile per riconoscere in quale zona ci si trova e per capire che, fuori dalla finestra, una conversazione importante raramente va bene.',
          },
          {
            kind: 'list',
            items: [
              'Dentro la finestra: posso sentire l’emozione e scegliere cosa dire.',
              'Sopra: alzo la voce, interrompo, voglio vincere o fuggire.',
              'Sotto: mi spengo, rispondo a monosillabi, mi sento lontano/a.',
            ],
          },
        ],
      },
      {
        id: 'segnali',
        title: 'I tuoi segnali precoci',
        blocks: [
          {
            kind: 'p',
            text: 'Ognuno ha una propria “firma” dell’attivazione. Conoscerla permette di intervenire nei primi secondi, quando è ancora possibile. Più l’onda sale, più ridotto è lo spazio di scelta.',
          },
          {
            kind: 'list',
            items: [
              'Corpo: calore, tensione a spalle e mascella, pugni chiusi, nodo allo stomaco.',
              'Voce: volume che sale, ritmo che accelera, tono tagliente.',
              'Pensiero: “sempre”, “mai”, “adesso glielo dico io”.',
              'Impulso: interrompere, andarsene sbattendo, prendere il telefono e scrivere subito.',
            ],
          },
        ],
      },
      {
        id: 'pausa',
        title: 'La pausa come abilità',
        blocks: [
          {
            kind: 'p',
            text: 'Prendersi una pausa non significa scappare. Significa comunicare: “Ci tengo a questa conversazione e adesso non riesco a farla bene. Riprendiamola tra venti minuti.” La differenza con l’evitamento sta nel ritorno: una pausa ha una durata e un rientro.',
          },
          {
            kind: 'evidence',
            evidence: 'pratica',
            source: 'linehan2014',
            text: 'Diverse tecniche di regolazione dell’attivazione (respiro con espirazione più lunga, attenzione ai piedi sul pavimento, acqua fredda sul viso) sono insegnate in programmi strutturati come la DBT. Funzionano diversamente da persona a persona: vanno provate, non date per scontate.',
          },
        ],
      },
    ],
    keyIdeas: [
      'L’attivazione restringe il pensiero: non è il momento migliore per decidere.',
      'Conoscere i propri segnali precoci dà secondi preziosi.',
      'Una pausa è sana quando ha una durata e un ritorno.',
    ],
    reflection: [
      'Qual è il primo segnale fisico che di solito noti quando ti stai alterando?',
      'Quando sei fuori dalla tua finestra, tendi più a salire (esplodere) o a scendere (spegnerti)?',
    ],
  },
  {
    id: 'fatti',
    number: 3,
    title: 'Fatti e interpretazioni',
    subtitle: 'Ciò che accade e ciò che ci diciamo',
    question: 'Che cosa è successo davvero, e che cosa ho aggiunto io?',
    summary:
      '“Non mi ha risposto” è un fatto. “Non gli importa di me” è un’interpretazione. Spesso reagiamo alla seconda credendo di reagire al primo.',
    accent: 'sand',
    tool: 'fatti',
    sources: ['ellis1962', 'beck1976', 'ross1977', 'gross1998', 'webb2012'],
    sections: [
      {
        id: 'abc',
        title: 'Tra l’evento e l’emozione',
        blocks: [
          {
            kind: 'p',
            text: 'Un collega non saluta. Una persona pensa “sarà distratto” e prosegue. Un’altra pensa “ce l’ha con me” e passa la mattina a rimuginare. L’evento è identico; la lettura cambia l’emozione, e l’emozione cambia il comportamento.',
          },
          {
            kind: 'evidence',
            evidence: 'modello',
            source: 'ellis1962',
            text: 'Il modello ABC di Ellis: A (evento attivante) → B (convinzioni, interpretazioni) → C (conseguenze emotive e comportamentali). Sulla stessa linea, la terapia cognitiva di Beck parla di “pensieri automatici”: rapidi, plausibili, raramente verificati.',
          },
        ],
      },
      {
        id: 'distinguere',
        title: 'Come si riconosce un fatto',
        blocks: [
          {
            kind: 'p',
            text: 'Un fatto è ciò che una videocamera potrebbe registrare: parole dette, azioni compiute, orari, gesti. Un’interpretazione aggiunge intenzioni, giudizi, generalizzazioni, previsioni. Non è sbagliato interpretare — lo facciamo continuamente — ma conviene sapere quando lo stiamo facendo.',
          },
          {
            kind: 'list',
            items: [
              'Fatto: “Sei arrivato alle 20:40, avevamo detto alle 20.”',
              'Interpretazione: “Non rispetti mai il mio tempo.”',
              'Fatto: “Durante la riunione hai presentato il progetto senza nominarmi.”',
              'Interpretazione: “Vuoi prenderti il merito del mio lavoro.”',
            ],
          },
        ],
      },
      {
        id: 'trappole',
        title: 'Le trappole più comuni',
        blocks: [
          {
            kind: 'p',
            text: 'Alcuni schemi di pensiero ricorrono così spesso da avere un nome. Riconoscerli non significa che siano sempre falsi, ma che meritano una verifica.',
          },
          {
            kind: 'list',
            items: [
              'Lettura del pensiero: “So benissimo cosa pensa.”',
              'Generalizzazione: “Fa sempre così”, “Non cambia mai niente.”',
              'Personalizzazione: “Se è di cattivo umore, è per colpa mia.”',
              'Catastrofizzazione: “Se lo dico, finisce tutto.”',
              'Errore fondamentale di attribuzione: io ho avuto un imprevisto, tu sei inaffidabile.',
            ],
          },
          {
            kind: 'evidence',
            evidence: 'evidenza',
            source: 'ross1977',
            text: 'La tendenza a spiegare il comportamento altrui con tratti di personalità, sottovalutando la situazione, è stata documentata in numerosi studi di psicologia sociale. Si tende invece a spiegare il proprio comportamento con le circostanze.',
          },
        ],
      },
      {
        id: 'rivalutare',
        title: 'Rivalutare non è negare',
        blocks: [
          {
            kind: 'p',
            text: 'Cercare interpretazioni alternative non vuol dire convincersi che “va tutto bene”. Significa tenere aperte più ipotesi finché non si hanno più informazioni — e poi, spesso, chiedere.',
          },
          {
            kind: 'evidence',
            evidence: 'evidenza',
            source: 'webb2012',
            text: 'Nella meta-analisi di Webb e colleghi, le strategie di cambiamento cognitivo (come la rivalutazione) mostrano in media effetti più favorevoli rispetto alla soppressione dell’espressione emotiva. Gli effetti variano molto tra studi e contesti.',
          },
          {
            kind: 'note',
            text: 'Attenzione: se l’interpretazione “mi sta facendo del male” è supportata da fatti ripetuti, non va relativizzata. La rivalutazione non serve a giustificare comportamenti lesivi. Vedi il laboratorio 9.',
          },
        ],
      },
    ],
    keyIdeas: [
      'Reagiamo spesso alla nostra interpretazione, non all’evento.',
      'Un fatto è ciò che una videocamera potrebbe registrare.',
      'Più ipotesi aperte = più libertà di risposta.',
    ],
    reflection: [
      'Qual è l’interpretazione che ti viene più spontanea quando qualcuno non ti risponde?',
      'Ricordi una volta in cui eri sicuro/a delle intenzioni di qualcuno e ti sbagliavi?',
    ],
  },
  {
    id: 'ciclo',
    number: 4,
    title: 'Il ciclo della reazione',
    subtitle: 'Dall’innesco all’effetto sull’altro',
    question: 'In che punto del ciclo potrei fare qualcosa di diverso?',
    summary:
      'Innesco, interpretazione, emozione, impulso, azione, effetto sull’altro, risposta dell’altro. Ogni reazione è un anello; capirlo permette di trovare i punti in cui interromperlo.',
    accent: 'terracotta',
    tool: 'ciclo',
    sources: ['gross1998', 'johnson2008', 'gottman1994'],
    sections: [
      {
        id: 'anelli',
        title: 'Sette passaggi, spesso in un secondo',
        blocks: [
          {
            kind: 'p',
            text: 'Quando reagiamo, la sequenza sembra unica e istantanea. Rallentandola, si vedono passaggi distinti: un innesco (ciò che accade), un’interpretazione (ciò che ci diciamo), un’emozione, un impulso (ciò che vorremmo fare), un’azione (ciò che facciamo), un effetto sull’altro e, infine, la risposta dell’altro — che diventa il nostro prossimo innesco.',
          },
          {
            kind: 'evidence',
            evidence: 'modello',
            source: 'gross1998',
            text: 'Questa scomposizione si ispira al modello processuale della regolazione emotiva di Gross, secondo cui si può intervenire in momenti diversi: scegliendo o modificando la situazione, spostando l’attenzione, cambiando l’interpretazione, modulando la risposta.',
          },
        ],
      },
      {
        id: 'circolo',
        title: 'Quando il ciclo diventa una danza',
        blocks: [
          {
            kind: 'p',
            text: 'Nelle relazioni strette, due cicli si agganciano. Più uno insiste per parlare, più l’altro si chiude; più l’altro si chiude, più il primo insiste. Ciascuno vede la propria mossa come risposta a quella dell’altro: “Insisto perché ti chiudi.” “Mi chiudo perché insisti.”',
          },
          {
            kind: 'evidence',
            evidence: 'modello',
            source: 'johnson2008',
            text: 'La terapia focalizzata sulle emozioni descrive cicli di questo tipo (per esempio “inseguimento–ritiro”) come il vero problema della coppia, più delle singole persone. È un modello clinico: aiuta a guardare la dinamica senza cercare il colpevole.',
          },
          {
            kind: 'quote',
            text: 'Il problema non è l’altro, e non sei tu: è il ciclo che vi prende entrambi.',
          },
        ],
      },
      {
        id: 'interrompere',
        title: 'Dove interrompere',
        blocks: [
          {
            kind: 'list',
            items: [
              'Sull’interpretazione: “Sto leggendo il pensiero? Che altra spiegazione c’è?”',
              'Sull’emozione: nominarla, anche solo a sé stessi.',
              'Sull’impulso: notare la spinta senza eseguirla subito.',
              'Sull’azione: scegliere una mossa più piccola o più lenta.',
              'Dopo: riparare, se l’effetto sull’altro è stato doloroso.',
            ],
          },
          {
            kind: 'p',
            text: 'Prima si interviene, più è facile. Ma non è mai troppo tardi: anche dopo una reazione di cui ci si pente, la riparazione cambia il finale del ciclo.',
          },
        ],
      },
    ],
    keyIdeas: [
      'La reazione è una sequenza, non un blocco unico.',
      'Il comportamento dell’altro è spesso una risposta al nostro, e viceversa.',
      'Esistono più punti di uscita; anche la riparazione è uno di essi.',
    ],
    reflection: [
      'In quale anello del ciclo ti è più facile accorgerti di cosa sta succedendo?',
      'C’è una “danza” che si ripete in una tua relazione importante?',
    ],
  },
  {
    id: 'prospettive',
    number: 5,
    title: 'Doppio punto di vista',
    subtitle: 'La stessa scena, due storie',
    question: 'Come potrebbe aver vissuto questo momento l’altra persona?',
    summary:
      'Ognuno è protagonista della propria versione. Allenarsi a vedere la scena dagli occhi dell’altro non significa dargli ragione: significa capire che cosa sta rispondendo.',
    accent: 'petrol',
    tool: 'prospettive',
    sources: ['fonagy2002', 'davis1983', 'ross1977'],
    sections: [
      {
        id: 'mentalizzare',
        title: 'Leggere le menti, con umiltà',
        blocks: [
          {
            kind: 'p',
            text: 'Comprendere il comportamento — proprio e altrui — in termini di stati mentali (emozioni, intenzioni, bisogni, convinzioni) è una capacità che in psicologia viene chiamata mentalizzazione. Non è infallibile e tende a ridursi proprio quando siamo molto attivati.',
          },
          {
            kind: 'evidence',
            evidence: 'modello',
            source: 'fonagy2002',
            text: 'Un tratto della buona mentalizzazione è la curiosità consapevole dei propri limiti: “Credo che tu fossi ferito, ma posso sbagliarmi.” L’opposto è la certezza: “So perfettamente perché l’hai fatto.”',
          },
        ],
      },
      {
        id: 'empatia',
        title: 'Capire e sentire non sono la stessa cosa',
        blocks: [
          {
            kind: 'p',
            text: 'La ricerca distingue tra presa di prospettiva — capire cognitivamente il punto di vista altrui — e risonanza o preoccupazione empatica — sentirsi toccati dall’emozione dell’altro. Si può fare la prima senza essere sopraffatti dalla seconda, e viceversa.',
          },
          {
            kind: 'evidence',
            evidence: 'evidenza',
            source: 'davis1983',
            text: 'La distinzione tra componenti cognitive e affettive dell’empatia è stata sostenuta da studi sulla misurazione delle differenze individuali. È una distinzione utile, ma le due componenti nella vita reale si intrecciano.',
          },
        ],
      },
      {
        id: 'come',
        title: 'Come si allena',
        blocks: [
          {
            kind: 'list',
            items: [
              'Racconta la scena in prima persona, poi riscrivila con la voce dell’altro.',
              'Chiediti: cosa sapeva l’altra persona che io non sapevo? Che giornata aveva?',
              'Cerca un bisogno legittimo dietro un comportamento che ti ha ferito.',
              'Verifica: “Mi sembra che tu… è così?”',
            ],
          },
          {
            kind: 'note',
            text: 'Comprendere non significa giustificare. Si può capire perché qualcuno ha agito così e, allo stesso tempo, ritenere quel comportamento inaccettabile.',
          },
        ],
      },
    ],
    keyIdeas: [
      'Ognuno risponde alla propria versione della scena.',
      'La curiosità è più utile della certezza.',
      'Capire l’altro non obbliga a dargli ragione.',
    ],
    reflection: [
      'Con chi ti risulta più difficile assumere il punto di vista dell’altro? Perché?',
      'Che cosa vorresti che l’altra persona capisse della tua versione?',
    ],
  },
  {
    id: 'impatto',
    number: 6,
    title: 'Ciò che provochi',
    subtitle: 'Intenzione e impatto',
    question: 'Che effetto ha avuto ciò che ho fatto, al di là di ciò che intendevo?',
    summary:
      '“Non volevo ferirti” può essere vero, e la ferita può esserci comunque. Riconoscere l’impatto delle proprie reazioni è il cuore di una responsabilità matura.',
    accent: 'terracotta',
    tool: 'impatto',
    sources: ['gottman1994', 'gottman1999', 'grossjohn2003'],
    sections: [
      {
        id: 'distanza',
        title: 'La distanza tra intenzione e impatto',
        blocks: [
          {
            kind: 'p',
            text: 'Noi conosciamo le nostre intenzioni; l’altro conosce i nostri comportamenti. Per questo tendiamo a giudicarci per ciò che volevamo fare e gli altri ci giudicano per ciò che abbiamo fatto. Entrambe le prospettive sono parziali.',
          },
          {
            kind: 'p',
            text: 'Riconoscere l’impatto non è un’ammissione di cattiveria. È una presa d’atto: “Il mio tono ti ha fatto sentire umiliato. Non era la mia intenzione, ed è successo.”',
          },
        ],
      },
      {
        id: 'modalita',
        title: 'Modalità che tendono a ferire',
        blocks: [
          {
            kind: 'p',
            text: 'Lo psicologo John Gottman, osservando per anni coppie in conflitto, ha individuato alcune modalità ricorrenti associate a un deterioramento della relazione. Non sono etichette per persone, ma descrizioni di mosse che tutti possiamo fare.',
          },
          {
            kind: 'list',
            items: [
              'Critica: attaccare la persona invece di descrivere un comportamento (“sei egoista”).',
              'Disprezzo: sarcasmo, sguardi al cielo, superiorità.',
              'Difensività: rispondere a una lamentela con una controaccusa o con il ruolo di vittima.',
              'Chiusura (stonewalling): ritirarsi dalla conversazione, smettere di rispondere.',
            ],
          },
          {
            kind: 'evidence',
            evidence: 'evidenza',
            source: 'gottman1994',
            text: 'Queste modalità sono risultate associate a esiti relazionali negativi in studi osservativi longitudinali su coppie sposate statunitensi. Il potere predittivo citato nella divulgazione va letto con cautela: si tratta di associazioni in campioni specifici.',
          },
        ],
      },
      {
        id: 'silenzio',
        title: 'Anche il silenzio comunica',
        blocks: [
          {
            kind: 'p',
            text: 'Non solo l’esplosione ha un impatto. Trattenere tutto, mostrarsi impassibili, rispondere “niente” quando qualcosa non va: anche questo arriva all’altro, spesso come distanza o rifiuto.',
          },
          {
            kind: 'evidence',
            evidence: 'evidenza',
            source: 'grossjohn2003',
            text: 'Nella ricerca di Gross e John, l’uso abituale della soppressione espressiva era associato a minore vicinanza relazionale e minore supporto sociale percepito. Sopprimere l’espressione non elimina l’emozione, e gli altri spesso la percepiscono comunque.',
          },
        ],
      },
      {
        id: 'responsabilita',
        title: 'Responsabilità senza autoaccusa',
        blocks: [
          {
            kind: 'p',
            text: 'Assumersi la responsabilità del proprio impatto è diverso dal sentirsi “una persona sbagliata”. La vergogna paralizza e porta a difendersi; la responsabilità apre alla riparazione. In questo percorso non ci sono punteggi né etichette: ci sono comportamenti che puoi osservare e, se vuoi, cambiare.',
          },
        ],
      },
    ],
    keyIdeas: [
      'L’intenzione non annulla l’impatto.',
      'Esplodere e chiudersi hanno entrambi un effetto sull’altro.',
      'Responsabilità non è vergogna: è il presupposto della riparazione.',
    ],
    reflection: [
      'Quale delle quattro modalità riconosci più spesso nelle tue reazioni sotto stress?',
      'Ricordi un momento in cui l’impatto di ciò che hai detto è stato diverso da ciò che volevi?',
    ],
  },
  {
    id: 'radici',
    number: 7,
    title: 'Ferite antiche, reazioni presenti',
    subtitle: 'Perché alcune cose ci toccano così tanto',
    question: 'Questa reazione appartiene solo al presente?',
    summary:
      'A volte reagiamo con un’intensità che ci sorprende. Può accadere che una situazione attuale tocchi un tema emotivo più antico. Riconoscerlo aiuta a non far pagare al presente il conto del passato.',
    accent: 'sage',
    sources: ['bowlby1969', 'young2003', 'johnson2008', 'neff2003'],
    sections: [
      {
        id: 'sproporzione',
        title: 'Quando l’intensità è sproporzionata',
        blocks: [
          {
            kind: 'p',
            text: 'Un messaggio senza risposta che produce panico. Un commento sul lavoro che sembra una condanna. Una battuta che brucia per giorni. Quando l’intensità supera di molto ciò che la situazione giustificherebbe, vale la pena chiedersi: che cosa ha toccato, esattamente?',
          },
          {
            kind: 'note',
            text: 'Questo laboratorio offre chiavi di lettura, non diagnosi. Nessuno strumento qui ti dirà “quale stile di attaccamento hai” o “quale schema possiedi”: queste valutazioni richiedono un professionista e un contesto adeguato.',
          },
        ],
      },
      {
        id: 'attaccamento',
        title: 'Il bisogno di sicurezza nei legami',
        blocks: [
          {
            kind: 'p',
            text: 'Secondo la teoria dell’attaccamento, gli esseri umani hanno un bisogno di base di vicinanza e sicurezza con le persone di riferimento. Quando quella sicurezza sembra minacciata — per distanza, critica, imprevedibilità — si attivano strategie di protezione: cercare più vicinanza e conferme, oppure prendere distanza e fare da soli.',
          },
          {
            kind: 'evidence',
            evidence: 'modello',
            source: 'bowlby1969',
            text: 'La teoria dell’attaccamento è uno dei modelli più studiati della psicologia dello sviluppo. Le categorie (“sicuro”, “ansioso”, “evitante”) descrivono tendenze misurate con strumenti specifici; non vanno usate come etichette fai-da-te per sé o per il partner.',
          },
        ],
      },
      {
        id: 'temi',
        title: 'Temi emotivi ricorrenti',
        blocks: [
          {
            kind: 'p',
            text: 'Alcuni approcci clinici parlano di temi o “schemi” appresi presto nella vita — come il timore di essere abbandonati, di non valere abbastanza, di non essere capiti, di dover sempre controllare — che possono riattivarsi nel presente. Quando si attivano, l’emozione appartiene in parte a una storia più lunga.',
          },
          {
            kind: 'evidence',
            evidence: 'ipotesi',
            source: 'young2003',
            text: 'La lettura “questa reazione ricorda qualcosa di antico” è un’ipotesi interpretativa che solo tu puoi valutare. Può essere illuminante; può anche essere sbagliata. Tienila come domanda, non come spiegazione definitiva.',
          },
          {
            kind: 'list',
            items: [
              '“Mi sento come quando…” — la sensazione ha un sapore familiare?',
              '“Che cosa temo che significhi questa situazione su di me?”',
              '“Che età mi sento di avere, in questo momento?”',
            ],
          },
        ],
      },
      {
        id: 'gentilezza',
        title: 'Guardarsi con gentilezza',
        blocks: [
          {
            kind: 'p',
            text: 'Capire da dove nasce una reazione non serve a giustificarla, né a colpevolizzare chi ci ha cresciuto. Serve a rispondere a noi stessi con più comprensione e, di conseguenza, a rispondere agli altri con più libertà.',
          },
          {
            kind: 'evidence',
            evidence: 'modello',
            source: 'neff2003',
            text: 'L’autocompassione, come definita da Kristin Neff, unisce gentilezza verso sé, consapevolezza delle proprie emozioni e senso di comune umanità (“non sono l’unico/a a sbagliare”). È diversa dall’autoindulgenza: include la responsabilità.',
          },
        ],
      },
    ],
    keyIdeas: [
      'Un’intensità sproporzionata è un indizio, non una colpa.',
      'Il bisogno di sicurezza nei legami è universale.',
      'Le letture sul passato sono ipotesi da esplorare, non diagnosi.',
    ],
    reflection: [
      'C’è una situazione che ti tocca in modo particolarmente intenso, più di quanto ti aspetteresti?',
      'Che cosa diresti a una persona cara che reagisce come reagisci tu in quella situazione?',
    ],
  },
  {
    id: 'parole',
    number: 8,
    title: 'Parole che riparano',
    subtitle: 'Comunicare il bisogno, riparare la frattura',
    question: 'Come posso dire ciò che sento senza ferire, e rimediare quando ho ferito?',
    summary:
      'Esprimere un disagio senza attaccare e riparare dopo una reazione dolorosa sono abilità che si possono imparare, con frasi concrete e passaggi chiari.',
    accent: 'sand',
    tool: 'riparazione',
    sources: ['rosenberg2003', 'gottman1999', 'linehan2014'],
    sections: [
      {
        id: 'quattro',
        title: 'Osservazione, emozione, bisogno, richiesta',
        blocks: [
          {
            kind: 'p',
            text: 'Una struttura molto diffusa, proposta dalla Comunicazione Nonviolenta, scompone un messaggio difficile in quattro passaggi: descrivere ciò che è successo senza giudizio, nominare ciò che si prova, indicare il bisogno in gioco, formulare una richiesta concreta e negoziabile.',
          },
          {
            kind: 'list',
            items: [
              'Osservazione: “Quando ieri sera hai guardato il telefono mentre ti raccontavo della visita…”',
              'Emozione: “…mi sono sentita sola e un po’ ferita…”',
              'Bisogno: “…perché per me è importante sentirmi ascoltata nelle cose che mi preoccupano.”',
              'Richiesta: “Stasera possiamo parlarne dieci minuti, senza telefoni?”',
            ],
          },
          {
            kind: 'evidence',
            evidence: 'pratica',
            source: 'rosenberg2003',
            text: 'La CNV è un modello pratico ampiamente usato in ambito educativo e organizzativo; le evidenze empiriche controllate sulla sua efficacia sono ancora limitate. Usala come impalcatura, non come formula rigida.',
          },
        ],
      },
      {
        id: 'avvio',
        title: 'Come si inizia conta',
        blocks: [
          {
            kind: 'p',
            text: 'Il modo in cui si apre una conversazione difficile tende a orientarne il seguito. Un avvio brusco (“dobbiamo parlare del tuo egoismo”) attiva subito la difesa dell’altro. Un avvio morbido parte da sé, descrive, chiede.',
          },
          {
            kind: 'list',
            items: [
              '“Io” invece di “tu sempre”.',
              'Un tema alla volta.',
              'Momento scelto: non sulla porta, non in pubblico, non a mezzanotte.',
            ],
          },
        ],
      },
      {
        id: 'riparare',
        title: 'Anatomia di una riparazione',
        blocks: [
          {
            kind: 'p',
            text: 'Tutti, prima o poi, reagiamo in modi che feriscono. Ciò che fa la differenza in una relazione non è l’assenza di rotture ma la capacità di ripararle. Una riparazione efficace di solito contiene:',
          },
          {
            kind: 'list',
            items: [
              'Riconoscimento specifico: che cosa ho fatto, con parole concrete.',
              'Impatto: che effetto immagino abbia avuto su di te (e chiederlo).',
              'Responsabilità senza “ma”: niente “scusa, ma tu…”.',
              'Impegno realistico: che cosa farò di diverso la prossima volta.',
              'Spazio: l’altro può aver bisogno di tempo; la riparazione non si pretende.',
            ],
          },
          {
            kind: 'evidence',
            evidence: 'modello',
            source: 'gottman1999',
            text: 'Gottman descrive i “tentativi di riparazione” — piccoli gesti, battute, frasi che riducono la tensione durante e dopo un conflitto — come un elemento importante nelle coppie che funzionano. È un’osservazione derivata dalla ricerca, divulgata in forma accessibile.',
          },
        ],
      },
    ],
    keyIdeas: [
      'Descrivere invece di giudicare; chiedere invece di pretendere.',
      'L’avvio di una conversazione ne orienta il seguito.',
      'Una scusa con il “ma” annulla sé stessa.',
    ],
    reflection: [
      'Qual è una cosa che faresti fatica a chiedere, e come potresti formularla?',
      'C’è una riparazione che senti di dovere a qualcuno, o a te stesso/a?',
    ],
  },
  {
    id: 'confini',
    number: 9,
    title: 'Confini e cura di sé',
    subtitle: 'Responsabilità sì, colpa no',
    question: 'Che cosa è mio da cambiare, e che cosa non lo è?',
    summary:
      'Lavorare sulle proprie reazioni non significa accettare tutto. Un confine chiaro protegge la relazione e protegge te. E quando c’è un pericolo, la priorità è la sicurezza.',
    accent: 'sage',
    sources: ['linehan2014', 'neff2003', 'rosenberg2003'],
    sections: [
      {
        id: 'cosa',
        title: 'Che cos’è un confine',
        blocks: [
          {
            kind: 'p',
            text: 'Un confine descrive ciò che tu farai per proteggere qualcosa di importante, non ciò che l’altro deve fare. “Non devi alzare la voce” è una richiesta (legittima, ma dipende dall’altro). “Se la voce si alza, interrompo la conversazione e la riprendiamo più tardi” è un confine: dipende da te.',
          },
          {
            kind: 'list',
            items: [
              'È chiaro e comunicato con calma, non nel picco della rabbia.',
              'È sostenibile: lo puoi mantenere davvero.',
              'Non è una punizione né una minaccia: è una protezione.',
            ],
          },
        ],
      },
      {
        id: 'responsabilita',
        title: 'Il perimetro della responsabilità',
        blocks: [
          {
            kind: 'p',
            text: 'Sei responsabile di ciò che fai con le tue emozioni. Non sei responsabile delle emozioni degli altri, né delle loro scelte. Riconoscere ciò che provochi non significa prenderti carico di tutto ciò che l’altro sente o fa.',
          },
          {
            kind: 'p',
            text: 'Questa distinzione è particolarmente importante per chi tende a sentirsi sempre in colpa: un percorso sulle proprie reazioni non deve diventare un nuovo strumento di autoaccusa.',
          },
        ],
      },
      {
        id: 'sicurezza',
        title: 'Quando non si tratta di comunicazione',
        blocks: [
          {
            kind: 'p',
            text: 'Ci sono situazioni in cui il problema non è un fraintendimento né uno stile comunicativo: minacce, controllo sistematico, umiliazioni ripetute, violenza fisica, sessuale, economica o psicologica. In questi casi nessuno strumento di questo percorso è adatto, e non è tuo compito “gestire meglio le tue reazioni” per evitare il comportamento dell’altro.',
          },
          {
            kind: 'note',
            text: 'Se sei in pericolo immediato chiama il 112. In Italia il numero 1522 (antiviolenza e stalking) è gratuito e attivo 24 ore su 24. Se ti accorgi che le tue reazioni mettono a rischio te o altre persone, rivolgerti a un professionista della salute mentale è un atto di responsabilità.',
          },
        ],
      },
      {
        id: 'cura',
        title: 'Cura di sé, non come premio',
        blocks: [
          {
            kind: 'p',
            text: 'Sonno insufficiente, fame, stanchezza cronica, dolore fisico, sostanze: tutto questo restringe la finestra di tolleranza. Prendersi cura della base non è un lusso, è una strategia di prevenzione. Lo stesso vale per avere persone di supporto con cui parlare prima che la tensione si accumuli.',
          },
          {
            kind: 'evidence',
            evidence: 'pratica',
            source: 'linehan2014',
            text: 'Nella DBT, ridurre la vulnerabilità emotiva prendendosi cura di sonno, alimentazione, attività fisica e salute è parte integrante delle abilità di regolazione.',
          },
        ],
      },
    ],
    keyIdeas: [
      'Un confine dice cosa farai tu, non cosa deve fare l’altro.',
      'Sei responsabile delle tue azioni, non delle emozioni altrui.',
      'La sicurezza viene prima di qualsiasi lavoro sulla comunicazione.',
    ],
    reflection: [
      'C’è un confine che vorresti mettere e che finora hai evitato?',
      'Quali condizioni (sonno, stanchezza, fame) rendono più probabile una tua reazione impulsiva?',
    ],
  },
];

export const labById = (id: string) => labs.find((l) => l.id === id);

export const movements = [
  { title: 'Capire ciò che provi', labs: ['emozioni', 'corpo', 'fatti'] },
  { title: 'Vedere la dinamica', labs: ['ciclo', 'prospettive', 'impatto'] },
  { title: 'Scegliere una risposta', labs: ['radici', 'parole', 'confini'] },
] as const;
