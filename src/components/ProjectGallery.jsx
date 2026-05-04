import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS_DATA = [
  { id: 1, title: 'Juan Soler Design', tech: 'HTML/CSS', client: 'Juan Soler', image: '/src/assets/proyectos/webs/juansolerdesignbookPagina-Home.png', featured: true, objectPosition: 'center' },
  { id: 2, title: 'Ratio Associació', tech: 'Drupal', client: 'Ratio', image: '/src/assets/proyectos/webs/screencapture-ratioassociacio-ca-2023-09-21-15_22_00.png', featured: true, objectPosition: 'center' },
  { id: 3, title: 'Ratio - Soporte', tech: 'Drupal', client: 'Ratio', image: '/src/assets/proyectos/webs/screencapture-ratioassociacio-ca-suport-2023-09-21-15_22_41 (1).png', featured: false, objectPosition: 'center' },
  { id: 4, title: 'E.Casals Home', tech: 'WordPress', client: 'E.Casals', image: '/src/assets/proyectos/webs/screencapture-ecasals-net-es-index-php-2024-03-29-19_06_20.png', featured: true, objectPosition: 'center' },
  { id: 5, title: 'E.Casals Servicios', tech: 'WordPress', client: 'E.Casals', image: '/src/assets/proyectos/webs/screencapture-ecasals-net-es-index-php-2024-03-29-19_06_43.png', featured: false, objectPosition: 'center' },
  { id: 6, title: 'Veritas Tienda', tech: 'E-commerce', client: 'Veritas', image: '/src/assets/proyectos/webs/screencapture-veritas-es-tienda-veritas-san-juan-2-2024-03-29-19_09_06.png', featured: true, objectPosition: 'center' },
  { id: 7, title: 'Veritas Mapa', tech: 'Custom', client: 'Veritas', image: '/src/assets/proyectos/webs/screencapture-veritas-es-mapa-2024-03-29-19_08_28.png', featured: false, objectPosition: 'center' },
  { id: 8, title: 'Obra Social San Juan', tech: 'WordPress', client: 'Obra Social', image: '/src/assets/proyectos/webs/screencapture-obrasocialsanjuandedios-es-2024-03-29-19_18_34.png', featured: true, objectPosition: 'center' },
  { id: 9, title: 'AI Research COVID', tech: 'React', client: 'AI Research', image: '/src/assets/proyectos/webs/screencapture-airesearch-sesgos-covid19-2022-11-14-18_36_00.png', featured: true, objectPosition: 'center' },
  { id: 10, title: 'Cultura Sitges', tech: 'WordPress', client: 'Cultura Sitges', image: '/src/assets/proyectos/webs/screencapture-culturasitges-cat-2023-03-03-11_08_23.png', featured: true, objectPosition: 'center' },
  { id: 11, title: 'Cultura Sitges Agenda', tech: 'WordPress', client: 'Cultura Sitges', image: '/src/assets/proyectos/webs/screencapture-culturasitges-cat-actualitat-agenda-2023-03-03-11_08_48.png', featured: false, objectPosition: 'center' },
  { id: 12, title: 'Ecowave', tech: 'Custom', client: 'Ecowave', image: '/src/assets/proyectos/webs/screencapture-estilmar-ecowave-2023-06-16-15_09_10.png', featured: true, objectPosition: 'center' },
  { id: 13, title: 'Avantatges iPad', tech: 'Mobile', client: 'Avantatges', image: '/src/assets/proyectos/webs/avantatges_ipad.PNG', featured: true, objectPosition: 'center' },
  { id: 14, title: 'Intranet Displays', tech: 'Custom', client: 'Intranet', image: '/src/assets/proyectos/webs/intranet_displays.jpg', featured: true, objectPosition: 'center' },
  { id: 15, title: 'UB Formulari', tech: 'Custom', client: 'UB', image: '/src/assets/proyectos/webs/screencapture-ub-edu-formulariscompres-2023-06-23-11_34_35.png', featured: true, objectPosition: 'center' },
  { id: 16, title: 'Terpenic Catálogo', tech: 'E-commerce', client: 'Terpenic', image: '/src/assets/proyectos/webs/screencapture-terpenic-ricardbt-catalogo-2023-03-03-09_50_02.png', featured: true, objectPosition: 'center' },
  { id: 17, title: 'Avantatges Displays', tech: 'Custom', client: 'Avantatges', image: '/src/assets/proyectos/webs/avantatges_displays.jpg', featured: false, objectPosition: 'center' },
  { id: 18, title: 'UCSF BALANCE', tech: 'React', client: 'UCSF', image: '/src/assets/proyectos/webs/screencapture-balance-ucsf-edu-2023-03-03-11_06_33.png', featured: true, objectPosition: 'center' },
  { id: 19, title: 'ChowLab UCSF', tech: 'React', client: 'UCSF', image: '/src/assets/proyectos/webs/screencapture-chowlab-ucsf-edu-our-research-2023-06-23-11_32_38.png', featured: false, objectPosition: 'center' },
  { id: 20, title: 'Pasquino Blog', tech: 'Custom', client: 'Pasquino', image: '/src/assets/proyectos/webs/screencapture-staging-creativegeeks-be-pasquino-blog-2023-06-16-15_12_45.png', featured: false, objectPosition: 'center' },
  { id: 21, title: 'Pasquino', tech: 'Custom', client: 'Pasquino', image: '/src/assets/proyectos/webs/screencapture-staging-creativegeeks-be-pasquino-2023-06-16-15_11_56.png', featured: true, objectPosition: 'center' },
  { id: 22, title: 'Entangle', tech: 'Webflow', client: 'Entangle', image: '/src/assets/proyectos/webs/screencapture-entangle-website-webflow-io-2022-11-21-19_29_56.png', featured: true, objectPosition: 'center' },
  { id: 23, title: 'El Risell', tech: 'WordPress', client: 'El Risell', image: '/src/assets/proyectos/webs/screencapture-elrisell-cat-2022-11-14-18_38_27.png', featured: true, objectPosition: 'center' },
  { id: 24, title: 'Elche.me', tech: 'WordPress', client: 'Elche.me', image: '/src/assets/proyectos/webs/screencapture-elche-me-2023-03-03-10_58_41.png', featured: true, objectPosition: 'center' },
  { id: 25, title: 'Elche.me Publicaciones', tech: 'WordPress', client: 'Elche.me', image: '/src/assets/proyectos/webs/screencapture-elche-me-web-index-php-publicaciones-2023-03-03-10_59_03.png', featured: false, objectPosition: 'center' },
  { id: 26, title: 'CoralimentaciÃ³n', tech: 'Custom', client: 'Coralimentación', image: '/src/assets/proyectos/webs/screencapture-coralimentacion-2023-03-03-11_05_24.png', featured: true, objectPosition: 'center' },
  { id: 27, title: 'Hyphen Culture', tech: 'Custom', client: 'Hyphen', image: '/src/assets/proyectos/webs/screencapture-hyphen-be-en-our-culture-2022-11-14-18_35_10.png', featured: true, objectPosition: 'center' },
  { id: 28, title: 'Gallantium Pricing', tech: 'Custom', client: 'Gallantium', image: '/src/assets/proyectos/webs/screencapture-gallantium-pricing-2022-11-14-18_57_41.png', featured: true, objectPosition: 'center' },
  { id: 29, title: 'Carrete Web', tech: 'Custom', client: 'Carrete Web', image: '/src/assets/proyectos/webs/carreteweb_mockup.jpg', featured: true, objectPosition: 'center' },
  { id: 30, title: 'Charm EU', tech: 'Custom', client: 'Charm EU', image: '/src/assets/proyectos/webs/charm-eu.png', featured: true, objectPosition: 'center' },
  { id: 31, title: 'Laptop Optima', tech: 'Custom', client: 'Laptop Optima', image: '/src/assets/proyectos/webs/laptop_optima.jpg', featured: true, objectPosition: 'center' },
]

