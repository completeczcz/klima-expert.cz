import { getCollection } from 'astro:content';
import { site } from '../data/site';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export async function GET() {
  const posts = (await getCollection('blog')).sort((a, b) => +b.data.published - +a.data.published);
  const items = posts.map((p) => `<item><title>${esc(p.data.h1 ?? p.data.title)}</title><link>${site.url}/blog/${p.id}/</link><guid>${site.url}/blog/${p.id}/</guid><pubDate>${p.data.published.toUTCString()}</pubDate><description>${esc(p.data.description)}</description></item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Poradna ${site.name}</title><link>${site.url}/blog/</link><description>Rady ke klimatizacím a tepelným čerpadlům</description><language>cs</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
