import { motion } from 'framer-motion'
import type { SkillCategory as SkillCategoryType } from '../../data'
import {
  CodeIcon,
  DatabaseIcon,
  LightbulbIcon,
  LinkIcon,
  CloudIcon,
} from './SkillIcon'
import SkillBar from './SkillBar'

const iconMap: Record<SkillCategoryType['icon'], React.ReactNode> = {
  code: <CodeIcon />,
  database: <DatabaseIcon />,
  lightbulb: <LightbulbIcon />,
  link: <LinkIcon />,
  cloud: <CloudIcon />,
}

const panelVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

/**
 * One capability block: a category label with its glyph, then a list of thin
 * accent progress bars.
 *
 * Borderless — a top rule separates blocks instead of a card box. No rounded
 * corners, no shadows, no glass, no gradients. The featured block layers the
 * outlined section number behind its display-face title, mirroring the rest
 * of the site's solid + outlined motif.
 *
 * Mobile: the outlined number is dropped (its negative left offset would
 * overflow the padded column) and the featured title uses the smaller
 * display-md face so the category name never wraps. Desktop restores both.
 */
export default function SkillCategory({
  category,
  icon,
  skills,
  index,
  featured = false,
}: {
  category: string
  icon: SkillCategoryType['icon']
  skills: { name: string; level: number }[]
  index: number
  featured?: boolean
}) {
  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08 }}
      className={`relative pt-8 ${featured ? 'pb-4' : 'pb-8'}`}
    >
      <div className="flex items-center gap-3 mb-8">
        <span className="text-accent">{iconMap[icon]}</span>
        <span className="text-xs font-mono tracking-widest text-content-faint">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="relative">
          <span
            aria-hidden="true"
            className="pointer-events-none hidden sm:block absolute -left-2 top-1/2 -translate-y-1/2 display outline text-content opacity-[0.07]"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3
            className={`tracking-tight text-content transition-colors hover:text-accent ${
              featured
                ? 'font-[clamp(1.5rem,9vw,3rem)] sm:font-[clamp(2.5rem,9vw,6rem)]'
                : 'text-2xl font-display'
            }`}
          >
            {category}
          </h3>
        </span>
      </div>

      <div className={featured ? 'grid sm:grid-cols-2 gap-x-12 gap-y-6' : 'space-y-6'}>
        {skills.map((skill, skillIndex) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            index={skillIndex}
          />
        ))}
      </div>
    </motion.div>
  )
}