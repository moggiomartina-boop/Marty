import { ArrowLeft, Check, Lock, RotateCcw } from 'lucide-react';
import { Holly } from '../components/Ornaments.jsx';

/** Griglia di selezione del proprio nome. */
export default function WhoAreYou({
  status, loading, loadError, selected, demo,
  onSelect, onSelectClaimed, onReveal, onBack, onRetry, onResetDemo,
}) {
  const claimedCount = status.filter((p) => p.claimed).length;
  const total = status.length || 8;

  return (
    <main className="screen who">
      <header className="who-header">
        <button type="button" className="icon-btn" onClick={onBack} aria-label="Torna alla home">
          <ArrowLeft size={20} />
        </button>
        <span className="progress-pill" aria-live="polite">
          <span className="progress-bar"><span style={{ width: `${(claimedCount / total) * 100}%` }} /></span>
          {claimedCount}/{total} hanno pescato
        </span>
      </header>

      <div className="who-intro">
        <p className="script kicker">Ho ho ho…</p>
        <h1 className="who-title">Chi sei?</h1>
        <p className="who-subtitle">Tocca il tuo nome per scoprire chi dovrai sorprendere.</p>
      </div>

      {loadError ? (
        <div className="load-error">
          <p>{loadError}</p>
          <button type="button" className="btn btn-ghost" onClick={onRetry}><RotateCcw size={16} /> Riprova</button>
        </div>
      ) : (
        <ul className="name-grid" aria-busy={loading}>
          {(loading && !status.length ? Array.from({ length: 8 }, (_, i) => ({ name: '', claimed: false, i })) : status).map((p, i) => {
            const isSel = selected === p.name;
            if (!p.name) return <li key={i} className="name-card skeleton" />;
            return (
              <li key={p.name} style={{ animationDelay: `${i * 60}ms` }} className="name-cell">
                <button
                  type="button"
                  className={`name-card paper ${isSel ? 'is-selected' : ''} ${p.claimed ? 'is-claimed' : ''}`}
                  onClick={() => (p.claimed ? onSelectClaimed(p.name) : onSelect(p.name))}
                  aria-pressed={isSel}
                  aria-label={p.claimed ? `${p.name}, ha già pescato. Tocca per rivedere il nome con la tua email` : p.name}
                >
                  <Holly className="card-holly" size={22} />
                  <span className="seal">{p.name[0]}</span>
                  <span className="card-name">{p.name}</span>
                  <span className="card-state">
                    {p.claimed ? <><Lock size={11} /> Già pescato</> : isSel ? <><Check size={12} /> Sei tu</> : 'Tocca per scegliere'}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {demo && (
        <p className="demo-note">
          Modalità demo · l’estrazione è salvata solo su questo dispositivo.{' '}
          <button type="button" className="link-btn" onClick={onResetDemo}>Azzera</button>
        </p>
      )}

      <div className={`cta-dock ${selected ? 'is-visible' : ''}`}>
        <button type="button" className="btn btn-primary btn-block" onClick={onReveal} tabIndex={selected ? 0 : -1}>
          Scopri chi devi sorprendere
        </button>
      </div>
    </main>
  );
}
