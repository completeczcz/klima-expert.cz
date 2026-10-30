// Klima Expert – odesílání upozornění o nových poptávkách přes Cloudflare Email Routing.
// Volá se jen přes service binding z Pages (workers.dev je vypnutý). Odesílá na ověřenou adresu v bindingu SEB.
import { EmailMessage } from 'cloudflare:email';

const FROM = 'poptavky@klima-expert.cz';
const b64 = (s) => {
  const bytes = new TextEncoder().encode(s);
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
};
const wrap = (s) => s.replace(/.{1,76}/g, '$&\r\n').trim();
const hdr = (s) => '=?UTF-8?B?' + b64(String(s).replace(/[\r\n]+/g, ' ')) + '?=';
const cleanAddr = (s) => (/^[^\s@<>"\r\n]+@[^\s@<>"\r\n]+\.[a-z]{2,}$/i.test(s || '') ? s : '');

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
    const { subject = 'Nová poptávka', html = '', text = '', replyTo = '', to } = await request.json().catch(() => ({}));
    const rcpt = cleanAddr(to) || env.NOTIFY_TO || 'ps@completecz.cz';
    const reply = cleanAddr(replyTo);
    const boundary = 'ke-' + crypto.randomUUID();
    const raw = [
      `From: ${hdr('Klima Expert')} <${FROM}>`,
      `To: <${rcpt}>`,
      reply ? `Reply-To: <${reply}>` : null,
      `Subject: ${hdr(subject)}`,
      `Message-ID: <${crypto.randomUUID()}@klima-expert.cz>`,
      `Date: ${new Date().toUTCString()}`,
      'MIME-Version: 1.0',
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
      '',
      `--${boundary}`,
      'Content-Type: text/plain; charset=UTF-8',
      'Content-Transfer-Encoding: base64',
      '',
      wrap(b64(text || html.replace(/<[^>]+>/g, ' '))),
      `--${boundary}`,
      'Content-Type: text/html; charset=UTF-8',
      'Content-Transfer-Encoding: base64',
      '',
      wrap(b64(html || text)),
      `--${boundary}--`,
      '',
    ].filter((l) => l !== null).join('\r\n');
    try {
      await env.SEB.send(new EmailMessage(FROM, rcpt, raw));
      return Response.json({ ok: true });
    } catch (e) {
      return Response.json({ ok: false, error: String(e && e.message || e) }, { status: 500 });
    }
  },
};
