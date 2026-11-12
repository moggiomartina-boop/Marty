import { LabCard } from '../components/LabCard';
import { PageHead } from '../components/Layout';
import { labs, movements } from '../content/labs';

export function LabsPage() {
  return (
    <div className="container">
      <PageHead
        eyebrow="Nove laboratori, tre movimenti"
        title="Laboratori"
        lead="Ogni laboratorio unisce lettura, strumenti interattivi, scenari ramificati ed esercizi guidati. Puoi seguirli in ordine o scegliere quello che senti più vicino."
      />
      {movements.map((m, i) => (
        <section key={m.title} style={{ marginBottom: 36 }} aria-label={m.title}>
          <span className="eyebrow">
            {['I', 'II', 'III'][i]} — {m.title}
          </span>
          <div className="grid grid-3">
            {m.labs.map((id) => (
              <LabCard key={id} lab={labs.find((l) => l.id === id)!} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
