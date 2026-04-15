export default function About() {
  return (
    <section className="bg-surface/30">
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#1A5D43 1px, transparent 1px), linear-gradient(90deg, #1A5D43 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="relative z-10 px-6 md:px-12 lg:px-16 xl:px-24 py-20 md:py-28 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 max-w-[1400px]">
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-textMuted/50 mb-4 md:mb-6">
              Formación
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-text mb-3">
              Bellas Artes
            </h3>
            <p className="font-sans text-sm md:text-base text-textMuted leading-relaxed">
              Imagen & Diseño · Universidad de Barcelona. Base conceptual y visual que impregna cada proyecto técnico.
            </p>
          </div>
          
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-textMuted/50 mb-4 md:mb-6">
              Experiencia
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-text mb-3">
              10+ años
            </h3>
            <p className="font-sans text-sm md:text-base text-textMuted leading-relaxed">
              De la Universidad de Barcelona a proyectos propios. Startups, agencias e instituciones.
            </p>
          </div>
          
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-textMuted/50 mb-4 md:mb-6">
              Ubicación
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-text mb-3">
              Barcelona
            </h3>
            <p className="font-sans text-sm md:text-base text-textMuted leading-relaxed">
              Disponible globalmente en remoto. Español, Catalán, Inglés (B2).
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
