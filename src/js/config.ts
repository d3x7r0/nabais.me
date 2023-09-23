import {
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiTwitter,
  SiMastodon,
} from '@icons-pack/react-simple-icons'

import type { MenuEntries } from './types.ts'

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
  PHOTOS: 'Photos',
  NOT_FOUND: 'Page not Found',
}

export const TITLE_SEPARATOR = ' // '

export const PATHS = {
  HOME: '/',
  ABOUT: '/about-me',
  PHOTOS: '/photos',
  CV: '/cv',
  COOKIE_POLICY: '/cookie-policy',
  BLOG: '/posts',
  BLOG_ARCHIVE: '/posts/archive',
  BLOG_TAGS: '/posts/tags',
}

export const MENU_ENTRIES: MenuEntries = {
  ABOUT: {
    path: PATHS.ABOUT,
    label: 'About me',
  },
  CV: {
    path: PATHS.CV,
    label: 'CV',
  },
  PHOTOS: {
    path: PATHS.PHOTOS,
    label: 'Photography',
  },
  BLOG: {
    path: PATHS.BLOG,
    label: 'Blog',

    entries: {
      HOME: {
        path: PATHS.BLOG,
        label: 'Posts',
      },
      BLOG_ARCHIVE: {
        path: PATHS.BLOG_ARCHIVE,
        label: 'Archive',
      },
      BLOG_TAGS: {
        path: PATHS.BLOG_TAGS,
        label: 'Tags',
      },
      NONSENSEBB: {
        path: "https://blog.nonsensebb.com",
        label: 'NonsenseBB'
      }
    },
  },
}

export const SOCIAL_LINKS = [
  {
    id: 'twitter',
    href: 'https://twitter.com/d3x7r0',
    IconComponent: SiTwitter,
    label: 'Twitter',
    rel: 'me',
  },
  {
    id: 'mastodon',
    href: 'https://mastodon.social/@d3x7r0',
    IconComponent: SiMastodon,
    label: 'Mastodon',
    rel: 'me',
  },
  {
    id: 'instagram',
    href: 'https://www.instagram.com/d3x7r0/',
    IconComponent: SiInstagram,
    label: 'Instagram',
    rel: 'me',
  },
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/in/luismiguelnabais',
    IconComponent: SiLinkedin,
    label: 'LinkedIn',
    rel: 'me',
  },
  {
    id: 'github',
    href: 'https://github.com/d3x7r0/',
    IconComponent: SiGithub,
    label: 'Github',
  },
]


export const ENABLE_TRANSFORMED_IMAGES = import.meta.env?.PUBLIC_ENABLE_TRANSFORMED_IMAGES !== 'false'