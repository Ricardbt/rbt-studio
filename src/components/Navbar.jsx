import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

const navLinks = [
  { href: '#services', label: 'Servicios' },
  { href: '#work', label: 'Proyectos' },
  { href: '#artistic', label: 'Arte' },
  { href: '#contact', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
  const linksRef = useRef([])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    gsap.fromTo(linksRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.8, ease: 'power2.out' }
    )
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-bg/90 backdrop-blur-md py-4' 
            : 'bg-transparent py-5 lg:py-6'
        }`}
      >
        <div className="px-6 md:px-12 lg:px-16 flex justify-between items-center">
          <a 
            href="#" 
            className="font-display text-lg tracking-[0.1em] uppercase text-text hover:text-accent transition-colors duration-300"
          >
            RBT<span className="text-accent">.</span>
          </a>
          
          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                ref={el => linksRef.current[i] = el}
                className="font-mono text-[11px] tracking-[0.18em] uppercase text-textMuted hover:text-accent transition-colors duration-300 relative group opacity-0"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden flex flex-col justify-center items-end gap-1.5 w-6 h-6 relative"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span 
              className={`block h-[1px] bg-text absolute top-0 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`}
              style={{ width: menuOpen ? '24px' : '24px' }}
            />
            <span 
              className={`block h-[1px] bg-text absolute top-1/2 -translate-y-1/2 transition-all duration-300 ${menuOpen ? 'opacity-0 w-0' : 'w-4'}`}
            />
            <span 
              className={`block h-[1px] bg-text absolute bottom-0 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`}
              style={{ width: menuOpen ? '24px' : '24px' }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-bg transition-all duration-500 lg:hidden flex flex-col justify-center items-center ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col justify-center items-center h-full gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-4xl tracking-[0.1em] uppercase text-text hover:text-accent transition-colors duration-300"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.4s ease ${i * 80}ms, transform 0.4s ease ${i * 80}ms, color 0.3s ease`
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
