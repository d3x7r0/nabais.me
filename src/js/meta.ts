import { TITLE_SEPARATOR, TITLES } from './config'

export function buildTitle(...parts: Array<number | string | null | undefined>): string {
  return parts
    .concat(TITLES.SITE)
    .filter(item => !!item)
    .join(TITLE_SEPARATOR)
}
