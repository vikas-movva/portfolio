/**
 * Contact section content (text only).
 *
 * Social icon names map to `socialIcons` in the Contact component. Keeping
 * icon names as strings keeps this file JSX-free for easy editing.
 */

export type ContactIconName = 'email' | 'linkedin' | 'github' | 'twitter'

export interface ContactInfo {
  email: string
  linkedin: string
  github: string
  twitter: string
  location: string
  availability: string
}

export const contactData: ContactInfo = {
  email: "vikas@example.com",
  linkedin: "https://linkedin.com/in/vikas",
  github: "https://github.com/vikas",
  twitter: "https://twitter.com/vikas",
  location: "San Francisco, CA",
  availability: "Open to opportunities",
}

export interface SocialLink {
  name: string
  /** Key into socialIcons in the Contact component. */
  icon: ContactIconName
  /** Built from email/href in the component via deriveSocialHref(). */
  source: 'email' | 'linkedin' | 'github' | 'twitter'
  description: string
}

export const socialLinks: SocialLink[] = [
  { name: "Email", icon: 'email', source: 'email', description: "Direct line for opportunities" },
  { name: "LinkedIn", icon: 'linkedin', source: 'linkedin', description: "Professional network & updates" },
  { name: "GitHub", icon: 'github', source: 'github', description: "Code & open source projects" },
  { name: "Twitter", icon: 'twitter', source: 'twitter', description: "Thoughts & tech discussions" },
]

/** Map a social source to its URL using contactData. */
export function deriveSocialHref(
  source: SocialLink['source'],
  data: ContactInfo,
): string {
  switch (source) {
    case 'email': return `mailto:${data.email}`
    case 'linkedin': return data.linkedin
    case 'github': return data.github
    case 'twitter': return data.twitter
  }
}

/** Subject options for the contact form <select>. */
export const contactSubjects = [
  { value: "job", label: "Job Opportunity" },
  { value: "freelance", label: "Freelance Project" },
  { value: "collaboration", label: "Collaboration" },
  { value: "question", label: "Technical Question" },
  { value: "other", label: "Other" },
]
