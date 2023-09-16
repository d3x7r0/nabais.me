import clsx from 'clsx'
import type { ComponentConstructor, FunctionalComponent, JSX } from 'preact'

import { getDisplayName } from '../../utils.ts'
import { SIDE_LEFT, SIDE_RIGHT } from '../../../constants'

import styles from './index.module.scss'

export type AsHorizontalMenuEntryProps = {
  className?: JSX.HTMLAttributes['className']
  side?: typeof SIDE_LEFT | typeof SIDE_RIGHT
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
        [styles['a-horizontal-menu__entry--left']]: side === SIDE_LEFT,
        [styles['a-horizontal-menu__entry--right']]: side === SIDE_RIGHT,
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
export const HorizontalNavMenuEntry = AsHorizontalMenuEntry('p', 'HorizontalNavMenuEntry')

export default HorizontalMenuEntry
