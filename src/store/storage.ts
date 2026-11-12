import type { AppData, JournalEntry, PersonalPlan, Progress, SafetyState } from '../types';

/** Chiave unica in localStorage. Tutti i dati restano sul dispositivo. */
export const STORAGE_KEY = 'oltre-la-reazione:v2';

export const emptyPlan = (): PersonalPlan => ({
  behavior: '',
  triggers: [],
  emotions: [],
  thoughts: [],
  alternative: '',
  partnerLimit: '',
  measures: [],
  relapse: '',
  ifThen: [],
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
  selfChecks: {},
  classifiers: {},
  helpOpened: [],
});

export const emptySafety = (): SafetyState => ({
  flagged: false,
  checkedAt: null,
  acknowledgedAt: null,
  exitPlan: { where: '', who: '', message: '' },
});

export const initialData = (): AppData => ({
  version: 2,
  onboarded: false,
  progress: emptyProgress(),
  journal: [],
  plan: emptyPlan(),
  safety: emptySafety(),
});

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const strArr = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []);
const str = (v: unknown): string => (typeof v === 'string' ? v : '');
const rid = () => Math.random().toString(36).slice(2);

function normalizeEntry(e: Record<string, unknown>): JournalEntry {
  const now = new Date().toISOString();
  return {
    id: str(e.id) || rid(),
    createdAt: str(e.createdAt) || now,
    updatedAt: str(e.updatedAt) || str(e.createdAt) || now,
    title: str(e.title),
    situation: str(e.situation),
    facts: str(e.facts),
    interpretation: str(e.interpretation),
    fear: str(e.fear),
    emotions: strArr(e.emotions),
    intensity: typeof e.intensity === 'number' ? Math.max(0, Math.min(10, e.intensity)) : 5,
    body: str(e.body),
    impulse: str(e.impulse),
    action: str(e.action),
    impact: str(e.impact),
    otherView: str(e.otherView),
    alternative: str(e.alternative),
    lab: typeof e.lab === 'string' ? (e.lab as JournalEntry['lab']) : undefined,
  };
}

/**
 * Normalizza dati provenienti da localStorage o da un file importato.
 * Ogni campo mancante o malformato è sostituito dal valore di default,
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
    selfChecks: isObj(p.selfChecks)
      ? Object.fromEntries(Object.entries(p.selfChecks).filter(([, v]) => typeof v === 'number')) as Record<string, number>
      : {},
    classifiers: isObj(p.classifiers) ? (p.classifiers as Progress['classifiers']) : {},
    helpOpened: strArr(p.helpOpened),
  };

  const journal = Array.isArray(raw.journal) ? raw.journal.filter(isObj).map(normalizeEntry) : [];

  const pl = isObj(raw.plan) ? raw.plan : {};
  const plan: PersonalPlan = {
    behavior: str(pl.behavior),
    triggers: strArr(pl.triggers),
    emotions: strArr(pl.emotions),
    thoughts: strArr(pl.thoughts),
    alternative: str(pl.alternative),
    partnerLimit: str(pl.partnerLimit),
    measures: strArr(pl.measures),
    relapse: str(pl.relapse),
    ifThen: Array.isArray(pl.ifThen) ? pl.ifThen.filter(isObj).map((x) => ({ id: str(x.id) || rid(), when: str(x.when), then: str(x.then) })) : [],
    support: str(pl.support),
    reviewDate: str(pl.reviewDate),
    updatedAt: typeof pl.updatedAt === 'string' ? pl.updatedAt : null,
  };

  const s = isObj(raw.safety) ? raw.safety : {};
  const ep = isObj(s.exitPlan) ? s.exitPlan : {};
  const safety: SafetyState = {
    flagged: s.flagged === true,
    checkedAt: typeof s.checkedAt === 'string' ? s.checkedAt : null,
    acknowledgedAt: typeof s.acknowledgedAt === 'string' ? s.acknowledgedAt : null,
    exitPlan: { where: str(ep.where), who: str(ep.who), message: str(ep.message) },
  };

  return { version: 2, onboarded: raw.onboarded === true, progress, journal, plan, safety };
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

/** Restituisce false se il salvataggio non è riuscito (storage pieno o disabilitato). */
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
