import { exercises } from '../content/exercises';
import { labs } from '../content/labs';
import { scenarios } from '../content/scenarios';
import type { AppData, LabId } from '../types';

export interface LabProgress {
  sectionsRead: number;
  sectionsTotal: number;
  scenariosDone: number;
  scenariosTotal: number;
  exercisesDone: number;
  exercisesTotal: number;
  toolsUsed: number;
  toolsTotal: number;
  selfDone: number;
  selfTotal: number;
  ratio: number;
}

/**
 * Avanzamento di un laboratorio: letture, autoriflessione, strumenti, scenari, esercizi.
 * È un indicatore di esplorazione, non una valutazione.
 */
export function labProgress(data: AppData, lab: LabId): LabProgress {
  const l = labs.find((x) => x.id === lab)!;
  const sectionKeys = ['intro', ...l.sections.map((s) => s.id), 'concetti', 'scienza'];
  const sectionsRead = sectionKeys.filter((k) => data.progress.readSections.includes(`${lab}/${k}`)).length;
  const sc = scenarios.filter((s) => s.lab === lab);
  const scenariosDone = sc.filter((s) => (data.progress.scenarios[s.id]?.length ?? 0) > 0).length;
  const ex = exercises.filter((e) => e.lab === lab);
  const exercisesDone = ex.filter((e) => data.progress.exercises[e.id]).length;
  const toolsUsed = l.tools.filter((t) => data.progress.tools[t]).length;
  const selfDone = l.selfCheck.filter((q) => data.progress.selfChecks[q.id] !== undefined).length;
  const total = sectionKeys.length + sc.length + ex.length + l.tools.length + l.selfCheck.length;
  const done = sectionsRead + scenariosDone + exercisesDone + toolsUsed + selfDone;
  return {
    sectionsRead,
    sectionsTotal: sectionKeys.length,
    scenariosDone,
    scenariosTotal: sc.length,
    exercisesDone,
    exercisesTotal: ex.length,
    toolsUsed,
    toolsTotal: l.tools.length,
    selfDone,
    selfTotal: l.selfCheck.length,
    ratio: total ? done / total : 0,
  };
}

/** Un laboratorio è considerato completato quando è stato esplorato almeno all'80%. */
export const isLabCompleted = (data: AppData, lab: LabId) => labProgress(data, lab).ratio >= 0.8;

export function overallProgress(data: AppData): number {
  const all = labs.map((l) => labProgress(data, l.id).ratio);
  return all.reduce((a, b) => a + b, 0) / all.length;
}

export function nextLab(data: AppData) {
  return labs.find((l) => !isLabCompleted(data, l.id)) ?? null;
}

export function topEmotions(data: AppData, n = 6): { word: string; count: number }[] {
  const m = new Map<string, number>();
  data.journal.forEach((e) => e.emotions.forEach((w) => m.set(w, (m.get(w) ?? 0) + 1)));
  return [...m.entries()]
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, n);
}

export function journalByWeek(data: AppData, weeks = 8): { label: string; count: number }[] {
  const startOfWeek = (d: Date) => {
    const x = new Date(d);
    const day = (x.getDay() + 6) % 7;
    x.setHours(0, 0, 0, 0);
    x.setDate(x.getDate() - day);
    return x;
  };
  const current = startOfWeek(new Date());
  const buckets = Array.from({ length: weeks }, (_, i) => {
    const start = new Date(current);
    start.setDate(start.getDate() - (weeks - 1 - i) * 7);
    return { start, count: 0 };
  });
  data.journal.forEach((e) => {
    const d = startOfWeek(new Date(e.createdAt)).getTime();
    const b = buckets.find((x) => x.start.getTime() === d);
    if (b) b.count++;
  });
  const fmt = new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'short' });
  return buckets.map((b) => ({ label: fmt.format(b.start), count: b.count }));
}
