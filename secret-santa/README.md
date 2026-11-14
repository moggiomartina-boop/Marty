# 🎅 Secret Santa – The Christmas Draw

Una web app natalizia, mobile first, per l'estrazione del Secret Santa tra
**Martina, Rebecca, Giulia, Sofia, Nicolò, Marco, Federico e Luca**.

React + Vite, CSS puro, `lucide-react` per le icone. Nessun'altra dipendenza.

---

## 1. Architettura

Un **unico link** per tutti. L'identità si conferma con un **codice inviato via
email**: ogni nome è legato alla email del partecipante, e il destinatario si
vede solo inserendo il codice arrivato in quella casella. Chi sceglie il nome di
un altro non riceve il codice e quindi non vede niente.

```
┌──────────── Browser (React) ─────────────┐          ┌────────────── Supabase ──────────────┐
│ Home → Chi sei? → email → codice →        │  anon    │ get_secret_santa_status()  nomi+flag │
│ Rivelazione → Segreto custodito           │ ───────► │ check_secret_santa_email(nome,email) │
│                                           │  Auth    │ /auth/v1/otp     → invia il codice   │
│ drawService ─┬─ supabaseService (fetch)   │ ───────► │ /auth/v1/verify  → token             │
│              └─ localService (demo)       │  token   │ my_secret_santa() → SOLO il tuo nome │
└───────────────────────────────────────────┘ ───────► │ santa_participants / assignments 🔒  │
                                                       └──────────────────────────────────────┘
```

- **L'estrazione avviene sul server**, una sola volta, al primo accesso, sotto
  advisory lock (due telefoni in contemporanea non possono generarne due).
  Algoritmo: permutazione casuale con byte crittografici, scartata se qualcuno
  pesca sé stesso → derangement uniforme.
- `my_secret_santa()` non riceve alcun nome dal browser: ricava l'identità
  **solo** dall'email verificata contenuta nel token di Supabase Auth. Non esiste
  una chiamata che restituisca il destinatario di qualcun altro.
- Le tabelle hanno **RLS attiva senza policy** e privilegi revocati: né anonimi
  né autenticati possono leggerle. Il browser non riceve mai l'elenco delle
  coppie né le email degli altri.
- Il database stesso impone le regole: `check (giver_id <> receiver_id)`,
  `receiver_id unique`, un donatore per riga.
- Il token di accesso **non viene salvato**: vive in memoria il tempo della
  richiesta. Su un telefono condiviso nessuno può riaprire la sessione di un altro.
- Senza Supabase configurato l'app parte in **modalità demo** (vedi §5).

```
src/
├── App.jsx                 flusso e stato della UI
├── screens/                Home, WhoAreYou, Reveal, Farewell
├── components/             AuthSheet (email + codice), Snow, Confetti, StringLights,
│                           GiftBox, HomeIllustration, MusicToggle, Ornaments, Footer
├── services/               drawService (scelta), supabaseService, localService
├── lib/                    participants, derangement (algoritmo + verifica)
├── audio/musicEngine.js    musica originale sintetizzata / file audio
└── styles/index.css        design system (token, componenti, animazioni)
supabase/
├── migrations/001_secret_santa.sql   schema, email, funzioni, permessi
└── tests/                            test SQL (+ simulazione di auth.jwt per Postgres locale)
```

## 2. Esperienza utente

1. **Home**: lucine, neve, abeti e regali illustrati, "It's Christmas time!" e il
   pulsante *Inizia l'estrazione 🎁* (che avvia anche la musica).
2. **Chi sei?**: 8 card color avorio con sigillo di ceralacca e agrifoglio. Chi
   ha già pescato appare spento con il lucchetto; un contatore mostra quanti
   hanno pescato (si aggiorna da solo ogni 10 s).
3. Toccato il proprio nome compare *Scopri chi devi sorprendere* → **"Sei proprio
   tu, Martina?"**: si inserisce la propria email. Se non è quella di Martina,
   l'app lo dice subito e non invia nulla.
4. **"Controlla la posta"**: si inserisce il codice ricevuto (su iPhone e
   Android la tastiera lo propone in automatico). Si può chiederne uno nuovo dopo 60 s.
5. **Rivelazione**: il pacchetto trema per ~2,7 s, il coperchio vola via, si
   accende la luce, coriandoli dorati, e il nome appare su un biglietto vintage.
6. *Ho scoperto il mio Secret Santa!* → **Segreto custodito**: il nome sparisce
   dallo schermo e dalla memoria.
7. Per rivederlo: toccare il proprio nome (con il lucchetto) e rifare email + codice.

## 3. Avvio in locale

```bash
cd secret-santa
npm install
npm run dev          # http://localhost:5173 (anche dalla rete locale, --host)
npm run build        # build statica in dist/
```

