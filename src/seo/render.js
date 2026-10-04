/* =========================================================
   LO QUE LEEN LAS MÁQUINAS
   El sitio se pinta con JavaScript, y ni la mayoría de agentes
   ni las vistas previas de enlaces lo ejecutan. Todo lo de aquí
   se genera en build desde los mismos datos que pinta React:
   - el <head> de cada idioma (meta, hreflang, JSON-LD),
   - el HTML estático dentro de #root, con cada caso completo,
   - la página de cada caso (/casos/<slug>/), con sus vídeos,
   - llms.txt y llms-full(.es).txt, en Markdown,
   - sitemap.xml, con las páginas y sus vídeos.
   Sólo lo usa vite.config.js; no entra en el bundle del navegador.
   ========================================================= */

import { CASES_BY_LANG } from '../data/caseStudies.js'
import { SERVICES_BY_LANG } from '../data/services.js'
import { WORK_GROUPS_BY_LANG } from '../data/works.js'
import { COPY } from '../data/copy.js'
import { VIDEO_META } from '../data/videoMeta.js'
import { casePath } from '../i18n.js'

export const SITE = 'https://rbt-studio.com'
const EMAIL = 'contact@rbt-studio.com'
const PAGE = { es: `${SITE}/`, en: `${SITE}/en/` }
const LLMS_FULL = { es: '/llms-full.es.txt', en: '/llms-full.txt' }

// Etiquetas de las secciones de un caso, en los dos formatos de salida.
const L = {
  es: {
    client: 'Cliente', role: 'Rol', timeline: 'Periodo', stack: 'Stack', context: 'Contexto',
    problem: 'El problema', process: 'Cómo se abordó', solution: 'Solución', decisions: 'Decisiones de producto',
    results: 'Resultados', metrics: 'Cifras', learnings: 'Qué se aprendió', link: 'Enlace', status: 'Estado',
    services: 'Servicios', cases: 'Casos de estudio', clients: 'Trabajo de cliente', about: 'Sobre Ricard Boixeda',
    contact: 'Contacto', otherLang: 'Read in English', generative: 'Piezas generativas',
    top: 'Volver arriba', fullText: 'Contenido completo en texto', moreCases: 'Más casos', video: 'Vídeo',
  },
  en: {
    client: 'Client', role: 'Role', timeline: 'Timeline', stack: 'Stack', context: 'Context',
    problem: 'The problem', process: 'How it was approached', solution: 'Solution', decisions: 'Product decisions',
    results: 'Results', metrics: 'Figures', learnings: 'What was learned', link: 'Link', status: 'Status',
    services: 'Services', cases: 'Case studies', clients: 'Client work', about: 'About Ricard Boixeda',
    contact: 'Contact', otherLang: 'Leer en castellano', generative: 'Generative pieces',
    top: 'Back to top', fullText: 'Full content as text', moreCases: 'More cases', video: 'Video',
  },
}

/* ── utilidades ─────────────────────────────────────────── */

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const oneLine = (s) => String(s ?? '').replace(/\s*\n\s*/g, ' ')
const label = (s) => String(s).replace('//', '').trim()
const toMd = (html) => String(html)
  .replace(/<br\s*\/?>/g, '\n  ')
  .replace(/<\/?strong>/g, '**')
  .replace(/<\/?em>/g, '_')
  .replace(/<[^>]+>/g, '')
const NAV_IDS = ['services', 'projects', 'works', 'artistic', 'about', 'contact']
const caseUrl = (lang, c) => `${SITE}${casePath(lang, c.slug)}`
const abs = (path) => (path ? `${SITE}${path}` : null)
const videosOf = (c) => [c.media?.video, ...(c.media?.extraVideos ?? [])].filter(Boolean)
const caseName = (c) => `${c.tag} — ${oneLine(c.title)}`
// La imagen que representa al caso: la miniatura de su vídeo o, si no tiene,
// la portada o la primera imagen.
const caseImage = (c) => VIDEO_META[videosOf(c)[0]]?.poster ?? c.media?.cover ?? c.media?.images?.[0]?.src ?? null
const contextOf = (c) => c.context?.body ?? c.body

/* ── <head> ─────────────────────────────────────────────── */

