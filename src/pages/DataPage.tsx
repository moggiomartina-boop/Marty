import { useRef, useState } from 'react';
import { PageHead } from '../components/Layout';
import { Icon } from '../components/Icon';
import { useToast } from '../components/Toast';
import { ConfirmDialog } from '../components/ui';
import { useStore } from '../store/AppStore';
import { clearData, STORAGE_KEY } from '../store/storage';
import { exportAll, exportJournal, exportPlan } from '../utils/export';

export function DataPage() {
  const { data, dispatch } = useStore();
  const toast = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [confirm, setConfirm] = useState<null | 'journal' | 'all' | { importData: unknown }>(null);
  const size = (() => {
    try {
      return new Blob([localStorage.getItem(STORAGE_KEY) ?? '']).size;
    } catch {
      return 0;
    }
  })();

  const onFile = async (f: File | undefined) => {
    if (!f) return;
    try {
      const parsed = JSON.parse(await f.text());
      if (typeof parsed !== 'object' || parsed === null || !('progress' in parsed || 'journal' in parsed || 'plan' in parsed)) {
        throw new Error('formato');
      }
      setConfirm({ importData: parsed });
    } catch {
      toast('File non valido: serve un backup JSON di Oltre la reazione');
    } finally {
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div className="container read">
      <PageHead
        eyebrow="Privacy e dati"
        title="I tuoi dati restano tuoi"
        lead="Oltre la reazione funziona interamente nel tuo browser. Non c’è un server che riceve ciò che scrivi, non ci sono account, non ci sono sistemi di tracciamento."
      />
      <div className="card" style={{ marginBottom: 18 }}>
        <h3>Che cosa è salvato su questo dispositivo</h3>
        <ul className="small" style={{ paddingLeft: '1.2em' }}>
          <li>{data.journal.length} voci di diario</li>
          <li>Il piano personale {data.plan.updatedAt ? '(compilato)' : '(vuoto)'}</li>
          <li>{Object.keys(data.progress.exercises).length} esercizi completati con le relative risposte</li>
          <li>{Object.keys(data.progress.scenarios).length} scenari esplorati e i percorsi scelti</li>
          <li>Sezioni lette e strumenti usati</li>
        </ul>
        <p className="small muted" style={{ margin: 0 }}>
          Spazio occupato: circa {(size / 1024).toFixed(1)} KB, nella memoria locale del browser (localStorage). Se cancelli i dati di navigazione
          del sito o usi una finestra privata, questi dati possono andare persi: esporta un backup se ci tieni.
        </p>
      </div>

      <div className="card" style={{ marginBottom: 18 }}>
        <h3>Esporta</h3>
        <div className="row">
          <button className="btn" onClick={() => exportAll(data)}>
            <Icon name="download" /> Backup completo (.json)
          </button>
          <button className="btn btn-secondary" onClick={() => exportJournal(data.journal)} disabled={!data.journal.length}>
            Diario (.md)
          </button>
          <button className="btn btn-secondary" onClick={() => exportPlan(data.plan)}>
            Piano (.md)
          </button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 18 }}>
        <h3>Importa un backup</h3>
        <p className="small muted">Ripristina un backup JSON esportato in precedenza, per esempio per passare a un altro dispositivo. Sostituisce i dati attuali.</p>
        <input ref={fileRef} type="file" accept="application/json,.json" className="sr-only" id="import-file" onChange={(e) => onFile(e.target.files?.[0])} />
        <label htmlFor="import-file" className="btn btn-secondary" style={{ cursor: 'pointer' }}>
          <Icon name="upload" /> Scegli file
        </label>
      </div>

      <div className="card">
        <h3>Elimina</h3>
        <div className="row">
          <button className="btn btn-danger" disabled={!data.journal.length} onClick={() => setConfirm('journal')}>
            <Icon name="trash" /> Elimina tutto il diario
          </button>
          <button className="btn btn-danger" onClick={() => setConfirm('all')}>
            <Icon name="trash" /> Elimina tutti i dati
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={confirm === 'journal'}
        title="Eliminare tutto il diario?"
        confirmLabel="Elimina il diario"
        danger
        onCancel={() => setConfirm(null)}
        onConfirm={() => {
          data.journal.forEach((e) => dispatch({ type: 'deleteEntry', id: e.id }));
          setConfirm(null);
          toast('Diario eliminato');
        }}
      >
        Tutte le {data.journal.length} voci verranno cancellate da questo dispositivo. L’operazione non si può annullare.
      </ConfirmDialog>
      <ConfirmDialog
        open={confirm === 'all'}
        title="Eliminare tutti i dati?"
        confirmLabel="Elimina tutto"
        danger
        onCancel={() => setConfirm(null)}
        onConfirm={() => {
          clearData();
          dispatch({ type: 'resetAll' });
          setConfirm(null);
          toast('Tutti i dati sono stati eliminati');
        }}
      >
        Diario, piano, risposte agli esercizi e progressi verranno cancellati da questo dispositivo. L’operazione non si può annullare.
      </ConfirmDialog>
      <ConfirmDialog
        open={typeof confirm === 'object' && confirm !== null}
        title="Importare il backup?"
        confirmLabel="Importa e sostituisci"
        onCancel={() => setConfirm(null)}
        onConfirm={() => {
          if (typeof confirm === 'object' && confirm) dispatch({ type: 'import', data: confirm.importData });
          setConfirm(null);
          toast('Backup importato');
        }}
      >
        I dati attualmente salvati su questo dispositivo verranno sostituiti da quelli del file.
      </ConfirmDialog>
    </div>
  );
}
