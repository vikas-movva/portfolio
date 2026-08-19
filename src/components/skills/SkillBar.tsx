import { motion } from 'framer-motion'

/**
 * One skill row: name + monospace level, with a thin accent progress bar that
 * draws from left on scroll. The bar itself is the only motion here — the
 * parent block already reveals the whole group, so this row has no entrance
 * animation of its own. Transforms/opacity only; the site already respects
 * prefers-reduced-motion via MotionConfig.
 */
export default function SkillBar({
  name,
  level,
  index,
}: {
  name: string
  level: number
  index: number
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline gap-3">
        <span className="text-content-soft font-medium text-sm">{name}</span>
      </div>
      <div className="h-px bg-border-soft overflow-hidden">
        <motion.div
          className="h-full bg-accent"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: index * 0.04 + 0.05, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}