import type { FunctionalComponent, JSX } from 'preact'
import clsx from 'clsx'

import { useAltDominantColor } from '../../../hooks'
import { SIDE } from '../../../constants'

import styles from './index.module.scss'

export type IconLinkProps = JSX.IntrinsicElements['a'] & {
  iconColor?: string
  side?: SIDE
  IconComponent?: JSX.ElementType
}

const IconLink: FunctionalComponent<IconLinkProps> = function IconLink(props) {
  const {
    className,
    style,
    iconColor,
    IconComponent,
    side = SIDE.RIGHT,
    children,
    ...rest
  } = props

  const computedStyle = useAltDominantColor(iconColor, style)

  const icon = IconComponent ? (
    <IconComponent role="img" className={styles['a-icon-link__icon']} />
  ) : null

  const hasLeftIcon = side === SIDE.LEFT

  return (
    <a
      {...rest}
      style={computedStyle}
      className={clsx(className, styles['a-icon-link'])}
    >
      {hasLeftIcon ? icon : null} {children} {hasLeftIcon ? null : icon}
    </a>
  )
}

export default IconLink
