const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        // When some code (like rss-parser) does `require("http")`, use stream-http
        http: require.resolve('stream-http'),

        // If you later see “Can't resolve 'https'” or “Can't resolve 'url'” errors,
        // add those here (pointing to the corresponding browser‑friendly packages):
        https: require.resolve('https-browserify'),
        url:   require.resolve('url/'),
        buffer: require.resolve('buffer/'),
        stream: require.resolve('stream-browserify'),
        timers: require.resolve("timers-browserify")
      }
    },
    plugins: [
      // ProvidePlugin makes `Buffer` and `process.env` available in the bundle if needed.
      // (rss-parser sometimes expects Node’s Buffer/process to exist.)
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser'
      })
    ],
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true
        },
      },
    },
  }
})
