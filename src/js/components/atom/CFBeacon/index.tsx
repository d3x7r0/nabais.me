const DEFAULT_SRC = 'https://static.cloudflareinsights.com/beacon.min.js'

export type CFBeaconProps = {
  src?: string
  token?: string
  spa?: boolean
}

function CFBeacon(props: CFBeaconProps) {
  const {
    src = DEFAULT_SRC,
    token,
    spa = false,
    ...rest
  } = props

  if (!token) {
    return null
  }

  return (
    <script
      {...rest}
      defer
      src={src}
      data-cf-beacon={JSON.stringify({
        token,
        spa,
      })}
    ></script>
  )
}

export default CFBeacon
