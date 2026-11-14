-- =============================================================================
--  SECRET SANTA – THE CHRISTMAS DRAW · schema Supabase / PostgreSQL
-- =============================================================================
--  Modello di sicurezza (un unico link per tutti)
--  - Ogni partecipante è legato alla propria EMAIL. Per vedere il proprio
--    destinatario bisogna accedere con il codice che Supabase Auth invia a
--    quella casella: chi sceglie il nome di un altro non riceve il codice e
--    non vede nulla.
--  - Le tabelle hanno RLS attiva e NESSUNA policy, e i privilegi sono revocati
--    ad anon/authenticated: dal browser non si leggono né si scrivono.
--  - Il browser può chiamare soltanto tre funzioni RPC (SECURITY DEFINER):
--      get_secret_santa_status()             → nomi + "ha già pescato?" (anon)
--      check_secret_santa_email(name, email) → l'email è quella di quel nome? (anon)
--      my_secret_santa()                     → il PROPRIO destinatario, ricavato
--                                              dall'email del token di accesso
--                                              (solo utenti autenticati)
--  - L'estrazione globale avviene lato server, una sola volta, alla prima
--    richiesta, sotto advisory lock: non può essere rigenerata per errore.
--  - Il reset è possibile solo dal SQL editor della dashboard.
--
--  Esegui questo file una volta nel SQL Editor del tuo progetto Supabase,
--  DOPO aver inserito le email vere nella sezione ✏️ qui sotto.
-- =============================================================================

create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;

-- -----------------------------------------------------------------------------
--  Tabelle
-- -----------------------------------------------------------------------------
create table if not exists public.santa_participants (
  id          smallint primary key,
  name        text not null unique,
  email       text not null unique check (email = lower(email)),
  claimed_at  timestamptz
);

create table if not exists public.santa_assignments (
  giver_id     smallint primary key references public.santa_participants(id) on delete cascade,
  receiver_id  smallint not null unique references public.santa_participants(id) on delete cascade,
  created_at   timestamptz not null default now(),
  -- garanzia a livello di database: nessuno può pescare sé stesso
  constraint santa_no_self check (giver_id <> receiver_id)
);

alter table public.santa_participants enable row level security;
alter table public.santa_assignments  enable row level security;

revoke all on table public.santa_participants from public, anon, authenticated;
revoke all on table public.santa_assignments  from public, anon, authenticated;

-- -----------------------------------------------------------------------------
--  ✏️  PARTECIPANTI E LORO EMAIL — sostituisci gli indirizzi d'esempio!
--  (l'ordine dell'id è l'ordine di visualizzazione; email in minuscolo)
--  Per correggere un'email più avanti:
--    update santa_participants set email = 'nuova@email.it' where name = 'Luca';
-- -----------------------------------------------------------------------------
insert into public.santa_participants (id, name, email) values
  (1, 'Martina',  'martina@example.com'),
  (2, 'Rebecca',  'rebecca@example.com'),
  (3, 'Giulia',   'giulia@example.com'),
  (4, 'Sofia',    'sofia@example.com'),
  (5, 'Nicolò',   'nicolo@example.com'),
  (6, 'Marco',    'marco@example.com'),
  (7, 'Federico', 'federico@example.com'),
  (8, 'Luca',     'luca@example.com')
on conflict (id) do nothing;

-- -----------------------------------------------------------------------------
--  Estrazione globale (interna, NON esposta al browser)
--  Rejection sampling: permutazioni uniformi (ordinate con byte crittografici)
--  finché non se ne trova una senza punti fissi → derangement uniforme.
-- -----------------------------------------------------------------------------
create or replace function public._santa_ensure_draw()
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  ids       smallint[];
  shuffled  smallint[];
  n         integer;
  i         integer;
  ok        boolean;
  tries     integer := 0;
begin
  -- serializza: due richieste simultanee non possono creare due estrazioni
  perform pg_advisory_xact_lock(hashtext('secret_santa_global_draw'));

  if exists (select 1 from santa_assignments) then
    return; -- l'estrazione esiste già: resta invariata
  end if;

  select array_agg(id order by id) into ids from santa_participants;
  n := coalesce(array_length(ids, 1), 0);
  if n < 2 then
    raise exception 'Servono almeno 2 partecipanti';
  end if;

  loop
    tries := tries + 1;
    select array_agg(t.id order by extensions.gen_random_bytes(16))
      into shuffled
      from unnest(ids) as t(id);

    ok := true;
    for i in 1..n loop
      if ids[i] = shuffled[i] then ok := false; exit; end if;
    end loop;
    exit when ok;

    if tries > 10000 then raise exception 'Estrazione non riuscita'; end if;
  end loop;

  insert into santa_assignments (giver_id, receiver_id)
  select ids[g], shuffled[g] from generate_series(1, n) as g;
end;
$$;

-- -----------------------------------------------------------------------------
--  RPC pubblica · stato (solo nomi e flag, MAI le coppie né le email)
-- -----------------------------------------------------------------------------
create or replace function public.get_secret_santa_status()
returns json
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    json_agg(json_build_object('name', name, 'claimed', claimed_at is not null) order by id),
    '[]'::json)
  from santa_participants;
