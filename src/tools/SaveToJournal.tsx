import { Icon } from '../components/Icon';
import { useToast } from '../components/Toast';
import { useStore } from '../store/AppStore';
import type { JournalEntry } from '../types';
import { uid } from '../utils/format';

/** Crea una voce di diario vuota: usata dagli strumenti che salvano nel diario. */
export function blankEntry(): JournalEntry {
  const now = new Date().toISOString();
  return {
    id: uid(),
    createdAt: now,
    updatedAt: now,
    title: '',
    situation: '',
    facts: '',
    interpretation: '',
    fear: '',
    emotions: [],
    intensity: 5,
    body: '',
    impulse: '',
    action: '',
    impact: '',
    otherView: '',
    alternative: '',
  };
}

/** Pulsante riutilizzabile: salva il risultato di uno strumento come voce di diario privata. */
export function SaveToJournal({
  build,
  disabled,
  onSaved,
  label = 'Salva nel diario',
}: {
  build: () => Partial<JournalEntry>;
  disabled?: boolean;
  onSaved?: () => void;
  label?: string;
}) {
  const { dispatch } = useStore();
  const toast = useToast();
  return (
    <button
      className="btn"
      disabled={disabled}
      onClick={() => {
        const base = blankEntry();
        dispatch({ type: 'saveEntry', entry: { ...base, ...build(), id: base.id, createdAt: base.createdAt, updatedAt: base.updatedAt } });
        toast('Salvato nel diario');
        onSaved?.();
      }}
    >
      <Icon name="journal" /> {label}
    </button>
  );
}
