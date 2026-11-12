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
  toolUsed: boolean;
  hasTool: boolean;
  ratio: number;
}

/** Avanzamento di un laboratorio: letture, scenari, esercizi, strumento. */
export function labProgress(data: AppData, lab: LabId): LabProgress {
  const l = labs.find((x) => x.id === lab)!;
  const sectionsRead = l.sections.filter((s) => data.progress.readSections.includes(`${lab}/${s.id}`)).length;
  const sc = scenarios.filter((s) => s.lab === lab);
  const scenariosDone = sc.filter((s) => (data.progress.scenarios[s.id]?.length ?? 0) > 0).length;
  const ex = exercises.filter((e) => e.lab === lab);
  const exercisesDone = ex.filter((e) => data.progress.exercises[e.id]).length;
  const hasTool = !!l.tool;
  const toolUsed = !!(l.tool && data.progress.tools[l.tool]);
  const total = l.sections.length + sc.length + ex.length + (hasTool ? 1 : 0);
  const done = sectionsRead + scenariosDone + exercisesDone + (toolUsed ? 1 : 0);
  return {
    sectionsRead,
    sectionsTotal: l.sections.length,
    scenariosDone,
    scenariosTotal: sc.length,
    exercisesDone,
    exercisesTotal: ex.length,
    toolUsed,
    hasTool,
    ratio: total ? done / total : 0,
  };
}

export function overallProgress(data: AppData): number {
  const all = labs.map((l) => labProgress(data, l.id).ratio);
  return all.reduce((a, b) => a + b, 0) / all.length;
}

/** Suggerisce il prossimo laboratorio: il primo non completato, in ordine. */
export function nextLab(data: AppData) {
  return labs.find((l) => labProgress(data, l.id).ratio < 1) ?? null;
}

/** Emozioni più frequenti nel diario (descrittivo, non valutativo). */
export function topEmotions(data: AppData, n = 6): { word: string; count: number }[] {
  const m = new Map<string, number>();
  data.journal.forEach((e) => e.emotions.forEach((w) => m.set(w, (m.get(w) ?? 0) + 1)));
  return [...m.entries()]
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, n);
}

/** Numero di voci di diario per settimana, ultime `weeks` settimane. */
export function journalByWeek(data: AppData, weeks = 8): { label: string; count: number }[] {
  const now = new Date();
  const startOfWeek = (d: Date) => {
    const x = new Date(d);
    const day = (x.getDay() + 6) % 7; // lunedì = 0
    x.setHours(0, 0, 0, 0);
    x.setDate(x.getDate() - day);
    return x;
  };
  const current = startOfWeek(now);
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
