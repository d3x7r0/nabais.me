/* eslint-env node */
/* eslint-disable import/order */
const { resolve } = require('path')
const withPreact = require('next-plugin-preact')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
// Use the hidden-source-map option when you don't want the source maps to be
// publicly available on the servers, only to the error reporting
const withSourceMaps = require('@zeit/next-source-maps')()

const TRANSPILED_MODULES = [
  '@nonsensebb/components',
  'lodash-es',
]

const withTM = require('next-transpile-modules')(TRANSPILED_MODULES)

// Use the SentryWebpack plugin to upload the source maps during build step
const SentryWebpackPlugin = require('@sentry/webpack-plugin')
const {
  NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  NODE_ENV,
  DRONE_COMMIT_SHA,
} = process.env

const COMMIT_SHA = DRONE_COMMIT_SHA

process.env.SENTRY_DSN = SENTRY_DSN

const nextConfig = {
  trailingSlash: true,
  experimental: {
    modern: true,
  },
  cssLoaderOptions: {
    url: false,
  },
  env: {
    NEXT_PUBLIC_COMMIT_SHA: COMMIT_SHA,
  },
  webpack(config, options) {
    // In `pages/_app.js`, Sentry is imported from @sentry/browser. While
    // @sentry/node will run in a Node.js environment. @sentry/node will use
    // Node.js-only APIs to catch even more unhandled exceptions.
    //
    // This works well when Next.js is SSRing your page on a server with
    // Node.js, but it is not what we want when your client-side bundle is being
    // executed by a browser.
    //
    // Luckily, Next.js will call this webpack function twice, once for the
    // server and once for the client. Read more:
    // https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
    //
    // So ask Webpack to replace @sentry/node imports with @sentry/browser when
    // building the browser's bundle
    if (!options.isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser'
    }

    TRANSPILED_MODULES.forEach((moduleName) => {
      const pkg = require(resolve(__dirname, '.', 'node_modules', moduleName, 'package.json'))

      Object.keys(pkg.peerDependencies || {}).forEach(dep => {
        config.resolve.alias[dep] = resolve(__dirname, '.', 'node_modules', dep)
      })
    })

    config.module.rules.push(
      {
        test: /\.(svg|md)$/,
        loader: 'raw-loader',
      },
    )

    // When all the Sentry configuration env variables are available/configured
    // The Sentry webpack plugin gets pushed to the webpack plugins to build
    // and upload the source maps to sentry.
    // This is an alternative to manually uploading the source maps
    // Note: This is disabled in development mode.
    // Note: Only run this in client mode since we don't run Next.js on the server
    if (
      !options.isServer &&
      SENTRY_DSN &&
      SENTRY_ORG &&
      SENTRY_PROJECT &&
      SENTRY_AUTH_TOKEN &&
      COMMIT_SHA &&
      NODE_ENV === 'production'
    ) {
      config.plugins.push(
        new SentryWebpackPlugin({
          include: '.next',
          ignore: ['node_modules'],
          stripPrefix: ['webpack://_N_E/'],
          urlPrefix: `~/_next`,
          release: COMMIT_SHA,
        }),
      )
    }

    return config
  },
}

module.exports = withSourceMaps(
  withTM(
    withBundleAnalyzer(
      withPreact(nextConfig),
    ),
  ),
)
