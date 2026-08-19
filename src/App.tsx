import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'

function App() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <footer className="py-10 border-t border-border">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-content-muted">
            Built with React, TypeScript, Tailwind CSS & Framer Motion
          </p>
          <p className="text-sm text-content-muted">
            © {new Date().getFullYear()} Vikas Movva. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}

export default App