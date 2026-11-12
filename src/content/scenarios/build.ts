import type { ChoiceStyle, LabId, Scenario, ScenarioChoice } from '../../types';

/**
 * Formato compatto per scrivere gli scenari.
 * Ogni scenario ha:
 *  - un momento iniziale con 4 risposte (una per ciascuna funzione: consapevole,
 *    pressante, controllante, ritiro);
 *  - due ramificazioni: "apertura" (dopo una risposta consapevole) e "tensione"
 *    (dopo le altre), ciascuna con 2 risposte e feedback propri.
 * La tupla di una scelta è: [testo, funzione, feedback, che cosa vive lei, sicurezza?]
 */
export type C = [label: string, style: ChoiceStyle, feedback: string, otherSide: string, safety?: boolean];

export interface ScenarioSpec {
  id: string;
  lab: LabId;
  title: string;
  context: string;
  prompt: string;
  start: [C, C, C, C];
  apertura: { text: string; choices: [C, C] };
  tensione: { text: string; choices: [C, C] };
  insight: string;
  question: string;
}

const toChoice = (id: string, c: C, next: string | null): ScenarioChoice => ({
  id,
  label: c[0],
  style: c[1],
  feedback: c[2],
  otherSide: c[3],
  next,
  ...(c[4] ? { safety: true } : {}),
});

export function scenario(s: ScenarioSpec): Scenario {
  return {
    id: s.id,
    lab: s.lab,
    title: s.title,
    context: s.context,
    start: 'start',
    insight: s.insight,
    question: s.question,
    nodes: [
      {
        id: 'start',
        text: s.prompt,
        choices: s.start.map((c, i) => toChoice('abcd'[i], c, c[1] === 'consapevole' ? 'apertura' : 'tensione')),
      },
      { id: 'apertura', text: s.apertura.text, choices: s.apertura.choices.map((c, i) => toChoice(`p${i + 1}`, c, null)) },
      { id: 'tensione', text: s.tensione.text, choices: s.tensione.choices.map((c, i) => toChoice(`t${i + 1}`, c, null)) },
    ],
  };
}
