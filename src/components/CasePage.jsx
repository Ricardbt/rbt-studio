import CaseStudyModal from './CaseStudyModal'
import { CASES_BY_LANG } from '../data/caseStudies'
import { LANG, casePath, t } from '../i18n'

const CASES = CASES_BY_LANG[LANG]

/* =========================================================
   LA PÁGINA DE UN CASO — /casos/<slug>/
   El mismo lector que se abre sobre la portada, pero como página:
   el caso es el contenido principal (que es lo que exige Google
   para indexar su vídeo) y al pie quedan los demás casos, para que
   la página no sea un callejón sin salida.
   ========================================================= */

export default function CasePage({ slug }) {
  const c = CASES.find((x) => x.slug === slug)
  if (!c) return null
  const others = CASES.filter((x) => x.slug !== slug)

  return (
    <>
      <CaseStudyModal caseData={c} standalone />

      <nav
        aria-label={t('Otros casos', 'Other cases')}
        className="mx-auto w-full px-6 pb-8 pt-16 md:px-12 lg:px-16"
        style={{ maxWidth: 'var(--container)' }}
      >
        <p className="t-label" style={{ color: 'var(--on-press-low)' }}>{t('Otros casos', 'Other cases')}</p>
        <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug}>
              <a href={casePath(LANG, o.slug)} className="nav-link t-small">
                <span style={{ color: o.color, fontWeight: 600 }}>{o.tag}</span> — {o.subtitle}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
