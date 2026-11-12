import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { PageHead } from '../components/Layout';
import { LabCard } from '../components/LabCard';
import { ProgressRing } from '../components/ui';
import { labs, movements } from '../content/labs';
import { scenarios } from '../content/scenarios';
import { useStore } from '../store/AppStore';
import { nextLab, overallProgress } from '../store/selectors';
import { formatDate } from '../utils/format';

function HeroArt() {
  return (
    <svg className="hero-art" viewBox="0 0 400 360" role="img" aria-label="Due cerchi che si sovrappongono: ciò che provi e ciò che provochi">
      <defs>
        <radialGradient id="g1" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#2f6b78" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#14363f" />
        </radialGradient>
        <radialGradient id="g2" cx="60%" cy="40%">
          <stop offset="0%" stopColor="#e8b8a3" />
          <stop offset="100%" stopColor="#c27e66" />
        </radialGradient>
      </defs>
      <circle cx="150" cy="180" r="120" fill="url(#g1)" />
      <circle cx="250" cy="180" r="120" fill="url(#g2)" opacity="0.82" style={{ mixBlendMode: 'multiply' }} />
      <path d="M60 200c40-40 80-40 120 0s80 40 120 0 60-30 60-30" fill="none" stroke="#f8f4ec" strokeWidth="2" opacity="0.8" />
      <path d="M70 160c30-26 60-26 90 0" fill="none" stroke="#d5e0d2" strokeWidth="2" opacity="0.7" />
      <text x="110" y="310" fontFamily="Georgia, serif" fontSize="15" fill="#44555a" textAnchor="middle">ciò che provi</text>
      <text x="292" y="310" fontFamily="Georgia, serif" fontSize="15" fill="#44555a" textAnchor="middle">ciò che provochi</text>
    </svg>
  );
}

