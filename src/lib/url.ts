/** Путь с учётом base (нужно для GitHub Pages в подпапке репозитория). */
export const url = (path: string) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
};

/** Путь страницы с учётом языка: ('en', '/services/') → /en/services/ */
export const lurl = (lang: 'ru' | 'en', path: string) => url((lang === 'en' ? '/en' : '') + path);
