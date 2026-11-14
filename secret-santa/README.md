# 🎅 Secret Santa – The Christmas Draw

Una web app natalizia, mobile first, per l'estrazione del Secret Santa tra
**Martina, Rebecca, Giulia, Sofia, Nicolò, Marco, Federico e Luca**.

React + Vite, CSS puro, `lucide-react` per le icone. Nessun'altra dipendenza.

---

## 1. Come funziona (un link, solo nomi)

L'estrazione avviene in **due fasi**, così nessuno può vedere l'assegnazione di
un altro anche se sceglie il suo nome:

1. **Iscrizione**: ognuno apre il link, tocca il proprio nome e sceglie un PIN
   segreto di 4 cifre. In questa fase **non esiste ancora nessuna estrazione**:
   chi si iscrive al posto di un altro non vede nulla. Il vero proprietario,
   quando prova a iscriversi, trova il nome già preso e avvisa l'organizzatrice,
   che dal suo pannello può **liberare** quel nome.
2. **Avvio**: quando tutti e 8 sono iscritti e ognuno ha scritto nel gruppo
   "mi sono iscritto", l'organizzatrice preme **Avvia l'estrazione** con il suo
   codice. Le iscrizioni si chiudono.
3. **Rivelazione**: ognuno tocca il proprio nome, inserisce il PIN e scopre chi
   deve sorprendere. Può rivederlo quando vuole, da qualsiasi telefono.

L'unica regola da rispettare: **avviare solo quando ognuno ha confermato di
essersi iscritto di persona.** Così chi prova a barare non ottiene niente.

## 2. Architettura

```
┌──────────── Browser (React) ─────────────┐        ┌──────────────── Supabase ────────────────┐
│ Home → Chi sei? → PIN → Iscritto          │  RPC   │ get_secret_santa_status()   fase + flag  │
│ Home → Chi sei? → PIN → Rivelazione       │ ─────► │ register_secret_santa(nome, pin)         │
│ Area organizzatrice (codice)              │        │ reveal_secret_santa(nome, pin)           │
│                                           │        │ organizer_login / _release_name /        │
│ drawService ─┬─ supabaseService (fetch)   │        │   _start_draw / _reset   (con codice)    │
│              └─ localService (demo)       │        │ santa_participants / _assignments /      │
└───────────────────────────────────────────┘        │ santa_settings              RLS 🔒        │
                                                     └──────────────────────────────────────────┘
```

- **L'estrazione avviene sul server**, una sola volta, quando l'organizzatrice
  la avvia, sotto advisory lock. Algoritmo: permutazione casuale con byte
  crittografici, scartata se qualcuno pesca sé stesso → derangement uniforme.
- Le tabelle hanno **RLS attiva senza policy** e privilegi revocati: dal browser
  non si leggono. Il browser non riceve mai l'elenco delle coppie, nemmeno
  l'organizzatrice dal suo pannello.
- Il database stesso impone le regole: `check (giver_id <> receiver_id)`,
  `receiver_id unique`, un donatore per riga.
- PIN e codice organizzatrice sono salvati come hash bcrypt. Dopo 5 tentativi
  errati il nome (o il pannello) si blocca per 15 minuti.
- Senza Supabase configurato l'app parte in **modalità demo** (vedi §6).

```
src/
├── App.jsx                 flusso e stato della UI
├── screens/                Home, WhoAreYou, Registered, Reveal, Farewell
├── components/             PinSheet, OrganizerSheet, Snow, Confetti, StringLights,
│                           GiftBox, HomeIllustration, MusicToggle, Ornaments, Footer
├── services/               drawService (scelta), supabaseService, localService
├── lib/                    participants, derangement (algoritmo + verifica)
├── audio/musicEngine.js    musica originale sintetizzata / file audio
└── styles/index.css        design system (token, componenti, animazioni)
supabase/
├── migrations/001_secret_santa.sql   schema, funzioni, permessi, codice organizzatrice
└── tests/                            test SQL (+ ruoli per un Postgres locale)
```

## 3. Esperienza utente

1. **Home**: lucine, neve, abeti e regali illustrati, "It's Christmas time!" e il
   pulsante *Inizia l'estrazione 🎁* (che avvia anche la musica).
2. **Chi sei?** (fase 1): 8 card con sigillo di ceralacca e i passaggi
   *Iscriviti → Avvio → Scopri*. Si tocca il proprio nome → *Iscriviti* →
   "Sei proprio tu, Martina?" + PIN → **"Sei nella lista"**.
3. Toccare un nome già iscritto mostra: "Se non sei stato tu, avvisa subito
   l'organizzatrice".
