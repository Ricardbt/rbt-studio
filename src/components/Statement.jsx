import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { appear } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

export default function Statement() {
  const sectionRef = useRef(null)
  const quoteRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      appear(lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
        }
      )

      appear(quoteRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.3,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="statement" className="py-20 md:py-28">
      <div className="mx-auto w-full px-6 md:px-12 lg:px-16" style={{ maxWidth: 'var(--container)' }}>
        <div ref={lineRef} style={{ height: '1px', background: 'var(--press-line)', marginBottom: '48px' }} />
        <blockquote ref={quoteRef} className="opacity-0">
          <span className="t-h1 block" style={{ color: 'var(--on-press)', maxWidth: '18ch' }}>
            La mayoría de productos saben qué hacen.{' '}
            <span style={{ color: 'var(--on-press-mid)' }}>
              Pocos saben cómo deberían sentirse al usarse.
            </span>
          </span>
        </blockquote>
      </div>
    </section>
  )
}
