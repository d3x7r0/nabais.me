/** @jsx h */
import { h } from 'preact'
import classNames from 'classnames'

import styles from '../../../css/01_atom/figure.module.scss'

const Figure = (props) => {
  const {
    className,
    children,
    caption,
    ratio,
    style,
    ...rest
  } = props

  let computedStyle = style
  if (ratio) {
    computedStyle = `--aspect-ratio: ${ratio.height} / ${ratio.width}; ${computedStyle || ''}`
  }

  return (
    <figure
      className={buildClassName({ className })}
      style={computedStyle}
      {...rest}
    >
      <div className={buildContentClassName({ ratio })}>{children}</div>

      {caption && (
        <figcaption className={styles['a-figure__caption']}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function buildClassName({ className }) {
  return classNames(
    className,
    styles['a-figure'],
  )
}

function buildContentClassName({ className, ratio }) {
  return classNames(
    className,
    styles['a-figure__content'],
    { [styles['a-figure__content--with-ratio']]: ratio },
  )
}

export default Figure
