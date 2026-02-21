import type { PulitzerImageFormat, SmartImgProviderProps } from './types.ts'

import SmartImgSettingsProvider from './provider.tsx'

export function withFormats(formats: PulitzerImageFormat[] = []) {
  const WrappedComponent = (props: Omit<SmartImgProviderProps, 'formats'>) => (
    <SmartImgSettingsProvider
      formats={formats}
      {...
        props
      }
    />
  )

  WrappedComponent.displayName = `SmartImgSettingsProvider<${formats.join(',')}>`

  return WrappedComponent
}
