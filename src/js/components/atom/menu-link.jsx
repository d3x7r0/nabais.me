/** @jsx h */
import { h } from 'preact'
import classNames from 'classnames'

import LinkWrapper from '../router/link'
import styles from '../../../css/01_atom/menu-link.module.scss'

const MenuLink = ({ active = false, className, children, href, ...rest }) => (
  <LinkWrapper
    href={href}
    className={classNames(
      className,
      styles['a-menu-link'],
      { [styles['a-menu-link--active']]: active },
    )}
    {...rest}
  >
    {children}
  </LinkWrapper>
)

export default MenuLink
