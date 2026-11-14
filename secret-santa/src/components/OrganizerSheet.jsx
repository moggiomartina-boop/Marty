import { useEffect, useRef, useState } from 'react';
import { Crown, Unlock, X } from 'lucide-react';
import { drawService, errorMessage } from '../services/drawService.js';

/**
 * Pannello dell'organizzatrice, protetto dal codice organizzatrice.
 * Prima dell'estrazione: vede chi è iscritto, può liberare un nome e avviare
 * l'estrazione quando ci sono tutti. Dopo: può solo ricominciare da capo.
 * Non mostra MAI le coppie (nemmeno a lei).
 */
export default function OrganizerSheet({ status, demoCode, onChanged, onClose }) {
  const [code, setCode] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 350);
    return () => clearTimeout(t);
  }, []);

  async function run(action, confirmText) {
    if (confirmText && !window.confirm(confirmText)) return;
    setBusy(true);
    setError('');
    const res = await action();
    setBusy(false);
    if (!res?.ok) {
      setError(errorMessage(res));
      if (res?.error === 'WRONG_CODE' || res?.error === 'LOCKED') setUnlocked(false);
      return;
    }
    if (!unlocked) setUnlocked(true);
    onChanged();
  }

  const login = (e) => {
    e.preventDefault();
    if (code && !busy) run(() => drawService.organizer.login(code));
  };

  const people = status.participants;
  const registered = people.filter((p) => p.registered).length;
  const allIn = registered === people.length && people.length > 0;
  const drawn = status.phase === 'drawn';

  return (
    <div className="sheet-backdrop" onClick={() => !busy && onClose()}>
      <div className="sheet paper" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="org-title">
        <button type="button" className="sheet-close" onClick={onClose} aria-label="Chiudi">
          <X size={20} />
        </button>
        <div className="sheet-icon"><Crown size={22} strokeWidth={1.6} /></div>
        <p className="script sheet-kicker">Dietro le quinte</p>
        <h2 id="org-title" className="sheet-title">Area organizzatrice</h2>

        {!unlocked ? (
          <form className="org-login" onSubmit={login}>
            <p className="sheet-text">Inserisci il codice organizzatrice.</p>
            {demoCode && <p className="demo-code">Modalità demo · il codice è <strong>{demoCode}</strong></p>}
            <input
              ref={inputRef}
              className="text-input"
              type="password"
              autoComplete="off"
              autoCapitalize="none"
              value={code}
              onChange={(e) => { setCode(e.target.value); setError(''); }}
              aria-label="Codice organizzatrice"
            />
            <p className="sheet-error" role="alert">{error || ' '}</p>
            <button type="submit" className="btn btn-primary btn-block" disabled={!code || busy}>
              {busy ? 'Un attimo…' : 'Entra'}
            </button>
          </form>
        ) : (
          <>
            <p className="sheet-text">
              {drawn
                ? 'L’estrazione è avviata. Le coppie restano segrete anche a te.'
                : `${registered} iscritti su ${people.length}. Se qualcuno trova il proprio nome già preso, liberalo e fallo iscrivere di nuovo.`}
            </p>

            {!drawn && (
              <ul className="org-list">
                {people.map((p) => (
                  <li key={p.name} className={p.registered ? 'is-in' : ''}>
                    <span className="org-name">{p.name}</span>
                    {p.registered ? (
                      <button
                        type="button"
                        className="org-release"
                        disabled={busy}
                        onClick={() => run(
                          () => drawService.organizer.release(code, p.name),
                          `Liberare il nome di ${p.name}? Dovrà iscriversi di nuovo con un nuovo PIN.`,
                        )}
                      >
                        <Unlock size={13} /> Libera
                      </button>
                    ) : (
                      <span className="org-wait">in attesa</span>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <p className="sheet-error" role="alert">{error || ' '}</p>

            {!drawn ? (
              <>
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  disabled={!allIn || busy}
                  onClick={() => run(
                    () => drawService.organizer.start(code),
                    'Tutti hanno confermato nel gruppo di essersi iscritti di persona? Dopo l’avvio le iscrizioni si chiudono.',
                  )}
                >
                  {busy ? 'Un attimo…' : 'Avvia l’estrazione 🎄'}
                </button>
                <p className="sheet-hint">
                  {allIn
                    ? 'Prima di avviare, chiedi nel gruppo a ognuno: “ti sei iscritto tu?”'
                    : 'Il pulsante si attiva quando tutti si sono iscritti.'}
                </p>
              </>
            ) : (
              <button
                type="button"
                className="btn btn-ghost btn-ghost-dark btn-block"
                disabled={busy}
                onClick={() => run(
                  () => drawService.organizer.reset(code),
                  'Ricominciare da capo? Si cancellano estrazione e iscrizioni: tutti dovranno iscriversi di nuovo.',
                )}
              >
                Ricomincia da capo
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
