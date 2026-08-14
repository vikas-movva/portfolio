import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { heroData } from '../data'
import { useThemeColor } from '../theme/useThemeColor'
import { fadeUp, stagger } from '../theme/anim'
import heroImg from '../assets/Hero-Image-noBG.png'

const scrollToSection = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

/** Small tech chips that float around the portrait for a bit of personality. */
const floatingChips = [
  { label: 'Python', className: 'top-6 -left-2 md:-left-6' },
  { label: 'SQL', className: 'bottom-28 -left-3 md:-left-8' },
  { label: 'React', className: 'top-16 -right-2 md:-right-6' },
  { label: 'Spark', className: 'bottom-10 -right-3 md:-right-8' },
]

export default function Hero() {
  const primary = useThemeColor('accent')
  const primaryRgb = primary ?? 'rgb(0 212 255)'

  // Motion-forward role rotator: "I build <role>" cycles every few seconds.
  const roles = heroData.roles
  const [roleIndex, setRoleIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % roles.length),
      2600,
    )
    return () => clearInterval(id)
  }, [roles.length])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden scroll-mt-20"
      aria-labelledby="hero-title"
    >
      {/* Dotted grid backdrop, masked to fade at the edges. */}
      <div className="absolute inset-0 -z-10 bg-grid opacity-70" aria-hidden="true" />

      {/* Drifting accent blobs for depth. */}
      <motion.div
        className="absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-accent/10 blur-3xl -z-10"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute -bottom-28 -right-20 w-[32rem] h-[32rem] rounded-full bg-accent/5 blur-3xl -z-10"
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
        {/* ---- LEFT: copy ---- */}
        <motion.div
          className="text-center lg:text-left"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={fadeUp}
            className="eyebrow inline-block text-accent border border-accent/30 rounded-full px-4 py-1.5 bg-accent/5"
          >
            {heroData.badge}
          </motion.span>

          <motion.h1
            id="hero-title"
            variants={fadeUp}
            className="display mt-6 text-content"
          >
            Hi, I&apos;m{' '}
            <span className="text-gradient">{heroData.name}</span>
          </motion.h1>

          <div className="mt-4 text-2xl md:text-3xl font-semibold text-content-soft">
            <span className="text-content-faint">I build </span>
            <span className="relative inline-flex h-[1.2em] overflow-hidden align-bottom">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  className="text-accent whitespace-nowrap"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg text-content-muted max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            {heroData.intro}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <motion.button
              onClick={() => scrollToSection('#projects')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-xl bg-accent text-on-accent font-semibold text-lg shadow-lg shadow-accent/25 hover:bg-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface"
            >
              {heroData.primaryCta}
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('#contact')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-xl bg-transparent border-2 border-accent/50 text-accent font-semibold text-lg hover:bg-accent/10 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface"
            >
              {heroData.secondaryCta}
            </motion.button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap justify-center lg:justify-start gap-2.5"
          >
            {heroData.topTech.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-lg bg-card border border-border text-content-soft text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {heroData.stats.length > 0 && (
            <motion.div
              variants={fadeUp}
              className="mt-4 flex flex-wrap justify-center lg:justify-start gap-3"
            >
              {heroData.stats.map((stat) => (
                <span
                  key={stat.text}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20"
                >
                  {stat.text}
                </span>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* ---- RIGHT: background-less portrait cutout ---- */}
        <motion.div
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-square">
            {/* Soft accent aura behind the cutout. */}
            <div
              className="absolute inset-0 aura -z-10"
              style={{ background: `radial-gradient(circle, ${primaryRgb.replace(
                'rgb',
                'rgba',
              ).replace(')', ', 0.35)')} 0%, transparent 65%)` }}
              aria-hidden="true"
            />

            {/* Two counter-rotating rings for subtle motion. */}
            <motion.div
              className="absolute inset-6 rounded-full border border-dashed border-accent/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 44, repeat: Infinity, ease: 'linear' }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute inset-12 rounded-full border border-accent/10"
              animate={{ rotate: -360 }}
              transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
              aria-hidden="true"
            />

            {/* The portrait itself. */}
            <motion.img
              src={heroImg}
              alt={`${heroData.name}, ${heroData.badge}`}
              className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: [0, -12, 0], opacity: 1 }}
              transition={{
                y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                opacity: { duration: 0.8, delay: 0.4 },
              }}
              whileHover={{ scale: 1.03 }}
            />

            {/* Floating tech chips. */}
            {floatingChips.map((chip, i) => (
              <motion.span
                key={chip.label}
                className={`absolute ${chip.className} px-3 py-1.5 rounded-full bg-card border border-accent/30 text-accent text-xs font-semibold shadow-lg shadow-accent/10`}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.3,
                }}
              >
                {chip.label}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll cue. */}
      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault()
          scrollToSection('#about')
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-content-faint hover:text-accent transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          delay: 1.4,
          ease: 'easeInOut',
        }}
        aria-label="Scroll to about section"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.a>
    </section>
  )
}
