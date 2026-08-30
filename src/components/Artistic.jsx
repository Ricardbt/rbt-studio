import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { appear } from '../lib/motion'
import { PassOpen } from './Press'

gsap.registerPlugin(ScrollTrigger)

// Las cuatro tintas del taller, como funciones de opacidad.
const PLATE_INKS = [
  (a) => `rgba(0, 121, 171, ${a})`,
  (a) => `rgba(214, 0, 111, ${a})`,
  (a) => `rgba(200, 164, 0, ${a})`,
  (a) => `rgba(20, 21, 15, ${a})`,
]

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
      ctx.fillStyle = 'rgba(250, 248, 243, 0.07)'
      ctx.fillRect(0, 0, width, height)

      for (let i = 0; i < 4; i++) {
        ctx.beginPath()
        for (let a = 0; a < Math.PI * 2; a += 0.015) {
          const r = 60 + i * 40 + Math.sin(time * (0.6 + i * 0.25) + a * 3) * 12
          const x = width / 2 + Math.cos(a + time * (0.35 + i * 0.1)) * r
          const y = height / 2 + Math.sin(a * 2 + time * (0.25 - i * 0.08)) * r * 0.5
          a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        // Cada anillo sale de una plancha distinta: la pieza se
        // compone en cuatro pasadas, como la tirada del sitio.
        ctx.strokeStyle = PLATE_INKS[i % PLATE_INKS.length](0.5 - i * 0.09)
        ctx.lineWidth = 0.9
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
        ctx.fillStyle = PLATE_INKS[d % PLATE_INKS.length](0.85)
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
  { label: 'Código generativo', title: 'Sistemas y patrones vivos', desc: 'Exploración de fenómenos naturales mediante algoritmos: atractores, filotaxis, campos de flujo y autómatas celulares.' },
  { label: 'Movimiento e interacción', title: 'Animación con propósito', desc: 'Microinteracciones, transiciones y respuesta que refuerzan la narrativa del producto. GSAP, Framer Motion y WebGL.' },
  { label: 'Creative Technology', title: 'Instalaciones interactivas', desc: 'Entornos audiovisuales y proyecciones para espacios culturales. Donde la tecnología desaparece y queda la experiencia.' },
  { label: 'Bellas Artes', title: 'Base conceptual y visual', desc: 'Bellas Artes en la Universidad de Barcelona. La sensibilidad estética y el pensamiento crítico que informa cada decisión técnica.' },
]

function ArtisticItem({ item, index }) {
  const itemRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      appear(itemRef.current,
        { opacity: 0, x: 24, clipPath: 'inset(0 100% 0 0)' },
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
      className="py-10 md:py-12 group opacity-0"
      style={{ borderTop: 'var(--hairline-p)' }}
    >
      <div className="t-label mb-3" style={{ color: 'var(--ink-cyan-t)' }}>
        {item.label}
      </div>
      <div
        ref={contentRef}
        className="text-xl md:text-2xl lg:text-3xl mb-3 group-hover:transition-colors group-hover:duration-300 font-semibold"
        style={{ color: 'var(--on-press)' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink-magenta)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--on-press)')}
      >
        {item.title}
      </div>
      <div className="t-small" style={{ color: 'var(--on-press-mid)', maxWidth: '52ch' }}>
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
      appear(titleRef.current.children,
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
      appear(textRef.current,
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
      appear(canvasRef.current,
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
    <section ref={sectionRef} id="artistic" className="relative overflow-x-hidden pb-20 md:pb-28">

      <div className="relative z-10 mx-auto w-full px-6 md:px-12 lg:px-16" style={{ maxWidth: '1400px' }}>
        <div ref={titleRef}>
          <PassOpen
            pass={4}
            ink="var(--ink-violet-t)"
            title="Donde la técnica genera experiencia"
            sub="La formación en Bellas Artes no es un antecedente del trabajo técnico: es parte de él."
          />
        </div>

        <div className="mt-12 grid grid-cols-1 items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <div ref={textRef} className="opacity-0 lg:sticky lg:top-32">
            <p className="t-body mb-8" style={{ color: 'var(--on-press-mid)', maxWidth: '48ch' }}>
              El código generativo, el movimiento y las instalaciones son el mismo lenguaje
              visual con otras herramientas.
            </p>
            <div
              ref={canvasRef}
              className="relative overflow-hidden opacity-0"
              style={{ border: 'var(--hairline-p)', background: 'var(--sheet)' }}
            >
              <ArtCanvas />
              <span className="t-label absolute bottom-3 left-4" style={{ color: 'var(--on-press-low)' }}>
                Pieza viva · cuatro planchas
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
