import type { ReactNode } from 'react'

import { clsx } from 'clsx'

import styles from './index.module.scss'

export type SiteNavigationProps = {
  children?: ReactNode
  className?: string
}

function SiteNavigation(props: SiteNavigationProps) {
  const {
    children,
    className,
  } = props

  return (
    <nav className={clsx(className, styles['m-site-navigation'])} role="navigation">
      {children}
    </nav>
  )
}

export default SiteNavigation
