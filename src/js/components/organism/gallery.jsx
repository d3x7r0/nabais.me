/** @jsx h */
import { h } from 'preact'
import { useMemo } from 'preact/hooks'

import Figure from '../atom/figure'
import GalleryList from '../molecule/gallery-list'
import Lightbox from '../molecule/lightbox'
import LinkWrapper from '../router/link'

let COUNTER = 0

const Gallery = (props) => {
  const {
    entries = [],
    lightbox = false,
    ...rest
  } = props

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

  const lightboxEntries = useMemo(
    () => {
      if (!lightbox) {
        return []
      }

      return entries.map(entry => ({
        ...entry.picture,
        src: entry.href || entry.picture.src,
        id: entry.id,
        caption: entry.picture.caption || entry.caption,
      }))
    },
    [entries, lightbox],
  )

  if (!lightbox) {
    return (
      <GalleryInner
        {...rest}
        entries={parsedEntries}
      />
    )
  }

  return (
    <Lightbox entries={lightboxEntries}>
      {({ open }) => (
        <GalleryInner
          {...rest}
          entries={parsedEntries}
          onOpen={open}
        />
      )}
    </Lightbox>
  )
}

function GalleryInner(props) {
  const {
    entries = [],
    caption,
    onOpen,
    ...rest
  } = props

  const children = entries.map((entry, idx) => {
    const onClick = onOpen && ((e) => {
      e.preventDefault()
      onOpen(idx)
    })

    const entryProps = {
      ...entry,
      ...(onClick ? { linkProps: { onClick } } : null),
    }

    return (
      <GalleryEntry
        {...entryProps}
        key={entry.id}
      />
    )
  })

  if (caption) {
    return (
      <Figure caption={caption} {...rest}>
        <GalleryList noMargin>
          {children}
        </GalleryList>
      </Figure>
    )
  }

  return (
    <GalleryList {...rest}>
      {children}
    </GalleryList>
  )
}

const GalleryEntry = (props) => {
  const {
    picture,
    alt,
    href,
    linkProps = {},
    ...rest
  } = props

  const img = <img alt={alt} {...picture} />

  return (
    <Figure {...rest}>
      {href ?
        <LinkWrapper href={href} {...linkProps}>{img}</LinkWrapper> :
        img
      }
    </Figure>
  )
}

export default Gallery
