// noinspection ES6UnusedImports
// eslint-disable-next-line no-unused-vars
import { h } from 'preact'
import classNames from 'clsx'
import PropTypes from 'prop-types'

import { getDisplayName } from '../../utils'

import styles from './index.module.scss'

export function AsHorizontalMenu(Component, displayName) {
  const WrappedComponent = ({ className, balanced, scroll, children, ...props }) => (
    <Component
      {...props}
      className={buildClassNames({
        className,
        balanced,
        scroll,
      })}
    >
      {children}
    </Component>
  )

  WrappedComponent.displayName = displayName || `AsHorizontalMenu(${getDisplayName(Component)})`

  WrappedComponent.propTypes = {
    ...(Component.propTypes || {}),
    className: PropTypes.string,
    balanced: PropTypes.bool,
  }

  return WrappedComponent
}

function buildClassNames({ className, balanced, scroll }) {
  return classNames(
    className,
    styles['a-horizontal-menu'],
    {
      [styles['a-horizontal-menu--scroll']]: scroll,
      [styles['a-horizontal-menu--balanced']]: balanced,
    },
  )
}

export const HorizontalMenu = AsHorizontalMenu('ul', 'HorizontalMenu')
export const HorizontalNavMenu = AsHorizontalMenu('nav', 'HorizontalNavMenu')

export default HorizontalMenu
