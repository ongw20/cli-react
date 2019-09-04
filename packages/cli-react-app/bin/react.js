#!/usr/bin/env node
const { minimist, logger, checkNodeVersion } = require('cli-shared-utils')
const requiredVersion = require('../package.json').engines.node

// Check node version before requiring/doing anything else
// The user may be on a very old node version
checkNodeVersion(requiredVersion, 'cli-react-app')

const program = require('commander')

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

const presets = [
  'babel',
  'typescript'
]

program
  .version(require('../package').version)
  .usage('<command> [options]')

program
  .command('create <app-name>')
  .description('create a new project powered by cli-react-service')
  .option('-p, --preset <preset>', `use preset(default: babel) -- ${presets.join(' | ')}`)
  .action((name, cmd) => {
    const options = cleanArgs(cmd)

    if (minimist(process.argv.slice(3))._.length > 1) {
      logger.log()
      logger.warn('You provided more than one argument. The first one will be used as the app\'s name, the rest are ignored.')
    }

    const preset = options.preset || 'babel'
    if (!presets.includes(preset)) {
      logger.error(`Preset does not exist: "${preset}"`)
      process.exit(1)
    }
    options.preset = preset
    require('../lib')(name, options)
  })

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
