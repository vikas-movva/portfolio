import { motion, useReducedMotion } from 'framer-motion'

/**
 * Decorative counter-rotating dotted rings, mirroring the motion language of the
 * Hero portrait. Two concentric dashed borders spin in opposite directions for a
 * subtle, alive backdrop. Sits absolutely behind section content (the parent
 * section's inner wrapper is `relative z-10`), and freezes entirely under
 * prefers-reduced-motion.
 *
 * Place it as a child of a `relative overflow-hidden` section, then pass a
 * `position` to tuck it into a corner.
 */

type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center-top'

const positionClasses: Record<Position, string> = {
  'top-left': 'left-6 top-6',
  'top-right': 'right-6 top-6',
  'bottom-left': 'left-6 bottom-6',
  'bottom-right': 'right-6 bottom-6',
  'center-top': 'left-1/2 top-10 -translate-x-1/2',
}

export default function RotatingRings({
  position = 'top-right',
  size = 300,
  className = '',
}: {
  position?: Position
  /** Diameter of the outer ring in px. */
  size?: number
  className?: string
}) {
  const reduce = useReducedMotion()

  return (
    <div
      className={`pointer-events-none absolute z-0 ${positionClasses[position]} ${className}`}
      aria-hidden="true"
    >
      <div className="relative" style={{ width: size, height: size }}>
        <motion.div
          className="absolute inset-0 rounded-full border border-dashed border-accent/20"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 44, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-[16%] rounded-full border border-dashed border-accent/10"
          animate={reduce ? undefined : { rotate: -360 }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </div>
  )
}
