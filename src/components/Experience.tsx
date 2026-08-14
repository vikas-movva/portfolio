import { motion } from "framer-motion";
import { experienceData, educationData } from "../data";
import { useThemeColor, hexToRgba } from "../theme/useThemeColor";
import SectionHeading from './SectionHeading'
import { stagger, inViewOnce } from '../theme/anim'

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Experience() {
  // Theme-coloured glow for the timeline dot and card hover shadow.
  const primary = useThemeColor("accent");
  const glow = (alpha: number) =>
    hexToRgba(primary ?? 'rgb(0 212 255)', alpha) || `rgba(0, 212, 255, ${alpha})`

  return (
    <section
      id="experience"
      className="py-24 md:py-32 px-6 bg-surface-alt scroll-mt-20"
      aria-labelledby="experience-title"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          id="experience-title"
          eyebrow="Experience & Education"
          title={
            <>
              My Professional <span className="text-accent">Journey</span>
            </>
          }
          subtitle="Building scalable systems and the academic foundation behind my engineering and data work."
        />

        <div className="relative">
          <motion.div
            className="absolute left-5 top-[34px] bottom-0 w-0.5"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            style={{
              transformOrigin: "top",
              // Follows the selected accent via the mode-aware token, fading to transparent.
              background: `linear-gradient(to bottom, ${glow(0.6)}, transparent)`,
            }}
            aria-hidden="true"
          />

          <div className="space-y-12">
            {experienceData.map((exp) => (
              <motion.div
                key={exp.role}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="relative pl-12 md:pl-12"
              >

                <motion.div
                  className="absolute z-10 left-[11px] w-5 h-5 rounded-full bg-accent border-4 border-transparent flex-shrink-0"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.2,
                  }}
                  style={{
                    top: "24px",
                    boxShadow: `0 0 0 4px ${glow(0.3)}`,
                  }}
                  aria-hidden="true"
                >
                  <motion.div
                    className="w-full h-full rounded-full bg-accent"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>

                <motion.div
                  className="w-full p-6 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all"
                  whileHover={{
                    y: -4,
                    boxShadow: `0 20px 40px -20px ${glow(0.15)}`,
                  }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <motion.span
                        className="px-3 py-1 text-xs font-semibold text-accent bg-accent/10 rounded-full"
                        whileInView={{ scale: [0, 1] }}
                        viewport={{ once: true }}
                      >
                        {exp.type}
                      </motion.span>
                      <motion.span
                        className="px-3 py-1 text-xs text-content-muted bg-field rounded-full"
                        whileInView={{ scale: [0, 1] }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 }}
                      >
                        {exp.location}
                      </motion.span>
                    </div>
                    <motion.span
                      className="hidden md:block text-sm font-semibold text-accent whitespace-nowrap"
                      whileInView={{ opacity: [0, 1] }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                    >
                      {exp.period}
                    </motion.span>
                  </div>

                  <motion.div
                    className="flex items-baseline gap-4 mb-3"
                    whileInView={{ opacity: [0, 1], y: [20, 0] }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-bold text-content">{exp.role}</h3>
                    <span className="text-accent font-medium">
                      {exp.company}
                    </span>
                  </motion.div>

                  <motion.p
                    className="text-content-soft mb-6 leading-relaxed"
                    whileInView={{ opacity: [0, 1], y: [10, 0] }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    {exp.description}
                    {exp.descriptionHighlight && (
                      <strong className="font-bold text-accent">
                        {exp.descriptionHighlight}
                      </strong>
                    )}
                  </motion.p>

                  <motion.ul
                    className="space-y-3 mb-6"
                    whileInView={{ opacity: [0, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                  >
                    {exp.achievements.map((achievement, achIndex) => (
                      <motion.li
                        key={achIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: achIndex * 0.05 }}
                        className="flex items-start gap-3 text-content-soft"
                      >
                        <motion.svg
                          className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </motion.svg>
                        <span className="text-sm leading-relaxed">
                          {achievement}
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>

                  <motion.div
                    className="flex flex-wrap gap-2"
                    whileInView={{ opacity: [0, 1], y: [10, 0] }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    {exp.technologies.map((tech) => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium text-content-soft bg-field rounded-full border border-border hover:border-accent/50 hover:text-accent transition-all"
                        whileHover={{ scale: 1.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>

                  {exp.link && (
                    <motion.a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-on-accent font-medium text-sm hover:bg-accent-hover transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
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
                    </motion.a>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education subsection, rendered as part of the same section. */}
        <motion.div
          className="mt-24"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
        >
          <motion.h3
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-10 text-center"
          >
            <span className="text-content">Academic </span>
            <span className="text-accent">Background</span>
          </motion.h3>
          <div className="space-y-6">
            {educationData.map((edu) => (
              <motion.div
                key={edu.degree}
                variants={itemVariants}
                className="p-6 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all text-left"
                whileHover={{ y: -4 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <h4 className="text-xl font-semibold text-content">
                    {edu.degree}
                  </h4>
                  <span className="px-3 py-1 text-sm bg-accent/10 text-accent rounded-full font-medium">
                    {edu.year}
                  </span>
                </div>
                <p className="text-accent font-medium">{edu.institution}</p>
                <p className="text-content-muted text-sm mt-2">{edu.details}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
