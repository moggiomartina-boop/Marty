/**
 * Servizio di produzione: parla con Supabase tramite le sole funzioni RPC
 * esposte (PostgREST). Nessuna dipendenza: bastano fetch e la anon key.
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
      if (!Array.isArray(data)) throw new Error(data?.error || 'SERVER');
      return data;
    },
    claim: (name, pin) => rpc('claim_secret_santa', { p_name: name, p_pin: pin }),
    reveal: (name, pin) => rpc('reveal_secret_santa', { p_name: name, p_pin: pin }),
  };
}
