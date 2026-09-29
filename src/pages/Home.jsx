import About from '../components/About.jsx'
import Contact from '../components/Contact.jsx'
import Footer from '../components/Footer.jsx'
import Hero from '../components/Hero.jsx'
import Projects from '../components/Projects.jsx'
import Skills from '../components/Skills.jsx'

function Home() {
  return (
    <>
      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default Home
