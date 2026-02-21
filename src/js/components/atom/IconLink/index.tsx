import type { ComponentProps, JSX } from 'react'

import { clsx } from 'clsx'

import { SIDE } from '../../../constants'
import { useAltDominantColor } from '../../../hooks/color'

import styles from './index.module.scss'

export type IconLinkProps = {
  iconColor?: string
  IconComponent?: JSX.ElementType
  side?: SIDE
} & ComponentProps<'a'>

function IconLink(props: IconLinkProps) {
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
        <IconComponent className={styles['a-icon-link__icon']} role="img" />
      )
    : null

  const hasLeftIcon = side === SIDE.LEFT

  return (
    <a
      {...rest}
      className={clsx(className, styles['a-icon-link'])}
      style={computedStyle}
    >
      {hasLeftIcon ? icon : null}
      {' '}
      {children}
      {' '}
      {hasLeftIcon ? null : icon}
    </a>
  )
}

export default IconLink
