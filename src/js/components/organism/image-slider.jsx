import classNames from 'classnames'
import useKey from '@rooks/use-key'
import { useCallback, useMemo, useRef } from 'preact/hooks'
import { useKeenSlider } from 'keen-slider/react'
import { Figure, LightboxEntry, LightboxWrapper, LinkWrapper } from '@nonsensebb/components'
import { ChevronLeft, ChevronRight } from 'react-feather'

import styles from '../../../css/03_organism/image-slider.module.scss'

let ID_COUNTER = 0
let COUNTER = 0

const ImageSlider = (props) => {
  // FIXME: due to a bug in preact 10.5.2 we need to make sure to remove className from the props if we want to override it
  // eslint-disable-next-line no-unused-vars
  const {
    entries = [],
    className,
    ImgComponent,
    onSlideChange,
    ...rest
  } = props

  const id = useMemo(() => `imageSlider${ID_COUNTER++}`, [])

  const onSlideChangedCB = useCallback(
    slider => onSlideChange(slider.details().relativeSlide),
    [onSlideChange],
  )

  const lightboxOpen = useRef(false)

  const [sliderRef, slider] = useKeenSlider({
    slideChanged: onSlideChangedCB,
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

  const onArrow = useCallback((e) => {
    if (lightboxOpen.current) {
      return
    }

    if (e.key === 'ArrowLeft') {
      slider.prev()
    }

    if (e.key === 'ArrowRight') {
      slider.next()
    }
  }, [slider])

  useKey(
    ['ArrowLeft', 'ArrowRight'],
    onArrow,
  )

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
      lightboxOpen.current = state.open && state.group === lightboxGroup

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
    <LightboxWrapper
      loop
      onChange={onLightboxChange}
    >
      <div
        {...rest}
        className={buildClassName({ className })}
      >
        <div
          ref={sliderRef}
          aria-roledescription="carousel"
          aria-label="Photo Gallery"
          id={id}
          className="keen-slider"
          aria-live="off"
        >
          {parsedEntries.map((entry, idx, arr) => (
            <GalleryEntry
              ImgComponent={ImgComponent}
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${arr.length}`}
              {...entry}
              lightbox={lightboxGroup}
              key={entry.id || idx}
            />
          ))}
        </div>

        <button
          aria-controls={id}
          aria-label="Previous"
          onClick={onPrevious}
          className={classNames(
            styles['o-image-slider__button'],
            styles['o-image-slider__button--prev'],
          )}
        >
          <ChevronLeft className={styles['o-image-slider__icon']} />
        </button>

        <button
          aria-controls={id}
          aria-label="Next"
          onClick={onNext}
          className={classNames(
            styles['o-image-slider__button'],
            styles['o-image-slider__button--next'],
          )}
        >
          <ChevronRight className={styles['o-image-slider__icon']} />
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
    ImgComponent = 'img',
    ...rest
  } = props

  const img = (
    <ImgComponent alt={alt} {...picture} />
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
