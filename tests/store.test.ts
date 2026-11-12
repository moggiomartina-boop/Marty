import { beforeEach, describe, expect, it } from 'vitest';
import { reducer } from '../src/store/reducer';
import { initialData, loadData, normalize, saveData, STORAGE_KEY } from '../src/store/storage';
import { labProgress } from '../src/store/selectors';
import { blankEntry } from '../src/tools/SaveToJournal';
import { checkRepair } from '../src/tools/RepairBuilder';
import type { JournalEntry } from '../src/types';
import { planToMarkdown } from '../src/utils/export';
import { checkObservable } from '../src/utils/observable';

const entry = (id: string, title = 'Prova'): JournalEntry => ({ ...blankEntry(), id, title, emotions: ['gelosia'] });

describe('reducer', () => {
  it('crea, modifica ed elimina voci di diario', () => {
    let s = reducer(initialData(), { type: 'saveEntry', entry: entry('1') });
    s = reducer(s, { type: 'saveEntry', entry: entry('2') });
    expect(s.journal.map((e) => e.id)).toEqual(['2', '1']);
    s = reducer(s, { type: 'saveEntry', entry: entry('1', 'Modificata') });
    expect(s.journal.find((e) => e.id === '1')?.title).toBe('Modificata');
    s = reducer(s, { type: 'deleteEntry', id: '1' });
    expect(s.journal.map((e) => e.id)).toEqual(['2']);
    s = reducer(s, { type: 'deleteAllEntries' });
    expect(s.journal).toEqual([]);
  });

  it('registra il progresso di un laboratorio', () => {
    let s = reducer(initialData(), { type: 'completeScenario', id: 'pranzo-collega', path: ['b', 'p1'] });
    s = reducer(s, { type: 'toggleSection', key: 'mondo-interiore/intro' });
    s = reducer(s, { type: 'completeExercise', id: 'conferme', result: { answers: {}, completedAt: 'x' } });
    s = reducer(s, { type: 'useTool', tool: 'sentire' });
    s = reducer(s, { type: 'selfCheck', id: 'mi-1', option: 2 });
    const p = labProgress(s, 'mondo-interiore');
    expect([p.scenariosDone, p.sectionsRead, p.exercisesDone, p.toolsUsed, p.selfDone]).toEqual([1, 1, 1, 1, 1]);
    expect(p.ratio).toBeGreaterThan(0);
  });

  it('verifica di sicurezza: una segnalazione richiede un nuovo piano di uscita', () => {
    let s = reducer(initialData(), { type: 'safetyCheck', flagged: true });
    expect(s.safety.flagged).toBe(true);
    expect(s.safety.acknowledgedAt).toBeNull();
    s = reducer(s, { type: 'safetyAcknowledge', exitPlan: { where: 'parco', who: '', message: 'mi fermo' } });
    expect(s.safety.acknowledgedAt).not.toBeNull();
    s = reducer(s, { type: 'safetyCheck', flagged: true });
    expect(s.safety.acknowledgedAt).toBeNull();
    expect(s.safety.exitPlan.where).toBe('parco');
  });

  it('salva il piano con data e lo svuota', () => {
    let s = reducer(initialData(), { type: 'savePlan', plan: { ...initialData().plan, behavior: 'controllo il suo ultimo accesso' } });
    expect(s.plan.updatedAt).not.toBeNull();
    s = reducer(s, { type: 'resetPlan' });
    expect(s.plan.behavior).toBe('');
  });
});

describe('persistenza', () => {
  beforeEach(() => localStorage.clear());

  it('salva e ricarica i dati', () => {
    const s = reducer(initialData(), { type: 'saveEntry', entry: entry('abc') });
    expect(saveData(s)).toBe(true);
    expect(loadData().journal[0].id).toBe('abc');
  });

  it('non si rompe con dati corrotti', () => {
    localStorage.setItem(STORAGE_KEY, '{non json');
    expect(loadData()).toEqual(initialData());
    const n = normalize({ journal: [{ title: 3, emotions: 'x', intensity: 99 }], plan: { triggers: [1, 'a'] }, safety: { flagged: 'sì' } });
    expect(n.journal[0].title).toBe('');
    expect(n.journal[0].fear).toBe('');
    expect(n.journal[0].intensity).toBe(10);
    expect(n.plan.triggers).toEqual(['a']);
    expect(n.safety.flagged).toBe(false);
  });
});

describe('utilità', () => {
  it('esporta il piano in markdown con tutti i campi della specifica', () => {
    const md = planToMarkdown({ ...initialData().plan, behavior: 'controllare il telefono', measures: ['annoto ogni domenica'], ifThen: [{ id: '1', when: 'non risponde', then: 'aspetto un’ora' }] });
    for (const h of ['Il comportamento che voglio interrompere', 'Le situazioni che lo attivano', 'Le emozioni che provo', 'I pensieri che lo precedono', 'La risposta alternativa', 'Il limite dell’altra persona', 'Come misurerò', 'se ricadrò'])
      expect(md).toContain(h);
    expect(md).toContain('- annoto ogni domenica');
    expect(md).toContain('**Se** non risponde **allora** aspetto un’ora');
  });

  it('distingue promesse generiche e comportamenti osservabili', () => {
    expect(checkObservable('Cercherò di essere meno geloso').level).toBe('generico');
    expect(checkObservable('Quando non risponde per 2 ore, non le scriverò di nuovo e lo annoterò nel diario').level).toBe('osservabile');
    expect(checkObservable('').level).toBe('vuoto');
  });

  it('la verifica della riparazione segnala “ma” e responsabilità spostata', () => {
    expect(checkRepair('Scusa, ma anche tu').some((c) => !c.ok)).toBe(true);
    expect(checkRepair('Mi dispiace, mi hai provocato').some((c) => !c.ok)).toBe(true);
    expect(checkRepair('Mi dispiace. La prossima volta farò una pausa.').every((c) => c.ok)).toBe(true);
  });
});
