import type { Scenario } from '../../types';

/** Scenari dei laboratori 4–6: ciclo, doppio punto di vista, impatto. */
export const scenariosPart2: Scenario[] = [
  {
    id: 'faccende',
    lab: 'ciclo',
    title: 'Il solito discorso sulle faccende',
    relation: 'coppia',
    context:
      'Torni a casa e trovi di nuovo i piatti nel lavello. È la terza volta questa settimana. Il tuo partner è sul divano. Ne avete già parlato, e ogni volta finisce con lui che si chiude e tu che alzi la voce.',
    start: 'start',
    nodes: [
      {
        id: 'start',
        text: 'Conosci già questa scena. Come la apri, stavolta?',
        choices: [
          {
            id: 'a',
            label: '«Ovviamente. Tu sul divano e i piatti lì. Come sempre.»',
            style: 'impulsiva',
            feedback:
              'Hai appena eseguito la tua parte della “danza”: protesta che diventa critica. Probabilmente lui eseguirà la sua: chiusura. E il ciclo ripartirà.',
            otherSide: 'Pensa: “Eccola, appena entra mi attacca.” E si irrigidisce.',
            next: 'n-a',
          },
          {
            id: 'b',
            label: 'Li lavi tu, sbattendo un po’ i piatti, senza dire niente.',
            style: 'evitante',
            feedback:
              'I piatti sbattuti parlano, ma in un linguaggio difficile da interpretare. Il carico resta su di te, e il risentimento cresce.',
            otherSide: 'Sente il rumore, capisce che sei arrabbiata, e preferisce non chiedere.',
            next: 'n-b',
          },
          {
            id: 'c',
            label: 'Ti fermi: “Ecco il nostro ciclo. Se attacco, lui si chiude.” Ti siedi accanto a lui.',
            style: 'consapevole',
            feedback:
              'Riconoscere il ciclo mentre inizia è il primo modo per uscirne. Non hai rinunciato al tema: hai scelto un altro ingresso.',
            otherSide: 'È sorpreso: si aspettava un rimprovero.',
            next: 'n-c',
          },
        ],
      },
      {
        id: 'n-a',
        text: 'Lui risponde senza staccare gli occhi dal telefono: «Li faccio dopo.» E non dice altro.',
        choices: [
          {
            id: 'a1',
            label: '«Dopo quando? È sempre dopo! Mi ascolti quando parlo?»',
            style: 'impulsiva',
            feedback:
              'Più lui si ritira, più tu insegui. Ciascuno vede la propria mossa come risposta a quella dell’altro. Il volume sale, il contatto scende.',
            otherSide: 'Si sente sommerso e si chiude ancora di più, magari esce dalla stanza.',
            next: null,
          },
          {
            id: 'a2',
            label: '«Scusa, sono partita male. È che mi sento sola a tenere in piedi la casa.»',
            style: 'consapevole',
            feedback:
              'Interrompi il ciclo dall’interno, mostrando la paura sotto la protesta: non i piatti, ma il sentirsi soli. È a questa che l’altro può rispondere.',
            otherSide: 'Posa il telefono: «Non sapevo che la vivessi così.»',
            next: null,
          },
        ],
      },
      {
        id: 'n-b',
        text: 'Più tardi lui ti chiede, cauto: «Va tutto bene?»',
        choices: [
          {
            id: 'b1',
            label: '«Benissimo.» Con un tono che dice il contrario.',
            style: 'evitante',
            feedback:
              'Il doppio messaggio (parole calme, tono gelido) è uno dei più difficili da ricevere: l’altro non sa a quale credere, e spesso sceglie di non indagare.',
            otherSide: 'Decide che è meglio lasciarti stare. Il ciclo si conferma.',
            next: null,
          },
          {
            id: 'b2',
            label: '«No. Credo che siamo di nuovo nel nostro solito giro sui piatti. Possiamo guardarlo insieme?»',
            style: 'consapevole',
            feedback:
              'Nominare il ciclo come “nostro” toglie la colpa a entrambi e lo trasforma in un problema comune da risolvere.',
            otherSide: 'Si sente meno sotto accusa e più coinvolto.',
            next: null,
          },
        ],
      },
      {
        id: 'n-c',
        text: 'Seduta accanto a lui, senti ancora l’irritazione. Ma lui ti guarda.',
        choices: [
          {
            id: 'c1',
            label: '«Quando trovo i piatti, mi sento sola. Mi serve che troviamo un sistema che funzioni per entrambi.»',
            style: 'consapevole',
            feedback:
              'Osservazione, emozione, bisogno, apertura a una soluzione condivisa. Lui ha qualcosa di concreto a cui rispondere.',
            otherSide: '«Ok. Facciamo che la sera la cucina è mia, e tu ti occupi del bucato?»',
            next: null,
          },
          {
            id: 'c2',
            label: '«Lo sai di cosa voglio parlare, vero?»',
            style: 'impulsiva',
            feedback:
              'Una domanda retorica che mette l’altro sotto esame. Nonostante il buon ingresso, l’attacco implicito rischia di riattivare la sua difesa.',
            otherSide: 'Sospira: «I piatti. Lo so.» E il tono si raffredda.',
            next: null,
          },
        ],
      },
    ],
    insight:
      'Nei conflitti ricorrenti, il vero avversario è spesso il ciclo: protesta e ritiro che si alimentano a vicenda. Vederlo insieme è più efficace che cercare chi ha cominciato.',
    question: 'C’è un “solito discorso” nella tua vita? Qual è la tua mossa abituale, e quale quella dell’altro?',
  },
  {
    id: 'figlio-telefono',
    lab: 'ciclo',
    title: 'Il telefono a tavola',
    relation: 'famiglia',
    context:
      'Tuo figlio di quindici anni è a tavola con il telefono in mano. Gli hai già chiesto due volte di metterlo via. Lui sbuffa: «Un attimo!» Senti la pazienza esaurirsi.',
    start: 'start',
    nodes: [
      {
        id: 'start',
        text: 'Terza volta. Che cosa fai?',
        choices: [
          {
            id: 'a',
            label: 'Gli strappi il telefono di mano: «Basta! Te lo sequestro per una settimana!»',
            style: 'impulsiva',
            feedback:
              'Il gesto fisico e la punizione decisa sul momento fanno salire l’escalation. Il tema non è più il telefono, ma chi vince.',
            otherSide: 'Si sente umiliato e invaso. Pensa: “Mi tratta come un bambino.”',
            next: 'n-a',
          },
          {
            id: 'b',
            label: 'Lasci perdere: «Fai come vuoi.» E mangi in silenzio.',
            style: 'evitante',
            feedback:
              'Eviti lo scontro, ma comunichi rassegnazione. La regola perde forza e la tua frustrazione resta dentro.',
            otherSide: 'Capisce che ha “vinto”, ma sente anche la tua distanza.',
            next: 'n-b',
          },
          {
            id: 'c',
            label: 'Noti che stai per esplodere. Respiri e dici con calma: «Lo appoggi sul mobile, per favore. Ti aspetto.»',
            style: 'consapevole',
            feedback:
              'Fermezza senza aggressione: richiesta chiara, tono basso, tempo per eseguire. Mantenere la calma non significa rinunciare alla regola.',
            otherSide: 'Sbuffa, ma capisce che è una richiesta seria.',
            next: 'n-c',
          },
        ],
      },
      {
        id: 'n-a',
        text: 'Lui si alza di scatto: «Ti odio!» E sbatte la porta della camera.',
        choices: [
          {
            id: 'a1',
            label: '«E adesso sono due settimane!» gridi verso la porta.',
            style: 'impulsiva',
            feedback:
              'Ogni mossa di uno alimenta quella dell’altro. Più la punizione sale, più si consolida l’idea che il conflitto sia una lotta di potere.',
            otherSide: 'Si chiude ancora di più. La sera non esce dalla camera.',
            next: null,
          },
          {
            id: 'a2',
            label: 'Dopo un’ora bussi: «Ho esagerato a strapparti il telefono. La regola resta, ma il modo era sbagliato.»',
            style: 'consapevole',
            feedback:
              'Separi il contenuto (la regola) dal modo (il gesto). Riparare con un adolescente non indebolisce l’autorità: mostra come si fa.',
            otherSide: 'Borbotta «ok», ma qualcosa si scioglie.',
            next: null,
          },
        ],
      },
      {
        id: 'n-b',
        text: 'Il giorno dopo la scena si ripete. E il giorno dopo ancora.',
        choices: [
          {
            id: 'b1',
            label: 'Una sera esplodi per una cosa minima, accumulata da giorni.',
            style: 'impulsiva',
            feedback:
              'L’evitamento ripetuto spesso prepara l’esplosione. L’altro non capisce la sproporzione, perché non ha visto l’accumulo.',
            otherSide: 'Pensa: “Ma che cosa le prende? Non ho fatto niente di diverso.”',
            next: null,
          },
          {
            id: 'b2',
            label: 'In un momento tranquillo proponi: «Parliamo di una regola per il telefono a tavola che valga per tutti, anche per me.»',
            style: 'consapevole',
            feedback:
              'Affronti il tema fuori dal momento caldo e includi te stesso nella regola. Più facile da accettare per un adolescente.',
            otherSide: 'È sospettoso, ma apprezza il “vale anche per me”.',
            next: null,
          },
        ],
      },
      {
        id: 'n-c',
        text: 'Lui appoggia il telefono, ma con aria offesa: «Contento?»',
        choices: [
          {
            id: 'c1',
            label: '«Sì, grazie. Com’è andata oggi la verifica?»',
            style: 'consapevole',
            feedback:
              'Non raccogli la provocazione e riapri il contatto. Il messaggio è: la regola è chiusa, la relazione è aperta.',
            otherSide: 'Dopo un attimo, inizia a raccontare.',
            next: null,
          },
          {
            id: 'c2',
            label: '«Non usare quel tono con me.»',
            style: 'impulsiva',
            feedback:
              'Comprensibile, ma riapre una seconda battaglia appena chiusa la prima. A volte lasciar passare un sospiro è la mossa più strategica.',
            otherSide: 'Si irrigidisce e la cena resta tesa.',
            next: null,
          },
        ],
      },
    ],
    insight:
      'Con i figli adolescenti, l’escalation trasforma una regola in una lotta di potere. Fermezza calma e riparazione dopo gli eccessi insegnano più di qualsiasi punizione.',
    question: 'In quali situazioni familiari senti che “la pazienza si esaurisce”? Che cosa la consuma prima?',
  },
  {
    id: 'amica-annulla',
    lab: 'prospettive',
    title: 'L’amica che annulla',
    relation: 'amicizia',
    context:
      'Un’amica ti scrive un’ora prima: «Scusa, stasera non ce la faccio, rimandiamo?» È la terza volta in un mese. Avevi organizzato tutto.',
    start: 'start',
    nodes: [
      {
        id: 'start',
        text: 'Leggi il messaggio. Qual è la tua prima mossa?',
        choices: [
          {
            id: 'a',
            label: '«Come sempre. Ormai ci sono abituata.»',
            style: 'impulsiva',
            feedback:
              'Il messaggio esprime una delusione vera, ma in forma di rimprovero. Lei sentirà l’accusa e probabilmente si giustificherà.',
            otherSide: 'Si sente in colpa e attaccata insieme: “Non sa cosa sto passando.”',
            next: 'n-a',
          },
          {
            id: 'b',
            label: '«Nessun problema!» E ti ripeti che non la cercherai più.',
            style: 'evitante',
            feedback:
              'Rispondi in modo gentile ma prendi una decisione silenziosa. L’amicizia potrebbe raffreddarsi senza che nessuna delle due sappia davvero perché.',
            otherSide: 'È sollevata e non immagina quanto ci sei rimasta male.',
            next: 'n-b',
          },
          {
            id: 'c',
            label: 'Prima di rispondere ti chiedi: come potrebbe stare lei, per annullare tre volte?',
            style: 'consapevole',
            feedback:
              'Non stai rinunciando alla tua delusione; stai aggiungendo una seconda prospettiva. Tre annullamenti possono voler dire disinteresse, ma anche un periodo difficile.',
            otherSide: 'Sta aspettando la tua risposta con un po’ di ansia.',
            next: 'n-c',
          },
        ],
      },
      {
        id: 'n-a',
        text: 'Lei risponde: «Scusa se ho una vita complicata. Non tutti hanno il tuo tempo libero.»',
        choices: [
          {
            id: 'a1',
            label: '«Il mio tempo libero? Ho dovuto organizzare tutto io!»',
            style: 'impulsiva',
            feedback:
              'Ora state difendendo ciascuna la vostra versione, e nessuna sta ascoltando l’altra. È il momento in cui spesso le amicizie si incrinano su cose piccole.',
            otherSide: 'Non risponde più.',
            next: null,
          },
          {
            id: 'a2',
            label: '«Hai ragione, non so cosa stai passando. Mi è dispiaciuto, ma vorrei capire: come stai davvero?»',
            style: 'consapevole',
            feedback:
              'Riconosci di non conoscere la sua versione e mostri interesse. Hai detto il tuo dispiacere senza farne un’accusa.',
            otherSide: '«Scusa. È un periodo pesante a casa. Non te l’ho detto.»',
            next: null,
          },
        ],
      },
      {
        id: 'n-b',
        text: 'Due settimane dopo, lei ti scrive per proporre un caffè.',
        choices: [
          {
            id: 'b1',
            label: 'Non rispondi per qualche giorno, “così capisce come ci si sente”.',
            style: 'evitante',
            feedback:
              'Restituire la stessa esperienza può sembrare giusto, ma lei non ha gli elementi per capire il messaggio. Rischia di sembrarle solo distanza.',
            otherSide: 'Pensa di aver fatto qualcosa di sbagliato, ma non sa cosa.',
            next: null,
          },
          {
            id: 'b2',
            label: 'Accetti, e al caffè le dici che gli ultimi annullamenti ti hanno fatto sentire poco importante.',
            style: 'consapevole',
            feedback:
              'Parlarne di persona, a distanza di tempo, permette di essere più calme. E le dà la possibilità di raccontare la sua parte.',
            otherSide: 'Ti spiega cosa sta succedendo e ti ringrazia per averglielo detto.',
            next: null,
          },
        ],
      },
      {
        id: 'n-c',
        text: 'Ti viene in mente che ultimamente parlava poco di sé e sembrava stanca.',
        choices: [
          {
            id: 'c1',
            label: '«Ci sono rimasta male, non te lo nascondo. Ma mi chiedo se stai bene: è un periodo difficile?»',
            style: 'consapevole',
            feedback:
              'Tieni insieme le due prospettive: la tua delusione e la sua possibile difficoltà. È questo il doppio punto di vista: non scegliere tra te e lei.',
            otherSide: 'Si sente vista: «Sì, scusa. Ti racconto.»',
            next: null,
          },
          {
            id: 'c2',
            label: '«Tranquilla, capisco. Quando vuoi ci sono.»',
            style: 'evitante',
            feedback:
              'Una risposta generosa. Valuta solo se hai rinunciato del tutto alla tua parte: se la delusione resta, potrebbe servire nominarla più avanti.',
            otherSide: 'Si sente accolta.',
            next: null,
          },
        ],
      },
    ],
    insight:
      'Il doppio punto di vista non chiede di rinunciare al proprio dispiacere, ma di affiancargli una domanda sull’altro. Spesso la versione dell’altra persona cambia il senso dell’intera scena.',
    question: 'C’è qualcuno di cui hai dato per scontato il motivo, senza chiederglielo?',
  },
  {
    id: 'collega-lento',
    lab: 'prospettive',
    title: 'Il collega in ritardo',
    relation: 'lavoro',
    context:
      'Aspetti da una settimana i dati di un collega per chiudere un lavoro. Ti aveva promesso lunedì; è giovedì. Il tuo pensiero è chiaro: “Non gli importa, fa sempre il minimo.”',
    start: 'start',
    nodes: [
      {
        id: 'start',
        text: 'Lo incroci in corridoio. Come ti muovi?',
        choices: [
          {
            id: 'a',
            label: '«Allora, questi dati? O devo fare anche il tuo lavoro?»',
            style: 'impulsiva',
            feedback:
              'Il tono dà per scontata la tua interpretazione: indifferenza, pigrizia. È l’errore fondamentale di attribuzione: il suo ritardo è “carattere”, il tuo sarebbe “circostanze”.',
            otherSide: 'Si sente aggredito senza che tu sappia cosa sta vivendo.',
            next: 'n-a',
          },
          {
            id: 'b',
            label: 'Lo saluti normalmente, poi scrivi al responsabile lamentandoti di lui.',
            style: 'evitante',
            feedback:
              'Eviti il confronto diretto e porti il problema a un livello superiore. Lui lo scoprirà, e il conflitto diventerà più grande e meno risolvibile.',
            otherSide: 'Si sentirà scavalcato.',
            next: 'n-b',
          },
          {
            id: 'c',
            label: '«Ciao, ti volevo chiedere dei dati: ho bisogno di chiudere entro domani. Com’è la situazione?»',
            style: 'consapevole',
            feedback:
              'Esprimi il tuo bisogno con chiarezza (scadenza) e fai una domanda aperta. Così lasci spazio a informazioni che non conosci.',
            otherSide: 'Si sente interpellato, non accusato.',
            next: 'n-c',
          },
        ],
      },
      {
        id: 'n-a',
        text: 'Lui si ferma: «Mio padre è in ospedale da sabato. Sto facendo quello che posso.»',
        choices: [
          {
            id: 'a1',
            label: '«Potevi dirlo, però. Anch’io ho le mie scadenze.»',
            style: 'impulsiva',
            feedback:
              'Il bisogno di comunicazione è legittimo, ma in questo momento suona come una seconda accusa. Riconoscere prima la sua situazione renderebbe la tua richiesta più ascoltabile.',
            otherSide: 'Si sente solo e poco considerato.',
            next: null,
          },
          {
            id: 'a2',
            label: '«Mi dispiace, non lo sapevo. Scusa per il tono. Vediamo come ci organizziamo?»',
            style: 'consapevole',
            feedback:
              'Riconosci l’impatto, ti scusi e torni al problema pratico insieme. Il bisogno di chiudere resta, ma ora è un problema condiviso.',
            otherSide: 'È sollevato: «Grazie. Stasera ti mando quello che ho.»',
            next: null,
          },
        ],
      },
      {
        id: 'n-b',
        text: 'Il responsabile vi convoca entrambi. Il collega racconta che suo padre è in ospedale.',
        choices: [
          {
            id: 'b1',
            label: '«Comunque il lavoro va fatto.»',
            style: 'impulsiva',
            feedback:
              'È vero, ma la frase ignora completamente la sua situazione. Davanti al responsabile, rischia di definirti più di quanto definisca lui.',
            otherSide: 'Si sente tradito due volte.',
            next: null,
          },
          {
            id: 'b2',
            label: '«Non lo sapevo. Avrei dovuto parlarti prima di scrivere. Troviamo una soluzione?»',
            style: 'consapevole',
            feedback:
              'Riconoscere davanti a un terzo di aver saltato un passaggio richiede coraggio. È anche il modo più rapido per ricostruire la collaborazione.',
            otherSide: 'È sorpreso dalla tua franchezza.',
            next: null,
          },
        ],
      },
      {
        id: 'n-c',
        text: 'Lui sospira: «Scusa. Ho mio padre in ospedale, sto andando a rilento.»',
        choices: [
          {
            id: 'c1',
            label: '«Mi dispiace. Dimmi cosa hai già: magari il resto lo ricostruisco io, o chiediamo una proroga.»',
            style: 'consapevole',
            feedback:
              'Tieni insieme il suo momento difficile e il tuo bisogno di chiudere, cercando una soluzione praticabile. Questa è collaborazione sotto stress.',
            otherSide: 'Si sente sostenuto e ti manda subito ciò che ha.',
            next: null,
          },
          {
            id: 'c2',
            label: '«Non preoccuparti, faccio tutto io.»',
            style: 'evitante',
            feedback:
              'Generoso, ma attenzione al carico: se poi non riesci a reggerlo, il risentimento potrebbe tornare. Il tuo bisogno conta quanto il suo.',
            otherSide: 'È grato, ma non sa quanto ti costa.',
            next: null,
          },
        ],
      },
    ],
    insight:
      'Quando giudichiamo gli altri, tendiamo ad attribuire il loro comportamento al carattere; quando giudichiamo noi stessi, alle circostanze. Una domanda aperta può rivelare una situazione che non immaginavi.',
    question: 'Chi, nella tua vita, giudichi più spesso “per carattere”? Che cosa potresti non sapere della sua situazione?',
  },
  {
    id: 'battuta',
    lab: 'impatto',
    title: 'La battuta davanti agli amici',
    relation: 'coppia',
    context:
      'A cena con amici racconti, ridendo, di quando il tuo partner si è perso usando il navigatore: «Non sa nemmeno leggere una mappa, figuratevi.» Tutti ridono. Lui sorride, poi diventa silenzioso per il resto della serata.',
    start: 'start',
    nodes: [
      {
        id: 'start',
        text: 'Ti accorgi del suo silenzio. Che cosa ne fai?',
        choices: [
          {
            id: 'a',
            label: '«Dai, era una battuta! Non fare il permaloso.»',
            style: 'impulsiva',
            feedback:
              'È una risposta difensiva: sposti il problema sulla sua sensibilità. L’intenzione era scherzosa, ma l’impatto non lo è stato, e negarlo lo raddoppia.',
            otherSide: 'Si sente ridicolizzato due volte: prima la battuta, ora la sua reazione.',
            next: 'n-a',
          },
          {
            id: 'b',
            label: 'Fai finta di niente: probabilmente gli passerà.',
            style: 'evitante',
            feedback:
              'Eviti il disagio di parlarne in pubblico. Il rischio è che lui lo interpreti come indifferenza al suo stato d’animo.',
            otherSide: 'Pensa: “Non se ne è nemmeno accorta.”',
            next: 'n-b',
          },
          {
            id: 'c',
            label: 'Gli chiedi a bassa voce: «Ti ha dato fastidio quello che ho detto?»',
            style: 'consapevole',
            feedback:
              'Ti accorgi che l’impatto può essere diverso dall’intenzione e verifichi invece di presumere. Già questa domanda è una forma di cura.',
            otherSide: 'Si sente visto, anche se è ancora ferito.',
            next: 'n-c',
          },
        ],
      },
      {
        id: 'n-a',
        text: 'Tornando a casa lui dice: «Mi hai fatto fare la figura dello stupido davanti a tutti.»',
        choices: [
          {
            id: 'a1',
            label: '«Ma ridevano tutti, anche tu! Non puoi pretendere che io indovini.»',
            style: 'impulsiva',
            feedback:
              'Difensività: rispondi a una ferita con una giustificazione. Il suo sorriso a cena non significava che stava bene: spesso si sorride per non esporsi.',
            otherSide: 'Si chiude: “Non ha capito niente.”',
            next: null,
          },
          {
            id: 'a2',
            label: '«Hai ragione. Per me era uno scherzo, ma vedo che ti ha ferito. Mi dispiace, non lo farò più.»',
            style: 'consapevole',
            feedback:
              'Riconoscimento dell’impatto, scuse senza “ma”, impegno per il futuro. L’intenzione non viene negata, ma non viene usata come scudo.',
            otherSide: 'Si rilassa: «Grazie. Mi bastava questo.»',
            next: null,
          },
        ],
      },
      {
        id: 'n-b',
        text: 'Il giorno dopo è ancora freddo. Ti chiede: «Ti sembra normale prendermi in giro così?»',
        choices: [
          {
            id: 'b1',
            label: '«Esagerato. Anche tu fai battute su di me.»',
            style: 'impulsiva',
            feedback:
              'La controaccusa (“anche tu”) può contenere qualcosa di vero, ma ora sposta il discorso. Prima conviene accogliere, poi eventualmente parlare anche di quello.',
            otherSide: 'Si sente ancora meno ascoltato.',
            next: null,
          },
          {
            id: 'b2',
            label: '«Ho visto che eri diventato silenzioso e non ti ho chiesto niente. Mi dispiace. Dimmi come l’hai vissuta.»',
            style: 'consapevole',
            feedback:
              'Riconosci sia la battuta sia la mancata attenzione dopo. Invitarlo a raccontare la sua esperienza è una riparazione completa.',
            otherSide: 'Ti racconta che si sente spesso preso in giro per queste cose.',
            next: null,
          },
        ],
      },
      {
        id: 'n-c',
        text: 'Lui risponde piano: «Un po’ sì. Mi sono sentito ridicolo.»',
        choices: [
          {
            id: 'c1',
            label: '«Scusami. Non volevo, ma capisco l’effetto. Non lo farò più davanti agli altri.»',
            style: 'consapevole',
            feedback:
              'Una riparazione semplice e tempestiva. Hai trasformato un momento che poteva sedimentare in un’occasione di vicinanza.',
            otherSide: 'Ti stringe la mano sotto il tavolo.',
            next: null,
          },
          {
            id: 'c2',
            label: '«Davvero? Non pensavo potesse darti fastidio una cosa così.»',
            style: 'evitante',
            feedback:
              'La sorpresa è comprensibile, ma la frase può suonare come una minimizzazione. Aggiungere “mi dispiace” farebbe arrivare la tua buona intenzione.',
            otherSide: 'Si sente un po’ sciocco ad averlo detto.',
            next: null,
          },
        ],
      },
    ],
    insight:
      'L’intenzione scherzosa non garantisce un impatto leggero. Accorgersi dei segnali dell’altro e verificare è il modo più rapido per evitare che una piccola ferita diventi distanza.',
    question: 'Ti è capitato di dire “era solo uno scherzo”? Che cosa è successo dopo?',
  },
  {
    id: 'silenzio-sorella',
    lab: 'impatto',
    title: 'Due giorni di silenzio',
    relation: 'famiglia',
    context:
      'Dopo una discussione con tua sorella sull’assistenza alla madre anziana, non le rispondi da due giorni. Per te è un modo per calmarti. Lei ti scrive: «Ci sei? Mi fai stare malissimo così.»',
    start: 'start',
    nodes: [
      {
        id: 'start',
        text: 'Leggi il messaggio. Ti accorgi che il tuo silenzio ha avuto un effetto. Cosa fai?',
        choices: [
          {
            id: 'a',
            label: '«Adesso sono io quella che ti fa stare male? Incredibile.»',
            style: 'impulsiva',
            feedback:
              'Rispondi con difensività: il tuo silenzio per te era protezione, per lei è punizione. Entrambe le cose possono essere vere insieme.',
            otherSide: 'Si sente ancora più rifiutata e risponde con rabbia.',
            next: 'n-a',
          },
          {
            id: 'b',
            label: 'Continui a non rispondere: non sei ancora pronta.',
            style: 'evitante',
            feedback:
              'Hai diritto ai tuoi tempi. Ma un silenzio senza spiegazione, per chi lo riceve, è spesso più doloroso di una parola difficile.',
            otherSide: 'Immagina il peggio: “Mi ha chiuso fuori.”',
            next: 'n-b',
          },
          {
            id: 'c',
            label: '«Ci sono. Mi sono presa del tempo per calmarmi, non volevo farti stare male.»',
            style: 'consapevole',
            feedback:
              'Dai significato al silenzio: era una pausa, non un rifiuto. E riconosci che l’effetto su di lei è stato diverso dalla tua intenzione.',
            otherSide: 'Tira un sospiro di sollievo.',
            next: 'n-c',
          },
        ],
      },
      {
        id: 'n-a',
        text: 'Lei risponde: «Lascia stare. Mi arrangio da sola con la mamma, come sempre.»',
        choices: [
          {
            id: 'a1',
            label: '«Perfetto. Fai pure.»',
            style: 'impulsiva',
            feedback:
              'Due persone ferite che si chiudono a vicenda. Il problema concreto (l’assistenza alla madre) resta irrisolto e diventa terreno di rancore.',
            otherSide: 'Si sente abbandonata.',
            next: null,
          },
          {
            id: 'a2',
            label: '«Aspetta. Ho risposto male. Il mio silenzio ti ha ferito, lo capisco. Possiamo sentirci stasera?»',
            style: 'consapevole',
            feedback:
              'Fermi l’escalation riconoscendo l’impatto. Proporre un momento preciso dà struttura al rientro.',
            otherSide: 'Dopo un po’ risponde: «Ok. Alle nove.»',
            next: null,
          },
        ],
      },
      {
        id: 'n-b',
        text: 'Il giorno dopo ti chiama tua madre: «Tua sorella piange, che cosa è successo?»',
        choices: [
          {
            id: 'b1',
            label: '«Niente, sono cose nostre. Lasciaci stare.»',
            style: 'evitante',
            feedback:
              'Proteggere tua madre dal conflitto ha senso. Ma il silenzio sta già coinvolgendo altre persone: forse il momento di rispondere è arrivato.',
            otherSide: 'Tua madre si preoccupa e si sente in colpa.',
            next: null,
          },
          {
            id: 'b2',
            label: 'Chiami tua sorella: «Scusa per questi giorni. Avevo bisogno di calmarmi, ma dovevo dirtelo.»',
            style: 'consapevole',
            feedback:
              'Riconosci che una pausa ha bisogno di essere comunicata. È una lezione utile anche per la prossima volta.',
            otherSide: 'Piange ancora, ma stavolta di sollievo.',
            next: null,
          },
        ],
      },
      {
        id: 'n-c',
        text: 'Lei risponde: «Ok. Ma dobbiamo parlare della mamma, io non ce la faccio più.»',
        choices: [
          {
            id: 'c1',
            label: '«Hai ragione. Domani pomeriggio ti chiamo e facciamo un piano. Voglio sentire anche come stai tu.»',
            style: 'consapevole',
            feedback:
              'Torni al problema concreto con una proposta precisa e riconosci la sua fatica. La pausa ha avuto un ritorno.',
            otherSide: 'Si sente meno sola.',
            next: null,
          },
          {
            id: 'c2',
            label: '«Anch’io non ce la faccio più, sai?»',
            style: 'impulsiva',
            feedback:
              'È vero, e merita spazio. Detto così però può suonare come una gara a chi soffre di più. Prova ad aggiungere: “Parliamone, siamo entrambe stanche.”',
            otherSide: 'Si sente in competizione.',
            next: null,
          },
        ],
      },
    ],
    insight:
      'Anche il silenzio ha un impatto. Ciò che per chi tace è una pausa, per chi lo riceve può essere un rifiuto. Dare un nome e una durata al silenzio ne cambia il significato.',
    question: 'Quando ti chiudi in silenzio, che cosa pensi che arrivi all’altra persona?',
  },
];
