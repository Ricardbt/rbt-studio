import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import p5 from 'p5'
import { RegisterMarks, Misreg } from './Press'
import { useRegistration } from '../lib/registration'

/* =========================================================
   PRIMERA PASADA
   La pieza generativa manda y el papel está limpio. Se dibuja
   una vez en una plancha y se imprime tres veces —cian, magenta
   y negro— con las tintas ligeramente desplazadas. Acercar el
   cursor las registra.

   La pieza va escasa a propósito: pocas figuras, tres anillos y
   ninguna malla entre partículas. Sobre papel, cada línea de más
   es suciedad.
   ========================================================= */

const INKS = [
  [0, 121, 171],  // cian cargado
  [214, 0, 111],  // magenta cargado
  [20, 21, 15],   // la plancha de negro
]

function PressCanvas() {
  const containerRef = useRef(null)

  useEffect(() => {
    const sketch = (p) => {
      let plate = null
      let particles = []
      const particleCount = 26
      let mouseX = -9999
      let mouseY = -9999
      let targetX = -9999
      let targetY = -9999
      let reg = 1        // 1 = separaciones abiertas, 0 = registrado
      const alignRadius = 520

      class Particle {
        constructor() { this.reset() }

        reset() {
          this.x = p.random(p.width)
          this.y = p.random(p.height)
          this.vx = p.random(-0.4, 0.4)
          this.vy = p.random(-0.4, 0.4)
          this.size = p.random(4, 11)
          this.type = p.floor(p.random(4))
          this.angle = p.random(p.TWO_PI)
          this.angleSpeed = p.random(-0.02, 0.02)
        }

        update() {
          if (targetX > 0) {
            const dx = this.x - targetX
            const dy = this.y - targetY
            const dist = p.sqrt(dx * dx + dy * dy) || 1
            if (dist < 200) {
              const force = ((200 - dist) / 200) * 0.8
              this.vx += (dx / dist) * force
              this.vy += (dy / dist) * force
            }
          }

          this.vx *= 0.99
          this.vy *= 0.99
          this.x += this.vx
          this.y += this.vy
          this.angle += this.angleSpeed

          if (this.x < -50) this.x = p.width + 50
          if (this.x > p.width + 50) this.x = -50
          if (this.y < -50) this.y = p.height + 50
          if (this.y > p.height + 50) this.y = -50
        }

        draw(g) {
          g.push()
          g.translate(this.x, this.y)
          g.rotate(this.angle)
          g.noFill()
          g.strokeWeight(1.1)

          if (this.type === 0) {
            g.rectMode(g.CENTER)
            g.rect(0, 0, this.size * 2.5, this.size * 2.5)
          } else if (this.type === 1) {
            g.beginShape()
            for (let a = 0; a < p.TWO_PI; a += p.PI / 3) {
              const r = this.size * 1.8
              g.vertex(p.cos(a) * r, p.sin(a) * r)
            }
            g.endShape(g.CLOSE)
          } else if (this.type === 2) {
            g.ellipse(0, 0, this.size * 3, this.size * 3)
          } else {
            g.beginShape()
            for (let a = 0; a < p.TWO_PI; a += p.PI / 4) {
              const r = a % (p.PI / 2) === 0 ? this.size * 2 : this.size
              g.vertex(p.cos(a) * r, p.sin(a) * r)
            }
            g.endShape(g.CLOSE)
          }
          g.pop()
        }
      }

      // Todo el dibujo va a la plancha en negro. El color lo pone
      // la tinta al imprimir, no el trazo.
      const drawPlate = (g) => {
        g.clear()
        const time = p.frameCount * 0.003

        g.push()
        g.translate(g.width * 0.66, g.height * 0.44)

        const ringCount = 3
        for (let i = 0; i < ringCount; i++) {
          const radius = 140 + i * 120
          const wobble = p.sin(time * 1.5 + i * 0.5) * 15
          g.noFill()
          g.stroke(0, p.map(i, 0, ringCount - 1, 70, 28))
          g.strokeWeight(1)
          g.drawingContext.setLineDash([8, 14])
          g.circle(0, 0, (radius + wobble) * 2)
        }
        g.drawingContext.setLineDash([])

        // Sin brazos radiales: eran tres líneas grises que no
        // llevaban a ninguna parte.
        g.pop()

        g.stroke(0, 95)
        particles.forEach((particle) => {
          particle.update()
          particle.draw(g)
        })

        // Las partículas no se enlazan entre sí: la malla era ruido.
        // Sólo el cursor tira de ellas, y sólo mientras está cerca.
        if (targetX > 0) {
          for (let i = 0; i < particles.length; i++) {
            const dx = particles[i].x - targetX
            const dy = particles[i].y - targetY
            const dist = p.sqrt(dx * dx + dy * dy)
            if (dist < 170) {
              g.stroke(0, (1 - dist / 170) * 130)
              g.strokeWeight(1)
              g.line(particles[i].x, particles[i].y, targetX, targetY)
            }
          }
        }
      }

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight)
        canvas.parent(containerRef.current)
        canvas.style('position', 'absolute')
        canvas.style('inset', '0')
        canvas.style('pointer-events', 'none')
        canvas.style('z-index', '1')

        plate = p.createGraphics(p.windowWidth, p.windowHeight)
        plate.noFill()

        for (let i = 0; i < particleCount; i++) particles.push(new Particle())
      }

      p.draw = () => {
        p.clear()

        targetX = p.lerp(targetX, mouseX, 0.1)
        targetY = p.lerp(targetY, mouseY, 0.1)

        // El registro lo decide la distancia del cursor al centro
        // de la composición. Lejos, las tintas se abren.
        const cx = p.width * 0.66
        const cy = p.height * 0.44
        const d = mouseX < 0 ? alignRadius : p.dist(mouseX, mouseY, cx, cy)
        reg = p.lerp(reg, p.constrain(d / alignRadius, 0, 1), 0.08)

        drawPlate(plate)

        const spread = 7 * reg
        const offsets = [
          [-spread, spread * 0.6],
          [spread, -spread * 0.5],
          [0, 0],
        ]

        // Tinta sobre papel: la impresión es sustractiva.
        p.blendMode(p.MULTIPLY)
        INKS.forEach((ink, i) => {
          p.push()
          p.tint(ink[0], ink[1], ink[2], i === 2 ? 235 : 190)
          p.image(plate, offsets[i][0], offsets[i][1])
          p.pop()
        })
        p.blendMode(p.BLEND)
      }

      p.mouseMoved = () => {
        mouseX = p.mouseX
        mouseY = p.mouseY
      }

      p.touchMoved = () => {
        if (p.touches.length > 0) {
          mouseX = p.touches[0].x
          mouseY = p.touches[0].y
        }
      }

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
        plate.resizeCanvas(p.windowWidth, p.windowHeight)
      }
    }

    const instance = new p5(sketch)
    return () => instance.remove()
  }, [])

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none" />
}

