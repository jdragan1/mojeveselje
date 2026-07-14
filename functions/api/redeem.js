// API ruta: /api/redeem
// POST {code} -> proverava da li kod postoji u KV bazi i da nije vec iskorisen.
// Kodove RUCNO dodajes u Cloudflare dashboard-u: Storage & Databases -> KV -> tvoj namespace -> Add entry
//   Key:   code:SVADBA2026-ABCD   (mora poceti sa "code:")
//   Value: {"used":false}

function json(obj, status) {
  return new Response(JSON.stringify(obj), { status: status || 200, headers: { 'content-type': 'application/json' } });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.INVITES) {
    return json({ error: 'KV baza nije povezana sa ovim Pages projektom.' }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ error: 'Neispravan zahtev.' }, 400);
  }

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
