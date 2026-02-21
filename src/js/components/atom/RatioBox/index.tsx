import type {CSSProperties, ReactNode} from "react";
import clsx from 'clsx'

import type {Ratio} from '../../utils'
import {getRatio} from '../../utils'
import {useCSSVariable} from '../../../hooks/css'

import styles from './index.module.scss'

export type RatioBoxProps = {
  className?: string
  style?: CSSProperties
  contentClassName?: string
  ratio?: Ratio
  children?: ReactNode
}

const RatioBox = function RatioBox(props: RatioBoxProps) {
  const {
    className,
    children,
    ratio,
    style,
    contentClassName,
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
