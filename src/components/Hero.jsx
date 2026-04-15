import { useEffect, useRef, useState } from 'react'

function HeroFallback() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-bg">
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#1A5D43 1px, transparent 1px), linear-gradient(90deg, #1A5D43 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

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

      <div className="absolute bottom-8 left-6 md:left-12 lg:left-16 flex items-center gap-6">
        <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-textMuted/50">
          Barcelona · ES · 2025
        </span>
      </div>

      <div className="absolute bottom-8 right-6 md:right-12 lg:right-16 flex flex-col items-center gap-2">
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-textMuted/40">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-accent/60 to-transparent" />
      </div>
    </section>
  )
}

function HeroCanvas() {
  const canvasRef = useRef(null)
  const contentRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [isSupported, setIsSupported] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const checkSupport = () => {
      if (!('layoutSubtree' in canvas)) return false
      const ctx = canvas.getContext('2d')
      return ctx && typeof ctx.drawElementImage === 'function'
    }

    const supported = checkSupport()
    setIsSupported(supported)

    if (!supported) return

    const ctx = canvas.getContext('2d')
    const content = contentRef.current
    const children = Array.from(content.children)

    const setupCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    setupCanvas()
    window.addEventListener('resize', setupCanvas)

    const handlePaint = () => {
      ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1))
      children.forEach((el) => {
        try {
          const transform = ctx.drawElementImage(el)
          el.style.transform = transform.toString()
        } catch (e) {
          console.warn('drawElementImage failed:', e)
        }
      })
    }

    canvas.addEventListener('paint', handlePaint)
    
    canvas.requestPaint()

    setLoaded(true)

    return () => {
      window.removeEventListener('resize', setupCanvas)
      canvas.removeEventListener('paint', handlePaint)
    }
  }, [])

  if (isSupported === null) {
    return <div className="min-h-screen bg-bg" />
  }

  if (!isSupported) {
    return <HeroFallback />
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-bg">
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#1A5D43 1px, transparent 1px), linear-gradient(90deg, #1A5D43 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        layoutSubtree
      />

      <div 
        ref={contentRef}
        className="relative z-10 min-h-screen pointer-events-none"
      >
        <div className="absolute top-1/2 -translate-y-1/2 left-6 md:left-12 lg:left-16 xl:left-24">
          <div className="pointer-events-auto">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-accent mb-6 md:mb-8">
              Digital Studio · Barcelona
            </p>
            
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-semibold text-text leading-[0.88] tracking-tight mb-6 md:mb-8">
              RBT
              <br />
              <em className="not-italic text-accent">Studio</em>
            </h1>
            
            <p className="font-sans text-base md:text-lg text-textMuted max-w-md mb-10 md:mb-12 leading-relaxed">
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

        <div className="absolute bottom-8 left-6 md:left-12 lg:left-16 xl:left-24 pointer-events-auto">
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-textMuted/50">
            Barcelona · ES · 2025
          </span>
        </div>

        <div className="absolute bottom-8 right-6 md:right-12 lg:right-16 xl:right-24 pointer-events-auto">
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-textMuted/40">
              Scroll
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-accent/60 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Hero() {
  return <HeroCanvas />
}
