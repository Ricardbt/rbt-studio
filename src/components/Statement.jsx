import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Statement() {
  const sectionRef = useRef(null)
  const quoteRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo(quoteRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          },
          delay: 0.3
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="statement"
      className="py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: '#F2EFE6' }}
    >
      <div className="w-full mx-auto px-4 sm:px-8 lg:px-16" style={{ maxWidth: '1280px' }}>
        <div ref={lineRef} style={{ height: '1px', backgroundColor: '#C9C5B6', marginBottom: '48px' }} />
        <blockquote
          ref={quoteRef}
          className="opacity-0"
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(28px, 4vw, 56px)',
            lineHeight: '1.2',
            color: '#14140F',
            maxWidth: '900px',
            fontStyle: 'normal',
          }}
        >
          "Most products know what they want to do.
          <br />
          <span style={{ color: '#0E4A35' }}>Few know how they should feel to use."</span>
        </blockquote>
      </div>
    </section>
  )
}
