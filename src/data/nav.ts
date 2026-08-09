/**
 * Header navigation links.
 *
 * `href` must match the `id` of a section in App.tsx (prefixed with `#`).
 * The order here is the order shown in the nav bar and mobile menu.
 */

export interface NavLink {
  href: string
  label: string
}

export const navLinks: NavLink[] = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

/** Section ids used for the scroll-spy. Keep in sync with navLinks hrefs. */
export const sectionIds = navLinks.map((l) => l.href.replace('#', ''))

/** Brand text shown top-left of the header. */
export const brandName = 'VIKAS MOVVA'
