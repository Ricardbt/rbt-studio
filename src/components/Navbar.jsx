import { useState, useEffect } from 'react'

const navLinks = [
  { href: '#services', label: 'Servicios' },
  { href: '#work', label: 'Proyectos' },
  { href: '#artistic', label: 'Arte' },
  { href: '#contact', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-bg/90 backdrop-blur-md' 
          : 'bg-transparent'
      }`}>
        <div className="px-6 md:px-12 lg:px-16 py-5 lg:py-6 flex justify-between items-center">
          <a 
            href="#" 
            className="font-display text-lg tracking-[0.1em] uppercase text-text hover:text-accent transition-colors duration-300"
          >
            RBT<span className="text-accent">.</span>
          </a>
          
          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-[11px] tracking-[0.18em] uppercase text-textMuted hover:text-accent transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden flex flex-col justify-center items-end gap-1.5 w-6 h-6"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`block h-[1px] bg-text transition-all duration-300 ${menuOpen ? 'w-6 rotate-45 translate-y-[4.5px]' : 'w-6'}`} />
            <span className={`block h-[1px] bg-text transition-all duration-300 ${menuOpen ? 'opacity-0 w-0' : 'w-4'}`} />
            <span className={`block h-[1px] bg-text transition-all duration-300 ${menuOpen ? 'w-6 -rotate-45 -translate-y-[4.5px]' : 'w-6'}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-bg transition-all duration-500 lg:hidden ${
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col justify-center items-center h-full gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`font-display text-4xl tracking-[0.1em] uppercase text-text hover:text-accent transition-all duration-300 ${
                menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: menuOpen ? `${i * 50}ms` : '0ms' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
