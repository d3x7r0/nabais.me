// noinspection ES6UnusedImports
// eslint-disable-next-line no-unused-vars
import { h } from 'preact'
import { useMemo } from 'preact/hooks'

import {
  HorizontalMenuLink,
  HorizontalNavMenu,
  HorizontalNavMenuEntry,
} from '../../atom/HorizontalMenu'
import { matchesRoute } from '../../../router/match'

function SiteMenu(props) {
  const {
    pathname,
    entries,
    ...rest
  } = props

  const effectiveEntries = useMemo(() => {
    const menuEntries = transformEntries(entries, pathname)

    const active = menuEntries.find(e => e.active)

    return active?.entries ?? menuEntries
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

function SiteMenuEntry(props) {
  const {
    label,
    path,
    active,
    ...rest
  } = props

  return (
    <HorizontalNavMenuEntry>
      <HorizontalMenuLink
        active={active}
        href={path}
        {...rest}
      >
        {label}
      </HorizontalMenuLink>
    </HorizontalNavMenuEntry>
  )
}

function transformEntries(entries, pathname, d = 0) {
  if (d > 10) {
    throw new Error('Excessive depth in menu entries')
  }

  if (!entries) {
    return
  }

  return Object.values(entries).map(entry => {
    const { entries, ...rest } = entry

    const mapped = {
      ...rest,
      active: matchesRoute(entry.path, pathname).matches,
    }

    if (entries) {
      mapped.entries = transformEntries(entries, pathname, d + 1)
    }

    return mapped
  })
}

export default SiteMenu
