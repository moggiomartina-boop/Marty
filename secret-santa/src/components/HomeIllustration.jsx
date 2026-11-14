/**
 * Illustrazione della homepage: collina innevata, abeti decorati,
 * pacchetti regalo con nastri rossi, stelle e luna. SVG inline, nessun file.
 */
function Fir({ x, y, s = 1, tone = '#1F4A3C', dark = '#143329', ornaments = [], star = false }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-4" y="-6" width="8" height="12" fill="#5A3B26" />
      <path d="M0-112 L-26-70 H-14 L-38-38 H-22 L-48 0 H48 L22-38 H38 L14-70 H26 Z" fill={tone} />
      <path d="M0-112 L-26-70 H-14 L-38-38 H-22 L-48 0 H0 Z" fill={dark} opacity="0.55" />
      {/* neve sui rami */}
      <path d="M-26-70 q6 4 12 0 q6 3 14 0 q6 3 14 0 q6 4 12 0" fill="none" stroke="#F7F0E3" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
      <path d="M-38-38 q8 5 16 0 q10 4 22 0 q10 4 22 0 q8 5 16 0" fill="none" stroke="#F7F0E3" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
      <path d="M-48 0 q10 5 20 0 q14 5 28 0 q14 5 28 0 q10 5 20 0" fill="none" stroke="#F7F0E3" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      {ornaments.map(([ox, oy, c], i) => (
        <circle key={i} cx={ox} cy={oy} r="3.2" fill={c} className="ornament" style={{ animationDelay: `${i * 0.45}s` }} />
      ))}
      {star && (
        <path className="tree-star" d="M0-128 l3.5 8 8.5.7-6.5 5.6 2 8.4L0-109.8l-7.5 4.5 2-8.4-6.5-5.6 8.5-.7z" fill="#D6B879" />
      )}
    </g>
  );
}

function Gift({ x, y, w, h, box, ribbon, bow = true }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={0} y={-h} width={w} height={h} rx="2" fill={box} />
      <rect x={-2} y={-h - 6} width={w + 4} height={8} rx="2" fill={box} />
      <rect x={-2} y={-h - 6} width={w + 4} height={8} rx="2" fill="#000" opacity="0.12" />
      <rect x={w / 2 - 3} y={-h - 6} width={6} height={h + 6} fill={ribbon} />
      {bow && (
        <g transform={`translate(${w / 2} ${-h - 7})`}>
          <path d="M0 0 C-10 -12 -18 -2 -10 2 C-6 4 -2 2 0 0Z" fill={ribbon} />
          <path d="M0 0 C10 -12 18 -2 10 2 C6 4 2 2 0 0Z" fill={ribbon} />
          <circle r="2.6" fill={ribbon} />
        </g>
      )}
    </g>
  );
}

export default function HomeIllustration() {
  return (
    <svg className="home-illustration" viewBox="0 0 320 210" role="img" aria-label="Abeti innevati e pacchetti regalo">
      <defs>
        <radialGradient id="moonGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#F7F0E3" stopOpacity="0.55" />
          <stop offset="1" stopColor="#F7F0E3" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F7F0E3" />
          <stop offset="1" stopColor="#E6DCC8" />
        </linearGradient>
      </defs>

      {/* luna e stelle */}
      <circle cx="262" cy="40" r="34" fill="url(#moonGlow)" />
      <circle cx="262" cy="40" r="13" fill="#F4E9D2" />
      <circle cx="268" cy="36" r="11" fill="#173D32" opacity="0.9" />
      {[[40, 30, 1], [78, 14, 0.7], [120, 40, 0.8], [205, 18, 1], [300, 92, 0.7], [22, 88, 0.6], [180, 60, 0.6]].map(([cx, cy, s], i) => (
        <path key={i} className="twinkle" style={{ animationDelay: `${i * 0.6}s` }}
          transform={`translate(${cx} ${cy}) scale(${s})`}
          d="M0-6c.6 4 2 5.4 6 6-4 .6-5.4 2-6 6-.6-4-2-5.4-6-6 4-.6 5.4-2 6-6z" fill="#D6B879" />
      ))}

      {/* collina innevata: un cumulo morbido con ombra, senza bordi netti */}
      <ellipse cx="160" cy="200" rx="150" ry="9" fill="#0E2720" opacity="0.45" />
      <path d="M14 194 C50 170 110 166 160 170 C215 166 270 172 306 194 C250 206 70 206 14 194Z" fill="url(#hill)" />

      <Fir x={70} y={178} s={0.72} tone="#21503F" ornaments={[[-14, -52, '#8E2638'], [12, -24, '#D6B879'], [-20, -10, '#D6B879']]} />
      <Fir x={250} y={176} s={0.66} tone="#21503F" ornaments={[[10, -54, '#D6B879'], [-14, -22, '#8E2638'], [22, -8, '#D6B879']]} />
      <Fir x={160} y={180} s={1.12} tone="#2A5E4A" dark="#173D32" star
        ornaments={[[-8, -86, '#D6B879'], [10, -64, '#8E2638'], [-16, -52, '#F7F0E3'], [18, -34, '#D6B879'], [-26, -18, '#8E2638'], [4, -14, '#D6B879'], [30, -6, '#F7F0E3']]} />

      {/* regali */}
      <Gift x={104} y={190} w={34} h={26} box="#8E2638" ribbon="#D6B879" />
      <Gift x={140} y={192} w={22} h={18} box="#F7F0E3" ribbon="#8E2638" />
      <Gift x={186} y={191} w={28} h={30} box="#D6B879" ribbon="#8E2638" />
      <Gift x={216} y={192} w={20} h={14} box="#2A5E4A" ribbon="#D6B879" bow={false} />
    </svg>
  );
}
