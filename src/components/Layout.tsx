import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useStore } from '../store/AppStore';
import { BrandMark, Icon } from './Icon';
import { InstallPrompt } from './InstallPrompt';

const nav = [
  { to: '/', label: 'Inizio', end: true },
  { to: '/laboratori', label: 'Laboratori' },
  { to: '/scenari', label: 'Situazioni' },
  { to: '/diario', label: 'Diario' },
  { to: '/piano', label: 'Piano' },
  { to: '/progressi', label: 'Progressi' },
  { to: '/aiuto', label: 'Chiedere aiuto' },
];

const tabs = [
  { to: '/', label: 'Inizio', icon: 'home', end: true },
  { to: '/laboratori', label: 'Laboratori', icon: 'labs' },
  { to: '/scenari', label: 'Situazioni', icon: 'scenes' },
  { to: '/diario', label: 'Diario', icon: 'journal' },
] as const;

/** Sezioni raggiungibili dal pulsante "Altro" della barra mobile. */
const moreLinks = [
  { to: '/piano', label: 'Il mio piano', hint: 'Il piano personale di cambiamento', icon: 'plan' },
  { to: '/progressi', label: 'Progressi', hint: 'Laboratori, situazioni, diario', icon: 'progress' },
  { to: '/aiuto', label: 'Chiedere aiuto', hint: '15 motivi per iniziare un percorso', icon: 'leaf' },
  { to: '/sicurezza', label: 'Sicurezza e aiuto', hint: 'Protocollo e contatti utili', icon: 'shield' },
  { to: '/bibliografia', label: 'Bibliografia', hint: 'Fonti e criteri', icon: 'book' },
  { to: '/dati', label: 'Privacy e dati', hint: 'Backup, importazione, eliminazione', icon: 'lock' },
] as const;

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const { saveOk } = useStore();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreActive = moreLinks.some((l) => pathname.startsWith(l.to));

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!moreOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMoreOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [moreOpen]);

  return (
    <>
      <a href="#contenuto" className="skip-link">
        Vai al contenuto
      </a>
      <header className="app-header">
        <div className="app-header-inner">
          <Link to="/" className="brand" aria-label="Oltre la reazione, inizio">
            <BrandMark />
            <span className="brand-name">Oltre la reazione</span>
          </Link>
          <nav className="main-nav" aria-label="Navigazione principale">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end}>
                {n.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      {!saveOk && (
        <div className="container no-print" style={{ marginTop: 12 }}>
          <div className="banner" role="alert">
            Il salvataggio locale non è riuscito: il browser potrebbe avere lo spazio pieno o la memoria disabilitata (navigazione privata). Esporta i tuoi dati per non perderli.
          </div>
        </div>
      )}
      <main id="contenuto" className="app-main" tabIndex={-1}>
        {children}
        <footer className="app-footer no-print">
          <div className="container">
            <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <p style={{ maxWidth: 520, margin: 0 }}>
                <strong>Oltre la reazione</strong> è uno strumento di consapevolezza e di responsabilità relazionale. Non sostituisce uno
                psicologo e non fornisce diagnosi. I tuoi dati restano su questo dispositivo. In caso di pericolo: 112.
              </p>
              <div className="row" style={{ gap: 18 }}>
                <Link to="/sicurezza">Sicurezza e aiuto</Link>
                <Link to="/dati">Privacy e dati</Link>
                <Link to="/aiuto">Chiedere aiuto</Link>
                <Link to="/bibliografia">Bibliografia</Link>
                <Link to="/benvenuto">Il metodo</Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
      <InstallPrompt />
      <nav className="tabbar no-print" aria-label="Navigazione rapida">
        {tabs.map((t) => (
          <NavLink key={t.to} to={t.to} end={'end' in t ? t.end : undefined}>
            <Icon name={t.icon} />
            {t.label}
          </NavLink>
        ))}
        <button
          type="button"
          className={`tab-more ${moreOpen || moreActive ? 'active' : ''}`}
          aria-expanded={moreOpen}
          aria-controls="menu-altro"
          onClick={() => setMoreOpen((o) => !o)}
        >
          <Icon name="dots" />
          Altro
        </button>
      </nav>
      {moreOpen && (
        <div className="sheet-backdrop no-print" onClick={() => setMoreOpen(false)}>
          <nav id="menu-altro" className="sheet" aria-label="Altre sezioni" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-handle" aria-hidden="true" />
            {moreLinks.map((l) => (
              <NavLink key={l.to} to={l.to} className="sheet-link" onClick={() => setMoreOpen(false)}>
                <Icon name={l.icon} />
                <span>
                  <strong>{l.label}</strong>
                  <small>{l.hint}</small>
                </span>
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

export function PageHead({ eyebrow, title, lead, children }: { eyebrow?: string; title: string; lead?: string; children?: ReactNode }) {
  useEffect(() => {
    document.title = `${title} — Oltre la reazione`;
  }, [title]);
  return (
    <div className="page-head">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h1>{title}</h1>
      {lead && <p className="lead">{lead}</p>}
      {children}
    </div>
  );
}
