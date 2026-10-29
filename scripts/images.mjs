// Export fotek z ceníků (rozbalených do scratchpadu) do public/img jako WebP v několika šířkách.
// Spuštění: node scripts/images.mjs <složka s PNG z ceníků>
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
const SRC = process.argv[2];
import { existsSync } from 'node:fs';
// pořadí: maska ve správné velikosti (_m) → vyříznuté bílé pozadí (_cut) → původní
const P = (f, kind) => {
  if (kind === 'l' && existsSync(`${SRC}/${f}_rgb.png`)) return `${SRC}/${f}_rgb.png`;
  for (const suf of ['_m', '_cut', '']) if (existsSync(`${SRC}/${f}${suf}.png`)) return `${SRC}/${f}${suf}.png`;
};
const items = {
  // produkty (průhledné pozadí)
  'mhi-zsx-white': ['mhi/p12_x1016', 'p'], 'mhi-zsx-titan': ['mhi/p12_x1020', 'p'], 'mhi-zsx-black': ['mhi/p08_x620', 'p'],
  'mhi-zt-white': ['mhi/p16_x1062', 'p'], 'mhi-zt-black': ['mhi/p16_x1063', 'p'], 'mhi-zt-titan': ['mhi/p16_x1064', 'p'],
  'mhi-zs-white': ['mhi/p18_x1093', 'p'], 'mhi-zs-titan': ['mhi/p18_x1097', 'p'],
  'mhi-zr': ['mhi/p14_x1042', 'p'], 'mhi-ztl': ['mhi/p20_x1117', 'p'], 'mhi-zsp': ['mhi/p22_x1139', 'p'],
  'mhi-srf': ['mhi/p23_x1147', 'p'], 'mhi-srr': ['mhi/p24_x1163', 'p'], 'mhi-fdtc': ['mhi/p25_x1184', 'p'],
  'mhi-outdoor-white': ['mhi/p13_x1033', 'p'], 'mhi-outdoor-black': ['mhi/p17_x1084', 'p'], 'mhi-multi-outdoor': ['mhi/p28_x1342', 'p'],
  'mhi-remote': ['mhi/p17_x1082', 'p'], 'app-phone': ['mhi/p52_x1289', 'p'],
  'his-airmaster-white': ['his/p07_x11498', 'p'], 'his-airmaster-black': ['his/p07_x11499', 'p'],
  'his-energyprox-black': ['his/p07_x771', 'p'], 'his-energyprox-white': ['his/p07_x772', 'p'],
  'his-unipure': ['his/p13_x10890', 'p'], 'his-wings': ['his/p16_x10905', 'p'], 'his-hismart': ['his/p19_x10918', 'p'],
  'his-outdoor': ['his/p23_x10935', 'p'], 'his-multi-outdoor': ['his/p23_x10936', 'p'],
  'his-therma-monoblok': ['his/p82_x11219', 'p'], 'his-therma-set': ['his/p78_x11183', 'p'], 'his-therma-integra': ['his/p80_x11189', 'p'],
  // interiéry a scény
  'room-living-titan': ['mhi/p08_x617', 'l'], 'room-living': ['mhi/p08_x618', 'l'], 'room-bedroom-dark': ['mhi/p09_x624', 'l'],
  'room-bedroom-concrete': ['mhi/p09_x623', 'l'], 'room-living-navy': ['mhi/p21_x1130', 'l'], 'room-dining': ['mhi/p21_x1129', 'l'],
  'room-window': ['mhi/p20_x1114', 'l'], 'room-cafe': ['mhi/p25_x1176', 'l'], 'room-lounge': ['mhi/p24_x1158', 'l'],
  'outdoor-terracotta': ['mhi/p17_x1077', 'l'], 'airflow-render': ['mhi/p68_x901', 'l'], 'room-overhead': ['mhi/p04_x323', 'l'],
  'office-meeting': ['mhi/p03_x316', 'l'],
  'his-bedroom-mountains': ['his/p01_x686', 'l'], 'his-winter-living': ['his/p05_x719', 'l'], 'his-wall-minimal': ['his/p03_x701', 'l'],
  'his-office': ['his/p22_x10930', 'l'], 'house-family': ['his/p77_x11179', 'l'], 'house-snow': ['his/p82_x11220', 'l'],
  'his-therma-green': ['his/p92_x11025', 'l'], 'his-therma-stairs': ['his/p78_x11184', 'l'],
};
const manifest = {};
for (const [name, [file, kind]] of Object.entries(items)) {
  let img = sharp(P(file, kind)).ensureAlpha();
  if (kind === 'p') img = img.trim({ threshold: 2 });
  let buf = await img.png().toBuffer();
  if (kind === 'p') {
    // zúžení okraje masky o ~1 px, aby na tmavém pozadí nesvítil světlý lem
    const { width, height } = await sharp(buf).metadata();
    const rgb = await sharp(buf).removeAlpha().toBuffer();
    const alpha = await sharp(buf).extractChannel('alpha').blur(1.1).linear(1.9, -150).toBuffer();
    buf = await sharp(rgb).joinChannel(alpha).png().toBuffer();
  }
  const meta = await sharp(buf).metadata();
  const base = kind === 'p' ? [480, 960, 1440] : [640, 1280, 1920];
  const widths = [...base.filter((w) => w < meta.width * 0.95), meta.width].filter((w, i, a) => a.indexOf(w) === i);
  for (const w of widths) {
    const out = sharp(buf).resize({ width: Math.min(w, meta.width), withoutEnlargement: true });
    await (kind === 'p' ? out.webp({ quality: 82, alphaQuality: 90 }) : out.flatten({ background: '#ffffff' }).webp({ quality: 78 })).toFile(`public/img/${name}-${w}.webp`);
  }
  manifest[name] = { w: meta.width, h: meta.height, widths, alpha: kind === 'p' };
}
writeFileSync('src/data/images.json', JSON.stringify(manifest, null, 1));
console.log(Object.keys(manifest).length, 'obrázků');
