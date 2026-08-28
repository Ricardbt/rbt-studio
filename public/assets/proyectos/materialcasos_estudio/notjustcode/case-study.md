# notjustcode

**Una auditoría de producto —visión, diseño y mercado— que se ejecuta dentro del editor, sobre el repositorio, en vez de en una reunión que nadie convoca.**

| | |
|---|---|
| **Cliente** | Side project — RBT Studio |
| **Rol** | Product design + prompt engineering + CLI (Full Stack / AI Engineer) |
| **Timeline** | Julio 2026 – Agosto 2026 |
| **Estado** | v0.5.1 funcional en repositorio · pendiente de publicar en npm |
| **Stack** | Node.js (CLI sin dependencias, ≥18.17) · Claude Code (skills + slash commands) · Markdown como capa de producto |

---

## 1 · Contexto

Un proyecto de software tiene revisión automática de casi todo menos de lo único que decide si sobrevive.

El linter revisa el estilo. Los tests revisan el comportamiento. CI revisa que compile. Nadie revisa si el producto tiene sentido: si el problema que resuelve se puede decir en una frase, si hay alguien concreto a quien le duele, si el flujo principal lleva a una persona desde que llega hasta que obtiene valor sin abandonar por el camino.

Ese hueco no es igual para todo el mundo. Quien trabaja por encargo tiene un PM y una diseñadora al lado que hacen esas preguntas por oficio. **El hueco es de quien programa y decide a la vez**: indie hackers, fundadores técnicos, freelances con producto propio. Su alternativa real no es otra herramienta — es enseñárselo a alguien con criterio, o enterarse por el silencio después del lanzamiento.

Y hay un segundo problema, más específico, que aparece al intentar resolver el primero: **pedirle a un LLM que critique tu trabajo produce halagos con formato de informe**. Listas de observaciones tibias —"mejorar la jerarquía visual", "podría confundir al usuario"— que no obligan a cambiar nada. Un framework de auditoría que no resuelva esto no sirve, por buena que sea la estructura.

<!-- CAPTURA: terminal con `npx notjustcode` completando la instalación -->

## 2 · Proceso

### Decisión 1 — El producto es un prompt, no una aplicación

La primera decisión de arquitectura fue reconocer dónde estaba realmente el valor. `notjustcode` son unas 200 líneas de Markdown en `templates/`. El CLI son 372 líneas dedicadas a copiarlas a la carpeta `.claude/` del proyecto.

Ese reparto —99% del código sirviendo al 1% del valor— es incómodo de mirar, pero es el correcto: el instalador se ejecuta **en el momento de instalar**, y la auditoría ocurre **en el momento de auditar**. Meter lógica de producto en el CLI significaría medir el repositorio en el instante equivocado. Quedó fijado como restricción dura: para las funcionalidades nuevas, `bin/cli.js` no tiene dueño — nadie lo toca.

### Decisión 2 — La regla que convierte una observación en un hallazgo

Este es el núcleo del proyecto. Cada hallazgo de la capa de diseño tiene que presentarse como una cadena completa:

```
hallazgo → evidencia en el repo → consecuencia → confianza
```

- **Evidencia**: un archivo, componente o ruta concretos. Sin evidencia señalable, el hallazgo no entra en el informe.
- **Consecuencia**: tiene que nombrar qué hace *una persona concreta* en lugar de lo esperado — abandona, reintenta, escribe a soporte, no vuelve. Frases como "empeora la experiencia" o "resta profesionalidad" están explícitamente prohibidas, y el informe las descarta.
- **Confianza**: `Observada`, `Inferida` o `Hipótesis`. Y las hipótesis obligan a declarar qué habría que medir para confirmarlas.

Prohibir las consecuencias vacías no es una regla de estilo: es la defensa estructural contra el fracaso característico de esta categoría de herramienta. El informe tampoco inventa porcentajes de conversión ni tasas de abandono — no tiene datos de uso y no finge tenerlos.

### Decisión 3 — El coste de contexto es una decisión de producto

Una auditoría que consume la ventana de contexto entera es inútil, aunque el informe sea bueno: quien la ejecuta termina sin margen para arreglar lo que el informe le acaba de señalar.

Por eso el alcance de lectura está escrito como parte del producto, no como una optimización posterior. El comando lee entero lo que habla del producto (README, manifest, rutas, copy de UI, tokens de diseño), lee **solo las primeras ~50 líneas** de componentes y hooks —basta para reconstruir el flujo, el cuerpo no dice nada de producto— e ignora por completo `node_modules`, lockfiles, tests, migraciones y binarios.

En un SaaS de 100–300 archivos, la diferencia estimada es de ~420k tokens (leer el repositorio entero) a ~90k. Mismo informe, unas 5 veces menos contexto: se termina con el 85% de la ventana todavía libre.

### Decisión 4 — El análisis de mercado va detrás de un flag

La capa de competencia y posicionamiento requiere búsqueda web. Cuesta lo mismo en un proyecto pequeño que en uno grande, pero su peso relativo no: suma alrededor de un +70% de contexto en un proyecto pequeño y solo un +6% en uno grande. Esa asimetría es la razón de que sea `--market` y no comportamiento por defecto.

### Decisión 5 — Especificar la v0.6.0 antes de escribirla

