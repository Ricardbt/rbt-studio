import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { RegisterMarks, Misreg } from './Press'
import { useRegistration } from '../lib/registration'
import { prefersReducedMotion } from '../lib/motion'

/* =========================================================
   PRIMERA PASADA
   Tres manchas de tinta sobre el pliego. Nada más.

   Se dibujan una sola vez en una plancha y se estampan tres
   veces —cian, magenta y negro— con las separaciones abiertas.
   El fleco de color del borde no está pintado: es el sitio
   donde una pasada asoma por debajo de otra. Donde el cian
   pisa el magenta sale violeta, que es lo que hace la tinta
   de verdad cuando se sobreimprime.

   Acercar el cursor cierra las separaciones y el fleco
   desaparece. Ese gesto es toda la interacción, y sale de la
   misma --reg que desalinea el cajetín: una variable, un reloj.

   El contorno respira con un campo de ruido a un ciclo de unos
   cuarenta segundos. Nada se desplaza por la pantalla.
   ========================================================= */

// Las tres tintas del hero son las del sistema. Se leen de los tokens en
// vez de copiarse aquí: si el magenta cambia en index.css, cambia también
// lo que sale por la prensa. Los valores de abajo son sólo la red por si
// la variable no estuviera resuelta todavía.
const INK_TOKENS = ['--ink-cyan', '--ink-magenta', '--ink-key']
const INKS_FALLBACK = [
  [0, 121, 171],
  [214, 0, 111],
  [20, 21, 15],
]

function readInks() {
  const root = getComputedStyle(document.documentElement)
  return INK_TOKENS.map((token, i) => {
    const hex = root.getPropertyValue(token).trim().replace('#', '')
    if (hex.length !== 6) return INKS_FALLBACK[i]
    const rgb = [0, 2, 4].map((o) => parseInt(hex.slice(o, o + 2), 16))
    return rgb.some(Number.isNaN) ? INKS_FALLBACK[i] : rgb
  })
}

// Las tres manchas, en fracciones del pliego. El cajetín manda: la tinta
// no puede caerle encima, porque el texto de la ficha se lee sobre papel.
// En apaisado se queda libre la esquina inferior izquierda; en vertical no
// hay esquina que valga y toda la tinta sube al tercio de arriba.
const BLOTS_LANDSCAPE = [
  { x: 0.52, y: 0.26, r: 0.24, seed: 0 },
  { x: 0.85, y: 0.47, r: 0.21, seed: 40 },
  { x: 0.66, y: 0.78, r: 0.13, seed: 80 },
]

const BLOTS_PORTRAIT = [
  { x: 0.44, y: 0.15, r: 0.30, seed: 0 },
  { x: 0.84, y: 0.33, r: 0.23, seed: 40 },
  { x: 0.28, y: 0.47, r: 0.15, seed: 80 },
]

// p5 2.x se llevó curveVertex de la API pública, así que el contorno no
// depende de ninguna API de splines: se muestrea denso y se une con vertex().
// Sobre un campo de ruido suave, 160 puntos ya leen como curva.
const SAMPLES = 160
const NOISE_SCALE = 1.2 // cuánto muerde el ruido al círculo
const BREATH = 0.0008   // ciclo de ~40 s
// La plancha se regraba una vez cada seis frames. La respiración dura
// cuarenta segundos: entre un frame y el siguiente no hay nada que ver, y
// regrabar a 60 Hz era el grueso del coste. El estampado sí va a 60 Hz,
// que es donde se nota la fluidez —— es lo que sigue al cursor.
const PLATE_EVERY = 6
const SPREAD = 16       // apertura máxima de las separaciones, en px
const LOAD = 120        // carga de tinta de la plancha (0-255)

