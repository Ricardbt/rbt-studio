---
name: rbt.studio
description: Lienzo crema y tinta sólida — un estudio de Bellas Artes donde la obra generativa manda y la interfaz es el marco.
colors:
  signal-teal: "#15C1C1"
  studio-ink: "#151C1C"
  studio-ink-press: "#0D1414"
  teal-haze: "#C2CBCB"
  teal-mist: "#E1E6E6"
  forest: "#0E4A35"
  forest-press: "#0A3527"
  forest-haze: "#C7D6CF"
  forest-mist: "#E4ECE7"
  canvas-cream: "#F2EFE6"
  canvas-deep: "#E8E3D5"
  canvas-soft: "#F8F5EC"
  paper: "#FBF9F2"
  text-ink: "#14140F"
  text-soft: "#3A3A33"
  text-mute: "#6E6E64"
  hairline: "#C9C5B6"
  terracotta: "#B8651A"
  burnt-red: "#8E2B1E"
typography:
  mega:
    fontFamily: "DM Sans, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(72px, 11vw, 168px)"
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: "-0.02em"
  display:
    fontFamily: "DM Sans, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(48px, 7vw, 96px)"
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "DM Sans, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(36px, 4.5vw, 64px)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "DM Sans, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(28px, 3vw, 44px)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "normal"
  body:
    fontFamily: "DM Sans, system-ui, -apple-system, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.18em"
  wordmark:
    fontFamily: "DM Serif Display, Roboto Slab, Georgia, serif"
    fontSize: "22px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
rounded:
  none: "0px"
  pill: "999px"
spacing:
  s1: "4px"
  s2: "8px"
  s3: "12px"
  s4: "16px"
  s5: "24px"
  s6: "32px"
  s7: "48px"
  s8: "64px"
  s9: "96px"
  s10: "128px"
components:
  button-primary:
    backgroundColor: "{colors.studio-ink}"
    textColor: "{colors.canvas-cream}"
    rounded: "{rounded.none}"
    padding: "14px 22px"
  button-primary-hover:
    backgroundColor: "{colors.studio-ink-press}"
    textColor: "{colors.canvas-cream}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.studio-ink}"
    rounded: "{rounded.none}"
    padding: "14px 22px"
  button-ghost-hover:
    backgroundColor: "{colors.studio-ink}"
    textColor: "{colors.canvas-cream}"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.studio-ink}"
    rounded: "{rounded.none}"
    padding: "4px 10px"
  tag-solid:
    backgroundColor: "{colors.studio-ink}"
    textColor: "{colors.canvas-cream}"
  tag-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-mute}"
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.text-ink}"
    rounded: "{rounded.none}"
    padding: "24px"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.text-ink}"
    rounded: "{rounded.none}"
    padding: "12px 14px"
  stat:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.signal-teal}"
    rounded: "{rounded.none}"
    padding: "24px"
---

# Design System: rbt.studio

## Overview

**Creative North Star: "El estudio de Bellas Artes"**

Este sistema trata la pantalla como un estudio de artista, no como una aplicación. El lienzo es papel crema (`#F2EFE6`), no blanco de pantalla: un fondo que ya tiene temperatura antes de que se dibuje nada encima. Sobre él actúan dos materiales, y solo dos — tinta sólida y trazo generativo. La tinta construye la estructura: hairlines, bloques, tipografía con peso. El trazo, verde bosque sobre el lienzo, es código que se ejecuta en vivo (campos de partículas en p5.js, geometría paramétrica, R3F). La obra va delante; el marco se retira.

De ahí sale la decisión material que define todo lo demás: **cero desenfoque en ninguna parte**. Las superficies son planas en reposo y, al tocarlas, se desplazan dejando una sombra sólida sin difuminar — la huella que deja un bloque de tinta al presionarse contra el papel. No hay elevación atmosférica, ni glassmorphism, ni degradados de superficie. Un elemento o está apoyado en el lienzo o se ha movido; no flota en un punto intermedio. Cero radio de esquina en todo el sistema refuerza lo mismo: los bordes son cortes, no curvas.

