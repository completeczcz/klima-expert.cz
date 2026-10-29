// Česká typografie: nezlomitelná mezera za jednopísmennými předložkami a spojkami (v, k, s, z, o, u, a, i)
// a mezi číslem a jednotkou (Kč, kW, m², dB…). Upravuje jen text mimo tagy, skripty a styly.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { glob } from 'node:fs/promises';

const single = /(^|[\s(„])([vkszouaiVKSZOUAI])\s+(?=\S)/g;
const units = /(\d)\s+(Kč|kW|W|m²|m2|m|dB\(A\)|dB|°C|%|kg|l|let|roky|let)(?=[\s.,;:)!?]|$)/g;

function fixText(t) {
  return t.replace(single, (m, pre, ch) => `${pre}${ch} `).replace(single, (m, pre, ch) => `${pre}${ch} `).replace(units, '$1 $2');
}

export default function czechNbsp() {
  return {
    name: 'czech-nbsp',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        let n = 0;
        for await (const f of glob('**/*.html', { cwd: root })) {
          const p = root + f;
          const html = await readFile(p, 'utf8');
          const out = html.replace(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>)|([^<]+)/g, (m, tag, text) => (tag ? tag : fixText(text)));
          if (out !== html) { await writeFile(p, out); n++; }
        }
        logger.info(`nezlomitelné mezery: upraveno ${n} stránek`);
      },
    },
  };
}
