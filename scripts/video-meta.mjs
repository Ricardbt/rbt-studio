// Genera los metadatos de los vídeos de los casos: miniatura, duración,
// tamaño y fecha de publicación. Google no indexa un vídeo sin miniatura, y
// el build (CI, Hostinger) no tiene ffmpeg, así que esto se ejecuta a mano
// cuando se añade o cambia un vídeo, y el resultado se versiona:
//
//   node scripts/video-meta.mjs
//
// Escribe public/assets/proyectos/posters/*.jpg y src/data/videoMeta.js.

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, statSync, writeFileSync, readFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import { CASES } from '../src/data/caseStudies.js'

const PUBLIC = 'public'
const POSTERS = '/assets/proyectos/posters/'
mkdirSync(join(PUBLIC, POSTERS), { recursive: true })

// Segundo del fotograma de la miniatura cuando el de por defecto no sirve
// (p. ej. el modelo 3D aún no ha cargado).
const POSTER_AT = { 'aimplas-3d': 15 }

const run = (cmd, args) => execFileSync(cmd, args, { encoding: 'utf8' }).trim()

// Fecha de publicación: la del primer commit que trajo el archivo. Si aún no
// está versionado, la de modificación del archivo.
const published = (file) => {
  try {
    const dates = run('git', ['log', '--diff-filter=A', '--follow', '--format=%aI', '--', file]).split('\n').filter(Boolean)
    if (dates.length) return dates[dates.length - 1]
  } catch {}
  return statSync(file).mtime.toISOString()
}

// Segundos → duración ISO 8601 (PT1M23S), que es lo que pide VideoObject.
const isoDuration = (sec) => {
  const s = Math.round(sec)
  const m = Math.floor(s / 60)
  return `PT${m ? `${m}M` : ''}${s % 60}S`
}

const previous = existsSync('src/data/videoMeta.js') ? readFileSync('src/data/videoMeta.js', 'utf8') : ''
const meta = {}

for (const c of CASES) {
  const videos = [c.media?.video, ...(c.media?.extraVideos ?? [])].filter(Boolean)
  for (const src of videos) {
    const file = join(PUBLIC, src)
    if (!existsSync(file)) { console.warn(`falta ${file}`); continue }

    const [w, h, dur] = run('ffprobe', [
      '-v', 'error', '-select_streams', 'v:0',
      '-show_entries', 'stream=width,height:format=duration',
      '-of', 'csv=p=0:s=,', file,
    ]).split(/[\n,]/).filter(Boolean).map(Number)

    // Un fotograma ya avanzado: el primero suele ser negro o una transición.
    const poster = `${POSTERS}${basename(src, '.mp4')}.jpg`
    const at = (POSTER_AT[basename(src, '.mp4')] ?? Math.min(2, dur / 3)).toFixed(2)
    execFileSync('ffmpeg', [
      '-y', '-loglevel', 'error', '-ss', at, '-i', file,
      '-frames:v', '1', '-vf', "scale='min(1280,iw)':-2", '-q:v', '3',
      join(PUBLIC, poster),
    ])

    meta[src] = { poster, width: w, height: h, duration: isoDuration(dur), uploadDate: published(file) }
    console.log(`${src} → ${poster} (${meta[src].duration})`)
  }
}

const out = `// Generado por scripts/video-meta.mjs — no editar a mano.
export const VIDEO_META = ${JSON.stringify(meta, null, 2)}
`
if (out !== previous) writeFileSync('src/data/videoMeta.js', out)
