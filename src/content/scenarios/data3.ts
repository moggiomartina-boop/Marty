import { scenario } from './build';

/** Scenari dei laboratori 6–8. */
export const scenarios3 = [
  /* ---------------- Laboratorio 6 ---------------- */
  scenario({
    id: 'racconto-corto',
    lab: 'altra-persona',
    title: '«Niente di che»',
    context:
      'Le chiedi com’è andata la giornata. Lei risponde: «Niente di che». È la quarta sera di fila. Ricordi che all’inizio della relazione ti raccontava tutto, con entusiasmo. Ti senti escluso.',
    prompt: 'Che cosa ne fai di questa sensazione?',
    start: [
      ['«Prima mi raccontavi tutto. Adesso cosa mi nascondi?»', 'pressante', 'La domanda legge il suo silenzio come segretezza. Ma spesso le persone smettono di raccontare quando raccontare porta a domande e sospetti. Questa domanda rischia di confermarle che è meglio tacere.', 'Pensa: “Ecco perché non racconto più”.'],
      ['Ti chiedi: che cosa succedeva, di solito, quando mi raccontava qualcosa? Ripensi alle tue domande sui colleghi.', 'consapevole', 'Hai provato a guardare la dinamica dal suo lato. È possibile che i tuoi modi di accogliere i suoi racconti abbiano reso il raccontare faticoso.', 'Non sa del tuo ragionamento, ma è il primo passo per cambiare il clima.'],
      ['Decidi che da domani le chiederai i dettagli: con chi ha pranzato, chi ha visto, che cosa ha fatto.', 'controllante', 'Più domande produrranno meno racconti, non di più. È il circolo: pressione, giustificazione, stanchezza, distanza.', 'Si sentirà interrogata ogni sera.'],
      ['Smetti anche tu di raccontare: “se lei non condivide, non condivido io”.', 'ritiro', 'Ricambiare il silenzio aumenta la distanza da entrambe le parti. Nessuno dei due capirà che cosa si è perso.', 'Sente la relazione raffreddarsi.'],
    ],
    apertura: {
      text: 'Il giorno dopo lei, senza che tu chieda, ti racconta di una riunione divertente. Nomina un collega.',
      choices: [
        ['Ridi con lei e chiedi della parte divertente, non del collega.', 'consapevole', 'Hai accolto il racconto con interesse per la sua esperienza, non per i dettagli da verificare. Ogni volta che succede, raccontare torna a essere piacevole.', 'Si sente più leggera. Forse domani racconterà ancora.'],
        ['«Chi è questo collega? Non l’hai mai nominato.»', 'pressante', 'La domanda riporta il racconto sul terreno del sospetto. Il messaggio che arriva è: “ogni nome sarà indagato”.', 'Si pente di aver raccontato.'],
      ],
    },
    tensione: {
      text: 'Lei ti risponde, stanca: «Perché ogni volta che ti racconto qualcosa diventa un interrogatorio.»',
      choices: [
        ['«Hai ragione. Ti ho fatto troppe domande, e capisco che ti sia passata la voglia. Proverò a cambiare.»', 'consapevole', 'Hai accolto un effetto del tuo comportamento senza difenderti. È ciò che permette alla spontaneità di tornare, lentamente.', 'Si sente ascoltata.'],
        ['«Faccio domande perché mi interessa di te.»', 'pressante', 'La tua intenzione può essere sincera. Ma l’effetto che lei descrive è diverso: non si sente vista, si sente interrogata. L’intenzione non cancella le conseguenze.', 'Si sente non ascoltata.'],
      ],
    },
    insight:
      'Quando una persona smette di raccontare, spesso non nasconde qualcosa: si protegge da un interrogatorio. La spontaneità torna quando raccontare è di nuovo sicuro.',
    question: 'Come accogli, di solito, i racconti della sua giornata?',
  }),
  scenario({
    id: 'sollievo',
    lab: 'altra-persona',
    title: 'Il sollievo',
    context:
      'Sei stato via una settimana per lavoro. Al telefono lei era allegra, affettuosa, ti raccontava tutto. Il giorno del tuo ritorno è diversa: più tesa, più silenziosa. Te ne accorgi e ti fa male.',
    prompt: 'Come interpreti questo cambiamento?',
    start: [
      ['“Si stava divertendo senza di me. C’è qualcuno.”', 'pressante', 'È la lettura più temuta, ma non l’unica. Il bias di conferma la rende la più evidente; il sollievo di lei potrebbe avere tutt’altra origine.', 'Non sa che stai costruendo un sospetto.'],
      ['Ti chiedi, con onestà: che cosa cambia per lei quando ci sono io? Ripensi alle tensioni delle ultime settimane.', 'consapevole', 'Hai considerato la possibilità più difficile: che la pressione della relazione pesi su di lei. Guardarla non è una condanna: è un’informazione per cambiare.', 'Non sa che stai riflettendo, ma il tuo atteggiamento sarà diverso.'],
      ['Controlli il suo telefono per vedere con chi ha parlato durante la settimana.', 'controllante', 'La verifica risponde al sospetto, non alla domanda vera. E aggiunge un nuovo episodio di sorveglianza proprio al centro della tensione.', 'Se lo scopre, conferma tutto ciò che la rende tesa.'],
      ['Le dici freddamente: «Vedo che senza di me stavi meglio.»', 'ritiro', 'La frase può contenere una verità dolorosa, ma detta così diventa un’accusa e una chiusura. Lei non potrà risponderti senza ferirti o mentire.', 'Si sente intrappolata.'],
    ],
    apertura: {
      text: 'Decidi di parlarne con lei, in un momento tranquillo.',
      choices: [
        ['«Ho notato che quando sono via sei più serena. Mi chiedo se le mie domande e la mia gelosia ti pesino. Vorrei capirlo, anche se è difficile da sentire.»', 'consapevole', 'Hai aperto uno spazio sicuro per una verità difficile, prendendoti la responsabilità di ascoltarla. È uno dei gesti più coraggiosi che si possano fare in una relazione.', 'Dopo un po’ di esitazione, ti dice che sì, a volte si sente sotto esame.'],
        ['«Dimmi la verità: preferisci stare senza di me?»', 'pressante', 'La domanda è un aut-aut che non lascia spazio a sfumature. Lei può solo rassicurarti (e tacere la sua esperienza) o ferirti.', 'Ti rassicura, ma qualcosa resta non detto.'],
      ],
    },
    tensione: {
      text: 'Lei, dopo un lungo silenzio: «Sì, a volte sto meglio quando non devo spiegare tutto.»',
      choices: [
        ['«Mi fa male, ma ti ringrazio per avermelo detto. È un segnale che devo prendere sul serio.»', 'consapevole', 'Hai accolto una verità dolorosa senza attaccare. Il suo sollievo non è un tradimento: è il segnale che la pressione si è fatta pesante.', 'Si sente libera di essere sincera, forse per la prima volta da tempo.'],
        ['«Allora vattene, se stai meglio senza di me.»', 'ritiro', 'La frase trasforma la sua sincerità in un attacco e la mette davanti a un ultimatum. Lei imparerà che dire la verità ha un costo altissimo.', 'Si chiude. Non ti dirà più ciò che sente davvero.'],
      ],
    },
    insight:
      'Il sollievo dell’altra persona quando la pressione si allenta non è un tradimento: è un’informazione. Ascoltarla è doloroso, ma è il modo più diretto per capire che cosa sta costando la relazione a lei.',
    question: 'Ti è capitato di notare che lei è più serena in tua assenza? Che cosa potrebbe dirti questo?',
  }),
  scenario({
    id: 'non-dice-no',
    lab: 'altra-persona',
    title: 'Sempre d’accordo',
    context:
      'Le proponi di passare il weekend dai tuoi genitori. Lei dice: «Va bene». Ma lo dice con un tono piatto, e ti ricordi che aveva parlato di un concerto con le amiche proprio in quei giorni.',
    prompt: 'Che cosa fai con quel «va bene»?',
    start: [
      ['Lo prendi alla lettera: ha detto di sì, quindi va bene.', 'ritiro', 'Prendere alla lettera un “sì” poco convinto ti evita una conversazione scomoda. Ma se lei dice sì per evitare discussioni, quel sì non ti dice nulla di ciò che vuole.', 'Rinuncia al concerto senza dirlo.'],
      ['«Mi sembri poco convinta. Avevi il concerto, vero? Se preferisci andare, organizziamo con i miei un altro weekend.»', 'consapevole', 'Hai colto il segnale e hai reso sicuro il disaccordo. È così che si contrasta, nel tempo, la paura di dire di no.', 'È sorpresa e sollevata: «Sì, ci tenevo».'],
      ['«Perfetto. Così non vai a quel concerto con quelle là.»', 'controllante', 'Usare un programma di coppia per tenerla lontana dalle sue amiche è una forma di isolamento graduale, uno dei tratti del controllo coercitivo.', 'Capisce che la proposta non era innocente.'],
      ['«Va bene, ma poi non lamentarti.»', 'pressante', 'La frase rende chiaro che un eventuale disagio non sarà accolto. Il suo “sì” diventa un vincolo.', 'Si sente in trappola.'],
    ],
    apertura: {
      text: 'Lei va al concerto. La sera ti scrive: «È bellissimo, grazie per aver capito».',
      choices: [
        ['«Sono contento. Divertiti.»', 'consapevole', 'Hai lasciato che la sua libertà fosse davvero libera, anche nel modo in cui rispondi dopo.', 'Si sente vista e rispettata.'],
        ['«Mi devi un favore, eh.»', 'pressante', 'Anche detto in modo scherzoso, trasforma la sua libertà in un debito. Il messaggio implicito è che il suo spazio ha un prezzo.', 'Sorride, ma la gratitudine diventa un conto.'],
      ],
    },
    tensione: {
      text: 'Più tardi lei ti dice: «A volte dico di sì solo per non litigare.»',
      choices: [
        ['«Non voglio che tu debba farlo. Dimmi di no quando lo pensi: preferisco un no vero a un sì per paura.»', 'consapevole', 'Hai riconosciuto il problema e hai dichiarato di voler accogliere il disaccordo. Ora serve dimostrarlo nei fatti, ogni volta.', 'Ci crederà quando vedrà che un suo no non ha conseguenze.'],
        ['«Ma se non mi dici niente, come faccio a saperlo?»', 'pressante', 'La domanda ha un fondo di verità, ma in questo momento sposta su di lei la responsabilità di un clima in cui non si sente libera di dissentire.', 'Si chiude: ancora una volta, la colpa è sua.'],
      ],
    },
    insight:
      'Una persona che dice sempre di sì può non essere d’accordo: può avere paura delle conseguenze del no. Rendere sicuro il disaccordo è una responsabilità di chi ha il potere di renderlo costoso.',
    question: 'Lei ti dice “no” abbastanza spesso? Se no, perché potrebbe non farlo?',
  }),

  /* ---------------- Laboratorio 7 ---------------- */
  scenario({
    id: 'bisogno-tempo',
    lab: 'due-bisogni',
    title: 'Due bisogni diversi',
    context:
      'Venerdì sera. Tu vorresti stare insieme, cena e film. Lei è esausta e ti dice che ha bisogno di una serata tranquilla, da sola, per recuperare. Ti senti messo da parte.',
    prompt: 'Due bisogni legittimi si scontrano. Che cosa fai?',
    start: [
      ['«Mi piacerebbe stare con te stasera, mi sei mancata. Ma capisco che sei esausta. Facciamo domani?»', 'consapevole', 'Hai comunicato il tuo bisogno, riconosciuto il suo e proposto un’alternativa. Il tuo bisogno è stato detto, non preteso.', 'Si sente libera di riposare e contenta di vederti domani.'],
      ['«Sempre stanca quando si tratta di me.»', 'pressante', 'La frase trasforma un suo bisogno in un’accusa di disinteresse. Il tuo dispiacere è reale, ma così lo stai scaricando su di lei.', 'Si sente in colpa per essere stanca.'],
      ['Vai da lei comunque: «Non ti disturbo, sto solo lì.»', 'controllante', 'Ignorare un limite espresso chiaramente, anche con modi gentili, è non rispettarlo. Il suo bisogno di stare sola viene annullato.', 'Non riesce a riposare. Si sente invasa.'],
      ['«Ok.» E non le scrivi per tutto il weekend.', 'ritiro', 'Il silenzio prolungato le fa pagare il suo bisogno di riposo. Lei impara che dire di no costa un weekend di distanza.', 'Il weekend diventa un tempo di tensione.'],
    ],
    apertura: {
      text: 'Sabato vi vedete. Lei è più riposata e ti abbraccia appena arrivi.',
      choices: [
        ['Ti godi la serata, senza ritornare su venerdì.', 'consapevole', 'Rispettare un limite e poi non presentare il conto è ciò che rende un no davvero libero.', 'Si sente amata anche nei suoi bisogni.'],
        ['«Vedi? Ieri potevi venire anche tu.»', 'pressante', 'Ritornare sul suo no per dimostrare che non era necessario le insegna che i suoi bisogni saranno messi in discussione a posteriori.', 'Si irrigidisce un po’.'],
      ],
    },
    tensione: {
      text: 'Lei ti dice: «Anche io ho bisogno di stare con te. Ma non sempre quando lo decidi tu.»',
      choices: [
        ['«Hai ragione. Il mio bisogno non dovrebbe diventare un tuo obbligo.»', 'consapevole', 'Hai colto la differenza tra avere un bisogno e pretendere che venga soddisfatto. È il cuore di questo laboratorio.', 'Si sente capita.'],
        ['«E i miei bisogni allora non contano?»', 'pressante', 'I tuoi bisogni contano. Ma la domanda trasforma un confronto sui tempi in una gara su chi ha più diritti.', 'Si sente costretta a scegliere tra sé e te.'],
      ],
    },
    insight:
      'Avere un bisogno, comunicarlo, pretenderlo e rispettare il limite dell’altro sono quattro passaggi diversi. Un bisogno detto è un invito; un bisogno preteso è un obbligo.',
    question: 'Quale tuo bisogno tendi a pretendere invece di comunicare?',
  }),
  scenario({
    id: 'anche-tu',
    lab: 'due-bisogni',
    title: '«Anche tu però»',
    context:
      'Lei ti dice, con calma, che le tue domande continue su dove va e con chi la fanno sentire controllata. Senti subito il bisogno di difenderti: anche lei, in passato, non è stata sempre sincera.',
    prompt: 'Come rispondi?',
    start: [
      ['«Anche tu però non mi dici mai niente.»', 'pressante', 'Può esserci del vero, ma la controaccusa trasforma il suo dolore in una contesa. Reciprocità non significa rispondere a ogni lamentela con un’altra.', 'Si sente non ascoltata: ha parlato di sé e ha ricevuto un’accusa.'],
      ['Ascolti fino in fondo, poi riformuli: «Mi stai dicendo che le mie domande ti fanno sentire sotto controllo. In quali momenti succede di più?»', 'consapevole', 'Hai sospeso la difesa e hai ascoltato davvero. Non significa darle ragione su tutto: significa capire prima di rispondere.', 'Si sente presa sul serio. Ti fa degli esempi concreti.'],
      ['«Se tu fossi stata sincera, non avrei bisogno di chiederti niente.»', 'controllante', 'Stai rendendo lei responsabile del tuo controllo. Un suo errore del passato non giustifica la sorveglianza nel presente, e non rende equivalenti i due comportamenti.', 'Si sente condannata a meritarsi il controllo.'],
      ['«Va bene, allora non ti chiedo più niente.» E ti chiudi.', 'ritiro', 'Il passaggio dal controllo al ritiro è un ribaltamento, non un cambiamento. Lei sentirà il risentimento sotto la resa.', 'Si sente in colpa per aver parlato.'],
    ],
    apertura: {
      text: 'Lei ti racconta di quando le hai chiesto dove fosse durante una cena con le amiche. Ti senti in imbarazzo.',
      choices: [
        ['«Mi dispiace. Non mi rendevo conto di quanto pesasse. Ci lavorerò.»', 'consapevole', 'Hai accolto il suo dolore senza difenderti e preso un impegno. Puoi parlare anche delle tue difficoltà, ma in un altro momento.', 'Sente che il confronto è stato utile.'],
        ['«Però anche tu, quella volta…»', 'pressante', 'L’imbarazzo ti ha spinto a riequilibrare. Ma ora il discorso è tornato su di lei, e lei ha smesso di essere ascoltata.', 'Si chiude.'],
      ],
    },
    tensione: {
      text: 'Lei sospira: «Ogni volta che ti dico come mi sento, finisce che parliamo dei miei errori.»',
      choices: [
        ['«Hai ragione. Adesso parliamo di come ti senti tu. Dei miei bisogni possiamo parlare un’altra volta.»', 'consapevole', 'Hai separato i due temi e dato priorità al suo dolore. Due persone possono avere entrambe bisogni legittimi, ma non tutto va affrontato nello stesso momento.', 'Si sente finalmente ascoltata.'],
        ['«Perché i tuoi errori ci sono.»', 'pressante', 'Anche se fosse vero, in questo momento chiudi ogni possibilità di ascolto. Reciprocità non è equivalenza delle responsabilità.', 'Rinuncia a parlarne.'],
      ],
    },
    insight:
      'Due persone possono avere entrambe bisogni legittimi, ma non tutti i comportamenti sono ugualmente gravi. Ascoltare il dolore dell’altra persona senza controaccusare è uno degli atti più difficili, e più importanti.',
    question: 'Quando lei ti dice di essere stata ferita, che cosa ti spinge a difenderti?',
  }),
  scenario({
    id: 'scusa-ripetuta',
    lab: 'due-bisogni',
    title: 'La stessa scusa',
    context:
      'Dopo l’ennesima scenata di gelosia, le scrivi: «Scusa, non succederà più». Lei risponde: «Me l’hai già detto tante volte».',
    prompt: 'Che cosa fai?',
    start: [
      ['«Questa volta è diverso, te lo giuro.»', 'pressante', 'La promessa è sincera, ma è identica alle precedenti. Lei ha ragione a non fidarsi delle parole: ciò che può cambiare la sua fiducia sono i comportamenti.', 'Non ti crede, e non per cattiveria.'],
      ['«Hai ragione, le scuse non bastano. Questa settimana non ti farò domande su dove sei e con chi. Se succede, te lo dirò io.»', 'consapevole', 'Hai trasformato una promessa generica in un comportamento osservabile e verificabile. Chiedere scusa non equivale a cambiare; questo sì.', 'Resta cauta, ma ha qualcosa di concreto da osservare.'],
      ['«Se continui a non credermi, non posso cambiare.»', 'controllante', 'Stai rendendo il tuo cambiamento dipendente dalla sua fiducia. Ma la fiducia arriverà dopo il cambiamento, non prima.', 'Si sente responsabile anche del tuo cambiamento.'],
      ['«Allora è inutile che mi scusi.»', 'ritiro', 'La frase chiude la riparazione proprio quando servirebbe di più. Lei sente che la sua sfiducia è stata usata come un pretesto.', 'Si allontana ancora un po’.'],
    ],
    apertura: {
      text: 'Passano cinque giorni. Al sesto, una sera, l’impulso di chiederle con chi era a pranzo è fortissimo.',
      choices: [
        ['Annoti l’impulso nel diario, non le chiedi nulla, e ti ricordi l’impegno.', 'consapevole', 'Hai riconosciuto l’impulso e mantenuto l’impegno. È nei momenti difficili che un cambiamento diventa reale.', 'Nota che sei diverso, anche se non sa quanto ti sia costato.'],
        ['Glielo chiedi “solo questa volta”.', 'pressante', 'Una ricaduta non cancella i progressi, ma va riconosciuta. Se ci ricadi, dirglielo tu è parte dell’impegno.', 'Pensa: “Ecco, lo sapevo”.'],
      ],
    },
    tensione: {
      text: 'Lei ti dice: «Non voglio altre promesse. Voglio vedere qualcosa di diverso.»',
      choices: [
        ['«Ok. Ho iniziato a scrivere un piano con comportamenti precisi. E ho deciso di parlarne con uno psicologo.»', 'consapevole', 'Hai risposto alla sua richiesta con azioni concrete, non con altre parole. Il cambiamento deve essere visibile.', 'Si sente presa sul serio.'],
        ['«Che altro devo fare? Mi sono già scusato!»', 'pressante', 'La frustrazione è comprensibile, ma rivela l’idea che la scusa debba bastare. Chiedere scusa non equivale a cambiare.', 'Si sente sola davanti a un problema che non cambia.'],
      ],
    },
    insight:
      'Una scusa ripetuta senza cambiamento perde valore. La fiducia torna attraverso comportamenti osservabili, mantenuti nel tempo, soprattutto quando sono difficili.',
    question: 'Quale comportamento concreto potrebbe sostituire la tua prossima scusa?',
  }),

  /* ---------------- Laboratorio 8 ---------------- */
  scenario({
    id: 'ultimo-accesso',
    lab: 'reagire',
    title: 'L’ultimo accesso',
    context:
      'Sono le 23:40. Lei è fuori con le amiche e ti ha detto che sarebbe rientrata verso mezzanotte. Hai il telefono in mano. Il pollice va da solo verso la sua chat per controllare l’ultimo accesso.',
    prompt: 'Quale strumento usi?',
    start: [
      ['Tolleranza dell’incertezza: metti il telefono lontano e ti dai venti minuti prima di decidere qualsiasi cosa.', 'consapevole', 'Rimandare la verifica è il cuore della tolleranza dell’incertezza. L’ansia salirà, raggiungerà un picco e poi scenderà da sola. Ogni volta che lo sperimenti, diventa più facile.', 'Rientra a mezzanotte e un quarto, serena.'],
      ['Controlli l’ultimo accesso. Era online due minuti fa. Le scrivi: «Sei sveglia allora».', 'pressante', 'La verifica ha prodotto un nuovo dato da interpretare, e il messaggio le comunica che la stai osservando.', 'Si sente controllata durante la sua serata.'],
      ['Le chiedi di mandarti la posizione in tempo reale “per sicurezza”.', 'controllante', 'La condivisione della posizione richiesta per gestire la tua ansia è sorveglianza. Non ti darà pace: ti darà un nuovo punto da controllare.', 'Si sente monitorata.'],
      ['Vai a letto arrabbiato, deciso a non salutarla quando rientra.', 'ritiro', 'Hai evitato la verifica, ma stai preparando una punizione silenziosa. L’emozione non è stata regolata: è stata rimandata.', 'Rientra e ti trova freddo.'],
    ],
    apertura: {
      text: 'Dopo dieci minuti l’ansia è ancora alta. Ti sembra insopportabile.',
      choices: [
        ['Fai un grounding: cinque cose che vedi, quattro che senti al tatto, tre suoni, due odori, un sapore.', 'consapevole', 'Il grounding riporta l’attenzione al presente e abbassa l’attivazione. Non elimina l’ansia, ma la rende attraversabile.', 'Rientra e ti trova calmo.'],
        ['Cedi e controlli “solo un attimo”.', 'pressante', 'Le ricadute capitano. Notale senza disprezzarti: domani puoi scrivere nel diario che cosa ti ha fatto cedere.', 'Non lo sa, ma l’abitudine si è rinforzata.'],
      ],
    },
    tensione: {
      text: 'Lei rientra e ti chiede: «Perché questa faccia?»',
      choices: [
        ['«Ho avuto un attacco d’ansia e l’ho gestito male. Non è colpa tua. Com’è andata la serata?»', 'consapevole', 'Hai riconosciuto la tua difficoltà senza scaricarla su di lei. È una forma di riparazione semplice e onesta.', 'Si siede e ti racconta.'],
        ['«Niente.»', 'ritiro', 'Il “niente” con il tono gelido è un doppio messaggio. Lei sa che qualcosa non va, ma non può fare nulla.', 'Va a letto tesa.'],
      ],
    },
    insight:
      'Gli strumenti funzionano se li usi nel momento in cui servono, non solo se li conosci. La tolleranza dell’incertezza e il grounding sono abilità: le prime volte sono difficili, poi diventano più naturali.',
    question: 'Quale strumento potresti provare la prossima volta che senti l’impulso di verificare?',
  }),
  scenario({
    id: 'no-proposta',
    lab: 'reagire',
    title: 'Il no',
    context:
      'Hai organizzato una sorpresa: un weekend in montagna. Glielo dici, entusiasta. Lei, imbarazzata, ti dice che quel weekend ha già un impegno di lavoro che non può spostare. Senti una frustrazione enorme.',
    prompt: 'Quale strumento usi?',
    start: [
      ['Gestione della frustrazione: noti la delusione, respiri, e dici: «Peccato, ci tenevo. Troviamo un’altra data?»', 'consapevole', 'Hai dato un nome alla frustrazione senza farla diventare un’accusa. Il suo no riguarda un impegno, non te.', 'È sollevata e ti propone subito una data alternativa.'],
      ['«Non puoi spostarlo? Per una volta che organizzo qualcosa.»', 'pressante', 'La frustrazione è diventata pressione: il suo no viene messo in discussione e caricato di colpa.', 'Si sente in difetto per un impegno di lavoro.'],
      ['«Allora chiamo io il tuo capo e gli spiego.»', 'controllante', 'Intervenire nella sua vita lavorativa per ottenere ciò che vuoi è una forma grave di invasione. Il suo no va rispettato, non aggirato.', 'Si sente spaventata dalla tua reazione.'],
      ['«Lascia stare, non organizzo più niente.»', 'ritiro', 'La frase punisce il suo no rinunciando in futuro. È una forma di chiusura che fa pagare a lei la tua delusione.', 'Si sente in colpa per qualcosa che non dipendeva da lei.'],
    ],
    apertura: {
      text: 'Lei ti abbraccia: «Grazie per averla presa così. Ci tenevo anch’io.»',
      choices: [
        ['Ti accorgi che la frustrazione è scesa. Scegliete insieme una nuova data.', 'consapevole', 'Rispettare un rifiuto senza farlo pesare rende la relazione un posto sicuro anche per i no. E la sorpresa diventa un progetto comune.', 'Si sente libera e voluta.'],
        ['«Però la prossima volta il lavoro lo sposti tu.»', 'pressante', 'Il rispetto del suo no si trasforma in un credito. Il messaggio implicito è che il prossimo no non sarà accettato.', 'L’abbraccio si raffredda.'],
      ],
    },
    tensione: {
      text: 'Lei ti dice: «Mi dispiace davvero. Ma non posso cambiare tutto ogni volta che decidi qualcosa.»',
      choices: [
        ['«Hai ragione. Avrei dovuto chiederti prima. La frustrazione è mia.»', 'consapevole', 'Riconosci che la sorpresa, per quanto affettuosa, non teneva conto della sua vita. Rispettare il rifiuto è parte dell’amore.', 'Si sente capita.'],
        ['«Sempre il lavoro prima di me.»', 'pressante', 'La generalizzazione trasforma un episodio in un giudizio sulla relazione. La frustrazione ha preso il controllo del discorso.', 'Si sente accusata.'],
      ],
    },
    insight:
      'Rispettare un rifiuto, anche quando sei deluso, è uno degli strumenti più importanti. La frustrazione è legittima; trasformarla in pressione, colpa o ritiro è una scelta.',
    question: 'Che cosa senti quando lei ti dice di no a qualcosa a cui tieni?',
  }),
];
