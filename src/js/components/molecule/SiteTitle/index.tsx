/* eslint-disable react/jsx-no-literals */
import type { FunctionalComponent, JSX } from 'preact'
import clsx from 'clsx'

import { PATHS, TITLES } from '../../../config'

import styles from './index.module.scss'

export type SiteTitleProps = {
  className?: JSX.HTMLAttributes['className']
}

const SiteTitle: FunctionalComponent<SiteTitleProps> = function SiteTitle(props) {
  const { className, ...rest } = props

  return (
    <h1
      {...rest}
      className={clsx(className, styles['m-site-title'])}
    >
      <a
        className={styles['m-site-title__text']}
        href={PATHS.HOME}
        title={TITLES.SITE}
      >
        Nabais<span>.me</span>
      </a>
    </h1>
  )
}

export default SiteTitle