function jsonLd(lang) {
  const T = COPY[lang]
  const person = {
    '@type': 'Person',
    '@id': `${SITE}/#person`,
    name: 'Ricard Boixeda',
    jobTitle: 'Experience Engineer',
    description: T.about.paragraphs[0],
    url: PAGE[lang],
    email: `mailto:${EMAIL}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Barcelona', addressCountry: 'ES' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universitat de Barcelona' },
    worksFor: { '@id': `${SITE}/#studio` },
    knowsLanguage: ['es', 'ca', 'en'],
    knowsAbout: [
      'Frontend engineering', 'React', 'Next.js', 'TypeScript', 'Design systems', 'UX design',
      'AI-native product design', 'LLM applications', 'Multi-agent systems', 'Prompt engineering',
      'Motion design', 'GSAP', 'WebGL', 'Generative art', 'Creative coding', 'p5.js',
      'Specification-Driven Development', 'Art direction', 'Photography',
    ],
  }
  const studio = {
    '@type': 'ProfessionalService',
    '@id': `${SITE}/#studio`,
    name: 'RBT Studio',
    url: PAGE[lang],
    email: EMAIL,
    founder: { '@id': `${SITE}/#person` },
    address: { '@type': 'PostalAddress', addressLocality: 'Barcelona', addressCountry: 'ES' },
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: L[lang].services,
      itemListElement: SERVICES_BY_LANG[lang].map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, description: s.desc },
      })),
    },
  }
  const page = {
    '@type': 'ProfilePage',
    '@id': `${PAGE[lang]}#page`,
    url: PAGE[lang],
    name: T.meta.title,
    description: T.meta.description,
    inLanguage: lang,
    isPartOf: { '@id': `${SITE}/#website` },
    mainEntity: { '@id': `${SITE}/#person` },
    hasPart: { '@id': `${PAGE[lang]}#cases` },
  }
  const website = {
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    url: `${SITE}/`,
    name: 'RBT Studio',
    inLanguage: ['es', 'en'],
    publisher: { '@id': `${SITE}/#studio` },
  }
  const cases = {
    '@type': 'ItemList',
    '@id': `${PAGE[lang]}#cases`,
    name: L[lang].cases,
    itemListElement: CASES_BY_LANG[lang].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        '@id': caseUrl(lang, c),
        url: caseUrl(lang, c),
        name: `${c.tag} — ${oneLine(c.title)}`,
        headline: oneLine(c.title),
        description: c.subtitle,
        genre: c.category,
        keywords: (c.tech ?? []).join(', '),
        inLanguage: lang,
        creator: { '@id': `${SITE}/#person` },
      },
    })),
  }
  return { '@context': 'https://schema.org', '@graph': [website, page, person, studio, cases] }
}

// Lo común a todas las páginas: título, descripción, idiomas, Open Graph y
// datos estructurados. Cada página aporta sus valores.
function head({ lang, url, alternates, title, description, ogType, ogTitle, ogDescription, image, video, extra = '', ld }) {
  const other = lang === 'en' ? 'es' : 'en'
  const shareTitle = ogTitle ?? title
  const shareDesc = ogDescription ?? description
  // "<" dentro de un <script> cerraría la etiqueta si algún texto lo trajera.
  const json = JSON.stringify(ld, null, 2).replace(/</g, '\\u003c')
  const lines = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<link rel="alternate" hreflang="es" href="${alternates.es}" />`,
    `<link rel="alternate" hreflang="en" href="${alternates.en}" />`,
    `<link rel="alternate" hreflang="x-default" href="${alternates.es}" />`,
    `<link rel="alternate" type="text/markdown" title="LLM-readable summary" href="/llms.txt" />`,
    `<link rel="alternate" type="text/markdown" title="LLM-readable full content" href="${LLMS_FULL[lang]}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `<meta name="author" content="Ricard Boixeda" />`,
    `<meta name="theme-color" content="#2E332E" />`,
    `<link rel="icon" href="/favicon.svg" type="image/svg+xml" />`,
    '',
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:site_name" content="RBT Studio" />`,
    `<meta property="og:locale" content="${COPY[lang].meta.locale}" />`,
    `<meta property="og:locale:alternate" content="${COPY[other].meta.locale}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(shareTitle)}" />`,
    `<meta property="og:description" content="${esc(shareDesc)}" />`,
    image && `<meta property="og:image" content="${image}" />`,
    video && `<meta property="og:video" content="${video.url}" />`,
    video && `<meta property="og:video:type" content="video/mp4" />`,
    video && `<meta property="og:video:width" content="${video.width}" />`,
    video && `<meta property="og:video:height" content="${video.height}" />`,
    ...extra,
    `<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}" />`,
    `<meta name="twitter:title" content="${esc(shareTitle)}" />`,
    `<meta name="twitter:description" content="${esc(shareDesc)}" />`,
    image && `<meta name="twitter:image" content="${image}" />`,
    '',
    `<script type="application/ld+json">\n${json}\n    </script>`,
  ]
  return '\n' + lines.filter((x) => x !== false && x != null).map((x) => (x ? `    ${x}` : '')).join('\n')
}

