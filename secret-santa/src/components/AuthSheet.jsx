import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Mail, MailCheck, X } from 'lucide-react';
import { drawService, errorMessage } from '../services/drawService.js';

const RESEND_SECONDS = 60;

/** m*****a@gmail.com: per confermare l'indirizzo senza mostrarlo per intero. */
function maskEmail(email) {
  const [user, domain] = email.split('@');
  if (!domain) return email;
  return `${user[0]}${'•'.repeat(Math.max(user.length - 2, 1))}${user.length > 1 ? user.at(-1) : ''}@${domain}`;
}

/**
 * Pannello dal basso in due passaggi:
 *  1. email  → il server controlla che sia quella del nome scelto, poi invia il codice
 *  2. codice → verifica e rivelazione
 * "claimed": la persona ha già pescato e vuole rivedere il nome.
 */
export default function AuthSheet({ name, claimed, onRevealed, onClose }) {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [demoCode, setDemoCode] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const emailRef = useRef(null);
  const codeRef = useRef(null);

  // focus sul campo giusto dopo l'animazione del pannello
  useEffect(() => {
    const t = setTimeout(() => (step === 'email' ? emailRef : codeRef).current?.focus(), 380);
    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && !busy && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [busy, onClose]);

  useEffect(() => {
    if (cooldown <= 0) return undefined;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  async function sendCode() {
    setBusy(true);
    setError('');
    const check = await drawService.checkEmail(name, email);
    if (!check.ok) {
      setBusy(false);
      setError(errorMessage(check, name));
      return;
    }
    const sent = await drawService.sendCode(email);
    setBusy(false);
    if (!sent.ok) {
      setError(errorMessage(sent, name));
      return;
    }
    setDemoCode(sent.demoCode || '');
    setCode('');
    setCooldown(RESEND_SECONDS);
    setStep('code');
  }

  async function verify() {
    setBusy(true);
    setError('');
    const res = await drawService.reveal(name, email, code);
    setBusy(false);
    if (res?.ok) {
      onRevealed(res);
      return;
    }
    setCode('');
    setError(errorMessage(res, name));
  }

  const submit = (e) => {
    e.preventDefault();
    if (busy) return;
    if (step === 'email' && email.trim()) sendCode();
    if (step === 'code' && code.length >= 6) verify();
  };

  return (
    <div className="sheet-backdrop" onClick={() => !busy && onClose()}>
      <form
        className="sheet paper"
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        noValidate
      >
        <button type="button" className="sheet-close" onClick={onClose} aria-label="Chiudi" disabled={busy}>
          <X size={20} />
        </button>
        {step === 'code' && (
          <button type="button" className="sheet-back" onClick={() => { setStep('email'); setError(''); }} aria-label="Cambia email">
            <ArrowLeft size={20} />
          </button>
        )}

        <div className="sheet-icon">
          {step === 'email' ? <Mail size={22} strokeWidth={1.6} /> : <MailCheck size={22} strokeWidth={1.6} />}
        </div>

        {step === 'email' ? (
          <>
            <p className="script sheet-kicker">{claimed ? 'Eccoti di nuovo' : 'Un ultimo passo'}</p>
            <h2 id="sheet-title" className="sheet-title">Sei proprio tu, <em>{name}</em>?</h2>
            <p className="sheet-text">
              {claimed
                ? 'Inserisci la tua email: ti mandiamo un codice per rivedere chi devi sorprendere.'
                : 'Inserisci la tua email: ti mandiamo un codice per essere sicuri che sei davvero tu. Solo tu potrai vedere il nome.'}
            </p>
            <input
              ref={emailRef}
              className="text-input"
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="la-tua@email.it"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              aria-label="La tua email"
            />
          </>
        ) : (
          <>
            <p className="script sheet-kicker">Controlla la posta</p>
            <h2 id="sheet-title" className="sheet-title">Inserisci il codice</h2>
            <p className="sheet-text">
              L’abbiamo appena inviato a <strong>{maskEmail(email.trim().toLowerCase())}</strong>.
              Se non lo trovi, guarda nello spam.
            </p>
            {demoCode && (
              <p className="demo-code">Modalità demo · nessuna email inviata · il codice è <strong>{demoCode}</strong></p>
            )}
            <input
              ref={codeRef}
              className="text-input code-input"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]*"
              maxLength={10}
              placeholder="••••••"
              value={code}
              onChange={(e) => { setCode(e.target.value.replace(/\D/g, '').slice(0, 10)); setError(''); }}
              aria-label="Codice ricevuto via email"
            />
          </>
        )}

        <p className="sheet-error" role="alert">{error || ' '}</p>

        {step === 'email' ? (
          <button type="submit" className="btn btn-primary btn-block" disabled={!email.trim() || busy}>
            {busy ? 'Un attimo…' : 'Inviami il codice'}
          </button>
        ) : (
          <>
            <button type="submit" className="btn btn-primary btn-block" disabled={code.length < 6 || busy}>
              {busy ? 'Un attimo…' : claimed ? 'Rivedi il mio nome' : 'Apri il mio regalo 🎁'}
            </button>
            <p className="sheet-hint">
              {cooldown > 0 ? (
                `Puoi chiedere un nuovo codice tra ${cooldown}s`
              ) : (
                <button type="button" className="link-btn" onClick={sendCode} disabled={busy}>Invia un nuovo codice</button>
              )}
            </p>
          </>
        )}
      </form>
    </div>
  );
}
