import { useRef, useState } from 'react'

export default function ProjectVideo({ src, title, client, tech, caseStudyId, extraVideos, caseImages, onOpenModal, onOpenCaseStudy }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
      setPlaying(true)
    }
  }

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      setPlaying(false)
    }
  }

  const handleClick = () => {
    if (onOpenModal) onOpenModal({ src, title, client, tech, type: 'video' })
  }

  return (
    <div
      className="project-thumbnail group cursor-pointer"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#FBF9F2',
        transition: 'all 240ms cubic-bezier(0.2, 0.7, 0.1, 1)',
      }}
      onMouseEnterCapture={(e) => {
        e.currentTarget.style.boxShadow = '4px 4px 0 #151C1C'
        e.currentTarget.style.transform = 'translate(-2px, -2px)'
      }}
      onMouseLeaveCapture={(e) => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'translate(0, 0)'
      }}
    >
      {/* Video preview */}
      <div style={{ aspectRatio: '16/10', overflow: 'hidden', backgroundColor: '#0D1414', position: 'relative' }}>
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />

        {/* Play overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: playing ? 'transparent' : 'rgba(13, 20, 20, 0.45)',
            transition: 'background 240ms',
            pointerEvents: 'none',
          }}
        >
          {!playing && (
            <div
              style={{
                width: '52px',
                height: '52px',
                border: '2px solid #F2EFE6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                <path d="M1 1L17 10L1 19V1Z" fill="#F2EFE6" />
              </svg>
            </div>
          )}
        </div>

        {/* Video badge */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: '#151C1C',
            color: '#F2EFE6',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '4px 8px',
          }}
        >
          VIDEO
        </div>
      </div>

      {/* Card info */}
      <div style={{ padding: '20px' }}>
        <h3 className="font-sans font-semibold text-[17px] mb-3" style={{ color: '#14140F', lineHeight: '1.3' }}>
          {client}
        </h3>
        <span className="font-mono text-[11px] tracking-[0.12em] uppercase" style={{ color: '#6E6E64' }}>
          {tech}
        </span>
        <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span className="font-mono text-[10px] tracking-[0.1em]" style={{ color: 'var(--rbt-signal)' }}>
            ▶ Demo
          </span>
          {caseStudyId && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (onOpenCaseStudy) onOpenCaseStudy(caseStudyId, src, extraVideos, caseImages)
              }}
              style={{
                background: 'none', border: '1px solid #C9C5B6', cursor: 'pointer',
                fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em',
                color: '#6E6E64', padding: '3px 8px',
                transition: 'border-color 200ms, color 200ms',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#14140F'; e.currentTarget.style.color = '#14140F' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#C9C5B6'; e.currentTarget.style.color = '#6E6E64' }}
            >
              Caso de estudio →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/* ---- Full-screen video modal ---- */
export function VideoModal({ item, onClose }) {
  if (!item) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--rbt-scrim)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
      }}
      onClick={onClose}
    >
      <div
        style={{ position: 'relative', width: '100%', maxWidth: '1100px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '-44px',
            right: 0,
            background: 'none',
            border: 'none',
            color: '#F2EFE6',
            fontSize: '28px',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>

        <video
          src={item.src}
          controls
          autoPlay
          style={{
            width: '100%',
            maxHeight: '80vh',
            display: 'block',
            border: '1px solid #151C1C',
            backgroundColor: '#0D1414',
          }}
        />

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h2 className="font-sans text-3xl font-semibold mb-1" style={{ color: '#F2EFE6' }}>
              {item.title}
            </h2>
            <span className="font-mono text-[12px] tracking-[0.1em] uppercase" style={{ color: 'var(--rbt-signal)' }}>
              {item.tech}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
