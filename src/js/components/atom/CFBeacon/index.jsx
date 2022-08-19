// noinspection ES6UnusedImports
// eslint-disable-next-line no-unused-vars
import { h } from 'preact'
import { useMemo } from 'preact/hooks'

const SRC = 'https://static.cloudflareinsights.com/beacon.min.js'

const CFBeacon = (props) => {
  const {
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
      src={SRC}
      data-cf-beacon={data}
    ></script>
  )
}

export default CFBeacon
