/** Icone lineari minimali, disegnate a mano per coerenza stilistica. */
const paths: Record<string, string> = {
  home: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z',
  labs: 'M4 5h7v7H4zM13 5h7v7h-7zM4 14h7v6H4zM13 14h7v6h-7z',
  journal: 'M6 3h11a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6zM6 3v18M10 8h6M10 12h6',
  plan: 'M9 4h6M9 4a1 1 0 0 0-1 1v1h8V5a1 1 0 0 0-1-1M8 6H6a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-2M9 13l2 2 4-4',
  progress: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  book: 'M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z',
  shield: 'M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z',
  arrowRight: 'M5 12h14M13 6l6 6-6 6',
  arrowLeft: 'M19 12H5M11 6l-6 6 6 6',
  plus: 'M12 5v14M5 12h14',
  edit: 'M4 20h4L19 9l-4-4L4 16zM14 6l4 4',
  trash: 'M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3',
  download: 'M12 4v11M7 10l5 5 5-5M5 20h14',
  upload: 'M12 20V9M7 14l5-5 5 5M5 4h14',
  print: 'M7 9V3h10v6M7 17H5a1 1 0 0 1-1-1v-5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a1 1 0 0 1-1 1h-2M7 14h10v7H7z',
  check: 'M5 12.5 10 17l9-10',
  refresh: 'M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7',
  more: 'M5 12h.01M12 12h.01M19 12h.01',
  copy: 'M9 9h10v11H9zM5 15V4h10',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4',
  close: 'M6 6l12 12M18 6 6 18',
  leaf: 'M5 19c0-9 6-14 15-14 0 9-5 15-14 15M5 19l7-7',
  lock: 'M6 11h12v9H6zM8 11V8a4 4 0 0 1 8 0v3',
};

export type IconName = keyof typeof paths;

export function Icon({ name, size, title }: { name: IconName; size?: number; title?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title && <title>{title}</title>}
      <path d={paths[name]} />
    </svg>
  );
}

/** Marchio: due onde che si incontrano, una in petrolio e una in terracotta. */
export function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill="#1f4e5a" />
      <path d="M6 18c3-5 6-5 9 0s6 5 11 0" fill="none" stroke="#f8f4ec" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 13c3-3 6-3 9 0" fill="none" stroke="#c27e66" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
