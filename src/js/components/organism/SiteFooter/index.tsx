import type { IconLinkProps } from '../../atom/IconLink'
import type { ReactNode } from 'react'

import { SIDE } from '../../../constants'
import IconLink from '../../atom/IconLink'
import { VerticalList, VerticalListEntry } from '../../molecule/VerticalList'

import styles from './index.module.scss'

export type SiteFooterProps = {
  entries: Array<{
    id: string
    label: ReactNode
  } & IconLinkProps>
}

function SiteFooter(props: SiteFooterProps) {
  const { entries = [] } = props

  return (
    <VerticalList
      className={styles['o-site-footer']}
      grid
      gridWidthLarge={Math.max(entries.length, 5)}
      noMargin
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
