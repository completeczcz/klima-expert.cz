// GET /api/admin/mailtest – zkušební e-mail přes MAILER, vrací odpověď workeru (diagnostika doručování).
export async function onRequestGet({ env }) {
  if (!env.MAILER) return Response.json({ ok: false, error: 'no-mailer-binding' }, { status: 500 });
  const r = await env.MAILER.fetch('https://mailer/send', { method: 'POST', body: JSON.stringify({ subject: 'Klima Expert – test doručení', html: '<p>Testovací e-mail z klima-expert.cz.</p>', text: 'Testovací e-mail z klima-expert.cz.' }) });
  return new Response(await r.text(), { status: r.status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
}
