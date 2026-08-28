# VampMaker

**Un SaaS que prepara la partida de rol antes de que empiece la partida.**

| | |
|---|---|
| **Cliente** | Side project — RBT Studio |
| **Rol** | Full Stack / AI Engineer — producto, arquitectura y desarrollo |
| **Timeline** | Mayo 2026 – en curso (Release 1.0) |
| **Stack** | TypeScript · NestJS 11 · Next.js 16 · React 19 · Prisma · PostgreSQL (Neon) · Zustand · Tailwind 4 · OpenRouter · Pollinations.ai |

---

## F.01 — Contexto

Dirigir una crónica de *Vampiro: La Mascarada* se parece más a producir una serie que a jugar una partida. El Narrador llega al viernes con un arco de cinco sesiones que sostener, una ciudad con su jerarquía política, una docena de NPCs que deben sonar distintos entre sí y fichas de personaje que cuadren con la edición que se está jugando. Casi todo ese trabajo ocurre antes de que nadie tire un dado.

VampMaker nació para absorber esa preparación. La primera versión funcionaba: generaba arcos, sesiones, NPCs, diálogos, fichas y mapas con IA, y lo hacía bien. El problema era lo que pasaba después.

Una auditoría del código en agosto de 2026 dejó el diagnóstico en una frase: **nada de lo generado sobrevivía al navegador.** El store escribía solo en `localStorage`, y el CRUD completo del backend NestJS —veinte y pico endpoints, con su esquema de PostgreSQL, sus relaciones y sus borrados en cascada— nunca llegaba a invocarse. Las funciones `saveCampaign()` y `loadCampaigns()` estaban escritas, probadas contra la API y sin una sola llamada desde la interfaz.

El resultado era un producto que se presentaba como SaaS —con cuenta, con tiers, con un "Plan Gratuito" en la barra lateral— y que perdía la campaña del usuario al cambiar de dispositivo. Además, cuando una generación fallaba, fallaba en silencio.

El encargo real, entonces, no era *añadir IA*. Era **convertir una demo funcional en un producto cobrable.**

---

## F.02 — Proceso

### La spec antes que el código

Con un hallazgo de ese calibre, la tentación es abrir el editor y empezar a conectar cables. No lo hice: escribí primero la especificación.

El trabajo se documentó como un proyecto SDD (*specification-driven development*) con cuatro documentos —`SPEC`, `ARCHITECTURE`, `SCAFFOLD`, `AGENTS`— que fijan objetivos, no-objetivos y criterios de aceptación verificables antes de tocar una línea. Definir los **no-objetivos** resultó tan útil como los objetivos: pasarela de pago, colaboración multiusuario, app nativa y export a PDF quedaron fuera de Release 1.0 por escrito, y eso cerró la puerta a tres meses de deriva de alcance.

Sobre esa spec monté un **harness de ocho agentes** con su grafo de dependencias. El proyecto lo desarrolla una sola persona, así que la división no busca paralelismo humano: busca que cada sesión de trabajo —propia o con un LLM— tenga un alcance cerrado y una *definition of done* comprobable.

```
CostProbe ─────────────────────────────────┐
                                           ▼
ContractMigrator ──┬──► PersistenceBuilder ─┬──► ExperienceBuilder ──┐
                   │                        │                        │
                   └──► ResilienceBuilder ──┴──► QuotaBuilder ───────┤
                                                                     ▼
                                                              DocWriter
```

<!-- ESQUEMA: grafo de dependencias del harness, versión diseñada -->

### Seis decisiones que se documentaron como ADR

Cada decisión estructural quedó registrada con sus alternativas descartadas y su coste:

- **ADR-01** — El servidor pasa a ser la fuente de verdad. `localStorage` no desaparece: baja de categoría, de almacén a caché *read-through*.
- **ADR-02** — Identificadores `string` (cuid) de extremo a extremo. El frontend asumía `number` (`id: Date.now()`, `campaign.id === 1` como detector de la campaña de ejemplo). En cuanto Prisma empieza a emitir cuids, `Number("clx3f…")` da `NaN` y el usuario ve "Campaña no encontrada" por un problema que en realidad es de tipos. Este ADR bloquea a todos los demás.
- **ADR-03** — Lo que no cabe en el esquema va a columnas `Json`, no a tablas nuevas. Una ficha de personaje tiene forma distinta en V5 y en V20, y nunca se consulta por separado.
- **ADR-04** — Persistencia *write-through* síncrona por operación. Una petición extra por acción es irrelevante frente a los 10–30 segundos que tarda una generación con IA, y a cambio el fallo es atribuible a una acción concreta y por tanto reportable.
- **ADR-05** — Contrato de API estricto: DTOs validados y un único envelope de error.
- **ADR-06** — La cuota como Guard que reserva antes y Interceptor que confirma después del éxito, de modo que una generación fallida no consuma saldo.

### La capa de IA, tratada como ingeniería y no como conversación

La parte más interesante del proyecto no fue conectar OpenRouter, que son veinte líneas. Fue conseguir que el modelo devolviera **siempre** algo que la interfaz pudiera renderizar, en el idioma correcto y sin contradecir el canon de la edición elegida.

Tres capas resuelven eso:

