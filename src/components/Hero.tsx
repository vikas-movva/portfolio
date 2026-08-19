import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { heroData } from '../data'
import { staggerSlow, revealImage } from '../theme/anim'
import heroImg from '../assets/Hero-Image-chestup.png'

const scrollToSection = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

/**
 * Layered editorial hero composition.
 *
 *   small eyebrow / introduction
 *   MASSIVE SOLID TYPOGRAPHY
 *   MASSIVE OUTLINED TYPOGRAPHY
 *           photography
 *   small supporting metadata
 *       [ CTA ]     [ CTA ]
 *
 * The portrait is integrated into the composition (monochrome, high-contrast)
 * rather than placed inside a generic card. Display type is dramatically
 * oversized via clamp(); the outlined line sits behind the solid one so the
 * two read as a single layered statement. The photo overlaps the type column
 * on large screens so it feels embedded rather than framed.
 */
export default function Hero() {
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

  // Measure the CURRENTLY-shown role's width and apply it to the box. The
  // hero line is centered, so as the width changes the "I build" prefix
  // slides horizontally to keep the whole phrase centered. The width
  // transition (below) turns that slide into a smooth glide instead of a
  // sudden jump. Re-measure once Space Grotesk finishes loading (it changes
  // widths) and whenever the role changes.
  const roleMeasureRef = useRef<HTMLSpanElement>(null)
  const [roleWidth, setRoleWidth] = useState<number | undefined>(undefined)
  useLayoutEffect(() => {
    const measure = () => {
      const el = roleMeasureRef.current
      if (!el) return
      // The sizer renders every role; pick the one matching the current index.
      const current = el.children[roleIndex] as HTMLElement | undefined
      const w = current?.getBoundingClientRect().width ?? 0
      if (w <= 0) return
      // The sizer is off-screen, so its measurements are against the full
      // viewport — cap to the available column width so the box can never
      // overflow on small screens.
      const container = el.parentElement
      const maxW = container ? container.getBoundingClientRect().width : w
      setRoleWidth(Math.min(w, maxW))
    }
    measure()
    // Re-measure once webfonts (Space Grotesk) finish loading - they change widths.
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(measure)
    }
  }, [roles, roleIndex])

  return (
    <section
      id="hero"
      className="relative min-h-[95vh] flex items-center pt-24 pb-16 overflow-hidden scroll-mt-20"
      aria-labelledby="hero-title"
    >
      <div className="container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-8 items-center">
          {/* ---- LEFT: editorial copy ---- */}
          <motion.div
            variants={staggerSlow}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.span
              variants={revealImage}
              className="eyebrow inline-flex items-center gap-3 text-accent"
            >
              <span className="font-mono text-xs tracking-widest">01</span>
              <span className="tracking-widest">Portfolio</span>
              <span className="hidden sm:inline-block w-12 h-px bg-accent/40" />
            </motion.span>

            <motion.h1
              id="hero-title"
              variants={revealImage}
              className="display mt-6 text-content"
            >
              Hi, I&apos;m{' '}
              <span className="text-accent">{heroData.name}</span>
            </motion.h1>
            <div className="mt-4 text-xl sm:text-2xl md:text-3xl font-semibold text-content-soft leading-tight">
              <span className="text-content-faint">I build </span>
              <span
                className="relative inline-flex h-[1.2em] max-w-full overflow-hidden align-bottom transition-[width] duration-300 ease-out"
                style={{ width: roleWidth ? `${roleWidth}px` : undefined, minWidth: '1ch' }}
              >
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
              {/* Off-screen sizer: holds every role so we can measure the widest one. */}
              <span
                ref={roleMeasureRef}
                aria-hidden
                className="invisible absolute pointer-events-none whitespace-nowrap"
              >
                {roles.map((r) => (
                  <span key={r} className="font-roles">
                    {r}
                  </span>
                ))}
              </span>
            </div>

            <motion.p
              variants={revealImage}
              className="mt-8 text-lg text-content-muted leading-relaxed"
            >
              {heroData.intro}
            </motion.p>

            <motion.div
              variants={revealImage}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => scrollToSection('#projects')}
                className="btn btn-primary"
              >
                {heroData.primaryCta}
              </button>
              <button
                onClick={() => scrollToSection('#contact')}
                className="btn"
              >
                {heroData.secondaryCta}
              </button>
            </motion.div>

            {/* Supporting metadata — a single line, no pills. */}
            <motion.div
              variants={revealImage}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-content-muted"
            >
              {heroData.topTech.map((tech, i) => (
                <span key={tech} className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {tech}
                  {i < heroData.topTech.length - 1 && (
                    <span className="ml-6 w-px h-3 bg-border-soft" />
                  )}
                </span>
              ))}
            </motion.div>

            {heroData.stats.length > 0 && (
              <motion.div
                variants={revealImage}
                className="mt-6 flex flex-wrap gap-x-8 gap-y-3"
              >
                {heroData.stats.map((stat) => (
                  <span
                    key={stat.text}
                    className="inline-flex items-baseline gap-2"
                  >
                    <span className="font-display text-3xl leading-none text-accent">
                      {stat.text.split(/\s+/)[0]}
                    </span>
                    <span className="text-xs text-content-faint tracking-wide">
                      {stat.text.split(/\s+/).slice(1).join(' ')}
                    </span>
                  </span>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* ---- RIGHT: integrated portrait ---- */}
          <motion.div
            className="relative hidden lg:flex"
            initial="hidden"
            animate="visible"
            variants={revealImage}
          >
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:ml-auto lg:max-w-lg">
              {/* Monochrome, high-contrast portrait — integrated into the
                  composition rather than framed in a card. On mobile the
                  portrait is a full-width block (explicit width + aspect
                  ratio) so it actually renders; the absolute overlay needs a
                  sized parent, which a 0-width grid cell cannot provide. */}
              <motion.img
                src={heroImg}
                alt={`${heroData.name}, software & data engineer`}
                className="absolute inset-0 w-full h-full photo-frame"
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Tiny accent detail pinned to the portrait corner. */}
              <span
                className="absolute -bottom-3 -right-3 w-12 h-12 border border-accent/60"
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </div>
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