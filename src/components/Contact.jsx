import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const email = 'contact@rbt-studio.com'

export default function Contact() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardRef = useRef(null)

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

      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' },
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="relative py-16 md:py-20 lg:py-24" style={{ backgroundColor: '#F2EFE6' }}>
      <div className="relative z-10 w-full mx-auto px-4 sm:px-8 lg:px-16" style={{ maxWidth: '1280px' }}>
        <div ref={titleRef} className="mb-12 md:mb-16 lg:mb-24" style={{ opacity: 0 }}>
          <p className="font-mono text-[12px] tracking-[0.18em] uppercase mb-6" style={{ color: '#0E4A35' }}>
            03 / 05 · Contacto
          </p>
          <h2 className="font-sans text-5xl lg:text-6xl font-semibold leading-[0.95] tracking-tight" style={{ color: '#14140F', fontSize: 'clamp(72px, 10vw, 144px)' }}>
            Trabajemos
            <br />
            <em className="not-italic" style={{ color: '#0E4A35' }}>juntos.</em>
          </h2>
        </div>

        <div
          ref={cardRef}
          className="grid grid-cols-1 md:grid-cols-2"
          style={{
            border: '1px solid #0E4A35',
            opacity: 0,
          }}
        >
          {/* Left: Green background with email */}
          <div className="p-6 md:p-10" style={{ backgroundColor: '#0E4A35', color: '#F2EFE6' }}>
            <span className="font-mono text-[11px] tracking-[0.1em] uppercase" style={{ opacity: 0.8 }}>
              Email
            </span>
            <a
              href={`mailto:${email}`}
              className="block mt-6 hover:opacity-80 transition-opacity"
              style={{
                fontFamily: "'Roboto Slab', serif",
                fontWeight: 700,
                fontSize: 'clamp(28px, 3.5vw, 48px)',
                lineHeight: '1.1',
                wordBreak: 'break-all'
              }}
            >
              {email}
            </a>

            <div
              className="grid grid-cols-3"
              style={{
                gap: '24px',
                paddingTop: '24px',
                borderTop: '1px solid rgba(242, 239, 230, 0.3)',
                marginTop: '24px',
                fontSize: '12px',
              }}
            >
              <div className="font-mono tracking-[0.05em]" style={{ opacity: 0.8 }}>
                Barcelona
              </div>
              <div className="font-mono tracking-[0.05em]" style={{ opacity: 0.8 }}>
                Remoto
              </div>
              <div className="font-mono tracking-[0.05em]" style={{ opacity: 0.8 }}>
                &lt;24h
              </div>
            </div>
          </div>

          {/* Right: Cream paper background with form */}
          <div className="p-6 md:p-10" style={{ backgroundColor: '#FBF9F2', color: '#14140F', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#6E6E64] block" style={{ marginBottom: '4px' }}>
                Nombre
              </label>
              <input
                type="text"
                placeholder="Tu nombre"
                style={{
                  width: '100%',
                  padding: '12px 0',
                  border: 'none',
                  borderBottom: '1.5px solid #C9C5B6',
                  background: 'transparent',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                  color: '#14140F',
                }}
                onFocus={(e) => (e.target.style.borderBottomColor = '#0E4A35')}
                onBlur={(e) => (e.target.style.borderBottomColor = '#C9C5B6')}
              />
            </div>

            <div>
              <label className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#6E6E64] block" style={{ marginBottom: '4px' }}>
                Email
              </label>
              <input
                type="email"
                placeholder="tu@email.com"
                style={{
                  width: '100%',
                  padding: '12px 0',
                  border: 'none',
                  borderBottom: '1.5px solid #C9C5B6',
                  background: 'transparent',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                  color: '#14140F',
                }}
                onFocus={(e) => (e.target.style.borderBottomColor = '#0E4A35')}
                onBlur={(e) => (e.target.style.borderBottomColor = '#C9C5B6')}
              />
            </div>

            <div>
              <label className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#6E6E64] block" style={{ marginBottom: '4px' }}>
                Mensaje
              </label>
              <textarea
                placeholder="Cuéntanos sobre tu proyecto..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px 0',
                  border: 'none',
                  borderBottom: '1.5px solid #C9C5B6',
                  background: 'transparent',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                  color: '#14140F',
                  resize: 'none',
                }}
                onFocus={(e) => (e.target.style.borderBottomColor = '#0E4A35')}
                onBlur={(e) => (e.target.style.borderBottomColor = '#C9C5B6')}
              />
            </div>

            <button
              className="btn btn--lg"
              style={{ marginTop: '16px' }}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
