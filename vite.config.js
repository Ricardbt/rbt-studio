import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { CASES } from './src/data/caseStudies.js'
import { WORK_GROUPS } from './src/data/works.js'
import { SERVICES } from './src/data/services.js'

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const oneLine = (s) => esc(s.replace(/\s*\n\s*/g, ' '))

// El sitio se pinta entero con JavaScript: sin esto, el HTML que recibe un
// crawler (o la vista previa de un enlace) es un <div id="root"> vacío. Se
// rellena el root con el mismo texto que luego pinta React, sacado de los
// mismos datos; createRoot lo reemplaza en cuanto arranca la app.
function staticShell() {
  const html = `
      <div class="static-shell">
        <h1>rbt.studio — portfolio de Ricard Boixeda, Experience Engineer</h1>
        <p>Soy Ricard Boixeda — Experience Engineer con más de 10 años traduciendo sistemas complejos en productos digitales claros, usables y sofisticados. Mi perfil combina Bellas Artes, ingeniería frontend, product thinking e interfaces AI-native. Desde Barcelona, en remoto.</p>

        <section>
          <h2>Carta de tintas</h2>
          <p>Seis maneras de trabajar.</p>
          <ul>${SERVICES.map((s) => `
            <li><h3>${esc(s.name)}</h3><p>${esc(s.desc)}</p></li>`).join('')}
          </ul>
        </section>

        <section>
          <h2>Las separaciones</h2>
          <p>Proyectos contados de principio a fin: el problema, las decisiones que lo resolvieron y lo que salió mal por el camino.</p>
          <ul>${CASES.map((c) => `
            <li><h3>${oneLine(c.title)}</h3><p>${esc(c.tag)} — ${oneLine(c.subtitle)}</p></li>`).join('')}
          </ul>
        </section>

        <section>
          <h2>La pila</h2>
          <p>Algunos encargos de cliente en producción: de hospitales y universidades a tiendas y portfolios.</p>
          <ul>${WORK_GROUPS.map((g) => `
            <li><h3>${esc(g.client)}</h3><p>${esc(g.cover.tech)}</p></li>`).join('')}
          </ul>
        </section>

        <section>
          <h2>La cuarta tinta</h2>
          <p>Cuéntame el proyecto. Respondo en menos de 24 horas, desde Barcelona.</p>
          <p><a href="mailto:contact@rbt-studio.com">contact@rbt-studio.com</a></p>
        </section>
      </div>
    `
  return {
    name: 'static-shell',
    transformIndexHtml: (page) => page.replace('<div id="root"></div>', `<div id="root">${html}</div>`),
  }
}

export default defineConfig({
  plugins: [react(), staticShell()],
  base: './',
  assetsInclude: ['**/*.PNG', '**/*.JPG'],
})
