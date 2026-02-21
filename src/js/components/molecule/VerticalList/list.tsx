import type {ComponentProps, CSSProperties} from "react";
import clsx from 'clsx'

import {SIDE} from '../../../constants'
import {useCSSVariable} from '../../../hooks/css'

import styles from './index.module.scss'

export type VerticalListProps = ComponentProps<'ul'> & {
  side?: SIDE
  noMargin?: boolean,
  grid?: boolean,
  gridMobile?: boolean,
  gridWidthSmall?: number,
  gridWidthLarge?: number,
}

function VerticalList(props: VerticalListProps) {
  const {
    children,
    className,
    side = SIDE.LEFT,
    grid,
    gridMobile,
    noMargin,
    gridWidthSmall = 2,
    gridWidthLarge = 4,
    ...rest
  } = props

  let computedStyle: CSSProperties = {}

  computedStyle = useCSSVariable('vertical-list-size-sm', gridWidthSmall, computedStyle) as CSSProperties
  computedStyle = useCSSVariable('vertical-list-size-lg', gridWidthLarge, computedStyle) as CSSProperties

  const resolvedClassName = clsx(
    className,
    styles['m-vertical-list'],
    {
      [styles['m-vertical-list--right']]: side === SIDE.RIGHT,
      [styles['m-vertical-list--no-margin']]: noMargin,
      [styles['m-vertical-list--grid']]: grid,
      [styles['m-vertical-list--grid-mobile']]: gridMobile,
    },
  )

  return (
    <ul
      {...rest}
      style={computedStyle}
      className={resolvedClassName}
    >
      {children}
    </ul>
  )
}

export default VerticalList
