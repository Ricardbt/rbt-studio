import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { headTags, shellHtml, llmsTxt, llmsFull, sitemapXml } from './src/seo/render.js'

// Dos páginas, una por idioma: / (castellano) y /en/ (inglés). Cada una lleva
// su <html lang>, que es lo que lee src/i18n.js para pintar el idioma.
const pageLang = (filename) => (/[\\/]en[\\/]index\.html$/.test(filename) ? 'en' : 'es')

// El sitio se pinta entero con JavaScript: sin esto, lo que recibe un crawler,
// un agente o la vista previa de un enlace es un <div id="root"> vacío y un
// <head> sin nada. Se rellenan los dos con el mismo texto que luego pinta
// React, sacado de los mismos datos (src/seo/render.js); createRoot reemplaza
// el contenido de #root en cuanto arranca la app.
function machineReadable() {
  return {
    name: 'machine-readable',
    transformIndexHtml(page, ctx) {
      const lang = pageLang(ctx.filename)
      return page
        .replace('<!-- seo:head -->', headTags(lang))
        .replace('<div id="root"></div>', `<div id="root">${shellHtml(lang)}</div>`)
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
    // En desarrollo también se sirven, para poder revisarlos.
    configureServer(server) {
      const files = {
        '/llms.txt': llmsTxt,
        '/llms-full.txt': () => llmsFull('en'),
        '/llms-full.es.txt': () => llmsFull('es'),
        '/sitemap.xml': () => sitemapXml(new Date().toISOString().slice(0, 10)),
      }
      server.middlewares.use((req, res, next) => {
        const make = files[req.url]
        if (!make) return next()
        res.setHeader('Content-Type', req.url.endsWith('.xml') ? 'application/xml' : 'text/markdown; charset=utf-8')
        res.end(make())
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
