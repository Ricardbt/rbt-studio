import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectVideo, { VideoModal } from './ProjectVideo'
import CaseStudyModal from './CaseStudyModal'
import { getCaseById } from '../data/caseStudies'

gsap.registerPlugin(ScrollTrigger)

// Single source of truth — images + videos, ordered by impact for clients & recruiters
const ALL_PROJECTS = [
  // ── Tier 1: AI / SaaS products ────────────────────────────────────────────
  { id: 'v7', type: 'video', featured: true,  client: 'Brandboard AI',        tech: 'AI · Brand Identity', title: 'Brandboard AI',            src: 'assets/proyectos/captures/brandAI1.mp4',             caseStudy: 'ba', extraVideos: ['assets/proyectos/captures/brandAI2.mp4'] },
  { id: 'v1', type: 'video', featured: true,  client: 'StoryPrint AI',        tech: 'SaaS · LLM',          title: 'StoryPrint Wizard',        src: 'assets/proyectos/captures/storyprints-wizard.mp4',   caseStudy: 'sp' },

  // ── Tier 2: Prestigious institutions ──────────────────────────────────────
  { id: 18,   type: 'image', featured: true,  client: 'UCSF',                 tech: 'Drupal · Custom theme & plugins', title: 'UCSF BALANCE',  image: 'assets/proyectos/webs/screencapture-balance-ucsf-edu-2023-03-03-11_06_33.png',                objectPosition: 'center' },
  { id: 19,   type: 'image', featured: false, client: 'UCSF',                 tech: 'Drupal · Custom theme & plugins', title: 'ChowLab UCSF',  image: 'assets/proyectos/webs/screencapture-chowlab-ucsf-edu-our-research-2023-06-23-11_32_38.png',    objectPosition: 'center' },

  { id: 50,   type: 'image', featured: true,  client: 'SJD',                  tech: 'WordPress',           title: 'SJD Apertura',             image: 'assets/proyectos/captures/Captura_apertura.PNG',                                               objectPosition: 'top' },
  { id: 51,   type: 'image', featured: false, client: 'SJD',                  tech: 'WordPress',           title: 'SJD Actualidad Home',      image: 'assets/proyectos/captures/Captura_actualidadhome.PNG',                                         objectPosition: 'top' },
  { id: 52,   type: 'image', featured: false, client: 'SJD',                  tech: 'WordPress',           title: 'SJD Banner Donaciones',    image: 'assets/proyectos/captures/Captura_banner-donaciones.PNG',                                      objectPosition: 'top' },
  { id: 53,   type: 'image', featured: false, client: 'SJD',                  tech: 'WordPress',           title: 'SJD Nuestros Valores',     image: 'assets/proyectos/captures/Captura_banner-nuestrosvalores.PNG',                                 objectPosition: 'top' },
  { id: 54,   type: 'image', featured: false, client: 'SJD',                  tech: 'WordPress',           title: 'SJD Bloque Galería',       image: 'assets/proyectos/captures/Captura_bloque-galeria.PNG',                                         objectPosition: 'top' },
  { id: 55,   type: 'image', featured: false, client: 'SJD',                  tech: 'WordPress',           title: 'SJD Media Text',           image: 'assets/proyectos/captures/Captura_bloque-mediatext.PNG',                                       objectPosition: 'top' },
  { id: 56,   type: 'image', featured: false, client: 'SJD',                  tech: 'WordPress',           title: 'SJD Noticias Revistas',    image: 'assets/proyectos/captures/Captura_bloque-noticias-revistas.PNG',                               objectPosition: 'top' },
  { id: 57,   type: 'image', featured: false, client: 'SJD',                  tech: 'WordPress',           title: 'SJD Relacionados',         image: 'assets/proyectos/captures/Captura_bloque-relacionados.PNG',                                    objectPosition: 'top' },
  { id: 58,   type: 'image', featured: false, client: 'SJD',                  tech: 'WordPress',           title: 'SJD Centros',              image: 'assets/proyectos/captures/Captura_centros.PNG',                                                objectPosition: 'top' },
  { id: 59,   type: 'image', featured: false, client: 'SJD',                  tech: 'WordPress',           title: 'SJD Cifras',               image: 'assets/proyectos/captures/Captura_cifras.PNG',                                                 objectPosition: 'top' },
  { id: 60,   type: 'image', featured: false, client: 'SJD',                  tech: 'WordPress',           title: 'SJD Escritorio Media',     image: 'assets/proyectos/captures/Captura_escritorio-media.PNG',                                       objectPosition: 'top' },
  { id: 61,   type: 'image', featured: false, client: 'SJD',                  tech: 'WordPress',           title: 'SJD Escritorio Noticias',  image: 'assets/proyectos/captures/Captura_escritorio-noticias.PNG',                                    objectPosition: 'top' },
  { id: 62,   type: 'image', featured: false, client: 'SJD',                  tech: 'WordPress',           title: 'SJD Patrones Sincro',      image: 'assets/proyectos/captures/Captura_escritorio-patrones-sincro.PNG',                             objectPosition: 'top' },
  { id: 63,   type: 'image', featured: false, client: 'SJD',                  tech: 'WordPress',           title: 'SJD Eventos Home',         image: 'assets/proyectos/captures/Captura_eventoshome.PNG',                                            objectPosition: 'top' },
  { id: 64,   type: 'image', featured: false, client: 'SJD',                  tech: 'WordPress',           title: 'SJD Iniciativas',          image: 'assets/proyectos/captures/Captura_iniciativas.PNG',                                            objectPosition: 'top' },
  { id: 65,   type: 'image', featured: false, client: 'SJD',                  tech: 'WordPress',           title: 'SJD La Casa de Todos',     image: 'assets/proyectos/captures/Captura_lacasadetodosbanner.PNG',                                    objectPosition: 'top' },
  { id: 66,   type: 'image', featured: false, client: 'SJD',                  tech: 'WordPress',           title: 'SJD Mapa',                 image: 'assets/proyectos/captures/Captura_mapa.PNG',                                                   objectPosition: 'top' },
  { id: 67,   type: 'image', featured: false, client: 'SJD',                  tech: 'WordPress',           title: 'SJD Nuestro ADN',          image: 'assets/proyectos/captures/Captura_nuestroadnhome.PNG',                                         objectPosition: 'top' },
  { id: 68,   type: 'image', featured: false, client: 'SJD',                  tech: 'WordPress',           title: 'SJD Publicaciones',        image: 'assets/proyectos/captures/Captura_publicacioneshome.PNG',                                      objectPosition: 'top' },
  { id: 69,   type: 'image', featured: false, client: 'SJD',                  tech: 'WordPress',           title: 'SJD Single Evento',        image: 'assets/proyectos/captures/Captura_single-evento.PNG',                                          objectPosition: 'top' },
  { id: 70,   type: 'image', featured: false, client: 'SJD',                  tech: 'WordPress',           title: 'SJD Single Location',      image: 'assets/proyectos/captures/Captura_single-location.PNG',                                        objectPosition: 'top' },
  { id: 71,   type: 'image', featured: false, client: 'SJD',                  tech: 'WordPress',           title: 'SJD Single Post',          image: 'assets/proyectos/captures/Captura_single-post.PNG',                                            objectPosition: 'top' },
  { id: 72,   type: 'image', featured: false, client: 'SJD',                  tech: 'WordPress',           title: 'SJD Bloque Noticias',      image: 'assets/proyectos/captures/Captura-bloque_noticas.PNG',                                         objectPosition: 'top' },
  { id: 73,   type: 'image', featured: false, client: 'SJD',                  tech: 'WordPress',           title: 'SJD Query Plugin',         image: 'assets/proyectos/captures/Captura-bloque_query-pluginrelatedpds.PNG',                          objectPosition: 'top' },

  // ── Tier 3: Recognizable brands ───────────────────────────────────────────
  { id: 6,    type: 'image', featured: true,  client: 'Veritas',              tech: 'E-commerce · Custom · Maps', title: 'Veritas',            image: 'assets/proyectos/webs/screencapture-veritas-es-tienda-veritas-san-juan-2-2024-03-29-19_09_06.png', objectPosition: 'center' },
  { id: 7,    type: 'image', featured: false, client: 'Veritas',              tech: 'Custom',              title: 'Veritas Mapa',             image: 'assets/proyectos/webs/screencapture-veritas-es-mapa-2024-03-29-19_08_28.png',                      objectPosition: 'center' },
  { id: 'v2', type: 'video', featured: false, client: 'Veritas',              tech: 'Custom · Maps',       title: 'Veritas Mapa Demo',        src: 'assets/proyectos/captures/veritas-mapa.mp4' },

  // ── Tier 4: Portfolio / creative ──────────────────────────────────────────
  { id: 'v6', type: 'video', featured: true,  client: 'Marc Gomez del Moral', tech: 'Portfolio',           title: 'Marc Gomez del Moral',     src: 'assets/proyectos/captures/Marcgomezdelmoral.mp4' },

  // ── Tier 5: Strong custom & CMS work ──────────────────────────────────────
  { id: 4,    type: 'image', featured: true,  client: 'E.Casals',             tech: 'WordPress',           title: 'E.Casals Home',            image: 'assets/proyectos/webs/screencapture-ecasals-net-es-index-php-2024-03-29-19_06_20.png',            objectPosition: 'center' },
  { id: 5,    type: 'image', featured: false, client: 'E.Casals',             tech: 'WordPress',           title: 'E.Casals Servicios',       image: 'assets/proyectos/webs/screencapture-ecasals-net-es-index-php-2024-03-29-19_06_43.png',            objectPosition: 'center' },

  { id: 8,    type: 'image', featured: true,  client: 'Obra Social SJD',      tech: 'WordPress',           title: 'Obra Social San Juan',     image: 'assets/proyectos/webs/screencapture-obrasocialsanjuandedios-es-2024-03-29-19_18_34.png',         objectPosition: 'center' },

  { id: 29,   type: 'image', featured: true,  client: 'Carrete',              tech: 'Drupal · Custom theme & plugins', title: 'Carrete Web',    image: 'assets/proyectos/webs/carrete1.png',                                                            objectPosition: 'center' },
  { id: 33,   type: 'image', featured: false, client: 'Carrete',              tech: 'Drupal · Custom theme & plugins', title: 'Carrete',        image: 'assets/proyectos/webs/carrete2.png',                                                            objectPosition: 'center' },
  { id: 38,   type: 'image', featured: false, client: 'Carrete',              tech: 'Drupal · Custom theme & plugins', title: 'Carrete',        image: 'assets/proyectos/webs/carrete5.png',                                                            objectPosition: 'center' },

  { id: 24,   type: 'image', featured: true,  client: 'Elche.me',             tech: 'Drupal · Custom theme & plugins', title: 'Elche.me',       image: 'assets/proyectos/webs/screencapture-elche-me-2023-03-03-10_58_41.png',                           objectPosition: 'center' },
  { id: 25,   type: 'image', featured: false, client: 'Elche.me',             tech: 'Drupal · Custom theme & plugins', title: 'Elche.me',       image: 'assets/proyectos/webs/screencapture-elche-me-web-index-php-publicaciones-2023-03-03-10_59_03.png', objectPosition: 'center' },

  { id: 10,   type: 'image', featured: true,  client: 'Cultura Sitges',       tech: 'WordPress',           title: 'Cultura Sitges',           image: 'assets/proyectos/webs/screencapture-culturasitges-cat-2023-03-03-11_08_23.png',                  objectPosition: 'center' },
  { id: 11,   type: 'image', featured: false, client: 'Cultura Sitges',       tech: 'WordPress',           title: 'Cultura Sitges Agenda',    image: 'assets/proyectos/webs/screencapture-culturasitges-cat-actualitat-agenda-2023-03-03-11_08_48.png', objectPosition: 'center' },

  // ── Tier 6: Product demos ─────────────────────────────────────────────────
  { id: 'v4', type: 'video', featured: true,  client: 'The Smart Lollipop',   tech: 'Web · 3D · GSAP',     title: 'The Smart Lollipop',       src: 'assets/proyectos/captures/smartlolipop.mp4',         caseStudy: 'tsl',
    caseImages: ['assets/proyectos/webs/tsl_tsl_core.webp', 'assets/proyectos/webs/TSL_Group-scaled.webp'] },

  { id: 'v5', type: 'video', featured: true,  client: 'D-Go',                 tech: 'Web · 3D · Scroll',   title: 'D-Go',                     src: 'assets/proyectos/captures/dgo-web.mp4',              caseStudy: 'dgo',
    caseImages: ['assets/proyectos/webs/DGO_Tech-scaled.webp', 'assets/proyectos/webs/MOvile_DGO.webp'] },

  { id: 'v8', type: 'video', featured: true,  client: 'Aimplas',              tech: 'React Native · 3D',   title: 'Aimplas 3D App',           src: 'assets/proyectos/captures/aimplas-3d.mp4',           caseStudy: 'aimplas', extraVideos: ['assets/proyectos/captures/aimplas-menu.mp4'],
    caseImages: ['assets/proyectos/webs/Aimplas_Thumb.webp'] },

  { id: 'v3', type: 'video', featured: true,  client: 'VampMaker',            tech: 'App',                 title: 'VampMaker Demo',           src: 'assets/proyectos/captures/vampmaker.mp4',            caseStudy: 'vm' },

  // ── Tier 7: Additional web work ───────────────────────────────────────────

  { id: 14,   type: 'image', featured: true,  client: 'Universitat de Barcelona', tech: 'Custom',          title: 'Intranet Displays',        image: 'assets/proyectos/webs/intranet_displays.jpg',                                                   objectPosition: 'center' },
  { id: 13,   type: 'image', featured: false, client: 'Universitat de Barcelona', tech: 'Mobile',          title: 'Avantatges iPad',          image: 'assets/proyectos/webs/avantatges_ipad.PNG',                                                     objectPosition: 'center' },
  { id: 15,   type: 'image', featured: false, client: 'Universitat de Barcelona', tech: 'Custom',          title: 'UB Formulari',             image: 'assets/proyectos/webs/screencapture-ub-edu-formulariscompres-2023-06-23-11_34_35.png',           objectPosition: 'center' },
  { id: 17,   type: 'image', featured: false, client: 'Universitat de Barcelona', tech: 'Custom',          title: 'Avantatges Displays',      image: 'assets/proyectos/webs/avantatges_displays.jpg',                                                 objectPosition: 'center' },
  { id: 30,   type: 'image', featured: false, client: 'Universitat de Barcelona', tech: 'Custom',          title: 'Charm EU',                 image: 'assets/proyectos/webs/charm-eu.png',                                                            objectPosition: 'center' },
  { id: 34,   type: 'image', featured: false, client: 'Universitat de Barcelona', tech: 'Mobile',          title: 'Avantatges Subsistema',    image: 'assets/proyectos/webs/avantatgesub1.png',                                                       objectPosition: 'center' },
  { id: 37,   type: 'image', featured: false, client: 'Universitat de Barcelona', tech: 'Custom',          title: 'Vespres Landing',          image: 'assets/proyectos/webs/vespres1.PNG',                                                            objectPosition: 'center' },
  { id: 39,   type: 'image', featured: false, client: 'Universitat de Barcelona', tech: 'Mobile',          title: 'Avantatges Subsistema 2',  image: 'assets/proyectos/webs/avantatgesub2.png',                                                       objectPosition: 'center' },
  { id: 42,   type: 'image', featured: false, client: 'Universitat de Barcelona', tech: 'Custom',          title: 'Vespres Servicios',        image: 'assets/proyectos/webs/vespres2.PNG',                                                            objectPosition: 'center' },
  { id: 43,   type: 'image', featured: false, client: 'Universitat de Barcelona', tech: 'Custom',          title: 'Vespres Equipo',           image: 'assets/proyectos/webs/vespres3.PNG',                                                            objectPosition: 'center' },
  { id: 44,   type: 'image', featured: false, client: 'Universitat de Barcelona', tech: 'Custom',          title: 'Vespres Contacto',         image: 'assets/proyectos/webs/vespres4.PNG',                                                            objectPosition: 'center' },

  { id: 9,    type: 'image', featured: false, client: 'Otros',                tech: 'React',               title: 'AI Research COVID',        image: 'assets/proyectos/webs/screencapture-airesearch-sesgos-covid19-2022-11-14-18_36_00.png',          objectPosition: 'center' },
  { id: 12,   type: 'image', featured: false, client: 'Otros',                tech: 'Custom',              title: 'Ecowave',                  image: 'assets/proyectos/webs/screencapture-estilmar-ecowave-2023-06-16-15_09_10.png',                   objectPosition: 'center' },
  { id: 16,   type: 'image', featured: false, client: 'Otros',                tech: 'E-commerce',          title: 'Terpenic Catálogo',        image: 'assets/proyectos/webs/screencapture-terpenic-ricardbt-catalogo-2023-03-03-09_50_02.png',         objectPosition: 'center' },
  { id: 22,   type: 'image', featured: false, client: 'Otros',                tech: 'Webflow',             title: 'Entangle',                 image: 'assets/proyectos/webs/screencapture-entangle-website-webflow-io-2022-11-21-19_29_56.png',        objectPosition: 'center' },
  { id: 23,   type: 'image', featured: false, client: 'Otros',                tech: 'WordPress',           title: 'El Risell',                image: 'assets/proyectos/webs/screencapture-elrisell-cat-2022-11-14-18_38_27.png',                       objectPosition: 'center' },
  { id: 26,   type: 'image', featured: false, client: 'Otros',                tech: 'Custom',              title: 'Coralimentación',          image: 'assets/proyectos/webs/screencapture-coralimentacion-2023-03-03-11_05_24.png',                    objectPosition: 'center' },
  { id: 27,   type: 'image', featured: false, client: 'Otros',                tech: 'Custom',              title: 'Hyphen Culture',           image: 'assets/proyectos/webs/screencapture-hyphen-be-en-our-culture-2022-11-14-18_35_10.png',           objectPosition: 'center' },
  { id: 28,   type: 'image', featured: false, client: 'Otros',                tech: 'Custom',              title: 'Gallantium Pricing',       image: 'assets/proyectos/webs/screencapture-gallantium-pricing-2022-11-14-18_57_41.png',                 objectPosition: 'center' },
]

