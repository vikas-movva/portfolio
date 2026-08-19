import { motion } from "framer-motion"
import { experienceData, educationData } from "../data"
import SectionHeading from './SectionHeading'
import { stagger, slideRight, inViewOnce } from '../theme/anim'

/**
 * Experience section: a left-aligned timeline with a thin accent rule and
 * numbered entries. Work history reads as a vertical list; the academic
 * background follows as a separate, labeled block. No cards, no glass, no
 * gradients.
 */
export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-24 md:py-32 bg-surface scroll-mt-20"
      aria-labelledby="experience-title"
    >
      <div className="container">
        <SectionHeading
          id="experience-title"
          eyebrow="Experience & Education"
          number="04"
          title={
            <>
              My Professional <span className="text-accent">Journey</span>
            </>
          }
          subtitle="Building scalable systems and the academic foundation behind my engineering and data work."
          align="left"
        />

        <div className="relative">
          {/* Timeline accent rule — accent-coloured, drawn from the top.
              Desktop only: mobile recomposes to a borderless stack. */}
          <motion.div
            className="hidden md:block absolute left-0 top-2 bottom-0 w-px"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={inViewOnce}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            style={{ transformOrigin: "top", background: "rgb(var(--color-accent-rgb) / 0.3)" }}
            aria-hidden="true"
          />

          <div className="space-y-16 md:pl-8">
            {experienceData.map((exp, index) => (
              <motion.div
                key={exp.role}
                variants={slideRight}
                initial="hidden"
                whileInView="visible"
                viewport={inViewOnce}
                className="relative"
>
                {/* Timeline dot — desktop only. Anchored to the rule's x;
                    translate-x-[-50%] centres the 12px dot on the line. */}
                <motion.div
                  className="hidden md:block absolute -left-9 top-2 w-3 h-3 rounded-full bg-accent border-2 border-surface -translate-x-1/2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={inViewOnce}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                  aria-hidden="true"
                />

                <div className="pb-2">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
                    <span className="hidden md:inline text-xs font-mono text-accent tracking-widest">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-content-faint tracking-wide">
                      {exp.type}
                    </span>
                    <span className="text-xs text-content-faint tracking-wide">
                      • {exp.location}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 mb-4">
                    <h3 className="text-2xl font-display tracking-tight text-content">
                      {exp.role}
                    </h3>
                    <span className="text-sm font-medium text-accent whitespace-nowrap">
                      {exp.period}
                    </span>
                    <span className="text-sm text-content-soft font-medium">
                      {exp.company}
                    </span>
                  </div>

                  <p className="text-content-soft mb-6 leading-relaxed max-w-3xl">
                    {exp.description}
                    {exp.descriptionHighlight && (
                      <strong className="font-bold text-accent">
                        {exp.descriptionHighlight}
                      </strong>
                    )}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {exp.achievements.map((achievement, achIndex) => (
                      <motion.li
                        key={achIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={inViewOnce}
                        transition={{ delay: achIndex * 0.05 }}
                        className="flex items-start gap-3 text-content-soft"
                      >
                        <svg
                          className="w-4 h-4 text-accent flex-shrink-0 mt-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm leading-relaxed">
                          {achievement}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium text-content-soft border border-border-soft hover:border-accent hover:text-accent transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {exp.link && (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      View Paper
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education subsection, rendered as part of the same section.
            Borderless on mobile (a bordered card grid is too heavy at narrow
            widths); on desktop the entries sit in a bordered grid. */}
        <motion.div
          className="mt-24"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
        >
          <div className="flex items-center gap-4 mb-10">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <h3 className="font-display text-3xl md:text-4xl tracking-tight text-content">
              Academic <span className="text-accent">Background</span>
            </h3>
            <span className="flex-1 h-px bg-border-soft" />
          </div>
          <div className="flex flex-col border-y border-border-soft">
            {educationData.map((edu, i) => (
              <motion.div
                key={edu.degree}
                variants={slideRight}
                className={`flex flex-col gap-2 p-6 bg-surface ${
                  i < educationData.length - 1 ? 'border-b border-border-soft' : ''
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                  <h4 className="text-xl font-semibold text-content">
                    {edu.degree}
                  </h4>
                  <span className="px-3 py-1 text-sm border border-border-soft text-content-muted whitespace-nowrap">
                    {edu.year}
                  </span>
                </div>
                <p className="text-accent font-medium mt-1">{edu.institution}</p>
                <p className="text-content-muted text-sm leading-relaxed">
                  {edu.details}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}