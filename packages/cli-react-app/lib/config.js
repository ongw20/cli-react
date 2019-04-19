const os = require('os')
const path = require('path')

module.exports = {
  getTemplateUrl: (template) => `ongw20/cli-react#template-${template}`,
  TMP_DIR: path.join(os.tmpdir(), 'cli-react'),
  VALID_TEMPLATES: [
    'babel',
    'typescript'
  ]
}
