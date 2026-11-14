import { useEffect, useState } from 'react';
import GiftBox from '../components/GiftBox.jsx';
import Confetti from '../components/Confetti.jsx';
import { Holly, Sparkle, Divider } from '../components/Ornaments.jsx';

const SUSPENSE_LINES = [
  'Gli elfi stanno controllando la lista…',
  'Mescolando i bigliettini…',
  'Ci siamo quasi…',
];

/**
 * La rivelazione: suspense (pacchetto che trema) → apertura → nome.
 * Il nome viene montato nel DOM solo nella fase finale.
 */
export default function Reveal({ giver, receiver, replay, onDone }) {
  const [phase, setPhase] = useState('suspense'); // suspense | opening | revealed
  const [line, setLine] = useState(0);

  useEffect(() => {
    const suspense = replay ? 1400 : 2700;
    const lineTimer = setInterval(() => setLine((l) => Math.min(l + 1, SUSPENSE_LINES.length - 1)), suspense / 3);
    const t1 = setTimeout(() => { setPhase('opening'); navigator.vibrate?.(40); }, suspense);
    const t2 = setTimeout(() => setPhase('revealed'), suspense + 950);
    return () => { clearInterval(lineTimer); clearTimeout(t1); clearTimeout(t2); };
  }, [replay]);

  const revealed = phase === 'revealed';

  return (
    <main className={`screen reveal reveal--${phase}`}>
      <Confetti fire={revealed} />

      {!revealed && (
        <div className="reveal-stage">
          <p className="script kicker">Per {giver}</p>
          <GiftBox state={phase === 'suspense' ? 'shaking' : 'open'} />
          <p className="suspense-line" aria-live="polite" key={line}>
            {phase === 'suspense' ? SUSPENSE_LINES[line] : 'Ecco a te…'}
          </p>
        </div>
      )}

      {revealed && (
        <section className="reveal-result" aria-live="assertive">
          <p className="reveal-kicker">🎄 Il tuo Secret Santa è…</p>

          <div className="letter paper">
            <Holly className="letter-holly letter-holly--tl" size={40} />
            <Holly className="letter-holly letter-holly--br" size={40} />
            <Sparkle className="letter-spark s1" size={14} />
            <Sparkle className="letter-spark s2" size={10} />
            <Sparkle className="letter-spark s3" size={12} />
            <p className="script letter-for">devi sorprendere</p>
            <h1 className="receiver-name">{receiver}</h1>
            <Divider className="letter-divider" />
            <p className="letter-text">Adesso tocca a te rendere speciale il suo Natale!</p>
          </div>

          <button type="button" className="btn btn-primary btn-block reveal-done" onClick={onDone}>
            Ho scoperto il mio Secret Santa!
          </button>
          <p className="hush">Mi raccomando, non dire a nessuno chi hai pescato! 🤫</p>
        </section>
      )}
    </main>
  );
}
