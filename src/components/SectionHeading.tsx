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
  /** Optional section number rendered beside the kicker. */
  number?: string
}

/**
 * Unified section header: an uppercase kicker (with an optional section
 * number), a large fluid display title, and an optional subtitle — all
 * revealing on scroll with a staggered fade. Replaces the per-component
 * heading markup so every section shares one bold, minimal voice.
 *
 * Alignment: `left` by default. The editorial composition favours
 * asymmetric, left-anchored headlines; a centered heading is opt-in via the
 * `align` prop (currently only Contact uses it). Left-aligning on mobile is
 * not a fallback — it is the intended reading posture at any width.
 */
export default function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  align = 'left',
  number,
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
        className="eyebrow inline-flex items-center gap-3 text-accent"
      >
        {number && <span className="font-mono text-xs tracking-widest">{number}</span>}
        <span className="tracking-widest">{eyebrow}</span>
        <span className="hidden sm:inline-block w-12 h-px bg-accent/40" />
      </motion.span>
      <motion.h2 id={id} variants={fadeUp} className="display text-content mt-6">
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={`mt-6 text-lg text-content-muted max-w-2xl ${
            align === 'left' ? '' : 'mx-auto'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}