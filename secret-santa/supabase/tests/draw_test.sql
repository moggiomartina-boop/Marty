-- =============================================================================
--  Test automatico (PostgreSQL locale): local_roles.sql → migration → questo.
--  Le chiamate avvengono con il ruolo "anon", come dal browser.
--  Il codice organizzatrice di prova è quello predefinito: cambia-questo-codice
-- =============================================================================
\set QUIET on
select public.reset_secret_santa();

set role anon;
do $$
declare
  names text[] := array['Martina','Rebecca','Giulia','Sofia','Nicolò','Marco','Federico','Luca'];
  oc    text := 'cambia-questo-codice';
  res json; got text[] := '{}'; i int;
begin
  -- permessi
  begin perform * from public.santa_assignments;  raise exception 'FAIL: anon legge assignments';
  exception when insufficient_privilege then null; end;
  begin perform * from public.santa_participants; raise exception 'FAIL: anon legge participants';
  exception when insufficient_privilege then null; end;
  begin perform * from public.santa_settings;     raise exception 'FAIL: anon legge settings';
  exception when insufficient_privilege then null; end;
  begin perform public._santa_ensure_draw();      raise exception 'FAIL: anon forza estrazione';
  exception when insufficient_privilege then null; end;
  begin perform public.reset_secret_santa();      raise exception 'FAIL: anon resetta';
  exception when insufficient_privilege then null; end;
  raise notice 'OK  tabelle e funzioni interne inaccessibili';

  -- fase 1: iscrizioni
  if public.register_secret_santa('Martina', '12a4')->>'error' <> 'INVALID_PIN' then raise exception 'FAIL pin'; end if;
  if public.register_secret_santa('Babbo Natale', '1234')->>'error' <> 'NOT_FOUND' then raise exception 'FAIL nome'; end if;
  for i in 1..7 loop
    res := public.register_secret_santa(names[i], lpad(i::text, 4, '0'));
    if (res->>'ok')::boolean is not true then raise exception 'FAIL iscrizione %: %', names[i], res; end if;
  end loop;

  -- l'impostore si iscrive come Luca: non vede niente perché non c'è estrazione
  if (public.register_secret_santa('Luca', '6666')->>'ok')::boolean is not true then raise exception 'FAIL impostore'; end if;
  if public.reveal_secret_santa('Luca', '6666')->>'error' <> 'NOT_STARTED' then raise exception 'FAIL: si vede prima dell''avvio'; end if;
  -- il vero Luca trova il nome occupato
  if public.register_secret_santa('Luca', '8888')->>'error' <> 'ALREADY_REGISTERED' then raise exception 'FAIL doppia iscrizione'; end if;
  raise notice 'OK  prima dell''avvio nessuno vede nulla; un nome già iscritto è bloccato';

  -- l'impostore non può avviare l'estrazione né liberare nomi senza codice
  if public.organizer_start_draw('indovino')->>'error' <> 'WRONG_CODE' then raise exception 'FAIL start senza codice'; end if;
  if public.organizer_release_name('indovino', 'Luca')->>'error' <> 'WRONG_CODE' then raise exception 'FAIL release senza codice'; end if;
  if public.get_secret_santa_status()->>'phase' <> 'registration' then raise exception 'FAIL fase'; end if;
  raise notice 'OK  senza codice organizzatrice non si avvia e non si libera nulla';

  -- l'organizzatrice libera Luca, il vero Luca si iscrive
  if (public.organizer_release_name(oc, 'Luca')->>'ok')::boolean is not true then raise exception 'FAIL release'; end if;
  if (public.register_secret_santa('Luca', '0008')->>'ok')::boolean is not true then raise exception 'FAIL Luca vero'; end if;
  raise notice 'OK  l''organizzatrice libera il nome e il vero proprietario si iscrive';

  -- avvio
  if (public.organizer_start_draw(oc)->>'ok')::boolean is not true then raise exception 'FAIL avvio'; end if;
  if public.organizer_start_draw(oc)->>'error' <> 'ALREADY_STARTED' then raise exception 'FAIL doppio avvio'; end if;
  if public.register_secret_santa('Luca', '1111')->>'error' <> 'DRAW_STARTED' then raise exception 'FAIL iscrizione tardiva'; end if;
  if public.organizer_release_name(oc, 'Luca')->>'error' <> 'DRAW_STARTED' then raise exception 'FAIL release tardiva'; end if;
  if public.reveal_secret_santa('Luca', '6666')->>'error' <> 'WRONG_PIN' then raise exception 'FAIL: il PIN dell''impostore funziona ancora'; end if;
  raise notice 'OK  estrazione avviata una sola volta; il vecchio PIN dell''impostore non funziona';

  -- fase 2: ognuno vede il suo
  for i in 1..8 loop
    res := public.reveal_secret_santa(names[i], lpad(i::text, 4, '0'));
    if (res->>'ok')::boolean is not true then raise exception 'FAIL reveal %: %', names[i], res; end if;
    if res->>'receiver' = names[i] then raise exception 'FAIL % ha pescato sé stesso', names[i]; end if;
    got := got || (res->>'receiver');
  end loop;
  if (select count(distinct x) from unnest(got) x) <> 8 then raise exception 'FAIL duplicati: %', got; end if;
  raise notice 'OK  8 rivelazioni: nessuno pesca sé stesso, ognuno pescato una volta: %', got;

  res := public.reveal_secret_santa('Martina', '0001');
  if res->>'receiver' <> got[1] or (res->>'first_time')::boolean then raise exception 'FAIL rientro: %', res; end if;
  raise notice 'OK  rientrando si vede sempre lo stesso nome';

  for i in 1..4 loop
    if public.reveal_secret_santa('Rebecca', '9999')->>'error' <> 'WRONG_PIN' then raise exception 'FAIL pin errato'; end if;
  end loop;
  if public.reveal_secret_santa('Rebecca', '9999')->>'error' <> 'LOCKED' then raise exception 'FAIL blocco'; end if;
  if public.reveal_secret_santa('Rebecca', '0002')->>'error' <> 'LOCKED' then raise exception 'FAIL blocco pin giusto'; end if;
  raise notice 'OK  5 PIN errati bloccano il nome per 15 minuti';

  if public.get_secret_santa_status()::text ~ 'receiver' then raise exception 'FAIL stato espone coppie'; end if;
  raise notice 'OK  stato pubblico senza coppie: %', public.get_secret_santa_status();

  -- codice organizzatrice: blocco dopo 5 errori
  for i in 1..4 loop perform public.organizer_login('no'); end loop;
  if public.organizer_login('no')->>'error' <> 'LOCKED' then raise exception 'FAIL blocco organizzatrice'; end if;
  if public.organizer_login(oc)->>'error' <> 'LOCKED' then raise exception 'FAIL blocco organizzatrice 2'; end if;
  raise notice 'OK  5 codici organizzatrice errati bloccano il pannello per 15 minuti';
