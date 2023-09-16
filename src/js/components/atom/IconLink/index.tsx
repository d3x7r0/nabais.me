import type { FunctionalComponent, JSX } from 'preact'
import clsx from 'clsx'

import { SIDE_LEFT, SIDE_RIGHT } from '../../../constants'
import { useAltDominantColor } from '../../../hooks'

import styles from './index.module.scss'

export type IconLinkProps = {
  iconColor: string
  side?: typeof SIDE_LEFT | typeof SIDE_RIGHT
  IconComponent?: JSX.ElementType
  className?: JSX.HTMLAttributes['className']
  style?: JSX.HTMLAttributes['style']
}

const IconLink: FunctionalComponent<IconLinkProps> = function IconLink(props) {
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
      className={clsx(className, styles['a-icon-link'])}
    >
      {hasLeftIcon ? icon : null} {children} {hasLeftIcon ? null : icon}
    </a>
  )
}

export default IconLink
