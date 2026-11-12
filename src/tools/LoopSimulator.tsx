import { useState } from 'react';
import { Icon } from '../components/Icon';
import { loopSteps } from '../content/loops';
import { useStore } from '../store/AppStore';

function Ring({ labels, active, color, title, broken }: { labels: string[]; active: number; color: string; title: string; broken: number | null }) {
  const n = labels.length;
  const R = 95;
  const c = 130;
  const pos = (i: number) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { x: c + R * Math.cos(a), y: c + R * Math.sin(a) };
  };
  return (
    <svg viewBox="0 0 260 260" className="loop-svg" role="img" aria-label={`${title}: ${labels.join(', ')}`}>
      <circle cx={c} cy={c} r={R} fill="none" stroke={broken !== null ? 'var(--line)' : color} strokeOpacity={0.35} strokeWidth="2" strokeDasharray={broken !== null ? '3 8' : undefined} />
      <text x={c} y={c + 4} textAnchor="middle" fontFamily="var(--serif)" fontSize="15" fill="var(--ink-2)">
        {title}
      </text>
      {labels.map((l, i) => {
        const p = pos(i);
        const on = i === active;
        const cut = broken !== null && i > broken;
        return (
          <g key={l} opacity={cut ? 0.3 : 1}>
            <circle cx={p.x} cy={p.y} r={on ? 13 : 9} fill={on ? color : 'var(--white)'} stroke={color} strokeWidth="2" />
            <text x={p.x} y={p.y + (p.y > c ? 28 : -18)} textAnchor="middle" fontSize="10.5" fill="var(--ink-2)">
              {l}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/**
 * Laboratorio 6: simulazione dei due circoli che si alimentano.
 * L'utente avanza passo per passo e può scegliere in quale punto interrompere il circolo.
 */
export function LoopSimulator() {
  const { dispatch } = useStore();
  const [step, setStep] = useState(0);
  const [broken, setBroken] = useState<number | null>(null);
  const s = loopSteps[step];
  const atEnd = step === loopSteps.length - 1;

  const reset = () => {
    setStep(0);
    setBroken(null);
  };

  return (
    <div>
      <div className="split loop-rings">
        <div>
          <span className="side-label side-me">● Il tuo circolo</span>
          <Ring labels={loopSteps.map((x) => x.me.name)} active={step} color="var(--petrol-500)" title="tu" broken={broken} />
        </div>
        <div>
          <span className="side-label side-other">● Il circolo di lei</span>
          <Ring labels={loopSteps.map((x) => x.her.name)} active={step} color="var(--terra-500)" title="lei" broken={broken} />
        </div>
      </div>

      {broken === null ? (
        <div className="fade-in" key={step}>
          <div className="split">
            <div className="card">
              <span className="eyebrow">
                Passo {step + 1} · {s.me.name}
              </span>
              <p style={{ margin: 0 }}>{s.me.text}</p>
            </div>
            <div className="card">
              <span className="eyebrow">Per lei · {s.her.name}</span>
              <p style={{ margin: 0 }}>{s.her.text}</p>
            </div>
          </div>
          <div className="row" style={{ marginTop: 16 }}>
            <button
              className="btn"
              onClick={() => {
                setBroken(step);
                dispatch({ type: 'useTool', tool: 'circolo' });
              }}
            >
              Interrompi il circolo qui
            </button>
            <span className="spacer" />
            {!atEnd ? (
              <button className="btn btn-secondary" onClick={() => setStep(step + 1)}>
                Lascia correre <Icon name="arrowRight" />
              </button>
            ) : (
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setStep(0);
                  dispatch({ type: 'useTool', tool: 'circolo' });
                }}
              >
                <Icon name="refresh" /> Il circolo ricomincia
              </button>
            )}
          </div>
          {atEnd && (
            <p className="note" style={{ marginTop: 14 }}>
              Il conflitto alimenta nuova insicurezza, e il circolo ricomincia, ogni volta un po’ più stretto. Prova a ripercorrerlo e a interromperlo in un punto
              diverso.
            </p>
          )}
        </div>
      ) : (
        <div className="fade-in">
          <div className="feedback">
            <span className="eyebrow">Hai interrotto al passo {broken + 1}</span>
            <h3 style={{ fontSize: '1.2rem' }}>{loopSteps[broken].exit.label}</h3>
            <p>{loopSteps[broken].exit.text}</p>
            <div className="two">
              <div className="side">
                <strong>Che cosa cambia per lei</strong>
                {loopSteps[broken].exit.herChange}
              </div>
              <div className="side">
                <strong>Che cosa cambia per te</strong>
                {broken <= 1
                  ? 'Prima interrompi, meno costa: l’ansia resta gestibile e non devi riparare nulla.'
                  : 'Interrompere più tardi è possibile, ma richiede più sforzo. La prossima volta prova a riconoscere i segnali un passo prima.'}
              </div>
            </div>
          </div>
          <p className="small muted" style={{ marginTop: 10 }}>
            Questi circoli sono un modello descrittivo: aiutano a vedere una dinamica possibile, non a prevedere che cosa succederà nella tua relazione.
          </p>
          <button className="btn btn-secondary" onClick={reset}>
            <Icon name="refresh" /> Ripercorri il circolo
          </button>
        </div>
      )}
    </div>
  );
}
