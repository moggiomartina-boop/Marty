/** Frasi frequenti nei momenti di tensione: intenzione, impatto probabile, alternativa. */
export interface ImpactPhrase {
  id: string;
  phrase: string;
  intention: string;
  impact: string;
  alternative: string;
}

export const impactPhrases: ImpactPhrase[] = [
  {
    id: 'calmati',
    phrase: '«Calmati!»',
    intention: 'Abbassare la tensione, fermare l’escalation.',
    impact: 'Spesso arriva come “la tua emozione è sbagliata”: l’altro si sente invalidato e si agita di più.',
    alternative: '«Vedo che sei molto arrabbiato/a. Voglio capire: che cosa ti ha colpito di più?»',
  },
  {
    id: 'sempre',
    phrase: '«Fai sempre così.»',
    intention: 'Far capire che il problema si ripete e pesa.',
    impact: 'La generalizzazione invita a cercare l’eccezione (“non è vero, l’altra volta…”) e diventa un giudizio sulla persona.',
    alternative: '«È la terza volta questo mese e comincia a pesarmi. Possiamo parlarne?»',
  },
  {
    id: 'scherzo',
    phrase: '«Era solo uno scherzo.»',
    intention: 'Chiarire che non c’era cattiveria.',
    impact: 'Sposta il problema sulla sensibilità dell’altro: “sei tu che te la prendi”. La ferita viene negata.',
    alternative: '«Per me era uno scherzo, ma vedo che ti ha ferito. Mi dispiace.»',
  },
  {
    id: 'fai-come-vuoi',
    phrase: '«Fai come vuoi.»',
    intention: 'Chiudere una discussione estenuante.',
    impact: 'Suona come ritiro o punizione; l’altro resta solo con la decisione e con il dubbio sul tuo stato d’animo.',
    alternative: '«Sono troppo stanco/a per decidere ora. Ne riparliamo domani?»',
  },
  {
    id: 'niente',
    phrase: '«Niente, va tutto bene.»',
    intention: 'Evitare un conflitto, non pesare sull’altro.',
    impact: 'Se il tono dice il contrario, l’altro riceve un doppio messaggio e non sa a cosa credere.',
    alternative: '«Qualcosa mi ha dato fastidio, ma ho bisogno di un po’ di tempo prima di parlarne.»',
  },
  {
    id: 'non-capisci',
    phrase: '«Tu non capisci.»',
    intention: 'Esprimere frustrazione per non sentirsi compresi.',
    impact: 'Chiude la porta: l’altro si sente escluso proprio mentre forse sta cercando di capire.',
    alternative: '«Non mi sento capito/a. Posso provare a spiegarti meglio cosa intendo?»',
  },
  {
    id: 'esagerato',
    phrase: '«Stai esagerando.»',
    intention: 'Riportare la situazione a proporzioni più realistiche.',
    impact: 'Invalida l’esperienza dell’altro, che tenderà a difenderla con più forza.',
    alternative: '«Per te è molto importante, lo vedo. Aiutami a capire perché.»',
  },
  {
    id: 'scusa-ma',
    phrase: '«Scusa, ma anche tu…»',
    intention: 'Ammettere la propria parte e far notare quella dell’altro.',
    impact: 'Il “ma” cancella la scusa: l’altro sente solo la controaccusa.',
    alternative: '«Scusa per come ho reagito.» (E, in un altro momento: «Vorrei parlarti anche di una cosa che mi ha ferito.»)',
  },
];
