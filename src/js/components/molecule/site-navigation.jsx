/** @jsx h */
import { h } from 'preact'
import classNames from 'classnames'

import styles from '../../../css/02_molecule/site-navigation.module.scss'

const SiteNavigation = ({ className, children }) => (
  <nav role="navigation" className={classNames(className, styles['m-site-navigation'])}>
    {children}
  </nav>
)

export default SiteNavigation
