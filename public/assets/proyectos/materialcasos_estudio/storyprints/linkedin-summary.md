# StoryPrints — resumen para LinkedIn

Un chat de IA te escribe un cuento para tu hija en diez segundos. Y luego te deja con
un texto en una ventana: sin portada, sin páginas, sin nada que imprimir, sin nada que
se quede en la estantería.

Eso es lo que he estado construyendo estos cinco meses. **StoryPrints** convierte ocho
respuestas de un padre en un libro infantil personalizado, ilustrado a línea negra sobre
blanco y descargable en PDF A4 — listo para imprimir en casa y colorear.

Tres cosas que aprendí construyéndolo solo, de la landing a los webhooks de pago:

→ **El artefacto es de papel, no de pantalla.** Eso cambia todas las decisiones
técnicas. Las ilustraciones no pueden llevar texto (una letra horneada en el bitmap no
se quita, y la página se imprime tal cual), así que la instrucción viaja repetida de
tres formas dentro del prompt y los diálogos entrecomillados se eliminan antes de que el
modelo de imagen vea la escena.

→ **Con IA generativa, el fallo caro es el silencioso.** Nada lanza una excepción cuando
un modelo devuelve algo inservible. El código que más valor aporta no es el que llama al
modelo: es el que decide qué se le manda y qué se hace con lo que vuelve.

→ **La economía tiene que estar en el código desde el día uno.** Cada libro cuesta
dinero en llamadas a modelos. Créditos, límites por plan y caducidad mensual no son una
capa que se añade después: durante un tiempo un suscriptor de pago recibió los mismos
dibujos genéricos que el plan gratuito porque el webhook escribía el plan y se olvidaba
de los créditos.

Next.js 15, Supabase, Claude para la narrativa, OpenRouter para las ilustraciones, cola
en Redis, pdfkit para el libro, Lemon Squeezy para las suscripciones. 376 tests en verde.

Está desplegado y funcionando. Lo que todavía no sé es lo único que importa: si un padre
paga 6,99 € al mes por esto. Toca averiguarlo.

Si tienes hijos entre 3 y 12 años y te apetece probarlo, el primer cuento es gratis y
sale completo, con su PDF. Me interesa mucho más tu opinión que tu suscripción.

👉 storyprints.rbt-studio.com

#IndieHacking #IA #NextJS #ProductoDigital
