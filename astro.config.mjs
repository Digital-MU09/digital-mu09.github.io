import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://digital-mu09.github.io',
  integrations: [sitemap()],
});
