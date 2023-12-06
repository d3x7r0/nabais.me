import type { FunctionalComponent, JSX } from 'preact'
import clsx from 'clsx'

import styles from './index.module.scss'

export type SiteNavigationProps = {
  className?: JSX.HTMLAttributes['className']
}

const SiteNavigation: FunctionalComponent<SiteNavigationProps> = function SiteNavigation(props) {
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
