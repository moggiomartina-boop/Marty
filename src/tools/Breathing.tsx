import { useEffect, useRef, useState } from 'react';
import { useStore } from '../store/AppStore';

const patterns = {
  lungo: { name: 'Espirazione lunga (4–6)', inhale: 4, hold: 0, exhale: 6 },
  quadrato: { name: 'Respiro quadrato (4–4–4)', inhale: 4, hold: 4, exhale: 4 },
  lento: { name: 'Lento (5–5)', inhale: 5, hold: 0, exhale: 5 },
} as const;
type PatternId = keyof typeof patterns;

/**
 * Guida al respiro con cerchio che si espande e si contrae.
 * Non è una terapia: è un modo semplice per rallentare l'attivazione.
 */
export function Breathing() {
  const { dispatch } = useStore();
  const [pid, setPid] = useState<PatternId>('lungo');
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState<'inspira' | 'trattieni' | 'espira'>('inspira');
  const [count, setCount] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [minutes, setMinutes] = useState(1);
  const [before, setBefore] = useState<number | null>(null);
  const [after, setAfter] = useState<number | null>(null);
  const timer = useRef<number>();
  const p = patterns[pid];
  const totalCycles = Math.max(1, Math.round((minutes * 60) / (p.inhale + p.hold + p.exhale)));
  const done = !running && cycles >= totalCycles;

  useEffect(() => {
    if (!running) return;
    const dur = phase === 'inspira' ? p.inhale : phase === 'trattieni' ? p.hold : p.exhale;
    if (count >= dur) {
      if (phase === 'inspira') setPhase(p.hold ? 'trattieni' : 'espira');
      else if (phase === 'trattieni') setPhase('espira');
      else {
        const c = cycles + 1;
        setCycles(c);
        if (c >= totalCycles) {
          setRunning(false);
          dispatch({ type: 'useTool', tool: 'respiro' });
          return;
        }
        setPhase('inspira');
      }
      setCount(0);
      return;
    }
    timer.current = window.setTimeout(() => setCount((x) => x + 1), 1000);
    return () => window.clearTimeout(timer.current);
  }, [running, count, phase, p, cycles, totalCycles, dispatch]);

  const start = () => {
    setCycles(0);
    setPhase('inspira');
    setCount(0);
    setAfter(null);
    setRunning(true);
  };
  const dur = phase === 'inspira' ? p.inhale : phase === 'trattieni' ? p.hold : p.exhale;
  const scale = !running ? 0.6 : phase === 'inspira' ? 1 : phase === 'trattieni' ? 1 : 0.6;

  return (
    <div className="grid grid-2" style={{ alignItems: 'center' }}>
      <div className="breath">
        <div
          className="breath-circle"
          style={{ transform: `scale(${scale})`, transition: running ? `transform ${dur}s ease-in-out` : 'transform 0.6s' }}
          aria-hidden="true"
        >
          {running ? phase : done ? 'fatto' : 'pronto'}
        </div>
        <p aria-live="polite" className="muted" style={{ marginTop: 16, minHeight: 24 }}>
          {running ? `${phase === 'inspira' ? 'Inspira' : phase === 'trattieni' ? 'Trattieni' : 'Espira'} · ${dur - count}` : done ? 'Esercizio completato.' : ''}
        </p>
        {running && (
          <p className="small muted">
            Ciclo {Math.min(cycles + 1, totalCycles)} di {totalCycles}
          </p>
        )}
      </div>
      <div>
        <div className="field">
          <span className="label">Ritmo</span>
          <div className="chips" role="radiogroup" aria-label="Ritmo">
            {(Object.keys(patterns) as PatternId[]).map((k) => (
              <button key={k} className="chip" role="radio" aria-checked={pid === k} disabled={running} onClick={() => setPid(k)}>
                {patterns[k].name}
              </button>
            ))}
          </div>
        </div>
        <div className="field">
          <span className="label">Durata</span>
          <div className="chips" role="radiogroup" aria-label="Durata">
            {[1, 2, 3].map((m) => (
              <button key={m} className="chip" role="radio" aria-checked={minutes === m} disabled={running} onClick={() => setMinutes(m)}>
                {m} min
              </button>
            ))}
          </div>
        </div>
        <div className="field">
          <span className="label">Attivazione prima (0–10)</span>
          <div className="chips" role="radiogroup" aria-label="Attivazione prima">
            {[0, 2, 4, 6, 8, 10].map((v) => (
              <button key={v} className="chip" role="radio" aria-checked={before === v} onClick={() => setBefore(v)}>
                {v}
              </button>
            ))}
          </div>
        </div>
        {done && (
          <div className="field fade-in">
            <span className="label">Attivazione dopo (0–10)</span>
            <div className="chips" role="radiogroup" aria-label="Attivazione dopo">
              {[0, 2, 4, 6, 8, 10].map((v) => (
                <button key={v} className="chip" role="radio" aria-checked={after === v} onClick={() => setAfter(v)}>
                  {v}
                </button>
              ))}
            </div>
            {before !== null && after !== null && (
              <p className="small" style={{ marginTop: 8 }}>
                {after < before
                  ? `L’attivazione percepita è scesa da ${before} a ${after}.`
                  : after === before
                    ? 'L’attivazione percepita è rimasta simile: succede. Puoi provare un altro ritmo o muoverti un po’.'
                    : 'L’attivazione percepita è salita: per alcune persone concentrarsi sul respiro è scomodo. Prova a camminare o a sentire i piedi sul pavimento.'}
              </p>
            )}
          </div>
        )}
        <div className="row">
          {!running ? (
            <button className="btn" onClick={start}>
              {done ? 'Ricomincia' : 'Inizia'}
            </button>
          ) : (
            <button className="btn btn-secondary" onClick={() => setRunning(false)}>
              Interrompi
            </button>
          )}
        </div>
        <p className="small muted" style={{ marginTop: 14 }}>
          Se ti senti stordito/a, torna a respirare normalmente. Se hai condizioni respiratorie o cardiache, segui le indicazioni del tuo medico.
        </p>
      </div>
    </div>
  );
}
