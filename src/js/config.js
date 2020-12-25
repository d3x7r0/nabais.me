import { GitHub, Instagram, Linkedin, Twitter } from 'react-feather'

export const SITE_DESCRIPTION = 'Personal homepage of Luís Nabais, professional Web Software Engineer'

export const SITE_KEYWORDS = [
  'Luis',
  'Nabais',
  'Miguel',
  'Web',
  'Design',
  'Development',
  'Portugal',
  'Lisboa',
  'Lisbon',
  'js',
  'Software Development',
  'Engineering',
  'Ireland',
  'Dublin',
  'photography',
]

export const TITLES = {
  SITE: 'Nabais.me',
  HOME: 'Home',
  CV: 'CV',
  COOKIE_POLICY: 'Cookie Policy',
  ABOUT: 'About Me',
  CONTACTS: 'Contacts',
  PHOTOS: 'Photos',
  NOT_FOUND: 'Page not Found',
}

export const TITLE_SEPARATOR = ' // '

export const PATHS = {
  HOME: '/',
  ABOUT: '/about-me',
  CONTACTS: '/contacts',
  PHOTOS: '/photos',
  CV: '/cv',
  COOKIE_POLICY: '/cookie-policy',
}

export const MENU_ENTRIES = [
  {
    path: PATHS.ABOUT,
    label: 'About me',
    internal: true,
  },
  {
    path: PATHS.CV,
    label: 'CV',
    internal: true,
  },
  {
    path: PATHS.CONTACTS,
    label: 'Contacts',
    internal: true,
  },
  {
    path: PATHS.PHOTOS,
    label: 'Photography',
    internal: true,
  },
  {
    path: 'https://blog.nonsensebb.com',
    label: 'Blog',
  },
]

export const SOCIAL_LINKS = [
  {
    id: 'twitter',
    href: 'https://twitter.com/d3x7r0',
    IconComponent: Twitter,
    label: 'Twitter',
  },
  {
    id: 'instagram',
    href: 'https://www.instagram.com/d3x7r0/',
    IconComponent: Instagram,
    label: 'Instagram',
  },
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/in/luismiguelnabais',
    IconComponent: Linkedin,
    label: 'LinkedIn',
  },
  {
    id: 'github',
    href: 'https://github.com/d3x7r0/',
    IconComponent: GitHub,
    label: 'Github',
  },
]


export const ANALYTICS_ID = process.env.NEXT_PUBLIC_GA_ID || 'none'

export const ANALYTICS_OPTS = {
  debug: false,
}

export const ENABLE_TRANSFORMED_IMAGES = process.env.NEXT_PUBLIC_ENABLE_TRANSFORMED_IMAGES !== 'false'

export const CONTACT_FORM_URL = process.env.NEXT_PUBLIC_CONTACT_FORM_URL || ""
