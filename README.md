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

## App installabile (PWA)

L’app è una Progressive Web App: pubblicata a un indirizzo https si installa sulla schermata Home di iPhone e Android, con la propria icona, si apre a schermo intero e funziona anche offline. Diario e piano restano in localStorage, mai nella cache del service worker né in rete.

- Pubblicazione rapida: trascina `oltre-la-reazione-netlify.zip` (o la cartella `dist/`) su https://app.netlify.com/drop.
- iPhone: apri l’indirizzo in Safari → Condividi → «Aggiungi alla schermata Home».
- Android: Chrome propone «Installa app» (l’app mostra anche un pulsante dedicato).
- `npm run icons` rigenera le icone da `scripts/icon.svg`; `npm run single-file` crea `oltre-la-reazione.html`, versione in un solo file per il desktop (senza installazione né offline).

## Contenuti

Percorso di consapevolezza emotiva e responsabilità relazionale (gelosia, insicurezza, paura dell’abbandono, controllo, rabbia, fiducia), scritto in seconda persona.

| # | Laboratorio | Strumenti interattivi |
|---|---|---|
| 1 | Il mondo dentro di te | «Che cosa stai provando davvero?» · ciclo emotivo e comportamentale |
| 2 | Quando la mente costruisce una storia | Classificazione di fatti, interpretazioni, paure, conclusioni e impulsi (30 frasi) |
| 3 | Amore, fiducia e libertà | Bugia / omissione / dimenticanza · fiducia o sorveglianza |
| 4 | Dal bisogno al controllo | 10 situazioni × 3 modalità (sana, pressante, controllante) |
| 5 | Quando arriva la rabbia | Verifica di sicurezza, protocollo in 7 passi, piano di uscita, respiro |
| 6 | Cosa succede all’altra persona | Simulatore dei due circoli · doppio punto di vista |
| 7 | Due bisogni, due responsabilità | Avere / comunicare / pretendere / rispettare · costruttore di riparazione |
| 8 | Imparare a reagire diversamente | Cassetta di 9 strumenti con procedura guidata ed esercizio |
| 9 | Dalle parole ai comportamenti | Promessa generica o cambiamento osservabile · piano personale |

Ogni laboratorio ha: introduzione, meccanismi, concetti spiegati in 7 punti, esempi quotidiani, situazioni interattive, autoriflessione con feedback per ogni risposta, esercizi, approfondimento scientifico con etichette (evidenza / modello / ipotesi / pratica).

- 24 situazioni ramificate, 4 risposte iniziali ciascuna e due rami di prosecuzione; feedback specifico su te e su di lei per ogni risposta.
- Verifica di sicurezza: se segnala un rischio, gli esercizi e le situazioni ordinari del laboratorio 5 vengono sospesi finché non si legge il protocollo e si compila un piano di uscita.
- Modulo «Potrebbe essere il momento di chiedere aiuto?» con 15 punti espandibili, messaggio conclusivo e spiegazione della psicoterapia.
- Diario privato (crea, modifica, elimina, cerca, esporta, stampa), piano personale con gli 8 campi richiesti e verifica delle formulazioni vaghe (stampa/PDF, Markdown, copia), progressi, bibliografia, privacy (backup, importazione, eliminazione).

## Struttura

```
src/
  types.ts              modello dei dati
  content/              contenuti editoriali (modificabili senza toccare la UI)
    labs/               nove laboratori (lab1-3, lab4-6, lab7-9)
    scenarios/          24 situazioni ramificate (build.ts + data1–3) e lettura del percorso
    exercises.ts        23 esercizi guidati
    classifiers.ts, controlMatrix.ts, toolkit.ts, loops.ts, help.ts, emotions.ts, cycle.ts
    bibliography.ts     fonti
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
