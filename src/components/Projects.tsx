import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projectsData } from '../data'
import type { Project } from '../data'
import { useThemeColor, hexToRgba } from '../theme/useThemeColor'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Theme-coloured glow used in the hover shadow; falls back to the cyan value
  // from theme.ts before the CSS variable is available on the first paint.
  const primary = useThemeColor('primary')
  const glow = (alpha: number) =>
    hexToRgba(primary ?? '#00d4ff', alpha) || `rgba(0, 212, 255, ${alpha})`

  const categories = ['all', ...Array.from(new Set(projectsData.map(p => p.category)))]

  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter)

  return (
    <section
      id="projects"
      className="py-24 md:py-32 px-6 bg-dark scroll-mt-20"
      aria-labelledby="projects-title"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span
            variants={cardVariants}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20"
          >
            Featured Work
          </motion.span>
          <motion.h2
            id="projects-title"
            variants={cardVariants}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="text-white">Projects & </span>
            <br />
            <span className="text-primary">Case Studies</span>
          </motion.h2>
          <motion.p
            variants={cardVariants}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            A selection of projects showcasing my expertise across data engineering, ML, and full-stack development.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2 }}
          role="group"
          aria-label="Filter projects by category"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark ${
                filter === cat
                  ? 'bg-primary text-dark shadow-lg shadow-primary/25'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700'
              }`}
              whileHover={{ scale: filter === cat ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-pressed={filter === cat}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Projects">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05 }}
              className={`relative group p-6 rounded-2xl bg-darker border border-gray-700/50 hover:border-primary/30 transition-all ${
                project.featured ? 'ring-1 ring-primary/20' : ''
              }`}
              whileHover={{ y: -8, boxShadow: `0 25px 50px -20px ${glow(0.15)}` }}
              role="listitem"
            >
              {project.featured && (
                <motion.span
                  className="absolute -top-3 left-4 px-3 py-1 text-xs font-bold text-dark bg-primary rounded-full"
                  initial={{ scale: 0, rotate: -90 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  Featured
                </motion.span>
              )}

              <div className="relative aspect-video mb-4 rounded-xl overflow-hidden bg-gray-800/50">
                <div className="absolute inset-0 flex items-center justify-center text-6xl">
                  {project.image}
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <motion.div
                  className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex gap-2 justify-center"
                >
                  {project.links.github && (
                    <motion.a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-dark/90 backdrop-blur text-primary hover:bg-primary hover:text-dark transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </motion.a>
                  )}
                  {project.links.demo && (
                    <motion.a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-dark/90 backdrop-blur text-primary hover:bg-primary hover:text-dark transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`View ${project.title} demo`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </motion.a>
                  )}
                </motion.div>
              </div>

              <motion.div
                className="space-y-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2">
                  <motion.span
                    className="px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full"
                    whileInView={{ scale: [0, 1] }}
                    viewport={{ once: true }}
                  >
                    {project.category}
                  </motion.span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <motion.span
                      key={tech}
                      className="px-2 py-0.5 text-xs text-gray-300 bg-gray-800 rounded border border-gray-700"
                      whileHover={{ borderColor: 'primary', color: 'primary' }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {project.technologies.length > 5 && (
                    <motion.span
                      className="px-2 py-0.5 text-xs text-gray-500 bg-gray-800 rounded border border-gray-700"
                    >
                      +{project.technologies.length - 5}
                    </motion.span>
                  )}
                </div>
              </motion.div>
            </motion.article>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-500">No projects found in this category.</p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-darker rounded-2xl border border-gray-700 p-6"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                aria-label="Close project details"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-8xl mb-4">{selectedProject.image}</div>
                  <h2 id="modal-title" className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                  <motion.span
                    className="px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    {selectedProject.category}
                  </motion.span>
                </div>

                <p className="text-gray-300 leading-relaxed text-lg">{selectedProject.longDescription}</p>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Key Highlights</h3>
                  <ul className="space-y-2">
                    {selectedProject.highlights.map((highlight, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3 text-gray-300"
                      >
                        <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {highlight}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 text-sm font-medium text-gray-200 bg-gray-800 rounded-full border border-gray-700"
                        whileHover={{ borderColor: 'primary', color: 'primary' }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-700">
                  {selectedProject.links.github && (
                    <motion.a
                      href={selectedProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl bg-primary text-dark font-semibold hover:bg-primary/90 transition-all flex items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                      </svg>
                      View Code
                    </motion.a>
                  )}
                  {selectedProject.links.demo && (
                    <motion.a
                      href={selectedProject.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl bg-transparent border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-all flex items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
