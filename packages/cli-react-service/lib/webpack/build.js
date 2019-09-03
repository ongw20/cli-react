const path = require('path')
const zlib = require('zlib')
const webpack = require('webpack')
const ui = require('cliui')({ width: 80 })
const { fs, chalk, logger } = require('cli-react-utils')

module.exports = function(options) {
  logger.info('Building for production...')
  const dist = path.relative(process.env.CONTEXT, options.output.path)
  webpack(options, (err, stats) => {
    if (err) {
      logger.log(err.stack || err)
      process.exit(1)
    }
    const messages = stats.toJson({
      all: false,
      warnings: true,
      errors: true
    })
    if (messages.errors.length) {
      process.exit(1)
    }
    const json = stats.toJson({
      hash: false,
      modules: false,
      chunks: false
    })
    let assets = json.assets
      ? json.assets
      : json.children.reduce((acc, child) => acc.concat(child.assets), [])
    const seenNames = new Map()
    const isJS = val => /\.js$/.test(val)
    const isCSS = val => /\.css$/.test(val)
    const isMinJS = val => /\.min\.js$/.test(val)
    assets = assets
      .filter(a => {
        if (seenNames.has(a.name)) {
          return false
        }
        seenNames.set(a.name, true)
        return isJS(a.name) || isCSS(a.name)
      })
      .sort((a, b) => {
        if (isJS(a.name) && isCSS(b.name)) return -1
        if (isCSS(a.name) && isJS(b.name)) return 1
        if (isMinJS(a.name) && !isMinJS(b.name)) return -1
        if (!isMinJS(a.name) && isMinJS(b.name)) return 1
        return b.size - a.size
      })

    function formatSize(size) {
      return (size / 1024).toFixed(2) + ' KiB'
    }

    function getGzippedSize(name) {
      const filepath = path.resolve(options.output.path, name)
      const buffer = fs.readFileSync(filepath)
      return zlib.gzipSync(buffer).length
    }

    function makeRow(a, b, c) {
      return `  ${a}\t    ${b}\t ${c}`
    }

    function formatRow(asset) {
      const filepath = path.join(dist, asset.name)
      const size = asset.size
      const gzipped = getGzippedSize(asset.name)
      let file
      if (/js$/.test(asset.name)) {
        file = chalk.green(filepath)
      } else {
        file = chalk.blue(filepath)
      }
      return makeRow(file, formatSize(size), formatSize(gzipped))
    }

    ui.div(
      makeRow(
        chalk.cyan.bold('File'),
        chalk.cyan.bold('Size'),
        chalk.cyan.bold('Gzipped')
      ) + '\n\n' +
      assets.map(asset => formatRow(asset)).join('\n')
    )

    logger.log(`${ui.toString()}\n\n  ${chalk.gray('Images and other types of assets omitted.')}\n`)
    logger.done(`Build complete. The ${chalk.cyan(dist)} directory is ready to be deployed.`)
    logger.log()
  })
}
