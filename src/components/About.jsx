import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { appear } from '../lib/motion'
import { ContactCta } from './Press'
import { COPY } from '../data/copy'
import { LANG } from '../i18n'

gsap.registerPlugin(ScrollTrigger)

/* =========================================================
   LA HOJA
   La hoja blanca completa, sin nada impreso alrededor. Aquí no
   hay tinta desalineada: es la ficha del estudio, y una ficha
   se lee sin efectos.
   ========================================================= */

const T = COPY[LANG].about
const SPECS = T.specs

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      appear('.sheet-row',
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.sheet-specs', start: 'top 82%', toggleActions: 'play none none reverse' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative py-16 md:py-24">
      <div className="mx-auto w-full px-6 md:px-12 lg:px-16" style={{ maxWidth: 'var(--container)' }}>
        <div className="sheet" style={{ padding: 'clamp(28px, 5vw, 72px)' }}>
          <div className="flex items-baseline justify-between gap-4" style={{ borderBottom: 'var(--hairline)', paddingBottom: 'var(--s-4)' }}>
            <span className="t-label" style={{ color: 'var(--on-sheet-low)' }}>{T.label}</span>
            <span className="t-num" style={{ color: 'var(--on-sheet-low)' }}>rbt · bcn</span>
          </div>

          <div className="grid gap-10 pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <h2 className="t-h1" style={{ color: 'var(--on-sheet)' }}>
                {T.title}
              </h2>
            </div>

            <div className="flex flex-col gap-5">
              {T.paragraphs.map((p) => (
                <p key={p} className="t-body" style={{ color: 'var(--on-sheet-mid)' }}>{p}</p>
              ))}
            </div>
          </div>

          <dl className="sheet-specs mt-12" style={{ borderTop: 'var(--hairline)' }}>
            {SPECS.map((spec) => (
              <div
                key={spec.label}
                className="sheet-row grid gap-3 py-6 md:grid-cols-[140px_200px_1fr] md:gap-6"
                style={{ borderBottom: 'var(--hairline)', opacity: 0 }}
              >
                <dt className="t-label" style={{ color: 'var(--on-sheet-low)' }}>{spec.label}</dt>
                <dd className="t-h3" style={{ color: 'var(--on-sheet)' }}>{spec.value}</dd>
                <dd className="t-small" style={{ color: 'var(--on-sheet-mid)' }}>{spec.note}</dd>
              </div>
            ))}
          </dl>

          <ContactCta {...COPY[LANG].cta.about} onSheet />
        </div>
      </div>
    </section>
  )
}
