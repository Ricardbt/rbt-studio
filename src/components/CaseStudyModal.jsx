import { useEffect, useRef } from 'react'

export default function CaseStudyModal({ caseData, videoSrc, extraVideos, images, onClose }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    if (!caseData) return
    document.body.style.overflow = 'hidden'
    if (scrollRef.current) scrollRef.current.scrollTop = 0
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [caseData, onClose])

  if (!caseData) return null

  const c = caseData

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        backgroundColor: 'rgba(20,20,15,0.6)',
        display: 'flex', alignItems: 'stretch', justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        ref={scrollRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '60vw',
          backgroundColor: 'var(--rbt-cream)',
          overflowY: 'auto',
          borderLeft: '1px solid var(--rbt-ink-line)',
        }}
      >
        {/* Sticky top bar */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 10,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '16px 40px',
          backgroundColor: 'var(--rbt-cream)',
          borderBottom: '1px solid var(--rbt-ink-line)',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-label)', color: 'var(--rbt-ink-mute)', letterSpacing: 'var(--tr-label)', textTransform: 'uppercase' }}>
            {c.num} · {c.tag}
          </span>
          <button
            onClick={onClose}
            className="btn btn--ghost btn--sm"
            style={{ letterSpacing: '0.1em' }}
          >✕</button>
        </div>

        {/* Content */}
        <div style={{ padding: '48px 40px 80px' }}>

          {/* Hero */}
          <div style={{ marginBottom: '40px', paddingBottom: '40px', borderBottom: '1px solid var(--rbt-ink-line)' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-label)', color: '#15C1C1', letterSpacing: 'var(--tr-label)', textTransform: 'uppercase', marginBottom: '16px' }}>
              {c.category}
            </p>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'var(--t-h1)', color: 'var(--rbt-ink)', lineHeight: 'var(--lh-snug)', letterSpacing: 'var(--tr-tight)', marginBottom: '10px', whiteSpace: 'pre-line' }}>
              {c.title}
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--t-body)', color: 'var(--rbt-ink-mute)', marginBottom: '20px' }}>{c.subtitle}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {c.tech.map(t => (
                <span key={t} className="tag tag--ghost">{t}</span>
              ))}
            </div>
          </div>

          {/* Videos */}
          {videoSrc && (
            <div style={{ marginBottom: '40px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-label)', color: 'var(--rbt-ink-mute)', letterSpacing: 'var(--tr-label)', textTransform: 'uppercase', marginBottom: '12px' }}>Demo</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[videoSrc, ...(extraVideos || [])].map((src, i) => (
                  <video
                    key={i}
                    src={src}
                    controls
                    autoPlay={i === 0}
                    muted
                    loop
                    playsInline
                    style={{
                      width: '100%', display: 'block',
                      border: '1px solid var(--rbt-ink-line)',
                      backgroundColor: '#0D1414',
                      maxHeight: '320px', objectFit: 'contain',
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Images from the live site */}
          {images?.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-label)', color: 'var(--rbt-ink-mute)', letterSpacing: 'var(--tr-label)', textTransform: 'uppercase', marginBottom: '12px' }}>Del sitio</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    loading="lazy"
                    style={{
                      width: '100%', display: 'block',
                      border: '1px solid var(--rbt-ink-line)',
                      backgroundColor: 'var(--rbt-paper)',
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Body + meta */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px', paddingBottom: '40px', borderBottom: '1px solid var(--rbt-ink-line)' }} className="csm-body-grid">
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--t-body)', color: 'var(--rbt-ink-soft)', lineHeight: 'var(--lh-body)' }}>{c.body}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {c.right.map(r => (
                <div key={r.label} style={{ borderTop: '1px solid var(--rbt-ink-line)', paddingTop: '16px' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-label)', color: 'var(--rbt-ink-mute)', letterSpacing: 'var(--tr-label)', textTransform: 'uppercase', marginBottom: '6px' }}>{r.label.replace('//', '').trim()}</p>
                  {r.valueHtml
                    ? <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--t-small)', color: 'var(--rbt-ink-soft)', lineHeight: 'var(--lh-body)' }}
                        dangerouslySetInnerHTML={{ __html: r.valueHtml }} />
                    : <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--t-small)', color: 'var(--rbt-ink-soft)', lineHeight: 'var(--lh-body)' }}>{r.value}</p>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Problem / Solution */}
          <div style={{ marginBottom: '40px' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-label)', color: 'var(--rbt-ink-mute)', letterSpacing: 'var(--tr-label)', textTransform: 'uppercase', marginBottom: '16px' }}>Análisis</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--rbt-ink-line)' }} className="csm-ps-grid">
              {[{ label: 'Problema', ...c.problem }, { label: 'Solución', ...c.solution }].map(b => (
                <div key={b.label} style={{ background: 'var(--rbt-paper)', padding: '24px' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-label)', color: '#15C1C1', letterSpacing: 'var(--tr-label)', textTransform: 'uppercase', marginBottom: '10px' }}>{b.label}</p>
                  <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'var(--t-h4)', color: 'var(--rbt-ink)', lineHeight: 'var(--lh-snug)', marginBottom: '10px' }}>{b.title}</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--t-small)', color: 'var(--rbt-ink-soft)', lineHeight: 'var(--lh-body)' }}>{b.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline */}
          <div style={{ border: '1px solid var(--rbt-ink-line)', marginBottom: '40px', overflow: 'hidden' }}>
            <div style={{ padding: '8px 16px', background: 'var(--rbt-paper)', borderBottom: '1px solid var(--rbt-ink-line)', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-label)', color: 'var(--rbt-ink-mute)', letterSpacing: 'var(--tr-label)', textTransform: 'uppercase' }}>
              Pipeline
            </div>
            <div style={{ padding: '16px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px', rowGap: '8px', background: 'var(--rbt-cream)' }}>
              {c.pipeline.nodes.map((node, i) => (
                <span key={i} style={{ display: 'contents' }}>
                  <span style={{
                    padding: '4px 10px',
                    border: '1px solid var(--rbt-ink-line)',
                    fontFamily: 'var(--font-mono)', fontSize: '11px',
                    color: node.accent ? 'var(--rbt-teal)' : 'var(--rbt-ink-soft)',
                    backgroundColor: node.accent ? 'var(--rbt-teal-mist)' : 'transparent',
                    fontWeight: node.accent ? 500 : 400,
                    whiteSpace: 'nowrap',
                  }}>{node.label}</span>
                  {i < c.pipeline.nodes.length - 1 && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--rbt-ink-line)' }}>→</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'var(--rbt-ink-line)', marginBottom: '40px' }} className="csm-metrics-grid">
            {c.metrics.map(m => (
              <div key={m.val} style={{ background: 'var(--rbt-paper)', padding: '24px 20px' }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'var(--t-h2)', color: 'var(--rbt-teal)', lineHeight: 1, letterSpacing: 'var(--tr-tight)', marginBottom: '6px' }}>{m.val}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-label)', color: 'var(--rbt-ink-mute)', lineHeight: 1.5 }}>{m.label}</div>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div className="alert alert--ok" style={{ marginBottom: '40px' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontStyle: 'italic', fontSize: 'var(--t-body)', color: 'var(--rbt-ink)', lineHeight: 'var(--lh-body)', marginBottom: '6px' }}>{c.quote.text}</p>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-label)', color: 'var(--rbt-ink-mute)', letterSpacing: '0.08em' }}>{c.quote.attr.replace('//', '').trim()}</span>
          </div>

          {/* Learnings */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-label)', color: 'var(--rbt-ink-mute)', letterSpacing: 'var(--tr-label)', textTransform: 'uppercase', marginBottom: '4px' }}>Learnings</p>
            {c.learnings.map(l => (
              <div key={l.n} style={{ display: 'flex', gap: '16px', padding: '14px 0', borderBottom: '1px solid var(--rbt-cream-deep)', fontSize: 'var(--t-small)', color: 'var(--rbt-ink-soft)', lineHeight: 'var(--lh-body)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-label)', color: 'var(--rbt-ink-mute)', flexShrink: 0, paddingTop: '3px' }}>{l.n}</span>
                <span dangerouslySetInnerHTML={{ __html: l.text }} />
              </div>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .csm-body-grid, .csm-ps-grid { grid-template-columns: 1fr !important; }
          .csm-metrics-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .csm-metrics-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
