import { createContext } from 'preact'

import type { LightboxContextValue } from './types.ts'

export const LightboxContext = createContext<LightboxContextValue>({
  register: () => {},
  unregister: () => {},
  open: () => {},
  close: () => {},
})

export const LightboxProvider = LightboxContext.Provider
