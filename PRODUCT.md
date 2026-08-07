# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three audiences, in priority order:

1. **Clientes freelance directos** — startups, empresas y equipos de producto que evalúan contratar un proyecto concreto. Llegan con un problema en mente y necesitan verificar criterio y capacidad de ejecución antes de escribir.
2. **Recruiters y equipos que contratan** — empresas de producto buscando un perfil senior. Usan el sitio como CV extendido: quieren profundidad técnica verificable y trayectoria.
3. **Perfil creativo / cultural** — instituciones, galerías y espacios culturales interesados en creative technology, código generativo e instalaciones interactivas.

Los tres llegan al mismo sitio de una sola página y hacen scroll; no hay rutas separadas por audiencia.

## Product Purpose

Portfolio personal de **Ricard Boixeda** (rbt.studio), Experience Engineer con más de 10 años de experiencia. El sitio existe para conseguir trabajo: proyectos freelance en primer lugar, contratación en plantilla en segundo.

**Éxito = un email a `contact@rbt-studio.com`** con un proyecto en mente. Es la única conversión definida; no hay reserva de llamada ni descarga de CV como objetivo declarado.

## Positioning

La intersección de tres cosas que rara vez coinciden en un mismo perfil: **Bellas Artes (Universitat de Barcelona) + más de 10 años de ingeniería frontend + producto AI-native**. La formulación propia del sitio: «Diseño cómo se sienten las cosas al usarse, no solo cómo funcionan».

El diferencial no es la lista de tecnologías — es que el propio sitio es la prueba. Las piezas generativas (particle field en p5.js, canvas paramétrico, R3F) no son decoración: son la demostración de que el autor construye sistemas visuales en tiempo real. Un perfil que solo diseña no puede replicarlo; uno que solo programa, tampoco.

## Operating Context

- **Una sola página con scroll narrativo.** Orden de secciones: Hero → Marquee → Statement → Services → ProjectGallery → Artistic → Generativos → About → Contact → Footer.
- **Evaluación en dos velocidades.** Un cliente escanea la galería y decide en segundos; un recruiter técnico abre DevTools y lee el código. Ambos recorridos ocurren sobre la misma página.
- **Los casos de estudio se abren en modal** desde las tarjetas de la galería, no en rutas propias.
- **Deploy**: Hostinger hace `git pull` de `master` y ejecuta `npm run build`. Sin Git LFS — los binarios de media van como archivos normales en el repo, y su peso es una restricción real de despliegue.

## Capabilities and Constraints

- **Stack existente**: React 18 + Vite + TailwindCSS. GSAP/ScrollTrigger para movimiento, p5.js y three/@react-three-fiber para las piezas generativas.
- **Estático puro**: sin backend, sin CMS, sin base de datos. Todo el contenido vive en archivos del repo (`src/data/caseStudies.js`, arrays en los componentes).
- **Media servida desde `public/assets/proyectos/`** — vídeos `.mp4` optimizados en `captures/`, imágenes en `webs/`. Los `.mov` de origen quedan fuera del repo.
- **Idioma — decisión abierta.** Hoy el sitio está íntegramente en español mientras declara disponibilidad global. La intención confirmada es **bilingüe ES/EN**, pero no está implementado: no hay selector, ni estructura de traducción, ni decisión sobre qué mecanismo usar. Cualquier trabajo futuro de contenido debe asumir que el copy tendrá que duplicarse.

## Brand Commitments

- **Nombre**: rbt.studio · **Contacto**: `contact@rbt-studio.com`
- **Voz**: primera persona, español, directa y sin superlativos comerciales. Afirma criterio, no entusiasmo.
- **Nombres de cliente visibles**: el sitio ya muestra públicamente UCSF, Sant Joan de Déu, Veritas, Universitat de Barcelona, E.Casals, Cultura Sitges, Aimplas, D-Go y The Smart Lollipop. Los tres últimos se hicieron en colaboración con **Stimulo Design Studio/Agency**, y ese crédito es una obligación, no un adorno.
- **Ubicación e idiomas**: Barcelona, remoto global. Español, catalán, inglés (B2).

## Evidence on Hand

- **8 casos de estudio completos** en `src/data/caseStudies.js`: StoryPrints, BrandAI, VampMaker, rbt.studio, microJarvis, Aimplas, D-Go, The Smart Lollipop.
- **Dossier freelance** en `docs/case-studies-portfolio.md` — mismos casos con pitch en inglés y rutas de media, pensado para perfiles online.
- **Vídeos de demo** en `public/assets/proyectos/captures/` (11 mp4) e **imágenes de sitios en producción** en `public/assets/proyectos/webs/`.
- **CVs en PDF**: `src/assets/proyectos/cv-ricard-ES.pdf`, `cv-ricard-NN.pdf`.
- **Sitios públicos verificables**: d-go.eu, thesmartlollipop.com.

**Ausencias que el trabajo futuro no debe inventar:**
- No hay testimonios ni citas de clientes. Ninguna.
- Los tres proyectos de cliente (Aimplas, D-Go, TSL) **no tienen métricas de resultado de negocio**. Sus cifras actuales son estructurales (formatos, sincronización, URL en producción), y así deben quedarse hasta que existan datos reales.
- No hay tarifas, disponibilidad concreta ni tamaño de equipo publicados.
- Los productos propios (StoryPrints, BrandAI, VampMaker, microJarvis) están en beta, alpha o uso personal — no son productos lanzados con base de usuarios.

## Product Principles

1. **Demostrar antes que afirmar.** Si hay que explicar que el autor es creativo, la página ya ha fallado. El código ejecutándose es el argumento.
2. **Una página, dos velocidades de lectura.** El escaneo rápido y la lectura profunda comparten superficie; ninguna de las dos puede degradar a la otra.
3. **La conversión es un email, y solo uno.** Cualquier elemento que no acerque a ese email compite con él.
4. **Precisión sobre entusiasmo.** El material real —clientes con nombre, sitios en producción, código abierto en DevTools— sustituye a cualquier reclamo. Nunca fabricar cifras, testimonios ni clientes.
5. **El peso importa.** El deploy arrastra los binarios por git; cada vídeo e imagen se optimiza antes de entrar.
