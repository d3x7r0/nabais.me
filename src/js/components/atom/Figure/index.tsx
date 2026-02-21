import type { Ratio } from '../../utils'
import type { ComponentProps, ReactNode } from 'react'

import { clsx } from 'clsx'

import { useDominantColor } from '../../../hooks/color'
import { useCSSVariable } from '../../../hooks/css'
import { getRatio } from '../../utils'

import styles from './index.module.scss'

export type FigureProps = {
  border?: boolean | string
  caption?: ReactNode
  contentClassName?: string
  ratio?: Ratio
} & ComponentProps<'figure'>

function Figure(props: FigureProps) {
  const {
    border,
    caption,
    children,
    className,
    contentClassName,
    ratio,
    style,
    ...rest
  } = props

  let computedStyle = useDominantColor(
    border && border !== true ? border : undefined,
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
