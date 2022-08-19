// noinspection ES6UnusedImports
// eslint-disable-next-line no-unused-vars
import { h } from 'preact'
import classNames from 'classnames'
import capitalize from 'lodash-es/capitalize'
import { Aperture, Camera, MapPin, Clock, FileText } from 'react-feather'

import styles from './index.module.scss'

import IconText from '@/components/atom/IconText'
import { SIDE_LEFT } from '@/js/constants'

const ImageDetails = (props) => {
  const {
    description,
    time,
    camera,
    lens,
    location,
    map,
    className,
    ...rest
  } = props

  return (
    <dl
      {...rest}
      className={classNames(styles['o-image-details'], className)}
    >
      {description ? (
        <ImageDetailsEntry label="description">
          {description}
        </ImageDetailsEntry>
      ) : null}

      {time ? (
        <ImageDetailsEntry label="time">
          {time}
        </ImageDetailsEntry>
      ) : null}

      {camera ? (
        <ImageDetailsEntry label="camera">
          {camera}
        </ImageDetailsEntry>
      ) : null}

      {lens ? (
        <ImageDetailsEntry label="lens">
          {lens}
        </ImageDetailsEntry>
      ) : null}

      {(location || map) ? (
        <ImageDetailsEntry label="location">
          <Location value={location} href={map} />
        </ImageDetailsEntry>
      ) : null}
    </dl>
  )
}

const ICONS = {
  description: FileText,
  time: Clock,
  camera: Camera,
  lens: Aperture,
  location: MapPin,
}

const ImageDetailsEntry = (props) => {
  const {
    label,
    children,
  } = props

  const Icon = ICONS[label] || null

  return (
    <>
      <dt className={buildLabelClassNames({ label })}>
        <IconText IconComponent={Icon} side={SIDE_LEFT}>
          {capitalize(label)}
        </IconText>
      </dt>
      <dd className={buildValueClassNames({ label })}>
        {children}
      </dd>
    </>
  )
}

function buildLabelClassNames({ label }) {
  return classNames(
    styles['o-image-details__label'],
    styles[`o-image-details__label--${label}`],
  )
}

function buildValueClassNames({ label }) {
  return classNames(
    styles['o-image-details__value'],
    styles[`o-image-details__value--${label}`],
  )
}

const Location = ({
  value,
  href,
}) => {
  if (!href) {
    return value
  }

  const map = <a href={href}>Map</a>

  if (!value) {
    return map
  }

  return (<>{value} [{map}]</>)
}

export default ImageDetails