4. **Chi sei?** (fase 2, dopo l'avvio): si tocca il proprio nome → *Scopri chi
   devi sorprendere* → PIN → pacchetto che trema, coperchio che vola via,
   coriandoli dorati e nome su un biglietto vintage.
5. *Ho scoperto il mio Secret Santa!* → **Segreto custodito**: il nome sparisce
   dallo schermo e dalla memoria.
6. **Area organizzatrice** (link in fondo alla lista): con il codice si vedono
   gli iscritti, si libera un nome e si avvia l'estrazione. Dopo l'avvio c'è
   solo *Ricomincia da capo*.

## 4. Avvio in locale

**Il modo più semplice:** apri `secret-santa.html` con un doppio clic. È un
unico file con tutto dentro, e funziona in **modalità demo** (vedi §6).
Per rigenerarlo dopo una modifica: `npm run build:single`.

Per sviluppare:

```bash
cd secret-santa
npm install
npm run dev          # http://localhost:5173 (anche dalla rete locale, --host)
npm run build        # build statica in dist/
```

## 5. Configurare Supabase (per l'uso reale, circa 5 minuti)

1. Crea un progetto gratuito su [supabase.com](https://supabase.com).
2. Apri `supabase/migrations/001_secret_santa.sql` e, nella sezione ✏️, sostituisci
   `cambia-questo-codice` con il **tuo codice organizzatrice** (non dirlo a nessuno).
3. Incolla ed esegui tutto il file nel **SQL Editor** di Supabase.
4. In **Project Settings → API** copia *Project URL* e *anon public key* e crea
   `.env.local` partendo da `.env.example`.
5. `npm run build` e pubblica `dist/` su Netlify, Vercel o GitHub Pages (su
   Netlify/Vercel imposta le due variabili nelle impostazioni del progetto).
   La anon key è pensata per essere pubblica: i dati sono protetti da RLS e grant.
6. Manda il link al gruppo con un messaggio tipo: *"Iscrivetevi col vostro nome e
   scegliete un PIN, poi scrivete qui 'fatto'. Quando ci siamo tutti avvio io."*

**Comandi da amministratore** (SQL Editor):

```sql
-- chi si è iscritto / chi ha scoperto (senza vedere le coppie)
select name, registered_at, revealed_at from santa_participants order by id;

-- cambiare il codice organizzatrice
update santa_settings set organizer_code_hash =
  extensions.crypt('nuovo-codice', extensions.gen_salt('bf', 8)) where id = 1;

-- ricominciare da zero (anche se il pannello è bloccato)
select public.reset_secret_santa();
```

Per cambiare i partecipanti, modifica l'`insert` nella migration **e**
`src/lib/participants.js` (usato per la home e per la demo), poi esegui un reset.

## 6. Modalità demo: limiti

Se `VITE_SUPABASE_*` non sono impostate, l'app funziona in **modalità demo** (lo
segnala sotto la griglia). Stesse due fasi, codice organizzatrice `natale`
(mostrato nel pannello). Tutto resta nel `localStorage` di **quel** browser:

- va bene per provare l'esperienza, o per una festa in cui ci si passa **un solo
  telefono**;
- **non è sicura**: dagli strumenti per sviluppatori si possono leggere le coppie;
- ogni dispositivo avrebbe un'estrazione diversa.

## 7. Musica

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

## 8. Verifiche

```bash
npm run verify:draw    # 50.000 estrazioni: regole rispettate, distribuzione uniforme

# su un PostgreSQL di prova (non su Supabase):
psql -f supabase/tests/local_roles.sql            # crea i ruoli anon/authenticated
psql -f supabase/migrations/001_secret_santa.sql
psql -f supabase/tests/draw_test.sql
```

Il test SQL, eseguito con il ruolo `anon` come dal browser, simula anche un
impostore e verifica che:
- tabelle e funzioni interne siano inaccessibili;
- prima dell'avvio nessuno veda nulla e un nome già iscritto sia bloccato;
- senza codice non si avvii l'estrazione e non si liberi nessun nome;
- liberato il nome, il vero proprietario possa iscriversi e il vecchio PIN
  dell'impostore smetta di funzionare;
- 8 rivelazioni diano 8 destinatari diversi, nessuno sé stesso, sempre gli stessi;
- PIN e codice organizzatrice si blocchino dopo 5 errori;
- su 2000 estrazioni compaiano tutte le 56 coppie possibili con frequenza uniforme.

## 9. Sicurezza: cosa resta da sapere

- Tutto si basa su una regola umana: **l'organizzatrice avvia solo dopo che
  ognuno ha confermato di essersi iscritto di persona.** Se avviasse prima,
  chi si fosse iscritto al posto di un altro potrebbe vederne il destinatario.
- Chi gestisce il progetto Supabase può sempre leggere il database dalla
  dashboard: l'app non mostra mai le coppie, ma il proprietario del database
  tecnicamente potrebbe.
