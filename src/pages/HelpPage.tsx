import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHead } from '../components/Layout';
import { helpClosing, helpReasons, therapyNote } from '../content/help';
import { useStore } from '../store/AppStore';

const fields = [
  { key: 'why', label: 'Perché è importante' },
  { key: 'daily', label: 'Come può manifestarsi nella quotidianità' },
  { key: 'consequences', label: 'Quali conseguenze può avere' },
  { key: 'learn', label: 'Che cosa puoi imparare a fare diversamente' },
  { key: 'psychologist', label: 'Come uno psicologo può aiutarti' },
] as const;

/** Modulo speciale: 15 motivi per iniziare un percorso psicologico. */
export function HelpPage() {
  const { data, dispatch } = useStore();
  const [open, setOpen] = useState<string | null>(null);
  const opened = data.progress.helpOpened;

  return (
    <div className="container read">
      <PageHead
        eyebrow="Modulo speciale · 15 motivi per iniziare un percorso psicologico"
        title="Potrebbe essere il momento di chiedere aiuto?"
        lead="Alcune cose si possono capire da soli. Altre hanno bisogno di uno spazio, di tempo e di una persona competente. Leggi i punti che senti vicini: non devi riconoscerti in tutti."
      />
      <p className="small muted">{opened.length} di 15 punti aperti</p>
      <div className="accordion">
        {helpReasons.map((r, i) => {
          const isOpen = open === r.id;
          return (
            <section key={r.id} className={`acc-item ${isOpen ? 'open' : ''}`}>
              <h2 className="acc-head">
                <button
                  aria-expanded={isOpen}
                  aria-controls={`help-${r.id}`}
                  onClick={() => {
                    setOpen(isOpen ? null : r.id);
                    if (!isOpen) dispatch({ type: 'helpOpened', id: r.id });
                  }}
                >
                  <span className="acc-num">{i + 1}</span>
                  <span className="acc-title">{r.title}</span>
                  {opened.includes(r.id) && !isOpen && <span className="tag tag-sage tag-done">letto</span>}
                  <span className="acc-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
              </h2>
              {isOpen && (
                <div id={`help-${r.id}`} className="acc-body fade-in">
                  <dl className="concept">
                    {fields.map((f) => (
                      <div key={f.key}>
                        <dt>{f.label}</dt>
                        <dd>{r[f.key]}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </section>
          );
        })}
      </div>

      <section className="closing-message" aria-label="Messaggio conclusivo">
        {helpClosing.map((p) => (
          <p key={p.slice(0, 20)}>{p}</p>
        ))}
      </section>

      <section className="card" style={{ marginTop: 28 }} aria-labelledby="h-terapia">
        <h2 id="h-terapia" style={{ fontSize: '1.4rem' }}>
          Che cos’è, e che cosa non è, la psicoterapia
        </h2>
        {therapyNote.map((p) => (
          <p key={p.slice(0, 20)}>{p}</p>
        ))}
        <div className="row">
          <Link to="/sicurezza" className="btn btn-secondary">
            Sicurezza e contatti
          </Link>
          <Link to="/piano" className="btn btn-secondary">
            Aggiungi il supporto al tuo piano
          </Link>
        </div>
      </section>
    </div>
  );
}
