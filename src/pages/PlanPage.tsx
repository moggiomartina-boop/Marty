import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { PageHead } from '../components/Layout';
import { useToast } from '../components/Toast';
import { ConfirmDialog, ListEditor } from '../components/ui';
import { allEmotionWords } from '../content/emotions';
import { useStore } from '../store/AppStore';
import { emptyPlan } from '../store/storage';
import type { AnswerValue, IfThen, PersonalPlan } from '../types';
import { exportPlan, planToMarkdown } from '../utils/export';
import { formatDate, formatDateTime, uid } from '../utils/format';
import { checkObservable } from '../utils/observable';

const asList = (v: AnswerValue | undefined): string[] => (Array.isArray(v) ? v : typeof v === 'string' && v.trim() ? [v.trim()] : []);

/** Suggerimenti ricavati dagli esercizi già completati: il piano si nutre del percorso. */
function useSuggestions() {
  const { data } = useStore();
  const ex = data.progress.exercises;
  const fromJournal = (k: 'interpretation' | 'impulse') => data.journal.map((e) => e[k].trim()).filter((x) => x && x.length < 120);
  return {
    triggers: [...asList(ex['mappa-minaccia']?.answers.situazioni), ...asList(ex['mappa-escalation']?.answers.innesco)].slice(0, 10),
    emotions: [...new Set([...asList(ex['mappa-minaccia']?.answers.emozione), ...data.journal.flatMap((e) => e.emotions)])].slice(0, 10),
    thoughts: [...asList(ex['mappa-minaccia']?.answers.pensiero), ...asList(ex['tk-pensieri']?.answers.pensiero), ...fromJournal('interpretation')].slice(0, 6),
    measures: [
      'ogni domenica annoto quante volte ho chiesto conferme',
      'segno nel diario ogni volta che resisto all’impulso di verificare',
      'conto le discussioni interrotte con la pausa invece che con l’escalation',
    ],
  };
}

