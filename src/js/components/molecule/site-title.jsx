/** @jsx h*/
import { h } from 'preact'
import classNames from 'classnames'

import LinkWrapper from '../router/link'
import { PATHS, TITLES } from '../../config'
import styles from '../../../css/02_molecule/site-title.module.scss'

const SiteTitle = ({ className, ...rest }) => (
  <h1
    {...rest}
    className={classNames(className, styles['m-site-title'])}
  >
    <LinkWrapper
      className={styles['m-site-title__text']}
      href={PATHS.HOME}
      title={TITLES.SITE}
      internal
    >
      {TITLES.SITE}
    </LinkWrapper>
  </h1>
)

export default SiteTitle
