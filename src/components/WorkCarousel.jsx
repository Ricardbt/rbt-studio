import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PassOpen } from './Press'
import { WORK_GROUPS } from '../data/works'

gsap.registerPlugin(ScrollTrigger)

/* =========================================================
   PASADA 03 — LA PILA
   Los encargos de cliente son la pila de hojas ya impresas:
   se pasan de lado, no se leen enteras. Cada tarjeta es un
   cliente; dentro están todas sus pantallas.
   ========================================================= */

// Nombra lo que hay dentro del grupo en vez de un "+N más" sin objeto.
const restSummary = (items) => {
  const rest = items.slice(1)
  if (!rest.length) return null
  const videos = rest.filter((i) => i.type === 'video').length
  const images = rest.length - videos
  const parts = []
  if (images) parts.push(`${images} ${images === 1 ? 'pantalla' : 'pantallas'}`)
  if (videos) parts.push(`${videos} ${videos === 1 ? 'vídeo' : 'vídeos'}`)
  return `+${parts.join(' · ')}`
}

function GroupCard({ group, onOpen }) {
  const { cover, items } = group
  const videoRef = useRef(null)
  const rest = restSummary(items)

  return (
    <button
      className="work-card"
      onClick={() => onOpen(group, 0)}
      aria-label={`Ver el trabajo para ${group.client} — ${items.length} ${items.length === 1 ? 'pieza' : 'piezas'}`}
      onMouseEnter={() => videoRef.current?.play().catch(() => {})}
      onMouseLeave={() => {
        if (videoRef.current) {
          videoRef.current.pause()
          videoRef.current.currentTime = 0
        }
      }}
    >
      <div className="work-card__cover">
        {cover.type === 'video' ? (
          <video
            ref={videoRef}
            src={`${cover.src}#t=0.1`}
            muted
            loop
            playsInline
            preload="metadata"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <img
            src={cover.image}
            alt={cover.title}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: cover.objectPosition || 'center' }}
          />
        )}
      </div>
      <div className="work-card__body">
        <h3 className="t-h3" style={{ color: 'var(--on-press)' }}>{group.client}</h3>
        <span className="t-label" style={{ color: 'var(--on-press-low)' }}>{cover.tech}</span>
        {rest && <span className="t-label" style={{ color: 'var(--on-press-low)' }}>{rest}</span>}
      </div>
    </button>
  )
}

