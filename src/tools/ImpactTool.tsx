import { useState } from 'react';
import { impactPhrases } from '../content/impactPhrases';
import { useStore } from '../store/AppStore';

/** Intenzione e impatto: frasi frequenti, ciò che vogliamo dire e ciò che arriva. */
export function ImpactTool() {
  const { dispatch } = useStore();
  const [sel, setSel] = useState<string | null>(null);
  const [mine, setMine] = useState<Record<string, boolean>>({});
  const p = impactPhrases.find((x) => x.id === sel);
  return (
    <div className="grid grid-2" style={{ alignItems: 'start' }}>
      <div>
        <p className="muted small">Scegli una frase. Puoi anche segnare quelle che ti capita di usare.</p>
        <div className="choice-list">
          {impactPhrases.map((x) => (
            <button
              key={x.id}
              className={`choice ${sel === x.id ? 'picked' : ''}`}
              aria-pressed={sel === x.id}
              onClick={() => {
                setSel(x.id);
                dispatch({ type: 'useTool', tool: 'impatto' });
              }}
            >
              <span style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem' }}>{x.phrase}</span>
              {mine[x.id] && <span className="tag tag-terra" style={{ marginLeft: 8 }}>la uso</span>}
            </button>
          ))}
        </div>
      </div>
      <div style={{ position: 'sticky', top: 'calc(var(--header-h) + 16px)' }}>
        {p ? (
          <div className="card fade-in" key={p.id}>
            <h3 style={{ fontSize: '1.4rem' }}>{p.phrase}</h3>
            <div className="feedback" style={{ animation: 'none', background: 'var(--petrol-100)', marginBottom: 10 }}>
              <strong className="small">Ciò che di solito intendiamo</strong>
              <p style={{ margin: '4px 0 0' }}>{p.intention}</p>
            </div>
            <div className="feedback" style={{ animation: 'none', background: 'var(--terra-100)', marginBottom: 10 }}>
              <strong className="small">Ciò che spesso arriva</strong>
              <p style={{ margin: '4px 0 0' }}>{p.impact}</p>
            </div>
            <div className="feedback" style={{ animation: 'none', background: 'var(--sage-100)' }}>
              <strong className="small">Un’alternativa possibile</strong>
              <p style={{ margin: '4px 0 0', fontFamily: 'var(--serif)' }}>{p.alternative}</p>
            </div>
            <label className="row small" style={{ marginTop: 14, cursor: 'pointer' }}>
              <input type="checkbox" checked={!!mine[p.id]} onChange={(e) => setMine({ ...mine, [p.id]: e.target.checked })} />
              Mi capita di usare questa frase
            </label>
            <p className="small muted" style={{ marginTop: 10, marginBottom: 0 }}>
              L’impatto descritto è frequente, non certo: dipende dalla relazione, dal tono, dal momento.
            </p>
          </div>
        ) : (
          <div className="empty">
            <h3>Scegli una frase</h3>
            <p className="muted">Vedrai la distanza tra ciò che intendiamo e ciò che l’altro può sentire.</p>
          </div>
        )}
      </div>
    </div>
  );
}
