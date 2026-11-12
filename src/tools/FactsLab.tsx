import { useMemo, useState } from 'react';
import { factItems } from '../content/factsQuiz';
import { useStore } from '../store/AppStore';
import { Icon } from '../components/Icon';
import { SaveToJournal } from './SaveToJournal';

type Answer = 'fatto' | 'interpretazione';

/** Laboratorio fatti e interpretazioni: classificazione + riformulazione personale. */
export function FactsLab() {
  const { data, dispatch } = useStore();
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [own, setOwn] = useState({ interp: '', fact: '', alt1: '', alt2: '' });
  const answered = Object.keys(answers).length;
  const correct = useMemo(() => factItems.filter((f) => answers[f.id] === f.answer).length, [answers]);
  const finished = answered === factItems.length;

  const answer = (id: string, a: Answer) => {
    if (answers[id]) return;
    const next = { ...answers, [id]: a };
    setAnswers(next);
    if (Object.keys(next).length === factItems.length) {
      const c = factItems.filter((f) => next[f.id] === f.answer).length;
      dispatch({ type: 'factsResult', result: { correct: c, total: factItems.length, completedAt: new Date().toISOString() } });
      dispatch({ type: 'useTool', tool: 'fatti' });
    }
  };

  return (
    <div>
      <section>
        <h3>1. Fatto o interpretazione?</h3>
        <p className="muted">
          Per ogni frase, scegli. Un fatto è ciò che una videocamera potrebbe registrare.{' '}
          {data.progress.facts && `L’ultima volta hai riconosciuto ${data.progress.facts.correct} frasi su ${data.progress.facts.total}.`}
        </p>
        <div className="grid grid-2">
          {factItems.map((f) => {
            const a = answers[f.id];
            const ok = a === f.answer;
            return (
              <div key={f.id} className="card quiz-item">
                <p style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', margin: '0 0 12px' }}>“{f.text}”</p>
                <div className="row">
                  {(['fatto', 'interpretazione'] as Answer[]).map((opt) => (
                    <button key={opt} className="chip" aria-pressed={a === opt} disabled={!!a} onClick={() => answer(f.id, opt)}>
                      {opt === 'fatto' ? 'Fatto' : 'Interpretazione'}
                    </button>
                  ))}
                </div>
                {a && (
                  <div className="verdict fade-in" role="status">
                    <strong className={ok ? 'ok' : 'ko'}>{ok ? 'Esatto.' : `Più probabilmente: ${f.answer}.`}</strong> {f.explanation}
                    {f.reformulation && (
                      <div className="muted small" style={{ marginTop: 6 }}>
                        Versione “fatto”: <em>{f.reformulation}</em>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="row" style={{ marginTop: 16 }}>
          <span className="muted small">
            {answered}/{factItems.length} risposte {finished && `· ${correct} in linea con la distinzione proposta`}
          </span>
          <span className="spacer" />
          {answered > 0 && (
            <button className="btn btn-ghost btn-sm" onClick={() => setAnswers({})}>
              <Icon name="refresh" /> Ricomincia
            </button>
          )}
        </div>
        {finished && (
          <div className="note fade-in" style={{ marginTop: 12 }}>
            Il confine non è sempre netto: anche “è arrabbiato” sembra un fatto, ma è un’inferenza. L’obiettivo non è un punteggio, ma accorgersi
            di quanto spesso aggiungiamo significato a ciò che osserviamo.
          </div>
        )}
      </section>

      <hr className="divider" />

      <section>
        <h3>2. Ora tocca a te</h3>
        <p className="muted">Prendi un’interpretazione che ti sei detto/a di recente e riportala ai fatti.</p>
        <div className="split">
          <div className="field">
            <label htmlFor="fl-interp">Che cosa mi sono detto/a (interpretazione)</label>
            <textarea id="fl-interp" className="textarea" placeholder="Es. “Non le importa di quello che faccio.”" value={own.interp} onChange={(e) => setOwn({ ...own, interp: e.target.value })} />
          </div>
          <div className="field">
            <label htmlFor="fl-fact">Che cosa è successo, solo i fatti</label>
            <textarea id="fl-fact" className="textarea" placeholder="Es. “Ieri non ha commentato il progetto che le ho mostrato.”" value={own.fact} onChange={(e) => setOwn({ ...own, fact: e.target.value })} />
          </div>
          <div className="field">
            <label htmlFor="fl-a1">Un’altra spiegazione possibile</label>
            <textarea id="fl-a1" className="textarea" value={own.alt1} onChange={(e) => setOwn({ ...own, alt1: e.target.value })} />
          </div>
          <div className="field">
            <label htmlFor="fl-a2">E un’altra ancora</label>
            <textarea id="fl-a2" className="textarea" value={own.alt2} onChange={(e) => setOwn({ ...own, alt2: e.target.value })} />
          </div>
        </div>
        <SaveToJournal
          disabled={!own.interp.trim() || !own.fact.trim()}
          build={() => ({
            title: 'Fatti e interpretazioni',
            situation: own.fact,
            facts: own.fact,
            interpretation: own.interp,
            alternative: [own.alt1, own.alt2].filter((x) => x.trim()).join('\n'),
            lab: 'fatti',
          })}
          onSaved={() => {
            dispatch({ type: 'useTool', tool: 'fatti' });
            setOwn({ interp: '', fact: '', alt1: '', alt2: '' });
          }}
        />
      </section>
    </div>
  );
}
