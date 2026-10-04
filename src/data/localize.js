/**
 * Superpone una traducción sobre los datos originales.
 *
 * Los datos en castellano mandan: llevan la estructura, los colores y las
 * rutas del material. La traducción sólo trae texto, con la misma forma —
 * objetos por clave, listas por posición— y lo que no traduce se hereda.
 *
 * Una lista traducida con otra longitud que la original es una traducción
 * desalineada (un pie de foto debajo de la imagen equivocada). En ese caso
 * se avisa y se queda la lista original entera: mejor en castellano que mal.
 */
export function localize(base, over, path = '') {
  if (over === undefined || over === null) return base

  if (Array.isArray(base)) {
    if (!Array.isArray(over)) return over
    if (over.length !== base.length) {
      console.warn(`[localize] ${path}: ${base.length} elementos en el original y ${over.length} en la traducción — se usa el original`)
      return base
    }
    return base.map((item, i) => localize(item, over[i], `${path}[${i}]`))
  }

  if (base && typeof base === 'object' && typeof over === 'object') {
    const out = { ...base }
    for (const key of Object.keys(over)) out[key] = localize(base[key], over[key], `${path}.${key}`)
    return out
  }

  return over
}

/** Traduce una lista de registros con `id` a partir de un mapa id → traducción. */
export function localizeById(list, byId, name) {
  return list.map((item) => {
    if (!byId[item.id]) console.warn(`[localize] ${name}: falta la traducción de «${item.id}»`)
    return localize(item, byId[item.id], `${name}.${item.id}`)
  })
}
