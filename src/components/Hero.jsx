import { useRef, useEffect, useState } from 'react'

function Robot() {
  const [blink, setBlink] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true)
      setTimeout(() => setBlink(false), 150)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <svg viewBox="0 0 120 160" className="w-32 h-40 md:w-40 md:h-48">
      <g stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        {/* Head */}
        <rect x="30" y="20" width="60" height="50" rx="4" />
        {/* Antenna */}
        <line x1="60" y1="20" x2="60" y2="8" />
        <circle cx="60" cy="6" r="2" className="fill-current text-accent" />
        {/* Eyes */}
        <circle cx="45" cy="40" r="4" className={`${blink ? 'fill-accent' : 'stroke-accent'}`} />
        <circle cx="75" cy="40" r="4" className={`${blink ? 'fill-accent' : 'stroke-accent'}`} />
        {/* Mouth */}
        <line x1="45" y1="55" x2="75" y2="55" />
        {/* Neck */}
        <line x1="60" y1="70" x2="60" y2="80" />
        {/* Body */}
        <rect x="35" y="80" width="50" height="45" rx="3" />
        {/* Screen on body */}
        <line x1="45" y1="92" x2="75" y2="92" />
        <line x1="45" y1="100" x2="75" y2="100" />
        <line x1="45" y1="108" x2="65" y2="108" />
        {/* Arms */}
        <path d="M35 90 L20 100 L20 110" className="animate-pulse" />
        <path d="M85 90 L100 100 L100 110" className="animate-pulse" />
        {/* Legs */}
        <line x1="45" y1="125" x2="45" y2="145" />
        <line x1="75" y1="125" x2="75" y2="145" />
        {/* Feet */}
        <line x1="38" y1="145" x2="52" y2="145" />
        <line x1="68" y1="145" x2="82" y2="145" />
      </g>
    </svg>
  )
}

function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []
    let width, height

    const resize = () => {
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }

    const initParticles = () => {
      particles = []
      for (let i = 0; i < 60; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.5 + 0.1,
        })
      }
    }

    resize()
    initParticles()
    window.addEventListener('resize', () => {
      resize()
      initParticles()
    })

    let time = 0
    const draw = () => {
      time += 0.004
      ctx.clearRect(0, 0, width, height)

      // Grid
      ctx.strokeStyle = 'rgba(107, 123, 110, 0.15)'
      ctx.lineWidth = 0.5
      const step = 50
      for (let x = 0; x < width; x += step) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Particles
      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(46, 125, 90, ${p.alpha})`
        ctx.fill()

        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(46, 125, 90, ${(1 - dist / 100) * 0.08})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      // Central rings
      const cx = width * 0.5
      const cy = height * 0.5
      ;[60, 100, 150].forEach((r, i) => {
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(46, 125, 90, ${0.04 - i * 0.01})`
        ctx.lineWidth = 1
        ctx.setLineDash([3, 15])
        ctx.lineDashOffset = time * (i % 2 === 0 ? 40 : -30)
        ctx.stroke()
        ctx.setLineDash([])
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
      className="absolute inset-0 w-full h-full opacity-60"
    />
  )
}

export default function Hero() {
  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative overflow-hidden">
      {/* Left */}
      <div className="flex flex-col justify-end px-6 md:px-12 pb-16 pt-32 lg:pt-0 lg:pb-0 relative z-10">
        <div className="font-mono text-xs tracking-widest uppercase text-accent mb-6 animate-[slide-up_0.6s_ease-out_both]">
          Developer & Creative Technologist · Barcelona
        </div>
        
        <h1 className="font-sans text-5xl md:text-6xl lg:text-7xl font-semibold text-text leading-[0.9] mb-6 animate-[slide-up_0.7s_ease-out_0.1s_both]">
          <span className="text-accent">RBT</span>
          <br />
          Studio
        </h1>
        
        <p className="font-mono text-sm md:text-base text-textMuted max-w-sm mb-8 leading-relaxed animate-[slide-up_0.8s_ease-out_0.2s_both]">
          Construyo productos digitales donde la <span className="text-text">ingeniería</span> y la <span className="text-text">sensibilidad artística</span> coexisten. IA, web, código generativo y electrónica física.
        </p>
        
        <div className="flex gap-4 animate-[slide-up_0.9s_ease-out_0.3s_both]">
          <a 
            href="#services" 
            className="font-mono text-xs tracking-widest uppercase px-6 py-3 bg-accent text-white hover:bg-accentLight transition-colors"
          >
            Ver servicios
          </a>
          <a 
            href="#contact" 
            className="font-mono text-xs tracking-widest uppercase px-6 py-3 border border-border text-text hover:border-accent transition-colors"
          >
            Contactar
          </a>
        </div>
      </div>

      {/* Right - Canvas + Robot */}
      <div className="relative hidden lg:flex items-center justify-center overflow-hidden">
        <ParticleCanvas />
        <div className="absolute inset-0 bg-gradient-to-l from-bg/0 to-bg/60 pointer-events-none" />
        <div className="relative z-10 animate-pulse">
          <Robot />
        </div>
        <div className="absolute bottom-8 right-10 text-right">
          <div className="font-mono text-[10px] tracking-widest uppercase text-textMuted">
            Barcelona · ES · 2025
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] tracking-widest uppercase text-textMuted vertical-rl">
            scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-accent to-transparent animate-pulse" />
        </div>
      </div>

      {/* Mobile scroll indicator */}
      <div className="lg:hidden flex flex-col items-center gap-2 pb-8">
        <span className="font-mono text-[10px] tracking-widest uppercase text-textMuted">
          scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-accent to-transparent animate-pulse" />
      </div>
    </section>
  )
}