export default function ProjectGallery() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const galleryRef = useRef(null)

  const getClientProjects = (clientName) => {
    return PROJECTS_DATA.filter(p => p.client === clientName)
  }

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    setCarouselIndex(PROJECTS_DATA.indexOf(project))
  }

  const handleCarouselNav = (direction) => {
    if (!selectedProject) return
    const clientProjects = getClientProjects(selectedProject.client)
    const currentIndex = clientProjects.findIndex(p => p.id === selectedProject.id)
    let newIndex = currentIndex + direction

    if (newIndex < 0) newIndex = clientProjects.length - 1
    if (newIndex >= clientProjects.length) newIndex = 0

    setSelectedProject(clientProjects[newIndex])
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo('.project-thumbnail',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ backgroundColor: '#F2EFE6', paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="relative z-10" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 32px' }}>
        <div ref={titleRef} style={{ marginBottom: '96px', opacity: 0 }}>
          <p className="font-mono text-[12px] tracking-[0.18em] uppercase mb-6" style={{ color: '#0E4A35' }}>
            05 / 05 · Galería Visual
          </p>
          <h2 className="font-sans text-5xl lg:text-6xl font-semibold leading-[0.95] tracking-tight" style={{ color: '#14140F' }}>
            Proyectos
            <br />
            <em className="not-italic" style={{ color: '#0E4A35' }}>web realizados</em>
          </h2>
        </div>

        {/* Gallery Grid - Featured Projects Only */}
        <div
          ref={galleryRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
          }}
        >
          {PROJECTS_DATA.filter(p => p.featured).map((project) => (
            <div
              key={project.id}
              className="project-thumbnail group cursor-pointer"
              onClick={() => handleProjectClick(project)}
              style={{
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid #C9C5B6',
                backgroundColor: '#FBF9F2',
                transition: 'all 240ms cubic-bezier(0.2, 0.7, 0.1, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0E4A35'
                e.currentTarget.style.boxShadow = '4px 4px 0 #0E4A35'
                e.currentTarget.style.transform = 'translate(-2px, -2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#C9C5B6'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translate(0, 0)'
              }}
            >
              <div style={{
                aspectRatio: '16/10',
                overflow: 'hidden',
                backgroundColor: '#E8E5DC'
              }}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
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
                {getClientProjects(project.client).length > 1 && (
                  <div className="font-mono text-[10px] tracking-[0.1em] mt-2" style={{ color: '#A8A399' }}>
                    +{getClientProjects(project.client).length - 1} más
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Modal */}
      {selectedProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1200px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'absolute',
                top: '-50px',
                right: '0',
                background: 'none',
                border: 'none',
                color: '#F2EFE6',
                fontSize: '32px',
                cursor: 'pointer',
                fontWeight: 'bold',
                zIndex: 1001,
              }}
            >
              ✕
            </button>

            {/* Image Container */}
            <div
              style={{
                position: 'relative',
                backgroundColor: '#FBF9F2',
                border: '1px solid #0E4A35',
                overflow: 'hidden',
              }}
            >
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  maxHeight: '70vh',
                  objectFit: 'contain',
                }}
              />

              {/* Navigation Arrows */}
              {getClientProjects(selectedProject.client).length > 1 && (
                <>
                  <button
                    onClick={() => handleCarouselNav(-1)}
                    style={{
                      position: 'absolute',
                      left: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(14, 74, 53, 0.8)',
                      color: '#F2EFE6',
                      border: 'none',
                      width: '48px',
                      height: '48px',
                      borderRadius: '0',
                      cursor: 'pointer',
                      fontSize: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 240ms',
                    }}
                    onMouseEnter={(e) => (e.target.style.background = 'rgba(14, 74, 53, 1)')}
                    onMouseLeave={(e) => (e.target.style.background = 'rgba(14, 74, 53, 0.8)')}
                  >
                    ←
                  </button>
                  <button
                    onClick={() => handleCarouselNav(1)}
                    style={{
                      position: 'absolute',
                      right: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(14, 74, 53, 0.8)',
                      color: '#F2EFE6',
                      border: 'none',
                      width: '48px',
                      height: '48px',
                      borderRadius: '0',
                      cursor: 'pointer',
                      fontSize: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 240ms',
                    }}
                    onMouseEnter={(e) => (e.target.style.background = 'rgba(14, 74, 53, 1)')}
                    onMouseLeave={(e) => (e.target.style.background = 'rgba(14, 74, 53, 0.8)')}
                  >
                    →
                  </button>
                </>
              )}
            </div>

            {/* Project Info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '32px' }}>
              <div>
                <h2 className="font-sans text-4xl font-semibold mb-2" style={{ color: '#F2EFE6' }}>
                  {selectedProject.title}
                </h2>
                <span className="font-mono text-[12px] tracking-[0.1em] uppercase" style={{ color: '#0E4A35' }}>
                  {selectedProject.tech}
                </span>
              </div>

              {/* Counter */}
              {getClientProjects(selectedProject.client).length > 1 && (
                <div className="font-mono text-[14px] tracking-[0.1em]" style={{ color: '#6E6E64' }}>
                  {getClientProjects(selectedProject.client).findIndex(p => p.id === selectedProject.id) + 1} / {getClientProjects(selectedProject.client).length}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
