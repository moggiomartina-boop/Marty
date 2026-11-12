import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { useToast } from '../components/Toast';
import { useStore } from '../store/AppStore';

export const safetyQuestions = [
  'Negli ultimi mesi, durante una discussione, ti è capitato di afferrare, spingere o trattenere fisicamente la tua partner?',
  'Ti è capitato di bloccare una porta, toglierle le chiavi o impedirle in altro modo di allontanarsi?',
  'Ti è capitato di simulare un colpo, colpire oggetti vicino a lei o usare la tua presenza fisica per intimidirla?',
  'Ti è capitato di seguirla mentre cercava di interrompere il conflitto, o di inviarle messaggi minacciosi?',
  'Temi di poter perdere il controllo fisicamente durante una lite?',
  'Hai l’impressione che lei abbia paura di te?',
];

export const protocolSteps = [
  { title: 'Interrompere la discussione', why: 'Appena noti i segnali, ti fermi con una frase breve. Fermarsi presto costa poco; tardi è molto più difficile.' },
  { title: 'Allontanarti fisicamente', why: 'Sei tu che ti allontani: un’altra stanza, il balcone, una camminata. Non è lei che deve andarsene per essere al sicuro.' },
  { title: 'Non seguire né bloccare l’altra persona', why: 'Se lei si allontana, lasciala andare. Seguirla di stanza in stanza o fuori casa è intimidatorio.' },
  { title: 'Non impedire mai di uscire', why: 'Mai porte bloccate, chiavi tolte, corpi in mezzo. Chiunque deve poter lasciare un conflitto.' },
  { title: 'Non inviare messaggi minacciosi', why: 'Nemmeno per sfogarti. Se scrivi qualcosa nel picco della rabbia, non inviarlo.' },
  { title: 'Riprendere solo in condizioni di sicurezza', why: 'Quando entrambi siete calmi e lei è d’accordo. Non sei tu a decidere che “ora si parla”.' },
  { title: 'Cercare un supporto professionale adeguato', why: 'Se gli episodi si ripetono o ci sono stati gesti intimidatori, serve un aiuto specialistico. È un atto di responsabilità.' },
];

/** Informazioni di sicurezza mostrate quando una risposta comporta intimidazione. */
export function SafetyNotice({ compact }: { compact?: boolean }) {
  return (
    <div className="safety" role="note">
      <strong>La sicurezza viene prima di tutto.</strong>
      {!compact && (
        <p>
          Afferrare, bloccare, seguire, minacciare, colpire oggetti: sono comportamenti intimidatori, e nessuna rabbia o provocazione li giustifica. Se ti riconosci in
          questa risposta nella vita reale, applica il protocollo: interrompi, allontanati tu, non seguire e non bloccare mai, nessun messaggio minaccioso, cerca un
          supporto professionale.
        </p>
      )}
      <p style={{ marginBottom: 0 }}>
        Pericolo immediato: <strong>112</strong>. Per orientarti verso un aiuto: <Link to="/sicurezza">Sicurezza e aiuto</Link> ·{' '}
        <Link to="/laboratori/rabbia?tab=strumento">protocollo</Link>.
      </p>
    </div>
  );
}

