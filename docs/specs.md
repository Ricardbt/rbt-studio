# RBT Studio — Specs de Portfolio

## Posicionamiento

**Nombre de marca:** RBT Studio
**Rol comunicado:** Experience Engineer / AI Product Experience Engineer
**Propuesta de valor:** Traducir complejidad técnica en experiencias utilizables, sofisticadas y humanas.

**Tagline principal:**
> "Designing intelligent digital experiences"

**Frase de posicionamiento:**
> "Most products know what they want to do. Few know how they should feel to use."

**Perfil diferencial:**
Fine Arts + Frontend + Product Thinking + AI-native systems + UX sensitivity

---

## Stack tecnológico

- React 18 + Vite
- TailwindCSS
- GSAP + ScrollTrigger
- p5.js (generativo)
- Three.js / R3F (3D)

---

## Arquitectura de secciones

| # | Sección | Propósito |
|---|---------|-----------|
| 1 | Hero | Identidad de marca + tagline |
| 2 | Marquee | Señales de credibilidad / keywords |
| 3 | Statement | Frase de posicionamiento UX |
| 4 | Services | Qué construimos (centrado en experiencia) |
| 5 | ProjectGallery | Case studies con narrativa de experiencia |
| 6 | Generativos | Diferenciador creativo / artistic background |
| 7 | About | Perfil híbrido diferencial |
| 8 | CV | Timeline / formación |
| 9 | Contact | CTA |

---

## Sección por sección — Copy guidelines

### Hero
- Nombre: **RBT Studio** (mantener identidad de agencia)
- Tagline: "Designing intelligent digital experiences"
- Descripción: Centrada en producto + experiencia + frontend. Sin mencionar stacks genéricos.
- CTA primario: "Ver proyectos" / CTA secundario: "Contactar"

### Statement
- Una frase, tipografía grande, sin otros elementos
- Frase: *"Most products know what they want to do. Few know how they should feel to use."*
- Tono: editorial, maduro, sin hype

### Services
- Máx. 6 servicios, centrados en experiencia
- Nombrar por outcome, no por stack
- Servicios objetivo:
  1. Experience Engineering — frontend + UX + interacción
  2. AI-native Products — interfaces inteligentes utilizables
  3. Design Systems — sistemas de componentes con criterio
  4. Creative Technology — código generativo + instalaciones
  5. Product Consulting — arquitectura + roadmap
  6. Motion & Interaction — animación, microinteracciones

### About
- Narrativa del perfil híbrido: Fine Arts → Frontend → Product → AI
- No solo datos fríos: comunicar el POR QUÉ importa la combinación
- Destacar: criterio, sensibilidad, systems thinking

### ProjectGallery
- Cada case study debe comunicar: problema → fricción del usuario → solución experiencial
- No mencionar stack en el título — describir el resultado
- Incluir evidencia visual: screenshot, video, motion

---

## Design System

### Paleta
- Background: `#F2EFE6` (paper)
- Ink: `#14140F`
- Accent: `#0E4A35` (verde oscuro)
- Ink light: `#6E6E64`
- Ink faint: `#C9C5B6`

### Tipografía
- Display: DM Serif Display (headings grandes, editoriales)
- Body/UI: DM Sans
- Mono/labels: IBM Plex Mono

### Principios visuales
- Editorial, minimalista, sofisticado
- Grid visible sutil
- Animaciones con propósito (no decorativas)
- Mobile-first

---

## Definition of Done (DoD)

### DoD Global
- [ ] Todo el copy comunica experiencia, no stack
- [ ] Ninguna sección menciona "AI hype" sin contexto de producto
- [ ] Diseño consistente con el Design System
- [ ] Responsive: mobile, tablet, desktop
- [ ] Animaciones GSAP funcionan en scroll
- [ ] Sin errores de consola en producción

### DoD Hero
- [ ] Tagline: "Designing intelligent digital experiences"
- [ ] Descripción centrada en producto/experiencia (no stack-heavy)
- [ ] Nombre de marca "RBT Studio" visible y prominente
- [ ] CTA funcionales y visibles
- [ ] Canvas generativo p5.js cargando sin errores
- [ ] Animación de entrada GSAP completa

### DoD Statement
- [ ] Frase completa visible: *"Most products know what they want to do. Few know how they should feel to use."*
- [ ] Tipografía editorial, prominente
- [ ] Sección integrada en App.jsx entre Marquee y Services

### DoD Services
- [ ] 6 servicios renombrados hacia outcomes de experiencia
- [ ] Hardware/IoT eliminados o renombrados
- [ ] Tags reflejan criterio, no solo stack
- [ ] Copy de cada servicio menciona el resultado experiencial

### DoD About
- [ ] Menciona explícitamente: Fine Arts + Frontend + Product + UX
- [ ] Narrativa del perfil híbrido (no solo datos: universidad, años, ciudad)
- [ ] Frase diferencial visible

### DoD ProjectGallery
- [ ] Cada proyecto tiene: contexto → problema → solución experiencial
- [ ] Al menos una imagen/screenshot por proyecto
- [ ] Copy sin mencionar stack como protagonista

### DoD General de calidad
- [ ] `npm run build` sin errores
- [ ] Lighthouse Performance > 80
- [ ] Lighthouse Accessibility > 90
- [ ] No hay `console.error` en runtime
- [ ] Todas las fuentes cargan correctamente
