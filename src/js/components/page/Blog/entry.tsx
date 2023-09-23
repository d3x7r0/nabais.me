import type { FunctionalComponent, JSX } from 'preact'
import clsx from 'clsx'

import { useCSSVariable } from '../../../hooks'

import styles from './index.module.scss'

type BlogPageEntryProps = {
  className?: JSX.HTMLAttributes['className'],

  title: string
  href: string
  description?: string
  big?: boolean
}

// TODO: support image background instead of text
const BlogPageEntry: FunctionalComponent<BlogPageEntryProps> = function (props) {
  const {
    title,
    href,
    description,
    big = false,
    ...rest
  } = props

  const style = useCSSVariable(
    'bg-content',
    (description ?? title).replaceAll(/\n/g, ' ').slice(0, 120)
  )

  return (
    <article
      {...rest}
    >
      <a
        href={href}
        style={style}
        className={clsx(styles['p-page__entry'], {
          [styles['p-page__entry--big']]: big,
        })}
      >
        <h1 className={styles['p-page__entry_title']}>
          <span>{title}</span>
        </h1>
      </a>
    </article>
  )
}

export default BlogPageEntry
