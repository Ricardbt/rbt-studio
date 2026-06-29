import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Design tokens (on dark background) ───────────────────────────────────────
const D = {
  bg:       '#14140F',
  bgPanel:  '#1a1a12',
  bgCard:   'rgba(255,255,255,0.03)',
  line:     'rgba(242,239,230,0.08)',
  text:     'rgba(242,239,230,0.85)',
  soft:     'rgba(242,239,230,0.55)',
  muted:    'rgba(242,239,230,0.28)',
  faint:    'rgba(242,239,230,0.12)',
  cream:    '#F2EFE6',
}

// ─── Case study data ───────────────────────────────────────────────────────────
const CASES = [
  {
    id: 'cs-sp',
    num: '01',
    color: '#e8a07a',
    colorBorder: 'rgba(232,160,122,0.25)',
    tag: 'STORYPRINTS',
    category: 'SaaS · B2C + B2B2C · EdTech',
    title: 'Ser el autor\ndel propio cuento',
    subtitle: 'Cuando jugar y crear son la misma cosa',
    tech: ['Next.js', 'Supabase', 'OpenRouter', 'Upstash Redis', 'LemonSqueezy', 'SVG generativo'],
    body: 'Los productos digitales para niños los tratan como consumidores pasivos. StoryPrints invierte esa lógica — el producto es el acto de crear, no el resultado. Un wizard visual de cuatro pasos lleva al niño desde la idea hasta un cuento ilustrado completo en menos de cuatro minutos, sin leer ni escribir hasta el momento clave: el giro final, donde la historia se vuelve suya de verdad.',
    right: [
      { label: '// mi rol', value: 'Product design · Full-stack · Prompt engineering · Payments integration' },
      { label: '// usuarios', valueHtml: '<strong>Niños 5–9 años</strong> — flujo autónomo sin texto<br/><strong>Padres</strong> — modo regalo, checkout desde móvil<br/><strong>Maestras</strong> — modo aula, panel de sesión' },
      { label: '// modelo de negocio', value: 'Freemium + suscripción familiar + licencia escolar. Pagos y IVA europeo gestionados por LemonSqueezy.' },
      { label: '// decisión de IA clave', value: 'OpenRouter como gateway unificado — modelo distinto por tarea, A/B sin tocar código, fallback automático entre proveedores.' },
    ],
    problem: {
      title: 'La creatividad infantil no tenía un lienzo digital',
      body: 'Cada app existente para niños produce contenido para consumir, no para crear. El reto no era técnico — era encontrar el punto exacto donde la IA hace suficiente para que el resultado sea impresionante, pero el niño siente que la historia es suya.',
    },
    solution: {
      title: 'Autoría guiada con un giro final de texto libre',
      body: 'Cuatro pasos de selección visual — sin leer, sin escribir. La IA genera el cuento completo con ilustraciones SVG editoriales. Solo entonces aparece el momento de escritura: el niño añade su propio giro al final. Colocado después del cuento generado, cuando ya le importa la historia, la tasa de uso del giro alcanza el 68%.',
    },
    pipeline: {
      title: '// user → story pipeline',
      nodes: [
        { label: 'Wizard visual (4 pasos)', accent: false },
        { label: 'Caché sesión Redis', accent: false },
        { label: 'Rate limiting por plan', accent: false },
        { label: 'OpenRouter · narrativa', accent: true },
        { label: 'Streaming al cliente', accent: false },
        { label: 'SVG illustration render', accent: false },
        { label: 'Giro del autor', accent: false },
        { label: 'Supabase · persistencia', accent: false },
        { label: 'Export PDF A5 / LemonSqueezy', accent: false },
      ],
    },
    metrics: [
      { val: '<4 min', label: 'de entrada al primer cuento completo' },
      { val: '68%',   label: 'de sesiones usan el giro final del autor' },
      { val: '+72',   label: 'NPS padres en beta' },
    ],
    quote: {
      text: '"La sensación de autoría no viene de cuánto decide el niño, sino de cuándo. El giro final, después del cuento generado, tiene un impacto emocional desproporcionado a su peso técnico."',
      attr: '// design insight · validación beta',
    },
    learnings: [
      { n: '[01]', text: '<strong>Ilustración SVG generativa frente a imagen generativa.</strong> SVG procedural es instantáneo, consistente entre páginas, y los niños perciben el personaje como suyo más fácilmente que con imagen fotorrealista. Cero latencia adicional, cero coste de imagen.' },
      { n: '[02]', text: '<strong>Tres funnels distintos dentro del mismo producto.</strong> El niño, el padre y la maestra son tres usuarios con flujos, métricas y modelos de negocio separados. Tratarlos como uno solo produce una experiencia mediocre para todos.' },
      { n: '[03]', text: '<strong>Rate limiting en Redis es el seguro más barato del stack.</strong> Sin él, un plan gratuito sin límites genera facturas de API inmanejables en la primera semana de beta pública.' },
    ],
  },
  {
    id: 'cs-ba',
    num: '02',
    color: '#6db89a',
    colorBorder: 'rgba(109,184,154,0.25)',
    tag: 'BRANDAI',
    category: 'SaaS · B2C · Freelancers & Creators',
    title: 'El sistema de diseño\nque viaja contigo',
    subtitle: 'Identidad de marca portable entre herramientas de IA',
    tech: ['Next.js', 'Supabase', 'OpenRouter', 'Upstash Redis', 'Multi-agent', 'Markdown'],
    body: 'El problema de coherencia visual en proyectos pequeños no es de talento — es de memoria. Cada vez que usas un LLM para generar algo para tu marca, empiezas desde cero. BrandAI orquesta cinco agentes especializados para generar un design.md completo: paleta, tipografía, tono verbal, espaciado, tokens. Un archivo Markdown que viaja contigo a cualquier LLM, Cursor o pipeline.',
    right: [
      { label: '// mi rol', value: 'Product design · Full-stack · Arquitectura multi-agente · Prompt engineering' },
      { label: '// usuarios', valueHtml: '<strong>Fundadoras wellness</strong> — sin presupuesto de diseño<br/><strong>Freelancers</strong> — coherencia entre clientes<br/><strong>Content creators</strong> — múltiples marcas propias' },
      { label: '// decisión de producto clave', value: 'Markdown como formato de salida. No Figma, no Notion, no JSON. El archivo más portable del ecosistema digital — funciona en cualquier editor, cualquier LLM, cualquier CI/CD.' },
      { label: '// decisión de IA clave', value: 'Modelo distinto por agente: haiku para paleta y tipografía, sonnet para orquestador y validador, gpt-4o-mini para tono verbal. ~30% reducción de coste con caché Redis por hash semántico.' },
    ],
    problem: {
      title: 'Los LLMs no recuerdan quién eres',
      body: 'Un design system completo en Figma o Notion es inaccesible para proyectos pequeños en tiempo y dinero. Pero sin contexto de marca, cada generación de IA produce algo inconsistente con lo anterior. El resultado es una identidad visual que se fragmenta con cada herramienta que usas.',
    },
    solution: {
      title: 'Un artefacto portable generado por agentes especializados',
      body: 'Cinco agentes en pipeline — orquestador, paleta, tipografía, tono verbal, validador de consistencia — generan un design.md completo en 60–90 segundos. El validador detecta inconsistencias entre capas y relanza los agentes afectados. El resultado viaja al IDE, al chat, al prompt del generador de imagen.',
    },
    pipeline: {
      title: '// orchestration pipeline — 5 agents',
      nodes: [
        { label: 'Input lenguaje natural', accent: false },
        { label: 'Orquestador', accent: true },
        { label: 'Agente Paleta', accent: false },
        { label: 'Agente Tipografía', accent: false },
        { label: 'Agente Tono verbal', accent: false },
        { label: 'Redis · caché por hash', accent: false },
        { label: 'Validador de consistencia', accent: true },
        { label: 'Ensamblado design.md', accent: false },
        { label: 'Supabase · v+1', accent: false },
      ],
    },
    metrics: [
      { val: '60–90s', label: 'generación design.md completo' },
      { val: '~30%',  label: 'reducción de coste vía caché Redis' },
      { val: '40%',   label: 'retorno para modo evolución en 30 días' },
    ],
    quote: {
      text: '"La decisión más importante del producto no fue técnica — fue de formato. Markdown es el artefacto más portable del ecosistema digital."',
      attr: '// product insight · beta cerrada',
    },
    learnings: [
      { n: '[01]', text: '<strong>El validador de consistencia es el agente más caro y el más valioso.</strong> Sin él, el orquestador ensambla secciones que se contradicen — paleta fría con tono "cálido y terroso". Con él, la satisfacción media sube 0.8 puntos sobre 5.' },
      { n: '[02]', text: '<strong>El modo evolución retiene más que el modo generación.</strong> Con el design.md versionado en Supabase, el coste de cambiar de herramienta es alto. Cada actualización de marca que vuelve a BrandAI es un ciclo de retención natural.' },
      { n: '[03]', text: '<strong>Diferentes modelos por agente vía OpenRouter fue decisivo.</strong> GPT-4o-mini superó a Claude Haiku en tono verbal para marcas wellness en inglés. Un cambio de una línea en el config, sin refactor.' },
    ],
  },
  {
    id: 'cs-vm',
    num: '03',
    color: '#b07dc4',
    colorBorder: 'rgba(176,125,196,0.25)',
    tag: 'VAMPMAKER',
    category: 'Herramienta creativa · Niche B2C · TRPG',
    title: 'El copiloto del\nnarrador de tinieblas',
    subtitle: 'Agentes de IA para el Director de Juego de Mundo de Tinieblas',
    tech: ['Next.js', 'NestJS', 'PostgreSQL', 'Prisma', 'OpenRouter', 'Cloudflare R2'],
    body: 'Dirigir una partida de Mundo de Tinieblas es improvisación sostenida bajo presión. El Director de Juego puede invertir 6–8 horas preparando una sesión de 3. Vampmaker es el asistente que nunca tuvo: memoria canónica perfecta, NPCs generados en menos de 2 minutos, y opciones de escena accionables en 10 segundos cuando los jugadores se salen del guión.',
    right: [
      { label: '// mi rol', value: 'Arquitectura full-stack · Diseño del sistema de agentes · Product design · UX' },
      { label: '// usuario', valueHtml: '<strong>Director de Juego de Mundo de Tinieblas</strong> — veterano o novel, con partidas activas y necesidad de preparación rápida y coherente con el canon.' },
      { label: '// decisión de arquitectura clave', value: 'Orquestación de agentes en NestJS separado de Next.js. El contexto acumulado de campaña es lógica de servidor pura — no pertenece a un Route Handler.' },
      { label: '// ventaja competitiva', value: 'Especificidad canónica. Ningún LLM general reproduce la coherencia con clanes, política de la Cámara y Disciplines que da un sistema afinado para este universo.' },
    ],
    problem: {
      title: 'La preparación consume más que la sesión en sí',
      body: 'Fichas de NPCs, mapas de relaciones entre clanes, líneas de tiempo de la Cámara, ganchos narrativos — todo debe ser coherente con décadas de canon. Los LLMs generales conocen Mundo de Tinieblas de forma superficial y producen personajes que rompen la inmersión.',
    },
    solution: {
      title: 'Dos agentes: Researcher extrae canon, Creator genera ficha',
      body: 'El Researcher extrae arquetipos coherentes con el clan, la ciudad, los conflictos activos y las Disciplines disponibles. El Creator genera la ficha completa — atributos, trasfondo, secretos solo visibles para el DJ, y tres ganchos narrativos para los jugadores. La campaña acumula contexto sesión a sesión.',
    },
    pipeline: {
      title: '// NPC generation pipeline — NestJS',
      nodes: [
        { label: 'Input DJ (clan, ciudad, rol)', accent: false },
        { label: 'Researcher Agent', accent: true },
        { label: 'Contexto canónico', accent: false },
        { label: 'Creator Agent', accent: true },
        { label: 'Ficha + ganchos narrativos', accent: false },
        { label: 'PostgreSQL · Prisma', accent: false },
        { label: 'Campaña activa', accent: false },
      ],
    },
    metrics: [
      { val: '<2 min', label: 'NPC completo con ganchos narrativos' },
      { val: '3',     label: 'modos: preparación · mid-sesión · entre sesiones' },
      { val: '60%',   label: 'adopción del modo mid-sesión tras 2 sesiones' },
    ],
    quote: {
      text: '"El Diario de la Corte — resumen post-sesión desde la perspectiva de los NPCs — es el feature de retención más potente. Con tres sesiones registradas, el switching cost hacia otra herramienta se vuelve muy alto."',
      attr: '// product insight · alpha con DJs reales',
    },
    learnings: [
      { n: '[01]', text: '<strong>El modo mid-sesión necesita formato, no texto.</strong> El Director no puede leer mientras narra. Tres opciones de escena con consecuencias mecánicas incluidas — el DJ decide en 10 segundos. Un párrafo de texto lo rompe todo.' },
      { n: '[02]', text: '<strong>La especificidad de nicho es la ventaja defensible.</strong> Un producto para "creadores de contenido de rol" no tiene moat. Un producto que conoce el canon de Mundo de Tinieblas mejor que cualquier LLM general — sí.' },
      { n: '[03]', text: '<strong>NestJS separado de Next.js fue la decisión correcta.</strong> El contexto acumulado de campaña, la validación canónica y la orquestación de agentes son lógica de servidor pura. Mezclarla con Route Handlers habría limitado la escalabilidad desde el primer día.' },
    ],
  },
  {
    id: 'cs-portfolio',
    num: '04',
    color: '#7aa4d4',
    colorBorder: 'rgba(122,164,212,0.25)',
    tag: 'RBT.STUDIO PORTFOLIO',
    category: 'Portfolio · Identidad digital · Creative Dev',
    title: 'El portfolio como\ndeclaración de intenciones',
    subtitle: 'Cuando el producto eres tú mismo',
    tech: ['React', 'Next.js', 'Canvas API', 'WebGL', 'Generative art', 'GSAP'],
    body: 'Un portfolio no es un CV con CSS. Es el argumento más completo que puedes hacer sobre quién eres como profesional. El rbt.studio fue diseñado desde el fondo de las artes visuales — un background de Bellas Artes que informa cada decisión técnica. Particle field en el hero, canvas Lissajous generativo, paleta dark con acentos en oro y sage. El código es el diseño.',
    right: [
      { label: '// mi rol', value: 'Diseño de identidad · Frontend · Generative art · Motion' },
      { label: '// contexto', value: '10+ años de experiencia full stack. Background en Bellas Artes (Universitat de Barcelona). El portfolio tiene que mostrar los dos mundos a la vez — técnico y creativo.' },
      { label: '// decisión estética clave', value: 'Paleta dark con gold como acento primario y sage como secundario. Sin colores de marca genéricos. Tipografía Cormorant Garamond para display — serif que cruza lo editorial con lo técnico.' },
      { label: '// diferenciador técnico', value: 'Canvas Lissajous generativo — figura paramétrica que varía en tiempo real. Particle field en el hero con física de atracción. Todo renderizado en Canvas 2D sin librerías externas.' },
    ],
    problem: {
      title: 'Posicionarse en la intersección de AI engineer y creative dev',
      body: 'Un portfolio estándar de developer no comunica la dimensión creativa. Un portfolio de diseñador no comunica la profundidad técnica. El perfil de Ricard vive exactamente en esa intersección — y el portfolio tiene que demostrarlo sin explicarlo.',
    },
    solution: {
      title: 'El propio código como pieza de portfolio',
      body: 'El generative canvas no es decoración — es la primera prueba de que el autor entiende sistemas visuales complejos. La particle field del hero responde al cursor con física de atracción. El canvas Lissajous dibuja figuras de Bowditch en tiempo real. Un recruiter técnico lo abre en DevTools y ve el código.',
    },
    pipeline: {
      title: '// capas del sistema visual',
      nodes: [
        { label: 'Identidad — dark / gold / sage', accent: false },
        { label: 'Tipografía — Cormorant + mono', accent: false },
        { label: 'Particle field hero — Canvas 2D', accent: true },
        { label: 'Lissajous canvas — paramétrico', accent: true },
        { label: 'Casos de trabajo — grid editorial', accent: false },
        { label: 'Stack visual (AI · Frontend · Systems)', accent: false },
      ],
    },
    metrics: [
      { val: '10+', label: 'años de experiencia condensados en una sola página' },
      { val: '0',   label: 'librerías externas para los efectos generativos' },
      { val: '2',   label: 'perfiles en uno — AI engineer y creative technologist' },
    ],
    quote: {
      text: '"Technical depth from 10+ years of full stack engineering. Creative precision from a fine arts background. The intersection is where I work."',
      attr: '// hero copy · rbt.studio',
    },
    learnings: [
      { n: '[01]', text: '<strong>El portfolio es el argumento, no el resumen.</strong> No lista proyectos — demuestra un punto de vista. La particle field no es decoración, es la primera frase del argumento: este developer entiende sistemas visuales en tiempo real.' },
      { n: '[02]', text: '<strong>Canvas 2D sin dependencias externas es una decisión deliberada.</strong> Three.js habría sido más rápido. La elección de implementar la física de partículas y las curvas de Lissajous desde cero demuestra comprensión matemática del sistema, no solo uso de una librería.' },
      { n: '[03]', text: '<strong>La paleta dark/gold comunica antes de que se lea una palabra.</strong> Los portfolios de developers suelen ser blancos con azul. El contraste de este sistema visual señala desde el primer segundo que el autor tiene criterio estético propio.' },
    ],
  },
  {
    id: 'cs-jarvis',
    num: '05',
    color: '#e8d06a',
    colorBorder: 'rgba(232,208,106,0.25)',
    tag: 'MICROJARVIS',
    category: 'Producto físico · IoT · AI edge computing',
    title: 'Un asistente AI\nque puedes tocar',
    subtitle: 'Raspberry Pi como nodo de automatización personal con modos activables por RFID',
    tech: ['Raspberry Pi', 'Python', 'Telegram Bot', 'n8n', 'OpenRouter', 'Vite.js', 'RFID'],
    body: 'microJarvis es un asistente de automatización personal encarnado en hardware físico. Una Raspberry Pi que vive en el escritorio, se controla por Telegram, muestra estado en un dashboard web y cambia de modo de comportamiento pasando una tarjeta RFID. Cada modo activa un pipeline de n8n distinto. El cómputo pesado — los LLMs — corre en la nube vía OpenRouter. La Raspberry solo orquesta, nunca computa.',
    right: [
      { label: '// mi rol', value: 'Hardware · Firmware Python · Backend de automatización · Dashboard frontend · Diseño del sistema de modos' },
      { label: '// modos RFID', valueHtml: '<strong>Secretario</strong> — gestión de agenda, recordatorios, emails<br/><strong>Profesor</strong> — sesiones de aprendizaje guiado, flashcards<br/><strong>Aprendiz</strong> — modo práctica, ejercicios, evaluación<br/>Cada tarjeta RFID = un perfil de comportamiento distinto' },
      { label: '// decisión de arquitectura clave', value: 'Compute offloading total. La Raspberry no ejecuta ningún modelo — solo recibe input, enruta a n8n, y muestra output. OpenRouter gestiona el modelo según el modo activo. El dispositivo puede funcionar con hardware mínimo de forma indefinida.' },
    ],
    problem: {
      title: 'Los asistentes AI viven en pantallas, no en el espacio',
      body: 'Abrir una app o una pestaña para activar un asistente tiene fricción. Requiere intención consciente. Un dispositivo físico en el escritorio es siempre visible, siempre accesible, y puede cambiar de modo de forma tangible — pasar una tarjeta es más inmediato que navegar un menú.',
    },
    solution: {
      title: 'Hardware mínimo, automatización máxima',
      body: 'Un lector RFID detecta la tarjeta, identifica el modo, dispara el pipeline de n8n correspondiente. Telegram es la interfaz de conversación — sin app propia, sin login, sin fricción. El dashboard en Vite.js muestra el modo activo, el historial de tareas y el estado del sistema.',
    },
    pipeline: {
      title: '// sistema de modos — flujo de activación',
      nodes: [
        { label: 'Tarjeta RFID detectada', accent: false },
        { label: 'Raspberry Pi lee UID', accent: false },
        { label: 'Modo identificado', accent: false },
        { label: 'Trigger webhook n8n', accent: false },
        { label: 'Pipeline n8n del modo', accent: true },
        { label: 'OpenRouter · modelo por tarea', accent: false },
        { label: 'Respuesta vía Telegram', accent: false },
        { label: 'Dashboard Vite.js actualizado', accent: false },
      ],
    },
    metrics: [
      { val: '3+', label: 'modos de comportamiento activables por RFID' },
      { val: '0',  label: 'cómputo LLM local — todo offloading a OpenRouter' },
      { val: '1',  label: 'interfaz física para controlar pipelines de automatización' },
    ],
    quote: {
      text: '"Pasar una tarjeta RFID para cambiar el modo de tu asistente AI es más inmediato que abrir una app. La fricción cero no es una metáfora — es literal."',
      attr: '// design insight · microJarvis',
    },
    learnings: [
      { n: '[01]', text: '<strong>Hardware mínimo + compute offloading = producto indefinidamente escalable.</strong> La Raspberry Pi no limita las capacidades del asistente porque no ejecuta ningún modelo. Añadir un nuevo modo es añadir un pipeline en n8n, no tocar el hardware.' },
      { n: '[02]', text: '<strong>Telegram como interfaz elimina la necesidad de una app propia.</strong> El usuario ya tiene Telegram instalado. Sin login, sin onboarding, sin fricción de distribución. La conversación es el producto — no el wrapper alrededor de la conversación.' },
      { n: '[03]', text: '<strong>n8n como capa de automatización desacopla los modos del firmware.</strong> Cada modo es un workflow independiente en n8n. Se pueden añadir, modificar o desactivar modos sin tocar el código Python de la Raspberry.' },
    ],
  },
]

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionDivider({ num, tag }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '72px 0 0', marginBottom: '0' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: D.faint, letterSpacing: '0.1em' }}>{num}</span>
      <div style={{ flex: 1, height: '1px', background: D.line }} />
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '10px', padding: '3px 10px',
        border: `1px solid ${D.line}`, color: D.muted, letterSpacing: '0.14em',
      }}>{tag}</span>
    </div>
  )
}

