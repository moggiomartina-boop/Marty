import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { PageHead } from '../components/Layout';
import { useToast } from '../components/Toast';
import { ConfirmDialog, ListEditor } from '../components/ui';
import { useStore } from '../store/AppStore';
import { emptyPlan } from '../store/storage';
import type { AnswerValue, IfThen, PersonalPlan } from '../types';
import { exportPlan, planToMarkdown } from '../utils/export';
import { formatDate, formatDateTime, uid } from '../utils/format';

const asList = (v: AnswerValue | undefined): string[] => (Array.isArray(v) ? v : typeof v === 'string' && v.trim() ? [v.trim()] : []);

/** Suggerimenti ricavati dagli esercizi già completati: il piano si nutre del percorso. */
function useSuggestions() {
  const { data } = useStore();
  const ex = data.progress.exercises;
  const fromJournalAlternatives = data.journal.map((e) => e.alternative.trim()).filter((x) => x && x.length < 140);
  return {
    triggers: [...asList(ex['ciclo-personale']?.answers.innesco), ...asList(ex['confine']?.answers.situazione), ...asList(ex['vulnerabilita']?.answers.fattori)].slice(0, 8),
    signals: [...asList(ex['mappa-corpo']?.answers.segnali), ...asList(ex['mappa-corpo']?.answers.primo)],
    pauses: [
      ...asList(ex['mappa-corpo']?.answers.strategia),
      'respiro con espirazione lunga',
      'dire: “Ho bisogno di una pausa di 20 minuti, poi ne parliamo”',
      'uscire a camminare dieci minuti',
    ],
    repair: [...asList(ex['riparazione']?.answers['senza-ma']), ...fromJournalAlternatives].slice(0, 6),
    boundaries: [...asList(ex['confine']?.answers.confine)],
  };
}

