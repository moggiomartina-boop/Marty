import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { PageHead } from '../components/Layout';
import { useToast } from '../components/Toast';
import { labById } from '../content/labs';
import { findChoice, readPath, scenarioById, scenarios, styleDescription, styleLabel } from '../content/scenarios';
import { useStore } from '../store/AppStore';
import type { Scenario, ScenarioChoice } from '../types';
import { formatDate } from '../utils/format';
import { NotFoundPage } from './NotFoundPage';
import { SafetyGate, SafetyNotice } from '../tools/Safety';
import { blankEntry } from '../tools/SaveToJournal';

export function ScenarioPage() {
  const { scenarioId = '' } = useParams();
  const s = scenarioById(scenarioId);
  if (!s) return <NotFoundPage message="Questo scenario non esiste." />;
  // key: riparte da zero cambiando scenario
  const player = <Player key={s.id} scenario={s} />;
  // Le situazioni sul conflitto fisico sono "esercizi ordinari": sospese se la verifica segnala un rischio.
  return s.lab === 'rabbia' ? <SafetyGate>{player}</SafetyGate> : (
    player
  );
}

interface Step {
  nodeId: string;
  choice: ScenarioChoice;
}

function Player({ scenario: s }: { scenario: Scenario }) {
  const { data, dispatch } = useStore();
  const toast = useToast();
  const [steps, setSteps] = useState<Step[]>([]);
  const [current, setCurrent] = useState<string | null>(s.start);
  const [pending, setPending] = useState<ScenarioChoice | null>(null);
  const [reflection, setReflection] = useState('');
  const lab = labById(s.lab)!;
  const node = current ? s.nodes.find((n) => n.id === current) : undefined;
  const finished = current === null;
  const pastRuns = data.progress.scenarios[s.id] ?? [];
  const idx = scenarios.findIndex((x) => x.id === s.id);
  const nextScenario = scenarios[(idx + 1) % scenarios.length];
  const reading = useMemo(() => (finished ? readPath(s, steps.map((x) => x.choice.id)) : null), [finished, s, steps]);

  const choose = (c: ScenarioChoice) => {
    if (pending) return;
    setPending(c);
  };
  const advance = () => {
    if (!pending || !current) return;
    const nextSteps = [...steps, { nodeId: current, choice: pending }];
    setSteps(nextSteps);
    setCurrent(pending.next);
    if (pending.next === null) dispatch({ type: 'completeScenario', id: s.id, path: nextSteps.map((x) => x.choice.id) });
    setPending(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const restart = () => {
    setSteps([]);
    setCurrent(s.start);
    setPending(null);
    setReflection('');
  };
  const saveReflection = () => {
    const now = new Date().toISOString();
    dispatch({
      type: 'saveEntry',
      entry: {
        ...blankEntry(),
        createdAt: now,
        updatedAt: now,
        title: `Situazione: ${s.title}`,
        situation: s.context,
        action: steps.map((x, i) => `${i + 1}. ${x.choice.label}`).join('\n'),
        impact: steps.map((x) => x.choice.otherSide).join('\n'),
        alternative: reflection,
        lab: s.lab,
      },
    });
    toast('Riflessione salvata nel diario');
    setReflection('');
  };

  return (
    <div className={`container accent-${lab.accent}`}>
      <nav className="breadcrumb" style={{ paddingTop: 24 }} aria-label="Percorso">
        <Link to="/scenari">Situazioni</Link> /{' '}
        <Link to={`/laboratori/${lab.id}?tab=scenari`}>
          Laboratorio {lab.number} · {lab.title}
        </Link>
      </nav>
      <PageHead eyebrow={`Situazione · Laboratorio ${lab.number}`} title={s.title} />

      <div className="read">
        <div className="scene" style={{ marginBottom: 20 }}>
          <p className="scene-context" style={{ margin: 0 }}>
            {s.context}
          </p>
        </div>

        {steps.length > 0 && !finished && (
          <div className="card card-quiet" style={{ marginBottom: 20 }}>
            <span className="eyebrow">Finora</span>
            {steps.map((x, i) => (
              <p key={i} className="small" style={{ margin: '0 0 6px' }}>
                <strong>Hai scelto:</strong> {x.choice.label}
              </p>
            ))}
          </div>
        )}

        {node && (
          <section className="scene fade-in" key={node.id} aria-live="polite">
            <span className="eyebrow">
              Momento {steps.length + 1} di 2 · {node.choices.length} risposte possibili
            </span>
            <h2 style={{ fontSize: '1.35rem' }}>{node.text}</h2>
            <div className="choice-list" style={{ marginTop: 16 }}>
              {node.choices.map((c) => (
                <button
                  key={c.id}
                  className={`choice ${pending?.id === c.id ? 'picked' : ''}`}
                  disabled={!!pending && pending.id !== c.id}
                  aria-pressed={pending?.id === c.id}
                  onClick={() => choose(c)}
                >
                  {c.label}
                </button>
              ))}
            </div>
            {pending && (
              <div className="feedback" style={{ marginTop: 18 }}>
                <span className="row" style={{ gap: 8, marginBottom: 8 }}>
                  <span className={`path-dot dot-${pending.style}`} style={{ width: 14, height: 14 }} aria-hidden="true" />
                  <strong>{styleLabel[pending.style]}</strong>
                  <span className="muted small">— {styleDescription[pending.style]}</span>
                </span>
                <div className="two">
                  <div className="side">
                    <strong>Che cosa succede in questa risposta</strong>
                    {pending.feedback}
                  </div>
                  <div className="side">
                    <strong>Che cosa può vivere lei</strong>
                    {pending.otherSide}
                  </div>
                </div>
                {pending.safety && (
                  <div style={{ marginTop: 14 }}>
                    <SafetyNotice />
                  </div>
                )}
                <div className="row" style={{ marginTop: 16 }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => setPending(null)}>
                    Scegli un’altra risposta
                  </button>
                  <span className="spacer" />
                  <button className="btn" onClick={advance}>
                    {pending.next ? 'Continua' : 'Vedi come finisce'} <Icon name="arrowRight" />
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {finished && reading && (
          <section className="fade-in" aria-labelledby="esito">
            <div className="scene">
              <span className="eyebrow">Il tuo percorso</span>
              <h2 id="esito">{reading.title}</h2>
              <p>{reading.text}</p>
              <div>
                {steps.map((x, i) => (
                  <div className="path-step" key={i}>
                    <span className={`path-dot dot-${x.choice.style}`}>{i + 1}</span>
                    <div>
                      <p style={{ margin: '0 0 4px', fontFamily: 'var(--serif)' }}>{x.choice.label}</p>
                      <p className="small muted" style={{ margin: '0 0 4px' }}>
                        {styleLabel[x.choice.style]} · {x.choice.feedback}
                      </p>
                      <p className="small" style={{ margin: 0 }}>
                        <strong>Per lei:</strong> {x.choice.otherSide}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card card-quiet" style={{ marginTop: 18 }}>
              <h3>Ciò che questo scenario mostra</h3>
              <p>{s.insight}</p>
              <div className="field" style={{ marginBottom: 12 }}>
                <label htmlFor="sc-refl">{s.question}</label>
                <textarea id="sc-refl" className="textarea" value={reflection} onChange={(e) => setReflection(e.target.value)} />
              </div>
              <button className="btn btn-sm" disabled={!reflection.trim()} onClick={saveReflection}>
                <Icon name="journal" /> Salva la riflessione nel diario
              </button>
            </div>

            <div className="row" style={{ marginTop: 24 }}>
              <button className="btn btn-secondary" onClick={restart}>
                <Icon name="refresh" /> Riprova con un’altra strada
              </button>
              <span className="spacer" />
              <Link to={`/scenari/${nextScenario.id}`} className="btn">
                Situazione successiva <Icon name="arrowRight" />
              </Link>
            </div>
          </section>
        )}

        {pastRuns.length > 0 && (
          <details className="card" style={{ marginTop: 28 }}>
            <summary style={{ cursor: 'pointer', fontWeight: 600 }}>Percorsi precedenti ({pastRuns.length})</summary>
            {pastRuns
              .slice()
              .reverse()
              .map((r, i) => (
                <div key={i} className="row small" style={{ marginTop: 10 }}>
                  <span className="muted">{formatDate(r.completedAt)}</span>
                  {r.path.map((cid, j) => {
                    const c = findChoice(s, cid);
                    return c ? (
                      <span key={j} className="row" style={{ gap: 4 }}>
                        <span className={`path-dot dot-${c.style}`} style={{ width: 12, height: 12 }} aria-hidden="true" />
                        {styleLabel[c.style]}
                      </span>
                    ) : null;
                  })}
                </div>
              ))}
          </details>
        )}
      </div>
    </div>
  );
}
