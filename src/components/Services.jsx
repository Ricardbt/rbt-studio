import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PassOpen } from './Press'

gsap.registerPlugin(ScrollTrigger)

/* =========================================================
   PASADA 01 — CARTA DE TINTAS
   Los servicios no son seis tarjetas iguales: son las líneas
   de una carta de tintas. Cada una lleva su tinta, su nombre y
   su cobertura. Al pasar por encima, la línea se imprime en
   papel: la pasada se completa.
   ========================================================= */

const SERVICES = [
  {
    num: '01',
    ink: 'var(--ink-cyan)', tint: 'var(--ink-cyan-t)',
    inkName: 'Cian',
    name: 'Experience Engineering',
    desc: 'Frontend sofisticado donde cada interacción tiene intención. Interfaces que se sienten bien, no sólo que funcionan.',
    tags: ['React', 'Next.js', 'TypeScript', 'Motion'],
    coverage: 100,
  },
  {
    num: '02',
    ink: 'var(--ink-magenta)', tint: 'var(--ink-magenta-t)',
    inkName: 'Magenta',
    name: 'Producto AI-native',
    desc: 'Interfaces para sistemas inteligentes: claras, predecibles y humanas. La IA como comportamiento útil, no como reclamo.',
    tags: ['LLMs', 'AI UI', 'Producto', 'UX'],
    coverage: 90,
  },
  {
    num: '03',
    ink: 'var(--ink-yellow)', tint: 'var(--ink-yellow-t)',
    inkName: 'Amarillo',
    name: 'Design Systems',
    desc: 'Sistemas de componentes con criterio visual y consistencia a escala. De los tokens a una experiencia coherente.',
    tags: ['Tokens', 'Componentes', 'Storybook', 'Figma'],
    coverage: 80,
  },
  {
    num: '04',
    ink: 'var(--ink-over-cm)', tint: 'var(--ink-violet-t)',
    inkName: 'Cian + Magenta',
    name: 'Movimiento e interacción',
    desc: 'Animación con propósito: microinteracciones, transiciones y feedback que refuerzan la narrativa del producto.',
    tags: ['GSAP', 'Framer Motion', 'WebGL', 'R3F'],
    coverage: 70,
  },
  {
    num: '05',
    ink: 'var(--ink-over-my)', tint: 'var(--ink-orange-t)',
    inkName: 'Magenta + Amarillo',
    name: 'Consultoría de producto',
    desc: 'Arquitectura frontend, auditoría UX y hoja de ruta técnica orientada a la experiencia de uso.',
    tags: ['Arquitectura', 'Auditoría UX', 'Roadmap'],
    coverage: 60,
  },
  {
    num: '06',
    ink: 'var(--ink-key)', tint: 'var(--ink-key)',
    inkName: 'Negro',
    name: 'Creative technology',
    desc: 'Código generativo, instalaciones interactivas y piezas computacionales para espacios culturales y digitales.',
    tags: ['Generativo', 'p5.js', 'Interactivo', 'Instalación'],
    coverage: 100,
  },
]

export default function Services() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ink-row',
        { opacity: 0, x: -12 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.ink-chart', start: 'top 78%', toggleActions: 'play none none reverse' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="relative pb-20 md:pb-28">
      <div className="mx-auto w-full px-6 md:px-12 lg:px-16" style={{ maxWidth: 'var(--container)' }}>
        <PassOpen
          pass={1}
          title="Carta de tintas"
          sub="Seis maneras de trabajar. Cada una con su tinta, su cobertura y lo que deja en la hoja."
        />

        <div className="ink-chart">
          {SERVICES.map((service) => (
            <article key={service.num} className="ink-row" style={{ opacity: 0 }}>
              <div className="ink-row__inner">
                <span className="ink-row__chip" style={{ background: service.ink }} aria-hidden="true" />

                <div className="ink-row__id">
                  <span className="t-num" style={{ color: service.tint }}>{service.num}</span>
                  <span className="t-label mt-2 block" style={{ color: 'var(--on-press-low)' }}>
                    {service.inkName}
                  </span>
                </div>

                <div className="ink-row__body">
                  <h3 className="t-h2">{service.name}</h3>
                  <p className="t-small mt-3" style={{ color: 'var(--on-press-mid)', maxWidth: '58ch' }}>
                    {service.desc}
                  </p>
                </div>

                <div className="ink-row__meta">
                  <span className="t-label" style={{ color: 'var(--on-press-low)' }}>
                    Cobertura {service.coverage}%
                  </span>
                  <span className="ink-row__bar" aria-hidden="true">
                    <span style={{ width: `${service.coverage}%`, background: service.ink }} />
                  </span>
                  <div className="ink-row__tags">
                    {service.tags.map((tag) => (
                      <span key={tag} className="t-label" style={{ color: 'var(--on-press-low)' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .ink-row { border-bottom: var(--hairline-p); }

        .ink-row__inner {
          display: grid;
          grid-template-columns: 12px 132px 1fr 260px;
          gap: var(--s-5);
          align-items: start;
          padding: var(--s-6) var(--s-4);
          transition: background var(--dur-base) var(--ease-snap), color var(--dur-base);
        }

        /* Pasar por encima es imprimir la línea: sale en papel. */
        .ink-row:hover .ink-row__inner,
        .ink-row:focus-within .ink-row__inner {
          background: var(--sheet);
          color: var(--on-sheet);
        }
        .ink-row:hover .t-small,
        .ink-row:focus-within .t-small { color: var(--on-sheet-mid) !important; }
        .ink-row:hover .t-label,
        .ink-row:focus-within .t-label { color: var(--on-sheet-low) !important; }
        .ink-row:hover .t-num,
        .ink-row:focus-within .t-num { color: var(--on-sheet) !important; }

        .ink-row__chip { display: block; width: 12px; height: 44px; }

        .ink-row__body h3 { font-variation-settings: 'wdth' 112; }

        .ink-row__meta { display: flex; flex-direction: column; gap: var(--s-2); }

        .ink-row__bar {
          display: block;
          height: 4px;
          width: 100%;
          background: var(--press-line);
        }
        .ink-row__bar > span { display: block; height: 100%; }

        .ink-row__tags { display: flex; flex-wrap: wrap; gap: 10px; margin-top: var(--s-2); }

        @media (max-width: 1024px) {
          .ink-row__inner { grid-template-columns: 12px 1fr; gap: var(--s-4); }
          .ink-row__id { display: flex; align-items: baseline; gap: var(--s-3); }
          .ink-row__id .t-label { margin-top: 0 !important; }
          .ink-row__body, .ink-row__meta { grid-column: 2; }
        }
      `}</style>
    </section>
  )
}
