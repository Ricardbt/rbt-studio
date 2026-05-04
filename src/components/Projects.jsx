import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  { num: '01', name: 'StoryPrint AI', desc: 'SaaS de cuentos ilustrados personalizados con generación LLM.', tech: '2024' },
  { num: '02', name: 'Brandboard AI', desc: 'Plataforma de identidad de marca con pipeline multi-agente.', tech: '2024' },
  { num: '03', name: 'NutrAI', desc: 'Formulador de suplementos personalizado con parsing JSON.', tech: '2023' },
  { num: '04', name: 'GeoRoutes', desc: 'Tema WordPress con Leaflet maps y soporte GPX.', tech: '2023' },
  { num: '05', name: 'Portfolio 3D', desc: 'Tema WordPress con integración Three.js y WebGL.', tech: '2022' },
  { num: '06', name: 'Processing Sketches', desc: 'Animaciones generativas y arte algorítmico.', tech: '2022' },
]

export default function Projects() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo('.project-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="work" className="relative" style={{ backgroundColor: '#14140F', color: '#F2EFE6', paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="relative z-10" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
        <div ref={titleRef} style={{ marginBottom: '96px', opacity: 0 }}>
          <p className="font-mono text-[12px] tracking-[0.18em] uppercase mb-6" style={{ color: '#7DB89F' }}>
            02 / 05 · Proyectos
          </p>
          <h2 className="font-sans text-5xl lg:text-6xl font-semibold leading-[0.95] tracking-tight" style={{ color: '#F2EFE6' }}>
            Trabajo
            <br />
            <em className="not-italic" style={{ color: '#7DB89F' }}>seleccionado</em>
          </h2>
        </div>

        <div
          className="projects-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1px',
            backgroundColor: 'rgba(242, 239, 230, 0.15)',
            border: '1px solid rgba(242, 239, 230, 0.15)',
          }}
        >
          {PROJECTS.map((project) => (
            <div
              key={project.num}
              className="project-card group"
              style={{
                padding: '40px 32px',
                minHeight: '320px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'background-color 240ms cubic-bezier(0.2, 0.7, 0.1, 1)',
                cursor: 'pointer',
                backgroundColor: '#14140F',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1f1f17'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#14140F'
              }}
            >
              <div>
                <span className="font-mono text-[11px] tracking-[0.1em] uppercase" style={{ color: '#7DB89F' }}>
                  {project.num}
                </span>
                <h3 className="font-sans text-[36px] font-semibold leading-[1.05] tracking-tight mt-6" style={{ color: '#F2EFE6' }}>
                  {project.name}
                </h3>
                <p className="font-sans text-[14px] leading-[1.5] mt-4" style={{ color: '#F2EFE6', opacity: 0.8 }}>
                  {project.desc}
                </p>
              </div>
              <div className="flex justify-between items-center" style={{ borderTop: '1px solid rgba(242, 239, 230, 0.15)', paddingTop: '16px', marginTop: '16px' }}>
                <span className="font-mono text-[11px] tracking-[0.1em] uppercase" style={{ color: 'rgba(242, 239, 230, 0.5)' }}>
                  {project.tech}
                </span>
                <span style={{ color: '#7DB89F' }}>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
