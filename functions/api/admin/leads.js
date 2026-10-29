// GET  /api/admin/leads?stav=&kraj=&limit=  – seznam poptávek
// POST /api/admin/leads  {id, stav?, partner?, poznamka_interni?} – změna stavu / předání partnerovi
const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
const STAVY = ['nová', 'předaná', 'zaměřeno', 'realizováno', 'ztracená', 'spam'];

export async function onRequestGet({ request, env }) {
  if (!env.DB) return json({ ok: false, error: 'no-db' }, 500);
  const u = new URL(request.url);
  const where = [], args = [];
  if (u.searchParams.get('stav')) { where.push('stav = ?'); args.push(u.searchParams.get('stav')); }
  if (u.searchParams.get('kraj')) { where.push('kraj = ?'); args.push(u.searchParams.get('kraj')); }
  const limit = Math.min(500, +u.searchParams.get('limit') || 200);
  const sql = `SELECT id, created_at, typ, detail, psc, obec, kraj, termin, jmeno, telefon, email, poznamka, zdroj_stranky, kampan, gclid, stav, partner, predano_at, poznamka_interni
               FROM leads ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY id DESC LIMIT ${limit}`;
  const { results } = await env.DB.prepare(sql).bind(...args).all();
  return json({ ok: true, leads: results, stavy: STAVY });
}

export async function onRequestPost({ request, env }) {
  if (!env.DB) return json({ ok: false, error: 'no-db' }, 500);
  let b = {};
  try { b = await request.json(); } catch { return json({ ok: false }, 400); }
  const id = +b.id;
  if (!id) return json({ ok: false, error: 'id' }, 400);
  const sets = [], args = [];
  if (b.stav !== undefined) {
    if (!STAVY.includes(b.stav)) return json({ ok: false, error: 'stav' }, 400);
    sets.push('stav = ?'); args.push(b.stav);
    if (b.stav === 'předaná') sets.push("predano_at = COALESCE(predano_at, datetime('now'))");
  }
  if (b.partner !== undefined) { sets.push('partner = ?'); args.push(String(b.partner).slice(0, 200)); }
  if (b.poznamka_interni !== undefined) { sets.push('poznamka_interni = ?'); args.push(String(b.poznamka_interni).slice(0, 2000)); }
  if (!sets.length) return json({ ok: false, error: 'nic' }, 400);
  await env.DB.prepare(`UPDATE leads SET ${sets.join(', ')} WHERE id = ?`).bind(...args, id).run();
  return json({ ok: true });
}
