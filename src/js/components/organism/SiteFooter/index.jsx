// noinspection ES6UnusedImports
// eslint-disable-next-line no-unused-vars
import { h } from 'preact'


import { SOCIAL_LINKS } from '../../../config'
import VerticalList, { VerticalListEntry } from '../../molecule/VerticalList'
import IconLink from '../../atom/IconLink'
import { SIDE_LEFT } from '../../../constants'

import styles from './index.module.scss'

const SiteFooter = () => (
  <VerticalList
    grid
    noMargin
    gridWidthLarge={Math.max(SOCIAL_LINKS.length, 5)}
    className={styles['o-site-footer']}
  >
    {SOCIAL_LINKS.map(({ id, label, ...props }) => (
      <VerticalListEntry key={id}>
        <IconLink {...props} side={SIDE_LEFT}>{label}</IconLink>
      </VerticalListEntry>
    ))}
  </VerticalList>
)

export default SiteFooter
