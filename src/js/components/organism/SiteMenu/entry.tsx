import type { FunctionalComponent } from 'preact'

import type { HorizontalMenuLinkProps } from '../../atom/HorizontalMenu'
import {
  HorizontalMenuLink,
  HorizontalNavMenuEntry,
} from '../../atom/HorizontalMenu'

export type SiteMenuEntryProps = Omit<HorizontalMenuLinkProps, 'href'> & {
  label: string
  path: string
}

const SiteMenuEntry: FunctionalComponent<SiteMenuEntryProps> = function SiteMenuEntry(props) {
  const {
    label,
    path,
    ...rest
  } = props

  return (
    <HorizontalNavMenuEntry>
      <HorizontalMenuLink
        href={path}
        {...rest}
      >
        {label}
      </HorizontalMenuLink>
    </HorizontalNavMenuEntry>
  )
}

export default SiteMenuEntry
