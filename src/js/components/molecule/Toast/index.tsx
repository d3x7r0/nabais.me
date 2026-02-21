import type { ComponentProps, ReactNode } from 'react'

import { clsx } from 'clsx'

import { useAltDominantColor, useBgColor, useBorderColor } from '../../../hooks/color'

import styles from './index.module.scss'

const DEFAULT_CLOSE_LABEL = 'Close'

export type ToastProps = {
  closed?: boolean
  closeLabel?: ReactNode
  colorBackground?: string
  colorBorder?: string
  colorMain?: string
  onClose?: () => void
} & ComponentProps<'div'>

function Toast(props: ToastProps) {
  const {
    children,
    className,
    closed,
    closeLabel = DEFAULT_CLOSE_LABEL,
    colorBackground,
    colorBorder,
    colorMain,
    onClose,
    style,
    ...rest
  } = props

  let computedStyle = useAltDominantColor(
    colorMain,
    style,
  )

  computedStyle = useBgColor(
    colorBackground,
    computedStyle,
  )

  computedStyle = useBorderColor(
    colorBorder,
    computedStyle,
  )

  const computedClassName = clsx(className, styles['m-toast'])

  if (closed) {
    return null
  }

  return (
    <div
      {...rest}
      className={computedClassName}
      style={computedStyle}
    >
      <div className={styles['m-toast__inner']}>
        <div className={styles['m-toast__content']}>
          {children}
        </div>

        <button
          className={styles['m-toast__close']}
          onClick={onClose}
          type="button"
        >
          {closeLabel}
        </button>
      </div>
    </div>
  )
}

export default Toast
