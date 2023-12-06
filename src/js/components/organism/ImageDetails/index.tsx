import type { ComponentChild, FunctionalComponent, JSX } from 'preact'
import clsx from 'clsx'

import styles from './index.module.scss'
import ImageDetailsEntry from './entry'
import ImageDetailsLocation from './location'

export type ImageDetailsProps = {
  description?: ComponentChild
  time?: ComponentChild
  camera?: ComponentChild
  lens?: ComponentChild
  location?: ComponentChild
  map?: JSX.HTMLAttributes['href']
  className?: JSX.HTMLAttributes['className']
}

const ImageDetails: FunctionalComponent<ImageDetailsProps> = function ImageDetails(props) {
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
      className={clsx(styles['o-image-details'], className)}
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
          <ImageDetailsLocation value={location} href={map} />
        </ImageDetailsEntry>
      ) : null}
    </dl>
  )
}

export default ImageDetails
