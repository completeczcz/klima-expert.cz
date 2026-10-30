// Fotky k produktovým řadám: hlavní obrázek, barevné varianty, scéna v interiéru a galerie (fotky výrobců z podkladů COMPLETE CZ).
export interface PImg {
  img: string;
  variants?: { label: string; img: string; swatch: string }[];
  scene?: string;
  sceneCap?: string;
  gallery?: { img: string; t: string; d?: string }[];
}
const proxWhite = [
  { img: 'his-pxw-3d-airflow', t: '3D proudění', d: 'Vzduch se rozprostře do celé místnosti, ne na vás.' },
  { img: 'his-pxw-heating-at-22', t: 'Topí i při −22 °C', d: 'Úsporné topení i v mrazivé zimě.' },
  { img: 'his-pxw-ai-smart', t: 'Chytrý režim', d: 'Sám se přizpůsobí lidem v místnosti.' },
  { img: 'his-pxw-wifi-control', t: 'Ovládání z telefonu', d: 'Zapnete ji cestou domů.' },
  { img: 'his-pxw-low-noise-of-outdoor', t: 'Tichá i venku', d: 'Ohleduplná k sousedům.' },
];
const proxBlack = [
  { img: 'his-pxb-3d-airflow', t: 'Elegantní černá', d: 'Výrazný kousek do moderního interiéru.' },
  { img: 'his-pxb-ai-smartnew', t: 'Chytrý režim', d: 'Sám se přizpůsobí lidem v místnosti.' },
  { img: 'his-pxb-heating-at-8', t: 'Temperování na 8 °C', d: 'Chalupa ani byt během zimy nepromrznou.' },
  { img: 'his-pxb-smart-airflow', t: 'Teplo u podlahy', d: 'Při topení míří vzduch dolů, kde ho cítíte.' },
];
const uni = [
  { img: 'his-uni-elegant-appearance', t: 'Nenápadná elegance', d: 'Hladké tvary, které zapadnou do každého pokoje.' },
  { img: 'his-uni-low-noise', t: 'Tichá v noci', d: 'Od 19 dB(A), klidný spánek i v horku.' },
  { img: 'his-uni-heating-at-22', t: 'Topí i při −22 °C', d: 'Úsporné přitápění v přechodném období i v zimě.' },
  { img: 'his-uni-easy-to-clean', t: 'Snadná údržba', d: 'Kryt a filtry vyndáte bez nářadí.' },
  { img: 'his-uni-economy-mode-operation', t: 'Úsporný provoz', d: 'Invertor drží teplotu s minimální spotřebou.' },
];
export const productImages: Record<string, PImg> = {
  'mhi-diamond-zsx': { img: 'mhi-zsx-white', scene: 'mhi-living-shelves', sceneCap: 'Ladí s každým interiérem.', variants: [
    { label: 'Bílá', img: 'mhi-zsx-white', swatch: '#f4f6f7' }, { label: 'Černobílá', img: 'mhi-zsx-wb', swatch: 'linear-gradient(180deg,#f4f6f7 55%,#1c1f22 55%)' }, { label: 'Titanová', img: 'mhi-zsx-titan', swatch: '#b9b4a1' }] },
  'mhi-premium-zt': { img: 'mhi-zt-white', scene: 'mhi-bedroom-slate', sceneCap: 'Klidný spánek i v tropických nocích.', variants: [
    { label: 'Bílá', img: 'mhi-zt-white', swatch: '#f4f6f7' }, { label: 'Černá', img: 'mhi-zt-black', swatch: '#1d2326' }, { label: 'Titanová', img: 'mhi-zt-titan', swatch: '#c4c2ac' }] },
  'mhi-premium-zs': { img: 'mhi-zs-white', scene: 'mhi-living-beige', sceneCap: 'Ladí s každým interiérem.', variants: [
    { label: 'Bílá', img: 'mhi-zs-white', swatch: '#f4f6f7' }, { label: 'Titanová', img: 'mhi-zs-titan', swatch: '#9a958c' }] },
  'mhi-diamond-zr': { img: 'mhi-zr', scene: 'mhi-living-loft', sceneCap: 'Chlad dosáhne do celé místnosti.' },
  'mhi-standard-plus-ztl': { img: 'mhi-ztl', scene: 'mhi-living-mint', sceneCap: 'Příjemný vzduch v celém bytě.' },
  'mhi-standard-zsp': { img: 'mhi-zsp', scene: 'mhi-bedroom-concrete2', sceneCap: 'Klidný spánek i v tropických nocích.' },
  'mhi-parapetni-srf': { img: 'mhi-srf', scene: 'room-living', sceneCap: 'Teplo u podlahy, kde ho cítíte.' },
  'mhi-kanalova-srr': { img: 'mhi-srr', scene: 'room-overhead', sceneCap: 'Vidět jsou jen mřížky.' },
  'mhi-kazetova-fdtc': { img: 'mhi-fdtc', scene: 'office-meeting', sceneCap: 'Příjemné prostředí pro práci.' },
  'mhi-multisplit-scm': { img: 'mhi-multi-outdoor', scene: 'room-overhead' },
  'hisense-air-master': { img: 'his-airmaster-black', scene: 'his-bedroom-mountains', sceneCap: 'Klidný spánek i v tropických nocích.', variants: [
    { label: 'Černá', img: 'his-airmaster-black', swatch: '#15191d' }, { label: 'Bílá', img: 'his-airmaster-white', swatch: '#f4f6f7' }] },
  'hisense-energy-pro-x': { img: 'his-energyprox-white', scene: 'his-living-man', sceneCap: 'Pohodlí, na které si rychle zvyknete.', gallery: [...proxWhite, ...proxBlack], variants: [
    { label: 'Bílá', img: 'his-energyprox-white', swatch: '#f4f6f7' }, { label: 'Černá', img: 'his-energyprox-black', swatch: '#2a2e33' }] },
  'hisense-uni-pure': { img: 'his-unipure', scene: 'his-uni-smart-airflow', sceneCap: 'Příjemné teplo i v mrazivé zimě.', gallery: uni },
  'hisense-wings-comfort': { img: 'his-wings', scene: 'his-wall-minimal', sceneCap: 'Ladí s každým interiérem.' },
  'hisense-hi-smart': { img: 'his-hismart', scene: 'his-homeoffice', sceneCap: 'Příjemně i při práci z domova.' },
  'hisense-multi-split': { img: 'his-multi-outdoor', scene: 'his-winter-living' },
  'hisense-lcac-kazetova': { img: '', scene: 'his-terrace-office', sceneCap: 'Příjemné prostředí pro práci.' },
  'hisense-lcac-kanalova': { img: '', scene: 'his-office', sceneCap: 'Vidět jsou jen mřížky.' },
  'hisense-lcac-parapetne-podstropni': { img: '', scene: 'his-terrace-office', sceneCap: 'Pro velké prostory bez podhledu.' },
  'hisense-lcac-konzolova': { img: '', scene: 'his-winter-living', sceneCap: 'Teplo u podlahy, kde ho cítíte.' },
  'hisense-hi-therma-monoblok': { img: 'his-therma-monoblok', scene: 'house-snow', sceneCap: 'Teplo pro celý dům.' },
  'hisense-hi-therma-split': { img: 'his-therma-split-idu', scene: 'his-therma-stairs', sceneCap: 'Teplo pro celý dům.', gallery: [
    { img: 'his-therma-odu', t: 'Venkovní jednotka', d: 'Tichá, s ochranou proti povětrnostním vlivům.' }] },
  'hisense-hi-therma-integra': { img: 'his-therma-integra', scene: 'his-therma-stairs', sceneCap: 'Teplo i teplá voda z jednoho místa.' },
  'hisense-hi-therma-smart-r290': { img: 'his-therma-r290', scene: 'his-therma-green', sceneCap: 'Přírodní chladivo R290.' },
};
export const imgFor = (id: string) => productImages[id] ?? { img: '' };
