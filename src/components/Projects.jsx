import { useState } from 'react'

const PROJECTS = [
  { num: '01', name: 'StoryPrint AI', desc: 'SaaS de cuentos ilustrados personalizados con generación LLM.', tech: 'Next.js · Supabase · LLMs' },
  { num: '02', name: 'Brandboard AI', desc: 'Plataforma de identidad de marca con pipeline multi-agente.', tech: 'React · Supabase · AI' },
  { num: '03', name: 'NutrAI', desc: 'Formulador de suplementos personalizado con parsing JSON.', tech: 'React · Anthropic · TS' },
  { num: '04', name: 'GeoRoutes', desc: 'Tema WordPress con Leaflet maps y soporte GPX.', tech: 'WordPress · Leaflet' },
  { num: '05', name: 'Portfolio 3D', desc: 'Tema WordPress con integración Three.js y WebGL.', tech: 'Three.js · WebGL' },
  { num: '06', name: 'Processing Sketches', desc: 'Animaciones generativas y arte algorítmico.', tech: 'Processing · Java' },
]

function ProjectRow({ project, index }) {
  const [hovered, setHovered] = useState(false)
  
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group grid grid-cols-1 md:grid-cols-[100px_1fr_1fr_auto] gap-4 md:gap-8 py-8 border-b border-border/30 transition-all duration-300 ${
        hovered ? 'bg-surface/50' : ''
      }`}
    >
      <span className="font-mono text-xs text-textMuted/40">
        {project.num}
      </span>
      <div className={`font-display text-xl md:text-2xl transition-colors duration-300 ${
        hovered ? 'text-accent' : 'text-text'
      }`}>
        {project.name}
      </div>
      <div className="font-sans text-sm text-textMuted md:max-w-md">
        {project.desc}
      </div>
      <div className="font-mono text-[10px] tracking-wider text-textMuted/50 text-right hidden md:block">
        {project.tech}
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="work" className="py-24 lg:py-32 px-6 md:px-12 lg:px-20 bg-surface/50">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-16 lg:mb-24">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-accent/60 mb-4">
            Proyectos
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-text">
            Trabajo
            <br />
            <em className="text-accent italic font-normal">seleccionado</em>
          </h2>
        </div>
        
        <div className="border-t border-border/30">
          {PROJECTS.map((project, i) => (
            <ProjectRow key={project.num} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}