end $$;
reset role;

-- Stress test: 2000 estrazioni
do $$
declare
  k integer; bad integer := 0; pair_counts jsonb := '{}'; c integer; mn integer; mx integer;
begin
  for k in 1..2000 loop
    delete from santa_assignments;
    perform public._santa_ensure_draw();
    if exists (select 1 from santa_assignments where giver_id = receiver_id)
       or (select count(*) from santa_assignments) <> 8
       or (select count(distinct receiver_id) from santa_assignments) <> 8 then bad := bad + 1; end if;
    perform public._santa_ensure_draw();
    if (select count(*) from santa_assignments) <> 8 then bad := bad + 1; end if;
    select pair_counts || jsonb_object_agg(key, coalesce((pair_counts->>key)::int, 0) + 1) into pair_counts
      from (select giver_id || '>' || receiver_id as key from santa_assignments) s;
  end loop;
  select min(v::int), max(v::int), count(*) into mn, mx, c from jsonb_each_text(pair_counts) as e(k, v);
  if bad > 0 then raise exception 'FAIL % estrazioni non valide', bad; end if;
  if c <> 56 then raise exception 'FAIL coppie osservate % invece di 56', c; end if;
  raise notice 'OK  2000 estrazioni valide; 56/56 coppie, frequenza min % max % (attesa ≈ 286)', mn, mx;
  perform public.reset_secret_santa();
end $$;
