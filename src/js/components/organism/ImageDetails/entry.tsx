import type { FunctionalComponent } from 'preact'
import clsx from 'clsx'
import capitalize from 'lodash-es/capitalize'

import IconText from '../../atom/IconText'
import { SIDE_LEFT } from '../../../constants.js'

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

  return (
    <>
      <dt className={buildLabelClassNames(label)}>
        <IconText IconComponent={Icon} side={SIDE_LEFT}>
          {capitalize(label)}
        </IconText>
      </dt>
      <dd className={buildValueClassNames(label)}>
        {children}
      </dd>
    </>
  )
}

function buildLabelClassNames(label?: ICON_LABEL) {
  return clsx(
    styles['o-image-details__label'],
    { [styles[`o-image-details__label--${label}`]]: !!label },
  )
}

function buildValueClassNames(label?: ICON_LABEL) {
  return clsx(
    styles['o-image-details__value'],
    { [styles[`o-image-details__value--${label}`]]: !!label },
  )
}

export default ImageDetailsEntry
