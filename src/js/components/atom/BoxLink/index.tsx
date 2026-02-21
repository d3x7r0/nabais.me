import type { ComponentProps } from 'react'

import { clsx } from 'clsx'

import { useCSSVariable } from '../../../hooks/css'

import styles from './index.module.scss'

const BACKGROUND_CHARACTER_LIMIT = 160

type BoxLinkProps = {
  big?: boolean
  description?: string
  href: string
  title: string
} & ComponentProps<'article'>

// TODO: support image background instead of text
function BoxLink(props: BoxLinkProps) {
  const {
    big = false,
    description,
    href,
    title,
    ...rest
  } = props

  const style = useCSSVariable(
    'bg-content',
    (description ?? title).replaceAll(/\n/g, ' ').slice(0, BACKGROUND_CHARACTER_LIMIT),
  )

  return (
    <article
      className={clsx(styles['a-box-link'], {
        [styles['p-page__entry--big']]: big,
      })}
      style={style}
      {...rest}
    >
      <a className={styles['a-box-link__link']} href={href}>
        <h1 className={styles['a-box-link__title']}>
          <span>{title}</span>
        </h1>
      </a>
    </article>
  )
}

export default BoxLink
