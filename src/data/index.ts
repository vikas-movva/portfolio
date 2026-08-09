/** Barrel re-export so components import from a single 'data' module. */
export { aboutData } from './about'
export type { AboutData, AboutEducation, AboutHighlight } from './about'
export { projectsData } from './projects'
export type { Project, ProjectLink } from './projects'
export { experienceData } from './experience'
export type { ExperienceEntry } from './experience'
export { skillsCategories, exploringSkills } from './skills'
export type { Skill, SkillCategory, SkillIconName } from './skills'
export {
  contactData,
  socialLinks,
  deriveSocialHref,
  contactSubjects,
} from './contact'
export type { ContactInfo, SocialLink, ContactIconName } from './contact'
export { heroData } from './hero'
export type { HeroStat } from './hero'
export { navLinks, sectionIds, brandName } from './nav'
export type { NavLink } from './nav'