function TechTag({ label }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: '10px', padding: '2px 8px',
      border: `1px solid ${D.line}`, color: D.muted, letterSpacing: '0.04em',
      lineHeight: '1.6',
    }}>{label}</span>
  )
}

function RightBlock({ label, value, valueHtml }) {
  return (
    <div style={{ borderTop: `1px solid ${D.line}`, paddingTop: '20px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: D.faint, letterSpacing: '0.15em', marginBottom: '8px' }}>{label}</div>
      {valueHtml
        ? <div style={{ fontSize: '12px', color: D.soft, lineHeight: '1.85' }} dangerouslySetInnerHTML={{ __html: valueHtml.replace(/<strong>/g, `<strong style="color:${D.text};font-weight:500">`) }} />
        : <div style={{ fontSize: '12px', color: D.soft, lineHeight: '1.85' }}>{value}</div>
      }
    </div>
  )
}

function PipelineNode({ label, accent, color }) {
  return (
    <span style={{
      padding: '5px 10px',
      border: `1px solid ${accent ? color.replace(')', ',0.35)').replace('rgb', 'rgba') : D.line}`,
      fontSize: '10px',
      color: accent ? color : D.soft,
      background: D.bgCard,
      whiteSpace: 'nowrap',
      lineHeight: '1.4',
      fontFamily: 'var(--font-mono)',
    }}>{label}</span>
  )
}

function Metric({ val, label, color }) {
  return (
    <div style={{ background: D.bgCard, padding: '28px 24px', border: `1px solid ${D.line}` }}>
      <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(1.8rem,3vw,2.4rem)', color, lineHeight: 1, marginBottom: '8px' }}>{val}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: D.muted, lineHeight: 1.5 }}>{label}</div>
    </div>
  )
}

function CaseBlock({ c }) {
  return (
    <div style={{ paddingTop: '56px', paddingBottom: '72px', borderBottom: `1px solid ${D.line}` }}>
      {/* Header grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '48px', marginBottom: '48px',
        paddingBottom: '48px', borderBottom: `1px solid ${D.line}`,
      }} className="cs-header-grid">
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: c.color, letterSpacing: '0.15em', marginBottom: '16px' }}>{c.category}</div>
          <h2 style={{
            fontFamily: 'var(--font-sans)', fontWeight: 700,
            fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: D.cream, lineHeight: 1.05,
            marginBottom: '12px', whiteSpace: 'pre-line',
          }}>{c.title}</h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontStyle: 'italic', fontSize: '1rem', color: D.muted, marginBottom: '28px' }}>{c.subtitle}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '28px' }}>
            {c.tech.map(t => <TechTag key={t} label={t} />)}
          </div>
          <p style={{ fontSize: '13px', color: D.soft, lineHeight: 1.85 }}>{c.body}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {c.right.map(r => <RightBlock key={r.label} {...r} />)}
        </div>
      </div>

      {/* Problem / Solution */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: D.line, marginBottom: '40px' }} className="cs-ps-grid">
        {[
          { label: '// el problema', ...c.problem },
          { label: '// la solución', ...c.solution },
        ].map(block => (
          <div key={block.label} style={{ background: D.bg, padding: '32px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: D.faint, letterSpacing: '0.15em', marginBottom: '12px' }}>{block.label}</div>
            <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '1.1rem', color: D.cream, marginBottom: '12px', lineHeight: 1.2 }}>{block.title}</h3>
            <p style={{ fontSize: '12px', color: D.soft, lineHeight: 1.85 }}>{block.body}</p>
          </div>
        ))}
      </div>

      {/* Pipeline */}
      <div style={{ border: `1px solid ${D.line}`, marginBottom: '40px', overflow: 'hidden' }}>
        <div style={{ padding: '8px 16px', background: D.bgCard, borderBottom: `1px solid ${D.line}`, fontFamily: 'var(--font-mono)', fontSize: '10px', color: D.faint, letterSpacing: '0.12em' }}>
          {c.pipeline.title}
        </div>
        <div style={{ padding: '20px 16px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px', rowGap: '8px' }}>
          {c.pipeline.nodes.map((node, i) => (
            <span key={i} style={{ display: 'contents' }}>
              <PipelineNode label={node.label} accent={node.accent} color={c.color} />
              {i < c.pipeline.nodes.length - 1 && (
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: D.faint, padding: '0 2px' }}>→</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: D.line, marginBottom: '40px' }} className="cs-metrics-grid">
        {c.metrics.map(m => <Metric key={m.val} {...m} color={c.color} />)}
      </div>

      {/* Quote */}
      <div style={{ borderLeft: `2px solid ${c.color}`, padding: '20px 24px', marginBottom: '40px', background: D.bgCard }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontStyle: 'italic', fontSize: '1.1rem', color: D.text, lineHeight: 1.55, marginBottom: '8px' }}>{c.quote.text}</p>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: D.faint, letterSpacing: '0.08em' }}>{c.quote.attr}</span>
      </div>

      {/* Learnings */}
      <div>
        {c.learnings.map(l => (
          <div key={l.n} style={{ display: 'flex', gap: '16px', padding: '14px 0', borderBottom: `1px solid ${D.faint}`, fontSize: '12px', color: D.soft, lineHeight: 1.85 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: D.faint, flexShrink: 0, paddingTop: '2px' }}>{l.n}</span>
            <span dangerouslySetInnerHTML={{ __html: l.text.replace(/<strong>/g, `<strong style="color:${D.text};font-weight:500">`) }} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function CaseStudies() {
  const sectionRef = useRef(null)
  const titleRef   = useRef(null)
  const indexRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      )
      gsap.fromTo('.cs-index-item',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out',
          scrollTrigger: { trigger: indexRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      )
      gsap.utils.toArray('.cs-case-block').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none reverse' } }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="case-studies"
      style={{ backgroundColor: D.bg, paddingBottom: '96px' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>

        {/* Section header */}
        <div ref={titleRef} style={{ paddingTop: '96px', paddingBottom: '64px', borderBottom: `1px solid ${D.line}`, opacity: 0 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#15C1C1', marginBottom: '24px' }}>
            AI Product Experience · 2024–2025
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'end' }} className="cs-hero-grid">
            <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(2.4rem,5vw,4rem)', color: D.cream, lineHeight: 1.0, letterSpacing: '-0.02em' }}>
              Full-stack<br />AI products,<br /><em style={{ fontStyle: 'italic', color: D.muted }}>end to end</em>
            </h2>
            <div style={{ display: 'flex', gap: '40px', paddingLeft: '32px', borderLeft: `1px solid ${D.line}` }} className="cs-hero-stats">
              {[
                { val: '3',  label: 'productos enviados' },
                { val: '6+', label: 'agentes AI diseñados y construidos' },
                { val: '1',  label: 'engineer, end to end' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: D.cream, lineHeight: 1, marginBottom: '4px' }}>{s.val}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: D.muted, letterSpacing: '0.08em', lineHeight: 1.4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Index */}
        <div ref={indexRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', borderBottom: `1px solid ${D.line}` }} className="cs-index-grid">
          {CASES.map(c => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="cs-index-item"
              style={{
                display: 'block', padding: '28px 20px',
                borderRight: `1px solid ${D.line}`,
                transition: 'background 200ms',
                opacity: 0,
                textDecoration: 'none',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: D.faint, marginBottom: '10px' }}>{c.num} ——</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '1rem', color: D.cream, marginBottom: '8px' }}>{c.tag.replace(' PORTFOLIO', '')}</div>
              <div style={{ height: '1px', width: '28px', background: c.color, marginTop: '16px' }} />
            </a>
          ))}
        </div>

        {/* Case studies */}
        {CASES.map(c => (
          <div key={c.id} id={c.id} className="cs-case-block" style={{ opacity: 0 }}>
            <SectionDivider num={c.num} tag={c.tag} />
            <CaseBlock c={c} />
          </div>
        ))}

      </div>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 900px) {
          .cs-hero-grid,
          .cs-header-grid,
          .cs-ps-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .cs-hero-stats { border-left: none !important; padding-left: 0 !important; border-top: 1px solid ${D.line} !important; padding-top: 24px !important; gap: 24px !important; }
          .cs-index-grid { grid-template-columns: repeat(2,1fr) !important; }
          .cs-metrics-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .cs-index-grid { grid-template-columns: 1fr !important; }
          .cs-metrics-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
