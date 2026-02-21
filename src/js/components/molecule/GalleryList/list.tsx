import type { CSSProperties, ReactNode } from 'react'

import { clsx } from 'clsx'

import { useAltDominantColor } from '../../../hooks/color'

import styles from './index.module.scss'

export type GalleryListProps = {
  alignBottom?: boolean
  children?: ReactNode
  className?: string
  colorMain?: string
  noMargin?: boolean
  style?: CSSProperties
}

function GalleryList(props: GalleryListProps) {
  const {
    alignBottom,
    children,
    className,
    colorMain,
    noMargin,
    style,
    ...rest
  } = props

  const computedStyle = useAltDominantColor(
    colorMain,
    style,
  )

  const resolvedClassNames = clsx(
    className,
    styles['m-gallery-list'],
    {
      [styles['m-gallery-list--align-bottom']]: alignBottom,
      [styles['m-gallery-list--no-margin']]: noMargin,
    },
  )

  return (
    <ul
      {...rest}
      className={resolvedClassNames}
      style={computedStyle}
    >
      {children}
    </ul>
  )
}

export default GalleryList
