import { useRef, useEffect } from 'react'

function ArtCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    let animationId
    const width = 500
    const height = 320
    canvas.width = width
    canvas.height = height
    
    let time = 0
    
    const draw = () => {
      time += 0.008
      ctx.fillStyle = 'rgba(232, 237, 230, 0.12)'
      ctx.fillRect(0, 0, width, height)

      // Lissajous curves
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        for (let a = 0; a < Math.PI * 2; a += 0.02) {
          const r = 70 + i * 35 + Math.sin(time * (0.7 + i * 0.3) + a * 3) * 15
          const x = width / 2 + Math.cos(a + time * (0.4 + i * 0.15)) * r
          const y = height / 2 + Math.sin(a * 2 + time * (0.3 - i * 0.1)) * r * 0.55
          a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.strokeStyle = `rgba(46, 125, 90, ${0.25 - i * 0.05})`
        ctx.lineWidth = 0.8
        ctx.stroke()
      }

      // Dots
      const numDots = 10
      for (let d = 0; d < numDots; d++) {
        const a = (d / numDots) * Math.PI * 2 + time
        const r = 90 + Math.sin(time * 1.5 + d) * 20
        const x = width / 2 + Math.cos(a) * r
        const y = height / 2 + Math.sin(a * 1.5) * r * 0.5
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(46, 125, 90, 0.7)'
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => cancelAnimationFrame(animationId)
  }, [])

  return <canvas ref={canvasRef} className="w-full block max-w-lg" />
}

const ARTISTIC_ITEMS = [
  { label: 'Animación Generativa', title: 'Sistemas de partículas & L-Systems', desc: 'Exploración de patrones naturales mediante código. Árboles fractal, fluidos simulados, autómatas celulares y comportamientos emergentes implementados en Processing y p5.js.' },
  { label: 'Hardware & Electrónica', title: 'Arduino & Prototipos Físicos', desc: 'Proyectos que conectan el mundo físico y digital: sensores ambientales, actuadores, comunicación serial con interfaces web, y prototipos de producto para startups de hardware.' },
  { label: 'Experiencias 3D Web', title: 'WebGL / Three.js Interactivo', desc: 'Shaders personalizados, geometrías procedurales y escenas 3D reactivas al usuario. Proyectos de portfolio para artistas, visualizaciones de datos y campañas de marca.' },
  { label: 'Instalaciones', title: 'Arte Computacional & Espaço', desc: 'Propuestas para espacios culturales y eventos: proyección mapping, instalaciones audiovisuales y entornos interactivos que responden a la presencia del espectador.' },
]

export default function Artistic() {
  return (
    <section id="artistic" className="py-20 px-6 md:px-12 bg-bg border-y border-border">
      <div className="max-w-7xl mx-auto">
        <div className="font-mono text-xs tracking-widest uppercase text-accent mb-2">
          Arte & Código
        </div>
        <h2 className="font-sans text-3xl md:text-4xl font-semibold text-text leading-tight mb-12">
          Donde el código
          <br />
          <em className="text-accent italic">se vuelve imagen</em>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="sticky top-24">
            <p className="font-mono text-sm text-textMuted mb-8 leading-relaxed">
              Mi formación en <span className="text-text">Bellas Artes</span> nunca ha estado separada de mi práctica técnica. El código generativo, las instalaciones interactivas y la electrónica física son extensiones naturales de ese lenguaje visual.
              <br /><br />
              Trabajo con <span className="text-text">Processing</span> para animaciones y arte algorítmico, <span className="text-text">Arduino</span> para prototipos físico-digitales, y <span className="text-text">Three.js / WebGL</span> para experiencias web que van más allá de lo convencional.
            </p>
            <div className="relative overflow-hidden bg-bg border border-border p-4">
              <ArtCanvas />
              <span className="absolute bottom-2 left-4 font-mono text-[10px] tracking-widest uppercase text-textMuted">
                Generative · Live Canvas
              </span>
            </div>
          </div>
          
          <div>
            {ARTISTIC_ITEMS.map((item, i) => (
              <div key={i} className="py-6 border-b border-border last:border-b-0">
                <div className="font-mono text-[10px] tracking-widest uppercase text-accent mb-2">
                  {item.label}
                </div>
                <div className="font-sans text-xl font-semibold italic text-text mb-2">
                  {item.title}
                </div>
                <div className="font-mono text-xs text-textMuted leading-relaxed">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}