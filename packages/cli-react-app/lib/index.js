const path = require('path')
const validateProjectName = require('validate-npm-package-name')
const { fs, chalk, logger, clearConsole, execute } = require('cli-shared-utils')
const initRepo = require('./initRepo')

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
    logger.info('Creating project...\n')
    try {
      initRepo(targetDir, name)
      await execute('git init', [], targetDir)
      const { preset } = options
      process.env.CONTEXT = targetDir
      await execute(`npm install react-preset-${preset}`, ['-g'], targetDir)
      await execute('git add', ['.'], targetDir)
      await execute('git commit', ['-m', 'Initial commit'], targetDir)
      clearConsole()
      logger.done(`Success! Created ${chalk.cyan.bold(name)} at ${targetDir}`)
      logger.log(
        '\nInside that directory, you can run several commands:\n\n' +
        `  ${chalk.blue('npm install')}\n` +
        '    Installs dependencies for the project.\n\n' +
        `  ${chalk.blue('npm run dev')}\n` +
        '    Starts the development server.\n\n' +
        `  ${chalk.blue('npm run build')}\n` +
        '    Bundles the app into static files for production.\n\n' +
        `  ${chalk.blue('npm test')}\n` +
        '    Starts the test runner.\n\n' +
        'We suggest that you begin by typing:\n\n' +
        `  ${chalk.blue('cd')} ${name}\n` +
        `  ${chalk.blue('npm install')}\n` +
        `  ${chalk.blue('npm run dev')}\n`,
      )
    } catch (err) {
      logger.error(err)
      await fs.remove(targetDir)
      process.exit(1)
    }
  }
}

module.exports = create
