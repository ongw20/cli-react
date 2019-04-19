const fs = require('fs-extra')
const chalk = require('chalk')
const semver = require('semver')
const logger = require('./lib/logger')

function checkNodeVersion(requiredVersion, id) {
  if (!semver.satisfies(process.version, requiredVersion)) {
    logger.error(
      'You are using Node ' + process.version + ', but this version of ' + id +
      ' requires Node ' + requiredVersion + '.\nPlease upgrade your Node version.'
    )
    process.exit(1)
  }
}

module.exports = {
  checkNodeVersion,
  logger,
  fs,
  chalk,
  minimist: require('minimist')
}
