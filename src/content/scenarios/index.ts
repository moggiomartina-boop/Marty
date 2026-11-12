import type { ChoiceStyle, LabId, Scenario, ScenarioChoice } from '../../types';
import { scenariosPart1 } from './part1';
import { scenariosPart2 } from './part2';
import { scenariosPart3 } from './part3';

export const scenarios: Scenario[] = [...scenariosPart1, ...scenariosPart2, ...scenariosPart3];

export const scenarioById = (id: string) => scenarios.find((s) => s.id === id);
export const scenariosByLab = (lab: LabId) => scenarios.filter((s) => s.lab === lab);

/** Trova una scelta per id all'interno di uno scenario. */
export function findChoice(s: Scenario, choiceId: string): ScenarioChoice | undefined {
  for (const n of s.nodes) {
    const c = n.choices.find((x) => x.id === choiceId);
    if (c) return c;
  }
  return undefined;
}

export const styleLabel: Record<ChoiceStyle, string> = {
  impulsiva: 'Mossa d’impulso',
  evitante: 'Mossa di ritiro',
  consapevole: 'Mossa consapevole',
};

export const styleDescription: Record<ChoiceStyle, string> = {
  impulsiva: 'L’emozione guida l’azione prima che ci sia spazio per scegliere.',
  evitante: 'Ci si protegge dal disagio sottraendosi, tacendo o rinviando.',
  consapevole: 'Si riconosce ciò che accade dentro di sé e si sceglie una risposta.',
};

/**
 * Lettura del percorso: non un punteggio, ma una descrizione della traiettoria.
 * Restituisce un testo diverso a seconda di come si è mosso il percorso.
 */
export function readPath(s: Scenario, path: string[]): { title: string; text: string } {
  const styles = path.map((id) => findChoice(s, id)?.style).filter(Boolean) as ChoiceStyle[];
  const [first, last] = [styles[0], styles[styles.length - 1]];
  if (styles.every((x) => x === 'consapevole'))
    return {
      title: 'Hai tenuto lo spazio tra emozione e risposta',
      text: 'In questo percorso hai riconosciuto ciò che accadeva dentro di te prima di agire. Nella vita reale non sarà sempre possibile, ed è normale: ciò che conta è sapere che quello spazio esiste.',
    };
  if (first !== 'consapevole' && last === 'consapevole')
    return {
      title: 'Hai cambiato direzione a metà strada',
      text: 'La prima mossa è partita in automatico, poi sei riuscito/a a rientrare. È probabilmente l’esperienza più realistica: non evitare ogni reazione, ma accorgersene e riparare.',
    };
  if (first === 'consapevole' && last !== 'consapevole')
    return {
      title: 'Un buon inizio, poi la tensione ha ripreso il sopravvento',
      text: 'Hai aperto con consapevolezza, ma nel secondo passaggio la reazione automatica è tornata. Succede spesso quando l’altro non risponde come speravamo. Quale passaggio ti è risultato più difficile?',
    };
  if (styles.every((x) => x === 'evitante'))
    return {
      title: 'Hai scelto di proteggerti dal confronto',
      text: 'Il ritiro protegge dal disagio nel breve periodo. Vale la pena chiedersi che cosa costa nel tempo, a te e alla relazione, e se c’è un modo di esprimere il bisogno che ti sembri sicuro.',
    };
  return {
    title: 'Il ciclo ha seguito il suo corso',
    text: 'In questo percorso la reazione automatica ha guidato le mosse. Non è un giudizio: è ciò che succede a tutti sotto pressione. Riprova lo scenario scegliendo un’altra strada e osserva come cambia la risposta dell’altro.',
  };
}
