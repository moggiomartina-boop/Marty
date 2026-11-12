/**
 * Modello dei dati di "Oltre la reazione".
 * I contenuti (laboratori, scenari, esercizi) sono statici e tipizzati;
 * i dati personali (diario, piano, progressi, verifica di sicurezza)
 * vivono solo in localStorage sul dispositivo.
 */

export type LabId =
  | 'mondo-interiore'
  | 'storie'
  | 'fiducia'
  | 'controllo'
  | 'rabbia'
  | 'altra-persona'
  | 'due-bisogni'
  | 'reagire'
  | 'comportamenti';

/** Natura di un'affermazione: distingue evidenze, modelli e ipotesi. */
export type EvidenceKind = 'modello' | 'evidenza' | 'ipotesi' | 'pratica';

export interface Block {
  kind: 'p' | 'quote' | 'list' | 'note' | 'evidence' | 'warning';
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

/**
 * Ogni concetto psicologico è spiegato secondo sette passaggi fissi:
 * che cos'è, come funziona, perché può svilupparsi, come si manifesta,
 * conseguenze, interpretazioni alternative, comportamenti alternativi.
 */
export interface Concept {
  id: string;
  name: string;
  what: string;
  how: string;
  why: string;
  daily: string;
  consequences: string;
  altReadings: string;
  altActions: string;
  evidence?: EvidenceKind;
  source?: string;
}

export interface Example {
  title: string;
  text: string;
}

/** Domanda di autoriflessione con feedback diverso per ogni risposta. */
export interface SelfCheckItem {
  id: string;
  question: string;
  options: { label: string; feedback: string }[];
}

export type ToolId =
  | 'sentire'
  | 'ciclo'
  | 'storie'
  | 'fiducia'
  | 'controllo'
  | 'protocollo'
  | 'respiro'
  | 'circolo'
  | 'prospettive'
  | 'bisogni'
  | 'riparazione'
  | 'cassetta'
  | 'promesse';

export interface Lab {
  id: LabId;
  number: number;
  title: string;
  subtitle: string;
  question: string;
  summary: string;
  accent: 'petrol' | 'sage' | 'sand' | 'terracotta';
  intro: string[];
  sections: LabSection[]; // meccanismi coinvolti
  concepts: Concept[];
  examples: Example[];
  selfCheck: SelfCheckItem[];
  reflection: string[]; // domande aperte
  science: Block[]; // approfondimento scientifico
  keyIdeas: string[];
  tools: ToolId[];
  sources: string[];
}

/* ---------- Scenari ramificati ---------- */

/**
 * Funzione della risposta. NON è un giudizio sulla persona:
 * descrive che cosa fa quella mossa nella relazione.
 */
export type ChoiceStyle = 'consapevole' | 'pressante' | 'controllante' | 'ritiro';

export interface ScenarioChoice {
  id: string;
  label: string;
  style: ChoiceStyle;
  feedback: string;
  otherSide: string; // che cosa può vivere l'altra persona
  next: string | null;
  /** Mossa che comporta intimidazione o rischio fisico: mostra le indicazioni di sicurezza. */
  safety?: boolean;
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
  /** Esercizio "ordinario" sospeso quando la verifica di sicurezza segnala un rischio. */
  gated?: boolean;
}

/* ---------- Dati personali ---------- */

export type AnswerValue = string | string[] | number;

export interface ScenarioRun {
  path: string[];
  completedAt: string;
}

export interface ExerciseResult {
  answers: Record<string, AnswerValue>;
  completedAt: string;
}

export interface ClassifierResult {
  answered: number;
  matching: number;
  total: number;
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
  fear: string;
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

/** Piano personale: i campi seguono il laboratorio 9. */
export interface PersonalPlan {
  behavior: string;
  triggers: string[];
  emotions: string[];
  thoughts: string[];
  alternative: string;
  partnerLimit: string;
  measures: string[];
  relapse: string;
  ifThen: IfThen[];
  support: string;
  reviewDate: string;
  updatedAt: string | null;
}

export interface SafetyState {
  /** Ultima verifica: almeno una risposta indica un rischio concreto. */
  flagged: boolean;
  checkedAt: string | null;
  /** L'utente ha letto il protocollo e compilato il proprio piano di uscita. */
  acknowledgedAt: string | null;
  exitPlan: { where: string; who: string; message: string };
}

export interface Progress {
  visitedLabs: LabId[];
  readSections: string[]; // `${labId}/${sectionId}`
  scenarios: Record<string, ScenarioRun[]>;
  exercises: Record<string, ExerciseResult>;
  tools: Partial<Record<ToolId, string>>;
  selfChecks: Record<string, number>; // id domanda → indice risposta
  classifiers: Record<string, ClassifierResult>;
  helpOpened: string[];
}

export interface AppData {
  version: 2;
  onboarded: boolean;
  progress: Progress;
  journal: JournalEntry[];
  plan: PersonalPlan;
  safety: SafetyState;
}
