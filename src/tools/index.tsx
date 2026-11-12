import type { ToolId } from '../types';
import { Breathing } from './Breathing';
import { DoublePerspective } from './DoublePerspective';
import { EmotionExplorer } from './EmotionExplorer';
import { FactsLab } from './FactsLab';
import { ImpactTool } from './ImpactTool';
import { ReactionCycle } from './ReactionCycle';
import { RepairBuilder } from './RepairBuilder';

export const toolMeta: Record<ToolId, { title: string; description: string; lab: string }> = {
  emozioni: {
    title: 'Esploratore delle emozioni',
    description: 'Otto famiglie emotive e le loro sfumature. Scegli le parole più precise per ciò che senti adesso.',
    lab: 'emozioni',
  },
  respiro: {
    title: 'Un minuto per il corpo',
    description: 'Una guida al respiro per abbassare l’attivazione prima di rispondere. Misura com’eri prima e dopo.',
    lab: 'corpo',
  },
  fatti: {
    title: 'Laboratorio fatti e interpretazioni',
    description: 'Allena l’occhio a distinguere ciò che è successo da ciò che ci diciamo, poi applicalo a un episodio tuo.',
    lab: 'fatti',
  },
  ciclo: {
    title: 'Il ciclo della reazione',
    description: 'Sette tappe, dall’innesco alla risposta dell’altro. Esplora il modello o ricostruisci un tuo episodio.',
    lab: 'ciclo',
  },
  prospettive: {
    title: 'Doppio punto di vista',
    description: 'La stessa scena, raccontata da te e immaginata dall’altra persona. Poi le due versioni affiancate.',
    lab: 'prospettive',
  },
  impatto: {
    title: 'Intenzione e impatto',
    description: 'Frasi che diciamo spesso sotto tensione: che cosa intendiamo, che cosa arriva, come si può dire diversamente.',
    lab: 'impatto',
  },
  riparazione: {
    title: 'Costruisci una riparazione',
    description: 'Quattro passaggi per una scusa che funziona, con una verifica delle formule che tendono a indebolirla.',
    lab: 'parole',
  },
};

export function ToolView({ tool }: { tool: ToolId }) {
  switch (tool) {
    case 'emozioni':
      return <EmotionExplorer />;
    case 'respiro':
      return <Breathing />;
    case 'fatti':
      return <FactsLab />;
    case 'ciclo':
      return <ReactionCycle />;
    case 'prospettive':
      return <DoublePerspective />;
    case 'impatto':
      return <ImpactTool />;
    case 'riparazione':
      return <RepairBuilder />;
  }
}
