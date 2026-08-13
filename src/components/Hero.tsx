import { motion } from "framer-motion";
import { heroData } from "../data";
import { useThemeColor, hexToRgba } from "../theme/useThemeColor";
import vikasImg from "../assets/Vikas.jpg";

/** Clock icon used for the "Years Experience" quick stat. */
const statIcons = {
  clock: (
    <svg
      className="w-4 h-4 text-primary"
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
        clipRule="evenodd"
      />
    </svg>
  ),
  projects: (
    <svg
      className="w-4 h-4 text-primary"
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
        clipRule="evenodd"
      />
    </svg>
  ),
  stack: (
    <svg
      className="w-4 h-4 text-primary"
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
        clipRule="evenodd"
      />
    </svg>
  ),
} as const;

/**
 * Icon paths (Heroicons-style, 24x24 viewBox) for the orbiting "planetary"
 * badges that circle the hero photo. Two concentric rings, each rotating in
 * opposite directions for a solar-system feel.
 */
const orbitIconPaths = [
  "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", // code
  "M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z M4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3", // database
  "M5 19a4 4 0 010-8 5 5 0 019.6-1.5A4.5 4.5 0 0118 19H5z", // cloud
  "M3 3v18h18 M7 14l4-4 3 3 5-6", // chart
  "M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z", // shield
  "M9 15l-3 3 3-1 1-3z M12 3c3 0 6 3 6 7 0 2-1 4-2 5l-3 7-3-7c-1-1-2-3-2-5 0-4 3-7 6-7z", // rocket
];

const orbitRings = [
  {
    radius: 300,
    duration: 18,
    reverse: false,
    paths: orbitIconPaths.slice(0, 3),
  },
  {
    radius: 360,
    duration: 30,
    reverse: true,
    paths: orbitIconPaths.slice(3, 6),
  },
];

/** A single orbiting tech badge (circular chip with an icon). */
function OrbitBadge({ path }: { path: string }) {
  return (
    <div className="w-12 h-12 rounded-full bg-dark/70 border border-primary/40 flex items-center justify-center shadow-lg shadow-primary/10 backdrop-blur-sm">
      <svg
        className="w-6 h-6 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
      </svg>
    </div>
  );
}

/**
 * A ring that spins like an orbit, carrying evenly-spaced badges. The ring
 * itself rotates; each badge is counter-rotated so its icon stays upright.
 * Badges are positioned on a circle of `radius` px around the center.
 */
