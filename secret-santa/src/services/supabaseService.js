/**
 * Servizio di produzione: Supabase tramite le sole funzioni RPC (PostgREST).
 * Nessuna dipendenza: bastano fetch e la anon key.
 * Il browser non riceve MAI l'elenco delle coppie: solo il proprio destinatario.
 */
export function createSupabaseService(url, anonKey) {
  const base = url.replace(/\/+$/, '');

  async function rpc(fn, body = {}) {
    let res;
    try {
      res = await fetch(`${base}/rest/v1/rpc/${fn}`, {
        method: 'POST',
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        cache: 'no-store',
      });
    } catch {
      return { ok: false, error: 'NETWORK' };
    }
    if (!res.ok) return { ok: false, error: 'SERVER' };
    return res.json();
  }

  return {
    mode: 'supabase',
    async getStatus() {
      const data = await rpc('get_secret_santa_status');
      if (!data || !Array.isArray(data.participants)) throw new Error('SERVER');
      return data;
    },
    register: (name, pin) => rpc('register_secret_santa', { p_name: name, p_pin: pin }),
    reveal: (name, pin) => rpc('reveal_secret_santa', { p_name: name, p_pin: pin }),
    organizer: {
      login: (code) => rpc('organizer_login', { p_code: code }),
      release: (code, name) => rpc('organizer_release_name', { p_code: code, p_name: name }),
      start: (code) => rpc('organizer_start_draw', { p_code: code }),
      reset: (code) => rpc('organizer_reset', { p_code: code }),
    },
  };
}