function PressCanvas({ regSource }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const host = containerRef.current
    let instance = null
    let ready = false
    let visible = true
    let cancelled = false
    let io = null
    let ro = null

    const sketch = (p) => {
      let plate = null
      let breath = 0
      let reg = 1
      let dirty = true   // ¿hay algo nuevo que estampar?
      let inks = INKS_FALLBACK
      const still = prefersReducedMotion()

      // El contorno de una mancha: un círculo al que un campo de
      // ruido le come el borde. Ni polígono ni blob perfecto.
      const blot = (g, blotSpec, scale) => {
        const cx = g.width * blotSpec.x
        const cy = g.height * blotSpec.y
        const base = scale * blotSpec.r

        g.beginShape()
        for (let i = 0; i < SAMPLES; i++) {
          const a = i * p.TWO_PI / SAMPLES
          const n = p.noise(
            p.cos(a) * NOISE_SCALE + blotSpec.seed,
            p.sin(a) * NOISE_SCALE + blotSpec.seed,
            breath
          )
          const r = base * (0.70 + n * 0.60)
          g.vertex(cx + p.cos(a) * r, cy + p.sin(a) * r)
        }
        g.endShape(g.CLOSE)
      }

      // La plancha se graba en BLANCO, no en negro. tint() multiplica:
      // blanco por cian da cian, pero negro por cian sigue siendo negro.
      // Grabada en negro, las tres pasadas saldrían en gris y no habría
      // separación ninguna. El color lo pone la tinta al estampar; la
      // plancha sólo guarda dónde hay cobertura y cuánta.
      const drawPlate = (g) => {
        g.clear()
        g.noStroke()
        g.fill(255, LOAD)
        const scale = p.min(g.width, g.height)
        const blots = g.height > g.width ? BLOTS_PORTRAIT : BLOTS_LANDSCAPE
        blots.forEach((b) => blot(g, b, scale))
      }

      p.setup = () => {
        // Masas planas de tinta: la densidad 2 de retina no aporta nada
        // visible aquí y cuadruplica los píxeles de cada estampación.
        p.pixelDensity(1)
        // Contra el contenedor, no contra la ventana: la sección puede ser
        // más alta que el viewport y las manchas se compondrían fuera de sitio.
        const canvas = p.createCanvas(host.clientWidth, host.clientHeight)
        canvas.parent(host)
        canvas.style('position', 'absolute')
        canvas.style('inset', '0')
        canvas.style('pointer-events', 'none')
        canvas.style('z-index', '1')

        plate = p.createGraphics(host.clientWidth, host.clientHeight)
        plate.pixelDensity(1)
        inks = readInks()
        p.noiseDetail(3, 0.5)
        drawPlate(plate)
        ready = true
        applyRun()
      }

      // Un solo sitio donde se cambia el tamaño del pliego.
      p.resizePress = () => {
        if (!plate || !host.clientWidth) return
        p.resizeCanvas(host.clientWidth, host.clientHeight)
        plate.resizeCanvas(host.clientWidth, host.clientHeight)
        drawPlate(plate)
        dirty = true
      }

      p.draw = () => {
        if (!plate) return   // en p5 2.x setup es asíncrono: draw puede llegar antes

        // El registro no se calcula aquí. Se lee de --reg, que pone
        // useRegistration en la sección y hereda también el cajetín.
        const raw = parseFloat(regSource.current?.style.getPropertyValue('--reg'))
        const target = Number.isNaN(raw) ? 1 : raw

        if (Math.abs(target - reg) > 0.0015) {
          reg = p.lerp(reg, target, 0.18)
          dirty = true
        } else {
          reg = target
        }

        if (!still && p.frameCount % PLATE_EVERY === 0) {
          breath += BREATH * PLATE_EVERY
          drawPlate(plate)
          dirty = true
        }

        // Quieto el cursor y sin plancha nueva no hay nada que estampar.
        // El clear() va aquí dentro: fuera, dejaría el pliego en blanco.
        if (!dirty) return
        p.clear()

        const spread = SPREAD * reg
        const offsets = [
          [-spread, spread * 0.6],
          [spread, -spread * 0.5],
          [0, 0],
        ]

        // Tinta sobre papel: la impresión es sustractiva.
        p.blendMode(p.MULTIPLY)
        inks.forEach((ink, i) => {
          p.push()
          p.tint(ink[0], ink[1], ink[2], i === 2 ? 200 : 190)
          p.image(plate, offsets[i][0], offsets[i][1])
          p.pop()
        })
        p.blendMode(p.BLEND)
        dirty = false
      }
    }

    // La prensa para cuando el pliego sale de pantalla. No se toca el bucle
    // antes de que setup termine —en p5 2.x es asíncrono y un noLoop() de
    // más ahí deja el lienzo sin arrancar.
    const applyRun = () => {
      if (!ready || !instance) return
      if (visible) instance.loop()
      else instance.noLoop()
    }

    // p5 pesa 940 KB y esto es decoración: no puede ir por delante del
    // primer pintado. El pliego se queda en papel limpio hasta que llega
    // la plancha, que es lo que hace una prensa de verdad.
    import('p5').then(({ default: p5 }) => {
      if (cancelled) return

      instance = new p5(sketch)

      io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting
          applyRun()
        },
        { threshold: 0 }
      )
      io.observe(host)

      // El tamaño lo dicta el contenedor. En móvil la barra del navegador
      // cambia la altura sin que haya un resize de ventana que valga.
      ro = new ResizeObserver(() => instance?.resizePress?.())
      ro.observe(host)
    })

    return () => {
      cancelled = true
      io?.disconnect()
      ro?.disconnect()
      instance?.remove()
    }
  }, [regSource])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}

