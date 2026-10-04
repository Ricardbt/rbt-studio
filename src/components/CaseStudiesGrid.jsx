import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { appear } from '../lib/motion'
import CaseStudyModal from './CaseStudyModal'
import { PassOpen, ContactCta } from './Press'
import { CASES_BY_LANG } from '../data/caseStudies'
import { COPY } from '../data/copy'
import { VIDEO_META } from '../data/videoMeta'
import { LANG, PATHS, casePath, slugFromPath, t } from '../i18n'

const CASES = CASES_BY_LANG[LANG]
const HOME = PATHS[LANG]

// El caso que pide la URL: su ruta propia o, por compatibilidad con los
// enlaces que ya circulan, el antiguo #case-<id>.
const caseFromLocation = () => {
  const slug = slugFromPath(window.location.pathname)
  if (slug) return CASES.find((c) => c.slug === slug) ?? null
  const m = window.location.hash.match(/^#case-(.+)$/)
  return m ? CASES.find((c) => c.id === m[1]) ?? null : null
}

// Un clic normal abre el lector sin recargar; con modificadores (nueva
// pestaña, ventana…) el navegador sigue el enlace a la página del caso.
const isPlainClick = (e) => e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey

gsap.registerPlugin(ScrollTrigger)

/* =========================================================
   PASADA 02 — LAS SEPARACIONES
   Cada caso es una separación de la misma tirada: se puede
   aislar y mirar sola. La franja de tinta al pie de la
   portada dice de qué plancha viene.
   ========================================================= */

const hasMedia = (c) => Boolean(c.media?.video || c.media?.cover || c.media?.images?.length)

// Los casos con material visual abren la grid; los que sólo tienen texto cierran.
const ORDERED = [...CASES].sort((a, b) => Number(hasMedia(b)) - Number(hasMedia(a)))

const coverOf = (c) => c.media?.cover ?? c.media?.images?.[0] ?? null

// Nombra el material en vez de contar "piezas": el lector sabe qué va a encontrar.
const mediaSummary = (media = {}) => {
  const videos = (media.video ? 1 : 0) + (media.extraVideos?.length ?? 0)
  const images = media.images?.length ?? 0
  const parts = []
  if (videos) parts.push(`${videos} ${videos === 1 ? t('vídeo', 'video') : t('vídeos', 'videos')}`)
  if (images) parts.push(`${images} ${images === 1 ? t('imagen', 'image') : t('imágenes', 'images')}`)
  return parts.join(' · ')
}

function CaseCard({ caseData, onOpen }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const video = caseData.media?.video
  const cover = coverOf(caseData)
  const summary = mediaSummary(caseData.media)
  const plainTitle = caseData.title.replace(/\n/g, ' ')

  const handleEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
      setPlaying(true)
    }
  }

  const handleLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      setPlaying(false)
    }
  }

  return (
    // Un enlace de verdad a la página del caso, no un botón: se puede abrir
    // en otra pestaña, copiar y compartir, y los buscadores lo siguen.
    <a
      href={casePath(LANG, caseData.slug)}
      onClick={(e) => { if (isPlainClick(e)) { e.preventDefault(); onOpen(caseData) } }}
      className="case-card"
      aria-label={t(`Leer el caso de estudio de ${caseData.tag}: ${plainTitle}`, `Read the ${caseData.tag} case study: ${plainTitle}`)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ '--case-ink': caseData.color }}
    >
      {/* Portada — vídeo, imagen o rótulo de plancha */}
      <div className="case-card__cover">
        {video ? (
          <video
            ref={videoRef}
            src={`${video}#t=0.1`}
            poster={VIDEO_META[video]?.poster}
            muted
            loop
            playsInline
            preload="metadata"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : cover ? (
          <img
            src={cover}
            alt=""
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div className="case-card__plate">
            <span className="t-num" style={{ color: caseData.color }}>{caseData.num}</span>
            <span className="case-card__plate-name">{caseData.tag}</span>
          </div>
        )}

        {video && (
          <div
            className="case-card__scrim"
            style={{ background: playing ? 'transparent' : 'rgba(20, 21, 15, 0.42)' }}
          >
            {!playing && (
              <span className="case-card__play">
                <svg width="16" height="18" viewBox="0 0 18 20" fill="none" aria-hidden="true">
                  <path d="M1 1L17 10L1 19V1Z" fill="var(--ink-white)" />
                </svg>
              </span>
            )}
          </div>
        )}

        {/* La tinta de la que viene esta separación */}
        <div className="case-card__ink" aria-hidden="true" />
      </div>

      {/* Ficha */}
      <div className="case-card__body">
        {/* La portada de plancha ya lleva el rótulo — no lo repetimos */}
        <span className="t-label" style={{ color: 'var(--on-press-low)' }}>
          {video || cover ? caseData.tag : caseData.category}
        </span>

        <h3 className="t-h3" style={{ whiteSpace: 'pre-line', color: 'var(--on-press)' }}>
          {caseData.title}
        </h3>

        <p className="t-small" style={{ color: 'var(--on-press-mid)' }}>
          {caseData.subtitle}
        </p>

        <div className="case-card__foot">
          <span aria-hidden="true" className="t-label case-card__cta">{t('Leer el caso', 'Read the case')} →</span>
          {summary && <span className="t-label" style={{ color: 'var(--on-press-low)' }}>{summary}</span>}
        </div>
      </div>
    </a>
  )
}

