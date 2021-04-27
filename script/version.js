const fs = require('fs')
const path = require('path')

const { getArgv, targets: allTargets, binRun, getPkgRoot, step } = require('./utils')
const MITO_PREFIX = '@mitojs'
let beModifiedPackages = []

run()

function run() {
  const argv = getArgv()._
  if (argv.length === 0) {
    return step('\nnpm run version 没有带版本号')
  }
  console.log('argv', argv)
  const targetVersion = argv.shift()
  beModifiedPackages = argv
  modify(targetVersion)
}

async function modify(targetVersion) {
  step(`\nstart modify packages version: ${targetVersion}`)
  beModifiedPackages.forEach((target) => {
    modifyMitoVersion(target, targetVersion)
  })
}

async function modifyMitoVersion(pkgName, version) {
  const pkgRoot = getPkgRoot(pkgName)
  const pkgPath = path.resolve(pkgRoot, 'package.json')
  const pkg = require(pkgPath)
  if (pkg.name.startsWith(MITO_PREFIX)) {
    pkg.version = version
  }
  const dependencies = pkg.dependencies
  Object.entries(dependencies).forEach(([dependent, dependentVersion]) => {
    if (dependent.startsWith(MITO_PREFIX)) {
      dependencies[dependent] = version
    }
  })
  fs.writeFileSync(pkgPath, JSON.stringify(pkg))
  await binRun('prettier', ['--write', pkgPath])
}
