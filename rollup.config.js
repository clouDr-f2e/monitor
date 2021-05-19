import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import clear from 'rollup-plugin-clear'
import cleanup from 'rollup-plugin-cleanup'
import size from 'rollup-plugin-sizes'
import { visualizer } from 'rollup-plugin-visualizer'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
if (!process.env.TARGET) {
  throw new Error('TARGET package must be specified')
}
// 是否生成声明文件
const isDeclaration = process.env.TYPES !== 'false'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const masterVersion = require('./package.json').version
const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const packageDirDist = process.env.LOCALDIR === 'undefined' ? `${packageDir}/dist` : process.env.LOCALDIR
const name = path.basename(packageDir)
const pathResolve = (p) => path.resolve(packageDir, p)

const paths = {
  '@mitojs/utils': [`${packagesDir}/utils/src`],
  '@mitojs/core': [`${packagesDir}/core/src`],
  '@mitojs/types': [`${packagesDir}/types/src`],
  '@mitojs/shared': [`${packagesDir}/shared/src`],
  '@mitojs/browser': [`${packagesDir}/browser/src`],
  '@mitojs/react': [`${packagesDir}/react/src`],
  '@mitojs/vue': [`${packagesDir}/vue/src`],
  '@mitojs/wx-mini': [`${packagesDir}/wx-mini/src`],
  '@mitojs/web-performance': [`${packagesDir}/web-performance/src`]
}

const common = {
  input: `${packageDir}/src/index.ts`,
  output: {
    banner: `/* @mitojs/${name} version ' + ${masterVersion} */`,
    footer: '/* follow me on Github! @cjinhuo */'
  },
  external: ['@mitojs/core', '@mitojs/utils', '@mitojs/types', '@mitojs/shared'],
  plugins: [
    resolve(),
    size(),
    visualizer(),
    commonjs({
      exclude: 'node_modules'
    }),
    json(),
    cleanup({
      comments: 'none'
    }),
    typescript({
      tsconfig: 'tsconfig.build.json',
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {
          declaration: isDeclaration,
          declarationMap: isDeclaration,
          declarationDir: `${packageDirDist}/packages/`, // 类型声明文件的输出目录
          module: 'ES2015',
          paths
        }
      },
      include: ['*.ts+(|x)', '**/*.ts+(|x)', '../**/*.ts+(|x)']
    })
  ]
}
const esmPackage = {
  ...common,
  output: {
    file: `${packageDirDist}/${name}.esm.js`,
    format: 'es',
    name: 'MITO',
    sourcemap: true,
    ...common.output
  },
  plugins: [
    ...common.plugins,
    clear({
      targets: [packageDirDist]
    })
  ]
}
const cjsPackage = {
  ...common,
  external: [],
  output: {
    file: `${packageDirDist}/${name}.js`,
    format: 'cjs',
    name: 'MITO',
    sourcemap: true,
    minifyInternalExports: true,
    ...common.output
  },
  plugins: [...common.plugins]
}

const iifePackage = {
  ...common,
  external: [],
  output: {
    file: `${packageDirDist}/${name}.min.js`,
    format: 'iife',
    name: 'MITO',
    ...common.output
  },
  plugins: [...common.plugins, terser()]
}
const total = {
  esmPackage,
  iifePackage,
  cjsPackage
}
let result = total
export default [...Object.values(result)]
