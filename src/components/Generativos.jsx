import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PassOpen } from './Press'

gsap.registerPlugin(ScrollTrigger)

function LorenzCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const width = 600
    const height = 500
    canvas.width = width
    canvas.height = height

    const sigma = 10
    const rho = 28
    const beta = 8 / 3
    const dt = 0.01
    const MAX_FRAMES = 600

    let x, y, z, frame, animationId

    const reset = () => {
      x = 0.1; y = 1; z = 1.05; frame = 0
      ctx.fillStyle = '#FAF8F3'
      ctx.fillRect(0, 0, width, height)
      ctx.strokeStyle = 'rgba(0, 121, 171, 0.6)'
      ctx.lineWidth = 0.5
    }

    const draw = () => {
      if (frame >= MAX_FRAMES) {
        reset()
      }
      frame++

      for (let step = 0; step < 50; step++) {
        const dx = sigma * (y - x)
        const dy = x * (rho - z) - y
        const dz = x * y - beta * z

        x += dx * dt
        y += dy * dt
        z += dz * dt

        const screenX = width / 2 + x * 4
        const screenY = height / 2 + y * 4

        if (step === 0) {
          ctx.beginPath()
          ctx.moveTo(screenX, screenY)
        } else {
          ctx.lineTo(screenX, screenY)
        }
      }

      ctx.stroke()
      animationId = requestAnimationFrame(draw)
    }

    reset()
    draw()
    return () => cancelAnimationFrame(animationId)
  }, [])

  return <canvas ref={canvasRef} className="w-full block" />
}

function PhyllotaxisCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const width = 600
    const height = 500
    canvas.width = width
    canvas.height = height

    const centerX = width / 2
    const centerY = height / 2
    const goldenAngle = 137.5 * (Math.PI / 180)

    let mouseX = centerX
    let mouseY = centerY

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    canvas.addEventListener('mousemove', handleMouseMove)

    ctx.fillStyle = '#FAF8F3'
    ctx.fillRect(0, 0, width, height)

    let n = 0
    let animationId
    const MAX_N = 500

    const reset = () => {
      n = 0
      ctx.fillStyle = '#FAF8F3'
      ctx.fillRect(0, 0, width, height)
    }

    const draw = () => {
      n += 1
      const distToMouse = Math.hypot(mouseX - centerX, mouseY - centerY)

      const r = 3 * Math.sqrt(n)
      const theta = n * goldenAngle

      const x = centerX + r * Math.cos(theta)
      const y = centerY + r * Math.sin(theta)

      ctx.fillStyle = `rgba(214, 0, 111, ${0.3 + (distToMouse / 300)})`
      ctx.beginPath()
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fill()

      if (n < MAX_N) {
        animationId = requestAnimationFrame(draw)
      } else {
        animationId = setTimeout(() => {
          reset()
          animationId = requestAnimationFrame(draw)
        }, 1200)
      }
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      clearTimeout(animationId)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full block cursor-crosshair" />
}

function ParticlesCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const width = 600
    const height = 500
    canvas.width = width
    canvas.height = height

    const particles = []
    const particleCount = 80

    class Particle {
      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = (Math.random() - 0.5) * 3
        this.vy = (Math.random() - 0.5) * 3
        this.size = Math.random() * 2 + 1
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0 || this.x > width) this.vx *= -1
        if (this.y < 0 || this.y > height) this.vy *= -1

        this.x = Math.max(0, Math.min(width, this.x))
        this.y = Math.max(0, Math.min(height, this.y))
      }

      draw(ctx) {
        ctx.fillStyle = `rgba(200, 164, 0, ${0.4 + Math.sin(Date.now() / 1000) * 0.3})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    let animationId

    const draw = () => {
      ctx.fillStyle = 'rgba(250, 248, 243, 0.1)'
      ctx.fillRect(0, 0, width, height)

      particles.forEach((p) => {
        p.update()
        p.draw(ctx)
      })

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 100) {
            ctx.strokeStyle = `rgba(200, 164, 0, ${0.1 * (1 - dist / 100)})`
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animationId)
  }, [])

  return <canvas ref={canvasRef} className="w-full block" />
}

function FractalTreeCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const width = 600
    const height = 500
    canvas.width = width
    canvas.height = height

    ctx.fillStyle = '#FAF8F3'
    ctx.fillRect(0, 0, width, height)

    let time = 0
    let animationId

    const drawBranch = (x, y, angle, length, depth, t) => {
      if (depth === 0) return

      const endX = x + Math.cos(angle) * length
      const endY = y + Math.sin(angle) * length

      ctx.strokeStyle = `rgba(20, 21, 15, ${0.3 + depth * 0.1})`
      ctx.lineWidth = depth * 0.8
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(endX, endY)
      ctx.stroke()

      const angle1 = angle - 0.5 + Math.sin(t * 0.003) * 0.3
      const angle2 = angle + 0.5 + Math.sin(t * 0.003 + 1) * 0.3

      drawBranch(endX, endY, angle1, length * 0.75, depth - 1, t)
      drawBranch(endX, endY, angle2, length * 0.75, depth - 1, t)
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(250, 248, 243, 0.05)'
      ctx.fillRect(0, 0, width, height)

      time += 1
      drawBranch(width / 2, height, -Math.PI / 2, 40, 8, time)

      animationId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animationId)
  }, [])

  return <canvas ref={canvasRef} className="w-full block" />
}

function FlowFieldCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const width = 600
    const height = 500
    canvas.width = width
    canvas.height = height

    const particles = []
    const particleCount = 150

    class FlowParticle {
      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = 0
        this.vy = 0
        this.speed = 2
        this.size = 1.5
      }

      update(t) {
        const angle = Math.sin(this.x * 0.01 + t * 0.01) * Math.cos(this.y * 0.01 + t * 0.01) * Math.PI * 2
        this.vx = Math.cos(angle) * this.speed
        this.vy = Math.sin(angle) * this.speed

        this.x += this.vx
        this.y += this.vy

        if (this.x < 0) this.x = width
        if (this.x > width) this.x = 0
        if (this.y < 0) this.y = height
        if (this.y > height) this.y = 0
      }

      draw(ctx) {
        ctx.fillStyle = 'rgba(0, 121, 171, 0.5)'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new FlowParticle())
    }

    let time = 0
    let animationId

    const draw = () => {
      ctx.fillStyle = 'rgba(250, 248, 243, 0.15)'
      ctx.fillRect(0, 0, width, height)

      time += 1
      particles.forEach((p) => {
        p.update(time)
        p.draw(ctx)
      })

      animationId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animationId)
  }, [])

  return <canvas ref={canvasRef} className="w-full block" />
}

function LemniscataCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const width = 600
    const height = 500
    canvas.width = width
    canvas.height = height

    ctx.fillStyle = '#FAF8F3'
    ctx.fillRect(0, 0, width, height)

    let a = 150
    let increasing = false
    let animationId

    const draw = () => {
      ctx.fillStyle = 'rgba(250, 248, 243, 0.2)'
      ctx.fillRect(0, 0, width, height)

      ctx.save()
      ctx.translate(width / 2, height / 2)

      for (let theta = 0; theta < Math.PI * 2; theta += 0.01) {
        let r = Math.sqrt(a * a * Math.cos(2 * theta))

        if (isNaN(r)) continue

        const x = r * Math.cos(theta)
        const y = r * Math.sin(theta)

        ctx.fillStyle = `rgba(214, 0, 111, ${0.2 + (theta / (Math.PI * 2)) * 0.5})`
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()

      if (a > 200) increasing = false
      if (a < 80) increasing = true

      a += increasing ? 1.5 : -1.5

      animationId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animationId)
  }, [])

  return <canvas ref={canvasRef} className="w-full block" />
}

function SpiralGirosCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const width = 600
    const height = 500
    canvas.width = width
    canvas.height = height

    let angle = 0
    let offsetX = 0
    let offsetY = 0
    let time = 0
    let animationId

    const draw = () => {
      ctx.fillStyle = '#FAF8F3'
      ctx.fillRect(0, 0, width, height)

      ctx.save()
      ctx.translate(width / 2, height / 2)
      ctx.rotate(-angle / 100)

      const distance = 60 + Math.sin(time * 0.02) * 20

      ctx.fillStyle = 'rgba(200, 164, 0, 0.7)'
      const positions = [
        { x: distance, y: 0 },
        { x: -distance, y: 0 },
        { x: 0, y: distance },
        { x: 0, y: -distance },
        { x: distance * 0.7, y: distance * 0.7 },
      ]

      positions.forEach((pos) => {
        ctx.fillRect(pos.x - 20, pos.y - 20, 40, 40)
      })

      ctx.restore()

      time += 1
      angle += 2
      animationId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animationId)
  }, [])

  return <canvas ref={canvasRef} className="w-full block" />
}

function DispersionCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const width = 600
    const height = 500
    canvas.width = width
    canvas.height = height

    ctx.fillStyle = '#FAF8F3'
    ctx.fillRect(0, 0, width, height)

    let n = 0
    let a = 1
    let animationId

    const draw = () => {
      n = Math.random() * 360 + 0.05
      a += 0.05

      const centerX = width / 2
      const centerY = height / 2

      ctx.strokeStyle = `rgba(20, 21, 15, 0.6)`
      ctx.lineWidth = 1.5

      for (let i = 0; i < 100; i++) {
        const angle = (n * Math.PI) / 180
        const x = centerX + Math.cos(angle) * (Math.random() * 30 + 20)
        const y = centerY + Math.sin(angle) * (Math.random() * 30 + 20) * a

        ctx.beginPath()
        ctx.arc(x, y, 1, 0, Math.PI * 2)
        ctx.stroke()
      }

      for (let j = 0; j < 100; j++) {
        const angle = (n * Math.PI) / 180
        const x = centerX + Math.sin(angle) * (Math.random() * 40 + 30)
        const y = centerY + Math.cos(angle) * (Math.random() * 40 + 30) * a

        ctx.beginPath()
        ctx.arc(x, y, 1, 0, Math.PI * 2)
        ctx.stroke()
      }

      if (a > 50) a = 1
      animationId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animationId)
  }, [])

  return <canvas ref={canvasRef} className="w-full block" />
}

function CollisionCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const width = 600
    const height = 500
    canvas.width = width
    canvas.height = height

    const c1 = { x: 150, y: height / 2, r: 20, vx: 2 }
    const c2 = { x: width - 150, y: height / 2, r: 20, vy: 0 }

    let animationId

    const circleCollision = (a, b) => {
      const dx = a.x - b.x
      const dy = a.y - b.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      return dist <= a.r + b.r
    }

    const draw = () => {
      ctx.fillStyle = '#FAF8F3'
      ctx.fillRect(0, 0, width, height)

      c1.x += c1.vx
      c2.y -= (canvas.offsetHeight ? 0 : 0) + Math.sin(Date.now() * 0.003) * 2

      const hit = circleCollision(c1, c2)

      if (hit) {
        ctx.fillStyle = 'rgba(200, 164, 0, 0.8)'
        c1.vx = c1.vx > 0 ? -2 : 2
      } else {
        ctx.fillStyle = 'rgba(0, 121, 171, 0.6)'
      }

      ctx.beginPath()
      ctx.arc(c1.x, c1.y, c1.r, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = 'rgba(0, 121, 171, 0.3)'
      ctx.beginPath()
      ctx.arc(c2.x, c2.y, c2.r, 0, Math.PI * 2)
      ctx.fill()

      if (hit) {
        ctx.strokeStyle = 'rgba(200, 164, 0, 0.5)'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(c1.x, c1.y, c1.r * 2, 0, Math.PI * 2)
        ctx.stroke()
      }

      if (c1.x > width + 50) {
        c1.x = -50
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animationId)
  }, [])

  return <canvas ref={canvasRef} className="w-full block" />
}

function BezierCurvesCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const width = 600
    const height = 500
    canvas.width = width
    canvas.height = height

    let time = 0
    let animationId

    const draw = () => {
      ctx.fillStyle = 'rgba(250, 248, 243, 0.1)'
      ctx.fillRect(0, 0, width, height)

      time += 0.01

      ctx.strokeStyle = 'rgba(214, 0, 111, 0.5)'
      ctx.lineWidth = 2
      ctx.fillStyle = 'none'

      for (let i = 0; i < 5; i++) {
        const y = 100 + i * 80

        const p1x = 50
        const p1y = y + Math.sin(time + i) * 30

        const p2x = 200
        const p2y = y - Math.cos(time + i + 1) * 30

        const p3x = 400
        const p3y = y + Math.sin(time + i + 2) * 30

        const p4x = 550
        const p4y = y - Math.cos(time + i + 3) * 30

        ctx.beginPath()
        ctx.moveTo(p1x, p1y)
        ctx.bezierCurveTo(p2x, p2y, p3x, p3y, p4x, p4y)
        ctx.stroke()

        ctx.fillStyle = 'rgba(214, 0, 111, 0.4)'
        ctx.beginPath()
        ctx.arc(p1x, p1y, 4, 0, Math.PI * 2)
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animationId)
  }, [])

  return <canvas ref={canvasRef} className="w-full block" />
}

// Nueve piezas, una plancha cada una. La ficha va debajo del
// lienzo, como el pie de una prueba: primero se ve, luego se lee.
const PIECES = [
  { ink: 'var(--ink-cyan)', tint: 'var(--ink-cyan-t)',    name: 'Atractor de Lorenz',   note: 'Sistema caótico y determinista. Movimiento impredecible con un patrón debajo.', Canvas: LorenzCanvas },
  { ink: 'var(--ink-magenta)', tint: 'var(--ink-magenta-t)', name: 'Filotaxis',            note: 'El patrón del ángulo áureo. Mueve el cursor para alterar el crecimiento.', Canvas: PhyllotaxisCanvas },
  { ink: 'var(--ink-yellow)', tint: 'var(--ink-yellow-t)',  name: 'Sistema de partículas', note: 'Partículas que rebotan y se conectan. Generador de patrones emergentes.', Canvas: ParticlesCanvas },
  { ink: 'var(--ink-key)', tint: 'var(--ink-key)',    name: 'Árbol fractal',        note: 'Crecimiento recursivo de ramas que oscilan con el viento.', Canvas: FractalTreeCanvas },
  { ink: 'var(--ink-cyan)', tint: 'var(--ink-cyan-t)',    name: 'Campo de flujo',       note: 'Ruido Perlin como campo vectorial. Las partículas siguen la corriente.', Canvas: FlowFieldCanvas },
  { ink: 'var(--ink-magenta)', tint: 'var(--ink-magenta-t)', name: 'Lemniscata',           note: 'La curva del infinito, respirando en oscilación lenta.', Canvas: LemniscataCanvas },
  { ink: 'var(--ink-yellow)', tint: 'var(--ink-yellow-t)',  name: 'Dispersión radial',    note: 'Transformaciones radiales con ruido. Expansión controlada.', Canvas: DispersionCanvas },
  { ink: 'var(--ink-key)', tint: 'var(--ink-key)',    name: 'Espiral de giros',     note: 'Rectángulos en rotación. Geometría que crece girando.', Canvas: SpiralGirosCanvas },
  { ink: 'var(--ink-magenta)', tint: 'var(--ink-magenta-t)', name: 'Colisiones',           note: 'Cuerpos que chocan y reparten energía. Física simple, resultado vivo.', Canvas: CollisionCanvas },
  { ink: 'var(--ink-cyan)', tint: 'var(--ink-cyan-t)',    name: 'Curvas de Bézier',     note: 'Curvas suaves y elásticas con puntos de control oscilantes.', Canvas: BezierCurvesCanvas },
]

export default function Generativos() {
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

      gsap.fromTo('.generativo-item',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.generativos-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="generativos" className="relative pb-20 md:pb-28">
      <div className="mx-auto w-full px-6 md:px-12 lg:px-16" style={{ maxWidth: '1400px' }}>
        <div ref={titleRef} style={{ opacity: 0 }}>
          <PassOpen
            pass={5}
            ink="var(--ink-yellow)"
            title="Diez planchas"
            sub="Sistemas generativos corriendo en vivo, uno por tinta. Ninguno es un vídeo: todos se dibujan mientras miras."
          />
        </div>

        <div className="generativos-grid mt-12">
          {PIECES.map(({ ink, tint, name, note, Canvas }) => (
            <figure key={name} className="generativo-item" style={{ opacity: 0, '--piece-ink': ink }}>
              <div className="generativo-item__plate">
                <Canvas />
              </div>
              <figcaption className="generativo-item__caption">
                <span className="t-label" style={{ color: tint }}>{name}</span>
                <p className="t-small" style={{ color: 'var(--on-press-mid)' }}>{note}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <style>{`
        .generativos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
        }

        .generativo-item {
          display: flex;
          flex-direction: column;
          border: var(--hairline-p);
          background: var(--sheet);
          transition: border-color var(--dur-base) var(--ease-snap);
        }
        .generativo-item:hover { border-color: var(--piece-ink); }

        .generativo-item__plate { overflow: hidden; border-bottom: var(--hairline-p); }
        .generativo-item__caption { display: flex; flex-direction: column; gap: 8px; padding: 18px; }
      `}</style>
    </section>
  )
}
