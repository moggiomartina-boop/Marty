-- =============================================================================
--  SECRET SANTA – THE CHRISTMAS DRAW · schema Supabase / PostgreSQL
-- =============================================================================
--  Un unico link, solo nomi, niente email. Due fasi:
--
--  1) ISCRIZIONE: ognuno sceglie il proprio nome e un PIN di 4 cifre.
--     Non esiste ancora nessuna estrazione, quindi chi si iscrive al posto di
--     un altro NON vede nulla; il vero proprietario trova il nome già preso e
--     avvisa l'organizzatrice, che può liberarlo.
--  2) ESTRAZIONE: quando tutti e 8 sono iscritti e hanno confermato nel gruppo
--     di averlo fatto di persona, l'organizzatrice la avvia con il suo codice.
--     Da quel momento ognuno vede SOLO il proprio destinatario, con nome + PIN.
--
--  Sicurezza
--  - Tabelle con RLS attiva, nessuna policy, privilegi revocati: dal browser
--    non si leggono né si scrivono. Solo funzioni RPC (SECURITY DEFINER).
--  - Il browser non riceve mai l'elenco delle coppie.
--  - PIN e codice organizzatrice salvati come hash bcrypt; 5 tentativi errati
--    bloccano per 15 minuti.
--  - L'estrazione si genera una sola volta, sotto advisory lock.
--
--  Esegui questo file una volta nel SQL Editor del progetto Supabase,
--  DOPO aver scelto il codice organizzatrice nella sezione ✏️.
-- =============================================================================

create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;

-- -----------------------------------------------------------------------------
--  Tabelle
-- -----------------------------------------------------------------------------
create table if not exists public.santa_participants (
  id               smallint primary key,
  name             text not null unique,
  pin_hash         text,
  registered_at    timestamptz,
  revealed_at      timestamptz,
  failed_attempts  integer not null default 0,
  locked_until     timestamptz
);

create table if not exists public.santa_assignments (
  giver_id     smallint primary key references public.santa_participants(id) on delete cascade,
  receiver_id  smallint not null unique references public.santa_participants(id) on delete cascade,
  created_at   timestamptz not null default now(),
  constraint santa_no_self check (giver_id <> receiver_id)   -- nessuno pesca sé stesso
);

create table if not exists public.santa_settings (
  id                   smallint primary key default 1 check (id = 1),  -- una sola riga
  organizer_code_hash  text not null,
  failed_attempts      integer not null default 0,
  locked_until         timestamptz
);

alter table public.santa_participants enable row level security;
alter table public.santa_assignments  enable row level security;
alter table public.santa_settings     enable row level security;
revoke all on table public.santa_participants from public, anon, authenticated;
revoke all on table public.santa_assignments  from public, anon, authenticated;
revoke all on table public.santa_settings     from public, anon, authenticated;

insert into public.santa_participants (id, name) values
  (1, 'Martina'), (2, 'Rebecca'), (3, 'Giulia'), (4, 'Sofia'),
  (5, 'Nicolò'),  (6, 'Marco'),   (7, 'Federico'), (8, 'Luca')
on conflict (id) do nothing;

-- -----------------------------------------------------------------------------
--  ✏️  CODICE ORGANIZZATRICE — cambialo prima di eseguire il file!
--  Serve per avviare l'estrazione e liberare un nome. Non dirlo a nessuno.
--  Per cambiarlo in seguito:
--    update santa_settings set organizer_code_hash =
--      extensions.crypt('nuovo-codice', extensions.gen_salt('bf', 8)) where id = 1;
-- -----------------------------------------------------------------------------
insert into public.santa_settings (id, organizer_code_hash)
values (1, extensions.crypt('cambia-questo-codice', extensions.gen_salt('bf', 8)))
on conflict (id) do nothing;

-- -----------------------------------------------------------------------------
--  Funzioni interne (NON esposte al browser)
-- -----------------------------------------------------------------------------

-- Estrazione: permutazioni uniformi (byte crittografici) finché non se ne trova
-- una senza punti fissi → derangement uniforme. Una sola volta.
create or replace function public._santa_ensure_draw()
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  ids smallint[]; shuffled smallint[]; n integer; i integer; ok boolean; tries integer := 0;
begin
  perform pg_advisory_xact_lock(hashtext('secret_santa_global_draw'));
  if exists (select 1 from santa_assignments) then return; end if;

  select array_agg(id order by id) into ids from santa_participants;
  n := coalesce(array_length(ids, 1), 0);
  if n < 2 then raise exception 'Servono almeno 2 partecipanti'; end if;

  loop
    tries := tries + 1;
    select array_agg(t.id order by extensions.gen_random_bytes(16)) into shuffled
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

