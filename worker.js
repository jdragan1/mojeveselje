// Glavni Worker fajl. Rutira /api/* zahteve na logiku ispod,
// a sve ostalo prosledjuje statickim fajlovima iz /public (index.html, SPA fallback).

function escAttr(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

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
  const invite = Object.assign({}, body, { hostToken, active: !!body.active, createdAt: Date.now() });
  await env.INVITES.put('invite:' + id, JSON.stringify(invite));
  return json({ id, hostToken, active: invite.active });
}

async function incrementViews(env, id) {
  try {
    const key = 'views:' + id;
    const current = await env.INVITES.get(key);
    const n = (parseInt(current, 10) || 0) + 1;
    await env.INVITES.put(key, String(n));
  } catch (e) { /* najbolji pokusaj — brojac pregleda nije kriticna funkcija */ }
}

async function handleInviteGet(url, env, ctx) {
  const id = url.searchParams.get('id');
  const host = url.searchParams.get('host');
  if (!id) return json({ error: 'Nedostaje id.' }, 400);
  if (!env.INVITES) return json({ error: 'KV baza (INVITES) nije povezana.' }, 500);
  const raw = await env.INVITES.get('invite:' + id);
  if (!raw) return json({ error: 'Pozivnica nije pronadjena.' }, 404);
  const invite = JSON.parse(raw);
  const isHost = host && host === invite.hostToken;
  if (!invite.active && !isHost) {
    return json({ notActivated: true, title: invite.title || '' }, 200);
  }
  // Brojimo samo poglede gostiju (ne i domacina koji proverava svoju pozivnicu).
  if (!isHost && ctx && ctx.waitUntil) ctx.waitUntil(incrementViews(env, id));
  delete invite.hostToken; // nikad ne saljemo tajni token gostima
  return json(invite);
}

