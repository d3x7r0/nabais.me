// noinspection ES6UnusedImports
// eslint-disable-next-line no-unused-vars
import { h } from 'preact'
import classNames from 'clsx'
import PropTypes from 'prop-types'

import { SIDE_LEFT, SIDE_RIGHT } from '../../../constants'
import { useAltDominantColor } from '../../../hooks'

import styles from './index.module.scss'

function IconLink(props) {
  const {
    className,
    style,
    iconColor,
    IconComponent,
    side = SIDE_RIGHT,
    children,
    ...rest
  } = props

  const computedStyle = useAltDominantColor(iconColor, style)

  const icon = IconComponent ? (
    <IconComponent role="img" className={styles['a-icon-link__icon']} />
  ) : null

  const hasLeftIcon = side === SIDE_LEFT

  return (
    <a
      {...rest}
      style={computedStyle}
      className={buildClassNames({
        className,
      })}
    >
      {hasLeftIcon ? icon : null} {children} {hasLeftIcon ? null : icon}
    </a>
  )
}

IconLink.propTypes = {
  iconColor: PropTypes.string,
  side: PropTypes.oneOf([SIDE_LEFT, SIDE_RIGHT]),
  IconComponent: PropTypes.elementType,
  className: PropTypes.string,
  style: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
}

function buildClassNames({ className }) {
  return classNames(className, styles['a-icon-link'])
}

export default IconLink