-- Verifica il codice organizzatrice. Ritorna null se corretto, altrimenti un
-- oggetto errore. Non solleva eccezioni: così i tentativi falliti restano salvati.
create or replace function public._santa_check_organizer(p_code text)
returns json
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  s santa_settings%rowtype;
begin
  select * into s from santa_settings where id = 1 for update;
  if s.locked_until is not null and s.locked_until > now() then
    return json_build_object('ok', false, 'error', 'LOCKED',
      'retry_in', ceil(extract(epoch from s.locked_until - now())));
  end if;
  if p_code is null or extensions.crypt(p_code, s.organizer_code_hash) <> s.organizer_code_hash then
    if s.failed_attempts + 1 >= 5 then
      update santa_settings set failed_attempts = 0, locked_until = now() + interval '15 minutes' where id = 1;
      return json_build_object('ok', false, 'error', 'LOCKED', 'retry_in', 900);
    end if;
    update santa_settings set failed_attempts = s.failed_attempts + 1 where id = 1;
    return json_build_object('ok', false, 'error', 'WRONG_CODE');
  end if;
  update santa_settings set failed_attempts = 0, locked_until = null where id = 1;
  return null;
end;
$$;

-- -----------------------------------------------------------------------------
--  RPC pubbliche
-- -----------------------------------------------------------------------------

-- Stato: fase + nomi con flag. Mai coppie né PIN.
create or replace function public.get_secret_santa_status()
returns json
language sql
stable
security definer
set search_path = public
as $$
  select json_build_object(
    'phase', case when exists (select 1 from santa_assignments) then 'drawn' else 'registration' end,
    'participants', coalesce((
      select json_agg(json_build_object(
               'name', name,
               'registered', registered_at is not null,
               'revealed', revealed_at is not null) order by id)
        from santa_participants), '[]'::json));
$$;

-- Fase 1 · iscrizione con PIN
create or replace function public.register_secret_santa(p_name text, p_pin text)
returns json
language plpgsql
volatile
security definer
set search_path = public, extensions
as $$
declare
  me santa_participants%rowtype;
begin
  if p_pin is null or p_pin !~ '^[0-9]{4}$' then
    return json_build_object('ok', false, 'error', 'INVALID_PIN');
  end if;
  if exists (select 1 from santa_assignments) then
    return json_build_object('ok', false, 'error', 'DRAW_STARTED');
  end if;
  select * into me from santa_participants where name = p_name for update;
  if not found then return json_build_object('ok', false, 'error', 'NOT_FOUND'); end if;
  if me.registered_at is not null then
    return json_build_object('ok', false, 'error', 'ALREADY_REGISTERED');
  end if;
  update santa_participants
     set registered_at = now(),
         pin_hash = extensions.crypt(p_pin, extensions.gen_salt('bf', 8)),
         failed_attempts = 0, locked_until = null
   where id = me.id;
  return json_build_object('ok', true);
end;
$$;

-- Fase 2 · scoprire il proprio destinatario con nome + PIN
create or replace function public.reveal_secret_santa(p_name text, p_pin text)
returns json
language plpgsql
volatile
security definer
set search_path = public, extensions
as $$
declare
  me santa_participants%rowtype;
  receiver text;
begin
  select * into me from santa_participants where name = p_name for update;
  if not found then return json_build_object('ok', false, 'error', 'NOT_FOUND'); end if;
  if not exists (select 1 from santa_assignments) then
    return json_build_object('ok', false, 'error', 'NOT_STARTED');
  end if;
  if me.pin_hash is null then return json_build_object('ok', false, 'error', 'NOT_REGISTERED'); end if;
  if me.locked_until is not null and me.locked_until > now() then
    return json_build_object('ok', false, 'error', 'LOCKED',
      'retry_in', ceil(extract(epoch from me.locked_until - now())));
  end if;

  if p_pin is null or p_pin !~ '^[0-9]{4}$'
     or extensions.crypt(p_pin, me.pin_hash) <> me.pin_hash then
    if me.failed_attempts + 1 >= 5 then
      update santa_participants set failed_attempts = 0, locked_until = now() + interval '15 minutes'
       where id = me.id;
      return json_build_object('ok', false, 'error', 'LOCKED', 'retry_in', 900);
    end if;
    update santa_participants set failed_attempts = me.failed_attempts + 1 where id = me.id;
    return json_build_object('ok', false, 'error', 'WRONG_PIN', 'attempts_left', 4 - me.failed_attempts);
  end if;

  update santa_participants
     set failed_attempts = 0, locked_until = null, revealed_at = coalesce(revealed_at, now())
   where id = me.id;

  select r.name into receiver
    from santa_assignments a join santa_participants r on r.id = a.receiver_id
   where a.giver_id = me.id;

  return json_build_object('ok', true, 'receiver', receiver, 'first_time', me.revealed_at is null);
