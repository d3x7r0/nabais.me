/** @jsx h */
import { h, toChildArray } from 'preact'
import classNames from 'classnames'

import { getDisplayName } from '../utils'
import styles from '../../../css/01_atom/horizontal-menu.module.scss'

import MenuLink from './menu-link'

export const HorizontalMenu = ({ className, balanced, children, ...rest }) => {
  children = toChildArray(children)

  return (
    <ul className={buildMenuClassName({
      className,
      balanced,
      children,
    })} {...rest}>
      {children.map((c, idx) => (
        <li key={c.key || idx} className={buildMenuEntryClassName()}>
          {c}
        </li>
      ))}
    </ul>
  )
}

export function AsHorizontalMenu(Component, displayName) {
  const WrappedComponent = ({ className, balanced, children, ...props }) => (
    <Component
      {...props}
      className={buildMenuClassName({
        className,
        balanced,
        children: toChildArray(children),
      })}
    >
      {children}
    </Component>
  )

  WrappedComponent.displayName = displayName || `AsHorizontalMenu(${getDisplayName(Component)})`

  return WrappedComponent
}

export function AsHorizontalMenuEntry(Component, displayName) {
  const WrappedComponent = ({ className, left, right, ...props }) => (
    <Component
      {...props}
      className={buildMenuEntryClassName({
        className,
        left,
        right,
      })}
    />
  )

  WrappedComponent.displayName = displayName || `AsHorizontalMenuEntry(${getDisplayName(Component)})`

  return WrappedComponent
}

export const HorizontalNavMenu = AsHorizontalMenu('nav', 'HorizontalNavMenu')
export const HorizontalMenuEntry = AsHorizontalMenuEntry('p', 'HorizontalMenuEntry')

export const HorizontalMenuLink = ({ children, className, ...rest }) => (
  <MenuLink className={classNames(className, styles['a-horizontal-menu__link'])} {...rest}>
    {children}
  </MenuLink>
)

function buildMenuClassName({ className, balanced, children = [] }) {
  return classNames(
    className,
    styles['a-horizontal-menu'],
    {
      [styles['a-horizontal-menu--is-empty']]: !children.length,
      [styles['a-horizontal-menu--is-single']]: children.length === 1,
      [styles['a-horizontal-menu--is-multiple']]: children.length > 1,
      [styles['a-horizontal-menu--balanced']]: balanced,
    },
  )
}

function buildMenuEntryClassName({ className, left, right } = {}) {
  return classNames(
    className,
    styles['a-horizontal-menu__entry'],
    {
      [styles['a-horizontal-menu__entry--left']]: left,
      [styles['a-horizontal-menu__entry--right']]: right,
    },
  )
}
