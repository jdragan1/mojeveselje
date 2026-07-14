// API ruta: /api/invite
// POST -> kreira novu pozivnicu, vraca {id, hostToken}
// GET  -> ?id=xxxx vraca javne podatke pozivnice (bez hostToken-a)

function genId(n) {
  n = n || 8;
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
    return new Response(JSON.stringify({ error: 'KV baza (INVITES) nije povezana sa ovim Pages projektom. Pogledaj UPUTSTVO.md.' }), { status: 500, headers: { 'content-type': 'application/json' } });
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 9000000) {
    return new Response(JSON.stringify({ error: 'Pozivnica je prevelika. Smanjite broj ili velicinu fotografija.' }), { status: 413, headers: { 'content-type': 'application/json' } });
  }

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Neispravan zahtev.' }), { status: 400, headers: { 'content-type': 'application/json' } });
  }

  const id = genId(8);
  const hostToken = genId(10);
  const invite = Object.assign({}, body, { hostToken, createdAt: Date.now() });

  await env.INVITES.put('invite:' + id, JSON.stringify(invite));

  return new Response(JSON.stringify({ id, hostToken }), { headers: { 'content-type': 'application/json' } });
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  if (!id) return new Response(JSON.stringify({ error: 'Nedostaje id.' }), { status: 400, headers: { 'content-type': 'application/json' } });

  if (!env.INVITES) {
    return new Response(JSON.stringify({ error: 'KV baza (INVITES) nije povezana sa ovim Pages projektom.' }), { status: 500, headers: { 'content-type': 'application/json' } });
  }

  const raw = await env.INVITES.get('invite:' + id);
  if (!raw) return new Response(JSON.stringify({ error: 'Pozivnica nije pronadjena.' }), { status: 404, headers: { 'content-type': 'application/json' } });

  const invite = JSON.parse(raw);
  delete invite.hostToken; // nikad ne saljemo tajni token gostima

  return new Response(JSON.stringify(invite), { headers: { 'content-type': 'application/json' } });
}
