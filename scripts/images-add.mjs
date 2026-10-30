// Přidá/aktualizuje obrázky v public/img a src/data/images.json podle seznamu v JSON.
// Spuštění: node scripts/images-add.mjs scripts/images-add.json
// Položka: "nazev": ["/cesta/k/souboru", "p" | "l", {crop?: [x,y,w,h] v poměru 0–1}]
//   p = produkt s průhledným pozadím, l = fotografie / scéna
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
sharp.cache(false);
const spec = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const manifest = JSON.parse(readFileSync('src/data/images.json', 'utf8'));
for (const [name, [file, kind, opt = {}]] of Object.entries(spec)) {
  let img = sharp(file, { limitInputPixels: false }).rotate();
  if (opt.crop) {
    const m = await img.metadata();
    const [x, y, w, h] = opt.crop;
    img = img.extract({ left: Math.round(x * m.width), top: Math.round(y * m.height), width: Math.round(w * m.width), height: Math.round(h * m.height) });
  }
  if (kind === 'p') img = img.ensureAlpha().trim({ threshold: 2 });
  // mezikrok: zmenšení obřích fotek na rozumný základ
  let buf = await img.resize({ width: kind === 'p' ? 2000 : 2400, withoutEnlargement: true }).png().toBuffer();
  const meta = await sharp(buf).metadata();
  const base = kind === 'p' ? [480, 960, 1440] : [640, 1280, 1920];
  const widths = [...base.filter((w) => w < meta.width * 0.95), Math.min(meta.width, kind === 'p' ? 2000 : 2400)].filter((w, i, a) => a.indexOf(w) === i);
  for (const w of widths) {
    const out = sharp(buf).resize({ width: Math.min(w, meta.width), withoutEnlargement: true });
    await (kind === 'p' ? out.webp({ quality: 84, alphaQuality: 90 }) : out.flatten({ background: '#ffffff' }).webp({ quality: 76 })).toFile(`public/img/${name}-${w}.webp`);
  }
  manifest[name] = { w: meta.width, h: meta.height, widths, alpha: kind === 'p' };
  console.log(name, meta.width, meta.height);
}
writeFileSync('src/data/images.json', JSON.stringify(manifest, null, 1));