export function PlanPage() {
  const { data, dispatch } = useStore();
  const toast = useToast();
  const [plan, setPlan] = useState<PersonalPlan>(data.plan);
  const [status, setStatus] = useState<'salvato' | 'modificato'>('salvato');
  const [confirmReset, setConfirmReset] = useState(false);
  const sug = useSuggestions();
  const timer = useRef<number>();
  const lastExternal = useRef(data.plan);

  // Allinea lo stato locale se il piano viene modificato altrove (es. dal costruttore di riparazioni o da un'altra scheda).
  useEffect(() => {
    if (data.plan !== lastExternal.current && status === 'salvato') setPlan(data.plan);
    lastExternal.current = data.plan;
  }, [data.plan, status]);

  // Salvataggio automatico con breve attesa.
  useEffect(() => {
    if (status !== 'modificato') return;
    timer.current = window.setTimeout(() => {
      dispatch({ type: 'savePlan', plan });
      setStatus('salvato');
    }, 600);
    return () => window.clearTimeout(timer.current);
  }, [plan, status, dispatch]);

  const update = <K extends keyof PersonalPlan>(k: K, v: PersonalPlan[K]) => {
    setPlan((p) => ({ ...p, [k]: v }));
    setStatus('modificato');
  };
  const updateIfThen = (id: string, patch: Partial<IfThen>) => update('ifThen', plan.ifThen.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(planToMarkdown(plan));
      toast('Piano copiato negli appunti');
    } catch {
      toast('Copia non disponibile in questo browser');
    }
  };

  const filledSections = [
    plan.motivation.trim(),
    plan.values.trim(),
    plan.triggers.length,
    plan.earlySignals.length,
    plan.pauseStrategies.length,
    plan.ifThen.some((x) => x.when.trim() && x.then.trim()),
    plan.repairPhrases.length,
    plan.boundaries.length,
    plan.support.trim(),
  ].filter(Boolean).length;

  return (
    <div className="container">
      <div className="no-print">
        <PageHead
          eyebrow="Documento personale · salvato su questo dispositivo"
          title="Il mio piano di cambiamento"
          lead="Le intuizioni diventano utili quando si traducono in intenzioni concrete. Compila le sezioni con parole tue: puoi tornare a modificarle quando vuoi."
        >
          <div className="row" style={{ marginTop: 18 }}>
            <button className="btn" onClick={() => window.print()}>
              <Icon name="print" /> Stampa o salva in PDF
            </button>
            <button className="btn btn-secondary" onClick={() => exportPlan(plan)}>
              <Icon name="download" /> Esporta (.md)
            </button>
            <button className="btn btn-secondary" onClick={copyText}>
              <Icon name="copy" /> Copia testo
            </button>
            <span className="small muted" aria-live="polite" style={{ marginLeft: 4 }}>
              {status === 'modificato' ? 'Salvataggio…' : plan.updatedAt ? `Salvato · ${formatDateTime(plan.updatedAt)}` : 'Non ancora compilato'}
            </span>
          </div>
          <p className="small muted" style={{ marginTop: 10 }}>
            {filledSections} sezioni su 9 compilate
          </p>
        </PageHead>

        <div className="grid" style={{ gap: 18 }}>
          <PlanCard n={1} title="Perché voglio cambiare" hint="Che cosa ti sta a cuore? Che cosa vorresti fosse diverso nelle tue relazioni?">
            <textarea className="textarea" aria-label="Perché voglio cambiare" value={plan.motivation} onChange={(e) => update('motivation', e.target.value)} />
          </PlanCard>
          <PlanCard n={2} title="I valori che voglio proteggere" hint="Per esempio: rispetto, vicinanza, onestà, calma, presenza per i miei figli.">
            <textarea className="textarea" aria-label="Valori" value={plan.values} onChange={(e) => update('values', e.target.value)} />
          </PlanCard>
          <PlanCard n={3} title="Le situazioni che mi attivano" hint="Inneschi ricorrenti: persone, momenti, temi, condizioni (stanchezza, fame…).">
            <ListEditor label="Situazioni che mi attivano" items={plan.triggers} onChange={(v) => update('triggers', v)} placeholder="Es. quando mi sento interrotto/a" suggestions={sug.triggers} />
          </PlanCard>
          <PlanCard n={4} title="I miei segnali precoci" hint="Ciò che nel corpo e nella mente annuncia che sto per reagire.">
            <ListEditor label="Segnali precoci" items={plan.earlySignals} onChange={(v) => update('earlySignals', v)} placeholder="Es. mascella serrata" suggestions={sug.signals} />
          </PlanCard>
          <PlanCard n={5} title="Come mi fermo" hint="Le strategie di pausa che funzionano per te. Ricorda: una pausa ha una durata e un ritorno.">
            <ListEditor label="Strategie di pausa" items={plan.pauseStrategies} onChange={(v) => update('pauseStrategies', v)} placeholder="Es. esco a camminare 10 minuti" suggestions={sug.pauses} />
          </PlanCard>
          <PlanCard
            n={6}
            title="Se… allora…"
            hint="Le intenzioni di implementazione collegano una situazione precisa a una risposta scelta in anticipo. La ricerca suggerisce che aumentino la probabilità di agire come si intende."
          >
            {plan.ifThen.map((x, i) => (
              <div key={x.id} className="split" style={{ alignItems: 'end', marginBottom: 12, gridTemplateColumns: undefined }}>
                <div className="field" style={{ marginBottom: 0 }}>
                  <label htmlFor={`if-${x.id}`}>Se…</label>
                  <input id={`if-${x.id}`} className="input" placeholder="mi accorgo che sto alzando la voce" value={x.when} onChange={(e) => updateIfThen(x.id, { when: e.target.value })} />
                </div>
                <div className="field" style={{ marginBottom: 0 }}>
                  <label htmlFor={`then-${x.id}`}>…allora</label>
                  <div className="row" style={{ flexWrap: 'nowrap' }}>
                    <input id={`then-${x.id}`} className="input" placeholder="dico che ho bisogno di 10 minuti e esco" value={x.then} onChange={(e) => updateIfThen(x.id, { then: e.target.value })} />
                    <button className="btn btn-ghost icon-btn" aria-label={`Rimuovi intenzione ${i + 1}`} onClick={() => update('ifThen', plan.ifThen.filter((y) => y.id !== x.id))}>
                      <Icon name="close" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button className="btn btn-secondary btn-sm" onClick={() => update('ifThen', [...plan.ifThen, { id: uid(), when: '', then: '' }])}>
              <Icon name="plus" /> Aggiungi un “se… allora…”
            </button>
          </PlanCard>
          <PlanCard n={7} title="Frasi per riparare" hint="Parole pronte per quando ho ferito qualcuno. Puoi costruirle con lo strumento del laboratorio 8.">
            <ListEditor label="Frasi per riparare" items={plan.repairPhrases} onChange={(v) => update('repairPhrases', v)} placeholder="Es. Ho alzato la voce e mi dispiace." suggestions={sug.repair} />
            <Link to="/strumenti/riparazione" className="small">
              Apri il costruttore di riparazioni →
            </Link>
          </PlanCard>
          <PlanCard n={8} title="I miei confini" hint="Ciò che farò io per proteggere ciò che conta. “Se…, allora io…”.">
            <ListEditor label="Confini" items={plan.boundaries} onChange={(v) => update('boundaries', v)} placeholder="Es. Se ci sono insulti, interrompo la conversazione" suggestions={sug.boundaries} />
          </PlanCard>
          <PlanCard n={9} title="Il mio sostegno" hint="Persone, luoghi, professionisti a cui posso rivolgermi.">
            <textarea className="textarea" aria-label="Il mio sostegno" value={plan.support} onChange={(e) => update('support', e.target.value)} />
          </PlanCard>
          <div className="card">
            <div className="field" style={{ marginBottom: 0 }}>
              <label htmlFor="review">Quando voglio rivedere il piano?</label>
              <input id="review" type="date" className="input" style={{ maxWidth: 220 }} value={plan.reviewDate} onChange={(e) => update('reviewDate', e.target.value)} />
            </div>
          </div>
        </div>

        <div className="row" style={{ marginTop: 28 }}>
          <button className="btn btn-danger" onClick={() => setConfirmReset(true)}>
            <Icon name="trash" /> Svuota il piano
          </button>
        </div>
      </div>

      <PrintablePlan plan={plan} />

      <ConfirmDialog
        open={confirmReset}
        title="Svuotare il piano?"
        confirmLabel="Svuota"
        danger
        onCancel={() => setConfirmReset(false)}
        onConfirm={() => {
          window.clearTimeout(timer.current);
          dispatch({ type: 'resetPlan' });
          setPlan(emptyPlan());
          setStatus('salvato');
          setConfirmReset(false);
          toast('Piano svuotato');
        }}
      >
        Tutte le sezioni verranno cancellate. Se vuoi conservarne una copia, esportalo prima.
      </ConfirmDialog>
    </div>
  );
}

function PlanCard({ n, title, hint, children }: { n: number; title: string; hint: string; children: ReactNode }) {
  return (
    <section className="card" aria-labelledby={`plan-${n}`}>
      <div className="row" style={{ alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
        <span style={{ fontFamily: 'var(--serif)', color: 'var(--terra-500)', fontSize: '1.3rem' }}>{n}</span>
        <h2 id={`plan-${n}`} style={{ fontSize: '1.25rem', margin: 0 }}>
          {title}
        </h2>
      </div>
      <p className="small muted">{hint}</p>
      {children}
    </section>
  );
}

/** Versione impaginata per la stampa (visibile solo in stampa). */
function PrintablePlan({ plan }: { plan: PersonalPlan }) {
  const L = ({ items }: { items: string[] }) => (items.length ? <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul> : <p className="muted">—</p>);
  return (
    <div className="print-only" aria-hidden="true">
      <p style={{ fontSize: '9pt', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Oltre la reazione — documento personale</p>
      <h1>Il mio piano di cambiamento</h1>
      {plan.updatedAt && <p>Aggiornato il {formatDate(plan.updatedAt)}</p>}
      <h2>Perché voglio cambiare</h2>
      <p style={{ whiteSpace: 'pre-wrap' }}>{plan.motivation || '—'}</p>
      <h2>I valori che voglio proteggere</h2>
      <p style={{ whiteSpace: 'pre-wrap' }}>{plan.values || '—'}</p>
      <h2>Le situazioni che mi attivano</h2>
      <L items={plan.triggers} />
      <h2>I miei segnali precoci</h2>
      <L items={plan.earlySignals} />
      <h2>Come mi fermo</h2>
      <L items={plan.pauseStrategies} />
      <h2>Se… allora…</h2>
      {plan.ifThen.filter((x) => x.when || x.then).length ? (
        <ul>
          {plan.ifThen
            .filter((x) => x.when || x.then)
            .map((x) => (
              <li key={x.id}>
                <strong>Se</strong> {x.when} <strong>allora</strong> {x.then}
              </li>
            ))}
        </ul>
      ) : (
        <p>—</p>
      )}
      <h2>Frasi per riparare</h2>
      <L items={plan.repairPhrases} />
      <h2>I miei confini</h2>
      <L items={plan.boundaries} />
      <h2>Il mio sostegno</h2>
      <p style={{ whiteSpace: 'pre-wrap' }}>{plan.support || '—'}</p>
      {plan.reviewDate && (
        <p>
          <strong>Da rivedere il:</strong> {formatDate(plan.reviewDate)}
        </p>
      )}
      <p style={{ fontSize: '8pt', marginTop: '24pt' }}>
        Questo piano è uno strumento di auto-osservazione e non sostituisce un percorso con un professionista. In caso di pericolo: 112 · Antiviolenza e
        stalking: 1522.
      </p>
    </div>
  );
}
