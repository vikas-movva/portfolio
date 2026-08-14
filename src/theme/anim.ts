import type { Variants } from 'framer-motion'

/**
 * Shared motion language for the UI refresh.
 *
 * Every section reuses these so the whole site feels like one coherent,
 * motion-forward editorial design (rather than each component inventing its
 * own easing). Easing uses a soft "expo-out" cubic-bezier so entrances feel
 * snappy but settle gently.
 */

/** Single block rises + fades in. The workhorse reveal. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Parent container that staggers its children's fadeUp. */
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
}

/** Plain fade (no movement) for backgrounds / overlays. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

/** Slides in from the left — used for timeline / list rows. */
export const slideRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Scroll-trigger config shared by every whileInView heading. */
export const inViewOnce = { once: true, margin: '-80px' } as const
