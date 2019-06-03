const os = require('os')
const path = require('path')

module.exports = {
  templatesUrl: 'https://ongw20.github.io/cli-react/templates.json',
  getTemplateUrl: (template) => `direct:https://github.com/ongw20/cli-react.git#${template}`,
  TMP_DIR: path.join(os.tmpdir(), 'cli-react')
}
