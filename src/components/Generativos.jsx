import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
      ctx.fillStyle = '#F2EFE6'
      ctx.fillRect(0, 0, width, height)
      ctx.strokeStyle = 'rgba(14, 74, 53, 0.6)'
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

    ctx.fillStyle = '#F2EFE6'
    ctx.fillRect(0, 0, width, height)

    let n = 0
    let animationId
    const MAX_N = 500

    const reset = () => {
      n = 0
      ctx.fillStyle = '#F2EFE6'
      ctx.fillRect(0, 0, width, height)
    }

    const draw = () => {
      n += 1
      const distToMouse = Math.hypot(mouseX - centerX, mouseY - centerY)

      const r = 3 * Math.sqrt(n)
      const theta = n * goldenAngle

      const x = centerX + r * Math.cos(theta)
      const y = centerY + r * Math.sin(theta)

      ctx.fillStyle = `rgba(14, 74, 53, ${0.3 + (distToMouse / 300)})`
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
        ctx.fillStyle = `rgba(14, 74, 53, ${0.4 + Math.sin(Date.now() / 1000) * 0.3})`
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
      ctx.fillStyle = 'rgba(242, 239, 230, 0.1)'
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
            ctx.strokeStyle = `rgba(14, 74, 53, ${0.1 * (1 - dist / 100)})`
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

    ctx.fillStyle = '#F2EFE6'
    ctx.fillRect(0, 0, width, height)

    let time = 0
    let animationId

    const drawBranch = (x, y, angle, length, depth, t) => {
      if (depth === 0) return

      const endX = x + Math.cos(angle) * length
      const endY = y + Math.sin(angle) * length

      ctx.strokeStyle = `rgba(14, 74, 53, ${0.3 + depth * 0.1})`
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
      ctx.fillStyle = 'rgba(242, 239, 230, 0.05)'
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
        ctx.fillStyle = 'rgba(14, 74, 53, 0.5)'
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
      ctx.fillStyle = 'rgba(242, 239, 230, 0.15)'
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

    ctx.fillStyle = '#F2EFE6'
    ctx.fillRect(0, 0, width, height)

    let a = 150
    let increasing = false
    let animationId

    const draw = () => {
      ctx.fillStyle = 'rgba(242, 239, 230, 0.2)'
      ctx.fillRect(0, 0, width, height)

      ctx.save()
      ctx.translate(width / 2, height / 2)

      for (let theta = 0; theta < Math.PI * 2; theta += 0.01) {
        let r = Math.sqrt(a * a * Math.cos(2 * theta))

        if (isNaN(r)) continue

        const x = r * Math.cos(theta)
        const y = r * Math.sin(theta)

        ctx.fillStyle = `rgba(14, 74, 53, ${0.2 + (theta / (Math.PI * 2)) * 0.5})`
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
      ctx.fillStyle = '#F2EFE6'
      ctx.fillRect(0, 0, width, height)

      ctx.save()
      ctx.translate(width / 2, height / 2)
      ctx.rotate(-angle / 100)

      const distance = 60 + Math.sin(time * 0.02) * 20

      ctx.fillStyle = 'rgba(14, 74, 53, 0.7)'
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

    ctx.fillStyle = '#F2EFE6'
    ctx.fillRect(0, 0, width, height)

    let n = 0
    let a = 1
    let animationId

    const draw = () => {
      n = Math.random() * 360 + 0.05
      a += 0.05

      const centerX = width / 2
      const centerY = height / 2

      ctx.strokeStyle = `rgba(${Math.min(255, 14 + a * 5)}, ${Math.min(255, 10 + a * 5)}, 100, 0.6)`
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
      ctx.fillStyle = '#F2EFE6'
      ctx.fillRect(0, 0, width, height)

      c1.x += c1.vx
      c2.y -= (canvas.offsetHeight ? 0 : 0) + Math.sin(Date.now() * 0.003) * 2

      const hit = circleCollision(c1, c2)

      if (hit) {
        ctx.fillStyle = 'rgba(255, 150, 0, 0.8)'
        c1.vx = c1.vx > 0 ? -2 : 2
      } else {
        ctx.fillStyle = 'rgba(14, 74, 53, 0.6)'
      }

      ctx.beginPath()
      ctx.arc(c1.x, c1.y, c1.r, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = 'rgba(14, 74, 53, 0.3)'
      ctx.beginPath()
      ctx.arc(c2.x, c2.y, c2.r, 0, Math.PI * 2)
      ctx.fill()

      if (hit) {
        ctx.strokeStyle = 'rgba(255, 150, 0, 0.5)'
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
      ctx.fillStyle = 'rgba(242, 239, 230, 0.1)'
      ctx.fillRect(0, 0, width, height)

      time += 0.01

      ctx.strokeStyle = 'rgba(14, 74, 53, 0.5)'
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

        ctx.fillStyle = 'rgba(14, 74, 53, 0.4)'
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
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24" style={{ backgroundColor: '#F2EFE6' }}>
      <div className="relative z-10 w-full mx-auto px-4 sm:px-8 lg:px-16" style={{ maxWidth: '1400px' }}>
        <div ref={titleRef} className="mb-12 md:mb-16 lg:mb-24" style={{ opacity: 0 }}>
          <p className="font-mono text-[12px] tracking-[0.18em] uppercase mb-6" style={{ color: '#0E4A35' }}>
            03 / 05 · Generativos
          </p>
          <h2 className="font-sans text-5xl lg:text-6xl font-semibold leading-[0.95] tracking-tight" style={{ color: '#14140F' }}>
            Sistemas
            <br />
            <em className="not-italic" style={{ color: '#0E4A35' }}>generativos en vivo</em>
          </h2>
        </div>

        <div className="generativos-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px' }}>
          <div className="generativo-item opacity-0" style={{ border: '1px solid #C9C5B6', padding: '24px', backgroundColor: '#FBF9F2' }}>
            <h3 className="font-sans text-xl font-semibold mb-2" style={{ color: '#14140F' }}>Atractor de Lorenz</h3>
            <p className="font-sans text-sm mb-4" style={{ color: '#6E6E64' }}>Sistema caótico y determinista. Movimiento impredecible pero con patrón subyacente.</p>
            <div style={{ border: '1px solid #C9C5B6' }}>
              <LorenzCanvas />
            </div>
          </div>

          <div className="generativo-item opacity-0" style={{ border: '1px solid #C9C5B6', padding: '24px', backgroundColor: '#FBF9F2' }}>
            <h3 className="font-sans text-xl font-semibold mb-2" style={{ color: '#14140F' }}>Phyllotaxis</h3>
            <p className="font-sans text-sm mb-4" style={{ color: '#6E6E64' }}>Patrón natural del ángulo dorado. Mueve el mouse para ver la interacción.</p>
            <div style={{ border: '1px solid #C9C5B6' }}>
              <PhyllotaxisCanvas />
            </div>
          </div>

          <div className="generativo-item opacity-0" style={{ border: '1px solid #C9C5B6', padding: '24px', backgroundColor: '#FBF9F2' }}>
            <h3 className="font-sans text-xl font-semibold mb-2" style={{ color: '#14140F' }}>Sistema de Partículas</h3>
            <p className="font-sans text-sm mb-4" style={{ color: '#6E6E64' }}>Partículas que rebotan y se conectan. Generador de patrones emergentes.</p>
            <div style={{ border: '1px solid #C9C5B6' }}>
              <ParticlesCanvas />
            </div>
          </div>

          <div className="generativo-item opacity-0" style={{ border: '1px solid #C9C5B6', padding: '24px', backgroundColor: '#FBF9F2' }}>
            <h3 className="font-sans text-xl font-semibold mb-2" style={{ color: '#14140F' }}>Árbol Fractal</h3>
            <p className="font-sans text-sm mb-4" style={{ color: '#6E6E64' }}>Crecimiento recursivo de ramas que oscilan. Naturaleza al máximo.</p>
            <div style={{ border: '1px solid #C9C5B6' }}>
              <FractalTreeCanvas />
            </div>
          </div>

          <div className="generativo-item opacity-0" style={{ border: '1px solid #C9C5B6', padding: '24px', backgroundColor: '#FBF9F2' }}>
            <h3 className="font-sans text-xl font-semibold mb-2" style={{ color: '#14140F' }}>Flow Field</h3>
            <p className="font-sans text-sm mb-4" style={{ color: '#6E6E64' }}>Campo de flujo Perlin. Partículas que siguen vectores emergentes.</p>
            <div style={{ border: '1px solid #C9C5B6' }}>
              <FlowFieldCanvas />
            </div>
          </div>

          <div className="generativo-item opacity-0" style={{ border: '1px solid #C9C5B6', padding: '24px', backgroundColor: '#FBF9F2' }}>
            <h3 className="font-sans text-xl font-semibold mb-2" style={{ color: '#14140F' }}>Lemniscata</h3>
            <p className="font-sans text-sm mb-4" style={{ color: '#6E6E64' }}>Curva matemática hermosa. Respira en infinito oscilante.</p>
            <div style={{ border: '1px solid #C9C5B6' }}>
              <LemniscataCanvas />
            </div>
          </div>

          <div className="generativo-item opacity-0" style={{ border: '1px solid #C9C5B6', padding: '24px', backgroundColor: '#FBF9F2' }}>
            <h3 className="font-sans text-xl font-semibold mb-2" style={{ color: '#14140F' }}>Dispersión Radial</h3>
            <p className="font-sans text-sm mb-4" style={{ color: '#6E6E64' }}>Transformaciones radiales con ruido. Expansión controlada.</p>
            <div style={{ border: '1px solid #C9C5B6' }}>
              <DispersionCanvas />
            </div>
          </div>

          <div className="generativo-item opacity-0" style={{ border: '1px solid #C9C5B6', padding: '24px', backgroundColor: '#FBF9F2' }}>
            <h3 className="font-sans text-xl font-semibold mb-2" style={{ color: '#14140F' }}>Espiral de Giros</h3>
            <p className="font-sans text-sm mb-4" style={{ color: '#6E6E64' }}>Rectángulos en rotación. Geometría hipnótica que crece.</p>
            <div style={{ border: '1px solid #C9C5B6' }}>
              <SpiralGirosCanvas />
            </div>
          </div>

          <div className="generativo-item opacity-0" style={{ border: '1px solid #C9C5B6', padding: '24px', backgroundColor: '#FBF9F2' }}>
            <h3 className="font-sans text-xl font-semibold mb-2" style={{ color: '#14140F' }}>Curvas de Bézier</h3>
            <p className="font-sans text-sm mb-4" style={{ color: '#6E6E64' }}>Curves suaves y elásticas. Control de puntos oscilantes.</p>
            <div style={{ border: '1px solid #C9C5B6' }}>
              <BezierCurvesCanvas />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