export function headTags(lang) {
  const T = COPY[lang].meta
  return head({
    lang,
    url: PAGE[lang],
    alternates: PAGE,
    title: T.title,
    description: T.description,
    ogType: 'profile',
    ogTitle: T.ogTitle,
    ogDescription: T.ogDescription,
    extra: [
      `<meta property="profile:first_name" content="Ricard" />`,
      `<meta property="profile:last_name" content="Boixeda" />`,
    ],
    ld: jsonLd(lang),
  })
}

/* ── La página de un caso ───────────────────────────────── */

// Un VideoObject por vídeo del caso. Google exige nombre, descripción,
// miniatura y fecha; contentUrl y duración ayudan a que lo muestre.
function videoObjects(lang, c) {
  const vids = videosOf(c)
  return vids.map((src, i) => {
    const m = VIDEO_META[src] ?? {}
    return {
      '@type': 'VideoObject',
      '@id': `${caseUrl(lang, c)}#video-${i + 1}`,
      name: vids.length > 1 ? `${caseName(c)} (${i + 1}/${vids.length})` : caseName(c),
      description: `${c.subtitle}. ${c.category}.`,
      thumbnailUrl: abs(m.poster),
      contentUrl: abs(src),
      uploadDate: m.uploadDate,
      duration: m.duration,
      width: m.width,
      height: m.height,
      inLanguage: lang,
      creator: { '@id': `${SITE}/#person` },
    }
  })
}

export function caseHeadTags(lang, c) {
  const l = L[lang]
  const url = caseUrl(lang, c)
  const vids = videosOf(c)
  const first = vids[0] && VIDEO_META[vids[0]]
  const description = `${c.subtitle}. ${oneLine(contextOf(c) ?? '')}`.slice(0, 200).replace(/\s+\S*$/, '…')
  const videos = videoObjects(lang, c)
  const work = {
    '@type': 'CreativeWork',
    '@id': `${url}#work`,
    name: caseName(c),
    headline: oneLine(c.title),
    description: c.subtitle,
    genre: c.category,
    keywords: (c.tech ?? []).join(', '),
    inLanguage: lang,
    url,
    image: abs(caseImage(c)),
    creator: { '@id': `${SITE}/#person` },
    ...(videos.length && { video: videos.map((v) => ({ '@id': v['@id'] })) }),
  }
  const page = {
    '@type': 'WebPage',
    '@id': `${url}#page`,
    url,
    name: `${caseName(c)} · Ricard Boixeda`,
    description,
    inLanguage: lang,
    isPartOf: { '@id': `${SITE}/#website` },
    mainEntity: { '@id': `${url}#work` },
    primaryImageOfPage: abs(caseImage(c)),
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'RBT Studio', item: PAGE[lang] },
        { '@type': 'ListItem', position: 2, name: l.cases, item: `${PAGE[lang]}#projects` },
        { '@type': 'ListItem', position: 3, name: c.tag, item: url },
      ],
    },
  }
  const person = { '@type': 'Person', '@id': `${SITE}/#person`, name: 'Ricard Boixeda', jobTitle: 'Experience Engineer', url: PAGE[lang] }
  const website = { '@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: 'RBT Studio' }

  return head({
    lang,
    url,
    alternates: { es: caseUrl('es', c), en: caseUrl('en', c) },
    title: `${caseName(c)} · Ricard Boixeda`,
    description,
    ogType: first ? 'video.other' : 'article',
    image: abs(caseImage(c)),
    video: first && { url: abs(vids[0]), width: first.width, height: first.height },
    ld: { '@context': 'https://schema.org', '@graph': [website, page, work, ...videos, person] },
  })
}

