// Fotky řad z ceníků (public/img, viz scripts/images.mjs). variants = barevná provedení pro přepínač.
export interface PImg { img: string; variants?: { label: string; img: string; swatch: string }[]; scene?: string }
export const productImages: Record<string, PImg> = {
  'mhi-diamond-zsx': { img: 'mhi-zsx-white', scene: 'room-living-titan', variants: [
    { label: 'Bílá', img: 'mhi-zsx-white', swatch: '#f4f6f7' }, { label: 'Titanová', img: 'mhi-zsx-titan', swatch: '#b9b4a1' }, { label: 'Černobílá', img: 'mhi-zsx-black', swatch: '#1c1f22' }] },
  'mhi-premium-zt': { img: 'mhi-zt-black', scene: 'outdoor-terracotta', variants: [
    { label: 'Černá', img: 'mhi-zt-black', swatch: '#1d2326' }, { label: 'Bílá', img: 'mhi-zt-white', swatch: '#f4f6f7' }, { label: 'Titanová', img: 'mhi-zt-titan', swatch: '#c4c2ac' }] },
  'mhi-premium-zs': { img: 'mhi-zs-white', scene: 'room-bedroom-dark', variants: [
    { label: 'Bílá', img: 'mhi-zs-white', swatch: '#f4f6f7' }, { label: 'Titanová', img: 'mhi-zs-titan', swatch: '#9a958c' }] },
  'mhi-diamond-zr': { img: 'mhi-zr', scene: 'airflow-render' },
  'mhi-standard-plus-ztl': { img: 'mhi-ztl', scene: 'room-living' },
  'mhi-standard-zsp': { img: 'mhi-zsp', scene: 'room-bedroom-concrete' },
  'mhi-parapetni-srf': { img: 'mhi-srf', scene: 'his-winter-living' },
  'mhi-kanalova-srr': { img: 'mhi-srr', scene: 'room-overhead' },
  'mhi-kazetova-fdtc': { img: 'mhi-fdtc', scene: 'his-office' },
  'mhi-multisplit-scm': { img: 'mhi-multi-outdoor', scene: 'room-overhead' },
  'hisense-air-master': { img: 'his-airmaster-black', scene: 'his-bedroom-mountains', variants: [
    { label: 'Černá', img: 'his-airmaster-black', swatch: '#15191d' }, { label: 'Bílá', img: 'his-airmaster-white', swatch: '#f4f6f7' }] },
  'hisense-energy-pro-x': { img: 'his-energyprox-black', scene: 'his-winter-living', variants: [
    { label: 'Černá', img: 'his-energyprox-black', swatch: '#2a2e33' }, { label: 'Bílá', img: 'his-energyprox-white', swatch: '#f4f6f7' }] },
  'hisense-uni-pure': { img: 'his-unipure', scene: 'his-wall-minimal' },
  'hisense-wings-comfort': { img: 'his-wings', scene: 'his-wall-minimal' },
  'hisense-hi-smart': { img: 'his-hismart', scene: 'his-wall-minimal' },
  'hisense-multi-split': { img: 'his-multi-outdoor', scene: 'his-winter-living' },
  'hisense-lcac-kazetova': { img: '', scene: 'his-office' },
  'hisense-lcac-kanalova': { img: '', scene: 'his-office' },
  'hisense-lcac-parapetne-podstropni': { img: '', scene: 'his-office' },
  'hisense-lcac-konzolova': { img: '', scene: 'his-winter-living' },
  'hisense-hi-therma-monoblok': { img: 'his-therma-monoblok', scene: 'house-snow' },
  'hisense-hi-therma-split': { img: 'his-therma-set', scene: 'house-snow' },
  'hisense-hi-therma-integra': { img: 'his-therma-integra', scene: 'his-therma-stairs' },
  'hisense-hi-therma-smart-r290': { img: 'his-therma-monoblok', scene: 'his-therma-green' },
};
export const imgFor = (id: string) => productImages[id] ?? { img: '' };
