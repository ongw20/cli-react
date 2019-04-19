const chalk = require('chalk')
const padStart = require('string.prototype.padstart')

function format(label, msg) {
  return msg.split('\n').map((line, i) => {
    return i === 0
      ? `${label} ${line}`
      : padStart(line, chalk.reset(label).length)
  }).join('\n')
}
function chalkTag(msg) {
  return chalk.bgBlackBright.white.dim(` ${msg} `)
}

module.exports = {
  log(msg = '', tag = null) {
    tag ? console.log(format(chalkTag(tag), msg)) : console.log(msg)
  },
  info(msg, tag = null) {
    console.log(format(chalk.bgBlue.black(' INFO ') + (tag ? chalkTag(tag) : ''), msg))
  },
  warn(msg, tag = null) {
    console.warn(format(chalk.bgYellow.black(' WARN ') + (tag ? chalkTag(tag) : ''), chalk.yellow(msg)))
  },
  error(msg, tag = null) {
    console.error(format(chalk.bgRed(' ERROR ') + (tag ? chalkTag(tag) : ''), chalk.red(msg)))
  },
  done(msg, tag = null) {
    console.log(format(chalk.bgGreen.black(' DONE ') + (tag ? chalkTag(tag) : ''), msg))
  }
}
