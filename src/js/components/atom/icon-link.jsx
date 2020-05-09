/** @jsx h */
import { h, toChildArray } from 'preact'
import classNames from 'classnames'

import LinkWrapper from '../router/link'
import styles from '../../../css/01_atom/icon-link.module.scss'

const IconLink = ({ className, IconComponent, left = false, children, ...rest }) => {
  children = toChildArray(children)

  const icon = IconComponent && (
    <IconComponent role="img" className={styles['a-icon-link__icon']} />
  )

  return (
    <LinkWrapper className={classNames(className, styles['a-icon-link'])} {...rest}>
      {left ? icon : null} {children} {!left ? icon : null}
    </LinkWrapper>
  )
}

export default IconLink
