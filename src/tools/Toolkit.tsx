import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { toolkit, type Tool } from '../content/toolkit';
import { useStore } from '../store/AppStore';
import { Breathing } from './Breathing';

function GuidedProcedure({ tool }: { tool: Tool }) {
  const { dispatch } = useStore();
  const [i, setI] = useState(-1);
  if (i < 0)
    return (
      <button className="btn btn-sm" onClick={() => setI(0)}>
        Avvia la procedura guidata
      </button>
    );
  const done = i >= tool.procedure.length;
  return (
    <div className="guided" aria-live="polite">
      {done ? (
        <>
          <p style={{ margin: '0 0 10px' }}>
            <strong>Procedura completata.</strong> Come ti senti adesso, rispetto all’inizio?
          </p>
          <button className="btn btn-secondary btn-sm" onClick={() => setI(-1)}>
            <Icon name="refresh" /> Ricomincia
          </button>
        </>
      ) : (
        <>
          <span className="eyebrow">
            Passo {i + 1} di {tool.procedure.length}
          </span>
          <p className="quiz-text">{tool.procedure[i]}</p>
          <div className="row">
            <button className="btn btn-secondary btn-sm" disabled={i === 0} onClick={() => setI(i - 1)}>
              Indietro
            </button>
            <button
              className="btn btn-sm"
              onClick={() => {
                setI(i + 1);
                if (i + 1 === tool.procedure.length) dispatch({ type: 'useTool', tool: 'cassetta' });
              }}
            >
              {i === tool.procedure.length - 1 ? 'Fatto' : 'Passo successivo'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/** Laboratorio 8: i nove strumenti, ciascuno espandibile. */
export function Toolkit() {
  const { data } = useStore();
  const [open, setOpen] = useState<string | null>(toolkit[0].id);
  return (
    <div className="accordion">
      {toolkit.map((t, n) => {
        const isOpen = open === t.id;
        const done = !!data.progress.exercises[t.exerciseId];
        return (
          <section key={t.id} className={`acc-item ${isOpen ? 'open' : ''}`}>
            <h3 className="acc-head">
              <button aria-expanded={isOpen} aria-controls={`tool-${t.id}`} onClick={() => setOpen(isOpen ? null : t.id)}>
                <span className="acc-num">{n + 1}</span>
                <span className="acc-title">{t.name}</span>
                {done && <span className="tag tag-sage tag-done">esercizio fatto</span>}
                <span className="acc-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>
            </h3>
            {isOpen && (
              <div id={`tool-${t.id}`} className="acc-body fade-in">
                <p>{t.explanation}</p>
                <p>
                  <strong>Quando usarlo.</strong> {t.when}
                </p>
                <h4>Procedura</h4>
                <ol className="protocol">
                  {t.procedure.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ol>
                <GuidedProcedure tool={t} />
                <div className="note" style={{ marginTop: 16 }}>
                  <strong>Esempio pratico.</strong> {t.example}
                </div>
                {t.breathing && (
                  <div className="card" style={{ marginBottom: 16 }}>
                    <Breathing />
                  </div>
                )}
                <Link to={`/esercizi/${t.exerciseId}`} className="btn btn-secondary">
                  <Icon name="edit" /> Esercizio interattivo
                </Link>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
