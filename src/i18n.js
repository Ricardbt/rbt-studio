/**
 * Idioma de la página.
 *
 * Hay dos páginas estáticas —/ en castellano y /en/ en inglés— y cada una
 * declara su idioma en <html lang>. La app no cambia de idioma en caliente:
 * cambiar de idioma es cambiar de página, que es lo que entienden los
 * buscadores (una URL por idioma, enlazadas con hreflang).
 */

export const LANGS = ['es', 'en']

export const LANG =
  typeof document !== 'undefined' && document.documentElement.lang.startsWith('en') ? 'en' : 'es'

/** Microcopy en línea: t('Cerrar', 'Close'). */
export const t = (es, en) => (LANG === 'en' ? en : es)

/** Ruta de cada versión, relativa a la raíz del dominio. */
export const PATHS = { es: '/', en: '/en/' }
