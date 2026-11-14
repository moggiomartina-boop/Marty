-- =============================================================================
--  Test automatico (PostgreSQL locale): local_auth_mock.sql → migration → questo.
--  Le chiamate avvengono con i ruoli "anon" e "authenticated", come dal browser.
-- =============================================================================
\set QUIET on
select public.reset_secret_santa();

-- 1) anon: niente tabelle, niente funzioni interne, niente assegnazioni
set role anon;
do $$
begin
  begin perform * from public.santa_assignments;  raise exception 'FAIL: anon legge assignments';
  exception when insufficient_privilege then null; end;
  begin perform * from public.santa_participants; raise exception 'FAIL: anon legge participants';
  exception when insufficient_privilege then null; end;
  begin perform public.reset_secret_santa();      raise exception 'FAIL: anon resetta';
  exception when insufficient_privilege then null; end;
  begin perform public._santa_ensure_draw();      raise exception 'FAIL: anon forza estrazione';
  exception when insufficient_privilege then null; end;
  begin perform public.my_secret_santa();         raise exception 'FAIL: anon vede un destinatario';
  exception when insufficient_privilege then null; end;
  if (public.check_secret_santa_email('Martina', ' Martina@Example.com ')->>'ok')::boolean is not true
    then raise exception 'FAIL: email corretta non riconosciuta'; end if;
  if (public.check_secret_santa_email('Martina', 'luca@example.com')->>'ok')::boolean
    then raise exception 'FAIL: email di un altro accettata'; end if;
  if public.get_secret_santa_status()::text ~ '(receiver|@)'
    then raise exception 'FAIL: lo stato espone coppie o email'; end if;
  raise notice 'OK  anon: tabelle, funzioni interne e assegnazioni inaccessibili; stato senza email';
end $$;
reset role;

-- 2) utenti autenticati: ognuno vede SOLO il proprio destinatario
set role authenticated;
do $$
declare
  emails text[] := array['martina','rebecca','giulia','sofia','nicolo','marco','federico','luca'];
  names  text[] := array['Martina','Rebecca','Giulia','Sofia','Nicolò','Marco','Federico','Luca'];
  res json; got text[] := '{}'; i int;
begin
  perform set_config('request.jwt.claims', '{}', true);
  if public.my_secret_santa()->>'error' <> 'NOT_AUTHENTICATED' then raise exception 'FAIL senza email'; end if;

  perform set_config('request.jwt.claims', '{"email":"intruso@example.com"}', true);
  if public.my_secret_santa()->>'error' <> 'NOT_PARTICIPANT' then raise exception 'FAIL estraneo'; end if;

  for i in 1..8 loop
    perform set_config('request.jwt.claims', json_build_object('email', emails[i] || '@example.com')::text, true);
    res := public.my_secret_santa();
    if (res->>'ok')::boolean is not true then raise exception 'FAIL %: %', names[i], res; end if;
    if res->>'giver' <> names[i] then raise exception 'FAIL identità: %', res; end if;
    if res->>'receiver' = names[i] then raise exception 'FAIL % ha pescato sé stesso', names[i]; end if;
    if (res->>'first_time')::boolean is not true then raise exception 'FAIL first_time'; end if;
    got := got || (res->>'receiver');
  end loop;
  if (select count(distinct x) from unnest(got) x) <> 8 then raise exception 'FAIL duplicati: %', got; end if;
  raise notice 'OK  8 accessi: nessuno pesca sé stesso, ognuno pescato una volta: %', got;

  perform set_config('request.jwt.claims', '{"email":"Martina@Example.com"}', true);
  res := public.my_secret_santa();
  if res->>'receiver' <> got[1] or (res->>'first_time')::boolean then raise exception 'FAIL rientro: %', res; end if;
  raise notice 'OK  rientrando si vede sempre lo stesso nome (estrazione invariata)';

  if exists (select 1 from json_array_elements(public.get_secret_santa_status()) e where not (e->>'claimed')::boolean)
    then raise exception 'FAIL stato claimed'; end if;
  raise notice 'OK  stato pubblico aggiornato: tutti hanno pescato';

  begin perform * from public.santa_assignments; raise exception 'FAIL: authenticated legge assignments';
  exception when insufficient_privilege then null; end;
  raise notice 'OK  anche gli utenti autenticati non possono leggere le tabelle';
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
    perform public._santa_ensure_draw(); -- non deve cambiare nulla
    if (select count(*) from santa_assignments) <> 8 then bad := bad + 1; end if;
    select pair_counts || jsonb_object_agg(key, coalesce((pair_counts->>key)::int, 0) + 1)
      into pair_counts
      from (select giver_id || '>' || receiver_id as key from santa_assignments) s;
  end loop;
  select min(v::int), max(v::int), count(*) into mn, mx, c from jsonb_each_text(pair_counts) as e(k, v);
  if bad > 0 then raise exception 'FAIL % estrazioni non valide', bad; end if;
  if c <> 56 then raise exception 'FAIL coppie osservate % invece di 56', c; end if;
  raise notice 'OK  2000 estrazioni valide; 56/56 coppie, frequenza min % max % (attesa ≈ 286)', mn, mx;
  perform public.reset_secret_santa();
end $$;
