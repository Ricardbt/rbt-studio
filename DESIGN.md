---
name: rbt.studio
description: Prueba de registro — pliego de papel, cuatro tintas de proceso y el código corriendo como primera pasada.
colors:
  press: "#F4F1EA"
  press-deep: "#FAF8F3"
  press-raise: "#E7E2D7"
  press-line: "#DAD4C6"
  sheet: "#FFFFFF"
  sheet-deep: "#EAE5DA"
  sheet-soft: "#FAF8F3"
  sheet-line: "#E0DACD"
  ink-magenta: "#D6006F"
  ink-cyan: "#0079AB"
  ink-yellow: "#C8A400"
  ink-key: "#14150F"
  ink-white: "#FFFFFF"
  ink-over-cm: "#5B2F78"
  ink-over-my: "#C4551D"
  ink-magenta-t: "#C4006B"
  ink-cyan-t: "#00688F"
  ink-violet-t: "#5B2F78"
  ink-orange-t: "#A8460F"
  ink-yellow-t: "#7D6200"
  ink-magenta-d: "#C4006B"
  plate-01: "#C4006B"
  plate-02: "#0079AB"
  plate-03: "#7D6200"
  plate-04: "#5B2F78"
  plate-05: "#1E7A50"
  plate-06: "#A8460F"
  plate-07: "#A81E63"
  plate-08: "#00688F"
  plate-09: "#6B7A16"
  plate-10: "#6D4AA8"
  plate-11: "#0F6E6A"
  plate-12: "#8A5A00"
  on-press: "#14150F"
  on-press-mid: "#565A50"
  on-press-low: "#676C61"
  on-sheet: "#14150F"
  on-sheet-mid: "#565A50"
  on-sheet-low: "#676C61"
  scrim: "rgba(20, 21, 15, 0.55)"
typography:
  mega:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(64px, 9vw, 132px)"
    fontWeight: 800
    lineHeight: 0.94
    letterSpacing: "-0.015em"
  display:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(44px, 6vw, 84px)"
    fontWeight: 800
    lineHeight: 0.94
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(34px, 4.2vw, 58px)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(26px, 2.8vw, 40px)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "normal"
  subtitle:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "normal"
  block-title:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "normal"
  body:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  small:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  micro:
    fontFamily: "Spline Sans Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.1em"
  label:
    fontFamily: "Spline Sans Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.18em"
  wordmark:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.04em"
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
    backgroundColor: "{colors.ink-magenta}"
    textColor: "{colors.ink-white}"
    rounded: "{rounded.none}"
    padding: "14px 22px"
  button-primary-hover:
    backgroundColor: "{colors.ink-over-my}"
    textColor: "{colors.ink-white}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.on-press}"
    rounded: "{rounded.none}"
    padding: "14px 22px"
  button-ghost-hover:
    backgroundColor: "transparent"
    textColor: "{colors.ink-magenta}"
  button-sheet:
    backgroundColor: "{colors.ink-key}"
    textColor: "{colors.sheet}"
    rounded: "{rounded.none}"
    padding: "14px 22px"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.on-press-mid}"
    rounded: "{rounded.none}"
    padding: "4px 9px"
  sheet:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.on-sheet}"
    rounded: "{rounded.none}"
    padding: "24px"
  input:
    backgroundColor: "{colors.sheet-soft}"
    textColor: "{colors.on-sheet}"
    rounded: "{rounded.none}"
    padding: "12px 14px"
  ink-row:
    backgroundColor: "transparent"
    textColor: "{colors.on-press}"
    rounded: "{rounded.none}"
    padding: "32px 16px"
  ink-row-hover:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.on-sheet}"
  separation-card:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.on-press}"
    rounded: "{rounded.none}"
    padding: "20px"
  case-frame:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.on-sheet-mid}"
    rounded: "{rounded.none}"
    padding: "32px 0 32px 26px"
---

# Design System: rbt.studio

## Overview

**Creative North Star: "La prueba de registro"**

El sitio es una prueba de registro: un pliego de papel componiéndose
pasada a pasada.

El fondo es el papel — un blanco cálido de stock de impresión, con
temperatura antes de que se imprima nada encima. Sobre él van las cuatro
tintas de proceso: magenta, cian, amarillo y la plancha de negro. Lo que hay
que leer entero sale en su propia hoja, más blanca que el pliego.

El sitio es deliberadamente escaso: papel, una regla de 1 px, tipografía y
tinta. Ningún elemento decorativo entra si no lo pide el contenido.

