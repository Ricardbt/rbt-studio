# LinkedIn — El Último Zarpe

Medí la variedad de mi juego y descubrí que solo tenía **6 partidas posibles**.

Llevo unos meses con *El Último Zarpe*, un roguelike donde lo único que se acumula entre partidas es lo que has entendido. Sin monedas permanentes, sin árbol de mejoras. Preparas un viaje en barco con dinero, días y pistas contadas. Normalmente mueres. Y al reintentar te toca **la misma semilla a propósito**: el mismo puzzle, con más luz.

Cuatro decisiones que lo sostienen:

→ **El juego se demuestra soluble antes de dejarte empezar.** Un verificador prueba por fuerza bruta que existe una combinación de compras que sobrevive. Nunca miento sobre las reglas; sí sobre los hechos.

→ **Escribí el juego dos veces.** Primero como prototipo HTML jugable, después en Godot. El prototipo dejó de ser documentación y pasó a ser el oráculo: misma semilla, mismo resultado, 405/405 combinaciones. O el port está mal.

→ **La intuición de diseño no detectó el problema; contar sí.** De 6 puzzles posibles a 792, sacando las reglas del código a un JSON que puedo tunear sin recompilar.

→ **Lo que apaga una mecánica no rota.** El puerto sortea qué lugares abren cada partida, hasta que medí que en un 44 % de las partidas el jugador perdía en silencio la forma de detectar mentiras. Esa dificultad no se puede aprender, así que no vale.

Todavía no lo ha jugado nadie más que yo. Sin tienda, sin fecha, sin métricas de nada. Lo siguiente es ponerlo delante de gente y ver cuántas de mis certezas sobreviven.

¿Cuál ha sido la cifra que te destrozó una certeza sobre tu propio producto?

---

*Nota: publicar con 1–3 capturas — `01-inicio.png`, `02-puerto.png` y `05-travesia.png` son las que mejor paran el scroll.*
