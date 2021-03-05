const path = require('path')
const { targets: allTargets, fuzzyMatchTarget, getArgv, binRun } = require('./utils')
run()
async function run() {
  const argv = getArgv()
  console.log(argv)
  // accept npm run build web browser...
  const paramTarget = argv._
  if (paramTarget.length === 0) {
    buildAll(allTargets)
  } else {
    buildAll(paramTarget)
  }
}

function buildAll(targets) {
  runParallel(10, targets, rollupBuild)
}

async function runParallel(maxConcurrency, sources, iteratorFn) {
  const ret = []
  // const executing = []
  for (const item of sources) {
    const p = Promise.resolve().then(() => iteratorFn(item))
    ret.push(p)
    // if (maxConcurrency <= source.length) {
    //   const e = p.then(() => executing.splice(executing.indexOf(e)), 1)
    //   executing.push(e)
    //   if (executing.length >= maxConcurrency) {
    //     await Promise.race(executing)
    //   }
    // }
  }
  return Promise.all(ret)
}

/**
 *
 * @param {*} target packages下的文件夹名称
 */
async function rollupBuild(target) {
  const pkgDir = path.resolve(`packages/${target}`)
  const pkg = require(`${pkgDir}/package.json`)
  if (pkg.private) {
    return
  }
  // const env = [pkg.buildOption && pkg.buildOption.env]
  const result = await binRun('rollup', [
    '-c',
    '--environment',
    [
      // `COMMIT:${commit}`,
      // `NODE_ENV:${env}`,
      `TARGET:${target}`
      // formats ? `FORMATS:${formats}` : ``,
    ]
      .filter(Boolean)
      .join(',')
  ])
}
