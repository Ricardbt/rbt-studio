import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function ArtCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    let animationId
    const width = 600
    const height = 400
    canvas.width = width
    canvas.height = height
    
    let time = 0
    
    const draw = () => {
      time += 0.006
      ctx.fillStyle = 'rgba(247, 249, 248, 0.06)'
      ctx.fillRect(0, 0, width, height)

      for (let i = 0; i < 4; i++) {
        ctx.beginPath()
        for (let a = 0; a < Math.PI * 2; a += 0.015) {
          const r = 60 + i * 40 + Math.sin(time * (0.6 + i * 0.25) + a * 3) * 12
          const x = width / 2 + Math.cos(a + time * (0.35 + i * 0.1)) * r
          const y = height / 2 + Math.sin(a * 2 + time * (0.25 - i * 0.08)) * r * 0.5
          a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.strokeStyle = `rgba(26, 93, 67, ${0.15 - i * 0.025})`
        ctx.lineWidth = 0.8
        ctx.stroke()
      }

      const numDots = 12
      for (let d = 0; d < numDots; d++) {
        const a = (d / numDots) * Math.PI * 2 + time
        const r = 85 + Math.sin(time * 1.2 + d) * 18
        const x = width / 2 + Math.cos(a) * r
        const y = height / 2 + Math.sin(a * 1.5) * r * 0.5
        ctx.beginPath()
        ctx.arc(x, y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(26, 93, 67, 0.6)'
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animationId)
  }, [])

  return <canvas ref={canvasRef} className="w-full block" />
}

const ARTISTIC_ITEMS = [
  { label: 'Generativa', title: 'Sistemas de partículas', desc: 'Exploración de patrones naturales mediante código. Árboles fractal, fluidos y autómatas celulares.' },
  { label: 'Hardware', title: 'Arduino & IoT', desc: 'Proyectos que conectan el mundo físico y digital: sensores, actuadores y comunicación serial.' },
  { label: '3D Web', title: 'Three.js & WebGL', desc: 'Shaders personalizados y geometrías procedurales reactivas.' },
  { label: 'Instalaciones', title: 'Arte Computacional', desc: 'Proyecciones, audiovisual y entornos interactivos para espacios culturales.' },
]

function ArtisticItem({ item, index }) {
  const itemRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(itemRef.current,
        { opacity: 0, x: 50, clipPath: 'inset(0 100% 0 0)' },
        {
          opacity: 1,
          x: 0,
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: itemRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, itemRef)

    return () => ctx.revert()
  }, [])

  return (
    <div 
      ref={itemRef}
      className="py-10 md:py-12 border-b border-border/30 last:border-b-0 cursor-pointer group opacity-0"
    >
      <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-accent/60 mb-3">
        {item.label}
      </div>
      <div 
        ref={contentRef}
        className="font-display text-xl md:text-2xl lg:text-3xl text-text mb-3 group-hover:text-accent transition-colors duration-300"
      >
        {item.title}
      </div>
      <div className="font-sans text-sm md:text-base text-textMuted leading-relaxed">
        {item.desc}
      </div>
    </div>
  )
}

export default function Artistic() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current.children,
        { opacity: 0, y: 30, skewY: 2 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Text and canvas
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Canvas reveal
      gsap.fromTo(canvasRef.current,
        { opacity: 0, scale: 0.95, clipPath: 'inset(20% 20% 20% 20%)' },
        {
          opacity: 1,
          scale: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: canvasRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="artistic" className="bg-bg">
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#1A5D43 1px, transparent 1px), linear-gradient(90deg, #1A5D43 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="relative z-10 px-6 md:px-12 lg:px-16 xl:px-24 py-24 md:py-32 lg:py-40">
        <div ref={titleRef} className="mb-16 md:mb-20">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-accent mb-4 md:mb-6 opacity-0">
            Arte & Código
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-text leading-[0.9] opacity-0">
            Donde el código
            <br />
            <em className="not-italic text-accent">se vuelve imagen</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start max-w-[1400px]">
          <div ref={textRef} className="lg:sticky lg:top-32 opacity-0">
            <p className="font-sans text-base md:text-lg text-textMuted mb-10 leading-relaxed">
              La formación en <span className="text-text font-medium">Bellas Artes</span> nunca ha estado separada de la práctica técnica. 
              El código generativo y las instalaciones interactivas son extensiones naturales de ese lenguaje visual.
            </p>
            <div ref={canvasRef} className="relative overflow-hidden opacity-0">
              <ArtCanvas />
              <span className="absolute bottom-3 left-4 font-mono text-[10px] tracking-[0.12em] uppercase text-textMuted/40">
                Generative · Live Canvas
              </span>
            </div>
          </div>
          
          <div className="space-y-0">
            {ARTISTIC_ITEMS.map((item, i) => (
              <ArtisticItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
