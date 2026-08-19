import { motion } from 'framer-motion'
import { aboutData } from '../data'
import SectionHeading from './SectionHeading'
import { stagger, revealImage, inViewOnce } from '../theme/anim'

/**
 * About section: asymmetric editorial composition — a wide left column of
 * narrative, a narrower right column of large stat numbers and a pull-quote.
 * No cards, no gradients, no glass.
 */
export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 bg-surface scroll-mt-20"
      aria-labelledby="about-title"
    >
      <div className="container">
        <SectionHeading
          id="about-title"
          eyebrow="About Me"
          number="02"
          title={
            <>
              Get to Know <span className="text-accent">Me Better</span>
            </>
          }
          subtitle="A snapshot of my journey, education, and what drives me as an engineer."
          align="left"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-start">
          {/* ---- LEFT: narrative ---- */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={inViewOnce}
            className="space-y-6"
          >
            {aboutData.summary.map((paragraph, index) => (
              <motion.p
                key={index}
                variants={revealImage}
                className="text-lg text-content-soft leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}

            <motion.div
              variants={revealImage}
              className="flex items-center gap-4 pt-6 mt-2"
            >
              <span className="w-12 h-px bg-accent/50" />
              <span className="eyebrow text-content-faint tracking-widest">
                Vikas Movva
              </span>
            </motion.div>
          </motion.div>

          {/* ---- RIGHT: stat numbers + pull-quote ---- */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={inViewOnce}
            className="space-y-12"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px">
              {aboutData.highlights.map((highlight) => (
                <motion.div
                  key={highlight.label}
                  variants={revealImage}
                  className="py-2"
                >
                  <div className="font-display text-5xl sm:text-7xl leading-none text-accent">
                    {highlight.value}
                  </div>
                  <p className="mt-3 text-sm text-content-muted tracking-wide uppercase">
                    {highlight.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.blockquote
              variants={revealImage}
              className="border-l-2 border-accent pl-6 max-w-lg"
            >
              <p className="text-content-soft leading-relaxed text-lg">
                {aboutData.lookingFor.body}
                <span className="text-accent font-medium">
                  {aboutData.lookingFor.emphasize}
                </span>
                {' '}at companies that value clean code, thoughtful architecture, and continuous learning.
              </p>
              <footer className="mt-4">
                <span className="eyebrow text-content-faint tracking-widest">
                  {aboutData.lookingFor.title}
                </span>
              </footer>
            </motion.blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  )
}