$$;

-- -----------------------------------------------------------------------------
--  RPC pubblica · l'email indicata corrisponde a quel nome?
--  Serve solo a dare un messaggio chiaro PRIMA di inviare il codice.
--  Non rivela nulla: per vedere l'assegnazione serve comunque il codice email.
-- -----------------------------------------------------------------------------
create or replace function public.check_secret_santa_email(p_name text, p_email text)
returns json
language sql
stable
security definer
set search_path = public
as $$
  select json_build_object('ok', exists (
    select 1 from santa_participants
     where name = p_name and email = lower(trim(p_email))
  ));
$$;

-- -----------------------------------------------------------------------------
--  RPC autenticata · il MIO Secret Santa
--  L'identità viene SOLO dal token di Supabase Auth (email verificata con il
--  codice). Il primo accesso segna "ha pescato"; i successivi mostrano lo
--  stesso nome. Ritorna {ok, giver, receiver, first_time} oppure {ok:false, error}.
-- -----------------------------------------------------------------------------
create or replace function public.my_secret_santa()
returns json
language plpgsql
volatile
security definer
set search_path = public, extensions
as $$
declare
  my_email  text := lower(coalesce(auth.jwt() ->> 'email', ''));
  me        santa_participants%rowtype;
  receiver  text;
begin
  if my_email = '' then
    return json_build_object('ok', false, 'error', 'NOT_AUTHENTICATED');
  end if;

  select * into me from santa_participants where email = my_email for update;
  if not found then
    return json_build_object('ok', false, 'error', 'NOT_PARTICIPANT');
  end if;

  perform _santa_ensure_draw();

  if me.claimed_at is null then
    update santa_participants set claimed_at = now() where id = me.id;
  end if;

  select r.name into receiver
    from santa_assignments a
    join santa_participants r on r.id = a.receiver_id
   where a.giver_id = me.id;

  return json_build_object('ok', true, 'giver', me.name, 'receiver', receiver,
                           'first_time', me.claimed_at is null);
end;
$$;

-- -----------------------------------------------------------------------------
--  Reset (SOLO amministratore, dal SQL editor):  select public.reset_secret_santa();
-- -----------------------------------------------------------------------------
create or replace function public.reset_secret_santa()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from santa_assignments;
  update santa_participants set claimed_at = null;
end;
$$;

-- -----------------------------------------------------------------------------
--  Permessi sulle funzioni
-- -----------------------------------------------------------------------------
revoke all on function public._santa_ensure_draw()                    from public, anon, authenticated;
revoke all on function public.reset_secret_santa()                    from public, anon, authenticated;
revoke all on function public.get_secret_santa_status()               from public;
revoke all on function public.check_secret_santa_email(text, text)    from public;
revoke all on function public.my_secret_santa()                       from public, anon;

grant execute on function public.get_secret_santa_status()            to anon, authenticated;
grant execute on function public.check_secret_santa_email(text, text) to anon, authenticated;
grant execute on function public.my_secret_santa()                    to authenticated;
