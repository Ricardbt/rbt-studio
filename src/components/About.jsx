export default function About() {
  return (
    <section className="py-20 lg:py-24 px-6 md:px-12 lg:px-20 bg-surface/30 border-y border-border/20">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
        <div className="group">
          <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent/50 mb-4">
            Formación
          </div>
          <h3 className="font-display text-2xl text-text mb-3 group-hover:text-accent transition-colors duration-300">
            Bellas Artes
          </h3>
          <p className="font-sans text-sm text-textMuted leading-relaxed">
            Imagen & Diseño · Universidad de Barcelona. Base conceptual y visual que impregna cada proyecto técnico.
          </p>
        </div>
        
        <div className="group">
          <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent/50 mb-4">
            Experiencia
          </div>
          <h3 className="font-display text-2xl text-text mb-3 group-hover:text-accent transition-colors duration-300">
            10+ años
          </h3>
          <p className="font-sans text-sm text-textMuted leading-relaxed">
            De la Universidad de Barcelona a Paladini Digital. Proyectos para startups, agencias e instituciones.
          </p>
        </div>
        
        <div className="group">
          <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent/50 mb-4">
            Ubicación
          </div>
          <h3 className="font-display text-2xl text-text mb-3 group-hover:text-accent transition-colors duration-300">
            Barcelona
          </h3>
          <p className="font-sans text-sm text-textMuted leading-relaxed">
            Disponible globalmente en remoto. Español, Catalán, Inglés (B2).
          </p>
        </div>
      </div>
    </section>
  )
}