La tesis: **el código corriendo se ve por lo que es** — una tirada
componiéndose. En el primer viewport no hay titular gigante; hay la pieza
generativa imprimiéndose en tres pasadas ligeramente desalineadas, cuatro
cruces de registro en las esquinas y `rbt.` abajo a la izquierda, como el
cajetín de un taller. Nada más.

El desalineado no es un efecto: es el estado de reposo del sistema. Con el
cursor lejos, las separaciones están abiertas; al acercarse, registran. Todo
ese movimiento sale de una sola variable, `--reg`, que va de 1 a 0.

El contrato de dirección completo vive como comentario HTML al principio de
`<body>`, en `index.html`.

## Colors

Cuatro tintas y un papel. Nada más entra en la paleta.

### Primary — las tintas de proceso

- `--ink-magenta` `#D6006F` — la tinta de la acción. Botones, la cuarta
  pasada (contacto), el pulgar de la barra de scroll, el foco.
- `--ink-cyan` `#0079AB` — la tinta del sistema. Números de pasada, bordes
  activos, la primera plancha.
- `--ink-yellow` `#C8A400` — la tinta de la materia. Cobertura de la carta
  de tintas, la pila de trabajos, los parches del pie.
- `--ink-key` `#14150F` — la plancha de negro. Es el texto del sitio.
- `--ink-white` `#FFFFFF` — en serigrafía el blanco es una tinta más: la que
  se imprime encima de todo. Aquí sólo escribe sobre bloques de tinta llena.

### Secondary — sobreimpresiones

- `--ink-over-cm` `#5B2F78` — cian sobre magenta.
- `--ink-over-my` `#C4551D` — magenta sobre amarillo; el hover del botón.

Existen porque dos tintas encima dan una tercera. No se inventan colores
fuera de esa lógica.

### Tertiary — las tintas que escriben

Una tinta plana no siempre se puede leer. Sobre papel no se rebaja: se
carga. Estas variantes existen para eso y sólo para eso:

- `--ink-magenta-t` `#C4006B`, `--ink-cyan-t` `#00688F`,
  `--ink-violet-t` `#5B2F78`, `--ink-orange-t` `#A8460F`,
  `--ink-yellow-t` `#7D6200` — todas ≥ 4.5:1 sobre `--press`.
- El amarillo es el caso claro: como tinta plana pinta bien, pero para
  escribir hay que cargarlo hasta ocre.
- `--ink-magenta-d` es el mismo valor que `--ink-magenta-t`: sobre papel, la
  tinta que escribe es una sola.

### Las doce planchas

Cada caso de estudio es una separación y lleva su propia tinta, fijada en
`src/data/caseStudies.js` como `color`. Es un juego cerrado de doce, todas
derivadas de las cuatro de proceso y sus mezclas, y todas legibles (≥ 4.7:1)
sobre el papel donde aparecen como número:

`plate-01 #C4006B` · `plate-02 #0079AB` · `plate-03 #7D6200` ·
`plate-04 #5B2F78` · `plate-05 #1E7A50` · `plate-06 #A8460F` ·
`plate-07 #A81E63` · `plate-08 #00688F` · `plate-09 #6B7A16` ·
`plate-10 #6D4AA8` · `plate-11 #0F6E6A` · `plate-12 #8A5A00`

Una plancha nueva sólo entra si entra un caso nuevo.

### Neutral — el pliego y la hoja

- `--press` `#F4F1EA` — el pliego. Fondo de todo el sitio.
- `--press-deep` `#FAF8F3` — hoja recién puesta encima del pliego.
- `--press-raise` `#E7E2D7` — canto de hoja, hueco de portada.
- `--press-line` `#DAD4C6` — hairline sobre el pliego.
- `--sheet` `#FFFFFF`, `--sheet-soft` `#FAF8F3`, `--sheet-deep` `#EAE5DA`,
  `--sheet-line` `#E0DACD` — la hoja aparte y sus cantos.

Texto: `--on-press` / `--on-press-mid` / `--on-press-low` sobre el pliego;
`--on-sheet` / `--on-sheet-mid` / `--on-sheet-low` sobre la hoja. Todos los
pares de texto del sistema pasan AA (≥ 4.5:1).

### Named Rules

- **La Regla de la Tinta Plana.** Una tinta de proceso pinta: rellena chips,
  franjas, barras y bordes. Cuando tiene que llevar texto se cambia por su
  variante `-t`. Ninguna tinta plana escribe.
- **La Regla de las Cuatro.** El sistema tiene cuatro tintas y dos
  sobreimpresiones. Un color nuevo sólo entra si es una tinta de proceso o
  la mezcla de dos que ya están.
