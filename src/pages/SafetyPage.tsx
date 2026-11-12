import { Link } from 'react-router-dom';
import { PageHead } from '../components/Layout';

export function SafetyPage() {
  return (
    <div className="container read">
      <PageHead
        eyebrow="Sicurezza e aiuto"
        title="Quando serve di più"
        lead="Questo percorso aiuta a osservare le proprie reazioni. Ci sono situazioni in cui non basta, e in cui la priorità è un’altra."
      />
      <div className="card card-petrol" style={{ marginBottom: 18 }}>
        <h2 style={{ fontSize: '1.4rem' }}>Se sei in pericolo adesso</h2>
        <p style={{ marginBottom: 8 }}>
          Chiama il <strong>112</strong>, numero unico di emergenza.
        </p>
        <p style={{ margin: 0 }}>
          <strong>1522</strong> — numero antiviolenza e anti-stalking, gratuito, attivo 24 ore su 24, anche in forma anonima.
        </p>
      </div>
      <div className="prose">
        <h2>Quando non si tratta di comunicazione</h2>
        <p>
          Minacce, controllo sistematico (del telefono, dei soldi, delle frequentazioni), umiliazioni ripetute, violenza fisica o sessuale non sono
          problemi di stile comunicativo. In questi casi non è tuo compito “reagire meglio” per evitare il comportamento dell’altra persona, e gli
          strumenti di questo percorso non sono adatti a gestirli.
        </p>
        <h2>Se sono le tue reazioni a preoccuparti</h2>
        <p>
          Se ti accorgi di reazioni che mettono a rischio te o altre persone — gesti violenti, rotture di oggetti, minacce, guida pericolosa,
          perdita di controllo frequente — rivolgerti a uno psicologo, a uno psicoterapeuta o al tuo medico di base è un atto di responsabilità. In
          Italia puoi chiedere informazioni anche ai servizi di salute mentale e ai consultori del territorio.
        </p>
        <h2>Se stai molto male</h2>
        <p>
          Se hai pensieri di farti del male, non restare solo/a: parla subito con una persona di fiducia, contatta il tuo medico o chiama il 112.
        </p>
        <div className="note">
          Oltre la reazione non raccoglie dati e non può contattarti: queste informazioni sono qui per te, da usare quando e se ti servono.
        </div>
      </div>
      <Link to="/laboratori/confini" className="btn btn-secondary">
        Vai al laboratorio “Confini e cura di sé”
      </Link>
    </div>
  );
}
