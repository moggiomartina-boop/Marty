import { useCallback, useEffect, useState } from 'react';
import Snow from './components/Snow.jsx';
import StringLights from './components/StringLights.jsx';
import MusicToggle from './components/MusicToggle.jsx';
import AuthSheet from './components/AuthSheet.jsx';
import Footer from './components/Footer.jsx';
import Home from './screens/Home.jsx';
import WhoAreYou from './screens/WhoAreYou.jsx';
import Reveal from './screens/Reveal.jsx';
import Farewell from './screens/Farewell.jsx';
import { drawService } from './services/drawService.js';
import { startMusic, stopMusic } from './audio/musicEngine.js';

const MUSIC_PREF = 'secret-santa-music';
const readPref = () => { try { return localStorage.getItem(MUSIC_PREF); } catch { return null; } };
const writePref = (v) => { try { localStorage.setItem(MUSIC_PREF, v); } catch { /* ignora */ } };

/**
 * Flusso: home → chi sei? → email + codice → rivelazione → segreto custodito.
 * Lo stato dell'estrazione vive sul server; qui teniamo solo lo stato della UI.
 * Il destinatario resta in memoria solo durante la rivelazione.
 */
export default function App() {
  const [screen, setScreen] = useState('home');
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [selected, setSelected] = useState(null);
  const [sheet, setSheet] = useState(null);          // { name, claimed }
  const [result, setResult] = useState(null);        // { giver, receiver, replay }
  const [playing, setPlaying] = useState(false);

  /* ---------------------------------- dati --------------------------------- */
  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setStatus(await drawService.getStatus());
      setLoadError('');
    } catch {
      setLoadError('Non riesco a raggiungere il Polo Nord. Controlla la connessione.');
    } finally {
      setLoading(false);
    }
  }, []);

  // aggiornamento periodico mentre si sceglie il nome (vede chi ha già pescato)
  useEffect(() => {
    if (screen !== 'who') return undefined;
    refresh();
    const id = setInterval(refresh, 10000);
    return () => clearInterval(id);
  }, [screen, refresh]);

  /* --------------------------------- musica -------------------------------- */
  const toggleMusic = async () => {
    if (playing) {
      stopMusic();
      setPlaying(false);
      writePref('off');
    } else {
      setPlaying(await startMusic());
      writePref('on');
    }
  };

  /* --------------------------------- azioni -------------------------------- */
  const start = async () => {
    setScreen('who');
    window.scrollTo(0, 0);
    // il click è un gesto dell'utente: la musica può partire (se non disattivata)
    if (!playing && readPref() !== 'off') setPlaying(await startMusic());
  };

  const openSheet = (name, claimed) => setSheet({ name, claimed });

  // identità confermata dal codice email: mostra la rivelazione
  const onRevealed = (res) => {
    setSheet(null);
    setSelected(null);
    setResult({ giver: res.giver, receiver: res.receiver, replay: !res.first_time });
    setScreen('reveal');
    window.scrollTo(0, 0);
  };

  const finishReveal = () => {
    setResult(null); // il nome sparisce dalla memoria e dallo schermo
    setScreen('done');
    refresh();
  };

  const resetDemo = () => {
    if (window.confirm('Azzerare l’estrazione demo su questo dispositivo?')) {
      drawService.reset?.();
      setSelected(null);
      refresh();
    }
  };

  const allDone = status.length > 0 && status.every((p) => p.claimed);

  return (
    <div className={`app app--${screen}`}>
      <div className="bg-texture" aria-hidden="true" />
      <Snow />
      <StringLights />

      <div className="screen-wrap" key={screen}>
        {screen === 'home' && <Home onStart={start} />}
        {screen === 'who' && (
          <WhoAreYou
            status={status}
            loading={loading}
            loadError={loadError}
            selected={selected}
            demo={drawService.mode === 'demo'}
            onSelect={(n) => setSelected((s) => (s === n ? null : n))}
            onSelectClaimed={(n) => { setSelected(null); openSheet(n, true); }}
            onReveal={() => selected && openSheet(selected, false)}
            onBack={() => setScreen('home')}
            onRetry={refresh}
            onResetDemo={resetDemo}
          />
        )}
        {screen === 'reveal' && result && (
          <Reveal giver={result.giver} receiver={result.receiver} replay={result.replay} onDone={finishReveal} />
        )}
        {screen === 'done' && <Farewell allDone={allDone} onNext={() => setScreen('who')} />}
        <Footer />
      </div>

      {sheet && (
        <AuthSheet
          name={sheet.name}
          claimed={sheet.claimed}
          onRevealed={onRevealed}
          onClose={() => setSheet(null)}
        />
      )}

      <MusicToggle playing={playing} onToggle={toggleMusic} />
    </div>
  );
}
