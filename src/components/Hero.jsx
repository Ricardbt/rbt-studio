import { useRef, useEffect, useState } from 'react'
import Robot3D from './Robot3D'

function GrainOverlay() {
  return (
    <div 
      className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  )
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      <GrainOverlay />
      <section className="min-h-screen relative overflow-hidden bg-bg">
        {/* Ambient background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-accent/[0.02] blur-3xl" />
          <div className="absolute bottom-1/4 -right-1/4 w-[400px] h-[400px] rounded-full bg-accentLight/[0.03] blur-3xl" />
        </div>

        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(${`#1A5D43`} 1px, transparent 1px), linear-gradient(90deg, ${`#1A5D43`} 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        <div className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 md:px-12 lg:px-20 py-20">
          {/* Left Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className={`transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-8">
                Developer & Creative Technologist
              </p>
              
              <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-semibold text-text leading-[0.88] mb-8">
                <span className="block">RBT</span>
                <span className="block text-accent italic font-normal">Studio</span>
              </h1>
              
              <p className="font-sans text-lg text-textMuted max-w-md mb-10 leading-relaxed">
                Donde la <span className="text-text font-medium">ingeniería</span> y la <span className="text-text font-medium">sensibilidad artística</span> coexisten. 
                IA, web, código generativo y electrónica física.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#services" 
                  className="group relative font-mono text-xs tracking-widest uppercase px-8 py-4 bg-accent text-white overflow-hidden"
                >
                  <span className="relative z-10 group-hover:text-white transition-colors">Servicios</span>
                  <div className="absolute inset-0 bg-accentLight transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                </a>
                <a 
                  href="#contact" 
                  className="font-mono text-xs tracking-widest uppercase px-8 py-4 border border-text/20 text-text hover:border-accent hover:text-accent transition-all duration-300"
                >
                  Contactar
                </a>
              </div>
            </div>
          </div>

          {/* Right - 3D Robot */}
          <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
            <div className="w-full h-[400px] lg:h-full relative">
              <div className="absolute inset-0">
                <Robot3D />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute bottom-20 left-0 right-0 flex justify-center">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-textMuted/50">
                  Barcelona · ES · 2025
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-textMuted/40 writing-vertical-lr">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-accent/60 to-transparent" />
        </div>
      </section>
    </>
  )
}