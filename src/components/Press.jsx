/* =========================================================
   PRIMITIVAS DE TALLER
   Lo poco que el mundo necesita en el margen: las cruces de
   registro, el texto a tres pasadas y la apertura de pasada.
   Cualquier sección las usa; nadie las redibuja a mano.
   ========================================================= */

/**
 * Las cuatro cruces de esquina de un pliego. Las de arriba caen
 * por debajo de la barra de navegación: una cruz de registro no
 * comparte sitio con un control.
 */
export function RegisterMarks({ inset = 24, top = 84, className = '' }) {
  const spots = [
    { top, left: inset },
    { top, right: inset },
    { bottom: inset, left: inset },
    { bottom: inset, right: inset },
  ]
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {spots.map((pos, i) => (
        <span key={i} className="reg-cross" style={pos}><i /></span>
      ))}
    </div>
  )
}

/**
 * Texto a tres pasadas: cian, magenta y negro. Sólo la de negro
 * es contenido; las otras dos son tinta y van ocultas al lector
 * de pantalla. Se reserva al wordmark — en un titular grande el
 * desalineado deja de leerse como imprenta y parece una sombra.
 */
export function Misreg({ children, className = '', as: Tag = 'span' }) {
  return (
    <Tag className={`misreg ${className}`}>
      <span className="pass pass--c" aria-hidden="true">{children}</span>
      <span className="pass pass--m" aria-hidden="true">{children}</span>
      <span className="pass pass--k">{children}</span>
    </Tag>
  )
}

/**
 * Apertura de pasada. Sustituye al viejo par ojal + titular:
 * el número de pasada vive en el margen, no encima del título.
 */
export function PassOpen({ pass, total = 6, title, sub, id, ink = 'var(--ink-cyan-t)' }) {
  return (
    <header className="pass-open" id={id}>
      <div className="pass-open__num" style={{ color: ink }}>
        Pasada<br />{String(pass).padStart(2, '0')}/{String(total).padStart(2, '0')}
      </div>
      <div>
        <h2 className="t-h1">{title}</h2>
        {sub && <p className="pass-open__sub">{sub}</p>}
      </div>
    </header>
  )
}
