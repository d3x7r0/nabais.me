// noinspection ES6UnusedImports
/* eslint-disable react/jsx-no-literals */
// eslint-disable-next-line no-unused-vars
import { h } from 'preact'
import classNames from 'clsx'

import styles from './index.module.scss'

import { PATHS, TITLES } from '@/js/config'

const SiteTitle = ({ className, ...rest }) => (
  <h1
    {...rest}
    className={classNames(className, styles['m-site-title'])}
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

export default SiteTitle
