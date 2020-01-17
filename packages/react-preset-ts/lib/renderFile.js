const Handlebars = require('handlebars')
const fs = require('fs-extra')

module.exports = (filepath, dest, data) => {
  const source = fs.readFileSync(filepath, 'utf-8')
  const template = Handlebars.compile(source)
  const res = template(data)
  fs.outputFileSync(dest, res)
}
