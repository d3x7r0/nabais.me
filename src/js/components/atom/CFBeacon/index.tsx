import type { FunctionalComponent} from 'preact'
import { useMemo } from 'preact/hooks'

const DEFAULT_SRC = 'https://static.cloudflareinsights.com/beacon.min.js'

export type CFBeaconProps = {
  src?: string
  token?: string
  spa?: boolean
}

const CFBeacon: FunctionalComponent<CFBeaconProps> = function CFBeacon(props) {
  const {
    src = DEFAULT_SRC,
    token,
    spa = false,
    ...rest
  } = props

  const data = useMemo(() => {
    if (!token) {
      return
    }

    return JSON.stringify({
      token,
      spa,
    })
  }, [token, spa])

  if (!token) {
    return null
  }

  return (
    <script
      {...rest}
      defer
      src={src}
      data-cf-beacon={data}
    ></script>
  )
}

export default CFBeacon
