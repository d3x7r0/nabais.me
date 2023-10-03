import type { FunctionalComponent } from 'preact'
import { useMemo } from 'preact/hooks'

import type { HorizontalNavMenuProps } from '../../atom/HorizontalMenu'
import { HorizontalNavMenu } from '../../atom/HorizontalMenu'
import type { MenuEntries } from '../../../types'

import { transformEntries } from './utils'
import SiteMenuEntry from './entry'

export type SiteMenuProps = Omit<HorizontalNavMenuProps, 'scroll'> & {
  pathname?: string
  entries: MenuEntries
}

const SiteMenu: FunctionalComponent<SiteMenuProps> = function SiteMenu(props) {
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
            rel="prefetch"
            {...entry}
          />
        ),
      )}
    </HorizontalNavMenu>
  )
}

export default SiteMenu
