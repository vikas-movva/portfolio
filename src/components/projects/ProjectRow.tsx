import { motion } from 'framer-motion'
import type { Project } from '../../data'
import { ArrowUpRight } from '../icons'

const rowVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

/**
 * Typographic project row — the remaining projects read as a vertical list
 * rather than a grid: number, title, category, one-line description, tech
 * tokens, and a single arrow link. No cards, no tiles, no density.
 *
 * Mobile recomposes to a full stack (number above, tech below the description)
 * rather than shrinking the desktop's hidden-tech column.
 */
export default function ProjectRow({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: (_project: Project) => void
}) {
  return (
    <motion.button
      type="button"
      variants={rowVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      onClick={() => onOpen(project)}
      className="group relative flex w-full items-start gap-6 border-b border-border-soft py-6 text-left transition-colors hover:bg-field/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
    >
      <span className="shrink-0 pt-1 font-mono text-xs tracking-widest text-content-faint transition-colors group-hover:text-accent">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="text-lg font-bold leading-tight text-content transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          <span className="text-xs font-mono tracking-wide text-accent">
            {project.category}
          </span>
        </div>
        <p className="mt-1 line-clamp-1 text-sm text-content-muted">
          {project.description}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-content-soft">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="transition-colors group-hover:text-content">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-content-faint">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>

      <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-content-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
    </motion.button>
  )
}