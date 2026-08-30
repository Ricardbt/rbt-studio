import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Statement from './components/Statement'
import Services from './components/Services'
import Generativos from './components/Generativos'
import CaseStudiesGrid from './components/CaseStudiesGrid'
import WorkCarousel from './components/WorkCarousel'
import Artistic from './components/Artistic'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      {/* Primera parada del tabulador. En una sola página con scroll, sin
          esto hay que atravesar los seis enlaces de la barra en cada carga
          para llegar al contenido. Sólo se ve al enfocarlo. */}
      <a href="#contenido" className="skip-link t-label">Saltar al contenido</a>

      <Navbar />
      <main id="contenido">
        <Hero />
        <Statement />
        <Services />
        <CaseStudiesGrid />
        <WorkCarousel />
        <Artistic />
        <Generativos />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}