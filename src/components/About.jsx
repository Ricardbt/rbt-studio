export default function About() {
  return (
    <section className="py-16 px-6 md:px-12 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
        <div>
          <div className="font-mono text-[10px] tracking-widest uppercase text-accent mb-3">
            Formación
          </div>
          <div className="font-sans text-lg font-semibold text-text mb-1">
            Bellas Artes
          </div>
          <div className="font-mono text-xs text-textMuted leading-relaxed">
            Imagen & Diseño · Universidad de Barcelona. Base conceptual y visual que impregna cada proyecto técnico.
          </div>
        </div>
        <div>
          <div className="font-mono text-[10px] tracking-widest uppercase text-accent mb-3">
            Experiencia
          </div>
          <div className="font-sans text-lg font-semibold text-text mb-1">
            10+ años
          </div>
          <div className="font-mono text-xs text-textMuted leading-relaxed">
            De la Universidad de Barcelona a Paladini Digital Solutions. Proyectos para startups, agencias, instituciones y proyectos propios.
          </div>
        </div>
        <div>
          <div className="font-mono text-[10px] tracking-widest uppercase text-accent mb-3">
            Ubicación
          </div>
          <div className="font-sans text-lg font-semibold text-text mb-1">
            Barcelona · Remote-ready
          </div>
          <div className="font-mono text-xs text-textMuted leading-relaxed">
            Disponible para proyectos en remoto globalmente. Idiomas: Español, Catalán, Inglés (B2).
          </div>
        </div>
      </div>
    </section>
  )
}