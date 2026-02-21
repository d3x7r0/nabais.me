import type { ComponentProps, JSX, JSXElementConstructor } from 'react'

import { clsx } from 'clsx'

import { SIDE } from '../../../constants'
import { getDisplayName } from '../../utils'

import styles from './index.module.scss'

export type AsHorizontalMenuEntryProps = {
  className?: string
  side?: SIDE
}

export type HorizontalMenuEntryProps = AsHorizontalMenuEntryProps & JSX.IntrinsicElements['ul']

// Regular HTML elements like <li /> or <p />
export function AsHorizontalMenuEntry<
  P extends ComponentProps<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends JSXElementConstructor<any> | keyof JSX.IntrinsicElements,
>(
  Component: keyof JSX.IntrinsicElements,
  displayName?: string,
): JSXElementConstructor<AsHorizontalMenuEntryProps & JSX.LibraryManagedAttributes<T, P>>
// JSX <Components />
export function AsHorizontalMenuEntry<P, C>(
  Component: C & JSXElementConstructor<P>,
  displayName?: string,
): JSXElementConstructor<AsHorizontalMenuEntryProps & JSX.LibraryManagedAttributes<C, P>>
export function AsHorizontalMenuEntry(
  Component: JSX.ElementType,
  displayName?: string,
) {
  const WrappedComponent = (props: AsHorizontalMenuEntryProps) => {
    const { className, side, ...rest } = props

    const resolvedClassName = clsx(
      className,
      styles['a-horizontal-menu__entry'],
      {
        [styles['a-horizontal-menu__entry--left']]: side === SIDE.LEFT,
        [styles['a-horizontal-menu__entry--right']]: side === SIDE.RIGHT,
      },
    )

    return (
      <Component
        {...rest}
        className={resolvedClassName}
      />
    )
  }

  WrappedComponent.displayName = displayName || `AsHorizontalMenuEntry(${getDisplayName(Component)})`

  return WrappedComponent
}
export const HorizontalMenuEntry = AsHorizontalMenuEntry('li', 'HorizontalMenuEntry')

export type HorizontalNavMEntryenuProps = AsHorizontalMenuEntryProps & JSX.IntrinsicElements['nav']
export const HorizontalNavMenuEntry = AsHorizontalMenuEntry('p', 'HorizontalNavMenuEntry')

export default HorizontalMenuEntry
