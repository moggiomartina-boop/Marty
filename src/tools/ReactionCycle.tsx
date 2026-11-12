import { useState } from 'react';
import { cycleSteps } from '../content/cycle';
import { Icon } from '../components/Icon';
import { useStore } from '../store/AppStore';
import { useToast } from '../components/Toast';
import { blankEntry } from './SaveToJournal';
import { useNavigate } from 'react-router-dom';

const colors = ['#1f4e5a', '#2f6b78', '#566f56', '#7f9a7e', '#a3875a', '#c27e66', '#9c5a44'];

/**
 * Visualizzazione interattiva del ciclo della reazione.
 * Modalità "esplora": clic su una tappa per leggerne il significato.
 * Modalità "il mio ciclo": compila ogni tappa con un episodio reale e salvalo nel diario.
 */
export function ReactionCycle() {
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState<'esplora' | 'mio'>('esplora');
  const [mine, setMine] = useState<Record<string, string>>({});
  const { dispatch } = useStore();
  const toast = useToast();
  const navigate = useNavigate();
  const step = cycleSteps[active];
  const n = cycleSteps.length;
  const R = 150;
  const cx = 200;
  const cy = 200;
  const pos = (i: number) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) };
  };

  const go = (d: number) => setActive((a) => (a + d + n) % n);
  const filled = cycleSteps.filter((s) => mine[s.id]?.trim()).length;

  const saveToJournal = () => {
    const now = new Date().toISOString();
    dispatch({
      type: 'saveEntry',
      entry: {
        ...blankEntry(),
        createdAt: now,
        updatedAt: now,
        title: 'Il mio ciclo emotivo e comportamentale',
        situation: mine.situazione ?? '',
        facts: mine.situazione ?? '',
        body: mine.emozione ?? '',
        interpretation: mine.pensiero ?? '',
        impulse: mine.impulso ?? '',
        action: mine.comportamento ?? '',
        impact: mine.effetto ?? '',
        otherView: mine.conseguenza ?? '',
        lab: 'mondo-interiore',
      },
    });
    dispatch({ type: 'useTool', tool: 'ciclo' });
    toast('Ciclo salvato nel diario');
    navigate('/diario');
  };

  return (
    <div>
      <div className="row no-print" style={{ marginBottom: 18 }}>
        <div className="chips" role="radiogroup" aria-label="Modalità">
          <button className="chip" role="radio" aria-checked={mode === 'esplora'} onClick={() => setMode('esplora')}>
            Esplora il modello
          </button>
          <button
            className="chip"
            role="radio"
            aria-checked={mode === 'mio'}
            onClick={() => {
              setMode('mio');
              dispatch({ type: 'useTool', tool: 'ciclo' });
            }}
          >
            Ricostruisci il tuo ciclo
          </button>
        </div>
      </div>
      <div className="cycle-wrap">
        <svg className="cycle-svg" viewBox="0 0 400 400" role="group" aria-label="Ciclo emotivo e comportamentale in sette tappe">
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="var(--line-2)" strokeWidth="2" strokeDasharray="4 6" />
          {cycleSteps.map((_, i) => {
            const a = pos(i);
            const b = pos((i + 1) % n);
            const mx = (a.x + b.x) / 2;
            const my = (a.y + b.y) / 2;
            const ang = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
            return (
              <g key={`arr-${i}`} transform={`translate(${mx} ${my}) rotate(${ang})`} aria-hidden="true">
                <path d="M-5 -5 L3 0 L-5 5" fill="none" stroke="var(--ink-3)" strokeWidth="1.6" />
              </g>
            );
          })}
          <text x={cx} y={cy - 10} textAnchor="middle" fontFamily="var(--serif)" fontSize="15" fill="var(--ink-3)">
            {mode === 'mio' ? `${filled} / ${n}` : 'il ciclo'}
          </text>
          <text x={cx} y={cy + 14} textAnchor="middle" fontFamily="var(--serif)" fontSize="20" fill="var(--petrol-900)">
            {step.name}
          </text>
          {cycleSteps.map((s, i) => {
            const p = pos(i);
            const on = i === active;
            const done = mode === 'mio' && !!mine[s.id]?.trim();
            return (
              <g
                key={s.id}
                className="cycle-node"
                tabIndex={0}
                role="button"
                aria-label={`${i + 1}. ${s.name}: ${s.short}`}
                aria-pressed={on}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActive(i);
                  }
                  if (e.key === 'ArrowRight') go(1);
                  if (e.key === 'ArrowLeft') go(-1);
                }}
              >
                <circle className="outer" cx={p.x} cy={p.y} r={on ? 30 : 24} fill={on ? colors[i] : 'var(--white)'} stroke={colors[i]} strokeWidth={2} />
                <text x={p.x} y={p.y + 5} textAnchor="middle" fontSize="15" fontWeight="600" fill={on ? '#fff' : colors[i]}>
                  {done ? '✓' : i + 1}
                </text>
                <text x={p.x} y={p.y + (p.y > cy ? 48 : -38)} textAnchor="middle" fontSize="12" fill="var(--ink-2)">
                  {s.name}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="card fade-in" key={`${active}-${mode}`}>
          <span className="eyebrow">
            Tappa {active + 1} di {n} · {step.short}
          </span>
          <h3>{step.name}</h3>
          {mode === 'esplora' ? (
            <>
              <p>{step.description}</p>
              <div className="note">
                <strong>Domanda guida.</strong> {step.question}
              </div>
              <p>
                <strong>Dove intervenire:</strong> {step.intervention}
              </p>
              <p className="muted small" style={{ fontStyle: 'italic' }}>
                Esempio — {step.example}
              </p>
            </>
          ) : (
            <div className="field">
              <label htmlFor={`cyc-${step.id}`}>{step.question}</label>
              <textarea
                id={`cyc-${step.id}`}
                className="textarea"
                value={mine[step.id] ?? ''}
                placeholder={step.example}
                onChange={(e) => setMine({ ...mine, [step.id]: e.target.value })}
              />
            </div>
          )}
          <div className="row">
            <button className="btn btn-secondary btn-sm" onClick={() => go(-1)} aria-label="Tappa precedente">
              <Icon name="arrowLeft" />
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => go(1)} aria-label="Tappa successiva">
              <Icon name="arrowRight" />
            </button>
            <span className="spacer" />
            {mode === 'mio' && (
              <button className="btn btn-sm" disabled={filled < 3} onClick={saveToJournal} title={filled < 3 ? 'Compila almeno tre tappe' : undefined}>
                Salva nel diario
              </button>
            )}
          </div>
          {mode === 'mio' && filled < 3 && <p className="small muted" style={{ marginTop: 10 }}>Compila almeno tre tappe per salvare.</p>}
        </div>
      </div>
    </div>
  );
}
