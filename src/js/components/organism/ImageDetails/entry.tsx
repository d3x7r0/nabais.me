import type { FunctionalComponent } from 'preact'
import capitalize from 'lodash-es/capitalize'
import clsx from 'clsx'

import IconText from '../../atom/IconText'
import { SIDE } from '../../../constants'

import styles from './index.module.scss'
import { ICONS } from './constants'

type ICON_LABEL = keyof typeof ICONS

export type ImageDetailsEntryProps = {
  label?: ICON_LABEL
}

const ImageDetailsEntry: FunctionalComponent<ImageDetailsEntryProps> = function ImageDetailsEntry(props) {
  const {
    label,
    children,
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
