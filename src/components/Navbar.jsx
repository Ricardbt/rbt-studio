import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Misreg } from './Press'

const navLinks = [
  { href: '#services', label: 'Tintas' },
  { href: '#projects', label: 'Casos' },
  { href: '#works', label: 'Trabajos' },
  { href: '#artistic', label: 'Creative' },
  { href: '#about', label: 'Sobre mí' },
  { href: '#contact', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const linksRef = useRef([])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    gsap.fromTo(
      linksRef.current,
      { opacity: 0, y: -12 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, delay: 0.7, ease: 'power2.out' }
    )
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      {/* La barra superior es el borde de la mesa: sólo se ve
          cuando la hoja ya ha empezado a correr por debajo. */}
      <nav
        className="site-head fixed left-0 right-0 top-0 z-50"
        style={{
          background: scrolled ? 'rgba(244, 241, 234, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          borderBottom: scrolled ? 'var(--hairline-p)' : '1px solid transparent',
          transition: 'background 400ms var(--ease-out), border-color 400ms var(--ease-out)',
        }}
      >
        <div
          className="flex items-center justify-between px-6 md:px-12 lg:px-16"
          style={{ paddingTop: '18px', paddingBottom: '18px' }}
        >
          <a href="#" className="rbt-mark transition-opacity hover:opacity-70" aria-label="rbt. — inicio">
            <Misreg>rbt.</Misreg>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                ref={(el) => (linksRef.current[i] = el)}
                className="t-label opacity-0 transition-colors duration-300"
                style={{ color: 'var(--on-press-mid)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink-magenta)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--on-press-mid)')}
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            className="relative flex h-6 w-6 flex-col items-end justify-center gap-1.5 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            {/* Abierto, las dos barras se cruzan en el centro: una X,
                no un galón. */}
            <span
              className={`absolute block h-px transition-all duration-300 ${menuOpen ? 'top-1/2 rotate-45' : 'top-0'}`}
              style={{ width: '24px', background: 'var(--on-press)' }}
            />
            <span
              className={`absolute top-1/2 block h-px -translate-y-1/2 transition-all duration-300 ${menuOpen ? 'w-0 opacity-0' : 'w-4'}`}
              style={{ background: 'var(--ink-magenta)' }}
            />
            <span
              className={`absolute block h-px transition-all duration-300 ${menuOpen ? 'top-1/2 -rotate-45' : 'bottom-0'}`}
              style={{ width: '24px', background: 'var(--on-press)' }}
            />
          </button>
        </div>
      </nav>

      {/* Menú móvil: la hoja completa, con sus cruces de registro */}
      <div
        className={`press-bed fixed inset-0 z-40 flex flex-col items-center justify-center transition-opacity duration-500 lg:hidden ${
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-7">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="t-h2"
              style={{
                color: 'var(--on-press)',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 0.4s ease ${i * 70}ms, transform 0.4s ease ${i * 70}ms`,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
