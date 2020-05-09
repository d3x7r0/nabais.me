/** @jsx h */
import { h } from 'preact'
import classNames from 'classnames'

import styles from '../../../css/01_atom/spinner.module.scss'

const Spinner = ({ className, active, ...props }) => (
  <div
    {...props}
    className={buildClassNames({
      className,
      active,
    })}
  >
    <div className={classNames(
      styles['a-spinner__block'],
      styles['a-spinner__block--four'],
    )} />

    <div className={classNames(
      styles['a-spinner__block'],
      styles['a-spinner__block--three'],
    )} />

    <div className={classNames(
      styles['a-spinner__block'],
      styles['a-spinner__block--two'],
    )} />

    <div className={classNames(
      styles['a-spinner__block'],
      styles['a-spinner__block--one'],
    )} />
  </div>
)

function buildClassNames({ className, active }) {
  return classNames(
    className,
    styles['a-spinner'],
    { [styles['a-spinner--active']]: active },
  )
}

export default Spinner
