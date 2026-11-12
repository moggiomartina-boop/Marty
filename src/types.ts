/**
 * Modello dei dati di "Oltre la reazione".
 * I contenuti (laboratori, scenari, esercizi) sono statici e tipizzati;
 * i dati personali (diario, piano, progressi) vivono solo in localStorage.
 */

export type LabId =
  | 'emozioni'
  | 'corpo'
  | 'fatti'
  | 'ciclo'
  | 'prospettive'
  | 'impatto'
  | 'radici'
  | 'parole'
  | 'confini';

/** Natura di un'affermazione: aiuta a distinguere modelli, evidenze e ipotesi. */
export type EvidenceKind = 'modello' | 'evidenza' | 'ipotesi' | 'pratica';

export interface Block {
  kind: 'p' | 'quote' | 'list' | 'note' | 'evidence';
  text?: string;
  items?: string[];
  evidence?: EvidenceKind;
  source?: string; // id bibliografico
}

export interface LabSection {
  id: string;
  title: string;
  blocks: Block[];
}

export type ToolId = 'emozioni' | 'respiro' | 'fatti' | 'ciclo' | 'prospettive' | 'impatto' | 'riparazione';

export interface Lab {
  id: LabId;
  number: number;
  title: string;
  subtitle: string;
  question: string;
  summary: string;
  accent: 'petrol' | 'sage' | 'sand' | 'terracotta';
  sections: LabSection[];
  keyIdeas: string[];
  reflection: string[];
  tool?: ToolId;
  sources: string[];
}

/* ---------- Scenari ramificati ---------- */

/** Qualità della risposta: NON è un giudizio morale, descrive la funzione della mossa. */
export type ChoiceStyle = 'impulsiva' | 'evitante' | 'consapevole';

export interface ScenarioChoice {
  id: string;
  label: string;
  style: ChoiceStyle;
  feedback: string;
  /** Cosa probabilmente sente / pensa l'altra persona dopo questa mossa. */
  otherSide: string;
  next: string | null; // id del nodo successivo, null = fine
}

export interface ScenarioNode {
  id: string;
  text: string;
  choices: ScenarioChoice[];
}

export interface Scenario {
  id: string;
  lab: LabId;
  title: string;
  context: string;
  relation: 'coppia' | 'famiglia' | 'lavoro' | 'amicizia' | 'sé';
  start: string;
  nodes: ScenarioNode[];
  insight: string;
  question: string;
}

/* ---------- Esercizi guidati ---------- */

export type StepType = 'text' | 'textarea' | 'chips' | 'single' | 'scale' | 'info';

export interface ExerciseStep {
  id: string;
  type: StepType;
  prompt: string;
  help?: string;
  options?: string[];
  min?: number;
  max?: number;
  minLabel?: string;
  maxLabel?: string;
  optional?: boolean;
}

export interface Exercise {
  id: string;
  lab: LabId;
  title: string;
  duration: string;
  intro: string;
  steps: ExerciseStep[];
  closing: string;
}

/* ---------- Dati personali ---------- */

export type AnswerValue = string | string[] | number;

export interface ScenarioRun {
  path: string[]; // id delle scelte
  completedAt: string;
}

export interface ExerciseResult {
  answers: Record<string, AnswerValue>;
  completedAt: string;
}

export interface JournalEntry {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  situation: string;
  facts: string;
  interpretation: string;
  emotions: string[];
  intensity: number; // 0-10
  body: string;
  impulse: string;
  action: string;
  impact: string;
  otherView: string;
  alternative: string;
  lab?: LabId;
}

export interface IfThen {
  id: string;
  when: string;
  then: string;
}

export interface PersonalPlan {
  motivation: string;
  values: string;
  triggers: string[];
  earlySignals: string[];
  pauseStrategies: string[];
  ifThen: IfThen[];
  repairPhrases: string[];
  boundaries: string[];
  support: string;
  reviewDate: string;
  updatedAt: string | null;
}

export interface FactsResult {
  correct: number;
  total: number;
  completedAt: string;
}

export interface Progress {
  visitedLabs: LabId[];
  readSections: string[]; // `${labId}/${sectionId}`
  scenarios: Record<string, ScenarioRun[]>;
  exercises: Record<string, ExerciseResult>;
  tools: Partial<Record<ToolId, string>>; // data ultimo utilizzo
  facts?: FactsResult;
}

export interface AppData {
  version: 1;
  onboarded: boolean;
  progress: Progress;
  journal: JournalEntry[];
  plan: PersonalPlan;
}
