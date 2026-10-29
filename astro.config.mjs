import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://klima-expert.cz',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [
    sitemap({
      filter: (page) => !/\/(dekujeme|404)\/?$/.test(page),
      changefreq: 'weekly',
    }),
  ],
});
