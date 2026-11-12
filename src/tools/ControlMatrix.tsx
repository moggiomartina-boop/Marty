import { useState } from 'react';
import { controlCases, type Mode } from '../content/controlMatrix';
import { useStore } from '../store/AppStore';
import { SaveToJournal } from './SaveToJournal';

const modeMeta = {
  a: { key: 'A', title: 'Comunicazione sana del bisogno', cls: 'mode-a' },
  b: { key: 'B', title: 'Richiesta pressante o accusatoria', cls: 'mode-b' },
  c: { key: 'C', title: 'Comportamento controllante o coercitivo', cls: 'mode-c' },
} as const;
type ModeKey = keyof typeof modeMeta;

const recognitionFeedback: Record<ModeKey | 'nessuna', string> = {
  a: 'Riconosci in te la modalità che lascia libera lei. Continua a osservare se regge anche nei momenti di maggiore gelosia o stanchezza.',
  b: 'Riconoscere la pressione è già un passo importante. La differenza con la modalità A non sta nelle parole, ma nella libertà che lasci a lei di dire di no senza pagarne il prezzo.',
  c: 'Riconoscerlo con onestà è difficile e prezioso. Questi comportamenti limitano la libertà di lei: il lavoro da fare riguarda la tua paura, non la sua vita. Considera di parlarne con un professionista.',
  nessuna: 'Va bene così. Se in futuro ti accorgerai di una di queste modalità, potrai tornare qui.',
};

function ModeCard({ k, mode }: { k: ModeKey; mode: Mode }) {
  const m = modeMeta[k];
  return (
    <div className={`card mode ${m.cls}`}>
      <span className="mode-key" aria-hidden="true">{m.key}</span>
      <span className="eyebrow">{m.title}</span>
      <p className="quiz-text">{mode.phrase}</p>
      <p className="small" style={{ margin: '0 0 6px' }}>
        <strong>Che cosa comunica:</strong> {mode.communicates}
      </p>
      <p className="small" style={{ margin: 0 }}>
        <strong>Possibile effetto su di lei:</strong> {mode.effect}
      </p>
    </div>
  );
}

/** Laboratorio 4: dieci situazioni in tre modalità, con riconoscimento personale e riscrittura. */
export function ControlMatrix() {
  const { dispatch } = useStore();
  const [idx, setIdx] = useState(0);
  const [recognized, setRecognized] = useState<Record<string, ModeKey | 'nessuna'>>({});
  const [mine, setMine] = useState<Record<string, string>>({});
  const c = controlCases[idx];
  const r = recognized[c.id];

  return (
    <div>
      <div className="chips" role="tablist" aria-label="Situazioni" style={{ marginBottom: 18 }}>
        {controlCases.map((x, i) => (
          <button key={x.id} role="tab" aria-selected={i === idx} className="chip chip-sm" aria-pressed={i === idx} onClick={() => setIdx(i)}>
            {i + 1}. {x.situation}
            {recognized[x.id] ? ' ✓' : ''}
          </button>
        ))}
      </div>
      <div className="fade-in" key={c.id}>
        <h3>{c.situation}</h3>
        <p className="muted">
          <strong>Il bisogno legittimo sotto:</strong> {c.need}
        </p>
        <div className="grid grid-3" style={{ marginTop: 12 }}>
          <ModeCard k="a" mode={c.a} />
          <ModeCard k="b" mode={c.b} />
          <ModeCard k="c" mode={c.c} />
        </div>
        <div className="card card-quiet" style={{ marginTop: 18 }}>
          <span className="label" style={{ fontWeight: 600 }}>
            In questa situazione, quale modalità riconosci in te, almeno qualche volta?
          </span>
          <p className="small muted">La risposta resta solo su questo dispositivo. Non è una valutazione: è uno specchio.</p>
          <div className="chips" role="radiogroup" aria-label="Modalità riconosciuta">
            {(['a', 'b', 'c', 'nessuna'] as const).map((k) => (
              <button
                key={k}
                type="button"
                role="radio"
                className="chip"
                aria-checked={r === k}
                onClick={() => {
                  setRecognized({ ...recognized, [c.id]: k });
                  dispatch({ type: 'useTool', tool: 'controllo' });
                }}
              >
                {k === 'nessuna' ? 'Nessuna di queste' : `${modeMeta[k].key} — ${modeMeta[k].title.split(' ')[0]} ${modeMeta[k].title.split(' ')[1]}`}
              </button>
            ))}
          </div>
          {r && (
            <p className="fade-in" style={{ marginTop: 12 }}>
              {recognitionFeedback[r]}
            </p>
          )}
          <div className="field" style={{ marginTop: 12 }}>
            <label htmlFor={`mine-${c.id}`}>Scrivi la tua versione A, con parole tue</label>
            <textarea id={`mine-${c.id}`} className="textarea" style={{ minHeight: 80 }} value={mine[c.id] ?? ''} onChange={(e) => setMine({ ...mine, [c.id]: e.target.value })} />
          </div>
          <SaveToJournal
            disabled={!(mine[c.id] ?? '').trim()}
            build={() => ({
              title: `Dal bisogno al controllo: ${c.situation.toLowerCase()}`,
              situation: c.situation,
              interpretation: `Bisogno: ${c.need}`,
              action: r ? `Modalità riconosciuta: ${r === 'nessuna' ? 'nessuna' : modeMeta[r].title}` : '',
              alternative: mine[c.id] ?? '',
              lab: 'controllo',
            })}
          />
        </div>
        <div className="row" style={{ marginTop: 16 }}>
          <button className="btn btn-secondary btn-sm" disabled={idx === 0} onClick={() => setIdx(idx - 1)}>
            Situazione precedente
          </button>
          <span className="spacer" />
          <button className="btn btn-sm" disabled={idx === controlCases.length - 1} onClick={() => setIdx(idx + 1)}>
            Situazione successiva
          </button>
        </div>
      </div>
    </div>
  );
}
