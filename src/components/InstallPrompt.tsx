import { useEffect, useState } from 'react';
import { Icon } from './Icon';

/** Evento non standard di Chrome/Android per l'installazione. */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISS_KEY = 'oltre-la-reazione:install-dismissed';

const isStandalone = () =>
  window.matchMedia?.('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone === true;

const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

/**
 * Invita a installare l'app nella schermata Home.
 * Android/Chrome: usa il prompt nativo. iPhone/iPad: mostra le istruzioni di Safari.
 * Non compare se l'app è già installata o se è stato chiuso.
 */
export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(DISMISS_KEY) === '1';
    } catch {
      /* storage non disponibile */
    }
    if (dismissed || isStandalone() || !location.protocol.startsWith('http')) return;
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setShow(true);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    if (isIOS()) {
      setIos(true);
      setShow(true);
    }
    return () => window.removeEventListener('beforeinstallprompt', onPrompt);
  }, []);

  const dismiss = () => {
    setShow(false);
    try {
      localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* ignora */
    }
  };

  if (!show) return null;
  return (
    <div className="install no-print" role="region" aria-label="Installa l’app">
      <img src="./icons/icon-192.png" alt="" width={44} height={44} className="install-icon" />
      <div className="install-text">
        <strong>Installa Oltre la reazione</strong>
        {ios ? (
          <span>
            In Safari tocca <span className="ios-share" aria-label="Condividi">⬆︎</span> Condividi (nelle versioni più recenti è nel menu ≡ accanto all’indirizzo), poi «Aggiungi alla schermata Home».
          </span>
        ) : (
          <span>Aggiungila alla schermata Home: si apre come un’app e funziona anche offline.</span>
        )}
      </div>
      {deferred && (
        <button
          className="btn btn-sm"
          onClick={async () => {
            await deferred.prompt();
            await deferred.userChoice;
            setDeferred(null);
            dismiss();
          }}
        >
          Installa
        </button>
      )}
      <button className="btn btn-ghost icon-btn" aria-label="Chiudi" onClick={dismiss}>
        <Icon name="close" />
      </button>
    </div>
  );
}
