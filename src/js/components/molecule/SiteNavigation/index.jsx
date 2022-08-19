// noinspection ES6UnusedImports
// eslint-disable-next-line no-unused-vars
import { h } from 'preact'
import classNames from 'classnames'

import styles from './index.module.scss'

const SiteNavigation = ({ className, children }) => (
  <nav role="navigation" className={classNames(className, styles['m-site-navigation'])}>
    {children}
  </nav>
)

export default SiteNavigation
