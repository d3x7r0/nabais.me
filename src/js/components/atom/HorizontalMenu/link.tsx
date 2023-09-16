import clsx from 'clsx'
import type { FunctionalComponent, JSX } from 'preact'

import { useAltColor, useAltDominantColor } from '../../../hooks'

import styles from './index.module.scss'

export type HorizontalMenuLinkProps = {
  className?: JSX.HTMLAttributes['className'],
  style?: JSX.HTMLAttributes['style'],
  active?: boolean,
  href: JSX.HTMLAttributes['href'],
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
