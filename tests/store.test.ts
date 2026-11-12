import { beforeEach, describe, expect, it } from 'vitest';
import { reducer } from '../src/store/reducer';
import { initialData, loadData, normalize, saveData, STORAGE_KEY } from '../src/store/storage';
import { labProgress } from '../src/store/selectors';
import type { JournalEntry } from '../src/types';
import { planToMarkdown } from '../src/utils/export';
import { checkRepair } from '../src/tools/RepairBuilder';

const entry = (id: string, title = 'Prova'): JournalEntry => ({
  id,
  createdAt: '2026-11-01T10:00:00.000Z',
  updatedAt: '2026-11-01T10:00:00.000Z',
  title,
  situation: 's',
  facts: '',
  interpretation: '',
  emotions: ['delusione'],
  intensity: 6,
  body: '',
  impulse: '',
  action: '',
  impact: '',
  otherView: '',
  alternative: '',
});

describe('reducer', () => {
  it('crea, modifica ed elimina voci di diario', () => {
    let s = reducer(initialData(), { type: 'saveEntry', entry: entry('1') });
    s = reducer(s, { type: 'saveEntry', entry: entry('2') });
    expect(s.journal.map((e) => e.id)).toEqual(['2', '1']);
    s = reducer(s, { type: 'saveEntry', entry: entry('1', 'Modificata') });
    expect(s.journal.find((e) => e.id === '1')?.title).toBe('Modificata');
    expect(s.journal).toHaveLength(2);
    s = reducer(s, { type: 'deleteEntry', id: '1' });
    expect(s.journal.map((e) => e.id)).toEqual(['2']);
  });

  it('registra scenari, esercizi e letture nel progresso', () => {
    let s = reducer(initialData(), { type: 'completeScenario', id: 'cena-anniversario', path: ['c', 'c1'] });
    s = reducer(s, { type: 'toggleSection', key: 'emozioni/segnale' });
    s = reducer(s, { type: 'completeExercise', id: 'iceberg', result: { answers: {}, completedAt: 'x' } });
    s = reducer(s, { type: 'useTool', tool: 'emozioni' });
    const p = labProgress(s, 'emozioni');
    expect(p.scenariosDone).toBe(1);
    expect(p.sectionsRead).toBe(1);
    expect(p.exercisesDone).toBe(1);
    expect(p.toolUsed).toBe(true);
    s = reducer(s, { type: 'toggleSection', key: 'emozioni/segnale' });
    expect(labProgress(s, 'emozioni').sectionsRead).toBe(0);
  });

  it('salva il piano con data di aggiornamento e lo svuota', () => {
    let s = reducer(initialData(), { type: 'savePlan', plan: { ...initialData().plan, triggers: ['ritardi'] } });
    expect(s.plan.updatedAt).not.toBeNull();
    s = reducer(s, { type: 'resetPlan' });
    expect(s.plan.triggers).toEqual([]);
  });
});

describe('persistenza', () => {
  beforeEach(() => localStorage.clear());

  it('salva e ricarica i dati da localStorage', () => {
    const s = reducer(initialData(), { type: 'saveEntry', entry: entry('abc') });
    expect(saveData(s)).toBe(true);
    expect(loadData().journal[0].id).toBe('abc');
  });

  it('non si rompe con dati corrotti', () => {
    localStorage.setItem(STORAGE_KEY, '{non json');
    expect(loadData()).toEqual(initialData());
    const n = normalize({ journal: [{ title: 3, emotions: 'x', intensity: 99 }], plan: { triggers: [1, 'a'] } });
    expect(n.journal[0].title).toBe('');
    expect(n.journal[0].emotions).toEqual([]);
    expect(n.journal[0].intensity).toBe(10);
    expect(n.plan.triggers).toEqual(['a']);
  });
});

describe('utilità', () => {
  it('esporta il piano in markdown', () => {
    const md = planToMarkdown({ ...initialData().plan, triggers: ['quando mi interrompe'], ifThen: [{ id: '1', when: 'alzo la voce', then: 'faccio una pausa' }] });
    expect(md).toContain('# Il mio piano di cambiamento');
    expect(md).toContain('- quando mi interrompe');
    expect(md).toContain('**Se** alzo la voce **allora** faccio una pausa');
  });

  it('la verifica della riparazione segnala il “ma”', () => {
    expect(checkRepair('Scusa, ma anche tu').some((c) => !c.ok)).toBe(true);
    expect(checkRepair('Mi dispiace. La prossima volta farò una pausa.').every((c) => c.ok)).toBe(true);
  });
});
