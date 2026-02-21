import type {ReactNode} from "react";
import clsx from 'clsx'

import styles from './index.module.scss'

export type GalleryListEntryProps = {
  className?: string
  children?: ReactNode
}

function GalleryListEntry(props: GalleryListEntryProps) {
  const {
    className,
    children,
    ...rest
  } = props

  return (
    <li
      {...rest}
      className={clsx(className, styles['m-gallery-list__entry'])}
    >
      {children}
    </li>
  )
}

export default GalleryListEntry
