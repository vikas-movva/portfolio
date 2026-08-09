import { motion } from 'framer-motion'
import { experienceData } from '../data'
import { useThemeColor, hexToRgba } from '../theme/useThemeColor'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

export default function Experience() {
  // Theme-coloured glow for the timeline dot and card hover shadow.
  const primary = useThemeColor('primary')
  const glow = (alpha: number) =>
    hexToRgba(primary ?? '#00d4ff', alpha) || `rgba(0, 212, 255, ${alpha})`

  return (
    <section
      id="experience"
      className="py-24 md:py-32 px-6 bg-darker"
      aria-labelledby="experience-title"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span
            variants={itemVariants}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20"
          >
            Experience
          </motion.span>
          <motion.h2
            id="experience-title"
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="text-white">My Professional </span>
            <br />
            <span className="text-primary">Journey</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Building scalable systems, leading data initiatives, and delivering impact across diverse domains.
          </motion.p>
        </motion.div>

        <div className="relative">
          <motion.div
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-transparent"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            style={{ transformOrigin: 'top' }}
            aria-hidden="true"
          />

          <div className="space-y-12">
            {experienceData.map((exp, index) => (
              <motion.div
                key={exp.role}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className={`relative flex-${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} md:items-start gap-8`}
              >
                <motion.div
                  className="relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary border-4 border-transparent flex-shrink-0"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                  style={{
                    left: 'calc(50% - 20px)',
                    top: '24px',
                    boxShadow: `0 0 0 4px ${glow(0.3)}`,
                  }}
                  aria-hidden="true"
                >
                  <motion.div
                    className="w-full h-full rounded-full bg-primary"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </motion.div>

                <motion.div
                  className={`w-full md:w-[calc(50%-40px)] p-6 rounded-2xl bg-dark/50 border border-gray-700/50 hover:border-primary/30 transition-all ${
                    index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'
                  }`}
                  whileHover={{ y: -4, boxShadow: `0 20px 40px -20px ${glow(0.15)}` }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <motion.span
                      className="px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full"
                      whileInView={{ scale: [0, 1] }}
                      viewport={{ once: true }}
                    >
                      {exp.type}
                    </motion.span>
                    <motion.span
                      className="px-3 py-1 text-xs text-gray-400 bg-gray-800 rounded-full"
                      whileInView={{ scale: [0, 1] }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.05 }}
                    >
                      {exp.location}
                    </motion.span>
                    <motion.span
                      className="px-3 py-1 text-xs text-gray-400 bg-gray-800 rounded-full"
                      whileInView={{ scale: [0, 1] }}
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
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <span className="text-primary font-medium">{exp.company}</span>
                  </motion.div>

                  <motion.p
                    className="text-gray-300 mb-6 leading-relaxed"
                    whileInView={{ opacity: [0, 1], y: [10, 0] }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                                        {exp.description}
                                        {exp.descriptionHighlight && (
                                          <strong className="font-bold text-primary">{exp.descriptionHighlight}</strong>
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
                        className="flex items-start gap-3 text-gray-300"
                      >
                        <motion.svg
                          className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </motion.svg>
                        <span className="text-sm leading-relaxed">{achievement}</span>
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
                        className="px-3 py-1 text-xs font-medium text-gray-200 bg-gray-800 rounded-full border border-gray-700 hover:border-primary/50 hover:text-primary transition-all"
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
                      className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-dark font-medium text-sm hover:bg-primary/90 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View Paper
                    </motion.a>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}