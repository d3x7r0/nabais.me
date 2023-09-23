import type { FunctionalComponent, JSX } from 'preact'
import clsx from 'clsx'

import styles from './index.module.scss'

export type ContentWrapperProps = {
  className?: JSX.HTMLAttributes['className']
}

const ContentWrapper: FunctionalComponent<ContentWrapperProps> = function ContentWrapper(props) {
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
