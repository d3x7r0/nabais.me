import {createContext, useContext, useMemo} from 'react'

import {DEFAULT_FORMATS} from './constants.ts'
import type {PulitzerImageFormat, SmartImgContext, SmartImgProviderProps} from './types'

export const Context = createContext<Partial<SmartImgContext>>({})

export function useSmartImgSettings(): SmartImgContext {
  const ctx = useContext(Context)

  return useMemo(() => ({
    ...ctx,
    formats: ctx.formats || [...DEFAULT_FORMATS]
  } as SmartImgContext), [ctx])
}

const SmartImgSettingsProvider = (props: SmartImgProviderProps) => {
  const {children, ...rest} = props

  return (
    <Context.Provider value={rest}>
      {children}
    </Context.Provider>
  )
}

export function withFormats(formats: PulitzerImageFormat[] = []) {
  const WrappedComponent = (props: Omit<SmartImgProviderProps, 'formats'>) => (
    <SmartImgSettingsProvider
      formats={formats}
      {...props}
    />
  )

  WrappedComponent.displayName = `SmartImgSettingsProvider<${formats.join(',')}>`

  return WrappedComponent
}

export default SmartImgSettingsProvider
