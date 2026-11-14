/** Piccoli ornamenti SVG riutilizzabili (agrifoglio, stellina, divisore). */

export function Holly({ className = '', size = 28 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 17c-2-5-7-7-12-6 2 1 2 3 1 4 2 0 3 1 3 3 1-1 3-1 4 1 0-2 2-3 4-2z" fill="#2E5A47" />
      <path d="M16 17c2-5 7-7 12-6-2 1-2 3-1 4-2 0-3 1-3 3-1-1-3-1-4 1 0-2-2-3-4-2z" fill="#3B6E57" />
      <circle cx="13.5" cy="18.5" r="2.6" fill="#8E2638" />
      <circle cx="18.5" cy="18.5" r="2.6" fill="#A53245" />
      <circle cx="16" cy="15.4" r="2.6" fill="#8E2638" />
      <circle cx="15.2" cy="14.6" r="0.7" fill="#F7F0E3" opacity="0.6" />
    </svg>
  );
}

export function Sparkle({ className = '', size = 14 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z" fill="currentColor" />
    </svg>
  );
}

export function Divider({ className = '' }) {
  return (
    <svg className={`divider ${className}`} viewBox="0 0 220 16" aria-hidden="true">
      <path d="M0 8h88M132 8h88" stroke="currentColor" strokeWidth="0.8" />
      <path d="M110 1c1.2 4 3 5.8 7 7-4 1.2-5.8 3-7 7-1.2-4-3-5.8-7-7 4-1.2 5.8-3 7-7z" fill="currentColor" />
      <circle cx="94" cy="8" r="1.6" fill="currentColor" />
      <circle cx="126" cy="8" r="1.6" fill="currentColor" />
    </svg>
  );
}
