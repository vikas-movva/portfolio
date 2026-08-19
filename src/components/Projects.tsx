import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { projectsData } from '../data'
import SectionHeading from './SectionHeading'
import FeaturedProjectCard from './projects/FeaturedProjectCard'
import ProjectRow from './projects/ProjectRow'
import ProjectModal from './projects/ProjectModal'
import type { Project } from '../data'


/**
 * Projects section.
 *
 * Asymmetric editorial layout: one large featured block at the top, then the
 * rest as a vertical typographic list. No grid, no cards, no density. The
 * featured slot is the first project in the active filter, so the composition
 * stays coherent when filtered.
 *
 * The case-study modal is its own component so it stays free of section
 * chrome (no backdrop-blur, no glass) and can be reused elsewhere if needed.
 */
export default function Projects() {
  const [filter, setFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const categories = ['all', ...Array.from(new Set(projectsData.map((p) => p.category)))]

  const filteredProjects =
    filter === 'all' ? projectsData : projectsData.filter((p) => p.category === filter)

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
      className="relative py-24 md:py-32 bg-surface scroll-mt-20"
      aria-labelledby="projects-title"
    >
      <div className="container">
        {/* Massive outlined section number — the recurring solid + outlined
            motif, layered behind the solid title so the two read as one
            layered statement rather than a decorative flourish. */}
        <div className="relative">
          <span
            aria-hidden="true"
            className="display outline pointer-events-none absolute -left-2 -top-10 text-content opacity-[0.06] sm:-left-6 sm:-top-14"
          >
            03
          </span>
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
        </div>

        <motion.div
          className="flex flex-wrap items-end gap-x-8 gap-y-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.2 }}
          role="group"
          aria-label="Filter projects by category"
        >
          <span className="eyebrow text-content-faint tracking-widest pb-2">
            Filter &middot; {filteredProjects.length}{' '}
            {filteredProjects.length === 1 ? 'project' : 'projects'}
          </span>

          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                aria-pressed={filter === cat}
                className={`group relative inline-flex items-center gap-1.5 pb-1 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
                  filter === cat
                    ? 'text-content'
                    : 'text-content-muted hover:text-content'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                <svg
                  className={`w-3.5 h-3.5 transition-all duration-200 ease-out ${
                    filter === cat
                      ? 'text-accent'
                      : 'text-content-faint group-hover:text-accent group-hover:translate-x-0.5'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span className="absolute left-0 bottom-0 h-px w-full bg-accent transition-transform duration-200 ease-out origin-left">
                  <span
                    className={`block h-full w-full transition-transform duration-200 ease-out ${
                      filter === cat ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        <div className="space-y-px border-y border-border-soft" role="list" aria-label="Projects">
          {filteredProjects.map((project, index) =>
            index === 0 ? (
              <div key={project.title} className="border-b border-border-soft py-8 lg:py-10" role="listitem">
                <FeaturedProjectCard
                  project={project}
                  index={index}
                  onOpen={setSelectedProject}
                />
              </div>
            ) : (
              <ProjectRow
                key={project.title}
                project={project}
                index={index}
                onOpen={setSelectedProject}
              />
            )
          )}
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

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}