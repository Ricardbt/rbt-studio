import { fileURLToPath } from 'node:url'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {
  headTags, shellHtml, caseHeadTags, caseShellHtml, CASE_PAGES,
  llmsTxt, llmsFull, sitemapXml,
} from './src/seo/render.js'

// Dos páginas, una por idioma: / (castellano) y /en/ (inglés). Cada una lleva
// su <html lang>, que es lo que lee src/i18n.js para pintar el idioma.
const pageLang = (filename) => (/[\\/]en[\\/]index\.html$/.test(filename) ? 'en' : 'es')

// Lo generado va entre marcas para poder sustituirlo después: la página de
// cada caso es la de su idioma con otra cabecera, otro contenido y data-case.
const HEAD = /<!--seo-->[\s\S]*?<!--\/seo-->/
const SHELL = /<!--shell-->[\s\S]*?<!--\/shell-->/

function toCasePage(html, lang, c) {
  return html
    .replace(HEAD, () => `<!--seo-->${caseHeadTags(lang, c)}\n    <!--/seo-->`)
    .replace(SHELL, () => `<!--shell-->${caseShellHtml(lang, c)}<!--/shell-->`)
    .replace(/<html lang="(\w+)"/, `<html lang="$1" data-case="${c.slug}"`)
}

// Lo que el primer pintado espera, quitado de la ruta crítica:
// - la hoja de estilos (unos 5 KB comprimida) va en línea: una petición
//   bloqueante menos, y el HTML estático sale ya con su aspecto;
// - las dos fuentes latinas se precargan: sin esto el navegador sólo las
//   descubre al aplicar el CSS. El resto de subconjuntos (latin-ext,
//   vietnamita…) se piden sólo si la página los usa, por unicode-range.
const PRELOAD_FONTS = [/archivo-latin-wdth-normal-.*\.woff2$/, /spline-sans-mono-latin-wght-normal-.*\.woff2$/]

function renderFast(html, bundle) {
  const files = Object.keys(bundle)
  const fonts = PRELOAD_FONTS
    .map((re) => files.find((f) => re.test(f)))
    .filter(Boolean)
    .map((f) => `<link rel="preload" href="/${f}" as="font" type="font/woff2" crossorigin>`)
    .join('\n    ')
  return html.replace(/<link rel="stylesheet"[^>]*href="\/(assets\/[^"]+\.css)"[^>]*>/g, (_, css) => {
    const source = bundle[css]?.source
    return source ? `${fonts}\n    <style>${String(source).replace(/<\/style/gi, '<\\/style')}</style>` : _
  })
}

// El sitio se pinta entero con JavaScript: sin esto, lo que recibe un crawler,
// un agente o la vista previa de un enlace es un <div id="root"> vacío y un
// <head> sin nada. Se rellenan los dos con el mismo texto que luego pinta
// React, sacado de los mismos datos (src/seo/render.js); createRoot reemplaza
// el contenido de #root en cuanto arranca la app.
function machineReadable() {
  let outDir = 'dist'
  return {
    name: 'machine-readable',
    configResolved(config) { outDir = config.build.outDir },
    transformIndexHtml(page, ctx) {
      const lang = pageLang(ctx.filename)
      return page
        .replace('<!-- seo:head -->', () => `<!--seo-->${headTags(lang)}\n    <!--/seo-->`)
        .replace('<div id="root"></div>', () => `<div id="root"><!--shell-->${shellHtml(lang)}<!--/shell--></div>`)
    },
    // Ficheros para agentes: se generan en cada build desde los datos, así
    // que nunca se quedan atrás respecto a lo que enseña la web.
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      const emit = (fileName, source) => this.emitFile({ type: 'asset', fileName, source })
      emit('llms.txt', llmsTxt())
      emit('llms-full.txt', llmsFull('en'))
      emit('llms-full.es.txt', llmsFull('es'))
      emit('sitemap.xml', sitemapXml(today))
    },
    // Con el HTML ya escrito: CSS en línea y fuentes precargadas en las dos
    // portadas, y después una página por caso y por idioma a partir de ellas
    // (con sus scripts con hash).
    writeBundle(_, bundle) {
      const built = {}
      for (const [lang, name] of [['es', 'index.html'], ['en', 'en/index.html']]) {
        const file = join(outDir, name)
        built[lang] = renderFast(readFileSync(file, 'utf8'), bundle)
        writeFileSync(file, built[lang])
      }
      for (const { lang, c, path } of CASE_PAGES) {
        const file = join(outDir, path, 'index.html')
        mkdirSync(dirname(file), { recursive: true })
        writeFileSync(file, toCasePage(built[lang], lang, c))
      }
    },
    // En desarrollo también se sirven, para poder revisarlos.
    configureServer(server) {
      const files = {
        '/llms.txt': llmsTxt,
        '/llms-full.txt': () => llmsFull('en'),
        '/llms-full.es.txt': () => llmsFull('es'),
        '/sitemap.xml': () => sitemapXml(new Date().toISOString().slice(0, 10)),
      }
      server.middlewares.use(async (req, res, next) => {
        const url = req.url.split('?')[0]
        const make = files[url]
        if (make) {
          res.setHeader('Content-Type', url.endsWith('.xml') ? 'application/xml' : 'text/markdown; charset=utf-8')
          return res.end(make())
        }
        const casePage = CASE_PAGES.find((p) => p.path === url || p.path === `${url}/`)
        if (!casePage) return next()
        const source = casePage.lang === 'en' ? 'en/index.html' : 'index.html'
        const html = await server.transformIndexHtml(url, readFileSync(source, 'utf8'))
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(toCasePage(html, casePage.lang, casePage.c))
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), machineReadable()],
  base: '/',
  assetsInclude: ['**/*.PNG', '**/*.JPG'],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        en: fileURLToPath(new URL('./en/index.html', import.meta.url)),
      },
    },
  },
})
