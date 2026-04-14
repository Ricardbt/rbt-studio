import { useState } from 'react'

const SERVICES = [
  {
    num: '01',
    name: 'Web Development',
    desc: 'Aplicaciones web de producción con React, Next.js y arquitecturas headless. Desde MVPs hasta plataformas escalables.',
    tags: ['React', 'Next.js', 'Supabase', 'TypeScript'],
  },
  {
    num: '02',
    name: 'AI & Automatización',
    desc: 'Agentes autónomos, pipelines LLM y flujos de automatización con n8n.',
    tags: ['LLMs', 'MCP', 'n8n', 'Python'],
  },
  {
    num: '03',
    name: '3D & Creativo',
    desc: 'Experiencias web inmersivas con Three.js, WebGL y React Three Fiber.',
    tags: ['Three.js', 'WebGL', 'GSAP', 'R3F'],
  },
  {
    num: '04',
    name: 'Hardware & IoT',
    desc: 'Prototipos físico-digitales: sensores, actuadores y comunicación serial.',
    tags: ['Arduino', 'Sensors', 'Serial', 'IoT'],
  },
  {
    num: '05',
    name: 'Consultoría',
    desc: 'Auditorías de arquitectura, revisión de código y roadmap técnico.',
    tags: ['Architecture', 'AWS', 'Code Review'],
  },
  {
    num: '06',
    name: 'Instalaciones',
    desc: 'Arte computacional e instalaciones para espacios culturales.',
    tags: ['Generative', 'Interactive', 'Creative'],
  },
]

function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative p-8 lg:p-10 border border-border/40 transition-all duration-500 ${
        hovered ? 'bg-surface border-accent/20' : ''
      }`}
    >
      {/* Corner decoration */}
      <div className={`absolute top-0 right-0 w-16 h-16 overflow-hidden transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-0 right-0 w-px h-8 bg-accent" />
        <div className="absolute top-0 right-0 h-px w-8 bg-accent" />
      </div>

      <span className="font-mono text-xs text-textMuted/50 tracking-widest block mb-6">
        {service.num}
      </span>
      
      <h3 className="font-display text-2xl md:text-3xl text-text mb-4 group-hover:text-accent transition-colors duration-300">
        {service.name}
      </h3>
      
      <p className="font-sans text-sm text-textMuted leading-relaxed mb-6">
        {service.desc}
      </p>
      
      <div className="flex flex-wrap gap-2">
        {service.tags.map(tag => (
          <span 
            key={tag} 
            className="font-mono text-[10px] tracking-wider uppercase text-accent/70 border border-accent/20 px-3 py-1.5"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <section id="services" className="py-24 lg:py-32 px-6 md:px-12 lg:px-20 bg-bg">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-16 lg:mb-24">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-accent/60 mb-4">
            Servicios
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-text">
            Lo que creo
            <br />
            <em className="text-accent italic font-normal">para ti</em>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.num} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}