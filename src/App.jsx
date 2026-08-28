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
      <Navbar />
      <main>
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