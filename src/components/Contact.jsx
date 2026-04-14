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
    <section id="contact" className="py-20 px-6 md:px-12 bg-bg border-t border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <div className="font-mono text-xs tracking-widest uppercase text-accent mb-2">
            Contacto
          </div>
          <h2 className="font-sans text-4xl md:text-5xl font-semibold text-text leading-[0.95] mb-6 md:mb-10">
            Trabajemos
            <br />
            <em className="text-accent italic">juntos.</em>
          </h2>
          <p className="font-mono text-sm text-textMuted max-w-md mb-8 leading-relaxed">
            Si tienes un proyecto de <span className="text-text font-normal">desarrollo web, automatización IA, instalación interactiva</span> o algo que todavía no tiene nombre — escríbeme. Me gustan los proyectos que combinan tecnología y criterio artístico.
          </p>
          
          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${email}`}
              className="font-mono text-sm text-accent no-underline border-b border-border pb-2 flex justify-between items-center hover:border-accent transition-colors"
            >
              {email}
              <span className="font-mono text-[10px] tracking-widest uppercase text-textMuted">
                Email →
              </span>
            </a>
            <a
              href="https://github.com/Ricardbt"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-textMuted no-underline border-b border-border pb-2 flex justify-between items-center hover:text-text transition-colors"
            >
              github.com/Ricardbt
              <span className="font-mono text-[10px] tracking-widest uppercase">
                GitHub →
              </span>
            </a>
            <a
              href="https://linkedin.com/in/ricardboixeda"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-textMuted no-underline border-b border-border pb-2 flex justify-between items-center hover:text-text transition-colors"
            >
              linkedin.com/in/ricardboixeda
              <span className="font-mono text-[10px] tracking-widest uppercase">
                LinkedIn →
              </span>
            </a>
          </div>
        </div>
        
        <div className="lg:pl-12">
          <div className="border border-border p-6 md:p-8 bg-surface">
            <div className="font-mono text-[10px] tracking-widest uppercase text-textMuted mb-6">
              Copia el email
            </div>
            <button
              onClick={handleCopy}
              className={`w-full border px-5 py-4 font-mono text-sm transition-all duration-300 flex justify-between items-center cursor-pointer ${
                copied 
                  ? 'bg-accent/10 border-accent text-accent' 
                  : 'bg-transparent border-border text-accent hover:border-accent'
              }`}
            >
              {email}
              <span className="font-mono text-[10px] tracking-widest uppercase">
                {copied ? '✓ Copiado' : 'Copiar'}
              </span>
            </button>
            <div className="mt-6 font-mono text-xs text-textMuted">
              <div className="mb-1">📍 Barcelona, España</div>
              <div className="mb-1">🌐 Disponible para proyectos remotos</div>
              <div>⏱ Respuesta habitual en {'<'} 24h</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}