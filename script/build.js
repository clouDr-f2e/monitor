const path = require('path')
const chalk = require('chalk')
const fs = require('fs-extra')

const { targets: allTargets, fuzzyMatchTarget, getArgv, binRun } = require('./utils')
let buildTypes = true
// local debug
let LOCALDIR = ''
run()
async function run() {
  const argv = getArgv()
  console.log(argv)
  // accept npm run build web browser...
  const paramTarget = argv._
  LOCALDIR = argv.local
  buildTypes = argv.types !== 'false'
  console.log(typeof buildTypes)
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
      `TARGET:${target}`,
      `TYPES:${buildTypes}`,
      `LOCALDIR:${LOCALDIR}`
    ]
      .filter(Boolean)
      .join(',')
  ])

  if (buildTypes && pkg.types) {
    console.log(chalk.bold(chalk.yellow(`Rolling up type definitions for ${target}...`)))

    // build types
    const { Extractor, ExtractorConfig } = require('@microsoft/api-extractor')

    const extractorConfigPath = path.resolve(pkgDir, `api-extractor.json`)
    const extractorConfig = ExtractorConfig.loadFileAndPrepare(extractorConfigPath)
    const extractorResult = Extractor.invoke(extractorConfig, {
      localBuild: true,
      showVerboseMessages: true
    })
    if (extractorResult.succeeded) {
      // const typesDir = path.resolve(pkgDir, 'types')
      // if (await fs.exists(typesDir)) {
      //   const dtsPath = path.resolve(pkgDir, pkg.types)
      //   const existing = await fs.readFile(dtsPath, 'utf-8')
      //   const typeFiles = await fs.readdir(typesDir)
      //   const toAdd = await Promise.all(
      //     typeFiles.map((file) => {
      //       return fs.readFile(path.resolve(typesDir, file), 'utf-8')
      //     })
      //   )
      //   console.log('add', toAdd)
      //   await fs.writeFile(dtsPath, existing + '\n' + toAdd.join('\n'))
      // }
      console.log(chalk.bold(chalk.green(`API Extractor completed successfully.`)))
    }
    await fs.remove(`${pkgDir}/dist/packages`)
  }
}
