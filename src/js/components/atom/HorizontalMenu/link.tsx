import type { FunctionalComponent, JSX } from 'preact'
import clsx from 'clsx'

import { useAltColor, useAltDominantColor } from '../../../hooks/color'

import styles from './index.module.scss'

export type HorizontalMenuLinkProps = JSX.IntrinsicElements['a'] & {
  active?: boolean,
  accentColor?: string,
  hoverColor?: string,
}

const HorizontalMenuLink: FunctionalComponent<HorizontalMenuLinkProps> = function HorizontalMenuLink(props) {
  const {
    active,
    className,
    href,
    children,
    style,
    accentColor,
    hoverColor,
    ...rest
  } = props

  let computedStyle = useAltDominantColor(
    accentColor,
    style,
  )

  computedStyle = useAltColor(
    hoverColor,
    computedStyle,
  )

  const resolvedClassName = clsx(
    className,
    styles['a-horizontal-menu__link'],
    { [styles['a-horizontal-menu__link--active']]: active },
  )

  return (
    <a
      {...rest}
      href={href}
      style={computedStyle}
      className={resolvedClassName}
    >
      {children}
    </a>
  )
}

export default HorizontalMenuLink
