import type { ReactNode } from 'react'

import { clsx } from 'clsx'

import styles from './index.module.scss'

export type ContentWrapperProps = {
  children?: ReactNode
  className?: string
}

function ContentWrapper(props: ContentWrapperProps) {
  const {
    children,
    className,
    ...rest
  } = props

  return (
    <div
      className={clsx(className, styles['m-content-wrapper'])}
      {...rest}
    >
      {children}
    </div>
  )
}

export default ContentWrapper
