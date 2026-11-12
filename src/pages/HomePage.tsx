import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { PageHead } from '../components/Layout';
import { LabCard } from '../components/LabCard';
import { ProgressRing } from '../components/ui';
import { labs, movements } from '../content/labs';
import { scenarios } from '../content/scenarios';
import { useStore } from '../store/AppStore';
import { isLabCompleted, nextLab, overallProgress } from '../store/selectors';
import { formatDate } from '../utils/format';

/** I nove principi del percorso, dalla specifica. */
const principles = [
  'Un’emozione può essere autentica senza rendere corretta ogni reazione.',
  'La paura di perdere qualcuno non giustifica il controllo.',
  'Il bisogno di rassicurazione non dà diritto a verifiche continue.',
  'L’amore non implica disponibilità permanente.',
  'La fiducia non si ricostruisce attraverso la sorveglianza.',
  'La rabbia non giustifica intimidazioni o aggressività.',
  'Le intenzioni non cancellano le conseguenze.',
  'Chiedere scusa non equivale a cambiare.',
  'La sofferenza personale merita ascolto, ma non autorizza a provocare sofferenza negli altri.',
];

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
      <text x="110" y="330" fontFamily="Georgia, serif" fontSize="15" fill="#44555a" textAnchor="middle">ciò che provi</text>
      <text x="292" y="330" fontFamily="Georgia, serif" fontSize="15" fill="#44555a" textAnchor="middle">ciò che provochi</text>
    </svg>
  );
}

/** Presentazione: visibile al primo accesso e sempre da /benvenuto. */
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
            <p className="hero-sub">Capire ciò che provi. Riconoscere ciò che provochi.</p>
            <p className="lead">
              Un percorso interattivo per comprendere gelosia, insicurezza, paura dell’abbandono, bisogno di controllo, rabbia, fiducia e responsabilità affettiva.
            </p>
            <div className="row" style={{ marginTop: 24 }}>
              {data.onboarded ? (
                <Link to="/" className="btn">
                  Torna al tuo percorso <Icon name="arrowRight" />
                </Link>
              ) : (
                <button className="btn" onClick={start}>
                  Inizia il percorso <Icon name="arrowRight" />
                </button>
              )}
              <Link to="/laboratori/mondo-interiore" className="btn btn-secondary" onClick={() => !data.onboarded && dispatch({ type: 'onboard' })}>
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

      <section className="central-message" aria-label="Messaggio centrale">
        <p>Non sei responsabile di tutte le emozioni che provi, ma sei responsabile di come scegli di comportarti quando le provi.</p>
      </section>

      <section className="section" aria-labelledby="principi">
        <h2 id="principi">Che cosa troverai in questo percorso</h2>
        <p className="muted read">
          Non è uno strumento per accusarti, giudicarti o diagnosticarti. È uno spazio per riconoscere i tuoi schemi emotivi, comprendere le conseguenze dei tuoi
          comportamenti e sperimentare alternative. Lungo la strada incontrerai queste idee:
        </p>
        <ol className="principles-list">
          {principles.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ol>
      </section>

      <section className="section" aria-labelledby="percorso">
        <h2 id="percorso">Il percorso</h2>
        <p className="muted read">I nove laboratori sono progressivi, ma puoi aprirli nell’ordine che ti serve.</p>
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
            Questo percorso non sostituisce uno psicologo e non fornisce diagnosi. Non serve a dimostrare a qualcuno che ha torto, né a convincere la tua partner di
            qualcosa: è uno spazio per te. Se ci sono stati episodi di intimidazione o aggressione, la priorità è la sicurezza:{' '}
            <Link to="/sicurezza">leggi qui</Link>.
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
  const doneScenarios = scenarios.filter((s) => data.progress.scenarios[s.id]?.length).length;
  const completed = labs.filter((l) => isLabCompleted(data, l.id)).length;
  const suggested = scenarios.find((s) => !data.progress.scenarios[s.id]) ?? scenarios[0];
  const planFilled = data.plan.behavior.trim() || data.plan.alternative.trim();

  return (
    <div className="container">
      <PageHead eyebrow="Il tuo percorso" title="Bentornato." lead="Riprendi da dove avevi lasciato, o scegli ciò che ti serve oggi." />

      {data.safety.flagged && (
        <div className="safety" style={{ marginBottom: 18 }}>
          <strong>Ricorda: la sicurezza viene prima.</strong> {data.safety.acknowledgedAt ? 'Hai un piano di uscita: rileggilo ogni tanto.' : 'Prima degli esercizi ordinari, prepara il tuo piano di uscita.'}{' '}
          <Link to="/laboratori/rabbia?tab=strumenti">Protocollo</Link> · <Link to="/sicurezza">Sicurezza e aiuto</Link>
        </div>
      )}

      <div className="grid grid-2">
        <div className="card card-petrol dash-main">
          <div style={{ ['--accent' as string]: '#d5e0d2' }}>
            <ProgressRing value={overall} size={84} stroke={7} textColor="var(--ivory)" trackColor="rgba(248,244,236,0.18)" label={`Percorso esplorato al ${Math.round(overall * 100)}%`} />
          </div>
          <div>
            <p className="small" style={{ margin: '0 0 4px', opacity: 0.8 }}>{completed} di 9 laboratori completati</p>
            <h3 style={{ marginBottom: 4 }}>{next ? `Prossimo: ${next.title}` : 'Hai completato tutti i laboratori'}</h3>
            <p className="muted" style={{ margin: '0 0 12px' }}>
              {next ? `Laboratorio ${next.number} · ${next.subtitle}` : 'Puoi tornarci quando vuoi e aggiornare il tuo piano.'}
            </p>
            <Link to={next ? `/laboratori/${next.id}` : '/piano'} className="btn btn-sm btn-light">
              {next ? 'Continua' : 'Rivedi il piano'} <Icon name="arrowRight" />
            </Link>
          </div>
        </div>

        <div className="card">
          <span className="eyebrow">Adesso</span>
          <h3>Ti è appena successo qualcosa?</h3>
          <p className="muted">Fermarti a scrivere ti aiuta a separare ciò che è successo da ciò che ti stai dicendo. Il diario è solo tuo.</p>
          <div className="row">
            <Link to="/diario/nuovo" className="btn btn-sm">
              <Icon name="plus" /> Nuova voce di diario
            </Link>
            <Link to="/laboratori/reagire?tab=strumenti" className="btn btn-secondary btn-sm">
              Strumenti rapidi
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-3" style={{ marginTop: 18 }}>
        <Link to={`/scenari/${suggested.id}`} className="card card-link">
          <span className="eyebrow">Situazione suggerita</span>
          <h3>{suggested.title}</h3>
          <p className="muted small" style={{ margin: 0 }}>
            {doneScenarios} di {scenarios.length} situazioni esplorate
          </p>
        </Link>
        <Link to="/piano" className="card card-link">
          <span className="eyebrow">Il tuo piano</span>
          <h3>{planFilled ? 'Aggiorna il piano' : 'Inizia il tuo piano'}</h3>
          <p className="muted small" style={{ margin: 0 }}>
            {data.plan.updatedAt ? `Ultima modifica: ${formatDate(data.plan.updatedAt)}` : 'Dal comportamento da interrompere ai progressi osservabili.'}
          </p>
        </Link>
        <Link to="/aiuto" className="card card-link">
          <span className="eyebrow">Modulo speciale</span>
          <h3>Potrebbe essere il momento di chiedere aiuto?</h3>
          <p className="muted small" style={{ margin: 0 }}>
            15 motivi per iniziare un percorso psicologico.
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
