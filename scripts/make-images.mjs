// Vygeneruje og.png (1200×630) a apple-touch-icon.png z vektorové grafiky.
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
const fav = readFileSync('public/favicon.svg');
await sharp(fav, { density: 600 }).resize(180, 180).png().toFile('public/apple-touch-icon.png');
const rings = [1, 0.8, 0.62, 0.46, 0.32].map((f, i) => `<ellipse cx="930" cy="330" rx="${300 * f}" ry="${220 * f}" fill="none" stroke="#7fa6b8" stroke-opacity="${0.75 - i * 0.1}" stroke-width="2"/>`).join('');
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#13283a"/>${rings}<circle cx="930" cy="330" r="34" fill="#f4b43a"/>
<g transform="translate(80 92)"><path d="M20 3.5c8.6 0 16.2 5.6 16.2 15.3 0 9.4-7.8 17.7-17 17.7C10 36.5 3.8 29.6 3.8 21 3.8 11 11 3.5 20 3.5z" transform="scale(1.4)" fill="none" stroke="#dcebf1" stroke-width="2.4"/><circle cx="28" cy="27.7" r="6" fill="#f4b43a"/>
<text x="70" y="40" font-family="Bricolage Grotesque" font-weight="800" font-size="40" fill="#f4f7f8">Klima Expert</text></g>
<text font-family="Bricolage Grotesque" font-weight="800" font-size="70" fill="#f4f7f8" letter-spacing="-2"><tspan x="80" y="300">Klimatizace</tspan><tspan x="80" y="380">a tepelná čerpadla</tspan><tspan x="80" y="460">s montáží po celé ČR</tspan></text>
<text x="80" y="540" font-family="Public Sans" font-weight="600" font-size="28" fill="#c4d6df">Mitsubishi Heavy Industries · Hisense · poptávka zdarma</text></svg>`;
await sharp(Buffer.from(og)).png().toFile('public/og.png');
console.log('ok');
