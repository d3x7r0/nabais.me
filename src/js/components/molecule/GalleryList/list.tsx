import clsx from 'clsx'
import type { FunctionalComponent, JSX } from 'preact'

import { useAltDominantColor } from '../../../hooks'

import styles from './index.module.scss'

export type GalleryListProps = {
  noMargin?: boolean,
  alignBottom?: boolean,
  colorMain?: string,
  className?: JSX.HTMLAttributes['className'],
  style?: JSX.HTMLAttributes['style'],
}

const GalleryList: FunctionalComponent<GalleryListProps> = function GalleryList(props) {
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
