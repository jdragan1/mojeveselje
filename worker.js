// Glavni Worker fajl. Rutira /api/* zahteve na logiku ispod,
// a sve ostalo prosledjuje statickim fajlovima iz /public (index.html, SPA fallback).

function json(obj, status) {
  return new Response(JSON.stringify(obj), { status: status || 200, headers: { 'content-type': 'application/json' } });
}

function genId(n) {
  n = n || 8;
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const arr = new Uint8Array(n);
  crypto.getRandomValues(arr);
  let s = '';
  for (let i = 0; i < n; i++) s += chars[arr[i] % chars.length];
  return s;
}

async function handleInvitePost(request, env) {
  if (!env.INVITES) return json({ error: 'KV baza (INVITES) nije povezana. Pogledaj UPUTSTVO.md.' }, 500);
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 9000000) return json({ error: 'Pozivnica je prevelika. Smanjite broj ili velicinu fotografija.' }, 413);
  let body;
  try { body = await request.json(); } catch (e) { return json({ error: 'Neispravan zahtev.' }, 400); }
  const id = genId(8);
  const hostToken = genId(10);
  const invite = Object.assign({}, body, { hostToken, createdAt: Date.now() });
  await env.INVITES.put('invite:' + id, JSON.stringify(invite));
  return json({ id, hostToken });
}

async function handleInviteGet(url, env) {
  const id = url.searchParams.get('id');
  if (!id) return json({ error: 'Nedostaje id.' }, 400);
  if (!env.INVITES) return json({ error: 'KV baza (INVITES) nije povezana.' }, 500);
  const raw = await env.INVITES.get('invite:' + id);
  if (!raw) return json({ error: 'Pozivnica nije pronadjena.' }, 404);
  const invite = JSON.parse(raw);
  delete invite.hostToken; // nikad ne saljemo tajni token gostima
  return json(invite);
}

async function handleRsvpPost(request, env) {
  if (!env.INVITES) return json({ error: 'KV baza (INVITES) nije povezana.' }, 500);
  let body;
  try { body = await request.json(); } catch (e) { return json({ error: 'Neispravan zahtev.' }, 400); }
  const { id } = body;
  if (!id) return json({ error: 'Nedostaje id pozivnice.' }, 400);
  const inviteRaw = await env.INVITES.get('invite:' + id);
  if (!inviteRaw) return json({ error: 'Pozivnica ne postoji.' }, 404);
  const rsvp = {
    prezime: body.prezime || '',
    glava: body.glava || '',
    bracni: body.bracni || '',
    clanovi: body.clanovi || '',
    dolazak: body.dolazak || '',
    brojOsoba: body.brojOsoba || '',
    napomena: body.napomena || '',
    ts: Date.now()
  };
  const rid = genId(6);
  await env.INVITES.put('rsvp:' + id + ':' + rid, JSON.stringify(rsvp));
  return json({ ok: true });
}

async function handleRsvpGet(url, env) {
  const id = url.searchParams.get('id');
  const host = url.searchParams.get('host');
  if (!id || !host) return json({ error: 'Nedostaju parametri.' }, 400);
  if (!env.INVITES) return json({ error: 'KV baza (INVITES) nije povezana.' }, 500);
  const inviteRaw = await env.INVITES.get('invite:' + id);
  if (!inviteRaw) return json({ error: 'Pozivnica ne postoji.' }, 404);
  const invite = JSON.parse(inviteRaw);
  if (invite.hostToken !== host) return json({ error: 'Nemate pristup ovom panelu.' }, 403);
  const list = await env.INVITES.list({ prefix: 'rsvp:' + id + ':' });
  const rows = [];
  for (const k of list.keys) {
    const v = await env.INVITES.get(k.name);
    if (v) rows.push(JSON.parse(v));
  }
  return json({ rows });
}

async function handleRedeem(request, env) {
  if (!env.INVITES) return json({ error: 'KV baza (INVITES) nije povezana.' }, 500);
  let body;
  try { body = await request.json(); } catch (e) { return json({ error: 'Neispravan zahtev.' }, 400); }
  const code = (body.code || '').trim().toUpperCase();
  if (!code) return json({ error: 'Unesite kod.' }, 400);
  const key = 'code:' + code;
  const raw = await env.INVITES.get(key);
  if (!raw) return json({ error: 'Kod nije validan.' }, 404);
  let data;
  try { data = JSON.parse(raw); } catch (e) { data = { used: false }; }
  if (data.used) return json({ error: 'Ovaj kod je već iskorišćen.' }, 409);
  data.used = true;
  data.usedAt = Date.now();
  await env.INVITES.put(key, JSON.stringify(data));
  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;
    const method = request.method;

    if (pathname === '/api/invite') {
      if (method === 'POST') return handleInvitePost(request, env);
      if (method === 'GET') return handleInviteGet(url, env);
    }
    if (pathname === '/api/rsvp') {
      if (method === 'POST') return handleRsvpPost(request, env);
      if (method === 'GET') return handleRsvpGet(url, env);
    }
    if (pathname === '/api/redeem' && method === 'POST') {
      return handleRedeem(request, env);
    }

    // Sve ostalo (index.html i sve pozivnice tipa /abc123/) -> staticki fajlovi.
    // "not_found_handling": "single-page-application" u wrangler.jsonc automatski
    // vraca public/index.html za svaku putanju koja ne odgovara pravom fajlu.
    return env.ASSETS.fetch(request);
  }
};
