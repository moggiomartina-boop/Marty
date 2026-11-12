import { useMemo, useState, type ChangeEvent } from 'react';
import { useStore } from '../store/AppStore';
import { useToast } from '../components/Toast';
import { Icon } from '../components/Icon';

/** Analizza un messaggio di riparazione e segnala formule che tendono a indebolirlo. */
export function checkRepair(text: string): { ok: boolean; msg: string }[] {
  const t = ` ${text.toLowerCase()} `;
  const res: { ok: boolean; msg: string }[] = [];
  if (/\bma\b|\bperò\b|\bperò,/.test(t)) res.push({ ok: false, msg: 'Contiene “ma” o “però”: rischia di cancellare la scusa.' });
  if (/\bsempre\b|\bmai\b/.test(t)) res.push({ ok: false, msg: 'Contiene “sempre” o “mai”: le generalizzazioni riaprono il conflitto.' });
  if (/se ti sei offes|se ti ho offes|se ti sei sentit/.test(t)) res.push({ ok: false, msg: '“Se ti sei offeso/a” sposta la responsabilità sulla reazione dell’altro.' });
  if (/\banche tu\b|\btu invece\b/.test(t)) res.push({ ok: false, msg: 'Contiene una controaccusa (“anche tu”): meglio rimandarla a un altro momento.' });
  if (/mi dispiace|scusa|scusami|chiedo scusa/.test(t)) res.push({ ok: true, msg: 'Contiene un’espressione di dispiacere.' });
  if (/la prossima volta|d’ora in poi|da ora|proverò|farò/.test(t)) res.push({ ok: true, msg: 'Contiene un impegno per il futuro.' });
  return res;
}

/** Costruttore di riparazione: quattro parti, anteprima, verifica, copia e salvataggio nel piano. */
export function RepairBuilder() {
  const { data, dispatch } = useStore();
  const toast = useToast();
  const [parts, setParts] = useState({ what: '', impact: '', sorry: '', next: '' });
  const message = useMemo(
    () =>
      [
        parts.what && `Quando ${parts.what.trim().replace(/\.$/, '')},`,
        parts.impact && `immagino che tu ti sia sentito/a ${parts.impact.trim().replace(/\.$/, '')}.`,
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
  const toPlan = () => {
    if (data.plan.repairPhrases.includes(message)) return toast('È già nel piano');
    dispatch({ type: 'savePlan', plan: { ...data.plan, repairPhrases: [...data.plan.repairPhrases, message] } });
    dispatch({ type: 'useTool', tool: 'riparazione' });
    toast('Aggiunta alle frasi di riparazione del piano');
  };

  return (
    <div className="grid grid-2" style={{ alignItems: 'start' }}>
      <div>
        <div className="field">
          <label htmlFor="rb-what">1. Che cosa ho fatto, con parole specifiche</label>
          <input id="rb-what" className="input" placeholder="ieri ti ho interrotto e ho alzato la voce" value={parts.what} onChange={set('what')} />
        </div>
        <div className="field">
          <label htmlFor="rb-impact">2. Come immagino tu ti sia sentito/a</label>
          <input id="rb-impact" className="input" placeholder="non ascoltato e un po’ umiliato" value={parts.impact} onChange={set('impact')} />
        </div>
        <div className="field">
          <label htmlFor="rb-sorry">3. La mia responsabilità, senza “ma”</label>
          <input id="rb-sorry" className="input" placeholder="Mi dispiace, non era giusto." value={parts.sorry} onChange={set('sorry')} />
        </div>
        <div className="field">
          <label htmlFor="rb-next">4. Che cosa farò di diverso</label>
          <input id="rb-next" className="input" placeholder="se mi sento salire la rabbia ti chiederò una pausa" value={parts.next} onChange={set('next')} />
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
          <button className="btn btn-secondary btn-sm" disabled={!message} onClick={toPlan}>
            <Icon name="plan" /> Aggiungi al piano
          </button>
        </div>
        <p className="small muted" style={{ marginTop: 12, marginBottom: 0 }}>
          La riparazione si offre, non si pretende: l’altra persona può aver bisogno di tempo.
        </p>
      </div>
    </div>
  );
}