## 4. Configurare Supabase (per l'uso reale)

Tempo: circa 20 minuti, una volta sola.

1. **Progetto**: crea un progetto gratuito su [supabase.com](https://supabase.com).
2. **Email dei partecipanti**: apri `supabase/migrations/001_secret_santa.sql`,
   sostituisci gli 8 indirizzi `@example.com` della sezione ✏️ con quelli veri
   (in minuscolo), poi incolla ed esegui tutto nel **SQL Editor**.
3. **Invio email (SMTP)**. ⚠️ Passaggio obbligatorio: il servizio email
   predefinito di Supabase invia solo agli indirizzi dei membri del progetto e
   pochissime email all'ora. In **Authentication → Emails → SMTP Settings**
   attiva un SMTP personalizzato. Le opzioni più semplici e gratuite:
   - **Gmail** con una *password per le app* (account Google → Sicurezza →
     Verifica in due passaggi → Password per le app): host `smtp.gmail.com`,
     porta `465`, utente = il tuo Gmail, password = la password per le app;
   - oppure **Resend** / **Brevo**, che hanno piani gratuiti.

   Poi in **Authentication → Rate Limits** alza *emails per hour* (es. 30).
4. **Testo dell'email con il codice**. In **Authentication → Emails → Templates →
   Magic Link** il modello deve contenere `{{ .Token }}`, cioè il codice. Esempio:
   ```html
   <h2>🎅 Secret Santa – The Christmas Draw</h2>
   <p>Ecco il tuo codice per scoprire chi devi sorprendere:</p>
   <p style="font-size:28px;letter-spacing:6px"><strong>{{ .Token }}</strong></p>
   <p>Non condividerlo con nessuno! 🤫</p>
   ```
   Oggetto suggerito: `Il tuo codice Secret Santa 🎁`.
5. **Chiavi**: in **Project Settings → API** copia *Project URL* e *anon public
   key* e crea `.env.local` partendo da `.env.example`:
   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```
6. **Pubblicazione**: `npm run build` e carica `dist/` su Netlify, Vercel o
   GitHub Pages (su Netlify/Vercel imposta le due variabili nelle impostazioni
   del progetto). La anon key è pensata per essere pubblica: i dati sono protetti
   da RLS, grant e dal login via email.
7. **Prova generale**: prima di mandare il link al gruppo, fai tu il percorso
   con la tua email per controllare che il codice arrivi. Poi
   `select public.reset_secret_santa();` per ripartire da zero.

**Comandi da amministratore** (SQL Editor della dashboard):

```sql
-- chi ha già pescato (senza vedere le coppie)
select name, claimed_at from santa_participants order by id;

-- correggere un'email
update santa_participants set email = 'nuova@email.it' where name = 'Luca';

-- ricominciare da zero (nuova estrazione al primo accesso)
select public.reset_secret_santa();
```

Per cambiare i partecipanti, modifica l'`insert` nella migration **e**
`src/lib/participants.js` (usato per la home e per la demo), poi esegui un reset.

## 5. Modalità demo: limiti

Se `VITE_SUPABASE_*` non sono impostate, l'app funziona in **modalità demo** (lo
segnala sotto la griglia dei nomi). Il flusso è identico, ma **nessuna email
viene inviata**: il codice appare direttamente a schermo. Tutto resta nel
`localStorage` di quel browser. Serve solo per provare l'esperienza:

- **non protegge nulla**: chiunque può pescare per chiunque e dagli strumenti per
  sviluppatori si leggono le coppie;
- ogni dispositivo avrebbe un'estrazione diversa.

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

# su un PostgreSQL di prova (non su Supabase):
psql -f supabase/tests/local_auth_mock.sql       # simula ruoli e auth.jwt() di Supabase
psql -f supabase/migrations/001_secret_santa.sql
psql -f supabase/tests/draw_test.sql
```

Il test SQL, eseguito con i ruoli `anon` e `authenticated` come dal browser,
verifica che:
- le tabelle e le funzioni interne siano inaccessibili;
- un anonimo non possa ottenere alcun destinatario e lo stato pubblico non
  contenga coppie né email;
- un'email estranea venga rifiutata;
- 8 accessi diano 8 destinatari diversi, nessuno sé stesso;
- rientrando si veda sempre lo stesso nome;
- su 2000 estrazioni compaiano tutte le 56 coppie possibili con frequenza uniforme.

## 8. Sicurezza: cosa resta da sapere

- La protezione vale quanto la casella email: chi ha accesso alla posta di
  un'altra persona potrebbe vedere il suo nome.
- `check_secret_santa_email` permette solo di verificare un'ipotesi
  nome ↔ email (utile per il messaggio d'errore). Non rivela le email e non dà
  accesso a nessuna assegnazione.