export default function Hero() {
  const containerRef = useRef(null)
  const blockRef = useRef(null)
  const regRef = useRegistration(520)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        blockRef.current.children,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, delay: 0.4, ease: 'power2.out' }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="press-bed relative flex min-h-screen items-end overflow-hidden"
    >
      <PressCanvas />

      <RegisterMarks inset={24} top={84} />

      {/* El papel se aclara hacia el cajetín para que el texto
          no compita con la tinta que corre por encima. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-1/2"
        style={{ background: 'linear-gradient(to top, var(--press) 22%, rgba(244,241,234,0) 100%)' }}
      />

      {/* Cajetín: abajo a la izquierda, como en el taller */}
      <div
        ref={(el) => {
          blockRef.current = el
          regRef.current = el
        }}
        className="relative z-10 w-full px-6 pb-16 md:px-12 md:pb-20 lg:px-16"
      >
        <h1 className="rbt-mark rbt-mark--lg" style={{ opacity: 0 }}>
          <Misreg>rbt.</Misreg>
        </h1>

        <p
          className="t-body mt-5 max-w-[42ch]"
          style={{ color: 'var(--on-press-mid)', opacity: 0 }}
        >
          Experience engineering, producto AI-native y código creativo.
          Lo que corre por encima es el trabajo, no el decorado.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4" style={{ opacity: 0 }}>
          <a href="#projects" className="btn btn--lg">Ver casos</a>
          <a href="#contact" className="btn btn--ghost btn--lg">Contactar</a>
        </div>
      </div>
    </section>
  )
}
