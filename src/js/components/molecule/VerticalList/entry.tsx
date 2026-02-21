import type { ComponentProps } from 'react'

import { clsx } from 'clsx'

import styles from './index.module.scss'

export type VerticalListEntryProps = ComponentProps<'li'>

function VerticalListEntry(props: VerticalListEntryProps) {
  const {
    children,
    className,
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
