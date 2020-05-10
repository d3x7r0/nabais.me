/** @jsx h */
import { createContext, h, toChildArray } from 'preact'
import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'preact/hooks'
import ReactImageLightbox from 'react-image-lightbox'

import LinkWrapper from '../router/link'

// TODO: reduce duplicate code
const Lightbox = (props) => {
  const {
    entries = [],
    children,
  } = props

  const [isOpen, setOpen] = useState(false)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    setOpen(false)
    setCurrent(0)
  }, [entries])

  const onOpenImage = useCallback((idx) => {
    setCurrent(idx)
    setOpen(true)
  }, [setCurrent, setOpen])

  const onClose = useCallback(
    () => setOpen(false),
    [setOpen],
  )

  const currentEntry = entries[current]
  const nextEntry = current < entries.length ? entries[current + 1] : undefined

  const prevEntry = current > 0 ? entries[current - 1] : undefined

  const [child] = toChildArray(children)

  return (
    <>
      {child({
        isOpen,
        current,
        open: onOpenImage,
        close: onClose,
      })}

      {isOpen && <ReactImageLightbox
        mainSrc={currentEntry.src}
        nextSrc={nextEntry && nextEntry.src}
        prevSrc={prevEntry && prevEntry.src}
        imageCaption={currentEntry.caption}
        imagePadding={80}
        onCloseRequest={onClose}
        onMoveNextRequest={nextEntry && (() => setCurrent(current => current + 1))}
        onMovePrevRequest={prevEntry && (() => setCurrent(current => current - 1))}
      />}
    </>
  )
}

const DEFAULT_GROUP = '__default__'

const LightboxContext = createContext({})
const LightboxProvider = LightboxContext.Provider

export const LightboxWrapper = (props) => {
  const { children } = props

  const entriesRef = useRef({})
  const [isOpen, setOpen] = useState(false)
  const [currentGroup, setGroup] = useState(undefined)
  const [currentIdx, setCurrent] = useState(0)
  const [sort, triggerSort] = useState(0)

  const register = useCallback((id, data, group) => {
    group = group || DEFAULT_GROUP

    entriesRef.current[group] = entriesRef.current[group] || []
    entriesRef.current[group].push({
      id,
      data,
    })

    triggerSort(c => c + 1)
  }, [entriesRef, triggerSort])

  const unregister = useCallback((id, group) => {
    group = group || DEFAULT_GROUP

    if (entriesRef.current[group]) {
      const idx = entriesRef.current[group].findIndex(entry => entry.id === id)
      entriesRef.current[group].splice(idx, 1)
    }

  }, [entriesRef])

  const open = useCallback((id, group) => {
    group = group || DEFAULT_GROUP

    if (!entriesRef.current[group]) {
      return
    }

    const idx = entriesRef.current[group].findIndex(entry => entry.id === id)
    setGroup(group)
    setCurrent(idx)
    setOpen(true)
  }, [entriesRef, setGroup, setCurrent, setOpen])

  useLayoutEffect(() => {
    const order = []
    for (let node of document.querySelectorAll(`[data-lightbox]`)) {
      order.push(node.dataset.lightboxId)
    }

    for (let group of Object.values(entriesRef.current)) {
      group.sort((a, b) => {
        return order.indexOf(a.id) - order.indexOf(b.id)
      })
    }
  }, [sort])

  const currentData = entriesRef.current[currentGroup] || []
  const { data: currentEntry } = currentData[currentIdx] || {}
  const { data: nextEntry } = currentIdx < currentData.length && currentData[currentIdx + 1] || {}
  const { data: prevEntry } = currentIdx > 0 && currentData[currentIdx - 1] || {}

  const close = () => setOpen(false)

  const ctxValue = {
    register,
    unregister,
    open,
    close,
  }

  return (
    <LightboxProvider value={ctxValue}>
      {children}

      {isOpen && <ReactImageLightbox
        mainSrc={currentEntry.src}
        nextSrc={nextEntry && nextEntry.src}
        prevSrc={prevEntry && prevEntry.src}
        imageCaption={currentEntry.caption}
        imagePadding={80}
        onCloseRequest={close}
        onMoveNextRequest={nextEntry && (() => setCurrent(current => current + 1))}
        onMovePrevRequest={prevEntry && (() => setCurrent(current => current - 1))}
      />}
    </LightboxProvider>
  )
}


let COUNTER = 0

export const LightboxEntry = (props) => {
  const {
    src,
    caption,
    group,
    children,
    ...rest
  } = props

  const id = useMemo(() => {
    return rest.id || `lightbox_entry_${COUNTER++}`
  }, [rest.id])

  const { register, unregister, open } = useContext(LightboxContext) || {}

  useEffect(() => {
    if (!register) {
      return
    }

    register(
      id,
      {
        src,
        caption,
      },
      group,
    )

    return () => unregister(id, group)
  }, [id, src, caption, group, register, unregister])

  const onClick = open ? (
    (e) => {
      e.preventDefault()
      return open(id, group)
    }
  ) : undefined

  return (
    <LinkWrapper
      href={src}
      {...rest}
      data-lightbox-id={id}
      onClick={onClick}
    >
      {children}
    </LinkWrapper>
  )
}

export default Lightbox
