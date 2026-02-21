import type { ReactNode } from 'react'

import { clsx } from 'clsx'
import capitalize from 'lodash-es/capitalize'

import { SIDE } from '../../../constants'
import IconText from '../../atom/IconText'

import { ICONS } from './constants'
import styles from './index.module.scss'

export type ImageDetailsEntryProps = {
  children?: ReactNode
  className?: string
  label?: ICON_LABEL
}

type ICON_LABEL = keyof typeof ICONS

function ImageDetailsEntry(props: ImageDetailsEntryProps) {
  const {
    children,
    label,
  } = props

  const Icon = label ? ICONS[label] : undefined

  const dtClassNames = clsx(
    styles['o-image-details__label'],
    { [styles[`o-image-details__label--${label}`]]: !!label },
  )

  const ddClassNames = clsx(
    styles['o-image-details__value'],
    { [styles[`o-image-details__value--${label}`]]: !!label },
  )

  return (
    <>
      <dt className={dtClassNames}>
        <IconText IconComponent={Icon} side={SIDE.LEFT}>
          {capitalize(label)}
        </IconText>
      </dt>
      <dd className={ddClassNames}>
        {children}
      </dd>
    </>
  )
}

export default ImageDetailsEntry
