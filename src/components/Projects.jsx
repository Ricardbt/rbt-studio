const PROJECTS = [
  { num: '01', name: 'StoryPrint AI', desc: 'SaaS de cuentos ilustrados personalizados con generación LLM.', tech: 'Next.js · Supabase · LLMs' },
  { num: '02', name: 'Brandboard AI', desc: 'Plataforma de identidad de marca con pipeline multi-agente.', tech: 'React · Supabase · AI' },
  { num: '03', name: 'NutrAI', desc: 'Formulador de suplementos personalizado con parsing JSON.', tech: 'React · Anthropic · TS' },
  { num: '04', name: 'GeoRoutes', desc: 'Tema WordPress con Leaflet maps y soporte GPX.', tech: 'WordPress · Leaflet' },
  { num: '05', name: 'Portfolio 3D', desc: 'Tema WordPress con integración Three.js y WebGL.', tech: 'Three.js · WebGL' },
  { num: '06', name: 'Processing Sketches', desc: 'Animaciones generativas y arte algorítmico.', tech: 'Processing · Java' },
]

function ProjectRow({ project, index }) {
  return (
    <div className="group py-10 md:py-14 border-b border-border/30 last:border-b-0 hover:bg-surface/20 transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-[80px_1fr_1fr_120px] gap-4 md:gap-8 items-baseline">
        <span className="font-mono text-[11px] tracking-[0.1em] text-textMuted/40">
          {project.num}
        </span>
        <div className="font-display text-xl md:text-2xl lg:text-3xl text-text group-hover:text-accent transition-colors duration-300">
          {project.name}
        </div>
        <div className="font-sans text-sm md:text-base text-textMuted md:max-w-md">
          {project.desc}
        </div>
        <div className="font-mono text-[10px] md:text-[11px] tracking-[0.08em] text-textMuted/50 text-left md:text-right hidden md:block">
          {project.tech}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="work" className="bg-surface/30">
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#1A5D43 1px, transparent 1px), linear-gradient(90deg, #1A5D43 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="relative z-10 px-6 md:px-12 lg:px-16 xl:px-24 py-24 md:py-32 lg:py-40">
        <div className="mb-16 md:mb-24">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-accent mb-4 md:mb-6">
            Proyectos
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-text leading-[0.9]">
            Trabajo
            <br />
            <em className="not-italic text-accent">seleccionado</em>
          </h2>
        </div>
        
        <div className="max-w-[1400px]">
          {PROJECTS.map((project, i) => (
            <ProjectRow key={project.num} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
