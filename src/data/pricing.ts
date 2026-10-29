// Orientační ceny a výpočty. Vše v Kč vč. DPH a standardní montáže.
// DPH: dodávka s montáží do bytu nebo rodinného domu = 12 % (stavební a montážní práce pro bydlení),
// firmy, chaty, garáže = 21 %. Na webu počítáme s 12 % a u kanceláří na to upozorňujeme.
// Standardní montáž = cca 3 m potrubí s izolací, kabeláž, odvod kondenzátu, 1 průraz zdí,
// konzole, vakuování, tlaková zkouška, uvedení do provozu a zaškolení.

export const DPH = 1.12;
export const DPH_FIRMY = 1.21;

export const priceGuide = [
  { label: 'Klimatizace do 1 místnosti', note: 'nástěnná jednotka 2,0–3,5 kW', range: '30 000 – 60 000 Kč' },
  { label: 'Multisplit pro 2 místnosti', note: '1 venkovní + 2 vnitřní jednotky', range: '65 000 – 110 000 Kč' },
  { label: 'Multisplit pro 3 místnosti', note: '1 venkovní + 3 vnitřní jednotky', range: '90 000 – 150 000 Kč' },
  { label: 'Tepelné čerpadlo vzduch-voda', note: 'rodinný dům, instalace na klíč', range: '250 000 – 450 000 Kč' },
];

// Typické příplatky k standardní montáži (vč. DPH, orientačně)
export const extras = [
  { label: 'Každý další metr potrubí a kabeláže', price: '400 – 1 000 Kč' },
  { label: 'Čerpadlo kondenzátu (když nelze odvést samospádem)', price: '2 500 – 5 000 Kč' },
  { label: 'Lišty a kryty vedení v interiéru', price: '150 – 400 Kč/m' },
  { label: 'Montáž venkovní jednotky ve výšce (plošina, horolezci)', price: '2 000 – 8 000 Kč' },
  { label: 'Nový samostatný jistič a přívod z rozvaděče', price: '2 000 – 6 000 Kč' },
  { label: 'Kotvení do zateplené fasády (distanční kotvy)', price: '1 000 – 3 000 Kč' },
];

// Výkon na m² (W) podle typu místnosti, běžná výška stropu do 2,7 m
export const loadPerM2 = { bezne: 100, slunne: 125, podkrovi: 150 } as const;

// Orientační cena standardní montáže vč. DPH podle typu jednotky (od–do)
export const montaz: Record<string, [number, number]> = {
  nastenna: [10000, 16000],
  parapetni: [11000, 17000],
  kanalova: [18000, 32000],
  kazetova: [16000, 28000],
  podstropni: [18000, 30000],
  multisplit: [9000, 13000], // za každou vnitřní jednotku
  'tepelne-cerpadlo': [120000, 180000], // hydraulika, zásobník, elektro, uvedení do provozu
};

/** Orientační cena „od“ vč. DPH a standardní montáže (zaokrouhleno na stovky). */
export function priceWithInstall(priceBezDph: number | null | undefined, cat: string, indoorUnits = 1) {
  if (!priceBezDph) return null;
  const m = montaz[cat] ?? montaz.nastenna;
  const units = cat === 'multisplit' ? indoorUnits : 1;
  return Math.round((priceBezDph * DPH + m[0] * units) / 100) * 100;
}

export const czk = (n: number) => new Intl.NumberFormat('cs-CZ').format(n) + ' Kč';
