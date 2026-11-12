import { createContext, useContext, useEffect, useReducer, useRef, useState, type ReactNode } from 'react';
import type { AppData } from '../types';
import { loadData, saveData, STORAGE_KEY } from './storage';
import { reducer, type Action } from './reducer';

interface Store {
  data: AppData;
  dispatch: (a: Action) => void;
  /** false se l'ultimo salvataggio locale è fallito */
  saveOk: boolean;
}

const Ctx = createContext<Store | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [data, dispatch] = useReducer(reducer, undefined, loadData);
  const [saveOk, setSaveOk] = useState(true);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setSaveOk(saveData(data));
  }, [data]);

  // Sincronizza più schede aperte sullo stesso dispositivo.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      if (!e.newValue) return dispatch({ type: 'resetAll' });
      try {
        dispatch({ type: 'import', data: JSON.parse(e.newValue) });
      } catch {
        /* valore non valido scritto da un'altra scheda: ignorato */
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return <Ctx.Provider value={{ data, dispatch, saveOk }}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error('useStore deve essere usato dentro AppStoreProvider');
  return s;
}
