import type { Ratio } from '../../utils'
import type { CSSProperties, ReactNode } from 'react'

import { clsx } from 'clsx'

import { useCSSVariable } from '../../../hooks/css'
import { getRatio } from '../../utils'

import styles from './index.module.scss'

export type RatioBoxProps = {
  children?: ReactNode
  className?: string
  contentClassName?: string
  ratio?: Ratio
  style?: CSSProperties
}

const RatioBox = function RatioBox(props: RatioBoxProps) {
  const {
    children,
    className,
    contentClassName,
    ratio,
    style,
    ...rest
  } = props

  const computedStyle = useCSSVariable(
    'aspect-ratio',
    getRatio(ratio),
    style,
  )

  const resolvedContentClassName = clsx(
    contentClassName,
    styles['a-ratio-box__content'],
    { [styles['a-ratio-box__content--with-ratio']]: ratio },
  )

  return (
    <div
      {...rest}
      className={clsx(className, styles['a-ratio-box'])}
      style={computedStyle}
    >
      <div className={resolvedContentClassName}>
        {children}
      </div>
    </div>
  )
}

export default RatioBox
