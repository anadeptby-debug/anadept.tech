import { defineConfig } from 'astro/config';

// SITE_URL / BASE_PATH задаются в GitHub Actions (из actions/configure-pages),
// чтобы сайт работал и на <user>.github.io/<repo>/, и на своём домене.
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site: process.env.SITE_URL || 'https://anadept.tech',
  base,
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
