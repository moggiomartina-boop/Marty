import { useMemo, useState } from 'react';
import { Icon } from '../components/Icon';
import { classifierSets, type ClassItem } from '../content/classifiers';
import { useStore } from '../store/AppStore';
import type { ToolId } from '../types';

/**
 * Classificatore generico. Per ogni elemento l'utente sceglie una categoria;
 * la spiegazione del ragionamento compare sempre, sia quando la scelta coincide
 * sia quando no (in quel caso spiega perché la lettura proposta è un'altra).
 */
export function Classifier({ setId, tool }: { setId: string; tool: ToolId }) {
  const set = classifierSets[setId];
  const { data, dispatch } = useStore();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const previous = data.progress.classifiers[setId];
  const answered = Object.keys(answers).length;
  const matching = useMemo(() => set.items.filter((i) => answers[i.id] === i.answer).length, [answers, set]);
  const finished = answered === set.items.length;
  const catLabel = (id: string) => set.categories.find((c) => c.id === id)?.label ?? id;

  const groups = useMemo(() => {
    const m = new Map<string, ClassItem[]>();
    set.items.forEach((i) => m.set(i.group ?? '', [...(m.get(i.group ?? '') ?? []), i]));
    return [...m.entries()];
  }, [set]);

  const answer = (item: ClassItem, cat: string) => {
    if (answers[item.id]) return;
    const next = { ...answers, [item.id]: cat };
    setAnswers(next);
    dispatch({ type: 'useTool', tool });
    if (Object.keys(next).length === set.items.length) {
      dispatch({
        type: 'classifierResult',
        id: setId,
        result: {
          answered: set.items.length,
          matching: set.items.filter((i) => next[i.id] === i.answer).length,
          total: set.items.length,
          completedAt: new Date().toISOString(),
        },
      });
    }
  };

  return (
    <section aria-labelledby={`cl-${setId}`}>
      <h3 id={`cl-${setId}`}>{set.title}</h3>
      <p className="muted">{set.intro}</p>
      <div className="legend">
        {set.categories.map((c) => (
          <span key={c.id} className="small">
            <strong>{c.label}</strong> — {c.hint}
          </span>
        ))}
      </div>
      {previous && (
        <p className="small muted">
          Ultima volta: completato, {previous.matching} letture su {previous.total} in linea con la distinzione proposta.
        </p>
      )}
      {groups.map(([group, items]) => (
        <div key={group || 'all'} style={{ marginTop: 20 }}>
          {group && <h4 className="group-title">{group}</h4>}
          <div className="grid grid-2">
            {items.map((item) => {
              const a = answers[item.id];
              const ok = a === item.answer;
              return (
                <div key={item.id} className="card quiz-item">
                  <p className="quiz-text">“{item.text}”</p>
                  <div className="chips" role="group" aria-label={`Classifica: ${item.text}`}>
                    {set.categories.map((c) => (
                      <button key={c.id} type="button" className="chip chip-sm" aria-pressed={a === c.id} disabled={!!a} onClick={() => answer(item, c.id)}>
                        {c.label}
                      </button>
                    ))}
                  </div>
                  {a && (
                    <div className="verdict fade-in" role="status">
                      <strong className={ok ? 'ok' : 'ko'}>{ok ? `Sì: ${catLabel(item.answer).toLowerCase()}.` : `Più probabilmente: ${catLabel(item.answer).toLowerCase()}.`}</strong>{' '}
                      {item.explanation}
                      {!ok && <span className="muted"> Hai scelto “{catLabel(a).toLowerCase()}”: è comprensibile, perché sotto pressione i livelli si confondono.</span>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <div className="row" style={{ marginTop: 16 }}>
        <span className="muted small">
          {answered}/{set.items.length} classificati{finished && ` · ${matching} in linea con la distinzione proposta`}
        </span>
        <span className="spacer" />
        {answered > 0 && (
          <button className="btn btn-ghost btn-sm" onClick={() => setAnswers({})}>
            <Icon name="refresh" /> Ricomincia
          </button>
        )}
      </div>
      {finished && (
        <div className="note fade-in" style={{ marginTop: 12 }}>
          {set.closing}
        </div>
      )}
    </section>
  );
}
