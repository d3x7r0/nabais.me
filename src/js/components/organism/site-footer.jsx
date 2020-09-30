import { IconLink, SIDE_LEFT, VerticalList, VerticalListEntry } from '@nonsensebb/components'

import { SOCIAL_LINKS } from '../../config'
import styles from '../../../css/03_organism/site-footer.module.scss'

const SiteFooter = () => (
  <VerticalList grid noMargin className={styles['o-site-footer']}>
    {SOCIAL_LINKS.map(({ id, label, ...props }) => (
      <VerticalListEntry key={id}>
        <IconLink {...props} side={SIDE_LEFT}>{label}</IconLink>
      </VerticalListEntry>
    ))}
  </VerticalList>
)

export default SiteFooter
