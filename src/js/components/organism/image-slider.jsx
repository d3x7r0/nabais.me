/** @jsx h */
import { h } from 'preact'
import classNames from 'classnames'
import { useCallback, useMemo } from 'preact/hooks'
import { useKeenSlider } from 'keen-slider/react'
import { Figure, LightboxEntry, LightboxWrapper, LinkWrapper } from '@nonsensebb/components'
import { ChevronLeft, ChevronRight } from 'react-feather'

import styles from '../../../css/03_organism/image-slider.module.scss'

let COUNTER = 0

const ImageSlider = (props) => {
  const { entries = [], ...rest } = props

  const [sliderRef, slider] = useKeenSlider({
    initial: 0,
    loop: true,
    mode: 'snap',
    centered: true,
    slidesPerView: 1.1,
    breakpoints: {
      'screen and (min-width: 1080px)': {
        slidesPerView: 1.5,
      },
    },
  })

  const lightboxGroup = useMemo(
    () => `gallery_${COUNTER++}`,
    [],
  )

  const parsedEntries = useMemo(
    () => entries.map((entry) => ({
      ...entry,
      href: entry.href || entry.picture.src || undefined,
      id: entry.id || `gallery_entry_${COUNTER++}`,
    })),
    [entries],
  )

  const onPrevious = useCallback(
    () => slider.prev(),
    [slider],
  )

  const onNext = useCallback(
    () => slider.next(),
    [slider],
  )

  const onLightboxChange = useCallback(
    state => {
      if (
        state.open &&
        state.group === lightboxGroup &&
        slider.details().relativeSlide !== state.idx
      ) {
        slider.moveToSlide(state.idx, 0)
      }
    },
    [slider, lightboxGroup],
  )

  return (
    <LightboxWrapper onChange={onLightboxChange}>
      <div {...rest} className={buildClassName(props)}>
        <div ref={sliderRef} className="keen-slider">
          {parsedEntries.map((entry, idx) => (
            <GalleryEntry
              {...entry}
              lightbox={lightboxGroup}
              key={entry.id || idx}
            />
          ))}
        </div>

        <button
          aria-label="Previous"
          onClick={onPrevious}
          className={classNames(
            styles['o-image-slider__button'],
            styles['o-image-slider__button--prev'],
          )}
        >
          <ChevronLeft className={styles['o-image-slider__icon']} size={48} />
        </button>

        <button
          aria-label="Next"
          onClick={onNext}
          className={classNames(
            styles['o-image-slider__button'],
            styles['o-image-slider__button--next'],
          )}
        >
          <ChevronRight className={styles['o-image-slider__icon']} size={48} />
        </button>
      </div>
    </LightboxWrapper>
  )
}

function buildClassName({ className }) {
  return classNames(
    className,
    styles['o-image-slider'],
  )
}

const GalleryEntry = (props) => {
  const {
    picture,
    alt,
    href,
    lightbox,
    className,
    ...rest
  } = props

  const img = (
    <img alt={alt} {...picture} />
  )

  let inner = img

  if (lightbox) {
    inner = (
      <LightboxEntry
        src={href}
        group={lightbox}
        caption={picture.caption || rest.caption}
      >
        {img}
      </LightboxEntry>
    )
  } else if (href) {
    inner = (
      <LinkWrapper href={href}>
        {img}
      </LinkWrapper>
    )
  }

  return (
    <Figure
      {...rest}
      className={classNames(className, 'keen-slider__slide')}
    >
      {inner}
    </Figure>
  )
}

export default ImageSlider
