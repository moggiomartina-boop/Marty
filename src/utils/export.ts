import type { AppData, JournalEntry, PersonalPlan } from '../types';
import { formatDate, formatDateTime } from './format';

/** Scarica un file generato nel browser: nessun dato lascia il dispositivo. */
export function downloadFile(filename: string, content: string, mime = 'text/plain;charset=utf-8'): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const today = () => new Date().toISOString().slice(0, 10);

const list = (items: string[]) => (items.length ? items.map((i) => `- ${i}`).join('\n') : '_(non compilato)_');
const para = (s: string) => (s.trim() ? s.trim() : '_(non compilato)_');

export function planToMarkdown(plan: PersonalPlan): string {
  return [
    '# Il mio piano di cambiamento',
    '_Oltre la reazione — documento personale_',
    plan.updatedAt ? `Ultimo aggiornamento: ${formatDate(plan.updatedAt)}` : '',
    '',
    '## Perché voglio cambiare',
    para(plan.motivation),
    '',
    '## I valori che voglio proteggere nelle relazioni',
    para(plan.values),
    '',
    '## Le situazioni che mi attivano',
    list(plan.triggers),
    '',
    '## I miei segnali precoci',
    list(plan.earlySignals),
    '',
    '## Come mi fermo',
    list(plan.pauseStrategies),
    '',
    '## Se… allora…',
    plan.ifThen.length ? plan.ifThen.map((x) => `- **Se** ${x.when} **allora** ${x.then}`).join('\n') : '_(non compilato)_',
    '',
    '## Frasi per riparare',
    list(plan.repairPhrases),
    '',
    '## I miei confini',
    list(plan.boundaries),
    '',
    '## Il mio sostegno',
    para(plan.support),
    '',
    plan.reviewDate ? `**Data di revisione:** ${formatDate(plan.reviewDate)}` : '',
  ]
    .filter((l, i, arr) => !(l === '' && arr[i - 1] === ''))
    .join('\n');
}

export function entryToMarkdown(e: JournalEntry): string {
  const f = (label: string, v: string) => (v.trim() ? `**${label}:** ${v.trim()}\n` : '');
  return [
    `## ${e.title || 'Senza titolo'}`,
    `_${formatDateTime(e.createdAt)}_`,
    '',
    f('Situazione', e.situation),
    f('Fatti', e.facts),
    f('Interpretazione', e.interpretation),
    e.emotions.length ? `**Emozioni:** ${e.emotions.join(', ')} (intensità ${e.intensity}/10)\n` : '',
    f('Nel corpo', e.body),
    f('Impulso', e.impulse),
    f('Che cosa ho fatto', e.action),
    f('Effetto sull’altro', e.impact),
    f('Il punto di vista dell’altro', e.otherView),
    f('Un’alternativa possibile', e.alternative),
  ]
    .filter(Boolean)
    .join('\n');
}

export function journalToMarkdown(entries: JournalEntry[]): string {
  return ['# Il mio diario', '_Oltre la reazione — documento personale_', '', ...entries.map(entryToMarkdown)].join('\n\n');
}

export const exportPlan = (plan: PersonalPlan) =>
  downloadFile(`piano-oltre-la-reazione-${today()}.md`, planToMarkdown(plan), 'text/markdown;charset=utf-8');

export const exportJournal = (entries: JournalEntry[]) =>
  downloadFile(`diario-oltre-la-reazione-${today()}.md`, journalToMarkdown(entries), 'text/markdown;charset=utf-8');

export const exportAll = (data: AppData) =>
  downloadFile(`oltre-la-reazione-backup-${today()}.json`, JSON.stringify(data, null, 2), 'application/json');
