import type { ComponentChild, FunctionalComponent } from 'preact'

import type { HorizontalMenuLinkProps } from '../../atom/HorizontalMenu'
import HorizontalMenuLink from '../../atom/HorizontalMenu/link'
import { HorizontalNavMenuEntry } from '../../atom/HorizontalMenu/entry'

export type SiteMenuEntryProps = Omit<HorizontalMenuLinkProps, 'href'> & {
  label: ComponentChild,
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
