import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PageHead } from '../components/Layout';
import { EvidenceBadge } from '../components/ui';
import { sourceKindLabel, sources, type SourceKind } from '../content/bibliography';
import { labs } from '../content/labs';

export function BibliographyPage() {
  const { hash } = useLocation();
  const [kind, setKind] = useState<SourceKind | 'tutte'>('tutte');
  // HashRouter: l'ancora della fonte arriva come seconda parte dell'hash (#/bibliografia#id).
  const anchor = hash.replace('#', '') || window.location.hash.split('#')[2];
  useEffect(() => {
    if (!anchor) return;
    const el = document.getElementById(anchor);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
  }, [anchor]);
  const list = [...sources].filter((s) => kind === 'tutte' || s.kind === kind).sort((a, b) => a.authors.localeCompare(b.authors));

  return (
    <div className="container">
      <PageHead
        eyebrow="Fonti e criteri"
        title="Bibliografia"
        lead="Le opere su cui si basano i contenuti del percorso. Distinguiamo ricerca empirica, modelli teorici, testi clinici e divulgazione, perché non hanno lo stesso peso."
      />
      <div className="card card-quiet read" style={{ marginBottom: 28 }}>
        <h3>Come leggere i contenuti</h3>
        <p className="small">Nei laboratori ogni affermazione rilevante è accompagnata da un’etichetta:</p>
        <div className="row" style={{ marginBottom: 12 }}>
          <EvidenceBadge kind="evidenza" />
          <EvidenceBadge kind="modello" />
          <EvidenceBadge kind="ipotesi" />
          <EvidenceBadge kind="pratica" />
        </div>
        <p className="small" style={{ margin: 0 }}>
          Le evidenze empiriche citate provengono spesso da campioni specifici e da contesti di laboratorio; i modelli teorici sono cornici utili,
          non verità dimostrate; le ipotesi interpretative sono domande da verificare su di sé. Nessun contenuto ha valore diagnostico.
        </p>
      </div>

      <div className="chips" role="radiogroup" aria-label="Filtra per tipo" style={{ marginBottom: 20 }}>
        {(['tutte', 'ricerca', 'teoria', 'clinica', 'divulgazione'] as const).map((k) => (
          <button key={k} className="chip" role="radio" aria-checked={kind === k} onClick={() => setKind(k)}>
            {k === 'tutte' ? 'Tutte' : sourceKindLabel[k]}
          </button>
        ))}
      </div>

      <ol style={{ listStyle: 'none', padding: 0 }} className="read">
        {list.map((s) => {
          const usedIn = labs.filter((l) => l.sources.includes(s.id));
          return (
            <li key={s.id} id={s.id} className="card" style={{ marginBottom: 12, outline: anchor === s.id ? '2px solid var(--terra-500)' : undefined }}>
              <div className="row" style={{ marginBottom: 6 }}>
                <span className="tag">{sourceKindLabel[s.kind]}</span>
              </div>
              <p style={{ margin: '0 0 8px' }}>
                {s.authors} ({s.year}). <em>{s.title}</em>. {s.publication}.
              </p>
              <p className="small muted" style={{ margin: 0 }}>
                {s.note}
              </p>
              {usedIn.length > 0 && (
                <p className="small" style={{ margin: '8px 0 0' }}>
                  Citata in: {usedIn.map((l) => `Lab ${l.number}`).join(', ')}
                </p>
              )}
            </li>
          );
        })}
      </ol>
      <p className="small muted read">
        I riferimenti sono riportati senza identificativi digitali per evitare errori di trascrizione: per consultarli cerca autori e titolo in un
        catalogo bibliotecario o in un motore di ricerca accademico.
      </p>
    </div>
  );
}
