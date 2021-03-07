import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import clear from 'rollup-plugin-clear'
import cleanup from 'rollup-plugin-cleanup'
// eslint-disable-next-line @ -eslint/no-var-requires
const path = require('path')
if (!process.env.TARGET) {
  throw new Error('TARGET package must be specified')
}
// 是否生成声明文件
const isDeclaration = process.env.TYPES != null
// eslint-disable-next-line @typescript-eslint/no-var-requires
const masterVersion = require('./package.json').version
const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const packageDirDist = `${packageDir}/dist`
const name = path.basename(packageDir)
const pathResolve = (p) => path.resolve(packageDir, p)

console.log('name', name)
const paths = {
  '@mitojs/utils': [`${packagesDir}/utils/src`],
  '@mitojs/core': [`${packagesDir}/core/src`],
  '@mitojs/types': [`${packagesDir}/types/src`],
  '@mitojs/shared': [`${packagesDir}/shared/src`],
  '@mitojs/browser': [`${packagesDir}/browser/src`],
  '@mitojs/react': [`${packagesDir}/react/src`],
  '@mitojs/vue': [`${packagesDir}/vue/src`]
}
const common = {
  input: `${packageDir}/src/index.ts`,
  plugins: [
    resolve(),
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
  input: common.input,
  output: {
    file: `${packageDirDist}/${name}.esm.js`,
    format: 'esm',
    name: 'MITO',
    sourcemap: true
  },
  plugins: [
    ...common.plugins,
    clear({
      targets: [packageDirDist]
    })
  ]
}
const cjsPackage = {
  input: common.input,
  output: {
    file: `${packageDirDist}/${name}.js`,
    format: 'cjs',
    name: 'MITO',
    sourcemap: true
  },
  plugins: [...common.plugins]
}

const iifePackage = {
  input: common.input,
  output: {
    file: `${packageDirDist}/${name}.min.js`,
    format: 'iife',
    name: 'MITO'
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
