import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Blocks } from '../components/Blocks';
import { Icon } from '../components/Icon';
import { PageHead } from '../components/Layout';
import { EvidenceBadge, ProgressRing } from '../components/ui';
import { sourceById } from '../content/bibliography';
import { exercisesByLab } from '../content/exercises';
import { labById, labs } from '../content/labs';
import { scenariosByLab } from '../content/scenarios';
import { useStore } from '../store/AppStore';
import { labProgress } from '../store/selectors';
import { ToolView, toolMeta } from '../tools';
import { SafetyNotice } from '../tools/Safety';
import type { Concept, Lab } from '../types';
import { formatDate } from '../utils/format';
import { NotFoundPage } from './NotFoundPage';

type Tab = 'introduzione' | 'concetti' | 'strumenti' | 'scenari' | 'autoriflessione' | 'esercizi' | 'approfondimento';

const tabs: { id: Tab; label: string }[] = [
  { id: 'introduzione', label: 'Introduzione' },
  { id: 'concetti', label: 'Concetti' },
  { id: 'strumenti', label: 'Strumenti' },
  { id: 'scenari', label: 'Situazioni' },
  { id: 'autoriflessione', label: 'Autoriflessione' },
  { id: 'esercizi', label: 'Esercizi' },
  { id: 'approfondimento', label: 'Approfondimento' },
];

