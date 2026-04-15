import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import p5 from 'p5'

function splitText(text) {
  return text.split('').map((char, i) => (
    <span 
      key={i} 
      className="inline-block overflow-hidden"
    >
      <span className="inline-block char">{char === ' ' ? '\u00A0' : char}</span>
    </span>
  ))
}

function P5Canvas() {
  const containerRef = useRef(null)

  useEffect(() => {
    const sketch = (p) => {
      let particles = []
      let mouseParticles = []
      const particleCount = 120
      const accent = [26, 93, 67]
      let mouseX = 0
      let mouseY = 0
      let targetX = 0
      let targetY = 0
      let isMouseNear = false

      class Particle {
        constructor() {
          this.reset()
        }

        reset() {
          this.x = p.random(p.width)
          this.y = p.random(p.height)
          this.vx = p.random(-0.4, 0.4)
          this.vy = p.random(-0.4, 0.4)
          this.size = p.random(3, 10)
          this.baseAlpha = p.random(0.15, 0.5)
          this.alpha = this.baseAlpha
          this.type = p.floor(p.random(4))
          this.angle = p.random(p.TWO_PI)
          this.angleSpeed = p.random(-0.02, 0.02)
        }

        update() {
          if (isMouseNear) {
            const dx = this.x - targetX
            const dy = this.y - targetY
            const dist = p.sqrt(dx * dx + dy * dy)
            if (dist < 200) {
              const force = (200 - dist) / 200 * 0.8
              this.vx += (dx / dist) * force
              this.vy += (dy / dist) * force
              this.alpha = p.map(dist, 0, 200, 0.8, this.baseAlpha)
            } else {
              this.alpha = p.lerp(this.alpha, this.baseAlpha, 0.05)
            }
          } else {
            this.alpha = p.lerp(this.alpha, this.baseAlpha, 0.05)
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

        draw() {
          p.push()
          p.translate(this.x, this.y)
          p.rotate(this.angle)

          const r = p.red(accent)
          const g = p.green(accent)
          const b = p.blue(accent)
          p.stroke(r, g, b, this.alpha * 255)
          p.noFill()
          p.strokeWeight(1.5)

          if (this.type === 0) {
            p.rectMode(p.CENTER)
            p.rect(0, 0, this.size * 2.5, this.size * 2.5)
          } else if (this.type === 1) {
            p.beginShape()
            for (let a = 0; a < p.TWO_PI; a += p.PI / 3) {
              const r = this.size * 1.8
              p.vertex(p.cos(a) * r, p.sin(a) * r)
            }
            p.endShape(p.CLOSE)
          } else if (this.type === 2) {
            p.ellipse(0, 0, this.size * 3, this.size * 3)
          } else {
            p.beginShape()
            for (let a = 0; a < p.TWO_PI; a += p.PI / 4) {
              const r = a % (p.PI / 2) === 0 ? this.size * 2 : this.size
              p.vertex(p.cos(a) * r, p.sin(a) * r)
            }
            p.endShape(p.CLOSE)
          }
          p.pop()
        }
      }

      class MouseParticle {
        constructor(x, y) {
          this.x = x
          this.y = y
          this.vx = p.random(-2, 2)
          this.vy = p.random(-2, 2)
          this.life = 1
          this.decay = p.random(0.015, 0.03)
          this.size = p.random(4, 12)
        }

        update() {
          this.x += this.vx
          this.y += this.vy
          this.vx *= 0.98
          this.vy *= 0.98
          this.life -= this.decay
        }

        draw() {
          if (this.life <= 0) return
          const r = p.red(accent)
          const g = p.green(accent)
          const b = p.blue(accent)
          p.fill(r, g, b, this.life * 150)
          p.noStroke()
          p.ellipse(this.x, this.y, this.size * this.life)
        }

        isDead() {
          return this.life <= 0
        }
      }

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight)
        canvas.parent(containerRef.current)
        canvas.style('position', 'absolute')
        canvas.style('inset', '0')
        canvas.style('pointer-events', 'none')
        canvas.style('z-index', '1')

        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle())
        }
      }

      p.draw = () => {
        p.clear()

        const time = p.frameCount * 0.003

        targetX = p.lerp(targetX, mouseX, 0.1)
        targetY = p.lerp(targetY, mouseY, 0.1)
        isMouseNear = targetX > 0 && targetY > 0

        p.push()
        p.translate(p.width * 0.65, p.height * 0.5)

        const baseColor = p.color(accent[0], accent[1], accent[2], 25)
        
        const ringCount = 7
        for (let i = 0; i < ringCount; i++) {
          const radius = 100 + i * 80
          const wobble = p.sin(time * 1.5 + i * 0.5) * 15
          const strokeAlpha = p.map(i, 0, ringCount - 1, 40, 15)
          
          p.noFill()
          p.stroke(accent[0], accent[1], accent[2], strokeAlpha)
          p.strokeWeight(1)
          p.drawingContext.setLineDash([8, 12])
          p.circle(0, 0, (radius + wobble) * 2)
        }

        p.drawingContext.setLineDash([])

        for (let i = 0; i < 4; i++) {
          const angle = p.PI * 0.25 + i * p.PI * 0.15
          const length = 300 + p.sin(time + i) * 50
          const endX = p.cos(angle) * length
          const endY = p.sin(angle) * length
          
          p.stroke(accent[0], accent[1], accent[2], 20)
          p.strokeWeight(1)
          p.line(0, 0, endX, endY)

          const dotX = endX * 0.9 + p.sin(time * 2 + i) * 20
          const dotY = endY * 0.9 + p.cos(time * 2 + i) * 20
          p.fill(accent[0], accent[1], accent[2], 60)
          p.noStroke()
          p.circle(dotX, dotY, 6)
        }

        p.pop()

        mouseParticles.forEach(mp => {
          mp.update()
          mp.draw()
        })
        mouseParticles = mouseParticles.filter(mp => !mp.isDead())

        particles.forEach(particle => {
          particle.update()
          particle.draw()
        })

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const dist = p.sqrt(dx * dx + dy * dy)
            
            if (dist < 120) {
              const alpha = (1 - dist / 120) * 50
              p.stroke(accent[0], accent[1], accent[2], alpha)
              p.strokeWeight(0.8)
              p.line(particles[i].x, particles[i].y, particles[j].x, particles[j].y)
            }
          }
        }

        if (isMouseNear) {
          for (let i = 0; i < particles.length; i++) {
            const dx = particles[i].x - targetX
            const dy = particles[i].y - targetY
            const dist = p.sqrt(dx * dx + dy * dy)
            
            if (dist < 180) {
              const alpha = (1 - dist / 180) * 100
              p.stroke(accent[0], accent[1], accent[2], alpha)
              p.strokeWeight(1.2)
              p.line(particles[i].x, particles[i].y, targetX, targetY)
            }
          }
        }
      }

      p.mouseMoved = () => {
        mouseX = p.mouseX
        mouseY = p.mouseY
        mouseParticles.push(new MouseParticle(mouseX, mouseY))
        if (mouseParticles.length > 30) {
          mouseParticles.shift()
        }
      }

      p.touchMoved = () => {
        if (p.touches.length > 0) {
          mouseX = p.touches[0].x
          mouseY = p.touches[0].y
          mouseParticles.push(new MouseParticle(mouseX, mouseY))
          if (mouseParticles.length > 30) {
            mouseParticles.shift()
          }
        }
      }

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
      }
    }

    const p5Instance = new p5(sketch)

    return () => {
      p5Instance.remove()
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none" />
}

