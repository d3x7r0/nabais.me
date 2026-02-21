import type { HorizontalMenuLinkProps } from '../../atom/HorizontalMenu'
import {
  HorizontalMenuLink,
  HorizontalNavMenuEntry,
} from '../../atom/HorizontalMenu'
import type {ReactNode} from "react";

export type SiteMenuEntryProps = Omit<HorizontalMenuLinkProps, 'href'> & {
  label: ReactNode,
  path: string
}

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
