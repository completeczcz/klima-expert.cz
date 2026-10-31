// Cloudflare Pages Function: příjem poptávek z /poptavka/
// Bindings (Cloudflare → Pages → Settings → Bindings / Variables):
//   DB                 – D1 databáze (schema v /db/schema.sql)
//   TURNSTILE_SECRET   – tajný klíč Turnstile (nepovinné, ale doporučené)
//   RESEND_API_KEY     – API klíč Resend.com pro e-mailové notifikace (nepovinné)
//   NOTIFY_TO          – kam posílat notifikace, např. info@klima-expert.cz
//   NOTIFY_FROM        – odesílatel, např. "Klima Expert <poptavky@klima-expert.cz>" (doména ověřená v Resend)

const FIELDS = {
  typ: 40, mistnosti: 20, plocha: 10, ucel: 40, znacka: 60, venkovni: 40,
  dum: 40, plocha_tc: 10, zdroj: 60, soustava: 40, dotace: 5,
  servis: 40, servis_zarizeni: 200,
  psc: 10, obec: 80, kraj: 40, termin: 40,
  jmeno: 100, telefon: 25, email: 120, poznamka: 2000, souhlas: 5,
  zdroj_stranky: 300, kampan: 300, gclid: 200, zkraceny: 2,
};

// PSČ → kraj (orientačně, pro krátký formulář z reklamních stránek)
const PSC_KRAJ = [
  [/^1/, 'praha'], [/^2[5-9]/, 'stredocesky-kraj'], [/^3[0-4]/, 'plzensky-kraj'], [/^3[56]/, 'karlovarsky-kraj'],
  [/^39[3-6]/, 'kraj-vysocina'], [/^3[7-9]/, 'jihocesky-kraj'], [/^4[0-4]/, 'ustecky-kraj'], [/^4[67]/, 'liberecky-kraj'],
  [/^51[2-3]/, 'liberecky-kraj'], [/^5[0145]/, 'kralovehradecky-kraj'], [/^5[367]/, 'pardubicky-kraj'], [/^5[89]/, 'kraj-vysocina'],
  [/^67[45]/, 'kraj-vysocina'], [/^6/, 'jihomoravsky-kraj'], [/^7[0-4]/, 'moravskoslezsky-kraj'], [/^7[56]/, 'zlinsky-kraj'],
  [/^7[7-9]/, 'olomoucky-kraj'],
];
const guessKraj = (psc) => (PSC_KRAJ.find(([re]) => re.test(psc.replace(/\s/g, ''))) || [])[1] || '';
const TYPES = ['klimatizace-byt', 'klimatizace-dum', 'klimatizace-kancelar', 'tepelne-cerpadlo', 'servis', 'zavolat'];
const TYPE_LABEL = {
  'klimatizace-byt': 'Klimatizace do bytu', 'klimatizace-dum': 'Klimatizace do domu',
  'klimatizace-kancelar': 'Klimatizace do kanceláře / provozovny', 'tepelne-cerpadlo': 'Tepelné čerpadlo vzduch-voda',
  servis: 'Servis / čištění / oprava', zavolat: 'Zavolejte mi zpět',
};

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export async function onRequestPost({ request, env }) {
  const wantsJson = (request.headers.get('accept') || '').includes('application/json');
  const fail = (error, status = 400) =>
    wantsJson ? json({ ok: false, error }, status) : Response.redirect(new URL('/poptavka/?chyba=1', request.url), 303);

  // Ochrana: stejný původ
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) return fail('origin', 403);

  let raw = {};
  try {
    const ct = request.headers.get('content-type') || '';
    if (ct.includes('application/json')) raw = await request.json();
    else raw = Object.fromEntries(await request.formData());
  } catch {
    return fail('bad-body');
  }

  // Honeypot – boti vyplní skryté pole; tváříme se, že je vše v pořádku
  if (raw.web) return wantsJson ? json({ ok: true, id: 0 }) : Response.redirect(new URL('/dekujeme/', request.url), 303);

  const d = {};
  for (const [k, max] of Object.entries(FIELDS)) {
    const v = raw[k];
    d[k] = typeof v === 'string' ? v.trim().slice(0, max) : '';
  }

  // Validace
  if (!TYPES.includes(d.typ)) return fail('typ');
  const callback = d.typ === 'zavolat';
  if (!callback && !/^\d{3}\s?\d{2}$/.test(d.psc)) return fail('psc');
  const short = d.zkraceny === '1' || callback;
  if (!d.kraj && d.psc) d.kraj = guessKraj(d.psc);
  if ((!short && !d.obec) || (!callback && !d.kraj) || !d.jmeno) return fail('povinne');
  if (!/^\+?[\d\s]{9,17}$/.test(d.telefon)) return fail('telefon');
  if ((!short || d.email) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) return fail('email');
  if (d.souhlas !== 'ano') return fail('souhlas');

  const ip = request.headers.get('cf-connecting-ip') || '';

  // Turnstile (pokud je nastaven)
  let captchaNote = null;
  if (env.TURNSTILE_SECRET) {
    const token = raw['cf-turnstile-response'];
    const body = new FormData();
    body.append('secret', env.TURNSTILE_SECRET);
    body.append('response', String(token || ''));
    body.append('remoteip', ip);
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
    const out = await r.json().catch(() => ({}));
    // Neúspěšné ověření poptávku nezahodí (některé prohlížeče a rozšíření Turnstile blokují),
    // jen ji označí ke kontrole. Proti spamu dál chrání honeypot a limit na IP.
    if (!out.success) captchaNote = 'Ověření Turnstile neprošlo – zkontrolovat, zda nejde o spam.';
  }

  // Jednoduchý limit: max 5 poptávek z jedné IP za hodinu
  const ipHash = ip ? await sha256(ip + (env.IP_SALT || 'klima-expert')) : '';
  if (env.DB && ipHash) {
    const row = await env.DB.prepare("SELECT COUNT(*) AS n FROM leads WHERE ip_hash = ? AND created_at > datetime('now', '-1 hour')").bind(ipHash).first();
    if (row && row.n >= 5) return fail('limit', 429);
  }

  const detail = {
    mistnosti: d.mistnosti, plocha: d.plocha, ucel: d.ucel, znacka: d.znacka, venkovni: d.venkovni,
    dum: d.dum, plocha_tc: d.plocha_tc, zdroj: d.zdroj, soustava: d.soustava, dotace: d.dotace,
    servis: d.servis, servis_zarizeni: d.servis_zarizeni,
  };
  for (const k of Object.keys(detail)) if (!detail[k]) delete detail[k];

  let id = 0;
  if (env.DB) {
    const res = await env.DB.prepare(
      `INSERT INTO leads (typ, detail, psc, obec, kraj, termin, jmeno, telefon, email, poznamka, zdroj_stranky, kampan, gclid, ip_hash, user_agent, poznamka_interni)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(d.typ, JSON.stringify(detail), d.psc, d.obec, d.kraj, d.termin, d.jmeno, d.telefon, d.email, d.poznamka,
        d.zdroj_stranky, d.kampan, d.gclid, ipHash, (request.headers.get('user-agent') || '').slice(0, 300), captchaNote)
      .run();
    id = res.meta?.last_row_id ?? 0;
  }

  // Notifikace e-mailem (nezablokuje uložení poptávky)
  {
    const rows = [
      ['Typ', TYPE_LABEL[d.typ]], ...Object.entries(detail), ['Místo', `${d.psc} ${d.obec} (${d.kraj})`], ['Termín', d.termin],
      ['Jméno', d.jmeno], ['Telefon', d.telefon], ['E-mail', d.email], ['Poznámka', d.poznamka],
      ['Vstupní stránka', d.zdroj_stranky], ['Kampaň', d.kampan], ['GCLID', d.gclid],
    ].filter(([, v]) => v);
    const html = `<h2>Nová poptávka #${id} – ${esc(TYPE_LABEL[d.typ])}</h2><table cellpadding="6" style="border-collapse:collapse">${rows
      .map(([k, v]) => `<tr><td style="border-bottom:1px solid #ddd"><b>${esc(k)}</b></td><td style="border-bottom:1px solid #ddd">${esc(v)}</td></tr>`)
      .join('')}</table>`;
    const subject = d.typ === 'zavolat'
      ? `${captchaNote ? '[ke kontrole] ' : ''}Zavolat zpět #${id}: ${d.jmeno}, ${d.telefon}`
      : `${captchaNote ? '[ke kontrole] ' : ''}Poptávka #${id}: ${TYPE_LABEL[d.typ]} – ${d.obec}`;
    // 1) Cloudflare Email Routing přes Worker klima-expert-mailer (bez dalších služeb)
    if (env.MAILER) {
      const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\nAdministrace: https://klima-expert.cz/admin/`;
      await env.MAILER.fetch('https://mailer/send', { method: 'POST', body: JSON.stringify({ subject, html: html + '<p><a href="https://klima-expert.cz/admin/">Otevřít administraci</a></p>', text, replyTo: d.email }) }).catch(() => null);
    }
    // 2) Resend (volitelně): potvrzení zákazníkovi, případně upozornění, když chybí MAILER
    if (env.RESEND_API_KEY && env.NOTIFY_TO) {
    const send = (payload) =>
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => null);
    const from = env.NOTIFY_FROM || 'Klima Expert <poptavky@klima-expert.cz>';
    await Promise.all([
      !env.MAILER && send({ from, to: env.NOTIFY_TO.split(',').map((s) => s.trim()), reply_to: d.email, subject, html }),
      d.email && !captchaNote && send({
        from, to: [d.email], subject: 'Děkujeme za poptávku – Klima Expert',
        html: `<p>Dobrý den, ${esc(d.jmeno)},</p><p>děkujeme za poptávku (${esc(TYPE_LABEL[d.typ])}, ${esc(d.obec)}). Ozveme se vám do 1 pracovního dne a domluvíme další postup. Poptávku předáme jedné partnerské montážní firmě z vašeho kraje, která připraví zaměření a cenovou nabídku zdarma.</p><p>S pozdravem<br>Klima Expert<br>klima-expert.cz</p>`,
      }),
    ]);
    }
  }

  return wantsJson ? json({ ok: true, id }) : Response.redirect(new URL('/dekujeme/', request.url), 303);
}

export async function onRequest({ request }) {
  if (request.method === 'POST') return; // obslouží onRequestPost
  return json({ ok: false, error: 'method' }, 405);
}

async function sha256(s) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
