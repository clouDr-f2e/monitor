const fs = require('fs')

const { getArgv, targets: allTargets, binRun, getPkgRoot, step } = require('./utils')

let beModifiedPackages = []

function modify(targetVersion) {
  step('\nstart modify packages version', targetVersion)
  const argv = getArgv()
  beReleasedPackages = argv._
  console.log('targetVersion', targetVersion)
  beModifiedPackages.forEach((target) => {})
}

function modifyMitoVersion(pkgName) {
  const pkgRoot = getPkgRoot(pkgName)
  const pkgPath = path.resolve(pkgRoot, 'package.json')
  const pkg = require(pkgPath)
  // console.log(pkg)
}
