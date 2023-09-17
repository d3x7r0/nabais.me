import type { FunctionalComponent, JSX } from 'preact'
import clsx from 'clsx'

import styles from './index.module.scss'

export type GalleryListEntryProps = {
  className?: JSX.HTMLAttributes['className']
}

const GalleryListEntry: FunctionalComponent<GalleryListEntryProps> = function GalleryListEntry(props) {
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
