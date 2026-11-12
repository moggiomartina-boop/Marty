import { useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Blocks } from '../components/Blocks';
import { Icon } from '../components/Icon';
import { PageHead } from '../components/Layout';
import { ProgressRing } from '../components/ui';
import { sourceById } from '../content/bibliography';
import { exercisesByLab } from '../content/exercises';
import { labById, labs } from '../content/labs';
import { scenariosByLab, styleLabel } from '../content/scenarios';
import { useStore } from '../store/AppStore';
import { labProgress } from '../store/selectors';
import { ToolView, toolMeta } from '../tools';
import type { Lab } from '../types';
import { formatDate } from '../utils/format';
import { NotFoundPage } from './NotFoundPage';

type Tab = 'leggere' | 'strumento' | 'scenari' | 'esercizi' | 'riflettere';

export function LabPage() {
  const { labId = '' } = useParams();
  const lab = labById(labId);
  const { data, dispatch } = useStore();
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    if (lab) dispatch({ type: 'visitLab', lab: lab.id });
  }, [lab, dispatch]);

  if (!lab) return <NotFoundPage message="Questo laboratorio non esiste." />;

  const tabs: { id: Tab; label: string }[] = [
    { id: 'leggere', label: 'Leggere' },
    ...(lab.tool ? [{ id: 'strumento' as Tab, label: 'Strumento' }] : []),
    { id: 'scenari', label: 'Scenari' },
    { id: 'esercizi', label: 'Esercizi' },
    { id: 'riflettere', label: 'Riflettere' },
  ];
  const requested = params.get('tab') as Tab | null;
  const tab: Tab = tabs.some((t) => t.id === requested) ? requested! : 'leggere';
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
      <div className="row" style={{ alignItems: 'flex-start', gap: 24 }}>
        <div style={{ flex: '1 1 420px' }}>
          <PageHead eyebrow={`Laboratorio ${lab.number} · ${lab.subtitle}`} title={lab.title} lead={lab.summary} />
        </div>
        <div className="card lab-progress-card" style={{ flex: '0 1 260px', display: 'flex', gap: 16, alignItems: 'center' }}>
          <ProgressRing value={p.ratio} size={64} />
          <div className="small">
            <div>
              Letture {p.sectionsRead}/{p.sectionsTotal}
            </div>
            <div>
              Scenari {p.scenariosDone}/{p.scenariosTotal}
            </div>
            <div>
              Esercizi {p.exercisesDone}/{p.exercisesTotal}
            </div>
            {p.hasTool && <div>Strumento {p.toolUsed ? '✓' : '—'}</div>}
          </div>
        </div>
      </div>

      <p className="pullquote" style={{ marginTop: 0 }}>
        {lab.question}
      </p>

      <div className="tabs" role="tablist" aria-label="Sezioni del laboratorio">
        {tabs.map((t) => (
          <button key={t.id} role="tab" id={`tab-${t.id}`} aria-selected={tab === t.id} aria-controls={`panel-${t.id}`} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="fade-in" key={tab}>
        {tab === 'leggere' && <ReadTab lab={lab} />}
        {tab === 'strumento' && lab.tool && (
          <div>
            <h2>{toolMeta[lab.tool].title}</h2>
            <p className="muted read">{toolMeta[lab.tool].description}</p>
            <ToolView tool={lab.tool} />
          </div>
        )}
        {tab === 'scenari' && <ScenariosTab lab={lab} />}
        {tab === 'esercizi' && <ExercisesTab lab={lab} />}
        {tab === 'riflettere' && <ReflectTab lab={lab} />}
      </div>

      <hr className="divider" />
      <nav className="row" aria-label="Laboratori adiacenti">
        {prev && (
          <Link to={`/laboratori/${prev.id}`} className="btn btn-secondary">
            <Icon name="arrowLeft" /> {prev.number}. {prev.title}
          </Link>
        )}
        <span className="spacer" />
        {next && (
          <Link to={`/laboratori/${next.id}`} className="btn">
            {next.number}. {next.title} <Icon name="arrowRight" />
          </Link>
        )}
      </nav>
    </div>
  );
}

function ReadTab({ lab }: { lab: Lab }) {
  const { data, dispatch } = useStore();
  return (
    <div className="read">
      {lab.sections.map((s) => {
        const key = `${lab.id}/${s.id}`;
        const read = data.progress.readSections.includes(key);
        return (
          <section key={s.id} className="section-block" aria-labelledby={`h-${s.id}`}>
            <h2 id={`h-${s.id}`}>{s.title}</h2>
            <Blocks blocks={s.blocks} />
            <button className={`btn btn-sm ${read ? 'btn-secondary' : 'btn-ghost'}`} aria-pressed={read} onClick={() => dispatch({ type: 'toggleSection', key })}>
              <Icon name="check" /> {read ? 'Letto' : 'Segna come letto'}
            </button>
          </section>
        );
      })}
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

function ScenariosTab({ lab }: { lab: Lab }) {
  const { data } = useStore();
  const list = scenariosByLab(lab.id);
  return (
    <div>
      <p className="muted read">
        Ogni scenario si ramifica in base alle tue scelte. Non ci sono risposte giuste da indovinare: osserva che cosa provoca ogni mossa, in te e
        nell’altra persona. Puoi ripeterli scegliendo strade diverse.
      </p>
      <div className="grid grid-2" style={{ marginTop: 18 }}>
        {list.map((s) => {
          const runs = data.progress.scenarios[s.id] ?? [];
          return (
            <Link key={s.id} to={`/scenari/${s.id}`} className="card card-link">
              <div className="row" style={{ marginBottom: 8 }}>
                <span className="tag">{s.relation}</span>
                {runs.length > 0 && <span className="tag tag-sage tag-done">esplorato {runs.length === 1 ? 'una volta' : `${runs.length} volte`}</span>}
              </div>
              <h3>{s.title}</h3>
              <p className="muted small" style={{ margin: 0 }}>
                {s.context.slice(0, 140)}…
              </p>
            </Link>
          );
        })}
      </div>
      <p className="small muted" style={{ marginTop: 16 }}>
        Le mosse sono descritte con tre colori: {styleLabel.impulsiva.toLowerCase()}, {styleLabel.evitante.toLowerCase()} e{' '}
        {styleLabel.consapevole.toLowerCase()}. Descrivono la funzione della scelta, non il valore della persona.
      </p>
    </div>
  );
}

function ExercisesTab({ lab }: { lab: Lab }) {
  const { data } = useStore();
  const list = exercisesByLab(lab.id);
  return (
    <div className="grid grid-2">
      {list.map((e) => {
        const res = data.progress.exercises[e.id];
        return (
          <Link key={e.id} to={`/esercizi/${e.id}`} className="card card-link">
            <div className="row" style={{ marginBottom: 8 }}>
              <span className="tag">{e.duration}</span>
              {res && <span className="tag tag-sage tag-done">completato il {formatDate(res.completedAt)}</span>}
            </div>
            <h3>{e.title}</h3>
            <p className="muted small" style={{ margin: 0 }}>
              {e.intro}
            </p>
          </Link>
        );
      })}
    </div>
  );
}

function ReflectTab({ lab }: { lab: Lab }) {
  return (
    <div className="read">
      <h2>Domande per te</h2>
      <p className="muted">Puoi rispondere mentalmente o aprire una voce di diario collegata a questo laboratorio.</p>
      {lab.reflection.map((q) => (
        <div key={q} className="card" style={{ marginBottom: 12 }}>
          <p style={{ fontFamily: 'var(--serif)', fontSize: '1.15rem', margin: '0 0 12px' }}>{q}</p>
          <Link to={`/diario/nuovo?lab=${lab.id}&q=${encodeURIComponent(q)}`} className="btn btn-sm btn-secondary">
            <Icon name="edit" /> Scrivi nel diario
          </Link>
        </div>
      ))}
      <h3 style={{ marginTop: 32 }}>Per approfondire</h3>
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
