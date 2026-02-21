import type { SiteFooterProps } from './components/organism/SiteFooter'
import type { MenuEntries } from './types'

import {
  SiGithub,
  SiInstagram,
  SiMastodon,
} from '@icons-pack/react-simple-icons'

import SiLinkedin from './components/atom/SiLinkedin'

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
  ABOUT: 'About Me',
  BLOG: 'Blog',
  COOKIE_POLICY: 'Cookie Policy',
  CV: 'CV',
  HOME: 'Home',
  NOT_FOUND: 'Page not Found',
  PHOTOS: 'Photos',
  SITE: 'Nabais.me',
}

export const TITLE_SEPARATOR = ' // '

export const PATHS = {
  ABOUT: '/about-me',
  BLOG: '/posts',
  BLOG_ARCHIVE: '/posts/archive',
  BLOG_TAGS: '/posts/tags',
  COOKIE_POLICY: '/cookie-policy',
  CV: '/cv',
  HOME: '/',
  PHOTOS: '/photos',
}

export const MENU_ENTRIES: MenuEntries = {
  // BLOG: {
  //   path: PATHS.BLOG,
  //   label: 'Blog',
  //
  //   entries: {
  //     HOME: {
  //       path: PATHS.BLOG,
  //       label: 'Blog',
  //     },
  //     BLOG_ARCHIVE: {
  //       path: PATHS.BLOG_ARCHIVE,
  //       label: 'Archive',
  //     },
  //     BLOG_TAGS: {
  //       path: PATHS.BLOG_TAGS,
  //       label: 'Tags',
  //     },
  //     NONSENSEBB: {
  //       path: 'https://blog.nonsensebb.com',
  //       label: 'NonsenseBB',
  //     },
  //   },
  // },

  ABOUT: {
    label: 'About me',
    path: PATHS.ABOUT,
  },

  BLOG: {
    label: 'Blog',
    path: 'https://blog.nonsensebb.com',
  },

  CV: {
    label: 'CV',
    path: PATHS.CV,
  },

  PHOTOS: {
    label: 'Photography',
    path: PATHS.PHOTOS,
  },
}

export const SOCIAL_LINKS: SiteFooterProps['entries'] = [
  {
    href: 'https://mastodon.social/@d3x7r0',
    IconComponent: SiMastodon,
    id: 'mastodon',
    label: 'Mastodon',
    rel: 'me',
  },
  {
    href: 'https://www.instagram.com/d3x7r0/',
    IconComponent: SiInstagram,
    id: 'instagram',
    label: 'Instagram',
    rel: 'me',
  },
  {
    href: 'https://www.linkedin.com/in/luismiguelnabais',
    IconComponent: SiLinkedin,
    id: 'linkedin',
    label: 'LinkedIn',
    rel: 'me',
  },
  {
    href: 'https://github.com/d3x7r0/',
    IconComponent: SiGithub,
    id: 'github',
    label: 'Github',
  },
]

export const ENABLE_TRANSFORMED_IMAGES = import.meta.env?.PUBLIC_ENABLE_TRANSFORMED_IMAGES !== 'false'
