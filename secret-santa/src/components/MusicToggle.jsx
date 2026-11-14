import { Music2, VolumeX } from 'lucide-react';

/** Pulsante flottante per attivare/disattivare la musica. */
export default function MusicToggle({ playing, onToggle }) {
  return (
    <button
      type="button"
      className={`music-toggle ${playing ? 'is-playing' : ''}`}
      onClick={onToggle}
      aria-pressed={playing}
      aria-label={playing ? 'Disattiva la musica' : 'Attiva la musica'}
      title={playing ? 'Disattiva la musica' : 'Attiva la musica'}
    >
      {playing ? <Music2 size={20} strokeWidth={1.8} /> : <VolumeX size={20} strokeWidth={1.8} />}
      {playing && (
        <span className="eq" aria-hidden="true"><i /><i /><i /></span>
      )}
    </button>
  );
}
