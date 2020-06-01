/* eslint-env node */
/* eslint-disable import/order */
const { resolve } = require('path')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const TRANSPILED_MODULES = [
  '@nonsensebb/components',
]

const withTM = require('next-transpile-modules')(TRANSPILED_MODULES)

module.exports = withTM(
  withBundleAnalyzer({
    exportTrailingSlash: true,
    experimental: {
      modern: true,
      polyfillsOptimization: true,
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

      const splitChunks = config.optimization && config.optimization.splitChunks
      if (splitChunks) {
        const cacheGroups = splitChunks.cacheGroups
        const preactModules = /[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider)[\\/]/
        if (cacheGroups.framework) {
          cacheGroups.preact = Object.assign({}, cacheGroups.framework, {
            test: preactModules,
          })
          cacheGroups.commons.name = 'framework'
        } else {
          cacheGroups.preact = {
            name: 'commons',
            chunks: 'all',
            test: preactModules,
          }
        }
      }

      return config
    },
  }),
)
