import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projectsData } from '../data'
import SectionHeading from './SectionHeading'
import type { Project } from '../data'
import { useThemeColor, hexToRgba } from '../theme/useThemeColor'

// Resolve the accent to a real colour string so Framer Motion can interpolate
// border/colour animations (it cannot animate to the literal token "primary").
const ACCENT_FALLBACK = 'rgb(0 212 255)'

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

function ProjectCard({
  project,
  index,
  glow,
  onOpen,
}: {
  project: Project
  index: number
  glow: (_alpha: number) => string
  onOpen: (_project: Project) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const [showAllTech, setShowAllTech] = useState(false)
  const descRef = useRef<HTMLParagraphElement>(null)
  // Show the toggle only when the description is actually clipped by the
  // line-clamp. Re-measure after layout and whenever the viewport resizes.
  useLayoutEffect(() => {
    const el = descRef.current
    if (!el) return
    const measure = () => setIsTruncated(el.scrollHeight - el.clientHeight > 1)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [project.description])

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.05 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-card/40 backdrop-blur-xl backdrop-saturate-150 transition-all hover:border-accent/40 ${
        project.featured ? 'ring-1 ring-accent/20' : ''
      }`}
      whileHover={{ y: -8, boxShadow: `0 25px 50px -20px ${glow(0.18)}` }}
    >
      {/* Featured ribbon — pinned to the card corner so it never overlaps the
          centered project image. */}
      {project.featured && (
        <span className="absolute left-4 top-4 z-20 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-on-accent shadow-lg shadow-accent/30">
          Featured
        </span>
      )}
      {/* Bento grid: visual tile anchors the left, meta + title fill the right,
          then full-width content rows (description, tech, action) below.
          Two-column on all sizes (smaller tile on phones) so mobile matches
          the desktop card layout. */}
      <div className="relative z-10 grid grid-cols-[5.5rem_1fr] gap-3 p-3 sm:grid-cols-[8.5rem_1fr]">
        {/* Visual tile — spans both right-hand rows on sm+; stacks on top of mobile */}
        <div className="relative row-span-2 flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-accent/10 via-field/40 to-field/60 sm:aspect-auto sm:self-stretch">
          <div className="flex h-full w-full items-center justify-center text-4xl transition-transform duration-500 group-hover:scale-110 sm:text-7xl">
            {project.image}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute inset-x-3 bottom-3 flex translate-y-4 justify-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-surface-alt/90 p-3 text-accent backdrop-blur transition-all hover:scale-110 hover:bg-accent hover:text-on-accent active:scale-95"
                aria-label={`View ${project.title} on GitHub`}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-surface-alt/90 p-3 text-accent backdrop-blur transition-all hover:scale-110 hover:bg-accent hover:text-on-accent active:scale-95"
                aria-label={`View ${project.title} demo`}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Meta tile — category chip (index numbers removed) */}
        <div className="flex items-center justify-end">
          <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
            {project.category}
          </span>
        </div>

        {/* Title tile */}
        <div className="flex items-start">
          <h3 className="text-lg font-bold leading-tight text-content transition-colors group-hover:text-accent sm:text-xl">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Full-width content rows */}
      <div className="relative z-10 flex flex-1 flex-col px-4 pb-4">
        <p
          ref={descRef}
          className={`text-sm leading-relaxed text-content-muted ${
            expanded ? '' : 'line-clamp-3'
          }`}
        >
          {project.description}
        </p>

        {(isTruncated || expanded) && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setExpanded((v) => !v)
            }}
            className="mt-2 self-start rounded text-sm font-medium text-accent transition-colors hover:text-content focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-alt"
            aria-expanded={expanded}
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}

        <div className="mt-3 flex flex-wrap gap-1.5">
          {(showAllTech ? project.technologies : project.technologies.slice(0, 5)).map(
            (tech) => (
              <motion.span
                key={tech}
                className="cursor-default rounded border border-border bg-field px-2 py-0.5 text-xs text-content-soft transition-colors hover:border-accent/60 hover:text-accent"
              >
                {tech}
              </motion.span>
            )
          )}
          {project.technologies.length > 5 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setShowAllTech((v) => !v)
              }}
              className="rounded border border-border bg-field px-2 py-0.5 text-xs font-medium text-accent transition-colors hover:border-accent/50 hover:bg-field-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-alt"
              aria-expanded={showAllTech}
              aria-label={
                showAllTech
                  ? `Show fewer technologies for ${project.title}`
                  : `Show all ${project.technologies.length} technologies for ${project.title}`
              }
            >
              {showAllTech
                ? 'Show less'
                : `+${project.technologies.length - 5} more`}
            </button>
          )}
        </div>

        <div className="flex-1" />

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onOpen(project)
          }}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-accent/10 px-4 py-2.5 text-sm font-semibold text-accent transition-all hover:bg-accent hover:text-on-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface"
        >
          View Details
          <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const primary = useThemeColor('accent') ?? ACCENT_FALLBACK
  const glow = (alpha: number) =>
    hexToRgba(primary, alpha) || `rgba(0, 212, 255, ${alpha})`

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [selectedProject])

  const categories = ['all', ...Array.from(new Set(projectsData.map(p => p.category)))]

  const filteredProjects = filter === 'all'
    ? projectsData
    : projectsData.filter(p => p.category === filter)

  // Close the modal on Escape for keyboard users.
  useEffect(() => {
    if (!selectedProject) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedProject])

  return (
    <section
      id="projects"
      className="relative overflow-hidden py-24 md:py-32 px-6 bg-surface scroll-mt-20"
      aria-labelledby="projects-title"
    >
      {/* One soft accent glow that slowly wanders the whole section, behind all cards. */}
      <div className="section-aurora" aria-hidden="true" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeading
          id="projects-title"
          eyebrow="Featured Work"
          title={
            <>
              Projects & <span className="text-accent">Case Studies</span>
            </>
          }
          subtitle="A selection of projects showcasing my expertise across data engineering, ML, and full-stack development."
        />

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
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface ${
                filter === cat
                  ? 'bg-accent text-on-accent shadow-lg shadow-accent/25'
                  : 'bg-field text-content-soft hover:bg-field-hover hover:text-content border border-border'
              }`}
              whileHover={{ scale: filter === cat ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-pressed={filter === cat}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2" role="list" aria-label="Projects">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              glow={glow}
              onOpen={setSelectedProject}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-content-faint">No projects found in this category.</p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/50 bg-card/75 backdrop-blur-2xl backdrop-saturate-150 p-6"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-field text-content-muted hover:text-content hover:bg-field-hover transition-colors"
                aria-label="Close project details"
                autoFocus
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-8xl mb-4">{selectedProject.image}</div>
                  <h2 id="modal-title" className="text-3xl font-bold text-content mb-2">{selectedProject.title}</h2>
                  <motion.span
                    className="px-3 py-1 text-sm font-medium text-accent bg-accent/10 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    {selectedProject.title}
                  </motion.span>
                </div>

                <p className="text-content-soft leading-relaxed text-lg">{selectedProject.longDescription}</p>

                <div>
                  <h3 className="text-lg font-semibold text-content mb-3">Key Highlights</h3>
                  <ul className="space-y-2">
                    {selectedProject.highlights.map((highlight, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3 text-content-soft"
                      >
                        <svg className="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {highlight}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-content mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <motion.span
                        key={tech}
                        className="cursor-default px-3 py-1 text-sm font-medium text-content-soft bg-field rounded-full border border-border transition-colors hover:border-accent/60 hover:text-accent"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                  <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                  {selectedProject.links.github && (
                    <motion.a
                      href={selectedProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-accent text-on-accent font-semibold hover:bg-accent-hover transition-all flex items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                      View Code
                    </motion.a>
                  )}
                  {selectedProject.links.demo && (
                    <motion.a
                      href={selectedProject.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl bg-transparent border-2 border-accent text-accent font-semibold hover:bg-accent/10 transition-all flex items-center gap-2"
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
