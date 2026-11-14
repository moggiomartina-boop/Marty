import { useEffect, useRef, useState } from 'react';
import { KeyRound, X } from 'lucide-react';

/**
 * Pannello dal basso per il PIN segreto a 4 cifre.
 * mode "create": prima estrazione (conferma identità + nuovo PIN)
 * mode "verify": rivedere il nome già pescato
 * Le cifre non sono mai mostrate in chiaro (pallini), così chi è accanto non le legge.
 */
export default function PinSheet({ name, mode, error, busy, onSubmit, onClose }) {
  const [pin, setPin] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 350);
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => { clearTimeout(t); window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  useEffect(() => { if (error) setPin(''); }, [error]);

  const submit = (e) => {
    e.preventDefault();
    if (pin.length === 4 && !busy) onSubmit(pin);
  };

  const create = mode === 'create';

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <form
        className="sheet paper"
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
      >
        <button type="button" className="sheet-close" onClick={onClose} aria-label="Chiudi">
          <X size={20} />
        </button>
        <div className="sheet-icon"><KeyRound size={22} strokeWidth={1.6} /></div>
        <p className="script sheet-kicker">{create ? 'Un ultimo passo' : 'Eccoti di nuovo'}</p>
        <h2 id="sheet-title" className="sheet-title">
          {create ? <>Sei proprio tu, <em>{name}</em>?</> : <>Ciao <em>{name}</em></>}
        </h2>
        <p className="sheet-text">
          {create
            ? 'Scegli un PIN segreto di 4 cifre: ti servirà solo se vorrai rivedere il nome più avanti. Pescherai una volta sola!'
            : 'Inserisci il tuo PIN segreto per rivedere chi devi sorprendere.'}
        </p>

        <label className="pin" aria-label="PIN di 4 cifre">
          <input
            ref={inputRef}
            className="pin-input"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="off"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
          />
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={`pin-box ${i < pin.length ? 'filled' : ''} ${i === pin.length ? 'active' : ''}`} />
          ))}
        </label>

        <p className="sheet-error" role="alert">{error || ' '}</p>

        <button type="submit" className="btn btn-primary btn-block" disabled={pin.length !== 4 || busy}>
          {busy ? 'Un attimo…' : create ? 'Apri il mio regalo 🎁' : 'Rivedi il mio nome'}
        </button>
        {create && <p className="sheet-hint">Annotalo da qualche parte: non può essere recuperato.</p>}
      </form>
    </div>
  );
}
