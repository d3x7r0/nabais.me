import { TITLE_SEPARATOR, TITLES } from './config'

export function buildTitle(...parts: Array<string | number | undefined | null>): string {
  return parts
    .concat(TITLES.SITE)
    .filter(item => !!item)
    .join(TITLE_SEPARATOR)
}
