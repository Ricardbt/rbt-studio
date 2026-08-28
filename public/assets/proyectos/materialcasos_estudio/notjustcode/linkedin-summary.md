# notjustcode — resumen para LinkedIn

Le pedí a una herramienta que auditara mi producto. Me devolvió halagos con formato de informe.

"Mejorar la jerarquía visual." "Podría confundir al usuario." Observaciones tibias que no obligan a cambiar nada. Ese es el fallo característico de pedirle a un LLM que critique tu trabajo, y arreglarlo fue el proyecto entero.

**notjustcode** instala en Claude Code una auditoría de producto —visión, diseño/UX y mercado— sobre tu propio repositorio. `npx notjustcode`, luego `/notjustcode`.

Tres cosas que lo diferencian de una auditoría UX genérica:

→ **Ningún hallazgo se queda en la observación.** Cada uno se presenta como una cadena: hallazgo → evidencia en el repositorio → consecuencia → confianza. Y la consecuencia tiene que nombrar qué hace una persona concreta en lugar de lo esperado: abandona, reintenta, escribe a soporte, no vuelve. "Empeora la experiencia" está prohibido y el informe lo descarta.

→ **Nunca inventa cifras.** Sin datos de uso no hay porcentajes de conversión ni tasas de abandono. Si algo pide cuantificarse, dice qué métrica habría que mirar.

→ **Cuesta 5 veces menos contexto.** Ignora `node_modules`, lockfiles, tests y migraciones, y lee cabeceras en vez de archivos completos. En un SaaS mediano: ~90k tokens en vez de ~420k. Terminas la auditoría con el 85% de tu ventana libre — que es justo lo que necesitas para arreglar lo que acaba de señalarte.

Luego la ejecuté sobre sí misma y publiqué el informe sin editar las conclusiones incómodas. Incluye un apartado que dice que el producto no tiene defensa técnica ninguna —200 líneas de Markdown bajo MIT, copiables en treinta segundos— y otro que me señala que planifico con mucha más facilidad de la que publico.

Las dos son ciertas. Ese informe es ahora el roadmap.

¿Qué es lo último que tu linter no te dijo y te costó tres meses descubrir?

---
*Repositorio y ejemplos: github.com/rbtstudio/notjustcode*
