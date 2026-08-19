import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from '../../data'
import { ArrowUpRight, GitHubMark, XMark } from '../icons'

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const panelVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
}

/**
 * Case-study modal. Rectangular, thin-bordered, no glass: a solid surface
 * panel slides up over a dimmed backdrop. Content is laid out as an
 * editorial detail panel — big title, metadata, highlights, and rectangular
 * CTAs — matching the rest of the site's voice.
 */
export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            variants={panelVariants}
            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-border bg-surface p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 border border-border text-content-muted hover:text-accent hover:border-accent transition-colors focus:outline-none"
              aria-label="Close project details"
              autoFocus
            >
              <XMark className="w-5 h-5" />
            </button>

            <div className="space-y-6 pr-8">
              <div className="text-center sm:text-left">
                {project.image ? (
                  <img
                    src={project.image}
                    alt=""
                    aria-hidden="true"
                    className="project-logo block mb-4 mx-auto max-h-40 w-auto object-contain"
                  />
                ) : null}
                <h2 id="modal-title" className="text-3xl font-bold text-content mb-2">
                  {project.title}
                </h2>
                <span className="text-xs font-mono tracking-widest text-accent">
                  {project.category.toUpperCase()}
                </span>
              </div>

              <p className="text-content-soft leading-relaxed text-lg">
                {project.longDescription}
              </p>

              <div>
                <h3 className="text-lg font-semibold text-content mb-3">Key Highlights</h3>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3 text-content-soft">
                      <svg
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-content mb-3">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm font-medium text-content-soft border border-border hover:border-accent hover:text-accent transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <GitHubMark className="w-5 h-5" />
                    View Code
                  </a>
                )}
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}