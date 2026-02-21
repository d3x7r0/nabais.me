import type { CSSProperties, JSX, ReactNode } from 'react'

import { clsx } from 'clsx'

import { SIDE } from '../../../constants'
import { useAltDominantColor } from '../../../hooks/color'

import styles from './index.module.scss'

export type IconTextProps = {
  children?: ReactNode
  className?: string
  iconColor?: string
  IconComponent?: JSX.ElementType
  side?: SIDE
  style?: CSSProperties
}

function IconText(props: IconTextProps) {
  const {
    children,
    className,
    iconColor,
    IconComponent,
    side = SIDE.RIGHT,
    style,
    ...rest
  } = props

  const computedStyle = useAltDominantColor(iconColor, style)

  const icon = IconComponent
    ? (
        <IconComponent className={styles['a-icon-text__icon']} role="img" />
      )
    : null

  const hasLeftIcon = side === SIDE.LEFT

  return (
    <span
      {...rest}
      className={clsx(className, styles['a-icon-text'])}
      style={computedStyle}
    >
      {hasLeftIcon ? icon : null}
      {' '}
      {children}
      {' '}
      {hasLeftIcon ? null : icon}
    </span>
  )
}

export default IconText
