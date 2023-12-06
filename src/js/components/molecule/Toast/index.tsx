import type { JSX, ComponentChild, FunctionalComponent } from 'preact'
import clsx from 'clsx'

import { useAltDominantColor, useBgColor, useBorderColor } from '../../../hooks/color'

import styles from './index.module.scss'

const DEFAULT_CLOSE_LABEL = 'Close'

export type ToastProps = {
  closed?: boolean,
  onClose?: () => void,
  closeLabel?: ComponentChild,
  colorMain?: string,
  colorBackground?: string,
  colorBorder?: string,
  style?: JSX.HTMLAttributes['style']
  className?: JSX.HTMLAttributes['className']
}

const Toast: FunctionalComponent<ToastProps> = function Toast(props) {
  const {
    className,
    children,
    closeLabel = DEFAULT_CLOSE_LABEL,
    onClose,
    closed,
    style,
    colorMain,
    colorBackground,
    colorBorder,
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
      style={computedStyle}
      className={computedClassName}
    >
      <div className={styles['m-toast__inner']}>
        <div className={styles['m-toast__content']}>
          {children}
        </div>

        <button
          type="button"
          className={styles['m-toast__close']}
          onClick={onClose}
        >
          {closeLabel}
        </button>
      </div>
    </div>
  )
}

export default Toast
