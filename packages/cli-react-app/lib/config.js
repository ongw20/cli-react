const os = require('os')
const path = require('path')

module.exports = {
  getTemplateUrl: (template) => `direct:https://github.com/ongw20/cli-react.git#template-${template}`,
  TMP_DIR: path.join(os.tmpdir(), 'cli-react'),
  VALID_TEMPLATES: [
    'babel',
    'typescript'
  ]
}
