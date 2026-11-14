import { Divider } from '../components/Ornaments.jsx';

/** Chiusura: il nome sparisce dallo schermo, il telefono può passare al prossimo. */
export default function Farewell({ allDone, onNext }) {
  return (
    <main className="screen farewell">
      <div className="envelope" aria-hidden="true">
        <div className="envelope-flap" />
        <div className="envelope-seal">S</div>
      </div>
      <p className="script kicker">Segreto custodito</p>
      <h1 className="farewell-title">Il tuo segreto è al sicuro ✨</h1>
      <Divider className="home-divider" />
      <p className="farewell-text">
        Mi raccomando, non dire a nessuno chi hai pescato! 🤫
        <br />
        Se lo dimentichi, tocca il tuo nome e rientra con la tua email.
      </p>
      {allDone ? (
        <p className="all-done">Tutti gli 8 elfi hanno pescato. Che i regali abbiano inizio! 🎄</p>
      ) : (
        <p className="farewell-pass">Ora puoi passare il telefono al prossimo elfo.</p>
      )}
      <button type="button" className="btn btn-primary btn-block" onClick={onNext}>
        Torna all’estrazione
      </button>
    </main>
  );
}
