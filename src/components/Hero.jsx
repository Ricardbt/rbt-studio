import { useEffect, useRef } from 'react'
import gsap from 'gsap'

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

      // Label - fade in
      tl.fromTo(labelRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 }
      )

      // Title characters - typewriter effect
      const chars = titleRef.current.querySelectorAll('.char')
      tl.fromTo(chars,
        { opacity: 0, y: 50, rotateX: -90 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.6, stagger: 0.03 },
        '-=0.4'
      )

      // Subtitle - clip reveal
      tl.fromTo(subtitleRef.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.8, ease: 'power2.inOut' },
        '-=0.3'
      )

      // Description lines
      const descLines = descRef.current.children
      tl.fromTo(descLines,
        { opacity: 0, y: 20, clipPath: 'inset(0 0 100% 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.6, stagger: 0.15 },
        '-=0.4'
      )

      // Buttons
      const buttons = buttonsRef.current.children
      tl.fromTo(buttons,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 },
        '-=0.2'
      )

      // Meta info
      tl.fromTo(metaRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.4'
      )

      // Scroll indicator
      tl.fromTo(scrollRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.2'
      )

      // Continuous animations
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
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#1A5D43 1px, transparent 1px), linear-gradient(90deg, #1A5D43 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Animated geometric elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-accent/10 rotate-45" 
          style={{ animation: 'float 8s ease-in-out infinite' }} />
        <div className="absolute bottom-1/3 left-1/5 w-24 h-24 border border-accent/5 rotate-12"
          style={{ animation: 'float 10s ease-in-out infinite reverse' }} />
        <div className="absolute top-1/2 right-1/6 w-16 h-16 border border-accent/8 -rotate-12"
          style={{ animation: 'float 6s ease-in-out infinite 2s' }} />
      </div>

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
      <div ref={metaRef} className="absolute bottom-8 left-6 md:left-12 lg:left-16 opacity-0">
        <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-textMuted/50">
          Barcelona · ES · 2025
        </span>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="absolute bottom-8 right-6 md:right-12 lg:right-16 flex flex-col items-center gap-2 opacity-0">
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-textMuted/40">
          Scroll
        </span>
        <div className="scroll-line w-px h-12 bg-gradient-to-b from-accent/60 to-transparent" />
      </div>
    </section>
  )
}
