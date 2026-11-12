import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import type { EvidenceKind } from '../types';
import { Icon, type IconName } from './Icon';

/* ---------- Badge di evidenza ---------- */

const evidenceLabel: Record<EvidenceKind, { label: string; cls: string; hint: string }> = {
  modello: { label: 'Modello teorico', cls: 'tag-petrol', hint: 'Una cornice concettuale utile per leggere l’esperienza.' },
  evidenza: { label: 'Evidenza empirica', cls: 'tag-sage', hint: 'Risultati di ricerca, con i limiti indicati.' },
  ipotesi: { label: 'Ipotesi interpretativa', cls: 'tag-terra', hint: 'Una lettura possibile, da verificare su di sé.' },
  pratica: { label: 'Pratica clinica', cls: '', hint: 'Tecnica usata in contesti strutturati, efficacia variabile.' },
};

export function EvidenceBadge({ kind }: { kind: EvidenceKind }) {
  const e = evidenceLabel[kind];
  return (
    <span className={`tag ${e.cls}`} title={e.hint}>
      {e.label}
    </span>
  );
}

/* ---------- Anello di progresso ---------- */

export function ProgressRing({
  value,
  size = 56,
  stroke = 5,
  label,
  textColor = 'var(--ink-2)',
  trackColor = 'var(--sand-200)',
}: {
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
  textColor?: string;
  trackColor?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(1, value));
  return (
    <div style={{ position: 'relative', width: size, height: size, flex: 'none' }} role="img" aria-label={label ?? `${Math.round(v * 100)}% completato`}>
      <svg width={size} height={size} className="ring">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--accent, var(--sage-500))"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - v)}
        />
      </svg>
      <span
        style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontSize: size > 60 ? '1rem' : '0.75rem', fontWeight: 600, color: textColor }}
        aria-hidden="true"
      >
        {Math.round(v * 100)}%
      </span>
    </div>
  );
}

export function Bar({ value, label }: { value: number; label: string }) {
  return (
    <div className="bar" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(value * 100)}>
      <span style={{ width: `${Math.max(0, Math.min(1, value)) * 100}%` }} />
    </div>
  );
}

/* ---------- Stato vuoto ---------- */

export function EmptyState({ icon = 'leaf', title, children, action }: { icon?: IconName; title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="empty">
      <Icon name={icon} />
      <h3>{title}</h3>
      {children && <p className="muted" style={{ maxWidth: 440, margin: '0 auto 18px' }}>{children}</p>}
      {action}
    </div>
  );
}

/* ---------- Dialog di conferma ---------- */

export function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel = 'Conferma',
  danger,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  children?: ReactNode;
  confirmLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  useEffect(() => {
    if (!open) return;
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onCancel();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onCancel]);
  if (!open) return null;
  return (
    <div className="dialog-backdrop" onClick={onCancel}>
      <div className="dialog" role="alertdialog" aria-modal="true" aria-labelledby={titleId} onClick={(e) => e.stopPropagation()}>
        <h3 id={titleId}>{title}</h3>
        {children && <div className="muted" style={{ marginBottom: 20 }}>{children}</div>}
        <div className="row" style={{ justifyContent: 'flex-end' }}>
          <button className="btn btn-secondary" onClick={onCancel}>
            Annulla
          </button>
          <button ref={ref} className={`btn ${danger ? 'btn-danger-solid' : ''}`} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Campi di input ---------- */

export function ChipSelect({
  options,
  value,
  onChange,
  max,
  label,
}: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
  max?: number;
  label: string;
}) {
  const toggle = (o: string) => {
    if (value.includes(o)) onChange(value.filter((x) => x !== o));
    else if (!max || value.length < max) onChange([...value, o]);
  };
  return (
    <div className="chips" role="group" aria-label={label}>
      {options.map((o) => (
        <button type="button" key={o} className="chip" aria-pressed={value.includes(o)} onClick={() => toggle(o)}>
          {o}
        </button>
      ))}
    </div>
  );
}

export function SingleSelect({ options, value, onChange, label }: { options: string[]; value: string; onChange: (v: string) => void; label: string }) {
  return (
    <div className="chips" role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button type="button" role="radio" key={o} className="chip" aria-checked={value === o} onClick={() => onChange(o)}>
          {o}
        </button>
      ))}
    </div>
  );
}

export function Scale({
  value,
  onChange,
  min = 0,
  max = 10,
  minLabel,
  maxLabel,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  minLabel?: string;
  maxLabel?: string;
  label: string;
}) {
  return (
    <div className="scale">
      <span className="scale-value" aria-hidden="true">
        {value}
      </span>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} aria-label={label} />
      <div className="scale-labels">
        <span>{minLabel ?? min}</span>
        <span>{maxLabel ?? max}</span>
      </div>
    </div>
  );
}

/** Editor di liste di stringhe (piano personale). */
export function ListEditor({
  items,
  onChange,
  placeholder,
  suggestions = [],
  label,
}: {
  items: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
  label: string;
}) {
  const [draft, setDraft] = useState('');
  const add = (v: string) => {
    const t = v.trim();
    if (!t || items.includes(t)) return;
    onChange([...items, t]);
    setDraft('');
  };
  const unused = suggestions.filter((s) => !items.includes(s));
  return (
    <div className="list-editor">
      {items.map((it, i) => (
        <div className="item" key={i}>
          <input
            className="input"
            value={it}
            aria-label={`${label}, voce ${i + 1}`}
            onChange={(e) => onChange(items.map((x, j) => (j === i ? e.target.value : x)))}
          />
          <button type="button" className="btn btn-ghost icon-btn" aria-label={`Rimuovi voce ${i + 1}`} onClick={() => onChange(items.filter((_, j) => j !== i))}>
            <Icon name="close" />
          </button>
        </div>
      ))}
      <div className="item">
        <input
          className="input"
          value={draft}
          placeholder={placeholder}
          aria-label={`Aggiungi a: ${label}`}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              add(draft);
            }
          }}
        />
        <button type="button" className="btn btn-secondary icon-btn" aria-label="Aggiungi" onClick={() => add(draft)} disabled={!draft.trim()}>
          <Icon name="plus" />
        </button>
      </div>
      {unused.length > 0 && (
        <div className="chips" style={{ marginTop: 6 }} aria-label="Suggerimenti">
          {unused.map((s) => (
            <button type="button" key={s} className="chip" style={{ fontSize: '0.8rem', minHeight: 30, padding: '4px 12px' }} onClick={() => add(s)}>
              + {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
