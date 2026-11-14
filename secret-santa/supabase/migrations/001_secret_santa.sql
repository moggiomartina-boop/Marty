-- =============================================================================
--  SECRET SANTA – THE CHRISTMAS DRAW · schema Supabase / PostgreSQL
-- =============================================================================
--  Modello di sicurezza
--  - Le tabelle hanno RLS attiva e NESSUNA policy, e i privilegi sono revocati
--    ad anon/authenticated: dal browser non si può leggere né scrivere nulla
--    direttamente (né via REST né via client Supabase).
--  - Il browser può chiamare soltanto tre funzioni RPC (SECURITY DEFINER):
--      get_secret_santa_status()        → nomi + "ha già pescato?" (niente coppie)
--      claim_secret_santa(name, pin)    → prima e unica estrazione di quel nome
--      reveal_secret_santa(name, pin)   → rivedere il proprio nome con il PIN
--  - L'estrazione globale avviene lato server, una sola volta, alla prima
--    richiesta, sotto advisory lock: non è mai possibile rigenerarla per errore.
--  - Il PIN è salvato come hash bcrypt; dopo 5 tentativi errati il nome viene
--    bloccato per 15 minuti.
--  - Il reset è possibile solo dal SQL editor della dashboard (ruolo postgres).
--
--  Esegui questo file una volta nel SQL Editor del tuo progetto Supabase.
-- =============================================================================

create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;

-- -----------------------------------------------------------------------------
--  Tabelle
-- -----------------------------------------------------------------------------
create table if not exists public.santa_participants (
  id               smallint primary key,
  name             text        not null unique,
  claimed_at       timestamptz,
  pin_hash         text,
  failed_attempts  integer     not null default 0,
  locked_until     timestamptz
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

-- Partecipanti (l'ordine dell'id è l'ordine di visualizzazione)
insert into public.santa_participants (id, name) values
  (1, 'Martina'), (2, 'Rebecca'), (3, 'Giulia'), (4, 'Sofia'),
  (5, 'Nicolò'),  (6, 'Marco'),   (7, 'Federico'), (8, 'Luca')
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
--  RPC pubblica 1 · stato (solo nomi e flag, MAI le coppie)
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
--  RPC pubblica 2 · prima estrazione di un partecipante
--  Ritorna {ok:true, receiver} oppure {ok:false, error}
--  (niente eccezioni: così gli aggiornamenti non vengono annullati)
-- -----------------------------------------------------------------------------
create or replace function public.claim_secret_santa(p_name text, p_pin text)
returns json
language plpgsql
volatile
security definer
set search_path = public, extensions
as $$
declare
  me        santa_participants%rowtype;
  receiver  text;
begin
  if p_pin is null or p_pin !~ '^[0-9]{4}$' then
    return json_build_object('ok', false, 'error', 'INVALID_PIN');
  end if;

  perform _santa_ensure_draw();

  select * into me from santa_participants where name = p_name for update;
  if not found then
    return json_build_object('ok', false, 'error', 'NOT_FOUND');
  end if;
  if me.claimed_at is not null then
    return json_build_object('ok', false, 'error', 'ALREADY_CLAIMED');
  end if;

  update santa_participants
     set claimed_at = now(),
         pin_hash   = extensions.crypt(p_pin, extensions.gen_salt('bf', 8)),
         failed_attempts = 0,
         locked_until = null
   where id = me.id;

  select r.name into receiver
    from santa_assignments a
    join santa_participants r on r.id = a.receiver_id
   where a.giver_id = me.id;

  return json_build_object('ok', true, 'receiver', receiver);
end;
$$;

-- -----------------------------------------------------------------------------
--  RPC pubblica 3 · rivedere la propria assegnazione con il PIN
-- -----------------------------------------------------------------------------
create or replace function public.reveal_secret_santa(p_name text, p_pin text)
returns json
language plpgsql
volatile
security definer
set search_path = public, extensions
as $$
declare
  me        santa_participants%rowtype;
  receiver  text;
  max_tries constant integer := 5;
begin
  select * into me from santa_participants where name = p_name for update;
  if not found then
    return json_build_object('ok', false, 'error', 'NOT_FOUND');
  end if;
  if me.claimed_at is null or me.pin_hash is null then
    return json_build_object('ok', false, 'error', 'NOT_CLAIMED');
  end if;
  if me.locked_until is not null and me.locked_until > now() then
    return json_build_object('ok', false, 'error', 'LOCKED',
      'retry_in', ceil(extract(epoch from me.locked_until - now())));
  end if;

  if p_pin is null or p_pin !~ '^[0-9]{4}$'
     or extensions.crypt(p_pin, me.pin_hash) <> me.pin_hash then
    if me.failed_attempts + 1 >= max_tries then
      update santa_participants
         set failed_attempts = 0, locked_until = now() + interval '15 minutes'
       where id = me.id;
      return json_build_object('ok', false, 'error', 'LOCKED', 'retry_in', 900);
    end if;
    update santa_participants set failed_attempts = me.failed_attempts + 1 where id = me.id;
    return json_build_object('ok', false, 'error', 'WRONG_PIN',
      'attempts_left', max_tries - me.failed_attempts - 1);
  end if;

  update santa_participants set failed_attempts = 0, locked_until = null where id = me.id;

  select r.name into receiver
    from santa_assignments a
    join santa_participants r on r.id = a.receiver_id
   where a.giver_id = me.id;

  return json_build_object('ok', true, 'receiver', receiver);
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
  update santa_participants
     set claimed_at = null, pin_hash = null, failed_attempts = 0, locked_until = null;
end;
$$;

-- -----------------------------------------------------------------------------
--  Permessi sulle funzioni
-- -----------------------------------------------------------------------------
revoke all on function public._santa_ensure_draw()               from public, anon, authenticated;
revoke all on function public.reset_secret_santa()               from public, anon, authenticated;
revoke all on function public.get_secret_santa_status()          from public;
revoke all on function public.claim_secret_santa(text, text)     from public;
revoke all on function public.reveal_secret_santa(text, text)    from public;

grant execute on function public.get_secret_santa_status()       to anon, authenticated;
grant execute on function public.claim_secret_santa(text, text)  to anon, authenticated;
grant execute on function public.reveal_secret_santa(text, text) to anon, authenticated;