La voz tipográfica es doble y estrictamente dividida. DM Sans en peso 800 carga todo lo expresivo, apretado con tracking negativo (`-0.02em`) hasta que los titulares se vuelven bloques compactos. JetBrains Mono se reserva para la anotación: numeración de sección, etiquetas, tecnologías, cifras. La distancia entre ambas —una densa y editorial, otra espaciada a `0.18em` y en mayúsculas— es lo que hace que la página se lea como un documento de trabajo con criterio y no como una plantilla. El acento cian (`#15C1C1`) aparece solo en esa capa de anotación: nunca en un titular, nunca como fondo grande.

**Key Characteristics:**
- Lienzo crema (`#F2EFE6`) en lugar de blanco — el fondo tiene temperatura
- Cian de señal (`#15C1C1`) como único acento de marca, siempre en la capa de anotación
- Sombra dura desplazada (`4px 4px 0`) sin desenfoque — la única forma de profundidad
- Cero border-radius en todo el sistema, salvo la variante `pill` explícita de las etiquetas
- DM Sans 800 con tracking negativo para lo expresivo; JetBrains Mono `0.18em` mayúsculas para lo anotado
- Hairlines de 1px (`#C9C5B6`) como estructura — sin cajas pesadas ni separadores gruesos
- Piezas generativas ejecutándose en vivo como contenido, no como decoración de fondo
- Escala tipográfica fluida con `clamp()` — el tipo respira con el viewport, el espaciado no

## Colors

Una paleta de papel y tinta con un solo grito: tierras cálidas para las superficies, casi-negros fríos para la estructura, y un cian eléctrico que solo aparece donde el sistema quiere que mires.

### Primary
- **Cian de Señal** (`#15C1C1`): El único acento de marca. Vive exclusivamente en la capa de anotación — numeración de sección (`05 / 05 · GALERÍA VISUAL`), eyebrows en mono, cifras de métrica, nodos destacados de un pipeline, estado de foco. Nunca es fondo de un bloque grande ni color de un titular. Su escasez es lo que le da autoridad.

### Secondary
- **Tinta de Estudio** (`#151C1C`): El casi-negro estructural, un verde-azul tan oscuro que se lee como negro pero nunca es plano. Fondo de botón primario, borde de tarjeta activa, color de la sombra sólida, barra de scroll. Es el material, no el acento.
- **Tinta Presionada** (`#0D1414`): Estado `:hover` y `:active` del botón primario, fondo de los contenedores de vídeo. El mismo material bajo presión.

### Tertiary
- **Verde Bosque** (`#0E4A35`): El trazo generativo. Color de las partículas de p5.js y del line-art sobre el lienzo. Es un color de dibujo, no de interfaz — casi nunca aparece como fondo o texto.
- **Gradiente de Marca** (`linear-gradient(180deg, #0E4A35 0%, #15C1C1 74.04%)`): La única transición de color del sistema, del bosque a la señal. Reservada para superficies de marca; no se usa en texto ni en botones.

### Neutral
- **Lienzo Crema** (`#F2EFE6`): El fondo por defecto de todo el sitio. No es blanco roto: es papel.
- **Lienzo Suave** (`#F8F5EC`): Sección elevada sobre el lienzo — el cambio es casi imperceptible y esa es la intención.
- **Papel** (`#FBF9F2`): La superficie más clara, para tarjetas y bloques que se apoyan sobre el lienzo.
- **Lienzo Profundo** (`#E8E3D5`): Canto de tarjeta y divisor entre bloques de la misma familia.
- **Tinta de Texto** (`#14140F`): Todo el texto de lectura. Negro cálido, no `#000`.
- **Tinta Suave** (`#3A3A33`): Párrafos secundarios y cuerpo largo.
- **Tinta Apagada** (`#6E6E64`): Etiquetas, metadatos, texto terciario.
- **Hairline** (`#C9C5B6`): Toda la estructura de líneas a 1px. La retícula del sistema.
- **Bruma Teal** (`#C2CBCB`) y **Neblina Teal** (`#E1E6E6`): Tintes de la tinta de estudio para superficies teñidas muy sutiles.

