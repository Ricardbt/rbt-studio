import gsap from 'gsap'

/**
 * Movimiento reducido, en un solo sitio.
 *
 * El sitio guarda el estado inicial oculto en el marcado —`opacity: 0` en
 * línea o la clase `opacity-0`— y es GSAP quien lo revela. Con movimiento
 * reducido, por tanto, no vale con saltarse el tween: eso dejaría la página
 * en blanco. Hay que dejar el elemento puesto en su estado final, sin
 * recorrido, sin retardo y sin ScrollTrigger.
 *
 * La prensa imprime igual; lo que se quita es el barrido.
 */

export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Aparición. Misma firma que `gsap.fromTo`, misma animación cuando el
 * visitante no ha pedido nada; con movimiento reducido, el estado final
 * aplicado de golpe.
 *
 * `to` lleva mezclados los valores de destino y la configuración del tween.
 * Al revelar se descarta la configuración y se queda sólo lo que es estado.
 */
export function appear(targets, from, to) {
  if (!prefersReducedMotion()) return gsap.fromTo(targets, from, to)

  const {
    duration, delay, stagger, ease, repeat, yoyo,
    scrollTrigger, onComplete, onStart, immediateRender,
    ...state
  } = to

  return gsap.set(targets, state)
}