const getClientImages = (clientName) =>
  ALL_PROJECTS.filter(p => p.type === 'image' && p.client === clientName)

const getClientMedia = (clientName) =>
  ALL_PROJECTS.filter(p => p.client === clientName)

export default function ProjectGallery() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [videoModal, setVideoModal]           = useState(null)
  const [caseModal, setCaseModal]             = useState(null) // { caseData, videoSrc? }
  const [hintVisible, setHintVisible]         = useState(() => !localStorage.getItem('rbt_gallery_hint_seen'))
  const sectionRef  = useRef(null)
  const titleRef    = useRef(null)
  const galleryRef  = useRef(null)

  const handleImageClick = (project) => {
    if (hintVisible) {
      setHintVisible(false)
      localStorage.setItem('rbt_gallery_hint_seen', '1')
    }
    setSelectedProject(project)
  }

  const handleCarouselNav = (direction) => {
    if (!selectedProject) return
    const siblings = getClientMedia(selectedProject.client)
    const idx = siblings.findIndex(p => p.id === selectedProject.id)
    let next = idx + direction
    if (next < 0) next = siblings.length - 1
    if (next >= siblings.length) next = 0
    setSelectedProject(siblings[next])
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      )
      gsap.fromTo('.project-thumbnail',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.04, ease: 'power2.out',
          scrollTrigger: { trigger: galleryRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const featured = ALL_PROJECTS.filter(p => p.featured)
  const firstImageIdx = featured.findIndex(p => p.type === 'image')

  return (
    <section ref={sectionRef} id="projects" className="py-16 md:py-20 lg:py-24" style={{ backgroundColor: '#F2EFE6' }}>
      <div className="relative z-10 w-full mx-auto px-4 sm:px-8 lg:px-16" style={{ maxWidth: '1400px' }}>

        <div ref={titleRef} className="mb-12 md:mb-16 lg:mb-24" style={{ opacity: 0 }}>
          <p className="font-mono text-[12px] tracking-[0.18em] uppercase mb-6" style={{ color: '#15C1C1' }}>
            05 / 05 · Galería Visual
          </p>
          <h2 className="font-sans text-5xl lg:text-6xl font-semibold leading-[0.95] tracking-tight" style={{ color: '#14140F' }}>
            Proyectos
            <br />
            <em className="not-italic" style={{ color: '#15C1C1' }}>realizados</em>
          </h2>
        </div>

        {/* Unified grid — videos + images together */}
        <div
          ref={galleryRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '32px',
          }}
        >
          {featured.map((project, idx) => {
            if (project.type === 'video') {
              return (
                <ProjectVideo
                  key={project.id}
                  src={project.src}
                  title={project.title}
                  client={project.client}
                  tech={project.tech}
                  caseStudyId={project.caseStudy}
                  extraVideos={project.extraVideos}
                  caseImages={project.caseImages}
                  onOpenModal={setVideoModal}
                  onOpenCaseStudy={(csId, videoSrc, extraVideos, caseImages) =>
                    setCaseModal({ caseData: getCaseById(csId), videoSrc, extraVideos, caseImages })
                  }
                />
              )
            }

            const siblings = getClientImages(project.client)

            return (
              <div
                key={project.id}
                className="project-thumbnail group cursor-pointer"
                onClick={() => handleImageClick(project)}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor: '#FBF9F2',
                  transition: 'all 240ms cubic-bezier(0.2, 0.7, 0.1, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '4px 4px 0 #151C1C'
                  e.currentTarget.style.transform = 'translate(-2px, -2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'translate(0, 0)'
                }}
              >
                <div style={{ aspectRatio: '16/10', overflow: 'hidden', backgroundColor: '#E8E5DC' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      objectPosition: project.objectPosition || 'center',
                      transition: 'transform 400ms cubic-bezier(0.2, 0.7, 0.1, 1)',
                    }}
                    onMouseEnter={(e) => (e.target.style.transform = 'scale(1.08)')}
                    onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                  />
                </div>

                <div style={{ padding: '20px' }}>
                  <h3 className="font-sans font-semibold text-[17px] mb-3" style={{ color: '#14140F', lineHeight: '1.3' }}>
                    {project.client}
                  </h3>
                  <span className="font-mono text-[11px] tracking-[0.12em] uppercase" style={{ color: '#6E6E64' }}>
                    {project.tech}
                  </span>
                  {getClientMedia(project.client).length > 1 && (
                    <div className="font-mono text-[10px] tracking-[0.1em] mt-2" style={{ color: '#A8A399' }}>
                      +{getClientMedia(project.client).length - 1} más
                    </div>
                  )}
                </div>

                {/* One-time hint on first image card */}
                {idx === firstImageIdx && hintVisible && (
                  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', background: 'rgba(21,28,28,0.88)', padding: '18px 28px', animation: 'rbt-hint-pulse 2s ease-in-out infinite' }}>
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <circle cx="14" cy="10" r="5" stroke="#F2EFE6" strokeWidth="1.5"/>
                        <path d="M14 17v6M10 20l4 4 4-4" stroke="#15C1C1" strokeWidth="1.5" strokeLinecap="square"/>
                      </svg>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#F2EFE6', whiteSpace: 'nowrap' }}>
                        Click · Scroll to explore
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Video modal */}
      <VideoModal item={videoModal} onClose={() => setVideoModal(null)} />

      {/* Case study modal */}
      <CaseStudyModal
        caseData={caseModal?.caseData}
        videoSrc={caseModal?.videoSrc}
        extraVideos={caseModal?.extraVideos}
        images={caseModal?.caseImages}
        onClose={() => setCaseModal(null)}
      />

      {/* Media carousel modal (images + videos) */}
      {selectedProject && (() => {
        const siblings = getClientMedia(selectedProject.client)
        const currentIdx = siblings.findIndex(p => p.id === selectedProject.id)
        return (
          <div
            className="p-4 md:p-8"
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => setSelectedProject(null)}
          >
            <div
              style={{ position: 'relative', width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', gap: '24px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                style={{ position: 'absolute', top: '-50px', right: 0, background: 'none', border: 'none', color: '#F2EFE6', fontSize: '32px', cursor: 'pointer', fontWeight: 'bold', zIndex: 1001 }}
              >✕</button>

              <div style={{ position: 'relative', backgroundColor: '#0D1414', border: '1px solid #151C1C', maxHeight: '70vh', overflow: 'auto', scrollBehavior: 'smooth', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {selectedProject.type === 'video' ? (
                  <video
                    key={selectedProject.id}
                    src={selectedProject.src}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', display: 'block' }}
                  />
                ) : (
                  <>
                    <div style={{ padding: '4rem', width: '100%', backgroundColor: '#FBF9F2' }}>
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
                      />
                    </div>
                    <div style={{ position: 'sticky', bottom: 0, height: '48px', background: 'linear-gradient(to top, rgba(251,249,242,0.95), transparent)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '6px', pointerEvents: 'none', marginTop: '-48px', alignSelf: 'stretch' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6E6E64', animation: 'rbt-hint-pulse 2s ease-in-out infinite' }}>↕ scroll</span>
                    </div>
                  </>
                )}

                {siblings.length > 1 && (
                  <>
                    <button onClick={() => handleCarouselNav(-1)} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(21,28,28,0.8)', color: '#F2EFE6', border: 'none', width: '48px', height: '48px', cursor: 'pointer', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 240ms' }} onMouseEnter={(e) => (e.target.style.background = 'rgba(21,28,28,1)')} onMouseLeave={(e) => (e.target.style.background = 'rgba(21,28,28,0.8)')}>←</button>
                    <button onClick={() => handleCarouselNav(1)}  style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(21,28,28,0.8)', color: '#F2EFE6', border: 'none', width: '48px', height: '48px', cursor: 'pointer', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 240ms' }} onMouseEnter={(e) => (e.target.style.background = 'rgba(21,28,28,1)')} onMouseLeave={(e) => (e.target.style.background = 'rgba(21,28,28,0.8)')}>→</button>
                  </>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '32px' }}>
                <div>
                  <h2 className="font-sans text-4xl font-semibold mb-2" style={{ color: '#F2EFE6' }}>{selectedProject.title}</h2>
                  <span className="font-mono text-[12px] tracking-[0.1em] uppercase" style={{ color: '#15C1C1' }}>{selectedProject.tech}</span>
                </div>
                {siblings.length > 1 && (
                  <div className="font-mono text-[14px] tracking-[0.1em]" style={{ color: '#6E6E64' }}>
                    {currentIdx + 1} / {siblings.length}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })()}
    </section>
  )
}
