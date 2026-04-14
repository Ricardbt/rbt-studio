const SERVICES = [
  {
    num: '01',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="2" y="6" width="28" height="18" rx="2" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M10 14l4 4 6-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M2 26h28" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    name: 'Web Development & SaaS',
    desc: 'Aplicaciones web de producción con React, Next.js y arquitecturas headless. Desde MVPs hasta plataformas escalables con auth, base de datos y APIs propias.',
    tags: ['React', 'Next.js', 'Supabase', 'TypeScript', 'Node.js'],
    href: 'mailto:ricardboixeda@gmail.com?subject=Web Development',
  },
  {
    num: '02',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M16 2v4M16 26v4M2 16h4M26 16h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M6 6l3 3M23 23l3 3M6 26l3-3M23 9l3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    name: 'AI Agents & Automatización',
    desc: 'Diseño e implementación de agentes autónomos, pipelines LLM y flujos de automatización con n8n. Integraciones con OpenAI, Anthropic y APIs de terceros.',
    tags: ['LLMs', 'MCP', 'n8n', 'Python', 'Anthropic'],
    href: 'mailto:ricardboixeda@gmail.com?subject=AI Automation',
  },
  {
    num: '03',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6 26L16 4l10 20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M10 18h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    name: '3D & Animación Creativa',
    desc: 'Experiencias web inmersivas con Three.js, WebGL y React Three Fiber. Animaciones generativas con Processing y GSAP para proyectos que quieren romper con lo genérico.',
    tags: ['Three.js', 'WebGL', 'Processing', 'GSAP', 'R3F'],
    href: 'mailto:ricardboixeda@gmail.com?subject=3D Creative',
  },
  {
    num: '04',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="10" width="8" height="12" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="20" y="6" width="8" height="16" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M12 14h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2"/>
      </svg>
    ),
    name: 'Prototipado & Arduino',
    desc: 'Desarrollo de prototipos físico-digitales: sensores, actuadores, comunicación serial con interfaces web. Del concepto al prototipo funcional.',
    tags: ['Arduino', 'Sensors', 'Serial', 'Processing', 'IoT'],
    href: 'mailto:ricardboixeda@gmail.com?subject=Arduino Prototype',
  },
  {
    num: '05',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M4 8h24M4 16h18M4 24h20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    name: 'Consultoría Técnica',
    desc: 'Auditorías de arquitectura, revisión de código y roadmap técnico para startups y equipos. Especializado en stack React, infraestructura AWS y estrategias de IA.',
    tags: ['Architecture', 'AWS', 'Code Review', 'AI Strategy'],
    href: 'mailto:ricardboixeda@gmail.com?subject=Technical Consulting',
  },
  {
    num: '06',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4C10.5 4 6 8.5 6 14c0 3.2 1.5 6 3.8 7.6L8 28h16l-1.8-6.4C24.5 20 26 17.2 26 14c0-5.5-4.5-10-10-10z" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M12 28h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    name: 'Instalaciones Interactivas',
    desc: 'Arte computacional e instalaciones físico-digitales para espacios culturales, eventos y marcas. Combinando código generativo, hardware y diseño de experiencia.',
    tags: ['Generative Art', 'Interactive', 'Hardware', 'Creative Code'],
    href: 'mailto:ricardboixeda@gmail.com?subject=Interactive Installation',
  },
]

function ServiceCard({ service, index }) {
  const [hovered, setHovered] = React.useState(false)
  
  return (
    <a
      href={service.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`block p-8 border-r border-b border-border transition-all duration-300 text-decoration-none ${
        (index + 1) % 3 !== 0 ? 'lg:border-r' : 'lg:border-r-0'
      } ${index < 3 ? 'border-b' : ''} ${
        hovered ? 'bg-surface' : 'bg-transparent'
      } ${index >= (SERVICES.length - 3) ? 'border-b-0' : ''}`}
    >
      <span className="font-mono text-[10px] tracking-widest uppercase text-textMuted block mb-6">
        {service.num}
      </span>
      <div className={`text-accent mb-4 transform transition-transform duration-300 ${
        hovered ? '-translate-y-1' : ''
      }`}>
        {service.icon}
      </div>
      <div className="font-sans text-lg font-semibold text-text mb-2 leading-tight">
        {service.name}
      </div>
      <div className="font-mono text-xs text-textMuted mb-4 leading-relaxed">
        {service.desc}
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {service.tags.map(tag => (
          <span 
            key={tag} 
            className="font-mono text-[10px] tracking-wider uppercase text-accent border border-accent/30 px-2 py-1"
          >
            {tag}
          </span>
        ))}
      </div>
      <span className={`font-mono text-[10px] tracking-widest uppercase text-accent flex items-center gap-2 transition-all duration-300 ${
        hovered ? 'gap-3' : ''
      }`}>
        Consultar <span>→</span>
      </span>
    </a>
  )
}

import React from 'react'

export default function Services() {
  return (
    <section id="services" className="py-20 px-6 md:px-12 bg-bg">
      <div className="max-w-7xl mx-auto">
        <div className="font-mono text-xs tracking-widest uppercase text-accent mb-2">
          Servicios
        </div>
        <h2 className="font-sans text-3xl md:text-4xl font-semibold text-text leading-tight mb-12">
          Lo que puedo
          <br />
          <em className="text-accent italic">construir para ti</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.num} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}