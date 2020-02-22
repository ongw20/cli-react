/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra')
const path = require('path')

const screenshots = path.join(__dirname, '../screenshots')
fs.ensureDirSync(screenshots)
