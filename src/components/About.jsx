import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      itemsRef.current.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, y: 30, rotateY: -10 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            delay: i * 0.1
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative" style={{ backgroundColor: '#F8F5EC' }}>

      <div className="relative z-10 px-6 md:px-12 lg:px-16 xl:px-24 py-20 md:py-28 lg:py-32">
        <div ref={headerRef} className="max-w-[820px] mb-16 md:mb-20 lg:mb-24">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase mb-4 md:mb-6" style={{ color: 'var(--rbt-signal)' }}>
            Sobre mí
          </div>
          <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.05] mb-6" style={{ color: '#14140F' }}>
            Diseño cómo se sienten las cosas al usarse, no solo cómo funcionan.
          </h2>
          <p className="font-sans text-base md:text-lg leading-relaxed mb-4" style={{ color: '#3A3A33' }}>
            Soy Ricard Boixeda — Experience Engineer con más de 10 años traduciendo sistemas complejos en productos digitales claros, usables y sofisticados. Mi perfil combina Bellas Artes, ingeniería frontend, product thinking e interfaces AI-native.
          </p>
          <p className="font-sans text-base md:text-lg leading-relaxed" style={{ color: '#3A3A33' }}>
            Diseño y construyo sistemas frontend donde la interacción, el movimiento y la claridad UX son tan deliberados como la arquitectura que hay detrás. Cómodo siendo dueño de toda la superficie de producto: desde design systems y arquitectura de componentes hasta interfaces con IA y creative technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 max-w-[1400px]">
          <div
            ref={el => itemsRef.current[0] = el}
            className="opacity-0"
          >
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase mb-4 md:mb-6" style={{ color: '#6E6E64' }}>
              Origen
            </div>
            <h3 className="font-sans text-2xl md:text-3xl font-semibold mb-3" style={{ color: '#14140F' }}>
              Fine Arts → Frontend
            </h3>
            <p className="font-sans text-sm md:text-base leading-relaxed" style={{ color: '#3A3A33' }}>
              Bellas Artes en la Universidad de Barcelona. La sensibilidad visual y el pensamiento conceptual son la base de cada decisión técnica.
            </p>
          </div>

          <div
            ref={el => itemsRef.current[1] = el}
            className="opacity-0"
          >
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase mb-4 md:mb-6" style={{ color: '#6E6E64' }}>
              Perfil diferencial
            </div>
            <h3 className="font-sans text-2xl md:text-3xl font-semibold mb-3" style={{ color: '#14140F' }}>
              Product + UX + AI
            </h3>
            <p className="font-sans text-sm md:text-base leading-relaxed" style={{ color: '#3A3A33' }}>
              10+ años traduciendo complejidad técnica en experiencias utilizables. Startups, agencias y productos propios. Criterio, no solo código.
            </p>
          </div>

          <div
            ref={el => itemsRef.current[2] = el}
            className="opacity-0"
          >
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase mb-4 md:mb-6" style={{ color: '#6E6E64' }}>
              Disponibilidad
            </div>
            <h3 className="font-sans text-2xl md:text-3xl font-semibold mb-3" style={{ color: '#14140F' }}>
              Barcelona · Global
            </h3>
            <p className="font-sans text-sm md:text-base leading-relaxed" style={{ color: '#3A3A33' }}>
              Disponible en remoto globalmente. Español, Catalán, Inglés (B2). Abierto a proyectos de producto, agencias y equipos de diseño.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
