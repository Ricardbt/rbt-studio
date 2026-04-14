import { useState, useEffect } from 'react'

const navLinks = [
  { href: '#services', label: 'Servicios' },
  { href: '#work', label: 'Proyectos' },
  { href: '#artistic', label: 'Arte & Código' },
  { href: '#contact', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-5 transition-all duration-300 ${
      scrolled 
        ? 'bg-bg/95 backdrop-blur-md border-b border-border' 
        : 'bg-transparent'
    }`}>
      <a 
        href="#" 
        className="font-mono text-xs tracking-widest uppercase text-accent hover:text-accentLight transition-colors"
      >
        RBT · Studio
      </a>
      
      <div className="flex gap-8 md:gap-10">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-mono text-xs md:text-sm tracking-wider uppercase text-textMuted hover:text-text transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}