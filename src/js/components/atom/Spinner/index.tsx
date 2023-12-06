import type { FunctionalComponent, JSX } from 'preact'
import clsx from 'clsx'

import { useCSSVariable } from '../../../hooks/css'

import styles from './index.module.scss'

export type SpinnerProps = {
  active?: boolean,
  colorMain?: string,
  colorAlt?: string,
  className?: JSX.HTMLAttributes['className'],
  style?: JSX.HTMLAttributes['style'],
}

const Spinner: FunctionalComponent<SpinnerProps> = function Spinner(props) {
  const {
    className,
    active,
    colorMain,
    colorAlt,
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
      style={computedStyle}
      className={clsx(
        className,
        styles['a-spinner'],
        { [styles['a-spinner--active']]: active },
      )}
    >
      <div className={clsx(
        styles['a-spinner__block'],
        styles['a-spinner__block--four'],
      )} />

      <div className={clsx(
        styles['a-spinner__block'],
        styles['a-spinner__block--three'],
      )} />

      <div className={clsx(
        styles['a-spinner__block'],
        styles['a-spinner__block--two'],
      )} />

      <div className={clsx(
        styles['a-spinner__block'],
        styles['a-spinner__block--one'],
      )} />
    </div>
  )
}

export default Spinner
