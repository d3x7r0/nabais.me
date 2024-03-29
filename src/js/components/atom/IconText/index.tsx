import type { FunctionalComponent, JSX } from 'preact'
import clsx from 'clsx'

import { SIDE } from '../../../constants'
import { useAltDominantColor } from '../../../hooks/color'

import styles from './index.module.scss'

export type IconTextProps = {
  iconColor?: string,
  side?: SIDE
  IconComponent?: JSX.ElementType
  className?: JSX.HTMLAttributes['className']
  style?: JSX.HTMLAttributes['style']
}

const IconText: FunctionalComponent<IconTextProps> = function IconText(props) {
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
    <IconComponent role="img" className={styles['a-icon-text__icon']} />
  ) : null

  const hasLeftIcon = side === SIDE.LEFT

  return (
    <span
      {...rest}
      style={computedStyle}
      className={clsx(className, styles['a-icon-text'])}
    >
      {hasLeftIcon ? icon : null} {children} {hasLeftIcon ? null : icon}
    </span>
  )
}

export default IconText
