import type { LightboxEntry, LightboxGroupEntry, LightboxGroupState, LightboxState } from './types'
import type { ReactNode } from 'react'

import { useCallback, useLayoutEffect, useMemo, useState } from 'react'
import { Lightbox } from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'

import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'

import { LightboxProvider } from './context'
import { ensureGroup } from './utils'

export type LightboxWrapperProps = {
  children?: ReactNode
  loop?: boolean
  onChange?: (state: LightboxState) => void
}

function LightboxWrapper(props: LightboxWrapperProps) {
  const {
    children,
    loop = false,
    onChange,
  } = props

  const [entries, setEntries] = useState<LightboxGroupState>({})
  const [sort, triggerSort] = useState<number>(0)
  const [state, setCurrent] = useState<LightboxState>({
    group: undefined,
    idx: undefined,
    open: false,
  })

  const register = useCallback((id: string, data: Omit<LightboxEntry, 'group' | 'id'>, group?: string) => {
    const g = ensureGroup(group)

    setEntries((prev) => {
      const groupEntries: LightboxGroupEntry[] = prev[g] || []
      return {
        ...prev,
        [g]: [...groupEntries, {
          data: {
            ...data,
            group: g,
            id,
          },
          id,
        }],
      }
    })

    triggerSort(c => c + 1)
  }, [])

  const unregister = useCallback((id: string, group?: string) => {
    const g = ensureGroup(group)

    setEntries((prev) => {
      if (!prev[g]) {
        return prev
      }
      return {
        ...prev,
        [g]: prev[g].filter(entry => entry.id !== id),
      }
    })
  }, [])

  const open = useCallback((id: string, group?: string) => {
    const g = ensureGroup(group)
    if (!entries[g]) {
      return
    }

    const idx = entries[g].findIndex(entry => entry.id === id)
    const newState: LightboxState = {
      group: g,
      idx: idx >= 0 ? idx : 0,
      open: true,
    }

    setCurrent(newState)
    onChange?.(newState)
  }, [entries, onChange])

  const close = useCallback(() => {
    const newState = { open: false }
    setCurrent(newState)
    onChange?.(newState)
  }, [onChange])

  useLayoutEffect(() => {
    const order: string[] = []
    document.querySelectorAll(`[data-lightbox]`).forEach((node) => {
      if (node instanceof HTMLElement && node.dataset.lightboxId) {
        order.push(node.dataset.lightboxId)
      }
    })

    for (const groupKey in entries) {
      entries[groupKey].sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))
    }
  }, [entries, sort])

  const currentEntries = useMemo(
    () => entries[state.group ?? ''] || [],
    [entries, state.group],
  )

  const slides = useMemo(() =>
    currentEntries.map(entry => ({
      description: entry.data.caption,
      src: entry.data.src,
    })),
  [currentEntries],
  )

  const ctxValue = useMemo(
    () => ({
      close,
      open,
      register,
      unregister,
    }),
    [register, unregister, open, close],
  )

  return (
    <LightboxProvider value={ctxValue}>
      {children}

      <Lightbox
        carousel={{ finite: !loop }}
        close={close}
        controller={{ closeOnBackdropClick: true }}
        index={state.idx}
        on={{
          view({ index }) {
            if (index !== state.idx) {
              const newState = { ...state, idx: index }
              setCurrent(newState)
              onChange?.(newState)
            }
          },
        }}
        open={state.open}
        plugins={[Captions]}
        slides={slides}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.9)' },
          slide: { padding: '80px' },
        }}
      />
    </LightboxProvider>
  )
}

export default LightboxWrapper
