#!/usr/bin/env node

const { minimist, logger, checkNodeVersion } = require('cli-shared-utils')
const requiredVersion = require('../package.json').engines.node

// Check node version before requiring/doing anything else
// The user may be on a very old node version
checkNodeVersion(requiredVersion, 'cli-react-app')

const program = require('commander')
const request = require('request')
const { templatesUrl } = require('../config')

function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

function cleanArgs(cmd) {
  const args = {}
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''))
    args[key] = cmd[key]
  })
  return args
}

request.get(templatesUrl, (err, res, body) => {
  if (!err && res.statusCode === 200) {
    const templates = JSON.parse(body)

    program
      .version(require('../package').version)
      .usage('<command> [options]')

    program
      .command('create <app-name>')
      .description('create a new project powered by cli-react-service')
      .option('-t, --template <template>', `use template(default: babel) -- ${Object.keys(templates).join(' | ')}`)
      .action((name, cmd) => {
        const options = cleanArgs(cmd)

        if (minimist(process.argv.slice(3))._.length > 1) {
          logger.log()
          logger.warn('You provided more than one argument. The first one will be used as the app\'s name, the rest are ignored.')
        }

        const template = options.template || 'babel'
        if (!templates[template]) {
          logger.error(`Template does not exist: "${template}"`)
          process.exit(1)
        }
        options.template = templates[template]
        require('../lib')(name, options)
      })

    program.parse(process.argv)

    if (!program.args.length) {
      program.help()
    }
  } else {
    logger.error(err)
  }
})
