import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHead } from '../components/Layout';
import { labs } from '../content/labs';
import { scenarios } from '../content/scenarios';
import { useStore } from '../store/AppStore';

export function ScenariosPage() {
  const { data } = useStore();
  const [lab, setLab] = useState<string>('tutti');
  const withScenarios = labs.filter((l) => scenarios.some((s) => s.lab === l.id));
  const list = scenarios.filter((s) => lab === 'tutti' || s.lab === lab);
  const done = scenarios.filter((s) => data.progress.scenarios[s.id]?.length).length;
  return (
    <div className="container">
      <PageHead
        eyebrow={`${scenarios.length} situazioni ramificate · ${done} esplorate`}
        title="Situazioni quotidiane"
        lead="Un simulatore di momenti comuni nelle relazioni. Ogni situazione ha quattro risposte possibili e si ramifica: ogni scelta cambia ciò che vive lei e come può finire. Non ci sono punteggi: ci sono conseguenze da osservare."
      />
      <div className="chips" role="radiogroup" aria-label="Filtra per laboratorio" style={{ marginBottom: 24 }}>
        <button className="chip chip-sm" role="radio" aria-checked={lab === 'tutti'} onClick={() => setLab('tutti')}>
          Tutte
        </button>
        {withScenarios.map((l) => (
          <button key={l.id} className="chip chip-sm" role="radio" aria-checked={lab === l.id} onClick={() => setLab(l.id)}>
            {l.number}. {l.title}
          </button>
        ))}
      </div>
      <div className="grid grid-3">
        {list.map((s) => {
          const l = labs.find((x) => x.id === s.lab)!;
          const runs = data.progress.scenarios[s.id]?.length ?? 0;
          return (
            <Link key={s.id} to={`/scenari/${s.id}`} className={`card card-link accent-${l.accent}`}>
              <div className="row" style={{ marginBottom: 10 }}>
                <span className="tag" style={{ background: 'var(--accent-bg)', borderColor: 'transparent' }}>
                  Lab {l.number}
                </span>
                {runs > 0 && <span className="tag tag-sage tag-done">esplorata</span>}
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
