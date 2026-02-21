import type {ReactNode} from "react";
import clsx from 'clsx'

import styles from './index.module.scss'

export type SiteNavigationProps = {
  className?: string
  children?: ReactNode
}

function SiteNavigation(props: SiteNavigationProps) {
  const {
    className,
    children,
  } = props

  return (
    <nav role="navigation" className={clsx(className, styles['m-site-navigation'])}>
      {children}
    </nav>
  )
}

export default SiteNavigation