### Semantic
- **Terracota** (`#B8651A`): Advertencia. Borde izquierdo de `.alert--warn`.
- **Rojo Quemado** (`#8E2B1E`): Destructivo o error. Borde izquierdo de `.alert--err`.

### Named Rules

**La Regla de la Señal Única.** El cian `#15C1C1` es el único acento del sistema y vive solo en la capa de anotación: mono, mayúsculas, tamaño pequeño, cifras. En cuanto aparece en un titular, en un fondo amplio o en un segundo tono de acento, deja de significar «mira aquí» y el sistema pierde su único mecanismo de énfasis.

**La Regla del Papel.** Ninguna superficie es `#FFFFFF` y ningún texto es `#000000`. Las cuatro superficies (`canvas-cream`, `canvas-soft`, `paper`, `canvas-deep`) están todas en la familia del papel, y la separación entre ellas es deliberadamente sutil: la jerarquía la construyen los hairlines y el espaciado, no el contraste de fondo.

## Typography

**Display Font:** DM Sans (fallback: system-ui, -apple-system, sans-serif)
**Body Font:** DM Sans — la misma familia; la jerarquía es de peso y tracking, no de familia
**Label/Mono Font:** JetBrains Mono (fallback: ui-monospace, monospace)
**Wordmark Font:** DM Serif Display (fallback: Roboto Slab, Georgia, serif) — exclusiva de la marca `rbt`

**Character:** DM Sans en 800 comprimido con tracking negativo produce titulares densos, casi arquitectónicos: bloques de texto que pesan. JetBrains Mono hace lo contrario — se abre a `0.18em`, sube a mayúsculas y se queda en 11px. La tensión entre esas dos densidades es la firma tipográfica del sistema: lo dicho es compacto, lo anotado es espaciado.

### Hierarchy
- **Mega** (800, `clamp(72px, 11vw, 168px)`, line-height 0.96, tracking -0.02em): Declaración de hero. Un solo uso por página.
- **Display** (800, `clamp(48px, 7vw, 96px)`, line-height 0.96, tracking -0.02em): Apertura de sección mayor.
- **Headline** (800, `clamp(36px, 4.5vw, 64px)`, line-height 1.1, tracking -0.02em): Titular de sección y de caso de estudio.
- **Title** (700, `clamp(28px, 3vw, 44px)`, line-height 1.1): Subsección y titular de bloque.
- **Body** (400, 16px, line-height 1.55): Todo el texto de lectura. Ancho máximo 820px (~70ch) — respetado en About y Statement.
- **Small** (400, 14px, line-height 1.55): Descripciones de tarjeta y texto de apoyo.
- **Label** (500, 11px, tracking `0.18em`, MAYÚSCULAS, JetBrains Mono): Eyebrows, numeración de sección, tecnologías, metadatos. La capa de anotación completa.
- **Wordmark** (800, 22px, DM Serif Display, tracking -0.02em): Solo `rbt`. Variantes a 40px y 16px.

### Named Rules

**La Regla de la Anotación.** Todo lo que no sea contenido de lectura —número de sección, eyebrow, tecnología, cifra, estado, ruta de archivo— va en JetBrains Mono, mayúsculas, `0.18em` de tracking. Y a la inversa: nada de lo que sea contenido de lectura va en mono. La familia es lo que le dice al ojo si algo es la obra o es la etiqueta de la obra.

