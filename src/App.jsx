import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Services from './components/Services'
import Generativos from './components/Generativos'
import ProjectGallery from './components/ProjectGallery'
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
        <Marquee />
        <Services />
        <ProjectGallery />
        <Artistic />
        <Generativos />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}