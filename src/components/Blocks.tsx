import { Link } from 'react-router-dom';
import { sourceById } from '../content/bibliography';
import type { Block } from '../types';
import { EvidenceBadge } from './ui';

/** Rendering dei blocchi editoriali dei laboratori. */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose">
      {blocks.map((b, i) => {
        switch (b.kind) {
          case 'p':
            return <p key={i}>{b.text}</p>;
          case 'quote':
            return (
              <blockquote key={i} className="pullquote">
                {b.text}
              </blockquote>
            );
          case 'list':
            return (
              <ul key={i}>
                {b.items?.map((it) => <li key={it}>{it}</li>)}
              </ul>
            );
          case 'warning':
            return (
              <div key={i} className="warning-block" role="note">
                {b.text}
              </div>
            );
          case 'note':
            return (
              <div key={i} className="note" role="note">
                {b.text}
              </div>
            );
          case 'evidence': {
            const src = b.source ? sourceById(b.source) : undefined;
            return (
              <aside key={i} className="evidence">
                <div className="evidence-head">
                  {b.evidence && <EvidenceBadge kind={b.evidence} />}
                  {src && (
                    <Link to={`/bibliografia#${src.id}`} className="src">
                      {src.authors.split(',')[0]} ({src.year})
                    </Link>
                  )}
                </div>
                <p>{b.text}</p>
              </aside>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}
