import type { ComponentProps, ReactNode } from 'react'

import { clsx } from 'clsx'

import ImageDetailsEntry from './entry'
import styles from './index.module.scss'
import ImageDetailsLocation from './location'

export type ImageDetailsProps = {
  camera?: ReactNode
  description?: ReactNode
  lens?: ReactNode
  location?: ReactNode
  map?: string
  time?: ReactNode
} & ComponentProps<'dl'>

function ImageDetails(props: ImageDetailsProps) {
  const {
    camera,
    className,
    description,
    lens,
    location,
    map,
    time,
    ...rest
  } = props

  return (
    <dl
      {...rest}
      className={clsx(styles['o-image-details'], className)}
    >
      {description
        ? (
            <ImageDetailsEntry label="description">
              {description}
            </ImageDetailsEntry>
          )
        : null}

      {time
        ? (
            <ImageDetailsEntry label="time">
              {time}
            </ImageDetailsEntry>
          )
        : null}

      {camera
        ? (
            <ImageDetailsEntry label="camera">
              {camera}
            </ImageDetailsEntry>
          )
        : null}

      {lens
        ? (
            <ImageDetailsEntry label="lens">
              {lens}
            </ImageDetailsEntry>
          )
        : null}

      {(location || map)
        ? (
            <ImageDetailsEntry label="location">
              <ImageDetailsLocation href={map} value={location} />
            </ImageDetailsEntry>
          )
        : null}
    </dl>
  )
}

export default ImageDetails
