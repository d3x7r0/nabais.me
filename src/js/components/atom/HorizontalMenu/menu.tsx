import type { ComponentProps, JSX, JSXElementConstructor } from 'react'

import { clsx } from 'clsx'

import { getDisplayName } from '../../utils'

import styles from './index.module.scss'

export type AsHorizontalMenuProps = {
  balanced?: boolean
  className?: string
  scroll?: boolean
}

export type HorizontalMenuProps = AsHorizontalMenuProps & JSX.IntrinsicElements['ul']

// Regular HTML elements like <li /> or <p />
export function AsHorizontalMenu<
  P extends ComponentProps<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends JSXElementConstructor<any> | keyof JSX.IntrinsicElements,
>(
  Component: keyof JSX.IntrinsicElements,
  displayName?: string,
): JSXElementConstructor<AsHorizontalMenuProps & JSX.LibraryManagedAttributes<T, P>>
// JSX <Components />
export function AsHorizontalMenu<P, C>(
  Component: C & JSXElementConstructor<P>,
  displayName?: string,
): JSXElementConstructor<AsHorizontalMenuProps & JSX.LibraryManagedAttributes<C, P>>
export function AsHorizontalMenu(
  Component: JSX.ElementType,
  displayName?: string,
) {
  const WrappedComponent = (props: AsHorizontalMenuProps) => {
    const {
      balanced,
      className,
      scroll,
      ...rest
    } = props

    const resolvedClassName = clsx(
      className,
      styles['a-horizontal-menu'],
      {
        [styles['a-horizontal-menu--balanced']]: balanced,
        [styles['a-horizontal-menu--scroll']]: scroll,
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
export const HorizontalMenu = AsHorizontalMenu('ul', 'HorizontalMenu')

export type HorizontalNavMenuProps = AsHorizontalMenuProps & JSX.IntrinsicElements['nav']
export const HorizontalNavMenu = AsHorizontalMenu('nav', 'HorizontalNavMenu')

export default HorizontalMenu
