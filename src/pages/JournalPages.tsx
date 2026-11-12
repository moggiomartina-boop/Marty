import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { PageHead } from '../components/Layout';
import { useToast } from '../components/Toast';
import { ChipSelect, ConfirmDialog, EmptyState, Scale } from '../components/ui';
import { allEmotionWords } from '../content/emotions';
import { labById, labs } from '../content/labs';
import { useStore } from '../store/AppStore';
import type { JournalEntry, LabId } from '../types';
import { entryToMarkdown, exportJournal, downloadFile } from '../utils/export';
import { formatDate, formatDateTime, uid } from '../utils/format';
import { NotFoundPage } from './NotFoundPage';

const intensityColor = (n: number) => (n >= 8 ? 'var(--terra-700)' : n >= 5 ? 'var(--terra-500)' : n >= 3 ? '#a3875a' : 'var(--sage-500)');

/* ---------- Elenco ---------- */

export function JournalPage() {
  const { data } = useStore();
  const [q, setQ] = useState('');
  const [emotion, setEmotion] = useState('');
  const entries = data.journal;
  const usedEmotions = useMemo(() => [...new Set(entries.flatMap((e) => e.emotions))].sort(), [entries]);
  const filtered = entries.filter((e) => {
    const text = [e.title, e.situation, e.facts, e.interpretation, e.action, e.alternative, e.otherView].join(' ').toLowerCase();
    return (!q || text.includes(q.toLowerCase())) && (!emotion || e.emotions.includes(emotion));
  });

  return (
    <div className="container">
      <PageHead
        eyebrow="Privato · solo su questo dispositivo"
        title="Diario"
        lead="Uno spazio per rallentare un episodio: separare i fatti da ciò che ti sei detto/a, nominare le emozioni, immaginare l’altra prospettiva."
      >
        <div className="row no-print" style={{ marginTop: 20 }}>
          <Link to="/diario/nuovo" className="btn">
            <Icon name="plus" /> Nuova voce
          </Link>
          {entries.length > 0 && (
            <button className="btn btn-secondary" onClick={() => exportJournal(entries)}>
              <Icon name="download" /> Esporta il diario
            </button>
          )}
        </div>
      </PageHead>

      {entries.length === 0 ? (
        <EmptyState
          icon="journal"
          title="Il tuo diario è ancora vuoto"
          action={
            <Link to="/diario/nuovo" className="btn">
              Scrivi la prima voce
            </Link>
          }
        >
          Scrivere di un episodio emotivo aiuta a metterlo in ordine. Puoi anche salvare qui i risultati degli strumenti e degli scenari.
        </EmptyState>
      ) : (
        <>
          <div className="row" style={{ marginBottom: 18 }}>
            <div style={{ position: 'relative', flex: '1 1 260px' }}>
              <input className="input" type="search" placeholder="Cerca nel diario…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Cerca nel diario" style={{ paddingLeft: 40 }} />
              <span style={{ position: 'absolute', left: 12, top: 12, color: 'var(--ink-3)' }}>
                <Icon name="search" size={18} />
              </span>
            </div>
            {usedEmotions.length > 0 && (
              <select className="select" style={{ flex: '0 1 220px' }} value={emotion} onChange={(e) => setEmotion(e.target.value)} aria-label="Filtra per emozione">
                <option value="">Tutte le emozioni</option>
                {usedEmotions.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            )}
          </div>
          <p className="small muted">
            {filtered.length} {filtered.length === 1 ? 'voce' : 'voci'}
            {filtered.length !== entries.length && ` su ${entries.length}`}
          </p>
          {filtered.length === 0 ? (
            <EmptyState icon="search" title="Nessuna voce corrisponde alla ricerca" />
          ) : (
            <div className="grid grid-3">
              {filtered.map((e) => (
                <Link key={e.id} to={`/diario/${e.id}`} className="card card-link entry-card">
                  <span className="entry-meta">
                    {formatDate(e.createdAt)}
                    {e.lab && ` · ${labById(e.lab)?.title}`}
                  </span>
                  <h3 style={{ fontSize: '1.15rem' }}>{e.title || 'Senza titolo'}</h3>
                  {e.situation && (
                    <p className="small muted" style={{ margin: 0 }}>
                      {e.situation.slice(0, 120)}
                      {e.situation.length > 120 && '…'}
                    </p>
                  )}
                  {e.emotions.length > 0 && (
                    <div className="row" style={{ gap: 6 }}>
                      <span className="intensity-dot" style={{ background: intensityColor(e.intensity) }} title={`Intensità ${e.intensity}/10`} />
                      {e.emotions.slice(0, 3).map((w) => (
                        <span key={w} className="tag">
                          {w}
                        </span>
                      ))}
                      {e.emotions.length > 3 && <span className="small muted">+{e.emotions.length - 3}</span>}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ---------- Dettaglio ---------- */

const fields: { key: keyof JournalEntry; label: string }[] = [
  { key: 'situation', label: 'Situazione' },
  { key: 'facts', label: 'I fatti' },
  { key: 'interpretation', label: 'Che cosa mi sono detto/a' },
  { key: 'body', label: 'Nel corpo' },
  { key: 'impulse', label: 'Che cosa avrei voluto fare' },
  { key: 'action', label: 'Che cosa ho fatto' },
  { key: 'impact', label: 'Effetto sull’altra persona' },
  { key: 'otherView', label: 'Il punto di vista dell’altro' },
  { key: 'alternative', label: 'Un’alternativa possibile' },
];

export function JournalDetailPage() {
  const { entryId = '' } = useParams();
  const { data, dispatch } = useStore();
  const navigate = useNavigate();
  const toast = useToast();
  const [confirm, setConfirm] = useState(false);
  const e = data.journal.find((x) => x.id === entryId);
  if (!e) return <NotFoundPage message="Questa voce di diario non esiste o è stata eliminata." />;

  return (
    <div className="container read">
      <nav className="breadcrumb no-print" style={{ paddingTop: 24 }} aria-label="Percorso">
        <Link to="/diario">Diario</Link> / Voce
      </nav>
      <PageHead eyebrow={formatDateTime(e.createdAt)} title={e.title || 'Senza titolo'}>
        {e.updatedAt !== e.createdAt && <p className="small muted">Modificata il {formatDateTime(e.updatedAt)}</p>}
        <div className="row no-print" style={{ marginTop: 16 }}>
          <Link to={`/diario/${e.id}/modifica`} className="btn btn-secondary">
            <Icon name="edit" /> Modifica
          </Link>
          <button className="btn btn-secondary" onClick={() => downloadFile(`diario-${e.createdAt.slice(0, 10)}.md`, entryToMarkdown(e), 'text/markdown;charset=utf-8')}>
            <Icon name="download" /> Esporta
          </button>
          <button className="btn btn-secondary" onClick={() => window.print()}>
            <Icon name="print" /> Stampa
          </button>
          <button className="btn btn-danger" onClick={() => setConfirm(true)}>
            <Icon name="trash" /> Elimina
          </button>
        </div>
      </PageHead>

      <div className="card">
        {e.emotions.length > 0 && (
          <div style={{ marginBottom: 8 }}>
            <span className="eyebrow">Emozioni · intensità {e.intensity}/10</span>
            <div className="chips">
              {e.emotions.map((w) => (
                <span key={w} className="tag tag-petrol">
                  {w}
                </span>
              ))}
            </div>
          </div>
        )}
        <dl className="entry-detail">
          {fields.map((f) =>
            String(e[f.key] ?? '').trim() ? (
              <div key={f.key}>
                <dt>{f.label}</dt>
                <dd>{String(e[f.key])}</dd>
              </div>
            ) : null,
          )}
        </dl>
        {e.lab && (
          <p className="small muted" style={{ marginTop: 20, marginBottom: 0 }}>
            Collegata a: <Link to={`/laboratori/${e.lab}`}>{labById(e.lab)?.title}</Link>
          </p>
        )}
      </div>

      <ConfirmDialog
        open={confirm}
        title="Eliminare questa voce?"
        confirmLabel="Elimina definitivamente"
        danger
        onCancel={() => setConfirm(false)}
        onConfirm={() => {
          dispatch({ type: 'deleteEntry', id: e.id });
          toast('Voce eliminata');
          navigate('/diario');
        }}
      >
        L’operazione non si può annullare. Se vuoi conservarla, esportala prima.
      </ConfirmDialog>
    </div>
  );
}

/* ---------- Editor (nuova voce e modifica) ---------- */

const blank = (): JournalEntry => {
  const now = new Date().toISOString();
  return {
    id: uid(),
    createdAt: now,
    updatedAt: now,
    title: '',
    situation: '',
    facts: '',
    interpretation: '',
    emotions: [],
    intensity: 5,
    body: '',
    impulse: '',
    action: '',
    impact: '',
    otherView: '',
    alternative: '',
  };
};

export function JournalEditorPage() {
  const { entryId } = useParams();
  const [params] = useSearchParams();
  const { data, dispatch } = useStore();
  const navigate = useNavigate();
  const toast = useToast();
  const existing = entryId ? data.journal.find((x) => x.id === entryId) : undefined;
  const [entry, setEntry] = useState<JournalEntry>(() => {
    if (existing) return existing;
    const b = blank();
    const lab = params.get('lab');
    const q = params.get('q');
    if (lab && labs.some((l) => l.id === lab)) b.lab = lab as LabId;
    if (q) b.title = q.length > 80 ? `${q.slice(0, 77)}…` : q;
    if (q) b.situation = `${q}\n\n`;
    return b;
  });
  const [dirty, setDirty] = useState(false);
  const [confirmLeave, setConfirmLeave] = useState(false);

  if (entryId && !existing) return <NotFoundPage message="Questa voce di diario non esiste o è stata eliminata." />;

  const set = <K extends keyof JournalEntry>(k: K, v: JournalEntry[K]) => {
    setEntry({ ...entry, [k]: v });
    setDirty(true);
  };
  const hasContent = [entry.title, entry.situation, entry.facts, entry.interpretation, entry.action].some((x) => x.trim()) || entry.emotions.length > 0;
  const save = () => {
    const toSave = { ...entry, title: entry.title.trim() || 'Senza titolo', updatedAt: new Date().toISOString() };
    dispatch({ type: 'saveEntry', entry: toSave });
    toast(existing ? 'Modifiche salvate' : 'Voce salvata');
    navigate(`/diario/${toSave.id}`);
  };
  const cancel = () => (dirty ? setConfirmLeave(true) : navigate(existing ? `/diario/${existing.id}` : '/diario'));

  const area = (k: keyof JournalEntry, label: string, help?: string, placeholder?: string) => (
    <div className="field">
      <label htmlFor={`j-${k}`}>{label}</label>
      {help && <span className="help">{help}</span>}
      <textarea id={`j-${k}`} className="textarea" placeholder={placeholder} value={String(entry[k] ?? '')} onChange={(e) => set(k, e.target.value as never)} />
    </div>
  );

  return (
    <div className="container read">
      <nav className="breadcrumb" style={{ paddingTop: 24 }} aria-label="Percorso">
        <Link to="/diario">Diario</Link> / {existing ? 'Modifica' : 'Nuova voce'}
      </nav>
      <PageHead
        eyebrow={existing ? 'Modifica voce' : 'Nuova voce'}
        title={existing ? 'Rileggi e modifica' : 'Che cosa è successo?'}
        lead="Compila solo ciò che ti è utile. Nessun campo è obbligatorio, salvo almeno un contenuto."
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (hasContent) save();
        }}
      >
        <div className="field">
          <label htmlFor="j-title">Titolo</label>
          <input id="j-title" className="input" placeholder="Es. La discussione di ieri sera" value={entry.title} onChange={(e) => set('title', e.target.value)} />
        </div>

        <h2 style={{ fontSize: '1.3rem', marginTop: 28 }}>1 · Fatti e interpretazioni</h2>
        {area('situation', 'Situazione', 'Dove eri, con chi, che cosa stava succedendo.')}
        {area('facts', 'I fatti', 'Solo ciò che una videocamera avrebbe registrato.')}
        {area('interpretation', 'Che cosa mi sono detto/a', 'Il pensiero automatico, anche se ora ti sembra esagerato.')}

        <h2 style={{ fontSize: '1.3rem', marginTop: 28 }}>2 · Emozioni e corpo</h2>
        <div className="field">
          <span className="label">Emozioni</span>
          <ChipSelect options={allEmotionWords} value={entry.emotions} onChange={(v) => set('emotions', v)} label="Emozioni" />
        </div>
        <div className="field">
          <span className="label">Intensità</span>
          <Scale value={entry.intensity} onChange={(v) => set('intensity', v)} minLabel="lieve" maxLabel="travolgente" label="Intensità dell’emozione" />
        </div>
        {area('body', 'Nel corpo', 'Calore, tensione, respiro, battito…')}

        <h2 style={{ fontSize: '1.3rem', marginTop: 28 }}>3 · Reazione e impatto</h2>
        {area('impulse', 'Che cosa avrei voluto fare')}
        {area('action', 'Che cosa ho fatto o detto')}
        {area('impact', 'Che effetto ha avuto sull’altra persona', 'Ciò che hai visto, e ciò che immagini.')}
        {area('otherView', 'Come potrebbe averla vissuta l’altro', 'Un’ipotesi, non una certezza.')}
        {area('alternative', 'Un’alternativa possibile', 'Che cosa potresti fare o dire la prossima volta?')}

        <div className="field">
          <label htmlFor="j-lab">Collega a un laboratorio (facoltativo)</label>
          <select id="j-lab" className="select" value={entry.lab ?? ''} onChange={(e) => set('lab', (e.target.value || undefined) as LabId | undefined)}>
            <option value="">Nessuno</option>
            {labs.map((l) => (
              <option key={l.id} value={l.id}>
                {l.number}. {l.title}
              </option>
            ))}
          </select>
        </div>

        <div className="row" style={{ position: 'sticky', bottom: 'calc(var(--tabbar-h) + 8px)', background: 'var(--ivory)', padding: '12px 0', borderTop: '1px solid var(--line)' }}>
          <button type="button" className="btn btn-secondary" onClick={cancel}>
            Annulla
          </button>
          <span className="spacer" />
          <button type="submit" className="btn" disabled={!hasContent}>
            <Icon name="check" /> Salva
          </button>
        </div>
      </form>

      <ConfirmDialog
        open={confirmLeave}
        title="Uscire senza salvare?"
        confirmLabel="Esci senza salvare"
        danger
        onCancel={() => setConfirmLeave(false)}
        onConfirm={() => navigate(existing ? `/diario/${existing.id}` : '/diario')}
      >
        Le modifiche non salvate andranno perse.
      </ConfirmDialog>
    </div>
  );
}
