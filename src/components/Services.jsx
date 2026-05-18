import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WebDevIcon, AIIcon, ThreeDIcon, HardwareIcon, ConsultingIcon, InstallationsIcon } from './Icons'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    num: '01',
    name: 'Experience Engineering',
    desc: 'Frontend sofisticado donde cada interacción tiene intención. Interfaces que se sienten bien, no solo que funcionan.',
    tags: ['React', 'Next.js', 'TypeScript', 'Motion'],
    icon: WebDevIcon,
  },
  {
    num: '02',
    name: 'AI-native Products',
    desc: 'Interfaces para sistemas inteligentes: claras, predecibles y humanas. La IA como comportamiento útil, no como feature.',
    tags: ['LLMs', 'AI UI', 'Product', 'UX'],
    icon: AIIcon,
  },
  {
    num: '03',
    name: 'Design Systems',
    desc: 'Sistemas de componentes con criterio visual y consistencia a escala. De tokens a experiencia coherente.',
    tags: ['Tokens', 'Components', 'Storybook', 'Figma'],
    icon: ThreeDIcon,
  },
  {
    num: '04',
    name: 'Motion & Interaction',
    desc: 'Animación con propósito: microinteracciones, transiciones y feedback que refuerzan la narrativa del producto.',
    tags: ['GSAP', 'Framer Motion', 'WebGL', 'R3F'],
    icon: HardwareIcon,
  },
  {
    num: '05',
    name: 'Product Consulting',
    desc: 'Arquitectura de frontend, auditorías UX y roadmap técnico orientado a experiencia de usuario.',
    tags: ['Architecture', 'UX Audit', 'Roadmap'],
    icon: ConsultingIcon,
  },
  {
    num: '06',
    name: 'Creative Technology',
    desc: 'Código generativo, instalaciones interactivas y piezas computacionales para espacios culturales y digitales.',
    tags: ['Generative', 'p5.js', 'Interactive', 'Creative'],
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
    <section ref={sectionRef} id="services" className="relative py-16 md:py-20 lg:py-24" style={{ backgroundColor: '#F2EFE6' }}>
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#0E4A35 1px, transparent 1px), linear-gradient(90deg, #0E4A35 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="relative z-10 w-full mx-auto px-4 sm:px-8 lg:px-16" style={{ maxWidth: '1280px' }}>
        <div ref={titleRef} className="mb-12 md:mb-16 lg:mb-24" style={{ opacity: 0 }}>
          <div style={{ marginBottom: '32px' }}>
            <p className="font-mono text-[12px] tracking-[0.18em] uppercase mb-6" style={{ color: '#0E4A35' }}>
              01 / 05 · Servicios
            </p>
            <h2 className="font-sans text-5xl lg:text-6xl font-semibold leading-[0.95] tracking-tight" style={{ color: '#14140F' }}>
              Cómo construimos
              <br />
              <em className="not-italic" style={{ color: '#0E4A35' }}>experiencias</em>
            </h2>
          </div>
        </div>

        <div
          className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{
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
