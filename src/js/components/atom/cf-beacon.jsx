import { useMemo } from "preact/hooks"

const SRC = "https://static.cloudflareinsights.com/beacon.min.js"

const CFBeacon = (props) => {
  const {
    token,
    ...rest
  } = props

  const data = useMemo(() => {
    if (!token) {
      return
    }

    return JSON.stringify({
      token,
      spa: true
    })
  }, [token])

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
