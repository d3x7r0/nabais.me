import type { FunctionalComponent, JSX } from 'preact'
import clsx from 'clsx'

import styles from './index.module.scss'

export type SimpleListEntryProps = {
  className?: JSX.HTMLAttributes['className'],
  style?: JSX.HTMLAttributes['style'],
}

const SimpleListEntry: FunctionalComponent<SimpleListEntryProps> = function (props) {
  const {
    children,
    className,
    ...rest
  } = props

  return <li className={clsx(
    className,
    styles['m-simple-list__entry'],
  )} {...rest}>
    {children}
  </li>
}

export default SimpleListEntry
