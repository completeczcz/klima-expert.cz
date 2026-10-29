import raw from './products.json';
import { priceWithInstall, DPH, montaz } from './pricing';

export interface Model {
  code: string | null; outdoor: string | null; coolKw: number | null; heatKw: number | null;
  energy: string | null; seer: number | null; scop: number | null; noise: number | null;
  flowTemp: number | null; tank: number | null; line: string | null; priceBezDph: number | null;
}
export interface OutdoorUnit { code: string; maxIndoor: number | null; coolKw: number | null; heatKw: number | null; energy: string | null; priceBezDph: number | null }
export interface Series {
  id: string; brand: string; brandSlug: string; name: string; title: string; code: string | null; type: string | null;
  cat: string; tier: 'premium' | 'stredni' | 'zakladni'; uses: string[]; intro: string; features: string[];
  noiseMin: number | null; indoorUnitsMin: number | null; energy: string | null; heatMin: number | null; refrigerant: string | null; wifi: string | null;
  colours: string[]; flowTemp: number | null; status: string | null; models: Model[]; outdoorUnits: OutdoorUnit[]; priceFromBezDph: number | null;
}

export const products = raw as unknown as Series[];

export const catLabel: Record<string, string> = {
  nastenna: 'Nástěnná klimatizace',
  parapetni: 'Parapetní / konzolová klimatizace',
  kanalova: 'Kanálová klimatizace',
  kazetova: 'Kazetová klimatizace',
  podstropni: 'Podstropní klimatizace',
  multisplit: 'Multisplit',
  'tepelne-cerpadlo': 'Tepelné čerpadlo vzduch-voda',
};
export const tierLabel = { premium: 'Prémiová řada', stredni: 'Střední třída', zakladni: 'Základní řada' } as const;
export const useLabel: Record<string, string> = {
  byt: 'Byt', dum: 'Rodinný dům', loznice: 'Ložnice', kancelar: 'Kancelář a provozovna', podkrovi: 'Podkroví',
};
export const brandName: Record<string, string> = { 'mitsubishi-heavy-industries': 'Mitsubishi Heavy Industries', hisense: 'Hisense' };

/** Orientační cena „od“ s DPH včetně standardní montáže. */
export function fromPrice(s: Series): number | null {
  if (s.cat === 'multisplit') {
    if (!s.priceFromBezDph || !s.indoorUnitsMin) return null;
    return priceWithInstall(s.priceFromBezDph + 2 * s.indoorUnitsMin, 'multisplit', 2);
  }
  return priceWithInstall(s.priceFromBezDph, s.cat);
}
/** Cena samotného zařízení s DPH (doporučená cena výrobce). */
export const withVat = (n: number | null) => (n ? Math.round((n * DPH) / 100) * 100 : null);
export { montaz };

export const bySlug = (id: string) => products.find((p) => p.id === id);
export const kw = (n: number | null) => (n == null ? '–' : `${String(n).replace('.', ',')} kW`);
