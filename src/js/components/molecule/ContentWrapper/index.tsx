import type {ReactNode} from "react";
import clsx from 'clsx'

import styles from './index.module.scss'

export type ContentWrapperProps = {
  className?: string
  children?: ReactNode
}

function ContentWrapper(props: ContentWrapperProps) {
  const {
    className,
    children,
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
