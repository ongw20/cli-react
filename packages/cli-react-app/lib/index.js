const path = require('path')
const ora = require('ora')
const validateProjectName = require('validate-npm-package-name')
const { fs, chalk, logger } = require('cli-shared-utils')
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
      spinner.succeed(`Success! Created ${chalk.cyan(name)} at ${targetDir}`)
      logger.log(
        'Inside that directory, you can run several commands:\n\n' +
        `  ${chalk.blue('npm install')}\n` +
        '    Installs dependencies for the project.\n\n' +
        `  ${chalk.blue('npm run dev')}\n` +
        '    Starts the development server.\n\n' +
        `  ${chalk.blue('npm run build')}\n` +
        '    Bundles the app into static files for production.\n\n' +
        `  ${chalk.blue('npm run lint')}\n` +
        '    Formats codes with eslint.\n\n' +
        `  ${chalk.blue('npm test')}\n` +
        '    Starts the test runner.\n\n' +
        'We suggest that you begin by typing:\n\n' +
        `  ${chalk.blue('cd')} ${name}\n` +
        `  ${chalk.blue('npm install')}\n` +
        `  ${chalk.blue('npm run dev')}\n`
      )
    } catch (err) {
      spinner.fail('There is some error!')
      logger.log(err)
      process.exit(1)
    }
  }
}

module.exports = create