end;
$$;

-- Organizzatrice · verifica del codice (per aprire il pannello)
create or replace function public.organizer_login(p_code text)
returns json
language plpgsql
volatile
security definer
set search_path = public
as $$
declare err json;
begin
  err := _santa_check_organizer(p_code);
  return coalesce(err, json_build_object('ok', true));
end;
$$;

-- Organizzatrice · liberare un nome iscritto da qualcun altro (solo prima dell'estrazione)
create or replace function public.organizer_release_name(p_code text, p_name text)
returns json
language plpgsql
volatile
security definer
set search_path = public
as $$
declare err json;
begin
  err := _santa_check_organizer(p_code);
  if err is not null then return err; end if;
  if exists (select 1 from santa_assignments) then
    return json_build_object('ok', false, 'error', 'DRAW_STARTED');
  end if;
  update santa_participants
     set registered_at = null, pin_hash = null, failed_attempts = 0, locked_until = null
   where name = p_name;
  if not found then return json_build_object('ok', false, 'error', 'NOT_FOUND'); end if;
  return json_build_object('ok', true);
end;
$$;

-- Organizzatrice · avviare l'estrazione (solo con tutti iscritti)
create or replace function public.organizer_start_draw(p_code text)
returns json
language plpgsql
volatile
security definer
set search_path = public
as $$
declare err json;
begin
  err := _santa_check_organizer(p_code);
  if err is not null then return err; end if;
  if exists (select 1 from santa_assignments) then
    return json_build_object('ok', false, 'error', 'ALREADY_STARTED');
  end if;
  if exists (select 1 from santa_participants where registered_at is null) then
    return json_build_object('ok', false, 'error', 'NOT_ALL_REGISTERED');
  end if;
  perform _santa_ensure_draw();
  return json_build_object('ok', true);
end;
$$;

-- Organizzatrice · ricominciare tutto (iscrizioni comprese)
create or replace function public.organizer_reset(p_code text)
returns json
language plpgsql
volatile
security definer
set search_path = public
as $$
declare err json;
begin
  err := _santa_check_organizer(p_code);
  if err is not null then return err; end if;
  delete from santa_assignments;
  update santa_participants
     set pin_hash = null, registered_at = null, revealed_at = null, failed_attempts = 0, locked_until = null;
  return json_build_object('ok', true);
end;
$$;

-- Reset da amministratore (solo SQL editor): select public.reset_secret_santa();
create or replace function public.reset_secret_santa()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from santa_assignments;
  update santa_participants
     set pin_hash = null, registered_at = null, revealed_at = null, failed_attempts = 0, locked_until = null;
  update santa_settings set failed_attempts = 0, locked_until = null;
end;
$$;

-- -----------------------------------------------------------------------------
--  Permessi sulle funzioni
-- -----------------------------------------------------------------------------
revoke all on function public._santa_ensure_draw()               from public, anon, authenticated;
revoke all on function public._santa_check_organizer(text)       from public, anon, authenticated;
revoke all on function public.reset_secret_santa()               from public, anon, authenticated;
revoke all on function public.get_secret_santa_status()          from public;
revoke all on function public.register_secret_santa(text, text)  from public;
revoke all on function public.reveal_secret_santa(text, text)    from public;
revoke all on function public.organizer_login(text)              from public;
revoke all on function public.organizer_release_name(text, text) from public;
revoke all on function public.organizer_start_draw(text)         from public;
revoke all on function public.organizer_reset(text)              from public;

grant execute on function public.get_secret_santa_status()          to anon, authenticated;
grant execute on function public.register_secret_santa(text, text)  to anon, authenticated;
grant execute on function public.reveal_secret_santa(text, text)    to anon, authenticated;
grant execute on function public.organizer_login(text)              to anon, authenticated;
grant execute on function public.organizer_release_name(text, text) to anon, authenticated;
grant execute on function public.organizer_start_draw(text)         to anon, authenticated;
grant execute on function public.organizer_reset(text)              to anon, authenticated;