async function handleActivate(request, env) {
  if (!env.INVITES) return json({ error: 'KV baza (INVITES) nije povezana.' }, 500);
  let body;
  try { body = await request.json(); } catch (e) { return json({ error: 'Neispravan zahtev.' }, 400); }
  const { id, code } = body;
  if (!id || !code) return json({ error: 'Nedostaju podaci.' }, 400);
  const inviteRaw = await env.INVITES.get('invite:' + id);
  if (!inviteRaw) return json({ error: 'Pozivnica ne postoji.' }, 404);

  const codeKey = 'code:' + code.trim().toUpperCase();
  const codeRaw = await env.INVITES.get(codeKey);
  if (!codeRaw) return json({ error: 'Kod nije validan.' }, 404);
  let codeData;
  try { codeData = JSON.parse(codeRaw); } catch (e) { codeData = { used: false }; }
  if (codeData.used) return json({ error: 'Ovaj kod je već iskorišćen.' }, 409);

  codeData.used = true; codeData.usedAt = Date.now();
  await env.INVITES.put(codeKey, JSON.stringify(codeData));

  const invite = JSON.parse(inviteRaw);
  invite.active = true;
  await env.INVITES.put('invite:' + id, JSON.stringify(invite));

  return json({ ok: true });
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
    obrok: body.obrok || '',
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
  const views = parseInt(await env.INVITES.get('views:' + id), 10) || 0;
  return json({ rows, views });
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

async function handleCoverGet(url, env) {
  const id = url.searchParams.get('id');
  if (!id) return new Response('Nedostaje id.', { status: 400 });
  if (!env.INVITES) return new Response('KV nije povezan.', { status: 500 });
  const raw = await env.INVITES.get('invite:' + id);
  if (!raw) return new Response('Nije pronadjeno.', { status: 404 });
  const invite = JSON.parse(raw);
  const cover = invite.cover;
  if (!cover || !cover.startsWith('data:')) return new Response('Nema fotografije.', { status: 404 });
  const match = cover.match(/^data:([^;]+);base64,(.*)$/);
  if (!match) return new Response('Neispravan format slike.', { status: 400 });
  const mime = match[1];
  const binary = atob(match[2]);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Response(bytes, { headers: { 'content-type': mime, 'cache-control': 'public, max-age=86400' } });
}

// Pozivnice sadrze licne podatke gostiju/domacina (imena, adrese, fotografije) i NIKAD
// ne smeju zavrsiti indeksirane na Google-u. Zato uvek ubacujemo "noindex" za ove stranice,
// dok pocetna strana (landing page) ostaje normalno indeksirana (podeseno u samom index.html).
const NOINDEX_TAG = '<meta name="robots" content="noindex, nofollow">\n';

async function renderGuestHTML(request, env, id) {
  if (!env.INVITES) return null;
  const raw = await env.INVITES.get('invite:' + id);
  if (!raw) return null;
  const invite = JSON.parse(raw);

  const assetResp = await env.ASSETS.fetch(new Request(new URL('/index.html', request.url), request));
  if (!assetResp.ok) return null;
  let html = await assetResp.text();

  const url = new URL(request.url);
  const title = escAttr((invite.title || 'Pozivnica') + ' — Pozivnica');
  const kickers = { vencanje: 'Elektronska pozivnica za venčanje', krstenje: 'Elektronska pozivnica za krštenje', ispracaj: 'Obaveštenje o ispraćaju', ostalo: 'Pozivnica za proslavu' };
  const desc = escAttr((invite.message || kickers[invite.tpl] || 'Pogledajte pozivnicu i potvrdite dolazak.').slice(0, 180));
  const pageUrl = escAttr(url.origin + '/' + id + '/');
  const hasCover = invite.cover && invite.cover.startsWith('data:');
  const imageUrl = hasCover ? escAttr(url.origin + '/api/cover?id=' + id) : '';

  let metaTags = NOINDEX_TAG
    + '<meta property="og:type" content="website">\n'
    + '<meta property="og:title" content="' + title + '">\n'
    + '<meta property="og:description" content="' + desc + '">\n'
    + '<meta property="og:url" content="' + pageUrl + '">\n'
    + '<meta name="twitter:title" content="' + title + '">\n'
    + '<meta name="twitter:description" content="' + desc + '">\n';

  if (hasCover) {
    metaTags += '<meta property="og:image" content="' + imageUrl + '">\n'
      + '<meta property="og:image:width" content="1200">\n'
      + '<meta name="twitter:card" content="summary_large_image">\n'
      + '<meta name="twitter:image" content="' + imageUrl + '">\n';
  } else {
    metaTags += '<meta name="twitter:card" content="summary">\n';
  }

  html = html.replace(/<title>[\s\S]*?<\/title>/, '<title>' + title + '</title>');
  html = html.replace(/<!--OG_START-->[\s\S]*?<!--OG_END-->/, metaTags);

  return new Response(html, { headers: { 'content-type': 'text/html;charset=utf-8' } });
}

// Panel domacina (link sa tajnim tokenom) — nema potrebe za OG podacima, samo mora
// biti noindex, jer je to privatan link koji ne sme da zavrsi u pretrazivacima.
async function renderHostHTML(request, env) {
  const assetResp = await env.ASSETS.fetch(new Request(new URL('/index.html', request.url), request));
  if (!assetResp.ok) return null;
  let html = await assetResp.text();
  const metaTags = NOINDEX_TAG
    + '<meta name="twitter:card" content="summary">\n';
  html = html.replace(/<title>[\s\S]*?<\/title>/, '<title>Panel domaćina — Atelje Pozivnica</title>');
  html = html.replace(/<!--OG_START-->[\s\S]*?<!--OG_END-->/, metaTags);
  return new Response(html, { headers: { 'content-type': 'text/html;charset=utf-8' } });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;
    const method = request.method;

    if (pathname === '/api/invite') {
      if (method === 'POST') return handleInvitePost(request, env);
      if (method === 'GET') return handleInviteGet(url, env, ctx);
    }
    if (pathname === '/api/rsvp') {
      if (method === 'POST') return handleRsvpPost(request, env);
      if (method === 'GET') return handleRsvpGet(url, env);
    }
    if (pathname === '/api/redeem' && method === 'POST') {
      return handleRedeem(request, env);
    }
    if (pathname === '/api/activate' && method === 'POST') {
      return handleActivate(request, env);
    }
    if (pathname === '/api/cover' && method === 'GET') {
      return handleCoverGet(url, env);
    }

    // Link za panel domacina (npr. /abc123def/hosttoken123/) -> mora biti noindex,
    // to je privatan link sa tajnim tokenom, ne sme zavrsiti u pretrazivacima.
    const hostMatch = pathname.match(/^\/[a-z0-9]{6,10}\/[a-z0-9]{6,14}\/?$/i);
    if (hostMatch && method === 'GET') {
      const rendered = await renderHostHTML(request, env);
      if (rendered) return rendered;
    }

    // Link za goste (npr. /abc123def/) -> ubacujemo naslovnu sliku i naslov
    // u meta tagove, da se lepo prikaze kad se link podeli (WhatsApp/Viber/FB),
    // i uvek dodajemo noindex jer sadrzi licne podatke gostiju/domacina.
    const guestMatch = pathname.match(/^\/([a-z0-9]{6,10})\/?$/i);
    if (guestMatch && method === 'GET') {
      const rendered = await renderGuestHTML(request, env, guestMatch[1]);
      if (rendered) return rendered;
    }

    // Sve ostalo (pocetna strana, i sve sto nije pronadjeno) -> staticki fajlovi.
    // "not_found_handling": "single-page-application" u wrangler.jsonc automatski
    // vraca public/index.html za svaku putanju koja ne odgovara pravom fajlu.
    return env.ASSETS.fetch(request);
  }
};
