import type { ComponentChild } from 'preact'

export type LightboxContextValue = {
  register: (id: string, data: Omit<LightboxEntry, 'id' | 'group'>, group?: string) => void
  unregister: (id: string, group?: string) => void
  open: (id: string, group?: string) => void
  close: () => void
}

export type LightboxState = {
  open: boolean,
  group?: string
  idx?: number
}

export type LightboxEntry = {
  src: string,
  id: string
  caption?: ComponentChild
  group: string,
}

export type LightboxGroupEntry = {
  id: string,
  data: LightboxEntry
}

export type LightboxGroupState = Record<string, LightboxGroupEntry[]>
