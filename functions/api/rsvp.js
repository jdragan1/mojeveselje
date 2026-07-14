// API ruta: /api/rsvp
// POST -> gost salje potvrdu dolaska {id, prezime, glava, bracni, clanovi, dolazak, brojOsoba, napomena}
// GET  -> ?id=xxxx&host=TOKEN vraca spisak svih potvrda (samo ako je host token ispravan)

function genId(n) {
  n = n || 6;
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const arr = new Uint8Array(n);
  crypto.getRandomValues(arr);
  let s = '';
  for (let i = 0; i < n; i++) s += chars[arr[i] % chars.length];
  return s;
}

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.INVITES) {
    return new Response(JSON.stringify({ error: 'KV baza (INVITES) nije povezana sa ovim Pages projektom.' }), { status: 500, headers: { 'content-type': 'application/json' } });
  }

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Neispravan zahtev.' }), { status: 400, headers: { 'content-type': 'application/json' } });
  }

  const { id } = body;
  if (!id) return new Response(JSON.stringify({ error: 'Nedostaje id pozivnice.' }), { status: 400, headers: { 'content-type': 'application/json' } });

  const inviteRaw = await env.INVITES.get('invite:' + id);
  if (!inviteRaw) return new Response(JSON.stringify({ error: 'Pozivnica ne postoji.' }), { status: 404, headers: { 'content-type': 'application/json' } });

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

  return new Response(JSON.stringify({ ok: true }), { headers: { 'content-type': 'application/json' } });
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  const host = url.searchParams.get('host');
  if (!id || !host) return new Response(JSON.stringify({ error: 'Nedostaju parametri.' }), { status: 400, headers: { 'content-type': 'application/json' } });

  if (!env.INVITES) {
    return new Response(JSON.stringify({ error: 'KV baza (INVITES) nije povezana sa ovim Pages projektom.' }), { status: 500, headers: { 'content-type': 'application/json' } });
  }

  const inviteRaw = await env.INVITES.get('invite:' + id);
  if (!inviteRaw) return new Response(JSON.stringify({ error: 'Pozivnica ne postoji.' }), { status: 404, headers: { 'content-type': 'application/json' } });

  const invite = JSON.parse(inviteRaw);
  if (invite.hostToken !== host) {
    return new Response(JSON.stringify({ error: 'Nemate pristup ovom panelu.' }), { status: 403, headers: { 'content-type': 'application/json' } });
  }

  const list = await env.INVITES.list({ prefix: 'rsvp:' + id + ':' });
  const rows = [];
  for (const k of list.keys) {
    const v = await env.INVITES.get(k.name);
    if (v) rows.push(JSON.parse(v));
  }

  return new Response(JSON.stringify({ rows }), { headers: { 'content-type': 'application/json' } });
}
