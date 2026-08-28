import { useEffect, useRef } from 'react'

/**
 * La interacción firma del sitio: la proximidad del cursor registra las tintas.
 *
 * Devuelve una ref. El elemento recibe --reg: 1 cuando el cursor está lejos
 * (separaciones abiertas) y 0 cuando está encima (tirada registrada). Todo el
 * desplazamiento de cian y magenta se deriva de esa variable en index.css;
 * ningún componente fija un offset a mano.
 *
 * Sin puntero fino o con motion reducido no se toca nada: --reg se queda en su
 * valor de reposo y la pieza se lee como una prueba sin registrar, que es lo
 * que es.
 */
export function useRegistration(radius = 420) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let frame = 0
    let px = -9999
    let py = -9999

    const apply = () => {
      frame = 0
      const r = el.getBoundingClientRect()
      const nx = Math.max(r.left, Math.min(px, r.right))
      const ny = Math.max(r.top, Math.min(py, r.bottom))
      const d = Math.hypot(px - nx, py - ny)
      el.style.setProperty('--reg', Math.min(1, d / radius).toFixed(3))
    }

    const onMove = (e) => {
      px = e.clientX
      py = e.clientY
      if (!frame) frame = requestAnimationFrame(apply)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
      el.style.removeProperty('--reg')
    }
  }, [radius])

  return ref
}
