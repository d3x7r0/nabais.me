/* eslint-disable */
// Fix for react-image-lightbox
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.global = window
}

import type { FunctionalComponent } from 'preact'
import { useCallback, useLayoutEffect, useMemo, useState } from 'preact/hooks'
import ReactImageLightbox from 'react-image-lightbox'

import type {
  LightboxEntry,
  LightboxGroupEntry,
  LightboxGroupState,
  LightboxState,
} from './types'
import { ensureGroup } from './utils'
import { LightboxProvider } from './context'

import 'react-image-lightbox/style.css'

export type LightboxWrapperProps = {
  loop?: boolean

  onChange?: (state: LightboxState) => void
}

// TODO: control gallery by hash
const LightboxWrapper: FunctionalComponent<LightboxWrapperProps> = function LightboxWrapper(props) {
  const {
    children,
    loop = false,
    onChange,
  } = props

  const [entries, setEntries] = useState<LightboxGroupState>({})
  const [sort, triggerSort] = useState<number>(0)
  const [state, setCurrent] = useState<LightboxState>({
    open: false,
    group: undefined,
    idx: undefined,
  })

  const register = useCallback((id: string, data: Omit<LightboxEntry, 'id' | 'group'>, group?: string) => {
    const g = ensureGroup(group)

    setEntries(entries => {
      const groupEntries: LightboxGroupEntry[] = entries[g] || []

      return {
        ...entries,
        [g]: groupEntries.concat({
          id,
          data: {
            ...data,
            id,
            group: g,
          },
        })
        ,
      }
    })

    triggerSort(c => c + 1)
  }, [setEntries, triggerSort])

  const unregister = useCallback((id: string, group?: string) => {
    const g = ensureGroup(group)

    // noinspection TypeScriptValidateTypes
    setEntries(entries => {
      if (!entries[g]) {
        return entries
      }

      return {
        ...entries,
        [g]: entries[g].filter(entry => entry.id !== id),
      }
    })
  }, [setEntries])

  const open = useCallback((id: string, group?: string) => {
    const g = ensureGroup(group)

    if (!entries[g]) {
      return
    }

    const idx = entries[g].findIndex(entry => entry.id === id)

    const newState: LightboxState = {
      open: true,
      group: g,
      idx,
    }

    setCurrent(newState)
    onChange?.(newState)
  }, [entries, setCurrent, onChange])

  useLayoutEffect(() => {
    const order: string[] = []
    for (const node of document.querySelectorAll(`[data-lightbox]`)) {
      if (node instanceof HTMLElement && node.dataset.lightboxId) {
        order.push(node.dataset.lightboxId)
      }
    }

    for (const group of Object.values(entries)) {
      group.sort((a, b) => {
        return order.indexOf(a.id) - order.indexOf(b.id)
      })
    }
  }, [entries, sort])

  const currentEntries = useMemo<LightboxGroupEntry[]>(
    () => entries[state.group ?? ''] || [],
    [entries, state.group],
  )

  const { data: currentEntry } = findCurrentEntry(currentEntries, state.idx)
  const { data: nextEntry } = findNextEntry(currentEntries, state.idx, loop)
  const { data: prevEntry } = findPreviousEntry(currentEntries, state.idx, loop)

  const close = useCallback(
    () => {
      const newState = { open: false }
      setCurrent(newState)
      onChange?.(newState)
    },
    [setCurrent, onChange],
  )

  const ctxValue = useMemo(
    () => ({
      register,
      unregister,
      open,
      close,
    }),
    [register, unregister, open, close],
  )

  const onMoveNextRequest = useCallback(
    () => setCurrent(state => {
      const currentIdx = state.idx ?? 0

      const newState: LightboxState = {
        ...state,
        idx: currentIdx + 1 === currentEntries.length ? 0 : currentIdx + 1,
      }

      onChange?.(newState)

      return newState
    }),
    [currentEntries, setCurrent, onChange],
  )

  const onMovePrevRequest = useCallback(
    () => setCurrent(state => {
      const currentIdx = state.idx ?? 0

      const newState: LightboxState = {
        ...state,
        idx: currentIdx === 0 ? currentEntries.length - 1 : currentIdx - 1,
      }

      onChange?.(newState)

      return newState
    }),
    [currentEntries, setCurrent, onChange],
  )

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const lightbox = state.open && <ReactImageLightbox
    mainSrc={currentEntry?.src}
    nextSrc={nextEntry && nextEntry.src}
    prevSrc={prevEntry && prevEntry.src}
    imageCaption={currentEntry?.caption}
    imagePadding={80}
    onCloseRequest={close}
    onMoveNextRequest={nextEntry && onMoveNextRequest}
    onMovePrevRequest={prevEntry && onMovePrevRequest}
  />

  return (
    <LightboxProvider value={ctxValue}>
      {children}

      {lightbox}
    </LightboxProvider>
  )
}

function findCurrentEntry(
  currentEntries: LightboxGroupEntry[] = [],
  idx?: number,
): Partial<LightboxGroupEntry> {
  return idx && currentEntries[idx] || {}
}

function findNextEntry(
  currentEntries: LightboxGroupEntry[] = [],
  idx: number = 0,
  loop: boolean = false,
): Partial<LightboxGroupEntry> {
  if (idx < currentEntries.length - 1) {
    return currentEntries[idx + 1] || {}
  }

  if (loop && currentEntries.length > 1) {
    return currentEntries[0] || {}
  }

  return {}
}

function findPreviousEntry(
  currentEntries: LightboxGroupEntry[] = [],
  idx: number = 0,
  loop: boolean = false,
): Partial<LightboxGroupEntry> {
  if (idx > 0) {
    return currentEntries[idx - 1] || {}
  }

  if (loop && currentEntries.length > 1) {
    return currentEntries[currentEntries.length - 1] || {}
  }

  return {}
}

export default LightboxWrapper
