import { useEffect, useRef } from 'react'

/* Lector de caso de estudio.
   Sigue el arco de la skill `case-study-builder`:
   header → F.01 contexto → F.02 proceso → F.03 solución → F.04 resultados
   → F.05 aprendizajes → CTA.
   Los "frames" numerados vienen de la plantilla de la skill: el orden importa,
   así que se enseña. Las secciones sin datos simplemente no se pintan. */

const normalizeImages = (images = []) =>
  images.map(i => (typeof i === 'string' ? { src: i } : i))

function Frame({ n, kind, title, children }) {
  return (
    <section className="csm-frame">
      <span className="csm-frame-num">{n} — {kind}</span>
      {title && <h3 className="csm-frame-title">{title}</h3>}
      {children}
    </section>
  )
}

function Figure({ src, alt, caption }) {
  return (
    <figure className="csm-figure">
      {/* El alt describe la imagen; el pie añade el porqué. No se duplican. */}
      <img src={src} alt={alt || caption || ''} loading="lazy" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

export default function CaseStudyModal({ caseData, onClose }) {
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

  const c        = caseData
  const media    = c.media || {}
  const videos   = [media.video, ...(media.extraVideos || [])].filter(Boolean)
  const images   = normalizeImages(media.images)
  const context  = c.context?.body ?? c.body
  const ctxTitle = c.context?.title

  // El material se reparte: la primera mitad ilustra la solución, el resto cierra.
  const split      = images.length > 4 ? Math.ceil(images.length / 2) : images.length
  const solImages  = images.slice(0, split)
  const restImages = images.slice(split)

  let frame = 0
  const next = () => `F.${String(++frame).padStart(2, '0')}`

  return (
    <div className="csm-scrim" onClick={onClose}>
      <div
        className="csm-panel"
        ref={scrollRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="csm-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >

        {/* Barra fija */}
        <div className="csm-bar">
          <span className="csm-bar-id">
            <span className="csm-dot" style={{ backgroundColor: c.color }} />
            {c.num} · {c.tag}
          </span>
          <button onClick={onClose} className="csm-close" aria-label={`Cerrar el caso de estudio de ${c.tag}`}>
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className="csm-body">

          {/* ── Header ── */}
          <header className="csm-header">
            <p className="csm-eyebrow">{c.category}</p>
            <h2 className="csm-title" id="csm-title">{c.title}</h2>
            <p className="csm-tagline">{c.subtitle}</p>

            {(c.client || c.role || c.timeline) && (
              <dl className="csm-meta">
                {c.client   && <div><dt>Cliente</dt><dd>{c.client}</dd></div>}
                {c.role     && <div><dt>Mi rol</dt><dd>{c.role}</dd></div>}
                {c.timeline && <div><dt>Periodo</dt><dd>{c.timeline}</dd></div>}
              </dl>
            )}

            {c.tech?.length > 0 && (
              <>
                <p className="csm-tags-label">Stack</p>
                <div className="csm-tags">
                  {c.tech.map(t => <span key={t} className="csm-tag">{t}</span>)}
                </div>
              </>
            )}
          </header>

          {/* Demo en vídeo — lo primero que se quiere ver */}
          {videos.length > 0 && (
            <div className="csm-videos">
              <p className="csm-videos-label">
                {videos.length === 1 ? 'Demo en vídeo' : `Demo en vídeo · ${videos.length} clips`}
              </p>
              {videos.map((src, i) => (
                <video
                  key={i}
                  src={src}
                  controls
                  autoPlay={i === 0}
                  muted
                  loop
                  playsInline
                  aria-label={
                    videos.length === 1
                      ? `Demo de ${c.tag}`
                      : `Demo de ${c.tag}, clip ${i + 1} de ${videos.length}`
                  }
                />
              ))}
            </div>
          )}

          {/* ── F.01 Contexto / Problema ── */}
          {(context || c.problem) && (
            <Frame n={next()} kind="CONTEXTO" title={ctxTitle || c.problem?.title}>
              {context && <p>{context}</p>}
              {c.problem && (
                <div className="csm-problem">
                  <p className="csm-problem-label">El problema</p>
                  <p className="csm-problem-title">{c.problem.title}</p>
                  <p>{c.problem.body}</p>
                </div>
              )}
            </Frame>
          )}

          {/* ── F.02 Proceso ── */}
          {(c.process?.length > 0 || c.pipeline) && (
            <Frame n={next()} kind="PROCESO" title={c.process?.length ? 'Cómo se abordó' : null}>
              {c.process?.map((step, i) => (
                <div key={i} className="csm-step">
                  <span className="csm-step-n">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.body}</p>
                  </div>
                </div>
              ))}

              {c.pipeline && (
                <div className="csm-pipeline">
                  <div className="csm-pipeline-head">{c.pipeline.title?.replace('//', '').trim() || 'Pipeline'}</div>
                  <div className="csm-pipeline-body">
                    {c.pipeline.nodes.map((node, i) => (
                      <span key={i} className="csm-node-wrap">
                        <span className={`csm-node${node.accent ? ' csm-node--accent' : ''}`}>{node.label}</span>
                        {i < c.pipeline.nodes.length - 1 && <span className="csm-arrow">→</span>}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Frame>
          )}

          {/* ── F.03 Solución ── */}
          {(c.solution || solImages.length > 0) && (
            <Frame n={next()} kind="SOLUCIÓN" title={c.solution?.title}>
              {c.solution && <p>{c.solution.body}</p>}
              {solImages.length > 0 && (
                <div className={`csm-gallery${solImages.length > 2 ? ' csm-gallery--grid' : ''}`}>
                  {solImages.map((img, i) => <Figure key={i} {...img} />)}
                </div>
              )}

              {/* Decisiones y contexto de producto que no caben en la narrativa */}
              {c.right?.length > 0 && (
                <div className="csm-notes">
                  {c.right.map(r => (
                    <div key={r.label}>
                      <p className="csm-note-label">{r.label.replace('//', '').trim()}</p>
                      {r.valueHtml
                        ? <div className="csm-note-body" dangerouslySetInnerHTML={{ __html: r.valueHtml }} />
                        : <p className="csm-note-body">{r.value}</p>}
                    </div>
                  ))}
                </div>
              )}
            </Frame>
          )}

          {/* ── F.04 Resultados ── */}
          {(c.resultsBody || c.metrics?.length > 0) && (
            <Frame n={next()} kind="RESULTADOS" title="Qué se puede afirmar hoy">
              {c.resultsBody && <p>{c.resultsBody}</p>}
              {c.metrics?.length > 0 && (
                <div className="csm-metrics">
                  {c.metrics.map(m => (
                    <div key={m.val} className="csm-metric">
                      <span className="csm-metric-val">{m.val}</span>
                      <span className="csm-metric-label">{m.label}</span>
                    </div>
                  ))}
                </div>
              )}
              {restImages.length > 0 && (
                <div className="csm-gallery csm-gallery--grid">
                  {restImages.map((img, i) => <Figure key={i} {...img} />)}
                </div>
              )}
            </Frame>
          )}

          {/* ── F.05 Aprendizajes ── */}
          {(c.learnings?.length > 0 || c.quote) && (
            <Frame n={next()} kind="APRENDIZAJES" title="Qué se aprendió">
              {c.quote && (
                <blockquote className="csm-quote">
                  <p>{c.quote.text}</p>
                  <cite>{c.quote.attr.replace('//', '').trim()}</cite>
                </blockquote>
              )}
              {c.learnings?.map(l => (
                <div key={l.n} className="csm-learning">
                  <span className="csm-learning-n">{l.n}</span>
                  <span dangerouslySetInnerHTML={{ __html: l.text }} />
                </div>
              ))}
            </Frame>
          )}

          {/* ── CTA ── */}
          <div className="csm-cta">
            <span className="csm-cta-mark">RBT Studio — Experience Engineering</span>
            {c.cta?.note && <p className="csm-cta-note">{c.cta.note}</p>}
            <div className="csm-cta-links">
              {c.link && (
                <a href={c.link.href} target="_blank" rel="noopener noreferrer">
                  {c.link.label} <span aria-hidden="true">↗</span>
                  <span className="csm-sr">se abre en una pestaña nueva</span>
                </a>
              )}
              {c.cta?.href && (
                <a href={c.cta.href}>{c.cta.label || 'Escríbeme'} <span aria-hidden="true">→</span></a>
              )}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .csm-scrim {
          position: fixed; inset: 0; z-index: 2000;
          background: rgba(20,20,15,0.6);
          display: flex; align-items: stretch; justify-content: flex-end;
        }
        .csm-panel {
          width: 62vw; max-width: 900px;
          background: var(--sheet);
          overflow-y: auto; -webkit-overflow-scrolling: touch;
          border-left: 1px solid var(--sheet-line);
        }

        /* Barra */
        .csm-bar {
          position: sticky; top: 0; z-index: 10;
          display: flex; justify-content: space-between; align-items: center;
          gap: 16px; padding: 14px 40px;
          background: var(--sheet);
          border-bottom: 1px solid var(--sheet-line);
        }
        .csm-bar-id {
          display: flex; align-items: center; gap: 10px;
          font-family: var(--font-mono); font-size: var(--t-label);
          letter-spacing: var(--tr-label); text-transform: uppercase;
          color: var(--on-sheet-low);
        }
        .csm-dot { width: 8px; height: 8px; flex: 0 0 auto; }
        .csm-close {
          flex: 0 0 auto;
          width: 34px; height: 34px; cursor: pointer;
          background: transparent; border: 1px solid var(--sheet-line);
          color: var(--on-sheet); font-size: var(--t-small); line-height: 1;
          transition: background 200ms, color 200ms;
        }
        .csm-close:hover { background: var(--ink-key); color: var(--sheet); }

        .csm-body { padding: 44px 40px 0; }

        /* Header */
        .csm-header { padding-bottom: 32px; border-bottom: 1px solid var(--sheet-line); }
        .csm-eyebrow {
          font-family: var(--font-mono); font-size: var(--t-label);
          letter-spacing: var(--tr-label); text-transform: uppercase;
          color: var(--ink-magenta-d); margin-bottom: 14px;
        }
        .csm-title {
          font-family: var(--font-sans); font-weight: 800; font-size: var(--t-h1);
          color: var(--on-sheet); line-height: var(--lh-snug);
          letter-spacing: var(--tr-tight); white-space: pre-line; margin-bottom: 10px;
        }
        .csm-tagline {
          font-family: var(--font-sans); font-size: var(--t-body);
          color: var(--on-sheet-low); line-height: var(--lh-body); margin-bottom: 24px;
        }
        .csm-meta {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
          gap: 16px; margin-bottom: 22px;
        }
        .csm-meta dt {
          font-family: var(--font-mono); font-size: var(--t-label);
          letter-spacing: var(--tr-label); text-transform: uppercase;
          color: var(--on-sheet-low); margin-bottom: 5px;
        }
        .csm-meta dd {
          font-family: var(--font-sans); font-size: var(--t-small);
          color: var(--on-sheet-mid); line-height: var(--lh-body); margin: 0;
        }
        .csm-tags-label, .csm-videos-label {
          font-family: var(--font-mono); font-size: var(--t-label);
          letter-spacing: var(--tr-label); text-transform: uppercase;
          color: var(--on-sheet-low); margin-bottom: 10px;
        }
        .csm-tags { display: flex; flex-wrap: wrap; gap: 6px; }

        /* Texto solo para lectores de pantalla */
        .csm-sr {
          position: absolute; width: 1px; height: 1px;
          padding: 0; margin: -1px; overflow: hidden;
          clip: rect(0 0 0 0); white-space: nowrap; border: 0;
        }
        .csm-tag {
          font-family: var(--font-mono); font-size: var(--t-label);
          color: var(--on-sheet-low); border: 1px solid var(--sheet-line);
          padding: 3px 8px;
        }

        /* Vídeos */
        .csm-videos { display: flex; flex-direction: column; gap: 10px; padding: 28px 0 0; }
        .csm-videos-label { margin-bottom: 2px; }
        .csm-videos video {
          width: 100%; display: block; max-height: 360px; object-fit: contain;
          border: 1px solid var(--sheet-line); background: var(--press-deep);
        }

        /* Frames */
        .csm-frame {
          position: relative;
          padding: 32px 0 32px 26px;
          border-left: 1px solid var(--sheet-line);
          border-top: 1px solid var(--sheet-line);
        }
        .csm-frame:first-of-type { border-top: none; }
        .csm-frame-num {
          display: inline-block;
          font-family: var(--font-mono); font-size: var(--t-label);
          letter-spacing: var(--tr-label); color: var(--ink-magenta-d);
          margin-bottom: 12px;
        }
        .csm-frame-title {
          font-family: var(--font-sans); font-weight: 700; font-size: var(--t-h3);
          color: var(--on-sheet); line-height: var(--lh-snug); margin-bottom: 14px;
        }
        .csm-frame p {
          font-family: var(--font-sans); font-size: var(--t-body);
          color: var(--on-sheet-mid); line-height: var(--lh-body); margin-bottom: 14px;
        }

        /* Problema dentro del contexto — marco completo a 1px, nunca barra lateral */
        .csm-problem {
          border: 1px solid var(--sheet-line);
          background: var(--sheet-soft);
          padding: 18px; margin-top: 22px;
        }
        .csm-problem-label {
          font-family: var(--font-mono) !important; font-size: var(--t-label) !important;
          letter-spacing: var(--tr-label); text-transform: uppercase;
          color: var(--ink-magenta-d) !important; margin-bottom: 6px !important;
        }
        .csm-problem-title {
          font-weight: 700; color: var(--on-sheet) !important; margin-bottom: 8px !important;
        }

        /* Pasos del proceso */
        .csm-step { display: flex; gap: 16px; padding: 14px 0; }
        .csm-step + .csm-step { border-top: 1px solid var(--sheet-deep); }
        .csm-step-n {
          flex: 0 0 auto; padding-top: 3px;
          font-family: var(--font-mono); font-size: var(--t-label);
          color: var(--on-sheet-low);
        }
        .csm-step h4 {
          font-family: var(--font-sans); font-weight: 700; font-size: var(--t-h4);
          color: var(--on-sheet); line-height: var(--lh-snug); margin-bottom: 6px;
        }
        .csm-step p { margin-bottom: 0 !important; font-size: var(--t-small) !important; }

        /* Pipeline */
        .csm-pipeline { border: 1px solid var(--sheet-line); margin-top: 22px; overflow: hidden; }
        .csm-pipeline-head {
          padding: 8px 14px; background: var(--sheet-soft);
          border-bottom: 1px solid var(--sheet-line);
          font-family: var(--font-mono); font-size: var(--t-label);
          letter-spacing: var(--tr-label); text-transform: uppercase;
          color: var(--on-sheet-low);
        }
        .csm-pipeline-body {
          padding: 14px; display: flex; flex-wrap: wrap; align-items: center;
          gap: 6px; row-gap: 8px;
        }
        .csm-node-wrap { display: contents; }
        .csm-node {
          padding: 4px 10px; border: 1px solid var(--sheet-line);
          font-family: var(--font-mono); font-size: 11px;
          color: var(--on-sheet-mid); white-space: nowrap;
        }
        .csm-node--accent {
          color: var(--ink-key); background: var(--sheet-deep); font-weight: 500;
        }
        .csm-arrow { font-family: var(--font-mono); font-size: var(--t-micro); color: var(--sheet-line); }

        /* Galería */
        .csm-gallery { display: flex; flex-direction: column; gap: 18px; margin-top: 22px; }
        .csm-gallery--grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
          gap: 18px;
        }
        .csm-figure { margin: 0; }
        .csm-figure img {
          width: 100%; display: block;
          border: 1px solid var(--sheet-line); background: var(--sheet-soft);
        }
        .csm-gallery--grid .csm-figure img { aspect-ratio: 4/3; object-fit: cover; }
        .csm-figure figcaption {
          font-family: var(--font-mono); font-size: var(--t-label); line-height: 1.5;
          color: var(--on-sheet-low); margin-top: 7px;
        }

        /* Notas de producto */
        .csm-notes {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 20px; margin-top: 26px;
        }
        .csm-notes > div { border-top: 1px solid var(--sheet-line); padding-top: 14px; }
        .csm-note-label {
          font-family: var(--font-mono) !important; font-size: var(--t-label) !important;
          letter-spacing: var(--tr-label); text-transform: uppercase;
          color: var(--on-sheet-low) !important; margin-bottom: 6px !important;
        }
        .csm-note-body {
          font-size: var(--t-small) !important; color: var(--on-sheet-mid);
          line-height: var(--lh-body); margin-bottom: 0 !important;
        }

        /* Métricas */
        .csm-metrics {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: var(--sheet-line); margin-top: 22px;
        }
        .csm-metric { background: var(--sheet-soft); padding: 20px 18px; }
        .csm-metric-val {
          display: block;
          font-family: var(--font-sans); font-weight: 800; font-size: var(--t-h2);
          color: var(--ink-magenta-d); line-height: 1;
          letter-spacing: var(--tr-tight); margin-bottom: 6px;
        }
        .csm-metric-label {
          font-family: var(--font-mono); font-size: var(--t-label);
          color: var(--on-sheet-low); line-height: 1.5;
        }

        /* Cita */
        .csm-quote {
          border: 1px solid var(--sheet-line);
          background: var(--sheet-soft);
          padding: 18px; margin: 0 0 22px;
        }
        .csm-quote p {
          font-style: italic; color: var(--on-sheet) !important; margin-bottom: 6px !important;
        }
        .csm-quote cite {
          font-family: var(--font-mono); font-size: var(--t-label);
          font-style: normal; letter-spacing: 0.08em; color: var(--on-sheet-low);
        }

        /* Aprendizajes */
        .csm-learning {
          display: flex; gap: 16px; padding: 14px 0;
          border-bottom: 1px solid var(--sheet-deep);
          font-family: var(--font-sans); font-size: var(--t-small);
          color: var(--on-sheet-mid); line-height: var(--lh-body);
        }
        .csm-learning-n {
          flex: 0 0 auto; padding-top: 3px;
          font-family: var(--font-mono); font-size: var(--t-label); color: var(--on-sheet-low);
        }

        /* CTA */
        .csm-cta {
          margin-top: 40px; padding: 28px 0 56px;
          border-top: 1px solid var(--sheet-line);
        }
        .csm-cta-mark {
          font-family: var(--font-mono); font-size: var(--t-label);
          letter-spacing: var(--tr-label); text-transform: uppercase;
          color: var(--on-sheet-low);
        }
        .csm-cta-note {
          font-family: var(--font-sans); font-size: var(--t-small);
          color: var(--on-sheet-mid); line-height: var(--lh-body); margin-top: 10px;
        }
        .csm-cta-links { display: flex; flex-wrap: wrap; gap: 18px; margin-top: 14px; }
        .csm-cta-links a {
          font-family: var(--font-mono); font-size: var(--t-small);
          color: var(--ink-magenta-d); text-decoration: none;
          border-bottom: 1px solid var(--ink-magenta-d); padding-bottom: 2px;
        }

        /* ── Tablet ── */
        @media (max-width: 1024px) {
          .csm-panel { width: 82vw; max-width: none; }
        }

        /* ── Móvil: hoja completa, no cajón lateral ── */
        @media (max-width: 760px) {
          .csm-scrim { align-items: flex-end; }
          .csm-panel {
            width: 100vw; max-width: none;
            height: 100%;
            border-left: none;
            overscroll-behavior: contain;
          }
          .csm-bar { padding: 12px 18px; }
          .csm-close { width: 40px; height: 40px; font-size: 16px; }
          .csm-body { padding: 28px 18px 0; }

          .csm-frame { padding: 26px 0 26px 14px; }
          .csm-metrics { grid-template-columns: 1fr; }
          .csm-gallery--grid { grid-template-columns: 1fr 1fr; }
          .csm-notes { grid-template-columns: 1fr; }
          .csm-meta { grid-template-columns: 1fr; gap: 12px; }
          .csm-videos { padding: 20px 0; }
          .csm-videos video { max-height: 240px; }

          .csm-step { flex-direction: column; gap: 6px; }
          .csm-step-n { padding-top: 0; }

          /* El pipeline se desplaza en su propio carril en vez de romper la página */
          .csm-pipeline-body {
            flex-wrap: nowrap; overflow-x: auto;
            scrollbar-width: thin; -webkit-overflow-scrolling: touch;
          }
          .csm-node-wrap { display: contents; }
        }

        @media (max-width: 420px) {
          .csm-gallery--grid { grid-template-columns: 1fr; }
        }

        @media (prefers-reduced-motion: reduce) {
          .csm-panel { scroll-behavior: auto; }
        }
      `}</style>
    </div>
  )
}
