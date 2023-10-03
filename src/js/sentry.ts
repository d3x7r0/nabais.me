import * as Sentry from '@sentry/browser'

export default function init() {
  const options = {
    enabled: Boolean(import.meta.env.PROD ?? 'false'),
    dsn: import.meta.env.PUBLIC_SENTRY_DSN,
    release: import.meta.env.PUBLIC_COMMIT_HASH ?? 'local',
  }

  if (import.meta.env.PUBLIC_SENTRY_DSN) {
    Sentry.init(options)
  }
}
