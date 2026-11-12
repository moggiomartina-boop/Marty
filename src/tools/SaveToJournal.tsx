import { Icon } from '../components/Icon';
import { useStore } from '../store/AppStore';
import { useToast } from '../components/Toast';
import type { JournalEntry } from '../types';
import { uid } from '../utils/format';

/** Pulsante riutilizzabile: salva il risultato di uno strumento come voce di diario. */
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
        const now = new Date().toISOString();
        const base: JournalEntry = {
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
        dispatch({ type: 'saveEntry', entry: { ...base, ...build(), id: base.id, createdAt: now, updatedAt: now } });
        toast('Salvato nel diario');
        onSaved?.();
      }}
    >
      <Icon name="journal" /> {label}
    </button>
  );
}
