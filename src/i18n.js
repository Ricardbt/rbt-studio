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

/**
 * Cada caso de estudio tiene su página: /casos/<slug>/ y /en/cases/<slug>/.
 * Es la URL que se comparte e indexa (y la que necesita Google para indexar
 * el vídeo, que tiene que ser el contenido principal de su página).
 */
export const casePath = (lang, slug) => (lang === 'en' ? `/en/cases/${slug}/` : `/casos/${slug}/`)

/** El slug del caso si esta página es la de un caso; null en la portada. */
export const CASE_SLUG =
  (typeof document !== 'undefined' && document.documentElement.dataset.case) || null

/** Lee el slug de una ruta de caso del idioma de la página. */
export const slugFromPath = (pathname) => {
  const m = pathname.match(LANG === 'en' ? /^\/en\/cases\/([^/]+)\/?$/ : /^\/casos\/([^/]+)\/?$/)
  return m ? m[1] : null
}
