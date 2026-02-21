import type {CSSProperties, ReactNode} from "react";
import clsx from 'clsx'

import {useAltDominantColor} from '../../../hooks/color'

import styles from './index.module.scss'

export type GalleryListProps = {
  noMargin?: boolean,
  alignBottom?: boolean,
  colorMain?: string,
  className?: string,
  style?: CSSProperties,
  children?: ReactNode
}

function GalleryList(props: GalleryListProps) {
  const {
    children,
    className,
    noMargin,
    alignBottom,
    colorMain,
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
      [styles['m-gallery-list--no-margin']]: noMargin,
      [styles['m-gallery-list--align-bottom']]: alignBottom
    },
  )

  return (
    <ul
      {...rest}
      style={computedStyle}
      className={resolvedClassNames}
    >
      {children}
    </ul>
  )
}

export default GalleryList
