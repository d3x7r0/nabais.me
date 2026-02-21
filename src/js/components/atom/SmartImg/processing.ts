import isString from 'lodash-es/isString'

const PROCESSING_URI_LOCATION_REGEX = /(\w)(?:\/)([^/]+)$/

export function addProcessing(src?: string, opts: {
  width?: number,
  height?: number,
  maxWidth?: number,
  fit?: string,
  format?: string,
  placeholder?: boolean
  crop?: string
} = {}) {
  if (!isString(src)) {
    return src
  }

  const parts = []

  if (opts.width && opts.height) {
    parts.push(`${opts.width}x${opts.height}`)
  }

  if (opts.maxWidth) {
    parts.push(`mw-${opts.maxWidth}`)
  }

  if (opts.fit) {
    parts.push(opts.fit)
  }

  if (opts.format) {
    parts.push(`ff-${opts.format.toLowerCase()}`)
  }

  if (opts.placeholder) {
    parts.push('preview')
  }

  if (opts.crop) {
    parts.push(opts.crop)
  }

  if (!parts.length) {
    return src
  }

  return src.replace(
    PROCESSING_URI_LOCATION_REGEX,
    `$1/__processed/${parts.join('/')}/_/$2`,
  )
}
