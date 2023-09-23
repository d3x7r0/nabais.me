import clsx from 'clsx'
import type { FunctionalComponent, JSX } from 'preact'

import styles from './index.module.scss'

export type SiteSubNavProps = {
  className?: JSX.HTMLAttributes['className']
}

const SiteSubNav: FunctionalComponent<SiteSubNavProps> = function SiteSubNav(props) {
  const {
    className,
    children,
  } = props

  return (
    <div className={clsx(className, styles['m-site-sub-nav'])}>
      {children}
    </div>
  )
}

export default SiteSubNav
