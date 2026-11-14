import { useCallback, useEffect, useRef, useState } from 'react';
import Snow from './components/Snow.jsx';
import StringLights from './components/StringLights.jsx';
import MusicToggle from './components/MusicToggle.jsx';
import PinSheet from './components/PinSheet.jsx';
import Footer from './components/Footer.jsx';
import Home from './screens/Home.jsx';
import WhoAreYou from './screens/WhoAreYou.jsx';
import Reveal from './screens/Reveal.jsx';
import Farewell from './screens/Farewell.jsx';
import { drawService, errorMessage } from './services/drawService.js';
import { startMusic, stopMusic } from './audio/musicEngine.js';

const MUSIC_PREF = 'secret-santa-music';
const readPref = () => { try { return localStorage.getItem(MUSIC_PREF); } catch { return null; } };
const writePref = (v) => { try { localStorage.setItem(MUSIC_PREF, v); } catch { /* ignora */ } };

/**
 * Flusso: home → chi sei? → (PIN) → rivelazione → segreto custodito → chi sei?
 * Lo stato dell'estrazione vive sul server; qui teniamo solo lo stato della UI.
 * Il destinatario resta in memoria solo durante la rivelazione.
 */
export default function App() {
  const [screen, setScreen] = useState('home');
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [selected, setSelected] = useState(null);
  const [sheet, setSheet] = useState(null);          // { mode, name }
  const [sheetError, setSheetError] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [result, setResult] = useState(null);        // { giver, receiver, replay }
  const [playing, setPlaying] = useState(false);
  const noticeTimer = useRef(0);

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

  const flash = (msg) => {
    setNotice(msg);
    clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(''), 6000);
  };

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

  const openSheet = (mode, name) => {
    setSheetError('');
    setSheet({ mode, name });
  };

  const submitPin = async (pin) => {
    const { mode, name } = sheet;
    setBusy(true);
    const res = mode === 'create' ? await drawService.claim(name, pin) : await drawService.reveal(name, pin);
    setBusy(false);

    if (res?.ok) {
      setSheet(null);
      setSelected(null);
      setResult({ giver: name, receiver: res.receiver, replay: mode === 'verify' });
      setScreen('reveal');
      window.scrollTo(0, 0);
      return;
    }
    if (res?.error === 'ALREADY_CLAIMED') {
      setSheet(null);
      setSelected(null);
      flash(`${name} ha già pescato. Se sei tu, tocca il tuo nome e usa il PIN.`);
      refresh();
      return;
    }
    setSheetError(errorMessage(res));
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
            notice={notice}
            demo={drawService.mode === 'demo'}
            onSelect={(n) => setSelected((s) => (s === n ? null : n))}
            onSelectClaimed={(n) => { setSelected(null); openSheet('verify', n); }}
            onReveal={() => selected && openSheet('create', selected)}
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
        <PinSheet
          name={sheet.name}
          mode={sheet.mode}
          error={sheetError}
          busy={busy}
          onSubmit={submitPin}
          onClose={() => !busy && setSheet(null)}
        />
      )}

      <MusicToggle playing={playing} onToggle={toggleMusic} />
    </div>
  );
}
