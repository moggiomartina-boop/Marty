import type { AppData, PersonalPlan, Progress } from '../types';

/** Chiave unica in localStorage. Tutti i dati restano sul dispositivo. */
export const STORAGE_KEY = 'oltre-la-reazione:v1';

export const emptyPlan = (): PersonalPlan => ({
  motivation: '',
  values: '',
  triggers: [],
  earlySignals: [],
  pauseStrategies: [],
  ifThen: [],
  repairPhrases: [],
  boundaries: [],
  support: '',
  reviewDate: '',
  updatedAt: null,
});

export const emptyProgress = (): Progress => ({
  visitedLabs: [],
  readSections: [],
  scenarios: {},
  exercises: {},
  tools: {},
});

export const initialData = (): AppData => ({
  version: 1,
  onboarded: false,
  progress: emptyProgress(),
  journal: [],
  plan: emptyPlan(),
});

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const strArr = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []);
const str = (v: unknown): string => (typeof v === 'string' ? v : '');

/**
 * Normalizza dati provenienti da localStorage o da un file importato.
 * Qualsiasi campo mancante o malformato viene sostituito dal valore di default,
 * così un dato corrotto non blocca mai l'app.
 */
export function normalize(raw: unknown): AppData {
  const base = initialData();
  if (!isObj(raw)) return base;

  const p = isObj(raw.progress) ? raw.progress : {};
  const progress: Progress = {
    visitedLabs: strArr(p.visitedLabs) as Progress['visitedLabs'],
    readSections: strArr(p.readSections),
    scenarios: isObj(p.scenarios) ? (p.scenarios as Progress['scenarios']) : {},
    exercises: isObj(p.exercises) ? (p.exercises as Progress['exercises']) : {},
    tools: isObj(p.tools) ? (p.tools as Progress['tools']) : {},
    facts: isObj(p.facts) ? (p.facts as unknown as Progress['facts']) : undefined,
  };

  const journal = Array.isArray(raw.journal)
    ? raw.journal.filter(isObj).map((e) => ({
        id: str(e.id) || Math.random().toString(36).slice(2),
        createdAt: str(e.createdAt) || new Date().toISOString(),
        updatedAt: str(e.updatedAt) || str(e.createdAt) || new Date().toISOString(),
        title: str(e.title),
        situation: str(e.situation),
        facts: str(e.facts),
        interpretation: str(e.interpretation),
        emotions: strArr(e.emotions),
        intensity: typeof e.intensity === 'number' ? Math.max(0, Math.min(10, e.intensity)) : 5,
        body: str(e.body),
        impulse: str(e.impulse),
        action: str(e.action),
        impact: str(e.impact),
        otherView: str(e.otherView),
        alternative: str(e.alternative),
        lab: typeof e.lab === 'string' ? (e.lab as AppData['journal'][number]['lab']) : undefined,
      }))
    : [];

  const pl = isObj(raw.plan) ? raw.plan : {};
  const plan: PersonalPlan = {
    motivation: str(pl.motivation),
    values: str(pl.values),
    triggers: strArr(pl.triggers),
    earlySignals: strArr(pl.earlySignals),
    pauseStrategies: strArr(pl.pauseStrategies),
    ifThen: Array.isArray(pl.ifThen)
      ? pl.ifThen.filter(isObj).map((x) => ({ id: str(x.id) || Math.random().toString(36).slice(2), when: str(x.when), then: str(x.then) }))
      : [],
    repairPhrases: strArr(pl.repairPhrases),
    boundaries: strArr(pl.boundaries),
    support: str(pl.support),
    reviewDate: str(pl.reviewDate),
    updatedAt: typeof pl.updatedAt === 'string' ? pl.updatedAt : null,
  };

  return { version: 1, onboarded: raw.onboarded === true, progress, journal, plan };
}

export function loadData(): AppData {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialData();
    return normalize(JSON.parse(raw));
  } catch {
    return initialData();
  }
}

/** Restituisce false se il salvataggio non è riuscito (es. storage pieno o disabilitato). */
export function saveData(data: AppData): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function clearData(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage non disponibile: nulla da cancellare */
  }
}
