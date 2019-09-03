const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const { logger } = require('cli-react-utils')

module.exports = async function(options, serverOptions) {
  logger.info('Starting development server...')
  const compiler = webpack(options)
  const server = new WebpackDevServer(compiler, serverOptions)
  server.listen(serverOptions.port, serverOptions.host, (err) => {
    if (err) {
      logger.error('Starting server failed.')
      logger.log(err)
      process.exit(1)
    }
    ;['SIGINT', 'SIGTERM'].forEach(signal => {
      process.on(signal, () => {
        server.close(() => {
          process.exit(0)
        })
      })
    })
  })
}
