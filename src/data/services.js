import { localize } from './localize.js'

export const SERVICES = [
  {
    num: '01',
    ink: 'var(--ink-cyan)', tint: 'var(--ink-cyan-t)',
    inkName: 'Cian',
    name: 'Experience Engineering',
    desc: 'Frontend sofisticado donde cada interacción tiene intención. Interfaces que se sienten bien, no sólo que funcionan.',
    tags: ['React', 'Next.js', 'TypeScript', 'Motion'],
    coverage: 100,
  },
  {
    num: '02',
    ink: 'var(--ink-magenta)', tint: 'var(--ink-magenta-t)',
    inkName: 'Magenta',
    name: 'Producto AI-native',
    desc: 'Interfaces para sistemas inteligentes: claras, predecibles y humanas. La IA como comportamiento útil, no como reclamo.',
    tags: ['LLMs', 'AI UI', 'Producto', 'UX'],
    coverage: 90,
  },
  {
    num: '03',
    ink: 'var(--ink-yellow)', tint: 'var(--ink-yellow-t)',
    inkName: 'Amarillo',
    name: 'Design Systems',
    desc: 'Sistemas de componentes con criterio visual y consistencia a escala. De los tokens a una experiencia coherente.',
    tags: ['Tokens', 'Componentes', 'Storybook', 'Figma'],
    coverage: 80,
  },
  {
    num: '04',
    ink: 'var(--ink-over-cm)', tint: 'var(--ink-violet-t)',
    inkName: 'Cian + Magenta',
    name: 'Movimiento e interacción',
    desc: 'Animación con propósito: microinteracciones, transiciones y feedback que refuerzan la narrativa del producto.',
    tags: ['GSAP', 'Framer Motion', 'WebGL', 'R3F'],
    coverage: 70,
  },
  {
    num: '05',
    ink: 'var(--ink-over-my)', tint: 'var(--ink-orange-t)',
    inkName: 'Magenta + Amarillo',
    name: 'Consultoría de producto',
    desc: 'Arquitectura frontend, auditoría UX y hoja de ruta técnica orientada a la experiencia de uso.',
    tags: ['Arquitectura', 'Auditoría UX', 'Roadmap'],
    coverage: 60,
  },
  {
    num: '06',
    ink: 'var(--ink-key)', tint: 'var(--ink-key)',
    inkName: 'Negro',
    name: 'Creative technology',
    desc: 'Código generativo, instalaciones interactivas y piezas computacionales para espacios culturales y digitales.',
    tags: ['Generativo', 'p5.js', 'Interactivo', 'Instalación'],
    coverage: 100,
  },
]

const SERVICES_EN = [
  { inkName: 'Cyan', name: 'Experience Engineering', desc: 'Refined frontend where every interaction has intent. Interfaces that feel right, not just ones that work.', tags: ['React', 'Next.js', 'TypeScript', 'Motion'] },
  { inkName: 'Magenta', name: 'AI-native product', desc: 'Interfaces for intelligent systems: clear, predictable and human. AI as useful behaviour, not as a gimmick.', tags: ['LLMs', 'AI UI', 'Product', 'UX'] },
  { inkName: 'Yellow', name: 'Design Systems', desc: 'Component systems with visual judgement and consistency at scale. From tokens to a coherent experience.', tags: ['Tokens', 'Components', 'Storybook', 'Figma'] },
  { inkName: 'Cyan + Magenta', name: 'Motion and interaction', desc: 'Animation with purpose: micro-interactions, transitions and feedback that reinforce the product narrative.', tags: ['GSAP', 'Framer Motion', 'WebGL', 'R3F'] },
  { inkName: 'Magenta + Yellow', name: 'Product consulting', desc: 'Frontend architecture, UX audits and a technical roadmap focused on the experience of use.', tags: ['Architecture', 'UX audit', 'Roadmap'] },
  { inkName: 'Black', name: 'Creative technology', desc: 'Generative code, interactive installations and computational pieces for cultural and digital spaces.', tags: ['Generative', 'p5.js', 'Interactive', 'Installation'] },
]

export const SERVICES_BY_LANG = { es: SERVICES, en: localize(SERVICES, SERVICES_EN, 'services') }
