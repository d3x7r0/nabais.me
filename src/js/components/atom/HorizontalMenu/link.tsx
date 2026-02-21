import type { JSX } from 'react'

import { clsx } from 'clsx'

import { useAltColor, useAltDominantColor } from '../../../hooks/color'

import styles from './index.module.scss'

export type HorizontalMenuLinkProps = {
  accentColor?: string
  active?: boolean
  hoverColor?: string
} & JSX.IntrinsicElements['a']

function HorizontalMenuLink(props: HorizontalMenuLinkProps) {
  const {
    accentColor,
    active,
    children,
    className,
    hoverColor,
    href,
    style,
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
      className={resolvedClassName}
      href={href}
      style={computedStyle}
    >
      {children}
    </a>
  )
}

export default HorizontalMenuLink
