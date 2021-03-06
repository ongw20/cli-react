const path = require('path')
const merge = require('webpack-merge')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const portfinder = require('portfinder')
const ip = require('ip')
const { chalk, logger } = require('cli-shared-utils')
const webpackBaseConfig = require('./base')

function getWebpackUserConfig(webpackConfigFile) {
  try {
    return require(path.join(process.env.CONTEXT, webpackConfigFile))
  } catch (err) {
    logger.error(err)
    process.exit(1)
  }
}

async function getWebpackDevConfig(webpackConfigFile) {
  const webpackUserConfig = getWebpackUserConfig(webpackConfigFile)
  const devServerConfig = {
    ...webpackBaseConfig.devServer,
    ...webpackUserConfig.devServer,
  }
  try {
    devServerConfig.port = await portfinder.getPortPromise({
      port: devServerConfig.port,
      stopPort: devServerConfig.port + 100,
    })
  } catch (err) {
    logger.error('Could not find a port for server.')
    logger.log(err)
    process.exit(1)
  }
  const protocal = devServerConfig.https ? 'https' : 'http'
  const host = devServerConfig.host === '0.0.0.0' ? 'localhost' : devServerConfig.host
  const devConfig = merge(webpackBaseConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [
            'App running at:',
            `- Local:   ${protocal}://${host}:${chalk.cyan(devServerConfig.port)}/`,
            `- Network: ${protocal}://${ip.address()}:${chalk.cyan(devServerConfig.port)}/`,
          ],
          notes: [
            'Note that the development build is not optimized.',
            `To create a production build, run ${chalk.blue('npm run build')}.`,
          ],
        },
      }),
    ],
  }, webpackUserConfig)
  return {
    devConfig,
    devServerConfig,
  }
}

function getWebpackProdConfig(webpackConfigFile) {
  const webpackUserConfig = getWebpackUserConfig(webpackConfigFile)
  return merge(webpackBaseConfig, {
    mode: 'production',
    optimization: {
      minimizer: [
        new TerserWebpackPlugin({}),
        new OptimizeCssAssetsWebpackPlugin({}),
      ],
      splitChunks: {
        chunks: 'all',
        name: true,
      },
      runtimeChunk: true,
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin(),
    ],
  }, webpackUserConfig)
}

module.exports = {
  getWebpackDevConfig,
  getWebpackProdConfig,
}
