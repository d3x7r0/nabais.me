import clsx from 'clsx'
import type { FunctionalComponent, JSX } from 'preact'

import styles from './index.module.scss'

export type VerticalListEntryProps = {
  className?: JSX.HTMLAttributes['className']
}

const VerticalListEntry:FunctionalComponent<VerticalListEntryProps> = function VerticalListEntry(props) {
  const {
    className,
    children,
    ...rest
  } = props

  return (
    <li
      {...rest}
      className={clsx(className, styles['m-vertical-list__entry'])}
    >
      {children}
    </li>
  )
}

export default VerticalListEntry
