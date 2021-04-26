const fs = require('fs')
const chalk = require('chalk')
const execa = require('execa')
const path = require('path')

const targets = (exports.targets = fs.readdirSync('packages').filter((f) => {
  if (!fs.statSync(`packages/${f}`).isDirectory()) {
    return false
  }
  if (f === 'company') return false
  const pkg = require(`../packages/${f}/package.json`)
  if (pkg.private && !pkg.buildOptions) {
    return false
  }
  return true
}))

exports.fuzzyMatchTarget = (partialTargets, includeAllMatching) => {
  const matched = []
  partialTargets.forEach((partialTarget) => {
    for (const target of targets) {
      if (target.match(partialTarget)) {
        matched.push(target)
        if (!includeAllMatching) {
          break
        }
      }
    }
  })
  if (matched.length) {
    return matched
  } else {
    console.log()
    console.error(`  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`Target ${chalk.underline(partialTargets)} not found!`)}`)
    console.log()

    process.exit(1)
  }
}

exports.getArgv = () => {
  var argv = require('minimist')(process.argv.slice(2))
  return argv
}

exports.binRun = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', ...opts })

exports.getPkgRoot = (pkg) => path.resolve(__dirname, '../packages/' + pkg)

exports.step = (msg) => console.log(chalk.cyan(msg))
