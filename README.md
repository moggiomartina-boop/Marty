# Oltre la reazione

**Capire ciò che provi. Riconoscere ciò che provochi.**

Applicazione web (React + TypeScript + Vite) di consapevolezza emotiva e relazionale, organizzata in nove laboratori. Funziona interamente nel browser: nessun backend, nessun login, nessun dato inviato in rete. Diario, piano e progressi restano in `localStorage` sul dispositivo.

## Avvio

```bash
npm install
npm run dev        # sviluppo: http://localhost:5173
npm run build      # typecheck + build di produzione in dist/
npm run preview    # serve dist/ su http://localhost:4173
npm test           # test unitari (Vitest)
npm run typecheck  # solo controllo TypeScript
npm run e2e        # verifica end-to-end con Playwright (richiede `npm run preview` attivo)
```

La build usa percorsi relativi e `HashRouter`: `dist/` può essere pubblicata su qualsiasi hosting statico, anche in una sottocartella.

## Contenuti

| # | Laboratorio | Strumento interattivo |
|---|---|---|
| 1 | Dare un nome a ciò che provi | Esploratore delle emozioni |
| 2 | Il corpo arriva prima | Guida al respiro con misura prima/dopo |
| 3 | Fatti e interpretazioni | Quiz fatto/interpretazione + riformulazione |
| 4 | Il ciclo della reazione | Ciclo interattivo in 7 tappe (esplora / ricostruisci il tuo) |
| 5 | Doppio punto di vista | Scena a due colonne + confronto |
| 6 | Ciò che provochi | Intenzione e impatto di frasi frequenti |
| 7 | Ferite antiche, reazioni presenti | — (solo esercizi esplorativi, nessuna diagnosi) |
| 8 | Parole che riparano | Costruttore di riparazioni con verifica |
| 9 | Confini e cura di sé | — (confini, sicurezza, numeri utili) |

- 18 scenari ramificati (2 per laboratorio), ciascuno con 3 scelte iniziali che portano a 3 rami distinti, feedback su sé e sull’altro per ogni scelta, lettura del percorso e storico.
- 12 esercizi guidati a passi, con salvataggio e modifica delle risposte.
- Diario con creazione, modifica, eliminazione, ricerca, filtro per emozione, esportazione e stampa.
- Piano personale in 9 sezioni con salvataggio automatico, suggerimenti dagli esercizi, intenzioni “se… allora…”, stampa/PDF, esportazione Markdown e copia.
- Progressi, bibliografia con distinzione tra tipi di fonte, pagina privacy (backup/import/eliminazione), pagina sicurezza.

## Struttura

```
src/
  types.ts              modello dei dati
  content/              contenuti editoriali (modificabili senza toccare la UI)
    labs.ts             nove laboratori
    scenarios/          18 scenari ramificati (part1–3) + logica di lettura del percorso
    exercises.ts        esercizi guidati
    bibliography.ts     fonti
    emotions.ts, cycle.ts, factsQuiz.ts, impactPhrases.ts
  store/                stato (reducer + context), persistenza, selettori di progresso
  tools/                strumenti interattivi dei laboratori
  components/           layout, icone, UI riutilizzabile
  pages/                pagine/rotte
  utils/                esportazione, formattazione
  styles/global.css     design system e stili di stampa
tests/                  test unitari (integrità degli scenari, reducer, persistenza, export)
scripts/e2e.mjs         verifica end-to-end nel browser
```

## Principi

Nessuna diagnosi, nessuna etichetta morale, nessun punteggio di “tossicità”. Le affermazioni sono marcate come evidenza empirica, modello teorico, ipotesi interpretativa o pratica clinica. La bibliografia contiene solo opere note, senza DOI per evitare errori di trascrizione.
