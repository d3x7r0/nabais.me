// noinspection ES6UnusedImports
// eslint-disable-next-line no-unused-vars
import { h } from 'preact'
import classNames from 'classnames'

import styles from './index.module.scss'

const VerticalThirds = (props) => {
  const {
    header,
    nav,
    footer,
    children,
    className,
    open,
    limited,
    ...rest
  } = props

  return (
    <div
      {...rest}
      className={buildClassNames({
        className,
        open,
        limited,
      })}
    >
      <header className={styles['t-vertical-thirds__header']}>
        <div className={styles['t-vertical-thirds__header-inner']}>
          {header}
        </div>
      </header>

      {nav ? (
        <div className={styles['t-vertical-thirds__nav']}>
          <div className={styles['t-vertical-thirds__nav-inner']}>
            {nav}
          </div>
        </div>
      ) : null}

      <main className={styles['t-vertical-thirds__content']}>
        {children}
      </main>

      {footer ? (
        <footer className={styles['t-vertical-thirs__footer']}>
          <div className={styles['t-vertical-thirds__footer-inner']}>
            {footer}
          </div>
        </footer>
      ) : null}
    </div>
  )
}

function buildClassNames({
  className,
  open,
  limited = true,
}) {
  return classNames(
    className,
    styles['t-vertical-thirds'],
    {
      [styles['t-vertical-thirds--open']]: open,
      [styles['t-vertical-thirds--limited']]: limited,
    },
  )
}

export default VerticalThirds
