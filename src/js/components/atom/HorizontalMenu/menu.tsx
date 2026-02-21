import type {ComponentProps, JSX, JSXElementConstructor} from "react";
import clsx from 'clsx'

import { getDisplayName } from '../../utils'

import styles from './index.module.scss'

export type AsHorizontalMenuProps = {
  className?: string
  scroll?: boolean
  balanced?: boolean
}

// Regular HTML elements like <li /> or <p />
export function AsHorizontalMenu<
  P extends ComponentProps<T>,
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
>(
  Component: keyof JSX.IntrinsicElements,
  displayName?: string,
): JSXElementConstructor<JSX.LibraryManagedAttributes<T, P> & AsHorizontalMenuProps>

// JSX <Components />
export function AsHorizontalMenu<P, C>(
  Component: JSXElementConstructor<P> & C,
  displayName?: string,
): JSXElementConstructor<JSX.LibraryManagedAttributes<C, P> & AsHorizontalMenuProps>

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
