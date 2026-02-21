import type { SmartImgContextDetails } from './types.ts'

import { useContext, useMemo } from 'react'

import { DEFAULT_FORMATS } from './constants'
import SmartImgContext from './context'

export function useSmartImgSettings(): SmartImgContextDetails {
  const ctx = useContext(SmartImgContext)

  return useMemo(() => ({
    ...ctx,
    formats: ctx.formats || [...DEFAULT_FORMATS],
  } as SmartImgContextDetails), [ctx])
}
