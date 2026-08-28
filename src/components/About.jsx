import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* =========================================================
   LA HOJA
   La hoja blanca completa, sin nada impreso alrededor. Aquí no
   hay tinta desalineada: es la ficha del estudio, y una ficha
   se lee sin efectos.
   ========================================================= */

const SPECS = [
  {
    label: 'Origen',
    value: 'Bellas Artes → frontend',
    note: 'Bellas Artes en la Universidad de Barcelona. La sensibilidad visual y el pensamiento conceptual son la base de cada decisión técnica.',
  },
  {
    label: 'Perfil',
    value: 'Producto · UX · IA',
    note: 'Más de 10 años traduciendo complejidad técnica en experiencias utilizables. Startups, agencias y producto propio. Criterio, no sólo código.',
  },
  {
    label: 'Disponibilidad',
    value: 'Barcelona · remoto global',
    note: 'Español, catalán e inglés (B2). Abierto a proyectos de producto, agencias y equipos de diseño.',
  },
]

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.sheet-row',
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
            <span className="t-label" style={{ color: 'var(--on-sheet-low)' }}>Sobre mí</span>
            <span className="t-num" style={{ color: 'var(--on-sheet-low)' }}>rbt · bcn</span>
          </div>

          <div className="grid gap-10 pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <h2 className="t-h1" style={{ color: 'var(--on-sheet)' }}>
                Diseño cómo se sienten las cosas al usarse, no sólo cómo funcionan.
              </h2>
            </div>

            <div className="flex flex-col gap-5">
              <p className="t-body" style={{ color: 'var(--on-sheet-mid)' }}>
                Soy Ricard Boixeda — Experience Engineer con más de 10 años traduciendo sistemas
                complejos en productos digitales claros, usables y sofisticados. Mi perfil combina
                Bellas Artes, ingeniería frontend, product thinking e interfaces AI-native.
              </p>
              <p className="t-body" style={{ color: 'var(--on-sheet-mid)' }}>
                Diseño y construyo sistemas frontend donde la interacción, el movimiento y la
                claridad UX son tan deliberados como la arquitectura que hay detrás. Cómodo llevando
                toda la superficie de producto: de los design systems y la arquitectura de
                componentes a las interfaces con IA y el creative technology.
              </p>
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
        </div>
      </div>
    </section>
  )
}
