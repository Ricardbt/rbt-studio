import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    <section ref={sectionRef} style={{ backgroundColor: '#F8F5EC' }}>
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#0E4A35 1px, transparent 1px), linear-gradient(90deg, #0E4A35 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="relative z-10 px-6 md:px-12 lg:px-16 xl:px-24 py-20 md:py-28 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 max-w-[1400px]">
          <div
            ref={el => itemsRef.current[0] = el}
            className="opacity-0"
          >
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase mb-4 md:mb-6" style={{ color: '#6E6E64' }}>
              Formación
            </div>
            <h3 className="font-sans text-2xl md:text-3xl font-semibold mb-3" style={{ color: '#14140F' }}>
              Bellas Artes
            </h3>
            <p className="font-sans text-sm md:text-base leading-relaxed" style={{ color: '#3A3A33' }}>
              Imagen & Diseño · Universidad de Barcelona. Base conceptual y visual que impregna cada proyecto técnico.
            </p>
          </div>

          <div
            ref={el => itemsRef.current[1] = el}
            className="opacity-0"
          >
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase mb-4 md:mb-6" style={{ color: '#6E6E64' }}>
              Experiencia
            </div>
            <h3 className="font-sans text-2xl md:text-3xl font-semibold mb-3" style={{ color: '#14140F' }}>
              10+ años
            </h3>
            <p className="font-sans text-sm md:text-base leading-relaxed" style={{ color: '#3A3A33' }}>
              De la Universidad de Barcelona a proyectos propios. Startups, agencias e instituciones.
            </p>
          </div>

          <div
            ref={el => itemsRef.current[2] = el}
            className="opacity-0"
          >
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase mb-4 md:mb-6" style={{ color: '#6E6E64' }}>
              Ubicación
            </div>
            <h3 className="font-sans text-2xl md:text-3xl font-semibold mb-3" style={{ color: '#14140F' }}>
              Barcelona
            </h3>
            <p className="font-sans text-sm md:text-base leading-relaxed" style={{ color: '#3A3A33' }}>
              Disponible globalmente en remoto. Español, Catalán, Inglés (B2).
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
