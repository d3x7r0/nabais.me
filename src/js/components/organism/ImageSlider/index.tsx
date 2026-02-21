import classNames from 'clsx'
import { useKey } from 'rooks'
import type {ComponentType, ComponentProps} from 'react'
import { useCallback, useMemo, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { useKeenSlider } from 'keen-slider/react.es'

import 'keen-slider/keen-slider.css'

import LightboxEntry, { LightboxWrapper } from '../../molecule/Lightbox'
import Figure from '../../atom/Figure'

import styles from './index.module.scss'
import type {KeenSliderInstance} from "keen-slider";
import type {LightboxState} from "../../molecule/Lightbox/types.ts";

let ID_COUNTER = 0
let COUNTER = 0

export type SliderEntry = {
  id?: string
  href?: string
  caption?: string
  picture: ComponentProps<'img'> & {
    caption?: string
  }
  [key: string]: any
}

export type ImageSliderProps = ComponentProps<'div'> & {
  entries?: SliderEntry[]
  ImgComponent?: ComponentType<any> | string
  onSlideChange?: (idx: number) => void
}

function ImageSlider(props: ImageSliderProps) {
  const {
    entries = [],
    className,
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
    slideChanged: onSlideChangedCB,
    initial: 0,
    loop: true,
    mode: 'snap',
    slides: {
      origin: 'center',
      perView: 1.1,
    },
    breakpoints: {
      'screen and (min-width: 1080px)': {
        slides: {
          origin: 'center',
          perView: 1.5,
        },
      },
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
    () => entries.map((entry) => ({
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
        state.open &&
        state.group === lightboxGroup &&
        instanceRef.current.track.details.rel !== state.idx
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
          type="button"
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
          type="button"
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

function buildClassName({ className }: { className?: string }) {
  return classNames(
    className,
    styles['o-image-slider'],
  )
}

type GalleryEntryProps = SliderEntry & {
  ImgComponent?: ComponentType<any> | string
  lightbox?: string
  className?: string
  [key: string]: any
}

function GalleryEntry(props: GalleryEntryProps) {
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

export default ImageSlider
