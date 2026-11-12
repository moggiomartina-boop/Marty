import { Link } from 'react-router-dom';
import { PageHead } from '../components/Layout';
import { Bar, EmptyState, ProgressRing } from '../components/ui';
import { classifierSets } from '../content/classifiers';
import { exercises } from '../content/exercises';
import { labs } from '../content/labs';
import { findChoice, scenarios, styleLabel } from '../content/scenarios';
import { useStore } from '../store/AppStore';
import { isLabCompleted, journalByWeek, labProgress, overallProgress, topEmotions } from '../store/selectors';
import type { ChoiceStyle } from '../types';

const styleOrder: ChoiceStyle[] = ['consapevole', 'pressante', 'controllante', 'ritiro'];

export function ProgressPage() {
  const { data } = useStore();
  const overall = overallProgress(data);
  const weeks = journalByWeek(data);
  const maxWeek = Math.max(1, ...weeks.map((w) => w.count));
  const emotions = topEmotions(data);
  const scenariosDone = scenarios.filter((s) => data.progress.scenarios[s.id]?.length).length;
  const exercisesDone = exercises.filter((e) => data.progress.exercises[e.id]).length;
  const completed = labs.filter((l) => isLabCompleted(data, l.id)).length;
  const totalRuns = Object.values(data.progress.scenarios).reduce((a, r) => a + r.length, 0);

  // Distribuzione delle risposte esplorate negli scenari: descrittiva, non un punteggio.
  const styleCount: Record<ChoiceStyle, number> = { consapevole: 0, pressante: 0, controllante: 0, ritiro: 0 };
  scenarios.forEach((s) =>
    (data.progress.scenarios[s.id] ?? []).forEach((run) =>
      run.path.forEach((cid) => {
        const c = findChoice(s, cid);
        if (c) styleCount[c.style]++;
      }),
    ),
  );
  const totalMoves = styleOrder.reduce((a, k) => a + styleCount[k], 0);
  const plan = data.plan;
  const planFields = [plan.behavior, plan.triggers.length, plan.emotions.length, plan.thoughts.length, plan.alternative, plan.partnerLimit, plan.measures.length, plan.relapse].filter((x) => (typeof x === 'string' ? x.trim() : x)).length;

  return (
    <div className="container">
      <PageHead
        eyebrow="Il tuo percorso"
        title="Progressi"
        lead="Una fotografia di ciò che hai esplorato. Non ci sono punteggi né valutazioni su di te: solo tracce del tuo lavoro, per orientarti."
      />

      <div className="grid grid-3">
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <ProgressRing value={overall} size={80} stroke={7} />
          <div className="stat">
            <span className="stat-num">{completed}/9</span>
            <span className="stat-label">laboratori completati</span>
          </div>
        </div>
        <div className="card">
          <div className="row" style={{ gap: 28 }}>
            <div className="stat">
              <span className="stat-num">
                {scenariosDone}/{scenarios.length}
              </span>
              <span className="stat-label">situazioni esplorate</span>
            </div>
            <div className="stat">
              <span className="stat-num">
                {exercisesDone}/{exercises.length}
              </span>
              <span className="stat-label">esercizi completati</span>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="row" style={{ gap: 28 }}>
            <div className="stat">
              <span className="stat-num">{data.journal.length}</span>
              <span className="stat-label">voci di diario</span>
            </div>
            <div className="stat">
              <span className="stat-num">{planFields}/8</span>
              <span className="stat-label">campi del piano</span>
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <h2>Laboratori</h2>
        <p className="small muted">Un laboratorio è considerato completato quando ne hai esplorato almeno l’80%: letture, strumenti, situazioni, autoriflessione, esercizi.</p>
        <div className="card">
          {labs.map((l) => {
            const p = labProgress(data, l.id);
            const done = isLabCompleted(data, l.id);
            return (
              <Link key={l.id} to={`/laboratori/${l.id}`} className={`accent-${l.accent} progress-row`}>
                <div className="row" style={{ flexWrap: 'nowrap' }}>
                  <span style={{ fontFamily: 'var(--serif)', color: 'var(--accent)', width: 28 }}>{l.number}</span>
                  <span style={{ flex: '0 1 280px', minWidth: 0 }}>
                    {l.title} {done && <span className="tag tag-sage tag-done">completato</span>}
                  </span>
                  <Bar value={p.ratio} label={`Avanzamento ${l.title}`} />
                  <span className="small muted" style={{ width: 40, textAlign: 'right' }}>
                    {Math.round(p.ratio * 100)}%
                  </span>
                </div>
                <div className="small muted" style={{ marginLeft: 40 }}>
                  Letture {p.sectionsRead}/{p.sectionsTotal} · Strumenti {p.toolsUsed}/{p.toolsTotal} · Situazioni {p.scenariosDone}/{p.scenariosTotal} · Esercizi{' '}
                  {p.exercisesDone}/{p.exercisesTotal} · Autoriflessione {p.selfDone}/{p.selfTotal}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="grid grid-2">
        <section className="card" aria-labelledby="h-mosse">
          <h3 id="h-mosse">Le risposte che hai esplorato nelle situazioni</h3>
          {totalMoves === 0 ? (
            <EmptyState title="Nessuna situazione ancora" action={<Link to="/scenari" className="btn btn-sm">Vai alle situazioni</Link>} />
          ) : (
            <>
              {styleOrder.map((k) => (
                <div key={k} className="row" style={{ flexWrap: 'nowrap', marginBottom: 8 }}>
                  <span className={`path-dot dot-${k}`} style={{ width: 12, height: 12 }} aria-hidden="true" />
                  <span style={{ width: 190 }}>{styleLabel[k]}</span>
                  <Bar value={styleCount[k] / totalMoves} label={`${styleLabel[k]}: ${styleCount[k]}`} />
                  <span className="small muted" style={{ width: 24, textAlign: 'right' }}>
                    {styleCount[k]}
                  </span>
                </div>
              ))}
              <p className="small muted" style={{ marginBottom: 0 }}>
                {totalRuns} percorsi completati. Esplorare anche le risposte più dure fa parte dell’apprendimento: serve a vederne le conseguenze, non a classificarti.
              </p>
            </>
          )}
        </section>

        <section className="card" aria-labelledby="h-class">
          <h3 id="h-class">Esercizi di classificazione</h3>
          {Object.values(classifierSets).map((s) => {
            const r = data.progress.classifiers[s.id];
            return (
              <div key={s.id} className="row small" style={{ justifyContent: 'space-between', marginBottom: 8, flexWrap: 'nowrap' }}>
                <span>{s.title}</span>
                <span className="muted" style={{ whiteSpace: 'nowrap' }}>
                  {r ? `completato · ${r.matching}/${r.total}` : 'da fare'}
                </span>
              </div>
            );
          })}
          <p className="small muted" style={{ marginBottom: 0 }}>
            Il numero indica quante letture coincidono con la distinzione proposta: è un aiuto per orientarti, non un voto.
          </p>
        </section>

        <section className="card" aria-labelledby="h-diario">
          <h3 id="h-diario">Diario, ultime 8 settimane</h3>
          {data.journal.length === 0 ? (
            <p className="muted">
              Ancora nessuna voce. <Link to="/diario/nuovo">Scrivi la prima</Link>.
            </p>
          ) : (
            <div className="chart-bars" role="img" aria-label={`Voci di diario per settimana: ${weeks.map((w) => `${w.label} ${w.count}`).join(', ')}`}>
              {weeks.map((w) => (
                <div className="b" key={w.label}>
                  <small>{w.count || ''}</small>
                  <span className="fill" style={{ height: `${(w.count / maxWeek) * 80}%` }} />
                  <small>{w.label}</small>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="card" aria-labelledby="h-emo">
          <h3 id="h-emo">Le emozioni che nomini più spesso</h3>
          {emotions.length === 0 ? (
            <p className="muted">Compariranno qui quando registrerai emozioni nel diario.</p>
          ) : (
            <>
              {emotions.map((e) => (
                <div key={e.word} className="row" style={{ flexWrap: 'nowrap', marginBottom: 8 }}>
                  <span style={{ width: 150 }}>{e.word}</span>
                  <Bar value={e.count / emotions[0].count} label={`${e.word}: ${e.count}`} />
                  <span className="small muted" style={{ width: 24, textAlign: 'right' }}>
                    {e.count}
                  </span>
                </div>
              ))}
              <p className="small muted" style={{ marginBottom: 0 }}>
                Un’emozione frequente non è un problema in sé: è un’informazione su ciò che conta per te in questo periodo.
              </p>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
