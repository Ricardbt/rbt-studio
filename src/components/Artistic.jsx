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
      ctx.fillStyle = 'rgba(247, 249, 248, 0.08)'
      ctx.fillRect(0, 0, width, height)

      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        for (let a = 0; a < Math.PI * 2; a += 0.02) {
          const r = 70 + i * 35 + Math.sin(time * (0.7 + i * 0.3) + a * 3) * 15
          const x = width / 2 + Math.cos(a + time * (0.4 + i * 0.15)) * r
          const y = height / 2 + Math.sin(a * 2 + time * (0.3 - i * 0.1)) * r * 0.55
          a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.strokeStyle = `rgba(26, 93, 67, ${0.2 - i * 0.04})`
        ctx.lineWidth = 0.8
        ctx.stroke()
      }

      const numDots = 10
      for (let d = 0; d < numDots; d++) {
        const a = (d / numDots) * Math.PI * 2 + time
        const r = 90 + Math.sin(time * 1.5 + d) * 20
        const x = width / 2 + Math.cos(a) * r
        const y = height / 2 + Math.sin(a * 1.5) * r * 0.5
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(26, 93, 67, 0.7)'
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
  { label: 'Generativa', title: 'Sistemas de partículas', desc: 'Exploración de patrones naturales mediante código. Árboles fractal, fluidos y autómatas celulares.' },
  { label: 'Hardware', title: 'Arduino', desc: 'Proyectos que conectan el mundo físico y digital: sensores y actuadores.' },
  { label: '3D Web', title: 'Three.js', desc: 'Shaders personalizados y geometrías procedurales reactivas.' },
  { label: 'Instalaciones', title: 'Arte Computacional', desc: 'Proyecciones, audiovisual y entornos interactivos.' },
]

export default function Artistic() {
  return (
    <section id="artistic" className="py-24 lg:py-32 px-6 md:px-12 lg:px-20 bg-surface/30 border-y border-border/20">
      <div className="max-w-[1600px] mx-auto">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-accent/60 mb-4">
          Arte & Código
        </p>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-text mb-16 lg:mb-24">
          Donde el código
          <br />
          <em className="text-accent italic font-normal">se vuelve imagen</em>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="sticky top-24">
            <p className="font-sans text-base text-textMuted mb-8 leading-relaxed">
              Mi formación en <span className="text-text font-medium">Bellas Artes</span> nunca ha estado separada de mi práctica técnica. El código generativo y las instalaciones interactivas son extensiones naturales de ese lenguaje visual.
            </p>
            <div className="relative overflow-hidden bg-bg border border-border/30 p-4">
              <ArtCanvas />
              <span className="absolute bottom-2 left-4 font-mono text-[10px] tracking-widest uppercase text-textMuted/50">
                Generative · Live
              </span>
            </div>
          </div>
          
          <div className="space-y-8">
            {ARTISTIC_ITEMS.map((item, i) => (
              <div key={i} className="py-6 border-b border-border/20">
                <div className="font-mono text-[10px] tracking-widest uppercase text-accent/50 mb-2">
                  {item.label}
                </div>
                <div className="font-display text-xl text-text mb-2">
                  {item.title}
                </div>
                <div className="font-sans text-sm text-textMuted">
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