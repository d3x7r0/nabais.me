// noinspection ES6UnusedImports
// eslint-disable-next-line no-unused-vars
import { h } from 'preact'

import { useRoute } from '../../../router/match'
import {
  HorizontalMenuLink,
  HorizontalNavMenu,
  HorizontalNavMenuEntry,
} from '../../atom/HorizontalMenu'

function SiteMenu(props) {
  const { entries = [], ...rest } = props

  return (
    <HorizontalNavMenu
      scroll
      {...rest}
    >
      {entries.map(
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
  const { label, path, ...rest } = props

  const { matches } = useRoute(path)

  return (
    <HorizontalNavMenuEntry>
      <HorizontalMenuLink
        active={matches}
        href={path}
        {...rest}
      >
        {label}
      </HorizontalMenuLink>
    </HorizontalNavMenuEntry>
  )
}

export default SiteMenu
