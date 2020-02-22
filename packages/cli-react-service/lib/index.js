const { logger } = require('cli-shared-utils')
const { getWebpackProdConfig, getWebpackDevConfig } = require('./webpack/config')
const serve = require('./webpack/serve')
const build = require('./webpack/build')

async function run(command, options) {
  process.env.CONTEXT = process.cwd()
  const webpackUserConfigFile = options.config || 'webpack.config.js'

  if (command === 'build') {
    process.env.NODE_ENV = 'production'
    const prodConfig = getWebpackProdConfig(webpackUserConfigFile)
    build(prodConfig)
  } else if (command === 'serve') {
    process.env.NODE_ENV = 'development'
    const { devConfig, devServerConfig } = await getWebpackDevConfig(webpackUserConfigFile)
    serve(devConfig, devServerConfig)
  } else {
    logger.error(`Unknow command: "${command}"`)
    process.exit(1)
  }
}

module.exports = run
