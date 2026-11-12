import { useState } from 'react';
import { emotionFamilies } from '../content/emotions';
import { useStore } from '../store/AppStore';
import { SaveToJournal } from './SaveToJournal';
import { Scale } from '../components/ui';

/** Esplora il vocabolario emotivo per famiglie e componi lo "stato" del momento. */
export function EmotionExplorer() {
  const { dispatch } = useStore();
  const [fam, setFam] = useState(emotionFamilies[0].id);
  const [picked, setPicked] = useState<string[]>([]);
  const [intensity, setIntensity] = useState(5);
  const [note, setNote] = useState('');
  const family = emotionFamilies.find((f) => f.id === fam)!;

  const toggle = (w: string) => {
    setPicked((p) => (p.includes(w) ? p.filter((x) => x !== w) : [...p, w]));
    dispatch({ type: 'useTool', tool: 'emozioni' });
  };

  return (
    <div>
      <div className="chips" role="tablist" aria-label="Famiglie di emozioni" style={{ marginBottom: 18 }}>
        {emotionFamilies.map((f) => (
          <button key={f.id} role="tab" className="chip" aria-selected={fam === f.id} aria-pressed={fam === f.id} onClick={() => setFam(f.id)}>
            {f.name}
          </button>
        ))}
      </div>
      <div className="grid grid-2">
        <div className="card fade-in" key={fam}>
          <h3>{family.name}</h3>
          <p>
            <strong>Spesso segnala:</strong> {family.signal}
          </p>
          <p>
            <strong>Impulso tipico:</strong> {family.urge}
          </p>
          <span className="label" style={{ fontWeight: 600, fontSize: '0.9rem' }}>
            Sfumature — tocca quelle che riconosci
          </span>
          <div className="chips" style={{ marginTop: 10 }}>
            {family.words.map((w) => (
              <button key={w} className="chip" aria-pressed={picked.includes(w)} onClick={() => toggle(w)}>
                {w}
              </button>
            ))}
          </div>
        </div>
        <div className="card card-quiet">
          <h3>Ciò che sento adesso</h3>
          {picked.length === 0 ? (
            <p className="muted">Nessuna emozione selezionata. Esplora le famiglie e scegli le parole più precise: anche emozioni opposte possono convivere.</p>
          ) : (
            <div className="chips" style={{ marginBottom: 16 }}>
              {picked.map((w) => (
                <button key={w} className="chip" aria-pressed="true" onClick={() => toggle(w)} aria-label={`Rimuovi ${w}`}>
                  {w} ×
                </button>
              ))}
            </div>
          )}
          <div className="field">
            <span className="label">Intensità complessiva</span>
            <Scale value={intensity} onChange={setIntensity} minLabel="lieve" maxLabel="travolgente" label="Intensità" />
          </div>
          <div className="field">
            <label htmlFor="ee-note">A che cosa si riferiscono? (facoltativo)</label>
            <textarea id="ee-note" className="textarea" style={{ minHeight: 70 }} value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
          <SaveToJournal
            disabled={picked.length === 0}
            build={() => ({ title: 'Dare un nome a ciò che provo', emotions: picked, intensity, situation: note, lab: 'emozioni' })}
            onSaved={() => {
              setPicked([]);
              setNote('');
              setIntensity(5);
            }}
          />
        </div>
      </div>
    </div>
  );
}