**La Regla del Tracking Opuesto.** El texto grande se aprieta (`-0.02em`), el texto pequeño se abre (`0.18em`). Un titular con tracking positivo o una etiqueta con tracking neutro rompen la firma inmediatamente.

## Layout

El modelo espacial es una escala de 10 pasos (`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128px`) sobre un contenedor máximo de 1280px, con la galería ampliada a 1400px porque las tarjetas de proyecto necesitan el aire. El gutter por defecto son 24px, escalando a `px-6 / md:px-12 / lg:px-16 / xl:px-24` en las secciones principales.

La página es un scroll narrativo de una sola columna: Hero → Marquee → Statement → Services → ProjectGallery → Artistic → Generativos → About → Contact → Footer. Cada sección abre con el patrón `.section-open`: una retícula de `80px 1fr` donde la columna estrecha lleva el número en mono y la ancha el titular, cerrada por debajo con un hairline en tinta de estudio. Ese patrón es el metrónomo del documento — es lo que hace que un scroll largo se lea como un índice y no como una sucesión de bloques.

Las retículas de contenido son auto-ajustables antes que fijas: la galería usa `repeat(auto-fill, minmax(300px, 1fr))` con 32px de gap, y los bloques de tres columnas colapsan a una en móvil. Las secciones respiran con `py-16` en móvil y hasta `py-32` en desktop; el ritmo vertical crece con el viewport, pero el espaciado horizontal entre elementos se mantiene constante — el sistema escala el aire, no la densidad.

El modal de caso de estudio ocupa el 60% del viewport anclado a la derecha, con barra superior sticky. Bajo 900px sus retículas internas colapsan a columna única.

## Elevation & Depth

**Este sistema no usa sombras difusas. En ningún sitio.** La profundidad es un desplazamiento físico: el elemento se mueve `-2px, -2px` y aparece detrás una sombra sólida sin blur, del mismo tamaño del desplazamiento. Es la mecánica de un sello presionado contra papel — hay dos planos, el papel y el bloque, y nada entre medias. No existe elevación ambiental ni jerarquía de capas por difuminado.

La estructura, cuando no hay interacción, la construyen los hairlines de 1px y el cambio mínimo entre las cuatro superficies de papel. Un bloque en reposo es absolutamente plano.

### Shadow Vocabulary
- **Huella de tarjeta** (`box-shadow: 4px 4px 0 var(--rbt-teal)` + `transform: translate(-2px, -2px)`): Hover de tarjeta y de miniatura de proyecto. La sombra dobla el desplazamiento, lo que exagera la sensación de bloque levantado.
- **Huella de botón** (`box-shadow: 3px 3px 0 var(--rbt-ink)` + `transform: translate(-1px, -1px)`): Hover de botón. Escala menor para un elemento menor.
- **Presionado** (`box-shadow: none` + `transform: translate(0, 0)`): Estado `:active`. El bloque vuelve a apoyarse en el papel — el clic es literalmente presionar.

### Named Rules

**La Regla del Cero Desenfoque.** Ningún `box-shadow` de este sistema lleva blur ni spread. La sintaxis es siempre `Npx Npx 0 <color>`. Un `rgba(0,0,0,0.1) 0 4px 12px` es material de otro sistema y contradice la premisa entera: aquí no hay atmósfera, hay papel y tinta.

**La Regla del Plano en Reposo.** Ninguna superficie lleva sombra por defecto. La sombra es exclusivamente una respuesta a `:hover`. Una tarjeta con sombra permanente convierte la firma en decoración.

## Shapes

Cero radio de esquina en todo el sistema (`--radius: 0px`): botones, tarjetas, inputs, etiquetas, contenedores de vídeo y modales tienen esquinas cortadas a escuadra. La única excepción es la variante explícita `.tag--pill` (`999px`), reservada para etiquetas que necesitan leerse como token flotante y no como bloque.

