import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://anadept.by',
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
