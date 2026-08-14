import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, stagger, inViewOnce } from '../theme/anim'

interface SectionHeadingProps {
  /** id for the <h2> (so the parent <section aria-labelledby> resolves). */
  id?: string
  /** Small uppercase kicker above the title. */
  eyebrow: string
  /** Title content. Wrap a word in <span className="text-accent"> to colour it. */
  title: ReactNode
  /** Optional supporting sentence. */
  subtitle?: string
  /** Text alignment. Defaults to centered. */
  align?: 'center' | 'left'
}

/**
 * Unified section header for the UI refresh: an uppercase eyebrow, a large
 * fluid display title, and an optional subtitle — all revealing on scroll with
 * a staggered fade. Replaces the per-component heading markup so every section
 * shares one bold, minimal voice.
 */
export default function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: SectionHeadingProps) {
  const alignment = align === 'left' ? 'text-left' : 'text-center'
  return (
    <motion.div
      className={`${alignment} mb-16`}
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
    >
      <motion.span
        variants={fadeUp}
        className="eyebrow inline-block text-accent mb-4"
      >
        {eyebrow}
      </motion.span>
      <motion.h2 id={id} variants={fadeUp} className="display text-content">
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={`mt-4 text-lg text-content-muted max-w-2xl ${
            align === 'left' ? '' : 'mx-auto'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
