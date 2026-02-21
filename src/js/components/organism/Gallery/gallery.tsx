import type {JSX} from "react";
import {useMemo} from "react";
import {GalleryListEntry} from '../../molecule/GalleryList'
import {LightboxWrapper} from '../../molecule/Lightbox'

import type {GalleryInnerProps} from './inner'
import GalleryInner from './inner'
import type {GalleryEntryProps} from './entry'
import GalleryEntry from './entry'

let COUNTER = 0

export type GalleryProps = GalleryInnerProps & {
  lightbox?: boolean
  entries: GalleryEntryProps[]
  ImgElement?: JSX.ElementType
}

const Gallery = function Gallery(props: GalleryProps) {
  const {
    lightbox = false,
    entries = [],
    ImgElement,
    ...rest
  } = props

  const lightboxGroup = useMemo(
    () => lightbox ? `gallery_${COUNTER++}` : undefined,
    [lightbox],
  )

  const parsedEntries = useMemo(
    () => entries.map((entry) => {
      const href = lightbox ? (entry.href || entry.picture.src || undefined) : entry.href

      return ({
        ...entry,
        href,
        id: entry.id || `gallery_entry_${COUNTER++}`,
      })
    }),
    [entries, lightbox],
  )

  const inner = (
    <GalleryInner {...rest}>
      {parsedEntries.map((entry, idx) => (
        <GalleryListEntry key={entry.id || idx}>
          <GalleryEntry
            {...entry}
            lightbox={lightboxGroup}
            ImgElement={ImgElement}
          />
        </GalleryListEntry>
      ))}
    </GalleryInner>
  )

  if (lightbox) {
    return (
      <LightboxWrapper>
        {inner}
      </LightboxWrapper>
    )
  }

  return inner
}
export default Gallery
