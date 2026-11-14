import { ArrowLeft, Check, Crown, Gift, RotateCcw } from 'lucide-react';
import { Holly } from '../components/Ornaments.jsx';

/**
 * Griglia dei nomi. Due fasi:
 * - "registration": si sceglie il proprio nome e ci si iscrive
 * - "drawn": si sceglie il proprio nome e si scopre il destinatario con il PIN
 */
export default function WhoAreYou({
  status, loading, loadError, selected, notice, demo,
  onSelect, onAction, onBack, onRetry, onOrganizer,
}) {
  const drawn = status.phase === 'drawn';
  const people = status.participants;
  const total = people.length || 8;
  const count = people.filter((p) => (drawn ? p.revealed : p.registered)).length;

  const cardState = (p, isSel) => {
    if (drawn) {
      if (isSel) return <><Check size={12} /> Sei tu</>;
      return p.revealed ? <><Gift size={11} /> Ha scoperto</> : 'Tocca per scoprire';
    }
    if (p.registered) return <><Check size={12} /> Iscritto</>;
    return isSel ? <><Check size={12} /> Sei tu</> : 'Tocca per iscriverti';
  };

  return (
    <main className="screen who">
      <header className="who-header">
        <button type="button" className="icon-btn" onClick={onBack} aria-label="Torna alla home">
          <ArrowLeft size={20} />
        </button>
        <span className="progress-pill" aria-live="polite">
          <span className="progress-bar"><span style={{ width: `${(count / total) * 100}%` }} /></span>
          {count}/{total} {drawn ? 'hanno scoperto' : 'iscritti'}
        </span>
      </header>

      <div className="who-intro">
        <p className="script kicker">{drawn ? 'L’estrazione è aperta!' : 'Ho ho ho…'}</p>
        <h1 className="who-title">Chi sei?</h1>
        <p className="who-subtitle">
          {drawn
            ? 'Tocca il tuo nome per scoprire chi dovrai sorprendere.'
            : 'Tocca il tuo nome per iscriverti. L’estrazione partirà quando ci saremo tutti.'}
        </p>
      </div>

      {!drawn && people.length > 0 && (
        <ol className="steps" aria-label="Come funziona">
          <li className="is-active"><span>1</span> Iscriviti</li>
          <li><span>2</span> Avvio</li>
          <li><span>3</span> Scopri</li>
        </ol>
      )}

      {demo && (
        <p className="demo-banner" role="note">
          <strong>Versione di prova.</strong> Le iscrizioni restano salvate solo su questo
          dispositivo: gli altri telefoni non le vedono. Per giocare ognuno dal proprio
          telefono serve la versione online.
        </p>
      )}

      {notice && <p className="notice" role="status">{notice}</p>}

      {loadError ? (
        <div className="load-error">
          <p>{loadError}</p>
          <button type="button" className="btn btn-ghost" onClick={onRetry}><RotateCcw size={16} /> Riprova</button>
        </div>
      ) : (
        <ul className="name-grid" aria-busy={loading}>
          {(!people.length ? Array.from({ length: 8 }, () => null) : people).map((p, i) => {
            if (!p) return <li key={i} className="name-card skeleton" />;
            const isSel = selected === p.name;
            const done = drawn ? p.revealed : p.registered;
            return (
              <li key={p.name} style={{ animationDelay: `${i * 60}ms` }} className="name-cell">
                <button
                  type="button"
                  className={`name-card paper ${isSel ? 'is-selected' : ''} ${done && !isSel ? 'is-done' : ''}`}
                  onClick={() => onSelect(p)}
                  aria-pressed={isSel}
                >
                  <Holly className="card-holly" size={22} />
                  <span className="seal">{p.name[0]}</span>
                  <span className="card-name">{p.name}</span>
                  <span className="card-state">{cardState(p, isSel)}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <div className="who-footer">
        <button type="button" className="org-link" onClick={onOrganizer}>
          <Crown size={13} /> Area organizzatrice
        </button>
      </div>

      <div className={`cta-dock ${selected ? 'is-visible' : ''}`}>
        <button type="button" className="btn btn-primary btn-block" onClick={onAction} tabIndex={selected ? 0 : -1}>
          {drawn ? 'Scopri chi devi sorprendere' : 'Iscriviti'}
        </button>
      </div>
    </main>
  );
}
