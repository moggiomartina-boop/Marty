/**
 * Servizio di produzione: Supabase (Auth via codice email + RPC PostgREST).
 * Nessuna dipendenza: bastano fetch e la anon key.
 *
 * Flusso: checkEmail (nome ↔ email) → sendCode (Supabase invia il codice) →
 * reveal (verifica il codice, ottiene un token e chiede SOLO il proprio nome).
 * Il token resta in memoria il tempo di una richiesta: non viene salvato,
 * così su un telefono condiviso nessuno può riaprire la sessione di un altro.
 */
export function createSupabaseService(url, anonKey) {
  const base = url.replace(/\/+$/, '');
  const headers = (token = anonKey) => ({
    apikey: anonKey,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  });

  async function post(path, body, token) {
    try {
      const res = await fetch(`${base}${path}`, {
        method: 'POST',
        headers: headers(token),
        body: JSON.stringify(body ?? {}),
        cache: 'no-store',
      });
      const data = await res.json().catch(() => ({}));
      return { status: res.status, ok: res.ok, data };
    } catch {
      return { status: 0, ok: false, data: null };
    }
  }

  return {
    mode: 'supabase',

    async getStatus() {
      const r = await post('/rest/v1/rpc/get_secret_santa_status');
      if (!r.ok || !Array.isArray(r.data)) throw new Error('SERVER');
      return r.data;
    },

    async checkEmail(name, email) {
      const r = await post('/rest/v1/rpc/check_secret_santa_email', { p_name: name, p_email: email });
      if (r.status === 0) return { ok: false, error: 'NETWORK' };
      if (!r.ok) return { ok: false, error: 'SERVER' };
      return r.data?.ok ? { ok: true } : { ok: false, error: 'EMAIL_MISMATCH' };
    },

    async sendCode(email) {
      const r = await post('/auth/v1/otp', { email: email.trim().toLowerCase(), create_user: true });
      if (r.ok) return { ok: true };
      if (r.status === 0) return { ok: false, error: 'NETWORK' };
      if (r.status === 429) return { ok: false, error: 'RATE_LIMIT' };
      return { ok: false, error: 'SEND_FAILED' };
    },

    async reveal(name, email, code) {
      const v = await post('/auth/v1/verify', { type: 'email', email: email.trim().toLowerCase(), token: code });
      if (v.status === 0) return { ok: false, error: 'NETWORK' };
      if (v.status === 429) return { ok: false, error: 'RATE_LIMIT' };
      const token = v.data?.access_token;
      if (!v.ok || !token) return { ok: false, error: 'INVALID_CODE' };

      const r = await post('/rest/v1/rpc/my_secret_santa', {}, token);
      if (!r.ok || !r.data) return { ok: false, error: r.status === 0 ? 'NETWORK' : 'SERVER' };
      if (r.data.ok && r.data.giver !== name) return { ok: false, error: 'EMAIL_MISMATCH' };
      return r.data;
    },
  };
}