export default function WorkCarousel() {
  const [viewer, setViewer] = useState(null) // { group, index }
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.work-card',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: 'power2.out',
          scrollTrigger: { trigger: trackRef.current, start: 'top 88%', toggleActions: 'play none none reverse' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const scrollBy = (dir) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: dir * Math.max(track.clientWidth * 0.8, 300), behavior: 'smooth' })
  }

  const step = (dir) => {
    setViewer((v) => {
      if (!v) return v
      const n = v.group.items.length
      return { ...v, index: (v.index + dir + n) % n }
    })
  }

  useEffect(() => {
    if (!viewer) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') setViewer(null)
      if (e.key === 'ArrowLeft') step(-1)
      if (e.key === 'ArrowRight') step(1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [viewer])

  const current = viewer ? viewer.group.items[viewer.index] : null

  return (
    <section ref={sectionRef} id="works" className="relative pb-20 md:pb-28">
      <div className="mx-auto w-full" style={{ maxWidth: '1400px' }}>
        <div className="px-6 md:px-12 lg:px-16">
          <PassOpen
            pass={3}
            ink="var(--ink-yellow-t)"
            title="La pila"
            sub={`Webs, intranets y comercio en producción. ${WORK_GROUPS.length} encargos, de hospitales y universidades a tiendas y portfolios.`}
          />

          <div className="mt-6 flex justify-end gap-2">
            {[-1, 1].map((dir) => (
              <button
                key={dir}
                onClick={() => scrollBy(dir)}
                aria-label={dir < 0 ? 'Ver clientes anteriores' : 'Ver más clientes'}
                className="work-nav"
              >
                {dir < 0 ? '←' : '→'}
              </button>
            ))}
          </div>
        </div>

        <div ref={trackRef} className="work-track mt-6 px-6 md:px-12 lg:px-16">
          {WORK_GROUPS.map((group) => (
            <GroupCard key={group.client} group={group} onOpen={(g, i) => setViewer({ group: g, index: i })} />
          ))}
        </div>
      </div>

      {/* Visor por cliente */}
      {current && (
        <div
          className="p-4 md:p-8"
          style={{ position: 'fixed', inset: 0, background: 'var(--scrim)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setViewer(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Trabajo para ${viewer.group.client}`}
            style={{ position: 'relative', width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', gap: '24px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setViewer(null)}
              aria-label={`Cerrar el trabajo para ${viewer.group.client}`}
              className="t-h3"
              style={{ position: 'absolute', top: '-46px', right: 0, color: 'var(--ink-white)', zIndex: 1001 }}
            >
              ✕
            </button>

            <div
              style={{
                position: 'relative',
                background: 'var(--sheet)',
                border: 'var(--hairline-p)',
                maxHeight: '70vh',
                overflow: 'auto',
                scrollBehavior: 'smooth',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {current.type === 'video' ? (
                <video
                  key={current.id}
                  src={current.src}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain' }}
                />
              ) : (
                <>
                  <div style={{ padding: 'clamp(20px, 4vw, 64px)', width: '100%', background: 'var(--sheet)' }}>
                    <img src={current.image} alt={current.title} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                  </div>
                  <div
                    style={{
                      position: 'sticky',
                      bottom: 0,
                      height: '48px',
                      marginTop: '-48px',
                      alignSelf: 'stretch',
                      background: 'linear-gradient(to top, rgba(255,255,255,0.95), transparent)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      paddingBottom: '6px',
                      pointerEvents: 'none',
                    }}
                  >
                    <span className="t-label" style={{ color: 'var(--on-sheet-low)' }}>
                      Desplázate para ver la página entera
                    </span>
                  </div>
                </>
              )}

              {viewer.group.items.length > 1 &&
                [-1, 1].map((dir) => (
                  <button
                    key={dir}
                    onClick={() => step(dir)}
                    aria-label={dir < 0 ? 'Pieza anterior de este cliente' : 'Siguiente pieza de este cliente'}
                    className="work-step"
                    style={{ [dir < 0 ? 'left' : 'right']: '16px' }}
                  >
                    {dir < 0 ? '←' : '→'}
                  </button>
                ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '32px' }}>
              <div>
                <h2 className="t-h2" style={{ color: 'var(--ink-white)', marginBottom: '6px' }}>{current.title}</h2>
                <span className="t-label" style={{ color: 'rgba(255,255,255,0.72)' }}>{current.tech}</span>
              </div>
              {viewer.group.items.length > 1 && (
                <span className="t-num" style={{ color: 'rgba(255,255,255,0.72)' }}>
                  {viewer.index + 1} / {viewer.group.items.length}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .work-track {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding-bottom: 12px;
          scrollbar-width: thin;
          scrollbar-color: var(--press-line) transparent;
        }
        .work-track::-webkit-scrollbar { height: 6px; }
        .work-track::-webkit-scrollbar-thumb { background: var(--press-line); }
        .work-track::-webkit-scrollbar-track { background: transparent; }

        .work-card {
          flex: 0 0 auto;
          align-self: stretch;
          width: min(300px, 78vw);
          scroll-snap-align: start;
          text-align: left;
          display: flex;
          flex-direction: column;
          background: var(--sheet);
          border: var(--hairline-p);
          padding: 0;
          cursor: pointer;
          opacity: 0;
          transition: border-color var(--dur-base) var(--ease-snap), transform var(--dur-base) var(--ease-snap);
        }
        .work-card:hover,
        .work-card:focus-visible { border-color: var(--ink-cyan); transform: translateY(-3px); }

        .work-card__cover { aspect-ratio: 16 / 10; overflow: hidden; background: var(--press-raise); }

        .work-card__body { display: flex; flex-direction: column; gap: 8px; padding: 18px; }

        .work-nav {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: var(--hairline-p);
          color: var(--on-press);
          font-size: var(--t-h4);
          transition: background var(--dur-quick), color var(--dur-quick), border-color var(--dur-quick);
        }
        .work-nav:hover { background: var(--ink-key); border-color: var(--ink-key); color: var(--ink-white); }

        .work-step {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--t-h4);
          color: var(--sheet);
          background: rgba(20, 21, 15, 0.72);
          transition: background var(--dur-quick);
        }
        .work-step:hover { background: var(--ink-magenta); }
      `}</style>
    </section>
  )
}
