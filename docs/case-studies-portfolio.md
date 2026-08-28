# Case Studies — Dossier freelance

Documento de referencia para perfiles online (Fiverr, Upwork, Malt, Contra, LinkedIn).
Cada caso incluye: ficha rápida, textos largos en español, **pitch corto en inglés** listo
para pegar en un gig, y las rutas de imagen/vídeo que hay en el repo.

Las rutas son relativas a `public/` — en producción cuelgan de la raíz del sitio
(`https://rbt.studio/assets/proyectos/...`).

**Índice**

| # | Proyecto | Tipo | Media |
|---|---|---|---|
| 01 | [StoryPrints](#01--storyprints) | Producto propio · SaaS EdTech | 1 vídeo |
| 02 | [BrandAI](#02--brandai) | Producto propio · SaaS | 2 vídeos |
| 03 | [VampMaker](#03--vampmaker) | Producto propio · Herramienta creativa | 1 vídeo |
| 04 | [rbt.studio](#04--rbtstudio) | Portfolio propio | — |
| 05 | [microJarvis](#05--microjarvis) | Producto propio · IoT | — |
| 06 | [Aimplas](#06--aimplas) | Cliente · App móvil 3D | 2 vídeos + 1 imagen |
| 07 | [D-Go](#07--d-go) | Cliente · Web de producto | 1 vídeo + 2 imágenes |
| 08 | [The Smart Lollipop](#08--the-smart-lollipop) | Cliente · Landing startup | 1 vídeo + 2 imágenes |

Además: [Anexo — otros trabajos de cliente](#anexo--otros-trabajos-de-cliente) y
[Inventario de media](#inventario-de-media).

---

## 01 · StoryPrints

**Cuando jugar y crear son la misma cosa** — Ser el autor del propio cuento

| | |
|---|---|
| **Tipo** | Producto propio · SaaS · B2C + B2B2C · EdTech |
| **Mi rol** | Product design · Full-stack · Prompt engineering · Integración de pagos |
| **Stack** | Next.js · Supabase · OpenRouter · Upstash Redis · LemonSqueezy · SVG generativo |
| **Estado** | Beta |

**Resumen.** Los productos digitales para niños los tratan como consumidores pasivos.
StoryPrints invierte esa lógica — el producto es el acto de crear, no el resultado. Un
wizard visual de cuatro pasos lleva al niño desde la idea hasta un cuento ilustrado
completo en menos de cuatro minutos, sin leer ni escribir hasta el momento clave: el giro
final, donde la historia se vuelve suya de verdad.

**Problema — La creatividad infantil no tenía un lienzo digital.** Cada app existente para
niños produce contenido para consumir, no para crear. El reto no era técnico: era encontrar
el punto exacto donde la IA hace suficiente para que el resultado impresione, pero el niño
siente que la historia es suya.

**Solución — Autoría guiada con un giro final de texto libre.** Cuatro pasos de selección
visual, sin leer ni escribir. La IA genera el cuento completo con ilustraciones SVG
editoriales. Solo entonces aparece el momento de escritura: el niño añade su propio giro al
final. Colocado después del cuento generado, cuando ya le importa la historia, la tasa de
uso del giro alcanza el 68%.

**Usuarios.** Niños de 5–9 años (flujo autónomo sin texto) · Padres (modo regalo, checkout
móvil) · Maestras (modo aula, panel de sesión).

**Arquitectura.** Wizard visual → caché de sesión en Redis → rate limiting por plan →
**OpenRouter (narrativa)** → streaming al cliente → render de ilustración SVG → giro del
autor → persistencia en Supabase → export PDF A5 / LemonSqueezy.

**Cifras.** `<4 min` de entrada al primer cuento · `68%` de sesiones usan el giro final ·
`+72` NPS de padres en beta.

**Learnings.**
1. SVG generativo frente a imagen generativa: es instantáneo, consistente entre páginas, y
   los niños perciben el personaje como suyo más fácilmente que con imagen fotorrealista.
2. Tres funnels dentro del mismo producto — niño, padre y maestra tienen flujos, métricas y
   modelo de negocio separados. Tratarlos como uno produce una experiencia mediocre para los tres.
3. El rate limiting en Redis es el seguro más barato del stack: sin él, un plan gratuito sin
   límites genera facturas de API inmanejables en la primera semana de beta pública.

**Media**
- 🎬 `assets/proyectos/captures/storyprints-wizard.mp4` — 1280×718 · 45s · 2,0 MB

> **EN pitch (gig-ready).** *StoryPrints — AI storybook builder for kids.* A four-step visual
> wizard takes a 5–9 year old from idea to a fully illustrated storybook in under four
> minutes, with no reading or typing required until the final twist they write themselves.
> Built with Next.js, Supabase and OpenRouter (multi-model LLM gateway), with Redis rate
> limiting and LemonSqueezy for EU-compliant payments. Three separate funnels — kids,
> parents, teachers — in one product.

---

## 02 · BrandAI

**Identidad de marca portable entre herramientas de IA** — El sistema de diseño que viaja contigo

| | |
|---|---|
| **Tipo** | Producto propio · SaaS · B2C · Freelancers & creators |
| **Mi rol** | Product design · Full-stack · Arquitectura multi-agente · Prompt engineering |
| **Stack** | Next.js · Supabase · OpenRouter · Upstash Redis · Multi-agent · Markdown |
| **Estado** | Beta cerrada |

**Resumen.** El problema de coherencia visual en proyectos pequeños no es de talento — es de
memoria. Cada vez que usas un LLM para generar algo para tu marca, empiezas de cero. BrandAI
orquesta cinco agentes especializados para generar un `design.md` completo: paleta,
tipografía, tono verbal, espaciado, tokens. Un archivo Markdown que viaja contigo a
cualquier LLM, Cursor o pipeline.

**Problema — Los LLMs no recuerdan quién eres.** Un design system completo en Figma o Notion
es inaccesible para proyectos pequeños en tiempo y dinero. Pero sin contexto de marca, cada
generación de IA produce algo inconsistente con lo anterior, y la identidad se fragmenta con
cada herramienta que usas.

**Solución — Un artefacto portable generado por agentes especializados.** Cinco agentes en
pipeline (orquestador, paleta, tipografía, tono verbal, validador de consistencia) generan un
`design.md` completo en 60–90 segundos. El validador detecta inconsistencias entre capas y
relanza los agentes afectados. El resultado viaja al IDE, al chat y al prompt del generador
de imagen.

**Arquitectura.** Input en lenguaje natural → **orquestador** → agentes de paleta,
tipografía y tono verbal → caché Redis por hash semántico → **validador de consistencia** →
ensamblado del `design.md` → versionado en Supabase.

**Cifras.** `60–90s` de generación completa · `~30%` de ahorro de coste vía caché Redis ·
`40%` de retorno al modo evolución en 30 días.

**Learnings.**
1. El validador de consistencia es el agente más caro y el más valioso: sin él el orquestador
   ensambla secciones que se contradicen (paleta fría con tono «cálido y terroso»).
2. El modo evolución retiene más que el modo generación — con el `design.md` versionado, cada
   actualización de marca que vuelve es un ciclo de retención natural.
3. Distintos modelos por agente vía OpenRouter fue decisivo: GPT-4o-mini superó a Claude Haiku
   en tono verbal para marcas wellness en inglés, con un cambio de una línea en el config.

**Media**
- 🎬 `assets/proyectos/captures/brandAI1.mp4` — 1280×674 · 47s · 2,0 MB
- 🎬 `assets/proyectos/captures/brandAI2.mp4` — 1280×574 · 54s · 2,3 MB

> **EN pitch (gig-ready).** *BrandAI — a portable brand system for the AI era.* Five
> specialised agents (orchestrator, palette, typography, voice, consistency validator)
> generate a complete `design.md` in 60–90 seconds — palette, type scale, tone of voice,
> spacing, tokens. Markdown, not Figma: the most portable artefact in the ecosystem, usable
> in any LLM, IDE or CI pipeline. Multi-model routing via OpenRouter with semantic-hash Redis
> caching cuts generation cost by ~30%.

---

## 03 · VampMaker

**Agentes de IA para el Director de Juego de Mundo de Tinieblas** — El copiloto del narrador de tinieblas

| | |
|---|---|
| **Tipo** | Producto propio · Herramienta creativa · Nicho B2C · TRPG |
| **Mi rol** | Arquitectura full-stack · Diseño del sistema de agentes · Product design · UX |
| **Stack** | Next.js · NestJS · PostgreSQL · Prisma · OpenRouter · Cloudflare R2 |
| **Estado** | Alpha con DJs reales |

**Resumen.** Dirigir una partida de Mundo de Tinieblas es improvisación sostenida bajo
presión. El Director de Juego puede invertir 6–8 horas preparando una sesión de 3. VampMaker
es el asistente que nunca tuvo: memoria canónica perfecta, NPCs generados en menos de dos
minutos y opciones de escena accionables en 10 segundos cuando los jugadores se salen del
guion.

**Problema — La preparación consume más que la sesión.** Fichas de NPCs, mapas de relaciones
entre clanes, líneas de tiempo, ganchos narrativos: todo debe ser coherente con décadas de
canon. Los LLMs generales conocen el universo de forma superficial y producen personajes que
rompen la inmersión.

**Solución — Dos agentes: Researcher extrae canon, Creator genera ficha.** El Researcher
extrae arquetipos coherentes con el clan, la ciudad, los conflictos activos y las Disciplines
disponibles. El Creator genera la ficha completa — atributos, trasfondo, secretos solo
visibles para el DJ y tres ganchos narrativos. La campaña acumula contexto sesión a sesión.

**Arquitectura.** Input del DJ (clan, ciudad, rol) → **Researcher Agent** → contexto canónico
→ **Creator Agent** → ficha + ganchos → PostgreSQL/Prisma → campaña activa.

**Cifras.** `<2 min` por NPC completo · `3` modos (preparación · mid-sesión · entre sesiones)
· `60%` de adopción del modo mid-sesión tras dos sesiones.

**Learnings.**
1. El modo mid-sesión necesita formato, no texto: tres opciones de escena con consecuencias
   mecánicas incluidas, decidibles en 10 segundos. Un párrafo lo rompe todo.
2. La especificidad de nicho es la ventaja defensible — un producto genérico para «creadores
   de contenido de rol» no tiene moat.
3. NestJS separado de Next.js fue la decisión correcta: contexto de campaña, validación
   canónica y orquestación de agentes son lógica de servidor pura.

**Media**
- 🎬 `assets/proyectos/captures/vampmaker.mp4` — 1280×702 · 81s · 9,1 MB

> **EN pitch (gig-ready).** *VampMaker — an AI co-pilot for tabletop RPG game masters.* Two
> chained agents (canon researcher + character creator) produce fully playable NPCs with
> secrets and story hooks in under two minutes, consistent with decades of published lore.
> Next.js front end, NestJS agent orchestration service, PostgreSQL/Prisma for accumulating
> campaign context across sessions.

---

## 04 · rbt.studio

**Cuando el producto eres tú mismo** — El portfolio como declaración de intenciones

| | |
|---|---|
| **Tipo** | Portfolio propio · Identidad digital · Creative dev |
| **Mi rol** | Diseño de identidad · Frontend · Generative art · Motion |
| **Stack** | React · Vite · Canvas API · GSAP · Tailwind · Arte generativo |
| **Estado** | En producción — rbt.studio |

**Resumen.** Un portfolio no es un CV con CSS: es el argumento más completo que puedes hacer
sobre quién eres como profesional. rbt.studio está diseñado desde el fondo de las artes
visuales — un background de Bellas Artes que informa cada decisión técnica. Particle field en
el hero, canvas Lissajous generativo, paleta dark con acentos en teal y crema. El código es el
diseño.

**Problema — Posicionarse en la intersección de AI engineer y creative dev.** Un portfolio
estándar de developer no comunica la dimensión creativa; uno de diseñador no comunica la
profundidad técnica. Si tienes que explicar que eres creativo, ya has perdido.

**Solución — El propio código como pieza de portfolio.** El generative canvas no es
decoración: es la primera prueba de que el autor entiende sistemas visuales complejos. La
particle field responde al cursor con física de atracción; el canvas Lissajous dibuja figuras
de Bowditch en tiempo real. Un recruiter técnico lo abre en DevTools y ve el código; uno de
diseño ve el resultado.

**Cifras.** `10+` años de experiencia condensados en una página · `0` librerías externas para
los efectos generativos · `2` perfiles en uno (AI engineer + creative technologist).

**Learnings.**
1. El portfolio es el argumento, no el resumen: no lista proyectos, demuestra un punto de vista.
2. Canvas 2D sin dependencias es una decisión deliberada — Three.js habría sido más rápido;
   implementar la física y las curvas desde cero demuestra comprensión matemática del sistema.
3. La paleta dark/crema comunica antes de que se lea una palabra.

**Media** — el propio sitio (`rbt.studio`) hace de demo. Para perfiles online, grabar un
scroll-through de 30–40 s del hero + galería sería el activo que falta.

> **EN pitch (gig-ready).** *rbt.studio — portfolio as a statement.* A React/Vite site whose
> generative visuals are written from scratch in Canvas 2D — a cursor-reactive particle field
> and a real-time parametric Lissajous canvas, zero external graphics libraries. Ten years of
> full-stack engineering presented through a fine-arts visual system.

---

## 05 · microJarvis

**Raspberry Pi como nodo de automatización personal con modos activables por RFID** — Un asistente AI que puedes tocar

| | |
|---|---|
| **Tipo** | Producto propio · Hardware · IoT · AI edge |
| **Mi rol** | Hardware · Firmware Python · Backend de automatización · Dashboard · Diseño del sistema de modos |
| **Stack** | Raspberry Pi · Python · Telegram Bot · n8n · OpenRouter · Vite.js · RFID |
| **Estado** | Funcionando |

**Resumen.** microJarvis es un asistente de automatización personal encarnado en hardware. Una
Raspberry Pi que vive en el escritorio, se controla por Telegram, muestra estado en un
dashboard web y cambia de modo de comportamiento pasando una tarjeta RFID. Cada modo activa un
pipeline distinto de n8n. El cómputo pesado corre en la nube vía OpenRouter: la Raspberry solo
orquesta, nunca computa.

**Problema — Los asistentes AI viven en pantallas, no en el espacio.** Abrir una app o una
pestaña para activar un asistente tiene fricción y requiere intención consciente. Un
dispositivo físico siempre visible puede cambiar de modo de forma tangible.

**Solución — Hardware mínimo, automatización máxima.** Un lector RFID detecta la tarjeta,
identifica el modo y dispara el pipeline de n8n correspondiente. Telegram es la interfaz de
conversación — sin app propia, sin login, sin fricción. El dashboard en Vite.js muestra modo
activo, historial y estado del sistema.

**Modos.** Secretario (agenda, recordatorios, emails) · Profesor (aprendizaje guiado,
flashcards) · Aprendiz (práctica, ejercicios, evaluación).

**Cifras.** `3+` modos activables por RFID · `0` cómputo LLM local · `1` interfaz física para
controlar pipelines de automatización.

**Learnings.**
1. Hardware mínimo + compute offloading = producto indefinidamente escalable: añadir un modo es
   añadir un workflow en n8n, no tocar el hardware.
2. Telegram como interfaz elimina la necesidad de app propia — sin login ni onboarding.
3. n8n desacopla los modos del firmware: se añaden o desactivan sin tocar el Python.

**Media** — sin captura todavía. Un vídeo corto del gesto RFID → respuesta en Telegram sería el
activo con más impacto para un perfil online.

> **EN pitch (gig-ready).** *microJarvis — a personal AI assistant you can touch.* A Raspberry
> Pi desk device that switches behaviour modes when you tap an RFID card, each mode firing a
> different n8n automation pipeline. Telegram is the conversational interface (no app, no
> login); all model inference is offloaded to OpenRouter, so the hardware never limits what the
> assistant can do.

---

## 06 · Aimplas

**App 3D para tablets que acompaña a un casco y un patinete reales** — Un prototipo que se explica solo

| | |
|---|---|
| **Tipo** | Cliente · App móvil · 3D interactivo · I+D industrial |
| **Cliente** | Aimplas — en colaboración con Stimulo Design Studio |
| **Mi rol** | UX/UI · Desarrollo frontend · Integración de API con CMS headless |
| **Stack** | React Native · Expo.dev · Three.js · CMS headless · API REST |
| **Estado** | Entregado |

**Resumen.** Aimplas desarrolló, junto a Stimulo Design Studio, un prototipo físico de casco y
patinete que concentra varias innovaciones en materiales. El problema de un prototipo así es
que sus avances no se ven: están dentro del material. La app para tablets es la capa que los
hace visibles — un acompañante que se usa delante del objeto real, en ferias y demostraciones.

**Problema — La innovación estaba dentro del material, no a la vista.** Un casco y un patinete
de nueva generación parecen, a simple vista, un casco y un patinete. Había que explicar
innovaciones de composición y proceso a públicos muy distintos —desde un visitante casual
hasta un ingeniero de materiales— sin convertir la app en un manual técnico ni en un folleto
vacío.

**Solución — Tres formatos de lectura sobre el mismo contenido.** La navegación se personaliza
según el tipo de usuario y ofrece la misma información en tres profundidades: elementos 3D
interactivos para explorar el objeto, una retícula de imágenes de detalle para una lectura
rápida y un listado completo de innovaciones para quien quiere el dato.

**Arquitectura.** CMS headless → API REST → **app Expo / React Native** → **navegación por
perfil** → modelo 3D interactivo · grid de detalles · listado de innovaciones.

**Cifras.** `3` formatos de contenido sobre la misma información · `0` reinstalaciones
necesarias para actualizar contenido · `1` app que acompaña al prototipo físico.

**Learnings.**
1. El contenido desacoplado es un requisito, no una comodidad: una app de feria se actualiza el
   día antes del evento.
2. El 3D es la puerta de entrada, no el destino — quien busca el dato técnico necesita una lista.
3. Expo redujo la fricción de distribución en un parque de tablets: actualizar varios
   dispositivos de demostración es una tarea logística, no técnica.

**Media**
- 🎬 `assets/proyectos/captures/aimplas-3d.mp4` — 640×400 · 34s · 440 KB (navegación 3D)
- 🎬 `assets/proyectos/captures/aimplas-menu.mp4` — 640×400 · 24s · 336 KB (menú de la app)
- 🖼 `assets/proyectos/webs/Aimplas_Thumb.webp` — 600×459 (thumbnail)
- Originales sin comprimir: `webs/AIMPLAS_MENU.mov`, `webs/Menu_Aimplas.mov`

> **EN pitch (gig-ready).** *Aimplas — 3D tablet app for a physical prototype.* A React Native
> / Expo app that unpacks the material innovations hidden inside a real helmet-and-scooter
> prototype at trade shows. Same content in three depths — interactive 3D, image detail grid
> and a full innovation list — with per-profile navigation. All copy and media served from a
> headless CMS over REST, so the client updates the show content without a rebuild or a
> reinstall on any tablet.

---

## 07 · D-Go

**Web para D-Go, un motor direct-drive para bicicletas de carga** — Datos técnicos que se leen como relato

| | |
|---|---|
| **Tipo** | Cliente · Web de producto · 3D · Movilidad eléctrica |
| **Cliente** | D-Go — con el equipo de marketing de Stimulo Design Studio |
| **Mi rol** | UX/UI · Desarrollo frontend · Desarrollo integral del sitio |
| **Stack** | Frontend development · Gráficos 3D · Animación por scroll · UX/UI |
| **Estado** | En producción — [d-go.eu](https://www.d-go.eu) |

**Resumen.** D-Go es un motor eléctrico premium para bicicletas de carga. Su valor está en la
ingeniería: par, integración, transmisión directa. Todo lo que lo hace bueno es difícil de
contar. La web se desarrolló con el equipo de marketing de Stimulo para resolver exactamente
eso: presentar información técnica compleja de forma clara y visual, sin diluirla.

**Problema — La ficha técnica no vende ingeniería.** Una tabla de especificaciones es precisa y
no comunica nada; un texto comercial comunica y pierde la precisión que justifica el precio de
un producto premium.

**Solución — Gráficos 3D sincronizados con el scroll.** Se crearon gráficos 3D y se
sincronizaron varias narrativas con el desplazamiento del usuario. Al ceder el control del
tempo al visitante, el contenido técnico deja de ser una imposición y se convierte en
exploración.

**Arquitectura narrativa.** Assets 3D del motor → guion técnico por secciones → **scroll del
usuario** → **sincronización de narrativas** → render 3D por tramo → capas de dato técnico →
CTA de producto.

**Cifras.** `3D` gráficos propios para explicar el mecanismo · `1:1` scroll y narrativa
sincronizados · sitio público en producción.

**Learnings.**
1. Ceder el control del tempo cambia la relación con el contenido denso: un vídeo autoplay
   impone un ritmo, el scroll lo negocia.
2. El 3D enseña el mecanismo; el texto solo lo describe. La animación no es adorno, es la
   explicación.
3. Trabajar con el equipo de marketing desde el inicio evita rehacer: la estructura de scroll
   es la estructura del mensaje.

**Media**
- 🎬 `assets/proyectos/captures/dgo-web.mp4` — 1280×900 · 47s · 6,7 MB (scroll narrativo)
- 🖼 `assets/proyectos/webs/DGO_Tech-scaled.webp` — 2560×1553 (sección técnica)
- 🖼 `assets/proyectos/webs/MOvile_DGO.webp` — 470×954 (versión móvil)
- Original sin comprimir: `webs/D-Go.mov` (57 MB) · versión antigua: `captures/d-go.mp4`

> **EN pitch (gig-ready).** *D-Go — turning engineering specs into a story.* A product site for
> a premium direct-drive cargo-bike motor, built with the client's marketing team. Custom 3D
> graphics and multiple narratives synchronised to the user's scroll let visitors set the tempo
> of a dense technical story — so the spec sheet becomes something people finish reading.
> Live at d-go.eu.

---

## 08 · The Smart Lollipop

**Landing para The Smart Lollipop, un dispositivo de salud infantil** — Cómo cuenta su producto una startup

| | |
|---|---|
| **Tipo** | Cliente · Landing de producto · Startup · 3D + GSAP |
| **Cliente** | The Smart Lollipop — en colaboración con Stimulo Design Agency |
| **Mi rol** | Comunicación · UX/UI · Desarrollo frontend · Animaciones 3D y GSAP |
| **Stack** | Frontend development · Gráficos 3D · GSAP · Plantillas a medida |
| **Estado** | En producción — [thesmartlollipop.com](https://www.thesmartlollipop.com) |

**Resumen.** The Smart Lollipop es una startup con un producto que no se parece a nada previo
— y por tanto sin lenguaje visual heredado del que tirar. El proyecto se desarrolló en estrecha
colaboración con Stimulo Design Agency, combinando creatividad y tecnología.

**Problema — Una startup sin lenguaje propio todavía.** Antes de construir la web había que
resolver algo anterior: cómo presenta este producto lo que hace y por qué importa. Sin
referentes directos de categoría, cada decisión visual y narrativa define el posicionamiento.

**Solución — Narrativa 3D con el tempo en manos del usuario.** Se integraron gráficos animados
en 3D con narrativas sincronizadas al scroll del navegador: el usuario marca el ritmo del
relato y desarrolla empatía con el producto. En paralelo, un sistema de plantillas a medida
permite al equipo actualizar contenido sin romper la coherencia del diseño.

**Arquitectura narrativa.** **Definición del mensaje** → guion por secciones → gráficos 3D
animados → **GSAP · scroll sync** → plantillas a medida → gestión de contenido.

**Cifras.** `3D` gráficos animados sincronizados con el scroll · `∞` actualizaciones de
contenido sin tocar el diseño · `1` lenguaje visual definido desde cero con la startup.

**Learnings.**
1. En una startup, la web se diseña después del mensaje.
2. Las plantillas a medida son el equilibrio entre libertad y coherencia: acotan la libertad
   al espacio donde no rompe nada.
3. La empatía con el producto se construye con ritmo, no con adjetivos.

**Media**
- 🎬 `assets/proyectos/captures/smartlolipop.mp4` — 1280×712 · 47s · 3,1 MB
- 🖼 `assets/proyectos/webs/tsl_tsl_core.webp` — 1196×753
- 🖼 `assets/proyectos/webs/TSL_Group-scaled.webp` — 2560×2138
- Original alternativo: `webs/TSL_480.mov` (640×436, sin usar)

> **EN pitch (gig-ready).** *The Smart Lollipop — defining how a startup tells its story.* A
> launch site for a first-of-its-kind children's health device, built with Stimulo Design
> Agency. Scroll-synchronised 3D animation (GSAP) hands the pacing of the narrative to the
> visitor, building empathy with an unfamiliar product — backed by a custom template system so
> the team can keep publishing without eroding the design. Live at thesmartlollipop.com.

---

## Anexo — otros trabajos de cliente

Trabajo con captura disponible, útil como prueba de volumen y de sectores. Todas las rutas
cuelgan de `assets/proyectos/`.

| Cliente | Sector | Tecnología | Media |
|---|---|---|---|
| **UCSF** (Univ. California San Francisco) | Investigación médica | Drupal · tema y plugins a medida | `webs/screencapture-balance-ucsf-edu-*.png`, `webs/screencapture-chowlab-ucsf-edu-*.png` |
| **Sant Joan de Déu (SJD)** | Salud / tercer sector | WordPress · sistema de bloques a medida | 24 capturas en `captures/Captura_*.PNG` |
| **Veritas** | Retail ecológico / e-commerce | Custom · mapas | `webs/screencapture-veritas-es-*.png` · 🎬 `captures/veritas-mapa.mp4` (52s) |
| **Universitat de Barcelona** | Educación superior | Custom · intranet · mobile | `webs/intranet_displays.jpg`, `webs/avantatges_*`, `webs/vespres1–4.PNG`, `webs/charm-eu.png` |
| **E.Casals** | Industrial | WordPress | `webs/screencapture-ecasals-net-*.png` |
| **Obra Social San Juan de Dios** | Tercer sector | WordPress | `webs/screencapture-obrasocialsanjuandedios-es-*.png` |
| **Carrete** | Cultural | Drupal · tema y plugins a medida | `webs/carrete1.png`, `carrete2.png`, `carrete5.png` |
| **Elche.me** | Institucional | Drupal · tema y plugins a medida | `webs/screencapture-elche-me-*.png` |
| **Cultura Sitges** | Cultural / agenda | WordPress | `webs/screencapture-culturasitges-cat-*.png` |
| **Marc Gómez del Moral** | Portfolio artístico | Custom | 🎬 `captures/Marcgomezdelmoral.mp4` (76s) |
| Otros | Varios | React · Webflow · e-commerce · custom | Ecowave, Terpenic, Entangle, El Risell, Coralimentación, Hyphen, Gallantium, AI Research COVID |

---

## Inventario de media

**Vídeos** (`public/assets/proyectos/captures/`)

| Archivo | Proyecto | Resolución | Duración | Peso |
|---|---|---|---|---|
| `storyprints-wizard.mp4` | StoryPrints | 1280×718 | 45s | 2,0 MB |
| `brandAI1.mp4` | BrandAI | 1280×674 | 47s | 2,0 MB |
| `brandAI2.mp4` | BrandAI | 1280×574 | 54s | 2,3 MB |
| `vampmaker.mp4` | VampMaker | 1280×702 | 81s | 9,1 MB |
| `aimplas-3d.mp4` | Aimplas | 640×400 | 34s | 440 KB |
| `aimplas-menu.mp4` | Aimplas | 640×400 | 24s | 336 KB |
| `dgo-web.mp4` | D-Go | 1280×900 | 47s | 6,7 MB |
| `d-go.mp4` | D-Go (versión antigua) | 1280×718 | 48s | 9,7 MB |
| `smartlolipop.mp4` | The Smart Lollipop | 1280×712 | 47s | 3,1 MB |
| `veritas-mapa.mp4` | Veritas | 1280×714 | 52s | 6,4 MB |
| `Marcgomezdelmoral.mp4` | Marc Gómez del Moral | 1280×716 | 76s | 15 MB |

**Originales `.mov`** en `public/assets/proyectos/webs/` — no se sirven en web (peso y
compatibilidad); se conservan como fuente: `AIMPLAS_MENU.mov`, `Menu_Aimplas.mov`,
`D-Go.mov`, `TSL_480.mov`.

**Notas para perfiles online**
- Fiverr admite hasta 3 imágenes + 1 vídeo (≤ 75 MB, ≤ 75 s) + 2 PDF por gig. Los vídeos de
  arriba entran todos salvo `vampmaker.mp4` (81 s) y `Marcgomezdelmoral.mp4` (76 s): recórtalos
  a ≤ 74 s si los usas como vídeo principal.
- Upwork/Contra aceptan galerías más largas: ahí sirve el bloque completo de cada caso.
- Falta grabar: rbt.studio (scroll-through) y microJarvis (gesto RFID → Telegram). Son los dos
  casos sin media y los dos más diferenciales del perfil.
