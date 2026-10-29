export const catNames: Record<string, string> = {
  klimatizace: 'Klimatizace',
  'tepelna-cerpadla': 'Tepelná čerpadla',
  znacky: 'Značky',
  'provoz-a-servis': 'Provoz a servis',
};
export const readingTime = (body = '') => Math.max(3, Math.round(body.split(/\s+/).length / 200));
export const fmtDate = (d: Date) => d.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' });

// Ilustrační fotky článků podle kategorie (z podkladů výrobců)
const pools: Record<string, string[]> = {
  klimatizace: ['room-living-titan', 'room-bedroom-dark', 'his-bedroom-mountains', 'room-living', 'airflow-render', 'his-wall-minimal', 'room-bedroom-concrete', 'room-window', 'his-office', 'room-overhead'],
  'tepelna-cerpadla': ['house-family', 'house-snow', 'his-therma-stairs', 'his-therma-green', 'his-winter-living'],
  znacky: ['room-living-titan', 'his-bedroom-mountains', 'outdoor-terracotta', 'his-wall-minimal'],
  'provoz-a-servis': ['room-dining', 'his-wall-minimal', 'room-living', 'airflow-render'],
};
export const postImage = (slug: string, cat: string) => {
  const pool = pools[cat] ?? pools.klimatizace;
  let h = 0; for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return pool[h % pool.length];
};
