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
    <nav className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-20 transition-all duration-500 ${
      scrolled 
        ? 'py-4 bg-bg/80 backdrop-blur-md border-b border-border/30' 
        : 'py-6 lg:py-8 bg-transparent'
    }`}>
      <div className="max-w-[1600px] mx-auto flex justify-between items-center">
        <a 
          href="#" 
          className="font-display text-xl tracking-tight text-text hover:text-accent transition-colors duration-300"
        >
          RBT<span className="text-accent">.</span>
        </a>
        
        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] tracking-[0.15em] uppercase text-textMuted/70 hover:text-accent transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <button 
          className="lg:hidden flex flex-col gap-1.5 w-6"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block h-px bg-text transition-all duration-300 ${menuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
          <span className={`block h-px bg-text transition-all duration-300 ${menuOpen ? 'opacity-0' : 'w-4'}`} />
          <span className={`block h-px bg-text transition-all duration-300 ${menuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-6'}`} />
        </button>
      </div>
    </nav>
  )
}