import { describe, expect, it } from 'vitest';
import { sources } from '../src/content/bibliography';
import { exercises } from '../src/content/exercises';
import { labs } from '../src/content/labs';
import { readPath, scenarios } from '../src/content/scenarios';

describe('contenuti', () => {
  it('ha esattamente nove laboratori con id unici e numerazione 1–9', () => {
    expect(labs).toHaveLength(9);
    expect(new Set(labs.map((l) => l.id)).size).toBe(9);
    expect(labs.map((l) => l.number)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('ogni laboratorio ha sezioni, idee chiave, domande e fonti esistenti', () => {
    const ids = new Set(sources.map((s) => s.id));
    for (const l of labs) {
      expect(l.sections.length).toBeGreaterThanOrEqual(3);
      expect(l.keyIdeas.length).toBeGreaterThan(0);
      expect(l.reflection.length).toBeGreaterThan(0);
      l.sources.forEach((s) => expect(ids.has(s), `${l.id} cita ${s}`).toBe(true));
      l.sections.flatMap((s) => s.blocks).forEach((b) => b.source && expect(ids.has(b.source), b.source).toBe(true));
    }
  });

  it('ha almeno 18 scenari, almeno due per laboratorio', () => {
    expect(scenarios.length).toBeGreaterThanOrEqual(18);
    for (const l of labs) expect(scenarios.filter((s) => s.lab === l.id).length).toBeGreaterThanOrEqual(2);
    expect(new Set(scenarios.map((s) => s.id)).size).toBe(scenarios.length);
  });

  it('ogni scenario è un grafo valido: nodi raggiungibili, nessun riferimento rotto, ogni percorso termina', () => {
    for (const s of scenarios) {
      const ids = new Set(s.nodes.map((n) => n.id));
      expect(ids.has(s.start), `${s.id} start`).toBe(true);
      const choiceIds = s.nodes.flatMap((n) => n.choices.map((c) => c.id));
      expect(new Set(choiceIds).size, `${s.id} scelte duplicate`).toBe(choiceIds.length);
      // visita di tutti i percorsi
      const reached = new Set<string>();
      const walk = (nodeId: string, depth: number) => {
        expect(depth, `${s.id} ciclo infinito`).toBeLessThan(10);
        reached.add(nodeId);
        const n = s.nodes.find((x) => x.id === nodeId)!;
        expect(n.choices.length, `${s.id}/${nodeId}`).toBeGreaterThanOrEqual(2);
        for (const c of n.choices) {
          expect(c.feedback.length).toBeGreaterThan(20);
          expect(c.otherSide.length).toBeGreaterThan(5);
          if (c.next) {
            expect(ids.has(c.next), `${s.id}: ${c.id} → ${c.next}`).toBe(true);
            walk(c.next, depth + 1);
          }
        }
      };
      walk(s.start, 0);
      expect(reached.size, `${s.id} nodi irraggiungibili`).toBe(ids.size);
      // ramificazione reale: la prima scelta porta a nodi diversi
      const firstNexts = new Set(s.nodes.find((n) => n.id === s.start)!.choices.map((c) => c.next));
      expect(firstNexts.size).toBeGreaterThan(1);
    }
  });

  it('la lettura del percorso dipende dalle scelte', () => {
    const s = scenarios[0];
    const allAware = readPath(s, ['c', 'c1']);
    const recovered = readPath(s, ['a', 'a2']);
    const impulsive = readPath(s, ['a', 'a1']);
    expect(new Set([allAware.title, recovered.title, impulsive.title]).size).toBe(3);
  });

  it('esercizi: id unici, laboratori esistenti, passi con opzioni dove servono', () => {
    expect(new Set(exercises.map((e) => e.id)).size).toBe(exercises.length);
    for (const e of exercises) {
      expect(labs.some((l) => l.id === e.lab)).toBe(true);
      e.steps.forEach((s) => {
        if (s.type === 'chips' || s.type === 'single') expect(s.options?.length).toBeGreaterThan(1);
      });
    }
    for (const l of labs) expect(exercises.some((e) => e.lab === l.id), l.id).toBe(true);
  });
});
