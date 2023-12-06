import type { ComponentConstructor, FunctionalComponent, JSX } from 'preact'
import clsx from 'clsx'

import { getDisplayName } from '../../utils'

import styles from './index.module.scss'

export type AsHorizontalMenuProps = {
  className?: JSX.HTMLAttributes['className']
  scroll?: boolean
  balanced?: boolean
}

// Regular HTML elements like <li /> or <p />
export function AsHorizontalMenu<
  P extends JSX.HTMLAttributes<T>,
  T extends HTMLElement,
>(
  Component: keyof JSX.IntrinsicElements,
  displayName?: string,
): FunctionalComponent<JSX.LibraryManagedAttributes<T, P> & AsHorizontalMenuProps>

// JSX <Components />
export function AsHorizontalMenu<P, C>(
  Component: ComponentConstructor<P> & C,
  displayName?: string,
): FunctionalComponent<JSX.LibraryManagedAttributes<C, P> & AsHorizontalMenuProps>

export function AsHorizontalMenu(
  Component: JSX.ElementType,
  displayName?: string
) {
  const WrappedComponent = (props: AsHorizontalMenuProps) => {
    const {
      className,
      balanced,
      scroll,
      ...rest
    } = props

    const resolvedClassName = clsx(
      className,
      styles['a-horizontal-menu'],
      {
        [styles['a-horizontal-menu--scroll']]: scroll,
        [styles['a-horizontal-menu--balanced']]: balanced,
      },
    )

    return (
      <Component
        {...rest}
        className={resolvedClassName}
      />
    )
  }

  WrappedComponent.displayName = displayName || `AsHorizontalMenu(${getDisplayName(Component)})`

  return WrappedComponent
}

export type HorizontalMenuProps = AsHorizontalMenuProps & JSX.IntrinsicElements['ul']
export const HorizontalMenu = AsHorizontalMenu('ul', 'HorizontalMenu')

export type HorizontalNavMenuProps = AsHorizontalMenuProps & JSX.IntrinsicElements['nav']
export const HorizontalNavMenu = AsHorizontalMenu('nav', 'HorizontalNavMenu')

export default HorizontalMenu