export default function Hero() {
  const blockRef = useRef(null)
  // Una sola fuente de --reg para toda la pasada: se mide al centro
  // de la masa de tinta, no al borde de la sección —a pliego completo
  // el cursor siempre estaría dentro y nunca habría nada que registrar.
  const sectionRef = useRegistration(560, { x: 0.64, y: 0.44 })

  useEffect(() => {
    // El marcado nace visible: con movimiento reducido no hay nada que
    // revelar, sólo que no barrer.
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      // gsap.from, no fromTo: el marcado nace visible. Si el script no
      // llega, el cajetín —wordmark, ficha y las dos llamadas— sigue ahí.
      gsap.from(blockRef.current.children, {
        opacity: 0,
        y: 16,
        duration: 0.7,
        stagger: 0.12,
        delay: 0.4,
        ease: 'power2.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [sectionRef])

  return (
    <section
      ref={sectionRef}
      className="press-bed relative flex min-h-[100svh] items-end overflow-hidden"
    >
      {/* El titular de la página. El sistema decide que en el primer
          viewport no hay titular grande —manda la pieza—, pero el documento
          necesita un h1 que diga qué es esto: quien navega por encabezados
          o llega de un buscador recibía sólo la marca. Se ve el cajetín; se
          lee esto. */}
      <h1 className="sr-only">
        rbt.studio — portfolio de Ricard Boixeda, Experience Engineer
      </h1>

      <PressCanvas regSource={sectionRef} />

      <RegisterMarks inset={24} top={84} />

      {/* Excepción declarada a la Regla del Vacío: el sistema prohíbe los
          degradados, y éste no decora. Aclara el papel hacia el cajetín para
          que la ficha se lea sobre papel y no sobre tinta —sobre una mancha
          al 20% de cobertura, --on-press-mid cae a 4,09:1 y suspende AA. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-1/2"
        style={{ background: 'linear-gradient(to top, var(--press) 22%, rgba(244,241,234,0) 100%)' }}
      />

      {/* Cajetín: abajo a la izquierda, como en el taller */}
      <div
        ref={blockRef}
        className="relative z-10 w-full px-6 pb-16 md:px-12 md:pb-20 lg:px-16"
      >
        <p className="rbt-mark rbt-mark--lg">
          <Misreg>rbt.</Misreg>
        </p>

        <p
          className="t-body mt-5 max-w-[42ch]"
          style={{ color: 'var(--on-press-mid)' }}
        >
          Experience engineering, producto AI-native y código creativo.
          Lo que corre por encima es el trabajo, no el decorado.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a href="#projects" className="btn btn--lg">Ver casos</a>
          <a href="#contact" className="btn btn--ghost btn--lg">Contactar</a>
        </div>
      </div>
    </section>
  )
}
