import type { ComponentProps, CSSProperties } from 'react'

import { clsx } from 'clsx'

import { SIDE } from '../../../constants'
import { useCSSVariable } from '../../../hooks/css'

import styles from './index.module.scss'

export type VerticalListProps = {
  grid?: boolean
  gridMobile?: boolean
  gridWidthLarge?: number
  gridWidthSmall?: number
  noMargin?: boolean
  side?: SIDE
} & ComponentProps<'ul'>

function VerticalList(props: VerticalListProps) {
  const {
    children,
    className,
    grid,
    gridMobile,
    gridWidthLarge = 4,
    gridWidthSmall = 2,
    noMargin,
    side = SIDE.LEFT,
    ...rest
  } = props

  let computedStyle: CSSProperties = {}

  computedStyle = useCSSVariable('vertical-list-size-sm', gridWidthSmall, computedStyle) as CSSProperties
  computedStyle = useCSSVariable('vertical-list-size-lg', gridWidthLarge, computedStyle) as CSSProperties

  const resolvedClassName = clsx(
    className,
    styles['m-vertical-list'],
    {
      [styles['m-vertical-list--grid-mobile']]: gridMobile,
      [styles['m-vertical-list--grid']]: grid,
      [styles['m-vertical-list--no-margin']]: noMargin,
      [styles['m-vertical-list--right']]: side === SIDE.RIGHT,
    },
  )

  return (
    <ul
      {...rest}
      className={resolvedClassName}
      style={computedStyle}
    >
      {children}
    </ul>
  )
}

export default VerticalList
