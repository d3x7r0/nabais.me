// noinspection ES6UnusedImports
// eslint-disable-next-line no-unused-vars
import {h} from 'preact'
import classNames from 'clsx'
import PropTypes from 'prop-types'

import {SIDE_LEFT, SIDE_RIGHT} from '../../../constants'
import {useCSSVariable} from '../../../hooks'

import styles from './index.module.scss'

function VerticalList(props) {
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

  return (
    <ul
      {...rest}
      style={computedStyle}
      className={buildClassNames({
        className,
        side,
        noMargin,
        grid,
        gridMobile,
      })}
    >
      {children}
    </ul>
  )
}

function buildClassNames(props) {
  const {
    className,
    side = SIDE_LEFT,
    noMargin,
    grid,
    gridMobile,
  } = props

  return classNames(
    className,
    styles['m-vertical-list'],
    {
      [styles['m-vertical-list--right']]: side === SIDE_RIGHT,
      [styles['m-vertical-list--no-margin']]: noMargin,
      [styles['m-vertical-list--grid']]: grid,
      [styles['m-vertical-list--grid-mobile']]: gridMobile,
    },
  )
}

VerticalList.propTypes = {
  className: PropTypes.string,
  side: PropTypes.oneOf([SIDE_LEFT, SIDE_RIGHT]),
  noMargin: PropTypes.bool,
  grid: PropTypes.bool,
  gridMobile: PropTypes.bool,
  gridWidthSmall: PropTypes.number,
  gridWidthLarge: PropTypes.number,
}

export default VerticalList
