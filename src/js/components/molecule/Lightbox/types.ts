import type { ReactNode } from 'react'

export type LightboxContextValue = {
  close: () => void
  open: (id: string, group?: string) => void
  register: (id: string, data: Omit<LightboxEntry, 'group' | 'id'>, group?: string) => void
  unregister: (id: string, group?: string) => void
}

export type LightboxEntry = {
  caption?: ReactNode
  group: string
  id: string
  src: string
}

export type LightboxGroupEntry = {
  data: LightboxEntry
  id: string
}

export type LightboxGroupState = Record<string, LightboxGroupEntry[]>

export type LightboxState = {
  group?: string
  idx?: number
  open: boolean
}
