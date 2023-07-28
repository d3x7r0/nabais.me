// noinspection ES6UnusedImports
// eslint-disable-next-line no-unused-vars
import { h } from 'preact'
import classNames from 'clsx'

import styles from './index.module.scss'

export const VerticalThirdsWrapper = (props) => {
  const {
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
      {children}
    </div>
  )
}

export const VerticalThirdsMain = (props) => {
  return (
    <main className={styles['t-vertical-thirds__content']}>
      {props.children}
    </main>
  )
}

export const VerticalThirdsHeader = (props) => {
  return (
    <header className={styles['t-vertical-thirds__header']}>
      <div className={styles['t-vertical-thirds__header-inner']}>
        {props.children}
      </div>
    </header>
  )
}

export const VerticalThirdsNav = (props) => {
  return (
    <div className={styles['t-vertical-thirds__nav']}>
      <div className={styles['t-vertical-thirds__nav-inner']}>
        {props.children}
      </div>
    </div>
  )
}

export const VerticalThirdsFooter = (props) => {
  return (
    <footer className={styles['t-vertical-thirds__footer']}>
      <div className={styles['t-vertical-thirds__footer-inner']}>
        {props.children}
      </div>
    </footer>
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
