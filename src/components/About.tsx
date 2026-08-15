import { motion } from 'framer-motion'
import { aboutData } from '../data'
import SectionHeading from './SectionHeading'

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  return (
    <section
      id="about"
      className="relative overflow-hidden py-24 md:py-32 px-6 bg-surface-alt scroll-mt-20"
      aria-labelledby="about-title"
    >
      <div className="section-aurora" aria-hidden="true" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeading
          id="about-title"
          eyebrow="About Me"
          title={
            <>
              Get to Know <span className="text-accent">Me Better</span>
            </>
          }
          subtitle="A snapshot of my journey, education, and what drives me as an engineer."
        />

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              variants={itemVariants}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-content flex items-center gap-3">
                <span className="w-1 h-8 bg-accent rounded-full"></span>
                Professional Summary
              </h3>
              <div className="space-y-4 text-content-soft leading-relaxed">
                {aboutData.summary.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    variants={itemVariants}
                    className="transition-colors"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              </motion.div>
              </motion.div>

              <motion.div
              variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4"
            >
              {aboutData.highlights.map((highlight) => (
                <motion.div
                  key={highlight.label}
                  variants={cardVariants}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all text-center group"
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <motion.div
                    className="text-4xl md:text-5xl font-bold text-accent mb-2"
                    whileInView={{ scale: [0, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  >
                    {highlight.value}
                  </motion.div>
                  <p className="text-content-muted font-medium">{highlight.label}</p>
                  <motion.div
                    className="w-0 h-0.5 bg-accent mx-auto mt-4 group-hover:w-full transition-all duration-300"
                  />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20"
            >
              <h4 className="text-lg font-semibold text-accent mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                {aboutData.lookingFor.title}
              </h4>
              <p className="text-content-soft leading-relaxed">
                {aboutData.lookingFor.body}
                <span className="text-accent font-medium">{aboutData.lookingFor.emphasize}</span>
                {' '}at companies that value clean code, thoughtful architecture, and continuous learning.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