export default function CaseStudiesGrid() {
  const [openCase, setOpenCase] = useState(null)
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      appear('.case-card',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 82%', toggleActions: 'play none none reverse' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Abrir un caso desde la portada lleva la URL a la de su página
  // (/casos/<slug>/): lo que se copia o comparte es la página indexable, y el
  // botón Atrás del navegador cierra el lector.
  useEffect(() => {
    const initial = caseFromLocation()
    if (initial) history.replaceState(null, '', casePath(LANG, initial.slug))
    setOpenCase(initial)
    const sync = () => setOpenCase(caseFromLocation())
    window.addEventListener('popstate', sync)
    window.addEventListener('hashchange', sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener('hashchange', sync)
    }
  }, [])

  // El título de la pestaña acompaña al caso abierto.
  const homeTitle = useRef(typeof document !== 'undefined' ? document.title : '')
  useEffect(() => {
    document.title = openCase
      ? `${openCase.tag} — ${openCase.title.replace(/\s*\n\s*/g, ' ')} · Ricard Boixeda`
      : homeTitle.current
  }, [openCase])

  const openCaseAt = (c) => {
    history.pushState({ fromGrid: true }, '', casePath(LANG, c.slug))
    setOpenCase(c)
  }

  // Si el lector se abrió desde la grid, cerrar es volver atrás; si se llegó
  // con el enlace ya puesto, no hay a dónde volver y se reescribe la URL.
  const closeCase = () => {
    if (history.state?.fromGrid) history.back()
    else {
      history.replaceState(null, '', HOME)
      setOpenCase(null)
    }
  }

  const contactFromCase = () => {
    history.replaceState(null, '', `${HOME}#contact`)
    setOpenCase(null)
  }

  return (
    <section ref={sectionRef} id="projects" className="relative pb-20 md:pb-28">
      <div className="mx-auto w-full px-6 md:px-12 lg:px-16" style={{ maxWidth: '1400px' }}>
        <PassOpen
          pass={2}
          ink="var(--ink-magenta-t)"
          title={COPY[LANG].cases.title}
          sub={COPY[LANG].cases.sub}
        />

        <div ref={gridRef} className="case-grid mt-10">
          {ORDERED.map((c) => (
            <CaseCard key={c.id} caseData={c} onOpen={openCaseAt} />
          ))}
        </div>

        <ContactCta {...COPY[LANG].cta.cases} />
      </div>

      <CaseStudyModal caseData={openCase} onClose={closeCase} onContact={contactFromCase} />

      <style>{`
        .case-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 28px;
        }

        .case-card {
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          cursor: pointer;
          background: var(--sheet);
          border: var(--hairline-p);
          transition: border-color var(--dur-base) var(--ease-snap),
                      transform var(--dur-base) var(--ease-snap);
        }

        .case-card:hover,
        .case-card:focus-visible {
          border-color: var(--case-ink);
          transform: translateY(-3px);
        }

        .case-card__cover {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: var(--press-raise);
        }

        .case-card__plate {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 20px;
          background: var(--sheet-soft);
          border-bottom: var(--hairline);
        }

        .case-card__plate-name {
          font-weight: 800;
          font-size: var(--t-h2);
          line-height: var(--lh-tight);
          letter-spacing: var(--tr-tight);
          font-variation-settings: 'wdth' 112;
          color: var(--ink-key);
        }

        .case-card__scrim {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          transition: background var(--dur-base);
        }

        .case-card__play {
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--ink-white);
        }

        .case-card__ink {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 4px;
          background: var(--case-ink);
        }

        /* La etiqueta de categoría puede ir a dos líneas: se le da aire. */
        .case-card__body .t-label { line-height: 1.45; }

        .case-card__body {
          display: flex;
          flex: 1;
          flex-direction: column;
          gap: 10px;
          padding: 20px;
        }

        .case-card__foot {
          margin-top: auto;
          padding-top: 14px;
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          justify-content: space-between;
          gap: 6px 12px;
        }

        .case-card__cta {
          color: var(--on-press-low);
          transition: color var(--dur-quick);
        }
        .case-card:hover .case-card__cta,
        .case-card:focus-visible .case-card__cta { color: var(--on-press); }
      `}</style>
    </section>
  )
}
