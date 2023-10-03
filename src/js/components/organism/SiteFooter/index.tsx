import type { ComponentChild, FunctionalComponent } from 'preact'

import VerticalList, { VerticalListEntry } from '../../molecule/VerticalList'
import type { IconLinkProps } from '../../atom/IconLink'
import IconLink from '../../atom/IconLink'
import { SIDE } from '../../../constants'

import styles from './index.module.scss'

export type SiteFooterProps = {
  entries: Array<IconLinkProps & {
    id: string
    label: ComponentChild
  }>
}

const SiteFooter: FunctionalComponent<SiteFooterProps> = function SiteFooter(props) {
  const  { entries = [] } = props

  return (
    <VerticalList
      grid
      noMargin
      gridWidthLarge={Math.max(entries.length, 5)}
      className={styles['o-site-footer']}
    >
      {entries.map(({ id, label, ...props }) => (
        <VerticalListEntry key={id}>
          <IconLink {...props} side={SIDE.LEFT}>{label}</IconLink>
        </VerticalListEntry>
      ))}
    </VerticalList>
  )
}

export default SiteFooter