// El HTML estático de la página de un caso: el caso como contenido principal,
// con sus vídeos arriba, y enlaces a la portada y al resto de casos.
export function caseShellHtml(lang, c) {
  const T = COPY[lang]
  const l = L[lang]
  const other = lang === 'en' ? 'es' : 'en'
  const home = PAGE[lang].replace(SITE, '')
  return `
      <div class="static-shell">
        <nav>
          <ul>
            <li><a href="${home}">RBT Studio</a></li>
            <li><a href="${home}#projects">${esc(l.cases)}</a></li>
            <li><a href="${casePath(other, c.slug)}" hreflang="${other}" lang="${other}">${l.otherLang}</a></li>
          </ul>
        </nav>
        ${caseHtml(lang, c, { page: true })}
        <section>
          <h2>${esc(l.moreCases)}</h2>
          <ul>${CASES_BY_LANG[lang].filter((x) => x.slug !== c.slug).map((x) => `
            <li><a href="${casePath(lang, x.slug)}">${esc(x.tag)}</a> — ${esc(x.subtitle)}</li>`).join('')}
          </ul>
        </section>
        <section id="contact">
          <h2>${esc(T.contact.title)}</h2>
          <p>${esc(T.contact.sub)}</p>
          <p><a href="mailto:${EMAIL}">${EMAIL}</a></p>
        </section>
      </div>
    `
}

/* ── HTML estático dentro de #root ──────────────────────── */

function videoFigures(lang, c) {
  const vids = videosOf(c)
  return vids.map((src, i) => {
    const m = VIDEO_META[src]
    const size = m ? ` poster="${m.poster}" width="${m.width}" height="${m.height}"` : ''
    const n = vids.length > 1 ? ` ${i + 1}/${vids.length}` : ''
    return `
            <figure>
              <video controls preload="metadata" playsinline src="${src}"${size}></video>
              <figcaption>${L[lang].video}${n} — ${esc(caseName(c))}</figcaption>
            </figure>`
  }).join('')
}

// En la portada cada caso es un h3 que enlaza a su página; en su página es
// el h1 y lleva los vídeos delante, que son su contenido principal.
function caseHtml(lang, c, { page = false } = {}) {
  const l = L[lang]
  const p = (s) => (s ? `<p>${esc(s)}</p>` : '')
  // Los apartados de un caso se repiten en los doce: como encabezados
  // serían 60 h4 duplicados. Van como etiqueta; el encabezado es el caso.
  const sub = (s) => `<p><strong>${s}</strong></p>`
  const meta = [
    c.client && `<dt>${l.client}</dt><dd>${esc(c.client)}</dd>`,
    c.role && `<dt>${l.role}</dt><dd>${esc(c.role)}</dd>`,
    c.timeline && `<dt>${l.timeline}</dt><dd>${esc(c.timeline)}</dd>`,
    c.tech?.length && `<dt>${l.stack}</dt><dd>${esc(c.tech.join(', '))}</dd>`,
  ].filter(Boolean).join('')

  return `
          <article id="case-${c.id}" lang="${lang}">
            ${page ? `<h1>${esc(caseName(c))}</h1>${videoFigures(lang, c)}` : `<h3><a href="${casePath(lang, c.slug)}">${esc(caseName(c))}</a></h3>`}
            <p><em>${esc(c.subtitle)}</em> · ${esc(c.category)}</p>
            <dl>${meta}</dl>
            ${c.context?.title ? sub(esc(c.context.title)) : ''}${p(contextOf(c))}
            ${c.problem ? `${sub(`${l.problem}: ${esc(c.problem.title)}`)}${p(c.problem.body)}` : ''}
            ${c.process?.length ? `${sub(l.process)}<ol>${c.process.map((s) => `<li><strong>${esc(s.title)}.</strong> ${esc(s.body)}</li>`).join('')}</ol>` : ''}
            ${c.pipeline ? `<p>${esc(label(c.pipeline.title ?? ''))}: ${esc(c.pipeline.nodes.map((n) => n.label).join(' → '))}</p>` : ''}
            ${c.solution ? `${sub(`${l.solution}: ${esc(c.solution.title)}`)}${p(c.solution.body)}` : ''}
            ${c.right?.length ? `${sub(l.decisions)}<ul>${c.right.map((r) => `<li><strong>${esc(label(r.label))}:</strong> ${r.valueHtml ?? esc(r.value)}</li>`).join('')}</ul>` : ''}
            ${c.resultsBody || c.metrics?.length ? `${sub(l.results)}${p(c.resultsBody)}` : ''}
            ${c.metrics?.length ? `<ul>${c.metrics.map((m) => `<li><strong>${esc(m.val)}</strong> — ${esc(m.label)}</li>`).join('')}</ul>` : ''}
            ${c.quote ? `<blockquote><p>${esc(c.quote.text)}</p></blockquote>` : ''}
            ${c.learnings?.length ? `${sub(l.learnings)}<ol>${c.learnings.map((x) => `<li>${x.text}</li>`).join('')}</ol>` : ''}
            ${c.link ? `<p><a href="${esc(c.link.href)}">${esc(c.link.label)}</a></p>` : ''}
            ${c.cta?.note ? `<p>${esc(c.cta.note)}</p>` : ''}
          </article>`
}

