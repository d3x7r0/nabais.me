import type { ComponentProps, ReactNode } from 'react'

import classNames from 'clsx'

import styles from './index.module.scss'

export type VerticalThirdsMainProps = {
  fullWidth?: boolean
} & ComponentProps<'main'>

export type VerticalThirdsWrapperProps = {
  limited?: boolean
  open?: boolean
} & ComponentProps<'div'>

export function VerticalThirdsMain(props: VerticalThirdsMainProps) {
  const { children, className, fullWidth, ...rest } = props

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

export function VerticalThirdsWrapper(props: VerticalThirdsWrapperProps) {
  const {
    children,
    className,
    limited = true,
    open,
    ...rest
  } = props

  const cls = classNames(
    className,
    styles['t-vertical-thirds'],
    {
      [styles['t-vertical-thirds--limited']]: limited,
      [styles['t-vertical-thirds--open']]: open,
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

export const VerticalThirdsHeader = (props: { children?: ReactNode }) => {
  return (
    <header className={styles['t-vertical-thirds__header']}>
      <div className={styles['t-vertical-thirds__header-inner']}>
        {props.children}
      </div>
    </header>
  )
}

export const VerticalThirdsNav = (props: { children?: ReactNode }) => {
  return (
    <div className={styles['t-vertical-thirds__nav']}>
      <div className={styles['t-vertical-thirds__nav-inner']}>
        {props.children}
      </div>
    </div>
  )
}

export const VerticalThirdsFooter = (props: { children?: ReactNode }) => {
  return (
    <footer className={styles['t-vertical-thirds__footer']}>
      <div className={styles['t-vertical-thirds__footer-inner']}>
        {props.children}
      </div>
    </footer>
  )
}