Los bordes son de dos grosores y nada más: **1px** para hairlines estructurales (`#C9C5B6` sobre lienzo) y **1.5px** para elementos interactivos (botones e inputs), lo justo para que el elemento accionable se distinga del divisor sin usar color. No existe un tercer grosor: cuando un elemento necesita comunicar estado —una alerta, un bloque destacado— el color viaja en el marco completo a 1px, nunca en una barra lateral gruesa.

La geometría recurrente es rectangular y ortogonal en la interfaz — y deliberadamente lo contrario en el lienzo generativo, donde conviven círculos, hexágonos, estrellas y cuadrados rotados en trazo de 1.5px sin relleno. El contraste es intencionado: el marco es recto, la obra no.

### Named Rules

**La Regla de la Escuadra.** El radio por defecto es `0`. Añadir esquinas redondeadas a un componente nuevo lo saca del sistema, por muy pequeño que sea el radio. Si algo necesita leerse como flotante, la respuesta es `pill` completo, nunca un `8px` intermedio.

## Components

### Buttons
- **Shape:** Esquinas a escuadra (`0px`), borde de 1.5px.
- **Primary:** Fondo tinta de estudio (`#151C1C`), texto crema (`#F2EFE6`), padding `14px 22px`, DM Sans 600 a 13px, MAYÚSCULAS con tracking `0.18em`.
- **Hover / Focus:** Fondo a tinta presionada (`#0D1414`), `transform: translate(-1px, -1px)` y huella sólida `3px 3px 0` en tinta de texto. Transición 180ms con `cubic-bezier(0.2, 0.7, 0.1, 1)`.
- **Active:** Vuelve a `translate(0,0)` y pierde la sombra — el bloque se apoya.
- **Ghost:** Fondo transparente con texto y borde en tinta de estudio; al hover invierte a sólido y gana la huella.
- **Ink:** Fondo en tinta de texto (`#14140F`); al hover vira a tinta de estudio. Para superficies donde el primario compite.
- **Tamaños:** `sm` (`10px 16px`, 11px) y `lg` (`18px 28px`, 14px).

### Chips
- **Style:** Borde de 1px en tinta de estudio, fondo transparente, JetBrains Mono a 12px, padding `4px 10px`, sin ajuste de línea.
- **Variants:** `solid` (fondo tinta, texto crema), `ghost` (borde hairline, texto apagado — para tecnologías secundarias), `pill` (radio 999px).

### Cards / Containers
- **Corner Style:** Escuadra (`0px`).
- **Background:** Papel (`#FBF9F2`) sobre lienzo crema.
- **Border:** Hairline de 1px (`#C9C5B6`); al hover vira a tinta de estudio.
- **Shadow Strategy:** Plana en reposo; al hover, `translate(-2px,-2px)` + huella `4px 4px 0`. Ver Elevation & Depth.
- **Internal Padding:** 24px (`s5`); 20px en las tarjetas de la galería.
- **Anatomía:** número en mono cian → título 22px/700 → descripción 14px en tinta suave → fila de etiquetas.

### Alerts
- **Style:** Marco completo de 1px en el color del estado sobre fondo papel, radio 0. El estado se comunica con el color del borde entero.
- **Variants:** `ok` (tinta de estudio), `warn` (terracota `#B8651A`), `err` (rojo quemado `#8E2B1E`), `info` (tinta de texto).
- **Prohibido:** la barra lateral de color gruesa (`border-left: 3px`). Es el tell más reconocible de interfaz generada y no pertenece a este sistema.

### Inputs / Fields
- **Style:** Borde de 1.5px en hairline, fondo papel, radio 0, padding `12px 14px`, DM Sans 14px.
- **Focus:** El borde vira a tinta de estudio; `outline: none` (el borde ES el indicador de foco).
- **Label:** JetBrains Mono 11px, MAYÚSCULAS, tracking `0.18em`, en tinta apagada, 6px por encima del campo.

