import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { heroData } from '../data'
import { useThemeColor } from '../theme/useThemeColor'
import { fadeUp, stagger } from '../theme/anim'
import heroImg from '../assets/Hero-Image-chestup.png'

const scrollToSection = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  const primary = useThemeColor('accent')
  const primaryRgb = primary ?? 'rgb(0 212 255)'
  const reduce = useReducedMotion()

  // Motion-forward role rotator: "I build <role>" cycles every few seconds.
  const roles = heroData.roles

  const [roleIndex, setRoleIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % roles.length),
      3000,
    )
    return () => clearInterval(id)
  }, [roles.length])

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center pt-28 pb-16 overflow-hidden scroll-mt-20"
      aria-labelledby="hero-title"
    >
      {/* Dotted grid backdrop, masked to fade at the edges. */}
      <div className="absolute inset-0 -z-10 bg-grid opacity-70" aria-hidden="true" />

      {/* Drifting accent blobs for depth. */}
      <motion.div
        className="absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-accent/10 blur-3xl -z-10"
        animate={reduce ? undefined : { x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute -bottom-28 -right-20 w-[32rem] h-[32rem] rounded-full bg-accent/5 blur-3xl -z-10"
        animate={reduce ? undefined : { x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-[1fr_1.05fr] gap-8 items-center">
        {/* ---- LEFT: copy ---- */}
        <motion.div
          className="text-center lg:text-left"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            id="hero-title"
            variants={fadeUp}
            className="display mt-6 text-content"
          >
            Hi, I&apos;m{' '}
            <span className="text-gradient">{heroData.name}</span>
          </motion.h1>

          <div className="mt-4 text-xl sm:text-2xl md:text-3xl font-semibold text-content-soft leading-tight">
            <span className="text-content-faint">I build </span>
            <span className="relative inline-flex h-[1.2em] overflow-hidden align-bottom">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  className="text-accent whitespace-nowrap font-roles"
                  initial={{ y: '-100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '100%', opacity: 0 }}
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
              <motion.span
                key={tech}
                whileHover={reduce ? undefined : { y: -4, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="px-4 py-2 rounded-lg bg-card border border-border text-content-soft text-sm font-medium transition-colors duration-300 cursor-default hover:border-accent/60 hover:text-accent hover:shadow-lg hover:shadow-accent/25"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {heroData.stats.length > 0 && (
            <motion.div
              variants={fadeUp}
              className="mt-4 flex flex-wrap justify-center lg:justify-start gap-3"
            >
              {heroData.stats.map((stat) => (
                <motion.span
                  key={stat.text}
                  whileHover={reduce ? undefined : { y: -4, scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20 transition-colors duration-300 cursor-default hover:bg-accent/20 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/30"
                >
                  {stat.text}
                </motion.span>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* ---- RIGHT: background-less portrait cutout ---- */}
        <motion.div
          className="relative mx-auto w-full max-w-md sm:max-w-lg lg:max-w-2xl"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.22, 1] }}
        >
          <div className="relative aspect-[4/5]">
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
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 44, repeat: Infinity, ease: 'linear' }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute inset-12 rounded-full border border-accent/10"
              animate={reduce ? undefined : { rotate: -360 }}
              transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
              aria-hidden="true"
            />

            {/* The portrait itself. */}
            <motion.img
              src={heroImg}
              alt={`${heroData.name}, ${heroData.badge}`}
              className="absolute inset-0 w-full h-full object-contain"
              style={{ filter: 'drop-shadow(0 22px 32px rgb(var(--color-primary-rgb) / 0.35))' }}
              initial={{ y: 24, opacity: 0 }}
              animate={reduce ? { y: 0, opacity: 1 } : { y: [0, -12, 0], opacity: 1 }}
              transition={{
                y: reduce ? { duration: 1, delay: 0.4 } : { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                opacity: { duration: 1, delay: 0.4 },
              }}
              whileHover={{ scale: 1.03 }}
            />

            {/* Soft ground glow to anchor the floating portrait. */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-16 rounded-full -z-10"
              style={{
                background: `radial-gradient(ellipse, ${primaryRgb.replace(
                  'rgb',
                  'rgba',
                ).replace(')', ', 0.18)')} 0%, transparent 70%)`,
                filter: 'blur(12px)',
              }}
              aria-hidden="true"
            />
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
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: [0, 10, 0] }}
        transition={{
          duration: 1.6,
          repeat: reduce ? 0 : Infinity,
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