export function LabPage() {
  const { labId = '' } = useParams();
  const lab = labById(labId);
  const { data, dispatch } = useStore();
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    if (lab) dispatch({ type: 'visitLab', lab: lab.id });
  }, [lab, dispatch]);

  if (!lab) return <NotFoundPage message="Questo laboratorio non esiste." />;

  const legacy = params.get('tab') === 'strumento' ? 'strumenti' : params.get('tab');
  const tab: Tab = tabs.some((t) => t.id === legacy) ? (legacy as Tab) : 'introduzione';
  const setTab = (t: Tab) => setParams({ tab: t }, { replace: true });
  const p = labProgress(data, lab.id);
  const idx = labs.findIndex((l) => l.id === lab.id);
  const prev = labs[idx - 1];
  const next = labs[idx + 1];

  return (
    <div className={`container accent-${lab.accent}`}>
      <nav className="breadcrumb" aria-label="Percorso" style={{ paddingTop: 24 }}>
        <Link to="/laboratori">Laboratori</Link> / Laboratorio {lab.number}
      </nav>
      <div className="lab-head">
        <div style={{ flex: '1 1 420px' }}>
          <PageHead eyebrow={`Laboratorio ${lab.number} · ${lab.subtitle}`} title={lab.title} lead={lab.summary} />
        </div>
        <div className="card lab-progress-card">
          <ProgressRing value={p.ratio} size={64} />
          <div className="small">
            <div>Letture {p.sectionsRead}/{p.sectionsTotal}</div>
            <div>Strumenti {p.toolsUsed}/{p.toolsTotal}</div>
            <div>Situazioni {p.scenariosDone}/{p.scenariosTotal}</div>
            <div>Esercizi {p.exercisesDone}/{p.exercisesTotal}</div>
            <div>Autoriflessione {p.selfDone}/{p.selfTotal}</div>
          </div>
        </div>
      </div>

      <p className="pullquote" style={{ marginTop: 0 }}>
        {lab.question}
      </p>

      {lab.id === 'rabbia' && (
        <div style={{ marginBottom: 20 }}>
          <SafetyNotice compact />
        </div>
      )}

      <div className="tabs" role="tablist" aria-label="Sezioni del laboratorio">
        {tabs.map((t) => (
          <button key={t.id} role="tab" id={`tab-${t.id}`} aria-selected={tab === t.id} aria-controls={`panel-${t.id}`} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="fade-in" key={tab}>
        {tab === 'introduzione' && <IntroTab lab={lab} />}
        {tab === 'concetti' && <ConceptsTab lab={lab} />}
        {tab === 'strumenti' && (
          <div className="grid" style={{ gap: 44 }}>
            {lab.tools.map((t) => (
              <section key={t} aria-labelledby={`tool-h-${t}`}>
                <h2 id={`tool-h-${t}`}>{toolMeta[t].title}</h2>
                <p className="muted read">{toolMeta[t].description}</p>
                <ToolView tool={t} />
              </section>
            ))}
          </div>
        )}
        {tab === 'scenari' && <ScenariosTab lab={lab} />}
        {tab === 'autoriflessione' && <SelfTab lab={lab} />}
        {tab === 'esercizi' && <ExercisesTab lab={lab} />}
        {tab === 'approfondimento' && <ScienceTab lab={lab} />}
      </div>

      <hr className="divider" />
      <nav className="row" aria-label="Laboratori adiacenti">
        {prev && (
          <Link to={`/laboratori/${prev.id}`} className="btn btn-secondary">
            <Icon name="arrowLeft" /> {prev.number}. {prev.title}
          </Link>
        )}
        <span className="spacer" />
        {next ? (
          <Link to={`/laboratori/${next.id}`} className="btn">
            {next.number}. {next.title} <Icon name="arrowRight" />
          </Link>
        ) : (
          <Link to="/piano" className="btn">
            Vai al piano personale <Icon name="arrowRight" />
          </Link>
        )}
      </nav>
    </div>
  );
}

function ReadToggle({ lab, k }: { lab: Lab; k: string }) {
  const { data, dispatch } = useStore();
  const key = `${lab.id}/${k}`;
  const read = data.progress.readSections.includes(key);
  return (
    <button className={`btn btn-sm ${read ? 'btn-secondary' : 'btn-ghost'}`} aria-pressed={read} onClick={() => dispatch({ type: 'toggleSection', key })}>
      <Icon name="check" /> {read ? 'Letto' : 'Segna come letto'}
    </button>
  );
}

function IntroTab({ lab }: { lab: Lab }) {
  return (
    <div className="read">
      <section className="section-block">
        <div className="prose intro-prose">
          {lab.intro.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
        <ReadToggle lab={lab} k="intro" />
      </section>
      {lab.sections.map((s) => (
        <section key={s.id} className="section-block" aria-labelledby={`h-${s.id}`}>
          <h2 id={`h-${s.id}`}>{s.title}</h2>
          <Blocks blocks={s.blocks} />
          <ReadToggle lab={lab} k={s.id} />
        </section>
      ))}
      <section className="section-block">
        <h2>Nella vita quotidiana</h2>
        <div className="grid" style={{ gap: 12 }}>
          {lab.examples.map((e) => (
            <div key={e.title} className="card">
              <h3 style={{ fontSize: '1.05rem' }}>{e.title}</h3>
              <p style={{ margin: 0 }}>{e.text}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="card card-quiet" style={{ marginTop: 20 }}>
        <h3>Idee chiave</h3>
        <ul className="prose" style={{ margin: 0, paddingLeft: '1.2em' }}>
          {lab.keyIdeas.map((k) => (
            <li key={k}>{k}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const conceptFields: { key: keyof Concept; label: string }[] = [
  { key: 'what', label: 'Che cos’è' },
  { key: 'how', label: 'Come funziona' },
  { key: 'why', label: 'Perché può svilupparsi' },
  { key: 'daily', label: 'Come si manifesta nella vita quotidiana' },
  { key: 'consequences', label: 'Quali conseguenze può avere' },
  { key: 'altReadings', label: 'Interpretazioni alternative da considerare' },
  { key: 'altActions', label: 'Comportamenti alternativi da sperimentare' },
];

function ConceptsTab({ lab }: { lab: Lab }) {
  const [open, setOpen] = useState<string | null>(lab.concepts[0]?.id ?? null);
  return (
    <div className="read">
      <p className="muted">Ogni concetto è spiegato in sette passaggi. Apri quelli che senti più vicini.</p>
      <div className="accordion">
        {lab.concepts.map((c) => {
          const isOpen = open === c.id;
          const src = c.source ? sourceById(c.source) : undefined;
          return (
            <section key={c.id} className={`acc-item ${isOpen ? 'open' : ''}`}>
              <h3 className="acc-head">
                <button aria-expanded={isOpen} aria-controls={`c-${c.id}`} onClick={() => setOpen(isOpen ? null : c.id)}>
                  <span className="acc-title">{c.name}</span>
                  {c.evidence && <EvidenceBadge kind={c.evidence} />}
                  <span className="acc-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
              </h3>
              {isOpen && (
                <div id={`c-${c.id}`} className="acc-body fade-in">
                  <dl className="concept">
                    {conceptFields.map((f, i) => (
                      <div key={f.key}>
                        <dt>
                          <span className="concept-n">{i + 1}</span> {f.label}
                        </dt>
                        <dd>{c[f.key]}</dd>
                      </div>
                    ))}
                  </dl>
                  {src && (
                    <p className="small muted" style={{ margin: '12px 0 0' }}>
                      Riferimento: <Link to={`/bibliografia#${src.id}`}>{src.authors} ({src.year})</Link>
                    </p>
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>
      <div style={{ marginTop: 16 }}>
        <ReadToggle lab={lab} k="concetti" />
      </div>
    </div>
  );
}

function ScenariosTab({ lab }: { lab: Lab }) {
  const { data } = useStore();
  const list = scenariosByLab(lab.id);
  if (list.length === 0)
    return (
      <div className="read">
        <p className="muted">
          Questo laboratorio è dedicato alla costruzione del tuo piano. Le situazioni interattive sono negli altri laboratori:{' '}
          <Link to="/scenari">vedi tutte le 24 situazioni</Link>.
        </p>
      </div>
    );
  return (
    <div>
      <p className="muted read">
        Ogni situazione ha quattro risposte possibili e si ramifica in base a ciò che scegli. Non ci sono risposte da indovinare: osserva che cosa provoca ogni mossa,
        in te e in lei. Puoi ripeterle scegliendo strade diverse.
      </p>
      <div className="grid grid-2" style={{ marginTop: 18 }}>
        {list.map((s) => {
          const runs = data.progress.scenarios[s.id] ?? [];
          return (
            <Link key={s.id} to={`/scenari/${s.id}`} className="card card-link">
              {runs.length > 0 && (
                <span className="tag tag-sage tag-done" style={{ marginBottom: 8 }}>
                  esplorata {runs.length === 1 ? 'una volta' : `${runs.length} volte`}
                </span>
              )}
              <h3>{s.title}</h3>
              <p className="muted small" style={{ margin: 0 }}>
                {s.context.slice(0, 150)}…
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function SelfTab({ lab }: { lab: Lab }) {
  const { data, dispatch } = useStore();
  return (
    <div className="read">
      <p className="muted">Scegli la risposta più vicina a te. Riceverai una riflessione, non un giudizio. Le risposte restano su questo dispositivo.</p>
      {lab.selfCheck.map((q) => {
        const sel = data.progress.selfChecks[q.id];
        return (
          <div key={q.id} className="card" style={{ marginBottom: 14 }}>
            <p className="quiz-text">{q.question}</p>
            <div className="choice-list">
              {q.options.map((o, i) => (
                <button key={o.label} className={`choice ${sel === i ? 'picked' : ''}`} aria-pressed={sel === i} onClick={() => dispatch({ type: 'selfCheck', id: q.id, option: i })}>
                  {o.label}
                </button>
              ))}
            </div>
            {sel !== undefined && q.options[sel] && (
              <div className="feedback" style={{ marginTop: 14 }} role="status">
                {q.options[sel].feedback}
              </div>
            )}
          </div>
        );
      })}
      <h2 style={{ marginTop: 32 }}>Domande aperte</h2>
      <p className="muted">Puoi rispondere mentalmente o aprire una voce di diario privata collegata a questo laboratorio.</p>
      {lab.reflection.map((q) => (
        <div key={q} className="card" style={{ marginBottom: 12 }}>
          <p className="quiz-text">{q}</p>
          <Link to={`/diario/nuovo?lab=${lab.id}&q=${encodeURIComponent(q)}`} className="btn btn-sm btn-secondary">
            <Icon name="edit" /> Scrivi nel diario
          </Link>
        </div>
      ))}
    </div>
  );
}

function ExercisesTab({ lab }: { lab: Lab }) {
  const { data } = useStore();
  const list = exercisesByLab(lab.id);
  const blocked = data.safety.flagged && !data.safety.acknowledgedAt;
  return (
    <div>
      {blocked && list.some((e) => e.gated) && (
        <div className="safety" style={{ marginBottom: 16 }}>
          <strong>Alcuni esercizi sono sospesi.</strong> La verifica di sicurezza ha segnalato un rischio: prima di proseguire, leggi il protocollo e prepara il tuo piano di
          uscita nella scheda <Link to={`/laboratori/rabbia?tab=strumenti`}>Strumenti</Link>.
        </div>
      )}
      <div className="grid grid-2">
        {list.map((e) => {
          const res = data.progress.exercises[e.id];
          return (
            <Link key={e.id} to={`/esercizi/${e.id}`} className="card card-link">
              <div className="row" style={{ marginBottom: 8 }}>
                <span className="tag">{e.duration}</span>
                {res && <span className="tag tag-sage tag-done">completato il {formatDate(res.completedAt)}</span>}
                {e.gated && blocked && <span className="tag tag-terra">sospeso</span>}
              </div>
              <h3>{e.title}</h3>
              <p className="muted small" style={{ margin: 0 }}>
                {e.intro}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function ScienceTab({ lab }: { lab: Lab }) {
  return (
    <div className="read">
      <div className="note">
        Ogni affermazione è marcata come <strong>evidenza empirica</strong>, <strong>modello teorico</strong>, <strong>ipotesi interpretativa</strong> o{' '}
        <strong>pratica clinica</strong>. Nessun contenuto ha valore diagnostico e nessuna risposta ti attribuisce uno stile di attaccamento o un disturbo.
      </div>
      <Blocks blocks={lab.science} />
      <ReadToggle lab={lab} k="scienza" />
      <h3 style={{ marginTop: 32 }}>Riferimenti di questo laboratorio</h3>
      <ul className="prose small">
        {lab.sources.map((id) => {
          const s = sourceById(id);
          if (!s) return null;
          return (
            <li key={id}>
              <Link to={`/bibliografia#${id}`}>
                {s.authors} ({s.year}). <em>{s.title}</em>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
