import type { PulitzerImageFormat } from '../../../atom/SmartImg/types'

import { withFormats } from '../../../atom/SmartImg/withFormats'

const ENABLED_FORMATS: PulitzerImageFormat[] = [
  'jpeg',
  'png',
  ...import.meta.env?.PUBLIC_ENABLE_AVIF === 'true' ? ['avif' as PulitzerImageFormat] : [],
  ...import.meta.env?.PUBLIC_ENABLE_WEBP !== 'false' ? ['webp' as PulitzerImageFormat] : [],
]

export const SmartImgSettingsProvider = withFormats(ENABLED_FORMATS)
