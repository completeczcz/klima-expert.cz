// Příjem zájmu montážních firem o spolupráci. Binding DB (tabulka partners), volitelně RESEND_API_KEY + NOTIFY_TO.
const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { 'content-type': 'application/json; charset=utf-8' } });
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ ok: false }, 403);
  let raw = {};
  try { raw = await request.json(); } catch { return json({ ok: false, error: 'body' }, 400); }
  if (raw.web) return json({ ok: true });
  const f = (k, n) => (typeof raw[k] === 'string' ? raw[k].trim().slice(0, n) : '');
  const d = { firma: f('firma', 120), ico: f('ico', 8), jmeno: f('jmeno', 100), telefon: f('telefon', 25), email: f('email', 120), kraje: f('kraje', 400), poznamka: f('poznamka', 1500) };
  if (!d.firma || !/^\d{8}$/.test(d.ico) || !d.jmeno || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) || f('souhlas', 5) !== 'ano') return json({ ok: false, error: 'validace' }, 400);
  if (env.DB) {
    await env.DB.prepare('INSERT INTO partners (firma, ico, jmeno, telefon, email, kraje, poznamka) VALUES (?, ?, ?, ?, ?, ?, ?)')
      .bind(d.firma, d.ico, d.jmeno, d.telefon, d.email, d.kraje, d.poznamka).run();
  }
  if (env.RESEND_API_KEY && env.NOTIFY_TO) {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: env.NOTIFY_FROM || 'Klima Expert <poptavky@klima-expert.cz>', to: env.NOTIFY_TO.split(',').map((s) => s.trim()), reply_to: d.email,
        subject: `Zájem o spolupráci: ${d.firma}`,
        html: Object.entries(d).map(([k, v]) => `<p><b>${esc(k)}:</b> ${esc(v)}</p>`).join(''),
      }),
    }).catch(() => null);
  }
  return json({ ok: true });
}
