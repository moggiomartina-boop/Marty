import type { Lab } from '../../types';
import { labs1to3 } from './lab1-3';
import { labs4to6 } from './lab4-6';
import { labs7to9 } from './lab7-9';

export const labs: Lab[] = [...labs1to3, ...labs4to6, ...labs7to9];

export const labById = (id: string) => labs.find((l) => l.id === id);

/** I nove laboratori in tre movimenti. */
export const movements = [
  { title: 'Capire ciò che provi', labs: ['mondo-interiore', 'storie', 'fiducia'] },
  { title: 'Riconoscere ciò che provochi', labs: ['controllo', 'rabbia', 'altra-persona'] },
  { title: 'Scegliere come comportarti', labs: ['due-bisogni', 'reagire', 'comportamenti'] },
] as const;
