import type { SmartImgContextDetails } from './types'

import { createContext } from 'react'

const SmartImgContext = createContext<Partial<SmartImgContextDetails>>({})

export default SmartImgContext
