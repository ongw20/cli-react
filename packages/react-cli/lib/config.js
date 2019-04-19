const os = require('os')
const path = require('path')

module.exports = {
  getTemplateUrl: (template) => `ongw20/react-cli#template-${template}`,
  TMP_DIR: path.join(os.tmpdir(), 'react-cli'),
  VALID_TEMPLATES: [
    'babel',
    'typescript'
  ]
}
