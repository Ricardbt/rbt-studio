import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Statement from './components/Statement'
import Services from './components/Services'
import Generativos from './components/Generativos'
import ProjectGallery from './components/ProjectGallery'
import Artistic from './components/Artistic'
import About from './components/About'
import CV from './components/CV'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Statement />
        <Services />
        <ProjectGallery />
        <Artistic />
        <Generativos />
        <About />
        <CV />
        <Contact />
      </main>
      <Footer />
    </>
  )
}