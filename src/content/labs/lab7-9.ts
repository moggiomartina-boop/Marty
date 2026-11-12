import type { Lab } from '../../types';

export const labs7to9: Lab[] = [
  /* =====================================================================
     LABORATORIO 7 — DUE BISOGNI, DUE RESPONSABILITÀ
     ===================================================================== */
  {
    id: 'due-bisogni',
    number: 7,
    title: 'Due bisogni, due responsabilità',
    subtitle: 'Ascolto, reciprocità, riparazione',
    question: 'Come tenere insieme il tuo bisogno e il limite dell’altra persona?',
    summary:
      'Avere un bisogno, comunicarlo, pretenderlo, rispettare il limite dell’altro: quattro passaggi diversi. Due persone possono avere entrambe bisogni legittimi, senza che tutti i comportamenti siano ugualmente gravi.',
    accent: 'sage',
    tools: ['bisogni', 'riparazione'],
    sources: ['rosenberg2003', 'gottman1999', 'gottman1994', 'neff2003'],
    intro: [
      'In una relazione ci sono sempre due persone con bisogni, paure e limiti. Tu puoi avere bisogno di vicinanza e lei di spazio; tu di rassicurazione e lei di fiducia; tu di parlare subito e lei di aspettare. Nessuno dei due bisogni è sbagliato in sé.',
      'Ma riconoscere che entrambi avete bisogni non significa che tutto sia uguale. Se tu hai bisogno di rassicurazione e lei di autonomia, i due bisogni sono entrambi legittimi; se però tu controlli il suo telefono e lei non ti scrive durante una riunione, i due comportamenti non hanno lo stesso peso. La reciprocità non è equivalenza delle responsabilità.',
      'Questo laboratorio ti aiuta a distinguere: che cos’è un bisogno, come comunicarlo, quando diventa una pretesa, come rispettare un limite anche quando ti fa male. E come riparare davvero quando hai ferito.',
    ],
    sections: [
      {
        id: 'quattro-passi',
        title: 'Avere, comunicare, pretendere, rispettare',
        blocks: [
          {
            kind: 'list',
            items: [
              'Avere un bisogno: è legittimo, e riguarda te. «Ho bisogno di sentirmi importante per te.»',
              'Comunicarlo: è un atto di fiducia. «Quando passiamo poco tempo insieme mi manchi. Ti andrebbe di organizzare una serata?»',
              'Pretendere che venga soddisfatto: trasforma il bisogno in un obbligo per l’altra persona. «Devi passare il weekend con me.»',
              'Rispettare il limite dell’altra persona: è ciò che rende la relazione libera. «Capisco che questo weekend vuoi stare con le tue amiche. Mi dispiace, e va bene.»',
            ],
          },
          {
            kind: 'quote',
            text: 'Un bisogno detto è un invito. Un bisogno preteso è un obbligo.',
          },
        ],
      },
      {
        id: 'reciprocita',
        title: 'Reciprocità non è equivalenza',
        blocks: [
          {
            kind: 'p',
            text: 'Quando si parla di conflitti di coppia è facile ricorrere al “siamo tutti e due responsabili”. In parte è vero: le dinamiche si costruiscono in due. Ma alcuni comportamenti — intimidazione, controllo, minacce, violenza — hanno un peso diverso, e la responsabilità di chi li compie non si divide a metà.',
          },
          {
            kind: 'p',
            text: 'Allo stesso modo, il fatto che lei abbia sbagliato in qualcosa (una dimenticanza, una frase brusca, un’omissione) non rende proporzionata qualunque tua reazione. Puoi chiedere a lei di assumersi la responsabilità della sua parte, e assumerti pienamente la tua.',
          },
          {
            kind: 'warning',
            text: 'Questo percorso non serve a dimostrare a lei che ha torto, né a convincerla a cambiare. Serve a te, per lavorare sulla tua parte.',
          },
        ],
      },
    ],
    concepts: [
      {
        id: 'ascolto-attivo',
        name: 'Ascolto attivo',
        what: 'Ascoltare per capire, non per rispondere: dare spazio a ciò che l’altra persona dice, verificare di aver compreso, sospendere la difesa.',
        how: 'Si ascolta fino in fondo, si riformula («Mi stai dicendo che ti senti…»), si chiede se si è capito bene. Solo dopo si risponde.',
        why: 'Quando ci si sente accusati, la mente si prepara a difendersi e smette di ascoltare. L’ascolto attivo è un’abilità che va allenata contro questa tendenza.',
        daily: 'Lei dice: «Mi sento controllata». Invece di rispondere «Non è vero», chiedi: «In quali momenti ti senti così?».',
        consequences: 'Sentirsi ascoltati riduce l’attivazione e rende possibile un confronto. Non sentirsi ascoltati fa salire il volume.',
        altReadings: 'Ascoltare non significa essere d’accordo, né ammettere colpe che non riconosci. Significa capire prima di rispondere.',
        altActions: 'Riformulare ciò che hai sentito prima di dare la tua versione.',
        evidence: 'pratica',
      },
      {
        id: 'empatia',
        name: 'Empatia',
        what: 'La capacità di capire e, in parte, sentire ciò che prova l’altra persona.',
        how: 'Ha una componente cognitiva (capire il suo punto di vista) e una affettiva (risuonare con la sua emozione). Si riduce molto quando sei arrabbiato o spaventato.',
        why: 'Tutti ne siamo capaci, ma la paura e la difensività la oscurano. Si può riattivare in modo intenzionale.',
        daily: 'Ti fermi a immaginare come si sente lei dopo la terza domanda sullo stesso collega.',
        consequences: 'L’empatia rende le tue scelte più rispettose. La sua assenza rende facile giustificare comportamenti che feriscono.',
        altReadings: 'Puoi provare empatia per la sua stanchezza anche mentre senti la tua paura. Le due cose non si escludono.',
        altActions: 'Prima di fare una richiesta, chiederti: “Come la riceverà lei, nella sua giornata?”.',
        evidence: 'modello',
      },
      {
        id: 'reciprocita-c',
        name: 'Reciprocità',
        what: 'Lo scambio equilibrato di attenzione, cura e rispetto tra due persone.',
        how: 'Ognuno dà e riceve, anche se non nello stesso modo né nello stesso momento.',
        why: 'Le relazioni durature tendono a fondarsi su un senso di equità percepita.',
        daily: 'Tu rispetti il suo spazio; lei rispetta i tuoi bisogni di vicinanza in altri momenti.',
        consequences: 'Quando la reciprocità viene invocata per giustificare comportamenti sproporzionati («anche lei sbaglia»), smette di essere reciprocità e diventa una contabilità dei torti.',
        altReadings: 'Reciprocità non significa che ogni errore di lei bilanci ogni tuo comportamento.',
        altActions: 'Concentrarti sulla tua parte, sapendo che quella di lei è sua.',
        evidence: 'ipotesi',
      },
      {
        id: 'responsabilita-individuale',
        name: 'Responsabilità individuale',
        what: 'La consapevolezza che ciascuno risponde dei propri comportamenti, indipendentemente da quelli dell’altro.',
        how: 'Le tue emozioni possono essere provocate da ciò che lei fa; il tuo comportamento resta una tua scelta.',
        why: 'Spostare la responsabilità sull’altro protegge dalla vergogna, ma toglie il potere di cambiare.',
        daily: '«Mi sono arrabbiato quando ho saputo del pranzo. Ho alzato la voce. Questa è la mia parte.»',
        consequences: 'Assumersi la responsabilità rende possibile il cambiamento. Delegarla alla partner la rende responsabile delle tue reazioni.',
        altReadings: 'La partner non è responsabile delle tue reazioni, anche quando le sue azioni ti fanno soffrire.',
        altActions: 'Usare il “io” quando descrivi un conflitto: «io ho fatto», «io ho detto».',
        evidence: 'modello',
      },
      {
        id: 'non-accusatoria',
        name: 'Comunicazione non accusatoria',
        what: 'Esprimere un disagio descrivendo fatti, emozioni e bisogni, senza attaccare la persona.',
        how: 'Osservazione («Quando ieri sei tornata alle 23 senza avvisare»), emozione («mi sono preoccupato»), bisogno («per me è importante sapere se fai tardi»), richiesta («la prossima volta potresti mandarmi un messaggio?»).',
        why: 'Le accuse attivano la difesa; le descrizioni lasciano spazio all’ascolto.',
        daily: 'Invece di «Non ti importa niente di me», dire «Mi sono sentito messo da parte stasera».',
        consequences: 'Una comunicazione non accusatoria non garantisce la risposta che desideri, ma aumenta la probabilità di essere ascoltato.',
        altReadings: 'Non è una tecnica per ottenere ciò che vuoi: è un modo rispettoso di esprimere ciò che senti.',
        altActions: 'Riscrivere le accuse più frequenti in forma di osservazione, emozione e bisogno.',
        evidence: 'pratica',
        source: 'rosenberg2003',
      },
      {
        id: 'riparazione-c',
        name: 'Riparazione dopo il conflitto',
        what: 'Il gesto o la conversazione con cui si riconosce una ferita e si tenta di ricucire.',
        how: 'Una riparazione autentica nomina ciò che è successo, riconosce l’impatto, non contiene “ma”, propone un cambiamento concreto e lascia all’altra persona il tempo di cui ha bisogno.',
        why: 'Tutte le coppie hanno conflitti. Ciò che fa la differenza è la capacità di riparare.',
        daily: '«Ieri ti ho fatto tre domande sullo stesso collega. Ti sei sentita sotto accusa. Mi dispiace: sto lavorando su questa mia paura.»',
        consequences: 'La riparazione può ricostruire vicinanza. Ma chiedere scusa non equivale a cambiare: se lo stesso comportamento si ripete, le scuse perdono valore.',
        altReadings: 'Una riparazione non obbliga l’altra persona a perdonare.',
        altActions: 'Unire ogni scusa a un impegno concreto e osservabile.',
        evidence: 'modello',
        source: 'gottman1999',
      },
      {
        id: 'dolore-altro',
        name: 'Accogliere il dolore dell’altro',
        what: 'La capacità di restare presente quando l’altra persona ti dice di essere stata ferita da te, senza difenderti subito.',
        how: 'Significa tollerare la vergogna o il senso di colpa abbastanza a lungo da ascoltare davvero.',
        why: 'È difficile perché sentirsi accusati attiva una difesa automatica. Ma è una delle abilità più importanti in una relazione.',
        daily: 'Lei dice: «Quando mi hai bloccato la porta ho avuto paura». Tu resti, ascolti, non spieghi, non minimizzi.',
        consequences: 'Quando il dolore viene accolto, chi l’ha espresso si sente vista. Quando viene respinto, impara a non dirlo più.',
        altReadings: 'Il suo dolore non è un attacco contro di te: è un’informazione su ciò che è successo a lei.',
        altActions: 'Dire: «Ti credo. Mi dispiace. Dimmi di più, se vuoi».',
        evidence: 'ipotesi',
        source: 'neff2003',
      },
    ],
    examples: [
      { title: 'Il weekend', text: 'Tu vorresti passare il weekend insieme; lei ha già organizzato con le amiche. Entrambi i bisogni sono legittimi. Puoi dirle che ti mancherà e proporre un’altra data. Non puoi chiederle di annullare.' },
      { title: '«Anche tu sbagli»', text: 'Lei ti dice che si sente controllata. Tu rispondi: «Anche tu non mi dici mai niente». Può esserci del vero, ma in questo momento hai spostato il discorso dal suo dolore alla tua lamentela.' },
      { title: 'La scusa ripetuta', text: 'Ti scusi per l’ennesima scenata di gelosia. Lei dice: «Le scuse le ho già sentite». Ha ragione: senza un cambiamento visibile, le scuse diventano parole.' },
    ],
    selfCheck: [
      {
        id: 'db-1',
        question: 'Quando lei ti dice che un tuo comportamento l’ha ferita, qual è la tua prima reazione?',
        options: [
          { label: 'Ascolto e chiedo di più', feedback: 'È la base dell’accoglienza. Nota se riesci a farlo anche quando ciò che dice ti sembra ingiusto.' },
          { label: 'Mi giustifico, spiego perché l’ho fatto', feedback: 'Spiegare è umano, ma farlo subito comunica che le tue ragioni contano più del suo dolore. Prova ad ascoltare prima, spiegare dopo, se serve.' },
          { label: 'Le ricordo quando ha sbagliato lei', feedback: 'La controaccusa trasforma il suo dolore in una contesa. Anche se i suoi errori sono reali, in quel momento non stanno aiutando nessuno dei due.' },
          { label: 'Mi chiudo e mi sento in colpa', feedback: 'La colpa può sembrare responsabilità, ma spesso porta a chiudersi. Prova a trasformarla in qualcosa di concreto: ascoltare, riconoscere, cambiare.' },
        ],
      },
      {
        id: 'db-2',
        question: 'Quando lei dice “no” a una tua richiesta, che cosa fai più spesso?',
        options: [
          { label: 'Accetto, anche se mi dispiace', feedback: 'È il rispetto del limite dell’altra persona. Il tuo dispiacere è legittimo; puoi esprimerlo senza farlo diventare una pressione.' },
          { label: 'Insisto finché non cambia idea', feedback: 'Se il “no” cambia solo dopo l’insistenza, non sai più che cosa lei desiderasse davvero. E le insegni che il suo primo no non conta.' },
          { label: 'Me la prendo e glielo faccio pesare', feedback: 'Far pesare un rifiuto rende il “no” costoso. Nel tempo, lei smetterà di dirlo, ma non perché sia d’accordo.' },
        ],
      },
    ],
    reflection: [
      'Qual è un tuo bisogno che vorresti imparare a comunicare senza pretenderlo?',
      'Qual è un limite di lei che ti è difficile rispettare? Perché?',
      'C’è una riparazione che senti di doverle, che non sia solo una scusa ma un cambiamento?',
    ],
    science: [
      { kind: 'evidence', evidence: 'pratica', source: 'rosenberg2003', text: 'La Comunicazione Nonviolenta propone di distinguere osservazioni e giudizi, sentimenti e interpretazioni, bisogni e strategie, richieste e pretese. È un modello pratico molto diffuso; le evidenze controllate sono ancora limitate.' },
      { kind: 'evidence', evidence: 'evidenza', source: 'gottman1994', text: 'Nelle osservazioni di Gottman, la difensività in risposta a una lamentela del partner è associata a un peggioramento dei conflitti, mentre l’assunzione di responsabilità anche parziale tende a ridurli.' },
      { kind: 'evidence', evidence: 'modello', source: 'gottman1999', text: 'I “tentativi di riparazione” durante e dopo i conflitti sono descritti come una caratteristica delle coppie che funzionano. Il concetto deriva dalla ricerca ed è stato divulgato in forma accessibile.' },
    ],
    keyIdeas: [
      'Un bisogno detto è un invito; un bisogno preteso è un obbligo.',
      'Reciprocità non significa responsabilità uguali.',
      'Chiedere scusa non equivale a cambiare.',
    ],
  },

  /* =====================================================================
     LABORATORIO 8 — IMPARARE A REAGIRE DIVERSAMENTE
     ===================================================================== */
  {
    id: 'reagire',
    number: 8,
    title: 'Imparare a reagire diversamente',
    subtitle: 'Nove strumenti pratici',
    question: 'Che cosa puoi fare, concretamente, nel momento in cui la reazione sta per partire?',
    summary:
      'Pausa emotiva, respirazione e grounding, pensieri automatici, verifica dei fatti, tolleranza dell’incertezza, comunicazione senza accuse, frustrazione, rispetto del rifiuto, interruzione dell’escalation. Ogni strumento con spiegazione, procedura guidata, esempio ed esercizio.',
    accent: 'sand',
    tools: ['cassetta', 'respiro'],
    sources: ['linehan2014', 'gross1998', 'webb2012', 'dugas2007', 'rosenberg2003', 'novaco1975', 'gollwitzer1999'],
    intro: [
      'Capire perché reagisci in un certo modo è importante, ma non basta. Nel momento in cui la gelosia o la rabbia salgono, la comprensione da sola spesso non arriva in tempo. Servono strumenti concreti, allenati in anticipo, che diventino quasi automatici.',
      'In questo laboratorio trovi nove strumenti. Ognuno ha una spiegazione, l’indicazione di quando usarlo, una procedura guidata, un esempio e un esercizio interattivo. Non devi usarli tutti: prova, osserva che cosa funziona per te, e porta i più utili nel tuo piano personale.',
      'Ricorda che uno strumento non cambia nulla se resta in un’app. Il cambiamento avviene quando lo usi nella tua vita, specialmente nei momenti difficili. È normale che le prime volte non funzioni come vorresti: la regolazione emotiva è un’abilità, e come tutte le abilità si impara ripetendo.',
    ],
    sections: [
      {
        id: 'quando',
        title: 'Quale strumento, quando',
        blocks: [
          {
            kind: 'list',
            items: [
              'Quando senti salire l’attivazione: pausa emotiva, respirazione e grounding, interruzione dell’escalation.',
              'Quando la mente costruisce una storia: riconoscimento dei pensieri automatici, verifica dei fatti.',
              'Quando senti il bisogno di sapere subito: tolleranza dell’incertezza.',
              'Quando vuoi dire qualcosa di difficile: comunicazione senza accuse.',
              'Quando non ottieni ciò che vorresti: gestione della frustrazione, rispetto del rifiuto.',
            ],
          },
          {
            kind: 'evidence',
            evidence: 'evidenza',
            source: 'webb2012',
            text: 'La ricerca sulla regolazione emotiva suggerisce che strategie diverse abbiano effetti diversi: in media, cambiare il modo in cui interpreti una situazione tende a funzionare meglio che limitarsi a sopprimere l’espressione dell’emozione.',
          },
        ],
      },
    ],
    concepts: [
      {
        id: 'abitudine',
        name: 'La reazione come abitudine',
        what: 'Molte reazioni si ripetono perché sono diventate abitudini: percorsi rapidi che la mente prende senza deliberare.',
        how: 'Ogni volta che una reazione porta sollievo immediato (una verifica che calma, una sfuriata che scarica), si rinforza. Più la ripeti, più diventa automatica.',
        why: 'Il cervello privilegia le risposte già sperimentate, soprattutto sotto stress.',
        daily: 'Ti accorgi di aver preso il telefono per controllare il suo ultimo accesso prima ancora di deciderlo.',
        consequences: 'Le abitudini non si cambiano con la sola volontà: serve sostituirle con risposte alternative allenate.',
        altReadings: 'Ripetere un comportamento non significa che tu sia “fatto così”: significa che quel percorso è stato percorso molte volte.',
        altActions: 'Scegliere una risposta alternativa precisa e ripeterla, anche quando costa. Le intenzioni “se… allora…” aiutano a renderla automatica.',
        evidence: 'evidenza',
        source: 'gollwitzer1999',
      },
      {
        id: 'regolazione',
        name: 'Regolazione emotiva',
        what: 'L’insieme dei modi in cui influenzi quali emozioni provi, quando e come le esprimi.',
        how: 'Si può intervenire in momenti diversi: prima (scegliendo o modificando le situazioni), durante (spostando l’attenzione, cambiando interpretazione) o dopo (modulando la risposta).',
        why: 'Nessuno nasce con una regolazione perfetta. Si impara, anche da adulti.',
        daily: 'Esci a camminare prima che la discussione salga. Ti chiedi che altre spiegazioni ci siano. Rimandi una conversazione a quando sei calmo.',
        consequences: 'Regolare le emozioni non significa non sentirle: significa non esserne guidato.',
        altReadings: 'Il fatto che oggi tu non riesca a regolarti come vorresti non dice nulla su quanto potrai farlo domani.',
        altActions: 'Allenare gli strumenti nei momenti tranquilli, così che siano disponibili in quelli difficili.',
        evidence: 'modello',
        source: 'gross1998',
      },
    ],
    examples: [
      { title: 'Prima e dopo', text: 'Prima: lei non risponde, tu chiami tre volte, poi la accusi. Dopo: lei non risponde, noti l’ansia, applichi la tolleranza dell’incertezza (aspetti 40 minuti), fai un grounding, e quando ti richiama le chiedi com’è andata la giornata.' },
      { title: 'Lo stop', text: 'Durante una discussione senti la mascella serrata. Dici: «Mi sto agitando troppo. Esco venti minuti e poi ne parliamo». Esci. Torni dopo venti minuti e chiedi se per lei va bene riprendere.' },
    ],
    selfCheck: [
      {
        id: 're-1',
        question: 'Quale momento ti è più difficile da gestire?',
        options: [
          { label: 'Quando non so dov’è o con chi è', feedback: 'Lo strumento più utile per te è probabilmente la tolleranza dell’incertezza, insieme alla verifica dei fatti.' },
          { label: 'Quando la discussione si accende', feedback: 'Parti dalla pausa emotiva e dall’interruzione dell’escalation. Preparale in un momento tranquillo.' },
          { label: 'Quando lei dice di no a qualcosa', feedback: 'Gli strumenti sulla frustrazione e sul rispetto del rifiuto sono pensati per questo momento.' },
          { label: 'Quando devo dirle qualcosa che mi ha ferito', feedback: 'La comunicazione senza accuse ti aiuterà a esprimere ciò che senti senza attaccarla.' },
        ],
      },
    ],
    reflection: [
      'Quale strumento ti sembra più lontano da ciò che fai di solito? Proprio per questo, potrebbe essere quello da allenare.',
      'In quale situazione concreta della prossima settimana potresti provare uno di questi strumenti?',
    ],
    science: [
      { kind: 'evidence', evidence: 'modello', source: 'gross1998', text: 'Il modello processuale di Gross è la cornice teorica più usata per classificare le strategie di regolazione emotiva in base al momento in cui intervengono.' },
      { kind: 'evidence', evidence: 'pratica', source: 'linehan2014', text: 'Molte tecniche di questo laboratorio (pausa, grounding, tolleranza della sofferenza, azione opposta all’impulso) derivano da programmi strutturati come la DBT. L’efficacia dei programmi completi è stata studiata; quella delle singole tecniche isolate è meno documentata.' },
      { kind: 'evidence', evidence: 'pratica', source: 'dugas2007', text: 'L’esposizione graduale all’incertezza e la riduzione dei comportamenti di verifica sono componenti dei trattamenti cognitivo-comportamentali per la preoccupazione cronica.' },
      { kind: 'evidence', evidence: 'evidenza', source: 'gollwitzer1999', text: 'Le intenzioni di implementazione (“se X, allora Y”) aumentano la probabilità di mettere in atto un comportamento pianificato, secondo numerosi studi sperimentali.' },
    ],
    keyIdeas: [
      'Gli strumenti funzionano se li alleni nei momenti tranquilli.',
      'Non devi usarli tutti: scegli quelli che funzionano per te.',
      'Una ricaduta non cancella i progressi: è un’occasione per capire.',
    ],
  },

  /* =====================================================================
     LABORATORIO 9 — DALLE PAROLE AI COMPORTAMENTI
     ===================================================================== */
  {
    id: 'comportamenti',
    number: 9,
    title: 'Dalle parole ai comportamenti',
    subtitle: 'Il tuo piano personale di cambiamento',
    question: 'Che cosa farai di diverso, concretamente, e come te ne accorgerai?',
    summary:
      '«Cambierò» è una promessa. «Quando non risponde per due ore, non le scriverò più di un messaggio» è un cambiamento osservabile. Questo laboratorio ti accompagna a costruire un piano che si possa verificare.',
    accent: 'petrol',
    tools: ['promesse'],
    sources: ['gollwitzer1999', 'neff2003', 'linehan2014'],
    intro: [
      'Dopo un conflitto doloroso è naturale promettere: «Non succederà più», «Sarò meno geloso», «Cambierò». Sono promesse sincere. Ma spesso sono anche vaghe, e la vaghezza è il terreno in cui le ricadute passano inosservate.',
      'Un cambiamento reale si vede nei comportamenti. Non in quanto ti senti diverso, ma in che cosa fai di diverso, in quali situazioni, con quale frequenza. Ed è verificabile: da te, prima di tutto.',
      'In questo laboratorio costruisci il tuo piano personale. Non devi mostrarlo a nessuno: è uno strumento per te. Lo puoi stampare, esportare, modificare. E puoi tornarci ogni volta che ti accorgi di essere scivolato indietro.',
    ],
    sections: [
      {
        id: 'promesse-osservabili',
        title: 'Promesse generiche e cambiamenti osservabili',
        blocks: [
          {
            kind: 'list',
            items: [
              'Generico: «Sarò meno geloso». Osservabile: «Quando lei esce con le amiche, non le chiederò foto né aggiornamenti».',
              'Generico: «Non mi arrabbierò più». Osservabile: «Quando sento la mascella serrata, dirò la frase di pausa ed esco dalla stanza per 20 minuti».',
              'Generico: «Mi fiderò di più». Osservabile: «Non controllerò il suo ultimo accesso. Se lo faccio, lo annoto nel diario».',
              'Generico: «Sarò più presente». Osservabile: «Quando mi racconta della sua giornata, farò domande sulla sua esperienza, non su chi c’era».',
            ],
          },
          {
            kind: 'p',
            text: 'Un comportamento osservabile risponde a tre domande: che cosa farò (o non farò), in quale situazione, e come mi accorgerò di averlo fatto.',
          },
        ],
      },
      {
        id: 'ricadute',
        title: 'Se ricadi',
        blocks: [
          {
            kind: 'p',
            text: 'Le ricadute fanno parte di quasi ogni cambiamento. Non annullano i progressi, ma vanno prese sul serio: sono l’occasione per capire che cosa le ha rese possibili.',
          },
          {
            kind: 'list',
            items: [
              'Riconoscile senza minimizzarle: «Ho controllato di nuovo il suo telefono».',
              'Ripara con l’altra persona, se l’hai coinvolta, con una scusa senza “ma”.',
              'Analizza la sequenza nel diario: situazione, emozione, pensiero, impulso.',
              'Aggiorna il piano: che cosa avrebbe potuto aiutarti?',
              'Se le ricadute riguardano comportamenti intimidatori o violenti, non sono un “passo indietro”: sono il segnale che serve un aiuto professionale specifico, subito.',
            ],
          },
          {
            kind: 'evidence',
            evidence: 'modello',
            source: 'neff2003',
            text: 'L’autocompassione — riconoscere un errore senza disprezzarsi — è compatibile con la responsabilità e può favorire la motivazione a riprovare. La vergogna intensa, al contrario, tende a portare alla difesa o alla rinuncia.',
          },
        ],
      },
    ],
    concepts: [
      {
        id: 'cambiamento-osservabile',
        name: 'Cambiamento osservabile',
        what: 'Un cambiamento descritto in termini di comportamenti concreti, in situazioni specifiche, verificabili nel tempo.',
        how: 'Trasforma un’intenzione generale in una regola personale precisa: «quando succede X, farò Y».',
        why: 'Le intenzioni vaghe si perdono sotto stress; quelle specifiche hanno più probabilità di essere messe in atto.',
        daily: '«Questa settimana, quando non risponde, aspetterò almeno un’ora prima di riscriverle.»',
        consequences: 'Ti permette di vedere i tuoi progressi e le tue ricadute con onestà, senza affidarti a come “ti senti”.',
        altReadings: 'Se non riesci a descrivere un cambiamento in modo osservabile, forse non è ancora un cambiamento: è un desiderio.',
        altActions: 'Riscrivere ogni promessa del piano finché non risponde a: che cosa, quando, come lo saprò.',
        evidence: 'evidenza',
        source: 'gollwitzer1999',
      },
      {
        id: 'ricaduta',
        name: 'Ricaduta',
        what: 'Il ritorno, anche temporaneo, a un comportamento che volevi interrompere.',
        how: 'Avviene spesso in condizioni di stress, stanchezza, o in situazioni nuove non previste dal piano.',
        why: 'Le abitudini consolidate non scompaiono in un giorno; restano disponibili, specialmente sotto pressione.',
        daily: 'Dopo tre settimane senza controlli, una sera stanca e insicura riprendi il telefono e guardi il suo ultimo accesso.',
        consequences: 'Una ricaduta gestita con onestà può rafforzare il cambiamento. Una ricaduta negata o minimizzata tende a ripetersi.',
        altReadings: 'Una ricaduta non dimostra che “non puoi cambiare”. Dimostra che il piano ha bisogno di essere aggiornato.',
        altActions: 'Avere in anticipo un piano per la ricaduta: che cosa farai, con chi ne parlerai, come riparerai.',
        evidence: 'modello',
        source: 'linehan2014',
      },
      {
        id: 'motivazione',
        name: 'Motivazione al cambiamento',
        what: 'Le ragioni per cui vuoi cambiare. Possono essere esterne (salvare la relazione) o interne (essere la persona che vuoi essere).',
        how: 'Le motivazioni esterne sono potenti ma fragili: se la relazione finisce o migliora, possono svanire. Quelle interne tendono a durare di più.',
        why: 'Spesso si inizia a cambiare per paura di perdere qualcuno. È un punto di partenza legittimo, ma non sempre sufficiente.',
        daily: '«Lo faccio perché lei non mi lasci» diventa, col tempo, «Lo faccio perché non voglio essere una persona che spaventa chi ama».',
        consequences: 'Un cambiamento fondato solo sulla paura di perdere l’altra persona può trasformarsi in un nuovo strumento di pressione («sto cambiando, quindi devi restare»).',
        altReadings: 'Puoi cambiare prima di tutto per te stesso, e per il tipo di persona e di compagno che vuoi essere.',
        altActions: 'Scrivere nel piano le ragioni personali del cambiamento, che valgano anche indipendentemente da come andrà la relazione.',
        evidence: 'ipotesi',
      },
    ],
    examples: [
      { title: 'Un piano generico', text: '«Voglio essere meno geloso e più tranquillo. Mi impegnerò a fidarmi.» Sincero, ma impossibile da verificare.' },
      { title: 'Lo stesso piano, osservabile', text: '«Quando lei è fuori con amici, non le scriverò per chiedere dov’è o con chi è. Se sento l’impulso, aspetto 30 minuti e faccio il grounding. Ogni domenica annoto nel diario quante volte ho resistito e quante no.»' },
    ],
    selfCheck: [
      {
        id: 'cp-1',
        question: 'Perché vuoi cambiare, in questo momento?',
        options: [
          { label: 'Perché ho paura di perderla', feedback: 'È un motivo comprensibile e un punto di partenza onesto. Prova però a cercare anche ragioni che riguardino te, indipendentemente da come andrà la relazione: sono quelle che rendono il cambiamento più stabile.' },
          { label: 'Perché non mi piace come mi comporto', feedback: 'È una motivazione interna, che tende a durare. Tienila presente nei momenti in cui ricadere sembra più facile.' },
          { label: 'Perché lei me l’ha chiesto', feedback: 'Il fatto che lei te l’abbia chiesto è un’informazione importante. Ma se cambi solo per lei, rischi di trasformare il cambiamento in una moneta di scambio. Chiediti che cosa vuoi tu.' },
          { label: 'Non lo so ancora', feedback: 'Anche essere qui è un segnale. Scrivere le tue ragioni nel piano può aiutarti a chiarirle.' },
        ],
      },
    ],
    reflection: [
      'Qual è il comportamento che più di tutti vorresti interrompere?',
      'Come te ne accorgeresti, concretamente, se stessi cambiando?',
      'Che cosa farai la prima volta che ricadrai?',
    ],
    science: [
      { kind: 'evidence', evidence: 'evidenza', source: 'gollwitzer1999', text: 'Le intenzioni di implementazione specificano quando, dove e come si metterà in atto un comportamento. Numerosi studi sperimentali indicano che aumentano la probabilità di passare dall’intenzione all’azione.' },
      { kind: 'evidence', evidence: 'modello', source: 'neff2003', text: 'L’autocompassione è stata proposta come un atteggiamento che facilita il riconoscimento degli errori senza difesa e senza autodenigrazione.' },
      { kind: 'evidence', evidence: 'pratica', source: 'linehan2014', text: 'Nei programmi strutturati di cambiamento comportamentale, l’analisi della sequenza che ha portato a una ricaduta (catena comportamentale) è uno strumento centrale per aggiornare il piano.' },
    ],
    keyIdeas: [
      'Un cambiamento osservabile risponde a: che cosa, quando, come lo saprò.',
      'Le ricadute si analizzano, non si nascondono.',
      'Puoi cambiare prima di tutto per te stesso.',
    ],
  },
];
