/** @jsx h */
import { h } from 'preact'

import { HorizontalMenu, HorizontalMenuLink } from '../atom/horizontal-menu'
import { useRoute } from '../router/match'

function SiteMenu(props) {
  const { entries = [], ...rest } = props

  return (
    <HorizontalMenu {...rest}>
      {entries.map(
        (entry) => (
          <SiteMenuEntry
            key={entry.path}
            {...entry}
          />
        ),
      )}
    </HorizontalMenu>
  )
}

function SiteMenuEntry(props) {
  const { label, path, ...rest } = props

  const { matches } = useRoute(path)

  return (
    <HorizontalMenuLink
      active={matches}
      href={path}
      {...rest}
    >
      {label}
    </HorizontalMenuLink>
  )
}

export default SiteMenu
