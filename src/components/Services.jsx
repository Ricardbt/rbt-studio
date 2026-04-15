import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    num: '01',
    name: 'Web Development',
    desc: 'Aplicaciones web de producción con React, Next.js y arquitecturas headless. Desde MVPs hasta plataformas escalables.',
    tags: ['React', 'Next.js', 'Supabase', 'TypeScript'],
    href: 'mailto:contact@rbt-studio.com?subject=Web Development',
  },
  {
    num: '02',
    name: 'AI & Automatización',
    desc: 'Agentes autónomos, pipelines LLM y flujos de automatización con n8n.',
    tags: ['LLMs', 'MCP', 'n8n', 'Python'],
    href: 'mailto:contact@rbt-studio.com?subject=AI Automation',
  },
  {
    num: '03',
    name: '3D & Creativo',
    desc: 'Experiencias web inmersivas con Three.js, WebGL y React Three Fiber.',
    tags: ['Three.js', 'WebGL', 'GSAP', 'R3F'],
    href: 'mailto:contact@rbt-studio.com?subject=3D Creative',
  },
  {
    num: '04',
    name: 'Hardware & IoT',
    desc: 'Prototipos físico-digitales: sensores, actuadores y comunicación serial.',
    tags: ['Arduino', 'Sensors', 'Serial', 'IoT'],
    href: 'mailto:contact@rbt-studio.com?subject=Hardware Prototype',
  },
  {
    num: '05',
    name: 'Consultoría',
    desc: 'Auditorías de arquitectura, revisión de código y roadmap técnico.',
    tags: ['Architecture', 'AWS', 'Code Review'],
    href: 'mailto:contact@rbt-studio.com?subject=Technical Consulting',
  },
  {
    num: '06',
    name: 'Instalaciones',
    desc: 'Arte computacional e instalaciones para espacios culturales.',
    tags: ['Generative', 'Interactive', 'Creative'],
    href: 'mailto:contact@rbt-studio.com?subject=Interactive Installation',
  },
]

function ServiceItem({ service, index }) {
  const itemRef = useRef(null)
  const numRef = useRef(null)
  const titleRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const item = itemRef.current
    
    // Hover animation - magnetic effect
    const handleMouseMove = (e) => {
      const rect = item.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      
      gsap.to(titleRef.current, {
        x: x * 0.15,
        y: y * 0.1,
        duration: 0.4,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(titleRef.current, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)'
      })
    }

    item.addEventListener('mousemove', handleMouseMove)
    item.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      item.removeEventListener('mousemove', handleMouseMove)
      item.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Line draw animation on mount
  useEffect(() => {
    gsap.fromTo(lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: 'power2.inOut', delay: index * 0.1 }
    )
  }, [index])

  return (
    <a
      ref={itemRef}
      href={service.href}
      className="group block py-10 md:py-14 border-b border-border/30 last:border-b-0 hover:bg-surface/30 transition-colors duration-300"
    >
      <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12">
        <div className="relative w-8">
          <span ref={numRef} className="font-mono text-[11px] tracking-[0.15em] text-textMuted/40">
            {service.num}
          </span>
          <div 
            ref={lineRef}
            className="absolute -left-2 top-1/2 w-0 h-px bg-accent origin-left"
          />
        </div>
        <div className="flex-1">
          <h3 
            ref={titleRef}
            className="font-display text-2xl md:text-3xl lg:text-4xl text-text group-hover:text-accent transition-colors duration-300 mb-2 md:mb-3 will-change-transform"
          >
            {service.name}
          </h3>
          <p className="font-sans text-sm md:text-base text-textMuted leading-relaxed max-w-2xl mb-4 md:mb-5">
            {service.desc}
          </p>
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag, i) => (
              <span 
                key={tag} 
                className="font-mono text-[10px] tracking-[0.1em] uppercase text-textMuted/60"
                style={{
                  transitionDelay: `${i * 50}ms`
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="hidden md:flex items-center">
          <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-textMuted/40 group-hover:text-accent transition-colors duration-300">
            Consultar →
          </span>
        </div>
      </div>
    </a>
  )
}

export default function Services() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50, skewY: 2 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Staggered item reveal
      gsap.fromTo('.service-item',
        { opacity: 0, x: -50, clipPath: 'inset(0 100% 0 0)' },
        {
          opacity: 1,
          x: 0,
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.services-list',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="min-h-screen bg-bg">
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#1A5D43 1px, transparent 1px), linear-gradient(90deg, #1A5D43 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="relative z-10 px-6 md:px-12 lg:px-16 xl:px-24 py-24 md:py-32 lg:py-40">
        <div ref={titleRef} className="mb-16 md:mb-24 opacity-0">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-accent mb-4 md:mb-6">
            Servicios
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-text leading-[0.9]">
            Lo que creamos
            <br />
            <em className="not-italic text-accent">para ti</em>
          </h2>
        </div>
        
        <div className="services-list max-w-[1200px]">
          {SERVICES.map((service, i) => (
            <div key={service.num} className="service-item">
              <ServiceItem service={service} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
