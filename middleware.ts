import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['es', 'en', 'fr'],
  defaultLocale: 'es',
  localePrefix: 'always'
});
