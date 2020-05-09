/** @jsx h */
import { h, toChildArray } from 'preact'
import classNames from 'classnames'

import styles from '../../../css/02_molecule/vertical-list.module.scss'

const VerticalList = (props) => {
  const {
    children,
    className,
    right,
    grid,
    noIndent,
    noMargin,
    ...rest
  } = props

  return (
    <ul
      {...rest}
      className={buildClassNames({
        className,
        right,
        noIndent,
        noMargin,
        grid,
      })}
    >
      {toChildArray(children).map((c, idx) => (
        <li key={c.key || idx} className={styles['m-vertical-list__entry']}>
          {c}
        </li>
      ))}
    </ul>
  )
}

function buildClassNames(props) {
  const {
    className,
    right = false,
    noIndent = false,
    noMargin = false,
    grid = false,
  } = props

  return classNames(
    className,
    styles['m-vertical-list'],
    {
      [styles['m-vertical-list--right']]: right,
      [styles['m-vertical-list--no-indent']]: noIndent,
      [styles['m-vertical-list--no-margin']]: noMargin,
      [styles['m-vertical-list--grid']]: grid,
    },
  )
}

export default VerticalList
