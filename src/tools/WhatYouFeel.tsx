import { useState } from 'react';
import { Icon } from '../components/Icon';
import { Bar, ChipSelect, Scale } from '../components/ui';
import { emotionFamilies, familyOfWord } from '../content/emotions';
import { useStore } from '../store/AppStore';
import { SaveToJournal } from './SaveToJournal';

const situations = [
  'Ha pranzato con un collega',
  'Non risponde da ore',
  'Esce con le amiche',
  'È più silenziosa del solito',
  'Vuole del tempo per sé',
  'Mi ha detto di no',
];

const impulses = ['chiederle spiegazioni', 'verificare dove è o con chi', 'chiederle una conferma', 'alzare la voce', 'chiudermi in silenzio', 'farle pesare la cosa', 'andarmene', 'non lo so'];

const behaviors: { label: string; feedback: string; aware: boolean }[] = [
  { label: 'Dirle ciò che sento, senza accusare', aware: true, feedback: 'Parlare dell’emozione e non del sospetto le permette di rispondere a te, non di difendersi. Scegli un momento in cui sei abbastanza calmo.' },
  { label: 'Aspettare che l’emozione si abbassi, poi decidere', aware: true, feedback: 'Rimandare la decisione è uno dei modi più efficaci di non lasciare che l’impulso scelga per te.' },
  { label: 'Lasciarle il suo spazio e occuparmi io della mia emozione', aware: true, feedback: 'Prenderti cura della tua emozione senza chiedere a lei di spegnerla è un atto di responsabilità e di fiducia.' },
  { label: 'Chiederle spiegazioni dettagliate', aware: false, feedback: 'Chiedere spiegazioni nasce dal bisogno di ridurre l’incertezza, ma rischia di trasformare un fatto normale in un interrogatorio. Chiediti se è ciò di cui hai bisogno davvero.' },
  { label: 'Verificare (telefono, social, posizione)', aware: false, feedback: 'La verifica dà un sollievo breve e rafforza il dubbio. Ed entra in uno spazio che è suo. È un impulso da riconoscere e, se puoi, da non eseguire.' },
  { label: 'Chiudermi o tenerle il broncio', aware: false, feedback: 'Il silenzio protegge te dall’esporti, ma lei sentirà la freddezza senza capirne il motivo. Spesso diventa una punizione involontaria.' },
];

/**
 * Laboratorio 1 — "Che cosa stai provando davvero?".
 * Guida a separare emozione in superficie, emozioni sottostanti, pensiero, impulso
 * e comportamento, con un feedback che dipende dalle scelte.
 */
