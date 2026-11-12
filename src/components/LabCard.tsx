import { Link } from 'react-router-dom';
import type { Lab } from '../types';
import { useStore } from '../store/AppStore';
import { labProgress } from '../store/selectors';
import { Bar } from './ui';

export function LabCard({ lab, compact }: { lab: Lab; compact?: boolean }) {
  const { data } = useStore();
  const p = labProgress(data, lab.id);
  return (
    <Link to={`/laboratori/${lab.id}`} className={`card card-link lab-card accent-${lab.accent}`}>
      <span className="lab-num">{String(lab.number).padStart(2, '0')}</span>
      <span className="lab-sub">{lab.subtitle}</span>
      <h3>{lab.title}</h3>
      {!compact && <p>{lab.summary}</p>}
      {compact && <p style={{ fontStyle: 'italic', fontFamily: 'var(--serif)' }}>{lab.question}</p>}
      <div className="lab-foot">
        <Bar value={p.ratio} label={`Avanzamento ${lab.title}`} />
        <span>{Math.round(p.ratio * 100)}%</span>
      </div>
    </Link>
  );
}
