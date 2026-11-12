import { useMemo, useState, type ChangeEvent } from 'react';
import { useStore } from '../store/AppStore';
import { useToast } from '../components/Toast';
import { Icon } from '../components/Icon';
import { blankEntry } from './SaveToJournal';

/** Analizza un messaggio di riparazione e segnala formule che tendono a indebolirlo. */
export function checkRepair(text: string): { ok: boolean; msg: string }[] {
  const t = ` ${text.toLowerCase()} `;
  const res: { ok: boolean; msg: string }[] = [];
  if (/\bma\b|\bperò\b|\bperò,/.test(t)) res.push({ ok: false, msg: 'Contiene “ma” o “però”: rischia di cancellare la scusa.' });
  if (/\bsempre\b|\bmai\b/.test(t)) res.push({ ok: false, msg: 'Contiene “sempre” o “mai”: le generalizzazioni riaprono il conflitto.' });
  if (/se ti sei offes|se ti ho offes|se ti sei sentit/.test(t)) res.push({ ok: false, msg: '“Se ti sei offeso/a” sposta la responsabilità sulla reazione dell’altro.' });
  if (/\banche tu\b|\btu invece\b/.test(t)) res.push({ ok: false, msg: 'Contiene una controaccusa (“anche tu”): meglio rimandarla a un altro momento.' });
  if (/devi perdonarmi|perdonami e|adesso basta|non parliamone più|facciamo pace/.test(t)) res.push({ ok: false, msg: 'Sembra chiedere un perdono o una chiusura: la riparazione si offre, non si pretende.' });
  if (/provocat|mi hai fatto arrivare|per colpa tua/.test(t)) res.push({ ok: false, msg: 'Attribuisce a lei una parte della tua reazione: la responsabilità del comportamento resta tua.' });
  if (/mi dispiace|scusa|scusami|chiedo scusa/.test(t)) res.push({ ok: true, msg: 'Contiene un’espressione di dispiacere.' });
  if (/la prossima volta|d’ora in poi|da ora|proverò|farò/.test(t)) res.push({ ok: true, msg: 'Contiene un impegno per il futuro.' });
  return res;
}

/** Costruttore di riparazione: quattro parti, anteprima, verifica, copia e salvataggio nel piano. */
export function RepairBuilder() {
  const { dispatch } = useStore();
  const toast = useToast();
  const [parts, setParts] = useState({ what: '', impact: '', sorry: '', next: '' });
  const message = useMemo(
    () =>
      [
        parts.what && `Quando ${parts.what.trim().replace(/\.$/, '')},`,
        parts.impact && `immagino che tu ti sia sentita ${parts.impact.trim().replace(/\.$/, '')}.`,
        parts.sorry && parts.sorry.trim(),
        parts.next && `La prossima volta ${parts.next.trim().replace(/\.$/, '')}.`,
      ]
        .filter(Boolean)
        .join(' '),
    [parts],
  );
  const checks = checkRepair(message);
  const set = (k: keyof typeof parts) => (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setParts({ ...parts, [k]: e.target.value });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      toast('Messaggio copiato');
    } catch {
      toast('Copia non disponibile: seleziona il testo manualmente');
    }
    dispatch({ type: 'useTool', tool: 'riparazione' });
  };
  const toJournal = () => {
    dispatch({ type: 'saveEntry', entry: { ...blankEntry(), title: 'Una riparazione', action: parts.what, impact: parts.impact, alternative: message, lab: 'due-bisogni' } });
    dispatch({ type: 'useTool', tool: 'riparazione' });
    toast('Riparazione salvata nel diario');
  };


  return (
    <div className="grid grid-2" style={{ alignItems: 'start' }}>
      <div>
        <div className="field">
          <label htmlFor="rb-what">1. Che cosa ho fatto, con parole specifiche</label>
          <input id="rb-what" className="input" placeholder="ieri ti ho fatto tre domande sullo stesso collega e ho alzato la voce" value={parts.what} onChange={set('what')} />
        </div>
        <div className="field">
          <label htmlFor="rb-impact">2. Come immagino che si sia sentita lei</label>
          <input id="rb-impact" className="input" placeholder="sotto accusa e un po’ spaventata" value={parts.impact} onChange={set('impact')} />
        </div>
        <div className="field">
          <label htmlFor="rb-sorry">3. La mia responsabilità, senza “ma”</label>
          <input id="rb-sorry" className="input" placeholder="Mi dispiace, non era giusto." value={parts.sorry} onChange={set('sorry')} />
        </div>
        <div className="field">
          <label htmlFor="rb-next">4. Che cosa farò di diverso</label>
          <input id="rb-next" className="input" placeholder="quando sento la gelosia salire non ti farò domande, me ne occuperò io" value={parts.next} onChange={set('next')} />
        </div>
      </div>
      <div className="card">
        <span className="eyebrow">Anteprima</span>
        <p style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', minHeight: 60 }}>{message || <span className="muted">Il tuo messaggio apparirà qui.</span>}</p>
        {checks.length > 0 && (
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px' }} aria-label="Verifica del messaggio">
            {checks.map((c) => (
              <li key={c.msg} className={`small ${c.ok ? 'ok' : 'ko'}`} style={{ marginBottom: 4 }}>
                {c.ok ? '✓' : '!'} {c.msg}
              </li>
            ))}
          </ul>
        )}
        <div className="row">
          <button className="btn btn-sm" disabled={!message} onClick={copy}>
            <Icon name="copy" /> Copia
          </button>
          <button className="btn btn-secondary btn-sm" disabled={!message} onClick={toJournal}>
            <Icon name="journal" /> Salva nel diario
          </button>
        </div>
        <p className="small muted" style={{ marginTop: 12, marginBottom: 0 }}>
          La riparazione si offre, non si pretende: lei può aver bisogno di tempo, o non volerla. Chiedere scusa non equivale a cambiare: conta ciò che farai dopo.
        </p>
      </div>
    </div>
  );
}
