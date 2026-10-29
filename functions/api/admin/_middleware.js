// Ochrana administrace: Cloudflare Access (doporučeno) nebo tajný token.
// Proměnné: ADMIN_EMAILS = "a@b.cz,c@d.cz" (e-maily povolené v Cloudflare Access), ADMIN_TOKEN = dlouhý náhodný řetězec.
export async function onRequest({ request, env, next }) {
  const email = (request.headers.get('cf-access-authenticated-user-email') || '').toLowerCase();
  const allowed = (env.ADMIN_EMAILS || '').toLowerCase().split(',').map((s) => s.trim()).filter(Boolean);
  const token = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  const okAccess = email && allowed.includes(email);
  const okToken = env.ADMIN_TOKEN && env.ADMIN_TOKEN.length >= 24 && token === env.ADMIN_TOKEN;
  if (!okAccess && !okToken) return new Response(JSON.stringify({ ok: false, error: 'unauthorized' }), { status: 401, headers: { 'content-type': 'application/json' } });
  return next();
}
