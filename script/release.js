const { getArgv, targets: allTargets, binRun } = require('./utils')
const path = require('path')
const fs = require('fs')
const step = (msg) => console.log(chalk.cyan(msg))
const getPkgRoot = (pkg) => path.resolve(__dirname, '../packages/' + pkg)

let beReleasedPackages = []

run()
async function run() {
  const argv = getArgv()
  beReleasedPackages = argv._
  console.log(argv)
}

async function release() {
  step('\ncollect be released packages...')
  if (beReleasedPackages.length === 0) {
    beReleasedPackages = allTargets
  }
  step(`\nbeReleasedPackages: ${beReleasedPackages.join('\n')}`)
}

async function publicPackage(pkgName, version) {
  const pkgRoot = getPkgRoot(pkgName)
  const pkgPath = path.resolve(pkgRoot, 'package.json')
  const pkg = require(pkgPath)
  if (pkg.private) return
  step(`Publishing ${pkgName}...`)
  try {
    await binRun('yarn', ['publish', '--new-version', 'version'])
    console.log(chalk.green(`Successfully published ${pkgName}@${version}`))
  } catch (error) {}
}
