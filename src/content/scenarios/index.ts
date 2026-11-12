import type { ChoiceStyle, LabId, Scenario, ScenarioChoice } from '../../types';
import { scenarios1 } from './data1';
import { scenarios2 } from './data2';
import { scenarios3 } from './data3';

export const scenarios: Scenario[] = [...scenarios1, ...scenarios2, ...scenarios3];

export const scenarioById = (id: string) => scenarios.find((s) => s.id === id);
export const scenariosByLab = (lab: LabId) => scenarios.filter((s) => s.lab === lab);

export function findChoice(s: Scenario, choiceId: string): ScenarioChoice | undefined {
  for (const n of s.nodes) {
    const c = n.choices.find((x) => x.id === choiceId);
    if (c) return c;
  }
  return undefined;
}

/** Etichette della funzione di una risposta: descrivono la mossa, non la persona. */
export const styleLabel: Record<ChoiceStyle, string> = {
  consapevole: 'Risposta consapevole',
  pressante: 'Pressione o accusa',
  controllante: 'Controllo o intimidazione',
  ritiro: 'Ritiro o punizione',
};

export const styleDescription: Record<ChoiceStyle, string> = {
  consapevole: 'Riconosci ciò che senti e scegli un comportamento che rispetta te e lei.',
  pressante: 'Il bisogno diventa insistenza, rimprovero o sospetto.',
  controllante: 'La libertà o la sicurezza dell’altra persona viene limitata.',
  ritiro: 'Ti sottrai o fai pesare la distanza, invece di dire ciò che senti.',
};

/**
 * Lettura del percorso: una riflessione, non un punteggio.
 * Il testo dipende dalla traiettoria delle scelte.
 */
export function readPath(s: Scenario, path: string[]): { title: string; text: string } {
  const choices = path.map((id) => findChoice(s, id)).filter(Boolean) as ScenarioChoice[];
  const styles = choices.map((c) => c.style);
  const first = styles[0];
  const last = styles[styles.length - 1];
  if (choices.some((c) => c.safety))
    return {
      title: 'In questo percorso c’è stato un momento di rischio',
      text: 'Una delle risposte che hai esplorato comporta intimidazione o limita la sicurezza dell’altra persona. Esplorarla qui serve a vederne le conseguenze, non a giudicarti. Se ti riconosci in quel comportamento nella vita reale, la priorità è interromperlo e cercare un supporto professionale: trovi il protocollo nel laboratorio 5.',
    };
  if (styles.every((x) => x === 'consapevole'))
    return {
      title: 'Hai tenuto lo spazio tra emozione e comportamento',
      text: 'In questo percorso hai riconosciuto ciò che sentivi e hai scelto risposte che rispettano anche lei. Nella vita reale non sarà sempre così facile: ciò che conta è sapere che quello spazio esiste e che puoi allenarlo.',
    };
  if (first !== 'consapevole' && last === 'consapevole')
    return {
      title: 'Sei tornato indietro a metà strada',
      text: 'La prima mossa è partita dalla paura o dalla rabbia, poi sei riuscito a riconoscerla e a riparare. È l’esperienza più realistica: non evitare ogni reazione, ma accorgersene e assumersene la responsabilità.',
    };
  if (first === 'consapevole' && last !== 'consapevole')
    return {
      title: 'Un buon inizio, poi la reazione è tornata',
      text: 'Hai aperto in modo consapevole, ma nel secondo momento l’impulso ha ripreso il sopravvento. Succede spesso quando l’emozione si riaccende. Quale passaggio ti è sembrato più difficile?',
    };
  if (styles.every((x) => x === 'ritiro'))
    return {
      title: 'Hai scelto la distanza',
      text: 'Il ritiro protegge dal confronto ma lascia l’altra persona senza informazioni, e spesso diventa una forma di punizione. Che cosa ti renderebbe possibile dire ciò che senti senza accusare?',
    };
  return {
    title: 'La reazione ha guidato il percorso',
    text: 'In questo percorso la paura o la rabbia hanno guidato le scelte. Non è un giudizio su di te: è ciò che succede quando l’emozione decide al posto tuo. Riprova lo scenario e osserva come cambia ciò che vive lei.',
  };
}
