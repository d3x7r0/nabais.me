import type { SmartImgProviderProps } from './types.ts'

import SmartImgContext from './context.tsx'

const SmartImgSettingsProvider = (props: SmartImgProviderProps) => {
  const { children, ...rest } = props

  return (
    <SmartImgContext.Provider value={rest}>
      {children}
    </SmartImgContext.Provider>
  )
}

export default SmartImgSettingsProvider