- **La Regla de la Hoja Aparte.** La hoja blanca no decora: aparece donde hay
  que leer seguido — la ficha del estudio, el lector de casos, las tarjetas,
  el formulario y la línea de servicio que se está imprimiendo.
- **La Regla del Vacío.** El pliego se deja en blanco. Nada de texturas de
  fondo, marcas sueltas ni relleno: lo único que se ve sobre el papel es lo
  que se ha impreso.

## Typography

Dos familias, ninguna de ellas la que se espera de un portfolio:

- **Archivo** (variable, eje `wdth` 62–125) para todo lo estructural. El eje
  de ancho *es* la escala de densidad: los titulares van expandidos
  (`wdth 118`), el texto corriente a 100.
- **Spline Sans Mono** para todo lo que en un taller sería un dato anotado
  en el margen: números de pasada, separaciones, coberturas, etiquetas.

### Hierarchy

| Rol | Tamaño | Peso | Familia |
| --- | --- | --- | --- |
| mega | clamp(64px, 9vw, 132px) | 800 | Archivo `wdth 118`, mayúsculas |
| display | clamp(44px, 6vw, 84px) | 800 | Archivo `wdth 118` |
| headline (`t-h1`) | clamp(34px, 4.2vw, 58px) | 700 | Archivo `wdth 118` |
| title (`t-h2`) | clamp(26px, 2.8vw, 40px) | 700 | Archivo `wdth 108` |
| subtitle (`t-h3`) | 22px | 600 | Archivo |
| block-title | 18px | 600 | Archivo |
| body | 16px / 1.55 | 400 | Archivo |
| small | 14px / 1.55 | 400 | Archivo |
| micro (`t-num`) | 12px | 500 | Spline Sans Mono, tabular |
| label (`t-label`) | 11px, `0.18em`, mayúsculas | 500 | Spline Sans Mono |
| wordmark | 22 / 44 / 16px | 900 | Archivo `wdth 118`, minúsculas |

Los botones se mueven dentro de esa rampa: `sm` a 12px, base a 14px,
`lg` a 16px.

### Named Rules

- **El Ancho es Densidad.** Cuanto más importa una línea, más ancha va la
  letra. El eje `wdth` sustituye a la costumbre de subir el peso.
- **Dos Voces.** Archivo dice lo que el sitio afirma; Spline Sans Mono dice
  lo que el taller mide. Un dato nunca va en Archivo, y una afirmación nunca
  va en mono.
- **El Cajetín en Minúscula.** El wordmark es `rbt.` en minúsculas, siempre.
  Nunca `RBT.`, nunca sin punto.

## Layout

Contenedor de 1280 px (1400 px donde hay rejilla de material). Márgenes de
24 px en móvil, 48 px en tablet, 64 px en desktop.

Escala de espaciado de 4 px: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128.

El sitio se recorre como una hoja: cada sección es **otra pasada** sobre el
mismo pliego, abierta por `pass-open` — número de pasada en el margen
izquierdo (columna de 88 px), titular a la derecha, y una regla de 1 px
cerrando por abajo.

### Breakpoints

- `≤ 420px` — galerías a una columna.
- `≤ 760px` — `pass-open` se apila; el lector de casos pasa de cajón lateral
  a hoja completa; la tubería de proceso rueda en su propio carril.
- `≤ 1024px` — la carta de tintas colapsa a dos columnas; el lector ocupa
  82vw.
- `≥ 1025px` — rejilla completa y márgenes de separación visibles.

### Named Rules

- **Una Pasada, una Sección.** Toda sección se abre con `pass-open` y su
  número `NN/06`. No hay dos aperturas distintas compitiendo.
- **El Margen Calla.** El margen del pliego se queda vacío salvo por las
  cuatro cruces de registro del primer viewport. Un dato sólo entra en el
  margen si es el número de pasada.

## Elevation & Depth

No hay sombras. Una impresión no proyecta sombras suaves: hay tinta sobre
papel y, como mucho, una hoja encima de otra.

La profundidad la dan dos cosas: el hairline de 1 px y el escalón de blanco
(la hoja `--sheet` sobre el pliego `--press`).

### Shadow Vocabulary

Ninguno. `box-shadow` no se usa en este sistema.

### Named Rules

- **Sin Sombra, con Canto.** Lo que en otro sistema sería una sombra, aquí
  es un borde de 1 px o un escalón de blanco.
- **El Levantamiento es de 3 px.** Las tarjetas que responden al cursor
  suben `translateY(-3px)` y cambian el borde a su tinta. Nada escala ni
  gira.

## Shapes

Radio 0 en todo. Una hoja cortada a guillotina no tiene esquinas redondas.

