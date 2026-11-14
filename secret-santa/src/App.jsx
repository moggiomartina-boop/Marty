import { useCallback, useEffect, useRef, useState } from 'react';
import Snow from './components/Snow.jsx';
import StringLights from './components/StringLights.jsx';
import MusicToggle from './components/MusicToggle.jsx';
import PinSheet from './components/PinSheet.jsx';
import OrganizerSheet from './components/OrganizerSheet.jsx';
import Footer from './components/Footer.jsx';
import Home from './screens/Home.jsx';
import WhoAreYou from './screens/WhoAreYou.jsx';
import Registered from './screens/Registered.jsx';
import Reveal from './screens/Reveal.jsx';
import Farewell from './screens/Farewell.jsx';
import { drawService, errorMessage } from './services/drawService.js';
import { DEMO_ORGANIZER_CODE } from './services/localService.js';
import { startMusic, stopMusic } from './audio/musicEngine.js';

const MUSIC_PREF = 'secret-santa-music';
const readPref = () => { try { return localStorage.getItem(MUSIC_PREF); } catch { return null; } };
const writePref = (v) => { try { localStorage.setItem(MUSIC_PREF, v); } catch { /* ignora */ } };

const EMPTY = { phase: 'registration', participants: [] };

/**
 * Flusso
 *  Fase 1 (iscrizione):  home → chi sei? → PIN → iscritto
 *  Fase 2 (estrazione):  home → chi sei? → PIN → rivelazione → segreto custodito
 * Lo stato vive sul server; qui teniamo solo lo stato della UI.
 * Il destinatario resta in memoria solo durante la rivelazione.
 */
export default function App() {
  const [screen, setScreen] = useState('home');
  const [status, setStatus] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [selected, setSelected] = useState(null);
  const [sheet, setSheet] = useState(null);          // { mode: 'register'|'reveal', name }
  const [sheetError, setSheetError] = useState('');
  const [busy, setBusy] = useState(false);
  const [organizerOpen, setOrganizerOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [registeredName, setRegisteredName] = useState('');
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

  // aggiornamento periodico mentre si sceglie il nome (iscritti, avvio, ecc.)
  useEffect(() => {
    if (screen !== 'who') return undefined;
    refresh();
    const id = setInterval(refresh, 8000);
    return () => clearInterval(id);
  }, [screen, refresh]);

  // se la fase cambia mentre un nome è selezionato, si riparte puliti
  useEffect(() => { setSelected(null); }, [status.phase]);

  const flash = (msg) => {
    setNotice(msg);
    clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(''), 7000);
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
  const go = (s) => { setScreen(s); window.scrollTo(0, 0); };

  const start = async () => {
    go('who');
    // il click è un gesto dell'utente: la musica può partire (se non disattivata)
    if (!playing && readPref() !== 'off') setPlaying(await startMusic());
  };

  const selectPerson = (p) => {
    setNotice('');
    if (status.phase === 'registration' && p.registered) {
      setSelected(null);
      flash(`${p.name} è già iscritto. Se non sei stato tu, avvisa subito l’organizzatrice: potrà liberare il nome.`);
      return;
    }
    setSelected((s) => (s === p.name ? null : p.name));
  };

  const openSheet = () => {
    if (!selected) return;
    setSheetError('');
    setSheet({ mode: status.phase === 'drawn' ? 'reveal' : 'register', name: selected });
  };

  const submitPin = async (pin) => {
    const { mode, name } = sheet;
    setBusy(true);
    const res = mode === 'register' ? await drawService.register(name, pin) : await drawService.reveal(name, pin);
    setBusy(false);

    if (res?.ok) {
      setSheet(null);
      setSelected(null);
      if (mode === 'register') {
        setRegisteredName(name);
        go('registered');
      } else {
        setResult({ giver: name, receiver: res.receiver, replay: !res.first_time });
        go('reveal');
      }
      return;
    }
    // la fase o lo stato sono cambiati nel frattempo: chiudo e aggiorno
    if (['ALREADY_REGISTERED', 'DRAW_STARTED', 'NOT_STARTED'].includes(res?.error)) {
      setSheet(null);
      setSelected(null);
      flash(errorMessage(res));
      refresh();
      return;
    }
    setSheetError(errorMessage(res));
  };

  const finishReveal = () => {
    setResult(null); // il nome sparisce dalla memoria e dallo schermo
    go('done');
    refresh();
  };

  const allDone = status.phase === 'drawn' && status.participants.every((p) => p.revealed);

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
            onSelect={selectPerson}
            onAction={openSheet}
            onBack={() => go('home')}
            onRetry={refresh}
            onOrganizer={() => { setSelected(null); setOrganizerOpen(true); }}
          />
        )}
        {screen === 'registered' && <Registered name={registeredName} onBack={() => go('who')} />}
        {screen === 'reveal' && result && (
          <Reveal giver={result.giver} receiver={result.receiver} replay={result.replay} onDone={finishReveal} />
        )}
        {screen === 'done' && <Farewell allDone={allDone} onNext={() => go('who')} />}
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

      {organizerOpen && (
        <OrganizerSheet
          status={status}
          demoCode={drawService.mode === 'demo' ? DEMO_ORGANIZER_CODE : ''}
          onChanged={refresh}
          onClose={() => setOrganizerOpen(false)}
        />
      )}

      <MusicToggle playing={playing} onToggle={toggleMusic} />
    </div>
  );
}
