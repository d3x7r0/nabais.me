import type {ComponentProps, JSX} from "react";
import clsx from 'clsx'

import { SIDE } from '../../../constants'
import { useAltDominantColor } from '../../../hooks/color'

import styles from './index.module.scss'

export type IconLinkProps = ComponentProps<'a'> & {
  iconColor?: string
  side?: SIDE
  IconComponent?: JSX.ElementType
}

function IconLink(props: IconLinkProps) {
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
