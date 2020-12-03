/* eslint-env node */
/* eslint-disable import/order */
const { resolve } = require('path')
const withPreact = require('next-plugin-preact')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const TRANSPILED_MODULES = [
  '@nonsensebb/components',
  'lodash-es',
]

const withTM = require('next-transpile-modules')(TRANSPILED_MODULES)

const nextConfig = {
  trailingSlash: true,
  experimental: {
    modern: true,
  },
  cssLoaderOptions: {
    url: false,
  },
  webpack(config) {
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

    return config
  },
}

module.exports = withTM(
  withBundleAnalyzer(
    withPreact(nextConfig),
  )
)
