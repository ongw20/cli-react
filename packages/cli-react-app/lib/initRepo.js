const path = require('path')
const { fs } = require('cli-shared-utils')

function initPackage(targetDir, name) {
  const pkgJson = {
    name,
    version: '0.1.0',
    private: true
  }
  fs.outputJSONSync(path.join(targetDir, 'package.json'), pkgJson)
}

function initGit(targetDir) {
  const gitIgnore = [
    '# Logs',
    'logs',
    '*.log',
    '\n',
    '# Coverage directory used by tools like istanbul',
    'coverage',
    '\n',
    '# Dependency directories',
    'node_modules/',
    'jspm_packages/',
    '\n',
    '.DS_store',
    '.vscode',
    '/dist/',
    '\n'
  ].join('\n')
  fs.outputFileSync(path.join(targetDir, '.gitignore'), gitIgnore)
}

module.exports = (targetDir, name) => {
  initPackage(targetDir, name)
  initGit(targetDir)
}