Las únicas curvas del sistema son las que trae el oficio: el anillo interior
de la cruz de registro y el punto de la trama de medio tono.

### Named Rules

- **Cero Radio.** `--radius: 0px`. La única excepción viva es el anillo de
  la cruz de registro, que es una marca de imprenta, no un contenedor.
- **El Pliego es Liso.** El fondo no lleva textura de ningún tipo. Existe
  `.halftone` para tramar un bloque de tinta llena, pero el papel se queda
  como está. Nunca ruido, nunca cuadrícula, nunca degradado de adorno.

## Components

Los primitivos del mundo viven en `src/components/Press.jsx`; los tokens en
`src/styles/index.css`.

### Buttons

- **Primario** — bloque de magenta, tinta blanca encima, 14×22, mayúsculas
  en mono. Hover: sobreimpresión naranja y `translate(-1px, -1px)`.
- **Ghost** — transparente con borde de pliego; el hover pasa borde y texto
  a magenta.
- **Sheet** — negro de plancha; es el botón del formulario.

### Chips

Marco de 1 px, mono de 12 px, sin relleno. Variantes `--sheet`, `--cyan` y
`--magenta` para cuando la etiqueta debe declarar su tinta.

### Cards / Containers

Tarjeta de separación (`case-card`, `work-card`): hoja blanca sobre el
pliego, hairline de 1 px, portada 16:10 y una franja de 4 px con la tinta de
esa plancha al pie de la portada.

### Alerts

El estado lo lleva el marco completo a 1 px, nunca una barra lateral.

### Inputs / Fields

Fondo `--sheet-soft`, borde `--sheet-line`, foco en magenta. Etiqueta en
mono, mayúsculas, `--on-sheet-low`.

### Navigation

Barra fija transparente que sólo se pinta (`rgba(244,241,234,0.92)` + blur)
cuando el pliego ya ha empezado a correr por debajo. Menú móvil a pliego
completo.

Los enlaces usan `.nav-link`: el color lo lleva el CSS, y `:hover` y
`:focus-visible` pintan lo mismo — quien tabula ve lo que ve quien apunta.
El menú móvil cerrado va con `visibility: hidden`, no sólo con opacidad 0:
si no, sus enlaces siguen siendo tabulables por encima de la página.

### Registration Marks (signature)

`RegisterMarks` pone cuatro cruces en las esquinas del pliego. Las de arriba
caen por debajo de la barra de navegación: una cruz nunca comparte sitio con
un control.

### Misregistration (signature)

`Misreg` imprime el mismo texto tres veces — cian, magenta y negro, en
`mix-blend-mode: multiply`, porque sobre papel la tinta es sustractiva. Sólo
la pasada de negro es contenido; las otras dos van `aria-hidden`.

Se reserva al wordmark `rbt.` y a la pieza del hero. En un titular grande el
desalineado deja de leerse como imprenta y empieza a parecer una sombra: por
eso las aperturas de pasada van en tinta plana.

El desplazamiento sale de `--reg`, que baja de 1 a 0 con la proximidad del
cursor (`useRegistration`, en `src/lib/registration.js`). Sin puntero fino o
con `prefers-reduced-motion`, `--reg` se queda quieto y la pieza se lee como
lo que es: una prueba sin registrar.

### Ink Chart (signature)

Los servicios son las líneas de una carta de tintas: chip de tinta, número,
nombre de la tinta, descripción y barra de cobertura. Al pasar por encima la
línea **se imprime**: sale en su propia hoja blanca sobre el pliego.

### Case Study Reader (signature)

Cajón lateral de papel (62vw / máx. 900 px) que se abre desde la derecha.
Dentro, el caso se lee por fotogramas: `F.01 Contexto → F.02 Proceso →
F.03 Solución → F.04 Resultados → F.05 Aprendizajes`. En móvil es una hoja
completa con `overscroll-behavior: contain`.

### Work Carousel (signature)

La pila de hojas ya impresas: carril con scroll-snap, tarjetas de
`min(300px, 78vw)` agrupadas por cliente, y visor propio por cliente con
navegación por teclado.

### Generative Canvas (signature)

Diez piezas vivas en la pasada de generativos, una plancha cada una: el
trazo va en la tinta que le toca y el marco se enciende con ella al pasar
por encima. Su geometría está fijada: se re-entintan, no se redibujan.

### La Mancha — pieza del hero (signature)

Tres manchas de tinta sobre el pliego, y nada más. El contorno es un círculo
al que un campo de ruido le come el borde: forma de tinta extendida sobre
papel, no polígono ni partícula.

