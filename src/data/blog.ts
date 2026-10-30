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
// Každý článek má vlastní fotku, aby se v poradně neopakovaly.
const byPost: Record<string, string> = {
  'chladivo-r32-f-plyny': 'his-pxw-low-noise-of-outdoor', 'chytre-ovladani-klimatizace-wifi': 'his-pxw-wifi-control',
  'cisteni-a-servis-klimatizace': 'his-uni-easy-to-clean', 'dotace-na-tepelne-cerpadlo': 'ph-misc-bills-calculator',
  'hluk-venkovni-jednotky': 'ph-house-summer-garden', 'invertorova-klimatizace': 'his-uni-economy-mode-operation',
  'jak-probiha-montaz-klimatizace': 'ph-technician-install-smile', 'jaky-vykon-klimatizace-na-m2': 'ph-family-living-room-play',
  'japonska-nebo-cinska-klimatizace': 'mhi-bedroom-concrete2', 'kdy-koupit-klimatizaci': 'ph-summer-sunny-window',
  'klimatizace-a-fotovoltaika': 'ph-house-summer-modern-1', 'klimatizace-a-zdravi': 'ph-family-baby-floor',
  'klimatizace-do-kancelare': 'ph-office-team-bright', 'klimatizace-do-podkrovi': 'ph-wake-up-stretch-2',
  'klimatizace-hisense': 'his-living-man', 'klimatizace-mitsubishi-heavy-industries': 'mhi-living-beige',
  'klimatizace-v-panelaku': 'ph-summer-prague-rooftops', 'kolik-stoji-klimatizace-do-bytu': 'ph-couple-sofa-hug',
  'mitsubishi-heavy-vs-mitsubishi-electric': 'mhi-living-green', 'mobilni-klimatizace-nebo-split': 'ph-summer-fans',
  'povoleni-klimatizace-svj': 'ph-couple-reading-floor', 'single-split-nebo-multisplit': 'ph-family-sofa-joy',
  'spotreba-klimatizace': 'ph-misc-ac-remote', 'tepelne-cerpadlo-do-starsiho-domu': 'ph-family-in-front-of-house',
  'tepelne-cerpadlo-vs-plynovy-kotel': 'ph-winter-stove-tea', 'tepelne-cerpadlo-vzduch-voda-cena': 'ph-house-winter-1',
  'tepelne-cerpadlo-vzduch-vzduch': 'ph-winter-blanket-tea', 'ticha-klimatizace-do-loznice': 'ph-sleep-woman-peaceful',
  'topeni-klimatizaci': 'ph-winter-seniors-window', 'vykon-tepelneho-cerpadla': 'ph-misc-radiator-valve',
};
export const postImage = (slug: string, cat: string) => {
  if (byPost[slug]) return byPost[slug];
  const pool = pools[cat] ?? pools.klimatizace;
  let h = 0; for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return pool[h % pool.length];
};
