import type { Scenario } from '../../types';

/** Scenari dei laboratori 1–3: emozioni, corpo, fatti e interpretazioni. */
export const scenariosPart1: Scenario[] = [
  {
    id: 'cena-anniversario',
    lab: 'emozioni',
    title: 'La cena dell’anniversario',
    relation: 'coppia',
    context:
      'Hai prenotato un ristorante per il vostro anniversario. Il tuo partner arriva con cinquanta minuti di ritardo, senza aver avvisato. Si siede e dice: «Scusa, giornata infernale.» Senti un’ondata salire.',
    start: 'start',
    nodes: [
      {
        id: 'start',
        text: 'Prima di parlare, che cosa fai con quell’ondata?',
        choices: [
          {
            id: 'a',
            label: '«Ah, giornata infernale. Pensa la mia, qui da sola come una cretina.»',
            style: 'impulsiva',
            feedback:
              'Il sarcasmo dà voce alla rabbia ma nasconde ciò che c’è sotto: probabilmente delusione, e forse il timore di non essere una priorità. L’altro sente l’attacco, non la ferita.',
            otherSide: 'Si sente aggredito appena arrivato e pensa: «Non mi lascia nemmeno spiegare.»',
            next: 'n-a',
          },
          {
            id: 'b',
            label: '«Tranquillo, figurati.» E sorridi, anche se dentro ribolli.',
            style: 'evitante',
            feedback:
              'Eviti il conflitto in una serata speciale, ed è comprensibile. Ma l’emozione non sparisce: è probabile che riemerga più tardi, magari in forma di freddezza che l’altro non sa decifrare.',
            otherSide: 'È sollevato, ma nota che sei distante e non capisce perché.',
            next: 'n-b',
          },
          {
            id: 'c',
            label: 'Fai un respiro e ti chiedi: che cosa sto provando, esattamente?',
            style: 'consapevole',
            feedback:
              'Fermarti a nominare l’emozione crea uno spazio. Potresti scoprire che sotto l’irritazione c’è soprattutto delusione: avevi immaginato questa serata.',
            otherSide: 'Nota il tuo silenzio teso e aspetta, un po’ in allerta.',
            next: 'n-c',
          },
        ],
      },
      {
        id: 'n-a',
        text: 'Lui si irrigidisce: «Ecco, lo sapevo. Non posso nemmeno avere una giornata storta.» La serata sta prendendo una piega che non volevi.',
        choices: [
          {
            id: 'a1',
            label: '«Non è una giornata storta, è sempre così con te.»',
            style: 'impulsiva',
            feedback:
              'La generalizzazione (“sempre”) sposta la discussione dal ritardo di stasera al carattere dell’altro. Ora entrambi vi state difendendo, e l’anniversario è sparito.',
            otherSide: 'Si sente giudicato come persona e inizia a elencare le tue mancanze.',
            next: null,
          },
          {
            id: 'a2',
            label: '«Hai ragione, sono partita all’attacco. In realtà ci tenevo tanto e sono delusa.»',
            style: 'consapevole',
            feedback:
              'Una riparazione rapida: riconosci la tua mossa e mostri l’emozione sottostante. È più difficile che dirlo subito, ma cambia il finale del ciclo.',
            otherSide: 'Si ammorbidisce: «Anch’io ci tenevo. Mi dispiace non averti scritto.»',
            next: null,
          },
        ],
      },
      {
        id: 'n-b',
        text: 'La cena prosegue. Lui racconta la sua giornata, tu rispondi a monosillabi. Alla fine ti chiede: «Tutto bene? Sei strana.»',
        choices: [
          {
            id: 'b1',
            label: '«Sì, tutto bene. Sono solo stanca.»',
            style: 'evitante',
            feedback:
              'Il “tutto bene” chiude la porta che l’altro sta aprendo. L’emozione resta senza nome e senza destinatario; potrebbe trasformarsi in risentimento.',
            otherSide: 'Non ti crede del tutto, si sente escluso e smette di chiedere.',
            next: null,
          },
          {
            id: 'b2',
            label: '«In realtà ci sono rimasta male per il ritardo. Prima non l’ho detto.»',
            style: 'consapevole',
            feedback:
              'Rientri nella conversazione con un’emozione precisa e senza accusa. Dirlo dopo è comunque meglio di non dirlo: dà all’altro la possibilità di rispondere.',
            otherSide: 'Si sente in colpa ma anche sollevato di capire che cosa succedeva.',
            next: null,
          },
        ],
      },
      {
        id: 'n-c',
        text: 'Ti accorgi che sotto l’irritazione c’è delusione, e un pizzico di paura: “Forse non è importante per lui come per me.”',
        choices: [
          {
            id: 'c1',
            label: '«Sono contenta che tu sia qui. Però ci sono rimasta male: avrei voluto un messaggio.»',
            style: 'consapevole',
            feedback:
              'Esprimi sia il legame sia il disagio, con una richiesta concreta (un messaggio). L’altro può accogliere senza sentirsi sotto processo.',
            otherSide: '«Hai ragione, avrei dovuto scriverti. Ero in riunione e ho perso la testa.»',
            next: null,
          },
          {
            id: 'c2',
            label: 'Decidi di godervi la cena e di parlarne domani, a mente fredda.',
            style: 'consapevole',
            feedback:
              'Rimandare può essere una scelta regolata, se è una scelta e non una fuga: l’importante è che domani la conversazione avvenga davvero.',
            otherSide: 'Percepisce un po’ di tensione ma la serata resta piacevole.',
            next: null,
          },
        ],
      },
    ],
    insight:
      'Dietro la rabbia per un ritardo può esserci la delusione per un’aspettativa importante. Nominare l’emozione sottostante permette all’altro di rispondere alla ferita, non all’attacco.',
    question: 'In situazioni simili, quale emozione mostri di solito, e quale resta nascosta?',
  },
  {
    id: 'pranzo-domenica',
    lab: 'emozioni',
    title: 'Il pranzo della domenica',
    relation: 'famiglia',
    context:
      'Pranzo dai tuoi genitori, con zii e cugini. Tua madre, davanti a tutti, dice: «E tu? Ancora niente di stabile col lavoro? Tuo cugino intanto si è comprato casa.» Senti il viso diventare caldo.',
    start: 'start',
    nodes: [
      {
        id: 'start',
        text: 'Tutti ti guardano. Cosa succede dentro di te, e cosa fai?',
        choices: [
          {
            id: 'a',
            label: '«Grazie mamma, sempre di supporto. Magari parliamo dei tuoi fallimenti?»',
            style: 'impulsiva',
            feedback:
              'Il contrattacco protegge da un’emozione dolorosa — spesso vergogna, quella sensazione di essere esposti e giudicati. Ma sposta l’attenzione sul tuo tono, e la vergogna resta.',
            otherSide: 'Tua madre si sente umiliata in pubblico e risponde piccata.',
            next: 'n-a',
          },
          {
            id: 'b',
            label: 'Ridi, cambi argomento e per il resto del pranzo non parli quasi più.',
            style: 'evitante',
            feedback:
              'Ti proteggi dall’esposizione, e in un contesto pubblico può essere sensato. Il rischio è che la ferita resti muta e torni ogni volta che rivedi tua madre.',
            otherSide: 'Pensa che la battuta sia passata e non si accorge di averti ferito.',
            next: 'n-b',
          },
          {
            id: 'c',
            label: 'Riconosci il calore al viso: è vergogna, più che rabbia. Rispondi breve: «Ci sto lavorando.»',
            style: 'consapevole',
            feedback:
              'Distinguere vergogna da rabbia è importante: la vergogna spinge a nascondersi o ad attaccare, e sapere che è lei ti aiuta a non farti guidare. Una risposta breve chiude il momento pubblico.',
            otherSide: 'Percepisce che il tema è delicato e lascia cadere.',
            next: 'n-c',
          },
        ],
      },
      {
        id: 'n-a',
        text: 'Cala il gelo. Tuo padre dice: «Dai, basta, non litigate.» Tua madre ha gli occhi lucidi.',
        choices: [
          {
            id: 'a1',
            label: '«Ha cominciato lei.» Ti alzi e vai in cucina.',
            style: 'impulsiva',
            feedback:
              '“Ha cominciato lei” può essere vero, ma non ferma il ciclo. Il pranzo si chiude con due persone ferite e nessuna che ha detto che cosa sentiva davvero.',
            otherSide: 'Tua madre si sente sola e accusata davanti a tutti.',
            next: null,
          },
          {
            id: 'a2',
            label: 'Dopo pranzo la cerchi: «Ho esagerato. Mi ha fatto male sentirmi paragonato davanti a tutti.»',
            style: 'consapevole',
            feedback:
              'Riconosci la tua mossa e porti alla luce la vergogna. È una forma di riparazione che non nega la ferita ricevuta.',
            otherSide: '«Non volevo umiliarti. Mi preoccupo per te, ma l’ho detto male.»',
            next: null,
          },
        ],
      },
      {
        id: 'n-b',
        text: 'Tornando a casa ti senti svuotato e arrabbiato con te stesso per non aver detto nulla.',
        choices: [
          {
            id: 'b1',
            label: 'Ti ripeti che “tanto è fatta così” e lasci perdere, come sempre.',
            style: 'evitante',
            feedback:
              'Può essere una forma di accettazione, oppure di rassegnazione. Vale la pena chiedersi quale delle due: la differenza si sente nel corpo, tra sollievo e amarezza.',
            otherSide: 'Tua madre continuerà probabilmente a fare commenti simili, ignara dell’effetto.',
            next: null,
          },
          {
            id: 'b2',
            label: 'La chiami la sera: «Oggi quel paragone mi ha fatto sentire piccolo. Te lo dico perché ci tengo a noi.»',
            style: 'consapevole',
            feedback:
              'Dici l’emozione precisa, in privato e con calma. Non puoi controllare la risposta, ma hai dato all’altro un’informazione che prima non aveva.',
            otherSide: 'È sorpresa; dopo un attimo di difesa ammette di non averci pensato.',
            next: null,
          },
        ],
      },
      {
        id: 'n-c',
        text: 'Il pranzo prosegue. La sensazione di vergogna è ancora lì, più leggera.',
        choices: [
          {
            id: 'c1',
            label: 'Più tardi, da soli: «Quando mi paragoni a lui davanti a tutti mi sento giudicato. Preferirei parlarne tra noi.»',
            style: 'consapevole',
            feedback:
              'Osservazione, emozione e richiesta, nel momento e nel luogo giusti. Stai mettendo un confine senza attaccare.',
            otherSide: 'Si sente ascoltata, perché non hai messo in discussione il suo affetto.',
            next: null,
          },
          {
            id: 'c2',
            label: 'Scrivi due righe nel diario su che cosa ha toccato quel commento.',
            style: 'consapevole',
            feedback:
              'La scrittura espressiva può aiutare a mettere ordine. Ricorda però che, se il commento si ripete, potrebbe servire anche una conversazione.',
            otherSide: 'Non sa nulla di ciò che hai provato.',
            next: null,
          },
        ],
      },
    ],
    insight:
      'La vergogna è un’emozione che si nasconde volentieri dietro la rabbia o il silenzio. Riconoscerla toglie forza all’impulso di contrattaccare o sparire.',
    question: 'Quali commenti ti fanno sentire “piccolo/a”? Che cosa toccano di te?',
  },
  {
    id: 'mail-1855',
    lab: 'corpo',
    title: 'La mail delle 18:55',
    relation: 'lavoro',
    context:
      'Venerdì sera, stai per staccare. Arriva una mail della tua responsabile, in copia a tutto il team: «Il report contiene diversi errori. Mi aspettavo più attenzione.» Il cuore accelera, la mascella si serra, le dita sono già sulla tastiera.',
    start: 'start',
    nodes: [
      {
        id: 'start',
        text: 'Il corpo è già in modalità difesa. Che cosa fai nei prossimi due minuti?',
        choices: [
          {
            id: 'a',
            label: 'Rispondi subito a tutti, punto per punto, spiegando perché gli “errori” non sono tuoi.',
            style: 'impulsiva',
            feedback:
              'Ad alta attivazione il pensiero si restringe: vedi l’attacco e vuoi difenderti in pubblico. Una risposta scritta in questo stato resta, e spesso suona più difensiva di come la intendi.',
            otherSide: 'La responsabile si sente contestata davanti al team e si irrigidisce.',
            next: 'n-a',
          },
          {
            id: 'b',
            label: 'Chiudi il portatile di scatto e passi il weekend a rimuginare senza rispondere.',
            style: 'evitante',
            feedback:
              'Staccare può essere saggio, ma se la mente continua a ruminare il corpo resta in allarme per due giorni. La questione non è chiusa, è solo rinviata.',
            otherSide: 'Non riceve risposta e non sa se hai letto.',
            next: 'n-b',
          },
          {
            id: 'c',
            label: 'Noti mascella e respiro. Ti allontani dalla tastiera e fai qualche respiro lento.',
            style: 'consapevole',
            feedback:
              'Riconoscere i segnali precoci ti dà il margine per non eseguire l’impulso. Due minuti non risolvono nulla, ma ti riportano dentro la finestra in cui puoi decidere.',
            otherSide: 'Per ora non succede niente: e a volte è proprio quello che serve.',
            next: 'n-c',
          },
        ],
      },
      {
        id: 'n-a',
        text: 'Mentre scrivi la terza riga, ti accorgi che stai usando il maiuscolo e tre punti esclamativi.',
        choices: [
          {
            id: 'a1',
            label: 'Invii comunque: deve capire che non è giusto.',
            style: 'impulsiva',
            feedback:
              'Il bisogno di giustizia è legittimo; il canale e il momento lo stanno tradendo. Lunedì si parlerà probabilmente del tuo tono, non del merito.',
            otherSide: 'Si sente attaccata e prepara una risposta altrettanto rigida.',
            next: null,
          },
          {
            id: 'a2',
            label: 'Salvi in bozza e ti dai fino a domani mattina.',
            style: 'consapevole',
            feedback:
              'Accorgersi a metà e fermarsi è un’abilità preziosa. Domani rileggerai la bozza con un corpo più calmo, e probabilmente la riscriverai.',
            otherSide: 'Non riceve nulla di affrettato.',
            next: null,
          },
        ],
      },
      {
        id: 'n-b',
        text: 'Domenica sera hai mal di testa e lo stomaco chiuso. Domani ci sarà la riunione di team.',
        choices: [
          {
            id: 'b1',
            label: 'Decidi di fare finta di nulla e vedere come va.',
            style: 'evitante',
            feedback:
              'Rischi di arrivare in riunione già in allerta, pronto a leggere ogni frase come una conferma dell’attacco. L’evitamento protegge oggi e costa domani.',
            otherSide: 'Interpreta il silenzio come indifferenza o come ammissione.',
            next: null,
          },
          {
            id: 'b2',
            label: 'Scrivi a lei sola: «Ho letto la mail. Possiamo vederci 15 minuti per capire quali errori intendi?»',
            style: 'consapevole',
            feedback:
              'Sposti la conversazione in privato e sul concreto. Una richiesta di chiarimento non è una resa: è un modo per tornare ai fatti.',
            otherSide: 'Apprezza il tono e accetta di rivedere il report insieme.',
            next: null,
          },
        ],
      },
      {
        id: 'n-c',
        text: 'Il battito è sceso. Rileggi la mail: è dura, e in copia c’è tutto il team.',
        choices: [
          {
            id: 'c1',
            label: 'Rispondi solo a lei: «Ricevuto. Lunedì verifico i punti e ti propongo un confronto.»',
            style: 'consapevole',
            feedback:
              'Prendi atto senza ammettere né contestare, e togli il pubblico dalla scena. Puoi anche, nel confronto, dire che la copia a tutti ti ha messo a disagio.',
            otherSide: 'Riceve una risposta professionale e abbassa il tono.',
            next: null,
          },
          {
            id: 'c2',
            label: 'Chiami un’amica per sfogarti e decidi di occupartene lunedì.',
            style: 'consapevole',
            feedback:
              'Condividere aiuta a scaricare la tensione e a ottenere un altro punto di vista. Attenzione solo a non trasformare lo sfogo in un rimuginio a due.',
            otherSide: 'Per ora non sa nulla della tua reazione.',
            next: null,
          },
        ],
      },
    ],
    insight:
      'L’attivazione fisica precede la decisione e la condiziona. Riconoscere i segnali del corpo — mascella, respiro, mani — permette di non scrivere ciò che, a mente calma, non scriveresti.',
    question: 'Qual è il tuo “segnale delle 18:55”, quello che ti dice che stai per agire d’impulso?',
  },
  {
    id: 'auto-discussione',
    lab: 'corpo',
    title: 'La discussione in macchina',
    relation: 'coppia',
    context:
      'State guidando verso casa di amici. Una discussione su chi doveva prenotare le vacanze si accende. Le voci si alzano, tu stringi il volante e senti il sangue pulsare nelle tempie.',
    start: 'start',
    nodes: [
      {
        id: 'start',
        text: 'Siete in uno spazio chiuso e tu sei alla guida. Cosa fai?',
        choices: [
          {
            id: 'a',
            label: 'Alzi ancora la voce e acceleri: «Allora fallo tu, visto che sei così brava!»',
            style: 'impulsiva',
            feedback:
              'In uno stato di forte attivazione, la guida stessa diventa più rischiosa. Qui la questione non è solo relazionale: è di sicurezza.',
            otherSide: 'Ha paura, oltre che rabbia. Si aggrappa alla maniglia.',
            next: 'n-a',
          },
          {
            id: 'b',
            label: 'Smetti di rispondere e accendi la radio a volume alto.',
            style: 'evitante',
            feedback:
              'Ti sottrai all’escalation, ma la radio comunica “non ti ascolto”. L’altra persona resta sola con la sua attivazione.',
            otherSide: 'Si sente zittita e ancora più arrabbiata.',
            next: 'n-b',
          },
          {
            id: 'c',
            label: '«Mi sto agitando troppo per guidare e discutere insieme. Ne parliamo quando siamo fermi?»',
            style: 'consapevole',
            feedback:
              'Nomini il tuo stato e proponi una pausa con un ritorno. Non stai chiudendo la discussione: la stai spostando in un momento in cui può andare meglio.',
            otherSide: 'È ancora tesa, ma riconosce che hai ragione.',
            next: 'n-c',
          },
        ],
      },
      {
        id: 'n-a',
        text: 'Lei grida: «Rallenta!» Ti accorgi di andare troppo veloce.',
        choices: [
          {
            id: 'a1',
            label: 'Rallenti, ma continui a discutere a denti stretti.',
            style: 'impulsiva',
            feedback:
              'Hai ridotto il rischio immediato ma l’attivazione è ancora alta. La discussione in questo stato difficilmente porterà a qualcosa.',
            otherSide: 'Resta spaventata e smette di parlare.',
            next: null,
          },
          {
            id: 'a2',
            label: 'Accosti appena possibile, scendi un minuto e respiri.',
            style: 'consapevole',
            feedback:
              'Fermarti fisicamente è la scelta più protettiva. Una volta più calmo, potrai anche riconoscere che lo spavento che le hai fatto prendere merita una riparazione.',
            otherSide: 'Si sente al sicuro. Ha bisogno che tu riconosca la paura che ha provato.',
            next: null,
          },
        ],
      },
      {
        id: 'n-b',
        text: 'Lei abbassa la radio: «Quindi adesso non mi parli più?»',
        choices: [
          {
            id: 'b1',
            label: '«Non ho niente da dire.»',
            style: 'evitante',
            feedback:
              'La chiusura senza spiegazione può essere vissuta come una punizione. Comunicare il bisogno di pausa cambierebbe molto il significato dello stesso silenzio.',
            otherSide: 'Si sente rifiutata e insiste ancora di più.',
            next: null,
          },
          {
            id: 'b2',
            label: '«Scusa, la radio è stata brusca. Sono troppo agitato: ti va se ne parliamo dopo cena?»',
            style: 'consapevole',
            feedback:
              'Ripari il gesto e trasformi il ritiro in una pausa dichiarata. Il silenzio che segue avrà un significato diverso per entrambi.',
            otherSide: 'Accetta, con un sospiro di sollievo.',
            next: null,
          },
        ],
      },
      {
        id: 'n-c',
        text: 'Restate in silenzio. Tu senti ancora il calore nel petto.',
        choices: [
          {
            id: 'c1',
            label: 'Fai respiri lenti, allungando l’espirazione, e ti concentri sulla strada.',
            style: 'consapevole',
            feedback:
              'Un’espirazione più lunga dell’inspirazione è una delle tecniche più semplici per abbassare l’attivazione. Il corpo ha bisogno di qualche minuto: è normale.',
            otherSide: 'Nota che ti stai calmando e si rilassa a sua volta.',
            next: null,
          },
          {
            id: 'c2',
            label: 'Al ritorno, a casa: «Riprendiamo il discorso delle vacanze? Adesso ce la faccio.»',
            style: 'consapevole',
            feedback:
              'Il ritorno è ciò che distingue la pausa dalla fuga. Riprendere tu il discorso dimostra che non lo stavi evitando.',
            otherSide: 'Si sente presa sul serio.',
            next: null,
          },
        ],
      },
    ],
    insight:
      'Quando il corpo è oltre la finestra di tolleranza, la priorità è tornare dentro, non vincere la discussione. Una pausa dichiarata, con un ritorno, protegge entrambi.',
    question: 'In quali situazioni sarebbe utile per te avere una “frase di pausa” già pronta?',
  },
  {
    id: 'visualizzato',
    lab: 'fatti',
    title: 'Visualizzato, nessuna risposta',
    relation: 'amicizia',
    context:
      'Hai scritto a un’amica un messaggio lungo e personale su un momento difficile. Vedi la doppia spunta blu. Passano tre ore. Poi noti che ha pubblicato una storia sui social.',
    start: 'start',
    nodes: [
      {
        id: 'start',
        text: 'La mente parte. Cosa ti dici?',
        choices: [
          {
            id: 'a',
            label: '“Le importa più dei social che di me. Ecco chi è davvero.”',
            style: 'impulsiva',
            feedback:
              'Fatto: ha letto e ha pubblicato una storia. Interpretazione: non le importa di te. Dal fatto all’interpretazione c’è un salto, e la conclusione sul suo carattere è il salto più lungo.',
            otherSide: 'Non sa ancora nulla di ciò che stai pensando.',
            next: 'n-a',
          },
          {
            id: 'b',
            label: '“Ho esagerato a scriverle tutto. Mai più.”',
            style: 'evitante',
            feedback:
              'È una forma di personalizzazione: il silenzio diventa la prova che hai sbagliato tu. Così proteggi il legame accusando te stesso, ma rischi di chiuderti.',
            otherSide: 'Forse sta cercando le parole giuste per risponderti.',
            next: 'n-b',
          },
          {
            id: 'c',
            label: 'Separi: fatto “ha letto e non ha risposto”; interpretazioni possibili, più di una.',
            style: 'consapevole',
            feedback:
              'Tenere più ipotesi aperte (non ha tempo ora, vuole rispondere bene, è a disagio, si è distratta) non elimina il dispiacere, ma impedisce che una sola lettura decida per te.',
            otherSide: 'Non sa nulla; e nulla di irreparabile è ancora successo.',
            next: 'n-c',
          },
        ],
      },
      {
        id: 'n-a',
        text: 'La rabbia cresce. Hai il telefono in mano.',
        choices: [
          {
            id: 'a1',
            label: 'Scrivi: «Vedo che hai tempo per le storie ma non per me. Grazie.»',
            style: 'impulsiva',
            feedback:
              'Un messaggio che parte dall’interpretazione come se fosse un fatto. Se l’ipotesi era sbagliata, lei si sentirà accusata ingiustamente; se era giusta, si difenderà comunque.',
            otherSide: '«Stavo pensando a come risponderti bene! Che cosa ti prende?»',
            next: null,
          },
          {
            id: 'a2',
            label: 'Ti fermi: “Sto leggendo il pensiero. Aspetto fino a domani.”',
            style: 'consapevole',
            feedback:
              'Riconoscere la lettura del pensiero mentre accade è difficile e prezioso. Aspettare non significa rinunciare a dire che ci sei rimasto male.',
            otherSide: 'La sera ti risponde con un lungo messaggio affettuoso.',
            next: null,
          },
        ],
      },
      {
        id: 'n-b',
        text: 'Il giorno dopo lei ti scrive: «Scusa, ieri ero di corsa. Come stai?»',
        choices: [
          {
            id: 'b1',
            label: '«Tutto ok, non preoccuparti. Lascia stare quello che ti ho scritto.»',
            style: 'evitante',
            feedback:
              'Minimizzi per non sembrare troppo bisognoso. Ma lei ti sta offrendo esattamente lo spazio che cercavi.',
            otherSide: 'Pensa che tu stia meglio e non insiste.',
            next: null,
          },
          {
            id: 'b2',
            label: '«Ieri ci sono rimasto un po’ male, ho pensato di averti caricato troppo. Mi fa piacere sentirti.»',
            style: 'consapevole',
            feedback:
              'Condividi l’interpretazione come tua (“ho pensato”) e non come accusa. Lei può correggerla.',
            otherSide: '«Ma no! Volevo solo risponderti con calma.»',
            next: null,
          },
        ],
      },
      {
        id: 'n-c',
        text: 'Il dispiacere c’è ancora. Cosa ne fai?',
        choices: [
          {
            id: 'c1',
            label: 'La sera scrivi: «Ehi, quando hai un momento mi farebbe piacere sentirti su quello che ti ho scritto.»',
            style: 'consapevole',
            feedback:
              'Esprimi un bisogno senza accusa. Se la risposta non arriva neanche dopo, avrai un dato in più, non solo un’ipotesi.',
            otherSide: 'Ti chiama subito: era in ufficio e voleva rispondere con calma.',
            next: null,
          },
          {
            id: 'c2',
            label: 'Ti dai il permesso di essere dispiaciuto senza dover concludere nulla.',
            style: 'consapevole',
            feedback:
              'Tollerare l’incertezza è un’abilità sottovalutata. L’emozione può esistere senza che tu debba trovarle subito una spiegazione definitiva.',
            otherSide: 'Il giorno dopo ti risponde.',
            next: null,
          },
        ],
      },
    ],
    insight:
      'Spunte blu e storie sono fatti. Che cosa significano è un’interpretazione. Separare i due livelli permette di chiedere invece di accusare.',
    question: 'Quale interpretazione ti viene più spontanea quando qualcuno non ti risponde?',
  },
  {
    id: 'riunione-progetto',
    lab: 'fatti',
    title: 'Il progetto in riunione',
    relation: 'lavoro',
    context:
      'In riunione con la direzione, un collega presenta il progetto a cui avete lavorato insieme per due mesi. Parla sempre al singolare, «ho pensato», «ho sviluppato», e non ti nomina.',
    start: 'start',
    nodes: [
      {
        id: 'start',
        text: 'Senti un colpo allo stomaco. Che cosa fai durante la riunione?',
        choices: [
          {
            id: 'a',
            label: 'Lo interrompi: «Scusate, questo l’abbiamo fatto in due, anzi l’idea era mia.»',
            style: 'impulsiva',
            feedback:
              'Rivendichi il tuo lavoro, ed è legittimo. Ma farlo interrompendo, davanti alla direzione, rischia di spostare l’attenzione dal progetto al conflitto tra voi.',
            otherSide: 'Si sente smascherato in pubblico, anche se magari non era intenzionale.',
            next: 'n-a',
          },
          {
            id: 'b',
            label: 'Non dici nulla, ma dentro decidi che non collaborerai più con lui.',
            style: 'evitante',
            feedback:
              'Prendi una decisione importante sulla base di un’interpretazione (“vuole rubarmi il merito”) non ancora verificata. Potrebbe essere vera, oppure no.',
            otherSide: 'Non sa che qualcosa è cambiato.',
            next: 'n-b',
          },
          {
            id: 'c',
            label: 'Annoti il fatto: “Ha detto ‘ho’ e non mi ha nominato.” Al momento delle domande aggiungi un contributo tecnico.',
            style: 'consapevole',
            feedback:
              'Dai visibilità al tuo lavoro in modo non conflittuale e conservi il fatto esatto per un confronto successivo, senza averlo già trasformato in un giudizio.',
            otherSide: 'Nota il tuo intervento e forse si rende conto di qualcosa.',
            next: 'n-c',
          },
        ],
      },
      {
        id: 'n-a',
        text: 'Lui risponde, imbarazzato: «Certo, certo, abbiamo lavorato insieme.» La direzione cambia argomento.',
        choices: [
          {
            id: 'a1',
            label: 'Alla macchinetta del caffè racconti a tutti che si è preso il merito.',
            style: 'impulsiva',
            feedback:
              'Trasformi un’interpretazione in reputazione pubblica, senza averla verificata con lui. Se ti sbagliavi, il danno è difficile da riparare.',
            otherSide: 'Viene a saperlo e si sente tradito.',
            next: null,
          },
          {
            id: 'a2',
            label: 'Più tardi lo cerchi: «Ti ho interrotto in modo brusco. Ma ci sono rimasto male: mi sono sentito invisibile.»',
            style: 'consapevole',
            feedback:
              'Ripari il modo senza rinunciare al contenuto. Riconoscere la tua mossa rende più facile per lui riconoscere la sua.',
            otherSide: '«Hai ragione, ero agitato e ho parlato come se fosse solo mio. Scusa.»',
            next: null,
          },
        ],
      },
      {
        id: 'n-b',
        text: 'Una settimana dopo ti propone di lavorare insieme al progetto successivo.',
        choices: [
          {
            id: 'b1',
            label: '«No, grazie, ho già troppo da fare.»',
            style: 'evitante',
            feedback:
              'Il rifiuto è coerente con la tua decisione interna, ma lui non ne conosce il motivo. Il malinteso, se c’era, resterà tale.',
            otherSide: 'Si chiede che cosa sia successo.',
            next: null,
          },
          {
            id: 'b2',
            label: '«Prima vorrei parlarti di come è andata la presentazione: lì non mi sono sentito riconosciuto.»',
            style: 'consapevole',
            feedback:
              'Porti il fatto e la tua emozione, e lasci a lui lo spazio di spiegare. È anche l’occasione per accordarvi sulla prossima volta.',
            otherSide: 'Non se n’era accorto e propone di presentare insieme.',
            next: null,
          },
        ],
      },
      {
        id: 'n-c',
        text: 'Finita la riunione, siete soli in corridoio.',
        choices: [
          {
            id: 'c1',
            label: '«Durante la presentazione hai parlato sempre al singolare e non mi hai nominato. Come mai?»',
            style: 'consapevole',
            feedback:
              'Un fatto preciso e una domanda aperta. Non hai rinunciato a segnalare il problema; hai lasciato spazio alla sua versione.',
            otherSide: '«Davvero? Ero così agitato che non me ne sono accorto. Mi dispiace.»',
            next: null,
          },
          {
            id: 'c2',
            label: '«La prossima volta vorrei presentare la mia parte io. Ti va bene?»',
            style: 'consapevole',
            feedback:
              'Una richiesta orientata al futuro. Utile, anche se lascia senza nome ciò che è successo oggi: valuta se ti basta.',
            otherSide: 'Accetta volentieri.',
            next: null,
          },
        ],
      },
    ],
    insight:
      '“Non mi ha nominato” è un fatto. “Vuole rubarmi il merito” è un’ipotesi sulle intenzioni. Verificarla prima di agire può proteggere sia il riconoscimento sia la relazione.',
    question: 'Quando ti senti non riconosciuto/a, tendi a interrompere, a tacere o a chiedere?',
  },
];
