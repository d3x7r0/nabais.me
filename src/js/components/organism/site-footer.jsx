/** @jsx h */
import { h } from 'preact'

import { SOCIAL_LINKS } from '../../config'
import IconLink from '../atom/icon-link'
import VerticalList from '../molecule/vertical-list'
import styles from '../../../css/03_organism/site-footer.module.scss'

const SiteFooter = () => (
  <VerticalList grid noMargin className={styles['o-site-footer']}>
    {SOCIAL_LINKS.map(({ id, label, ...props }) => (
      <IconLink {...props} left key={id}>{label}</IconLink>
    ))}
  </VerticalList>
)

export default SiteFooter
