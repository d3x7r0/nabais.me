import type { LightboxState } from '../../molecule/Lightbox/types.ts'
import type { KeenSliderInstance } from 'keen-slider'
import type { ComponentProps, ComponentType } from 'react'

import classNames from 'clsx'
import { useKeenSlider } from 'keen-slider/react.es'
import { useCallback, useMemo, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { useKey } from 'rooks'

import 'keen-slider/keen-slider.css'

import Figure from '../../atom/Figure'
import { LightboxEntry, LightboxWrapper } from '../../molecule/Lightbox'

import styles from './index.module.scss'

let ID_COUNTER = 0
let COUNTER = 0

export type ImageSliderProps<T> = {
  entries?: SliderEntry[]
  ImgComponent?: ComponentType<T> | string
  onSlideChange?: (idx: number) => void
} & ComponentProps<'div'>

export type SliderEntry = {
  caption?: string
  href?: string
  id?: string
  picture: {
    caption?: string
  } & ComponentProps<'img'>
  [key: string]: unknown
}

type GalleryEntryProps<T> = {
  className?: string
  ImgComponent?: ComponentType<T> | string
  lightbox?: string
  [key: string]: unknown
} & SliderEntry

function buildClassName({ className }: { className?: string }) {
  return classNames(
    className,
    styles['o-image-slider'],
  )
}

function GalleryEntry<T>(props: GalleryEntryProps<T>) {
  const {
    alt,
    className,
    href,
    ImgComponent = 'img',
    lightbox,
    picture,
    ...rest
  } = props

  const img = (
    // @ts-expect-error incomplete generic types
    <ImgComponent alt={alt} {...picture} />
  )

  let inner = img

  if (lightbox) {
    inner = (
      <LightboxEntry
        caption={picture.caption || rest.caption}
        group={lightbox}
        src={href}
      >
        {img}
      </LightboxEntry>
    )
  } else if (href) {
    inner = (
      <a href={href}>
        {img}
      </a>
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

function ImageSlider<T>(props: ImageSliderProps<T>) {
  const {
    className,
    entries = [],
    ImgComponent,
    onSlideChange,
    ...rest
  } = props

  const id = useMemo(() => `imageSlider${ID_COUNTER++}`, [])

  const onSlideChangedCB = useCallback(
    (slider: KeenSliderInstance) => {
      onSlideChange?.(slider.track.details.rel)
    },
    [onSlideChange],
  )

  const lightboxOpen = useRef(false)

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      'screen and (min-width: 1080px)': {
        slides: {
          origin: 'center',
          perView: 1.5,
        },
      },
    },
    initial: 0,
    loop: true,
    mode: 'snap',
    slideChanged: onSlideChangedCB,
    slides: {
      origin: 'center',
      perView: 1.1,
    },
  })

  const onArrow = useCallback((e: KeyboardEvent) => {
    if (lightboxOpen.current) {
      return
    }

    if (!instanceRef.current) {
      return
    }

    if (e.key === 'ArrowLeft') {
      instanceRef.current.prev()
    }

    if (e.key === 'ArrowRight') {
      instanceRef.current.next()
    }
  }, [instanceRef])

  useKey(
    ['ArrowLeft', 'ArrowRight'],
    onArrow,
  )

  const lightboxGroup = useMemo(
    () => `gallery_${COUNTER++}`,
    [],
  )

  const parsedEntries = useMemo(
    () => entries.map(entry => ({
      ...entry,
      href: entry.href || entry.picture.src || undefined,
      id: entry.id || `gallery_entry_${COUNTER++}`,
    })),
    [entries],
  )

  const onPrevious = useCallback(
    () => {
      if (instanceRef.current) {
        instanceRef.current.prev()
      }
    },
    [instanceRef],
  )

  const onNext = useCallback(
    () => {
      if (instanceRef.current) {
        instanceRef.current.next()
      }
    },
    [instanceRef],
  )

  const onLightboxChange = useCallback(
    (state: LightboxState) => {
      lightboxOpen.current = state.open && state.group === lightboxGroup

      if (!instanceRef.current) {
        return
      }

      if (
        state.open
        && state.group === lightboxGroup
        && instanceRef.current.track.details.rel !== state.idx
      ) {
        instanceRef.current.moveToIdx(state.idx ?? 0, true)
      }
    },
    [instanceRef, lightboxGroup],
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
          aria-label="Photo Gallery"
          aria-live="off"
          aria-roledescription="carousel"
          className="keen-slider"
          id={id}
          ref={sliderRef}
        >
          {parsedEntries.map((entry, idx, arr) => (
            <GalleryEntry
              aria-label={`${idx + 1} of ${arr.length}`}
              aria-roledescription="slide"
              ImgComponent={ImgComponent}
              role="group"
              {...entry}
              key={entry.id || idx}
              lightbox={lightboxGroup}
            />
          ))}
        </div>

        <button
          aria-controls={id}
          aria-label="Previous"
          className={classNames(
            styles['o-image-slider__button'],
            styles['o-image-slider__button--prev'],
          )}
          onClick={onPrevious}
          type="button"
        >
          <ChevronLeft className={styles['o-image-slider__icon']} />
        </button>

        <button
          aria-controls={id}
          aria-label="Next"
          className={classNames(
            styles['o-image-slider__button'],
            styles['o-image-slider__button--next'],
          )}
          onClick={onNext}
          type="button"
        >
          <ChevronRight className={styles['o-image-slider__icon']} />
        </button>
      </div>
    </LightboxWrapper>
  )
}

export default ImageSlider
