/** @jsx h */
import { h, toChildArray } from 'preact'
import classNames from 'classnames'

import styles from '../../../css/02_molecule/gallery-list.module.scss'

const GalleryList = ({ children, className, noMargin, ...rest }) => {
  children = toChildArray(children)

  return (
    <ul
      {...rest}
      className={buildClassNames({
        className,
        noMargin,
      })}
    >
      {children.map((c, idx) => (
        <li
          key={c.key || idx}
          className={styles['a-gallery-list__entry']}
        >
          {c}
        </li>
      ))}
    </ul>
  )
}

function buildClassNames({ className, noMargin }) {
  return classNames(
    className,
    styles['a-gallery-list'],
    { [styles['a-gallery-list--no-margin']]: noMargin },
  )
}

export default GalleryList
