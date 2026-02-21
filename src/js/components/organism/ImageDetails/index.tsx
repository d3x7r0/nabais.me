import type {ComponentProps, ReactNode} from "react";
import clsx from 'clsx'

import styles from './index.module.scss'
import ImageDetailsEntry from './entry'
import ImageDetailsLocation from './location'

export type ImageDetailsProps = ComponentProps<'dl'> & {
  description?: ReactNode
  time?: ReactNode
  camera?: ReactNode
  lens?: ReactNode
  location?: ReactNode
  map?: string
}

function ImageDetails(props: ImageDetailsProps) {
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
