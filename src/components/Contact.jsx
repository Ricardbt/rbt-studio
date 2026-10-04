import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { appear } from '../lib/motion'
import { PassOpen } from './Press'
import { COPY } from '../data/copy'
import { LANG } from '../i18n'

const T = COPY[LANG].contact

gsap.registerPlugin(ScrollTrigger)

const email = 'contact@rbt-studio.com'

/* =========================================================
   PASADA 06 — LA CUARTA TINTA
   Contactar es la última pasada de la hoja. La tinta no ocupa
   un plano: es el filete de magenta que abre el bloque y el
   color del correo al pasar por encima.
   ========================================================= */

export default function Contact() {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)

  const onSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') || '').trim()
    const body = String(data.get('message') || '').trim()
    const from = String(data.get('email') || '').trim()
    const subject = name ? `${T.subject} — ${name}` : T.subject
    const lines = [body, '', from && `${T.replyTo}: ${from}`].filter(Boolean).join('\n')
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines)}`
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      appear(cardRef.current,
        { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
        {
          opacity: 1,
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 78%', toggleActions: 'play none none reverse' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="relative pb-20 md:pb-28">
      <div className="mx-auto w-full px-6 md:px-12 lg:px-16" style={{ maxWidth: 'var(--container)' }}>
        <PassOpen
          pass={6}
          ink="var(--ink-magenta-t)"
          title={T.title}
          sub={T.sub}
        />

        <div
          ref={cardRef}
          className="mt-10 grid grid-cols-1 md:grid-cols-2"
          style={{ opacity: 0, borderTop: '2px solid var(--ink-magenta)' }}
        >
          {/* La cuarta tinta ya no ocupa un plano: es el filete que
              abre el bloque. El correo va impreso en negro, como el
              resto del pliego. */}
          <div className="p-7 md:py-10 md:pl-0 md:pr-12">
            <span className="t-label" style={{ color: 'var(--on-press-low)' }}>{T.email}</span>
            <a
              href={`mailto:${email}`}
              className="mt-5 block transition-colors"
              style={{
                fontWeight: 800,
                fontVariationSettings: "'wdth' 108",
                fontSize: 'var(--t-h2)',
                lineHeight: 1.1,
                wordBreak: 'break-word',
                color: 'var(--ink-key)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink-magenta-t)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-key)')}
            >
              {email}
            </a>

            <div
              className="mt-6 flex flex-wrap gap-x-8 gap-y-2 pt-6"
              style={{ borderTop: 'var(--hairline-p)' }}
            >
              <span className="t-label" style={{ color: 'var(--on-press-low)' }}>Barcelona</span>
              <span className="t-label" style={{ color: 'var(--on-press-low)' }}>{T.remote}</span>
              <span className="t-label" style={{ color: 'var(--on-press-low)' }}>&lt; 24 h</span>
            </div>
          </div>

          {/* La hoja donde se escribe. Sin backend: el formulario
              compone el correo y lo abre en el cliente del visitante,
              que es lo único que un sitio estático puede prometer. */}
          <form
            onSubmit={onSubmit}
            className="sheet flex flex-col gap-5 p-7 md:p-10"
            style={{ borderTop: 0, borderRight: 0, borderBottom: 0 }}
          >
            <div className="field">
              <label htmlFor="contact-name">{T.name}</label>
              <input id="contact-name" name="name" className="input" type="text" placeholder={T.namePh} autoComplete="name" />
            </div>

            <div className="field">
              <label htmlFor="contact-email">{T.email}</label>
              <input id="contact-email" name="email" className="input" type="email" placeholder={T.emailPh} autoComplete="email" />
            </div>

            <div className="field">
              <label htmlFor="contact-message">{T.message}</label>
              <textarea
                id="contact-message"
                name="message"
                className="input"
                placeholder={T.messagePh}
                rows={4}
                style={{ resize: 'none' }}
              />
            </div>

            <button type="submit" className="btn btn--sheet btn--lg" style={{ marginTop: '4px' }}>
              {T.send}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
