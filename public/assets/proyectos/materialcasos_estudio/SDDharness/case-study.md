# SDD Harness

**Un wizard de 5 fases para que Claude Code y yo hablemos el mismo idioma antes de escribir una línea de código.**

- **Cliente:** Side project / herramienta interna — RBT Studio
- **Rol:** Diseño y desarrollo del skill (Full Stack / AI Engineer)
- **Timeline:** Creado hace ~3 meses (mayo 2026), en uso activo
- **Stack:** Claude Code (skill), Specification-Driven Development, arquitectura multi-agente, TDD

---

## Contexto / Problema

Cada vez que arrancaba un proyecto nuevo con Claude Code, el punto de partida era distinto. A veces empezaba directo por el código, a veces con una spec improvisada en un mensaje — y el resultado era el mismo: specs inconsistentes de un proyecto a otro, y una desconexión entre lo que yo tenía en la cabeza y lo que los agentes acababan construyendo.

Busqué soluciones ya existentes — otros skills de planificación estructurada para Claude Code — y ninguna encajaba. Los más simples no tenían fondo real: eran una plantilla de spec sin nada detrás que asegurara que el código resultante cumplía esa spec. Los más completos iban al otro extremo: procesos pesados, pensados para equipos grandes, que para un proyecto propio o de cliente mediano se convertían en fricción pura — mucha ceremonia, poca agilidad.

Necesitaba algo en medio: suficiente estructura para no perder el hilo entre idea y código funcionando, pero lo bastante ligero como para no frenar el ritmo de trabajo real.

## Proceso

La decisión de diseño clave fue tratar esto como un sistema **Lean**, no como un framework de gestión de proyectos disfrazado de skill. En vez de una plantilla de documento único, lo estructuré como un wizard de 5 fases, cada una con una responsabilidad concreta y una salida clara que alimenta a la siguiente:

1. **SPEC** — qué se va a construir y por qué
2. **ARCHITECT** — cómo se va a construir, decisiones técnicas
3. **SCAFFOLD** — estructura base del proyecto
4. **HARNESS AGENTS** — cómo se coordinan los agentes que van a implementar
5. **HANDOFF** — entrega y contexto para retomar el trabajo

El punto de apoyo del sistema es TDD: cada fase de implementación exige que los tests pasen antes de darse por buena, lo que actúa como ancla real contra la deriva — tanto la mía como la de los agentes. Es la diferencia entre "creo que esto cumple la spec" y "esto cumple la spec porque los tests lo confirman".

<!-- ESQUEMA: diagrama de las 5 fases del wizard (SPEC → ARCHITECT → SCAFFOLD → HARNESS AGENTS → HANDOFF) -->

## Solución

El resultado es un skill de Claude Code que se invoca al arrancar cualquier proyecto o feature nueva, y que guía la conversación por las 5 fases de forma secuencial, generando en cada una los artefactos de documentación correspondientes (specs, decisiones de arquitectura, estructura de proyecto) antes de tocar código de implementación.

Ya lo he usado para arrancar proyectos reales — por ejemplo, la PRD completa de Job Search OS salió de este proceso, pivotando de una idea inicial de CRM manual a un Career Operating System event-driven con una arquitectura mucho más sólida de la que habría salido empezando directo por el código.

<!-- CAPTURA: ejemplo de output de una de las fases (spec o architecture doc generado) -->

## Resultados

No hay una métrica única que resuma el impacto, pero el cambio en cómo trabajo es claro:

- **Seguridad de que nada se pierde** entre la idea inicial y el proyecto terminado — cada fase deja un artefacto que la siguiente puede consultar.
- **Mismo idioma entre yo y los agentes** — al tener spec y arquitectura explícitas antes de implementar, no hay ambigüedad que cada agente interprete a su manera.
- **Menos rework** — el enfoque TDD obliga a que los tests pasen en cada fase, así que los errores de interpretación se detectan pronto, no al final.

## Aprendizajes

El hallazgo principal fue que la estructura correcta no está ni en la plantilla mínima ni en el proceso exhaustivo, sino en un sistema Lean con fases bien delimitadas y una única disciplina no negociable (TDD) que hace de ancla. Añadir más fases o más ceremonia habría vuelto a introducir la fricción que quería evitar; quitar la disciplina de tests habría vuelto al punto de partida: buenas intenciones sin verificación real.

---

*RBT Studio — Experience Engineering*