/** Presentazione del metodo: visibile al primo accesso e sempre da /benvenuto. */
export function WelcomePage() {
  const { data, dispatch } = useStore();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'Oltre la reazione — Capire ciò che provi. Riconoscere ciò che provochi.';
  }, []);
  const start = () => {
    dispatch({ type: 'onboard' });
    navigate('/');
  };
  return (
    <div className="container">
      <section className="hero">
        <div className="hero-grid">
          <div className="fade-in">
            <span className="eyebrow">Un percorso in nove laboratori</span>
            <h1>
              Oltre la <em>reazione</em>
            </h1>
            <p className="lead">
              Capire ciò che provi. Riconoscere ciò che provochi. Uno spazio per osservare le tue reazioni nelle relazioni, con strumenti
              concreti, scenari interattivi e un piano personale costruito da te.
            </p>
            <div className="row" style={{ marginTop: 24 }}>
              {data.onboarded ? (
                <Link to="/" className="btn">
                  Torna alla tua bacheca <Icon name="arrowRight" />
                </Link>
              ) : (
                <button className="btn" onClick={start}>
                  Inizia il percorso <Icon name="arrowRight" />
                </button>
              )}
              <Link to="/laboratori/emozioni" className="btn btn-secondary" onClick={() => !data.onboarded && dispatch({ type: 'onboard' })}>
                Vai al primo laboratorio
              </Link>
            </div>
            <p className="small muted" style={{ marginTop: 18, display: 'flex', gap: 8, alignItems: 'center' }}>
              <Icon name="lock" size={16} /> Nessun account. Nessun dato inviato: tutto resta su questo dispositivo.
            </p>
          </div>
          <HeroArt />
        </div>
      </section>

      <section className="section" aria-labelledby="principi">
        <h2 id="principi">Come funziona</h2>
        <div className="principles" style={{ marginTop: 18 }}>
          <div className="principle">
            <h3>Osservare, non giudicare</h3>
            <p>Nessun punteggio, nessuna etichetta. Descriviamo mosse e dinamiche, non persone “giuste” o “sbagliate”.</p>
          </div>
          <div className="principle">
            <h3>Due prospettive</h3>
            <p>Ogni scena è vista da dentro (ciò che provi) e da fuori (l’effetto che ha sull’altro). La consapevolezza nasce dall’incontro.</p>
          </div>
          <div className="principle">
            <h3>Dal capire al fare</h3>
            <p>Gli esercizi e il diario alimentano un piano personale, con intenzioni concrete “se… allora…”, da stampare o esportare.</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="percorso">
        <h2 id="percorso">Il percorso</h2>
        <p className="muted read">
          I nove laboratori seguono tre movimenti. Puoi percorrerli in ordine o scegliere quello che ti serve adesso.
        </p>
        {movements.map((m, i) => (
          <div key={m.title} style={{ marginTop: 28 }}>
            <span className="eyebrow">
              {['I', 'II', 'III'][i]} — {m.title}
            </span>
            <div className="grid grid-3">
              {m.labs.map((id) => (
                <LabCard key={id} lab={labs.find((l) => l.id === id)!} compact />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="card card-quiet read">
          <h3>Prima di cominciare</h3>
          <p className="muted" style={{ margin: 0 }}>
            Questo percorso non sostituisce un aiuto professionale e non fornisce diagnosi. Se vivi una situazione di pericolo o di violenza,
            la priorità è la tua sicurezza: <Link to="/sicurezza">trova qui i contatti utili</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}

export function HomePage() {
  const { data } = useStore();
  if (!data.onboarded) return <WelcomePage />;
  return <Dashboard />;
}

function Dashboard() {
  const { data } = useStore();
  const overall = overallProgress(data);
  const next = nextLab(data);
  const recent = data.journal.slice(0, 3);
  const doneScenarios = Object.keys(data.progress.scenarios).length;
  const suggested = scenarios.find((s) => !data.progress.scenarios[s.id]) ?? scenarios[0];
  const planFilled =
    data.plan.triggers.length + data.plan.earlySignals.length + data.plan.pauseStrategies.length + data.plan.ifThen.length > 0;

  return (
    <div className="container">
      <PageHead eyebrow="La tua bacheca" title="Bentornato/a." lead="Riprendi da dove avevi lasciato, o scegli ciò che ti serve oggi." />

      <div className="grid grid-2">
        <div className="card card-petrol" style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <div style={{ ['--accent' as string]: '#d5e0d2' }}>
            <ProgressRing value={overall} size={84} stroke={7} textColor="var(--ivory)" trackColor="rgba(248,244,236,0.18)" label={`Percorso completato al ${Math.round(overall * 100)}%`} />
          </div>
          <div>
            <h3 style={{ marginBottom: 4 }}>{next ? `Prossimo: ${next.title}` : 'Hai esplorato tutti i laboratori'}</h3>
            <p className="muted" style={{ margin: '0 0 12px' }}>
              {next ? `Laboratorio ${next.number} · ${next.subtitle}` : 'Puoi ripercorrerli quando vuoi e aggiornare il tuo piano.'}
            </p>
            <Link to={next ? `/laboratori/${next.id}` : '/piano'} className="btn btn-sm" style={{ background: 'var(--ivory)', color: 'var(--petrol-900)' }}>
              {next ? 'Continua' : 'Rivedi il piano'} <Icon name="arrowRight" />
            </Link>
          </div>
        </div>

        <div className="card">
          <span className="eyebrow">Adesso</span>
          <h3>Ti è appena successo qualcosa?</h3>
          <p className="muted">Fermarsi a scrivere aiuta a separare i fatti da ciò che ti stai dicendo.</p>
          <div className="row">
            <Link to="/diario/nuovo" className="btn btn-sm">
              <Icon name="plus" /> Nuova voce di diario
            </Link>
            <Link to="/strumenti/respiro" className="btn btn-secondary btn-sm">
              Respira un minuto
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-3" style={{ marginTop: 18 }}>
        <Link to={`/scenari/${suggested.id}`} className="card card-link">
          <span className="eyebrow">Scenario suggerito</span>
          <h3>{suggested.title}</h3>
          <p className="muted small" style={{ margin: 0 }}>
            {doneScenarios} di {scenarios.length} scenari esplorati
          </p>
        </Link>
        <Link to="/strumenti/ciclo" className="card card-link">
          <span className="eyebrow">Strumento</span>
          <h3>Il ciclo della reazione</h3>
          <p className="muted small" style={{ margin: 0 }}>
            Sette passaggi, dall’innesco alla risposta dell’altro.
          </p>
        </Link>
        <Link to="/piano" className="card card-link">
          <span className="eyebrow">Il tuo piano</span>
          <h3>{planFilled ? 'Aggiorna il piano' : 'Inizia il tuo piano'}</h3>
          <p className="muted small" style={{ margin: 0 }}>
            {data.plan.updatedAt ? `Ultima modifica: ${formatDate(data.plan.updatedAt)}` : 'Segnali, pause, intenzioni “se… allora…”.'}
          </p>
        </Link>
      </div>

      {recent.length > 0 && (
        <section className="section">
          <div className="row" style={{ marginBottom: 12 }}>
            <h2 style={{ margin: 0 }}>Dal tuo diario</h2>
            <span className="spacer" />
            <Link to="/diario" className="btn btn-ghost btn-sm">
              Vedi tutto <Icon name="arrowRight" />
            </Link>
          </div>
          <div className="grid grid-3">
            {recent.map((e) => (
              <Link key={e.id} to={`/diario/${e.id}`} className="card card-link entry-card">
                <span className="entry-meta">{formatDate(e.createdAt)}</span>
                <h3 style={{ fontSize: '1.1rem' }}>{e.title || 'Senza titolo'}</h3>
                <div className="chips">
                  {e.emotions.slice(0, 3).map((w) => (
                    <span key={w} className="tag">
                      {w}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <h2>I nove laboratori</h2>
        {movements.map((m, i) => (
          <div key={m.title} style={{ marginTop: 24 }}>
            <span className="eyebrow">
              {['I', 'II', 'III'][i]} — {m.title}
            </span>
            <div className="grid grid-3">
              {m.labs.map((id) => (
                <LabCard key={id} lab={labs.find((l) => l.id === id)!} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