export function shellHtml(lang) {
  const T = COPY[lang]
  const l = L[lang]
  const other = lang === 'en' ? 'es' : 'en'
  return `
      <div class="static-shell">
        <nav>
          <ul>${NAV_IDS.map((id) => `<li><a href="#${id}">${esc(T.nav[id])}</a></li>`).join('')}
            <li><a href="${PAGE[other].replace(SITE, '')}" hreflang="${other}" lang="${other}">${l.otherLang}</a></li>
          </ul>
        </nav>
        <h1>${esc(T.meta.h1)}</h1>
        <p>${esc(T.hero.lede)}</p>
        <p>${esc(T.statement.a)} ${esc(T.statement.b)}</p>

        <section id="services">
          <h2>${esc(T.services.title)}</h2>
          <p>${esc(T.services.sub)}</p>
          <ul>${SERVICES_BY_LANG[lang].map((s) => `
            <li><h3>${esc(s.name)}</h3><p>${esc(s.desc)}</p><p>${esc(s.tags.join(', '))}</p></li>`).join('')}
          </ul>
        </section>

        <section id="projects">
          <h2>${esc(T.cases.title)}</h2>
          <p>${esc(T.cases.sub)}</p>
          <ul>${CASES_BY_LANG[lang].map((c) => `<li><a href="${casePath(lang, c.slug)}">${esc(c.tag)}</a> — ${esc(c.subtitle)}</li>`).join('')}</ul>${CASES_BY_LANG[lang].map((c) => caseHtml(lang, c)).join('')}
        </section>

        <section id="works">
          <h2>${esc(T.works.title)}</h2>
          <p>${esc(T.works.sub)}</p>
          <ul>${WORK_GROUPS_BY_LANG[lang].map((g) => `
            <li><strong>${esc(g.client)}</strong> — ${esc(g.cover.tech)}</li>`).join('')}
          </ul>
        </section>

        <section id="artistic">
          <h2>${esc(T.artistic.title)}</h2>
          <p>${esc(T.artistic.sub)} ${esc(T.artistic.lede)}</p>
          <ul>${T.artistic.items.map((i) => `
            <li><strong>${esc(i.title)}</strong> (${esc(i.label)}) — ${esc(i.desc)}</li>`).join('')}
          </ul>
        </section>

        <section id="generativos">
          <h2>${esc(T.generative.title)}</h2>
          <p>${esc(T.generative.sub)}</p>
          <ul>${T.generative.pieces.map((g) => `
            <li><strong>${esc(g.name)}</strong> — ${esc(g.note)}</li>`).join('')}
          </ul>
        </section>

        <section id="about">
          <h2>${esc(T.about.title)}</h2>
          ${T.about.paragraphs.map((x) => `<p>${esc(x)}</p>`).join('\n          ')}
          <dl>${T.about.specs.map((s) => `<dt>${esc(s.label)}</dt><dd>${esc(s.value)} — ${esc(s.note)}</dd>`).join('')}</dl>
        </section>

        <section id="contact">
          <h2>${esc(T.contact.title)}</h2>
          <p>${esc(T.contact.sub)}</p>
          <p><a href="mailto:${EMAIL}">${EMAIL}</a></p>
        </section>

        <footer>
          <p>
            <a href="#">${esc(l.top)}</a> ·
            <a href="${PAGE[other].replace(SITE, '')}" hreflang="${other}" lang="${other}">${l.otherLang}</a> ·
            <a href="/llms.txt">llms.txt</a> ·
            <a href="${LLMS_FULL[lang]}">${esc(l.fullText)}</a>
          </p>
        </footer>
      </div>
    `
}

