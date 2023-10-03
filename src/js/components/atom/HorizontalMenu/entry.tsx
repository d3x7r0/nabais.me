import clsx from 'clsx'
import type { ComponentConstructor, FunctionalComponent, JSX } from 'preact'

import { getDisplayName } from '../../utils'
import { SIDE } from '../../../constants'

import styles from './index.module.scss'

export type AsHorizontalMenuEntryProps = {
  className?: JSX.HTMLAttributes['className']
  side?: SIDE
}

// Regular HTML elements like <li /> or <p />
export function AsHorizontalMenuEntry<
  P extends JSX.HTMLAttributes<T>,
  T extends HTMLElement,
>(
  Component: keyof JSX.IntrinsicElements,
  displayName?: string,
): FunctionalComponent<JSX.LibraryManagedAttributes<T, P> & AsHorizontalMenuEntryProps>

// JSX <Components />
export function AsHorizontalMenuEntry<P, C>(
  Component: ComponentConstructor<P> & C,
  displayName?: string,
): FunctionalComponent<JSX.LibraryManagedAttributes<C, P> & AsHorizontalMenuEntryProps>

export function AsHorizontalMenuEntry(
  Component: JSX.ElementType,
  displayName?: string
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

export type HorizontalMenuEntryProps = AsHorizontalMenuEntryProps & JSX.IntrinsicElements['ul']
export const HorizontalMenuEntry = AsHorizontalMenuEntry('li', 'HorizontalMenuEntry')

export type HorizontalNavMEntryenuProps = AsHorizontalMenuEntryProps & JSX.IntrinsicElements['nav']
export const HorizontalNavMenuEntry = AsHorizontalMenuEntry('p', 'HorizontalNavMenuEntry')

export default HorizontalMenuEntry
