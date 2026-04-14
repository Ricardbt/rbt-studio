import { useState } from 'react'

const email = 'ricardboixeda@gmail.com'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="py-24 lg:py-32 px-6 md:px-12 lg:px-20 bg-bg">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <div>
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-accent/60 mb-4">
            Contacto
          </p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-text leading-[0.9] mb-8">
            Trabajemos
            <br />
            <em className="text-accent italic font-normal">juntos.</em>
          </h2>
          <p className="font-sans text-lg text-textMuted max-w-md mb-12 leading-relaxed">
            Si tienes un proyecto de <span className="text-text font-medium">desarrollo web, automatización IA, instalación interactiva</span> o algo que todavía no tiene nombre — escríbeme.
          </p>
          
          <div className="flex flex-col gap-5">
            <a
              href={`mailto:${email}`}
              className="group font-sans text-base text-text hover:text-accent transition-colors duration-300 flex items-center gap-3"
            >
              <span className="font-mono text-xs tracking-widest uppercase text-textMuted/50">{email}</span>
              <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
            </a>
            <a
              href="https://github.com/Ricardbt"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-textMuted hover:text-text transition-colors duration-300"
            >
              github.com/Ricardbt
            </a>
            <a
              href="https://linkedin.com/in/ricardboixeda"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-textMuted hover:text-text transition-colors duration-300"
            >
              linkedin.com/in/ricardboixeda
            </a>
          </div>
        </div>
        
        <div className="lg:pl-12">
          <div className="border border-border/40 p-8 lg:p-12 bg-surface/30">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-textMuted/50 mb-8">
              Copiar email
            </div>
            <button
              onClick={handleCopy}
              className={`w-full text-left px-6 py-5 font-mono text-base transition-all duration-300 flex justify-between items-center border ${
                copied 
                  ? 'bg-accent/10 border-accent text-accent' 
                  : 'bg-transparent border-border/40 text-text hover:border-accent/50'
              }`}
            >
              {email}
              <span className="font-mono text-xs tracking-widest uppercase">
                {copied ? '✓ Copiado' : 'Copiar'}
              </span>
            </button>
            <div className="mt-8 font-sans text-sm text-textMuted flex flex-wrap gap-6">
              <span>📍 Barcelona</span>
              <span>🌐 Remoto</span>
              <span>⏱ {'<'}24h</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}