import Link from 'next/link'

const NextLinkWrapper = (props) => {
  const {
    href, as, internal, linkProps, children, ...rest
  } = props

  if (typeof href === 'string' && !linkProps && !internal) {
    return <a href={href || ''} {...rest}>{children}</a>
  }

  const asValue = as || href && href.as
  const hrefValue = href && href.href || href

  return (
    <Link
      as={asValue || ''}
      href={hrefValue || ''}
      passHref={!!asValue}
      {...linkProps}
    >
      <a {...rest}>{children}</a>
    </Link>
  )
}

export default NextLinkWrapper
