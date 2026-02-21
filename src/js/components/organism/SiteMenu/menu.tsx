import { useMemo } from 'react'

import type { HorizontalNavMenuProps } from '../../atom/HorizontalMenu'
import { HorizontalNavMenu } from '../../atom/HorizontalMenu'
import type { MenuEntries } from '../../../types'

import { transformEntries } from './utils'
import SiteMenuEntry from './entry'

export type SiteMenuProps = Omit<HorizontalNavMenuProps, 'scroll'> & {
  pathname?: string
  entries: MenuEntries
}

function SiteMenu(props: SiteMenuProps) {
  const {
    pathname,
    entries,
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
        (entry) => (
          <SiteMenuEntry
            key={entry.path}
            data-astro-prefetch="hover"
            {...entry}
          />
        ),
      )}
    </HorizontalNavMenu>
  )
}

export default SiteMenu
