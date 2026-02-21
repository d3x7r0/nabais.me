import type { HorizontalMenuLinkProps } from '../../atom/HorizontalMenu'
import type { ReactNode } from 'react'

import {
  HorizontalMenuLink,
  HorizontalNavMenuEntry,
} from '../../atom/HorizontalMenu'

export type SiteMenuEntryProps = {
  label: ReactNode
  path: string
} & Omit<HorizontalMenuLinkProps, 'href'>

function SiteMenuEntry(props: SiteMenuEntryProps) {
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
