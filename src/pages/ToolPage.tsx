import { Link, useParams } from 'react-router-dom';
import { PageHead } from '../components/Layout';
import { labById } from '../content/labs';
import { ToolView, toolMeta } from '../tools';
import type { ToolId } from '../types';
import { NotFoundPage } from './NotFoundPage';

export function ToolPage() {
  const { toolId = '' } = useParams();
  if (!(toolId in toolMeta)) return <NotFoundPage message="Questo strumento non esiste." />;
  const id = toolId as ToolId;
  const meta = toolMeta[id];
  const lab = labById(meta.lab);
  return (
    <div className="container">
      <nav className="breadcrumb" style={{ paddingTop: 24 }} aria-label="Percorso">
        {lab && (
          <>
            <Link to={`/laboratori/${lab.id}`}>
              Laboratorio {lab.number} · {lab.title}
            </Link>{' '}
            / Strumento
          </>
        )}
      </nav>
      <PageHead eyebrow="Strumento interattivo" title={meta.title} lead={meta.description} />
      <ToolView tool={id} />
    </div>
  );
}
