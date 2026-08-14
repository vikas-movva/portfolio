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
      <footer className="py-8 px-6 bg-surface-alt border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-content-muted text-sm">
            Built with React, TypeScript, Tailwind CSS & Framer Motion
          </p>
          <p className="text-content-muted text-sm mt-1">
            © {new Date().getFullYear()} Vikas Movva. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}

export default App