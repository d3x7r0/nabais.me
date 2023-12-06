import type { FunctionalComponent, JSX } from 'preact'
import clsx from 'clsx'

import styles from './index.module.scss'

export type SimpleListProps = {
  className?: JSX.HTMLAttributes['className'],
  style?: JSX.HTMLAttributes['style'],
}

const SimpleList: FunctionalComponent<SimpleListProps> = function (props) {
  const {
    children,
    className,
    ...rest
  } = props

  return <ol className={clsx(
    className,
    styles['m-simple-list'],
  )} {...rest}>
    {children}
  </ol>
}

export default SimpleList
