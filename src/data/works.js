// Trabajos de cliente — todo lo que NO tiene caso de estudio propio.
// Los proyectos con caso de estudio viven en `caseStudies.js` y se muestran en la grid.
// `featured: true` marca la pieza que hace de portada del grupo en el carrusel.
export const WORKS = [
  // ── Instituciones ─────────────────────────────────────────────────────────
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

  { id: 8,    type: 'image', featured: true,  client: 'Obra Social SJD',      tech: 'WordPress',           title: 'Obra Social San Juan',     image: 'assets/proyectos/webs/screencapture-obrasocialsanjuandedios-es-2024-03-29-19_18_34.png',         objectPosition: 'center' },

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

  // ── Marcas y comercio ─────────────────────────────────────────────────────
  { id: 6,    type: 'image', featured: true,  client: 'Veritas',              tech: 'E-commerce · Custom · Maps', title: 'Veritas',            image: 'assets/proyectos/webs/screencapture-veritas-es-tienda-veritas-san-juan-2-2024-03-29-19_09_06.png', objectPosition: 'center' },
  { id: 7,    type: 'image', featured: false, client: 'Veritas',              tech: 'Custom',              title: 'Veritas Mapa',             image: 'assets/proyectos/webs/screencapture-veritas-es-mapa-2024-03-29-19_08_28.png',                      objectPosition: 'center' },
  { id: 'v2', type: 'video', featured: false, client: 'Veritas',              tech: 'Custom · Maps',       title: 'Veritas Mapa Demo',        src: 'assets/proyectos/captures/veritas-mapa.mp4' },

  { id: 4,    type: 'image', featured: true,  client: 'E.Casals',             tech: 'WordPress',           title: 'E.Casals Home',            image: 'assets/proyectos/webs/screencapture-ecasals-net-es-index-php-2024-03-29-19_06_20.png',            objectPosition: 'center' },
  { id: 5,    type: 'image', featured: false, client: 'E.Casals',             tech: 'WordPress',           title: 'E.Casals Servicios',       image: 'assets/proyectos/webs/screencapture-ecasals-net-es-index-php-2024-03-29-19_06_43.png',            objectPosition: 'center' },

  { id: 29,   type: 'image', featured: true,  client: 'Carrete',              tech: 'Drupal · Custom theme & plugins', title: 'Carrete Web',    image: 'assets/proyectos/webs/carrete1.png',                                                            objectPosition: 'center' },
  { id: 33,   type: 'image', featured: false, client: 'Carrete',              tech: 'Drupal · Custom theme & plugins', title: 'Carrete',        image: 'assets/proyectos/webs/carrete2.png',                                                            objectPosition: 'center' },
  { id: 38,   type: 'image', featured: false, client: 'Carrete',              tech: 'Drupal · Custom theme & plugins', title: 'Carrete',        image: 'assets/proyectos/webs/carrete5.png',                                                            objectPosition: 'center' },

  { id: 24,   type: 'image', featured: true,  client: 'Elche.me',             tech: 'Drupal · Custom theme & plugins', title: 'Elche.me',       image: 'assets/proyectos/webs/screencapture-elche-me-2023-03-03-10_58_41.png',                           objectPosition: 'center' },
  { id: 25,   type: 'image', featured: false, client: 'Elche.me',             tech: 'Drupal · Custom theme & plugins', title: 'Elche.me',       image: 'assets/proyectos/webs/screencapture-elche-me-web-index-php-publicaciones-2023-03-03-10_59_03.png', objectPosition: 'center' },

  { id: 10,   type: 'image', featured: true,  client: 'Cultura Sitges',       tech: 'WordPress',           title: 'Cultura Sitges',           image: 'assets/proyectos/webs/screencapture-culturasitges-cat-2023-03-03-11_08_23.png',                  objectPosition: 'center' },
  { id: 11,   type: 'image', featured: false, client: 'Cultura Sitges',       tech: 'WordPress',           title: 'Cultura Sitges Agenda',    image: 'assets/proyectos/webs/screencapture-culturasitges-cat-actualitat-agenda-2023-03-03-11_08_48.png', objectPosition: 'center' },

  // ── Portfolio / creative ──────────────────────────────────────────────────
  { id: 'v6', type: 'video', featured: true,  client: 'Marc Gomez del Moral', tech: 'Portfolio',           title: 'Marc Gomez del Moral',     src: 'assets/proyectos/captures/Marcgomezdelmoral.mp4' },

  // ── Piezas sueltas ────────────────────────────────────────────────────────
  { id: 9,    type: 'image', featured: true,  client: 'AI Research COVID',    tech: 'React',               title: 'AI Research COVID',        image: 'assets/proyectos/webs/screencapture-airesearch-sesgos-covid19-2022-11-14-18_36_00.png',          objectPosition: 'center' },
  { id: 12,   type: 'image', featured: true,  client: 'Ecowave',              tech: 'Custom',              title: 'Ecowave',                  image: 'assets/proyectos/webs/screencapture-estilmar-ecowave-2023-06-16-15_09_10.png',                   objectPosition: 'center' },
  { id: 16,   type: 'image', featured: true,  client: 'Terpenic',             tech: 'E-commerce',          title: 'Terpenic Catálogo',        image: 'assets/proyectos/webs/screencapture-terpenic-ricardbt-catalogo-2023-03-03-09_50_02.png',         objectPosition: 'center' },
  { id: 22,   type: 'image', featured: true,  client: 'Entangle',             tech: 'Webflow',             title: 'Entangle',                 image: 'assets/proyectos/webs/screencapture-entangle-website-webflow-io-2022-11-21-19_29_56.png',        objectPosition: 'center' },
  { id: 23,   type: 'image', featured: true,  client: 'El Risell',            tech: 'WordPress',           title: 'El Risell',                image: 'assets/proyectos/webs/screencapture-elrisell-cat-2022-11-14-18_38_27.png',                       objectPosition: 'center' },
  { id: 26,   type: 'image', featured: true,  client: 'Coralimentación',      tech: 'Custom',              title: 'Coralimentación',          image: 'assets/proyectos/webs/screencapture-coralimentacion-2023-03-03-11_05_24.png',                    objectPosition: 'center' },
  { id: 27,   type: 'image', featured: true,  client: 'Hyphen',               tech: 'Custom',              title: 'Hyphen Culture',           image: 'assets/proyectos/webs/screencapture-hyphen-be-en-our-culture-2022-11-14-18_35_10.png',           objectPosition: 'center' },
  { id: 28,   type: 'image', featured: true,  client: 'Gallantium',           tech: 'Custom',              title: 'Gallantium Pricing',       image: 'assets/proyectos/webs/screencapture-gallantium-pricing-2022-11-14-18_57_41.png',                 objectPosition: 'center' },
]

// Un grupo = un cliente. La portada del grupo es su pieza `featured` (o la primera).
export const WORK_GROUPS = WORKS.reduce((groups, item) => {
  let group = groups.find(g => g.client === item.client)
  if (!group) {
    group = { client: item.client, items: [] }
    groups.push(group)
  }
  group.items.push(item)
  return groups
}, []).map(group => ({
  ...group,
  cover: group.items.find(i => i.featured) ?? group.items[0],
}))
