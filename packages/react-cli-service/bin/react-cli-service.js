#!/usr/bin/env node

const { minimist, checkNodeVersion } = require('cli-shared-utils')
const requiredVersion = require('../package.json').engines.node

checkNodeVersion(requiredVersion, 'react-cli-service')

const rawArgv = process.argv.slice(2)
const args = minimist(rawArgv)
// serve | build
const command = args._[0]

/**
 * args.config: webpack.config.js
 * args.hash: 8
 */
require('../lib')(command, args)
