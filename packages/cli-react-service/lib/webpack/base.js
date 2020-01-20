const WebpackBar = require('webpackbar')

module.exports = {
  plugins: [
    new WebpackBar()
  ],
  devServer: {
    host: '0.0.0.0',
    hotOnly: false,
    hot: true,
    quiet: true,
    clientLogLevel: 'error',
    overlay: {
      warnings: false,
      errors: false
    },
    historyApiFallback: true
  }
}
