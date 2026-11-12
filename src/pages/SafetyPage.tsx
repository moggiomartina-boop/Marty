import { Link } from 'react-router-dom';
import { PageHead } from '../components/Layout';
import { protocolSteps } from '../tools/Safety';

export function SafetyPage() {
  return (
    <div className="container read">
      <PageHead
        eyebrow="Sicurezza e aiuto"
        title="Quando la priorità è la sicurezza"
        lead="Questo percorso aiuta a riconoscere e cambiare i propri comportamenti. Ci sono situazioni in cui, prima di tutto, serve fermarsi, prendere distanza e chiedere un aiuto professionale."
      />
      <div className="card card-petrol" style={{ marginBottom: 18 }}>
        <h2 style={{ fontSize: '1.4rem' }}>Se c’è un pericolo adesso</h2>
        <p style={{ marginBottom: 8 }}>
          Chiama il <strong>112</strong>, numero unico di emergenza.
        </p>
        <p style={{ margin: 0 }}>
          Se sei tu a sentire di poter perdere il controllo: allontanati subito, in un luogo dove non puoi fare del male a nessuno, e non cercare l’altra persona.
        </p>
      </div>
      <div className="prose">
        <h2>Se ti accorgi di aver messo in atto comportamenti intimidatori o violenti</h2>
        <p>
          Afferrare, spingere, bloccare una porta, seguire, simulare un colpo, colpire oggetti vicino a lei, minacciare: sono comportamenti che producono paura e che
          non vengono giustificati dalla rabbia o dalla provocazione. Riconoscerli è il primo passo; il secondo è cercare un aiuto specifico.
        </p>
        <p>
          In Italia esistono servizi e centri dedicati a chi vuole interrompere comportamenti violenti nelle relazioni. Puoi chiedere informazioni al tuo medico di base,
          a un consultorio familiare o ai servizi di salute mentale del territorio, oppure a uno psicologo o psicoterapeuta. Rivolgerti a loro è un atto di
          responsabilità, non un’ammissione di essere una persona sbagliata.
        </p>
        <h2>Il protocollo, in breve</h2>
        <ol className="protocol">
          {protocolSteps.map((s) => (
            <li key={s.title}>
              <strong>{s.title}.</strong> {s.why}
            </li>
          ))}
        </ol>
        <h2>Per la tua partner</h2>
        <p>
          Se lei ha bisogno di sostegno, in Italia il <strong>1522</strong> è il numero gratuito antiviolenza e anti-stalking, attivo 24 ore su 24. È un servizio per lei,
          che lei può scegliere di usare: non è uno strumento da proporle per gestire il conflitto.
        </p>
        <h2>Se stai molto male</h2>
        <p>
          Se hai pensieri di farti del male, non restare solo: parla subito con una persona di fiducia, contatta il tuo medico o chiama il 112. Minacciare di farsi
          del male per far restare qualcuno è anche una forma di pressione: se ti riconosci in questo, è importante parlarne con un professionista.
        </p>
        <div className="note">Oltre la reazione non raccoglie dati e non può contattarti. Queste informazioni sono qui per te, da usare quando e se ti servono.</div>
      </div>
      <div className="row">
        <Link to="/laboratori/rabbia?tab=strumenti" className="btn">
          Verifica di sicurezza e protocollo
        </Link>
        <Link to="/aiuto" className="btn btn-secondary">
          Potrebbe essere il momento di chiedere aiuto?
        </Link>
      </div>
    </div>
  );
}