El modo entrevista (la funcionalidad siguiente) se diseñó con un proceso SDD completo antes de tocar una línea: `SPEC.md` con 7 requisitos funcionales y sus criterios de aceptación, `ARCHITECTURE.md` con 7 ADRs, más `SCAFFOLD.md`, `AGENTS.md` y `HANDOFF.md`. Como la funcionalidad **no es código** —son cinco secciones de Markdown— no existen tests automáticos posibles, y eso obligó a preferir sistemáticamente lo enumerable sobre lo interpretativo: lo interpretativo no se puede regresionar.

<!-- ESQUEMA: diagrama de componentes de docs/sdd/modo-entrevista/ARCHITECTURE.md (Mermaid, ya existe en el repo) -->

## 3 · Solución

Un paquete npm de una sola orden:

```bash
npx notjustcode
```

Instala en el proyecto un slash command (`/notjustcode`) y una skill de referencia dentro de `.claude/`. No sobrescribe nada sin confirmación, avisa si has editado un archivo antes de borrarlo, y `--uninstall` retira exactamente lo que instaló: respeta el resto de tu carpeta `.claude/` y solo elimina las carpetas que quedan vacías. Hay `--dry-run`, `--force` y `--yes` para CI.

**El framework, en cuatro capas:**

| Capa | Qué evalúa |
|---|---|
| **01 · Visión** | Problema en una frase sin tecnología, segmento concreto, coste de no-uso, JTBD |
| **02 · Diseño** | Heurísticas de Nielsen sobre el flujo real detectado en rutas, jerarquía, time-to-value, consistencia |
| **03 · Mercado** | Competencia directa, indirecta y "hacerlo a mano"; ventaja defendible; posicionamiento *(requiere `--market`)* |
| **04 · Acciones** | 3–5 recomendaciones, cada una referenciando el hallazgo que resuelve, con impacto y esfuerzo |

<!-- CAPTURA: fragmento de un informe generado, con la tabla hallazgo / evidencia / consecuencia / confianza -->

**Modo entrevista (v0.6.0, especificado).** Cuando el repositorio no declara producto —sin README descriptivo, sin copy de UI— el informe hoy cae en un veredicto genérico de "producto sin tesis". Correcto, pero poco accionable, y le toca justo a quien más necesitaría la auditoría. La solución especificada: detectarlo con una rúbrica de tres señales enumeradas, decirlo, ofrecer entrevistar, hacer las cuatro preguntas de Capa 1 y persistir las respuestas en `.claude/notjustcode/product.md` para no repetirlas. Con dos reglas que la hacen valiosa en vez de complaciente: **lo observable en el repositorio manda sobre lo declarado**, y **la contradicción entre ambos es un hallazgo**, no un error a resolver en silencio.

## 4 · Resultados

El proyecto está terminado como producto y **aún sin publicar en npm**, así que no hay métricas de uso que contar. Lo que sí hay:

- **v0.5.1 funcional de principio a fin**: instalación, desinstalación limpia, `--dry-run`, cero dependencias, Node ≥18.17.
- **Dos informes completos publicados en el repositorio**, sin editar las conclusiones incómodas: uno sobre el propio `notjustcode` y otro sobre un SaaS con interfaz, ejecutado con `--market`. Son el activo de marketing principal — permiten evaluar el producto sin instalar nada.
- **Reducción de contexto de ~420k a ~90k tokens** en un repositorio de tamaño medio, por diseño del alcance de lectura, no por recorte del informe.
- **La herramienta se auditó a sí misma y el informe se convirtió en el roadmap.** Cinco hallazgos, cuatro recomendaciones priorizadas. La recomendación 3 es hoy la especificación completa de la v0.6.0.
- **El informe sobre sí misma incluye un apartado sobre su propio foso** que concluye que el producto no tiene defensa técnica ninguna: 200 líneas de Markdown bajo licencia MIT que cualquiera puede copiar en treinta segundos. La conclusión —que el foso es la autoría, la distribución y la disposición a publicar la crítica que otros se guardarían— es un resultado del proyecto, no una nota al pie.

## 5 · Aprendizajes

**La credibilidad de la herramienta depende de una regla, no del prompt entero.** Sin la prohibición de consecuencias vacías, el mismo framework produce un informe amable e inútil. Esa regla no fue una ocurrencia: es la conclusión de haber visto fallar la versión sin ella.

**Un producto puede ser tan barato de copiar que proteger el código sea la estrategia equivocada.** Aceptarlo por escrito, en el propio README, sale más rentable que fingir un foso técnico que no existe.

**Qué se haría diferente: publicar antes.** El propio informe lo dijo sin adornos — el proyecto planificaba con mucha más facilidad de la que publicaba: cuatro documentos de especificación para una funcionalidad que aún no existía, mientras el paquete no estaba en npm y el README instruía un `npx notjustcode` que todavía no instalaba nada. Es el hallazgo más útil que produjo la herramienta, y fue sobre sí misma.

---

**Repositorio:** [github.com/rbtstudio/notjustcode](https://github.com/rbtstudio/notjustcode) · MIT
**Ver un informe antes de instalar:** [`EXAMPLE.md`](../../../EXAMPLE.md) · [`EXAMPLE-2.md`](../../../EXAMPLE-2.md)

RBT Studio — Experience Engineering