export function WhatYouFeel() {
  const { dispatch } = useStore();
  const [step, setStep] = useState(0);
  const [situation, setSituation] = useState('');
  const [surface, setSurface] = useState<string[]>([]);
  const [deep, setDeep] = useState<string[]>([]);
  const [intensity, setIntensity] = useState(5);
  const [thought, setThought] = useState('');
  const [impulse, setImpulse] = useState<string[]>([]);
  const [behavior, setBehavior] = useState<number | null>(null);

  const surfaceWords = emotionFamilies.filter((f) => f.surface).flatMap((f) => f.words);
  const deepFamilies = emotionFamilies.filter((f) => !f.surface);
  const total = 6;
  const canNext = [situation.trim(), surface.length, true, thought.trim(), impulse.length, behavior !== null][step];

  const reset = () => {
    setStep(0);
    setSituation('');
    setSurface([]);
    setDeep([]);
    setIntensity(5);
    setThought('');
    setImpulse([]);
    setBehavior(null);
  };

  if (step === total) {
    const b = behavior !== null ? behaviors[behavior] : null;
    const deepFams = [...new Set(deep.map((w) => familyOfWord(w)?.name).filter(Boolean))];
    return (
      <div className="fade-in">
        <div className="card">
          <span className="eyebrow">La tua sequenza</span>
          <ol className="seq">
            <li><strong>Situazione</strong>{situation}</li>
            <li><strong>Emozione</strong>{[...surface, ...deep].join(', ')} · intensità {intensity}/10</li>
            <li><strong>Pensiero</strong>{thought}</li>
            <li><strong>Impulso</strong>{impulse.join(', ')}</li>
            <li><strong>Comportamento scelto</strong>{b?.label}</li>
          </ol>
        </div>
        <div className="feedback" style={{ marginTop: 16 }}>
          <h3 style={{ fontSize: '1.15rem' }}>Che cosa emerge</h3>
          {deep.length > 0 ? (
            <p>
              Sotto {surface.join(' e ')} hai riconosciuto anche {deep.join(', ')}
              {deepFams.length ? ` (${deepFams.join(', ').toLowerCase()})` : ''}. Spesso è questa parte, più vulnerabile, quella che vale la pena comunicare: è più facile
              per lei rispondere a una paura che a un’accusa.
            </p>
          ) : (
            <p>
              Hai indicato solo l’emozione in superficie. Prova a chiederti, la prossima volta: sotto {surface.join(' e ')} c’è anche paura, tristezza, insicurezza o
              vergogna? Non sempre c’è, ma spesso sì.
            </p>
          )}
          {intensity >= 8 && <p>Con un’intensità di {intensity}/10, la cosa più utile è non agire subito: prima una pausa, poi la decisione.</p>}
          <p>
            Il pensiero «{thought.trim()}» è una storia della mente: può essere vero, falso o parziale. Prima di agire, chiediti che cosa sai davvero.
          </p>
          {b && (
            <p style={{ marginBottom: 0 }}>
              <strong>{b.aware ? 'Il comportamento che hai scelto' : 'Sul comportamento che hai scelto'}:</strong> {b.feedback}
            </p>
          )}
        </div>
        <p className="small muted" style={{ marginTop: 12 }}>
          Emozione, pensiero, impulso e comportamento sono arrivati in sequenza: non erano automatici. Tra ognuno di essi c’era uno spazio in cui scegliere.
        </p>
        <div className="row">
          <button className="btn btn-secondary" onClick={reset}>
            <Icon name="refresh" /> Ricomincia
          </button>
          <SaveToJournal
            build={() => ({
              title: 'Che cosa stavo provando davvero',
              situation,
              emotions: [...surface, ...deep],
              intensity,
              interpretation: thought,
              impulse: impulse.join(', '),
              action: b?.label ?? '',
              lab: 'mondo-interiore',
            })}
            onSaved={reset}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="scene">
      <div className="row" style={{ marginBottom: 18 }}>
        <span className="small muted">
          Passo {step + 1} di {total}
        </span>
        <Bar value={(step + 1) / total} label="Avanzamento" />
      </div>
      <div className="fade-in" key={step}>
        {step === 0 && (
          <div className="field">
            <label htmlFor="wyf-sit" className="label big-label">Che cosa è successo?</label>
            <div className="chips" style={{ marginBottom: 10 }}>
              {situations.map((s) => (
                <button key={s} type="button" className="chip" aria-pressed={situation === s} onClick={() => setSituation(s)}>
                  {s}
                </button>
              ))}
            </div>
            <input id="wyf-sit" className="input" placeholder="Oppure descrivi la tua situazione" value={situation} onChange={(e) => setSituation(e.target.value)} />
          </div>
        )}
        {step === 1 && (
          <div className="field">
            <span className="label big-label">Che cosa senti per primo, in superficie?</span>
            <span className="help">Le emozioni che si vedono di più, spesso, sono gelosia e rabbia.</span>
            <ChipSelect options={surfaceWords} value={surface} onChange={setSurface} label="Emozioni in superficie" />
          </div>
        )}
        {step === 2 && (
          <div className="field">
            <span className="label big-label">E sotto? Che cosa c’è di più vulnerabile?</span>
            <span className="help">Scegli ciò che risuona. Puoi anche non scegliere nulla.</span>
            {deepFamilies.map((f) => (
              <div key={f.id} style={{ marginBottom: 14 }}>
                <div className="small" style={{ marginBottom: 6 }}>
                  <strong>{f.name}</strong> <span className="muted">— {f.signal}</span>
                </div>
                <ChipSelect options={f.words} value={deep} onChange={setDeep} label={f.name} />
              </div>
            ))}
            <span className="label" style={{ marginTop: 8 }}>Intensità complessiva</span>
            <Scale value={intensity} onChange={setIntensity} minLabel="lieve" maxLabel="travolgente" label="Intensità" />
          </div>
        )}
        {step === 3 && (
          <div className="field">
            <label htmlFor="wyf-thought" className="label big-label">Che cosa ti dici? Quale pensiero arriva?</label>
            <span className="help">Scrivilo così com’è, anche se a mente fredda ti sembra esagerato.</span>
            <textarea id="wyf-thought" className="textarea" placeholder="Es. “Quel collega le piace”" value={thought} onChange={(e) => setThought(e.target.value)} />
          </div>
        )}
        {step === 4 && (
          <div className="field">
            <span className="label big-label">Che cosa ti spinge a fare?</span>
            <span className="help">È un impulso: non l’hai ancora fatto.</span>
            <ChipSelect options={impulses} value={impulse} onChange={setImpulse} label="Impulsi" />
          </div>
        )}
        {step === 5 && (
          <div className="field">
            <span className="label big-label">Che cosa scegli di fare?</span>
            <div className="choice-list">
              {behaviors.map((b, i) => (
                <button key={b.label} type="button" className={`choice ${behavior === i ? 'picked' : ''}`} aria-pressed={behavior === i} onClick={() => setBehavior(i)}>
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="row" style={{ marginTop: 16 }}>
        <button className="btn btn-secondary" disabled={step === 0} onClick={() => setStep(step - 1)}>
          <Icon name="arrowLeft" /> Indietro
        </button>
        <span className="spacer" />
        <button
          className="btn"
          disabled={!canNext}
          onClick={() => {
            setStep(step + 1);
            if (step + 1 === total) dispatch({ type: 'useTool', tool: 'sentire' });
          }}
        >
          {step === total - 1 ? 'Vedi la sequenza' : 'Avanti'} <Icon name="arrowRight" />
        </button>
      </div>
    </div>
  );
}
