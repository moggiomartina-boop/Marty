-- =============================================================================
--  Test automatico dell'estrazione (PostgreSQL locale, dopo la migration).
--  Esegue tutto con il ruolo "anon", come farebbe il browser.
--  Uso:  psql -v ON_ERROR_STOP=1 -f supabase/tests/draw_test.sql
-- =============================================================================
\set QUIET on
select public.reset_secret_santa();

set role anon;

-- 1) Le tabelle NON devono essere leggibili da anon
do $$
begin
  begin
    perform * from public.santa_assignments;
    raise exception 'FAIL: anon legge santa_assignments';
  exception when insufficient_privilege then null;
  end;
  begin
    perform * from public.santa_participants;
    raise exception 'FAIL: anon legge santa_participants';
  exception when insufficient_privilege then null;
  end;
  begin
    perform public.reset_secret_santa();
    raise exception 'FAIL: anon può resettare';
  exception when insufficient_privilege then null;
  end;
  begin
    perform public._santa_ensure_draw();
    raise exception 'FAIL: anon può forzare l''estrazione';
  exception when insufficient_privilege then null;
  end;
  raise notice 'OK  permessi: tabelle e funzioni interne inaccessibili ad anon';
end $$;

-- 2) Ciclo completo: tutti pescano, verifico le regole
do $$
declare
  names    text[] := array['Martina','Rebecca','Giulia','Sofia','Nicolò','Marco','Federico','Luca'];
  n        text;
  res      json;
  got      text[] := '{}';
begin
  -- PIN non valido
  res := public.claim_secret_santa('Martina', '12a4');
  if res->>'error' <> 'INVALID_PIN' then raise exception 'FAIL pin non valido: %', res; end if;
  -- nome inesistente
  res := public.claim_secret_santa('Babbo Natale', '1234');
  if res->>'error' <> 'NOT_FOUND' then raise exception 'FAIL nome inesistente: %', res; end if;

  foreach n in array names loop
    res := public.claim_secret_santa(n, '1234');
    if (res->>'ok')::boolean is not true then raise exception 'FAIL claim %: %', n, res; end if;
    if res->>'receiver' = n then raise exception 'FAIL % ha pescato sé stesso', n; end if;
    if not (res->>'receiver' = any(names)) then raise exception 'FAIL destinatario ignoto'; end if;
    got := got || (res->>'receiver');
  end loop;

  if (select count(distinct x) from unnest(got) x) <> 8 then
    raise exception 'FAIL duplicati: %', got;
  end if;
  raise notice 'OK  8 estrazioni, nessuno pesca sé stesso, ognuno pescato una volta: %', got;

  -- seconda estrazione bloccata
  res := public.claim_secret_santa('Martina', '9999');
  if res->>'error' <> 'ALREADY_CLAIMED' then raise exception 'FAIL doppia estrazione: %', res; end if;
  raise notice 'OK  un nome già usato non può pescare di nuovo';

  -- rivedere con PIN corretto restituisce lo stesso nome (estrazione invariata)
  res := public.reveal_secret_santa('Martina', '1234');
  if res->>'receiver' <> got[1] then raise exception 'FAIL estrazione cambiata: %', res; end if;
  raise notice 'OK  rivedere con il PIN restituisce la stessa assegnazione';

  -- PIN errato: 4 avvisi, poi blocco
  for i in 1..4 loop
    res := public.reveal_secret_santa('Rebecca', '0000');
    if res->>'error' <> 'WRONG_PIN' then raise exception 'FAIL pin errato %: %', i, res; end if;
  end loop;
  res := public.reveal_secret_santa('Rebecca', '0000');
  if res->>'error' <> 'LOCKED' then raise exception 'FAIL blocco: %', res; end if;
  res := public.reveal_secret_santa('Rebecca', '1234');
  if res->>'error' <> 'LOCKED' then raise exception 'FAIL blocco con pin giusto: %', res; end if;
  raise notice 'OK  5 PIN errati bloccano il nome per 15 minuti';

  -- lo stato pubblico non contiene destinatari
  res := public.get_secret_santa_status();
  if res::text like '%receiver%' then raise exception 'FAIL lo stato espone coppie'; end if;
  raise notice 'OK  stato pubblico: %', res;
end $$;

reset role;

-- 3) Stress test: 2000 estrazioni indipendenti
do $$
declare
  k integer; bad integer := 0;
  pair_counts jsonb := '{}';
  c integer; mn integer; mx integer;
begin
  for k in 1..2000 loop
    perform public.reset_secret_santa();
    perform public._santa_ensure_draw();
    if exists (select 1 from santa_assignments where giver_id = receiver_id)
       or (select count(*) from santa_assignments) <> 8
       or (select count(distinct receiver_id) from santa_assignments) <> 8 then
      bad := bad + 1;
    end if;
    -- seconda chiamata: non deve cambiare nulla
    perform public._santa_ensure_draw();
    if (select count(*) from santa_assignments) <> 8 then bad := bad + 1; end if;

    select jsonb_object_agg(key, coalesce((pair_counts->>key)::int, 0) + 1) || pair_counts - array(select giver_id || '>' || receiver_id from santa_assignments)
      into pair_counts
      from (select giver_id || '>' || receiver_id as key from santa_assignments) s;
  end loop;

  select min(v::int), max(v::int), count(*) into mn, mx, c from jsonb_each_text(pair_counts) as e(k, v);
  if bad > 0 then raise exception 'FAIL % estrazioni non valide', bad; end if;
  if c <> 56 then raise exception 'FAIL coppie possibili osservate % invece di 56', c; end if;
  raise notice 'OK  2000 estrazioni valide; 56/56 coppie possibili osservate, frequenza min % max % (attesa ≈ 286)', mn, mx;
  perform public.reset_secret_santa();
end $$;
