/* eslint-env node */
const { resolve } = require('path')
const withTM = require('next-transpile-modules')([
  '@nonsensebb/components',
])

module.exports = withTM({
  exportTrailingSlash: true,
  experimental: {
    modern: true,
    polyfillsOptimization: true,
  },
  cssLoaderOptions: {
    url: false,
  },
  webpack(config) {
    config.resolve.alias['react'] = resolve(__dirname, '.', 'node_modules', 'react')
    config.resolve.alias['react-dom'] = resolve(__dirname, '.', 'node_modules', 'react-dom')
    config.resolve.alias['react-ssr-prepass'] = resolve(__dirname, '.', 'node_modules', 'react-ssr-prepass')
    config.resolve.alias['preact'] = resolve(__dirname, '.', 'node_modules', 'preact')

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
})
