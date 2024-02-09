import type { FunctionalComponent, JSX } from 'preact'
import clsx from 'clsx'

import { useCSSVariable } from '../../../hooks/css'

import styles from './index.module.scss'

const BACKGROUND_CHARACTER_LIMIT = 160

type BoxLinkProps = {
  className?: JSX.HTMLAttributes['className'],

  title: string
  href: string
  description?: string
  big?: boolean
}

// TODO: support image background instead of text
const BoxLink: FunctionalComponent<BoxLinkProps> = function (props) {
  const {
    title,
    href,
    description,
    big = false,
    ...rest
  } = props

  const style = useCSSVariable(
    'bg-content',
    `"${(description ?? title).replaceAll(/\n/g, ' ').slice(0, BACKGROUND_CHARACTER_LIMIT)}"`,
  )

  return (
    <article
      style={style}
      className={clsx(styles['a-box-link'], {
        [styles['a-box-link--big']]: big,
      })}
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
