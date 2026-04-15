import { useEffect, useState, useRef } from 'react'

function FloatingGeometry() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const shapes = Array.from({ length: 6 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 80 + 40,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.01,
      type: Math.floor(Math.random() * 3),
      opacity: Math.random() * 0.03 + 0.01,
    }))

    let t = 0
    const draw = () => {
      t += 0.003
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      shapes.forEach((shape) => {
        shape.rotation += shape.rotationSpeed
        shape.x += Math.sin(t + shape.y * 0.001) * 0.3
        shape.y += Math.cos(t + shape.x * 0.001) * 0.3

        if (shape.x < -100) shape.x = canvas.width + 100
        if (shape.x > canvas.width + 100) shape.x = -100
        if (shape.y < -100) shape.y = canvas.height + 100
        if (shape.y > canvas.height + 100) shape.y = -100

        ctx.save()
        ctx.translate(shape.x, shape.y)
        ctx.rotate(shape.rotation)
        ctx.strokeStyle = `rgba(26, 93, 67, ${shape.opacity})`
        ctx.lineWidth = 1

        if (shape.type === 0) {
          ctx.beginPath()
          ctx.rect(-shape.size / 2, -shape.size / 2, shape.size, shape.size)
          ctx.stroke()
        } else if (shape.type === 1) {
          ctx.beginPath()
          ctx.moveTo(0, -shape.size / 2)
          ctx.lineTo(shape.size / 2, shape.size / 2)
          ctx.lineTo(-shape.size / 2, shape.size / 2)
          ctx.closePath()
          ctx.stroke()
        } else {
          ctx.beginPath()
          ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2)
          ctx.stroke()
        }
        ctx.restore()
      })

      animationId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-bg">
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#1A5D43 1px, transparent 1px), linear-gradient(90deg, #1A5D43 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Floating Geometry */}
      <FloatingGeometry />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg/50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/30 via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 xl:px-24">
        <div className={`max-w-[900px] transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-accent mb-6 md:mb-8">
            Digital Studio · Barcelona
          </p>
          
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-semibold text-text leading-[0.85] tracking-tight mb-6 md:mb-8">
            RBT
            <br />
            <em className="not-italic text-accent">Studio</em>
          </h1>
          
          <p className="font-sans text-base md:text-lg text-textMuted max-w-lg mb-10 md:mb-12 leading-relaxed">
            Ingeniería de precisión y sensibilidad artística. 
            Desarrollo web, automatización IA, código generativo y electrónica física.
          </p>
          
          <div className="flex flex-wrap gap-4 md:gap-6">
            <a 
              href="#services" 
              className="inline-block font-mono text-[11px] tracking-[0.15em] uppercase px-8 md:px-10 py-4 bg-accent text-white hover:bg-accentLight transition-colors duration-300"
            >
              Servicios
            </a>
            <a 
              href="#contact" 
              className="inline-block font-mono text-[11px] tracking-[0.15em] uppercase px-8 md:px-10 py-4 bg-transparent text-text border border-text/30 hover:border-accent hover:text-accent transition-all duration-300"
            >
              Contactar
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-8 left-6 md:left-12 lg:left-16 flex items-center gap-6">
        <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-textMuted/50">
          Barcelona · ES · 2025
        </span>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-6 md:right-12 lg:right-16 flex flex-col items-center gap-2">
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-textMuted/40">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-accent/60 to-transparent" />
      </div>
    </section>
  )
}
