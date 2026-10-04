import { Misreg } from './Press'
import { COPY } from '../data/copy'
import { LANG, PATHS } from '../i18n'

const NAV = COPY[LANG].nav
const OTHER = LANG === 'en' ? 'es' : 'en'
const SECTIONS = ['services', 'projects', 'works', 'artistic', 'about', 'contact']
const EMAIL = 'contact@rbt-studio.com'

// El pie repite el índice de la hoja: al acabar de leer, el siguiente paso
// está a mano sin volver arriba. También es lo que da al documento sus
// enlaces internos más allá de la barra.
export default function Footer() {
  return (
    <footer style={{ borderTop: 'var(--hairline-p)' }}>
      <div
        className="mx-auto flex w-full flex-col gap-6 px-6 py-8 md:px-12 lg:px-16"
        style={{ maxWidth: 'var(--container)' }}
      >
        <nav aria-label={NAV.footer} className="flex flex-wrap gap-x-6 gap-y-2">
          {SECTIONS.map((id) => (
            <a key={id} href={`#${id}`} className="t-label nav-link">{NAV[id]}</a>
          ))}
          <a href={`mailto:${EMAIL}`} className="t-label nav-link">{EMAIL}</a>
          <a href={PATHS[OTHER]} hrefLang={OTHER} lang={OTHER} className="t-label nav-link">
            {NAV.switchAria}
          </a>
        </nav>

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <span className="rbt-mark"><Misreg>rbt.</Misreg></span>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <span className="t-label" style={{ color: 'var(--on-press-low)' }}>© 2026 · Barcelona</span>
            <span className="flex items-center gap-1.5" aria-hidden="true">
              {['var(--ink-cyan)', 'var(--ink-magenta)', 'var(--ink-yellow)', 'var(--ink-key)'].map((ink) => (
                <span key={ink} style={{ display: 'block', width: '9px', height: '9px', background: ink }} />
              ))}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
