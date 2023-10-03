import clsx from 'clsx'
import type { FunctionalComponent, JSX } from 'preact'

import { useCSSVariable } from '../../../hooks'
import { SIDE } from '../../../constants'

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
    side,
    grid,
    gridMobile,
    noMargin,
    gridWidthSmall = 2,
    gridWidthLarge = 4,
    ...rest
  } = props

  let computedStyle = {}

  computedStyle = useCSSVariable('vertical-list-size-sm', gridWidthSmall, computedStyle)
  computedStyle = useCSSVariable('vertical-list-size-lg', gridWidthLarge, computedStyle)

  const resolvedClassName = buildClassNames({
    className,
    side,
    noMargin,
    grid,
    gridMobile,
  })

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

function buildClassNames(props: VerticalListProps) {
  const {
    className,
    side = SIDE.LEFT,
    noMargin,
    grid,
    gridMobile,
  } = props

  return clsx(
    className,
    styles['m-vertical-list'],
    {
      [styles['m-vertical-list--right']]: side === SIDE.RIGHT,
      [styles['m-vertical-list--no-margin']]: noMargin,
      [styles['m-vertical-list--grid']]: grid,
      [styles['m-vertical-list--grid-mobile']]: gridMobile,
    },
  )
}

export default VerticalList
