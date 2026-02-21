import {createContext} from "react";

import type { LightboxContextValue } from './types'

export const LightboxContext = createContext<LightboxContextValue>({
  register: () => {},
  unregister: () => {},
  open: () => {},
  close: () => {},
})

export const LightboxProvider = LightboxContext.Provider
