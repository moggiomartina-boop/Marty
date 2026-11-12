import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHead } from '../components/Layout';
import { labs } from '../content/labs';
import { scenarios } from '../content/scenarios';
import { useStore } from '../store/AppStore';
import type { Scenario } from '../types';

const relations: Scenario['relation'][] = ['coppia', 'famiglia', 'lavoro', 'amicizia'];

export function ScenariosPage() {
  const { data } = useStore();
  const [rel, setRel] = useState<string>('tutte');
  const list = scenarios.filter((s) => rel === 'tutte' || s.relation === rel);
  const done = scenarios.filter((s) => data.progress.scenarios[s.id]?.length).length;
  return (
    <div className="container">
      <PageHead
        eyebrow={`${scenarios.length} scenari ramificati · ${done} esplorati`}
        title="Scenari"
        lead="Situazioni quotidiane in cui ogni scelta cambia la risposta dell’altra persona e il finale. Osserva che cosa provoca ogni mossa: dentro di te e nell’altro."
      />
      <div className="chips" role="radiogroup" aria-label="Filtra per relazione" style={{ marginBottom: 24 }}>
        {['tutte', ...relations].map((r) => (
          <button key={r} className="chip" role="radio" aria-checked={rel === r} onClick={() => setRel(r)}>
            {r}
          </button>
        ))}
      </div>
      <div className="grid grid-3">
        {list.map((s) => {
          const lab = labs.find((l) => l.id === s.lab)!;
          const runs = data.progress.scenarios[s.id]?.length ?? 0;
          return (
            <Link key={s.id} to={`/scenari/${s.id}`} className={`card card-link accent-${lab.accent}`}>
              <div className="row" style={{ marginBottom: 10 }}>
                <span className="tag">{s.relation}</span>
                <span className="tag" style={{ background: 'var(--accent-bg)', borderColor: 'transparent' }}>
                  Lab {lab.number}
                </span>
                {runs > 0 && <span className="tag tag-sage tag-done">esplorato</span>}
              </div>
              <h3>{s.title}</h3>
              <p className="muted small" style={{ margin: 0 }}>
                {s.context.slice(0, 120)}…
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
