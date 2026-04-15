import { useState } from 'react'

const email = 'contact@rbt-studio.com'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="bg-bg">
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#1A5D43 1px, transparent 1px), linear-gradient(90deg, #1A5D43 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="relative z-10 px-6 md:px-12 lg:px-16 xl:px-24 py-24 md:py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-[1400px]">
          <div>
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-accent mb-4 md:mb-6">
              Contacto
            </p>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-text leading-[0.9] mb-8 md:mb-10">
              Trabajemos
              <br />
              <em className="not-italic text-accent">juntos.</em>
            </h2>
            <p className="font-sans text-base md:text-lg text-textMuted max-w-md mb-12 leading-relaxed">
              Desarrollo web, automatización IA, instalación interactiva o algo que todavía no tiene nombre — escríbenos.
            </p>
            
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${email}`}
                className="group font-mono text-sm md:text-base text-text hover:text-accent transition-colors duration-300 flex items-center gap-3"
              >
                <span className="tracking-[0.05em]">{email}</span>
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
              </a>
              <a
                href="https://github.com/rbt-studio"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-textMuted hover:text-text transition-colors duration-300"
              >
                github.com/rbt-studio
              </a>
            </div>
          </div>
          
          <div className="lg:pt-8">
            <div className="border border-border/30 p-8 md:p-10 lg:p-12">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-textMuted/50 mb-6 md:mb-8">
                Copiar email
              </div>
              <button
                onClick={handleCopy}
                className={`w-full text-left px-6 py-4 font-mono text-sm transition-all duration-300 flex justify-between items-center border ${
                  copied 
                    ? 'bg-accent/10 border-accent text-accent' 
                    : 'bg-transparent border-border/40 text-text hover:border-accent/50'
                }`}
              >
                <span className="tracking-[0.03em]">{email}</span>
                <span className="font-mono text-[10px] tracking-[0.15em] uppercase">
                  {copied ? '✓ Copiado' : 'Copiar'}
                </span>
              </button>
              <div className="mt-6 md:mt-8 font-sans text-sm text-textMuted flex flex-wrap gap-6">
                <span>📍 Barcelona</span>
                <span>🌐 Remoto</span>
                <span>⏱ &lt;24h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
