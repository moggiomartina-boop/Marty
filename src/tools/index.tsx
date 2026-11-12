import { Link } from 'react-router-dom';
import type { ToolId } from '../types';
import { Breathing } from './Breathing';
import { Classifier } from './Classifier';
import { ControlMatrix } from './ControlMatrix';
import { DoublePerspective } from './DoublePerspective';
import { LoopSimulator } from './LoopSimulator';
import { ReactionCycle } from './ReactionCycle';
import { RepairBuilder } from './RepairBuilder';
import { AngerProtocol } from './Safety';
import { Toolkit } from './Toolkit';
import { WhatYouFeel } from './WhatYouFeel';

export const toolMeta: Record<ToolId, { title: string; description: string; lab: string }> = {
  sentire: { title: 'Che cosa stai provando davvero?', description: 'Separa l’emozione in superficie da ciò che c’è sotto, poi il pensiero, l’impulso e il comportamento che scegli.', lab: 'mondo-interiore' },
  ciclo: { title: 'Il ciclo emotivo e comportamentale', description: 'Sette tappe, dalla situazione alla conseguenza. Esplora il modello o ricostruisci un tuo episodio.', lab: 'mondo-interiore' },
  storie: { title: 'Classifica: fatti, interpretazioni, paure, conclusioni, impulsi', description: 'Sei situazioni quotidiane scomposte in cinque livelli, con il ragionamento per ogni scelta.', lab: 'storie' },
  fiducia: { title: 'Fiducia, omissioni, sorveglianza', description: 'Distingui i tipi di mancata sincerità, e i comportamenti che costruiscono fiducia da quelli che diventano sorveglianza.', lab: 'fiducia' },
  controllo: { title: 'Dieci situazioni, tre modalità', description: 'Per ogni situazione: comunicazione sana, richiesta pressante, comportamento controllante. E la tua versione.', lab: 'controllo' },
  protocollo: { title: 'Verifica di sicurezza e protocollo', description: 'Alcune domande dirette, il protocollo in sette passi e il tuo piano di uscita.', lab: 'rabbia' },
  respiro: { title: 'Respiro guidato', description: 'Un’espirazione più lunga per abbassare l’attivazione prima di rispondere.', lab: 'reagire' },
  circolo: { title: 'I due circoli', description: 'Segui il tuo circolo e quello di lei passo per passo, e scegli dove interromperlo.', lab: 'altra-persona' },
  prospettive: { title: 'La stessa scena, due punti di vista', description: 'Racconta una scena e poi immagina come l’ha vissuta lei. Infine confronta le due versioni.', lab: 'altra-persona' },
  bisogni: { title: 'Avere, comunicare, pretendere, rispettare', description: 'Classifica frasi quotidiane nei quattro passaggi tra un bisogno e il limite dell’altra persona.', lab: 'due-bisogni' },
  riparazione: { title: 'Costruisci una riparazione', description: 'Quattro passaggi per una scusa che riconosce l’impatto, senza “ma”, con un impegno concreto.', lab: 'due-bisogni' },
  cassetta: { title: 'La cassetta dei nove strumenti', description: 'Spiegazione, quando usarlo, procedura guidata, esempio ed esercizio per ognuno.', lab: 'reagire' },
  promesse: { title: 'Promessa generica o cambiamento osservabile?', description: 'Allena l’occhio a riconoscere le promesse vaghe, poi costruisci il tuo piano.', lab: 'comportamenti' },
};

export function ToolView({ tool }: { tool: ToolId }) {
  switch (tool) {
    case 'sentire':
      return <WhatYouFeel />;
    case 'ciclo':
      return <ReactionCycle />;
    case 'storie':
      return <Classifier setId="storie" tool="storie" />;
    case 'fiducia':
      return (
        <div className="grid" style={{ gap: 36 }}>
          <Classifier setId="omissioni" tool="fiducia" />
          <Classifier setId="sorveglianza" tool="fiducia" />
        </div>
      );
    case 'controllo':
      return <ControlMatrix />;
    case 'protocollo':
      return <AngerProtocol />;
    case 'respiro':
      return <Breathing />;
    case 'circolo':
      return <LoopSimulator />;
    case 'prospettive':
      return <DoublePerspective />;
    case 'bisogni':
      return <Classifier setId="bisogni" tool="bisogni" />;
    case 'riparazione':
      return <RepairBuilder />;
    case 'cassetta':
      return <Toolkit />;
    case 'promesse':
      return (
        <div>
          <Classifier setId="promesse" tool="promesse" />
          <div className="card card-quiet" style={{ marginTop: 24 }}>
            <h3>Ora il tuo piano</h3>
            <p className="muted">Usa ciò che hai visto per scrivere comportamenti osservabili. Il piano ti segnala le formulazioni troppo vaghe.</p>
            <Link to="/piano" className="btn">
              Apri il piano personale
            </Link>
          </div>
        </div>
      );
  }
}
