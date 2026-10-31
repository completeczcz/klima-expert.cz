// Fotky k produktovým řadám: hlavní obrázek, barevné varianty, scéna v interiéru a galerie (fotky výrobců z podkladů COMPLETE CZ).
export interface PImg {
  img: string;
  variants?: { label: string; img: string; swatch: string }[];
  scene?: string;
  sceneCap?: string;
  gallery?: { img: string; t: string; d?: string }[];
  /** Jak to funguje: velké obrázky střídavě s textem (inspirace hisense-klima.cz). */
  story?: { img: string; t: string; d: string }[];
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
const hpOne = { img: 'hk-r290-hydro', t: 'Vše v jedné venkovní jednotce.', d: 'Výměník, čerpadlo i expanzní nádoba jsou uvnitř monobloku. Doma se připojí jen voda, bez práce s chladivem, takže je montáž rychlejší.' };
const hpApp = { img: 'hk-hp-app', t: 'Každá místnost podle vás.', d: 'Teplotu lze řídit nezávisle až v 7–8 místnostech a dvou topných okruzích (podlahovka i radiátory). Spotřebu a nastavení máte v aplikaci.' };
export const productImages: Record<string, PImg> = {
  'mhi-diamond-zsx': { img: 'mhi-zsx-white', scene: 'mhi-living-shelves', sceneCap: 'Ladí s každým interiérem.', variants: [
    { label: 'Bílá', img: 'mhi-zsx-white', swatch: '#f4f6f7' }, { label: 'Černobílá', img: 'mhi-zsx-wb', swatch: 'linear-gradient(180deg,#f4f6f7 55%,#1c1f22 55%)' }, { label: 'Titanová', img: 'mhi-zsx-titan', swatch: '#b9b4a1' }],
    story: [
      { img: 'mhi-zsx-wall2', t: 'Design, který na stěně vynikne.', d: "Tvarovaný panel v bílé, černobílé nebo titanové barvě. Ocenění A' Design Award 2017. Na stěně působí jako doplněk interiéru, ne jako technika." },
      { img: 'airflow-render', t: 'Vzduch do celé místnosti, bez průvanu.', d: 'Trysková technologie Jet Air a lamely 3D AUTO rozprostřou chladný i teplý vzduch rovnoměrně a daleko, i do velkého obýváku.' },
      { img: 'mhi-zsx-close', t: 'Pohybové čidlo myslí za vás.', d: 'Když z místnosti odejdete, klimatizace přepne na úsporný provoz a při delší nepřítomnosti se sama vypne. Jako jediná nástěnná řada.' },
      { img: 'mhi-mother-bed', t: 'Čistý vzduch i pro alergiky.', d: 'Filtr Allergen Clear, fotokatalytický deodorační filtr a program pro odstranění alergenů. Po vypnutí se jednotka sama vysuší a vyčistí.' },
    ] },
  'mhi-premium-zt': { img: 'mhi-zt-white', scene: 'mhi-bedroom-slate', sceneCap: 'Klidný spánek i v tropických nocích.', variants: [
    { label: 'Bílá', img: 'mhi-zt-white', swatch: '#f4f6f7' }, { label: 'Černá', img: 'mhi-zt-black', swatch: '#1d2326' }, { label: 'Titanová', img: 'mhi-zt-titan', swatch: '#c4c2ac' }],
    story: [
      { img: 'airflow-render', t: 'Tichý proud vzduchu do celé místnosti.', d: 'Trysková technologie a lamely 3D AUTO rozprostřou vzduch rovnoměrně. Vnitřní jednotka je slyšet od 19 dB(A).' },
      { img: 'mhi-mother-bed', t: 'Čistý vzduch pro celou rodinu.', d: 'Filtr Allergen Clear a fotokatalytický deodorační filtr zachytí pyl, prach i pachy. Program pro odstranění alergenů navíc vyčistí vnitřek jednotky.' },
    ] },
  'mhi-premium-zs': { img: 'mhi-zs-white', scene: 'mhi-living-beige', sceneCap: 'Ladí s každým interiérem.', variants: [
    { label: 'Bílá', img: 'mhi-zs-white', swatch: '#f4f6f7' }, { label: 'Černobílá', img: 'mhi-zs-wb', swatch: 'linear-gradient(180deg,#f4f6f7 55%,#1c1f22 55%)' }, { label: 'Titanová', img: 'mhi-zs-titan', swatch: '#b9b4a1' }] },
  'mhi-diamond-zr': { img: 'mhi-zr', scene: 'mhi-living-loft', sceneCap: 'Chlad dosáhne do celé místnosti.' },
  'mhi-standard-plus-ztl': { img: 'mhi-ztl', scene: 'mhi-living-mint', sceneCap: 'Příjemný vzduch v celém bytě.' },
  'mhi-standard-zsp': { img: 'mhi-zsp', scene: 'mhi-bedroom-concrete2', sceneCap: 'Klidný spánek i v tropických nocích.' },
  'mhi-parapetni-srf': { img: 'mhi-srf', scene: 'room-living', sceneCap: 'Teplo u podlahy, kde ho cítíte.' },
  'mhi-kanalova-srr': { img: 'mhi-srr', scene: 'room-overhead', sceneCap: 'Vidět jsou jen mřížky.' },
  'mhi-kazetova-fdtc': { img: 'mhi-fdtc', scene: 'office-meeting', sceneCap: 'Příjemné prostředí pro práci.' },
  'mhi-multisplit-scm': { img: 'mhi-multi-outdoor', scene: 'room-overhead' },
  'hisense-air-master': { img: 'his-airmaster-black', scene: 'his-bedroom-mountains', sceneCap: 'Klidný spánek i v tropických nocích.', variants: [
    { label: 'Černá', img: 'his-airmaster-black', swatch: '#15191d' }, { label: 'Bílá', img: 'his-airmaster-white', swatch: '#f4f6f7' }],
    story: [
      { img: 'hk-am-smarteye', t: 'Smart Eye Pro ví, kde sedíte.', d: 'Infračervený senzor rozpozná, kde v místnosti jste, a podle toho nasměruje vzduch – k vám, nebo naopak mimo vás. Když vyhodnotí, že je vám chladno, sám upraví proudění i teplotu.' },
      { img: 'hk-am-90', t: 'Lamely, které se otočí o 90°.', d: 'Vzduch se rozloží do celé místnosti, do rohů i ke stropu. Žádný studený proud za krk.' },
      { img: 'hk-am-quiet', t: 'Od 18 dB(A). Tišší než šepot.', d: 'Tichý ventilátor a vzduchový kanál navržený podle zákonů akustiky. Neruší při spánku ani při práci.' },
      { img: 'hk-am-voice', t: 'Ovládání hlasem i z telefonu.', d: 'Teplotu, režim i rychlost ventilátoru změníte hlasem (anglické povely), dálkovým ovladačem nebo v aplikaci ConnectLife odkudkoliv.' },
    ],
    gallery: [{ img: 'hk-am-kitchen', t: 'V kuchyni', d: 'Příjemně i při vaření v parném létě.' }] },
  'hisense-energy-pro-x': { img: 'his-energyprox-white', scene: 'his-living-man', sceneCap: 'Pohodlí, na které si rychle zvyknete.', variants: [
    { label: 'Bílá', img: 'his-energyprox-white', swatch: '#f4f6f7' }, { label: 'Černá', img: 'his-energyprox-black', swatch: '#2a2e33' }],
    story: [
      { img: 'hk-px-smarteye', t: 'Inteligentní oko s termokamerou.', d: 'Snímá místnost a pozná, kde jste. Vyberete si, jestli má vzduch mířit k vám, nebo jinam.' },
      { img: 'hk-px-airflow', t: 'Proudění přesně podle vás.', d: 'Nahoru a dolů v 6 polohách, doleva a doprava ve 3. Nastavíte jedním tlačítkem na ovladači.' },
      { img: 'hk-px-heating', t: 'Spolehlivě topí i v mrazu.', d: 'Venkovní jednotka má vyhřívanou vaničku, takže úsporně topí i v tuhé zimě. Hodí se jako hlavní topení do přechodného období.' },
      { img: 'hk-px-clean', t: 'Čistí se sama. Uvnitř i venku.', d: 'Samočisticí funkce vnitřní i venkovní jednotky a antibakteriální povrch brání usazování prachu a plísní.' },
      { img: 'hk-px-nano', t: 'Hi-NANO pro čistší vzduch.', d: 'Ionizátor pomáhá odstraňovat ze vzduchu prach, bakterie a viry. Každý den.' },
      { img: 'hk-px-app', t: 'Spotřeba v telefonu.', d: 'V aplikaci vidíte, kolik klimatizace spotřebovala, a nastavení změníte odkudkoliv.' },
    ],
    gallery: [
      { img: 'hk-px-life-1', t: 'V ložnici', d: 'Klidný spánek i v tropické noci.' },
      { img: 'hk-px-life-2', t: 'Bílé provedení', d: 'Čisté linie do světlého interiéru.' },
      ...proxWhite, ...proxBlack] },
  'hisense-uni-pure': { img: 'his-unipure', scene: 'his-uni-smart-airflow', sceneCap: 'Příjemné teplo i v mrazivé zimě.', gallery: uni,
    story: [
      { img: 'hk-uni-nano', t: 'Hi-NANO pro zdravý vzduch.', d: 'Ionizátor podle testů výrobce zachytí až 60 % částic PM2.5 a během dvou hodin výrazně sníží množství virů a bakterií ve vzduchu.' },
      { img: 'hk-uni-clean', t: 'Údržba až o 60 % rychlejší.', d: 'Filtr se vyndá shora a lamely se snadno odejmou. Pravidelný servis je rychlejší a tím i levnější.' },
      { img: 'hk-uni-install', t: 'Promyšlená montáž.', d: 'Odnímatelný panel a montážní opěrky dávají technikovi dost místa na připojení potrubí. Montáž je rychlejší a čistší.' },
      { img: 'hk-uni-app', t: 'Spotřeba pod kontrolou.', d: 'Aplikace měří spotřebu elektřiny v reálném čase, takže víte, kolik vás chlazení nebo topení stojí.' },
      { img: 'hk-uni-pcb', t: 'Odolná venkovní jednotka.', d: 'Silnější antikorozní nátěr elektroniky, antikorozní šrouby a utěsněná skříňka chrání jednotku před vlhkem i hmyzem.' },
    ] },
  'hisense-wings-comfort': { img: 'his-wings', scene: 'hk-mc-kitchen', sceneCap: 'Ladí s každým interiérem.' },
  'hisense-hi-smart': { img: 'his-hismart', scene: 'his-homeoffice', sceneCap: 'Příjemně i při práci z domova.',
    story: [{ img: 'hk-wifi', t: 'Ovládání z telefonu.', d: 'Teplotu, režim i rychlost ventilátoru nastavíte v aplikaci ConnectLife, klidně cestou domů.' }] },
  'hisense-multi-split': { img: 'his-multi-outdoor', scene: 'his-winter-living' },
  'hisense-lcac-kazetova': { img: 'hk-ms-cassette', scene: 'his-terrace-office', sceneCap: 'Příjemné prostředí pro práci.' },
  'hisense-lcac-kanalova': { img: 'hk-ms-duct', scene: 'his-office', sceneCap: 'Vidět jsou jen mřížky.' },
  'hisense-lcac-parapetne-podstropni': { img: '', scene: 'his-terrace-office', sceneCap: 'Pro velké prostory bez podhledu.' },
  'hisense-lcac-konzolova': { img: '', scene: 'his-winter-living', sceneCap: 'Teplo u podlahy, kde ho cítíte.' },
  'hisense-hi-therma-monoblok': { img: 'his-therma-monoblok', scene: 'house-snow', sceneCap: 'Teplo pro celý dům.',
    story: [hpApp] },
  'hisense-hi-therma-split': { img: 'his-therma-split-idu', scene: 'his-therma-stairs', sceneCap: 'Teplo pro celý dům.', gallery: [
    { img: 'his-therma-odu', t: 'Venkovní jednotka', d: 'Tichá, s ochranou proti povětrnostním vlivům.' }],
    story: [hpApp] },
  'hisense-hi-therma-integra': { img: 'his-therma-integra', scene: 'his-therma-stairs', sceneCap: 'Teplo i teplá voda z jednoho místa.',
    story: [
      { img: 'hk-integra-tank', t: 'Zásobník a hydrobox v jednom.', d: 'Zabere až o 30 % méně místa a hodí se i na chodbu, když nemáte technickou místnost. Zásobník z nerezové oceli DUPLEX vydrží roky bez starostí.' },
      hpApp] },
  'hisense-hi-therma-smart-r290': { img: 'his-therma-r290', scene: 'his-therma-green', sceneCap: 'Přírodní chladivo R290.',
    story: [
      { img: 'hk-r290-temp', t: 'Plný výkon i v mrazu.', d: 'Při −7 °C dává stále 100 % topného výkonu a vodu ohřeje až na 75 °C. Hodí se do novostaveb s podlahovkou i do starších domů s radiátory.' },
      { img: 'hk-r290-frost', t: 'Nezamrzne.', d: 'Spodní část výměníku i vana jsou vyhřívané, takže se na jednotce netvoří led ani v tuhé zimě.' },
      hpOne, hpApp] },
};
export const imgFor = (id: string) => productImages[id] ?? { img: '' };
