import { type FunctionalComponent } from 'preact'
import classNames from 'clsx'

import styles from './index.module.scss'

export type VerticalThirdsWrapperProps = {
  className?: string
  open?: boolean
  limited?: boolean
}

export const VerticalThirdsWrapper: FunctionalComponent<VerticalThirdsWrapperProps> = (props) => {
  const {
    children,
    className,
    open,
    limited= true,
    ...rest
  } = props

  const cls = classNames(
    className,
    styles['t-vertical-thirds'],
    {
      [styles['t-vertical-thirds--open']]: open,
      [styles['t-vertical-thirds--limited']]: limited,
    },
  )

  return (
    <div
      {...rest}
      className={cls}
    >
      {children}
    </div>
  )
}

export type VerticalThirdsMainProps = {
  className?: string
  fullWidth?: boolean
}

export const VerticalThirdsMain: FunctionalComponent<VerticalThirdsMainProps> = (props) => {
  const { fullWidth, className, children, ...rest } = props

  const cls = classNames(
    className,
    styles['t-vertical-thirds__content'],
    {
      [styles['t-vertical-thirds__content--full-width']]: fullWidth,
    },
  )

  return (
    <main
      {...rest}
      className={cls}
    >
      {children}
    </main>
  )
}

export const VerticalThirdsHeader: FunctionalComponent = (props) => {
  return (
    <header className={styles['t-vertical-thirds__header']}>
      <div className={styles['t-vertical-thirds__header-inner']}>
        {props.children}
      </div>
    </header>
  )
}

export const VerticalThirdsNav: FunctionalComponent = (props) => {
  return (
    <div className={styles['t-vertical-thirds__nav']}>
      <div className={styles['t-vertical-thirds__nav-inner']}>
        {props.children}
      </div>
    </div>
  )
}

export const VerticalThirdsFooter: FunctionalComponent = (props) => {
  return (
    <footer className={styles['t-vertical-thirds__footer']}>
      <div className={styles['t-vertical-thirds__footer-inner']}>
        {props.children}
      </div>
    </footer>
  )
}
