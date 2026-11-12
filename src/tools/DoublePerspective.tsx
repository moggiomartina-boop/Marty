import { useState } from 'react';
import { useStore } from '../store/AppStore';
import { SaveToJournal } from './SaveToJournal';

interface Side {
  facts: string;
  feeling: string;
  need: string;
  fear: string;
}
const emptySide: Side = { facts: '', feeling: '', need: '', fear: '' };

const rows: { key: keyof Side; me: string; other: string; help: string }[] = [
  { key: 'facts', me: 'Che cosa ho visto e sentito', other: 'Che cosa ha visto e sentito', help: 'Solo ciò che è accessibile da quella posizione.' },
  { key: 'feeling', me: 'Che cosa ho provato', other: 'Che cosa potrebbe aver provato', help: 'Un’emozione precisa, anche più d’una.' },
  { key: 'need', me: 'Di che cosa avevo bisogno', other: 'Di che cosa poteva avere bisogno', help: 'Rispetto, vicinanza, tranquillità, riconoscimento…' },
  { key: 'fear', me: 'Che cosa temevo', other: 'Che cosa poteva temere', help: 'La paura spesso spiega la mossa.' },
];

/**
 * Doppio punto di vista: la stessa scena descritta da due posizioni,
 * con un confronto finale che evidenzia bisogni comuni e differenze.
 */
export function DoublePerspective() {
  const { dispatch } = useStore();
  const [scene, setScene] = useState('');
  const [me, setMe] = useState<Side>(emptySide);
  const [other, setOther] = useState<Side>(emptySide);
  const [step, setStep] = useState<'scrivi' | 'confronta'>('scrivi');
  const [insight, setInsight] = useState('');
  const [check, setCheck] = useState('');

  const complete = scene.trim() && rows.every((r) => me[r.key].trim() && other[r.key].trim());

  if (step === 'confronta')
    return (
      <div className="fade-in">
        <div className="card card-quiet" style={{ marginBottom: 18 }}>
          <span className="eyebrow">La scena</span>
          <p style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', margin: 0 }}>{scene}</p>
        </div>
        {rows.map((r) => (
          <div key={r.key} className="split" style={{ marginBottom: 12 }}>
            <div className="card">
              <span className="side-label side-me">● Io · {r.me.toLowerCase()}</span>
              <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{me[r.key]}</p>
            </div>
            <div className="card">
              <span className="side-label side-other">● L’altra persona · {r.other.toLowerCase()}</span>
              <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{other[r.key]}</p>
            </div>
          </div>
        ))}
        <div className="note" style={{ marginTop: 18 }}>
          Guardando i bisogni affiancati, spesso si scopre che non sono opposti: due persone che vogliono entrambe sentirsi rispettate, o al sicuro,
          possono scontrarsi proprio per proteggere la stessa cosa. Ricorda: la colonna di destra è un’ipotesi tua, non la verità sull’altro.
        </div>
        <div className="field">
          <label htmlFor="dp-insight">Che cosa noti, ora che vedi le due versioni affiancate?</label>
          <textarea id="dp-insight" className="textarea" value={insight} onChange={(e) => setInsight(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="dp-check">Che domanda potresti fare all’altra persona per verificare la tua ipotesi?</label>
          <input id="dp-check" className="input" placeholder="Es. “Ieri mi è sembrato che fossi preoccupato: era così?”" value={check} onChange={(e) => setCheck(e.target.value)} />
        </div>
        <div className="row">
          <button className="btn btn-secondary" onClick={() => setStep('scrivi')}>
            Modifica
          </button>
          <SaveToJournal
            build={() => ({
              title: 'Doppio punto di vista',
              situation: scene,
              facts: me.facts,
              emotions: [],
              body: '',
              interpretation: `Io temevo: ${me.fear}`,
              action: `Io avevo bisogno di: ${me.need}\nHo provato: ${me.feeling}`,
              otherView: `Ha visto: ${other.facts}\nPotrebbe aver provato: ${other.feeling}\nBisogno: ${other.need}\nTimore: ${other.fear}${check ? `\nDomanda da fare: ${check}` : ''}`,
              alternative: insight,
              lab: 'altra-persona',
            })}
            onSaved={() => {
              setScene('');
              setMe(emptySide);
              setOther(emptySide);
              setInsight('');
              setCheck('');
              setStep('scrivi');
            }}
          />
        </div>
      </div>
    );

  return (
    <div>
      <div className="field">
        <label htmlFor="dp-scene">Descrivi brevemente la scena</label>
        <textarea id="dp-scene" className="textarea" style={{ minHeight: 80 }} placeholder="Chi c’era, che cosa è successo." value={scene} onChange={(e) => setScene(e.target.value)} />
      </div>
      {rows.map((r) => (
        <div key={r.key} className="split">
          <div className="field">
            <label htmlFor={`me-${r.key}`} className="side-me">
              Io · {r.me}
            </label>
            <textarea id={`me-${r.key}`} className="textarea" style={{ minHeight: 80 }} value={me[r.key]} onChange={(e) => setMe({ ...me, [r.key]: e.target.value })} />
          </div>
          <div className="field">
            <label htmlFor={`ot-${r.key}`} className="side-other">
              L’altra persona · {r.other}
            </label>
            <textarea id={`ot-${r.key}`} className="textarea" style={{ minHeight: 80 }} placeholder={r.help} value={other[r.key]} onChange={(e) => setOther({ ...other, [r.key]: e.target.value })} />
          </div>
        </div>
      ))}
      <button
        className="btn"
        disabled={!complete}
        onClick={() => {
          setStep('confronta');
          dispatch({ type: 'useTool', tool: 'prospettive' });
        }}
      >
        Metti a confronto
      </button>
      {!complete && <p className="small muted" style={{ marginTop: 8 }}>Compila la scena e tutte le righe di entrambe le colonne per confrontarle.</p>}
    </div>
  );
}
