// noinspection ES6UnusedImports
// eslint-disable-next-line no-unused-vars
import { h } from 'preact'
import classNames from 'clsx'

import styles from './index.module.scss'

function VerticalListEntry(props) {
  const {
    className,
    children,
    ...rest
  } = props

  return (
    <li
      {...rest}
      className={buildClassNames({ className })}
    >
      {children}
    </li>
  )
}

function buildClassNames({ className }) {
  return classNames(
    className,
    styles['m-vertical-list__entry'],
  )
}

export default VerticalListEntry
