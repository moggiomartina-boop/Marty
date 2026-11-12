import type { AppData, ClassifierResult, ExerciseResult, JournalEntry, LabId, PersonalPlan, SafetyState, ToolId } from '../types';
import { initialData, normalize } from './storage';

export type Action =
  | { type: 'onboard' }
  | { type: 'visitLab'; lab: LabId }
  | { type: 'toggleSection'; key: string }
  | { type: 'completeScenario'; id: string; path: string[] }
  | { type: 'completeExercise'; id: string; result: ExerciseResult }
  | { type: 'resetExercise'; id: string }
  | { type: 'useTool'; tool: ToolId }
  | { type: 'selfCheck'; id: string; option: number }
  | { type: 'classifierResult'; id: string; result: ClassifierResult }
  | { type: 'helpOpened'; id: string }
  | { type: 'safetyCheck'; flagged: boolean }
  | { type: 'safetyAcknowledge'; exitPlan: SafetyState['exitPlan'] }
  | { type: 'saveEntry'; entry: JournalEntry }
  | { type: 'deleteEntry'; id: string }
  | { type: 'deleteAllEntries' }
  | { type: 'savePlan'; plan: PersonalPlan }
  | { type: 'resetPlan' }
  | { type: 'import'; data: unknown }
  | { type: 'resetAll' };

export function reducer(state: AppData, action: Action): AppData {
  const now = () => new Date().toISOString();
  switch (action.type) {
    case 'onboard':
      return { ...state, onboarded: true };
    case 'visitLab':
      if (state.progress.visitedLabs.includes(action.lab)) return state;
      return { ...state, progress: { ...state.progress, visitedLabs: [...state.progress.visitedLabs, action.lab] } };
    case 'toggleSection': {
      const read = state.progress.readSections;
      const next = read.includes(action.key) ? read.filter((k) => k !== action.key) : [...read, action.key];
      return { ...state, progress: { ...state.progress, readSections: next } };
    }
    case 'completeScenario': {
      const runs = state.progress.scenarios[action.id] ?? [];
      const run = { path: action.path, completedAt: now() };
      return {
        ...state,
        progress: { ...state.progress, scenarios: { ...state.progress.scenarios, [action.id]: [...runs, run].slice(-10) } },
      };
    }
    case 'completeExercise':
      return { ...state, progress: { ...state.progress, exercises: { ...state.progress.exercises, [action.id]: action.result } } };
    case 'resetExercise': {
      const rest = { ...state.progress.exercises };
      delete rest[action.id];
      return { ...state, progress: { ...state.progress, exercises: rest } };
    }
    case 'useTool':
      return { ...state, progress: { ...state.progress, tools: { ...state.progress.tools, [action.tool]: now() } } };
    case 'selfCheck':
      return { ...state, progress: { ...state.progress, selfChecks: { ...state.progress.selfChecks, [action.id]: action.option } } };
    case 'classifierResult':
      return { ...state, progress: { ...state.progress, classifiers: { ...state.progress.classifiers, [action.id]: action.result } } };
    case 'helpOpened':
      if (state.progress.helpOpened.includes(action.id)) return state;
      return { ...state, progress: { ...state.progress, helpOpened: [...state.progress.helpOpened, action.id] } };
    case 'safetyCheck':
      return {
        ...state,
        safety: {
          ...state.safety,
          flagged: action.flagged,
          checkedAt: now(),
          // Una nuova segnalazione richiede di rileggere il protocollo.
          acknowledgedAt: action.flagged ? null : state.safety.acknowledgedAt,
        },
      };
    case 'safetyAcknowledge':
      return { ...state, safety: { ...state.safety, acknowledgedAt: now(), exitPlan: action.exitPlan } };
    case 'saveEntry': {
      const exists = state.journal.some((e) => e.id === action.entry.id);
      const journal = exists ? state.journal.map((e) => (e.id === action.entry.id ? action.entry : e)) : [action.entry, ...state.journal];
      return { ...state, journal };
    }
    case 'deleteEntry':
      return { ...state, journal: state.journal.filter((e) => e.id !== action.id) };
    case 'deleteAllEntries':
      return { ...state, journal: [] };
    case 'savePlan':
      return { ...state, plan: { ...action.plan, updatedAt: now() } };
    case 'resetPlan':
      return { ...state, plan: initialData().plan };
    case 'import':
      return { ...normalize(action.data), onboarded: true };
    case 'resetAll':
      return initialData();
    default:
      return state;
  }
}
