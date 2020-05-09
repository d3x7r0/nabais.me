/** @jsx h */
import { h } from 'preact'
import classNames from 'classnames'

import styles from '../../../css/04_template/vertical-thirds.module.scss'

const VerticalThirds = (props) => {
  const {
    header,
    nav,
    footer,
    children,
    className,
    open,
    ...rest
  } = props

  return (
    <div
      {...rest}
      className={classNames(
        className,
        styles['t-vertical-thirds'],
        { [styles['t-vertical-thirds--open']]: open },
      )}
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

export default VerticalThirds