/** Verifica di sicurezza: sei domande sì/no. Una sola risposta “sì” attiva la priorità sicurezza. */
export function SafetyCheck() {
  const { data, dispatch } = useStore();
  const [answers, setAnswers] = useState<(boolean | null)[]>(safetyQuestions.map(() => null));
  const complete = answers.every((a) => a !== null);
  const [done, setDone] = useState(false);

  return (
    <div className="card" id="verifica-sicurezza">
      <span className="eyebrow">Verifica di sicurezza</span>
      <h3>Prima di proseguire, qualche domanda diretta</h3>
      <p className="small muted">
        Le risposte restano su questo dispositivo e non producono etichette né punteggi. Servono solo a capire se, per te, la priorità adesso è la sicurezza.
      </p>
      {safetyQuestions.map((q, i) => (
        <div key={q} className="safety-q">
          <p style={{ margin: '0 0 8px' }}>{q}</p>
          <div className="chips" role="radiogroup" aria-label={q}>
            {[
              [true, 'Sì'],
              [false, 'No'],
            ].map(([v, l]) => (
              <button
                key={String(l)}
                type="button"
                role="radio"
                className="chip chip-sm"
                aria-checked={answers[i] === v}
                onClick={() => setAnswers(answers.map((a, j) => (j === i ? (v as boolean) : a)))}
              >
                {l as string}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button
        className="btn"
        disabled={!complete}
        onClick={() => {
          dispatch({ type: 'safetyCheck', flagged: answers.some(Boolean) });
          dispatch({ type: 'useTool', tool: 'protocollo' });
          setDone(true);
        }}
      >
        Conferma le risposte
      </button>
      {(done || data.safety.checkedAt) && (
        <div className="fade-in" style={{ marginTop: 16 }} role="status">
          {data.safety.flagged ? (
            <SafetyNotice compact />
          ) : (
            <p className="note" style={{ marginBottom: 0 }}>
              Dalle tue risposte non emergono rischi di intimidazione fisica. Il protocollo resta comunque utile: preparalo ora, in un momento tranquillo. Se in futuro
              qualcosa cambiasse, puoi ripetere la verifica.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Interruzione degli esercizi ordinari: se la verifica ha segnalato un rischio e
 * l'utente non ha ancora letto il protocollo e preparato un piano di uscita,
 * mostra questo blocco al posto del contenuto.
 */
export function SafetyGate({ children }: { children: ReactNode }) {
  const { data } = useStore();
  if (data.safety.flagged && !data.safety.acknowledgedAt)
    return (
      <div className="container gate-wrap">
        <SafetyInterrupt />
      </div>
    );
  return <>{children}</>;
}

export function SafetyInterrupt() {
  const { data, dispatch } = useStore();
  const toast = useToast();
  const [plan, setPlan] = useState(data.safety.exitPlan);
  const [read, setRead] = useState(false);
  const ok = read && plan.where.trim() && plan.message.trim();
  return (
    <div className="safety-interrupt">
      <span className="eyebrow">Gli esercizi ordinari sono sospesi</span>
      <h2>Adesso la priorità è la sicurezza</h2>
      <p>
        Dalla verifica di sicurezza emerge che nella tua relazione ci sono stati, o potrebbero esserci, comportamenti intimidatori o fisici. In questa situazione
        gli esercizi su comunicazione e conflitto non sono il punto di partenza giusto. Prima servono distanza nei momenti di attivazione, un piano di uscita e un
        supporto professionale.
      </p>
      <ol className="protocol">
        {protocolSteps.map((s) => (
          <li key={s.title}>
            <strong>{s.title}.</strong> {s.why}
          </li>
        ))}
      </ol>
      <div className="card" style={{ marginTop: 18 }}>
        <h3>Il tuo piano di uscita</h3>
        <div className="field">
          <label htmlFor="ep-message">La frase che dirai per interrompere</label>
          <input id="ep-message" className="input" placeholder="«Mi sto arrabbiando troppo. Mi fermo adesso e mi allontano.»" value={plan.message} onChange={(e) => setPlan({ ...plan, message: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="ep-where">Dove andrai, concretamente</label>
          <input id="ep-where" className="input" placeholder="Es. esco a camminare al parco, vado da mio fratello" value={plan.where} onChange={(e) => setPlan({ ...plan, where: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="ep-who">A chi chiederai aiuto (professionista, servizio, persona di fiducia)</label>
          <input id="ep-who" className="input" value={plan.who} onChange={(e) => setPlan({ ...plan, who: e.target.value })} />
        </div>
        <label className="row small" style={{ cursor: 'pointer', marginBottom: 14 }}>
          <input type="checkbox" checked={read} onChange={(e) => setRead(e.target.checked)} />
          Ho letto il protocollo e mi impegno ad allontanarmi io, a non seguire, non bloccare e non minacciare.
        </label>
        <div className="row">
          <button
            className="btn"
            disabled={!ok}
            onClick={() => {
              dispatch({ type: 'safetyAcknowledge', exitPlan: plan });
              toast('Piano di uscita salvato');
            }}
          >
            <Icon name="check" /> Salva il piano e prosegui
          </button>
          <Link to="/sicurezza" className="btn btn-secondary">
            Contatti e servizi
          </Link>
        </div>
      </div>
      <p className="small muted" style={{ marginTop: 14 }}>
        In caso di pericolo immediato chiama il 112. Questo strumento non sostituisce un professionista.
      </p>
    </div>
  );
}

/** Strumento del laboratorio 5: verifica, protocollo, piano di uscita. */
export function AngerProtocol() {
  const { data } = useStore();
  return (
    <div className="grid" style={{ gap: 20 }}>
      <SafetyCheck />
      {data.safety.flagged && !data.safety.acknowledgedAt && <SafetyInterrupt />}
      <div className="card">
        <span className="eyebrow">Il protocollo</span>
        <h3>Sette passi per interrompere l’escalation</h3>
        <ol className="protocol">
          {protocolSteps.map((s) => (
            <li key={s.title}>
              <strong>{s.title}.</strong> {s.why}
            </li>
          ))}
        </ol>
        {data.safety.acknowledgedAt && (data.safety.exitPlan.message || data.safety.exitPlan.where) && (
          <div className="note" style={{ marginTop: 14 }}>
            <strong>Il tuo piano di uscita.</strong> Frase: {data.safety.exitPlan.message || '—'} · Dove vai: {data.safety.exitPlan.where || '—'}
            {data.safety.exitPlan.who && ` · Aiuto: ${data.safety.exitPlan.who}`}
          </div>
        )}
        <div className="row" style={{ marginTop: 14 }}>
          <Link to="/esercizi/tk-escalation" className="btn btn-sm">
            Scrivi il tuo protocollo
          </Link>
          <Link to="/esercizi/mappa-escalation" className="btn btn-secondary btn-sm">
            La mia mappa dell’escalation
          </Link>
        </div>
      </div>
    </div>
  );
}
