import type { CSSProperties } from 'react'

import { clsx } from 'clsx'

import { useCSSVariable } from '../../../hooks/css'

import styles from './index.module.scss'

export type SpinnerProps = {
  active?: boolean
  className?: string
  colorAlt?: string
  colorMain?: string
  style?: CSSProperties
}

function Spinner(props: SpinnerProps) {
  const {
    active,
    className,
    colorAlt,
    colorMain,
    style,
    ...rest
  } = props

  let computedStyle = useCSSVariable(
    'spinner-color',
    colorMain,
    style,
  )

  computedStyle = useCSSVariable(
    'spinner-alt-color',
    colorAlt,
    computedStyle,
  )

  return (
    <div
      {...rest}
      className={clsx(
        className,
        styles['a-spinner'],
        { [styles['a-spinner--active']]: active },
      )}
      style={computedStyle}
    >
      <div className={clsx(
        styles['a-spinner__block'],
        styles['a-spinner__block--four'],
      )}
      />

      <div className={clsx(
        styles['a-spinner__block'],
        styles['a-spinner__block--three'],
      )}
      />

      <div className={clsx(
        styles['a-spinner__block'],
        styles['a-spinner__block--two'],
      )}
      />

      <div className={clsx(
        styles['a-spinner__block'],
        styles['a-spinner__block--one'],
      )}
      />
    </div>
  )
}

export default Spinner