**Idioma.** El producto es para narradores hispanohablantes, pero se colaban textos en inglés. Parte del problema no era del modelo: el título por defecto de un mapa era `Generated ${type}` en el propio código, y su descripción era el prompt de imagen en inglés recortado. El resto sí venía del prompt, que pedía español en una frase suelta del *system* mientras los esquemas JSON iban con claves en inglés. La regla explícita separa las dos cosas: las claves se mantienen intactas porque las consume el frontend, los valores van en español, y la terminología del juego se traduce (*Embrace* → Abrazo, *Sheriff* → Alguacil).

**Esquema.** El prompt de fichas pedía literalmente *"devuelve SOLO JSON válido"*, sin más. El modelo se inventaba las claves y la interfaz no encontraba nada que pintar. Ahora el prompt lleva el esquema explícito que reproduce los tipos compartidos, con su ramificación entre V5 y V20.

**Canon en capas.** Las reglas del mundo se componen en tres niveles: un núcleo universal, una capa por edición y las maldiciones **solo de los clanes que aparecen en la petición**. Antes se inyectaban las quince y, peor aún, se afirmaba que "la Mascarada es ley absoluta" incluso en una campaña de *Dark Ages*, donde la Mascarada no se declara hasta 1666.

<!-- ESQUEMA: las tres capas del prompt (núcleo → edición → clanes) -->

---

## F.03 — Solución

**Monorepo con tres workspaces** —`backend`, `frontend`, `shared`— donde el paquete compartido contiene los tipos de dominio que ambos extremos consumen, de modo que un cambio de contrato rompe la compilación en vez de romper la aplicación en producción.

**Backend NestJS 11** con módulos por dominio (auth, campaigns, sessions, npcs, sheets, maps, ai), Prisma sobre PostgreSQL en Neon, autenticación JWT en cookie `httpOnly` y filtro global de excepciones.

**Frontend Next.js 16 con React 19**, App Router, Zustand para estado de cliente y una vista de campaña con pestañas: arco, sesiones, NPCs, fichas y mapas.

**Motor de generación** con seis endpoints —campaña, sesión, NPC, diálogo, ficha y mapa— sobre `deepseek/deepseek-chat` vía OpenRouter para texto y Pollinations.ai para imágenes. El prompt de imagen se mantiene deliberadamente en inglés: los modelos de difusión rinden bastante peor en español, así que lo que se traduce es lo que ve el usuario, no lo que consume el generador.

**Cuatro ediciones soportadas** —V5, V20, Dark Ages y Sabbat— cada una con su lore, sus facciones y sus cargos de ciudad. Un NPC de Sabbat sale como Obispo; el mismo prompt en Dark Ages devuelve un señor feudal vasallo del príncipe de Castilla.

<!-- CAPTURA: pantalla principal — grid de campañas -->
<!-- CAPTURA: vista de campaña con las pestañas (arco / sesiones / NPCs / fichas / mapas) -->
<!-- CAPTURA: ficha de personaje generada, con atributos y disciplinas -->
<!-- CAPTURA: formulario de creación de campaña con selector de edición -->

---

## F.04 — Aprendizajes

No hay métricas de uso que enseñar: el producto está en fase de Release 1.0 y la persistencia servidor-autoritativa está en curso. Lo que sí hay es criterio acumulado, que es lo que de verdad viaja de un proyecto al siguiente.

**Antes de tocar el prompt, averigua quién escribe el texto.** Pasé un rato convencido de que el inglés que aparecía en la interfaz venía del modelo. Una parte venía de una plantilla del propio código. Tunear el prompt no habría arreglado nunca esa mitad.

**Un prompt sin esquema es una API sin contrato.** "Devuelve JSON válido" no es una especificación. Si la interfaz espera quince claves concretas, esas quince claves van en el prompt, y las que el código consume no se traducen aunque el resto del contenido sí.

**El contexto que contradice al dominio cuesta más que el contexto que falta.** Inyectar las reglas de la Camarilla en una campaña medieval no es solo desperdiciar tokens: es pedirle activamente al modelo que se equivoque. Trocear el canon por edición mejoró la salida *y* la abarató.

**Repetir una instrucción no sale gratis.** La regla de idioma estaba inyectada seis veces por llamada. Dejarla una sola vez en el *system* y cerrar cada prompt de usuario con dos líneas de recordatorio ahorró unos 190 tokens por generación sin que el español se resintiera —comprobado regenerando fichas y campañas completas después del cambio.

**Un hook con `useState` no es estado compartido.** El `useAuth` original era un hook con estado local. Cada componente que lo llamaba tenía su propio `user` y lanzaba su propia petición a `/auth/me`. Como la barra lateral vive en el layout raíz y no se remonta al navegar, el login funcionaba de verdad —cookie emitida, sesión válida— pero la aplicación seguía pintándose como si no. Un error de arquitectura de estado disfrazado de bug de autenticación.

**Escribir la spec primero convirtió "arreglar la app" en ocho unidades verificables.** Es la diferencia entre un refactor que no se sabe cuándo termina y ocho bloques con criterio de terminado.

---

## Siguiente

Release 1.0 cierra persistencia servidor-autoritativa, errores no silenciosos, un único camino de navegación, export a Markdown para llevar el material a la mesa y límite de cuota por cuenta.

**RBT Studio — Experience Engineering**
[Repositorio y demo pendientes de publicar]
