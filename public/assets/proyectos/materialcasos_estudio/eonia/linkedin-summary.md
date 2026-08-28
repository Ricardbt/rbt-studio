# EONIA — resumen para LinkedIn

Tenemos más datos biológicos que nunca y seguimos tomando los mismos suplementos cada mañana, dé igual cómo estemos hoy.

El mercado resolvió los dos extremos: medir (Oura, WHOOP, Apple Health) e intervenir (suplementación basada en evidencia). El hueco está en el medio — **la decisión** — y ahí es donde llevo un año construyendo EONIA.

La diferencia no es incremental, es estructural: un sistema que **recomienda** te pasa la carga cognitiva a ti; un sistema que **decide** te la quita.

Cómo funciona y qué me ha enseñado construirlo:

→ **Un check-in de 30 segundos, cinco dimensiones.** De ahí sale un estado biológico calculado (uno de seis) y una arquitectura de cápsulas adaptada a ese estado, con ventanas circadianas por compuesto. El siguiente check-in refina la decisión siguiente.

→ **El motor de decisión es puro y determinista.** Sin I/O, sin React, sin LLM: entra un check-in, sale un veredicto. Corre igual en el móvil que en el servidor, así que el modo offline no es una versión degradada — es el mismo sistema. 35 tests lo sostienen.

→ **La IA explica, no decide.** La capa narrativa (LangGraph + Claude) genera el informe personalizado, pero trabaja sobre un contexto *grounded*: no deriva un estado, ni una arquitectura, ni un número propio. Normalizar datos es trabajo verificable, y el trabajo verificable va en código. Poner el modelo en el sitio equivocado es fácil, caro y difícil de auditar.

→ **Lo que un profesional debe poder cambiar no puede vivir en el código.** El catálogo clínico salió del motor y se fue a base de datos, con consola de back-office, versionado y firma clínica. Si actualizar un protocolo exige un despliegue, el experto de dominio queda fuera del producto.

MVP desplegado y en beta cerrada: app React Native / Expo, backend NestJS en Render, consola React.

La pregunta que más me interesa ahora mismo, y sobre la que discrepo con medio sector: **¿cuánta agencia estamos dispuestos a delegar en un sistema que decide por nosotros, si a cambio deja de exigirnos entenderlo todo?** Me interesan las respuestas incómodas.

#ProductEngineering #AI #HealthTech #ReactNative #LangGraph
