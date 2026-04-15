import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const email = 'contact@rbt-studio.com'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const contentRef = useRef(null)
  const boxRef = useRef(null)
  const emailLinkRef = useRef(null)
  const underlineRef = useRef(null)
  const buttonRef = useRef(null)

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current.children,
        { opacity: 0, y: 40, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Content fade in
      gsap.fromTo(contentRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Box animation
      gsap.fromTo(boxRef.current,
        { opacity: 0, x: 50, clipPath: 'inset(0 100% 0 0)' },
        {
          opacity: 1,
          x: 0,
          clipPath: 'inset(0 0% 0 0)',
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: boxRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const link = emailLinkRef.current
    
    const handleMouseEnter = () => {
      gsap.to(underlineRef.current, {
        scaleX: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(underlineRef.current, {
        scaleX: 0,
        duration: 0.3,
        ease: 'power2.inOut'
      })
    }

    link.addEventListener('mouseenter', handleMouseEnter)
    link.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      link.removeEventListener('mouseenter', handleMouseEnter)
      link.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    if (copied) {
      gsap.to(buttonRef.current, {
        scale: 1.02,
        duration: 0.2,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(buttonRef.current, {
            scale: 1,
            duration: 0.3,
            ease: 'elastic.out(1, 0.5)'
          })
        }
      })
    }
  }, [copied])

  return (
    <section ref={sectionRef} id="contact" className="bg-bg">
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#1A5D43 1px, transparent 1px), linear-gradient(90deg, #1A5D43 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="relative z-10 px-6 md:px-12 lg:px-16 xl:px-24 py-24 md:py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-[1400px]">
          <div>
            <div ref={titleRef}>
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-accent mb-4 md:mb-6 opacity-0">
                Contacto
              </p>
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-text leading-[0.9] mb-8 md:mb-10 opacity-0">
                Trabajemos
                <br />
                <em className="not-italic text-accent">juntos.</em>
              </h2>
            </div>
            <div ref={contentRef} className="space-y-6">
              <p className="font-sans text-base md:text-lg text-textMuted max-w-md leading-relaxed opacity-0">
                Desarrollo web, automatización IA, instalación interactiva o algo que todavía no tiene nombre — escríbenos.
              </p>
              
              <div className="flex flex-col gap-4 opacity-0">
                <a
                  ref={emailLinkRef}
                  href={`mailto:${email}`}
                  className="group font-mono text-sm md:text-base text-text hover:text-accent transition-colors duration-300 flex items-center gap-3 relative"
                >
                  <span className="tracking-[0.05em]">{email}</span>
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                  {/* Animated underline */}
                  <span 
                    ref={underlineRef}
                    className="absolute bottom-0 left-0 w-full h-px bg-accent origin-left scale-x-0"
                  />
                </a>
                <a
                  href="https://github.com/rbt-studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-textMuted hover:text-text transition-colors duration-300"
                >
                  github.com/rbt-studio
                </a>
              </div>
            </div>
          </div>
          
          <div className="lg:pt-8">
            <div 
              ref={boxRef}
              className="border border-border/30 p-8 md:p-10 lg:p-12 opacity-0"
            >
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-textMuted/50 mb-6 md:mb-8">
                Copiar email
              </div>
              <button
                ref={buttonRef}
                onClick={handleCopy}
                className={`w-full text-left px-6 py-4 font-mono text-sm transition-all duration-300 flex justify-between items-center border ${
                  copied 
                    ? 'bg-accent/10 border-accent text-accent' 
                    : 'bg-transparent border-border/40 text-text hover:border-accent/50'
                }`}
              >
                <span className="tracking-[0.03em]">{email}</span>
                <span className="font-mono text-[10px] tracking-[0.15em] uppercase">
                  {copied ? '✓ Copiado' : 'Copiar'}
                </span>
              </button>
              <div className="mt-6 md:mt-8 font-sans text-sm text-textMuted flex flex-wrap gap-6">
                <span>📍 Barcelona</span>
                <span>🌐 Remoto</span>
                <span>⏱ &lt;24h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
