# 🎅 Secret Santa – The Christmas Draw

Una web app natalizia, mobile first, per l'estrazione del Secret Santa tra
**Martina, Rebecca, Giulia, Sofia, Nicolò, Marco, Federico e Luca**.

React + Vite, CSS puro, `lucide-react` per le icone. Nessun'altra dipendenza.

---

## 1. Architettura

```
┌──────────── Browser (React) ─────────────┐        ┌──────────── Supabase ────────────┐
│  Home → Chi sei? → PIN → Rivelazione →    │  RPC   │  get_secret_santa_status()       │
│  Segreto custodito                        │ ─────► │  claim_secret_santa(name, pin)   │
│                                           │        │  reveal_secret_santa(name, pin)  │
│  drawService ─┬─ supabaseService (fetch)  │        │                                  │
│               └─ localService (demo)      │        │  santa_participants  (RLS, 🔒)    │
└───────────────────────────────────────────┘        │  santa_assignments   (RLS, 🔒)    │
                                                     └──────────────────────────────────┘
```

- **L'estrazione avviene sul server**, una sola volta, alla prima richiesta
  (sotto advisory lock: due telefoni in contemporanea non possono generarne due).
  Algoritmo: permutazione casuale con byte crittografici, scartata se qualcuno
  pesca sé stesso → derangement uniforme.
- Le tabelle hanno **RLS attiva senza policy** e privilegi revocati: dal browser
  non sono leggibili in nessun modo. Il browser può solo chiamare le 3 funzioni.
- Il browser **non riceve mai l'elenco delle coppie**: lo stato pubblico contiene
  solo nomi e "ha già pescato sì/no"; ogni persona riceve solo il proprio destinatario.
- Il database stesso impone le regole: `check (giver_id <> receiver_id)`,
  `receiver_id unique`, un donatore per riga.
- **PIN personale** (4 cifre, salvato come hash bcrypt): serve a rivedere il
  proprio nome più tardi, da qualsiasi dispositivo. Dopo 5 tentativi errati il
  nome è bloccato per 15 minuti.
- Senza Supabase configurato l'app parte in **modalità demo** (vedi §5).

```
src/
├── App.jsx                 flusso e stato della UI
├── screens/                Home, WhoAreYou, Reveal, Farewell
├── components/             Snow, Confetti, StringLights, GiftBox, PinSheet,
│                           HomeIllustration, MusicToggle, Ornaments, Footer
├── services/               drawService (scelta), supabaseService, localService
├── lib/                    participants, derangement (algoritmo + verifica)
├── audio/musicEngine.js    musica originale sintetizzata / file audio
└── styles/index.css        design system (token, componenti, animazioni)
supabase/
├── migrations/001_secret_santa.sql   schema, funzioni, permessi
└── tests/draw_test.sql               test automatici in SQL
```

## 2. Esperienza utente

1. **Home**: lucine, neve, abeti e regali illustrati, "It's Christmas time!" e il
   pulsante *Inizia l'estrazione 🎁* (che avvia anche la musica).
2. **Chi sei?**: 8 card color avorio con sigillo di ceralacca e agrifoglio. Chi
   ha già pescato appare spento con il lucchetto; un contatore mostra quanti
   hanno pescato (si aggiorna da solo ogni 10 s).
3. Toccato il proprio nome compare *Scopri chi devi sorprendere* → pannello
   **"Sei proprio tu, Martina?"** con la scelta del PIN. È una conferma in più che
   evita di pescare per sbaglio al posto di un altro.
