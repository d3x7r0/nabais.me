/** @jsx h */
import { h } from 'preact'
import classNames from 'classnames'

import styles from '../../../css/02_molecule/toast.module.scss'

const Toast = ({ className, children, onClose, ...props }) => {
  return (
    <div
      {...props}
      className={buildClassName({ className })}
    >
      <div className={styles['m-toast__inner']}>
        <div className={styles['m-toast__content']}>
          {children}
        </div>

        <button type="button" className={styles['m-toast__close']} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}

function buildClassName({ className }) {
  return classNames(
    className,
    styles['m-toast'],
  )
}

export default Toast
