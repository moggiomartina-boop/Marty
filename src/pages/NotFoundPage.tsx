import { Link } from 'react-router-dom';
import { PageHead } from '../components/Layout';

export function NotFoundPage({ message }: { message?: string }) {
  return (
    <div className="container read">
      <PageHead eyebrow="Pagina non trovata" title="Questa strada non porta da nessuna parte" lead={message ?? 'Il contenuto che cercavi non esiste o è stato spostato.'} />
      <div className="row">
        <Link to="/" className="btn">
          Torna all’inizio
        </Link>
        <Link to="/laboratori" className="btn btn-secondary">
          Vai ai laboratori
        </Link>
      </div>
    </div>
  );
}