export default function Hero() {
  const containerRef = useRef(null)
  const labelRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const descRef = useRef(null)
  const buttonsRef = useRef(null)
  const metaRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(labelRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 }
      )

      const chars = titleRef.current.querySelectorAll('.char')
      tl.fromTo(chars,
        { opacity: 0, y: 50, rotateX: -90 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.6, stagger: 0.03 },
        '-=0.4'
      )

      tl.fromTo(subtitleRef.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.8, ease: 'power2.inOut' },
        '-=0.3'
      )

      const descLines = descRef.current.children
      tl.fromTo(descLines,
        { opacity: 0, y: 20, clipPath: 'inset(0 0 100% 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.6, stagger: 0.15 },
        '-=0.4'
      )

      const buttons = buttonsRef.current.children
      tl.fromTo(buttons,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 },
        '-=0.2'
      )

      tl.fromTo(metaRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.4'
      )

      tl.fromTo(scrollRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.2'
      )

      gsap.to(scrollRef.current.querySelector('.scroll-line'), {
        scaleY: 0.5,
        opacity: 0.3,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-bg">
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#1A5D43 1px, transparent 1px), linear-gradient(90deg, #1A5D43 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* p5.js Generative Canvas */}
      <P5Canvas />

      {/* Gradient overlay for text readability */}
      <div 
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          background: 'linear-gradient(to right, rgba(247, 249, 248, 1) 0%, rgba(247, 249, 248, 0.9) 30%, rgba(247, 249, 248, 0.3) 60%, rgba(247, 249, 248, 0) 100%)'
        }}
      />

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 xl:px-24">
        <div className="max-w-[900px]">
          {/* Label */}
          <p 
            ref={labelRef}
            className="font-mono text-[11px] tracking-[0.25em] uppercase text-accent mb-6 md:mb-8 opacity-0"
          >
            Digital Studio · Barcelona
          </p>
          
          {/* Title */}
          <h1 
            ref={titleRef}
            className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-semibold text-text leading-[0.85] tracking-tight mb-6 md:mb-8 perspective-[1000px]"
          >
            {splitText('RBT')}
          </h1>
          
          {/* Subtitle */}
          <div ref={subtitleRef} className="overflow-hidden mb-6 md:mb-8 opacity-0">
            <h2 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-semibold text-accent leading-[0.85] tracking-tight not-italic">
              Studio
            </h2>
          </div>
          
          {/* Description */}
          <div ref={descRef} className="space-y-2 mb-10 md:mb-12">
            <p className="font-sans text-base md:text-lg text-textMuted max-w-lg leading-relaxed opacity-0">
              Ingeniería de precisión y sensibilidad artística.
            </p>
            <p className="font-sans text-base md:text-lg text-textMuted max-w-lg leading-relaxed opacity-0">
              Desarrollo web, automatización IA, código generativo y electrónica física.
            </p>
          </div>
          
          {/* Buttons */}
          <div ref={buttonsRef} className="flex flex-wrap gap-4 md:gap-6">
            <a 
              href="#services" 
              className="inline-block font-mono text-[11px] tracking-[0.15em] uppercase px-8 md:px-10 py-4 bg-accent text-white hover:bg-accentLight transition-colors duration-300 opacity-0"
            >
              Servicios
            </a>
            <a 
              href="#contact" 
              className="inline-block font-mono text-[11px] tracking-[0.15em] uppercase px-8 md:px-10 py-4 bg-transparent text-text border border-text/30 hover:border-accent hover:text-accent transition-all duration-300 opacity-0"
            >
              Contactar
            </a>
          </div>
        </div>
      </div>

      {/* Meta info */}
      <div ref={metaRef} className="absolute bottom-8 left-6 md:left-12 lg:left-16 opacity-0 z-10">
        <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-textMuted/50">
          Barcelona · ES · 2025
        </span>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="absolute bottom-8 right-6 md:right-12 lg:right-16 flex flex-col items-center gap-2 opacity-0 z-10">
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-textMuted/40">
          Scroll
        </span>
        <div className="scroll-line w-px h-12 bg-gradient-to-b from-accent/60 to-transparent" />
      </div>
    </section>
  )
}
