/**
 * Ghirlanda di lucine calde appesa in alto, con scintillio alternato.
 */
const BULBS = [
  [6, 18], [16, 30], [27, 38], [38, 42], [50, 43], [62, 42], [73, 38], [84, 30], [94, 18],
];
const COLORS = ['#F3D58B', '#E9A35A', '#F7F0E3', '#D96B5F', '#F3D58B', '#E9A35A', '#F7F0E3', '#D96B5F', '#F3D58B'];

export default function StringLights() {
  return (
    <svg className="lights" viewBox="0 0 100 50" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 6 Q50 62 100 6" fill="none" stroke="#0d2620" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
      {BULBS.map(([x, y], i) => (
        <g key={i} className="bulb" style={{ animationDelay: `${(i % 3) * 0.7}s` }}>
          <ellipse cx={x} cy={y + 3} rx="2.4" ry="3.6" fill={COLORS[i]} opacity="0.25" className="bulb-glow" />
          <rect x={x - 0.5} y={y - 1.4} width="1" height="1.6" fill="#3b2a1c" />
          <ellipse cx={x} cy={y + 1.8} rx="0.9" ry="1.6" fill={COLORS[i]} />
        </g>
      ))}
    </svg>
  );
}
