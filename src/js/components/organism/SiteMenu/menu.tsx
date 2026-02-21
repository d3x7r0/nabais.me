import type { MenuEntries } from '../../../types'
import type { HorizontalNavMenuProps } from '../../atom/HorizontalMenu'

import { useMemo } from 'react'

import { HorizontalNavMenu } from '../../atom/HorizontalMenu'

import SiteMenuEntry from './entry'
import { transformEntries } from './utils'

export type SiteMenuProps = {
  entries: MenuEntries
  pathname?: string
} & Omit<HorizontalNavMenuProps, 'scroll'>

function SiteMenu(props: SiteMenuProps) {
  const {
    entries,
    pathname,
    ...rest
  } = props

  const effectiveEntries = useMemo(() => {
    const menuEntries = transformEntries(entries, pathname)

    const active = menuEntries?.find(e => e.active)

    return active?.entries ?? menuEntries ?? []
  }, [entries, pathname])

  return (
    <HorizontalNavMenu
      scroll
      {...rest}
    >
      {effectiveEntries.map(
        entry => (
          <SiteMenuEntry
            data-astro-prefetch="hover"
            key={entry.path}
            {...entry}
          />
        ),
      )}
    </HorizontalNavMenu>
  )
}

export default SiteMenu
