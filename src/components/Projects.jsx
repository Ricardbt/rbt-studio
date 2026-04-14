const PROJECTS = [
  { num: '01', name: 'StoryPrint AI', desc: 'SaaS de cuentos ilustrados personalizados. Multi-step wizard con generación LLM, ilustraciones IA y export PDF.', tech: 'Next.js · Supabase · LLMs' },
  { num: '02', name: 'Brandboard AI', desc: 'Plataforma de identidad de marca para agencias. Pipeline multi-agente con OpenAI + Anthropic y entregables exportables.', tech: 'React · Supabase · AI Orchestration' },
  { num: '03', name: 'NutrAI', desc: 'Formulador de suplementos personalizado con historial persistente y parsing robusto de outputs JSON del modelo.', tech: 'React · Anthropic API · TypeScript' },
  { num: '04', name: 'GeoRoutes WP Theme', desc: 'Tema WordPress con CPTs de rutas, Leaflet maps, soporte GPX y REST API personalizada para comunidades outdoor.', tech: 'WordPress · Leaflet · PHP' },
  { num: '05', name: 'Portfolio 3D', desc: 'Tema WordPress con integración Three.js para portfolios de artistas. Shader personalizado, WebGL canvas reactivo.', tech: 'Three.js · WebGL · WordPress' },
  { num: '06', name: 'Processing Sketchbook', desc: 'Colección de animaciones generativas: sistemas de partículas, L-systems, física simulada y arte algorítmico interactivo.', tech: 'Processing · Java · Generative Art' },
]

function ProjectRow({ project, index }) {
  const [hovered, setHovered] = React.useState(false)
  
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`grid grid-cols-1 md:grid-cols-[80px_1fr_1fr_auto] gap-4 md:gap-8 py-6 md:py-8 border-b border-border transition-colors duration-300 cursor-default ${
        hovered ? 'bg-accent/[0.03]' : ''
      }`}
    >
      <span className="font-mono text-xs tracking-widest text-textMuted hidden md:block">
        {project.num}
      </span>
      <div className={`font-sans text-xl md:text-2xl font-semibold transition-colors duration-300 ${
        hovered ? 'text-accent italic' : 'text-text'
      }`}>
        {project.name}
      </div>
      <div className="font-mono text-xs md:text-sm text-textMuted md:col-span-1">
        {project.desc}
      </div>
      <div className="font-mono text-[10px] md:text-xs tracking-wider text-textMuted text-right whitespace-nowrap hidden md:block">
        {project.tech}
      </div>
    </div>
  )
}

import React from 'react'

export default function Projects() {
  return (
    <section id="work" className="py-20 px-6 md:px-12 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto">
        <div className="font-mono text-xs tracking-widest uppercase text-accent mb-2">
          Proyectos
        </div>
        <h2 className="font-sans text-3xl md:text-4xl font-semibold text-text leading-tight mb-12">
          Trabajo <em className="text-accent italic">seleccionado</em>
        </h2>
        <div>
          {PROJECTS.map((project, i) => (
            <ProjectRow key={project.num} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}