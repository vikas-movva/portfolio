/**
 * Hero / heading section text.
 *
 * Edit your name, tagline, intro paragraph, and the quick-stats row here.
 * The Hero component reads from this file.
 */

export interface HeroStat {
  icon: "clock" | "projects" | "stack";
  text: string;
}

export const heroData = {
  /** Badge text above the headline. */
  badge: "Software Engineer • Data Engineer • ML Enthusiast",
  /** Headline — split into the white part and the coloured part. */
  headlinePrefix: "Hi, I'm",
  name: "Vikas",
  /** Sub-paragraph under the headline. */
  intro:
    "Building scalable data pipelines, intelligent systems, and clean web applications. Passionate about turning complex data into actionable insights.",
  /** Primary CTA button text. */
  primaryCta: "View Projects",
  /** Secondary CTA button text. */
  secondaryCta: "Get In Touch",
  /** Decorative "Code & Data" text inside the circular animation. */
  visualText: "Code & Data",
  /** Quick stats row under the buttons. */
  stats: [
    { icon: "clock" as const, text: "2+ Years Experience" },
    { icon: "stack" as const, text: "10+ Technologies" },
  ] satisfies HeroStat[],
};
