const semver = require('semver')
const readline = require('readline')
const logger = require('./lib/logger')
const execute = require('./lib/execute')

function checkNodeVersion(requiredVersion, id) {
  if (!semver.satisfies(process.version, requiredVersion)) {
    logger.error(
      'You are using Node ' + process.version + ', but this version of ' + id +
      ' requires Node ' + requiredVersion + '.\nPlease upgrade your Node version.'
    )
    process.exit(1)
  }
}

function clearConsole() {
  if (process.stdout.isTTY) {
    const blank = '\n'.repeat(process.stdout.rows)
    console.log(blank)
    readline.cursorTo(process.stdout, 0, 0)
    readline.clearScreenDown(process.stdout)
  }
}

module.exports = {
  checkNodeVersion,
  clearConsole,
  logger,
  execute,
  fs: require('fs-extra'),
  chalk: require('chalk'),
  minimist: require('minimist')
}
