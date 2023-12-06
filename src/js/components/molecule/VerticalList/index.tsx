import type { FunctionalComponent, JSX } from 'preact'
import clsx from 'clsx'

import { SIDE } from '../../../constants'
import { useCSSVariable } from '../../../hooks/css'

import styles from './index.module.scss'

export type VerticalListProps = {
  className?: JSX.HTMLAttributes['className']
  side?: SIDE
  noMargin?: boolean,
  grid?: boolean,
  gridMobile?: boolean,
  gridWidthSmall?: number,
  gridWidthLarge?: number,
}

const VerticalList: FunctionalComponent<VerticalListProps> = function VerticalList(props) {
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

  let computedStyle: JSX.HTMLAttributes['style'] = {}

  computedStyle = useCSSVariable('vertical-list-size-sm', gridWidthSmall, computedStyle)
  computedStyle = useCSSVariable('vertical-list-size-lg', gridWidthLarge, computedStyle)

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