/* ── llms.txt ───────────────────────────────────────────── */
// Formato de llmstxt.org: un H1, un resumen en cita y listas de enlaces.

export function llmsTxt() {
  const T = COPY.en
  const cases = CASES_BY_LANG.en
  return `# RBT Studio — Ricard Boixeda

> ${T.about.paragraphs[0]} Based in Barcelona, working remotely worldwide. Contact: ${EMAIL}

RBT Studio is the one-person practice of Ricard Boixeda, an Experience Engineer with a Fine Arts background (University of Barcelona). The site is a single page available in Spanish (${PAGE.es}) and English (${PAGE.en}). Each case study also has its own page, with its demo videos where it has them. The full text of every case study is in ${SITE}${LLMS_FULL.en} (English) and ${SITE}${LLMS_FULL.es} (Spanish).

## Pages

- [Portfolio (English)](${PAGE.en}): services, case studies, client work, generative pieces, about and contact
- [Portfolio (Spanish)](${PAGE.es}): the same content in Spanish, the original language of the site
- [Full content for LLMs (English)](${SITE}${LLMS_FULL.en}): every section and case study as Markdown
- [Full content for LLMs (Spanish)](${SITE}${LLMS_FULL.es}): the same, in Spanish

## Services

${SERVICES_BY_LANG.en.map((s) => `- **${s.name}**: ${s.desc}`).join('\n')}

## Case studies

${cases.map((c) => `- [${c.tag} — ${oneLine(c.title)}](${caseUrl('en', c)}): ${c.subtitle}. ${c.category}.`).join('\n')}

## Contact

- Email: ${EMAIL}
- Location: Barcelona, Spain · remote worldwide
- Languages: Spanish, Catalan, English
- Reply time: under 24 hours

## Optional

- [Client work](${PAGE.en}#works): ${WORK_GROUPS_BY_LANG.en.map((g) => g.client).join(', ')}
`
}

