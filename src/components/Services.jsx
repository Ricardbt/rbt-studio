import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WebDevIcon, AIIcon, ThreeDIcon, HardwareIcon, ConsultingIcon, InstallationsIcon } from './Icons'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    num: '01',
    name: 'Web Development',
    desc: 'Aplicaciones web de producción con React, Next.js y arquitecturas headless. Desde MVPs hasta plataformas escalables.',
    tags: ['React', 'Next.js', 'Supabase', 'TypeScript'],
    icon: WebDevIcon,
  },
  {
    num: '02',
    name: 'AI & Automatización',
    desc: 'Agentes autónomos, pipelines LLM y flujos de automatización con n8n.',
    tags: ['LLMs', 'MCP', 'n8n', 'Python'],
    icon: AIIcon,
  },
  {
    num: '03',
    name: '3D & Creativo',
    desc: 'Experiencias web inmersivas con Three.js, WebGL y React Three Fiber.',
    tags: ['Three.js', 'WebGL', 'GSAP', 'R3F'],
    icon: ThreeDIcon,
  },
  {
    num: '04',
    name: 'Hardware & IoT',
    desc: 'Prototipos físico-digitales: sensores, actuadores y comunicación serial.',
    tags: ['Arduino', 'Sensors', 'Serial', 'IoT'],
    icon: HardwareIcon,
  },
  {
    num: '05',
    name: 'Consultoría',
    desc: 'Auditorías de arquitectura, revisión de código y roadmap técnico.',
    tags: ['Architecture', 'AWS', 'Code Review'],
    icon: ConsultingIcon,
  },
  {
    num: '06',
    name: 'Instalaciones',
    desc: 'Arte computacional e instalaciones para espacios culturales.',
    tags: ['Generative', 'Interactive', 'Creative'],
    icon: InstallationsIcon,
  },
]

export default function Services() {
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

      gsap.fromTo('.service-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="relative" style={{ backgroundColor: '#F2EFE6', paddingTop: '96px', paddingBottom: '96px' }}>
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#0E4A35 1px, transparent 1px), linear-gradient(90deg, #0E4A35 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="relative z-10" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
        <div ref={titleRef} style={{ marginBottom: '96px', opacity: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <div>
              <p className="font-mono text-[12px] tracking-[0.18em] uppercase mb-6" style={{ color: '#0E4A35' }}>
                01 / 05 · Servicios
              </p>
              <h2 className="font-sans text-5xl lg:text-6xl font-semibold leading-[0.95] tracking-tight" style={{ color: '#14140F' }}>
                Lo que creamos
                <br />
                <em className="not-italic" style={{ color: '#0E4A35' }}>para ti</em>
              </h2>
            </div>
            <a
              href="/RBT-ServicesDeck.html"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault()
                window.open('/RBT-ServicesDeck.html', 'Services Deck')
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                backgroundColor: '#0E4A35',
                color: '#F2EFE6',
                border: 'none',
                textDecoration: 'none',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                transition: 'all 240ms cubic-bezier(0.2, 0.7, 0.1, 1)',
                whiteSpace: 'nowrap',
                height: 'fit-content',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(4px, -4px)'
                e.currentTarget.style.boxShadow = '8px 8px 0 rgba(14, 74, 53, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              ↓ Descargar Deck
            </a>
          </div>
        </div>

        <div
          className="services-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            borderTop: '1px solid #C9C5B6',
            borderLeft: '1px solid #C9C5B6',
            backgroundColor: 'transparent',
          }}
        >
          {SERVICES.map((service) => (
            <div
              key={service.num}
              className="service-card group"
              style={{
                borderRight: '1px solid #C9C5B6',
                borderBottom: '1px solid #C9C5B6',
                padding: '32px',
                minHeight: '320px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                transition: 'background-color 240ms cubic-bezier(0.2, 0.7, 0.1, 1)',
                cursor: 'pointer',
                backgroundColor: '#FBF9F2',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F8F5EC'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FBF9F2'
              }}
            >
              <span className="font-mono text-[11px] tracking-[0.1em] uppercase" style={{ color: '#0E4A35' }}>
                {service.num}
              </span>
              <div style={{ marginTop: '8px', color: '#0E4A35' }}>
                <service.icon size={56} color="#0E4A35" />
              </div>
              <h3 className="font-sans text-[26px] font-semibold leading-[1.15]" style={{ color: '#14140F' }}>
                {service.name}
              </h3>
              <p className="font-sans text-[14px] flex-1 leading-[1.5]" style={{ color: '#3A3A33' }}>
                {service.desc}
              </p>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] tracking-[0.1em] uppercase"
                    style={{ color: '#6E6E64' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
