import { describe, expect, it } from 'vitest';
import { sources } from '../src/content/bibliography';
import { classifierSets } from '../src/content/classifiers';
import { controlCases } from '../src/content/controlMatrix';
import { exercises } from '../src/content/exercises';
import { helpReasons, helpClosing } from '../src/content/help';
import { labs } from '../src/content/labs';
import { readPath, scenarios } from '../src/content/scenarios';
import { toolkit } from '../src/content/toolkit';

const conceptKeys = ['what', 'how', 'why', 'daily', 'consequences', 'altReadings', 'altActions'] as const;

describe('laboratori', () => {
  it('sono nove, con id unici e numerazione 1–9', () => {
    expect(labs).toHaveLength(9);
    expect(new Set(labs.map((l) => l.id)).size).toBe(9);
    expect(labs.map((l) => l.number)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('hanno tutte le parti richieste dalla specifica', () => {
    const ids = new Set(sources.map((s) => s.id));
    for (const l of labs) {
      expect(l.intro.length, `${l.id} introduzione`).toBeGreaterThanOrEqual(3);
      expect(l.sections.length, `${l.id} meccanismi`).toBeGreaterThan(0);
      expect(l.examples.length, `${l.id} esempi`).toBeGreaterThanOrEqual(2);
      expect(l.selfCheck.length, `${l.id} autoriflessione`).toBeGreaterThan(0);
      expect(l.reflection.length).toBeGreaterThan(0);
      expect(l.science.length, `${l.id} approfondimento`).toBeGreaterThanOrEqual(3);
      expect(l.tools.length, `${l.id} strumenti`).toBeGreaterThan(0);
      l.sources.forEach((s) => expect(ids.has(s), `${l.id} cita ${s}`).toBe(true));
      [...l.sections.flatMap((s) => s.blocks), ...l.science].forEach((b) => b.source && expect(ids.has(b.source), b.source).toBe(true));
      l.selfCheck.forEach((q) => {
        expect(q.options.length).toBeGreaterThanOrEqual(3);
        expect(new Set(q.options.map((o) => o.feedback)).size, `${q.id} feedback diversi`).toBe(q.options.length);
      });
    }
  });

  it('ogni concetto è spiegato nei sette punti', () => {
    const all = labs.flatMap((l) => l.concepts);
    expect(all.length).toBeGreaterThanOrEqual(40);
    for (const c of all) for (const k of conceptKeys) expect(c[k].length, `${c.id}.${k}`).toBeGreaterThan(40);
  });

  it('i laboratori coprono i temi richiesti', () => {
    const names = labs.flatMap((l) => l.concepts.map((c) => c.name.toLowerCase())).join(' | ');
    for (const t of ['gelosia', 'insicurezza', 'abbandono', 'tradimento', 'conferme', 'rifiuto', 'validazione', 'lettura del pensiero', 'catastrofizzazione', 'ragionamento emotivo', 'bias di conferma', 'ipervigilanza', 'incertezza', 'privacy', 'segretezza', 'autonomia', 'controllo coercitivo', 'escalation', 'intimidazione', 'minacce', 'silenzio', 'minimizzazione', 'ascolto attivo', 'empatia', 'reciprocità'])
      expect(names, t).toContain(t);
  });
});

describe('situazioni ramificate', () => {
  it('sono almeno 24, con id unici', () => {
    expect(scenarios.length).toBeGreaterThanOrEqual(24);
    expect(new Set(scenarios.map((s) => s.id)).size).toBe(scenarios.length);
  });

  it('hanno almeno 4 risposte iniziali con funzioni diverse e feedback specifici', () => {
    for (const s of scenarios) {
      const start = s.nodes.find((n) => n.id === s.start)!;
      expect(start.choices.length, s.id).toBeGreaterThanOrEqual(4);
      expect(new Set(start.choices.map((c) => c.style)).size, `${s.id} funzioni`).toBeGreaterThanOrEqual(3);
      expect(start.choices.some((c) => c.style === 'consapevole'), `${s.id} alternativa consapevole`).toBe(true);
      const all = s.nodes.flatMap((n) => n.choices);
      expect(new Set(all.map((c) => c.feedback)).size, `${s.id} feedback duplicati`).toBe(all.length);
    }
  });

  it('sono grafi validi: nodi raggiungibili, riferimenti corretti, percorsi che terminano', () => {
    for (const s of scenarios) {
      const ids = new Set(s.nodes.map((n) => n.id));
      const reached = new Set<string>();
      const walk = (id: string, depth: number) => {
        expect(depth).toBeLessThan(10);
        reached.add(id);
        for (const c of s.nodes.find((n) => n.id === id)!.choices) {
          expect(c.feedback.length).toBeGreaterThan(40);
          expect(c.otherSide.length).toBeGreaterThan(5);
          if (c.next) {
            expect(ids.has(c.next), `${s.id}: ${c.id} → ${c.next}`).toBe(true);
            walk(c.next, depth + 1);
          }
        }
      };
      walk(s.start, 0);
      expect(reached.size, `${s.id} nodi irraggiungibili`).toBe(ids.size);
    }
  });

  it('le situazioni del laboratorio 5 segnalano le risposte intimidatorie', () => {
    for (const s of scenarios.filter((x) => x.lab === 'rabbia')) expect(s.nodes.flatMap((n) => n.choices).some((c) => c.safety), s.id).toBe(true);
  });

  it('la lettura del percorso dipende dalle scelte', () => {
    const s = scenarios.find((x) => x.id === 'pranzo-collega')!;
    const aware = readPath(s, ['b', 'p1']);
    const recovered = readPath(s, ['a', 't1']);
    const reactive = readPath(s, ['a', 't2']);
    expect(new Set([aware.title, recovered.title, reactive.title]).size).toBe(3);
    const porta = scenarios.find((x) => x.id === 'porta')!;
    expect(readPath(porta, ['a', 't1']).title).toContain('rischio');
  });
});

describe('strumenti e moduli', () => {
  it('matrice del controllo: 10 situazioni in 3 modalità', () => {
    expect(controlCases).toHaveLength(10);
    controlCases.forEach((c) => [c.a, c.b, c.c].forEach((m) => expect(m.phrase && m.communicates && m.effect).toBeTruthy()));
  });

  it('cassetta: 9 strumenti, ognuno con esercizio esistente', () => {
    expect(toolkit).toHaveLength(9);
    toolkit.forEach((t) => {
      expect(t.procedure.length).toBeGreaterThanOrEqual(4);
      expect(exercises.some((e) => e.id === t.exerciseId), t.exerciseId).toBe(true);
    });
  });

  it('classificatori: ogni risposta è una categoria valida, con spiegazione', () => {
    Object.values(classifierSets).forEach((set) => {
      const cats = new Set(set.categories.map((c) => c.id));
      set.items.forEach((i) => {
        expect(cats.has(i.answer), `${set.id}/${i.id}`).toBe(true);
        expect(i.explanation.length).toBeGreaterThan(30);
      });
    });
    expect(classifierSets.storie.items).toHaveLength(30);
  });

  it('modulo aiuto: 15 punti con 5 approfondimenti e messaggio conclusivo', () => {
    expect(helpReasons).toHaveLength(15);
    helpReasons.forEach((r) => ['why', 'daily', 'consequences', 'learn', 'psychologist'].forEach((k) => expect((r as unknown as Record<string, string>)[k].length).toBeGreaterThan(30)));
    expect(helpClosing.join(' ')).toContain('Non devi andare dallo psicologo');
  });

  it('esercizi: id unici, ogni laboratorio ne ha almeno uno, opzioni dove servono', () => {
    expect(new Set(exercises.map((e) => e.id)).size).toBe(exercises.length);
    for (const l of labs) expect(exercises.some((e) => e.lab === l.id), l.id).toBe(true);
    exercises.forEach((e) => e.steps.forEach((s) => (s.type === 'chips' || s.type === 'single') && expect(s.options?.length).toBeGreaterThan(1)));
  });
});
