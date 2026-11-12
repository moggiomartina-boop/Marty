import { Link } from 'react-router-dom';
import { PageHead } from '../components/Layout';
import { Bar, EmptyState, ProgressRing } from '../components/ui';
import { exercises } from '../content/exercises';
import { labs } from '../content/labs';
import { findChoice, scenarios, styleLabel } from '../content/scenarios';
import { useStore } from '../store/AppStore';
import { journalByWeek, labProgress, overallProgress, topEmotions } from '../store/selectors';
import type { ChoiceStyle } from '../types';

export function ProgressPage() {
  const { data } = useStore();
  const overall = overallProgress(data);
  const weeks = journalByWeek(data);
  const maxWeek = Math.max(1, ...weeks.map((w) => w.count));
  const emotions = topEmotions(data);
  const scenariosDone = scenarios.filter((s) => data.progress.scenarios[s.id]?.length).length;
  const exercisesDone = exercises.filter((e) => data.progress.exercises[e.id]).length;
  const totalRuns = Object.values(data.progress.scenarios).reduce((a, r) => a + r.length, 0);

  // Distribuzione delle mosse scelte negli scenari: descrittiva, non un punteggio.
  const styleCount: Record<ChoiceStyle, number> = { impulsiva: 0, evitante: 0, consapevole: 0 };
  scenarios.forEach((s) =>
    (data.progress.scenarios[s.id] ?? []).forEach((run) =>
      run.path.forEach((cid) => {
        const c = findChoice(s, cid);
        if (c) styleCount[c.style]++;
      }),
    ),
  );
  const totalMoves = styleCount.impulsiva + styleCount.evitante + styleCount.consapevole;

  return (
    <div className="container">
      <PageHead
        eyebrow="Il tuo percorso"
        title="Progressi"
        lead="Una fotografia di ciò che hai esplorato. Non ci sono punteggi né valutazioni: solo tracce del tuo lavoro, per orientarti."
      />

      <div className="grid grid-3">
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <ProgressRing value={overall} size={80} stroke={7} />
          <div className="stat">
            <span className="stat-num">{labs.filter((l) => labProgress(data, l.id).ratio >= 1).length}/9</span>
            <span className="stat-label">laboratori completati</span>
          </div>
        </div>
        <div className="card">
          <div className="row" style={{ gap: 28 }}>
            <div className="stat">
              <span className="stat-num">
                {scenariosDone}/{scenarios.length}
              </span>
              <span className="stat-label">scenari esplorati</span>
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
              <span className="stat-num">{data.progress.readSections.length}</span>
              <span className="stat-label">sezioni lette</span>
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <h2>Laboratori</h2>
        <div className="card">
          {labs.map((l) => {
            const p = labProgress(data, l.id);
            return (
              <Link key={l.id} to={`/laboratori/${l.id}`} className={`accent-${l.accent}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit', padding: '12px 0', borderTop: l.number > 1 ? '1px solid var(--line)' : 'none' }}>
                <div className="row" style={{ flexWrap: 'nowrap' }}>
                  <span style={{ fontFamily: 'var(--serif)', color: 'var(--accent)', width: 28 }}>{l.number}</span>
                  <span style={{ flex: '0 1 280px', minWidth: 0 }}>{l.title}</span>
                  <Bar value={p.ratio} label={`Avanzamento ${l.title}`} />
                  <span className="small muted" style={{ width: 40, textAlign: 'right' }}>
                    {Math.round(p.ratio * 100)}%
                  </span>
                </div>
                <div className="small muted" style={{ marginLeft: 40 }}>
                  Letture {p.sectionsRead}/{p.sectionsTotal} · Scenari {p.scenariosDone}/{p.scenariosTotal} · Esercizi {p.exercisesDone}/{p.exercisesTotal}
                  {p.hasTool && ` · Strumento ${p.toolUsed ? 'usato' : 'da provare'}`}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="grid grid-2">
        <section className="card" aria-labelledby="h-diario">
          <h3 id="h-diario">Diario, ultime 8 settimane</h3>
          {data.journal.length === 0 ? (
            <p className="muted">Ancora nessuna voce. <Link to="/diario/nuovo">Scrivi la prima</Link>.</p>
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
                  <span style={{ width: 130 }}>{e.word}</span>
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

        <section className="card" aria-labelledby="h-mosse">
          <h3 id="h-mosse">Le mosse che hai esplorato negli scenari</h3>
          {totalMoves === 0 ? (
            <EmptyState title="Nessuno scenario ancora" action={<Link to="/scenari" className="btn btn-sm">Vai agli scenari</Link>} />
          ) : (
            <>
              {(Object.keys(styleCount) as ChoiceStyle[]).map((k) => (
                <div key={k} className="row" style={{ flexWrap: 'nowrap', marginBottom: 8 }}>
                  <span className={`path-dot dot-${k}`} style={{ width: 12, height: 12 }} aria-hidden="true" />
                  <span style={{ width: 160 }}>{styleLabel[k]}</span>
                  <Bar value={styleCount[k] / totalMoves} label={`${styleLabel[k]}: ${styleCount[k]}`} />
                  <span className="small muted" style={{ width: 24, textAlign: 'right' }}>
                    {styleCount[k]}
                  </span>
                </div>
              ))}
              <p className="small muted" style={{ marginBottom: 0 }}>
                {totalRuns} percorsi completati. Esplorare tutte le strade, anche quelle impulsive, è parte dell’apprendimento: serve a vedere che cosa
                provoca ogni mossa.
              </p>
            </>
          )}
        </section>

        <section className="card" aria-labelledby="h-piano">
          <h3 id="h-piano">Il tuo piano</h3>
          <ul className="small" style={{ paddingLeft: '1.2em' }}>
            <li>{data.plan.triggers.length} situazioni attivanti</li>
            <li>{data.plan.earlySignals.length} segnali precoci</li>
            <li>{data.plan.pauseStrategies.length} strategie di pausa</li>
            <li>{data.plan.ifThen.filter((x) => x.when && x.then).length} intenzioni “se… allora…”</li>
            <li>{data.plan.repairPhrases.length} frasi di riparazione</li>
            <li>{data.plan.boundaries.length} confini</li>
          </ul>
          <Link to="/piano" className="btn btn-secondary btn-sm">
            Apri il piano
          </Link>
        </section>
      </div>
    </div>
  );
}