Se dibujan **una sola vez** en una plancha (`p5.createGraphics`) y se
estampan tres veces con `blendMode(MULTIPLY)` y las tintas desplazadas —
una plancha, tres impresiones, que es exactamente lo que hace una prensa.

El fleco de color del borde no está pintado: es el sitio donde una pasada
asoma por debajo de otra, y donde el cian pisa el magenta sale
`--ink-over-cm`. Es la sobreimpresión ocurriendo, no dibujada. Con `--reg`
en 1 el fleco mide 16 px; en 0 desaparece.

Reglas de la pieza:

- **Un solo reloj.** El canvas no calcula su propio registro: lee `--reg` de
  la sección, la misma variable que desalinea el cajetín. Se pone con
  `useRegistration(560, { x: 0.64, y: 0.44 })` — a pliego completo hay que
  medir al centro de la masa de tinta, porque contra el borde de la sección
  el cursor siempre estaría dentro y nunca habría nada que registrar.
- **Nada se desplaza.** El contorno respira con el campo de ruido a un ciclo
  de unos cuarenta segundos. Ninguna forma viaja por la pantalla: el único
  movimiento con intención es el registro, y lo hace el visitante.
- **La composición cambia con la orientación.** En apaisado las manchas
  dejan libre la esquina inferior izquierda; en vertical no hay esquina que
  valga y toda la tinta sube al tercio de arriba. La ficha del cajetín se
  lee sobre papel, nunca sobre tinta.
- **Las tres manchas van separadas.** No se tocan entre sí: la
  sobreimpresión sale del desregistro de las pasadas, no de solapar formas.
  La esquina inferior izquierda se queda vacía, que es donde va el cajetín.
- **La plancha se regraba cada seis frames; el estampado va a 60 Hz.** La
  respiración dura cuarenta segundos y no da para más; la fluidez está en el
  registro, que es lo que sigue al cursor. El lienzo va a densidad de píxel
  1: son masas planas de tinta.
- **Las tintas se leen de los tokens**, no se copian en el sketch. Si el
  magenta cambia en `index.css`, cambia lo que sale por la prensa.
- **p5 se carga en diferido.** Son 940 KB para una pieza decorativa: no
  puede ir por delante del primer pintado. El pliego se queda en papel
  limpio hasta que llega la plancha, que es lo que hace una prensa.
- Con `prefers-reduced-motion` la respiración se detiene y `--reg` se queda
  quieto: la pieza se lee como lo que es, una prueba sin registrar. La
  prensa para también cuando el pliego sale de pantalla.
- **Excepción declarada a la Regla del Vacío:** el degradado que aclara el
  papel hacia el cajetín. El sistema prohíbe los degradados decorativos y
  éste no decora — sin él, la ficha se leería sobre tinta, y `--on-press-mid`
  sobre una mancha al 20% de cobertura cae a 4,09:1 y suspende AA. Es el
  único degradado permitido del sistema.

**El titular de la pasada.** En el primer viewport no hay titular grande, y
eso no cambia. Pero el `h1` del documento no puede ser el wordmark: quien
navega por encabezados recibía sólo la marca. El `h1` real va en `sr-only` y
el cajetín es un `<p>` — se ve la pieza, se lee el titular.

## Do's and Don'ts

### Do:

- Abrir cada sección con `pass-open` y su número de pasada.
- Usar la tinta plana para pintar y la variante `-t` para escribir.
- Dejar el pliego en blanco: el vacío es el material principal.
- Sacar la hoja blanca sólo cuando hay que leer de verdad.
- Derivar cualquier desalineado de `--reg`. Nunca fijar un offset a mano.
- Revelar con `appear()` de `src/lib/motion.js`, nunca con `gsap.fromTo`
  directo. El estado inicial oculto vive en el marcado, así que con
  `prefers-reduced-motion` no basta con no animar: hay que dejar el elemento
  puesto, o la página se queda en blanco.
- Escribir toda la interfaz en español.

### Don't:

- No añadir sombras, radios, texturas de fondo ni degradados decorativos.
- No usar una tinta plana como color de texto.
- No poner el desregistro en un titular: ahí se lee como sombra, no como
  imprenta.
- No repetir el patrón ojal + titular de dos líneas con la segunda palabra
  en color: ese patrón está retirado del sistema.
- No convertir una sección en una rejilla de tarjetas iguales con icono.
- No inventar métricas, testimonios ni clientes: manda el material.
- No tocar la geometría de las diez piezas de la pasada de generativos. Se
  re-entintan, no se redibujan.
- No dar movimiento propio a la pieza del hero. Lo único que se mueve con
  intención es el registro, y lo mueve el cursor. Una deriva, un giro o un
  barrido ahí compiten con el gesto y marean.
