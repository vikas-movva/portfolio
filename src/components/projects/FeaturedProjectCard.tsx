import { motion } from 'framer-motion'
import type { Project } from '../../data'
import { ArrowUpRight } from '../icons'

const featuredVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

/** Copy-column reveal: staggered rise + fade. Transforms/opacity only. */
const copyStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
}

const copyFadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

/**
 * Large asymmetric featured block — the first project gets a full-width
 * editorial composition rather than a card.
 *
 * Composition (per the site's editorial language):
 *   eyebrow
 *   MASSIVE SOLID TITLE  +  MASSIVE OUTLINED NUMBER behind it (the recurring
 *       solid + outlined motif, layered so the two read as one statement)
 *   integrated monochrome photography (left, overlapping the rule on hover)
 *   supporting metadata  →  minimal rectangular CTAs
 *
 * No ribbon, no scale-on-hover, no shadow. On mobile the two columns
 * recompose into a full stack rather than shrinking the 9rem tile.
 */
export default function FeaturedProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: (_project: Project) => void
}) {
  return (
    <motion.article
      variants={featuredVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="group relative grid grid-cols-1 lg:grid-cols-[18rem_1fr] gap-8 border border-border p-6 sm:p-10"
      role="listitem"
    >
      {/* Visual tile — monochrome, high-contrast, embedded in the composition
          rather than framed. Scales and lifts past the border on hover.
          On mobile the tile is a full-width square (the 14rem fixed tile
          overflowed narrow screens); on desktop it keeps its fixed column. */}
      <div className="relative aspect-square self-stretch overflow-hidden bg-field sm:aspect-auto">
        {project.image ? (
          <img
            src={project.image}
            alt=""
            aria-hidden="true"
            className="project-logo block h-full w-full max-w-[68%] mx-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center leading-none"
            style={{ fontSize: 'clamp(2.5rem, 22vw, 5rem)' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
        <span className="absolute left-3 top-3 font-mono text-[10px] tracking-widest text-content-faint">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Copy column — staggered reveal on scroll. */}
      <motion.div
        variants={copyStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="relative flex flex-col justify-center"
      >
        {/* Massive outlined number — the recurring solid + outlined motif,
            layered behind the solid title. Desktop-only: on mobile the copy
            column starts at the container edge, so a left-offset number would
            overflow. */}
        <span
          aria-hidden="true"
          className="pointer-events-none hidden sm:block absolute -left-4 top-1/2 -translate-y-1/2 display outline text-content opacity-[0.07]"
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <motion.span variants={copyFadeUp} className="eyebrow text-accent tracking-widest">
          {project.category.toUpperCase()}
        </motion.span>
        <motion.h3 variants={copyFadeUp} className="display-md mt-3 text-content transition-colors group-hover:text-accent">
          {project.title}
        </motion.h3>
        <motion.p variants={copyFadeUp} className="mt-4 max-w-2xl text-content-muted leading-relaxed">
          {project.description}
        </motion.p>

        <motion.div variants={copyFadeUp} className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-content-soft">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="hover:text-accent transition-colors">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-content-faint">
              +{project.technologies.length - 4}
            </span>
          )}
        </motion.div>

        <motion.div variants={copyFadeUp} className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="btn btn-primary"
          >
            View Project
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="arrow-link text-sm font-medium text-content-soft hover:text-accent"
            >
              Live Demo
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="arrow-link text-sm font-medium text-content-soft hover:text-accent"
            >
              Source
            </a>
          )}
        </motion.div>
      </motion.div>
    </motion.article>
  )
}