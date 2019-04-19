const path = require('path')
const Handlebars = require('handlebars')
const download = require('download-git-repo')
const { fs } = require('cli-shared-utils')
const { TMP_DIR, VALID_TEMPLATES, getTemplateUrl } = require('./config')

function validateTemplate(template) {
  return VALID_TEMPLATES.includes(template)
}

async function renderFile(filepath, dest, data) {
  const source = await fs.readFile(filepath, 'utf-8')
  const template = Handlebars.compile(source)
  const res = template(data)
  await fs.outputFile(dest, res)
}

async function loadTemplate(template, dest, name) {
  const tmpdir = path.join(TMP_DIR, template)
  if (await fs.pathExists(tmpdir)) {
    await fs.remove(tmpdir)
  }
  await new Promise((resolve, reject) => {
    download(getTemplateUrl(template), tmpdir, { clone: true }, err => {
      if (err) return reject(err)
      resolve()
    })
  })
  await fs.copy(path.join(tmpdir, 'static'), dest)
  await fs.copy(path.join(tmpdir, 'templates'), dest, {
    filter: async(src, dest) => {
      if (!(await fs.stat(src)).isDirectory()) {
        await renderFile(src, dest, { name })
        return false
      }
      return true
    }
  })
  fs.remove(tmpdir)
}

module.exports = {
  validateTemplate,
  loadTemplate
}
