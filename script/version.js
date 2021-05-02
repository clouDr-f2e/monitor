const fs = require('fs')
const path = require('path')

const { getArgv, targets: allTargets, binRun, getPkgRoot, step, errLog } = require('./utils')
const MITO_PREFIX = '@mitojs'
let beModifiedPackages = []

run()

function run() {
  const argv = getArgv()._
  let targetVersion = null
  if (argv.length === 0) {
    return errLog('\nnpm run version 没有带版本号')
  } else {
    targetVersion = argv.shift()
  }
  const masterVersion = require('../package.json').version
  if (masterVersion !== targetVersion) {
    return errLog('\n传入的版本号与masterVersion🙅‍')
  }
  beModifiedPackages = argv.length === 0 ? allTargets : argv
  modify(targetVersion)
}

async function modify(targetVersion) {
  step(`\nstart modify packages version: ${targetVersion}`)
  for (const target of beModifiedPackages) {
    await modifyMitoVersion(target, targetVersion)
  }
}

async function modifyMitoVersion(pkgName, version) {
  const pkgRoot = getPkgRoot(pkgName)
  const pkgPath = path.resolve(pkgRoot, 'package.json')
  const pkg = require(pkgPath)
  const oldVersion = pkg.version
  if (pkg.name.startsWith(MITO_PREFIX)) {
    pkg.version = version
  }
  const dependencies = pkg.dependencies || {}
  Object.entries(dependencies).forEach(([dependent, dependentVersion]) => {
    if (dependent.startsWith(MITO_PREFIX)) {
      dependencies[dependent] = version
    }
  })
  fs.writeFileSync(pkgPath, JSON.stringify(pkg))
  await binRun('prettier', ['--write', pkgPath])
  step(`\n${pkgName} from ${oldVersion} to ${version} success`)
}