function OrbitRing({
  radius,
  duration,
  reverse,
  paths,
}: {
  radius: number;
  duration: number;
  reverse: boolean;
  paths: string[];
}) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{ width: 0, height: 0 }}
      animate={{ rotate: reverse ? [0, -360] : [0, 360] }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      aria-hidden="true"
    >
      {paths.map((path, i) => {
        const angle = (360 / paths.length) * i;
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: x,
              top: y,
              marginLeft: -24,
              marginTop: -24,
            }}
            animate={{ rotate: reverse ? [0, 360] : [0, -360] }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
          >
            <OrbitBadge path={path} />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Theme-aware colour for the animated SVG strokes and the accent borders.
  const primary = useThemeColor("primary");
  const primaryHex = primary ?? "#00d4ff";
  const borderColorFrames = [
    hexToRgba(primaryHex, 0.3) || "rgba(0, 212, 255, 0.3)",
    hexToRgba(primaryHex, 0.6) || "rgba(0, 212, 255, 0.6)",
    hexToRgba(primaryHex, 0.3) || "rgba(0, 212, 255, 0.3)",
  ];

  const variants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
      },
    },
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden scroll-mt-20"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 5,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          className="text-center lg:text-left"
          variants={variants.container}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={variants.item}
            className="inline-block px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20"
          >
            {heroData.badge}
          </motion.span>

          <motion.h1
            id="hero-title"
            variants={variants.item}
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            <span className="text-white">{heroData.headlinePrefix} </span>
            <br />
            <span className="text-primary">{heroData.name}</span>
          </motion.h1>

          <motion.p
            variants={variants.item}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            {heroData.intro}
          </motion.p>

          <motion.div
            variants={variants.item}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <motion.button
              onClick={() => scrollToSection("#projects")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-xl bg-primary text-dark font-semibold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark"
            >
              {heroData.primaryCta}
            </motion.button>
            <motion.button
              onClick={() => scrollToSection("#contact")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-xl bg-transparent border-2 border-primary/50 text-primary font-semibold text-lg hover:bg-primary/10 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark"
            >
              {heroData.secondaryCta}
            </motion.button>
          </motion.div>

          <motion.div
            variants={variants.item}
            className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12"
          >
            {heroData.stats.map((stat) =>
              stat.highlight ? (
                <span
                  key={stat.text}
                  className="flex items-center gap-2.5 px-6 py-3 bg-primary/15 text-primary font-bold text-base md:text-lg border-primary/40 shadow-lg shadow-primary/10"
                >
                  {statIcons[stat.icon]}
                  {stat.text}
                </span>
              ) : (
                <span key={stat.text} className="flex items-center gap-2">
                  {statIcons[stat.icon]}
                  {stat.text}
                </span>
              ),
            )}
          </motion.div>

          <motion.div
            variants={variants.item}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-6"
          >
            {heroData.topTech.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-lg bg-dark/60 border border-primary/30 text-primary text-base md:text-lg font-semibold hover:bg-primary/10 transition-colors"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <div className="relative z-10">
            <div className="aspect-square max-w-xl mx-auto relative">
              <motion.svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 400 400"
                aria-hidden="true"
              >
                <defs>
                  <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
                    <stop
                      offset="0%"
                      stopColor={primaryHex}
                      stopOpacity="0.3"
                    />
                    <stop
                      offset="100%"
                      stopColor={primaryHex}
                      stopOpacity="0"
                    />
                  </radialGradient>
                </defs>
                <motion.circle
                  cx="200"
                  cy="200"
                  r="180"
                  fill="url(#gradient)"
                  animate={{ r: [180, 200, 180] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.circle
                  cx="200"
                  cy="200"
                  r="140"
                  stroke={primaryHex}
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="10, 10"
                  animate={{ rotate: [0, 360], strokeDashoffset: [0, -20] }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.circle
                  cx="200"
                  cy="200"
                  r="100"
                  stroke={primaryHex}
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5, 15"
                  animate={{ rotate: [360, 0], strokeDashoffset: [0, 20] }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[512px] h-[512px]">
                  {orbitRings.map((ring, i) => (
                    <OrbitRing key={i} {...ring} />
                  ))}

                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-primary/30"
                    animate={{
                      scale: [1, 1.05, 1],
                      borderColor: borderColorFrames,
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute inset-4 rounded-full border-2 border-primary/20"
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <div className="absolute inset-6 flex items-center justify-center">
                    <motion.div
                      className="w-full h-full rounded-full overflow-hidden border-2 border-primary/40 shadow-xl shadow-primary/20"
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.6,
                        ease: "easeOut",
                      }}
                      whileHover={{ scale: 1.04 }}
                    >
                      <motion.img
                        src={vikasImg}
                        alt={`${heroData.name}, ${heroData.badge}`}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.15 }}
                        animate={{ scale: 1 }}
                        transition={{
                          duration: 1,
                          delay: 0.6,
                          ease: "easeOut",
                        }}
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            className="absolute -bottom-8 -right-8 w-32 h-32 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center"
            animate={{ rotate: [0, 2, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              className="w-12 h-12 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </motion.div>

          <motion.div
            className="absolute -top-8 -left-8 w-24 h-24 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <svg
              className="w-10 h-10 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: 1.5,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      >
        <svg
          className="w-6 h-6 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
}
