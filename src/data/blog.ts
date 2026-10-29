export const catNames: Record<string, string> = {
  klimatizace: 'Klimatizace',
  'tepelna-cerpadla': 'Tepelná čerpadla',
  znacky: 'Značky',
  'provoz-a-servis': 'Provoz a servis',
};
export const readingTime = (body = '') => Math.max(3, Math.round(body.split(/\s+/).length / 200));
export const fmtDate = (d: Date) => d.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' });
