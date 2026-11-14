import HomeIllustration from '../components/HomeIllustration.jsx';
import { Divider } from '../components/Ornaments.jsx';
import { PARTICIPANTS } from '../lib/participants.js';

/** Schermata iniziale scenografica. */
export default function Home({ onStart }) {
  return (
    <main className="screen home">
      <div className="home-inner">
        <p className="eyebrow">🎅 Secret Santa · The Christmas Draw</p>

        <HomeIllustration />

        <h1 className="home-title">
          <span className="title-line">It’s</span>{' '}
          <span className="title-script">Christmas</span>{' '}
          <span className="title-line">time!</span>
        </h1>
        <Divider className="home-divider" />
        <p className="home-subtitle">Il Natale è più bello quando si fa un regalo a qualcuno.</p>

        <button type="button" className="btn btn-primary btn-hero" onClick={onStart}>
          <span>Inizia l’estrazione</span> <span aria-hidden="true">🎁</span>
        </button>

        <div className="participants-counter" aria-label={`${PARTICIPANTS.length} partecipanti`}>
          <div className="seal-row" aria-hidden="true">
            {PARTICIPANTS.map((n, i) => (
              <span key={n} className="mini-seal" style={{ animationDelay: `${0.6 + i * 0.07}s` }}>{n[0]}</span>
            ))}
          </div>
          <p className="meta">8 partecipanti · 1 regalo a testa · Infinite sorprese</p>
        </div>
      </div>
    </main>
  );
}