function ObservableHint({ text }: { text: string }) {
  const c = checkObservable(text);
  if (c.level === 'vuoto') return null;
  const label = { generico: 'Promessa generica', parziale: 'In parte osservabile', osservabile: 'Cambiamento osservabile' }[c.level];
  return (
    <div className={`obs obs-${c.level}`} role="status">
      <strong>{label}.</strong> {c.hints.join(' ')}
    </div>
  );
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

  // Allinea lo stato locale se il piano viene modificato altrove (es. un'altra scheda).
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

  const filled = [plan.behavior.trim(), plan.triggers.length, plan.emotions.length, plan.thoughts.length, plan.alternative.trim(), plan.partnerLimit.trim(), plan.measures.length, plan.relapse.trim()].filter(Boolean).length;

  return (
    <div className="container">
      <div className="no-print">
        <PageHead
          eyebrow="Laboratorio 9 · Documento personale, salvato solo su questo dispositivo"
          title="Il mio piano di cambiamento"
          lead="Dalle parole ai comportamenti. Scrivi con parole tue che cosa vuoi interrompere, che cosa farai al suo posto e come te ne accorgerai. Il piano è per te: non serve mostrarlo a nessuno."
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
            {filled} campi su 8 compilati · <Link to="/laboratori/comportamenti?tab=strumenti">Allenati a distinguere promesse e comportamenti</Link>
          </p>
        </PageHead>

        <div className="grid" style={{ gap: 18 }}>
          <PlanCard n={1} title="Il comportamento che voglio interrompere" hint="Descrivilo come lo vedrebbe una videocamera, senza addolcirlo. Per esempio: “Controllo il suo ultimo accesso più volte al giorno”.">
            <textarea className="textarea" aria-label="Il comportamento che voglio interrompere" value={plan.behavior} onChange={(e) => update('behavior', e.target.value)} />
          </PlanCard>
          <PlanCard n={2} title="Le situazioni che lo attivano" hint="Quando succede? Con chi? In quali condizioni (stanchezza, alcol, sera…)?">
            <ListEditor label="Situazioni che lo attivano" items={plan.triggers} onChange={(v) => update('triggers', v)} placeholder="Es. quando esce con le amiche" suggestions={sug.triggers} />
          </PlanCard>
          <PlanCard n={3} title="Le emozioni che provo" hint="Quelle in superficie e quelle sotto.">
            <ListEditor label="Emozioni" items={plan.emotions} onChange={(v) => update('emotions', v)} placeholder="Es. paura di essere lasciato" suggestions={sug.emotions.length ? sug.emotions : allEmotionWords.slice(0, 8)} />
          </PlanCard>
          <PlanCard n={4} title="I pensieri che lo precedono" hint="Le storie che la mente racconta appena prima del comportamento.">
            <ListEditor label="Pensieri" items={plan.thoughts} onChange={(v) => update('thoughts', v)} placeholder="Es. “Se non risponde, è con qualcuno”" suggestions={sug.thoughts} />
          </PlanCard>
          <PlanCard n={5} title="La risposta alternativa che voglio sperimentare" hint="Che cosa farai, in quale situazione, e come te ne accorgerai. Il riquadro sotto ti segnala se la formulazione è ancora una promessa generica.">
            <textarea
              className="textarea"
              aria-label="La risposta alternativa"
              placeholder="Es. Quando non risponde per più di un’ora, non le scriverò di nuovo: aspetterò e farò il grounding. Lo annoterò nel diario la sera."
              value={plan.alternative}
              onChange={(e) => update('alternative', e.target.value)}
            />
            <ObservableHint text={plan.alternative} />
          </PlanCard>
          <PlanCard n={6} title="Il limite dell’altra persona che devo rispettare" hint="Che cosa ti ha chiesto lei, o che cosa riconosci come suo diritto, anche se ti costa?">
            <textarea className="textarea" aria-label="Il limite dell’altra persona" placeholder="Es. Il suo telefono è suo. Il suo tempo con le amiche è suo." value={plan.partnerLimit} onChange={(e) => update('partnerLimit', e.target.value)} />
          </PlanCard>
          <PlanCard n={7} title="Come misurerò concretamente i progressi" hint="Indicatori osservabili, non sensazioni. Che cosa conterai o annoterai?">
            <ListEditor label="Misure dei progressi" items={plan.measures} onChange={(v) => update('measures', v)} placeholder="Es. quante volte a settimana chiedo conferme" suggestions={sug.measures} />
          </PlanCard>
          <PlanCard n={8} title="Che cosa farò se ricadrò nel comportamento precedente" hint="Una ricaduta va riconosciuta, non nascosta. Come la riparerai? Che cosa cambierai nel piano? A chi chiederai aiuto?">
            <textarea className="textarea" aria-label="Che cosa farò se ricadrò" value={plan.relapse} onChange={(e) => update('relapse', e.target.value)} />
            <ObservableHint text={plan.relapse} />
          </PlanCard>
          <PlanCard
            n={9}
            title="Se… allora…"
            hint="Facoltativo. Collegare una situazione precisa a una risposta scelta in anticipo aumenta, secondo la ricerca, la probabilità di metterla in atto."
          >
            {plan.ifThen.map((x, i) => (
              <div key={x.id} className="split" style={{ alignItems: 'end', marginBottom: 12 }}>
                <div className="field" style={{ marginBottom: 0 }}>
                  <label htmlFor={`if-${x.id}`}>Se…</label>
                  <input id={`if-${x.id}`} className="input" placeholder="sento la gelosia salire mentre è fuori" value={x.when} onChange={(e) => updateIfThen(x.id, { when: e.target.value })} />
                </div>
                <div className="field" style={{ marginBottom: 0 }}>
                  <label htmlFor={`then-${x.id}`}>…allora</label>
                  <div className="row" style={{ flexWrap: 'nowrap' }}>
                    <input id={`then-${x.id}`} className="input" placeholder="metto il telefono in un’altra stanza per 30 minuti" value={x.then} onChange={(e) => updateIfThen(x.id, { then: e.target.value })} />
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
          <PlanCard n={10} title="Il mio supporto" hint="Facoltativo. Professionisti, servizi, persone di fiducia a cui puoi rivolgerti.">
            <textarea className="textarea" aria-label="Il mio supporto" value={plan.support} onChange={(e) => update('support', e.target.value)} />
            <Link to="/aiuto" className="small">
              Potrebbe essere il momento di chiedere aiuto? →
            </Link>
          </PlanCard>
          <div className="card">
            <div className="field" style={{ marginBottom: 0 }}>
              <label htmlFor="review">Quando voglio rivedere il piano?</label>
              <input id="review" type="date" className="input" style={{ maxWidth: 220 }} value={plan.reviewDate} onChange={(e) => update('reviewDate', e.target.value)} />
            </div>
          </div>
        </div>

        <div className="note" style={{ marginTop: 20 }}>
          Questo piano è tuo. Non serve a dimostrare a lei che stai cambiando, né a chiederle qualcosa in cambio: i cambiamenti, se ci sono, si vedranno nei comportamenti.
        </div>

        <div className="row" style={{ marginTop: 20 }}>
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
        Tutti i campi verranno cancellati. Se vuoi conservarne una copia, esportalo prima.
      </ConfirmDialog>
    </div>
  );
}

function PlanCard({ n, title, hint, children }: { n: number; title: string; hint: string; children: ReactNode }) {
  return (
    <section className="card" aria-labelledby={`plan-${n}`}>
      <div className="row" style={{ alignItems: 'baseline', gap: 10, marginBottom: 4, flexWrap: 'nowrap' }}>
        <span style={{ fontFamily: 'var(--serif)', color: 'var(--terra-700)', fontSize: '1.3rem' }}>{n}</span>
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
  const L = ({ items }: { items: string[] }) => (items.length ? <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul> : <p>—</p>);
  const P = ({ t }: { t: string }) => <p style={{ whiteSpace: 'pre-wrap' }}>{t || '—'}</p>;
  const ifThen = plan.ifThen.filter((x) => x.when || x.then);
  return (
    <div className="print-only" aria-hidden="true">
      <p style={{ fontSize: '9pt', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Oltre la reazione — documento personale</p>
      <h1>Il mio piano di cambiamento</h1>
      {plan.updatedAt && <p>Aggiornato il {formatDate(plan.updatedAt)}</p>}
      <h2>Il comportamento che voglio interrompere</h2>
      <P t={plan.behavior} />
      <h2>Le situazioni che lo attivano</h2>
      <L items={plan.triggers} />
      <h2>Le emozioni che provo</h2>
      <L items={plan.emotions} />
      <h2>I pensieri che lo precedono</h2>
      <L items={plan.thoughts} />
      <h2>La risposta alternativa che voglio sperimentare</h2>
      <P t={plan.alternative} />
      <h2>Il limite dell’altra persona che devo rispettare</h2>
      <P t={plan.partnerLimit} />
      <h2>Come misurerò concretamente i progressi</h2>
      <L items={plan.measures} />
      <h2>Che cosa farò se ricadrò</h2>
      <P t={plan.relapse} />
      {ifThen.length > 0 && (
        <>
          <h2>Se… allora…</h2>
          <ul>
            {ifThen.map((x) => (
              <li key={x.id}>
                <strong>Se</strong> {x.when} <strong>allora</strong> {x.then}
              </li>
            ))}
          </ul>
        </>
      )}
      {plan.support && (
        <>
          <h2>Il mio supporto</h2>
          <P t={plan.support} />
        </>
      )}
      {plan.reviewDate && (
        <p>
          <strong>Da rivedere il:</strong> {formatDate(plan.reviewDate)}
        </p>
      )}
      <p style={{ fontSize: '8pt', marginTop: '24pt' }}>
        Questo piano è uno strumento di auto-osservazione e non sostituisce un percorso con un professionista. In caso di pericolo immediato: 112.
      </p>
    </div>
  );
}
