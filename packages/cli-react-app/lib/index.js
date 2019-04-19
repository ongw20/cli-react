const path = require('path')
const ora = require('ora')
const validateProjectName = require('validate-npm-package-name')
const { fs, logger } = require('cli-shared-utils')
const { validateTemplate, loadTemplate } = require('./utils')

async function create(projectName, options) {
  const cwd = process.cwd()
  const inCurrent = projectName === '.'
  const name = inCurrent ? path.relative('../', cwd) : projectName
  const result = validateProjectName(name)
  if (!result.validForNewPackages) {
    logger.error(`Invalid project name: "${name}"`)
    result.errors && result.errors.forEach(err => {
      logger.error(err)
    })
    result.warnings && result.warnings.forEach(warn => {
      logger.warn(warn)
    })
    process.exit(1)
  }
  const targetDir = path.resolve(cwd, projectName || '.')
  if (await fs.exists(targetDir) && (await fs.stat(targetDir)).isDirectory()) {
    logger.error(`Project already exists: "${targetDir}"`)
    process.exit(1)
  } else {
    const template = options.template || 'babel'
    if (!validateTemplate(template)) {
      logger.error(`Template does not exist: "${template}"`)
      process.exit(1)
    }
    const spinner = ora('Generating project...').start()
    try {
      await loadTemplate(template, targetDir, name)
      spinner.succeed('All have been set!')
    } catch (err) {
      spinner.fail('There is some error!')
      logger.log(err)
      process.exit(1)
    }
  }
}

module.exports = create
