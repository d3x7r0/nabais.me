import type { LightboxContextValue } from './types'

import { createContext } from 'react'

export const LightboxContext = createContext<LightboxContextValue>({
  close() {},
  open() {},
  register() {},
  unregister() {},
})

export const LightboxProvider = LightboxContext.Provider
