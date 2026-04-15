import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  { num: '01', name: 'StoryPrint AI', desc: 'SaaS de cuentos ilustrados personalizados con generación LLM.', tech: 'Next.js · Supabase · LLMs' },
  { num: '02', name: 'Brandboard AI', desc: 'Plataforma de identidad de marca con pipeline multi-agente.', tech: 'React · Supabase · AI' },
  { num: '03', name: 'NutrAI', desc: 'Formulador de suplementos personalizado con parsing JSON.', tech: 'React · Anthropic · TS' },
  { num: '04', name: 'GeoRoutes', desc: 'Tema WordPress con Leaflet maps y soporte GPX.', tech: 'WordPress · Leaflet' },
  { num: '05', name: 'Portfolio 3D', desc: 'Tema WordPress con integración Three.js y WebGL.', tech: 'Three.js · WebGL' },
  { num: '06', name: 'Processing Sketches', desc: 'Animaciones generativas y arte algorítmico.', tech: 'Processing · Java' },
]

function ProjectRow({ project, index }) {
  const rowRef = useRef(null)
  const nameRef = useRef(null)
  const underlineRef = useRef(null)

  useEffect(() => {
    const row = rowRef.current

    const handleMouseEnter = () => {
      gsap.to(underlineRef.current, {
        scaleX: 1,
        duration: 0.4,
        ease: 'power2.out'
      })
      gsap.to(nameRef.current, {
        color: 'var(--accent)',
        x: 8,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(underlineRef.current, {
        scaleX: 0,
        duration: 0.4,
        ease: 'power2.inOut'
      })
      gsap.to(nameRef.current, {
        color: '',
        x: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      })
    }

    row.addEventListener('mouseenter', handleMouseEnter)
    row.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      row.removeEventListener('mouseenter', handleMouseEnter)
      row.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div 
      ref={rowRef}
      className="group py-10 md:py-14 border-b border-border/30 last:border-b-0 hover:bg-surface/20 transition-colors duration-300 cursor-pointer"
    >
      <div className="grid grid-cols-1 md:grid-cols-[80px_1fr_1fr_120px] gap-4 md:gap-8 items-baseline relative">
        {/* Animated underline */}
        <div 
          ref={underlineRef}
          className="absolute inset-x-0 bottom-0 h-px bg-accent origin-left scale-x-0"
        />
        
        <span className="font-mono text-[11px] tracking-[0.1em] text-textMuted/40">
          {project.num}
        </span>
        <div className="font-display text-xl md:text-2xl lg:text-3xl text-text will-change-transform">
          <span ref={nameRef} className="inline-block">{project.name}</span>
        </div>
        <div className="font-sans text-sm md:text-base text-textMuted md:max-w-md">
          {project.desc}
        </div>
        <div className="font-mono text-[10px] md:text-[11px] tracking-[0.08em] text-textMuted/50 text-left md:text-right hidden md:block">
          {project.tech}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title typewriter-style reveal
      const titleChars = titleRef.current.querySelectorAll('.title-char')
      gsap.fromTo(titleChars,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Project rows reveal
      gsap.fromTo('.project-row',
        { opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' },
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.projects-list',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="work" className="bg-surface/30">
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#1A5D43 1px, transparent 1px), linear-gradient(90deg, #1A5D43 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="relative z-10 px-6 md:px-12 lg:px-16 xl:px-24 py-24 md:py-32 lg:py-40">
        <div ref={titleRef} className="mb-16 md:mb-24">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-accent mb-4 md:mb-6">
            Proyectos
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-text leading-[0.9]">
            {'Trabajo'.split('').map((char, i) => (
              <span key={i} className="title-char inline-block opacity-0">{char}</span>
            ))}
            <br />
            <em className="not-italic text-accent">
              {'seleccionado'.split('').map((char, i) => (
                <span key={i} className="title-char inline-block opacity-0">{char}</span>
              ))}
            </em>
          </h2>
        </div>
        
        <div className="projects-list max-w-[1400px]">
          {PROJECTS.map((project, i) => (
            <div key={project.num} className="project-row opacity-0">
              <ProjectRow project={project} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
