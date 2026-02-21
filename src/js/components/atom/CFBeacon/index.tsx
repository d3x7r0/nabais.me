const DEFAULT_SRC = 'https://static.cloudflareinsights.com/beacon.min.js'

export type CFBeaconProps = {
  spa?: boolean
  src?: string
  token?: string
}

function CFBeacon(props: CFBeaconProps) {
  const {
    spa = false,
    src = DEFAULT_SRC,
    token,
    ...rest
  } = props

  if (!token) {
    return null
  }

  return (
    <script
      {...rest}
      data-cf-beacon={JSON.stringify({
        spa,
        token,
      })}
      defer
      src={src}
    >
    </script>
  )
}

export default CFBeacon
