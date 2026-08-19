import { motion } from 'framer-motion'
import { skillsCategories, exploringSkills } from '../data'
import SectionHeading from './SectionHeading'
import SkillCategory from './skills/SkillCategory'
import { inViewOnce } from '../theme/anim'

/**
 * Skills section: borderless capability blocks separated by rules, laid out
 * asymmetrically. The first category is featured (full-width, display-face
 * title, 2-col skill grid); the rest sit in a supporting 2-column grid.
 * No cards, no shadows, no glass, no gradients. Mobile stacks to one column.
 */
export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-24 md:py-32 bg-surface-alt scroll-mt-20"
      aria-labelledby="skills-title"
    >
      <div className="container">
        <SectionHeading
          id="skills-title"
          eyebrow="Technical Skills"
          number="03"
          title={
            <>
              Technologies & <span className="text-accent">Tools I Use</span>
            </>
          }
          subtitle="A curated stack built through real-world projects and continuous learning."
          align="left"
        />

        {/* Featured category: full-width on every screen. The remaining
            categories flow into a 2-column grid on desktop and stack to a
            single column on mobile (recomposed, not shrunk). The featured
            block is rendered outside the grid so its full-width title never
            gets squeezed by a col-span constraint. */}
        <div className="w-full">
          <SkillCategory
            category={skillsCategories[0].category}
            icon={skillsCategories[0].icon}
            skills={skillsCategories[0].skills}
            index={0}
            featured
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px border-t border-border-soft">
          {skillsCategories.slice(1).map((cat, catIndex) => (
            <SkillCategory
              key={cat.category}
              category={cat.category}
              icon={cat.icon}
              skills={cat.skills}
              index={catIndex + 1}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          className="mt-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <p className="text-sm font-semibold tracking-widest uppercase text-content">
              Currently exploring
            </p>
            <span className="flex-1 h-px bg-border-soft" />
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {exploringSkills.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono text-content-soft transition-colors hover:text-accent cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}