4. **Rivelazione**: il pacchetto trema per ~2,7 s ("Gli elfi stanno controllando
   la lista…"), il coperchio vola via, si accende la luce, coriandoli dorati e
   stelline, e il nome appare su un biglietto vintage.
5. *Ho scoperto il mio Secret Santa!* → **Segreto custodito**: il nome sparisce
   dallo schermo e dalla memoria, e il telefono può passare al prossimo.
6. Per rivedere il nome: toccare il proprio nome (con il lucchetto) e inserire il PIN.

## 3. Avvio in locale

```bash
cd secret-santa
npm install
npm run dev          # http://localhost:5173 (anche dalla rete locale, --host)
npm run build        # build statica in dist/
```

## 4. Configurare Supabase (per l'uso reale, consigliato)

1. Crea un progetto gratuito su [supabase.com](https://supabase.com).
2. **SQL Editor** → incolla ed esegui `supabase/migrations/001_secret_santa.sql`.
3. **Project Settings → API**: copia *Project URL* e *anon public key*.
4. Crea `.env.local` partendo da `.env.example`:
   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```
5. `npm run build` e pubblica la cartella `dist/` su Netlify, Vercel o GitHub Pages
   (su Netlify/Vercel imposta le due variabili nelle impostazioni del progetto).
   La anon key è pensata per essere pubblica: i dati sono protetti da RLS e grant.

**Comandi da amministratore** (solo dal SQL Editor della dashboard):

```sql
-- chi ha già pescato (senza vedere le coppie)
select name, claimed_at from santa_participants order by id;

-- ricominciare da zero (nuova estrazione alla prima richiesta)
select public.reset_secret_santa();
```

Per cambiare i partecipanti, modifica l'`insert` nella migration **e**
`src/lib/participants.js` (usato per la home e per la demo), poi esegui un reset.

## 5. Modalità demo: limiti

Se `VITE_SUPABASE_*` non sono impostate, l'app funziona in **modalità demo** (lo
segnala sotto la griglia dei nomi). Stesse regole, ma tutto è salvato nel
`localStorage` di **quel** browser:

- va bene per provare l'esperienza, o per una festa in cui ci si passa **un solo
  telefono**;
- **non è sicura**: dagli strumenti per sviluppatori si possono leggere le coppie;
- ogni dispositivo avrebbe un'estrazione diversa, e cancellando i dati del sito
  l'estrazione si perde.

## 6. Musica

Senza file audio, l'app suona **"Valzer della Prima Neve"**, una composizione
originale scritta per questa app (valzer in Fa maggiore: pianoforte, celesta e
sonagli) e sintetizzata in tempo reale con la Web Audio API. Nessun copyright,
zero kilobyte di audio.

- Parte solo dopo un tocco (il pulsante *Inizia*), come richiedono iOS e Chrome.
- Il pulsante flottante in alto a destra la attiva o disattiva in ogni momento;
  la scelta viene ricordata.
- Su iPhone, con l'interruttore silenzioso attivo, l'audio web resta muto: è un
  comportamento di iOS.

**Usare un file audio**: metti un brano *royalty-free* in `public/music/`
(es. `christmas.mp3`) e imposta `VITE_MUSIC_URL=./music/christmas.mp3`.

## 7. Verifiche

```bash
npm run verify:draw    # 50.000 estrazioni: regole rispettate, distribuzione uniforme
psql -f supabase/migrations/001_secret_santa.sql   # su un Postgres di prova
psql -f supabase/tests/draw_test.sql               # test di sicurezza e regole
```

Il test SQL (eseguito come ruolo `anon`, come il browser) verifica che:
le tabelle e le funzioni interne siano inaccessibili; 8 persone ricevano 8
destinatari diversi, nessuno sé stesso; un nome già usato non possa pescare di
nuovo; il PIN restituisca sempre la stessa assegnazione; 5 PIN errati blocchino
il nome; lo stato pubblico non contenga coppie; su 2000 estrazioni compaiano
tutte le 56 coppie possibili con frequenza uniforme.

## 8. Sicurezza: cosa resta da sapere

Senza account né link personali, l'app non può sapere *chi* tiene il telefono.
Se qualcuno sceglie apposta il nome di un altro, vede il destinatario di
quella persona. Il vero proprietario se ne accorge subito, perché trova il suo
nome già "pescato", e l'organizzatrice può fare un reset. La conferma
"Sei proprio tu?" riduce gli errori in buona fede. Se servisse una protezione
più forte, il passo successivo è dare a ognuno un link personale con un token
segreto.
