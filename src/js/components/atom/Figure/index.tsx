import clsx from 'clsx'
import type { ComponentChild, FunctionalComponent , JSX } from 'preact'

import { useCSSVariable, useDominantColor } from '../../../hooks'
import type { Ratio } from '../../utils.ts'
import { getRatio } from '../../utils.ts'

import styles from './index.module.scss'

export type FigureProps = {
  style?: JSX.HTMLAttributes['style']
  className?: JSX.HTMLAttributes['className']
  contentClassName?: JSX.HTMLAttributes['className']
  caption?: ComponentChild
  border?: boolean | string
  ratio?: Ratio
}

const Figure: FunctionalComponent<FigureProps> = function Figure(props) {
  const {
    className,
    children,
    caption,
    ratio,
    style,
    border,
    contentClassName,
    ...rest
  } = props

  let computedStyle = useDominantColor(
    border && border !== true ? border : null,
    style,
  )

  computedStyle = useCSSVariable(
    'aspect-ratio',
    getRatio(ratio),
    computedStyle,
  )

  const figureClassName = clsx(
    className,
    styles['a-figure'],
    { [styles['a-figure--border']]: border },
  )

  const finalContentClassName = clsx(
    contentClassName,
    styles['a-figure__content'],
    { [styles['a-figure__content--with-ratio']]: ratio },
  )

  return (
    <figure
      {...rest}
      className={figureClassName}
      style={computedStyle}
    >
      <div className={finalContentClassName}>
        {children}
      </div>

      {caption && (
        <figcaption className={styles['a-figure__caption']}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export default Figure
