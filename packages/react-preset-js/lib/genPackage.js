const fs = require('fs-extra')
const presetPkgJson = require('./pkg')

function getCombinedJson(pkgJson) {
  return {
    ...pkgJson,
    ...presetPkgJson,
  }
}

module.exports = (pkgFile, pkgJson) => {
  fs.outputJSONSync(pkgFile, getCombinedJson(pkgJson), {
    spaces: 2,
  })
}
