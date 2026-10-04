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
    // Una página por caso y por idioma, a partir de la portada ya construida
    // (con sus scripts y estilos con hash).
    writeBundle() {
      const built = {
        es: readFileSync(join(outDir, 'index.html'), 'utf8'),
        en: readFileSync(join(outDir, 'en/index.html'), 'utf8'),
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
