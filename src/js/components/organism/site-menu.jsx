/** @jsx h */
import { h } from 'preact'
import {
  HorizontalNavMenu,
  HorizontalNavMenuEntry,
  HorizontalMenuLink,
} from '@nonsensebb/components'

import { useRoute } from '../router/match'

function SiteMenu(props) {
  const { entries = [], ...rest } = props

  return (
    <HorizontalNavMenu {...rest}>
      {entries.map(
        (entry) => (
          <SiteMenuEntry
            key={entry.path}
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