### Navigation
- Barra superior sobre el lienzo, con la marca `rbt` en DM Serif Display 22px a la izquierda.
- Enlaces en DM Sans con tratamiento de etiqueta; el ancla activa se marca con el cian de señal.
- En móvil colapsa a menú; el scroll de la página es `smooth` y las secciones tienen anclas (`#projects`, `#about`).

### Section Opener (signature)
El componente que marca el ritmo del documento. Retícula de `80px 1fr` alineada a la base: en la columna estrecha, el número de sección en JetBrains Mono 14px cian; en la ancha, el titular en DM Sans 800 y debajo un subtítulo en mono apagado. El bloque cierra con un hairline en tinta de estudio (`--hairline-d`) y respira `96px` por arriba y `32px` por abajo. Es el elemento que convierte un scroll largo en un índice legible.

### Stat Block (signature)
Bloque de métrica: etiqueta en mono 11px apagada arriba, cifra en DM Sans 800 a 40px con tracking `-0.02em` en cian de señal debajo. Sobre papel con hairline. Aparece en tríos dentro de los casos de estudio, separado por 1px de hairline en lugar de por espacio.

### Generative Canvas (signature)
Lienzo a pantalla completa detrás del contenido (`.lineart`, `opacity: 0.55`, `pointer-events: none`). Formas geométricas sin relleno —círculos, hexágonos, estrellas, cuadrados rotados— en trazo de 1.5px verde bosque, con física de atracción al cursor en un radio de 200px. No es fondo decorativo: es la primera prueba de la tesis del portfolio, y por eso nunca debe reducirse a una textura estática.

## Do's and Don'ts

### Do:
- **Do** usar el cian de señal (`#15C1C1`) exclusivamente en la capa de anotación: mono, mayúsculas, pequeño, cifras. La Regla de la Señal Única.
- **Do** escribir toda sombra como `Npx Npx 0 <color>`, sin blur ni spread, y solo en `:hover`.
- **Do** abrir cada sección con el patrón `.section-open` (número en mono + titular + hairline de cierre). Es el metrónomo del documento.
- **Do** apretar el texto grande a `-0.02em` y abrir el pequeño a `0.18em`.
- **Do** construir la jerarquía con hairlines de 1px y espaciado de la escala, no con contraste de fondo ni con cajas pesadas.
- **Do** usar `clamp()` para el tamaño de tipo en cualquier titular nuevo — la escala fluida ya está definida en `--t-*`.
- **Do** dejar que las piezas generativas se ejecuten de verdad. Son contenido, no textura.

### Don't:
- **Don't** usar `#FFFFFF` como superficie ni `#000000` como texto. Las cuatro superficies de papel y las cuatro tintas cubren todos los casos.
- **Don't** añadir `border-radius` a un componente nuevo. El radio por defecto es `0`; la única alternativa legítima es `pill` completo.
- **Don't** usar sombras con desenfoque (`0 4px 12px rgba(...)`), glassmorphism, `backdrop-filter` ni degradados de superficie. Contradicen la premisa material entera.
- **Don't** poner el cian en un titular, en un fondo amplio ni introducir un segundo color de acento. El sistema tiene un solo mecanismo de énfasis y se agota al duplicarlo.
- **Don't** usar JetBrains Mono para texto de lectura, ni DM Sans para una etiqueta o un número de sección. La familia comunica el rol.
- **Don't** dejar sombra permanente en una tarjeta en reposo — convierte la firma en decoración.
- **Don't** usar el gradiente de marca en texto ni en botones. Es una superficie, no un relleno tipográfico.
- **Don't** introducir un tercer grosor de borde. Solo existen 1px estructural y 1.5px interactivo.
- **Don't** usar una barra lateral de color (`border-left: 3px`) en tarjetas, alertas o callouts. El estado va en el marco completo a 1px.
- **Don't** usar negro puro como velo de modal. El velo es tinta cálida (`--rbt-scrim`), coherente con la Regla del Papel.
