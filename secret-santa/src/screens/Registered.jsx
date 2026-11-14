import { Divider } from '../components/Ornaments.jsx';

/** Conferma dell'iscrizione (fase 1). */
export default function Registered({ name, onBack }) {
  return (
    <main className="screen farewell">
      <div className="envelope" aria-hidden="true">
        <div className="envelope-flap" />
        <div className="envelope-seal">{name[0]}</div>
      </div>
      <p className="script kicker">Iscrizione completata</p>
      <h1 className="farewell-title">Sei nella lista, {name} ✨</h1>
      <Divider className="home-divider" />
      <p className="farewell-text">
        Quando ci saremo tutti, l’organizzatrice avvierà l’estrazione.
        <br />
        Allora torna qui, tocca il tuo nome e inserisci il tuo PIN.
      </p>
      <p className="farewell-pass">Scrivi nel gruppo: “Mi sono iscritto!” 🎄</p>
      <button type="button" className="btn btn-primary btn-block" onClick={onBack}>
        Torna alla lista
      </button>
    </main>
  );
}