export function llmsFull(lang) {
  const T = COPY[lang]
  const l = L[lang]
  const md = (c) => {
    const out = [`### ${c.tag} — ${oneLine(c.title)}`, '', `URL: ${caseUrl(lang, c)}`, '', `_${c.subtitle}_ · ${c.category}`, '']
    if (c.client) out.push(`- **${l.client}:** ${c.client}`)
    if (c.role) out.push(`- **${l.role}:** ${c.role}`)
    if (c.timeline) out.push(`- **${l.timeline}:** ${c.timeline}`)
    if (c.tech?.length) out.push(`- **${l.stack}:** ${c.tech.join(', ')}`)
    if (c.link) out.push(`- **${l.link}:** ${c.link.href}`)
    out.push('')
    if (contextOf(c)) out.push(`#### ${c.context?.title ?? l.context}`, '', contextOf(c), '')
    if (c.problem) out.push(`#### ${l.problem}: ${c.problem.title}`, '', c.problem.body, '')
    if (c.process?.length) out.push(`#### ${l.process}`, '', ...c.process.map((s, i) => `${i + 1}. **${s.title}.** ${s.body}`), '')
    if (c.pipeline) out.push(`${label(c.pipeline.title ?? '')}: ${c.pipeline.nodes.map((n) => n.label).join(' → ')}`, '')
    if (c.solution) out.push(`#### ${l.solution}: ${c.solution.title}`, '', c.solution.body, '')
    if (c.right?.length) out.push(`#### ${l.decisions}`, '', ...c.right.map((r) => `- **${label(r.label)}:** ${r.valueHtml ? toMd(r.valueHtml) : r.value}`), '')
    if (c.resultsBody) out.push(`#### ${l.results}`, '', c.resultsBody, '')
    if (c.metrics?.length) out.push(...c.metrics.map((m) => `- **${m.val}** — ${m.label}`), '')
    if (c.quote) out.push(`> ${c.quote.text}`, '')
    if (c.learnings?.length) out.push(`#### ${l.learnings}`, '', ...c.learnings.map((x, i) => `${i + 1}. ${toMd(x.text)}`), '')
    if (c.cta?.note) out.push(`${l.status}: ${c.cta.note}`, '')
    return out.join('\n')
  }

  return `# RBT Studio — Ricard Boixeda

> ${T.meta.description}

URL: ${PAGE[lang]} · Email: ${EMAIL}

## ${l.about}

${T.about.title}

${T.about.paragraphs.join('\n\n')}

${T.about.specs.map((s) => `- **${s.label}:** ${s.value}. ${s.note}`).join('\n')}

## ${l.services}

${SERVICES_BY_LANG[lang].map((s) => `- **${s.name}** (${s.tags.join(', ')}): ${s.desc}`).join('\n')}

## ${l.cases}

${T.cases.sub}

${CASES_BY_LANG[lang].map(md).join('\n')}
## ${l.clients}

${T.works.sub}

${WORK_GROUPS_BY_LANG[lang].map((g) => `- **${g.client}** — ${g.cover.tech}`).join('\n')}

## ${T.artistic.title}

${T.artistic.sub} ${T.artistic.lede}

${T.artistic.items.map((i) => `- **${i.title}** (${i.label}): ${i.desc}`).join('\n')}

## ${l.generative}

${T.generative.sub}

${T.generative.pieces.map((g) => `- **${g.name}:** ${g.note}`).join('\n')}

## ${l.contact}

${T.contact.sub} ${EMAIL}
`
}

/* ── sitemap.xml ────────────────────────────────────────── */

// Portada y páginas de caso en los dos idiomas, enlazadas entre sí. Las
// páginas con vídeo llevan su entrada <video:video>: es el sitemap de vídeo
// que pide Google para descubrirlos.
export function sitemapXml(lastmod) {
  const xml = (s) => esc(s).replace(/'/g, '&apos;')
  const alternates = (urls) => ['es', 'en'].map((h) => `
    <xhtml:link rel="alternate" hreflang="${h}" href="${urls[h]}" />`).join('') + `
    <xhtml:link rel="alternate" hreflang="x-default" href="${urls.es}" />`
  const videoTags = (lang, c) => videoObjects(lang, c).map((v) => `
    <video:video>
      <video:thumbnail_loc>${v.thumbnailUrl}</video:thumbnail_loc>
      <video:title>${xml(v.name)}</video:title>
      <video:description>${xml(v.description)}</video:description>
      <video:content_loc>${v.contentUrl}</video:content_loc>
      <video:duration>${durationSeconds(v.duration)}</video:duration>
      <video:publication_date>${v.uploadDate}</video:publication_date>
    </video:video>`).join('')
  const entry = (loc, urls, extra = '') => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>${alternates(urls)}${extra}
  </url>`

  const entries = []
  for (const lang of ['es', 'en']) entries.push(entry(PAGE[lang], PAGE))
  for (const lang of ['es', 'en']) {
    for (const c of CASES_BY_LANG[lang]) {
      entries.push(entry(caseUrl(lang, c), { es: caseUrl('es', c), en: caseUrl('en', c) }, videoTags(lang, c)))
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${entries.join('\n')}
</urlset>
`
}

const durationSeconds = (iso) => {
  const m = String(iso).match(/PT(?:(\d+)M)?(\d+)S/)
  return m ? Number(m[1] ?? 0) * 60 + Number(m[2]) : 0
}

/** Todas las páginas de caso, para el build y el servidor de desarrollo. */
export const CASE_PAGES = ['es', 'en'].flatMap((lang) =>
  CASES_BY_LANG[lang].map((c) => ({ lang, c, path: casePath(lang, c.slug) })))
