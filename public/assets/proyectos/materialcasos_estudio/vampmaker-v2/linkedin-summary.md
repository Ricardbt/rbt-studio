# LinkedIn — VampMaker

Tenía una app que generaba campañas de rol con IA y funcionaba bien. También tenía un backend completo, con su base de datos y sus veinte endpoints, que no llamaba absolutamente nadie.

Las funciones para guardar y cargar campañas estaban escritas. Probadas. Sin una sola llamada desde la interfaz. Mientras tanto, la app enseñaba "Plan Gratuito" en la barra lateral y perdía tu campaña si abrías el navegador de al lado.

Cuatro cosas que me llevo de arreglarlo:

→ **El inglés que se colaba en la interfaz no venía de la IA.** Venía de una plantilla del propio código: `Generated ${type}`. Estuve un rato tuneando el prompt para arreglar algo que el prompt no había escrito.

→ **"Devuelve JSON válido" no es una especificación.** Es lo que pedía el prompt de fichas de personaje. El modelo se inventaba las claves y la interfaz no encontraba nada que pintar. Un prompt sin esquema es una API sin contrato.

→ **El contexto equivocado cuesta más caro que el que falta.** Le estaba metiendo las reglas de la Camarilla a campañas medievales, donde esa ley no existe hasta 1666. Trocear el canon por edición mejoró la salida *y* la abarató.

→ **Un hook con `useState` no es estado compartido.** El login funcionaba —cookie emitida, sesión válida— pero la app seguía pintándose como si no. Cada componente tenía su propia copia del usuario. Un fallo de arquitectura de estado disfrazado de bug de autenticación.

El patrón detrás de los cuatro es el mismo: el síntoma señalaba a un sitio y la causa estaba en otro.

¿Cuál es el bug que más tiempo te ha hecho perder mirando el lugar equivocado?

#AI #TypeScript #NestJS #NextJS #SoftwareEngineering
